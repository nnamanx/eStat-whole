      var dot = d3.select("#chart")
      var totalHeight = 640;
      var svgWidth    = 600;
      var svgHeight   = 320;  // 모집단 그래프 영역
      var margin, graphWidth, graphHeight;

      var i, j, k, tx, ty, ty2;  
      var nint, step, buffer, nvalue, gxmin, gxmax, error, str; 
      var sobs, niter, str;
      var nobs   = 10000;
      var radius = 1;
      var samplePercent;

      var statP      = new Array(20);
      var statS      = new Array(20);
      var bins       = new Array(1000);
      var dataSet    = new Array(nobs);
      var dataA      = new Array(nobs);
      var dataValue  = new Array(nobs);
      var dvalueFreq = new Array(nobs);
      var tdata      = new Array(nobs);
      var tdataY     = new Array(nobs);

      var generator, title;
      var checkSampling = false;
      var checkInterval = true;

      // Confidence Interval Initital Simulation ---------------------------------------------------------------
      dot.selectAll("*").remove();        
      margin      = {top: 20, bottom: 100, left: 20, right: 20};;
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;

      title  = svgStrU[8][langNum]+" ~ N(0,1)  (N="+nobs.toString()+")";
      dot.append("text").attr("class","title").attr("x",margin.left).attr("y",margin.top).text(title);

      normalGenerator(nobs, dataSet);       
      nint    = 400;
      step    = 8/nint;
      bins[0] = -4;
      showDotSampleP(nobs, dataSet, nint, step, bins, statP, tdata, tdataY, dataValue);
      gxmin  = statP[9];
      gxmax  = statP[10];
      xrange = gxmax - gxmin;
      start = 0;
      drawStatSample(statP, start, 1) ;

      // 신뢰도 선택
      var rad = document.myFormEst.type1;
      var confidenceLevel = "95%";
      var zvalue = 1.96;
      rad[0].onclick = function() {     // 90%
        confidenceLevel = "90%";
        zvalue = 1.645;
      }
      rad[1].onclick = function() {     // 95%
        confidenceLevel = "95%";
        zvalue = 1.96;
      }
      rad[2].onclick = function() {     // 99%
        confidenceLevel = "99%";
        zvalue = 2.575;
      }

      // 구간추정 시뮬레이션 버튼 클릭
      d3.select("#intervalEst").on("click",function() {
        removeAllSample3();      
        str = svgStrU[19][langNum]+" "+confidenceLevel+" "+svgStrU[20][langNum]+" "+svgStrU[98][langNum];
        dot.append("text").attr("class","title").attr("x", margin.left)
            .attr("y", svgHeight - margin.bottom/3 -10)
            .text(str)
	sobs  = parseFloat(d3.select("#initEst").node().value);    // 표본크기 
        niter = parseFloat(d3.select("#iterEst").node().value);    // 시뮬레이션 반복수 
        if (sobs < 20 ) sobs = 20;
        if (niter > 300) niter = 300;
        str = "n = "+sobs+", r = "+niter;
        dot.append("text").attr("class","title").attr("x", margin.left)
            .attr("y", svgHeight - margin.bottom/3 + 10)
            .text(str)
        tx  = margin.left + graphWidth*(statP[1]-gxmin)/xrange; // population mean location
        ty  = svgHeight - margin.bottom/3;
        ty2 = totalHeight - 20;
        dot.append("line").attr("class","meanG").style("stroke","blue")
            .attr("x1",tx).attr("y1",ty).attr("x2",tx).attr("y2",ty2)

        var oneHeight = (totalHeight - svgHeight) / niter; 

        error = 0;
        for (var gg = 0; gg < niter; gg++) {

          var sdata  = [];
          var sdataY = [];
          var sindex = [];
          var jth;
          for (i=0; i<sobs; i++) {
           jth = Math.floor(Math.random()*nobs);
           sdata[i]  = tdata[jth];
           sindex[i] = jth;
          }

          for (j=0; j<=nvalue; j++) dvalueFreq[j]=0;
          for (i=0; i<sobs; i++) {
            for (j=0; j<=nvalue; j++) {
              if(sdata[i] == dataValue[j]) {
                dvalueFreq[j]++; 
                sdataY[i] = dvalueFreq[j];
                break;
              }
            } // endof j
          } // endof i

          // draw dot graph using sample
          start = svgHeight - margin.bottom/3 + gg*oneHeight;
          if(niter < 11) {
            for (k=0; k<sobs; k++) {
              dot.append("circle")
                 .attr("class","circleS")
                 .attr("cx", margin.left+graphWidth*(tdata[k]-gxmin)/xrange)
                 .attr("cy", margin.top + graphHeight - tdataY[k]*4)
                 .transition()                           // 애니매이션 효과 지정
                 .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
                 .duration(2000)                         // 1초동안 애니매이션이 진행되도록 설정
                 .attr("r", 2)
                 .attr("cx", margin.left+graphWidth*(sdata[k]-gxmin)/xrange)
                 .attr("cy", start + oneHeight - sdataY[k]*4)
            }
          }

          // 표본 통계량 계산 after sorting
          sdata.sort(function(a,b){return a-b});
          sum   = 0;
          for (i=0; i<sobs; i++) {sum += sdata[i];}
          savg   = sum / sobs;
          sqsum = 0;
          for (i=0; i<sobs; i++) {
            temp = sdata[i]-savg;
            sqsum += temp*temp;
          }
          sstd = Math.sqrt(sqsum / sobs);

          temp = zvalue*statP[2]/Math.sqrt(sobs);
          if ( savg - temp > statP[1] || savg + temp < statP[1] ) error++;
 
          drawInterval(sobs, savg, statP, gxmin, xrange, zvalue, oneHeight, niter, start);
  
        } // endof gg

        var accuracy = niter - error;
        var accuracyPercent = 100*accuracy/niter;
        var str = svgStrU[51][langNum] + " = " + accuracyPercent+"%"+" ("+accuracy+"/"+niter+")";

        dot.append("text").attr("class","meanG")
           .attr("x", margin.left)
           .attr("y", svgHeight)
           .text(str)
      }) 
      // svg Graph Save
      d3.select("#saveGraphU").on("click", function() {
        var svg = d3.select("#chart");
        var width = svgWidth;
        var height = 600;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });

