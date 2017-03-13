/*****************************************************
* Title  : Complementing a Strand of DNA
*
* Given  : A DNA string s of length at most 1000 bp.
* Return : The reverse complement s^c of s.
*
* URL    : http://rosalind.info/problems/revc/
*****************************************************/

var fs = require('fs');

var complement =
    {
        'A': 'T',
        'T': 'A',
        'C': 'G',
        'G': 'C'
    };


var dataset = fs.readFileSync('./datasets/rosalind_revc.txt', 'utf8').trim();

var reverse_complement = '';
for(var i = 0; i < dataset.length; i++)
    {
        reverse_complement += complement[ dataset[dataset.length-i-1] ];
    }

console.log(reverse_complement);
