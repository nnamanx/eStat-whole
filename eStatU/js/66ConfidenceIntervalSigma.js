      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var margin      = {top: 10, bottom: 10, left: 10, right: 10};
      var svgWidth2   = 600;
      var svgHeight2  = 200;
      var graphWidth  = svgWidth2 - margin.left - margin.right;
      var graphHeight = svgHeight2 - margin.top - margin.bottom;

      var nobs, gxmin, gxmax, gymin, gymax;
      var stat = new Array(30);
      var title;
      var df, info, alpha, confidence;
      var nn, varS, left, right,chiLeft,chiRight,rightMax;
      var df2,nn2, varS2,left2,right2,chiLeft2,chiRight2,alpha2, confidence2;
 
      document.getElementById("chiLeft").disabled  = true;
      document.getElementById("chiRight").disabled  = true;
      document.getElementById("cleft").disabled  = true;
      document.getElementById("cright").disabled = true; 

      // alpha
      var a = document.myForm2.type2;
      alpha = 0.05;
      confidence = 1-alpha;
      a[0].onclick = function() { alpha = 0.05; confidence = 1-alpha; clearText()}  
      a[1].onclick = function() { alpha = 0.01; confidence = 1-alpha; clearText()}  

     // data input control =====================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        document.getElementById("nn").value   = stat.n;    
        document.getElementById("varS").value  = f3(stat.var);   
        nn   = stat.n;
        varS = stat.var;
        df = nn - 1; 
        chiLeft = chisq_inv(alpha/2, df, info);
        chiRight   = chisq_inv(1 - alpha/2, df, info);
        left  = (nn - 1) * varS / chiRight;
        right = (nn - 1) * varS / chiLeft;
        document.getElementById("chiLeft").value   = f2(chiLeft);
        document.getElementById("chiRight").value  = f2(chiRight);
        document.getElementById("cleft").value   = f2(left);
        document.getElementById("cright").value  = f2(right);
      });

      updateData = function() {
        document.getElementById("data1").value = ''; 
      }

      d3.select("#nn").on("input", updateData);
      d3.select("#varS").on("input", updateData);

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("data1").value    = "";
        document.getElementById("nn").value       = "";
        document.getElementById("varS").value     = "";
        document.getElementById("cleft").value    = "";
        document.getElementById("cright").value   = "";
        document.getElementById("chiLeft").value  = "";
        document.getElementById("chiRight").value = "";
      })

      // Confidence Interval ======================================
      d3.select("#executeTH2").on("click",function() {
        bar.selectAll("*").remove();

        // input value
        stat = simplestat("#data1");
        if (stat.n > 1) {
          nn   = stat.n;
          varS = stat.var;
        }
        else {
          nn   = parseFloat(d3.select("#nn").node().value);
          varS = parseFloat(d3.select("#varS").node().value);
        }
        df = nn - 1;

        if (isNaN(nn) || isNaN(varS) || varS <= 0 || nn < 2) {  // wrong input
          bar.append("text").attr("class","mean")
             .attr("x", 150) .attr("y", 100)
             .text("No input or wrong input !!   Try again.")
             .style("stroke","red")
        }
        else { // confidence interval
          // confidence interval
          chiLeft = chisq_inv(alpha/2, df, info);
          chiRight   = chisq_inv(1 - alpha/2, df, info);
          left  = (nn - 1) * varS / chiRight;
          right = (nn - 1) * varS / chiLeft;
          document.getElementById("chiLeft").value   = f2(chiLeft);
          document.getElementById("chiRight").value   = f2(chiRight);
          document.getElementById("cleft").value   = f2(left);
          document.getElementById("cright").value  = f2(right);
          document.getElementById("nn2").value  = nn;
          document.getElementById("alpha2").value  = f2(confidence);
          drawConfidenceIntervalSigma() 
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

// alpha 바뀔때 clear
function clearText() {
        bar.selectAll("*").remove();
        document.getElementById("chiLeft").value  = "";
        document.getElementById("chiRight").value = "";
        document.getElementById("cleft").value    = "";
        document.getElementById("cright").value   = "";
}

// n slide bar
function showValueNN2(newValue) {
        bar.selectAll("*").remove();
        document.getElementById("nn2").value = newValue;
        drawConfidenceIntervalSigma();
}
// alpha slide bar
function showValueAlpha2(newValue) {
        bar.selectAll("*").remove();
        document.getElementById("alpha2").value = f2(newValue/100);
        drawConfidenceIntervalSigma();
}
// draw confidence interval
function drawConfidenceIntervalSigma() {
        var x1, x2,xm, y1, y2, tempy;
        bar.selectAll("*").remove();
        nn2    = parseFloat(d3.select("#nn2").node().value); 
        confidence2 = parseFloat(d3.select("#alpha2").node().value); 
        alpha2 = 1 - confidence2;
        // confidence interval
        df2 = nn2 - 1;
        chiLeft2     = chisq_inv(alpha2/2, df2, info);
        chiRight2   = chisq_inv(1 - alpha2/2, df2, info);
        left2 = (nn2 - 1) * varS / chiRight2;
        right2 = (nn2 - 1) * varS / chiLeft2;
        rightMax    = (nn - 1) * varS / chisq_inv(0.005, df, info);

        tempy    = margin.top + graphHeight/2 -10;
        var xScale = d3.scaleLinear().domain([0,rightMax]).range([margin.left,graphWidth])
        bar.append("g")
          .attr("transform","translate("+margin.left+","+tempy+")")
          .call(d3.axisBottom(xScale))                  // 눈금을 표시할 함수 호출

        // draw conf interval
        x1 = margin.left +30;
        y1 = margin.top + 20; 
        bar.append("text").attr("x",x1).attr("y", y1)
           .text("  ***  "+svgStrU[20][langNum]+" : n="+f0(nn) +",          (1-\u03B1)="+f2(confidence)+"  ***")
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","start");
        x1 = margin.left + left*graphWidth/rightMax;
        x2 = margin.left + right*graphWidth/rightMax;
        xm = margin.left + 0.5*(left+right)*graphWidth/rightMax;
        y1 = margin.top + graphHeight/3 - 20; 
        y2 = y1;
        bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           .style("stroke","black").style("stroke-width","2");
        bar.append("circle").attr("cx",x1).attr("cy",y1).attr("r",3).style("fill","blue");
        bar.append("circle").attr("cx",x2).attr("cy",y2).attr("r",3).style("fill","blue");
        y1 += 20;
        y2 = y1;
        bar.append("text").attr("x", x1).attr("y", y1).text("[ "+f2(left))
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", xm).attr("y", y1).text(",")
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", x2).attr("y", y1).text(f2(right)+" ]")
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","middle")

        // conf interval simulation
        x1 = margin.left + left2*graphWidth/rightMax;
        x2 = margin.left + right2*graphWidth/rightMax;
        xm = margin.left + 0.5*(left2+right2)*graphWidth/rightMax;
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
        bar.append("circle").attr("cx",x2).attr("cy",y2).attr("r",3).style("fill","red");
        y1 += 20;
        y2 = y1;
        bar.append("text").attr("x", x1).attr("y", y1).text("[ "+f2(left2))
           .style("font-size","10pt").style("stroke","red").style("text-anchor","middle");
        bar.append("text").attr("x", xm).attr("y", y1).text(",")
           .style("font-size","10pt").style("stroke","red").style("text-anchor","middle");
        bar.append("text").attr("x", x2).attr("y", y1).text(f2(right2)+" ]")
           .style("font-size","10pt").style("stroke","red").style("text-anchor","middle");
}

