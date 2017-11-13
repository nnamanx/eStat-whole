var f     = d3.format(".1f");

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
 
function dataClassify() {
      freqMin = 0;
      if (numVar < 2) { // 변수 하나는 원시자료
        dobs        = tdvar[0].length;
        dvarNumber  = tdvarNumber[0];
        dvarName    = tdvarName[0];
        dvalueLabel = tdvalueLabel[0];
        dvar        = tdvar[0]; 
 
        for (i=0; i<dobs; i++) {dataA[i] = tdvar[0][i];}
        ndvalue = sortAscend(dobs, dataA, dataValue, dvalueFreq);

        ngroup      = 1;
        gobs            = dobs;
        gvarNumber  = "";
        gvarName    = tdvarName[1];
        gvalueLabel = [];
//        var gdataValue  = new Array(gobs);
//        var gvalueFreq  = new Array(gobs);
        for (j=0; j<dobs; j++) gvar[j] = 1;
        for (i=0; i<gobs; i++) {dataA[i] = gvar[i];}  
        ngvalue = sortAscend(dobs, dataA, gdataValue, gvalueFreq);

        rawData = true;
      } 
      else { // 두 개 이상의 변수는 원시자료 또는 요약자료

        gobs        = tdvar[0].length;
        gvarNumber  = tdvarNumber[0];
        gvarName    = tdvarName[0];
        gvalueLabel = tdvalueLabel[0];
        gvar        = tdvar[0];
        
        for (i=0; i<gobs; i++) {dataA[i] = tdvar[0][i];}  
        ngvalue = sortAscend(gobs, dataA, gdataValue, gvalueFreq);

        dobs        = tdvar[1].length;
        dvarNumber  = tdvarNumber[1];
        dvarName    = tdvarName[1];
        dvalueLabel = tdvalueLabel[1];
        dvar        = tdvar[1]; 

        for (i=0; i<dobs; i++) {dataA[i] = tdvar[1][i];}
        ndvalue = sortAscend(dobs, dataA, dataValue, dvalueFreq);

        // check 원시자료
        rawData = true;
        if (gobs == ngvalue) rawData = false; 
        if (rawData) ngroup = ngvalue;
        else ngroup = numVar -1;

        // 요약자료는 Numeric 여부 체크
        if (rawData == false) {
          checkNumeric = false;
          for (k=1; k<numVar; k++) {
            for (i=0; i<dobs; i++) {
              if (isNaN(tdvar[k][i])) {
                checkNumeric = true; 
                var  str = "데이터 V"+(k+1).toString()+"에 문자가 있어 처리할 수 없습니다!";
                alert(str);
                break;
              } // endof if
            } // endof i
          } // endof k
        } // endof if
      } // endof else

      if (rawData) { // 원시자료 ---------------------------------
 
        for (k=0; k<ngroup; k++) {
          nobs[k]    = gvalueFreq[k];
          dataSet[k] = new Array(ndvalue);
          for (j=0; j<ndvalue; j++) dataSet[k][j] = 0;
        }

        // gvar 변수값별 dvar 각 값의 도수 count   -----교차표 ----------------      
        for (i=0; i<dobs; i++) {
          for (j=0; j<ngvalue; j++) {
            if (gvar[i] == gdataValue[j]) {k=j; break;}  // gvar[i]의 gdataValue에서 위치파악
          }
          for (j=0; j<ndvalue; j++) {
            if (dvar[i] == dataValue[j]) {m=j; break;}   // dvar[i]의 dataValue에서 위치파악
          }
          dataSet[k][m]++;
        }

      } else { // 요약자료 ---------------------------------------
        if (numVar == 2) gvarName = tdvarName[1];
        else {
          gvarName = "";
//          for (j=1; j<numVar; j++) gvarName += "V"+tdvarNumber[j].toString()+" ";
          for (j=1; j<numVar; j++) gvarName += "V"+tdvarNumber[j]+" ";
        }
 
        for (k=0; k<ngroup; k++) {
          dataSet[k]     = tdvar[k+1];
          gvalueLabel[k] = tdvarName[k+1]
        }   
        ndvalue = dobs;
        dvarName = tdvarName[0];
        for (i=0; i<dobs; i++) {
          dataValue[i]   = "";
          dvalueLabel[i] = tdvar[0][i];
        }
      }

      // Main Program Logic ================================================

      if (ngroup == 1) { // 분리형 막대와 선그래프에서 작동

        currentDataSet = dataSet[0];
        currentLabel   = dvalueLabel;
         

        for (i=0; i<ndvalue; i++) {
          dataR[i]=dataSet[0][i]
          dataA[i]=dataSet[0][i];
          indexA[i] = i;
          indexR[i] = i;
          vlabelR[i]= dvalueLabel[i];
        }
        

        for (i=0; i<ndvalue-1; i++) {
          for (j=i; j<ndvalue; j++) {
            if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  tempi     = indexA[i];
              dataA[i] = dataA[j];  indexA[i] = indexA[j];
              dataA[j] = temp;      indexA[j] = tempi;
            }
          }
        } 

        for (i=0; i<ndvalue; i++) {
          dataD[i]  = dataA[ndvalue-i-1];
          indexD[i] = indexA[ndvalue-i-1];
        }

        for (i=0; i<ndvalue; i++) {
          vlabelA[i] = dvalueLabel[indexA[i]];
          vlabelD[i] = dvalueLabel[indexD[i]];
        }

        // 막대 너비/높이 계산
        freqMin  = dataA[0];       
        freqMax  = dataA[ndvalue-1];
        freqMax += Math.floor(freqMax/8+1);      
      }
      else {
        freqMin = 0;
        freqMax = 0;
        for (k=0; k<ngroup; k++) {
          for (j=0; j<=ndvalue+1; j++) {
            if (dataSet[k][j] < freqMin) freqMin = dataSet[k][j];
            if (dataSet[k][j] > freqMax) freqMax = dataSet[k][j]; 
          }
        } 
        if (freqMin < 0) freqMin += Math.floor(freqMin/8-1);
        else freqMin -= Math.floor(freqMin/8-1);
        freqMax += Math.floor(freqMax/8+1); 
      }
}


//  =================================================================================
//  eStatE.js 이산형그래프 함수 -----------------------------------------------------
//  =================================================================================

// Menu Color Change
function menuColorChange() {
      document.getElementById("data01").style.backgroundColor = "#4CAF50";
      document.getElementById("data02").style.backgroundColor = "#4CAF50";
      document.getElementById("data03").style.backgroundColor = "#4CAF50";
      document.getElementById("data04").style.backgroundColor = "#4CAF50";
      document.getElementById("data05").style.backgroundColor = "#4CAF50";
      document.getElementById("data06").style.backgroundColor = "#4CAF50";
      document.getElementById("data07").style.backgroundColor = "#4CAF50";
      document.getElementById("data08").style.backgroundColor = "#4CAF50";
      document.getElementById("data09").style.backgroundColor = "#4CAF50";
}

// Button Color Change
function buttonColorChange() {

      document.getElementById("freq").checked = false;
      document.getElementById("mean").checked = false;

      SeparateBar = false;
      StackBar    = false;
      RatioBar    = false;
      SideBar     = false;
      BothBar     = false;
      LineGraph   = false;
      PieChart    = false;
      DonutGraph  = false;
      BandGraph   = false;
      FreqTable   = false;

      document.getElementById("separate").style.backgroundColor = buttonColorB;
      document.getElementById("stack").style.backgroundColor    = buttonColorB;
      document.getElementById("ratio").style.backgroundColor    = buttonColorB;
      document.getElementById("side").style.backgroundColor     = buttonColorB;
      document.getElementById("both").style.backgroundColor     = buttonColorB;
      document.getElementById("line").style.backgroundColor     = buttonColorB;
      document.getElementById("pie").style.backgroundColor      = buttonColorB;
      document.getElementById("donut").style.backgroundColor    = buttonColorB;
      document.getElementById("band").style.backgroundColor     = buttonColorB;
      document.getElementById("table").style.backgroundColor    = buttonColorB;

      checkFreq     = false;
      checkBandFreq = false;
      document.myForm2.type2.value = 1;
      document.myForm3.type3.value = 1;

}


