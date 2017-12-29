var gen = require('./gen.js');

var perm = gen.permutation([1, 2, 3, 4, 5, 6, 7, 8, 9]);

for(var i = 1; i < perm.pos; i++)
    {
        console.log(perm.next());
    }