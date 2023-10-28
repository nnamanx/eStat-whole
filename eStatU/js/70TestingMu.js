      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var graphWidth2, graphHeight2;
      var svgWidth2   = 600;
      var svgHeight2  = 400;
      var nobs, avg, gxmin, gxmax, gymin, gymax;
      var title;
      var df, info, alpha, pvalue, b, c, d, e, f, g, h;
      var mu, nn, xbar, std, stat, teststat, left, right, tvalue, temp, variS, variP;
      var tformula = "t<sub>n-1; &alpha;/2</sub>";
      var zformula = "z<sub>&alpha;/2</sub>";
      var intT = "t<sub>n-1 ; &alpha;/2</sub> &nbsp; (s / &radic; n )";
      var intZ = "z<sub>&alpha;/2</sub> &nbsp; (&sigma; / &radic; n )";
      var hypoType = 1;
      var checkExecute = false;
      document.getElementById("cleft").disabled  = true; 
      document.getElementById("cright").disabled = true;  
      document.getElementById("alpha2").disabled = true;  
      document.getElementById("tvalue").disabled = true;  

      // H1 type
      var h1 = document.myForm0.type0;
      var h1Type = h1.value; 
      h1[0].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisMu(); }    // 양측검정
      h1[1].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisMu(); }    // 우측검정
      h1[2].onclick = function() { h1Type = h1.value; if (checkExecute) testingHypothesisMu(); }    // 좌측검정

function clearText(){
      document.getElementById("tformula").value  = ""; 
      document.getElementById("tvalue").value  = ""; 
      document.getElementById("intFormula").value  = ""; 
      document.getElementById("cleft").value  = ""; 
      document.getElementById("cright").value  = ""; 
}
      // Test type
      var test = document.myForm1.type1;
      var testType = test.value;
      document.getElementById("variP").disabled  = true; 
      document.getElementById("tformula").innerHTML = tformula;
      document.getElementById("intFormula").innerHTML = intT;
      test[0].onclick = function() { // t-test 
        testType = 1; 
        clearText();
        document.getElementById("tformula").innerHTML = tformula;
        document.getElementById("intFormula").innerHTML = intT;
        document.getElementById("variP").value     = null; 
        document.getElementById("variS").disabled  = false; 
        document.getElementById("variP").disabled  = true; 
      }  
      test[1].onclick = function() { // Z-test
        testType = 2; 
        clearText();
        document.getElementById("tformula").innerHTML = zformula;
        document.getElementById("intFormula").innerHTML = intZ;
        document.getElementById("variS").value     = null; 
        document.getElementById("variS").disabled  = true; 
        document.getElementById("variP").disabled  = false; 
      }  

      // data input control =====================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        document.getElementById("nn").value   = stat.n;    
        document.getElementById("xbar").value = f3(stat.xbar);
        document.getElementById("variS").value  = f3(stat.var);  
      });

      updateData = function() {
        document.getElementById("data1").value = ''; 
      }

      d3.select("#nn").on("input", updateData);
      d3.select("#xbar").on("input", updateData);
      d3.select("#variS").on("input", updateData);

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        clearText();
        document.myForm0.type0[0].checked = true;
        document.myForm1.type1[0].checked = true;
        document.getElementById("variP").disabled = true; 
        document.getElementById("mu").value     = "";
        document.getElementById("data1").value  = "";
        document.getElementById("nn").value     = "";
        document.getElementById("xbar").value   = "";
        document.getElementById("variS").value  = "";
        document.getElementById("variP").value  = "";
        document.getElementById("alpha").value  = "0.05";
        document.getElementById("alpha2").value = "0.05";
      })

      // Testing Hypothesis ======================================
      d3.select("#executeTH").on("click",function() {
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
        mu   = parseFloat(d3.select("#mu").node().value);
        stat = simplestat("#data1");
        variP = parseFloat(d3.select("#variP").node().value);
        if (stat.n > 0) {
          nn    = stat.n;
          xbar  = stat.xbar;
          variS = stat.var;
          if (testType == 1) { // t-test
            std   = Math.sqrt(variS);
          }
          else { // Z-test
            std   = Math.sqrt(variP);
          }
        }
        else {
          nn    = parseFloat(d3.select("#nn").node().value);
          xbar  = parseFloat(d3.select("#xbar").node().value);
          variS = parseFloat(d3.select("#variS").node().value);
          if (testType == 1) { // t-test
            std   = Math.sqrt(variS);
          }
          else { // Z-test
            std   = Math.sqrt(variP);
          }
        }
        if (isNaN(mu) || isNaN(nn) || isNaN(xbar) || nn < 2 || std <= 0 ) {  // wrong input
          bar.selectAll("*").remove();
          bar.append("text").attr("class","mean")
             .attr("x", 150)
             .attr("y", 100)
             .text("No input or wrong input !!   Try again.")
             .style("stroke","red")
          return;
        }
        if (testType == 1 && isNaN(variS) ) {    // t-test Sample Statistics checking
          bar.selectAll("*").remove();
          bar.append("text").attr("class","mean")
             .attr("x", 150)
             .attr("y", 100)
             .text("input sample variance")
             .style("stroke","red")
          return;
        }
        if (testType == 2 && isNaN(variP) ) {    // Z-test Population variance checking
          bar.selectAll("*").remove();
          bar.append("text").attr("class","mean")
             .attr("x", 150)
             .attr("y", 100)
             .text("input population variance")
             .style("stroke","red")
          return;
        }
        // Testing
        testingHypothesisMu()
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


function testingHypothesisMu() {
        bar.selectAll("*").remove();
        // confidence interval
        df = nn - 1;
        if (testType == 1) tvalue = t_inv(1 - alpha/2, df, info);
        else tvalue = stdnormal_inv(1 - alpha/2, info);
        temp = tvalue * std / Math.sqrt(nn)
        left  = xbar - temp;
        right = xbar + temp;  
        document.getElementById("tvalue").value  = f3(tvalue);
        document.getElementById("cleft").value   = f3(left);
        document.getElementById("cright").value  = f3(right); 
        // test statistics
        teststat = (xbar - mu) / (std / Math.sqrt(nn));
        if (testType == 2) {    // Z-test
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
        else { // t-test 
          if (isNaN(variS)) {
            bar.append("text").attr("class","mean")
               .attr("x", 150)
               .attr("y", 100)
               .text("Sample variance is NaN.")
               .style("stroke","red")
            return;
          }
          else {
           if (h1Type == 1) {
            h = alpha / 2;  
            f = t_inv(h, df, info);
            g = -f;
            if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
            else  pvalue = 2 * (1 - t_cdf(teststat, df, info));
            drawTdistGraphTH(hypoType, h1Type, teststat, df, f, g, h, pvalue, mu);
           }
           else if (h1Type == 2) {
            h = alpha;  
            f = -5;   //t_inv(0.0001, df, info);
            g = t_inv(1-h, df, info);
            pvalue = 1 - t_cdf(teststat, df, info);
            drawTdistGraphTH(hypoType, h1Type, teststat, df, f, g, h, pvalue, mu);
           }
           else {
            h = alpha;  
            f = t_inv(h, df, info);
            g = 5;    //t_inv(0.9999, df, info);
            pvalue = t_cdf(teststat, df, info);
            drawTdistGraphTH(hypoType, h1Type, teststat, df, f, g, h, pvalue, mu);
           }
          } // end of t-test else
        } // end of t-test         
}
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingHypothesisMu();
} 