// Sorting in ascending and count each value frequency
function sortAscend(dobs, dataA, dataValue, dvalueFreq) {
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
        for (i=1; i<dobs; i++) {
          if (dataA[i] == dataA[i-1]) {
            dvalueFreq[nvalue]++;
          } 
          else {
            nvalue++;
            dataValue[nvalue] = dataA[i];
            dvalueFreq[nvalue]++;
          }
        }
        nvalue++;
        return nvalue;
      }

// 제목 쓰기 함수
function drawTitle(mainTitle, yTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName) { 
        var str, gstr;
        if (ngroup == 1) {
          if (gvarName == null) gvarName = "V"+gvarNumber.toString();
        }
        else {
          if (gvarName == null) gvarName = "V"+gvarNumber.toString();
        }
        if (dvarName == null) dvarName = "V"+dvarNumber.toString();

        // 주제목
        gstr = mainTitle;
        if(mainTitle == null) {
          if (LineGraph)      gstr += " Line Graph";
          else if(PieChart)   gstr += " Pie Chart";
          else if(DonutGraph) gstr += " Donut Graph";
          else if(BandGraph)  gstr += " Band Graph";
          else                gstr += " Bar Graph";
        }
        
        if (rawData) {
          if (ngroup == 1) str = "V"+dvarNumber.toString()+": "+dvarName+"의 "+gstr;
          else str = "그룹 V"+gvarNumber.toString()+"("+gvarName+ ") : " + "V"+dvarNumber.toString()+"("+dvarName+")의 "+ gstr;
        } 
        else str = gstr;
        
        if (LineGraph || PieChart || DonutGraph || BandGraph) {
          str = gstr;
          chart.append("text")
             .attr("class","mainTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top/2 + 10)
             .text(str)
       
        } else {
          bar.append("text")
             .attr("class","mainTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top/2 + 10)
             .text(str)
        }

        // 축제목
        if (PieChart || DonutGraph || BandGraph) {
          // X축 제목
          chart.append("text")
             .attr("class","xTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(dvarName)
        }
        else if (LineGraph) {
          // X축 제목
          chart.append("text")
             .attr("class","xTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(dvarName)

          // Y축 제목
          var tx = margin.left/2 - 30;
          var ty = margin.top + 15;
          if (yTitle != "") str = yTitle;
          else if(ngroup==1) str = "Frequency";
          else str = gvarName;
          chart.append("text")
             .attr("class","yTitle")
             .attr("x",margin.left/2-15)
             .attr("y",margin.top+ 15)
             .text(str)
             .attr("transform", "rotate(-90 30 100)")
        } 
        else if(VerticalBar) {  // 세로형 막대그래프
          // X축 제목
          bar.append("text")
             .attr("class","xTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(dvarName)
          // Y축 제목
          var tx = margin.left/2 - 30;
          var ty = margin.top + 15;
          if (yTitle != "") str = yTitle;
          else if (RatioBar) str = "Ratio";
          else if(ngroup==1) str = "Frequency";
          else str = gvarName;
          bar.append("text")
               .attr("class","yTitle")
               .attr("x",tx)
               .attr("y",ty)
               .text(str)
               .attr("transform", "rotate(-90 30 100)")

        }
        else {   // 가로형 막대그래프
          // X축 제목
          if (yTitle != "") str = yTitle;
          else if (RatioBar) str = "Ratio";
//          else str = "도수";
          else str = gvarName;
          bar.append("text")
             .attr("class","xTitle")
             .attr("x",margin.left + graphWidth/2)
             .attr("y",margin.top + graphHeight + margin.bottom/2 + 10)
             .text(str)
        } // endof else

}

// 변수값명 쓰기 함수
function drawLabel(ngroup, ndvalue, label, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight) { 
        var i, j, k, x1, y1;
/*
        var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
        var barWidth         = betweenbarWidth * 0.6;  // 막대의 너비
        var gapWidth         = betweenbarWidth * 0.2;
        var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 높이
        var barHeight        = betweenbarHeight * 0.6; // 막대의 높이
        var gapHeight        = betweenbarHeight * 0.2;
*/
        var tgapHeight       = gapHeight + 5;
        var angle;


        if(VerticalBar) {  // 세로형 막대그래프
          y1 =  svgHeight - margin.bottom + 10; 
          if (BothBar) y1 = margin.top + graphHeight/2 + 17;
           
          if (ndvalue < 10) angle = 0;
          else if(ndvalue < 30) angle = 30;
          else angle = 90;
/*  
          bar.selectAll("text.barname")
               .data(label)
               .enter()
               .append("text")
               .attr("class","barname")
               .attr("x",function(d,i) {return margin.left + gapWidth + barWidth/2 + i*betweenbarWidth;})
               .attr("y",y1)
               .text(function(d,i) {return d;})

*/
            for (j=0; j<ndvalue; j++) {
               x1 = margin.left + gapWidth + barWidth/2 - 4+ j*betweenbarWidth;
               bar.append("text")
                  .attr("class","barname")
                  .attr("x",x1)
                  .attr("y",y1)
                  .style("text-anchor","start")
                  .attr("transform","rotate("+angle+","+x1+","+y1+")  ")
                  .text(label[j])
            }

        }
        else {   // 가로형 막대그래프

          if (BothBar) {
              for (j=0; j<ndvalue; j++) {
                bar.append("text")
                   .attr("class", "barname")
                   .attr("x",margin.left + graphWidth/2)
                   .attr("y",margin.top + tgapHeight + barHeight/2 + j*betweenbarHeight)
                   .text(label[ndvalue-j-1])
              }
          }
          else if (StackBar || RatioBar || SideBar ) {
              for (j=0; j<ndvalue; j++) {
                bar.append("text")
                   .attr("class", "barnameh")
                   .attr("x",margin.left - 5)
                   .attr("y",margin.top + tgapHeight + barHeight/2 +j*betweenbarHeight)
                   .text(label[j])
              }
          }
          else {
            for (k=0; k<ngroup; k++) {
              for (j=0; j<ndvalue; j++) {
                bar.append("text")
                   .attr("class", "barnameh")
                   .attr("x",margin.left - 5)
                   .attr("y",margin.top + k*oneHeight +  tgapHeight + barHeight/2 + j*betweenbarHeight)
                   .text(label[j])
              }
            }
          }
        }
}

// 막대그래프 축 그리기
function drawAxis(freqMax, height, ngroup) {
        var i, j, k, tx, ty, temp; 
        var xScale, yScale, yScale2;

        if(VerticalBar) {  // 세로형 막대그래프 Y축        

          yScale  = d3.scaleLinear().domain([0,freqMax]).range([height,10]);
          yScale2 = d3.scaleLinear().domain([freqMax,0]).range([height,10]);
          for (k=0; k<ngroup; k++) {
            tx = margin.left;
            ty = margin.top + k*height;
            if (k==1 && BothBar) {
              yScale = yScale2;
              ty += 25;
            } 
            bar.append("g")
               .attr("transform","translate("+tx+","+ty+")")
               .call(d3.axisLeft(yScale))             // 눈금을 표시할 함수 호출

            if (!BothBar) { // y축 좌우측
              bar.append("line").attr("class","line")
                 .attr("x1",margin.left)
                 .attr("x2",margin.left)
                 .attr("y1",margin.top)
                 .attr("y2",margin.top + graphHeight)
              bar.append("line").attr("class","line")
                 .attr("x1",margin.left + graphWidth)
                 .attr("x2",margin.left + graphWidth)
                 .attr("y1",margin.top)
                 .attr("y2",margin.top + graphHeight) 
//                 .style("stroke","black") 
//              tx = margin.left + graphWidth;
//              bar.append("g")
//                 .attr("transform","translate("+tx+","+ty+")")
//                 .call(d3.axisRight(yScale))             // 눈금을 표시할 함수 호출

            }
          } // endof k
        }
        else {   // 가로형 막대그래프 X축

          ty = margin.top + graphHeight;
          if (BothBar) {
            temp = graphWidth/2 - bothBarGap;
            xScale = d3.scaleLinear().domain([freqMax,0]).range([0,temp]);
            bar.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
             .call(d3.axisBottom(xScale)                 // 눈금을 표시할 함수 호출
            )
            xScale = d3.scaleLinear().domain([0,freqMax]).range([0,temp]);
            tx = margin.left + graphWidth/2 + bothBarGap;
            bar.append("g")
             .attr("transform","translate("+tx+","+ty+")")
             .call(d3.axisBottom(xScale)                 // 눈금을 표시할 함수 호출
            )

          }
          else {
            xScale = d3.scaleLinear().domain([0,freqMax]).range([0,graphWidth])
            bar.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
             .call(d3.axisBottom(xScale)                 // 눈금을 표시할 함수 호출
            )
          }
        }
}

// 분리형 막대그래프 함수 --------------------------------------------------
function drawSeparateBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, 
            freqMax, currentLabel, currentDataSet, dataSet, checkFreq) {
        var i, j, k, str, tx, ty;
        var tdata = new Array(ndvalue);
        var oneHeight        = graphHeight / ngroup;
        var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
        var barWidth         = betweenbarWidth * 0.6;  // 막대의 너비
        var gapWidth         = betweenbarWidth * 0.2;
        var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 높이
        var barHeight        = betweenbarHeight * 0.6; // 막대의 높이
        var gapHeight        = betweenbarHeight * 0.2;

        var freqRatioV       = oneHeight / freqMax;        // 그래프 영역과 데이터 영역의 비율
        var freqRatioH       = graphWidth / freqMax;      // 그래프 영역과 데이터 영역의 비율

        drawTitle(mainTitle, yTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
        drawLabel(ngroup, ndvalue, currentLabel, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight);
        drawAxis(freqMax, oneHeight, ngroup); 


        if(VerticalBar) { // 세로형 막대그래프

          bar.selectAll("text.barname")  // 레이블
             .data(dvalueLabel)
             .enter()
             .append("text")
             .attr("class","barname")
             .attr("x",function(d,i) {return margin.left + gapWidth + i*betweenbarWidth;})
             .attr("y",svgHeight - margin.bottom + 20)
             .text(function(d,i) {return d;})

          // x축 위 선
          y1 = margin.top;
          bar.append("line")
               .attr("class","line")
               .attr("x1",margin.left)
               .attr("x2",margin.left + graphWidth)
               .attr("y1",y1)
               .attr("y2",y1) 
               .style("stroke","black") 

          for (k=0; k<ngroup; k++) {
            // x축 선
            y1 = margin.top + (k+1)*oneHeight;
            bar.append("line")
               .attr("class","line")
               .attr("x1",margin.left)
               .attr("x2",margin.left + graphWidth)
               .attr("y1",y1)
               .attr("y2",y1) 
               .style("stroke","black") 
            if (ngroup == 1) {tdata = currentDataSet;}
            else {  // 그룹명 범례
              for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
              if (gvalueLabel == null) str = "Group "+ (k+1).toString();
              else str = gvalueLabel[k];  

              bar.append("rect")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + buffer - 5)
                 .attr("y",margin.top + oneHeight/2 + oneHeight*k)
                 .attr("width",8)
                 .attr("height",8)
          
              bar.append("text")
                 .attr("class","legend")
                 .style("stroke",myColor[k])
                 .attr("x",margin.left + graphWidth + buffer + 10)
                 .attr("y",margin.top + oneHeight/2 + oneHeight*k + 10)
                 .text(str);
            }
            for (j=0; j<ndvalue; j++) {
              if (tdata[j] >= 0) {
                 var b = bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",margin.top + oneHeight*(k+1))
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("y",margin.top + oneHeight*(k+1) - tdata[j]*freqRatioV)
                   .attr("height",tdata[j]*freqRatioV);
//
//                   b.enter().append("svg:title") 
//                      .text(tdata[j])
              }
              else {
                bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",margin.top + oneHeight*(k+1))
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("height",-tdata[j]*freqRatioV)
              }
            }
          } // end of k
        }
        else { // 가로형 막대그래프
          for (k=0; k<ngroup; k++) {
            y1 = margin.top + k*oneHeight;
            if (ngroup == 1) {tdata = currentDataSet;}
            else {
              for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
              if (gvalueLabel == null) str = "Group "+ (k+1).toString();
              else str = gvalueLabel[k];             
  
              bar.append("rect")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + buffer - 5)
                 .attr("y",margin.top + oneHeight/2 + oneHeight*k)
                 .attr("width",8)
                 .attr("height",8)
          
              bar.append("text")
                 .attr("class","legend")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + buffer + 10)
                 .attr("y",margin.top + oneHeight/2 + oneHeight*k + 10)
                 .text(str);
            }
            for (j=0; j<ndvalue; j++) {
              bar.append("rect")
                 .attr("class","bar")
                 .style("fill",myColor[k])
                 .attr("x",margin.left)
                 .attr("y",y1 + gapHeight + j*betweenbarHeight)
                 .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                 .transition()                           // 애니매이션 효과 지정
                 .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                 .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                 .attr("width",graphWidth*tdata[j]/freqMax)
                 .attr("height",barHeight)
            } // end of j
          } // endof k
        }

        if(checkFreq) {
          showFreq(ngroup, ndvalue, currentDataSet, dataSet, freqMax, freqRatioV, gapWidth, barWidth, betweenbarWidth, 
                   gapHeight, barHeight, betweenbarHeight, oneHeight);
          return;
        }
       
}


// 분리형 막대그래프 도수 쓰기 함수
function showFreq(ngroup, ndvalue, currentDataSet, dataSet, freqMax, freqRatioV, gapWidth, barWidth, betweenbarWidth, 
          gapHeight, barHeight, betweenbarHeight, oneHeight) {
        var i, j, k;
        var tdata = new Array(ngroup);

        if (StackBar || RatioBar || SideBar || BothBar) return;
        if (PieChart || DonutGraph || BandGraph || LineGraph) return;
 
        if(VerticalBar) { // 세로형 막대그래프
          if (ngroup == 1) {
            tdata = currentDataSet;
            bar.selectAll("text.freqlabel")
               .data(tdata)
               .enter()
               .append("text")
               .attr("class","freqfont")
               .attr("x",function(d,i) {return margin.left + gapWidth + barWidth/2 + i*betweenbarWidth;})
               .attr("y",function(d,i) {return svgHeight - margin.bottom - d*freqRatioV - 5;})
               .text(function(d,i) {return d;});
          }
          else {
            for (k=0; k<ngroup; k++) {
              for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
              for (j=0; j<ndvalue; j++) {
                bar.append("text")
                   .attr("class","freqfont")
                   .attr("x",margin.left + gapWidth + barWidth/2  + j*betweenbarWidth)
                   .attr("y",margin.top + oneHeight*(k+1) - tdata[j]*freqRatioV - 5)
                   .text(tdata[j]);
              }
            }
          } // endif (ngroup == 1)
          return;
        }
        else  { // 가로형 막대그래프
          if (ngroup == 1) {
            tdata = currentDataSet;
            bar.selectAll("text.freqlabel")
               .data(tdata)
               .enter()
               .append("text")
               .attr("class","freqfont")
               .attr("x",function(d,i) {return margin.left + graphWidth*d/freqMax + 10;})
               .attr("y",function(d,i) {return margin.top + gapHeight + barHeight/2 +i*betweenbarHeight;})
               .text(function(d,i) {return d;});
          }
          else {
            for (k=0; k<ngroup; k++) {
              for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
              for (j=0; j<ndvalue; j++) {
                bar.append("text")
                   .attr("class","freqfont")
                   .attr("x",margin.left + graphWidth*tdata[j]/freqMax + 10)
                   .attr("y",margin.top + k*oneHeight + gapHeight + barHeight/2 +j*betweenbarHeight)
                   .text(tdata[j]);
              }
            }
          } // endif (ngroup == 1)
          return;
        } // endif (VerticalBar)
} 

// 막대그래프 도수 제거 함수
function removeFreq() {
	 bar.selectAll("text.freqfont").remove();
}

// 쌓는형 막대그래프 함수  --------------------------------------------------
function drawStackBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet) {
         var i, j, k, str, x1, y1;
         var tfreqMax, tfreqRatioV, tfreqRatioH, temp;
         var tdata     = new Array(ndvalue);
         var px = new Array(ndvalue);
         var py = new Array(ndvalue);

         var oneHeight        = graphHeight;

         var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
         var barWidth         = betweenbarWidth * 0.6;    // 막대의 너비
         var gapWidth         = betweenbarWidth * 0.2;
         var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 너비
         var barHeight        = betweenbarHeight * 0.6;   // 막대의 높이
         var gapHeight        = betweenbarHeight * 0.2;

         var freqRatioV       = oneHeight / freqMax;        // 그래프 영역과 데이터 영역의 비율
         var freqRatioH       = graphWidth / freqMax;      // 그래프 영역과 데이터 영역의 비율

         drawTitle(mainTitle, yTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
         drawLabel(ngroup, ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight);

         tfreqMax = 0;
         for (j=0; j<ndvalue; j++) {
            temp = 0;
            for(k=0; k<ngroup; k++) temp += dataSet[k][j];
            if (temp > tfreqMax) tfreqMax = temp;
         }
         tfreqMax += Math.floor(tfreqMax/8+1);
  
         tfreqRatioV = graphHeight / tfreqMax;
         tfreqRatioH = graphWidth  / tfreqMax;
         drawAxis(tfreqMax, graphHeight, 1);


        if(VerticalBar) { // 세로형 막대그래프

          y1 = margin.top + graphHeight;
          bar.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",y1)
             .attr("y2",y1)
             .style("stroke","black") 
          bar.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",margin.top)
             .attr("y2",margin.top)
             .style("stroke","black") 

          for (k=0; k<ngroup; k++) {
            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
            // 범례
            if (gvalueLabel == null) str = "Group "+(k+1).toString();
            else str = gvalueLabel[k];
            bar.append("rect")
               .style("fill",myColor[k])
               .attr("x",margin.left + graphWidth + buffer - 5)
               .attr("y",margin.top + 20 + k*20)
               .attr("width",8)
               .attr("height",8)
            bar.append("text")
               .attr("class","legend")
               .style("fill",myColor[k])
               .attr("x",margin.left + graphWidth + buffer + 10)
               .attr("y",margin.top + 20 + k*20 + 10)
               .text(str);


            if (k==0) { // 첫 그룹
              for (j=0; j<ndvalue; j++) {
                py[j] = margin.top + graphHeight - tdata[j]*tfreqRatioV
                bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",margin.top + graphHeight)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("y",py[j])
                   .attr("height",tdata[j]*tfreqRatioV)
              }
            }
            else {  // 둘째 그룹 이하   
              for (j=0; j<ndvalue; j++) {
                bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",py[j])
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("y",py[j] - tdata[j]*tfreqRatioV)
                   .attr("height",tdata[j]*tfreqRatioV)
                py[j] = py[j] - tdata[j]*tfreqRatioV;
              } // endof j
            } // endof else
          } // endof k
        } // endof 세로형
        else { // 가로형 막대그래프

          // 범례
          for (k=0; k<ngroup; k++) {
            if (gvalueLabel == null) str = "Group "+(k+1).toString();
            else str = gvalueLabel[k];
            bar.append("rect")
               .style("fill",myColor[k])
               .attr("x",margin.left + graphWidth + buffer - 5)
               .attr("y",margin.top + 20 + k*20)
               .attr("width",8)
               .attr("height",8)
            bar.append("text")
               .attr("class","legend")
               .style("fill",myColor[k])
               .attr("x",margin.left + graphWidth + buffer + 10)
               .attr("y",margin.top + 20 + k*20 + 10)
               .text(str);

          }

          for (k=0; k<ngroup; k++) {
            y1 = margin.top;
            if (ngroup == 1) {tdata = currentDataSet;}
            else {
              for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
            }
            if (k==0) { // 첫 그룹
              for (j=0; j<ndvalue; j++) {
                px[j] = margin.left + graphWidth*tdata[j]/tfreqMax;
                bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",margin.left)
                   .attr("y",y1 + gapHeight + j*betweenbarHeight)
                   .attr("width",0)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("width",graphWidth*tdata[j]/tfreqMax)
                   .attr("height",barHeight)
              }
            }
            else {  // 둘째 그룹 이하   
              for (j=0; j<ndvalue; j++) {
                bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",px[j])
                   .attr("y",y1 + gapHeight + j*betweenbarHeight)
                   .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("width",graphWidth*tdata[j]/tfreqMax)
                   .attr("height",barHeight)
                px[j] = px[j] + graphWidth*tdata[j]/tfreqMax;
              } // endof j
            } // endof else
          } // endof k
        } // endof 가로형
}

// 비율형 막대 그래프 함수   --------------------------------------------------
function drawRatioBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet) {

         var i, j, k, str, x1, y1;
         var tdata = new Array(ndvalue);
         var tsum  = new Array(ndvalue);
         var px    = new Array(ndvalue);
         var py    = new Array(ndvalue);

         var oneHeight        = graphHeight;
         var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
         var barWidth         = betweenbarWidth * 0.6;    // 막대의 너비
         var gapWidth         = betweenbarWidth * 0.2;
         var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 너비
         var barHeight        = betweenbarHeight * 0.6;   // 막대의 높이
         var gapHeight        = betweenbarHeight * 0.2;

         var freqRatioV       = oneHeight / freqMax;        // 그래프 영역과 데이터 영역의 비율
         var freqRatioH       = graphWidth / freqMax;      // 그래프 영역과 데이터 영역의 비율

         drawTitle(mainTitle, yTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
         drawLabel(ngroup, ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight);
         drawAxis(1, graphHeight, 1); 


        // 각 변수값의 합
        for (j=0; j<ndvalue; j++) {
          tsum[j] = 0;
          for (k=0; k<ngroup; k++) tsum[j] += dataSet[k][j];
        }

        if(VerticalBar) { // 세로형 막대그래프

 
          y1 = margin.top + graphHeight;
          bar.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",y1)
             .attr("y2",y1)
             .style("stroke","black") 
          bar.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",margin.top)
             .attr("y2",margin.top)
             .style("stroke","black")

          for (k=0; k<ngroup; k++) {
            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j]/tsum[j];
            // 범례
            if (gvalueLabel == null) str = "Group "+(k+1).toString();
            else str = gvalueLabel[k];
            bar.append("rect")
               .style("fill",myColor[k])
               .attr("x",margin.left + graphWidth + buffer - 5)
               .attr("y",margin.top + 20 + k*20)
               .attr("width",8)
               .attr("height",8)
            bar.append("text")
               .attr("class","legend")
               .style("fill",myColor[k])
               .attr("x",margin.left + graphWidth + buffer + 10)
               .attr("y",margin.top + 20 + k*20 + 10)
               .text(str);

            if (k==0) { // 첫 그룹의 그래프
              for (j=0; j<ndvalue; j++) {
                py[j] = margin.top + graphHeight - tdata[j]*graphHeight;
                bar.append("rect")
                  .attr("class","bar")
                  .style("fill",myColor[k])
                  .attr("height",0)
                  .attr("width",barWidth)
                  .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                  .attr("y",margin.top + graphHeight)
                  .transition()                           // 애니매이션 효과 지정
                  .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                  .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                  .attr("y",py[j])
                  .attr("height",tdata[j]*graphHeight)
              }
            }
            else { // 둘째 이후의 그래프
              for (j=0; j<ndvalue; j++) {
                bar.append("rect")
                  .attr("class","bar")
                  .style("fill",myColor[k])
                  .attr("height",0)
                  .attr("width",barWidth)
                  .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                  .attr("y",py[j])
                  .transition()                           // 애니매이션 효과 지정
                  .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                  .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                  .attr("y",py[j] - tdata[j]*graphHeight)
                  .attr("height",tdata[j]*graphHeight)
                py[j] = py[j] - tdata[j]*graphHeight;
              }
            }
          }
        }
        else { // 가로형 막대그래프
          // 범례
          for (k=0; k<ngroup; k++) {
            if (gvalueLabel == null) str = "Group "+(k+1).toString();
            else str = gvalueLabel[k];
            bar.append("rect")
               .style("fill",myColor[k])
               .attr("x",margin.left + graphWidth + buffer - 5)
               .attr("y",margin.top + 20 + k*20)
               .attr("width",8)
               .attr("height",8)
            bar.append("text")
               .attr("class","legend")
               .style("fill",myColor[k])
               .attr("x",margin.left + graphWidth + buffer + 10)
               .attr("y",margin.top + 20 + k*20 + 10)
               .text(str);

          }
          for (k=0; k<ngroup; k++) {
            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j]/tsum[j];
            y1 = margin.top;
 
            if (k==0) { // 첫 그룹
              for (j=0; j<ndvalue; j++) {
                px[j] = margin.left + graphWidth*tdata[j];
                bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",margin.left)
                   .attr("y",y1 + gapHeight + j*betweenbarHeight)
                   .attr("width",0)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("width",graphWidth*tdata[j])
                   .attr("height",barHeight)
              }
            }
            else {  // 둘째 그룹 이하   
              for (j=0; j<ndvalue; j++) {
                bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",px[j])
                   .attr("y",y1 + gapHeight + j*betweenbarHeight)
                   .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("width",graphWidth*tdata[j])
                   .attr("height",barHeight)
                px[j] = px[j] + graphWidth*tdata[j];
              } // endof j
            } // endof else
          } // endof k

        } // endof 가로형
        
}

