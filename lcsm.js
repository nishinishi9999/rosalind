/***********************************************************
* Title  : Finding a Shared Motif
*
* Given  : A collection of k (k≤100) DNA strings of length
*          at most 1 kbp each in FASTA format.
*
* Return : A longest common substring of the collection.
*
* URL    : http://rosalind.info/problems/lcsm/
***********************************************************/
var util = require('./util.js');

var dataset = util.read_FASTA('./datasets/rosalind_lcsm.txt');

var substrings = [];

for(var i = 0, len = dataset[0][1].length; i < len; i++)
    {
        SUBSTR_LOOP:
        for(var j = 0; j < len; j++)
            {
                var sub = dataset[0][1].substr(i, j);
                
                for(var a = 1; a < dataset.length; a++)
                    {
                        if( !dataset[a][1].match(sub) )
                            {
                                continue SUBSTR_LOOP;
                            }
                    }

                
                substrings.push(sub);
            }
    }


var longest = substrings.sort( (sub_1, sub_2) => sub_2.length - sub_1.length )[0];

console.log(longest);