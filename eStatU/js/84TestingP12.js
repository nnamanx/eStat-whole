      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth2   = 600;
      svgHeight2  = 400;

      var nobs, avg, std, gxmin, gxmax, gymin, gymax;
      var title;
      var info, alpha, pvalue, b, c, d, e, f, g, h, t1, t2;
      var mu6, nn61,nn62, pp61, pp62, teststat, pbar, zvalue, cleft, cright, temp;
      var hypoType = 6;
      var checkExecute = false;

      document.getElementById("cleft").disabled  = true;
      document.getElementById("cright").disabled = true; 
      document.getElementById("alpha2").disabled = true;  
      document.getElementById("zvalue").disabled = true;  
      document.getElementById("pbar").disabled = true;  

      // H1 type
      var h1 = document.myForm0.type0;
      var h1Type = h1.value; 
      h1[0].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisP12(); }    // 양측검정
      h1[1].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisP12(); }    // 우측검정
      h1[2].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisP12(); }    // 좌측검정

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("nn61").value   = "";
        document.getElementById("nn62").value   = "";
        document.getElementById("pp61").value   = "";
        document.getElementById("pp62").value   = "";
        document.getElementById("cleft").value  = "";
        document.getElementById("cright").value = "";
        document.getElementById("zvalue").value = "";
        document.getElementById("pbar").value   = "";
        document.getElementById("alpha").value  = 0.05;
        document.getElementById("alpha2").value = 0.05;
      })

      // Testing Hypothesis ===========================================================
      d3.select("#executeTH6").on("click",function() {
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
        mu6    = parseFloat(d3.select("#mu6").node().value);
        nn61   = parseFloat(d3.select("#nn61").node().value);
        nn62   = parseFloat(d3.select("#nn62").node().value);
        pp61   = parseFloat(d3.select("#pp61").node().value);
        pp62   = parseFloat(d3.select("#pp62").node().value);
        if (isNaN(nn61) || isNaN(nn62) || isNaN(pp61) || isNaN(pp62) ||
            nn61 < 2 || nn62 < 2 || pp61 <= 0 || pp62 <= 0 || pp61 >= 1 || pp62 >= 1) {  // wrong input
          bar.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
             .text("No input or wrong input !!   Try again.")
             .style("stroke","red")
          return;
        }
        testingHypothesisP12();
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

function testingHypothesisP12() {
        bar.selectAll("*").remove();
        // test statistics
        pbar = ( nn61*pp61 + nn62*pp62 ) / (nn61 + nn62);
        temp = Math.sqrt(pbar*(1-pbar)* (1/nn61 + 1/nn62)); 
        teststat = (pp61 - pp62 - mu6) / temp; 
        // confidence interval
        h = 1 - alpha / 2;
        zvalue   = stdnormal_inv(h, info);
        cleft  = (pp61 - pp62 - mu6) - zvalue * temp;
        cright = (pp61 - pp62 - mu6) + zvalue * temp;
        document.getElementById("zvalue").value = f3(zvalue);  
        document.getElementById("pbar").value   = f3(pbar);  
        document.getElementById("cleft").value  = f3(cleft);  
        document.getElementById("cright").value = f3(cright);  

        if (h1Type == 1) {
            h = alpha / 2;  
            f = stdnormal_inv(h, info);
            g = -f;
            if (teststat < 0) pvalue = 2 * stdnormal_cdf(teststat);
            else  pvalue = 2 * (1 - stdnormal_cdf(teststat));
            drawNormalGraphTH(hypoType, h1Type, teststat, 0, 1, f, g, h, pvalue, mu6);
        }
        else if (h1Type == 2) {
            h = alpha;  
            f = -5
            g = stdnormal_inv(1-h, info);
            pvalue = 1 - stdnormal_cdf(teststat);
            drawNormalGraphTH(hypoType, h1Type, teststat, 0, 1, f, g, h, pvalue, mu6);
        }
        else {
            h = alpha;  
            f = stdnormal_inv(h, info);
            g = 5;
            pvalue = stdnormal_cdf(teststat);
            drawNormalGraphTH(hypoType, h1Type, teststat, 0, 1, f, g, h, pvalue, mu6);
        }
}
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingHypothesisP12();
} 