// 나란형 막대그래프 함수 --------------------------------------------------
function drawSideBarGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet) {
 
        var i, j, k, str, x1, y1;
        var tdata   = new Array(ndvalue);

        var oneHeight        = graphHeight;
        var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
        var barWidth         = betweenbarWidth * 0.6;    // 막대의 너비
        var gapWidth         = betweenbarWidth * 0.2;
        var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 너비
        var barHeight        = betweenbarHeight * 0.6;   // 막대의 높이
        var gapHeight        = betweenbarHeight * 0.2;

        var freqRatioV = graphHeight / freqMax;
        var freqRatioH = graphWidth  / freqMax;
        var theight    = barHeight / ngroup;
 
        drawTitle(mainTitle, yTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
        drawAxis(freqMax, graphHeight, 1); 
        drawLabel(ngroup, ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight);

        if(VerticalBar) { // 세로형 막대그래프
          bar.selectAll("text.barname")  // 레이블
             .data(dvalueLabel)
             .enter()
             .append("text")
             .attr("class","barname")
             .attr("x",function(d,i) {return margin.left + gapWidth + i*betweenbarWidth;})
             .attr("y",svgHeight - margin.bottom + 20)
             .text(function(d,i) {return d;})

          var twidth = barWidth/ngroup;
          y1 = margin.top + graphHeight;
          bar.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",y1)
             .attr("y2",y1) 
             .style("stroke","black") 
          bar.append("line")
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",margin.top)
             .attr("y2",margin.top) 
             .style("stroke","black") 
          // 범례
          for (k=0; k<ngroup; k++) {
              if (gvalueLabel == null) str = "Group "+(k+1).toString();
              else str = gvalueLabel[k];
              bar.append("rect")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + buffer - 5)
                 .attr("y",margin.top + 20 + k*20)
                 .attr("width",8)
                 .attr("height",8)
              bar.append("text")
                 .attr("class","legend")
                 .style("fill",myColor[k])
                 .attr("x",margin.left + graphWidth + buffer + 10)
                 .attr("y",margin.top + 20 + k*20 + 10)
                 .text(str);
          }

          for (k=0; k<ngroup; k++) {

            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
      
            for (j=0; j<ndvalue; j++) {
              bar.append("rect")
                 .attr("class","bar")
                 .style("fill",myColor[k])
                 .attr("height",0)
                 .attr("width",twidth)
                 .attr("x",margin.left + gapWidth + j*betweenbarWidth + k*twidth)
                 .attr("y",margin.top + graphHeight)
                 .transition()                           // 애니매이션 효과 지정
                 .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                 .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                 .attr("y",margin.top + graphHeight - tdata[j]*freqRatioV)
                 .attr("height",tdata[j]*freqRatioV)
            } // end of j
          } // end of k
        }
        else { // 가로형 막대그래프
          // 범례
          for (k=0; k<ngroup; k++) {
            if (gvalueLabel == null) str = "Group "+(k+1).toString();
            else str = gvalueLabel[k];
            bar.append("rect")
               .style("fill",myColor[k])
               .attr("x",margin.left + graphWidth + buffer - 5)
               .attr("y",margin.top + 20 + k*20)
               .attr("width",8)
               .attr("height",8)
            bar.append("text")
               .attr("class","legend")
               .style("fill",myColor[k])
               .attr("x",margin.left + graphWidth + buffer + 10)
               .attr("y",margin.top + 20 + k*20 + 10)
               .text(str);

          }


          for (j=0; j<ndvalue; j++) {
            for (k=0; k<ngroup; k++) tdata[k] = dataSet[k][j];
            y1 = margin.top + gapHeight + j*betweenbarHeight;
            for (k=0; k<ngroup; k++) {
                bar.append("rect")
                 .attr("class","bar")
                 .style("fill",myColor[k])
                 .attr("x",margin.left)
                 .attr("y",y1 + k*theight)
                 .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                 .transition()                           // 애니매이션 효과 지정
                 .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                 .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                 .attr("width",graphWidth*tdata[k]/freqMax)
                 .attr("height",theight)
            } // end of k
          } // end of j
        }
}

