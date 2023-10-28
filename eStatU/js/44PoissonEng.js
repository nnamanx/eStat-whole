      var bar = d3.select("#chart");
      var i, j, k, sum, temp, info;
      var lambda, avg, std;
      var xmin, xmax, ymin, ymax, gxmin, gxmax, gxrange, gymin, gymax, gyrange;
      var nobs;
      var nvalue = 26;
      var checkFreq = false;

      // svg 파라미터
      var svgWidth    = 500;
      var svgHeight   = 350;
      var margin      = {top: 50, bottom: 60, left: 40, right: 40};
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var a, b, c, b2, c2, a3, c3;
      document.getElementById("c1").disabled = true;
      document.getElementById("c2").disabled = true;
      document.getElementById("c3").disabled = true;
 
      var poissonP   = new Array(nvalue);
      var valueLabel = new Array(nvalue);
      lambda = parseFloat(d3.select("#lambda").node().value);
      xmin = 0;
      xmax = nvalue;
      ymin = 0;
      ymax = 0.4;
      if (lambda < 0.7) ymax = 0.8;
      drawPoissonBarGraph(nvalue, lambda, valueLabel, poissonP, xmin, xmax, ymin, ymax);
      poissonTable(nvalue, lambda, poissonP);
      // Poisson분포 실행버튼 클릭 =================================================================================
      d3.select("#executePoisson").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("freqPoisson").checked = false;
        checkFreq = false;
	removeBinomialFreq2();
        clearInputValue1();
        lambda = parseFloat(d3.select("#lambda").node().value);   
        if (lambda < 0.1) lambda = 0.1;
        if (lambda > 10)  lambda = 10.0;
        // slider control
        document.getElementById("rangeLambda").value  = 10*lambda;

        drawPoissonBarGraph(nvalue, lambda, valueLabel, poissonP, xmin, xmax, ymin, ymax);
        poissonTable(nvalue, lambda, poissonP);
        if (checkFreq) showPoissonFreq(nvalue, poissonP, xmin, xmax, ymin, ymax);
      })

      // Poisson분포 확률표시 버튼 클릭
      d3.select("#freqPoisson").on("click",function() {
        if(this.checked) {
          checkFreq  = true;
          showBinomialFreq2(nvalue, poissonP, xmin, xmax, ymin, ymax);
        } else {
          checkFreq = false;
	  removeBinomialFreq2();
        }
      })

      // Poisson분포표 버튼 클릭
      d3.select("#poissonT").on("click",function() {
        lambda = parseFloat(d3.select("#lambda").node().value);   
        poissonTable(nvalue, lambda, poissonP);
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
            for (i = a; i < b+1; i++) c += poissonP[i]; 
          }
          document.getElementById("c1").value = f4(c);
    }
    // calculate C2
    function calculateC2() {
          b2 = parseInt(d3.select("#b2").node().value);
          c = 0;
          for (i = 0; i < b2+1; i++) c += poissonP[i]; 
          document.getElementById("c2").value = f4(c);
    }
    // calculate C3
    function calculateC3() {
          a3 = parseInt(d3.select("#a3").node().value); 
          c = 0;
          for (i = 1; i < a3; i++) c += poissonP[i]; 
          c = 1 - c;
          document.getElementById("c3").value = f4(c);
    }
