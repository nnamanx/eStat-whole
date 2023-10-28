      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var margin      = {top: 10, bottom: 10, left: 10, right: 10};
      var svgWidth2   = 600;
      var svgHeight2  = 200;
      var graphWidth  = svgWidth2 - margin.left - margin.right;
      var graphHeight = svgHeight2 - margin.top - margin.bottom;

      var gxmin, gxmax, gymin, gymax;
      var title;
      var df, info, alpha, confidence;
      var nn, xbar, stdP, temp, tvalue;
 
      document.getElementById("nn").disabled  = true;

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        document.getElementById("xbar").value       = "";
        document.getElementById("variS").value      = "";
        document.getElementById("confidence").value = "0.95";
        document.getElementById("nn").value         = "";
      })

      // Execute ======================================
      d3.select("#executeTH").on("click",function() {
        bar.selectAll("*").remove();
        // input value
        xbar  = parseFloat(d3.select("#xbar").node().value);
        stdP  = parseFloat(d3.select("#variS").node().value);
        confidence = parseFloat(d3.select("#confidence").node().value);
        alpha = 1 - confidence;
        tvalue = stdnormal_inv(1 - alpha/2, info);
        if ( isNaN(xbar) || isNaN(stdP) || isNaN(confidence) || xbar < 0 || confidence < 0.00001 || confidence > 0.99999 ) {  // wrong input
          alert("No input or wrong input !!   Try again.")
        }
        else if ( stdP < 0 || stdP > 1) {  // wrong input
          alert("wrong input on std dev !!   Try again.")
        }
        else {
          nn = stdP * (1 - stdP) * tvalue * tvalue / (xbar*xbar);
          document.getElementById("nn").value = f1(nn);    
        }
      })
