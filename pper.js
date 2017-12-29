var pos = 0;

function get_lexographical_pos(str, A, i)
    {
        if(str.length == i)
            {
                console.log(str);
                pos++;
                return;
            }
        
        for(var j = 0; j < A.length; j++)
            {
                if(str.includes(A[j])) { return; }
                
                get_lexographical_pos(str+A[j], A, i);
            }
    }

get_lexographical_pos('', 'ABCDEEFGHIJKLMNOPQRST'.split(''), 7);

console.log(pos);