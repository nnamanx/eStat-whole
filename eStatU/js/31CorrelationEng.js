      function showValue(newValue) {
        var newV = (newValue - 100)/100;
        document.getElementById("initCorr").value=newV;  
      }

      var svg     = d3.select("#chart"); 
      var i, r;
      var svgWidth    = 600;
      var svgHeight   = 600;
      var margin      = {top: 70, bottom: 70, left: 70, right: 70};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;

      var stat      = new Array(30);
      var tobs      = 200;
      var xdata     = new Array(tobs);
      var ydata     = new Array(tobs);
      var generator = d3.randomNormal(0,1) 
      var checkTitle = true;

      // 초기 그림
      svg.selectAll("*").remove();
      r = 0.8;
      for (i=0; i<tobs; i++) {
            xdata[i] = generator();
            ydata[i] = r*xdata[i] + Math.sqrt(1-r*r)*generator()
      }
      basicScatterStat(tobs, xdata, ydata, stat);
      showScatterPlot(tobs, xdata, ydata, stat[5], stat[6], stat[15], stat[16], graphWidth, graphHeight, checkTitle);


      d3.select("#redrawCorr").on("click", function(){  
          svg.selectAll("*").remove();  // 전화면 제거
          document.getElementById("regress2").checked = false;
	  r = parseFloat(d3.select("#initCorr").node().value);  // 시작값 
          if (r > 1 ) r = 0.99;
          if (r < -1) r = -0.99;
          // slider control
          document.getElementById("rangeCorr").value  = 100*(1+r);
          for (i=0; i<tobs; i++) {
            xdata[i] = generator();
            ydata[i] = r*xdata[i] + Math.sqrt(1-r*r)*generator();
          }

          basicScatterStat(tobs, xdata, ydata, stat);
          showScatterPlot(tobs, xdata, ydata, stat[5], stat[6], stat[15], stat[16], graphWidth, graphHeight, checkTitle);
      })

      // 회귀선 그리기
      d3.select("#regress2").on("click",function() {
          if(this.checked) {
            showRegression2(stat[7], stat[8], stat[9], stat[10], stat[5], stat[6], stat[15], stat[16], checkTitle);
          } else {
	    removeRegression2();
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
