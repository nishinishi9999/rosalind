// Rosalind 24

//var a = '3 1 5 2 7 4 9 6 10 8'.split(' ');
//var b = '1 2 3 4 5 6 7 8 9 10'.split(' ');

//var a = '3 10 8 2 5 4 7 1 6 9'.split(' ');
//var b = '5 2 3 1 7 4 10 8 6 9'.split(' ');

var a = '8 6 7 9 4 1 3 10 2 5'.split(' ');
var b = '8 2 7 6 9 1 5 3 10 4'.split(' ');

var target = 'false false false false false false false false false false'.split(' ');

/**
1  -> 2
2  -> 4
3  -> 1
4  -> 6
5  -> 3
6  -> 8
7  -> 5
8  -> 10
9  -> 7
10 -> 9

3 1 5 2 7 4 9 6 10 8

- Set to false all numbers that are in their place
- Swap all numbers that are mutuable swappable
- Find all cases in which three numbers can be put in their place
  in three movements ( pos[a] = b, pos[b] = c, pos[c] = a, swap b with a and then a with c )
**/

function two_swap(a, b)
    {
        var found = 0;
        
        for(var i = 0; i < a.length; i++)
            {
                if(a[i] == false) { continue; }
                    
                for(var j = 0; j < a.length; j++)
                    {
                        if(b[j] == false) { continue; }
                        
                        if(a[i] == b[j] && a[j] == b[i])
                            {
                                [a[i], a[j]] = [a[j], a[i]];
                                console.log('two swap - ' + a[i] + ' <-> ' + a[j]);
                                
                                a[i] = false;
                                a[j] = false;
                                
                                found++;
                            }
                    }
            }
        
        return found;
    }

function three_swap(a, b)
    {
        var found = 0;
        
        for(var i = 0; i < a.length; i++)
            {
                if(a[i] == false) { continue; }
                
                for(var j = 0; j < a.length; j++)
                    {
                        if(a[j] == false || i == j) { continue; }
                        
                        if(a[i] == b[j])
                            {
                                for(var k = 0; k < a.length; k++)
                                    {
                                        if(a[k] == false || i == k) { continue; }
                                        
                                        if(a[j] == b[k] && a[k] == b[i])
                                            {
                                                //console.log(a);
                                                [a[i], a[j], a[k]] = [a[k], a[i], a[j]];
                                                console.log('three swap ' + a[i] + ' <- ' + a[j] + ' <- ' + a[k]);
                                                console.log('three swap ' + a[i] + ' <- ' + a[j] + ' <- ' + a[k]);
                                                
                                                found++;
                                                
                                                a[i] = false;
                                                a[j] = false;
                                                a[k] = false;
                                            }
                                        
                                    }
                            }
                    }
            }
        
        return found * 2;
    }

function one_swap(a, b)
    {
        for(var i = 0; i < a.length; i++)
            {
                for(var j = 0; j < a.length; j++)
                    {
                        if(i != j && a[i] != false && a[j] != false && a[i] == b[j])
                            {
                                [a[i], a[j]] = [a[j], a[i]];
                                console.log('one swap ' + a[j]);
                                
                                a[j] = false;
                                
                                return 1;
                            }
                    }
            }
        
        return 0;
    }


var found = 0;

for(var i = 0; i < a.length; i++)
    {
        if(a[i] == b[i])
            {
                a[i] = false;
                console.log('false');
            }
    }

while(a.join() != target.join())
    {
        found += two_swap(a, b);
        found += three_swap(a, b);
        found += one_swap(a, b);
        
        console.log(found);
        console.log('a ', a.join(' '));
        console.log('b ', b.join(' '));
        console.log('t ', target.join(' '));
        console.log();
    }


//console.log(found, a, b);