      var chart = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var margin      = {top: 10, bottom: 10, left: 10, right: 10};
      var svgWidth    = 600;
      var svgHeight   = 520;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;
      var i, nn, xx, nn2, pp, qq, rr, ss, permu, permuRep, permuMult, combi, combiRep;
      var nfact, rfact;
      var colr = ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FFFF","#BF00FF","#FF00FF","#0080FF","#00BFFF","#8000FF"];

      document.getElementById("nfact").disabled     = true; 
      document.getElementById("rfact").disabled     = true; 
      document.getElementById("permu").disabled     = true; 
      document.getElementById("permuRep").disabled  = true; 
      document.getElementById("permuMult").disabled = true; 
      document.getElementById("combi").disabled     = true; 
      document.getElementById("combiRep").disabled  = true; 
      // initial calculation
      nn = parseFloat(d3.select("#nn").node().value);
      xx = parseFloat(d3.select("#xx").node().value);
      calculate()

      // Erase data
      d3.select("#erasePermutationData").on("click",function() {
        chart.selectAll("*").remove();
        document.getElementById("nn").value        = ""; 
        document.getElementById("xx").value        = ""; 
        document.getElementById("nfact").value     = ""; 
        document.getElementById("rfact").value     = ""; 
        document.getElementById("permu").value     = ""; 
        document.getElementById("permuRep").value  = "";  
        document.getElementById("permuMult").value = ""; 
        document.getElementById("combi").value     = ""; 
        document.getElementById("combiRep").value  = ""; 
      })

      // Calculate Permutation & Combinatio ======================================
      d3.select("#execute1").on("click",function() {
        chart.selectAll("*").remove();
        // input value
        nn = parseFloat(d3.select("#nn").node().value);
        xx = parseFloat(d3.select("#xx").node().value);
        if ( isNaN(nn) || isNaN(xx) ) {  // wrong input
          chart.append("text").attr("class","mean")
             .attr("x", 250).attr("y", 100)
             .text("Wrong input!  Enter number, not character!   Try again.")
             .style("stroke","red")
             .style("font-size","1.2em")
          return;
        }
        if ( nn < 1 || nn > 30 ) {  // wrong input
          chart.append("text").attr("class","mean")
             .attr("x", 250).attr("y", 100)
             .text("Enter n between 1 and 30 !!   Try again.")
             .style("stroke","red")
             .style("font-size","1.2em")
          return;
        }
        calculate()
        drawPermutation(nn, xx, permu, combi);   
      })
      // 같은 것이 있는 순열 ======================================
      d3.select("#execute2").on("click",function() {
        nn2 = parseFloat(d3.select("#nn2").node().value);
        pp  = parseFloat(d3.select("#pp").node().value);
        qq  = parseFloat(d3.select("#qq").node().value);
        rr  = parseFloat(d3.select("#rr").node().value);
        ss  = parseFloat(d3.select("#ss").node().value);
        permuMult = factorial(nn2) / ( factorial(pp) * factorial(qq) * factorial(rr) * factorial(ss) );
        document.getElementById("permuMult").value = f0(permuMult);
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

      // factorial
      function factorial(n) {
        var fact = 1;
        for (var i = 1; i <= n; i++) {
          fact = fact * i;
        }
        return fact; 
      }
      // Calculate permutation and combination
      function calculate() {
        nfact = factorial(nn);
        rfact = factorial(xx);
        if ( xx > nn ) {
          permu = "";
          combi = "";
        } 
        else {
          permu    = 1; 
          for (i = 0; i < xx; i++) {
            permu = permu * (nn - i);   
          }
          combi = permu / rfact;
        }
        permuRep = 1;
        for (i = 0; i < xx; i++) {
          permuRep = permuRep * nn;
        }
        combiRep = factorial(xx + nn-1) / (rfact * factorial(nn-1));
        document.getElementById("nfact").value    = f0(nfact);
        document.getElementById("rfact").value    = f0(rfact);
        document.getElementById("permu").value    = f0(permu);
        document.getElementById("permuRep").value = f0(permuRep);
        document.getElementById("combi").value    = f0(combi);
        document.getElementById("combiRep").value = f0(combiRep);
        drawPermutation(nn, xx, permu, combi);   
      }

      // n slidebar
      function showValueN(newValue) {
        document.getElementById("nn").value = newValue;
        nn = parseFloat(d3.select("#nn").node().value);
        xx = parseFloat(d3.select("#xx").node().value);
        calculate();
      }
      // x slide bar
      function showValueX(newValue) {
        document.getElementById("xx").value = newValue;
        nn = parseFloat(d3.select("#nn").node().value);
        xx = parseFloat(d3.select("#xx").node().value);
        calculate();
      }
      // draw Permutaion and Combination
      function drawPermutation(nn, xx, permu, combi) {
        chart.selectAll("*").remove();
        var i, j, tx, ty, cx, cy, temp, str1, str2, str3;
        var radius = 8;
        var xgap   = 50;
        var ygap   = 20;
        var fontsize  = "0.8em";
        var fontsize2 = "1.3em";
        // Permutation
        cx = margin.left;
        cy = margin.top + 20;
        str1 = nn.toString();
        str2 = xx.toString();
        if ( xx <= nn) {
          if (xx <= 1) temp = "";
          else if (xx == 2) temp = " = " + str1 + " \u00D7 " + (nn-1).toString();
          else if (xx == 3) temp = " = " + str1 + " \u00D7 " + (nn-1).toString() + " \u00D7 " + (nn-2).toString();
          else temp = " = " + str1 + " \u00D7 " + (nn-1).toString() + " \u00D7 " + " \u22EF " + " \u00D7 " + (nn-xx+1).toString();
          str3 = temp + " = " + permu.toString();
          chart.append("text").attr("x", cx).attr("y", cy).text(str1).style("font-size",fontsize).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+13).attr("y", cy).text("P").style("font-size",fontsize2).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+30).attr("y", cy).text(str2).style("font-size",fontsize).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+45).attr("y", cy).text(str3).style("font-size",fontsize2).style("stroke","black").style("text-anchor","begin")
        } 
        if ( nn > 10 || xx > 1 ) {
          cy += ygap+5;
          str3 = " = " + str1 + " ^ " + str2 + " = " + permuRep.toString();
          chart.append("text").attr("x", cx).attr("y", cy).text(str1).style("font-size",fontsize).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+13).attr("y", cy).text("Π").style("font-size",fontsize2).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+30).attr("y", cy).text(str2).style("font-size",fontsize).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+45).attr("y", cy).text(str3).style("font-size",fontsize2).style("stroke","black").style("text-anchor","begin")
        }

        if (nn <= 10 && xx == 2) {
          for (i = 0; i < nn; i++) { 
            cy = cy + ygap;
            ty = cy + 4;
            str1 = (i+1).toString();
            for (j = 0; j < nn; j++) {
              if (i==j) continue;
              cx = (j+1) * xgap;
              tx = cx + 15;
              str2 = (j+1).toString();
              chart.append("circle").attr("cx",cx).attr("cy",cy).attr("r",radius).style("fill",colr[i]);
              chart.append("text").attr("x", cx).attr("y", ty).text(str1).style("font-size",fontsize).style("stroke","black").style("text-anchor","middle")
              chart.append("circle").attr("cx",tx).attr("cy",cy).attr("r",radius).style("fill",colr[j]);
              chart.append("text").attr("x", tx).attr("y", ty).text(str2).style("font-size",fontsize).style("stroke","black").style("text-anchor","middle")
            } // endof j
          } // endof i
        } // endof if
        // Combination
        cx = margin.left;
        cy = cy + 2*ygap;
        str1 = nn.toString();
        str2 = xx.toString();
        if ( xx <= nn) {
          if (xx == 0) str3 = " = 1 " + " / " + str2 + "! = " + combi.toString();
          else if (xx == 1) str3 = " = " + str1 + " / " + str2 + "! = " + combi.toString();
          else str3 = temp + " / " + str2 + "! = " + combi.toString();
          chart.append("text").attr("x", cx).attr("y", cy).text(str1).style("font-size",fontsize).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+13).attr("y", cy).text("C").style("font-size",fontsize2).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+30).attr("y", cy).text(str2).style("font-size",fontsize).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+45).attr("y", cy).text(str3).style("font-size",fontsize2).style("stroke","black").style("text-anchor","begin")
        }
        if ( nn > 10 || xx > 1 ) {
          cy += ygap+5;
          str3 = " = ("+str2+"+" + str1 + "-1)!" + " / ("+ str2 + "! ("+ str1+"-1)! ) = " + combiRep.toString();
          chart.append("text").attr("x", cx).attr("y", cy).text(str1).style("font-size",fontsize).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+13).attr("y", cy).text("H").style("font-size",fontsize2).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+30).attr("y", cy).text(str2).style("font-size",fontsize).style("stroke","black").style("text-anchor","begin")
          chart.append("text").attr("x", cx+45).attr("y", cy).text(str3).style("font-size",fontsize2).style("stroke","black").style("text-anchor","begin")
        }
        if (nn <= 10 && xx == 2) {
          for (i = 0; i < nn-1; i++) { 
            cy = cy + ygap;
            ty = cy + 4;
            str1 = (i+1).toString();
            for (j = i+1; j < nn; j++) {
              cx = (j+1) * xgap;
              tx = cx + 15;
              str2 = (j+1).toString();
              chart.append("circle").attr("cx",cx).attr("cy",cy).attr("r",radius).style("fill",colr[i]);
              chart.append("text").attr("x", cx).attr("y", ty).text(str1).style("font-size",fontsize).style("stroke","black").style("text-anchor","middle")
              chart.append("circle").attr("cx",tx).attr("cy",cy).attr("r",radius).style("fill",colr[j]);
              chart.append("text").attr("x", tx).attr("y", ty).text(str2).style("font-size",fontsize).style("stroke","black").style("text-anchor","middle")
            } // endof j
          } // endof i
        } // endof if
      }
