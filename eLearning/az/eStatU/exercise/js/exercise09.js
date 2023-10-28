    // Multiple Choice Question Answers
    var nQuestion = 12+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;

    // 9.1 ③, 9.2 ①, 9.3 ③, 9.4 ②, 9.5 ③, 9.6 ①, 9.7 ①, 9.8 ④, 9.9 ④, 9.10 ①, 9.11 ④, 9.12 ④
    ans[0] = 12;
    ans[1] = 3;
    ans[2] = 1;
    ans[3] = 3;
    ans[4] = 2;
    ans[5] = 3;
    ans[6] = 1;
    ans[7] = 1;
    ans[8] = 4;
    ans[9] = 4;
    ans[10] = 1;
    ans[11] = 4;
    ans[12] = 4;
