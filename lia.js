/**************
* Rosalind 15
**************/
var gen = require('./gen.js');


const DEF_GEN= 'AaBb';


function monohybrid_cross(a, b)
    {
        var genotype = [];
        var prob     = {};
        
        genotype.push( [a[0],b[0]], [a[0],b[1]], [a[1],b[0]], [a[1],b[1]] );
        
        
        /**
        * Sort genotypes and count them
        **/
        for(var i = 0; i < genotype.length; i++)
            {
                var sort_gen = genotype[i].sort().join('');
                
                prob[sort_gen] = prob[sort_gen] == undefined ? 1 : prob[sort_gen] + 1;
            }
        
        /**
        * Get the fraction of each genotype
        **/
        for(var key in prob) { prob[key] = prob[key]/4; }
        
        
        return prob;
    }

function dihybrid_cross(aabb_1, aabb_2)
    {
        var prob_a;
        
        /**
        * Calculate a probabilities
        **/
        var a = [ aabb_1[0]+aabb_1[1], aabb_2[0]+aabb_2[1] ];
        var a_prob = monohybrid_cross(a[0], a[1]);
        
        /**
        * Calculate b probabilities
        **/
        var b = [ aabb_1[2]+aabb_1[3], aabb_2[2]+aabb_2[3] ];
        var b_prob = monohybrid_cross(b[0], b[1]);
        
        
        /**
        * Calculate total probabilities
        **/
        var prob = {};
        
        for(var key_a in a_prob)
            {
                for(var key_b in b_prob)
                    {
                        var genotype = key_a + key_b;
                        
                        prob[genotype] = prob[genotype] == undefined
                            ? ( a_prob[key_a] * b_prob[key_b] )
                            : ( prob[genotype] + a_prob[key_a] * b_prob[key_b] );
                    }
            }
        
        
        return prob;
    }


function gen_prob(k, N)
    {
        var current_gen = {};
        var total = {};
        
        /**
        * First generation
        **/
        var prev_gen = dihybrid_cross(DEF_GEN, DEF_GEN);
        if(k == 1) { return prev_gen; }
        
        
        for(var i = 1; i < k; i++)
            {
                var total = {};
                
                /**
                * Get all posibilities
                **/
                for(var parent in prev_gen)
                    {
                        /**
                        * Get genotype probabilities
                        **/
                        var prob_gen = dihybrid_cross(parent, DEF_GEN);
                        
                        /**
                        * Multiply each generation by the previous one's probability
                        **/
                        for(var gen in prob_gen)
                            {
                                if(total[gen] == undefined) { total[gen] = 0; }
                                
                                total[gen] += prob_gen[gen] * prev_gen[parent];
                            }
                        
                    }
                
                
                [prev_gen, current_gen] = [total, {}];
            }
        
        
        return total;
    }


var total = gen_prob(2);
console.log(total);