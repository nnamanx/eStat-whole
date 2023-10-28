    // Multiple Choice Question Answers
    var nQuestion = 5+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;

    // 11.1 ①, 11.2 ②, 11.3 ②, 11.4 ④, 11.5 ②
    ans[0] = 5;
    ans[1] = 1;
    ans[2] = 2;
    ans[3] = 2;
    ans[4] = 4;
    ans[5] = 2;
