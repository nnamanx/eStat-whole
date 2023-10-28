      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var margin      = {top: 10, bottom: 10, left: 10, right: 10};
      var svgWidth2   = 600;
      var svgHeight2  = 200;
      var graphWidth  = svgWidth2 - margin.left - margin.right;
      var graphHeight = svgHeight2 - margin.top - margin.bottom;

      var nobs, avg, std, info, gxmin, gxmax, gymin, gymax;
      var title, confidence, confidence2;
      var nn, pp, alpha, left, right, temp, zvalue, varphat;
      var nn2, alpha2, left2, right2, temp2, zvalue2, varphat2;

      // alpha
      var a = document.myForm2.type2;
      confidence = 0.95;
      alpha = 1 - confidence;
      a[0].onclick = function() { confidence = 0.95;  alpha = 1 - confidence; clearText();}  
      a[1].onclick = function() { confidence = 0.99;  alpha = 1 - confidence; clearText();} 

      document.getElementById("zvalue").disabled  = true;
      document.getElementById("varphat").disabled = true;
      document.getElementById("cleft").disabled   = true;
      document.getElementById("cright").disabled  = true; 
      document.getElementById("nn2").disabled     = true;
      document.getElementById("alpha2").disabled  = true; 

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("nn").value      = "";
        document.getElementById("pp").value      = "";
        document.getElementById("cleft").value   = "";
        document.getElementById("cright").value  = "";
        document.getElementById("zvalue").value  = "";
        document.getElementById("varphat").value = "";
      })

      // Testing Hypothesis ======================================
      d3.select("#executeTH3").on("click",function() {
        bar.selectAll("*").remove();

        // input value
        nn     = parseFloat(d3.select("#nn").node().value);
        pp     = parseFloat(d3.select("#pp").node().value);
        document.getElementById("nn2").value  = nn;
        document.getElementById("alpha2").value  = confidence;
        nn2    = parseFloat(d3.select("#nn2").node().value); 
        confidence2 = parseFloat(d3.select("#alpha2").node().value); 
        alpha2 = 1 - confidence2;
        // confidence interval
        varphat  = Math.sqrt(pp*(1-pp)/nn);
        varphat2 = Math.sqrt(pp*(1-pp)/nn2);
        zvalue   = stdnormal_inv(1 - alpha/2, info);
        zvalue2  = stdnormal_inv(1 - alpha2/2, info);
        temp     = zvalue * varphat;
        temp2    = zvalue2 * varphat2;
        left     = pp - temp;
        left2    = pp - temp2;
        right    = pp + temp;  
        right2   = pp + temp2;  

        document.getElementById("zvalue").value  = f4(zvalue);
        document.getElementById("varphat").value = f4(varphat);
        document.getElementById("cleft").value   = f4(left);
        document.getElementById("cright").value  = f4(right); 

        if (isNaN(nn) || isNaN(pp) || nn < 2 || pp <= 0 || pp >= 1) {  // wrong input
           bar.append("text").attr("class","mean")
                .attr("x", 150) .attr("y", 100)
                .text("No input or wrong input !!   Try again.")
                .style("stroke","red")
        }
        else {    // Draw confidence interval
          drawConfidenceIntervalP();
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
        document.getElementById("zvalue").value  = "";
        document.getElementById("varphat").value = "";
        document.getElementById("cleft").value    = "";
        document.getElementById("cright").value   = "";
}
// n slide bar
function showValueNN2(newValue) {
        bar.selectAll("*").remove();
        document.getElementById("nn2").value = newValue;
        drawConfidenceIntervalP();
}
// alpha slide bar
function showValueAlpha2(newValue) {
        bar.selectAll("*").remove();
        document.getElementById("alpha2").value = f2(newValue/100);
        drawConfidenceIntervalP();
}
// draw confidence interval
function drawConfidenceIntervalP() {
        var x1, x2, xm, y1, y2, tempy;
        bar.selectAll("*").remove();
        nn2    = parseFloat(d3.select("#nn2").node().value); 
        confidence2 = parseFloat(d3.select("#alpha2").node().value); 
        alpha2 = 1 - confidence2;
        // confidence interval
        varphat2 = Math.sqrt(pp*(1-pp)/nn2);
        zvalue2  = stdnormal_inv(1 - alpha2/2, info);
        temp2    = zvalue2 * varphat2;
        left2    = pp - temp2;
        right2   = pp + temp2;  
        tempy    = margin.top + graphHeight/2 -10;
        var xScale = d3.scaleLinear().domain([0,1]).range([margin.left,graphWidth])
        bar.append("g")
          .attr("transform","translate("+margin.left+","+tempy+")")
          .call(d3.axisBottom(xScale))                  // 눈금을 표시할 함수 호출

        // draw conf interval
        x1 = margin.left +30;
        y1 = margin.top + 20; 
        bar.append("text").attr("x",x1).attr("y", y1)
           .text("  ***  "+svgStrU[20][langNum]+" : n="+f0(nn) +",          (1-\u03B1)="+f2(confidence)+"  ***")
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","start");
        xm = margin.left + pp*graphWidth;
        x1 = margin.left + left*graphWidth;
        x2 = margin.left + right*graphWidth;
        y1 = margin.top + graphHeight/3 - 20; 
        y2 = y1;
        bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           .style("stroke","black").style("stroke-width","2");
        bar.append("circle").attr("cx",x1).attr("cy",y1).attr("r",3).style("fill","blue");
        bar.append("circle").attr("cx",xm).attr("cy",y1).attr("r",3).style("fill","blue");
        bar.append("circle").attr("cx",x2).attr("cy",y2).attr("r",3).style("fill","blue");
        y1 += 20;
        y2 = y1;
        bar.append("text").attr("x", x1).attr("y", y1).text("[ "+f4(left))
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", xm).attr("y", y1).text(" ,")
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", x2).attr("y", y1).text(f4(right)+" ]")
           .style("font-size","10pt").style("stroke","blue").style("text-anchor","middle")

        // conf interval simulation
        x1 = margin.left + left2*graphWidth;
        x2 = margin.left + right2*graphWidth;
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
        bar.append("text").attr("x", x1).attr("y", y1).text("[ "+f4(left2))
           .style("font-size","10pt").style("stroke","red").style("text-anchor","middle");
        bar.append("text").attr("x", xm).attr("y", y1).text(" ,")
           .style("font-size","10pt").style("stroke","red").style("text-anchor","middle")
        bar.append("text").attr("x", x2).attr("y", y1).text(f4(right2)+" ]")
           .style("font-size","10pt").style("stroke","red").style("text-anchor","middle");

}
