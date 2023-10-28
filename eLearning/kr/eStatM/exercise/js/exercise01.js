    // Multiple Choice Question Answers
    var nQuestion = 4+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;

    // 1.1 ②, 1.2 ③, 1.3 ④, 1.4 ④, 
    ans[0] = 4;
    ans[1] = 2;
    ans[2] = 3;
    ans[3] = 4;
    ans[4] = 4; 
