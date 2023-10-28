      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var graphWidth2, graphHeight2;
      var svgWidth2   = 600;
      var svgHeight2  = 400;
      var title;
      var mu0, mu1, stdP, alpha1, alpha2, beta1, beta2, nn1, nn2;
      var ansBeta, ansC;
      var h1Type;

      // Test type
      var testType = 1; 
      document.getElementById("sub1AB").style.display  = "block";
//      document.getElementById("sub2AB").style.display  = "none";
      document.getElementById("C").disabled = true; 
      document.getElementById("betaAB").disabled = true;  
      document.getElementById("mu1AB2").disabled = true;  
      document.getElementById("alpha1AB2").disabled = true;  
      document.getElementById("nn1AB2").disabled = true;  

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("mu0AB").value  = "";
        document.getElementById("mu1AB").value  = "";
        document.getElementById("stdPAB").value = "";
        document.getElementById("nn1AB").value  = "";
        document.getElementById("alpha1AB").value  = "0.05";
        document.getElementById("alpha1AB2").value = "0.05";
        document.getElementById("nn1AB2").value    = ""; 
        document.getElementById("C").value         = ""; 
        document.getElementById("betaAB").value    = ""; 
        document.getElementById("mu1AB2").value    = ""; 
       })

      // Testing Hypothesis ======================================
      d3.select("#executeTH").on("click",function() {
        inputValueAB();
        if (isNaN(mu0) || isNaN(mu1) || isNaN(stdP) ) return;
        if (testType == "1" && isNaN(nn1)) return;
        drawNormalGraphTHAB(testType, h1Type, mu0, mu1, stdP, nn1, nn2, alpha1, alpha2, beta1, beta2);
        document.getElementById("C").value = f2(ansC); 
        document.getElementById("betaAB").value = f3(ansBeta);  
        document.getElementById("mu1AB2").value = mu1;  
        document.getElementById("alpha1AB2").value = alpha1;  
        document.getElementById("nn1AB2").value = nn1;  
      });

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
