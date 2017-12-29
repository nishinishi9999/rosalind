/****************************************************************
* Title  : Ordering Strings of Varying Length Lexicographically
*
* Given  : A permutation of at most 12 symbols defining an
*          ordered alphabet A and a positive integer n (n<=4).
*
* Return : All strings of length at most n formed from A,
*          ordered lexicographically.
*
* URL    : http://rosalind.info/problems/lexv/
****************************************************************/
var fs = require('fs');


var A   = 'UIJKOGDYQSRV'.split('');


function get_lexographical_pos(pos, str, i)
    {
        pos.push(str);
        
        if(str.length == i)
            {
                return;
            }
        
        for(var j = 0; j < A.length; j++)
            {
                get_lexographical_pos(pos, str+A[j], i);
            }
        
        return pos;
    }


var pos = get_lexographical_pos([], '', 3);
console.log(pos);
//fs.writeFileSync( './output.txt', res.join('\r\n') );