/******************************************************************************
* Title  : Enumerating Oriented Gene Orderings
*
* Given  : A positive integer n<=6.
*
* Return : The total number of signed permutations of length n,
*          followed by a list of all such permutations
*          (you may list the signed permutations in any order).
*
* URL    : http://rosalind.info/problems/sign/
*******************************************************************************/
var gen = require('./gen.js');

var res_n = 0;


function get_perm(arr, pos)
    {
        var target = arr.slice();
        var perm   = gen.permutation(arr.slice());
        
        var perm_arr    = [];
        
        res_n++;
        pos--;
        
        perm_arr.push(target.slice());
        
        for(var i = 2; i < pos; i++)
            {
                var p = perm.next();
                
                res_n++;
                perm_arr.push( p.slice() );
            }
        
        return perm_arr;
    }


var first = [1, 2, 3];
var len = first.length;
var pad = '0'.repeat(len);

var pos     = Math.pow(2, len);
var bin_map = { '1': -1, '0': 1 };


for(var i = 0; i < pos; i++)
    {
        var bin = i.toString(2);
        bin = pad.substr(bin.length) + bin;
        
        
        var tmp = first.slice();
        
        for(var j = 0; j < tmp.length; j++)
            {
                tmp[j] *= bin_map[ bin[j] ];
            }
        
        var perm = get_perm(tmp, pos);
        
        for(var j = 0; j < perm.length; j++) { console.log( perm[j].join(' ') ); }
    }

console.log(res_n);