// 양쪽형 막대그래프 함수  --------------------------------------------------
function drawBothBar(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet) {
        var i, j, k, str, x1, y1, x2, y2, temp;
        var gapBoth = 25;
        var tdata = new Array(ndvalue);
        var py    = new Array(ndvalue);

        var oneHeight        = graphHeight;

        var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
        var barWidth         = betweenbarWidth * 0.6;    // 막대의 너비
        var gapWidth         = betweenbarWidth * 0.2;
        var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 너비
        var barHeight        = betweenbarHeight * 0.6;   // 막대의 높이
        var gapHeight        = betweenbarHeight * 0.2;

        var tfreqRatioV = (graphHeight/2) / freqMax;
        var tfreqRatioH = ((graphWidth-20)/2) / freqMax;

        drawTitle(mainTitle, yTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
        drawAxis(freqMax, graphHeight/2, 2); 
        drawLabel(ngroup, ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth, betweenbarHeight, barHeight, gapHeight, oneHeight);

        if(VerticalBar) { // 세로형 막대그래프

          x2 = margin.left + graphWidth
          y1 = margin.top + graphHeight/2;
          y2 = y1 + 25;
          bar.append("line")
             .attr("x1",margin.left)
             .attr("x2",x2)
             .attr("y1",margin.top)
             .attr("y2",margin.top)
             .style("stroke","black") 
          bar.append("line")
             .attr("x1",margin.left)
             .attr("x2",x2)
             .attr("y1",y1)
             .attr("y2",y1)
             .style("stroke","black") 
          bar.append("line")
             .attr("x1",margin.left)
             .attr("x2",x2)
             .attr("y1",y2)
             .attr("y2",y2)
             .style("stroke","black") 
          bar.append("line")
             .attr("x1",margin.left)
             .attr("x2",x2)
             .attr("y1",margin.top + graphHeight + gapBoth)
             .attr("y2",margin.top + graphHeight + gapBoth)
             .style("stroke","black")
          bar.append("line")
             .attr("x1",x2)
             .attr("x2",x2)
             .attr("y1",margin.top)
             .attr("y2",y1)
             .style("stroke","black")
          bar.append("line")
             .attr("x1",x2)
             .attr("x2",x2)
             .attr("y1",y1 + gapBoth)
             .attr("y2",y1 + gapBoth +graphHeight/2)
             .style("stroke","black")

          for (k=0; k<ngroup; k++) {
            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];
            if (gvalueLabel == null) str = "Group "+(k+1).toString();
            else str = gvalueLabel[k];

            bar.append("rect")
               .style("fill",myColor[k])
               .attr("x",margin.left + graphWidth + buffer - 5)
               .attr("y",margin.top + 20 + k*20)
               .attr("width",8)
               .attr("height",8)
            bar.append("text")
               .attr("class","legend")
               .style("stroke",myColor[k])
               .attr("x",margin.left + graphWidth + buffer + 10)
               .attr("y",margin.top + 20 + k*20 + 10)
               .text(str);

            if (k==0) { // 첫 그룹
              for (j=0; j<ndvalue; j++) {
                py[j] = margin.top + graphHeight/2 - tdata[j]*tfreqRatioV;
                bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",y1)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("y",py[j])
                   .attr("height",tdata[j]*tfreqRatioV)
              } // endof j
            } // endof if
            else {  // 둘째 그룹  

              for (j=0; j<ndvalue; j++) {
                bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("height",0)
                   .attr("width",barWidth)
                   .attr("x",margin.left + gapWidth + j*betweenbarWidth)
                   .attr("y",y2)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("height",tdata[j]*tfreqRatioV)
              } // endof j
            } // endof else
          } // endof k
        } // endof 세로형
        else { // 가로형 막대그래프
          x1 = margin.left + graphWidth/2 - bothBarGap;
          x2 = margin.left + graphWidth/2 + bothBarGap;
          y1 = margin.top;
          y2 = margin.top + graphHeight;
/*
          bar.append("line")
             .attr("x1",x1)
             .attr("x2",x1)
             .attr("y1",y1)
             .attr("y2",y2)
             .style("stroke","black") 
          bar.append("line")
             .attr("x1",x2)
             .attr("x2",x2)
             .attr("y1",y1)
             .attr("y2",y2)
             .style("stroke","black") 
*/

          // 범례
          for (k=0; k<ngroup; k++) {
              if (gvalueLabel == null) str = "Group "+(k+1).toString();
              else str = gvalueLabel[k];
            if (k==0) {
              bar.append("text")
                 .attr("class","legend")
                 .style("stroke",myColor[k])
                 .attr("x",x1 )
                 .attr("y",margin.top)
                 .style("text-anchor","end")
                 .text(str);
            }
            else {
              bar.append("text")
                 .attr("class","legend")
                 .style("stroke",myColor[k])
                 .attr("x",x1 + 2*bothBarGap )
                 .attr("y",margin.top)
                 .style("text-anchor","start")
                 .text(str);
            }
          }

          for (k=0; k<ngroup; k++) {
            y1 = margin.top;
            for (j=0; j<ndvalue; j++) tdata[j] = dataSet[k][j];

            if (k==0) { // 첫 그룹
              for (j=0; j<ndvalue; j++) {
                temp = (graphWidth/2-bothBarGap)*tdata[ndvalue-j-1] / freqMax;
                bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",x1)
                   .attr("y",margin.top + gapHeight + j*betweenbarHeight)
                   .attr("width",0)
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("x",x1-temp)
                   .attr("width",temp)
                   .attr("height",barHeight)
              }
            }
            else {  // 둘째 그룹    
              for (j=0; j<ndvalue; j++) {
                bar.append("rect")
                   .attr("class","bar")
                   .style("fill",myColor[k])
                   .attr("x",x2)
                   .attr("y",margin.top + gapHeight + j*betweenbarHeight)
                   .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                   .transition()                           // 애니매이션 효과 지정
                   .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                   .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                   .attr("width",(graphWidth/2-bothBarGap)*tdata[ndvalue-j-1]/freqMax)
                   .attr("height",barHeight)
              } // endof j
            } // endof else
          } // endof k
        } // endof 가로형
}

