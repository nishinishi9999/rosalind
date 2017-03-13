/***************************************************************
* Title  : Computing GC Content
*
* Given  : At most 10 DNA strings in FASTA format
*          (of length at most 1 kbp each).
*
* Return : The ID of the string having the highest GC-content,
*          followed by the GC-content of that string.
*
* URL    : http://rosalind.info/problems/gc/
***************************************************************/

var fs = require('fs');


var dataset = fs.readFileSync('./datasets/rosalind_gc.txt', 'utf8').split(/>/);


var name_res       = '';
var percentage_res = 0;

for(var i = 1; i < dataset.length; i++)
    {
        var parts = dataset[i].replace(/[\r\n]/g, '').match(/^(Rosalind_\d+)(.+)/);
        
        var name   = parts[1];
        var dna    = parts[2];
        var length = dna.length;
        var gc     = dna.match(/G|C/g).length;
        
        if( percentage_res < gc*100/length )
            {
                percentage_res = gc*100/length;
                name_res       = name;
            }
    }

console.log(name_res);
console.log(percentage_res);