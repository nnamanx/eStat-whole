      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var margin      = {top: 10, bottom: 10, left: 10, right: 10};
      var svgWidth2   = 600;
      var svgHeight2  = 200;
      var graphWidth  = svgWidth2 - margin.left - margin.right;
      var graphHeight = svgHeight2 - margin.top - margin.bottom;

      var gxmin, gxmax, gymin, gymax;
      var title;
      var df, info, alpha, alpha2, confidence, confidence2;
      var nn, xbar, variS, variP, stdS, stdP, stat, left, right, temp, tvalue, zvalue, stderr;
      var nn2, left2, right2, temp2, tvalue2, zvalue2, stderr2;
      var leftMin, rightMax, range;
      var strT    = "t<sub>n-1 ; &alpha;/2</sub> ";
      var strZ    = "z<sub>&alpha;/2</sub> ";
      var stderrT = "s / &radic; n";
      var stderrZ = "&sigma; / &radic; n";
      var intT    = strT+"&nbsp;&nbsp; ("+stderrT+")";
      var intZ    = strZ+"&nbsp;&nbsp; ("+stderrZ+")";

      document.getElementById("tvalue").disabled = true; 
      document.getElementById("stderr").disabled = true; 
      document.getElementById("cleft").disabled = true; 
      document.getElementById("cright").disabled = true;  
      document.getElementById("nn2").disabled  = true;
      document.getElementById("alpha2").disabled  = true; 
      document.getElementById("variP").disabled  = true; 
      document.getElementById("tFormula").innerHTML = strT;
      document.getElementById("stderrFormula").innerHTML = stderrT;
      document.getElementById("intFormula").innerHTML = intT;

      // Test type
      var test = document.myForm1.type1;
      var testType = test.value;
      test[0].onclick = function() { // t-test
         testType = 1; 
         clearText();
         document.getElementById("variP").disabled  = true; 
         document.getElementById("variS").disabled  = false; 
         document.getElementById("variP").value     = null; 
         document.getElementById("tFormula").innerHTML = strT;
         document.getElementById("stderrFormula").innerHTML = stderrT;
         document.getElementById("intFormula").innerHTML = intT;
      }  
      test[1].onclick = function() {  // Z-test
         testType = 2; 
         clearText();
         document.getElementById("variS").value  = null; 
         document.getElementById("variP").disabled  = false; 
         document.getElementById("variS").disabled  = true; 
         document.getElementById("tFormula").innerHTML = strZ;
         document.getElementById("stderrFormula").innerHTML = stderrZ;
         document.getElementById("intFormula").innerHTML = intZ;
      } 

      // alpha
      var a = document.myForm2.type2;
      confidence = 0.95;
      alpha = 1 - confidence;
      a[0].onclick = function() { confidence = 0.95;  alpha = 1 - confidence; clearText();}  
      a[1].onclick = function() { confidence = 0.99;  alpha = 1 - confidence; clearText();} 

      // data input control =====================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        document.getElementById("nn").value   = stat.n;    
        document.getElementById("xbar").value = f2(stat.xbar);
        document.getElementById("variS").value  = f2(stat.var);  
        if (testType == 1) tvalue = t_inv(1 - alpha/2, stat.n - 1, info);
        else tvalue = stdnormal_inv(1 - alpha/2, info);
        stderr = Math.sqrt(stat.var /stat.n);
        temp = tvalue * stderr;
        left  = stat.xbar - temp;
        right = stat.xbar + temp;  
        if (stat.n > 1) document.getElementById("tvalue").value = f3(tvalue);
        document.getElementById("stderr").value = f3(stderr);
        document.getElementById("cleft").value   = f3(left);
        document.getElementById("cright").value  = f3(right); 
      });

      updateData = function() {
        document.getElementById("data1").value = ''; 
      }

      d3.select("#nn").on("input", updateData);
      d3.select("#xbar").on("input", updateData);
      d3.select("#std").on("input", updateData);

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.myForm2.type2[0].checked = true;
        document.getElementById("data1").value  = "";
        document.getElementById("nn").value     = "";
        document.getElementById("nn2").value    = "";
        document.getElementById("xbar").value   = "";
        document.getElementById("variS").value  = "";
        document.getElementById("variP").value  = "";
        document.getElementById("cleft").value  = "";
        document.getElementById("cright").value = "";
        document.getElementById("tvalue").value = "";
        document.getElementById("stderr").value = "";
        document.getElementById("alpha2").value = "0.95";
      })

      // Testing Hypothesis ======================================
      d3.select("#executeTH").on("click",function() {
        bar.selectAll("*").remove();

        // input value
        stat = simplestat("#data1");
        if (stat.n > 0) {
          nn    = stat.n;
          xbar  = stat.xbar;
          variS = stat.var;
        }
        else {
          nn    = parseFloat(d3.select("#nn").node().value);
          xbar  = parseFloat(d3.select("#xbar").node().value);
          variS = parseFloat(d3.select("#variS").node().value);
        }
        variP = parseFloat(d3.select("#variP").node().value);
        stdS  = Math.sqrt(variS);
        stdP  = Math.sqrt(variP);
        df    = nn - 1;

        if ( isNaN(nn) || isNaN(xbar)  || nn < 2 ) {  // wrong input
          bar.append("text").attr("class","mean")
             .attr("x", 150).attr("y", 100)
             .text("No input or wrong input !!   Try again.")
             .style("stroke","red")
        }
        else if ( isNaN(variS) && isNaN(variP) ) {  // wrong input
          bar.append("text").attr("class","mean")
             .attr("x", 150).attr("y", 100)
             .text("No input or wrong input !!   Try again.")
             .style("stroke","red")
        }
        else if ( variS < 0 || variP < 0 ) {  // wrong input
          bar.append("text").attr("class","mean")
             .attr("x", 150).attr("y", 100)
             .text("wrong input on variance !!   Try again.")
             .style("stroke","red")
        }
        else {
          // confidence interval
          if (testType == 1) { // t distribution
            tvalue = t_inv(1 - alpha/2, nn - 1, info);
            stderr = Math.sqrt(variS/nn);
          }
          else { // Z distribution
            tvalue = stdnormal_inv(1 - alpha/2, info);
//            variP = parseFloat(d3.select("#variP").node().value);
            stderr = Math.sqrt(variP/nn);
            variS  = variP;
            stdS   = stdP;
          }
          temp  = tvalue * stderr;
          left  = xbar - temp;
          right = xbar + temp;  
          leftMin = xbar - t_inv(0.999, nn - 1, info)*stdS;
          rightMax = xbar + t_inv(0.999, nn - 1, info)*stdS;
          range = rightMax - leftMin;
          if (nn > 1) document.getElementById("tvalue").value = f3(tvalue);
          document.getElementById("stderr").value = f3(stderr);
          document.getElementById("cleft").value   = f3(left);
          document.getElementById("cright").value  = f3(right); 
          document.getElementById("nn2").value  = nn;
          document.getElementById("alpha2").value  = confidence;
          drawConfidenceIntervalMu();
        }
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

// alpha t Z 바뀔때 clear
function clearText() {
        bar.selectAll("*").remove();
        document.getElementById("tvalue").value = null;
        document.getElementById("stderr").value = null;
        document.getElementById("cleft").value  = null;
        document.getElementById("cright").value = null;
}
// n slide bar
function showValueNN2(newValue) {
        bar.selectAll("*").remove();
        document.getElementById("nn2").value = newValue;
        drawConfidenceIntervalMu();
}
// alpha slide bar
function showValueAlpha2(newValue) {
        bar.selectAll("*").remove();
        document.getElementById("alpha2").value = f2(newValue/100);
        drawConfidenceIntervalMu();
}
// draw confidence interval
function drawConfidenceIntervalMu() {
        var x1, x2, xm, y1, y2, tempy;
        bar.selectAll("*").remove();

        nn2    = parseFloat(d3.select("#nn2").node().value); 
        confidence2 = parseFloat(d3.select("#alpha2").node().value); 
        alpha2 = 1 - confidence2;
        df2   = nn2 - 1;

        // confidence interval
        if (testType == 1) tvalue2 = t_inv(1 - alpha2/2, df2, info);
        else tvalue2 = stdnormal_inv(1 - alpha2/2, info);
        stderr2 = Math.sqrt(variS/nn2);
        temp = tvalue2 * stderr2;
        left2   = xbar - temp;
        right2 = xbar + temp;  

        tempy    = margin.top + graphHeight/2 -10;
        var xScale = d3.scaleLinear().domain([leftMin,rightMax]).range([0,graphWidth])
        bar.append("g")
          .attr("transform","translate("+margin.left+","+tempy+")")
          .call(d3.axisBottom(xScale))                  // 눈금을 표시할 함수 호출

        // draw conf interval
        x1 = margin.left + 30;
        y1 = margin.top + 20; 
        bar.append("text").attr("x",x1).attr("y", y1)
           .text("  ***  "+svgStrU[20][langNum]+" : n="+f0(nn) +",          (1-\u03B1)="+f2(confidence)+"  ***")
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","start");
        xm = margin.left + (xbar-leftMin)*graphWidth/range;
        x1 = margin.left + (left-leftMin)*graphWidth/range;
        x2 = margin.left + (right-leftMin)*graphWidth/range;
        y1 = margin.top + graphHeight/3 - 20; 
        y2 = y1;
        bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           .style("stroke","black").style("stroke-width","2");
        bar.append("circle").attr("cx",x1).attr("cy",y1).attr("r",3).style("fill","blue");
        bar.append("circle").attr("cx",xm).attr("cy",y1).attr("r",3).style("fill","blue");
        bar.append("circle").attr("cx",x2).attr("cy",y2).attr("r",3).style("fill","blue");
        y1 += 20;
        y2 = y1;
        bar.append("text").attr("x", x1).attr("y", y1).text("[ "+f3(left))
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", xm).attr("y", y1).text(" ,")
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", x2).attr("y", y1).text(f3(right)+" ]")
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","middle")

        // conf interval simulation
        x1 = margin.left + (left2-leftMin)*graphWidth/range;
        x2 = margin.left + (right2-leftMin)*graphWidth/range;
        y1 = margin.top + 2*graphHeight/3 + 10; 
        y2 = y1;
        bar.append("text").attr("x", margin.left+30).attr("y", y1)
           .text("  ***  "+svgStrU[20][langNum]+" "+svgStrU[98][langNum]+" : n="+f0(nn2) +",          (1-\u03B1)="+f2(confidence2)+"  ***")
           .style("font-size","10pt").style("stroke","red").style("text-anchor","start");
        y1 += 20;
        y2 = y1;
        bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           .style("stroke","red").style("stroke-width","2");
        bar.append("circle").attr("cx",x1).attr("cy",y1).attr("r",3).style("fill","red");
        bar.append("circle").attr("cx",xm).attr("cy",y1).attr("r",3).style("fill","red");
        bar.append("circle").attr("cx",x2).attr("cy",y2).attr("r",3).style("fill","red");
        y1 += 20;
        y2 = y1;
        bar.append("text").attr("x", x1).attr("y", y1).text("[ "+f3(left2))
           .style("font-size","10pt").style("stroke","red").style("text-anchor","middle");
        bar.append("text").attr("x", xm).attr("y", y1).text(" ,")
           .style("font-size","10pt").style("stroke","red").style("text-anchor","middle")
        bar.append("text").attr("x", x2).attr("y", y1).text(f3(right2)+" ]")
           .style("font-size","10pt").style("stroke","red").style("text-anchor","middle");

}

