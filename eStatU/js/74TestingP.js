      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth2   = 600;
      svgHeight2  = 400;

      var nobs, avg, std, info, gxmin, gxmax, gymin, gymax;
      var title;
      var alpha, pvalue, b, c, d, e, f, g, h;
      var mu, nn, pp, std, teststat, left, right, temp, zvalue;
      var hypoType = 3;
      var checkExecute = false;

      document.getElementById("cleft").disabled  = true;
      document.getElementById("cright").disabled = true; 
      document.getElementById("alpha2").disabled = true;  
      document.getElementById("zvalue").disabled = true;  

      // H1 type
      var h1 = document.myForm0.type0;
      var h1Type = h1.value; 
      h1[0].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisP(); }    // 양측검정
      h1[1].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisP(); }    // 우측검정
      h1[2].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisP(); }    // 좌측검정

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.myForm0.type0[0].checked = true;
        document.getElementById("mu").value  = "";
        document.getElementById("nn").value  = "";
        document.getElementById("pp").value  = "";
        document.getElementById("alpha").value  = "0.05";
        document.getElementById("alpha2").value = "0.05";
        document.getElementById("zvalue").value  = ""; 
        document.getElementById("cleft").value      = ""; 
        document.getElementById("cright").value     = ""; 
       })

      // Testing Hypothesis ======================================
      d3.select("#executeTH3").on("click",function() {
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
        mu = parseFloat(d3.select("#mu").node().value);
        nn = parseFloat(d3.select("#nn").node().value);
        pp = parseFloat(d3.select("#pp").node().value);
        if (isNaN(mu) || isNaN(nn) || isNaN(pp) || mu <= 0 || mu >= 1 || nn < 2 || pp <= 0 || pp >= 1) {  // wrong input
          bar.append("text").attr("class","mean")
             .attr("x", 150)
             .attr("y", 100)
             .text("No input or wrong input !!   Try again.")
             .style("stroke","red")
          return;
        }
        testingHypothesisP();
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

function testingHypothesisP() {
        bar.selectAll("*").remove();
        // confidence interval
        zvalue = stdnormal_inv(1 - alpha/2, info);
        temp   = zvalue * Math.sqrt(pp*(1-pp)/nn);
        left   = pp - temp;
        right  = pp + temp;  
        document.getElementById("zvalue").value  = f3(zvalue);
        document.getElementById("cleft").value   = f3(left);
        document.getElementById("cright").value  = f3(right); 

        // test statistics
        teststat = (pp - mu) / (Math.sqrt(mu*(1-mu)/nn));
        if (h1Type == 1) {
            h = alpha / 2;  
            f = stdnormal_inv(h, info);
            g = -f;
            if (teststat < 0) pvalue = 2 * stdnormal_cdf(teststat);
            else  pvalue = 2 * (1 - stdnormal_cdf(teststat));
            drawNormalGraphTH(hypoType, h1Type, teststat, 0, 1, f, g, h, pvalue, mu);
        }
        else if (h1Type == 2) {
            h = alpha;  
            f = -5
            g = stdnormal_inv(1-h, info);
            pvalue = 1 - stdnormal_cdf(teststat);
            drawNormalGraphTH(hypoType, h1Type, teststat, 0, 1, f, g, h, pvalue, mu);
        }
        else {
            h = alpha;  
            f = stdnormal_inv(h, info);
            g = 5;
            pvalue = stdnormal_cdf(teststat);
            drawNormalGraphTH(hypoType, h1Type, teststat, 0, 1, f, g, h, pvalue, mu);
        }
}
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingHypothesisP();
} 
