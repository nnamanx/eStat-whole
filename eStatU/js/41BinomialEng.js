      function showValueBinomial1(newValue) {document.getElementById("nn").value  = newValue;}
      function showValueBinomial2(newValue) {document.getElementById("pp").value  = newValue / 100;  }
      function showValueBinomial3(newValue) {document.getElementById("nn2").value = newValue;}
      function showValueBinomial4(newValue) {document.getElementById("pp2").value = newValue / 100;  }

      var chartBS = d3.select("#chartBS");
 
      // 이항분포 시뮬레이션 초기화면 셋팅
      var i, j, k, sum, temp, info;
      var nn, pp, nn2, pp2, avg,  std, savg, sstd;
      var xmin, xmax, ymin, ymax, gxminBS, gxmaxBS, gxrangeBS, gyminBS, gymaxBS, gyrangeBS;
      var nobsBS;
      var rectSize     = 10;
      var radiusSize   = 4;
      var nvalueMax    = 31;
      var rectSizeDiv2 = rectSize / 2;
      var checkFreq    = false;
      var checkFreq2   = false;
      var checkFreq3   = false;

      var svgWidthBS, svgHeightBS, graphWidthBS, graphHeightBS;
      var marginBS   = {top: 50, bottom: 80, left: 40, right: 40};

      var binomialP1 = new Array(nvalueMax);
      var binomialP2 = new Array(nvalueMax);
      var tdataY     = new Array(nvalueMax);
      var txS        = new Array(nvalueMax);
      var tyS         = new Array(nvalueMax);
      var valueLabel = new Array(nvalueMax);

      for (i=0; i<nvalueMax; i++) {
          txS[i] = new Array(nvalueMax);
          tyS[i] = new Array(nvalueMax);
      }
   
      // svg 파라미터
      svgWidthBS    = 640;
      svgHeightBS   = 320;
      graphWidthBS  = svgWidthBS - marginBS.left - marginBS.right;
      graphHeightBS = svgHeightBS - marginBS.top - marginBS.bottom;
     
      nobsBS = 100;
      nn = 2;
      pp = 0.5;
      nvalue = nn + 1;

      title  = svgStrU[1][langNum]+" n = "+nn.toString()+", p = "+f2(pp);
      chartBS.append("text").attr("class","title").attr("x", marginBS.left).attr("y", marginBS.top/2).text(title)
      avg  = nn * pp;
      std  = Math.sqrt(nn*pp*(1-pp));
      title  = svgStrU[3][langNum]+" = "+f2(avg).toString()+", "+svgStrU[4][langNum]+" = "+f2(std).toString();
      chartBS.append("text").attr("class","title").attr("x", marginBS.left+graphWidthBS -200).attr("y", marginBS.top/2 ).text(title)

      // 확률  계산
      for (i=0; i<nvalue; i++) binomialP1[i] = binomial_pdf(i, nn, pp, info);
			  
      // Draw 이항분포 Triangle and Simulation
      BinomialTriangle(nvalue, pp, txS, tyS);
//      BinomialSimulation(nobsBS,nvalue,tdataY);

			  
      // 시뮬레이션 실행버튼 클릭
      d3.select("#executeBinomial").on("click",function() {
        chartBS.selectAll("*").remove();
        removeBinomialFreqS();
        checkFreq = false;
        document.getElementById("freqBinomial").checked = false;
 
        nn = parseFloat(d3.select("#nn").node().value);    // 크기 n
        pp = parseFloat(d3.select("#pp").node().value);    // 성공확률 p
        if (nn < 1 )   nn = 1;
        if (nn > 10)   nn = 10;
        if (pp < 0.001) pp = 0.001;
        if (pp > 0.999) pp = 0.999;
        document.getElementById("range1Binomial").value  = nn;
        document.getElementById("range2Binomial").value  = 100*pp;
        nvalue = nn + 1;

        title  = svgStrU[1][langNum]+" n = "+nn.toString()+", p = "+f2(pp);
        chartBS.append("text").attr("class","title").attr("x", marginBS.left).attr("y", marginBS.top/2).text(title)
        avg  = nn * pp;
        std  = Math.sqrt(nn*pp*(1-pp));
        title  = svgStrU[3][langNum]+" = "+f2(avg).toString()+", "+svgStrU[4][langNum]+" = "+f2(std).toString();
        chartBS.append("text").attr("class","title").attr("x", marginBS.left+graphWidthBS -200).attr("y", marginBS.top/2 ).text(title)

        // 확률  계산
        for (i=0; i<nvalue; i++) binomialP1[i] = binomial_pdf(i, nn, pp, info);

        // Draw 이항분포 Triangle and Simulation
        BinomialTriangle(nvalue, pp, txS, tyS);
	BinomialSimulation(nobsBS,nvalue,tdataY);
        if (checkFreq) showBinomialFreq(nvalue, binomialP1, tdataY, txS);
      })

       // 확률표시 버튼 클릭
      d3.select("#freqBinomial").on("click",function() {
        if(this.checked) {
          checkFreq = true;
          showBinomialFreq(nvalue, binomialP1, tdataY, txS);
        } else {
          checkFreq = false;
	  removeBinomialFreqS();
        }
      })
      // svg Graph Save
      d3.select("#saveGraphBS").on("click", function() {
        var svg = d3.select("#chartBS");
        var width = svgWidthBS;
        var height = 600;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });
