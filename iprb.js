/**************
* Rosalind 10
**************/

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