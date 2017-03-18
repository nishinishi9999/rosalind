/*************************************************************************
* Title  : RNA Splicing
*
* Given  : A DNA string s (of length at most 1 kbp) and a collection
*          of substrings of s acting as introns. All strings are
*          given in FASTA format.
*
* Return : A protein string resulting from transcribing and translating
*          the exons of s. (Note: Only one solution will exist for the
*          dataset provided.)
*
* URL    : http://rosalind.info/problems/splc/
*************************************************************************/
var fs   = require('fs');
var util = require('./util.js');


var dataset = util.read_FASTA('./datasets/rosalind_splc.txt');

var dna = dataset[0][1];
for(var i = 1; i < dataset.length; i++)
    {
        dna = dna.replace( dataset[i][1], '' );
    }

var encode = util.encode_DNA(dna);

console.log(encode);