// Binomial Triangle 그리기 함수 ==================================================================
function BinomialTriangle(nvalue, pp, txS, tyS) {
        var i, j, k, t1, t2, x1, x2;
        var oneHeight = graphHeightBS / (nvalue+1);
        var oneWidth  = graphWidthBS / (2*nn + 1);
        // 하늘 사각형
        t1 = marginBS.left + graphWidthBS/2;
        t2 = marginBS.top/2+15;
        chartBS.append("rect")
           .attr("x", t1 - rectSize)
           .attr("y", t2 - rectSize)
           .attr("width",  2*rectSize)
           .attr("height", 2*rectSize)
           .style("stroke","black").attr("stroke-width","1px").attr("fill","#0055FF")
        chartBS.append("line")
           .attr("x1", t1)
           .attr("y1", t2+rectSize)
           .attr("x2", t1)
           .attr("y2", t2+3*rectSize+oneHeight-15)
           .attr("stroke-width","2px").style("stroke","#0055FF")
        // 각 사각형 좌표 계산      
        for (i=0; i<nvalue; i++) {
          txS[i][0] = marginBS.left + graphWidthBS/2 - rectSizeDiv2- i*oneWidth;
          tyS[i][0] = marginBS.top + (i+1)*oneHeight;
          if (i != nvalue-1) {
            chartBS.append("rect")
               .attr("x", txS[i][0] )
               .attr("y", tyS[i][0])
               .attr("width",  rectSize)
               .attr("height", rectSize)
               .style("stroke","black").attr("stroke-width","1px").attr("fill","#0055FF")
          }
          for (k=1; k<=i; k++) {
            txS[i][k] = txS[i][k-1] + 2*oneWidth; 
            tyS[i][k] = tyS[i][0];
            if (i != nvalue-1) {
              chartBS.append("rect")
                 .attr("x", txS[i][k] )
                 .attr("y", tyS[i][k])
                 .attr("width",  rectSize)
                 .attr("height", rectSize)
                 .style("stroke","black").attr("stroke-width","1px").attr("fill","#0055FF")
            }
          } // endof k
        } // endof i
	  
        // 마지막 라인은 점수 합계용
        for (j=0; j<nvalue; j++) {
          t1 = txS[nvalue-1][j] + rectSizeDiv2;
          t2 = tyS[nvalue-1][j] + rectSize + 6;
          chartBS.append("circle").attr("cx",t1).attr("cy",t2).attr("r",rectSize)
             .style("stroke","#0055FF").attr("stroke-width","2px").attr("fill","none")
          chartBS.append("text").attr("x",t1).attr("y",t2+5).text(j)
             .style("font-family","sans-serif").style("font-size","9pt").style("stroke","#0055FF").style("text-anchor","middle")
        }        
        // 사각형 연결 line
        for (i=0; i<nvalue-1; i++) {
          for (j=0; j<=i; j++) {
            x1 = txS[i][j] + rectSizeDiv2;
            y1 = tyS[i][j] + rectSizeDiv2;
            for (k=j; k<=j+1; k++) {
              x2 = txS[i+1][k] + rectSizeDiv2;
              y2 = tyS[i+1][k] + rectSizeDiv2;
              if (k==j && pp < 0.5) chartBS.append("line").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2)
                                       .attr("stoke-width","2px").style("stroke","#0055FF")
              else                  chartBS.append("line").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2)
                                       .attr("stroke-width","1px").style("stroke","#0055FF")
              if (k==j+1 && pp < 0.5) chartBS.append("line").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2)
                                         .attr("stroke-width","1px").style("stroke","#0055FF")
              else                    chartBS.append("line").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2)
                                         .attr("stroke-width","2px").style("stroke","#0055FF")
              t1 = (x1 + x2) / 2;
              t2 = (y1 + y2) / 2;
              if (k==j) chartBS.append("text").attr("x", t1).attr("y", t2).text("0")
                           .style("font-size","9pt").style("stroke","#0055FF").style("text-anchor","middle")
              else      chartBS.append("text").attr("x", t1).attr("y", t2).text("1")
                           .style("font-size","9pt").style("stroke","#0055FF").style("text-anchor","middle")
            } // endof k
          } // endof j
        } // endof i
        
      
} // endof BinomialTriangle()
      
