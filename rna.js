/*****************************************************
* Title  : Transcribing DNA into RNA
*
* Given  : A DNA string s of length at most 1000 bp.
* Return : The reverse complement s^c of s.
*
* URL    : http://rosalind.info/problems/rna/
*****************************************************/

var fs = require('fs');


var dataset = fs.readFileSync('./datasets/rosalind_rna.txt', 'utf8').trim();

dataset = dataset.replace(/T/g, 'U');

console.log(dataset);