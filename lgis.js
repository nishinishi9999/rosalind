/********************************************************************************
* Title  : Longest Increasing Subsequence
*
* Given  : A positive integer n<=10000 followed by a permutation π of length n.
*
* Return : A longest increasing subsequence of π, followed by
*          a longest decreasing subsequence of π.
*
* URL    : http://rosalind.info/problems/lgis/
********************************************************************************/
var fs = require('fs');

var dataset = fs.readFileSync('./datasets/rosalind_lgis.txt', 'utf8')
    .split('\r\n');

var N = dataset[0].trim();
var D = dataset[1].trim().split(' ').map( (n) => parseInt(n) );


//D = [1, 3, 8, 7, 4, 6, 8, 2, 5];

var high_n  = {};
var low_n   = {};


/**
* for all n from len to 0
*   for all m from n to len
*       if m > n
*           if highest < m
*               highest = m
*           else
*       else
*
*    high_n[m] = highest+1
**/


for(var i = D.length-1; i >= 0; i--)
    {
        var seq = [];
        
        for(var j = i+1; j < D.length; j++)
            {
                if( D[j] > D[i] && high_n[D[j]].length > seq.length )
                    {
                        seq = high_n[ D[j] ];
                    }
            }
        
        high_n[D[i]] = [D[i]].concat(seq);
    }

for(var i = D.length-1; i >= 0; i--)
    {
        var seq = [];
        
        for(var j = i+1; j < D.length; j++)
            {
                if( D[j] < D[i] && low_n[D[j]].length > seq.length )
                    {
                        seq = low_n[ D[j] ];
                    }
            }
        
        low_n[D[i]] = [D[i]].concat(seq);
    }

var ascending_seq  = high_n[ Object.keys(high_n).sort( (n, m) => high_n[m].length - high_n[n].length )[0] ];
var descending_seq = low_n[ Object.keys(low_n).sort( (n, m) => low_n[m].length - low_n[n].length )[0] ];


//find_longest_seq([], -1);
console.log('ascending', ascending_seq.join(' '));
console.log('descending', descending_seq.join(' '));