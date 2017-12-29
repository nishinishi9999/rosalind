var util = require('./util.js');

var dataset = util.read_FASTA('./datasets/rosalind_tran.txt')
    .map( (arr) => arr[1] );


var transition_n   = 0;
var transversion_n = 0;

var map = { 'A': 'G', 'T': 'C', 'C': 'T', 'G': 'A' };

for(var i = 0; i < dataset[0].length; i++)
    {
        if( dataset[0][i] == dataset[1][i] ) { continue; }
        
        if( map[ dataset[0][i] ] == dataset[1][i] )
            {
                transition_n++;
            }
        else
            {
                transversion_n++;
            }
    }

var ratio = transition_n/transversion_n;
console.log(ratio);