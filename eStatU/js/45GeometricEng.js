      var bar = d3.select("#chart");
      var i, j, k, sum, temp, info;
      var geoP, avg, std;
      var xmin, xmax, ymin, ymax, gxmin, gxmax, gxrange, gymin, gymax, gyrange;
      var nvalue = 102;
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
 
      var geometricP = new Array(nvalue);
      var valueLabel = new Array(nvalue);

      geoP = parseFloat(d3.select("#geoP").node().value);
      if (geoP > 0.2) nvalue = 21;
      else if (geoP > 0.1) nvalue = 31;
      else if (geoP > 0.02) nvalue = 51;
      else nvalue = 101;

      var xmin = 0;
      var xmax = nvalue;
      var ymin = 0;
      var ymax = 0.7;
      
      drawGeometricBarGraph(nvalue, geoP, valueLabel, geometricP);
      geometricTable(nvalue, geoP, geometricP);

      // Geometric분포 실행버튼 클릭 =================================================================================
      d3.select("#executeGeometric").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("freqGeometric").checked = false;
        checkFreq = false;
        removeBinomialFreq2();

        geoP = parseFloat(d3.select("#geoP").node().value);    // 성공확률 p
        if (geoP < 0.01)  geoP = 0.01;
        if (geoP > 0.99)  geoP = 0.99;
        // slider control
        document.getElementById("rangeGeoP").value  = 100*geoP;

        if (geoP > 0.2) nvalue = 21;
        else if (geoP > 0.1) nvalue = 31;
        else if (geoP > 0.02) nvalue = 51;
        else nvalue = 101;
        document.getElementById("a1").max = nvalue-1;
        document.getElementById("b1").max = nvalue;
        document.getElementById("b2").max = nvalue;
        document.getElementById("a3").max = nvalue;
        clearInputValue1();
        drawGeometricBarGraph(nvalue, geoP, valueLabel, geometricP);
        geometricTable(nvalue, geoP, geometricP);
      })

      // Geometric 분포 확률표시 버튼 클릭
      d3.select("#freqGeometric").on("click",function() {
        if(this.checked) {
          checkFreq  = true;
          geoP = parseFloat(d3.select("#geoP").node().value);    // 성공확률 p
          if (geoP < 0.01)  geoP = 0.01;
          if (geoP > 0.99)  geoP = 0.99;
          if (geoP > 0.2) nvalue = 21;
          else if (geoP > 0.1) nvalue = 31;
          else if (geoP > 0.02) nvalue = 51;
          else nvalue = 101;
          // 확률및 통계량 계산
          for (i=0; i<nvalue; i++) {
            geometricP[i] = geometric_pdf(i, geoP, info)
          }
          showBinomialFreq2(nvalue, geometricP, xmin, xmax, ymin, ymax);
          geometricTable(nvalue, geoP, geometricP);
 
        } else {
          checkFreq = false;
	  removeBinomialFreq2();
        }
      })

      // Geometric분포표 버튼 클릭
      d3.select("#geometricT").on("click",function() {
        geoP = parseFloat(d3.select("#geoP").node().value);
        geometricTable(nvalue, geoP, geometricP);
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
            for (i = a; i < b+1; i++) c += geometricP[i]; 
          }
          document.getElementById("c1").value = f4(c);
    }
    // calculate C2
    function calculateC2() {
          b2 = parseInt(d3.select("#b2").node().value);
          c = 0;
          for (i = 0; i < b2+1; i++) c += geometricP[i]; 
          document.getElementById("c2").value = f4(c);
    }
    // calculate C3
    function calculateC3() {
          a3 = parseInt(d3.select("#a3").node().value); 
          c = 0;
          for (i = 1; i < a3; i++) c += geometricP[i]; 
          c = 1 - c;
          document.getElementById("c3").value = f4(c);
    }
