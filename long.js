/**************
* Rosalind 24
**************/
var fs   = require('fs');
var util = require('./util.js');


/************
* not 19437
************/

var dataset = util.read_FASTA('./datasets/rosalind_long.txt')
    .map( (arr) => arr[1] );

var res_str = '';
var res_len = 1000000;


const LEN     = dataset[0].length;
const HALF    = Math.ceil(LEN / 2);
const SET_LEN = dataset.length;


function can_join(str1, str2)
    {
        /*************************************************************************
        * Check every character from start to end in str1 for substring submatch
        *************************************************************************/
        for(var i = 1; i < HALF; i++)
            {
                var substr1 = str1.substr(i);
                
                /**************************************
                * Check str2 starts by str1 substring
                **************************************/
                var regex = new RegExp('^' + substr1);
                
                if( str1[i] == str2[0] && regex.test(str2))
                    {
                        return [ str1.substr(0, i) + str2, i ];
                    }
            }
        
        return [false, false];
    }

function get_data(set)
    {
        var data = {};
        
        for(var i = 0; i < set.length; i++)
            {
                data[set[i]] = [];
                
                for(var j = 0; j < set.length; j++)
                    {
                        if(i == j) { continue; }
                        
                        var [substr, k] = can_join(set[i], set[j]);
                        
                        data[ set[i] ].push
                            ({
                                str   : set[j],
                                substr: substr,
                                k     : k
                            });
                    }
            }
        
        for(var key in data)
            {
                data[key] = data[key].filter( (json) => json.substr != false )
                data[key].sort( (a, b) => a.k - b.k );
            }
        
        return data;
    }

function find_shortest(data, str, prev, past)
    {
        if(past.length == SET_LEN)
            {
                console.log('res', str, str.length);
                //fs.writeFileSync('./result.txt', res_str);
                
                return true;
            }
        
        for(var i = 0; i < data[prev].length; i++)
            {
                if( past.includes( data[prev][i].str ) ) { continue; }
                
                /********************************************************************
                * Join str substr from 0 to k of the last string to the next string
                ********************************************************************/
                var tmp_str = str.substr(0, str.length - (LEN-data[prev][i].k) ) + data[prev][i].str;
                
                if(tmp_str.length < res_len)
                    {
                        var tmp_prev = data[prev][i].str;
                        
                        var ret = find_shortest(data, tmp_str, tmp_prev, past.concat(tmp_prev));
                        if(ret) { return true; }
                    }
            }
        
        return false;
    }


var data = get_data(dataset);

for(var key in data) { find_shortest(data, key, key, [key]); }