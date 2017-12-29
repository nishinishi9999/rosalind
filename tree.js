var fs = require('fs');

const dataset = fs.readFileSync('./datasets/rosalind_tree.txt', 'utf8')
    .split('\r\n');


function format_graphviz(tree)
    {
        var file = 'digraph test { node [ shape = "circle" ]; '
        
        for(var node in tree)
            {
                var to = tree[node].to;
                
                for(var i = 0; i < to.length; i++)
                    {
                        file += node + '->' + to[i] + ';';
                    }
            }
        
        file += '}';
        
        fs.writeFileSync('graph.gv', file);
    }


var node_n = dataset[0];
var tree   = {};

dataset.push('3 2', '3 10');

/*****************************
* Form tree's adjacency list
*****************************/
for(var i = 1; i < dataset.length; i++)
    {
        var [a, b] = dataset[i].split(' ');
        
        if(tree[a] == undefined) { tree[a] = { to: [b] }; }
        else                     { tree[a].to.push(b);    }
        
        if(tree[b] == undefined) { tree[b] = { to: [a] }; }
        else                     { tree[b].to.push(a);    }
    }


/***********************
* Form nodes direction
***********************/
var degree_undef = 0;

for(var node in tree)
    {
        if(tree[node].to.length == 1)
            {
                tree[node]['from'] = tree[node].to[0];
                tree[node].to = [];
                
                tree[node]['degree'] = 1;
            }
        else
            {
                tree[node]['degree'] = undefined;
                degree_undef++;
            }
    }

//console.log(tree);
/****************************************
* While all degrees are not categorized
****************************************/
while(degree_undef > 0)
    {
        /********************
        * For all the nodes
        ********************/
        NODE:
        for(var node in tree)
            {
                if(tree[node].degree != undefined) { continue; }
                
                /*************************************************
                * Count the number of undefined in to
                * If there are multiple, skip for the time being
                * If there is one, it must be its procedence
                *************************************************/
                var to         = tree[node].to;
                var to_degree  = 0;
                var undef_n    = 0;
                var undef_node = '';
                
                for(var i = 0; i < to.length; i++)
                    {
                        if( tree[ to[i] ].degree == undefined )
                            {
                                undef_node = to[i];
                                undef_n++;
                            }
                        else
                            {
                                to_degree = tree[to[i]].degree;
                            }
                    }
                
                if(undef_n > 1)
                    {
                        continue NODE;
                    }
                else if(undef_n == 0)
                    {
                        tree[node].degree = to_degree + 1;
                        tree[node]['core'] = true;
                    }
                else
                    {
                        tree[node].degree = to_degree + 1;
                        
                        /****************************
                        * Remove procedence from to
                        ****************************/
                        tree[node].from = undef_node;
                        
                        to.splice( tree[node].to.indexOf(undef_node), 1);
                    }
                        
                        
                degree_undef--;
            }
        /**
        for(var node in tree)
            {
                if(tree[node].degree == undefined)
                    {
                        var to = tree[node].to;
                        
                        tree[node].degree = tree[to[0]].degree + 1;
                        
                        for(var i = 0; i < to.length; i++)
                            {
                                tree[to[i]].from = node;
                            }                            
                        
                        degree_undef--;
                    }
            }
        **/
    }


/********************
* Get missing nodes
********************/
var missing_n = 0;

for(var i = 1; i < node_n; i++)
    {
        if( tree[i] == undefined ) { missing_n++; }
    }


format_graphviz(tree);
console.log(tree);