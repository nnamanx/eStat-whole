//  eStatM.js 

var f1   = d3.format(".1f");
var f2   = d3.format(".2f");
var f3   = d3.format(".3f");
var f4   = d3.format(".4f");

var   myColor = ["#0055FF","#FF4500","#00AA00","#FFE400","#FF00DD","#808000","#0000CD","#FFA500","#7CFC00","#87CEEB","#FF1493",
                 "#008000","#6495ED","#FFD700","#BDB76B","#000080","#800000","#778899","#CD853F","#8B008B","#00FFFF","#FFC0CB",
                 "#B0C4DE","#DDA0DD","#A9A9A9","#ADFF2F","#ADD8E6","#FFDAB9","#F0E68C","#E6E6FA","#000099","#00FF99","#009999",
                 "#003399","#333399","#330099","#339999","#336699","#666699","#663399","#669999","#999999","#99CC99","#993399",
                 "#996699","#CCCC99","#CC9999","#FFFF99","#FFCC99","#FF0099","#000033","#00FF33","#003333","#333333","#336633",
                 "#330033","#666633","#663333","#999933","#996633","#99CC33","#CCCC33","#CC9933","#CC9933","#CC3333","#CCFF33",
                 "#FFFF33","#FFCC33","#FF3333","#000066","#00FF66","#006666","#003366","#333366","#330066","#336666","#666666",
                 "#669966","#663366","#999966","#996666","#CCCC66","#CC9966","#CC6666","#CCFF66","#FFFF66","#FFCC66","#FF0066",
                 "#0000CC","#00FFCC","#0033CC","#3333CC","#3300CC","#33CCCC","#3366CC","#6666CC","#6633CC","#66CCCC","#6699CC",
                 "#9999CC","#9966CC","#99CCCC","#CCCCCC","#CCFFCC","#CC33CC","#CC99CC","#FFFFCC","#FFCCCC","#003300","#666600"];


// =====================================================================================
// 연속형 그래프 함수 모음 **************************************************************
// =====================================================================================

function dataClassifyM() {
      // gvar, dvar 변수값, 도수 계산  -- 도수분포표 -------------------------  
      if (numVar < 2) { // 변수 하나는 원시자료
        dobs        = tdvar[0].length;
        dvarNumber  = tdvarNumber[0];
        dvarName    = tdvarName[0];
        dvalueLabel = tdvalueLabel[0];
        dvar        = tdvar[0]; 
 
        for (i=0; i<dobs; i++) {dataA[i] = tdvar[0][i];}
        ndvalue = sortAscend(dobs, dataA, dataValue, dvalueFreq, dataY);

        ngroup      = 1;
        gobs            = dobs;
        gvarNumber  = "";
        gvarName    = "";
        gvalueLabel = [""];

        for (j=0; j<dobs; j++) gvar[j] = 1;
        for (i=0; i<gobs; i++) {dataA[i] = gvar[i];}  
        ngvalue = sortAscend(dobs, dataA, gdataValue, gvalueFreq, dataY);

        rawData = true;
      } 
      else { // 두 개 이상의 변수는 원시자료 또는 요약자료

        gobs        = tdvar[0].length;
        gvarNumber  = tdvarNumber[0];
        gvarName    = tdvarName[0];
        gvalueLabel = tdvalueLabel[0];
        gvar        = tdvar[0];
        
        for (i=0; i<gobs; i++) {dataA[i] = tdvar[0][i];}  
        ngvalue = sortAscend(gobs, dataA, gdataValue, gvalueFreq, dataY);

        dobs        = tdvar[1].length;
        dvarNumber  = tdvarNumber[1];
        dvarName    = tdvarName[1];
        dvalueLabel = tdvalueLabel[1];
        dvar        = tdvar[1]; 

        for (i=0; i<dobs; i++) {dataA[i] = tdvar[1][i];}
        ndvalue = sortAscend(dobs, dataA, dataValue, dvalueFreq, dataY);

        // check 원시자료
        rawData = true;
        if (gobs == ngvalue) rawData = false; 
        if (rawData) ngroup = ngvalue;
//        else ngroup = give warning 요약자료

      } // endof else



      // gvar에서 ngroup 게산

      for (i=0; i<dobs; i++) dataA[i] = gvar[i];
      ngroup  = sortAscend(dobs, dataA, gdataValue, gvalueFreq, dataY)

      ngroup1 = ngroup + 1;
      oneHeight = graphHeight / ngroup;

      // gvar 변수값별 dvar 각 값 rearrange ----------------   
      if (ngroup == 1) {
        nobs[0] = dobs;
        for (i=0; i<dobs; i++) dataSet[0][i] = dvar[i];
      }
      else { // 그룹이 있을 경우
        for (k=0; k<ngroup; k++) nobs[k] = 0;   
        for (i=0; i<dobs; i++) {
          for (j=0; j<ngroup; j++) {
            if (gvar[i] == gdataValue[j]) {k=j; break;}  // gvar[i]의 gdataValue에서 위치파악
          }        
          dataSet[k][nobs[k]] = dvar[i];
          nobs[k]++;
        }
      }

}

// Menu Color Change
function menuColorChange() {
      mainTitle = null;
      document.getElementById("data01").style.backgroundColor = "#4CAF50";
      document.getElementById("data02").style.backgroundColor = "#4CAF50";
      document.getElementById("data03").style.backgroundColor = "#4CAF50";
      document.getElementById("data04").style.backgroundColor = "#4CAF50";
      document.getElementById("data05").style.backgroundColor = "#4CAF50";
      document.getElementById("data06").style.backgroundColor = "#4CAF50";
      document.getElementById("data07").style.backgroundColor = "#4CAF50";
}

// Button Color Change
function buttonColorChange() {

      document.getElementById("DotGraph").style.height = svgHeight;

      document.getElementById("DotMean").checked  = false;
      document.getElementById("DotStd").checked   = false;
      document.getElementById("regress").checked  = false;
      document.getElementById("HistMean").checked = false;
      document.getElementById("HistFreq").checked = false;
      document.getElementById("HistLine").checked = false;

      checkDotMean  = false;
      checkDotStd   = false;
      checkHistMean = false;
      checkHistFreq = false;
      checkHistLine = false;

      DotGraph  = false;
      Histogram = false;
      BoxGraph  = false;
      StemLeaf  = false;
      StemBoth  = false;
      StatTable = false;
      Scatter   = false;

      document.getElementById("dot").style.backgroundColor       = buttonColorB;
      document.getElementById("stem").style.backgroundColor      = buttonColorB;
      document.getElementById("statTable").style.backgroundColor = buttonColorB;
      document.getElementById("hist").style.backgroundColor      = buttonColorB;
      document.getElementById("box").style.backgroundColor       = buttonColorB;
      document.getElementById("both").style.backgroundColor      = buttonColorB;
      document.getElementById("statTable").style.backgroundColor = buttonColorB;
}

   
// Find Maximum
function gmax(ngroup, maxi) {
      var gxmax = maxi[0];
      for (var k=1; k<ngroup; k++) {
        if (gxmax < maxi[k]) gxmax = maxi[k];
      }
      return gxmax;
}

// Find Minimum
function gmin(ngroup, mini) {
      var gxmin = mini[0];
      for (var k=1; k<ngroup; k++) {
        if (gxmin > mini[k]) gxmin = mini[k];
      }
      return gxmin
}

// Sorting in ascending and count each value frequency
function sortAscend(dobs, dataA, dataValue, dvalueFreq, dataY) {
        var i, j;
        var nvalue = 0;
        for (i=0; i<dobs-1; i++) {
          for (j=i; j<dobs; j++) {
            if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  
              dataA[i] = dataA[j];  
              dataA[j] = temp;     
            }
          }
        } 
        for(i=0; i<dobs; i++) {dvalueFreq[i]=0;} 
        dataValue[nvalue]  = dataA[0];  
        dvalueFreq[nvalue] = 1;   
        nvalue = 0;
        dataY[nvalue] = 1;
        for (i=1; i<dobs; i++) {
          if (dataA[i] == dataA[i-1]) {
            dvalueFreq[nvalue]++;
          } 
          else {
            nvalue++;
            dataValue[nvalue] = dataA[i];
            dvalueFreq[nvalue]++;
          }
          dataY[i] = dvalueFreq[nvalue];
        }
        nvalue++;
        return nvalue;
}

// Counting frequency of each histogram interval
function HistIntervalFreq(tobs, nvalueH, dataA, dataValueH, dvalueFreq) {
        var i,j,k;
        for(i=0; i<=nvalueH+2; i++) {dvalueFreq[i]=0;} 
        for (i=0; i<tobs; i++) {
//          if (nvalueH > tobs) document.write(" nvalueH > nobs : wrong <p>" );
          k = 1;
          for (j=k; j<=nvalueH+1; j++) {
            if (dataA[i] < dataValueH[j]) {
              dvalueFreq[j]++;
              break;
            } 
            else {k++;}
          } // endof j
        } // endof i
}

