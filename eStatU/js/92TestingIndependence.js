      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth2   = 600;
      svgHeight2  = 400;

      var i, j, k, nobs, nrow, ncol, df, info, stat, pvalue, alpha, f, g, h; 
      var gxmin, gxmax, gymin, gymax, title, temp;
      var hypoType = 8;
      var h1Type   = 2;
      var nr = 10;
      var nc = 6;
      var numr = new Array(nc);
      var numc = new Array(nr);
      var cell = new Array(nr);
      var expf = new Array(nr);
      for (i=0; i<nr; i++) {
        cell[i] = new Array(nc);
        expf[i] = new Array(nc);
      }
      var checkExecute = false;
      document.getElementById("alpha2").disabled = true;  
      document.getElementById("data16").disabled = true; 
      document.getElementById("data26").disabled = true; 
      document.getElementById("data36").disabled = true; 
      document.getElementById("data46").disabled = true; 
      document.getElementById("data56").disabled = true; 
      document.getElementById("data66").disabled = true; 
      document.getElementById("data76").disabled = true; 
      document.getElementById("data86").disabled = true; 
      document.getElementById("data96").disabled = true; 
      document.getElementById("data101").disabled = true; 
      document.getElementById("data102").disabled = true; 
      document.getElementById("data103").disabled = true; 
      document.getElementById("data104").disabled = true; 
      document.getElementById("data105").disabled = true; 
      document.getElementById("data106").disabled = true; 

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("data11").value  = "";
        document.getElementById("data12").value  = "";
        document.getElementById("data13").value  = "";
        document.getElementById("data14").value  = "";
        document.getElementById("data15").value  = "";
        document.getElementById("data16").value  = "";
        document.getElementById("data21").value  = "";
        document.getElementById("data22").value  = "";
        document.getElementById("data23").value  = "";
        document.getElementById("data24").value  = "";
        document.getElementById("data25").value  = "";
        document.getElementById("data26").value  = "";
        document.getElementById("data31").value  = "";
        document.getElementById("data32").value  = "";
        document.getElementById("data33").value  = "";
        document.getElementById("data34").value  = "";
        document.getElementById("data35").value  = "";
        document.getElementById("data36").value  = "";
        document.getElementById("data41").value  = "";
        document.getElementById("data42").value  = "";
        document.getElementById("data43").value  = "";
        document.getElementById("data44").value  = "";
        document.getElementById("data45").value  = "";
        document.getElementById("data46").value  = "";
        document.getElementById("data51").value  = "";
        document.getElementById("data52").value  = "";
        document.getElementById("data53").value  = "";
        document.getElementById("data54").value  = "";
        document.getElementById("data55").value  = "";
        document.getElementById("data56").value  = "";
        document.getElementById("data61").value  = "";
        document.getElementById("data62").value  = "";
        document.getElementById("data63").value  = "";
        document.getElementById("data64").value  = "";
        document.getElementById("data65").value  = "";
        document.getElementById("data66").value  = "";
        document.getElementById("data71").value  = "";
        document.getElementById("data72").value  = "";
        document.getElementById("data73").value  = "";
        document.getElementById("data74").value  = "";
        document.getElementById("data75").value  = "";
        document.getElementById("data76").value  = "";
        document.getElementById("data81").value  = "";
        document.getElementById("data82").value  = "";
        document.getElementById("data83").value  = "";
        document.getElementById("data84").value  = "";
        document.getElementById("data85").value  = "";
        document.getElementById("data86").value  = "";
        document.getElementById("data91").value  = "";
        document.getElementById("data92").value  = "";
        document.getElementById("data93").value  = "";
        document.getElementById("data94").value  = "";
        document.getElementById("data95").value  = "";
        document.getElementById("data96").value  = "";
        document.getElementById("data101").value = "";
        document.getElementById("data102").value = "";
        document.getElementById("data103").value = "";
        document.getElementById("data104").value = "";
        document.getElementById("data105").value = "";
        document.getElementById("data106").value = "";
        document.getElementById("alpha").value   = "0.05";
        document.getElementById("alpha2").value  = "0.05";
      })

      // Testing Hypothesis ======================================
      d3.select("#executeTH8").on("click",function() {
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
        cell[1][1] = parseFloat(d3.select("#data11").node().value);
        cell[1][2] = parseFloat(d3.select("#data12").node().value);
        cell[1][3] = parseFloat(d3.select("#data13").node().value);
        cell[1][4] = parseFloat(d3.select("#data14").node().value);
        cell[1][5] = parseFloat(d3.select("#data15").node().value);
        cell[2][1] = parseFloat(d3.select("#data21").node().value);
        cell[2][2] = parseFloat(d3.select("#data22").node().value);
        cell[2][3] = parseFloat(d3.select("#data23").node().value);
        cell[2][4] = parseFloat(d3.select("#data24").node().value);
        cell[2][5] = parseFloat(d3.select("#data25").node().value);
        cell[3][1] = parseFloat(d3.select("#data31").node().value);
        cell[3][2] = parseFloat(d3.select("#data32").node().value);
        cell[3][3] = parseFloat(d3.select("#data33").node().value);
        cell[3][4] = parseFloat(d3.select("#data34").node().value);
        cell[3][5] = parseFloat(d3.select("#data35").node().value);
        cell[4][1] = parseFloat(d3.select("#data41").node().value);
        cell[4][2] = parseFloat(d3.select("#data42").node().value);
        cell[4][3] = parseFloat(d3.select("#data43").node().value);
        cell[4][4] = parseFloat(d3.select("#data44").node().value);
        cell[4][5] = parseFloat(d3.select("#data45").node().value);
        cell[5][1] = parseFloat(d3.select("#data51").node().value);
        cell[5][2] = parseFloat(d3.select("#data52").node().value);
        cell[5][3] = parseFloat(d3.select("#data53").node().value);
        cell[5][4] = parseFloat(d3.select("#data54").node().value);
        cell[5][5] = parseFloat(d3.select("#data55").node().value);
        cell[6][1] = parseFloat(d3.select("#data61").node().value);
        cell[6][2] = parseFloat(d3.select("#data62").node().value);
        cell[6][3] = parseFloat(d3.select("#data63").node().value);
        cell[6][4] = parseFloat(d3.select("#data64").node().value);
        cell[6][5] = parseFloat(d3.select("#data65").node().value);
        cell[7][1] = parseFloat(d3.select("#data71").node().value);
        cell[7][2] = parseFloat(d3.select("#data72").node().value);
        cell[7][3] = parseFloat(d3.select("#data73").node().value);
        cell[7][4] = parseFloat(d3.select("#data74").node().value);
        cell[7][5] = parseFloat(d3.select("#data75").node().value);
        cell[8][1] = parseFloat(d3.select("#data81").node().value);
        cell[8][2] = parseFloat(d3.select("#data82").node().value);
        cell[8][3] = parseFloat(d3.select("#data83").node().value);
        cell[8][4] = parseFloat(d3.select("#data84").node().value);
        cell[8][5] = parseFloat(d3.select("#data85").node().value);
        cell[9][1] = parseFloat(d3.select("#data91").node().value);
        cell[9][2] = parseFloat(d3.select("#data92").node().value);
        cell[9][3] = parseFloat(d3.select("#data93").node().value);
        cell[9][4] = parseFloat(d3.select("#data94").node().value);
        cell[9][5] = parseFloat(d3.select("#data95").node().value);

        nobs = 0;
        nrow = 0;
        ncol = 0; 
        for (j=1; j<nc; j++) {  
          numr[j] = 0;
          for (i=1; i<nr; i++) if ( ! isNaN(cell[i][j]) ) numr[j]++;
          if (numr[j] > nrow) nrow = numr[j];
        }
        for (i=1; i<nr; i++) {
          numc[i] = 0;
          for (j=1; j<nc; j++) if ( ! isNaN(cell[i][j]) ) numc[i]++;
          if (numc[i] > ncol) ncol = numc[i];
        }
        // check data
        if (nrow < 2 || ncol < 2) {
          bar.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
             .text("No input or wrong input or only one cell !!  Try again.").style("stroke","red");
          return;
        }
        for (i=1; i<=nrow; i++) {
          for (j=1; j<=ncol; j++) {
            if ( isNaN(cell[i][j]) ) {
              bar.append("text").attr("class","mean").attr("x", 150).attr("y", 100)
                 .text("Wrong input !!   Try again.").style("stroke","red");
              return;
            }
          }
        }
        testingIndependence()
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

// Independence test
function testingIndependence() {
        bar.selectAll("*").remove();
        var str;
        // calculate rowTotal and colTotal
        for (i=1; i<=nrow; i++) cell[i][0] = 0;
        for (j=1; j<=ncol; j++) cell[0][j] = 0;
        for (i=1; i<=nrow; i++) {
          for (j=1; j<=ncol; j++) {
            cell[i][0] += cell[i][j];
            cell[0][j] += cell[i][j];
          }
          str = "data"+i+"6";
          document.getElementById(str).value = cell[i][0];
          nobs += cell[i][0];
        }
        for (j=1; j<=ncol; j++) {
          str = "data10"+j;
          document.getElementById(str).value = cell[0][j];
        }
        document.getElementById("data106").value = nobs;

        // expected frequency
        for (j=1; j<=ncol; j++) expf[0][j] = cell[0][j] / nobs;
        for (i=1; i<=nrow; i++) {
          for (j=1; j<=ncol; j++) {
            expf[i][j] = cell[i][0] * expf[0][j];
          }
        }

        // test statistics
        df = (nrow-1) * (ncol - 1);
        stat = 0;
        for (i=1; i<=nrow; i++) {
          for (j=1; j<=ncol; j++) {
            temp = cell[i][j] - expf[i][j];
            stat += temp * temp / expf[i][j];
          }
        }
        // chisq-test
        h = alpha;  
        if (df < 10) f = 0;
        else f = chisq_inv(0.0001, df, info);
        g = chisq_inv(1-h, df, info);
        pvalue = 1 - chisq_cdf(stat, df, info)
        drawChisqGraphTH(hypoType, h1Type, stat, df, f, g, h, pvalue, temp )  
}
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingIndependence();
} 
