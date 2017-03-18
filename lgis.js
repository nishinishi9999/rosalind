/**************
* Rosalind 23
**************/
var fs = require('fs');


var res_len   = 0;
var res_first = 0;


function get_sequence(arr, len, first, i, order)
    {
        var last = arr[i];
        
        if(res_len < len)
            {
                console.log(len, first, i, order);
                
                res_len   = len;
                res_first = first;
            }

        
        for(var j = i; j < arr.length; j++)
            {
                var n = arr[j];
                
                //if( ( order == 1  ? ( n > arr[i] ) : ( n > arr[i] ) ) || len == 0  )
                if( n > last )
                    {
                        if(len == 0) {  first = arr[j]; }

                        get_sequence( arr, len+1, first, j, order );
                    }
            }
    }


var dataset = fs.readFileSync('./datasets/rosalind_lgis.txt', 'utf8').split('\r\n');
var n       = dataset[0].trim();
var perm    = dataset[1].trim().split(' ').map( (n) => parseInt(n) );


get_sequence(perm, 0, 0, 0, 1);
console.log(res_len);

//res_seq_len = 0;
//get_sequence(perm, [], 0, -1);

console.log(res_first);