// 띠그래프 도수 제거 함수
function removeBandFreq() {
	 chart.selectAll("text.bandfreq").remove();
}

// 도수분포표와 교차표
function freqTable(numVar, tdvarNumber, ndvalue, dvarName, dataValue, dvalueLabel, ngroup, gvarName, gvalueLabel) {
        var table = document.getElementById("myTable");
        var row, header, sum, str;
        var i, j, k, g, ncol;
        var cell = new Array(10);

        table.style.fontSize = "13px";
//        table.style.cellPadding = "10";
    
        if (ngroup < 2) { // ngroup=1일때는 도수분포표
          ncol = 5;
          sum  = 0;
          for (j=0; j<ndvalue; j++) sum += dataSet[0][j];

          row = table.insertRow(0);
          row.innerHTML = "<h3>Frequency Table</h3>";
          row.style.textAlign = "center";

          row  = table.insertRow(1);
          for (k=0; k<2; k++) cell[k] = row.insertCell(k)
          cell[0].innerHTML = "Var Name";
          cell[0].style.backgroundColor = "#eee";
          cell[0].style.textAlign = "center";
          cell[1].innerHTML = dvarName;
          cell[1].style.textAlign = "center";
          row.style.height ="30px";

          row  = table.insertRow(2);
          for (k=0; k<ncol; k++) {
            cell[k] = row.insertCell(k);
            cell[k].style.width ="100px";
          }
          cell[0].innerHTML = "Number";
          cell[1].innerHTML = "Var Value";
          cell[2].innerHTML = "Value Label";
          cell[3].innerHTML = "Frequency";
          cell[4].innerHTML = "Percent(%)";   
          for (k=0; k<ncol; k++) {
            cell[k].style.textAlign = "center";
            cell[k].style.backgroundColor = "#eee";
          }
          for (j=0; j<ndvalue; j++) {
            row = table.insertRow(j+3);
            for (k=0; k<ncol; k++) cell[k] = row.insertCell(k)          
            cell[0].innerHTML = j+1;
            cell[1].innerHTML = dataValue[j];
            cell[2].innerHTML = dvalueLabel[j];
            cell[3].innerHTML = dataSet[0][j];
            cell[4].innerHTML = f(100*dataSet[0][j]/sum);
            cell[0].style.textAlign = "center";
            cell[0].style.backgroundColor = "#eee";
            cell[1].style.textAlign = "left";
            cell[2].style.textAlign = "center";
            cell[2].style.textAlign = "center";
            cell[3].style.textAlign = "right";
            cell[4].style.textAlign = "right";

          }

          row = table.insertRow(ndvalue+3);
          for (k=0; k<ncol; k++) cell[k] = row.insertCell(k)
          cell[2].innerHTML = "Sum";
          cell[3].innerHTML = sum;
          cell[4].innerHTML = "100.0";
          cell[2].style.backgroundColor = "#eee";
          cell[3].style.backgroundColor = "#eee";
          cell[4].style.backgroundColor = "#eee";
          cell[2].style.textAlign = "center";
          cell[3].style.textAlign = "right";
          cell[4].style.textAlign = "right";
        }
        else { // ngroup>=2 일때는 교차표

          row = table.insertRow(0);
          row.innerHTML = "<h3>Cross Table</h3>";
          row.style.textAlign = "center";
 
          row  = table.insertRow(1);
          row.style.height ="40px";
          for (k=0; k<4; k++) cell[k] = row.insertCell(k);
          cell[0].style.width ="110px";
//          for (k=1; k<4; k++)  cell[k].style.width ="70px";
          
          cell[0].innerHTML = "Analysis Var";
          cell[0].style.backgroundColor = "#eee";
          cell[1].innerHTML = dvarName;
          cell[2].innerHTML = "Group Var:";
          cell[2].style.backgroundColor = "#eee";
          cell[3].innerHTML = gvarName;
          for (k=0; k<4; k++) cell[k].style.textAlign = "center";

          row  = table.insertRow(2);
          row.style.height ="40px";
          for (k=0; k<ndvalue+2; k++) cell[k] = row.insertCell(k)
          cell[0].innerHTML = "Group | Analysis";
          for (k=1; k<ndvalue+1; k++) cell[k].innerHTML = dvalueLabel[k-1]; 
          cell[ndvalue+1].innerHTML = "Sum";   
          for (k=0; k<ndvalue+2; k++) {
            cell[k].style.width ="60px";
            cell[k].style.textAlign = "center";
            cell[k].style.backgroundColor = "#eee";
          }
          var totsum = 0;
          for (g=0; g<ngroup; g++) {
            row = table.insertRow(g+3);
            for (k=0; k<ndvalue+2; k++) cell[k] = row.insertCell(k)          
            cell[0].innerHTML = "Group "+(g+1).toString()+" ("+gvalueLabel[g]+")";
            cell[0].style.textAlign = "center";
            cell[0].style.backgroundColor = "#eee";
            sum = 0;
            for (k=1; k<ndvalue+1; k++) sum += dataSet[g][k-1];
            totsum += sum;
            for (k=1; k<ndvalue+1; k++) {
              cell[k].innerHTML = f(dataSet[g][k-1]).toString()+"<br>"+f(100*dataSet[g][k-1]/sum).toString()+"%";
              cell[k].style.textAlign = "right";
            }
            cell[ndvalue+1].innerHTML = sum.toString()+"<br>"+(100).toString()+"%";
            cell[ndvalue+1].style.textAlign = "right";
            cell[ndvalue+1].style.backgroundColor = "#eee";
          }// endof g

          row = table.insertRow(ngroup+3);
          for (k=0; k<ndvalue+2; k++) cell[k] = row.insertCell(k)
          cell[0].innerHTML = "Sum";
          cell[0].style.textAlign = "center";
 
          for (k=1; k<ndvalue+1; k++) {
            sum = 0;
            for (g=0; g<ngroup; g++) sum += dataSet[g][k-1];
            cell[k].innerHTML = f(sum).toString()+"<br>"+f(100*sum/totsum).toString()+"%";
            cell[k].style.textAlign = "right";
          }  
          cell[ndvalue+1].innerHTML = totsum.toString()+"<br>"+(100).toString()+"%";
          cell[ndvalue+1].style.textAlign = "right";
          for (k=0; k<ndvalue+2; k++) cell[k].style.backgroundColor = "#eee";

        } // endof else
}


