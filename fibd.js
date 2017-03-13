/*************
* Rosalind 8
*************/

var mathjs = require('mathjs');

mathjs.config
    ({
        precision: 1000,
        number: 'BigNumber'
    });


var n = 90;
var m = 17;

var rabbits = new Array(m).fill( mathjs.bignumber(0) );
rabbits[0]  = rabbits[0].add(1);


for(var i = 0; i < n-1; i++)
    {
        var temp = mathjs.bignumber(0);
        
        for(var j = 1; j < m; j++)
            {
                temp = temp.add(rabbits[j]);
            }
        
        for(var j = 0; j < m; j++)
            {
                [ temp, rabbits[j] ] = [ rabbits[j], temp ];
            }
    }


var result = mathjs.bignumber(0);
for(var i in rabbits) { result = result.add( rabbits[i] ); }

console.log(result.d.join(''));