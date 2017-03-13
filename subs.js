/*******************************************************************
* Title  : Finding a Motif in DNA
*
* Given  : Two DNA strings s and t (each of length at most 1 kbp).
* Return : All locations of t as a substring of s.
*
* URL    : http://rosalind.info/problems/subs/
*******************************************************************/

var fs = require('fs');


var dataset = fs.readFileSync('./datasets/rosalind_subs.txt', 'utf8')
    .replace(/\r/, '')
    .split('\n');


var pos = [];

MAIN_LOOP:
for(var i = 0; i < dataset[0].length - dataset[1].length + 1; i++)
    {
        for(var j = 0; j < dataset[1].length; j++)
            {
                if( dataset[0][i+j] != dataset[1][j] )
                    {
                        continue MAIN_LOOP;
                    }
            }
        
        
        pos.push(i+1);
    }

console.log( pos.join(' ') );