// 원그래프 함수 --------------------------------------------------------------
function drawPieChart(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet)  {
        var i, j, k, tx, ty, str;
        var radiusIn, radiusOut;
        var datafreq = new Array(ndvalue);

        var oneHeight = graphHeight / ngroup;
        if (PieChart) {
          radiusIn  = 0;
          radiusOut = 0.9*oneHeight/2;
        }
        else {
          radiusOut = 0.9*oneHeight / 2;
          radiusIn  = radiusOut / 3;
        }

        var pie = d3.pie();
        var arc = d3.arc().innerRadius(radiusIn).outerRadius(radiusOut);

        drawTitle(mainTitle, yTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

        tx = margin.left + graphWidth/2;
        for (k=0; k<ngroup; k++) {   
          ty  = margin.top  + oneHeight/2 + oneHeight*k;	     
          for (i=0; i<ndvalue; i++) datafreq[i] = dataSet[k][i];

          var piechart = chart.append("g")
                  .attr("class", "piechart")
	          .attr("id", "piechart" + k);

           if (ngroup > 1) {
             if (gvalueLabel == null) str = "Group "+(k+1).toString();
             else str = gvalueLabel[k];
             chart.append("text")
               .attr("class","legend")
               .style("stroke",myColor[k])
               .attr("x",margin.left + graphWidth + buffer)
               .attr("y",margin.top + oneHeight/2 + oneHeight*k)
               .text(str)
           }

          var pieSlice = piechart.selectAll("g")
                  .data(pie(datafreq))
                  .enter()
                  .append("g")
                  .attr("transform", "translate("+tx+","+ty+")")

          pieSlice.append("path")
                .attr("class","pie")
                .attr("d",arc)
                .style("fill",function(d,i){ return myColor[i];})
                .transition()
                .delay(function(d,i){ return i*200;})
                .duration(1000)
              //  .easeLinear(0.5)
                .attrTween("d", function(d,i) {
                  var interpolate = d3.interpolate(
                    { startAngle:d.startAngle, endAngle: d.startAngle },
                    { startAngle:d.startAngle, endAngle: d.endAngle }
                  );
                  return function(t) { return arc(interpolate(t));
                  }
                })
          pieSlice.append("text")
               .attr("class","pieFreq")
               .attr("transform",function(d,i){ return "translate("+arc.centroid(d)+")";})
               .text(function(d,i){ return dvalueLabel[i]+" "+d.value;})
        } 
}

      
// 띠그래프 함수
function drawBandGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMax, dataSet) {
    
        var i, j, k, sum, tx, ty, t2, str, oneWidth;
        var tdata     = new Array(ndvalue);
        var tratio    = new Array(ndvalue);
        var bandWidth = new Array(ndvalue);
        var bandX     = new Array(ndvalue);

        var oneHeight = graphHeight / ngroup;
        var oneline   = 6;
        var bandHeight= oneHeight*2/3;

        drawTitle(mainTitle, yTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);

        for (k=0; k<ngroup; k++) {
           // 범례
           if (ngroup > 1) {
             if (gvalueLabel == null) str = "Group "+(k+1).toString();
             else str = gvalueLabel[k];
             chart.append("text")
               .attr("class","legend")
               .style("stroke",myColor[k])
               .attr("x",margin.left + graphWidth + buffer)
               .attr("y",margin.top + oneHeight/2 + oneHeight*k)
               .text(str)
           }

           sum = 0;   
           for (i=0; i<ndvalue; i++) {
             tdata[i]  = dataSet[k][i];
             sum      += tdata[i];
           } 
           for (i=0; i<ndvalue; i++) {
             tratio[i] = 100*tdata[i]/sum;
             bandWidth[i]  = graphWidth*tdata[i]/sum;
           }
           bandX[0] = margin.left;
           for (i=1; i<ndvalue; i++) {
             bandX[i]  = bandX[i-1]  + bandWidth[i-1];
           }

           ty = margin.top + buffer + bandHeight/2 + k*oneHeight;
           t2 = margin.top + buffer + bandHeight + k*oneHeight + 13;
           for (j=0; j<ndvalue; j++) {
             chart.append("rect")
                    .attr("x",bandX[j])
                    .attr("y",margin.top + buffer + k*oneHeight)
                    .attr("width","0px")                    // 최초 막대의 너비를 0 px 로 지정
                    .transition()                           // 애니매이션 효과 지정
                    .delay(function(d,i) {return i*500;})   // 0.5초마다 그리도록 대기시간 설정
                    .duration(2000)                         // 2초동안 애니매이션이 진행되도록 설정
                    .attr("width",bandWidth[j])
                    .attr("height",bandHeight)
                    .style("fill",myColor[j])
             if (checkBandFreq) {   // 도수와 % 쓰기
               chart.append("text")
                    .attr("class","bandfreq")
                    .attr("x",bandX[j]+bandWidth[j]/2)
                    .attr("y",ty+5)
                    .text(tdata[j])
                    .style("stroke","white")
               chart.append("text")
                    .attr("class","bandfreq")
                    .attr("x",bandX[j]+bandWidth[j]/2)
                    .attr("y",t2)
                    .text(f(tratio[j])+"%")
             }
           } // endof j

        } // endof k

        // 분석변수의 색 설명  bandfreq
        if (ndvalue <= oneline) oneWidth = graphWidth/ndvalue;
        else oneWidth = graphWidth / oneline;

        for (j=0; j<ndvalue; j++) {
            if (dvalueLabel == null) str = (j+1).toString();
            else str = dvalueLabel[j];
            tx = margin.left + 20 + (j%oneline)*oneWidth
            ty = margin.top + graphHeight + Math.floor(j/oneline)*15;
            chart.append("rect")
               .style("fill",myColor[j])
               .attr("x",tx)
               .attr("y",ty)
               .attr("width",8)
               .attr("height",8)
            chart.append("text")
               .attr("class","barnames")
               .style("fill",myColor[j])
               .attr("x",tx + 13)
               .attr("y",ty + 8)
               .text(str);
        }

}


