/********************************************************************************
* Title  : Open Reading Frames
*
* Given  : A DNA string s of length at most 1 kbp in FASTA format.
*
* Return : Every distinct candidate protein string that can be translated from
*          ORFs of s. Strings can be returned in any order.
*
* URL    : http://rosalind.info/problems/orf/
*********************************************************************************/
var util = require('./util.js');


const START_CODON = 'ATG';
const STOP_CODONS = /TAG|TGA|TAA/;


var dna = util.read_FASTA('./datasets/rosalind_orf.txt')[1];

var dataset = [dna];
dataset.push( util.reverse_comp(dna) );

var subs = [];

for(var i = 0; i < dataset.length; i++)
    {
        for(var j = 0; j < dataset[i].length; j++)
            {
                var codon = dataset[i].substr(j, 3);
                var dna   = codon;
                
                if( codon == START_CODON )
                    {
                        for(var k = j+3; k < dataset[i].length; k += 3)
                                {
                                codon = dataset[i].substr(k, 3);
                                dna  += codon;
                                
                                if( codon.match(STOP_CODONS) )
                                    {
                                        var encode = util.encode_DNA(dna);
                                        
                                        if(!subs.includes(encode)) { subs.push(encode); }
                                        
                                        break;
                                    }
                            }
                    }
            }
    }


for(var i = 0; i < subs.length; i++)
    {
        console.log(subs[i]);
    }