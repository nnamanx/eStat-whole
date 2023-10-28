    // Multiple Choice Question Answers
    var nQuestion = 12+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;
    // 7.1 ①, 7.2 ③, 7.3 ②, 7.4 ①, 7.5 ②, 7.6 ④, 7.7 ②, 7.8 ③, 7.9 ④, 7.10 ③,
    // 7.11 ④, 7.12 ②
    ans[0] = 12;
    ans[1] = 1;
    ans[2] = 3;
    ans[3] = 2;
    ans[4] = 1;
    ans[5] = 2;
    ans[6] = 4;
    ans[7] = 2;
    ans[8] = 3;
    ans[9] = 4;
    ans[10] = 3;
    ans[11] = 4;
    ans[12] = 2;