// Statistics for array in tdata[i], i=0,..,tobs-1 
function TotalStat(tobs, tdata, tstat) {
      var i;
      var sum, sqsum, tavg, tstd, tmini, tQ1, tmedian, tQ3, tmaxi;
      var dataA = new Array(tobs);

      for (i=0; i<tobs; i++) dataA[i]=tdata[i];
      sortAscend(tobs, dataA, dataValue, dvalueFreq, dataY);

      sum     = dataA[0];
      for (i=1; i<tobs; i++) {sum += dataA[i];}
      tavg = sum/tobs;
      sqsum  = 0;
      for (i=0; i<tobs; i++) {
          temp   = dataA[i] - tavg;
          sqsum += temp*temp;
      } // endof i
      tstd = Math.sqrt(sqsum/tobs);
      tmini   = dataA[0];
      tmaxi   = dataA[tobs-1];
      tQ1     = d3.quantile(dataA, 0.25);
      tmedian = d3.quantile(dataA, 0.5);
      tQ3     = d3.quantile(dataA, 0.75);
      tstat[0] = tobs;
      tstat[1] = tavg;
      tstat[2] = tstd;
      tstat[3] = tmini;
      tstat[4] = tQ1;
      tstat[5] = tmedian;
      tstat[6] = tQ3;
      tstat[7] = tmaxi;
}

// 각 그룹의 통계량 계산 mini[ngroup] ... std[ngroup]에는 total statistic
function GroupStat(ngroup, nobs, dataSet, mini, Q1, median, Q3, maxi, avg, std) {
      var i, j, k, sum, sqsum, temp;
      var tobs,tavg, tstd, tmini, tQ1, tmedian, tQ3, tmaxi;
      for (k=0; k<ngroup; k++) {
        tobs = nobs[k];
        var tdata = new Array(tobs);
        var dataA = new Array(tobs);
        for (i=0; i<tobs; i++) tdata[i] = dataSet[k][i];

        for (i=0; i<tobs; i++) dataA[i]=tdata[i];
        sortAscend(tobs, dataA, dataValue, dvalueFreq, dataY);

        sum     = dataA[0];
        for (i=1; i<tobs; i++) {sum += dataA[i];}
        avg[k] = sum/tobs;
        sqsum  = 0;
        for (i=0; i<tobs; i++) {
          temp   = dataA[i] - avg[k];
          sqsum += temp*temp;
        } // endof i
        std[k] = Math.sqrt(sqsum/tobs);
        mini[k]   = dataA[0];
        maxi[k]   = dataA[tobs-1];
        Q1[k]     = d3.quantile(dataA, 0.25);
        median[k] = d3.quantile(dataA, 0.5);
        Q3[k]     = d3.quantile(dataA, 0.75);
      } // endof k
    
}

