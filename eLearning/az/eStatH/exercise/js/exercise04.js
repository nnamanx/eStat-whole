    // Multiple Choice Question Answers
    var nQuestion = 8+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;

    // 4.1 ③, 4.2 ②, 4.3 ②, 4.4 ①, 4.5 ④, 4.6 ②, 4.7 ④, 4.8 ② 
    ans[0] = 8;
    ans[1] = 3;
    ans[2] = 2;
    ans[3] = 2;
    ans[4] = 1;
    ans[5] = 4;
    ans[6] = 2;
    ans[7] = 4;
    ans[8] = 2;
