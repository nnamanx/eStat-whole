      var chart = d3.select("#chart");
      var colr = ["#FF0000","#FF8000","#FFFF00","#32CD32","#00FFFF","#BF00FF","#FF00FF","#0080FF","#00BFFF","#8000FF"];
      var i, j, x, temp, info;
      var avg1, avg2, avg3, std1, std2, std3;
      var left1, left2, left3, right1, right2, right3, delta;
      var xmin, xmax, ymin, ymax, gxmin, gxmax, gxrange, gymin, gymax, gyrange;
      var nobs;
      var nvalue  = 300;
      var normalP1 = new Array(nvalue);
      var normalP2 = new Array(nvalue);
      var normalP3 = new Array(nvalue);

      var svgWidth    = 600;
      var svgHeight   = 400;
      var margin      = {top: 20, bottom: 50, left: 50, right: 30};
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var mTitle = "";
      var yTitle = "";
      var xTitle = "x";
      var ninterval   = graphWidth / 4;

      initialize();

      // Normal 실행버튼 클릭 =================================================================================
      d3.select("#execute").on("click",function() {
        initialize()
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
 
    function show11(newValue) {
        document.getElementById("a1").value = -10 + newValue/5;
        initialize();
    }
    function show12(newValue) {
        document.getElementById("b1").value = newValue/10;
        initialize();
    }
    function show21(newValue) {
        document.getElementById("a2").value = -10 + newValue/5;
        initialize();
    }
    function show22(newValue) {
        document.getElementById("b2").value = newValue/10;
        initialize();
    }
    function show31(newValue) {
        document.getElementById("a3").value = -10 + newValue/5;
        initialize();
    }
    function show32(newValue) {
        document.getElementById("b3").value = newValue/10;
        initialize();
    }

    // initialize and draw normal function
    function initialize() {
      avg1 = parseFloat(d3.select("#a1").node().value);
      avg2 = parseFloat(d3.select("#a2").node().value);
      avg3 = parseFloat(d3.select("#a3").node().value);
      std1 = parseFloat(d3.select("#b1").node().value);
      std2 = parseFloat(d3.select("#b2").node().value);
      std3 = parseFloat(d3.select("#b3").node().value);

        if (avg1 < -10) avg1 = -10;
        if (avg1 > 10)  avg1 = 10
        if (std1 < 0.1) std1 = 0.1;
        if (std1 > 10)  std1 = 10;
        if (avg2 < -10) avg2 = -10;
        if (avg2 > 10)  avg2 = 10
        if (std2 < 0.1) std2 = 0.1;
        if (std2 > 10)  std2 = 10;
        if (avg3 < -10) avg3 = -10;
        if (avg3 > 10)  avg3 = 10
        if (std3 < 0.1) std3 = 0.1;
        if (std3 > 10)  std3 = 10;
        document.getElementById("a1").value = f2(avg1);
        document.getElementById("b1").value = f2(std1);     
        document.getElementById("a2").value = f2(avg2);
        document.getElementById("b2").value = f2(std2);       
        document.getElementById("a3").value = f2(avg3);
        document.getElementById("b3").value = f2(std3);            
        // slider control
        document.getElementById("range11").value = (avg1+10)*5;
        document.getElementById("range12").value = std1*10;
        document.getElementById("range21").value = (avg2+10)*5;
        document.getElementById("range22").value = std2 * 10;
        document.getElementById("range31").value = (avg3+10)*5;
        document.getElementById("range32").value = std3 * 10;

      // calculate gxmin, gxmax
      left1  = avg1 - 4*std1; 
      left2  = avg2 - 4*std2; 
      left3  = avg3 - 4*std3; 
      right1 = avg1 + 4*std1; 
      right2 = avg2 + 4*std2; 
      right3 = avg3 + 4*std3; 
      if (left1 < left2) gxmin = left1;
      else gxmin = left2;
      if (gxmin > left3) gxmin = left3;
      if (right1 < right2) gxmax = right2;
      else gxmax = right1;
      if (gxmax < right3) gxmax = right3;
      gxrange = gxmax - gxmin;
      delta   = gxrange / ninterval;
      gymin   = 0;
      gymax   = 0;
      for (i = 0; i < ninterval+1; i++) {
        x = gxmin + i*delta;
        normalP1[i] = normal_pdf(avg1, std1, x)
        normalP2[i] = normal_pdf(avg2, std2, x)
        normalP3[i] = normal_pdf(avg3, std3, x)
        if (gymax < normalP1[i]) gymax = normalP1[i]
        if (gymax < normalP2[i]) gymax = normalP2[i]
        if (gymax < normalP3[i]) gymax = normalP3[i]
      }
      gyrange = gymax - gymin;
      drawNormalGraph(avg1, std1, avg2, std2, avg3, std3);
    }

  // Draw Normal Graph
  function drawNormalGraph(avg1, std1, avg2, std2, avg3, std3) {
    var i, j, str, tx, ty;
    var ybuffer  = graphHeight * 0.1;
    var yheight  = graphHeight * 0.8;
    chart.selectAll("*").remove();

    // draw axis
    drawAxis();
    drawTitle(mTitle, yTitle, xTitle);

    // normal graph 1
    x1 = margin.left;
    y1 = margin.top + graphHeight - yheight * (normalP1[0] - gymin) / gyrange;
    for (i=1; i<ninterval+1; i++) {
      x2 = x1 + 4;
      y2 = margin.top + graphHeight - yheight * (normalP1[i] - gymin) / gyrange;
      chart.append("line")
           .attr("class", "line")
           .attr("x1", x1)
           .attr("x2", x2)
           .attr("y1", y1)
           .attr("y2", y2)
           .style("stroke", colr[0])
           .style("stroke-width", "3")
      x1 = x2;
      y1 = y2;
    }
    x1   = margin.left + graphWidth * (avg1 - gxmin) / gxrange;
    temp = normal_pdf(avg1, std1, avg1);
    y1   = margin.top + graphHeight - yheight * (temp - gymin) / gyrange - 10;
    str  = "N(" + f2(avg1) + ", " + f2(std1) + "²)";
    chart.append("text")
         .attr("x", x1)
         .attr("y", y1)
         .style("font-size", "1em")
         .style("font-family", "sans-seirf")
         .style("stroke", colr[0])
         .style("text-anchor", "middle")
         .text(str)
    // normal graph 2
    x1 = margin.left;
    y1 = margin.top + graphHeight - yheight * (normalP2[0] - gymin) / gyrange;
    for (i=1; i<ninterval+1; i++) {
      x2 = x1 + 4;
      y2 = margin.top + graphHeight - yheight * (normalP2[i] - gymin) / gyrange;
      chart.append("line")
           .attr("class", "line")
           .attr("x1", x1)
           .attr("x2", x2)
           .attr("y1", y1)
           .attr("y2", y2)
           .style("stroke", "LimeGreen")
           .style("stroke-width", "3")
      x1 = x2;
      y1 = y2;
    }
    x1   = margin.left + graphWidth * (avg2 - gxmin) / gxrange;
    temp = normal_pdf(avg2, std2, avg2);
    y1   = margin.top + graphHeight - yheight * (temp - gymin) / gyrange - 10;
    str  = "N(" + f2(avg2) + ", " + f2(std2) + "²)";
    chart.append("text")
         .attr("x", x1)
         .attr("y", y1)
         .style("font-size", "1em")
         .style("font-family", "sans-seirf")
         .style("stroke", "LimeGreen")
         .style("text-anchor", "middle")
         .text(str)
    // normal graph 3
    x1 = margin.left;
    y1 = margin.top + graphHeight - yheight * (normalP3[0] - gymin) / gyrange;
    for (i=1; i<ninterval+1; i++) {
      x2 = x1 + 4;
      y2 = margin.top + graphHeight - yheight * (normalP3[i] - gymin) / gyrange;
      chart.append("line")
           .attr("class", "line")
           .attr("x1", x1)
           .attr("x2", x2)
           .attr("y1", y1)
           .attr("y2", y2)
           .style("stroke", "DeepSkyBlue")
           .style("stroke-width", "3")
      x1 = x2;
      y1 = y2;
    }
    x1   = margin.left + graphWidth * (avg3 - gxmin) / gxrange;
    temp = normal_pdf(avg3, std3, avg3);
    y1   = margin.top + graphHeight - yheight * (temp - gymin) / gyrange - 10;
    str  = "N(" + f2(avg3) + ", " + f2(std3) + "²)";
    chart.append("text")
         .attr("x", x1)
         .attr("y", y1)
         .style("font-size", "1em")
         .style("font-family", "sans-seirf")
         .style("stroke", "DeepSkyBlue")
         .style("text-anchor", "middle")
         .text(str)
  }

