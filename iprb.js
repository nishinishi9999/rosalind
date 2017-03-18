/***********************************************************************
* Title  : Mendel's First Law
*
* Given  : Three positive integers k, m, and n, representing
*          a population containing k+m+n organisms:
*          k individuals are homozygous dominant for a factor,
*          m are heterozygous,
*          and n are homozygous recessive.
*
* Return : The probability that two randomly selected mating organisms
*          will produce an individual possessing a dominant allele
*          (and thus displaying the dominant phenotype).
           *Assume that any two organisms can mate.
*
* URL    : http://rosalind.info/problems/iprb/
************************************************************************/

var [A, B, C] = [20, 24, 18];

var population = new Array();
for(var i = 0; i < A; i++) { population.push('A'); }
for(var i = 0; i < B; i++) { population.push('B'); }
for(var i = 0; i < C; i++) { population.push('C'); }


var prob  = 0;
var total = 0;

for(var i = 0; i < population.length; i++)
    {
        for(var j = i+1; j < population.length; j++)
            {
                var organisms = [population[i], population[j]].sort();
                
                if     (organisms[0] == 'A') { prob += 4/4; }
                else if(organisms[0] == 'B') { prob += organisms[1] == 'B' ? 3/4 : 2/4; }
                
                total++;
            }
    }


prob /= total;

console.log(prob);