// 꺽은선 그래프 함수
function drawLineGraph(ngroup, gvarNumber, gvarName, gvalueLabel, ndvalue, dvarNumber, dvarName, dvalueLabel, freqMin, freqMax, currentLabel, currentDataSet, dataSet) {

        var i, j, k;
        var ydata = new Array(ndvalue);

        var oneHeight        = graphHeight;

        var betweenbarWidth  = graphWidth / ndvalue;   // 막대와 막대 사이의 너비
        var barWidth         = betweenbarWidth * 0.6;  // 막대의 너비
        var gapWidth         = betweenbarWidth * 0.2;
        var betweenbarHeight = oneHeight / ndvalue;    // 막대와 막대 사이의 높이
        var barHeight        = betweenbarHeight * 0.6; // 막대의 높이
        var gapHeight        = betweenbarHeight * 0

        var ydata = new Array(ndvalue);

        // 축 그리기
        drawTitle(mainTitle, yTitle, ngroup, gvarNumber, gvarName, dvarNumber, dvarName);
        if (ngroup == 1) drawXaxis(ndvalue, currentLabel, betweenbarWidth, barWidth, gapWidth)
        else drawXaxis(ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth)
        drawYaxis(freqMin, freqMax);

        // 점 그리기
        if (ngroup == 1) {
          for (i=0; i<ndvalue; i++) ydata[i] = currentDataSet[i];
          drawLine(0, freqMin, freqMax, ydata, betweenbarWidth, barWidth, gapWidth ) 
        }
        else {
          for (k=0; k<ngroup; k++ ) {
            for (i=0; i<ndvalue; i++) ydata[i] = dataSet[k][i];
            drawLine(k, freqMin, freqMax, ydata, betweenbarWidth, barWidth, gapWidth ) 
          }
        }
        // 범례 그리기
        if (ngroup > 1) drawLegend(gvalueLabel);

}

