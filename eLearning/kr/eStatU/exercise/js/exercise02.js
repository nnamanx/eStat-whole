    // Multiple Choice Question Answers
    var nQuestion = 5+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;

    // 2.1 ②, 2.2 ③, 2.3 ①, 2.4 ②, 2.5 ④
    ans[0] = 5;
    ans[1] = 2;
    ans[2] = 3;
    ans[3] = 1;
    ans[4] = 2;
    ans[5] = 4;

