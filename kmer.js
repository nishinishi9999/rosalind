/***************************************************************************
* Title  : k-Mer Composition
*
* Given  : A DNA string s in FASTA format (having length at most 100 kbp).
*
* Return : The 4-mer composition of s.
*
* URL    : http://rosalind.info/problems/kmer/
***************************************************************************/
var util = require('./util.js');


const A = 'ACGT'.split('');

const kmer = util.get_lexographical_pos('', A, [], 4)
    .filter( (s) => s.length == 4 );

const dataset = util.read_FASTA('./datasets/rosalind_kmer.txt')
    .map( (arr) => arr[1] )[0];


var res = [];

for(var i = 0; i < kmer.length; i++)
    {
        var regex = new RegExp('(?=(' + kmer[i] + '))', 'g');
        var match = dataset.match(regex);
        
        res.push( match == undefined ? 0: match.length );
    }

console.log( res.join(' ') );