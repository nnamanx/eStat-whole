
    // Multiple Choice Question Answers
    var nQuestion = 6+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;

    // 1.1 ②, 1.2 ④, 1.3 ③, 1.4 ④, 1.5 ③, 1.6 ④
    ans[0] = 6;
    ans[1] = 2;
    ans[2] = 4;
    ans[3] = 3;
    ans[4] = 4;
    ans[5] = 3;
    ans[6] = 4;

