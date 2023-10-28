      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth2   = 600;
      svgHeight2  = 400;
      var nobs, stat, gxmin, gxmax, gymin, gymax;
      var stat5 = new Array(9);
      var title;
      var df1, df2, info, alpha, pvalue, b, c, d, e, f, g, h;
      var nn51, nn52, var51, var52;
      var hypoType = 5;
      var checkExecute = false;
      document.getElementById("alpha2").disabled = true;  

      // H1 type
      var h1 = document.myForm0.type0;
      var h1Type = h1.value; 
      h1[0].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisV12(); }    // 양측검정
      h1[1].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisV12(); }    // 우측검정
      h1[2].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisV12(); }    // 좌측검정

      // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        document.getElementById("nn51").value   = stat.n;    
        document.getElementById("var51").value  = f2(stat.var);    
      });

      d3.select("#data2").on("input", function() {
        stat = simplestat("#data2");   
        document.getElementById("nn52").value   = stat.n;    
        document.getElementById("var52").value  = f2(stat.var);    
      });

      updateData = function() {
        document.getElementById("data1").value = '';
        document.getElementById("data2").value = '';    
      }

      d3.select("#nn51").on("input", updateData);
      d3.select("#nn52").on("input", updateData);
      d3.select("#var51").on("input", updateData);
      d3.select("#var52").on("input", updateData);

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("alpha").value  = 0.05;
        document.getElementById("alpha2").value = 0.05;
        document.getElementById("data1").value  = "";
        document.getElementById("data2").value  = "";
        document.getElementById("nn51").value   = "";
        document.getElementById("nn52").value   = "";
        document.getElementById("var51").value  = "";
        document.getElementById("var52").value  = "";
      })

      // Testing Hypothesis ===========================================================
      d3.select("#executeTH5").on("click",function() {
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
        stat = simplestat("#data1");
        if (stat.n > 0) {
          nn51    = stat.n;
          var51   = stat.var;
        }
        else {
          nn51   = parseFloat(d3.select("#nn51").node().value);
          var51  = parseFloat(d3.select("#var51").node().value);
        }
        stat = simplestat("#data2");
        if (stat.n > 0) {
          nn52    = stat.n;
          var52   = stat.var;
        }
        else {
          nn52   = parseFloat(d3.select("#nn52").node().value);
          var52  = parseFloat(d3.select("#var52").node().value);
        }
        if (isNaN(nn51) || isNaN(nn52) || isNaN(var51) || isNaN(var52) ||
               nn51 < 2 || nn52 <2 || var51 <= 0 || var52 <= 0) {  // wrong input
          bar.append("text").attr("class","mean")
             .attr("x", 150)
             .attr("y", 100)
             .text("No input or wrong input !!   Try again.")
             .style("stroke","red")
          return;
        }
        testingHypothesisV12();
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

function testingHypothesisV12() {
        bar.selectAll("*").remove();
        // test statistics
        df1   = nn51 - 1;
        df2   = nn52 - 1;
        stat5[0] = var51 / var52;
        if (h1Type == 1) {
            h = alpha / 2;  
            f = f_inv(h, df1, df2, info);
            g = f_inv(1-h, df1, df2, info);
            pvalue = f_cdf(stat5[0], df1, df2, info);
            if (pvalue > 0.5) pvalue = 1 - pvalue;
            pvalue = 2 * pvalue;
            drawFdistGraphTH(hypoType, h1Type, stat5, df1, df2, f, g, h, pvalue);
        }
        else if (h1Type == 2) {
            h = alpha;  
            f = 0;
            g = f_inv(1-h, df1, df2, info);
            pvalue = 1 - f_cdf(stat5[0], df1, df2, info);
            drawFdistGraphTH(hypoType, h1Type, stat5, df1, df2, f, g, h, pvalue);
          }
        else {
            h = alpha;  
            f = f_inv(h, df1, df2, info);
            g = 10;
            pvalue = f_cdf(stat5[0], df1, df2, info);
            drawFdistGraphTH(hypoType, h1Type, stat5, df1, df2, f, g, h, pvalue);
        }          
}
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingHypothesisV12();
} 
