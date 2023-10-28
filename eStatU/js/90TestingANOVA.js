      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth2   = 600;
      svgHeight2  = 400;

      var nobs, gxmin, gxmax, gymin, gymax;
      var title;
      var i, df1, df2, info, alpha, pvalue, b, c, d, e, f, g, h;
      var ntot, mtot, ssb, ssw, msb, msw, temp; 
      var nn7   = new Array(4);
      var xbar7 = new Array(4);
      var var7  = new Array(4);
      var stat  = new Array(9);
      var tdata = new Array(4);
      var indexA= new Array(4);
      var hypoType = 7;
      var h1Type   = 2;
      var checkExecute = false;
      document.getElementById("alpha2").disabled = true;  

     // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        document.getElementById("nn71").value   = stat.n;    
        document.getElementById("xbar71").value = f2(stat.xbar);
        document.getElementById("var71").value  = f2(stat.var);    
      });
      d3.select("#data2").on("input", function() {
        stat = simplestat("#data2");   
        document.getElementById("nn72").value   = stat.n;    
        document.getElementById("xbar72").value = f2(stat.xbar);
        document.getElementById("var72").value  = f2(stat.var);    
      });
      d3.select("#data3").on("input", function() {
        stat = simplestat("#data3");   
        document.getElementById("nn73").value   = stat.n;    
        document.getElementById("xbar73").value = f2(stat.xbar);
        document.getElementById("var73").value  = f2(stat.var);    
      });
      d3.select("#data4").on("input", function() {
        stat = simplestat("#data4");   
        document.getElementById("nn74").value   = stat.n;    
        document.getElementById("xbar74").value = f2(stat.xbar);
        document.getElementById("var74").value  = f2(stat.var);    
      });

      updateData = function() {
        document.getElementById("data1").value = '';
        document.getElementById("data2").value = '';  
        document.getElementById("data3").value = '';    
        document.getElementById("data4").value = '';      
      }

      d3.select("#nn71").on("input", updateData);
      d3.select("#nn72").on("input", updateData);
      d3.select("#nn73").on("input", updateData);
      d3.select("#nn74").on("input", updateData);
      d3.select("#xbar71").on("input", updateData);
      d3.select("#xbar72").on("input", updateData);
      d3.select("#xbar73").on("input", updateData)
      d3.select("#xbar74").on("input", updateData)
      d3.select("#var71").on("input", updateData);
      d3.select("#var72").on("input", updateData);
      d3.select("#var73").on("input", updateData);
      d3.select("#var74").on("input", updateData);

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("data1").value  = "";
        document.getElementById("data2").value  = "";
        document.getElementById("data3").value  = "";
        document.getElementById("data4").value  = "";
        document.getElementById("nn71").value   = "";
        document.getElementById("nn72").value   = "";
        document.getElementById("nn73").value   = "";
        document.getElementById("nn74").value   = "";
        document.getElementById("xbar71").value = "";
        document.getElementById("xbar72").value = "";
        document.getElementById("xbar73").value = "";
        document.getElementById("xbar74").value = "";
        document.getElementById("var71").value  = "";
        document.getElementById("var72").value  = "";
        document.getElementById("var73").value  = "";
        document.getElementById("var74").value  = "";
        document.getElementById("alpha").value  = 0.05; 
        document.getElementById("alpha2").value = 0.05; 
      })

      // Testing Hypothesis ===========================================================
      d3.select("#execute").on("click",function() {
        checkExecute = true;
        // alpha
        alpha = parseFloat(d3.select("#alpha").node().value);
        if (alpha < 0.001) {
          alpha = 0.001;
          document.getElementById("alpha").value = alpha;
        }
        else if (alpha > 0.999) {
          alpha = 0.999;
          document.getElementById("alpha").value = alpha;
        }
        document.getElementById("alpha2").value = alpha;
        document.getElementById("rangeAlpha").value = alpha*1000;

        // input value
        stat = simplestat("#data1");
        if (stat.n > 0) {
          nn7[0]    = stat.n;
          xbar7[0]  = stat.xbar;
          var7[0]   = stat.var;
        }
        else {
          nn7[0]   = parseFloat(d3.select("#nn71").node().value);
          xbar7[0] = parseFloat(d3.select("#xbar71").node().value);
          var7[0]  = parseFloat(d3.select("#var71").node().value);
        }
        stat = simplestat("#data2");
        if (stat.n > 0) {
          nn7[1]    = stat.n;
          xbar7[1]  = stat.xbar;
          var7[1]   = stat.var;
        }
        else {
          nn7[1]   = parseFloat(d3.select("#nn72").node().value);
          xbar7[1] = parseFloat(d3.select("#xbar72").node().value);
          var7[1]  = parseFloat(d3.select("#var72").node().value);
        }
        stat = simplestat("#data3");
        if (stat.n > 0) {
          nn7[2]    = stat.n;
          xbar7[2]  = stat.xbar;
          var7[2]   = stat.var;
        }
        else {
          nn7[2]   = parseFloat(d3.select("#nn73").node().value);
          xbar7[2] = parseFloat(d3.select("#xbar73").node().value);
          var7[2]  = parseFloat(d3.select("#var73").node().value);
        }
        stat = simplestat("#data4");
        if (stat.n > 0) {
          nn7[3]    = stat.n;
          xbar7[3]  = stat.xbar;
          var7[3]   = stat.var;
        }
        else {
          nn7[3]   = parseFloat(d3.select("#nn74").node().value);
          xbar7[3] = parseFloat(d3.select("#xbar74").node().value);
          var7[3]  = parseFloat(d3.select("#var74").node().value);
        }

        // determine number of populations kk7
        kk7 = 0;
        if ( !isNaN(nn7[0]) && isNaN(nn7[1]) && isNaN(nn7[2]) && isNaN(nn7[3]) ) kk7 = 1;
        else if ( !isNaN(nn7[0]) && !isNaN(nn7[1]) &&  isNaN(nn7[2]) &&  isNaN(nn7[3]) ) kk7 = 2;
        else if ( !isNaN(nn7[0]) && !isNaN(nn7[1]) && !isNaN(nn7[2]) &&  isNaN(nn7[3]) ) kk7 = 3;
        else if ( !isNaN(nn7[0]) && !isNaN(nn7[1]) && !isNaN(nn7[2]) && !isNaN(nn7[3]) ) kk7 = 4;

        if (kk7 < 2 || kk7 > 4) {  // wrong input k
          bar.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
             .text("No input or wrong input of k !!   Try again.").style("stroke","red");
          return;
        }
        else if (kk7 == 2  && ( isNaN(nn7[0]) || isNaN(nn7[1]) ||
             isNaN(xbar7[0])  || isNaN(xbar7[1])  ||
             isNaN(var7[0]) || isNaN(var7[1]) ||  
             nn7[0] < 2     || nn7[1] < 2     || 
             var7[0] <= 0   || var7[1] <= 0 ) ) {  // wrong input when k = 2
          bar.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
             .text("No input or wrong input !!   Try again.").style("stroke","red")
          return;
        }
        else if (kk7 == 3   && ( isNaN(nn7[0])  || isNaN(nn7[1])  || isNaN(nn7[2]) ||
             isNaN(xbar7[0])  || isNaN(xbar7[1])  || isNaN(xbar7[2])  ||
             isNaN(var7[0]) || isNaN(var7[1]) || isNaN(var7[2]) ||
             nn7[0] < 2     || nn7[1] < 2     || nn7[2] < 2     ||
             var7[0] <= 0   || var7[1] <= 0   || var7[2] <= 0 ) ) {  // wrong input when k = 3
          bar.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
             .text("No input or wrong input !!   Try again.").style("stroke","red")
          return;
        }
        else if (kk7 == 4   && ( isNaN(nn7[0])  || isNaN(nn7[1])  || isNaN(nn7[2]) || isNaN(nn7[3]) &&
             isNaN(xbar7[0])  || isNaN(xbar7[1])  || isNaN(xbar7[2])  || isNaN(xbar7[3]) ||
             isNaN(var7[0]) || isNaN(var7[1]) || isNaN(var7[2]) || isNaN(var7[3])||
             nn7[0] < 2     || nn7[1] < 2     || nn7[2] < 2     || nn7[3] < 2    ||
             var7[0] <= 0   || var7[1] <= 0   || var7[2] <= 0   || var7[3] <= 0 ) ) {  // wrong input when k = 4
          bar.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
             .text("No input or wrong input !!   Try again.").style("stroke","red")
          return;
        }
        testingANOVA();
        // 1원분산분석표 그리기
        AnovaTable();
//        document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
      })

      // Multiple Comparison ===========================================================
      d3.select("#multipleComparison").on("click",function() {
        // LSDd=1 or HSD5%=2 or HSD1%=3
        if (document.myForm123.type4.value == "1") comparison = 1;
        else if (document.myForm123.type4.value == "2") comparison = 2;
        else comparison = 3;
        // 1원분산분석표 그리기
        if (comparison == 1) multipleComparisonTableLSD(kk7, ntot, nn7, xbar7);
        else if (comparison == 2) {alpha=0.05; multipleComparisonTableHSD(kk7, ntot, nn7, xbar7);}
        else {alpha=0.01; multipleComparisonTableHSD(kk7, ntot, nn7, xbar7)};
//        document.getElementById("screenTable").scrollBy(0,screenTablePixelHeight);
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

      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });
