      var bar = d3.select("#chart");

      // 이항분포 시뮬레이션 초기화면 셋팅
      var i, j, k, sum, temp, info;
      var nn2, pp2, avg,  std, savg, sstd;
      var xmin, xmax, ymin, ymax, gxmin, gxmax, gxrange, gymin, gymax, gyrange;
      var nobs;
      var nvalueMax  = 31;
      var binomialP2 = new Array(nvalueMax);
      var valueLabel = new Array(nvalueMax);

      var checkFreq2   = false;
      var checkFreq3   = false;
      var margin      = {top: 50, bottom: 60, left: 40, right: 40};
      var svgWidth    = 500;
      var svgHeight   = 350;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var a, b, c, b2, c2, a3, c3;
      document.getElementById("c1").disabled = true;
      document.getElementById("c2").disabled = true;
      document.getElementById("c3").disabled = true;

      nn2 = parseFloat(d3.select("#nn2").node().value);    // 크기 n
      pp2 = parseFloat(d3.select("#pp2").node().value);    // 성공확률 p
      nvalue2 = nn2 + 1;
      xmin      = 0;
      xmax      = nvalue2;
      ymin      = 0;
      if ( nn2 > 9 && pp2 >= 0.1 && pp2 <= 0.9) ymax = 0.3;
      else ymax = 0.8;

      drawBinomialBarGraph(nn2, pp2, binomialP2, xmin, xmax, ymin, ymax, valueLabel);
      binomialTable(nn2, pp2, binomialP2);

      // 이항분포 실행버튼 클릭 =================================================================================
      d3.select("#execute2Binomial").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("freq2Binomial").checked = false;
        document.getElementById("freq3Binomial").checked = false;
        checkFreq2 = false;
        checkFreq3 = false;
        removeBinomialFreq2();
        removeBinomialNormal();

        nn2 = parseFloat(d3.select("#nn2").node().value);    // 크기 n
        pp2 = parseFloat(d3.select("#pp2").node().value);    // 성공확률 p
        if (nn2 < 1 )   nn2 = 1;
        if (nn2 > 100)  nn2 = 100;
        if (pp2 < 0.01) pp2 = 0.01;
        if (pp2 > 0.99) pp2 = 0.99;
        document.getElementById("a1").max = nn2-1;
        document.getElementById("b1").max = nn2;
        document.getElementById("b2").max = nn2;
        document.getElementById("a3").max = nn2;
        clearInputValue1();
        // slider control
        document.getElementById("range3Binomial").value  = nn2;
        document.getElementById("range4Binomial").value  = 100*pp2;

        nvalue2 = nn2+1;
        drawBinomialBarGraph(nn2, pp2, binomialP2, xmin, xmax, ymin, ymax, valueLabel);
        binomialTable(nn2, pp2, binomialP2);

        if (checkFreq2) showBinomialFreq2(nvalue2, binomialP2, xmin, xmax, ymin, ymax);
        if (checkFreq3 && nvalue2 > 9) showBinomialNormal(nn2, pp2, xmin, xmax, ymin, ymax);
      })

      // 이항분포 확률표시 버튼 클릭
      d3.select("#freq2Binomial").on("click",function() {
        if(this.checked) {
          checkFreq2  = true;
          nn2 = parseFloat(d3.select("#nn2").node().value);    // 크기 n
          pp2 = parseFloat(d3.select("#pp2").node().value);    // 성공확률 p
          xmin      = 0;
          xmax      = nvalue2;
          ymin      = 0;
          if ( nn2 > 9 && pp2 >= 0.1 && pp2 <= 0.9) ymax = 0.3;
          else ymax = 0.8;
          // 확률및 통계량 계산
          for (var i=0; i<nvalue2; i++) {
            binomialP2[i] = binomial_pdf(i, nn2, pp2, info)
          }
          showBinomialFreq2(nn2+1, binomialP2, xmin, xmax, ymin, ymax);
        } else {
          checkFreq2 = false;
	  removeBinomialFreq2();
        }
      })

      // 정규분포근사 버튼 클릭
      d3.select("#freq3Binomial").on("click",function() {
        if(this.checked) {
          checkFreq3 = true;
          nn2 = parseFloat(d3.select("#nn2").node().value);    // 크기 n
          pp2 = parseFloat(d3.select("#pp2").node().value);    // 성공확률 p
          xmin      = 0;
          xmax      = nvalue2;
          ymin      = 0;
          if ( nn2 > 9 && pp2 >= 0.1 && pp2 <= 0.9) ymax = 0.3;
          else ymax = 0.8;
          if (nn2 > 9) showBinomialNormal(nn2, pp2, xmin, xmax, ymin, ymax);
        } else {
          checkFreq3 = false;
	  removeBinomialNormal();
        }
      })

      // svg Graph Save
      d3.select("#saveGraphU").on("click", function() {
        var svg = d3.select("#chart");
        var width = svgWidth;
        var height = svgHeight;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });
      // 이항분포표 버튼 클릭
      d3.select("#execute3Binomial").on("click",function() {
          nn2 = parseFloat(d3.select("#nn2").node().value);    // 크기 n
          pp2 = parseFloat(d3.select("#pp2").node().value);    // 성공확률 p
          binomialTable(nn2, pp2, binomialP2);
      })
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });

    // calculate C1
    function calculateC1() {
          a = parseInt(d3.select("#a1").node().value); 
          b = parseInt(d3.select("#b1").node().value);
          if ( a > b ) {
            c = 0;
          }
          else {
            c = 0;
            for (i = a; i < b+1; i++) c += binomialP2[i]; 
          }
          document.getElementById("c1").value = f4(c);
    }
    // calculate C2
    function calculateC2() {
          b2 = parseInt(d3.select("#b2").node().value);
          c = 0;
          for (i = 0; i < b2+1; i++) c += binomialP2[i]; 
          document.getElementById("c2").value = f4(c);
    }
    // calculate C3
    function calculateC3() {
          a3 = parseInt(d3.select("#a3").node().value); 
          c = 0;
          for (i = a3; i < nn2+1; i++) c += binomialP2[i]; 
          document.getElementById("c3").value = f4(c);
    }

