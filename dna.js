/************************************************************
* Title  : Counting DNA Nucleotides
*
* Given  : A DNA string s of length at most 1000 nt.
*
* Return : Four integers (separated by spaces) counting the
*          respective number of times that the symbols
*          'A', 'C', 'G', and 'T' occur in s.
*
* URL    : http://rosalind.info/problems/dna/
************************************************************/

var fs = require('fs');


var molecules =
    {
        'A': 0,
        'C': 0,
        'G': 0,
        'T': 0
    };


var dataset = fs.readFileSync('./datasets/rosalind_dna.txt', 'utf8')
    .replace(/[\r\n]/g, '');


for(var i = 0; i < dataset.length; i++)
    {
        molecules[dataset[i]]++;
    }

console.log(molecules);