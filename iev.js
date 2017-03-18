/******************************************************************************
* Title  : Calculating Expected Offspring
*
* Given  : Six positive integers, each of which does not exceed 20,000.
*
* Return : The expected number of offspring displaying the dominant phenotype
*          in the next generation, under the assumption that every couple has
*          exactly two offspring.
*
* URL    : http://rosalind.info/problems/iev/
*******************************************************************************/
var fs = require('fs');

var prob =
    {
        0: 4/4,
        1: 4/4,
        2: 4/4,
        3: 3/4,
        4: 2/4,
        5: 0/4
    };


var population = fs.readFileSync('./datasets/rosalind_iev.txt', 'utf8').split(' ');


var result = 0;

for(var i = 0; i < 6; i++)
    {
        result += prob[i] * population[i] * 2;
    }

console.log(result);