// 주제목 쓰기 함수
function drawTitle(mainTitle, gvarNumber, dvarNumber, gvarName, dvarName) { 
        var str, gstr;
        if (gvarName == null) gvarName ="V"+gvarNumber.toString();
        if (dvarName == null) dvarName ="V"+dvarNumber.toString();

        // 주제목
        str = mainTitle;
        if (mainTitle == null) {
          if (DotGraph)      gstr = "Dot Graph";
          else if(Histogram) gstr = "Histogram"
          else if(BoxGraph)  gstr = "Box-Whisker Plot";
          else if(StemLeaf || StemBoth)  gstr = "Stem & Leaf Plot";
          if (gvarNumber =="") str = "V"+dvarNumber.toString()+": "+dvarName+"의 "+gstr;
          else str = "그룹 V"+gvarNumber.toString()+"("+gvarName+ "): " + "V"+dvarNumber.toString()+"("+dvarName+")의 "+gstr ;
        }
        if (DotGraph) {
          dot.append("text")
             .attr("class","mainTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top/2 + 10)
             .text(str)
        } else if (Histogram) {
          hist.append("text")
             .attr("class","mainTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top/2 + 10)
             .text(str)
        } else if (BoxGraph) {
          dot.append("text")
             .attr("class","mainTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top/2 + 10)
             .text(str)
        } else if (StemLeaf || StemBoth) {
          dot.append("text")
             .attr("class","mainTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top/2 + 10)
             .text(str)
        }
}

// 점그래프 함수 ----------------------------------------------------------------------------------
function drawDotGraph(ngroup, gvalueLabel, nobs, graphWidth, graphHeight, buffer, tstat, dvarName) {

        var i, j, k, tobs, temp, tlabel;
        var sx, sy, tx, ty, x1, x2, y1, y2;
        var nvalue, freqmax;
        var gxmin, gxmax, gxrange, height
        var oneHeight = graphHeight / ngroup;
        var tdata     = new Array(rowMax);
        var dataA     = new Array(rowMax);
        var dataValue = new Array(rowMax);
        var dvalueFreq= new Array(rowMax);
        var dataY     = new Array(rowMax);

//        var margin      = {top: 80, bottom: 80, left: 40, right: 100};
        svgHeight   = 510;
        document.getElementById("DotGraph").style.height = svgHeight;

        var graphWidth  = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
        var graphHeight = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이
        var oneHeight   = graphHeight / ngroup;
        var buffer      = 0;
        var radius      = 4;

        // 점그래프 전체 데이터 최소 최대 계산
        temp    = (tstat[7] - tstat[3]) / 10;  // (전체 최대 - 최소) / 10  : 양쪽 그래프 buffer 
        gxmin   = tstat[3] - temp;
        gxmax   = tstat[7] + temp;
        gxrange = gxmax - gxmin;

        // X축 제목
        dot.append("text")
         .attr("class","xTitle")
         .attr("x",margin.left + graphWidth/2)
         .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
         .text(dvarName)

        // 그룹별 점그래프
        for (k=0; k<ngroup; k++) {
          // 범례
          if (ngroup > 1) {
            if (gvalueLabel[k] == null) tlabel = "Group "+(k+1);
            else tlabel = gvalueLabel[k]; 
            dot.append("text")
               .attr("class","legend")
               .style("stroke",myColor[k])
               .attr("x",margin.left + graphWidth + 20)
               .attr("y",margin.top + oneHeight/2 + oneHeight*k)
               .text(tlabel);
          }

          tobs = nobs[k];
          for (i=0; i<tobs; i++) tdata[i] = dataSet[k][i];

          for (i=0; i<tobs; i++) dataA[i]=tdata[i];
          nvalue = sortAscend(tobs, dataA, dataValue, dvalueFreq, dataY);
/*
       document.write(tobs+"<br>");
       document.write(nvalue+"<br>");
       document.write(dataA+"<br>");
       document.write(dataValue+"<br>");

       for (j=0; j<tobs; j++) document.write(j+" "+dataA[j]+" "+dataY[j]+"<br>");
*/
  
          freqmax = gmax(nvalue,dataY);         // max of dot frequency
     
          // x축 선그리기 
          ty = margin.top + k*oneHeight;
          dot.append("line").attr("x1",margin.left).attr("x2",margin.left + graphWidth)
             .attr("y1",ty).attr("y2",ty) 
             .style("stroke","black") 
          drawDotXaxis(gxmin, gxmax, graphWidth, graphHeight, buffer)

          // y축 선그리기 
          x1 = margin.left;
          x2 = margin.left;
          y1 = margin.top;
          y2 = margin.top + graphHeight;
          dot.append("line").attr("x1",x1).attr("x2",x2).attr("y1",y1).attr("y2",y2).style("stroke","black") 
          x1 += graphWidth;
          dot.append("line").attr("x1",x1).attr("x2",x1).attr("y1",y1).attr("y2",y2).style("stroke","black") 

          // 점그리기
          sx = margin.left + graphWidth/2;
          sy = margin.top; 
          for (j=0; j<tobs; j++) {
            tx = margin.left + graphWidth*(dataA[j]-gxmin)/gxrange;
            ty = margin.top  + (k+1)*oneHeight - dataY[j]*2*radius;
            dot.append("circle")
               .attr("class","circle")
               .style("fill",myColor[k])
               .attr("cx", sx)
               .attr("cy", sy)
               .attr("r", radius)
               .transition()                           // 애니매이션 효과 지정
               .delay(function(d,i) {return i*200;})   // 0.5초마다 그리도록 대기시간 설정
               .duration(1000)                         // 2초동안 애니매이션이 진행되도록 설정
               .attr("cx", tx)
               .attr("cy", ty)
           } // endof j

        } // endof k
      
        // return values  
        tstat[11] = gxmin;
        tstat[12] = gxmax;
        tstat[13] = graphWidth;
        tstat[14] = graphHeight;
 
}

// 점그래프 x축 눈금 표시
function drawDotXaxis(gxmin, gxmax, graphWidth, graphHeight, buffer) {
//        var margin      = {top: 80, bottom: 80, left: 40, right: 100};
        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        var ty = margin.top + graphHeight - buffer;
        dot.append("g")
           .attr("transform","translate("+margin.left+","+ty+")")
           .call(d3.axisBottom(xScale))                    // 눈금을 표시할 함수 호출
}

// 점그래프 평균 표시 함수
function showDotMean(ngroup, avg, gxmin, gxmax, graphWidth, graphHeight) {
       var k, avgx, ty;
       var margin    = {top: 80, bottom: 80, left: 40, right: 100};
       var gxrange   = gxmax - gxmin;
       var oneHeight = graphHeight / ngroup;

       for (k=0; k<ngroup; k++) {
         avgx  = margin.left + graphWidth*(avg[k]-gxmin)/gxrange;  
         ty    = margin.top + k*oneHeight;      
         dot.append("line")
            .attr("class","mean")
            .attr("x1",avgx)
            .attr("y1",ty + 30)
            .attr("x2",avgx)
            .attr("y2",ty + 20 + oneHeight)
            .style("stroke","red")            
         dot.append("text")
            .attr("class","mean")
            .attr("x", avgx)
            .attr("y", ty + 32 + oneHeight)
            .text("mean="+f2(avg[k]))
       }
}

// 점그래프 평균 제거 함수
function removeDotMean() {
	 dot.selectAll("line.mean").remove();
	 dot.selectAll("text.mean").remove();
}

// 점그래프 표준편차 표시 함수
function showDotStd(avg, std, gxmin, gxmax, graphWidth, graphHeight) {
       var k, avgx, ty, stdmx, stdpx;
       var margin  = {top: 80, bottom: 80, left: 40, right: 100};
       var gxrange = gxmax - gxmin;
       var oneHeight = graphHeight / ngroup;

       for (k=0; k<ngroup; k++) {
         avgx  = margin.left + graphWidth*(avg[k]-gxmin)/gxrange;
         ty    = margin.top + (k+1)*oneHeight +20;
         stdmx = margin.left + graphWidth*(avg[k]-std[k]-gxmin)/gxrange;
         stdpx = margin.left + graphWidth*(avg[k]+std[k]-gxmin)/gxrange;
         dot.append("circle")
            .attr("class","std")
            .attr("cx",avgx)
            .attr("cy",ty)
            .attr("r",1)
            .style("fill","green")    
         dot.append("line")
            .attr("class","std")
            .attr("x1",stdmx)
            .attr("y1",ty)
            .attr("x2",avgx)
            .attr("y2",ty)
            .style("stroke","blue")            
         dot.append("line")
            .attr("class","std")
            .attr("x1",stdpx)
            .attr("y1",ty)
            .attr("x2",avgx)
            .attr("y2",ty)
            .style("stroke","blue")          
          dot.append("circle")
            .attr("class","std")
            .attr("cx",stdmx)
            .attr("cy",ty)
            .attr("r",1)
            .style("fill","blue")           
         dot.append("circle")
            .attr("class","std")
            .attr("cx",stdpx)
            .attr("cy",ty)
            .attr("r",1)
            .style("fill","blue")           
         dot.append("text")
            .attr("class","std")
            .attr("x", avgx+80)
            .attr("y", ty+12)
            .text("std dev="+f2(std[k]))
       }
}
     
// 점그래프 표준편차 제거 함수
function removeDotStd() {
	 dot.selectAll("line.std").remove();
	 dot.selectAll("circle.std").remove();
	 dot.selectAll("text.std").remove();
}

// 히스토그램 그리기 함수 -----------------------------------------------------------------------------------------------
function drawHistGraph(ngroup, gxminH, xstep, dataSet, freq, gvalueLabel, dvalueLabel, dvarName) {
      var i, j, k;
      var label, tempx, tempy, tempw, temph;
      var nvaluH, gxminH, gxmaxH, gxrangeH, gyminH, gymaxH, gyrangeH, freqmax, tobs;

      var tdata      = new Array(rowMax);
      var dataA      = new Array(rowMax);
      var dataValue  = new Array(rowMax);  // 각 구간값: 최대 구간의 수 =199개
      var dvalueFreq = new Array(rowMax);  // 각 구간도수  

//      var margin      = {top: 80, bottom: 80, left: 80, right: 100};
      svgHeight   = 510;
      var graphWidth  = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
      var graphHeight = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이
      var oneHeight   = graphHeight / ngroup;

      // 히스토그램 bins, 전체 데이터 최소 최대 계산
      nvalueH = 0;  
      dataValueH[0] = gxminH;
      while (dataValueH[nvalueH] <= tstat[7]) {
          nvalueH++;
          dataValueH[nvalueH] = dataValueH[nvalueH-1] + xstep;
       } 
      nvalueH++;
      dataValueH[nvalueH] = dataValueH[nvalueH-1] + xstep;
      dataValueH[nvalueH+1] = dataValueH[nvalueH] + xstep;
      gxmaxH   = dataValueH[nvalueH];
      gxrangeH = gxmaxH - gxminH;

      // 여러 그룹의 히스토그램 그리기
      freqmax = 0;
      for (k=0; k<ngroup; k++) {
          tobs = nobs[k];
          for (i=0; i<tobs; i++) tdata[i] = dataSet[k][i];

          for (i=0; i<tobs; i++) dataA[i]=tdata[i];
          sortAscend(tobs, dataA, dataValue, dvalueFreq, dataY);
          HistIntervalFreq(tobs, nvalueH, dataA, dataValueH, dvalueFreq);
          for (j=0; j<=nvalueH+1; j++) {
            freq[k][j] = dvalueFreq[j];
            if (dvalueFreq[j] > freqmax) freqmax = dvalueFreq[j]; 
          }
      } // endof k

      gyminH   = 0;
      gymaxH   = freqmax + Math.floor(freqmax/8 + 1);
      gyrangeH = gymaxH - gyminH; 

      // 아래 축그리기
      drawHistAxis(ngroup, dataValueH, gxminH, gxmaxH, gyminH, gymaxH, graphWidth, graphHeight);
      // X축 제목
      hist.append("text")
         .attr("class","xTitle")
         .attr("x",margin.left + graphWidth/2)
         .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
        .text(dvarName)
      // Y축 제목
      str = "Frequency";
      hist.append("text")
          .attr("class","yTitle")
          .attr("x",margin.left/2-15)
          .attr("y",margin.top+ 15)
          .text(str)
          .attr("transform", "rotate(-90 30 100)")


      // 그룹 히스토그램
      for (k=0; k<ngroup; k++) {
        // 범례
        if (ngroup > 1) {
          if (gvalueLabel[k] == null) label = "Group "+(k+1);
          else label = gvalueLabel[k];
          hist.append("text")
              .attr("class","legend")
              .style("stroke",myColor[k])
              .attr("x",margin.left + graphWidth + 20)
              .attr("y",margin.top + oneHeight/2 + oneHeight*k)
              .text(label);
        }
        // 히스토그램
        for (i=1; i<=nvalueH+1; i++) {
            tempx = margin.left + graphWidth*(dataValueH[i-1]-gxminH)/gxrangeH;
            tempy = margin.top + (k+1)*oneHeight - oneHeight*(freq[k][i]-gyminH)/gyrangeH;
            tempw = graphWidth*xstep/gxrangeH;
            temph = oneHeight*(freq[k][i]-gyminH)/gyrangeH;
            hist.append("rect")
                .style("fill",myColor[k])
                .attr("class","bar")
                .attr("x",tempx)
                .attr("width",tempw)
                .attr("height",0)
                .attr("y",margin.top+(k+1)*oneHeight)
                .transition()                           // 애니매이션 효과 지정
                .delay(function(d,i) {return i*250;})   // 0.5초마다 그리도록 대기시간 설정
                .duration(1000)                         // 2초동안 애니매이션이 진행되도록 설정
                .attr("y",tempy)
                .attr("height",temph)
        } // endof i
      }

//      return {gxmaxH; gyminH, gymaxH};
      return {a:gxmaxH, b:gyminH, c:gymaxH};

}

// 히스토그램 y축, x축 그리기
function drawHistAxis(ngroup, dataValueH, gxminH, gxmaxH, gyminH, gymaxH, graphWidth, graphHeight) {
        var i, j, k;
        var tx, ty, x1, x2, y1, y2, z1, z2;
        var margin    = {top: 80, bottom: 80, left: 80, right: 100};
        var oneHeight = graphHeight / ngroup;
        var gxrangeH  = gxmaxH - gxminH;

        // Y축 그리기
        var yScale = d3.scaleLinear().domain([gyminH, gymaxH]).range([oneHeight, 0]);

        for (k=0; k<ngroup; k++) {
          tx = margin.left;
          ty = k*oneHeight + margin.top;
          hist.append("g")
              .attr("class","axis")
              .attr("transform","translate("+tx+", "+ty+") ")
              .call(d3.axisLeft(yScale))
        }
        hist.append("line")
            .attr("x1",margin.left+graphWidth)
            .attr("x2",margin.left+graphWidth)
            .attr("y1",margin.top)
            .attr("y2",margin.top+graphHeight) 
            .style("stroke","black") 

        /// 각 히스토그램의 x축 선
        for (k=0; k<=ngroup; k++) {           
          tx = margin.left;
          ty = k*oneHeight + margin.top;
          hist.append("line")
              .attr("x1",tx)
              .attr("x2",margin.left+graphWidth)
              .attr("y1",ty)
              .attr("y2",ty) 
              .style("stroke","black") 
        }
 
        // 히스토그램의 x축 아래 tick, value 값선
        y1 = margin.top  + graphHeight;
        y2 = y1 + 5;
        for (i=0; i<=nvalueH; i++) {
          x1 = margin.left+graphWidth*(dataValueH[i]-gxminH)/gxrangeH;
          x2 = x1
          hist.append("line")
              .attr("x1",x1)
              .attr("x2",x2)
              .attr("y1",y1)
              .attr("y2",y2) 
              .style("stroke","black") 
          hist.append("text")
              .attr("class","myaxis")
              .attr("x",x1)
              .attr("y",y2+15)
              .text(f2(dataValueH[i]))
        }
}

// 히스토그램 평균 표시 함수
function showHistMean(ngroup, avg, gxminH, gxmaxH) {
        var tempx, tempy;

//        var margin      = {top: 80, bottom: 80, left: 80, right: 100};
        var graphWidth  = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
        var graphHeight = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이
        var oneHeight   = graphHeight / ngroup;
        var gxrangeH    = gxmaxH - gxminH;

        for (var k=0; k<ngroup; k++) {
          tempx = margin.left + graphWidth*(avg[k]-gxminH)/gxrangeH;
          tempy = margin.top + k*oneHeight + 5;
          hist.append("line")
                .attr("class","histmean")
                .attr("x1",tempx)
                .attr("y1",tempy+20)
                .attr("x2",tempx)
                .attr("y2",tempy + oneHeight)
          hist.append("text")
                .attr("class","histmean")
                .attr("x", tempx)
                .attr("y", tempy + oneHeight+5)
                .text("mean ="+f2(avg[k]))
        }
}   

// 히스토그램 평균표시 제거 함수
function removeHistMean() {
	 hist.selectAll("line.histmean").remove();
         hist.selectAll("circle.histmean").remove();
         hist.selectAll("text.histmean").remove();   
}

// 히스토그램 도수 표시 함수
function showHistFreq(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH) {
        var x1, y1;

//        var margin      = {top: 80, bottom: 80, left: 80, right: 100};
        var graphWidth  = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
        var graphHeight = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이
        var oneHeight   = graphHeight / ngroup;
        var gxrangeH    = gxmaxH - gxminH;
        var gyrangeH    = gymaxH - gyminH;

        for (var k=0; k<ngroup; k++) {
          for (var i=1; i<=nvalueH; i++) {
            x1 = margin.left + graphWidth*(dataValueH[i-1]+xstep/2-gxminH)/gxrangeH;
            y1 = margin.top + (k+1)*oneHeight - oneHeight*(freq[k][i]-gyminH)/gyrangeH;
            hist.append("text")
                .attr("class","histfreq")
                .attr("x", x1)
                .attr("y", y1-4)
                .text(freq[k][i])
          }
        }
}

// 히스토그램 도수 제거 함수
function removeHistFreq() {
	 hist.selectAll("text.histfreq").remove();
}


// 히스토그램 도수분포다각형 표시 함수
function showHistLine(ngroup, nvalueH, xstep, freq, dataValueH, gxminH, gxmaxH, gyminH, gymaxH) {
        var i, k;

//        var margin      = {top: 80, bottom: 80, left: 80, right: 100};
        var graphWidth  = svgWidth - margin.left - margin.right;   // 그래프 영역의 너비
        var graphHeight = svgHeight - margin.top - margin.bottom;  // 그래프 영역의 높이
        var oneHeight   = graphHeight / ngroup;
        var gxrangeH    = gxmaxH - gxminH;
        var gyrangeH    = gymaxH - gyminH;

        for (k=0; k<ngroup; k++) {
          for (i=1; i<nvalueH; i++) {
            x1 = margin.left + graphWidth*(dataValueH[i-1]+xstep/2-gxminH)/gxrangeH;
            y1 = margin.top + (k+1)*oneHeight - oneHeight*(freq[k][i]-gyminH)/gyrangeH;
            x2 = margin.left + graphWidth*(dataValueH[i]+xstep/2-gxminH)/gxrangeH;
            y2 = margin.top + (k+1)*oneHeight - oneHeight*(freq[k][i+1]-gyminH)/gyrangeH;
            hist.append("circle")
              .attr("class","histline")
              .attr("cx",x1)
              .attr("cy",y1)
              .attr("r",3)
       
            hist.append("line")
              .attr("class","histline")
              .attr("x1",x1)
              .attr("x2",x2)
              .attr("y1",y1)
              .attr("y2",y2)
 
            hist.append("circle")
              .attr("class","histline")
              .attr("cx",x2)
              .attr("cy",y2)
              .attr("r",3)

          }
        }
}

// 히스토그램 도수분포다각형 제거
function removeHistLine() {
	 hist.selectAll("line.histline").remove();
         hist.selectAll("circle.histline").remove();
}

// 히스토그램 도수분포표 
function showHistTable(ngroup, nvalueH, freq, dataValueH, dvarName, gvarName,gvalueLabel) {
        var table = document.getElementById("HistTable");
        var j, k, sum, totsum, row;
        var cell = new Array(5);

        table.style.fontSize = "13px";

          row = table.insertRow(0);
          row.innerHTML = ",<h3> 그룹 도수분포표</h3>";
          row.style.textAlign = "center";
 
          row = table.insertRow(1);
          row.style.height ="40px";
          for (j=0; j<nvalueH+2; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="70px";
          }
          cell[0].style.width ="120px";
          cell[0].innerHTML = "분석변량명";
          cell[0].style.backgroundColor = "#eee";
          cell[1].innerHTML = dvarName;
          cell[3].innerHTML = "그룹명";
          cell[3].style.backgroundColor = "#eee";
          cell[4].innerHTML = gvarName;
          for (j=0; j<nvalueH+2; j++) cell[j].style.textAlign = "center";

          row = table.insertRow(2);
          row.style.height ="40px";
          for (j=0; j<nvalueH+2; j++) cell[j] = row.insertCell(j)
          cell[0].innerHTML = "그룹 | 분석변량";
          for (j=1; j<nvalueH+1; j++) cell[j].innerHTML = j.toString()+"<br> ["+f1(dataValueH[j-1])+", "+f1(dataValueH[j])+")";
          cell[nvalueH+1].innerHTML = "합계";   
          for (j=0; j<nvalueH+2; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
          }

          totsum = 0;
          for (k=0; k<ngroup; k++) {
            row = table.insertRow(k+3);
            for (j=0; j<nvalueH+2; j++) cell[j] = row.insertCell(j)          
            cell[0].innerHTML = "그룹 "+(k+1).toString()+" ("+gvalueLabel[k]+")";
            cell[0].style.textAlign = "center";
            cell[0].style.backgroundColor = "#eee";
            sum = 0;
            for (j=1; j<nvalueH+1; j++) sum += freq[k][j];
            totsum += sum;
            for (j=1; j<nvalueH+1; j++) {
              cell[j].innerHTML = freq[k][j].toString()+"<br> ("+f2(100*freq[k][j]/sum).toString()+"%)";
              cell[j].style.textAlign = "right";
            }
            cell[nvalueH+1].innerHTML = sum.toString()+"<br> ("+(100).toString()+"%)";
            cell[nvalueH+1].style.textAlign = "right";
            cell[nvalueH+1].style.backgroundColor = "#eee";
          }

          row = table.insertRow(ngroup+3);
          for (j=0; j<nvalueH+2; j++) cell[j] = row.insertCell(j)
          cell[0].innerHTML = "합  계";
          cell[0].style.textAlign = "center";
          for (j=1; j<nvalueH+1; j++) {
            sum = 0;
            for (k=0; k<ngroup; k++) sum += freq[k][j];
            cell[j].innerHTML = sum.toString()+"<br> ("+f2(100*sum/totsum).toString()+"%)";
            cell[j].style.textAlign = "right";
          }  
          cell[nvalueH+1].innerHTML = totsum.toString()+"<br> ("+(100).toString()+"%)";
          cell[nvalueH+1].style.textAlign = "right";    
          for (j=0; j<nvalueH+2; j++) cell[j].style.backgroundColor = "#eee";
      
}



// 상자그래프 함수 ---------------------------------------------------------------------------------------------
function drawBoxGraph(ngroup, label, mini, Q1, median, Q3, maxi, graphWidth, oneHeight, gxmin, gxrange) {
       var x1, x2, y1, y2;
       var width, height, tlabel;

       svgHeight   = 510;
       graphHeight = svgHeight - margin.top - margin.bottom;
       document.getElementById("DotGraph").style.height = svgHeight;

       for (var k=0; k<ngroup; k++) {
          // 범례
          if (ngroup > 1) {
            if (label == null) tlabel = "Group "+(k+1);
            else tlabel = label[k];
            dot.append("text").attr("class","legend")
               .style("stroke",myColor[k])
               .attr("x",margin.left + graphWidth + 10)
               .attr("y",margin.top + oneHeight/2 + oneHeight*k)
               .text(tlabel);
          }
          // 최소
          x1 = margin.left + graphWidth*(mini[k]-gxmin)/gxrange;
          y1 = margin.top + k*oneHeight +20;
          x2 = x1;
          y2 = y1 + oneHeight/2;
          dot.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
             .style("stroke",myColor[k]).style("stroke-width","2px")       
          dot.attr("class","stat").append("text").attr("x", x2-3).attr("y", y2+13).text("min="+mini[k])

          // 최소 => Q1
          x2 = x1 + graphWidth*(Q1[k]-mini[k])/gxrange;
          dot.append("line").attr("x1",x1).attr("y1",y1+oneHeight/4).attr("x2",x2).attr("y2",y1+oneHeight/4)
             .style("stroke",myColor[k]).style("stroke-width","2px")

          // 최대
          x1 = margin.left + graphWidth*(maxi[k]-gxmin)/gxrange;
          x2 = x1;
          dot.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
             .style("stroke",myColor[k]).style("stroke-width","2px")
          dot.attr("class","stat").append("text").attr("x", x2-3).attr("y", y2+13).text("max="+maxi[k])

          // 상자
          x1 = margin.left + graphWidth*(Q1[k]-gxmin)/gxrange;
          width = graphWidth*(Q3[k]-Q1[k])/gxrange;
          height = oneHeight/2;
          dot.append("rect").attr("x",x1).attr("y",y1).attr("width",width).attr("height",height)
             .style("stroke",myColor[k]).style("fill",myColor[k])
          
          // Q1
          dot.append("text").attr("class","stat").attr("x", x1+3).attr("y", y2+25).text("Q1="+f2(Q1[k]))
          // Q3
          dot.append("text").attr("class","stat").attr("x", x1+width+6).attr("y", y2+25).text("Q3="+f2(Q3[k]))

          // Q3 => max
          x1 = margin.left + graphWidth*(Q3[k]-gxmin)/gxrange;
          x2 = x1 + graphWidth*(maxi[k]-Q3[k])/gxrange;
          dot.append("line").attr("x1",x1).attr("y1",y1+oneHeight/4).attr("x2",x2).attr("y2",y1+oneHeight/4)
             .style("stroke",myColor[k]).style("stroke-width","2px")

          // median
          x1 = margin.left + graphWidth*(median[k]-gxmin)/gxrange;
          x2 = x1;
          dot.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
             .style("stroke","lime").style("stroke-width","2px")
          dot.append("text").attr("class","stat").attr("x", x1+6).attr("y", y2+13).text("m="+f2(median[k]))
       }
}

// 줄기잎그림 함수 -----------------------------------------------------------------------------
function drawStemLeaf(ngroup, nobs, dataSet, tstat, graphWidth, buffer) {
        var i, j, k, kk, digitMax, digitDeci, digit10, len, pos, temp, temp1, temp2, ty, x1, y1, x2, y2;
        var tobs, nvalue;
        var tdata = new Array(rowMax);
        var lineSpace  = 15;

        var stem       = new Array(rowMax);
        var stemStr    = new Array(rowMax);
        var leaf       = new Array(rowMax);
        var dataValue  = new Array(rowMax);
        var dvalueFreq = new Array(rowMax);

        // 소수아래 자리수 계산
        digitDeci = 0;
        for (kk=0; kk<ngroup; kk++) { 
          tobs  = nobs[kk];
          for (i=0; i<tobs; i++) {
            temp = dataSet[kk][i].toString();
            pos  = temp.indexOf(".");
            if (pos < 0) len = 0;
            else len = temp.length - pos - 1;
            if (len > digitDeci) digitDeci = len;
          }
        }
        if (digitDeci < 0) digitDeci = 0;
        digit10 = 1;
        if (digitDeci > 0) {
          for (j=0; j<digitDeci; j++) digit10 *= 10;
        }

        // Counting Stem 
        temp1  = tstat[3]*digit10 - tstat[3]*digit10%10;
        temp2  = tstat[7]*digit10 - tstat[7]*digit10%10;
        nvalue = temp2/10 - temp1/10 + 2;

        svgHeight   = margin.top + margin.bottom + ngroup*20 + ngroup * nvalue * lineSpace;
        if (svgHeight < 510) svgHeight = 510;
        graphHeight = svgHeight - margin.top - margin.bottom;
        document.getElementById("DotGraph").style.height = svgHeight;
         tableLoc = (svgHeight + 160).toString()+"px";
        document.getElementById("table1").style.top = tableLoc;
        document.getElementById("table2").style.top = tableLoc;


        stem[0] = temp1;
        for (j=1; j<nvalue; j++) {
          stem[j]  = stem[j-1] + 10;
        }

        for (j=0; j<nvalue; j++) {
          temp = stem[j].toFixed(0);
          len  = temp.length;
          stemStr[j]    = temp.substr(0,len-1); 
          if (stemStr[j] == "") stemStr[j] = "0";
          dvalueFreq[j] = 0;
          leaf[j] = new Array(100);
        }

        ty = 20;
        for (kk=0; kk<ngroup; kk++) { 

          tobs  = nobs[kk];
          for (i=0; i<tobs; i++) {tdata[i] = (dataSet[kk][i]*digit10).toPrecision(12);}
          CountLeaf(nvalue, tobs, tdata, dataValue, dvalueFreq, stem, leaf);

          dot.append("text").attr("class","titleStem").attr("x", margin.left + 20).attr("y", margin.top + ty)
             .text("Stem").style("stroke",myColor[kk]);
          if (ngroup ==1) temp = "";
          else temp = "Group " + (kk+1).toString() + " Leaf";
          dot.append("text").attr("class","titleStem").attr("x", margin.left + 90).attr("y", margin.top + ty)
              .text(temp).style("stroke",myColor[kk]);  
          dot.append("line").attr("x1",margin.left).attr("x2",margin.left+graphWidth)
              .attr("y1",margin.top+10 + ty).attr("y2",margin.top+10 + ty).style("stroke","black") 

          for (j=0; j<nvalue-1; j++) {
            x1 = margin.left + 50;
            y1 = ty + margin.top  + 30 + j*lineSpace;
            temp = stemStr[j];
            if (digitDeci > 1) temp = ( parseInt(stemStr[j]) / (digit10/10) ).toFixed(digitDeci-1);
            dot.append("text").attr("class","stem").attr("x", x1).attr("y", y1).text(temp).style("stroke",myColor[kk]) ;
            for (k=1; k<=dvalueFreq[j]; k++) {
              x2 = x1 + 40 + k*16;
              dot.append("text")
                .attr("class","leaf")
                .attr("x", x2)
                .attr("y", y1)
                .text(leaf[j][k]) 
                .transition()                           // 애니매이션 효과 지정
                .delay(function(d,i) {return i*250;})   // 0.5초마다 그리도록 대기시간 설정
                .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                .style("stroke",myColor[leaf[j][k]]) 
            } // endfof k
          }  // endof j 

          for (j=0; j<nvalue-1; j++) {
             for (k=1; k<=dvalueFreq[j]; k++) {
               leaf[j][k]= 0; 
            }
          }  // endof j  

          ty += nvalue*lineSpace + 50;
        } // end of kk

        svgHeight   = 510;
        graphHeight = svgHeight - margin.top - margin.bottom;
}


// 양쪽형 줄기잎그림
function drawStemLeafBoth(ngroup, nobs, dataSet, tstat, graphWidth, buffer) {
        var i, j, k, kk, digitMax, digitDeci, digit10, len, pos, temp, temp1, temp2, ty, x1, y1, x2, y2;
        var tobs, nvalue;

        // 전체 제목
//        drawTitleM(graphNum, mTitle, yTitle, xTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

        var lineSpace  = 15;
        var tdata      = new Array(rowMax);
        var stem       = new Array(rowMax);
        var stemStr    = new Array(rowMax);
        var leaf       = new Array(rowMax);
        var dataValue  = new Array(rowMax);
        var dvalueFreq = new Array(rowMax);


        // 소수아래 자리수 계산
        digitDeci = 0;
        for (kk=0; kk<ngroup; kk++) { 
          tobs  = nobs[kk];
          for (i=0; i<tobs; i++) {
            temp = dataSet[kk][i].toString();
            pos  = temp.indexOf(".");
            if (pos < 0) len = 0;
            else len = temp.length - pos - 1;
            if (len > digitDeci) digitDeci = len;
          }
        }
        if (digitDeci < 0) digitDeci = 0;
        digit10 = 1;
        if (digitDeci > 0) {
          for (j=0; j<digitDeci; j++) digit10 *= 10;
        }

        // Counting Stem 
        temp1  = tstat[3]*digit10 - tstat[3]*digit10%10;
        temp2  = tstat[7]*digit10 - tstat[7]*digit10%10;
        nvalue = temp2/10 - temp1/10 + 2;


        stem[0] = temp1;
        for (j=1; j<nvalue; j++) {
          stem[j]  = stem[j-1] + 10;
        }

        for (j=0; j<nvalue; j++) {
          temp = stem[j].toFixed(0);
          len  = temp.length;
          stemStr[j]    = temp.substr(0,len-1); 
          if (stemStr[j] == "") stemStr[j] = "0";
          dvalueFreq[j] = 0;
          leaf[j] = new Array(100);
        }

//////////////////////////////////////////////////////////


           // heading
          tx = margin.left + graphWidth/2 - buffer - 20;
          dot.append("text").attr("class","titleStem")
              .attr("x", tx).attr("y", margin.top+5)
              .text("줄기").style("stroke","black");
          dot.append("text")
              .attr("class","titleStem")
              .attr("x", tx - 110)
              .attr("y", margin.top+5)
              .text("그룹 1  잎")
              .style("stroke",myColor[0])  
          dot.append("text")
              .attr("class","titleStem")
              .attr("x", tx + 80)
              .attr("y", margin.top+5)
              .text("그룹 2  잎")
              .style("stroke",myColor[1])  
          dot.append("line")
              .attr("x1",20)
              .attr("x2",svgWidth-20)
              .attr("y1",margin.top+17)
              .attr("y2",margin.top+17) 
              .style("stroke","black") 


        // 줄기잎그림 ---------------------------------
        for (kk = 0; kk<ngroup; kk++) {
          tobs  = nobs[kk];

          for (i=0; i<tobs; i++) {tdata[i] = (dataSet[kk][i]*digit10).toPrecision(12);}
          CountLeaf(nvalue, tobs, tdata, dataValue, dvalueFreq, stem, leaf);


          tx = margin.left + graphWidth/2 - buffer;
          ty = 0;

          for (j=0; j<nvalue-1; j++) {
            x1 = tx;
            y1 = ty + margin.top  + 40 + j*lineSpace;

            temp = stemStr[j];
            if (digitDeci > 1) temp = ( parseInt(stemStr[j]) / (digit10/10) ).toFixed(digitDeci-1);
            dot.append("text").attr("class","stem").attr("x", x1+10).attr("y", y1).text(temp)

            for (k=1; k<=dvalueFreq[j]; k++) {
              if (kk==0) x2 = x1 - 40 - k*10;
              else x2 = x1 + 50 + k*10;
              dot.append("text")
                .attr("class","leaf")
                .attr("x", x2)
                .attr("y", y1)
                .text(leaf[j][k]) 
                .transition()                           // 애니매이션 효과 지정
                .delay(function(d,i) {return i*250;})   // 0.5초마다 그리도록 대기시간 설정
                .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                .style("stroke",myColor[leaf[j][k]]) 
            } // endof k
          }  // endof j  

          for (j=0; j<nvalue-1; j++) {
             for (k=1; k<=dvalueFreq[j]; k++) {
               leaf[j][k]= 0; 
             }
           }  

        } // endof kk
}

/*

// 양쪽형 줄기잎그림
function drawStemLeafBoth(ngroup, nobs, dataSet, tstat, graphWidth, buffer) {
 
        var i, j, k, kk, temp, temp1, temp2, ty, x1, y1, x2, y2;
        var tobs, nvalue;

        svgHeight   = 510;
        graphHeight = svgHeight - margin.top - margin.bottom;
        document.getElementById("DotGraph").style.height = svgHeight;

        var lineSpace  = 15;
        var tdata      = new Array(rowMax);
        var stem       = new Array(rowMax);
        var leaf       = new Array(rowMax);
        var dataValue  = new Array(rowMax);
        var dvalueFreq = new Array(rowMax);

        // Counting Stem 
        temp1 = tstat[3] - tstat[3]%10;
        temp2 = tstat[7] - tstat[7]%10;
        nvalue = temp2/10 - temp1/10 + 2;

        stem[0] = temp1;
        for (j=1; j<nvalue; j++) {
          stem[j]  = stem[j-1] + 10;
        }
        for (j=0; j<nvalue; j++) {
          dvalueFreq[j] = 0;
          leaf[j] = new Array(100);
        }


           // heading
          tx = margin.left + graphWidth/2 - buffer - 20;
          dot.append("text").attr("class","titleStem")
              .attr("x", tx).attr("y", margin.top+5)
              .text("Stem").style("stroke","black");
          dot.append("text")
              .attr("class","titleStem")
              .attr("x", tx - 120)
              .attr("y", margin.top+5)
              .text("Group 1  Leaf")
              .style("stroke",myColor[0])  
          dot.append("text")
              .attr("class","titleStem")
              .attr("x", tx + 80)
              .attr("y", margin.top+5)
              .text("Group 2  Leaf")
              .style("stroke",myColor[1])  
          dot.append("line")
              .attr("x1",margin.left)
              .attr("x2",margin.left+graphWidth)
              .attr("y1",margin.top+17)
              .attr("y2",margin.top+17) 
              .style("stroke","black") 


        // 줄기잎그림 ---------------------------------
        for (kk = 0; kk<ngroup; kk++) {
          tobs  = nobs[kk];
          for (i=0; i<nobs[kk]; i++) {tdata[i] = dataSet[kk][i];}
          CountLeaf(nvalue, tobs, tdata, dataValue, dvalueFreq, stem, leaf);

//          for (j=0; j<nvalue-1; j++) stem[j] = dataValue[j]/10;

          tx = margin.left + graphWidth/2 - buffer;
          ty = 0;

          for (j=0; j<nvalue-1; j++) {
            x1 = tx;
            y1 = ty + margin.top  + 40 + j*lineSpace;

            temp = (stem[j]/10).toString();
            dot.append("text")
             .attr("class","stem")
             .attr("x", x1+10)
             .attr("y", y1)
             .text(temp)
            for (k=1; k<=dvalueFreq[j]; k++) {
              if (kk==0) x2 = x1 - 40 - k*16;
              else x2 = x1 + 50 + k*16;
              dot.append("text")
                .attr("class","leaf")
                .attr("x", x2)
                .attr("y", y1)
                .text(leaf[j][k]) 
                .transition()                           // 애니매이션 효과 지정
                .delay(function(d,i) {return i*250;})   // 0.5초마다 그리도록 대기시간 설정
                .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                .style("stroke",myColor[leaf[j][k]]) 
            } // endof k
          }  // endof j  

          for (j=0; j<nvalue-1; j++) {
             for (k=1; k<=dvalueFreq[j]; k++) {
               leaf[j][k]= 0; 
             }
           }  

        } // endof kk
        
}


*/
// Sorting freq in ascending order and determine leaf
function CountLeaf(nvalue, tobs, tdata, dataValue, dvalueFreq, stem, leaf) {
        var i, j, k;
        var dataA = new Array(tobs);

        for (i=0; i<tobs; i++) dataA[i]=tdata[i];
        sortAscend(tobs, dataA, dataValue, dvalueFreq, dataY);
        for (j=0; j<nvalue; j++) dvalueFreq[j] = 0;
        k = 1;   
        for (i=0; i<tobs; i++) {
          for (j=k; j<nvalue; j++) {
            if (dataA[i] < stem[j]) {
              dvalueFreq[j-1]++;
              if (dataA[i] >= 0)  leaf[j-1][dvalueFreq[j-1]] = dataA[i]%10;
              else  leaf[j-1][dvalueFreq[j-1]] = -dataA[i]%10;  
              break;
            }
            else {k++;} 
          }
        }
/*
        document.write("stem"+stem+"<br>");
        document.write("tdata"+tdata+"<br>");
        document.write("dataA"+dataA+"<br>");
        document.write("dataValue"+dataValue+"<br>");
        for (j=0; j<nvalue; j++) {
           for (k=1; k<=dvalueFreq[j]; k++) {
              document.write(" "+leaf[j][k]);
           }
           document.write("<br>");
        }
*/

}

// 기초통계량표 --------------------------------------------------------------------------------------------------
function statTable(ngroup, dvarName, gvarName, gvalueLabel, nobs, avg, std, mini, Q1, median, Q3, maxi, tstat) {
        var table = document.getElementById("StatTable");
        var row;
        var ncol = 7;
        var cell = new Array(7);

          table.style.fontSize = "13px";
 
          var header = table.createTHead();
          row = header.insertRow(0);
          row.innerHTML = ",<h3>기초통계량</h3>";
          row.style.textAlign = "center";
 
          row  = table.insertRow(1);
          row.style.height ="40px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="70px";
          }
          cell[0].style.width ="110px";
          cell[0].style.backgroundColor = "#eee";
          cell[0].innerHTML = "분석변량명";
          cell[1].innerHTML = dvarName;
          cell[3].innerHTML = "그룹명";
          cell[3].style.backgroundColor = "#eee";
          cell[4].innerHTML = gvarName;
          for (j=0; j<ncol; j++) cell[j].style.textAlign = "center";

          row  = table.insertRow(2);
          row.style.height ="40px";
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);
          cell[0].innerHTML = "그룹 | 통계량";
          cell[1].innerHTML = "자료수";  
          cell[2].innerHTML = "mean";  
          cell[3].innerHTML = "std dev";  
          cell[4].innerHTML = "최솟값";  
          cell[5].innerHTML = "중앙값";  
          cell[6].innerHTML = "최댓값";  
          for (j=0; j<ncol; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
          }

          for (g=0; g<ngroup; g++) {
            row = table.insertRow(g+3);
            for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
            cell[0].innerHTML = "그룹 "+(g+1).toString()+" ("+gvalueLabel[g]+")";
            cell[0].style.backgroundColor = "#eee";
            cell[1].innerHTML = nobs[g].toString();  
            cell[2].innerHTML = f2(avg[g]).toString();  
            cell[3].innerHTML = f2(std[g]).toString();   
            cell[4].innerHTML = f2(mini[g]).toString();   
            cell[5].innerHTML = f2(median[g]).toString();   
            cell[6].innerHTML = f2(maxi[g]).toString();   
            cell[0].style.textAlign = "center";
            for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";         
          }

          row = table.insertRow(ngroup+3);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = "전체";
          cell[0].style.backgroundColor = "#eee";
          cell[1].innerHTML = tstat[0].toString(); 
          for (j=2; j<ncol; j++) cell[j].innerHTML = f2(tstat[j-1]).toString();  
          cell[0].style.textAlign = "center";
          for (j=1; j<ncol; j++) {
            cell[j].style.textAlign = "right";          
            cell[j].style.backgroundColor = "#eee";
          }
}

// ================================================================================================     
//   Scatterplot Modules ==========================================================================
// ================================================================================================

// Sort in Ascending
function SortAscendBasic(tobs, tdata, dataA) {
        var i, j, temp;
        for (i=0; i<tobs; i++) {dataA[i] = tdata[i];}
        for (i=0; i<tobs-1; i++) {
          for (j=i; j<tobs; j++) {
            if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  
              dataA[i] = dataA[j];  
              dataA[j] = temp;     
            }
          }
        } 
}

// Count Number of dot value and its frequecny
function DotValueFreq(tobs, dataA, dataValue, dataY ) {
        var dvalueFreq = new Array(tobs);
        var i, nvalue;
        for(i=0; i<tobs; i++) {
          dvalueFreq[i]=0; 
          dataY[i]=1;
        } 
        nvalue = 0;
        dataValue[nvalue]  = dataA[0];  
        dvalueFreq[nvalue] = 1;   
        for (i=1; i<tobs; i++) {
          if (dataA[i] == dataA[i-1]) {
            dvalueFreq[nvalue]++;
          } 
          else {
            nvalue++;
            dataValue[nvalue] = dataA[i];
            dvalueFreq[nvalue]++;
          }
          dataY[i] = dvalueFreq[nvalue];
        }
        nvalue++;
        return nvalue;
}
// Basic Statistics for two variables with group
function bivarStatByGroup(ngroup,tobs,xdata,ydata,gdata,nobs,xavg,yavg,xstd,ystd,alpha,beta,corr,rsquare) {
      var i, j, k, tempx, tempy;
      var xsum = new Array(ngroup+1);
      var xsqs = new Array(ngroup+1);
      var ysum = new Array(ngroup+1);
      var ysqs = new Array(ngroup+1);
      var sxx  = new Array(ngroup+1);
      var syy  = new Array(ngroup+1);
      var sxy  = new Array(ngroup+1);

      for (k=0; k<=ngroup; k++) {
        xsum[k] = 0; ysum[k] = 0; sxx[k] = 0; sxy[k] = 0; syy[k] = 0; nobs[k] = 0;
      }
      for (i=0; i<tobs; i++) {
        nobs[gdata[i]-1]++;
        xsum[gdata[i]-1] += xdata[i];
        ysum[gdata[i]-1] += ydata[i];
        xsum[ngroup]     += xdata[i];
        ysum[ngroup]     += ydata[i];
      }
      nobs[ngroup] = tobs;
      for (k=0; k<ngroup; k++) {
        xavg[k] = xsum[k] / nobs[k];
        yavg[k] = ysum[k] / nobs[k];
      }
      xavg[ngroup] = xsum[ngroup] / tobs;
      yavg[ngroup] = ysum[ngroup] / tobs;
 
      for (i=0; i<tobs; i++) {
        tempx = xdata[i] - xavg[gdata[i]-1];
        tempy = ydata[i] - yavg[gdata[i]-1];
        sxx[gdata[i]-1] += tempx*tempx;
        syy[gdata[i]-1] += tempy*tempy;
        sxy[gdata[i]-1] += tempx*tempy; 
        tempx = xdata[i] - xavg[ngroup];
        tempy = ydata[i] - yavg[ngroup];
        sxx[ngroup] += tempx*tempx;
        syy[ngroup] += tempy*tempy;
        sxy[ngroup] += tempx*tempy; 
      }
      for (k=0; k<ngroup; k++) {
        xstd[k]    = Math.sqrt(sxx[k] / nobs[k]);
        ystd[k]    = Math.sqrt(syy[k] / nobs[k]);
        beta[k]    = sxy[k] / sxx[k];
        alpha[k]   = yavg[k] - beta[k]*xavg[k];
        corr[k]    = sxy[k] / Math.sqrt(sxx[k] * syy[k]);
        rsquare[k] = corr[k] * corr[k];
      }
      xstd[ngroup]    = Math.sqrt(sxx[ngroup] / tobs);
      ystd[ngroup]    = Math.sqrt(syy[ngroup] / tobs);
      beta[ngroup]    = sxy[ngroup] / sxx[ngroup];
      alpha[ngroup]   = yavg[ngroup] - beta[ngroup]*xavg[ngroup];
      corr[ngroup]    = sxy[ngroup] / Math.sqrt(sxx[ngroup] * syy[ngroup]);
      rsquare[ngroup] = corr[ngroup] * corr[ngroup];
     
}

// 산점도 제목 쓰기 함수
function drawScatterTitle(mainTitle, gvarNumber, xvarNumber, yvarNumber, gvarName, xvarName, yvarName) { 
        var str, gstr;
        // 주제목
        str = mainTitle;
        if (mainTitle == null) {
          if (gvarName == null) gvarName ="V"+gvarNumber.toString();
          if (xvarName == null) xvarName ="V"+xvarNumber.toString();
          if (yvarName == null) yvarName ="V"+yvarNumber.toString();
          if (gvarNumber < 1) str = "V"+xvarNumber.toString()+": "+xvarName + "V"+yvarNumber.toString()+": "+yvarName+"의 산점도";
          else str = "그룹 V"+gvarNumber.toString()+"("+gvarName+ "): " + "V"+xvarNumber.toString()+": "+xvarName + "V"+yvarNumber.toString()+": "+yvarName+"의 산점도";
        }
        scatter.append("text")
             .attr("class","mainTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top/2)
             .text(str)
        // Y축 제목
        scatter.append("text")
             .attr("class","yTitle")
             .attr("x",-margin.top-50)
             .attr("y",margin.top)
             .text(yvarName)
             .attr("transform", "rotate(-90 30 100)")
        // X축 제목
        scatter.append("text")
             .attr("class","xTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(xvarName)

}

// 산점도 그리기 ----------------------------------------------------------------------------------------------
function drawScatter(ngroup, gvalueLabel,tobs,xdata,ydata,gdata,gxmin,gxmax,gymin,gymax,gyrange, graphWidth, graphHeight) {

      // 축 그리기
      drawScatterAxis(gxmin, gxmax, gymin, gymax, graphWidth, graphHeight)       

      // 점 그리기
      scatter.selectAll("circle")
             .data(xdata)
             .enter()
             .append("circle")
             .attr("class","circle")
             .style("fill",function(d,i){return myColor[gdata[i]-1];})
             .attr("cx",margin.left+10)
             .attr("cy",margin.top+10)
             .attr("r", 4)
             .transition()                           // 애니매이션 효과 지정
             .delay(function(d,i) {return i*200;})   // 0.5초마다 그리도록 대기시간 설정
             .duration(1000)          
             .attr("cx", function(d,i){ return margin.left+graphWidth*(d-gxmin)/gxrange;})
             .attr("cy", function(d,i){ return margin.top+graphHeight-graphHeight*(ydata[i]-gymin)/gyrange;})

      // 범례 그리기
      if (ngroup > 1) drawLegend(ngroup, gvalueLabel,graphWidth, buffer);
}

// 산점도 축 눈금 표시
function drawScatterAxis(gxmin, gxmax, gymin, gymax, graphWidth, graphHeight) {
        var tx, ty;
        // x축
        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        ty = margin.top + graphHeight;
        scatter.append("g")
           .attr("transform","translate("+margin.left+","+ty+")")
           .call(d3.axisBottom(xScale))                    // 눈금을 표시할 함수 호출
        scatter.append("g")
           .attr("transform","translate("+margin.left+","+margin.top+")")
           .call(d3.axisTop(xScale))                    // 눈금을 표시할 함수 호출
        // y축
        var yScale = d3.scaleLinear().domain([gymin, gymax]).range([graphHeight, 0]);
        tx = margin.left + graphWidth;
        ty = margin.top ;
        scatter.append("g")
           .attr("transform","translate("+margin.left+","+ty+")")
           .call(d3.axisLeft(yScale))                    // 눈금을 표시할 함수 호출
        scatter.append("g")
           .attr("transform","translate("+tx+","+ty+")")
           .call(d3.axisRight(yScale))                    // 눈금을 표시할 함수 호출
}

// 산점도 범례 그리기
function drawLegend(ngroup, gvalueLabel,graphWidth, buffer) {
      var tx, ty;
      for (var k=0; k<ngroup; k++) {
        tx = margin.left + graphWidth + buffer;
        ty = margin.top+10 + k*20;
        scatter.append("circle")
               .attr("cx",tx)
               .attr("cy",ty)
               .style("fill",myColor[k])
               .attr("r", 4);
        scatter.append("text")
               .attr("class","label")
               .attr("x",tx+8)
               .attr("y",ty+5)
               .text(gvalueLabel[k])
      } // end of k
}

// Show Regression line
function showRegression(ngroup, alpha, beta, corr, rsquare, gxmin, gymin, gyrange, graphWidth, graphHeight) {
        var x1, y1, x2, y2;
        for (var k=0; k<ngroup; k++) {
          x1  = margin.left;
          y1  = margin.top  + graphHeight - graphHeight*((alpha[k]+beta[k]*gxmin)-gymin)/gyrange;
          x2  = margin.left + graphWidth;
          y2  = margin.top  + graphHeight - graphHeight*((alpha[k]+beta[k]*gxmax)-gymin)/gyrange;
          
          scatter.append("line")
                 .attr("class","reglabel")
                 .attr("x1",x1)
                 .attr("y1",y1)
                 .attr("x2",x2)
                 .attr("y2",y2)
                 .style("stroke",myColor[k]) 
          
          scatter.append("text").attr("class","reglabel")
                 .style("stroke",myColor[k]) 
                 .attr("x", margin.left + 20)
                 .attr("y", margin.top +  20 + k*35)
                 .text("회귀선 :  y = ("+f2(alpha[k])+") + ("+f2(beta[k])+ ") x")
          
          scatter.append("text").attr("class","reglabel")
                 .style("stroke",myColor[k]) 
                 .attr("x", margin.left + 80)
                 .attr("y", margin.top +  40 + k*35)
                 .text("r = "+f2(corr[k])+" "+" r^2 = "+f2(rsquare[k]))
        } // endof k  
}

// Remove Regression Line
function removeRegression() {
	 scatter.selectAll("line.reglabel").remove();
         scatter.selectAll("text.reglabel").remove();
}

// 산점도 통계량표 --------------------------------------------------------------------------------------------------
function scatterTable(ngroup,tobs,xvarName,yvarName,gvarName,gvalueLabel,nobs, xavg,xstd, yavg,ystd,
       alpha, beta, corr, rsquare) {

        
        var table = document.getElementById("ScatterTable");
        var i, j, k, tempx, tempy;
        var row;
        var ncol = 10;

          var cell = new Array(9);
//          var header = table.createTHead();

          table.style.fontSize = "13px";
          table.style.cellPadding = "10";

          row = table.insertRow(0);
          row.innerHTML = ",<h3>Basic Statistics</h3>";
          row.style.textAlign = "center";
 
          row  = table.insertRow(1);
//          row.style.height ="40px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="70px";
          }
          cell[0].style.width ="120px";
          cell[0].innerHTML = "분석변량명:";
          cell[0].style.backgroundColor = "#eee";
          cell[1].innerHTML = xvarName;
          cell[2].innerHTML = yvarName;
          cell[3].innerHTML = "그룹명:";
          cell[3].style.backgroundColor = "#eee";
          cell[4].innerHTML = gvarName;
          for (j=0; j<ncol; j++) cell[j].style.textAlign = "center";

          row  = table.insertRow(2);
//          row.style.height ="40px";
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);
          cell[0].innerHTML = "그룹 | 통계량";
          cell[1].innerHTML = "자료수";  
          cell[2].innerHTML = "X평균";  
          cell[3].innerHTML = "X표준편차";    
          cell[4].innerHTML = "Y평균";  
          cell[5].innerHTML = "Y표준편차";
          cell[6].innerHTML = "alpha";
          cell[7].innerHTML = "beta";
          cell[8].innerHTML = "상관계수";
          cell[9].innerHTML = "결정계수";    
          for (j=0; j<ncol; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
          }

          for (g=0; g<ngroup; g++) {
            row = table.insertRow(g+3);
            for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
            cell[0].innerHTML = "그룹 "+(g+1).toString()+" ("+gvalueLabel[g]+")";
            cell[0].style.backgroundColor = "#eee";
            cell[1].innerHTML = nobs[g].toString();  
            cell[2].innerHTML = f2(xavg[g]).toString();  
            cell[3].innerHTML = f2(xstd[g]).toString();  
            cell[4].innerHTML = f2(yavg[g]).toString();   
            cell[5].innerHTML = f2(ystd[g]).toString();   
            cell[6].innerHTML = f2(alpha[g]).toString();   
            cell[7].innerHTML = f2(beta[g]).toString();   
            cell[8].innerHTML = f2(corr[g]).toString();   
            cell[9].innerHTML = f2(rsquare[g]).toString();   
            cell[0].style.textAlign = "center";
            for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";         
          }

          row = table.insertRow(ngroup+3);
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
          cell[0].innerHTML = "전체";
          cell[1].innerHTML = nobs[ngroup].toString();  
          cell[2].innerHTML = f2(xavg[ngroup]).toString();  
          cell[3].innerHTML = f2(xstd[ngroup]).toString();  
          cell[4].innerHTML = f2(yavg[ngroup]).toString();   
          cell[5].innerHTML = f2(ystd[ngroup]).toString();   
          cell[6].innerHTML = f2(alpha[ngroup]).toString();   
          cell[7].innerHTML = f2(beta[ngroup]).toString();   
          cell[8].innerHTML = f2(corr[ngroup]).toString();   
          cell[9].innerHTML = f2(rsquare[ngroup]).toString();   
          cell[0].style.textAlign = "center";
          cell[0].style.backgroundColor = "#eee";
          for (j=1; j<ncol; j++) cell[j].style.textAlign = "right";   
}    

// Two variable Basic Statistics
function basicStat(nobs, xdata, ydata, stat) {
        var tempx, tempy;
        var xsum = 0;
        var ysum = 0;
        for (i=0; i<nobs; i++) {
          xsum += xdata[i];
          ysum += ydata[i];
        }
        var xavg = xsum / nobs;
        var yavg = ysum / nobs;

        var sxx = 0;
        var sxy = 0;
        var syy = 0;
        for (i=0; i<nobs; i++) {
          tempx = xdata[i] - xavg;
          tempy = ydata[i] - yavg;
          sxx += tempx*tempx;
          syy += tempy*tempy;
          sxy += tempx*tempy; 
        }
        var xstd = Math.sqrt(sxx / nobs);
        var ystd = Math.sqrt(syy / nobs);
        var beta    = sxy / sxx;
        var alpha   = yavg - beta*xavg;
        var corr    = sxy / Math.sqrt(sxx * syy);
        var rsquare = corr * corr;

        var xmin = xdata[0];
        var xmax = xdata[0];
        var ymin = ydata[0];
        var ymax = ydata[0];
        for (i=1; i<nobs; i++) {
          if (xmin > xdata[i]) xmin = xdata[i];
          if (xmax < xdata[i]) xmax = xdata[i];
          if (ymin > ydata[i]) ymin = ydata[i];
          if (ymax < ydata[i]) ymax = ydata[i];
        } 

        // 그래프 화면 정의 
        var gxmin   = -4;
        var gxmax   =  4;
        var gymin   = -4;
        var gymax   =  4;
        var gxrange = gxmax - gxmin;
        var gyrange = gymax - gymin;

        // save statistic
        stat[0]  = nobs;
        stat[1]  = xavg;    stat[11] = yavg;
        stat[2]  = xstd;    stat[12] = ystd;
        stat[3]  = xmin;    stat[13] = ymin;
        stat[4]  = xmax;    stat[14] = ymax;
        stat[5]  = gxmin;   stat[15] = gymin
        stat[6]  = gxmax;   stat[16] = gymax;
        stat[7]  = alpha; 
        stat[8]  = beta;
        stat[9]  = corr;
        stat[10] = rsquare;    
}
/*
// 산점도 시뮬레이션 그리기 함수 -------------------------------------------------------------
function showScatterPlot(nobs, xdata, ydata, gxmin, gxmax, gymin, gymax, graphWidth, graphHeight) {
        var gxrange = gxmax - gxmin;
        var gyrange = gymax - gymin;
        var title = "상관계수를 변화하고 '실행' 버튼을 눌러보세요"
        svg.append("text").attr("class","title").attr("x",margin.left).attr("y",margin.top/2).text(title);

        // x축 그리기
        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        var ty = margin.top + graphHeight;
        svg.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisBottom(xScale)) 
        svg.append("g")
             .attr("transform","translate("+margin.left+","+margin.top+")")
	     .attr("class", "main axis date")
             .call(d3.axisTop(xScale)) 

        // y축 그리기
        var yScale = d3.scaleLinear().domain([gymin,gymax]).range([graphHeight, 0])
        var ty = margin.top;
        svg.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisLeft(yScale)) 
        var tx = margin.left + graphWidth;
        svg.append("g")
             .attr("transform","translate("+tx+","+ty+")")
	     .attr("class", "main axis date")
             .call(d3.axisRight(yScale)) 

        // 산점도 점 그리기
        svg.selectAll("circle")
             .data(xdata)
             .enter()
             .append("circle")
             .attr("cx", function(d,i){ return margin.left + graphWidth*Math.random() })
             .attr("cy", margin.top + 20)
             .transition()                           // 애니매이션 효과 지정
             .delay(function(d,i) {return i*50;})   // 0.5초마다 그리도록 대기시간 설정
             .duration(500) 
             .attr("cx", function(d,i){ return margin.left+graphWidth*(d-gxmin)/gxrange;})
             .attr("cy", function(d,i){ return margin.top+graphHeight-graphHeight*(ydata[i]-gymin)/gyrange;})         
             .attr("r", 4)
             .attr("class","circle")
}

*/
