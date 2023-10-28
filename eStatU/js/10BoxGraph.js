    <!---   ************ script for Descriptive Measue ************  ---->
// basic statistics function ============================================
simplestat2 = function(dataid) {
        data = d3.select(dataid)
	         .node()
	         .value
	         .trim()
	         .split(new RegExp("[ ]*[, \t][ ]*"))   // ['8', '8', '9']
	         .map(parseFloat);                      // [8.0, 8.0, 9.0]
	if(isNaN(data[0])) data = [];
        n = data.length;
        sum = 0;
        sumsq = 0;
        data.forEach(function(d) {
          sum += d;
          sumsq += d*d;
        });
        xbar = sum / n;
        v = (sumsq - n*xbar*xbar) / (n-1);
        s = Math.sqrt(v)
        data.sort(function(a, b) { return a - b; });
        mini  = data[0];
        maxi  = data[n-1];
        range = maxi - mini;
        medi = medianCalc(n,data);
        var tdata = new Array(n);
        var ntemp; 
        if (n%2 == 1) { // odd
          ntemp = (n+1)/2;
          for (i=0; i<ntemp; i++) tdata[i] = data[i];
          q1 = medianCalc(ntemp,tdata)
          for (i=ntemp-1; i<n; i++) tdata[i-ntemp+1] = data[i];
          q3 = medianCalc(ntemp,tdata)
        }
        else {
          ntemp = n/2;
          for (i=0; i<ntemp; i++) tdata[i] = data[i];
          q1 = medianCalc(ntemp,tdata)
          for (i=ntemp; i<n; i++) tdata[i-ntemp] = data[i];
          q3 = medianCalc(ntemp,tdata)
        }
        iqr = q3 - q1;
        return {'n':n, 'xbar':xbar, 'var':v, 'std':s, 'mini':mini, 'q1':q1, 'medi':medi, 'q3':q3, 'maxi':maxi, 'range':range, 'iqr':iqr};
}

