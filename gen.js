/**********************
* Generator functions
**********************/

function Gen()
    {
        this.fib = fib;
        
        this.permutation = permutation;
    }

module.exports = new Gen();


function fib(k)
    {
        var A = 1;
        var B = 0;
        
        function _fib_gen()
            {
                [A, B] = [A+B, A*k];
                
                return [A, B, A+B];
            }

        
        return { 'next': _fib_gen };
    }

function permutation(arr)
    {
        var len = arr.length;

        var pos = 1;
        for(var i = 1; i <= len; i++)
            {
                pos *= i;
            }
        
        
        function _has_inverse_order(arr, offset)
            {
                for(var i = offset; i < arr.length; i++)
                    {
                        if(arr[i] <= arr[i+1]) { return false; }
                    }

                return true;
            }
        
        function _set_lexicographic_order(arr, offset)
            {
                var sub_arr = [];

                for(var i = offset; i < arr.length; i++)
                    {
                        sub_arr.push(arr[i]);
                    }

                sub_arr.sort( (a, b) => a-b );

                for(var i = offset, j = 0; i < arr.length; i++, j++)
                    {
                        arr[i] = sub_arr[j];
                    }
            }

        
        function _lowest_possible(arr, offset)
            {
                var n     = arr[offset];
                var lowest = 100;

                for(var i = offset; i < arr.length; i++)
                    {
                        /***********************************************
                        * It is closer to n if its rest is closer to 0
                        ***********************************************/
                        if( n < arr[i] && n-arr[i] > n-lowest )
                            {
                                lowest = arr[i];
                            }
                    }

                return lowest == 100 ? false : lowest;
            }

        
        function _swap(arr, offset)
            {
                var n      = arr[offset];
                var lowest = _lowest_possible(arr, offset);

                if(lowest == false) { return false; }

                for(var i = 0; i < arr.length; i++)
                    {
                        if(arr[i] == lowest) { arr[i] = n; }
                        else if(arr[i] == n) { arr[i] = lowest; }
                    }
            }

        
        function permutate()
            {
                for(var offset = 0; offset < len; offset++)
                    {
                        if( _has_inverse_order(arr, offset) )
                            {
                                _swap(arr, offset-1);
                                _set_lexicographic_order(arr, offset);
                                
                                return arr;
                            }
                    }
            }


        return { 'next': permutate, 'pos': pos };
    }