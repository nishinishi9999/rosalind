/**********************************************************************
* Title  : Enumerating Gene Orders
*
* Given  : A positive integer n<=7.
*
* Return : The total number of permutations of length n, followed by
*          a list of all such permutations (in any order).
*
* URL    : http://rosalind.info/problems/perm/
**********************************************************************/
var gen = require('./gen.js');


var perm = gen.permutation([1, 2, 3, 4, 5, 6, 7]);

var n = '';
var pos = ['1234567'];

while(n != '7654321')
    {
        n = perm.next().join('');
        
        pos.push(n);
    }


console.log(pos.length);

for(var i = 0; i < pos.length; i++)
    {
        console.log( pos[i].split('').join(' ') );
    }