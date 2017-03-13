/***********************************************************************
* Title  : Rabbits and Recurrence Relations
*
* Given  : Positive integers n≤40 and k≤5.
*
* Return : The total number of rabbit pairs that will be present after
*          n months, if we begin with 1 pair and in each generation,
*          every pair of reproduction-age rabbits produces a litter
*          of k rabbit pairs (instead of only 1 pair).
*
* URL    : http://rosalind.info/problems/fib/
***********************************************************************/

var n = 36;
var k = 1;

var A = 1;
var B = 1;


for(var i = 0; i < n; i++)
    {
        console.log(A, B);
        [A, B] = [B*k, B+A];
    }


console.log(B, A);