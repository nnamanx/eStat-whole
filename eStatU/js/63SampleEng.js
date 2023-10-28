      var chartLaw = d3.select("#chartLaw")
      var totalHeight = 640;
      var svgWidthLaw    = 600;
      var svgHeightLaw   = 320;  // 모집단 그래프 영역
      var margin, graphWidth, graphHeight;
      marginLaw      = {top: 20, bottom: 30, left: 20, right: 20};
      graphWidthLaw  = svgWidthLaw - marginLaw.left - marginLaw.right;
      graphHeightLaw = svgHeightLaw  + 280 - marginLaw.top - marginLaw.bottom;

      var i, j, k; // 
      var nint, step, buffer, nvalue, gxmin, gxmax; 
      var nobs   = 1000;
      var radius = 2;
      var samplePercent;
      var statP      = new Array(20);
      var statS      = new Array(20);
      var bins       = new Array(200);
      var dataSet    = new Array(nobs);
      var dataA      = new Array(nobs);
      var dataValue  = new Array(nobs);
      var dvalueFreq = new Array(nobs);
      var tdata      = new Array(nobs);
      var tdataY     = new Array(nobs);
      var generator, title;
      document.getElementById("nlarge").value  = 1000;

       // 대수의 법칙 버튼 클릭
      d3.select("#large").on("click",function() {
        chartLaw.selectAll("*").remove();  
        nlarge  = parseFloat(d3.select("#nlarge").node().value);    // 표본크기    
        // slider control
        document.getElementById("rangeLarge").value  = nlarge;
        lawLarge(nlarge);
      }) 
      // svg Graph Save
      d3.select("#saveGraphLaw").on("click", function() {
        var svg = d3.select("#chartLaw");
        var width = svgWidthLaw;
        var height = 600;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });

function showValueSample(newValue) {
        document.getElementById("nlarge").value = newValue;
        chartLaw.selectAll("*").remove();  
        nlarge  = parseFloat(d3.select("#nlarge").node().value);    // 표본크기    
        lawLarge(nlarge);
}

