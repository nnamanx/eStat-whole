    // Multiple Choice Question Answers
    var nQuestion = 10+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;

    // 8.1 ④, 8.2 ①, 8.3 ②, 8.4 ④, 8.5 ②, 8.6 ②, 8.7 ④, 8.8 ①, 8.9 ①, 8.10 ②,
    ans[0] = 10;
    ans[1] = 4;
    ans[2] = 1;
    ans[3] = 2;
    ans[4] = 4;
    ans[5] = 2;
    ans[6] = 2;
    ans[7] = 4;
    ans[8] = 1;
    ans[9] = 1;
    ans[10] = 2;
