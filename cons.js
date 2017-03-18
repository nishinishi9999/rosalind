/*********************************************************************
* Title  : Consensus and Profile
*
* Given  : A collection of at most 10 DNA strings of equal
*          length (at most 1 kbp) in FASTA format.
*
* Return : A consensus string and profile matrix for the collection.
*
* URL    : http://rosalind.info/problems/cons/
*********************************************************************/
var util = require('./util.js');


function count(str, c)
    {
        var regex = new RegExp(c, 'g');
        
        var match = str.match(regex);
        
        return match != undefined ? match.length : 0;
    }

function get_cons(dna)
    {
        var A, C, G, T, c;
        
        A = count(dna, 'A');
        C = count(dna, 'C');
        G = count(dna, 'G');
        T = count(dna, 'T');
        
        
        var high = [A, C, G, T].sort( (n, m) => n < m )[0];
        
        c = high == A ? 'A'
          : high == C ? 'C'
          : high == G ? 'G'
                      : 'T';
        
        
        return [A, C, G, T, c];
    }


var dataset = util.read_FASTA('./datasets/rosalind_cons.txt');


var profile = { 'A': [], 'C': [], 'G': [], 'T': [] };
var cons    = '';

for(var j = 0; j < dataset[0][1].length; j++)
    {
        var dna = '';
        for(var i = 0; i < dataset.length; i++)
            {
                dna += dataset[i][1][j];
            }

        
        var [A, C, G, T, c] = get_cons(dna);
        
        profile.A.push(A);
        profile.C.push(C);
        profile.G.push(G);
        profile.T.push(T);
        
        cons += c;
    }


console.log(cons);
for(var key in profile)
    {
        console.log(key + ':', profile[key].join(' '));
    }