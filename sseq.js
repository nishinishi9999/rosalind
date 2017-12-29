/************************************************************************************
* Title  : Finding a Spliced Motif
*
* Given  : Two DNA strings s and t (each of length at most 1 kbp) in FASTA format.
*
* Return : One collection of indices of s in which the symbols of t appear as
*          a subsequence of s. If multiple solutions exist, you may return any one.
*
* URL    : http://rosalind.info/problems/sseq/
************************************************************************************/
var util = require('./util.js');

var dataset = util.read_FASTA('./datasets/rosalind_sseq.txt')
    .map( (arr) => arr[1] );

var [s, t] = dataset;


var pos = 0;
var res = [];

for(var i = 0; i < s.length; i++)
    {
        if(s[i] == t[pos])
            {
                pos++;
                i++;
                
                res.push(i);
                
                if(t[pos] == undefined) { break; }
            }
    }

console.log( res.join(' ') );