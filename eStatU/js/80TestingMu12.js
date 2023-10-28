      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth2   = 600;
      svgHeight2  = 400;
      var k, nobs, avg, std, gxmin, gxmax, gymin, gymax, temp;
      var title;
      var df, df1, df2, info, alpha, tvalue, pvalue, b, c, d, e, f, g, h, t1, t2, temp1, temp2;
      var mu4, nn41,nn42, xbar41, xbar42, var41, var42, teststat, varPooled, varAdd, nDiff, avgDiff, varDiff, stdDiff;
      var x = [];
      var y = [];
      var left, right;
      var tval1 = "t<sub>n<sub>1</sub> + n<sub>2</sub> - 2 ; &alpha;/2</sub> ";
      var tval2 = "t<sub>&phi; ; &alpha;/2</sub>";
      var tval3 = "t<sub>n<sub>d</sub> - 1 ; &alpha;/2</sub>";
      var intT1 = "( x&#772;<sub>1</sub> - x&#772;<sub>2</sub> ) &nbsp; &plusmn; &nbsp;[ D + t<sub>n<sub>1</sub> + n<sub>2</sub> - 2 ; &alpha;/2</sub> &nbsp; &radic; ( s<sub>p</sub><sup>2</sup> / n<sub>1</sub> + s<sub>p</sub><sup>2</sup> / n<sub>2</sub> ) ]";
      var intT2 = "( x&#772;<sub>1</sub> - x&#772;<sub>2</sub> ) &nbsp; &plusmn; &nbsp; [ D + t<sub>&phi; ; &alpha;/2</sub> &nbsp; &radic; ( s<sub>1</sub><sup>2</sup> / n<sub>1</sub> + s<sub>2</sub><sup>2</sup> / n<sub>2</sub> ) ]";
      var intT3 = " d&#772; &plusmn; [ D + t<sub>n<sub>d</sub>-1 ; &alpha;/2</sub> &nbsp; (s<sub>d</sub> / &radic; n<sub>d</sub> )";
      var varT1 = "s<sub>p</sub><sup>2</sup> = [(n<sub>1</sub>-1) s<sub>1</sub><sup>2</sup> + (n<sub>2</sub>-1) s<sub>2</sub><sup>2</sup>] / (n<sub>1</sub> + n<sub>2</sub> - 2)";
      var varT2 = "&phi; = (s<sub>1</sub><sup>2</sup>/n<sub>1</sub> + s<sub>2</sub><sup>2</sup>/n<sub>2</sub>)<sup>2</sup> / [(s<sub>1</sub><sup>2</sup>/n<sub>1</sub>)<sup>2</sup>/(n<sub>1</sub>-1) + (s<sub>2</sub><sup>2</sup>/n<sub>2</sub>)<sup>2</sup>/(n<sub>2</sub>-1)   ]"; 
      var varT3 = "s<sub>d</sub> / &radic; n<sub>d</sub>";
      var h1, h1Type;
      var test, testType;
      var sample, sampleType;
      document.getElementById("tformula").innerHTML   = tval1;
      document.getElementById("intFormula").innerHTML = intT1;
      document.getElementById("varFormula").innerHTML = varT1;
      document.getElementById("tvalue").disabled = true;    
      document.getElementById("cleft").disabled  = true;    
      document.getElementById("cright").disabled = true;    
      document.getElementById("ansFormula").disabled = true;    

      // H1 type
      h1 = document.myForm0.type0;
      h1Type = h1.value; 
      h1[0].onclick = function() { h1Type = 1; if (checkExecute) testingHypothesisMu12(); }    // 양측검정
      h1[1].onclick = function() { h1Type = 2; if (checkExecute) testingHypothesisMu12(); }    // 우측검정
      h1[2].onclick = function() { h1Type = 3; if (checkExecute) testingHypothesisMu12(); }    // 좌측검정

      // Test type
      test = document.myForm1.type1;
      testType = test.value;
      var hypoType = 41;
      var checkExecute = false;
      document.getElementById("cleft").disabled  = true; 
      document.getElementById("cright").disabled = true;  
      document.getElementById("alpha2").disabled = true;  
      document.getElementById("tvalue").disabled = true;  

      test[0].onclick = function() { // same population variance
        testType = 1; 
        hypoType = 41; 
        bar.selectAll("*").remove();   
        document.getElementById("tformula").innerHTML   = tval1;
        document.getElementById("intFormula").innerHTML = intT1;
        document.getElementById("varFormula").innerHTML = varT1;
        document.getElementById("cleft").value  = "";
        document.getElementById("cright").value = "";
        document.getElementById("ansFormula").value = "";
        if (checkExecute) testingHypothesisMu12();
      }  
      test[1].onclick = function() { // not same population variances
        testType = 2; 
        hypoType = 42; 
        bar.selectAll("*").remove(); 
        document.getElementById("tformula").innerHTML   = tval2;
        document.getElementById("intFormula").innerHTML = intT2;
        document.getElementById("varFormula").innerHTML = varT2;
        document.getElementById("cleft").value  = "";
        document.getElementById("cright").value = "";
        document.getElementById("ansFormula").value = "";
        if (checkExecute) testingHypothesisMu12();
      }  

      // Sample type
      document.getElementById("nDiff").disabled = true;    
      document.getElementById("avgDiff").disabled = true;    
      document.getElementById("varDiff").disabled = true;    
      sample = document.myForm3.type3;
      sampleType = sample.value;
      sample[0].onclick = function() { // independent sample
        sampleType = 1; 
        document.getElementById("samevari").disabled = false;    
        document.getElementById("diffvari").disabled = false;    
        document.getElementById("nDiff").disabled = true;    
        document.getElementById("avgDiff").disabled = true;    
        document.getElementById("varDiff").disabled = true;   
        document.getElementById("nDiff").value = "";    
        document.getElementById("avgDiff").value = "";    
        document.getElementById("varDiff").value = "";   
        if (testType == 1) { // same variance
          hypoType = 41;
          document.getElementById("tformula").innerHTML   = tval1;
          document.getElementById("intFormula").innerHTML = intT1;
          document.getElementById("varFormula").innerHTML = varT1;
          document.getElementById("tvalue").value = "";
          document.getElementById("cleft").value  = "";
          document.getElementById("cright").value = "";
          document.getElementById("ansFormula").value = "";
          if (checkExecute) testingHypothesisMu12();
        }
        else if (testType == 2) { // different variance
          hypoType = 42;
          document.getElementById("tformula").innerHTML   = tval2;
          document.getElementById("intFormula").innerHTML = intT2;
          document.getElementById("varFormula").innerHTML = varT2;
          document.getElementById("tvalue").value = "";
          document.getElementById("cleft").value  = "";
          document.getElementById("cright").value = "";
          document.getElementById("ansFormula").value = "";
          if (checkExecute) testingHypothesisMu12();
        }
      }  
      sample[1].onclick = function() { // paired sample
        sampleType = 2; 
        if ( nn41 != nn42 ){ // wrong input
            bar.selectAll("*").remove();
            bar.append("text").attr("x", 50).attr("y", 100).style("stroke","red")
               .text("Paired sample should have the same sample size.")
            bar.append("text").attr("x", 50).attr("y", 120).style("stroke","red")
               .text("종속표본은 표본의 크기가 같아야 합니다.")
            return;
        }
        document.getElementById("samevari").disabled = true;    
        document.getElementById("diffvari").disabled = true;    
        document.getElementById("nDiff").disabled = false;    
        document.getElementById("avgDiff").disabled = false;    
        document.getElementById("varDiff").disabled = false;   
        hypoType = 43;
        document.getElementById("tformula").innerHTML   = tval3;
        document.getElementById("intFormula").innerHTML = intT3;
        document.getElementById("varFormula").innerHTML = varT3;
        document.getElementById("tvalue").value   = "";
        document.getElementById("cleft").value    = "";
        document.getElementById("cright").value   = "";
        document.getElementById("ansFormula").value = "";
       if (checkExecute) testingHypothesisMu12();
      }

      // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        x = data;
        document.getElementById("nn41").value   = stat.n;    
        document.getElementById("xbar41").value = f2(stat.xbar);
        document.getElementById("var41").value  = f2(stat.var);    
      });

      d3.select("#data2").on("input", function() {
        stat = simplestat("#data2");  
        y = data; 
        document.getElementById("nn42").value   = stat.n;    
        document.getElementById("xbar42").value = f2(stat.xbar);
        document.getElementById("var42").value  = f2(stat.var);    
      });

      updateData = function() {
        document.getElementById("data1").value = '';
        document.getElementById("data2").value = '';    
      }

      d3.select("#nn41").on("input", updateData);
      d3.select("#nn42").on("input", updateData);
      d3.select("#xbar41").on("input", updateData);
      d3.select("#xbar42").on("input", updateData);
      d3.select("#var41").on("input", updateData);
      d3.select("#var42").on("input", updateData);

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.myForm0.type0[0].checked = true;
        document.myForm1.type1[0].checked = true;
        document.myForm3.type3[0].checked = true;
        document.getElementById("mu4").value     = "0";
        document.getElementById("alpha").value   = "0.05";
        document.getElementById("alpha2").value  = "0.05";
        document.getElementById("data1").value   = "";
        document.getElementById("data2").value   = "";
        document.getElementById("nn41").value    = "";
        document.getElementById("nn42").value    = "";
        document.getElementById("nDiff").value   = "";
        document.getElementById("xbar41").value  = "";
        document.getElementById("xbar42").value  = "";
        document.getElementById("avgDiff").value = "";
        document.getElementById("var41").value   = "";
        document.getElementById("var42").value   = "";
        document.getElementById("varDiff").value = "";
        document.getElementById("tvalue").value  = "";
        document.getElementById("cleft").value   = "";
        document.getElementById("cright").value  = "";
        document.getElementById("ansFormula").value = "";
        document.getElementById("samevari").disabled = false;    
        document.getElementById("diffvari").disabled = false;    
        document.getElementById("nDiff").disabled    = true;    
        document.getElementById("avgDiff").disabled  = true;    
        document.getElementById("varDiff").disabled  = true;   
        hypoType = 41;
        document.getElementById("tformula").innerHTML   = tval1;
        document.getElementById("intFormula").innerHTML = intT1;
        document.getElementById("varFormula").innerHTML = varT1;
      })

      // Testing Hypothesis ===========================================================
      d3.select("#executeTH4").on("click",function() {
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
        mu4    = parseFloat(d3.select("#mu4").node().value);
        stat = simplestat("#data1");
        if (stat.n > 0) {
            nn41    = stat.n;
            xbar41  = stat.xbar;
            var41   = stat.var;
        }
        else {
            nn41   = parseFloat(d3.select("#nn41").node().value);
            xbar41 = parseFloat(d3.select("#xbar41").node().value);
            var41  = parseFloat(d3.select("#var41").node().value);
        }
        stat = simplestat("#data2");
        if (stat.n > 0) {
            nn42    = stat.n;
            xbar42  = stat.xbar;
            var42   = stat.var;
        }
        else {
            nn42   = parseFloat(d3.select("#nn42").node().value);
            xbar42 = parseFloat(d3.select("#xbar42").node().value);
            var42  = parseFloat(d3.select("#var42").node().value);
        }

        if (sampleType == 1) { // independent sample
          // input validataion
          if (isNaN(nn41) || isNaN(nn42) || isNaN(xbar41) || isNaN(xbar42) || isNaN(var41) || isNaN(var42) ||
            nn41 < 2 || nn42 < 2 || var41 <= 0 || var42 <= 0) {  // wrong input
            bar.append("text").attr("x", 50).attr("y", 100).style("stroke","red")
               .text("No input or wrong input !!   Try again.")  
            bar.append("text").attr("x", 50).attr("y", 120).style("stroke","red")
               .text("입력자료가 없든지 잘못 입력하였습니다.")
            return; 
          }          
        }
        else if (sampleType == 2) {  // dependent sample
          if (stat.n == 0) {
            nDiff   = parseFloat(d3.select("#nDiff").node().value);
            avgDiff = parseFloat(d3.select("#avgDiff").node().value);
            varDiff = parseFloat(d3.select("#varDiff").node().value);
            if ( isNaN(nDiff) || isNaN(avgDiff) || isNaN(varDiff) ) {
              bar.selectAll("*").remove();
              bar.append("text").attr("x", 50).attr("y", 100).style("stroke","red")
                 .text("No data input for paired sample t-test.")
              bar.append("text").attr("x", 50).attr("y", 120).style("stroke","red")
                 .text("종속표본 검정을 위한 데이터 입력이 없습니다.")
              return;
            }
            stdDiff = Math.sqrt(varDiff);
          }
          else if ( nn41 != nn42 ){ // wrong input
            bar.selectAll("*").remove();
            bar.append("text").attr("x", 50).attr("y", 120).style("stroke","red")
               .text("Paired sample should have the same sample size.")
            bar.append("text").attr("x", 50).attr("y", 100).style("stroke","red")
               .text("종속표본은 표본의 크기가 같아야 합니다.")
            return;
          }
        }
        testingHypothesisMu12();

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

function testingHypothesisMu12() {
        bar.selectAll("*").remove();
        // test statistics
        if (sampleType == 1) { // independent sample
            h = alpha / 2;
            if (testType == 1) { // same variance
              df  = nn41 + nn42 - 2;
              df1 = nn41 - 1;
              df2 = nn42 - 1;
              varPooled = ( df1*var41 + df2*var42 ) / df;
              document.getElementById("ansFormula").value   = f3(varPooled);
              temp1    = Math.sqrt(varPooled/nn41 + varPooled/nn42);
              tvalue   = t_inv(1-h, df, info);
              temp2    = mu4 + tvalue * temp1;
              teststat = (xbar41 - xbar42 - mu4) / temp1; 
              left  = (xbar41 - xbar42) - temp2 ;
              right = (xbar41 - xbar42) + temp2 ;
            }
            else { // different variance
              t1     = var41 / nn41;
              t2     = var42 / nn42;
              varAdd = t1 + t2;
              temp1  = Math.sqrt(varAdd);
              df = varAdd * varAdd / ((t1*t1/df1) + (t2*t2/df2));
              document.getElementById("ansFormula").value   = f3(df);
              tvalue = t_inv(1-h, df, info);
              temp2    = mu4 + tvalue * temp1;
              teststat = (xbar41 - xbar42 - mu4) / temp1;
              left  = (xbar41 - xbar42) - temp2 ;
              right = (xbar41 - xbar42) + temp2 ;
            }
        } else if (sampleType == 2) { // paired sample
          if (x.length > 0 ) {
            nDiff   = x.length
            avgDiff = 0;
            for (k=0; k<x.length; k++) avgDiff += (x[k] - y[k]);
            avgDiff /= nDiff;
            varDiff = 0;
            for (k=0; k<x.length; k++) {
              temp = (x[k] - y[k])-avgDiff;
              varDiff += temp*temp;
            }
            if (varDiff == 0) varDiff = 0;
            else varDiff /= (x.length - 1) ;
            stdDiff = Math.sqrt(varDiff);
            document.getElementById("nDiff").value   = f3(x.length); 
            document.getElementById("avgDiff").value = f3(avgDiff); 
            document.getElementById("varDiff").value = f3(varDiff); 
          }
          document.getElementById("ansFormula").value = f3(stdDiff / Math.sqrt(nDiff));
          if (varDiff == 0) teststat = 0; 
          else {
              df = nDiff - 1;
              temp1 = stdDiff / Math.sqrt(nDiff);
              h     = alpha / 2;
              tvalue= t_inv(1-h, df, info);
              temp2 = mu4 + tvalue * temp1;
              teststat = (avgDiff - mu4) / temp1;
              left  = avgDiff - temp2 ;
              right = avgDiff + temp2 ;
            }
        }    
        document.getElementById("tvalue").value = f3(tvalue);
        document.getElementById("cleft").value  = f3(left);
        document.getElementById("cright").value = f3(right); 

          if (h1Type == 1) {
            h = alpha / 2;  
            if (testType == 1) { // t-test same variance
              f = t_inv(h, df, info);
              g = -f;
              if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
              else  pvalue = 2 * (1 - t_cdf(teststat, df, info));
            }
            else if (testType == 2) { // t-test different variance
                f = t_inv(h, df, info);
                g = -f;
                if (teststat < 0) pvalue = 2 * t_cdf(teststat, df, info);
                else pvalue = 2 * (1 - t_cdf(teststat, df, info));
            }
            drawTdistGraphTH(hypoType, h1Type, teststat, df, f, g, h, pvalue, mu4);
          }
          else if (h1Type == 2) {
            h = alpha; 
            if (testType == 1) {             
              f = t_inv(0.0001, df, info);
              g = t_inv(1-h, df, info);
              pvalue = 1 - t_cdf(teststat, df, info);
            }
            else if (testType == 2) {
                f = t_inv(0.0001, df, info);
                g = t_inv(1 - h, df, info);
                pvalue = 1 - t_cdf(teststat, df, info);
            }
            drawTdistGraphTH(hypoType, h1Type, teststat, df, f, g, h, pvalue, mu4);
          }
          else {
            h = alpha; 
            if (testType == 1) { 
              f = t_inv(h, df, info);
              g = t_inv(0.9999, df, info);
              pvalue = t_cdf(teststat, df, info);
            }
            else if (testType == 2) {
                f = t_inv(h, df, info);
                g = t_inv(0.9999, df, info);
                pvalue = t_cdf(teststat, df, info);
            }
            drawTdistGraphTH(hypoType, h1Type, teststat, df, f, g, h, pvalue, mu4);
          }  
}        
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingHypothesisMu12();
} 
