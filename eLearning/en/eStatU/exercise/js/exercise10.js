    // Multiple Choice Question Answers
    var nQuestion = 10+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;

    // 10.1 ③, 10.2 ①, 10.3 ①, 10.4 ④, 10.5 ④, 10.6 ②, 10.7 ②,10.8 ③, 10.9 ④, 10.10 ④, 
    ans[0] = 10;
    ans[1] = 3;
    ans[2] = 1;
    ans[3] = 1;
    ans[4] = 4;
    ans[5] = 4;
    ans[6] = 2;
    ans[7] = 2;
    ans[8] = 3;
    ans[9] = 4;
    ans[10] = 4;
