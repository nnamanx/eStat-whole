      var chart = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      margin = {top:90, bottom:100, left:60, right:30};
      svgWidth    = 640;
      svgHeight   = 620;
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;

      var i, j, k, nobs, nrow, nrow2, num, ndvalue; 
      var ptot, mean, vari, stdv;
      var gxmin, gxmax, gymin, gymax, temp, freqMax;
      var mTitle, yTitle, xTitle;
      var checkFreq = false;
      var checkInput = false;
      var rowMax = 9;
      var fontsize = "1em";
      var strPath;
      var colr = ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FFFF","#BF00FF","#FF00FF","#0080FF","#00BFFF","#8000FF"];
      var catg  = new Array(rowMax);
      var freq  = new Array(rowMax);
      document.getElementById("ptot").disabled  = true;
      document.getElementById("mean").disabled = true;
      document.getElementById("vari").disabled = true;
      document.getElementById("stdv").disabled = true;

      // erase Data and Graph
      d3.select("#eraseDiscrete").on("click",function() {
        chart.selectAll("*").remove();
        document.getElementById("data11").value = "";
        document.getElementById("data12").value = "";
        document.getElementById("data13").value = "";
        document.getElementById("data14").value = "";
        document.getElementById("data15").value = "";
        document.getElementById("data16").value = "";
        document.getElementById("data17").value = "";
        document.getElementById("data18").value = "";
        document.getElementById("data19").value = "";
        document.getElementById("data21").value = "";
        document.getElementById("data22").value = "";
        document.getElementById("data23").value = "";
        document.getElementById("data24").value = "";
        document.getElementById("data25").value = "";
        document.getElementById("data26").value = "";
        document.getElementById("data27").value = "";
        document.getElementById("data28").value = "";
        document.getElementById("data29").value = "";
        document.getElementById("mean").value   = "";
        document.getElementById("vari").value   = "";
        document.getElementById("stdv").value   = "";
      })
      // Draw Bar Graph ======================================
      d3.select("#execute").on("click",function() {
        initialize();
        if (checkInput) return;
        drawBarGraph(nrow, freq, catg, freqMax, checkFreq);
      })

      // 초기 작업
      function initialize() {
        chart.selectAll("*").remove();
        // category
        catg[0] = parseFloat(d3.select("#data11").node().value);
        catg[1] = parseFloat(d3.select("#data12").node().value);
        catg[2] = parseFloat(d3.select("#data13").node().value);
        catg[3] = parseFloat(d3.select("#data14").node().value);
        catg[4] = parseFloat(d3.select("#data15").node().value);
        catg[5] = parseFloat(d3.select("#data16").node().value);
        catg[6] = parseFloat(d3.select("#data17").node().value);
        catg[7] = parseFloat(d3.select("#data18").node().value);
        catg[8] = parseFloat(d3.select("#data19").node().value);
        // freq data
        freq[0] = parseFloat(d3.select("#data21").node().value);
        freq[1] = parseFloat(d3.select("#data22").node().value);
        freq[2] = parseFloat(d3.select("#data23").node().value);
        freq[3] = parseFloat(d3.select("#data24").node().value);
        freq[4] = parseFloat(d3.select("#data25").node().value);
        freq[5] = parseFloat(d3.select("#data26").node().value);
        freq[6] = parseFloat(d3.select("#data27").node().value);
        freq[7] = parseFloat(d3.select("#data28").node().value);
        freq[8] = parseFloat(d3.select("#data29").node().value);

        // 도수 입력한 행의 수 카운트
        nrow = 0;
        for (i=0; i<rowMax; i++) { // 입력 행의 수
            if (!isNaN(catg[i]) ) nrow = i+1;
        }
        nrow2 = 0;
        for (i=0; i<rowMax; i++) { // 입력 행의 수
            if (!isNaN(freq[i]) ) nrow2 = i+1;
        }
        // 입력행이 하나 이상인지 체크
        if (nrow < 2 ) {
          checkInput = true;
          chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
             .text(alertMsg[46][langNum]).style("stroke","red").style("font-size",fontsize);
          return;
        }
        // 자료수가 동일한지 체크
        if (nrow != nrow2 ) {
          checkInput = true;
          chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
             .text(alertMsg[54][langNum]).style("stroke","red").style("font-size",fontsize);
          return;
        }
        //문자 데이터 체크
        for (i=0; i<nrow; i++) {
            if ( isNaN(catg[i]) || isNaN(freq[i]) ) { 
              checkInput = true;
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[47][langNum]).style("stroke","red").style("font-size",fontsize);
              return;
            }
        }
        // probability 체크
        ptot = 0;
        for (i=0; i<nrow; i++) {
            if ( freq[i] < 0 || freq[i] > 1 ) { 
              checkInput = true;
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text("???  0 < P( X = xᵢ ) < 1").style("stroke","red").style("font-size",fontsize);
              return;
            }
            ptot += freq[i];
        }
        // 확률의 합 체크
        if ( ptot < 0.99 || ptot > 1.01 ) { 
              checkInput = true;
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text("???  ∑ P( X = xᵢ ) = 1").style("stroke","red").style("font-size",fontsize);
              return;
        }
        checkInput = false;
        // 입력값 합계, 최대도수 계산
        ptot = 0;
        mean = 0;
        vari = 0;
        freqMax = 0;
        for (i=0; i<nrow; i++) { 
            catg[i] = parseFloat(catg[i]);
            ptot += freq[i];
            mean += catg[i] * freq[i];
            vari += catg[i] * catg[i] * freq[i];
            if (freq[i] > freqMax) freqMax = freq[i];
        }
        vari = vari - mean*mean;
        stdv = Math.sqrt(vari);
        document.getElementById("ptot").value = f3(ptot);
        document.getElementById("mean").value = f3(mean);
        document.getElementById("vari").value = f3(vari);
        document.getElementById("stdv").value = f3(stdv);
      }

      // 막대그래프 도수표시 버튼 클릭
      d3.select("#showfreq").on("click", function() {
        if (this.checked) {
            checkFreq = true;
            drawBarGraph(nrow, dataSet, dvalueLabel, dcolr, freqMax, checkFreq);
        } else {
            checkFreq = false;
            removeFreq();
        }
      }) 

      // svg Graph Save
      d3.select("#saveGraphDiscrete").on("click", function() {
        var svg = d3.select("#chart");
        var width = svgWidth;
        var height = svgHeight;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });
 
  // Draw Bar Graph
  function drawBarGraph(ndvalue, dataSet, dvalueLabel, freqMax, checkFreq) {
    var i, j, str, tx, ty, x1, y1;
    var betweenbarWidth = graphWidth / ndvalue; // 막대와 막대 사이의 너비
    var barWidth = betweenbarWidth * 0.6; // 막대의 너비
    var gapWidth = betweenbarWidth * 0.2;
    var ybuffer  = graphHeight * 0.1;
    var yheight  = graphHeight * 0.8;
    var freqRatioV = yheight / freqMax; // 그래프 영역과 데이터 영역의 비율

    // 주제목
    chart.append("text")
        .attr("x", margin.left + graphWidth/2)
        .attr("y", margin.top / 2 + 10)
        .style("font-size", "1.5em")
        .style("font-family", "sans-seirf")
        .style("stroke", "black")
        .style("text-anchor", "middle")
        .text(svgStr[125][langNum])
    drawLabel(ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth);
    drawAxis(freqMax, graphHeight);

    // x축 위 선
    y1 = margin.top;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // x축 선
    y1 = margin.top + graphHeight;
    chart.append("line")
         .attr("class", "line")
         .attr("x1", margin.left)
         .attr("x2", margin.left + graphWidth)
         .attr("y1", y1)
         .attr("y2", y1)
         .style("stroke", "black")
    // 막대
    for (j=0; j<ndvalue; j++) {
      chart.append("rect")
           .attr("class", "bar")
           .style("fill", colr[4])
           .attr("height", 0)
           .attr("width", barWidth)
           .attr("x", margin.left + gapWidth + j * betweenbarWidth)
           .attr("y", margin.top + graphHeight)
           .transition() // 애니매이션 효과 지정
           .delay(function(d, i) {return i * 500;}) // 0.5초마다 그리도록 대기시간 설정
           .duration(2000) // 2초동안 애니매이션이 진행되도록 설정
           .attr("y", margin.top + graphHeight - dataSet[j] * freqRatioV)
           .attr("height", dataSet[j] * freqRatioV);
    }

    showFreq(ndvalue, dataSet, freqMax, freqRatioV, gapWidth, barWidth, betweenbarWidth);
    // mean 
    var str;
    str = "E(X) = " + f3(mean) + "\u00A0\u00A0\u00A0\u00A0\u00A0  V(X) = " + f3(vari) + "\u00A0\u00A0\u00A0\u00A0\u00A0  σ(X) = " + f3(stdv); 
    x1 = margin.left + graphWidth/2;
    y1 = margin.top + graphHeight + margin.bottom/2 + 10;
    chart.append("text")
         .style("text-anchor", "middle")
         .style("font-family", "sans-serif")
         .style("font-size", "1em")
         .style("stroke", "red")
         .attr("x", x1)
         .attr("y", y1)
         .text(str)
  }

  // 분리형 막대그래프 도수 쓰기 함수
  function showFreq(ndvalue, dataSet, freqMax, freqRatioV, gapWidth, barWidth, betweenbarWidth) {
    for (var j = 0; j < ndvalue; j++) {
      if (dataSet[i] == 0) continue;
      chart.append("text")
           .style("text-anchor", "middle")
           .style("font-size", "0.8em")
           .style("stroke", "blue")
           .attr("x", margin.left + gapWidth + barWidth / 2 + j * betweenbarWidth)
           .attr("y", margin.top + graphHeight - dataSet[j] * freqRatioV + 15)
           .text(dataSet[j]);
    }
  }

  // 막대그래프 도수 제거 함수
  function removeFreq() {
    chart.selectAll("text.freqfont").remove();
  }


  // 변량값명 쓰기 함수
  function drawLabel(ndvalue, label, betweenbarWidth, barWidth, gapWidth) {
    var i, j, k, x1, y1, tx, ty, str, strAnchor;
    var angle;

    ty = margin.top + graphHeight;
    angle = 0;
    y1 = ty + 25;
 
    for (j = 0; j < ndvalue; j++) {
      tx = margin.left + gapWidth + barWidth / 2 + j * betweenbarWidth;
      x1 = margin.left + gapWidth + barWidth / 2 + j * betweenbarWidth;
      chart.append("line") // tick
                    .attr("x1", tx)
                    .attr("x2", tx)
                    .attr("y1", ty)
                    .attr("y2", ty + 7)
                    .style("stroke", "black")
                    .style("stroke-width", "0.8")
      chart.append("text")
           .style("text-anchor", "middle")
           .style("font-family", "sans-serif")
           .style("font-size", "1em")
           .style("stroke", "black")
           .attr("x", x1)
           .attr("y", y1)
           .attr("transform", "rotate(" + angle + "," + x1 + "," + y1 + ")  ")
           .text(label[j])
    }
  }

  // 막대그래프 축 그리기
  function drawAxis(freqMax, height) {
    var tx, ty;
    var xScale, yScale;
    var ygrid    = new Array(rowMax);

    yScale = d3.scaleLinear().domain([0, freqMax/0.8]).range([height, 0]);
    ygrid = yScale.ticks();
    tx = margin.left;
    ty = margin.top;
    chart.append("g")
         .attr("transform", "translate(" + tx + "," + ty + ")")
         .call(d3.axisLeft(yScale)) // 눈금을 표시할 함수 호출
    // Y축 그리드
    for (i = 1; i < ygrid.length; i++) {
      ty = margin.top + yScale(ygrid[i]);
      chart.append("line")
           .attr("x1", margin.left)
           .attr("x2", margin.left + graphWidth)
           .attr("y1", ty)
           .attr("y2", ty)
           .style("stroke", "lightgrey")
    }
    chart.append("line").attr("class", "line")
                    .attr("x1", margin.left)
                    .attr("x2", margin.left)
                    .attr("y1", margin.top)
                    .attr("y2", margin.top + graphHeight)
                    .style("stroke", "black")
    chart.append("line").attr("class", "line")
                    .attr("x1", margin.left + graphWidth)
                    .attr("x2", margin.left + graphWidth)
                    .attr("y1", margin.top)
                    .attr("y2", margin.top + graphHeight)
                    .style("stroke", "black")

     //   tx = margin.left + graphWidth;
     //   chart.append("g")
     //        .attr("transform","translate("+tx+","+ty+")")
     //        .call(d3.axisRight(yScale))             // 눈금을 표시할 함수 호출
  }

