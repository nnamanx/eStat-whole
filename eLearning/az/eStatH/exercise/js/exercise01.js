    // Multiple Choice Question Answers
    var nQuestion = 5+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;

    // 1.1 ④,, 1.2 ②, 1.3 ②, 1.4 ③,  1.5 ① 
    ans[0] = 5;
    ans[1] = 4;
    ans[2] = 2;
    ans[3] = 2;
    ans[4] = 3;
    ans[5] = 1;