function lawLarge(nobs) {
        var i, k, g, sum, estp, color;
        var x1, x2, x3, y1, y2, y3, tx1, tx2, ty1, ty2;
        var xbuffer    = 20;   
        var ybuffer    = 30;
        var areaHeight = 200;
        var areaWidth  = graphWidthLaw - 2*xbuffer;
        var step       = areaWidth / nobs;
        var gap        = 90;
        var pp         = 0.5;
        var radius     = 30;
        var twidth     = 30;
        var theight    = 10;
        var trx        = 10;
        var tgaph      = 10;
        var tgapx      = 4;
        // 시뮬레이션 결과 선그래프 화면
        x1 = marginLaw.left; 
        y1 = marginLaw.top  + graphHeightLaw - areaHeight - ybuffer;
        chartLaw.append("rect").attr("x",x1).attr("y",y1).attr("width",areaWidth+2*xbuffer).attr("height",areaHeight+2*ybuffer)
            .style("stroke","black").style("fill","white");
        // 손 tossing graph
        x1 = marginLaw.left + 4*xbuffer;
        y1 = marginLaw.top + ybuffer;
        // The data for hand path
        var lineDataT = [ [30,60], [70,50], [95,15], [105,15], [102,35], [100,40], [100,45], [160,50], [160,60], [100,60] ];
        var lineDataB = [ [30,90], [60,80], [80,95], [95,100], [105,95], [110,80] ];
//        var lineDataC = [ [175,60], [185,50], [195,60], [190,70], [205,60], [215,50] ];
        var lineGenerator = d3.line().curve(d3.curveCardinal);
        var pathString    = lineGenerator(lineDataT);
        chartLaw.append("path").attr("d", pathString).style("stroke","black").attr("fill", "none").attr("class","hand");
        pathString    = lineGenerator(lineDataB);
        chartLaw.append("path").attr("d", pathString).style("stroke","black").attr("fill", "none").attr("class","hand");
//        pathString    = lineGenerator(lineDataC);
//        chartLaw.append("path").attr("d", pathString).style("stroke","black").attr("fill", "none").attr("class","hand");
        chartLaw.append("rect").attr("class","hand").attr("x",x1-tgapx).attr("y",y1+tgaph)
            .attr("width",twidth).attr("height",theight).attr("rx",trx).attr("ry",trx)
            .style("stroke","black").style("fill","white");
        chartLaw.append("rect").attr("class","hand").attr("x",x1-2*tgapx).attr("y",y1+2*tgaph)
            .attr("width",twidth).attr("height",theight).attr("rx",trx).attr("ry",trx)
            .style("stroke","black").style("fill","white");
        chartLaw.append("rect").attr("class","hand").attr("x",x1-3*tgapx).attr("y",y1+3*tgaph)
            .attr("width",twidth).attr("height",theight).attr("rx",trx).attr("ry",trx)
            .style("stroke","black").style("fill","white");
         // 0.5 선
        x1 = marginLaw.left + xbuffer;
        y1 = marginLaw.top  + graphHeightLaw;
        chartLaw.append("text").style("font-size","11pt").style("text-anchor","start").attr("x", x1).attr("y", y1-areaHeight+3).text("1.0");
        chartLaw.append("text").style("font-size","11pt").style("text-anchor","start").attr("x", x1).attr("y", y1-areaHeight/2+3).text("0.5");
        chartLaw.append("text").style("font-size","11pt").style("text-anchor","start").attr("x", x1).attr("y", y1+3).text("0.0");
        x1 = marginLaw.left + 2*xbuffer;
        x2 = x1 + areaWidth;
        y1 = marginLaw.top + graphHeightLaw - areaHeight/2;
        y2 = y1;
        chartLaw.append("line").style("stroke","red").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2);
        // tick
        y1 = marginLaw.top + graphHeightLaw + ybuffer;
        y2 = y1 + 7;
        for (k=0; k<nobs+1; k++) {
          x1 = marginLaw.left + 2*xbuffer + k*step;
          x2 = x1;
          if (k%(nobs/10) == 0) {
            chartLaw.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2).style("stroke","black");
            chartLaw.append("text").style("font-size","11pt").style("text-anchor","middle").attr("x", x2).attr("y", y2+10).text(k.toString());
          }
        }
        tx = marginLaw.left + areaWidth/2;
        ty = marginLaw.top  + graphHeightLaw - areaHeight - 2.5*ybuffer;
        chartLaw.append("text").style("font-size","11pt").attr("x",tx-150).attr("y",ty+8).text("P("+svgStrU[13][langNum]+")  = ").style("stroke","blue");
        chartLaw.append("text").style("font-size","11pt").attr("x",tx-30).attr("y",ty).text(svgStrU[14][langNum]).style("stroke","blue");
        chartLaw.append("line").attr("x1",tx-40).attr("y1",ty+5).attr("x2",tx+90).attr("y2",ty+5).style("stroke","black");
        chartLaw.append("text").style("font-size","11pt").attr("x",tx+100).attr("y",ty+8).text(" = ").style("stroke","black");
        chartLaw.append("line").attr("x1",tx+120).attr("y1",ty+5).attr("x2",tx+170).attr("y2",ty+5).style("stroke","black");
        chartLaw.append("text").style("font-size","11pt").attr("x",tx-30).attr("y",ty+20).text(svgStrU[15][langNum]).style("stroke","grey");
        chartLaw.append("text").style("font-size","11pt").attr("x",tx+150).attr("y",ty-50).text(svgStrU[12][langNum]).style("stroke","blue");
        chartLaw.append("text").style("font-size","11pt").attr("x",tx-135).attr("y",ty-50).text(svgStrU[11][langNum]).style("stroke","red");
        chartLaw.append("text").style("font-size","11pt").attr("x",tx-20).attr("y",marginLaw.top+ybuffer*0.5).text(svgStrU[10][langNum]).style("stroke","blue")
            .style("font-size","11pt").style("stroke","blue").style("text-anchor","start")
        // 첫째 원 동전던지기
        g = 0;
        sum = 0;
        if (Math.random() > 0.5) sum ++;
        estp = sum;
        tx1 = marginLaw.left + 2*xbuffer;
        ty1 = marginLaw.top + graphHeightLaw - areaHeight*estp ;
        // 처음 50개 점 만들고 궤적 그리기
        for (k=1; k<50; k++) {
           setTimeout(function() {	      
              g++ ;            
              x1 = marginLaw.left + graphWidthLaw/3 ;            // 하늘 좌표
              y1 = marginLaw.top + ybuffer;
              x2 = marginLaw.left + graphWidthLaw/2;
              y2 = y1 + gap;
              if (Math.random() < pp) {
                   x3 = x2 - gap;
                   y3 = y2 + gap;
                   color = "red";
              } else { 
                   sum ++;
                   estp = sum / (g+1);
                   x3 = x2 + gap;
                   y3 = y2 + gap;
                   color = "blue";
              };    
              var cir = chartLaw.append("circle").attr("class","circleR") 
              cir.attr("cx", x1)
                 .attr("cy", y1)
                 .attr("r", radius)
                 .style("fill","grey")
                 .transition()          // 애니매이션 효과 지정
                 .delay(100)   		// 0.5초마다 그리도록 대기시간 설정
                 .duration(1000)        // 1초동안 애니매이션이 진행되도록 설정
                 .attr("cx", x2)
                 .attr("cy", y2)
                 .transition()
                 .delay(100)
                 .duration(100)
                 .attr("cx", x3)
	         .attr("cy", y3)
                 .style("fill",color)
              chartLaw.selectAll("text.meanB").remove();
              chartLaw.append("text").attr("class","meanB").attr("x",tx+128).attr("y",ty).text(sum.toString()).style("stroke","blue");
              chartLaw.append("text").attr("class","meanB").attr("x",tx+125).attr("y",ty+20).text((g+1).toString()).style("stroke","green");
              chartLaw.append("text").attr("class","meanB").attr("x",tx+180).attr("y",ty+8).text(" = "+f3(estp)).style("stroke","blue");
              tx2 = tx1 + step;
              ty2 = marginLaw.top + graphHeightLaw - areaHeight*estp ;
              chartLaw.append("line").attr("x1",tx1).attr("y1",ty1).attr("x2",tx2).attr("y2",ty2).style("stroke","blue")
              tx1 = tx2;
              ty1 = ty2;
            }, 300*k); // endof setTimeout
//              chartLaw.selectAll("rect.hand").remove();
//              chartLaw.selectAll("path.hand").remove();
         
        } // endof k 
        for (j=50; j<nobs; j++) {
              g++ ;            
              if (Math.random() > pp) {
                   sum ++;
                   estp = sum / (g+1);
              };         
              chartLaw.selectAll("text.meanB").remove();
              chartLaw.append("text").attr("class","meanB").attr("x",tx+128).attr("y",ty).text(sum.toString()).style("stroke","blue");
              chartLaw.append("text").attr("class","meanB").attr("x",tx+125).attr("y",ty+20).text((g+1).toString()).style("stroke","green");
              chartLaw.append("text").attr("class","meanB").attr("x",tx+180).attr("y",ty+8).text(" = "+f2(estp)).style("stroke","blue");
              tx2 = tx1 + step;
              ty2 = marginLaw.top + graphHeightLaw - areaHeight*estp ;
              chartLaw.append("line").attr("x1",tx1).attr("y1",ty1).attr("x2",tx2).attr("y2",ty2).style("stroke","blue")
              tx1 = tx2;
              ty1 = ty2;
        } // endof j
}