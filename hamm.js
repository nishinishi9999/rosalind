/**************************************************************************
* Title  : Counting Point Mutations
*
* Given  : Two DNA strings s and t of equal length (not exceeding 1 kbp).
* Return : The Hamming distance dH(s,t).
*
* URL    : http://rosalind.info/problems/hamm/
**************************************************************************/

var fs = require('fs');

var dataset = fs.readFileSync('./datasets/rosalind_hamm.txt', 'utf8')
    .replace(/\r/g, '')
    .split('\n');


var dist = 0;

for(var i = 0; i < dataset[0].length; i++)
    {
        if( dataset[0][i] != dataset[1][i] )
            {
                dist++;
            }
    }

console.log(dist);