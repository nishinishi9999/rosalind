/**************
* Rosalind 25
**************/
var util = require('./util.js');


var dataset = util.read_FASTA('./datasets/rosalind_pmch.txt')
    .map( (arr) => arr[1] )
    .join('');

var res = 0;


function get_graph(set)
    {
        var bp    = { 'A': 'U', 'U': 'A', 'C': 'G', 'G': 'C' };
        var graph = [];
        
        for(var i = 0; i < set.length; i++)
            {
                graph[i] = [];
                
                for(var j = 0; j < set.length; j++)
                    {
                        if(i != j && set[j] == bp[ set[i] ])
                            {
                                graph[i].push(j);
                            }
                    }
            }
        
        return graph;
    }

function get_pos(graph, pairs)
    {
        var res = 1;
        var len = graph.length;
        
        for(var i = 0; i < len; i++)
            {
                var n = pairs[i];
                
                for(var j = i+1; j < len; j++)
                    {
                        if(graph[j].includes(pairs[i]))
                            {
                                graph[j][ graph[j].indexOf(pairs[i]) ] = false;
                            }
                    }
            }
        
        for(var i = 0; i < len; i++)
            {
                var pair = pairs[i];
                
                if( graph[i] )
                    {
                        graph[pair] = false;
                    }
            }
        
        graph = graph.filter( (arr) => arr != false )
            .map( (arr) => arr.filter( (arr2) => arr2 != false ) );
        
        
        for(var i = 0; i < graph.length; i++)
            {
                res *= graph[i].length;
            }
        
        return res;
    }

function search_perfect_pairs(graph, past, pairs, i)
    {
        if(past.length == graph.length)
            {
                return get_pos(graph, pairs);
            }
        
        if(past.includes(i))
            {
                var res = search_perfect_pairs(graph, past, pairs, i+1);
                if(res) { return res; }
            }
        else
            {
                for(var j = 0; j < graph[i].length; j++)
                    {
                        var pair = graph[i][j];
                        if( past.includes(pair) ) { continue; }
                        
                        pairs[i] = pair;
                        pairs[pair] = i;
                        
                        var res = search_perfect_pairs(graph, past.concat(i, pair), pairs, i+1);
                        if(res) { return res; }
                    }
            }
        
        
        return false;
    }


var graph = get_graph(dataset);

var res = search_perfect_pairs(graph, [], {}, 0);
console.log(res);