// 이항분포 시뮬레이션
async function BinomialSimulation(nobsBS,nvalue,tdataY) {
         var i, j, k, g;
         var x0, y0, x1, y1, x2, y2, t1, t2;
         var sum;
         //  점그래프 X축
         y1 = 2*svgHeightBS - marginBS.bottom + 8; 
         chartBS.append("line")
            .attr("x1", marginBS.left)
            .attr("y1", y1)
            .attr("x2", marginBS.left+graphWidthBS)
            .attr("y2", y1)
            .style("stroke","black").attr("stroke-width","2px")
         for (j=0; j<nvalue; j++) {
           x1 = txS[nvalue-1][j]+rectSizeDiv2;
           chartBS.append("text")
              .attr("x", x1)
              .attr("y", y1+15)
              .text(j)
              .style("font-family","sans-serif").style("font-size","8pt").style("stroke","red").style("text-anchor","middle")
         } // endof j
  
          // 점 애니메이션 시작
    for (i=0; i<nvalue; i++) tdataY[i] = 0; // Count frequency
    
    // nobsBS 개수만큼 점 만들고 궤적 그리기
    $("#executeBinomial").prop("disabled", true);
    for (g=0; g<nobsBS; g++) {
	    await BinomialSimulationOneBall();
          
    }
    $("#executeBinomial").prop("disabled", false);
    
    var str = svgStrU[2][langNum]+"="+nobsBS;
          chartBS.append("text")
             .attr("x", marginBS.left+20)
             .attr("y", svgHeightBS-marginBS.bottom/2)
             .text(str)
             .style("font-family","sans-serif").style("font-size","9pt").style("stroke","#0055FF").style("text-anchor","middle")        
}
// endof BinomialSimulation Function
async function BinomialSimulationOneBall() {
    var animationDurationTime = 300;   // miliseconds
    var x0, y0, x1, y1, x2, y2, t1, t2;
    sum = 0;
    t1 = marginBS.left + graphWidthBS/2;            // 하늘 좌표
    t2 = marginBS.top/2;
    x0 = txS[0][0] + rectSizeDiv2;
    y0 = tyS[0][0] + rectSizeDiv2;
    var cir = chartBS.append("circle").style("stroke","black").attr("fill","red") 
    var currentPath = chartBS.append("line")
        .attr("stroke-width","3px").style("stroke","red")
    cir.attr("cx", t1)
        .attr("cy", t2)
        .attr("r", 10)
        .transition()                           // 애니매이션 효과 지정
        .delay(1000)   // 0.5초마다 그리도록 대기시간 설정
        .duration(1000)                         // 1초동안 애니매이션이 진행되도록 설정
        .attr("cx", x2)
        .attr("cy", y2)
    for (i=0; i<nvalue-1; i++) {
	await new Promise(resolve => setTimeout(resolve, animationDurationTime/nvalue));
        if (i==0) j=0;
        x1 = txS[i][j] + rectSizeDiv2;
        y1 = tyS[i][j] + rectSizeDiv2;
        if (Math.random() < 1-pp) { k = j }  // (1-p) 확률로 왼쪽으로 가면 0점
        else { k = j+1 ; sum++;};            // p 확률로 오른쪽으로 가면 1점 
        x2 = txS[i+1][k] + rectSizeDiv2;
	y2 = tyS[i+1][k] + rectSizeDiv2;
        cir.transition()
	//                   .delay(10)
            .duration(100)
            .attr("cx", x1)
            .attr("cy", y1)
            .transition()                           // 애니매이션 효과 지정
            .attr("cx", x2)
	    .attr("cy", y2);
	//                currentPath.attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2);
	j = k;
    } // endof i
    // 각 데이터의 점그림
    x1 = x2;
    y1 = y2;
    x2 = x1;
    tdataY[sum] ++;
    if (tdataY[sum] < 36) {
        y2 = 2*svgHeightBS - marginBS.bottom - (tdataY[sum]-1)*2*radiusSize;
    }
    else if (tdataY[sum] < 71) {
        x2 = x2 + radiusSize*2;
        y2 = 2*svgHeightBS - marginBS.bottom - (tdataY[sum]-35-1)*2*radiusSize;
    }
    else {
        x2 = x2 + radiusSize*4;
        y2 = 2*svgHeightBS - marginBS.bottom - (tdataY[sum]-70-1)*2*radiusSize;
    }
    cir.transition()                           // 애니매이션 효과 지정
        .delay(animationDurationTime)                   // .delay((nn+1)*g)
        .duration(1000)                         // 1초동안 애니매이션이 진행되도록 설정
        .style("fill",myColor[sum])
        .attr("r", radiusSize)
        .attr("cx", x2)
        .attr("cy", y2);
}// endof BinomialSimulationOneBall Function
// 실험된 이항분포 각 값의 확률 표시
function showBinomialFreq(nvalue, binomialP1, tdataY, txS) {
        var i, j, temp;
        var xmin, xmax, gxminBS, gxmaxBS, ymin, ymax;
        var savg, sstd;
  
        // 실험된 확률
        for (var j=0; j<nvalue; j++) {
          if (tdataY[j] < 36) y2 = 2*svgHeightBS - marginBS.bottom - (tdataY[j])*2*radiusSize;
          else                y2 = 2*svgHeightBS - marginBS.bottom - (35)*2*radiusSize;
          chartBS.append("text")
             .attr("class","mean9")
             .attr("x", txS[nvalue-1][j]+rectSizeDiv2)
             .attr("y", y2 - 3)
             .text(f3(tdataY[j]/nobsBS))
        } // endof j
    
        // 이론확률
        y1 = 2*svgHeightBS - marginBS.bottom + 13; 
        chartBS.append("text").attr("class","scorefont").style("text-anchor","middle")
           .attr("x", txS[nvalue-1][0])
           .attr("y", y1+25)
           .text("Actual Prob:")
        for (j=0; j<nvalue; j++) {
          x1 = txS[nvalue-1][j]+rectSizeDiv2;
          chartBS.append("text").style("text-anchor","middle")
             .attr("class","scorefont")
             .attr("x", x1)
             .attr("y", y1+40)
             .text(f3(binomialP1[j]))
        } // endof j
        xmin = 0;
        xmax = nvalue;
        gxminBS = xmin - 1;
        gxmaxBS = xmax + 1;
        ymin = 0;
        ymax = 1;
        savg = 0;
        for (i=0; i<nvalue; i++) {
          if(tdataY[i]>ymax) ymax = tdataY[i];
          savg += i*tdataY[i];
        }
        savg /= nobsBS;
        sstd = 0;
        for (i=0; i<nvalue; i++) {
          temp = (i - savg);
          sstd += temp * temp * tdataY[i];
        }
        sstd = Math.sqrt(sstd/nobsBS); 
       
        // 이항분포 그래프
        var str = svgStrU[3][langNum]+" = "+savg+", "+svgStrU[4][langNum]+" = "+f2(sstd);
        chartBS.append("text").attr("class","mean9")
           .attr("x", marginBS.left + graphWidthBS/2)
           .attr("y", y1+25).text(str);
//           .attr("y", 2*svgHeightBS - marginBS.bottom/3 -2).text(str);
}
// 실험된 이항분포 각 값의 확률 제거
function removeBinomialFreqS() {
        chartBS.selectAll("text.mean9").remove();
        chartBS.selectAll("text.scorefont").remove();  
}

