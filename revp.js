/**********************************************************************
* Title  : Locating Restriction Sites
*
* Given  : A DNA string of length at most 1 kbp in FASTA format.
*
* Return : The position and length of every reverse palindrome in the
*          string having length between 4 and 12. You may return
*          these pairs in any order.
*
* URL    : http://rosalind.info/problems/revp/
**********************************************************************/

var fs = require('fs');


var complement =
    {
        'A': 'T',
        'T': 'A',
        'C': 'G',
        'G': 'C'
    };

function reverse_comp(dna)
    {
        var reverse_complement = '';
        
        for(var i = 0; i < dna.length; i++)
            {
                reverse_complement += complement[ dna[dna.length-i-1] ];
            }

        return reverse_complement;
    }


var dataset = fs.readFileSync('./datasets/rosalind_revp.txt', 'utf8')
    .replace(/[\r\n]/g, '')
    .split(/>/)
    .filter( (line) => line != '' )
    .map   ( (line) => line.match(/^(Rosalind_\d+)(\w+)/).splice(1, 2) );

dataset = dataset[0][1];


var pos = [];

for(var i = 0; i < dataset.length; i++)
    {
        for(var j = 2; j < dataset.length-i; j++)
            {
                var dna = dataset.substr(i, j+1);
                
                if(dna == reverse_comp(dna)) { pos.push([i+1, j+1]); }
            }
    }

console.log( pos.join('\n') );