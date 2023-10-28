      var bar = d3.select("#chart");

      // 초기하분포 초기화면 셋팅
      var i, j, k, sum, nvalue, info;
      var NN, DD, nn, avg,  std, savg, sstd;
      var xmin, xmax, ymin, ymax, gxmin, gxmax, gxrange, gymin, gymax, gyrange;
      var nobs;
      var nvalueMax  = 31;
      var hyperGeoP  = new Array(nvalueMax);
      var valueLabel = new Array(nvalueMax);

      var checkFreq   = false;
 
      var margin      = {top: 50, bottom: 60, left: 40, right: 40};
      var svgWidth    = 500;
      var svgHeight   = 350;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var a, b, c, b2, c2, a3, c3;
      document.getElementById("c1").disabled = true;
      document.getElementById("c2").disabled = true;
      document.getElementById("c3").disabled = true;
      NN = parseFloat(d3.select("#NN").node().value);    // lot 크기 
      DD = parseFloat(d3.select("#DD").node().value);    // defect 크기 
      nn = parseFloat(d3.select("#nn").node().value);    // sample size
      nvalue = nn + 1;

      xmin = 0;
      xmax = nvalue;
      ymin = 0;
      ymax = 0.6;

      drawHyperGeoBarGraph(valueLabel, hyperGeoP, xmin, xmax, ymin, ymax);
      hyperGeoTable(NN, DD, nn, hyperGeoP);

      // 초기하분포 실행버튼 클릭 =================================================================================
      d3.select("#executeHyperG").on("click",function() {
        NN = parseFloat(d3.select("#NN").node().value);    // lot 크기 
        DD = parseFloat(d3.select("#DD").node().value);    // defect 크기 
        nn = parseFloat(d3.select("#nn").node().value);    // sample size
        // slider control
        document.getElementById("rangeHyperG").value  = nn;
        document.getElementById("a1").max = nn-1;
        document.getElementById("b1").max = nn;
        document.getElementById("b2").max = nn;
        document.getElementById("a3").max = nn;
        clearInputValue1();
        drawHyperGeoBarGraph(valueLabel, hyperGeoP, xmin, xmax, ymin, ymax);
        hyperGeoTable(NN, DD, nn, hyperGeoP);
        if (checkFreq) showBinomialFreq2(nvalue, hyperGeoP, xmin, xmax, ymin, ymax);
      })

      // 초기하분포 확률표시 버튼 클릭
      d3.select("#freqHyperG").on("click",function() {
        if(this.checked) {
          checkFreq  = true;
          nn = parseFloat(d3.select("#nn").node().value);   // sample 크기 n
          showBinomialFreq2(nn+1, hyperGeoP, xmin, xmax, ymin, ymax);
        } else {
          checkFreq = false;
	  removeBinomialFreq2();
        }
      })

      // 초기하분포표 버튼 클릭
      d3.select("#executeHyperGeoTable").on("click",function() {
          NN = parseFloat(d3.select("#NN").node().value);    // lot 크기 
          DD = parseFloat(d3.select("#DD").node().value);    // defect 크기 
          nn = parseFloat(d3.select("#nn").node().value);   // sample 크기 n
          hyperGeoTable(NN, DD, nn, hyperGeoP);
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
            for (i = a; i < b+1; i++) c += hyperGeoP[i]; 
          }
          document.getElementById("c1").value = f4(c);
    }
    // calculate C2
    function calculateC2() {
          b2 = parseInt(d3.select("#b2").node().value);
          c = 0;
          for (i = 0; i < b2+1; i++) c += hyperGeoP[i]; 
          document.getElementById("c2").value = f4(c);
    }
    // calculate C3
    function calculateC3() {
          a3 = parseInt(d3.select("#a3").node().value); 
          c = 0;
          for (i = a3; i < nvalue; i++) c += hyperGeoP[i]; 
          document.getElementById("c3").value = f4(c);
    }
