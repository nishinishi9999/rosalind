/****************************************************************************
* Title  : Inferring mRNA from Protein
*
* Given  : A protein string of length at most 1000 aa.
*
* Return : The total number of different RNA strings from which the protein
*          could have been translated, modulo 1,000,000.
*
* URL    : http://rosalind.info/problems/mrna/
*****************************************************************************/
var fs   = require('fs');
var util = require('./util.js');


var codons = util.codons;


var reverse_codons = {};
for(var key in codons)
    {
        reverse_codons[ codons[key] ] = reverse_codons[ codons[key] ] == undefined
            ? 1
            : reverse_codons[ codons[key] ] + 1;
    }

    
var dataset = fs.readFileSync('./datasets/rosalind_mrna.txt', 'utf8').replace(/\r/g, '');


var pos = 1;

for(var i = 0; i < dataset.length; i++)
    {
        var aa = dataset[i] == '\n' ? 'Stop' : dataset[i];
        
        pos *= reverse_codons[aa];
        pos %= 1000000;
    }


console.log(pos);