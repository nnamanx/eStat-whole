
    // Multiple Choice Question Answers
    var nQuestion = 5+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;

    // 3.1 ②, 3.2 ③, 3.3 ④, 3.4 ③, 3.5 ①
    ans[0] = 5;
    ans[1] = 2;
    ans[2] = 3;
    ans[3] = 4;
    ans[4] = 3;
    ans[5] = 1;
