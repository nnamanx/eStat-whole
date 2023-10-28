      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth2   = 600;
      svgHeight2  = 400;
      var nobs, gxmin, gxmax, gymin, gymax;
      var stat = new Array(30);
      var title;
      var df, info, alpha, pvalue, b, c, d, e, f, g, h;
      var var2, nn2, var2, teststat, left, right, chiValueL, chiValueR;
      var hypoType = 2;
      var checkExecute = false;

      document.getElementById("cleft").disabled  = true;
      document.getElementById("cright").disabled = true; 
      document.getElementById("alpha2").disabled = true;  
      document.getElementById("chiValueL").disabled = true;  
      document.getElementById("chiValueR").disabled = true;  

      // H1 type
      var h1 = document.myForm0.type0;
      var h1Type = h1.value; 
      h1[0].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisVariance(); }    // 양측검정
      h1[1].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisVariance(); }    // 우측검정
      h1[2].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisVariance(); }    // 좌측검정


      // data input control =====================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        document.getElementById("nn2").value   = stat.n;    
        document.getElementById("var2S").value  = f3(stat.var);    
      });
      updateData = function() {
        document.getElementById("data1").value = ''; 
      }
      d3.select("#nn2").on("input", updateData);
      d3.select("#var2S").on("input", updateData);

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.myForm0.type0[0].checked = true;
        document.getElementById("var2").value   = "";
        document.getElementById("data1").value  = "";
        document.getElementById("nn2").value    = "";
        document.getElementById("var2S").value  = "";
        document.getElementById("alpha").value  = "0.05";
        document.getElementById("alpha2").value = "0.05";
        document.getElementById("chiValueL").value  = ""; 
        document.getElementById("chiValueR").value  = ""; 
        document.getElementById("cleft").value      = ""; 
        document.getElementById("cright").value     = ""; 
       })

      // Testing Hypothesis ======================================
      d3.select("#executeTH2").on("click",function() {
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
        var2  = parseFloat(d3.select("#var2").node().value);
        stat = simplestat("#data1");
        if (stat.n > 0) {
          nn2   = stat.n;
          var2S = stat.var;
        }
        else {
          nn2   = parseFloat(d3.select("#nn2").node().value);
          var2S = parseFloat(d3.select("#var2S").node().value);
        }
        if (isNaN(var2) || isNaN(nn2) || isNaN(var2S) || var2 <= 0 || nn2 < 2 || var2S <= 0 ) {  // wrong input
          bar.append("text").attr("class","mean")
             .attr("x", 150)
             .attr("y", 100)
             .text("No input or wrong input !!   Try again.")
             .style("stroke","red")
          return;
        }
        // Testing
        testingHypothesisVariance();
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

function testingHypothesisVariance() {
        bar.selectAll("*").remove();
        // confidence interval
        df = nn2 - 1;
        chiValueL = chisq_inv(1 - alpha/2, df, info);
        chiValueR = chisq_inv(alpha/2, df, info);
        left  = (nn2 - 1) * var2S / chiValueL;
        right = (nn2 - 1) * var2S / chiValueR;
        document.getElementById("chiValueL").value = f3(chiValueL);  
        document.getElementById("chiValueR").value = f3(chiValueR);  
        document.getElementById("cleft").value   = f3(left);
        document.getElementById("cright").value  = f3(right);
        // test statistics
        teststat = df *  var2S / var2;
        if (h1Type == 1) {
            h = alpha / 2;  
            f = chisq_inv(h, df, info);
            g = chisq_inv(1-h, df, info);
            pvalue = chisq_cdf(teststat, df, info);
            if (pvalue > 0.5 ) pvalue = 1 - pvalue; 
            pvalue = 2 * pvalue;
            drawChisqGraphTH(hypoType, h1Type, teststat, df, f, g, h, pvalue, var2);
        }
        else if (h1Type == 2) {
            h = alpha;  
            if (df < 10) f = 0;
            else f = chisq_inv(0.0001, df, info);
            g = chisq_inv(1-h, df, info);
            pvalue = 1 - chisq_cdf(teststat, df, info);
            drawChisqGraphTH(hypoType, h1Type, teststat, df, f, g, h, pvalue, var2);
        }
        else {
            h = alpha;  
            f = chisq_inv(h, df, info);
            if (df < 5) g = 12;
            else if (df < 10) g = 30;
            else g = chisq_inv(0.9999, df, info);
            pvalue = chisq_cdf(teststat, df, info);
            drawChisqGraphTH(hypoType, h1Type, teststat, df, f, g, h, pvalue, var2);
        }          
}
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingHypothesisVariance();
} 