// ANOVA
function testingANOVA() {
        bar.selectAll("*").remove();
          // test statistics
          df1 = kk7 - 1;
          ntot = 0;
          ssb  = 0;
          ssw  = 0;
          for (i=0; i<kk7; i++) ntot += nn7[i]; 
          df2  = ntot - kk7;

          // total mean
          mtot = 0;
          for (i=0; i<kk7; i++) mtot += nn7[i] * xbar7[i];
          mtot /= ntot;

          // between & within sum of squares
          ssb = 0;
          ssw = 0;
          for (i=0; i<kk7; i++) {
            temp = (xbar7[i]-mtot);
            ssb += nn7[i] * temp*temp;
            ssw += (nn7[i] - 1) * var7[i];
          }
        
          msb = ssb / df1;
          msw = ssw / df2;

          stat[0] = msb / msw;
          stat[1] = ssb;
          stat[2] = ssw;
          stat[3] = ssb + ssw;
          stat[4] = msb;
          stat[5] = msw;

          h = alpha;  
          f = 0;
          g = f_inv(1-h, df1, df2, info);
          pvalue = 1 - f_cdf(stat[0], df1, df2, info);
          drawFdistGraphTH(hypoType, h1Type, stat, df1, df2, f, g, h, pvalue);
}  
// 분산분석표 --------------------------------------------------------------------------------------------------
function AnovaTable() {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var i, j, temp, info, str;
    var row;
    var num = 0;
    var ncol = 6;
    var k = 0;

    var cell = new Array(ncol);

    table.style.fontSize = "13px";
    table.style.cellPadding = "10";

    row = table.insertRow(num);
    for (j = 0; j < ncol; j++) cell[j] = row.insertCell(j);
    cell[0].innerHTML = "<h3>" + svgStr[15][langNum] + "</h3>"; // "분산분석표";
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";
    //          row.style.height ="40px";
    cell[0].style.width = "130px";

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "center";
        cell[j].style.backgroundColor = "#eee";
        cell[j].style.border = "1px solid black";
        cell[j].style.width = "80px";
    }
    cell[0].innerHTML = svgStr[72][langNum]; // "요인";
    cell[1].innerHTML = svgStr[73][langNum]; // "제곱합";  
    cell[2].innerHTML = svgStr[74][langNum]; // "자유도";  
    cell[3].innerHTML = svgStr[75][langNum]; // "평균제곱";  
    cell[4].innerHTML = "F " + svgStr[69][langNum]; // "F관찰값";   
    cell[5].innerHTML = "p " + svgStr[69][langNum]; // "p-값 =";    

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[102][langNum]; // "처리";
    cell[1].innerHTML = f3(ssb).toString();
    cell[2].innerHTML = f0(df1).toString();
    cell[3].innerHTML = f3(msb).toString();
    cell[4].innerHTML = f3(stat[0]).toString();
    if (pvalue < 0.0001) str = " < 0.0001";
    else str = f4(pvalue).toString();
    cell[5].innerHTML = str;

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.textAlign = "right";
        cell[j].style.border = "1px solid black";
    }
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[77][langNum]; // "오차";
    cell[1].innerHTML = f3(ssw).toString();
    cell[2].innerHTML = f0(df2).toString();
    cell[3].innerHTML = f3(msw).toString();

    row = table.insertRow(++num);
    for (j = 0; j < ncol; j++) {
        cell[j] = row.insertCell(j);
        cell[j].style.border = "1px solid black";
        cell[j].style.textAlign = "right";
        cell[j].style.backgroundColor = "#eee";
    }
    cell[0].style.textAlign = "center";
    cell[0].innerHTML = svgStr[78][langNum]; // "전체";
    cell[1].innerHTML = f3(stat[3]).toString();
    cell[2].innerHTML = f0(ntot-1).toString();

    // 다음 표와의 공백을 위한 것
    row = table.insertRow(++num);
    row.style.height = "20px";

}
// HSD 다중비교표 --------------------------------------------------------------------------------------------------
function multipleComparisonTableHSD(ngroup, ntot, nobs, avg) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var g, k, row, nrow, str, temp, info, avgDiff, HSD95, HSD99;
    var ncol = 10;
    var cell = new Array(ncol);
    nrow = 0;
    table.style.fontSize = "13px";

    var header = table.createTHead()
    row = table.insertRow(nrow);
    row.style.height = "40px";
    cell[0] = row.insertCell(0);
    cell[0].style.width = "130px";
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";
    cell[0].innerHTML = "<b>" + svgStr[90][langNum] + "</b>"; // "다중비교"

    row = table.insertRow(++nrow);
    row.style.height = "40px";
    for (g = 0; g < ngroup + 1; g++) {
        cell[g] = row.insertCell(g);
        cell[g].style.border = "1px solid black";
        cell[g].style.backgroundColor = "#eee";
    }
    if (ngroup > 1) {
       if (alpha == 0.05) str = "(5%HSD)";
       else str = "(1%HSD)";
       cell[0].style.textAlign = "center";
       cell[0].innerHTML = "| "+svgStr[100][langNum] + " |<br> " + str; // "평균차"
    }
    else cell[0].innerHTML = svgStr[21][langNum];
    for (g = 1; g < ngroup + 1; g++) {
        str = "";
        if (ngroup > 1) str = svgStrU[34][langNum] + (g).toString() + "<br>" + f3(avg[g - 1]);
        cell[g].innerHTML = str;
        cell[g].style.textAlign = "center";
    }
    // 다중비교 - 평균차, HSD
    for (g = 0; g < ngroup; g++) {
        row = table.insertRow(++nrow);
        for (j = 0; j < ngroup + 1; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.border = "1px solid black";
        }
        str = "";
        if (ngroup > 1) str = svgStrU[34][langNum] + (g + 1).toString() + "<br>" + f3(avg[g]);
        cell[0].innerHTML = str;
        cell[0].style.backgroundColor = "#eee";
        cell[0].style.textAlign = "center";
        for (k = 0; k < ngroup; k++) {
            if (g == k) continue;
            avgDiff = Math.abs(avg[g] - avg[k]);
            if (alpha == 0.05) temp = q_inv(0.95, ngroup, ntot - ngroup, info) * Math.sqrt(0.5 * (1 / nobs[g] + 1 / nobs[k]) * msw);
            else temp = q_inv(0.99, ngroup, ntot - ngroup, info) * Math.sqrt(0.5 * (1 / nobs[g] + 1 / nobs[k]) * msw);
            cell[k + 1].innerHTML = f3(avgDiff).toString() + "<br>(" + f3(temp) + ")";
            cell[k + 1].style.textAlign = "right";
            cell[k + 1].style.width = "80px";
        }
    }

    row = table.insertRow(++nrow); // 공란
    row.style.height = "20px";

    for (g = 0; g < ngroup; g++) tdata[g] = avg[g];
    sortAscendIndex(ngroup, tdata, indexA);

    row = table.insertRow(++nrow);
    row.style.height = "40px";
    for (g = 0; g < ngroup + 1; g++) {
        cell[g] = row.insertCell(g);
        cell[g].style.border = "1px solid black";
        cell[g].style.backgroundColor = "#eee";
    }
    if (ngroup > 1) {
        cell[0].style.textAlign = "center";
        cell[0].innerHTML = svgStr[101][langNum] + "<br> * 5%, ** 1%"; // "평균차 검정"
    } else cell[0].innerHTML = svgStr[21][langNum];
    for (g = 1; g < ngroup + 1; g++) {
        str = "";
        if (ngroup > 1) str = (indexA[g - 1] + 1).toString() + "<br>" + f3(avg[indexA[g - 1]]);
        cell[g].innerHTML = str;
        cell[g].style.textAlign = "center";
    }

    // 다중비교 - 평균 sorting
    for (g = 0; g < ngroup; g++) {
        row = table.insertRow(++nrow);
        for (j = 0; j < ngroup + 1; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.border = "1px solid black";
        }
        str = "";
        if (ngroup > 1) str = (indexA[g] + 1).toString() + "<br>" + f3(avg[indexA[g]]);
        cell[0].innerHTML = str;
        cell[0].style.backgroundColor = "#eee";
        cell[0].style.textAlign = "center";
        for (k = 0; k < ngroup; k++) {
            if (g == k) continue;
            avgDiff = Math.abs(avg[indexA[g]] - avg[indexA[k]]);
            HSD95 = q_inv(0.95, ngroup, ntot - ngroup, info) * Math.sqrt(0.5 * (1 / nobs[indexA[g]] + 1 / nobs[indexA[k]]) * msw);
            HSD99 = q_inv(0.99, ngroup, ntot - ngroup, info) * Math.sqrt(0.5 * (1 / nobs[indexA[g]] + 1 / nobs[indexA[k]]) * msw);
            temp = "  ";
            if (avgDiff > HSD99) temp = "**";
            else if (avgDiff > HSD95) temp = "*";
            cell[k + 1].innerHTML = temp;
            cell[k + 1].style.textAlign = "right";
        }
    }

    row = table.insertRow(++nrow);
    row.style.height = "20px";
}
// LSD 다중비교표 --------------------------------------------------------------------------------------------------
function multipleComparisonTableLSD(ngroup, ntot, nobs, avg) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

    var g, k, row, nrow, str, temp, info, avgDiff, HSD95, HSD99;
    var ncol  = 10;
    var cell  = new Array(ncol);
    nrow = 0;
    table.style.fontSize = "13px";

    var header = table.createTHead()
    row = table.insertRow(nrow);
    row.style.height = "40px";
    cell[0] = row.insertCell(0);
    cell[0].style.width = "130px";
    cell[0].style.textAlign = "center";
    cell[0].style.backgroundColor = "#eee";
    cell[0].style.border = "1px solid black";
    cell[0].innerHTML = "<b>" + svgStr[90][langNum] + "</b>" ; // "다중비교"

    row = table.insertRow(++nrow);
    row.style.height = "40px";
    for (g = 0; g < ngroup + 1; g++) {
        cell[g] = row.insertCell(g);
        cell[g].style.border = "1px solid black";
        cell[g].style.backgroundColor = "#eee";
    }
    if (ngroup > 1) {
       str = "(LSD)";
       cell[0].style.textAlign = "center";
       cell[0].innerHTML = "| "+svgStr[100][langNum] + " |<br> " + str; // "평균차"
    }
    else cell[0].innerHTML = svgStr[21][langNum];
    for (g = 1; g < ngroup + 1; g++) {
        str = "";
        if (ngroup > 1) str = svgStrU[34][langNum] + (g).toString() + "<br>" + f3(avg[g - 1]);
        cell[g].innerHTML = str;
        cell[g].style.textAlign = "center";
    }
    // 다중비교 - 평균차, LSD
    for (g = 0; g < ngroup; g++) {
        row = table.insertRow(++nrow);
        for (j = 0; j < ngroup + 1; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.border = "1px solid black";
        }
        str = "";
        if (ngroup > 1) str = svgStrU[34][langNum] + (g + 1).toString() + "<br>" + f3(avg[g]);
        cell[0].innerHTML = str;
        cell[0].style.backgroundColor = "#eee";
        cell[0].style.textAlign = "center";
        for (k = 0; k < ngroup; k++) {
            if (g == k) continue;
            avgDiff = Math.abs(avg[g] - avg[k]);
            temp = t_inv(1-alpha/2, ntot - ngroup, info) * Math.sqrt((1 / nobs[g] + 1 / nobs[k]) * msw);
            cell[k + 1].innerHTML = f3(avgDiff).toString() + "<br>(" + f3(temp) + ")";
            cell[k + 1].style.textAlign = "right";
            cell[k + 1].style.width = "80px";
        }
    }

    row = table.insertRow(++nrow); // 공란
    row.style.height = "20px";

    for (g = 0; g < ngroup; g++) tdata[g] = avg[g];
    sortAscendIndex(ngroup, tdata, indexA);

    row = table.insertRow(++nrow);
    row.style.height = "40px";
    for (g = 0; g < ngroup + 1; g++) {
        cell[g] = row.insertCell(g);
        cell[g].style.border = "1px solid black";
        cell[g].style.backgroundColor = "#eee";
    }
    if (ngroup > 1) {
        cell[0].style.textAlign = "center";
        cell[0].innerHTML = svgStr[101][langNum] + "<br> * 5%, ** 1%"; // "평균차 검정"
    } else cell[0].innerHTML = svgStr[21][langNum];
    for (g = 1; g < ngroup + 1; g++) {
        str = "";
        if (ngroup > 1) str = (indexA[g - 1] + 1).toString() + "<br>" + f3(avg[indexA[g - 1]]);
        cell[g].innerHTML = str;
        cell[g].style.textAlign = "center";
    }

    // 다중비교 - 평균 sorting
    for (g = 0; g < ngroup; g++) {
        row = table.insertRow(++nrow);
        for (j = 0; j < ngroup + 1; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.border = "1px solid black";
        }
        str = "";
        if (ngroup > 1) str = (indexA[g] + 1).toString() + "<br>" + f3(avg[indexA[g]]);
        cell[0].innerHTML = str;
        cell[0].style.backgroundColor = "#eee";
        cell[0].style.textAlign = "center";
        for (k = 0; k < ngroup; k++) {
            if (g == k) continue;
            avgDiff = Math.abs(avg[indexA[g]] - avg[indexA[k]]);
            HSD95 = t_inv(0.975, ntot - ngroup, info) * Math.sqrt((1 / nobs[indexA[g]] + 1 / nobs[indexA[k]]) * msw);
            HSD99 = t_inv(0.995, ntot - ngroup, info) * Math.sqrt((1 / nobs[indexA[g]] + 1 / nobs[indexA[k]]) * msw);
            temp = "  ";
            if (avgDiff > HSD99) temp = "**";
            else if (avgDiff > HSD95) temp = "*";
            cell[k + 1].innerHTML = temp;
            cell[k + 1].style.textAlign = "right";
        }
    }

    row = table.insertRow(++nrow);
    row.style.height = "20px";

}
      
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingANOVA();
} 
// Sorting in ascending and find index
function sortAscendIndex(dobs, dataA, index) {
    var i, j, temp, tempi;
    var nvalue = 0;
    for (i = 0; i < dobs; i++) index[i] = i;
    for (i = 0; i < dobs - 1; i++) {
        for (j = i; j < dobs; j++) {
            if (dataA[i] > dataA[j]) {
                temp = dataA[i];
                tempi = index[i];
                dataA[i] = dataA[j];
                index[i] = index[j];
                dataA[j] = temp;
                index[j] = tempi;
            }
        }
    }
}
