    // Multiple Choice Question Answers
    var nQuestion = 5+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;
    // 3.1 ④, 3.2 ②, 3.3 ③, 3.4 ④, 3.5 ①
    ans[0] = 5;
    ans[1] = 4;
    ans[2] = 2;
    ans[3] = 3;
    ans[4] = 4;
    ans[5] = 1;
