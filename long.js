/**************
* Rosalind 24
**************/
var util = require('./util.js');


var dataset = util.read_FASTA('./datasets/rosalind_long.txt')
    .map( (arr) => arr[1] );

var half = Math.ceil( dataset[0][1].length / 2 );

for(var i = 0; i < dataset.length; i++)
    {
        var adn     = dataset[i];
        var strings = dataset.slice();
        
        strings.splice(i, 1);
        
        for(var j = 0; strings.length; j++)
            {
                
            }
    }