
    // Multiple Choice Question Answers
    var nQuestion = 3+1;
    var ans   = new Array(nQuestion);
    var ansID = new Array(nQuestion);
    for (var i = 1; i < nQuestion; i++) ansID[i] = "ansQ"+i; 
    for (var i = 1; i < nQuestion; i++) document.getElementById(ansID[i]).disabled = true;

    // 2.1 ②, 2.2 ①, 2.3 ②,
    ans[0] = 3;
    ans[1] = 2;
    ans[2] = 1;
    ans[3] = 2;
