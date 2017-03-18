/********
* Utils
********/
var fs      = require('fs');
var request = require('request');


const CODONS_RNA =
    {
        'UUU': 'F',     'CUU': 'L',     'AUU': 'I',     'GUU': 'V',
        'UUC': 'F',     'CUC': 'L',     'AUC': 'I',     'GUC': 'V',
        'UUA': 'L',     'CUA': 'L',     'AUA': 'I',     'GUA': 'V',
        'UUG': 'L',     'CUG': 'L',     'AUG': 'M',     'GUG': 'V',
        'UCU': 'S',     'CCU': 'P',     'ACU': 'T',     'GCU': 'A',
        'UCC': 'S',     'CCC': 'P',     'ACC': 'T',     'GCC': 'A',
        'UCA': 'S',     'CCA': 'P',     'ACA': 'T',     'GCA': 'A',
        'UCG': 'S',     'CCG': 'P',     'ACG': 'T',     'GCG': 'A',
        'UAU': 'Y',     'CAU': 'H',     'AAU': 'N',     'GAU': 'D',
        'UAC': 'Y',     'CAC': 'H',     'AAC': 'N',     'GAC': 'D',
        'UAA': 'Stop',  'CAA': 'Q',     'AAA': 'K',     'GAA': 'E',
        'UAG': 'Stop',  'CAG': 'Q',     'AAG': 'K',     'GAG': 'E',
        'UGU': 'C',     'CGU': 'R',     'AGU': 'S',     'GGU': 'G',
        'UGC': 'C',     'CGC': 'R',     'AGC': 'S',     'GGC': 'G',
        'UGA': 'Stop',  'CGA': 'R',     'AGA': 'R',     'GGA': 'G',
        'UGG': 'W',     'CGG': 'R',     'AGG': 'R',     'GGG': 'G'
    };

const CODONS_DNA =
    {
        'TTT': 'F',     'CTT': 'L',     'ATT': 'I',     'GTT': 'V',
        'TTC': 'F',     'CTC': 'L',     'ATC': 'I',     'GTC': 'V',
        'TTA': 'L',     'CTA': 'L',     'ATA': 'I',     'GTA': 'V',
        'TTG': 'L',     'CTG': 'L',     'ATG': 'M',     'GTG': 'V',
        'TCT': 'S',     'CCT': 'P',     'ACT': 'T',     'GCT': 'A',
        'TCC': 'S',     'CCC': 'P',     'ACC': 'T',     'GCC': 'A',
        'TCA': 'S',     'CCA': 'P',     'ACA': 'T',     'GCA': 'A',
        'TCG': 'S',     'CCG': 'P',     'ACG': 'T',     'GCG': 'A',
        'TAT': 'Y',     'CAT': 'H',     'AAT': 'N',     'GAT': 'D',
        'TAC': 'Y',     'CAC': 'H',     'AAC': 'N',     'GAC': 'D',
        'TAA': 'Stop',  'CAA': 'Q',     'AAA': 'K',     'GAA': 'E',
        'TAG': 'Stop',  'CAG': 'Q',     'AAG': 'K',     'GAG': 'E',
        'TGT': 'C',     'CGT': 'R',     'AGT': 'S',     'GGT': 'G',
        'TGC': 'C',     'CGC': 'R',     'AGC': 'S',     'GGC': 'G',
        'TGA': 'Stop',  'CGA': 'R',     'AGA': 'R',     'GGA': 'G',
        'TGG': 'W',     'CGG': 'R',     'AGG': 'R',     'GGG': 'G'
    };

const STOP_CODONS_RNA = ['UAG', 'UGA', 'UAA'];
const STOP_CODONS_DNA = ['TAG', 'TGA', 'TAA'];
const START_CODON_RNA = 'AUG';
const START_CODON_DNA = 'ATG';

const REVERSE =
    {
        'A': 'T',
        'T': 'A',
        'C': 'G',
        'G': 'C'
    };


function Util()
    {
        this.CODONS_RNA      = CODONS_RNA;
        this.CODONS_DNA      = CODONS_DNA;
        this.STOP_CODONS_RNA = STOP_CODONS_RNA;
        this.STOP_CODONS_DNA = STOP_CODONS_DNA;
        this.START_CODON_RNA = START_CODON_RNA;
        this.START_CODON_DNA = START_CODON_DNA;
        
        
        this.read_FASTA   = read_FASTA;
        
        this.get_uniprot  = get_uniprot;
        
        this.reverse_comp = reverse_comp;
        
        this.encode_RNA   = encode_RNA;
        this.encode_DNA   = encode_DNA;
    }

module.exports = new Util();


function parse_FASTA(text)
    {
        var lines = text.split('\r\n');
        
        if(lines[0][0] == '>') { lines[0] = lines[0].substr(1); }
        
        return( [lines[0], lines.slice(1).join('').replace(/[\r|\n]/g, '') ] );
    }

function read_FASTA(path)
    {
        var parts = fs.readFileSync(path, 'utf8')
            .split('>')
            .filter( (part) => part != '' );

        
        var parsed_parts = [];
        for(var i = 0; i < parts.length; i++)
            {
                parsed_parts.push( parse_FASTA(parts[i]) );
            }
        
        
        return parsed_parts;
    }

function get_uniprot(protein, callback)
    {
        var url = 'http://www.uniprot.org/uniprot/'
            + protein
            + '.fasta';

        
        request.get(url, function(err, res)
            {
                var lines = res.body.split('\n');
        
                callback( protein, [lines[0], lines.slice(1).join('').replace(/[\r|\n]/g, '') ] );
            });
    }

function reverse_comp(dna)
    {
        var rev_comp = new Array(dna.length);
        for(i = 0; i < dna.length; i++)
            {
                rev_comp[i] = REVERSE[ dna[i] ];
            }

        return rev_comp.reverse().join('');
    }

function encode_RNA(rna)
    {
        var text = '';
        
        for(var i = 0; i < rna.length - 3; i += 3)
            {
                var c = CODONS_RNA[ rna.substr(i, 3) ];
                c = c == 'Stop' ? '\n' : c;
                
                text += c;
            }

        return text;
    }

function encode_DNA(dna)
    {
        var text = '';
        
        for(var i = 0; i < dna.length - 3; i += 3)
            {
                var c = CODONS_DNA[ dna.substr(i, 3) ];
                c = c == 'Stop' ? '\n' : c;
                
                text += c;
            }

        return text;
    }