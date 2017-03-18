/*****************************************************
* Title  : Translating RNA into Protein
*
* Given  : An RNA string s corresponding to a strand
*          of mRNA (of length at most 10 kbp).
*
* Return : The protein string encoded by s.
*
* URL    : http://rosalind.info/problems/prot/
*****************************************************/

var fs = require('fs');


var codons =
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


var dataset = fs.readFileSync('./datasets/rosalind_prot.txt', 'utf8').trim();
var protein = '';

for(var i = 0; i < dataset.length; i += 3)
    {
        var codon = dataset.substr(i, 3);
        
        protein += codons[codon] == 'Stop' ? '\n' : codons[codon];
    }

console.log(protein);