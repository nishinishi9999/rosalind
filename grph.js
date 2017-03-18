/********************************************************************
* Title  : Overlap Graphs
*
* Given  : A collection of DNA strings in FASTA format having total
*          length at most 10 kbp.
*
* Return : The adjacency list corresponding to O3. You may return
*          edges in any order.
*
* URL    : http://rosalind.info/problems/grph/
********************************************************************/
var util = require('./util.js');


var dataset = util.read_FASTA('./datasets/rosalind_grph.txt');

var n = 3;
var adjacent = [];

for(var i = 0; i < dataset.length; i++)
    {
        for(var j = 0; j < dataset.length; j++)
            {
                var suffix = dataset[i][1].substr(-n);
                var prefix = dataset[j][1].substr(0, n);
                
                if( i != j && dataset[i][1] != dataset[j][1] && prefix == suffix )
                    {
                        adjacent.push( [ dataset[i][0], dataset[j][0] ] );
                    }
            }
    }


for(var i = 0; i < adjacent.length; i++)
    {
        console.log( adjacent[i].join(' ') );
    }