//      setLanguage('en');
      var bar = d3.select("#chart")

      var svgWidth    = 640;
      var svgHeight   = 400;  // 모집단 그래프 영역
      var margin, graphWidth, graphHeight;
      margin      = {top: 20, bottom: 100, left: 20, right: 20};
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;

      var i, j, k, ith;
      var x1, x2, y1, y2, cx, cy, ty;
      var nint, step, buffer, nvalue, gxmin, gxmax, gxrange, xScale; 
      var nn, xbar, varP, varS, stdP, stdS, range, iqr, mini, q1, medi, q3, maxi;
      var nn3, xba3, varP3, varS3, stdP3, stdS3, range3, iqr3, mini3, q13, medi3, q33, maxi3;
      var sdata = new Array(100);
      var sdotx = new Array(100); 
      var radius = 7;
      var fontsize = "0.8em";

      var generator, title;
      document.getElementById("msgMean").innerHTML  = svgStr[34][langNum]; 
      document.getElementById("msgPopVar").innerHTML= svgStr[114][langNum]; 
      document.getElementById("msgRange").innerHTML = svgStr[112][langNum]; 
      document.getElementById("msgIQR").innerHTML   = svgStrU[107][langNum]; 
      document.getElementById("msgMin").innerHTML   = svgStr[45][langNum]; 
      document.getElementById("msgQ1").innerHTML    = svgStrU[105][langNum]; 
      document.getElementById("msgMed").innerHTML   = svgStr[46][langNum]; 
      document.getElementById("msgQ3").innerHTML    = svgStrU[106][langNum]; 
      document.getElementById("msgMax").innerHTML   = svgStr[47][langNum]; 

      document.getElementById("nn").disabled    = true;    
      document.getElementById("xbar").disabled  = true; 
      document.getElementById("variP").disabled = true;  
      document.getElementById("variS").disabled = true;  
      document.getElementById("stdP").disabled  = true;   
      document.getElementById("stdS").disabled  = true;   
      document.getElementById("range").disabled = true; 
      document.getElementById("iqr").disabled   = true;  
      document.getElementById("mini").disabled  = true;  
      document.getElementById("q1").disabled    = true;  
      document.getElementById("medi").disabled  = true;   
      document.getElementById("q3").disabled    = true;   
      document.getElementById("maxi").disabled  = true;  

      // data input control =====================================
      d3.select("#data1").on("input", function() {
        stat = simplestat2("#data1");  
        nn   = stat.n;
        document.getElementById("nn").value    = stat.n;    
        document.getElementById("xbar").value  = f2(stat.xbar);
        variS = stat.var;
        stdS  = Math.sqrt(variS);
        variP = (nn-1)*variS/nn;
        stdP  = Math.sqrt(variP);
        document.getElementById("variP").value = f2(variP);  
        document.getElementById("variS").value = f2(variS);  
        document.getElementById("stdP").value  = f2(stdP);  
        document.getElementById("stdS").value  = f2(stdS);  
        document.getElementById("range").value = f2(stat.range);  
        document.getElementById("iqr").value   = f2(stat.iqr);  
        document.getElementById("mini").value  = f2(stat.mini);  
        document.getElementById("q1").value    = f2(stat.q1);  
        document.getElementById("medi").value  = f2(stat.medi);  
        document.getElementById("q3").value    = f2(stat.q3);  
        document.getElementById("maxi").value  = f2(stat.maxi);  
      });

      updateData = function() {
        document.getElementById("data1").value = ''; 
      }

      d3.select("#nn").on("input", updateData);
      d3.select("#xbar").on("input", updateData);
      d3.select("#variS").on("input", updateData);
      d3.select("#stdS").on("input", updateData);
      d3.select("#range").on("input", updateData);
      d3.select("#iqr").on("input", updateData);
      d3.select("#mini").on("input", updateData);
      d3.select("#q1").on("input", updateData);
      d3.select("#medi").on("input", updateData);
      d3.select("#q3").on("input", updateData);
      d3.select("#maxi").on("input", updateData);

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("data1").value = "";
        document.getElementById("nn").value    = "";
        document.getElementById("xbar").value  = "";
        document.getElementById("variP").value = "";
        document.getElementById("variS").value = "";
        document.getElementById("stdP").value  = "";
        document.getElementById("stdS").value  = ""; 
        document.getElementById("range").value = ""; 
        document.getElementById("iqr").value   = "";  
        document.getElementById("mini").value  = "";  
        document.getElementById("q1").value    = ""; 
        document.getElementById("medi").value  = ""; 
        document.getElementById("q3").value    = "";;  
        document.getElementById("maxi").value  = "";
      })


      // Draw Dot Graph ======================================
      d3.select("#executeTH").on("click",function() {
        bar.selectAll("*").remove();
        nn    = stat.n;   
        for (i=0; i<nn; i++) {
            if (isNaN(data[i]) ) { //문자 데이터 체크
              chart.append("text").attr("class","mean").attr("x", 250).attr("y", margin.top + 40)
                   .text(alertMsg[48][langNum]).style("stroke","red").style("font-size","1em");
              return;
            }
        } 
        xbar  = stat.xbar;
        variS = stat.var;
        variP = (nn-1)*variS/nn;
        stdP  = Math.sqrt(variP);
        stdS  = stat.std;  
        range = stat.range;  
        iqr   = stat.iqr;  
        mini  = stat.mini;  
        q1    = stat.q1;  
        medi  = stat.medi;  
        q3    = stat.q3;  
        maxi  = stat.maxi; 
        left  = xbar - stdS;
        right = xbar + stdS; 
 
        gxmin = mini - 4*stdS;
        gxmax = maxi + 4*stdS;
        gxrange = gxmax - gxmin;
        drawSimpleDotGrpah();

        // draw dot graph simulation
        x1 = margin.left + graphWidth/2;
        y1 = margin.top + graphHeight/2 + 55;
        bar.append("text").attr("x", x1).attr("y", y1).text("  ***  "+svgStrU[98][langNum]+"  *** ("+svgStrU[111][langNum]+")")
           .style("font-size","10pt").style("stroke","red").style("text-anchor","middle");
        // draw x axis for simulation
        ty = margin.top + 3*graphHeight/4 + 40; 
        xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        bar.append("g")
          .attr("transform","translate("+margin.left+","+ty+")")
          .call(d3.axisBottom(xScale))                  
        // data transfer for simulation
        for (i=0; i<nn; i++) sdata[i] = data[i];
        cy = ty - 10; 
        for (i=0; i<nn; i++) {
          cx = margin.left + (sdata[i] - gxmin)*graphWidth/gxrange;
          sdotx[i] = cx;
          bar.append("circle")
             .attr("cx",cx).attr("cy",cy).attr("r",radius).attr("fill",myColor[i])
//             .on("click", clicked)
             .call(drag())
        }
        drawDotGrpahSimulation(sdata)
      })

      // svg Graph Save
      d3.select("#saveGraphU").on("click", function() {
        var svg = d3.select("#chart");
        var width  = svgWidth;
        var height = svgHeight;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });

