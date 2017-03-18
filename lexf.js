/****************************************************************************
* Title  : Enumerating k-mers Lexicographically
*
* Given  : A collection of at most 10 symbols defining an ordered alphabet,
*          and a positive integer n (n≤10).
*
* Return : All strings of length n that can be formed from the alphabet,
*          ordered lexicographically.
*
* URL    : http://rosalind.info/problems/lexf/
****************************************************************************/
var fs = require('fs');


function permutate(arr, n)
    {
        var perm   = arr.slice();
        var offset = 0;
        
        N_LOOP:
        for(var i = 1; i < n; i++)
            {
                ARR_LOOP:
                for(var j = 0; j < arr.length; j++)
                    {
                        PERM_LOOP:
                        for(var k = 0, len = perm.length; k < len; k++)
                            {
                                if( perm[k].length == i )
                                    {
                                        perm.push( arr[j]+perm[k] );
                                    }
                            }
                    }
            }

        
        return perm;
    }


var dataset  = fs.readFileSync('./datasets/rosalind_lexf.txt', 'utf8').split('\r\n');

var alphabet = dataset[0].split(' ').sort();
var n        = dataset[1];

var perm = permutate(alphabet, n).filter( (c) => c.length == n );

console.log(perm);

fs.writeFileSync('./output.txt', perm.join('\n'));