/*********************************************************
* Title  : Calculating Protein Mass
*
* Given  : A protein string P of length at most 1000 aa.
* Return : The total weight of P.
*
* URL    : http://rosalind.info/problems/prtm/
*********************************************************/
var fs = require('fs');

var monoisotopic_mass =
    {
        'A': 71.03711,
        'C': 103.00919,
        'D': 115.02694,
        'E': 129.04259,
        'F': 147.06841,
        'G': 57.02146,
        'H': 137.05891,
        'I': 113.08406,
        'K': 128.09496,
        'L': 113.08406,
        'M': 131.04049,
        'N': 114.04293,
        'P': 97.05276,
        'Q': 128.05858,
        'R': 156.10111,
        'S': 87.03203,
        'T': 101.04768,
        'V': 99.06841,
        'W': 186.07931,
        'Y': 163.06333
    };


var dataset = fs.readFileSync('./datasets/rosalind_prtm.txt', 'utf8').trim();

var result = 0;
for(var i = 0; i < dataset.length; i++)
    {
        result += monoisotopic_mass[ dataset[i] ];
    }

console.log(result);