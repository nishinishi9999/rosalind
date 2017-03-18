/*************************************************************************
* Title  : Finding a Protein Motif
*
* Given  : At most 15 UniProt Protein Database access IDs.
*
* Return : For each protein possessing the N-glycosylation motif, output
*          its given access ID followed by a list of locations in the
*          protein string where the motif can be found.
*
* URL    : http://rosalind.info/problems/mprt/
*************************************************************************/
var fs   = require('fs');
var $    = require('jquery');
var util = require('./util.js');


var n_glycosylation = /N[^P][ST][^P]/g;


function process(name, data)
    {
        var sub_len = 4;
        var pos     = [];
        
        var parts = data[1].split( n_glycosylation );
        
        for(var i = 0; i < data[1].length - sub_len; i++)
            {
                if( data[1].substr(i, 4).match(n_glycosylation) )
                    {
                        pos.push(i+1);
                    }
            }

        
        if(pos[0])
            {
                console.log(name);
                console.log(pos.join(' '));
            }
    }



var dataset = fs.readFileSync('./datasets/rosalind_mprt.txt', 'utf8').split('\r\n');

for(var i = 0; i < dataset.length; i++)
    {
        util.get_uniprot(dataset[i], process);
    }