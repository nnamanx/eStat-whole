      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth2   = 600;
      svgHeight2  = 400;

      var i, j, k, mm, nobs, nrow, df, info, stat, pvalue, alpha, f, g, h; 
      var gxmin, gxmax, gymin, gymax, title, temp;
      var hypoType = 9;
      var h1Type   = 2;
      var nr = 10;
      var obsF = new Array(nr);
      var expP = new Array(nr);
      var expF = new Array(nr);
      var checkExecute = false;
      document.getElementById("alpha2").disabled = true;  
      document.getElementById("data13").disabled = true;
      document.getElementById("data23").disabled = true;
      document.getElementById("data33").disabled = true;
      document.getElementById("data43").disabled = true;
      document.getElementById("data53").disabled = true;
      document.getElementById("data63").disabled = true;
      document.getElementById("data73").disabled = true;
      document.getElementById("data83").disabled = true;
      document.getElementById("data93").disabled = true;
      document.getElementById("data101").disabled = true;
      document.getElementById("data102").disabled = true;
      document.getElementById("data103").disabled = true;

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("mm").value = "0";
        document.getElementById("data11").value = "";
        document.getElementById("data12").value = "";
        document.getElementById("data13").value = "";
        document.getElementById("data21").value = "";
        document.getElementById("data22").value = "";
        document.getElementById("data23").value = "";
        document.getElementById("data31").value = "";
        document.getElementById("data32").value = "";
        document.getElementById("data33").value = "";
        document.getElementById("data41").value = "";
        document.getElementById("data42").value = "";
        document.getElementById("data43").value = "";
        document.getElementById("data51").value = "";
        document.getElementById("data52").value = "";
        document.getElementById("data53").value = "";
        document.getElementById("data61").value = "";
        document.getElementById("data62").value = "";
        document.getElementById("data63").value = "";
        document.getElementById("data71").value = "";
        document.getElementById("data72").value = "";
        document.getElementById("data73").value = "";
        document.getElementById("data81").value = "";
        document.getElementById("data82").value = "";
        document.getElementById("data83").value = "";
        document.getElementById("data91").value = "";
        document.getElementById("data92").value = "";
        document.getElementById("data93").value = "";
        document.getElementById("data101").value = "";
        document.getElementById("data102").value = "";
        document.getElementById("data103").value = "";
        document.getElementById("alpha").value  = "0.05";
        document.getElementById("alpha2").value = "0.05";
     })

      // Testing Hypothesis ======================================
      d3.select("#executeTH8").on("click",function() {
        checkExecute = true;
        // alpha
        alpha = parseFloat(d3.select("#alpha").node().value);
        if (alpha < 0.001) {
          alpha = 0.001;
          document.getElementById("alpha").value = alpha;
        }
        else if (alpha > 0.499) {
          alpha = 0.499;
          document.getElementById("alpha").value = alpha;
        }
        document.getElementById("alpha2").value = alpha;
        document.getElementById("rangeAlpha").value = alpha*1000;

        // input value
        mm      = parseFloat(d3.select("#mm").node().value);
        obsF[1] = parseFloat(d3.select("#data11").node().value);
        expP[1] = parseFloat(d3.select("#data12").node().value);
        obsF[2] = parseFloat(d3.select("#data21").node().value);
        expP[2] = parseFloat(d3.select("#data22").node().value);
        obsF[3] = parseFloat(d3.select("#data31").node().value);
        expP[3] = parseFloat(d3.select("#data32").node().value);
        obsF[4] = parseFloat(d3.select("#data41").node().value);
        expP[4] = parseFloat(d3.select("#data42").node().value);
        obsF[5] = parseFloat(d3.select("#data51").node().value);
        expP[5] = parseFloat(d3.select("#data52").node().value);
        obsF[6] = parseFloat(d3.select("#data61").node().value);
        expP[6] = parseFloat(d3.select("#data62").node().value);
        obsF[7] = parseFloat(d3.select("#data71").node().value);
        expP[7] = parseFloat(d3.select("#data72").node().value);
        obsF[8] = parseFloat(d3.select("#data81").node().value);
        expP[8] = parseFloat(d3.select("#data82").node().value);
        obsF[9] = parseFloat(d3.select("#data91").node().value);
        expP[9] = parseFloat(d3.select("#data92").node().value);

        // 관찰도수 입력한 행의 수 카운트
        nrow = 0;
        for (i=1; i<nr; i++) {
          if ( !isNaN(obsF[i]) ) nrow++;
        }
        // 입력행은 하나 이상 체크
        if (nrow < 2 ) {
          bar.append("text").attr("class","mean").attr("x", 250).attr("y", 100)
             .text("At least two rows are required !!   Try again.").style("stroke","red");
          return;
        }
        // 최종 입력행 전에 빈칸 있나 체크
        for (i=1; i<=nrow; i++) {
            if (isNaN(obsF[i]) || isNaN(expP[i])) {
              bar.append("text").attr("class","mean").attr("x", 250).attr("y", 100)
                 .text("No input or wrong input !!   Try again.").style("stroke","red");
              return;
            }
        }
        testingGoodnessFit();
      })

      // svg Graph Save
      d3.select("#saveGraphU").on("click", function() {
        var svg = d3.select("#chart");
        var width = svgWidth2;
        var height = svgHeight2;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });
// goodness of fit test
function testingGoodnessFit() {
        bar.selectAll("*").remove();
        // 입력값 합계 => 기대도수 계산
        obsF[0] = 0;
        expP[0] = 0;
        for (i=1; i<=nrow; i++) { 
            obsF[0] += obsF[i];
            expP[0] += expP[i];
        }
        // 기대확률값이 0.99보다 작으면 경고
            if (expP[0] < 0.99) {
              bar.append("text").attr("class","mean").attr("x", 250).attr("y", 100)
                 .text("Expecte Probability < 0.99!   Try again.").style("stroke","red");
              return;
            }
        // 기대도수 계산
        expF[0] = 0;
        for (i=1; i<=nrow; i++) { 
            expF[i] = obsF[0]*expP[i];
            expF[0] += expF[i];
            temp = "data"+(i).toString()+"3";
            document.getElementById(temp).value = f2(expF[i]);
        }
        document.getElementById("data101").value = f0(obsF[0]);
        document.getElementById("data102").value = f3(expP[0]);
        document.getElementById("data103").value = f2(expF[0]);
        // test statistics
        df = nrow - mm - 1;
        stat = 0;
        for (i=1; i<=nrow; i++) {
            temp = obsF[i] - expF[i];
            stat += temp * temp / expF[i];
        }

        // chisq-test
            h = alpha;  
            if (df < 10) f = 0;
            else f = chisq_inv(0.0001, df, info);
            g = chisq_inv(1-h, df, info);
            pvalue = 1 - chisq_cdf(stat, df, info)
            drawChisqGraphTH(hypoType, h1Type, stat, df, f, g, h, pvalue, temp );
}         
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingGoodnessFit();
} 