// x축 그리기 , x축 레이블
function drawXaxis(ndvalue, dvalueLabel, betweenbarWidth, barWidth, gapWidth) {
        var x1, x2, y1, y2, ty;
        // draw x축
        y1 = margin.top  + graphHeight;
        y2 = y1 + 5;
        chart.append("line")  // x축 아래
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",y1)
             .attr("y2",y1) 
             .style("stroke","black") 
        chart.append("line")  // x축 위
             .attr("x1",margin.left)
             .attr("x2",margin.left + graphWidth)
             .attr("y1",margin.top)
             .attr("y2",margin.top) 
             .style("stroke","black") 

        // draw x축 레이블
        var angle;
        if (ndvalue < 10) angle = 0;
        else if(ndvalue <30) angle = 30;
        else angle = 90;
        ty = y1 + 10;

        for (var i=0; i<ndvalue; i++) {
          x1 = margin.left + gapWidth + barWidth/2 - 4 + i*betweenbarWidth;
          x2 = x1
          chart.append("line")   // tick
               .attr("x1",x1)
               .attr("x2",x2)
               .attr("y1",y1)
               .attr("y2",y2) 
               .style("stroke","black") 
          chart.append("text")   // x축 레이블
               .attr("class","barname")
               .attr("x", x1)
               .attr("y", ty)
               .attr("transform","rotate("+angle+","+x1+","+ty+")  ")
               .style("text-anchor","start")
               .text(dvalueLabel[i])
        } // endof i

}

// y축 그리기
function drawYaxis(freqMin, freqMax) {
        var yScale  = d3.scaleLinear().domain([freqMax,freqMin]).range([0, graphHeight]);
        chart.append("g")
             .attr("transform","translate("+margin.left+","+margin.top+")")
             .call(d3.axisLeft(yScale))   
        chart.append("line")  // y축 우측
               .attr("x1",margin.left + graphWidth)
               .attr("x2",margin.left + graphWidth)
               .attr("y1",margin.top)
               .attr("y2",margin.top + graphHeight) 
               .style("stroke","black") 
}

// 선그래프 선그리기 함수
function drawLine(k, freqMin, freqMax, ydata, betweenbarWidth, barWidth, gapWidth ) {
        var x1 = margin.left + gapWidth + barWidth/2;
        var y1 = margin.top  + graphHeight - graphHeight*(ydata[0]-freqMin)/(freqMax-freqMin);
        chart.append("circle").attr("cx",x1).attr("cy",y1).attr("r",4).style("fill",myColor[k])    // 첫째 점

        for (j=1; j<ndvalue; j++) {  // 둘째 이후 애니메이션
          x2 = margin.left + gapWidth + barWidth/2 + j*betweenbarWidth;
          y2 = margin.top  + graphHeight - graphHeight*(ydata[j]-freqMin)/(freqMax-freqMin);
	  chart.append("circle")
               .attr("cx", x1)
               .attr("cy", y1)
               .style("fill",myColor[k])
               .transition()                           // 애니매이션 효과 지정
               .delay(function(d,i) {return i*200;})   // 0.5초마다 그리도록 대기시간 설정
               .duration(1000)   
               .attr("cx", x2)
               .attr("cy", y2)       
               .attr("r", 4);
          chart.append("line")
               .attr("x1",x1)
               .attr("x2",x2)
               .attr("y1",y1)
               .attr("y2",y2) 
               .style("stroke",myColor[k]) 
          x1 = x2;
          y1 = y2;
        } // endof j
}

// 범례
function drawLegend(gvalueLabel) {
        var x1 = margin.left + graphWidth + buffer;
        var y1;
        for (j=0; j<ngroup; j++) {
          y1 = margin.top + 20 + j*20;
          chart.append("circle")
               .attr("cx",x1)
               .attr("cy",y1)
               .style("fill",myColor[j])
               .attr("r", 4);
          chart.append("text")
               .attr("class","legend")       
               .attr("x",x1+10)
               .attr("y",y1+5)
               .text(gvalueLabel[j])
               .style("stroke",myColor[j])
        } // endof j
}