// median calculation
function medianCalc(n, data) {
        if (n < 2) return;
        if (n%2 == 1) { // odd
          return data[(n+1)/2 -1];
        }
        else { // even
          return ( data[n/2 -1] + data[(n+2)/2 -1] ) / 2.;
        }
}
// basic stat for sdata 
function simplestat3(sdata) {
        var i, sum, sumsq, xbar, v, s, ntemp;
        var mini,q1,medi,q3, maxi,range, iqr;
        var tdata = new Array(nn);

        sum = 0;
        sumsq = 0;
        for (i=0; i<nn; i++) {
          sum += sdata[i];
          sumsq += sdata[i]*sdata[i];
        }
        xbar = sum / nn;
        v = (sumsq - nn*xbar*xbar) / (nn-1);
        s = Math.sqrt(v)

        sdata.sort(function(a, b) { return a - b; });
        sdotx.sort(function(a, b) { return a - b; });
        mini  = sdata[0];
        maxi  = sdata[nn-1];
        range = maxi - mini;
        medi = medianCalc(nn,sdata);
        if (nn%2 == 1) { // odd
          ntemp = (nn+1)/2;
          for (i=0; i<ntemp; i++) tdata[i] = sdata[i];
          q1 = medianCalc(ntemp,tdata)
          for (i=ntemp-1; i<nn; i++) tdata[i-ntemp+1] = sdata[i];
          q3 = medianCalc(ntemp,tdata)
        }
        else {
          ntemp = nn/2;
          for (i=0; i<ntemp; i++) tdata[i] = sdata[i];
          q1 = medianCalc(ntemp,tdata)
          for (i=ntemp; i<nn; i++) tdata[i-ntemp] = sdata[i];
          q3 = medianCalc(ntemp,tdata)
        }
        iqr = q3 - q1;
        return {'n':nn, 'xbar':xbar, 'var':v, 'std':s, 'mini':mini, 'q1':q1, 'medi':medi, 'q3':q3, 'maxi':maxi, 'range':range, 'iqr':iqr};
}
// draw dot graph for input data
function drawSimpleDotGrpah() {
        var xavg, xmin, xq1, xmed, xq3, xmax;

        ty    = margin.top + graphHeight/4 - 20;
        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        bar.append("g")
          .attr("transform","translate("+margin.left+","+ty+")")
          .call(d3.axisBottom(xScale))                  // 눈금을 표시할 함수 호출

        // draw dot graph
        cy = ty - 10; 
        for (i=0; i<nn; i++) {
          cx = margin.left + (data[i] - gxmin)*graphWidth/gxrange;
          bar.append("circle").attr("cx",cx).attr("cy",cy).attr("r",radius)
             .attr("fill",myColor[i])
        }
        // draw xbar line 
        xavg = margin.left + (xbar-gxmin)*graphWidth/gxrange;
        xmed = margin.left + (medi-gxmin)*graphWidth/gxrange;
        y1 = ty + 25;
        y2 = y1 - 60;
        bar.append("line").attr("x1",xavg).attr("x2",xavg).attr("y1",y1+10).attr("y2",y2).style("stroke","green")
        bar.append("line").attr("x1",xmed).attr("x2",xmed).attr("y1",y1+30).attr("y2",y2).style("stroke","red")
        bar.append("text").attr("x", xavg).attr("y", y1+5).text("x\u0304="+f2(xbar))
           .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle")
//        bar.append("text").attr("x", xmed).attr("y", y1+5).text("m="+f2(medi))
//           .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle")
        x1 = margin.left + (left-gxmin)*graphWidth/gxrange;
        x2 = margin.left + (right-gxmin)*graphWidth/gxrange;   
        bar.append("text").attr("x", x1).attr("y", y1+5).text("x\u0304-s")
           .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle")
        bar.append("text").attr("x", x2).attr("y", y1+5).text("x\u0304+s")
           .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle")
        bar.append("text").attr("x", x2+50).attr("y", y1+5).text("s="+f2(stdS))
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle")
        y1 += 10;
        bar.append("line").attr("x1",x1).attr("x2",x2).attr("y1",y1).attr("y2",y1).style("stroke","green")
        bar.append("circle").attr("cx",x1).attr("cy",y1).attr("r",2).style("fill","green")
        bar.append("circle").attr("cx",xavg).attr("cy",y1).attr("r",2).style("fill","green")
        bar.append("circle").attr("cx",x2).attr("cy",y1).attr("r",2).style("fill","green")

        // draw box graph
        xmin = margin.left + (mini-gxmin)*graphWidth/gxrange;
        xq1  = margin.left + (q1  -gxmin)*graphWidth/gxrange;
        xq3  = margin.left + (q3  -gxmin)*graphWidth/gxrange;
        xmax = margin.left + (maxi-gxmin)*graphWidth/gxrange;
        y1 += 20;
        ty  = y1 + 10;
        y2  = y1 + 20;
        bar.append("line").attr("x1",xmin).attr("x2",xmin).attr("y1",y1).attr("y2",y2).style("stroke","green")
        bar.append("line").attr("x1",xq1 ).attr("x2",xq1 ).attr("y1",y1).attr("y2",y2).style("stroke","green")
        bar.append("line").attr("x1",xmed).attr("x2",xmed).attr("y1",y1).attr("y2",y2).style("stroke","red")
        bar.append("line").attr("x1",xq3 ).attr("x2",xq3 ).attr("y1",y1).attr("y2",y2).style("stroke","green")
        bar.append("line").attr("x1",xmax).attr("x2",xmax).attr("y1",y1).attr("y2",y2).style("stroke","green")
        bar.append("line").attr("x1",xq1 ).attr("x2",xq3 ).attr("y1",y1).attr("y2",y1).style("stroke","green")
        bar.append("line").attr("x1",xq1 ).attr("x2",xq3 ).attr("y1",y2).attr("y2",y2).style("stroke","green")
        bar.append("line").attr("x1",xmin).attr("x2",xq1 ).attr("y1",ty).attr("y2",ty).style("stroke","green")
        bar.append("line").attr("x1",xq3 ).attr("x2",xmax).attr("y1",ty).attr("y2",ty).style("stroke","green")
        y1 = y2 + 13;
        bar.append("text").attr("x", xmin).attr("y", y1).text("min")
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", xq1 ).attr("y", y1).text("Q1")
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", xmed).attr("y", y1).text("m")
           .style("font-size",fontsize).style("stroke","red").style("text-anchor","middle")
        bar.append("text").attr("x", xq3 ).attr("y", y1).text("Q3")
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", xmax).attr("y", y1).text("max")
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle")
        y1 += 12;
        bar.append("text").attr("x", xmin).attr("y", y1).text(f2(mini))
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", xq1 ).attr("y", y1).text(f2(q1))
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", xmed).attr("y", y1).text(f2(medi))
           .style("font-size",fontsize).style("stroke","red").style("text-anchor","middle")
        bar.append("text").attr("x", xq3 ).attr("y", y1).text(f2(q3))
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle")
        bar.append("text").attr("x", xmax).attr("y", y1).text(f2(maxi))
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle")
}
// draw dot graph for simulation data
function drawDotGrpahSimulation(sdata) {
        var xavg, xmin, xq1, xmed, xq3, xmax;
      
        stat3  = simplestat3(sdata);
        nn3    = stat3.n;
        xbar3  = stat3.xbar;
        stdS3  = stat3.std; 
        stdP3  = Math.sqrt((nn3-1)*stat3.var/nn3); 
        range3 = stat3.range;  
        iqr3   = stat3.iqr;  
        mini3  = stat3.mini;  
        q13    = stat3.q1;  
        medi3  = stat3.medi;  
        q33    = stat3.q3;  
        maxi3  = stat3.maxi; 
        left3  = xbar3 - stdS3;
        right3 = xbar3 + stdS3; 

        // draw xbar line 
        xavg = margin.left + (xbar3-gxmin)*graphWidth/gxrange;
        xmed = margin.left + (medi3-gxmin)*graphWidth/gxrange;
        ty = margin.top + 3*graphHeight/4 + 40; 
        y1 = ty + 25;
        y2 = y1 - 60;
        bar.append("line").attr("x1",xavg).attr("x2",xavg).attr("y1",y1+10).attr("y2",y2)
           .style("stroke","green").attr("class","simul")
        bar.append("line").attr("x1",xmed).attr("x2",xmed).attr("y1",y1+30).attr("y2",y2)
           .style("stroke","red").attr("class","simul")
        bar.append("text").attr("x", xavg).attr("y", y1+5).text("x\u0304="+f2(xbar3))
           .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle").attr("class","simul")
//        bar.append("text").attr("x", xmed).attr("y", y1+5).text("m="+f2(medi3))
//           .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle")
        x1 = margin.left + (left3-gxmin)*graphWidth/gxrange;
        x2 = margin.left + (right3-gxmin)*graphWidth/gxrange;   
        bar.append("text").attr("x", x1).attr("y", y1+5).text("x\u0304-s")
           .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle").attr("class","simul")
        bar.append("text").attr("x", x2).attr("y", y1+5).text("x\u0304+s")
           .style("font-size",fontsize).style("stroke","green").style("text-anchor","middle").attr("class","simul")
        bar.append("text").attr("x", x2+50).attr("y", y1+5).text("s="+f2(stdS3))
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle").attr("class","simul")
        y1 += 10;
        bar.append("line").attr("x1",x1).attr("x2",x2).attr("y1",y1).attr("y2",y1).style("stroke","green")
        bar.append("circle").attr("cx",x1).attr("cy",y1).attr("r",2).style("fill","green").attr("class","simul")
        bar.append("circle").attr("cx",xavg).attr("cy",y1).attr("r",2).style("fill","green").attr("class","simul")
        bar.append("circle").attr("cx",x2).attr("cy",y1).attr("r",2).style("fill","green").attr("class","simul")

        // draw box graph
        xmin = margin.left + (mini3-gxmin)*graphWidth/gxrange;
        xq1  = margin.left + (q13  -gxmin)*graphWidth/gxrange;
        xq3  = margin.left + (q33  -gxmin)*graphWidth/gxrange;
        xmax = margin.left + (maxi3-gxmin)*graphWidth/gxrange;
        y1 += 20;
        ty  = y1 + 10;
        y2  = y1 + 20;
        bar.append("line").attr("x1",xmin).attr("x2",xmin).attr("y1",y1).attr("y2",y2).style("stroke","green").attr("class","simul")
        bar.append("line").attr("x1",xq1 ).attr("x2",xq1 ).attr("y1",y1).attr("y2",y2).style("stroke","green").attr("class","simul")
        bar.append("line").attr("x1",xmed).attr("x2",xmed).attr("y1",y1).attr("y2",y2).style("stroke","red").attr("class","simul")
        bar.append("line").attr("x1",xq3 ).attr("x2",xq3 ).attr("y1",y1).attr("y2",y2).style("stroke","green").attr("class","simul")
        bar.append("line").attr("x1",xmax).attr("x2",xmax).attr("y1",y1).attr("y2",y2).style("stroke","green").attr("class","simul")
        bar.append("line").attr("x1",xq1 ).attr("x2",xq3 ).attr("y1",y1).attr("y2",y1).style("stroke","green").attr("class","simul")
        bar.append("line").attr("x1",xq1 ).attr("x2",xq3 ).attr("y1",y2).attr("y2",y2).style("stroke","green").attr("class","simul")
        bar.append("line").attr("x1",xmin).attr("x2",xq1 ).attr("y1",ty).attr("y2",ty).style("stroke","green").attr("class","simul")
        bar.append("line").attr("x1",xq3 ).attr("x2",xmax).attr("y1",ty).attr("y2",ty).style("stroke","green").attr("class","simul")
        y1 = y2 + 13;
        bar.append("text").attr("x", xmin).attr("y", y1).text("min")
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle").attr("class","simul")
        bar.append("text").attr("x", xq1 ).attr("y", y1).text("Q1")
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle").attr("class","simul")
        bar.append("text").attr("x", xmed).attr("y", y1).text("m")
           .style("font-size",fontsize).style("stroke","red").style("text-anchor","middle").attr("class","simul")
        bar.append("text").attr("x", xq3 ).attr("y", y1).text("Q3")
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle").attr("class","simul")
        bar.append("text").attr("x", xmax).attr("y", y1).text("max")
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle").attr("class","simul")
        y1 += 12;
        bar.append("text").attr("x", xmin).attr("y", y1).text(f2(mini3))
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle").attr("class","simul")
        bar.append("text").attr("x", xq1 ).attr("y", y1).text(f2(q13))
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle").attr("class","simul")
        bar.append("text").attr("x", xmed).attr("y", y1).text(f2(medi3))
           .style("font-size",fontsize).style("stroke","red").style("text-anchor","middle").attr("class","simul")
        bar.append("text").attr("x", xq3 ).attr("y", y1).text(f2(q33))
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle").attr("class","simul")
        bar.append("text").attr("x", xmax).attr("y", y1).text(f2(maxi3))
           .style("font-size",fontsize).style("stroke","blue").style("text-anchor","middle").attr("class","simul")
}
// mouse drag
function drag() {

   return d3.drag()
            .on("start", function(d) {
               d3.event.sourceEvent.stopPropagation();
	       d3.select(this)
	         .attr("r", radius*2)
               var x = d3.event.x;
               for (i=nn; i>0; i--) {
                  if ( Math.abs(x - sdotx[i-1]) < (radius) ) {ith =i-1; break;} 
               }
            })
            .on("drag", function(d) {
               var x = d3.event.x;
	       d3.select(this).attr("cx", x);

            })
            .on("end", function(d) {
               var x = d3.event.x;
               if (x < margin.left) {
                 x = margin.left;
               }
               if (x > margin.left + graphWidth) {
                 x = margin.left + graphWidth;
               }
	       d3.select(this)
                 .attr("cx", x)
                 .attr("r", radius*2)
                 .transition()
                 .attr("r", radius)
               sdata[ith] = gxmin + gxrange*(x-margin.left)/graphWidth
               sdotx[ith] = x;
               bar.selectAll("line.simul").remove();  
               bar.selectAll("text.simul").remove();  
               bar.selectAll("circle.simul").remove();  
	       drawDotGrpahSimulation(sdata)
            });
}
// mouse clicked
function clicked(d, i) {
    if (d3.event.defaultPrevented) return; // dragged
    d3.select(this).transition()
        .attr("fill", "black")
        .attr("r", radius * 2)
      .transition()
        .attr("r", radius)
        .attr("fill", "red");
}

