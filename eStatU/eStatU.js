﻿var f0 = d3.format(".0f");
var f1 = d3.format(".1f");
var f2 = d3.format(".2f");
var f3 = d3.format(".3f");
var f4 = d3.format(".4f");

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
// dual slider control Functions *******************************************************************
// =====================================================================================

function getVals(){
  // Get slider values
  var parent = this.parentNode;
  var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat( slides[0].value );
    var slide2 = parseFloat( slides[1].value );
  // Neither slider will clip the other, so make sure we determine which is larger
  if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
  
  var displayElement = parent.getElementsByClassName("rangeValues")[0];
//      displayElement.innerHTML = slide1 + " - " + slide2;
}

window.onload = function(){
  // Initialize Sliders
  var sliderSections = document.getElementsByClassName("range-slider");
      for( var x = 0; x < sliderSections.length; x++ ){
        var sliders = sliderSections[x].getElementsByTagName("input");
        for( var y = 0; y < sliders.length; y++ ){
          if( sliders[y].type ==="range" ){
            sliders[y].oninput = getVals;
            // Manually trigger event first time to display values
            sliders[y].oninput();
          }
        }
      }
}

// basic statistics function ============================================
//
simplestat = function(dataid) {
        data = d3.select(dataid)
	         .node()
	         .value
	         .trim()
	         .split(new RegExp("[ ]*[, \t][ ]*"))   // ['8', '8', '9']
	         .map(parseFloat);                      // [8.0, 8.0, 9.0]

        n = data.length;
        sum = 0;
        sumsq = 0;
        data.forEach(function(d) {
          sum += d;
          sumsq += d*d;
        });
        xbar = sum / n;
        v = (sumsq - n*xbar*xbar) / (n-1);

        return {'n' : n, 'xbar' : xbar, 'var' : v};
}

// =====================================================================================
// Correlation & Regression Functions *******************************************************************
// =====================================================================================

// Sort in Ascending
function SortAscend(tobs, tdata, dataA) {
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

// Find Maximum   -- ContinuousGraph에 있음
function gmax(nobs, data) {
      var gxmax = data[0];
      for (var k=1; k<nobs; k++) {
        if (gxmax < data[k]) gxmax = data[k];
      }
      return gxmax;
}

// Find Minimum   -- ContinuousGraph에 있음
function gmin(nobs, data) {
      var gxmin = data[0];
      for (var k=1; k<nobs; k++) {
        if (gxmin > data[k]) gxmin = data[k];
      }
      return gxmin
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
function drawScatterTitle(gvarNumber, xvarNumber, yvarNumber, gvarName, xvarName, yvarName) { 
        var str, gstr;
        if (gvarName == null) gvarName ="V"+gvarNumber.toString();
        if (xvarName == null) xvarName ="V"+xvarNumber.toString();
        if (yvarName == null) yvarName ="V"+yvarNumber.toString();

        // 주제목
        if (gvarNumber < 1) str = "V"+xvarNumber.toString()+": "+xvarName + "V"+yvarNumber.toString()+": "+yvarName+" Scatter Plot";
        else str = "Group V"+gvarNumber.toString()+"("+gvarName+ "): " + "V"+xvarNumber.toString()+": "+xvarName + "V"+yvarNumber.toString()+": "+yvarName+" Scatter Plot";
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
function drawScatter(ngroup,tobs,xdata,ydata,gdata,gxmin,gxmax,gymin,gymax,gyrange, graphWidth, graphHeight) {

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
      if (ngroup > 1) drawScatterLegend(ngroup, gvalueLabel,graphWidth, buffer);
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
function drawScatterLegend(ngroup, gvalueLabel,graphWidth, buffer) {
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
                 .style("fill",myColor[k]) 
                 .attr("x", margin.left + 20)
                 .attr("y", margin.top +  20 + k*35)
                 .text("Regression :  y = ("+f2(alpha[k])+") + ("+f2(beta[k])+ ") x")
          
          scatter.append("text").attr("class","reglabel")
                 .style("fill",myColor[k]) 
                 .attr("x", margin.left + 80)
                 .attr("y", margin.top +  40 + k*35)
                 .text("r = "+f2(corr[k])+" "+" r\u00B2 = "+f2(rsquare[k]))
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
          row.innerHTML = ",<h3>Scatter Plot Statistics</h3>";
          row.style.textAlign = "center";
 
          row  = table.insertRow(1);
//          row.style.height ="40px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.width ="70px";
          }
          cell[0].style.width ="120px";
          cell[0].innerHTML = "Analysis:";
          cell[0].style.backgroundColor = "#eee";
          cell[1].innerHTML = xvarName;
          cell[2].innerHTML = yvarName;
          cell[3].innerHTML = "Group:";
          cell[3].style.backgroundColor = "#eee";
          cell[4].innerHTML = gvarName;
          for (j=0; j<ncol; j++) cell[j].style.textAlign = "center";

          row  = table.insertRow(2);
//          row.style.height ="40px";
          for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);
          cell[0].innerHTML = "Group | Statistics";
          cell[1].innerHTML = "observation";  
          cell[2].innerHTML = "X Mean";  
          cell[3].innerHTML = "X Std Dev";    
          cell[4].innerHTML = "Y Mean";  
          cell[5].innerHTML = "Y Std Dev";
          cell[6].innerHTML = "alpha";
          cell[7].innerHTML = "beta";
          cell[8].innerHTML = "Corr Coeff";
          cell[9].innerHTML = "Determination Coeff";    
          for (j=0; j<ncol; j++) {
            cell[j].style.textAlign = "center";
            cell[j].style.backgroundColor = "#eee";
          }

          for (g=0; g<ngroup; g++) {
            row = table.insertRow(g+3);
            for (j=0; j<ncol; j++) cell[j] = row.insertCell(j);          
            cell[0].innerHTML = "Group "+(g+1).toString()+" ("+gvalueLabel[g]+")";
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
          cell[0].innerHTML = "Total";
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
function basicScatterStat(nobs, xdata, ydata, stat) {
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

// 산점도 시뮬레이션 그리기 함수 -------------------------------------------------------------
function showScatterPlot(nobs, xdata, ydata, gxmin, gxmax, gymin, gymax, graphWidth, graphHeight, checkTitle) {
     var gxrange = gxmax - gxmin;
     var gyrange = gymax - gymin;

     if(checkTitle) {
        var title = "Change Correlation Coefficient and click Execute button"
        svg.append("text").attr("x",margin.left).attr("y",margin.top/2).text(title)
           .attr("font-size","13pt").attr("stroke","blue").attr("text-anchor","start")

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
      }

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
             .style("fill",function(d,i){return myColor[i] })
}


// 회귀선 그리기 함수
function showRegression2(alpha, beta, corr, rsquare, gxmin, gxmax, gymin, gymax, checkTitle) {
        var gyrange = gymax - gymin;
        var x1  = margin.left;
        var y1  = margin.top  + graphHeight - graphHeight*((alpha+beta*gxmin)-gymin)/gyrange;
        var x2  = margin.left + graphWidth;
        var y2  = margin.top  + graphHeight - graphHeight*((alpha+beta*gxmax)-gymin)/gyrange;

        svg.append("line").attr("class","reglabel2")
                .attr("x1",x1)
                .attr("y1",y1)
                .attr("x2",x2)
                .attr("y2",y2)
                .style("stroke","green") 
     if(checkTitle) {   
        svg.append("text").attr("class","reglabel2")
                .attr("x", margin.left + 20)
                .attr("y", margin.top +  20)
                .text("Regression :  y = ("+f2(alpha)+") + ("+f2(beta)+ ") x")
        
        svg.append("text").attr("class","reglabel2")
                .attr("x", margin.left + 80)
                .attr("y", margin.top +  40)
                .text("r = "+f2(corr)+" r\u00B2 = "+f2(rsquare))
      }
}

// Remove Regression Line of Simulation
function removeRegression2() {
	 svg.selectAll("line.reglabel2").remove();
         svg.selectAll("text.reglabel2").remove();
}

// 회귀선 시뮬레이션 화면 그리기 -------------------------------------------------------------
function showScatterPlot3(graphWidth, graphHeight) {
        var gxmin = 0;
        var gxmax = 10;
        var gymin = 0;
        var gymax = 10;
        var gxrange = gxmax - gxmin;
        var gyrange = gymax - gymin;

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
}


function addPoint(x, y) {
    svg.append("circle")
	.attr("cx", x)
	.attr("cy", y)
	.attr("r", 5)
	.style("cursor", "pointer")
        .style("fill","#0055FF")
	.on("mouseenter", function() {
	    d3.select(this)
		.style("fill", "#bf616a");
	})
	.on("mouseleave", function() {
	    d3.select(this)
		    .style("fill", "#0055FF");
	})
	.on("click", removePoint)
	.on("touch", removePoint)
	.call(drag);
}


function lsfit(points) {

    var n = points.length;
    var sx = 0;
    var sy = 0;
    var sxx = 0;
    var syy = 0;
    var sxy = 0;
    for(var i=0; i<n; ++i) {
	var x = xscale.invert(points[i].cx.baseVal.value);
	var y = yscale.invert(points[i].cy.baseVal.value);
	sx = sx + x;
	sy = sy + y;
	sxx = sxx + x*x;
	sxy = sxy + x*y;
	syy = syy + y*y;
    }
    b1 = (sxy - sx*sy/n)/(sxx - sx*sx/n);
    b0 = sy/n - b1 * sx/n;
    var sst = syy - sy*sy/n;
    var sse = 0;
    for(var i=0; i<n; ++i) {
	var x = xscale.invert(points[i].cx.baseVal.value);
	var y = yscale.invert(points[i].cy.baseVal.value);
	var e = y - (b0 + b1*x);
	sse = sse + e*e;
	    }
    return {a : b0, b : b1, xbar : sx/n, ybar : sy/n, rsq: 1 - sse/sst};
}

function updateRegressionLine() {
    var x1, x2, y1, y2;
    var coef = lsfit(svg.selectAll("circle").nodes());

    if(isNaN(coef.a) || isNaN(coef.b) || isNaN(coef.xbar) || isNaN(coef.ybar)) {
	 svg.selectAll("line.regline").remove();
    } else {
        svg.selectAll("line.regline").remove();
 
        x1 = margin.left;
        y1 = yscale(coef.a + xscale.invert(margin.left)*coef.b);
        x2 = margin.left + graphWidth;
        y2 = yscale(coef.a + xscale.invert(margin.left+graphWidth)*coef.b);
        if (y1 < margin.top) {
          y1 = margin.top;
          x1 = xscale( (yscale.invert(margin.top)-coef.a) / coef.b);
        }
        if (y1 > margin.top + graphHeight) {
          y1 = margin.top + graphHeight;
          x1 = xscale( (yscale.invert(margin.top+graphHeight)-coef.a) / coef.b);
        }      
        if (y2 < margin.top) {
          y2 = margin.top;
          x2 = xscale( (yscale.invert(margin.top)-coef.a) / coef.b);
        }
        if (y2 > margin.top + graphHeight) {
          y2 = margin.top + graphHeight;
          x2 = xscale( (yscale.invert(margin.top+graphHeight)-coef.a) / coef.b);
        } 
        svg.append("line") 
           .attr("class","regline")    
	   .attr("x1", x1)
	   .attr("y1", y1)
	   .attr("x2", x2)
	   .attr("y2", y2)
	   .attr("stroke", "royalblue");
    }

    // 회귀선, 상관계수, 결정계수
    var y1 = margin.top + graphHeight +  margin.bottom/2 + 10;
    svg.selectAll("text.reglabel3").remove();     
    svg.append("text").attr("class","reglabel3")
        .attr("x", margin.left + 20)
        .attr("y", y1)
        .text("y = ("+f2(coef.a)+") + ("+f2(coef.b)+ ") x")         
    svg.append("text").attr("class","reglabel3")
        .attr("x", margin.left + graphHeight/2)
        .attr("y", y1)
        .text("r = "+f2(Math.sqrt(coef.rsq)))
    svg.append("text").attr("class","reglabel3")
        .attr("x", margin.left + graphHeight/2 + 60)
        .attr("y", y1)
        .text("r\u00B2 = "+f2(coef.rsq))
 
}


function clearAll() {
    svg.selectAll("circle").remove();
    svg.selectAll("text.reglabel3").remove(); 
    svg.selectAll("line.regline").remove();    
    updateRegressionLine();
}


// =====================================================================================
// Binomial functions 
// =====================================================================================

// Binomial Triangle 그리기 함수 ==================================================================
function BinomialTriangle(nvalue, pp, tx, ty) {
        var i, j, k, t1, t2, x1, x2;
        var oneHeight = graphHeight / (nvalue+1);
        var oneWidth  = graphWidth / (2*nn + 1);


        // 하늘 사각형
        t1 = margin.left + graphWidth/2;
        t2 = margin.top/2;
        dot.append("rect")
           .attr("x", t1 - rectSize)
           .attr("y", t2 - rectSize)
           .attr("width",  2*rectSize)
           .attr("height", 2*rectSize)
           .attr("stroke","black").attr("stroke-width","1px").attr("fill","#0055FF")
        dot.append("line")
           .attr("x1", t1)
           .attr("y1", t2+rectSize)
           .attr("x2", t1)
           .attr("y2", t2+3*rectSize+oneHeight)
           .attr("stroke-width","2px").attr("stroke","#0055FF")

        // 각 사각형 좌표 계산      
        for (i=0; i<nvalue; i++) {
          tx[i][0] = margin.left + graphWidth/2 - rectSizeDiv2- i*oneWidth;
          ty[i][0] = margin.top + (i+1)*oneHeight;
          if (i != nvalue-1) {
            dot.append("rect")
               .attr("x", tx[i][0] )
               .attr("y", ty[i][0])
               .attr("width",  rectSize)
               .attr("height", rectSize)
               .attr("stroke","black").attr("stroke-width","1px").attr("fill","#0055FF")
          }
          for (k=1; k<=i; k++) {
            tx[i][k] = tx[i][k-1] + 2*oneWidth; 
            ty[i][k] = ty[i][0];
            if (i != nvalue-1) {
              dot.append("rect")
                 .attr("x", tx[i][k] )
                 .attr("y", ty[i][k])
                 .attr("width",  rectSize)
                 .attr("height", rectSize)
                 .attr("stroke","black").attr("stroke-width","1px").attr("fill","#0055FF")
            }
          } // endof k
        } // endof i


	  
        // 마지막 라인은 점수 합계용
        for (j=0; j<nvalue; j++) {
          t1 = tx[nvalue-1][j] + rectSizeDiv2;
          t2 = ty[nvalue-1][j] + rectSize + 6;
          dot.append("circle").attr("cx",t1).attr("cy",t2).attr("r",rectSize)
             .attr("stroke","#0055FF").attr("stroke-width","2px").attr("fill","none")
          dot.append("text").attr("x",t1).attr("y",t2+5).text(j)
             .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
        }        

        // 사각형 연결 line
        for (i=0; i<nvalue-1; i++) {
          for (j=0; j<=i; j++) {
            x1 = tx[i][j] + rectSizeDiv2;
            y1 = ty[i][j] + rectSizeDiv2;
            for (k=j; k<=j+1; k++) {
              x2 = tx[i+1][k] + rectSizeDiv2;
              y2 = ty[i+1][k] + rectSizeDiv2;
              if (k==j && pp < 0.5) dot.append("line").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2)
                                       .attr("stoke-width","2px").attr("stroke","#0055FF")
              else                  dot.append("line").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2)
                                       .attr("stroke-width","1px").attr("stroke","#0055FF")
              if (k==j+1 && pp < 0.5) dot.append("line").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2)
                                         .attr("stroke-width","1px").attr("stroke","#0055FF")
              else                    dot.append("line").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2)
                                         .attr("stroke-width","2px").attr("stroke","#0055FF")
              t1 = (x1 + x2) / 2;
              t2 = (y1 + y2) / 2;
              if (k==j) dot.append("text").attr("x", t1).attr("y", t2).text("0")
                           .attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
              else      dot.append("text").attr("x", t1).attr("y", t2).text("1")
                           .attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
            } // endof k
          } // endof j
        } // endof i
        
      
} // endof BinomialTriangle()
      
// 이항분포 시뮬레이션
function BinomialSimulation(nobs,nvalue,tdataY) {
         var i, j, k, g;
         var x0, y0, x1, y1, x2, y2, t1, t2;
         var sum;

         //  점그래프 X축
         y1 = 2*svgHeight - margin.bottom + 8; 
         dot.append("line")
            .attr("x1", margin.left)
            .attr("y1", y1)
            .attr("x2", margin.left+graphWidth)
            .attr("y2", y1)
            .attr("stroke","black").attr("stroke-width","2px")
         for (j=0; j<nvalue; j++) {
           x1 = tx[nvalue-1][j]+rectSizeDiv2;
           dot.append("text")
              .attr("x", x1)
              .attr("y", y1+15)
              .text(j)
              .attr("font-family","sans-serif").attr("font-size","8pt").attr("stroke","red").attr("text-anchor","middle")
         } // endof j
  
          // 점 애니메이션 시작
          for (i=0; i<nvalue; i++) tdataY[i] = 0; // Count frequency

          // nobs 개수만큼 점 만들고 궤적 그리기
          for (g=0; g<nobs; g++) {
            setTimeout(function() {	      
              sum = 0;
              t1 = margin.left + graphWidth/2;            // 하늘 좌표
              t2 = margin.top/2;
	      x0 = tx[0][0] + rectSizeDiv2;
	      y0 = ty[0][0] + rectSizeDiv2;

              var cir = dot.append("circle").attr("stroke","black").attr("fill","red") 
              var currentPath = dot.append("line")
                                   .attr("stroke-width","3px").attr("stroke","red")
              cir.attr("cx", t1)
                 .attr("cy", t2)
                 .attr("r", 10)
                 .transition()                           // 애니매이션 효과 지정
                 .delay(100)   // 0.5초마다 그리도록 대기시간 설정
                 .duration(1000)                         // 1초동안 애니매이션이 진행되도록 설정
                 .attr("cx", x2)
                 .attr("cy", y2)

              for (i=0; i<nvalue-1; i++) {
                if (i==0) j=0;
                x1 = tx[i][j] + rectSizeDiv2;
                y1 = ty[i][j] + rectSizeDiv2;

                if (Math.random() < 1-pp) { k = j }  // (1-p) 확률로 왼쪽으로 가면 0점
                else { k = j+1 ; sum++;};            // p 확률로 오른쪽으로 가면 1점 

                x2 = tx[i+1][k] + rectSizeDiv2;
	        y2 = ty[i+1][k] + rectSizeDiv2;

                cir.transition()
                   .delay(100*i)
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
                y2 = 2*svgHeight - margin.bottom - (tdataY[sum]-1)*2*radiusSize;
              }
              else if (tdataY[sum] < 71) {
                x2 = x2 + radiusSize*2;
                y2 = 2*svgHeight - margin.bottom - (tdataY[sum]-35-1)*2*radiusSize;
              }
              else {
                x2 = x2 + radiusSize*4;
                y2 = 2*svgHeight - margin.bottom - (tdataY[sum]-70-1)*2*radiusSize;
              }

              cir.transition()                           // 애니매이션 효과 지정
                 .delay((nn+1)*g)
                 .duration(100)                         // 1초동안 애니매이션이 진행되도록 설정
                 .style("fill",myColor[sum])
                 .attr("r", radiusSize)
                 .attr("cx", x2)
                 .attr("cy", y2);

            }, 300*g); // endof setTimeout

//              dot.selectAll("line.lineR").remove(); // path 지우기
          
          } // endof g 

          var str = "repetition="+nobs;
          dot.append("text")
             .attr("x", margin.left+20)
             .attr("y", svgHeight-margin.bottom/2)
             .text(str)
             .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")        
} // endof BinomialSimulation Function 

 
// 실험된 이항분포 각 값의 확률 표시
function showBinomialFreq(nvalue, binomialP1, tdataY, tx) {
        var i, j, temp;
        var xmin, xmax, gxmin, gxmax, ymin, ymax;
        var savg, sstd;
  
        // 실험된 확률
        for (var j=0; j<nvalue; j++) {
          if (tdataY[j] < 36) y2 = 2*svgHeight - margin.bottom - (tdataY[j])*2*radiusSize;
          else                y2 = 2*svgHeight - margin.bottom - (35)*2*radiusSize;

          dot.append("text")
             .attr("class","mean9")
             .attr("x", tx[nvalue-1][j]+rectSizeDiv2)
             .attr("y", y2 - 3)
             .text(f3(tdataY[j]/nobs))
        } // endof j
    
        // 이론확률
        y1 = 2*svgHeight - margin.bottom + 13; 
        dot.append("text").attr("class","scorefont")
           .attr("x", tx[nvalue-1][0])
           .attr("y", y1+25)
           .text("Actual Prob:")
        for (j=0; j<nvalue; j++) {
          x1 = tx[nvalue-1][j]+rectSizeDiv2;
          dot.append("text")
             .attr("class","scorefont")
             .attr("x", x1)
             .attr("y", y1+40)
             .text(f3(binomialP1[j]))
        } // endof j

        xmin = 0;
        xmax = nvalue;
        gxmin = xmin - 1;
        gxmax = xmax + 1;
        ymin = 0;
        ymax = 1;
        savg = 0;
        for (i=0; i<nvalue; i++) {
          if(tdataY[i]>ymax) ymax = tdataY[i];
          savg += i*tdataY[i];
        }
        savg /= nobs;
        sstd = 0;
        for (i=0; i<nvalue; i++) {
          temp = (i - savg);
          sstd += temp * temp * tdataY[i];
        }
        sstd = Math.sqrt(sstd/nobs); 
       
        // 이항분포 그래프
        var str = "Mean = "+savg+",  Std Dev = "+f2(sstd);
        dot.append("text").attr("class","mean9")
           .attr("x", margin.left + graphWidth/2)
           .attr("y", 2*svgHeight - margin.bottom/3 -2).text(str);
}

// 실험된 이항분포 각 값의 확률 제거
function removeBinomialFreq() {
        dot.selectAll("text.mean9").remove();
        dot.selectAll("text.scorefont").remove();  
}


// 이항분포함수 변수값명 쓰기 함수--------------------------------------------------------------------
function drawBinomialLabel(nvalue2, label, betweenbarWidth) { 
        var x1 = margin.left;
        var y1 = svgHeight - margin.bottom; 
        var barWidth = betweenbarWidth * 2 / 3;  // 막대의 너비
        var barMargin = (betweenbarWidth / 3) / 2; // 왼쪽 마진

        var temp = betweenbarWidth/3;

        for (var k=0; k<nvalue2; k++) {
          if (nvalue2 < 40) {
             bar.append("text")
             .attr("class","barname")
             .attr("x",margin.left + barMargin + barWidth/2 + k*betweenbarWidth )
             .attr("y",y1+20)
             .text(label[k])
             .attr("font-family","sans-serif").attr("font-size","8pt").attr("text-anchor","middle")
          } else if (nvalue2 < 70) {
             if  (k%2 == 1) {
               bar.append("text")
                  .attr("class","barname")
                  .attr("x",margin.left + barMargin + barWidth/2 + k*betweenbarWidth )
                  .attr("y",y1+20)
                  .text(label[k])
                 .attr("font-family","sans-serif").attr("font-size","8pt").attr("text-anchor","middle")
            }
          } else {
             if  (k%3 == 1) {
               bar.append("text")
                  .attr("class","barname")
                  .attr("x",margin.left + barMargin + barWidth/2 + k*betweenbarWidth )
                  .attr("y",y1+20)
                  .text(label[k])
                  .attr("font-family","sans-serif").attr("font-size","8pt").attr("text-anchor","middle")
            }
          }
          
        } // endof k
}

// 이항분포 축
function drawBinomialAxis(gymin, gymax) {
        // y축
        var yScale = d3.scaleLinear().domain([gymax,0]).range([0,graphHeight])
        bar.append("g")
          .attr("transform","translate("+margin.left+","+margin.top+")")
          .call(d3.axisLeft(yScale))                  // 눈금을 표시할 함수 호출
        // x축
        var x1 = margin.left;
        var y1 = margin.top + graphHeight; 
        bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x1+graphWidth).attr("y2",y1).style("stroke","black");
}

// 이항분포 막대그래프 함수 --------------------------------------------------
function drawBinomialBarGraph(nn2, pp2, binomialP2, xmin, xmax, ymin, ymax, label) {
         var info;
         var nvalue2   = nn2 + 1;
         var xmin      = 0;
         var xmax      = nvalue2;
         var ymin      = 0;
         var ymax      = 0.4;
         if ( nn2 > 9 && pp2 >= 0.1 && pp2 <= 0.9) ymax = 0.3;
         else ymax = 0.8;

         var gymin     = ymin;
         var gymax     = ymax + ymax/5;  
         var yRatio    = graphHeight / gymax;          // 그래프 영역과 데이터 영역의 비율
         var betweenbarWidth = graphWidth / nvalue2;   // 막대와 막대 사이의 너비
         var barWidth  = betweenbarWidth * 2 / 3;    // 막대의 너비
         var barMargin = (betweenbarWidth / 3) / 2; // 왼쪽 마진
         var title  = "Binomial Dist n = "+nn2.toString()+", p = "+f2(pp2);
         bar.append("text").attr("x", margin.left).attr("y", margin.top/2).text(title)
            .attr("font-size","13pt").attr("stroke","blue").attr("text-anchor","start")

         var avg  = nn2 * pp2;
         var std  = Math.sqrt(nn2*pp2*(1-pp2));
         var str = "Mean = "+f2(avg)+",  Std Dev = "+f2(std);
         bar.append("text")
            .attr("x", margin.left + graphWidth/2 - 40)
            .attr("y", svgHeight - margin.bottom/3).text(str)
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         // 확률및 통계량 계산
         for (var i=0; i<nvalue2; i++) {
           label[i] = i;
           binomialP2[i] = binomial_pdf(i, nn2, pp2, info)
         }

         drawBinomialAxis(gymin, gymax);
         drawBinomialLabel(nvalue2, label, betweenbarWidth);

         for (var k=0; k<nvalue2; k++) {
         bar.append("rect")
            .style("fill",function(d,i) {return myColor[0];})
            .attr("height",0)
            .attr("width",barWidth)
            .attr("x", margin.left +barMargin + k*betweenbarWidth)
            .attr("y",svgHeight - margin.bottom)
            .transition()                           // 애니매이션 효과 지정
            .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
            .duration(1000)                         // 2초동안 애니매이션이 진행되도록 설정
            .attr("y", svgHeight - margin.bottom - binomialP2[k]*yRatio)
            .attr("height", binomialP2[k]*yRatio)
         }
}

// 이항분포 확률표시 함수
function showBinomialFreq2(nvalue2, binomialP2, xmin, xmax, ymin, ymax) {
        var gymax      = ymax + ymax/5;  
        var yRatio     = graphHeight / gymax;      // 그래프 영역과 데이터 영역의 비율
        var betweenbarWidth = graphWidth / nvalue2;   // 막대와 막대 사이의 너비
        var barWidth  = betweenbarWidth * 2 / 3;   // 막대의 너비
        var barMargin = (betweenbarWidth / 3) / 2; // 왼쪽 마진
        for (var k=0; k<nvalue2; k++) {
          bar.append("text")
             .attr("class","freqfont2")
             .attr("x",margin.left + barMargin + barWidth/2 + k*betweenbarWidth)
             .attr("y",svgHeight - margin.bottom - binomialP2[k]*yRatio - 5)
             .text(f3(binomialP2[k]))
        }
}

// 도수 제거 함수
function removeBinomialFreq2() {
	 bar.selectAll("text.freqfont2").remove();
}

// 이항분포 n, p 슬라이드바 functions
function showValueBinomial3(newValue, valueLabel, binomialP2) {
        bar.selectAll("*").remove();
        document.getElementById("freq2Binomial").checked = false;
        document.getElementById("freq3Binomial").checked = false;
        checkFreq2 = false;
        checkFreq3 = false;
        removeBinomialFreq2();
        removeBinomialNormal();

        document.getElementById("nn2").value = newValue;
        var nn2 = parseFloat(d3.select("#nn2").node().value);    // 크기 n
        var pp2 = parseFloat(d3.select("#pp2").node().value);    // 성공확률 p

        drawBinomialBarGraph(nn2, pp2, binomialP2, xmin, xmax, ymin, ymax, valueLabel);
}

function showValueBinomial4(newValue, valueLabel, binomialP2) {
        bar.selectAll("*").remove();
        document.getElementById("freq2Binomial").checked = false;
        document.getElementById("freq3Binomial").checked = false;
        checkFreq2 = false;
        checkFreq3 = false;
        removeBinomialFreq2();
        removeBinomialNormal();

        document.getElementById("pp2").value = newValue / 100;
        var nn2 = parseFloat(d3.select("#nn2").node().value);    // 크기 n
        var pp2 = parseFloat(d3.select("#pp2").node().value);    // 성공확률 p

        drawBinomialBarGraph(nn2, pp2, binomialP2, xmin, xmax, ymin, ymax, valueLabel);
}


// 이항-정규분포 근사 함수
function showBinomialNormal(nn2, pp2, xmin, xmax, ymin, ymax) {
        var avg  = nn2 * pp2;
        var std  = Math.sqrt(nn2*pp2*(1-pp2));
        var gxmin      = 0;
        var gxmax      = nn2+1;
        var gxrange    = gxmax - gxmin;
        var gymin      = ymin;
        var gymax      = ymax + ymax/5; 
        var gyrange    = gymax - gymin; 
        var betweenbarWidth = graphWidth / (nn2+1);   // 막대와 막대 사이의 너비
        var barWidth  = betweenbarWidth * 2 / 3;   // 막대의 너비
        var barMargin = (betweenbarWidth / 3) / 2; // 왼쪽 마진
        var graphWidth2 = graphWidth * 6 * std / gxrange;

         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = avg - 3*std;
         y[0] = normal_pdf( avg, std, x[0] );
         x1   = margin.left + barMargin + barWidth/2 + graphWidth*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight - graphHeight*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           if (x[k] > avg + 3*std) break;
           y[k] = normal_pdf( avg, std, x[k] );
           x2   = margin.left + barMargin + barWidth/2 + graphWidth*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight - graphHeight*(y[k]-gymin)/gyrange;
           bar.append("line").attr("class","lineNormal").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","red")
           x1   = x2;
           y1   = y2;    
//           document.write(k+" "+x[k]+" "+y[k]+"<br>")
         }
}

// 이항-정규분포 제거 함수
function removeBinomialNormal() {
	 bar.selectAll("line.lineNormal").remove();
}

// 이항분포표
function binomialTable(nn, pp, binomialP2) {
        var table = document.getElementById("binomTable");
        var row, header;
        var i, j, sum;

        var nvalue = nn + 1;
        var ncol = 4;
        var cell = new Array(4);

 
        table.style.fontSize = "13px";
//        table.style.cellPadding = "10";
    
          row = table.insertRow(0);
          row.style.height ="40px";
          row.innerHTML = "<h3>Binomial Distribution </h3>";
          row.style.textAlign = "center";

          row  = table.insertRow(1);
          row.style.height ="30px";
          for (j=0; j<2; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
          }
          cell[0].innerHTML = "n = "+nn;
          cell[1].innerHTML = "p = "+f3(pp);

          row  = table.insertRow(2);
          row.style.height ="30px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
          }
          for (j=0; j<ncol; j++) {
            cell[j].style.width ="80px";
          }
          cell[0].innerHTML = "x";
          cell[1].innerHTML = "P(X = x)";
          cell[2].innerHTML = "P(X <= x)";
          cell[3].innerHTML = "P(X >= x)";

          sum = 0;
          for (i=0; i<nvalue; i++) {
            row = table.insertRow(i+3);
            for (j=0; j<ncol; j++) cell[j] = row.insertCell(j)          
            cell[0].innerHTML = i;
            cell[1].innerHTML = f4(binomialP2[i]);
            sum += binomialP2[i];
            cell[2].innerHTML = f4(sum);
            cell[3].innerHTML = f4(1 - sum + binomialP2[i]);
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            for (j=0; j<ncol; j++) cell[j].style.textAlign = "center";
          }

}

// =====================================================================================
// Poisson functions 
// =====================================================================================
//*********************************************************************************** 
//
// lamda value 보이고 실행하기
function showValueLambda(newValue, valueLabel, poissonP) {
        document.getElementById("lambda").value  = f1(newValue / 10);
        bar.selectAll("*").remove();
        document.getElementById("freqPoisson").checked = false;
        removeBinomialFreq2();

        var lambda = parseFloat(d3.select("#lambda").node().value);    // 성공 rate
        drawPoissonBarGraph(nvalue, lambda, valueLabel, poissonP, xmin, xmax, ymin, ymax);
}


// Poisson분포 막대그래프 함수 --------------------------------------------------
function drawPoissonBarGraph(nvalue, lambda, valueLabel, poissonP, xmin, xmax, ymin, ymax) {
         var i, avg, std, info;
         var gymin, gymax, yRatio, betweenbarWidth, barWidth, barMargin

         // 확률및 통계량 계산
         for (i=0; i<nvalue; i++) {
           valueLabel[i] = i;
           poissonP[i] = poisson_pdf(i, lambda, info)
         }
//        for (i=0; i<nvalue; i++) {if(poissonP[i]>ymax) ymax = poissonP[i];}

         ymax = 0.4;
         if (lambda < 0.5) ymax = 0.8;
         gymin     = ymin;
         gymax     = ymax + ymax/5;  
         yRatio    = graphHeight / gymax;          // 그래프 영역과 데이터 영역의 비율
         betweenbarWidth = graphWidth / xmax;   // 막대와 막대 사이의 너비
         barWidth  = betweenbarWidth * 2 / 3;    // 막대의 너비
         barMargin = (betweenbarWidth / 3) / 2; // 왼쪽 마진

         drawBinomialAxis(gymin, gymax);
         drawBinomialLabel(nvalue, valueLabel, betweenbarWidth);

         avg  = lambda;
         std  = Math.sqrt(lambda);
 
         var title  = "Poisson Distribution m = "+f1(lambda);
         bar.append("text").attr("x", margin.left).attr("y", margin.top/2).text(title)
            .attr("font-size","13pt").attr("stroke","blue").attr("text-anchor","start")
         var str = "Mean = "+f2(avg)+",  Std Dev = "+f2(std);
         bar.append("text")
            .attr("x", margin.left + graphWidth/2 - 40)
            .attr("y", svgHeight - margin.bottom/3).text(str)
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         for (var k=0; k<nvalue; k++) {
           bar.append("rect")
            .style("fill",function(d,i) {return myColor[0];})
            .attr("height",0)
            .attr("width",barWidth)
            .attr("x", margin.left +barMargin + k*betweenbarWidth)
            .attr("y",svgHeight - margin.bottom)
            .transition()                           // 애니매이션 효과 지정
            .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
            .duration(1000)                         // 2초동안 애니매이션이 진행되도록 설정
            .attr("y", svgHeight - margin.bottom - poissonP[k]*yRatio)
            .attr("height", poissonP[k]*yRatio)
         }
}

// Poisson분포표
function poissonTable(nvalue, lambda, poissonP) {
        var table = document.getElementById("poissonTable");
        var row, header;
        var i, j, sum;

        var ncol = 4;
        var cell = new Array(4);

 
        table.style.fontSize = "13px";
//        table.style.cellPadding = "10";
    
          row = table.insertRow(0);
          row.style.height ="40px";
          row.innerHTML = "<h3>Poisson Distribution </h3>";
          row.style.textAlign = "center";

          row  = table.insertRow(1);
          row.style.height ="30px";
          for (j=0; j<1; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
          }
          cell[0].innerHTML = "lambda = "+f1(lambda);

          row  = table.insertRow(2);
          row.style.height ="30px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
          }
          for (j=0; j<ncol; j++) {
            cell[j].style.width ="80px";
          }
          cell[0].innerHTML = "x";
          cell[1].innerHTML = "P(X = x)";
          cell[2].innerHTML = "P(X <= x)";
          cell[3].innerHTML = "P(X >= x)";

          sum = 0;
          for (i=0; i<nvalue; i++) {
            row = table.insertRow(i+3);
            for (j=0; j<ncol; j++) cell[j] = row.insertCell(j)          
            cell[0].innerHTML = i;
            cell[1].innerHTML = f4(poissonP[i]);
            sum += poissonP[i];
            cell[2].innerHTML = f4(sum);
            cell[3].innerHTML = f4(1 - sum + poissonP[i]);
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            for (j=0; j<ncol; j++) cell[j].style.textAlign = "center";
          }

}

// =====================================================================================
// Geometric functions 
// =====================================================================================
//*********************************************************************************** 
//
// Geometric p value 보이고 실행하기
function showValueGeoP(newValue, valueLabel, geometricP) {
        document.getElementById("geoP").value  = f2(newValue / 100);
        bar.selectAll("*").remove();
        document.getElementById("freqGeometric").checked = false;
        removeBinomialFreq2();

        var geoP = parseFloat(d3.select("#geoP").node().value);    // 성공 rate
        if (geoP < 0.01)  geoP = 0.01;
        if (geoP > 0.99)  geoP = 0.99;
        if (geoP > 0.2) nvalue = 21;
        else if (geoP > 0.1) nvalue = 31;
        else if (geoP > 0.02) nvalue = 51;
        else nvalue = 101;

        drawGeometricBarGraph(nvalue, geoP, valueLabel, geometricP);
}


// Geometric 분포 막대그래프 함수 --------------------------------------------------
function drawGeometricBarGraph(nvalue, geoP, valueLabel, geometricP) {
         var i, avg, std, info;
         var gymin, gymax, yRatio, betweenbarWidth, barWidth, barMargin

         var xmin = 0;
         var xmax = nvalue;
         var ymin = 0;
         var ymax = 0.7;

         // 확률및 통계량 계산
         for (i=0; i<nvalue; i++) {
           valueLabel[i] = i;
           geometricP[i] = geometric_pdf(i, geoP, info)
         }

         gymin     = ymin;
         gymax     = ymax + ymax/5;  
         yRatio    = graphHeight / gymax;          // 그래프 영역과 데이터 영역의 비율
         betweenbarWidth = graphWidth / xmax;   // 막대와 막대 사이의 너비
         barWidth  = betweenbarWidth * 2 / 3;    // 막대의 너비
         barMargin = (betweenbarWidth / 3) / 2; // 왼쪽 마진

         drawBinomialAxis(gymin, gymax);
         drawBinomialLabel(nvalue, valueLabel, betweenbarWidth);

         avg  = 1 / geoP;
         std  = Math.sqrt((1-geoP)/(geoP*geoP));
 
         var title  = "Geometric Dist p = "+f1(geoP);
         bar.append("text").attr("x", margin.left).attr("y", margin.top/2).text(title)
            .attr("font-size","13pt").attr("stroke","blue").attr("text-anchor","start")
         var str = "Mean = "+f2(avg)+",  Std Dev = "+f2(std);
         bar.append("text")
            .attr("x", margin.left + graphWidth/2 - 40)
            .attr("y", svgHeight - margin.bottom/3).text(str)
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         for (var k=0; k<nvalue; k++) {
           bar.append("rect")
            .style("fill",function(d,i) {return myColor[0];})
            .attr("height",0)
            .attr("width",barWidth)
            .attr("x", margin.left +barMargin + k*betweenbarWidth)
            .attr("y",svgHeight - margin.bottom)
            .transition()                           // 애니매이션 효과 지정
            .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
            .duration(1000)                         // 2초동안 애니매이션이 진행되도록 설정
            .attr("y", svgHeight - margin.bottom - geometricP[k]*yRatio)
            .attr("height", geometricP[k]*yRatio)
         }
}

// Geometric 분포표
function geometricTable(nvalue, geoP, geometricP) {
        var table = document.getElementById("geometricTable");
        var row, header;
        var i, j, sum;

        var ncol = 4;
        var cell = new Array(4);

        table.style.fontSize = "13px";
    
          row = table.insertRow(0);
          row.style.height ="40px";
          row.innerHTML = "<h3>Geometric Distribution </h3>";
          row.style.textAlign = "center";

          row  = table.insertRow(1);
          row.style.height ="30px";
          for (j=0; j<1; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
          }
          cell[0].innerHTML = "p = "+f1(geoP);

          row  = table.insertRow(2);
          row.style.height ="30px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
          }
          for (j=0; j<ncol; j++) {
            cell[j].style.width ="80px";
          }
          cell[0].innerHTML = "x";
          cell[1].innerHTML = "P(X = x)";
          cell[2].innerHTML = "P(X <= x)";
          cell[3].innerHTML = "P(X >= x)";

          sum = 0;
          for (i=0; i<nvalue; i++) {
            row = table.insertRow(i+3);
            for (j=0; j<ncol; j++) cell[j] = row.insertCell(j)          
            cell[0].innerHTML = i;
            cell[1].innerHTML = f4(geometricP[i]);
            sum += geometricP[i];
            cell[2].innerHTML = f4(sum);
            cell[3].innerHTML = f4(1 - sum + geometricP[i]);
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            for (j=0; j<ncol; j++) cell[j].style.textAlign = "center";
          }

}

// =====================================================================================
// HyperGeometric functions 
// =====================================================================================

// 초기하분포 n 슬라이드바 functions
function showValueHyperGeo(newValue, valueLabel, hyperGeoP) {

        var NN = parseFloat(d3.select("#NN").node().value);    // lot 크기 
        var nn = parseFloat(d3.select("#nn").node().value);    // sample 크기 
        if (nn > NN) newValue = d3.select("#NN").node().value;

        document.getElementById("nn").value = newValue;

        drawHyperGeoBarGraph(valueLabel, hyperGeoP, xmin, xmax, ymin, ymax);
}

// 초기하분포 막대그래프 함수 --------------------------------------------------
function drawHyperGeoBarGraph(label, hyperGeoP, xmin, xmax, ymin, ymax) {
         var info;

         bar.selectAll("*").remove();
         document.getElementById("freqHyperG").checked = false;
         checkFreq = false;
         removeBinomialFreq2();

         var NN = parseFloat(d3.select("#NN").node().value);    // lot 크기 
         var DD = parseFloat(d3.select("#DD").node().value);    // defect 크기 
         var nn = parseFloat(d3.select("#nn").node().value);    // sample size
         if (DD > NN)  DD = NN;  
         if (nn < 1 )  nn = 1;
         if (nn > NN)  nn = NN;
   
         var nvalue    = nn + 1;
         var gymin     = ymin;
         var gymax     = ymax + ymax/5;  
         var yRatio    = graphHeight / gymax;          // 그래프 영역과 데이터 영역의 비율
         var betweenbarWidth = graphWidth / nvalue;   // 막대와 막대 사이의 너비
         var barWidth  = betweenbarWidth * 2 / 3;    // 막대의 너비
         var barMargin = (betweenbarWidth / 3) / 2; // 왼쪽 마진

         var title  = "HyperGeometric Dist N = "+NN.toString()+", D = "+DD.toString()+", n = "+nn.toString() ;
         bar.append("text").attr("x", margin.left).attr("y", margin.top/2).text(title)
            .attr("font-size","13pt").attr("stroke","blue").attr("text-anchor","start")
         var avg  = nn * DD / NN;
         var std  = Math.sqrt(nn*DD/NN*(1-DD/NN));
         var str = "Mean = "+f2(avg)+",  Std Dev = "+f2(std);
         bar.append("text")
            .attr("x", margin.left + graphWidth/2 - 40)
            .attr("y", svgHeight - margin.bottom/3).text(str)
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         // 확률및 통계량 계산
         for (var i=0; i<nvalue; i++) {
           label[i] = i;
           hyperGeoP[i] = hypergeo_pdf( i, nn, DD, NN, info )
         }

         drawBinomialAxis(gymin, gymax);
         drawBinomialLabel(nvalue, label, betweenbarWidth);

         for (var k=0; k<nvalue; k++) {
         bar.append("rect")
            .style("fill",function(d,i) {return myColor[0];})
            .attr("height",0)
            .attr("width",barWidth)
            .attr("x", margin.left +barMargin + k*betweenbarWidth)
            .attr("y",svgHeight - margin.bottom)
            .transition()                           // 애니매이션 효과 지정
            .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
            .duration(1000)                         // 2초동안 애니매이션이 진행되도록 설정
            .attr("y", svgHeight - margin.bottom - hyperGeoP[k]*yRatio)
            .attr("height", hyperGeoP[k]*yRatio)
         }
}

// 초기하분포표
function hyperGeoTable(NN, DD, nn, hyperGeoP) {
        var table = document.getElementById("hyperGeoTable");
        var row, header;
        var i, j, sum;

        var nvalue = nn + 1;
        var ncol = 4;
        var cell = new Array(4);

 
        table.style.fontSize = "13px";
//        table.style.cellPadding = "10";
    
          row = table.insertRow(0);
          row.style.height ="40px";
          row.innerHTML = "<h3>HyperGeometric Distribution </h3>";
          row.style.textAlign = "center";

          row  = table.insertRow(1);
          row.style.height ="30px";
          for (j=0; j<3; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
          }
          cell[0].innerHTML = "N = "+NN;
          cell[1].innerHTML = "D = "+DD;
          cell[2].innerHTML = "n = "+nn;

          row  = table.insertRow(2);
          row.style.height ="30px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
          }
          for (j=0; j<ncol; j++) {
            cell[j].style.width ="80px";
          }
          cell[0].innerHTML = "x";
          cell[1].innerHTML = "P(X = x)";
          cell[2].innerHTML = "P(X <= x)";
          cell[3].innerHTML = "P(X >= x)";

          sum = 0;
          for (i=0; i<nvalue; i++) {
            row = table.insertRow(i+3);
            for (j=0; j<ncol; j++) cell[j] = row.insertCell(j)          
            cell[0].innerHTML = i;
            cell[1].innerHTML = f4(hyperGeoP[i]);
            sum += hyperGeoP[i];
            cell[2].innerHTML = f4(sum);
            cell[3].innerHTML = f4(1 - sum + hyperGeoP[i]);
            cell[0].style.backgroundColor = "#eee";
            cell[0].style.textAlign = "center";
            for (j=0; j<ncol; j++) cell[j].style.textAlign = "center";
          }

}

// ===============================================================================
// Exponential-distribution function
// ===============================================================================

function showValueExponential0(newValue) {
       var a, b, c, d, e, f, g, h, info;

       bar.selectAll("*").remove();
       document.getElementById("explambda").value  = newValue/10;
       var lambda = parseFloat(d3.select("#explambda").node().value); 
       if (lambda < 0.1) lambda = 0.1;
       if (lambda > 10) lambda = 10;

       if (radioType == 1) {         
          a = parseFloat(d3.select("#a").node().value); 
          b = parseFloat(d3.select("#b").node().value);
          c = exponential_cdf(b, lambda, info) - exponential_cdf(a, lambda, info);
          d3.select("#c").node().value = f4(c);
          drawExponentialGraph(lambda, a, b, c);
       }          
       else if (radioType == 2) {
          e = parseFloat(d3.select("#e").node().value); 
          d = exponential_inv(e, lambda, info);
          d3.select("#d").node().value = f4(d);
          drawExponentialGraph(lambda, 0, d, e);
       }
       else if (radioType == 3) {
          h = parseFloat(d3.select("#h").node().value); 
          g = exponential_inv(1-(1-h)/2, lambda, info);
          f = exponential_inv((1-h)/2, lambda, info);
          d3.select("#f").node().value = f4(f);
          d3.select("#g").node().value = f4(g);
          drawExponentialGraph(lambda, f, g, h); 
       }
}

function showValueExponential1(newValue) {
       if (radioType == 1) {
          var a, b, c, info;

          bar.selectAll("*").remove();
          var lambda = parseFloat(d3.select("#explambda").node().value); 
         if (lambda < 0.1) lambda = 0.1;
         if (lambda > 10) lambda = 10;

          document.getElementById("a").value  = f2(newValue/(300/gxmax));

          a = parseFloat(d3.select("#a").node().value); 
          if ( a < 0 ) a = 0.00001;   
          b = parseFloat(d3.select("#b").node().value);
          if ( b > 100 ) b = 100;
          if ( a > b ) {
            c = 0;
            a = b;
            document.getElementById("a").value = b.toString();
          } 
          else c = exponential_cdf(b, lambda, info) - exponential_cdf(a, lambda, info);
          d3.select("#c").node().value = f4(c);
          drawExponentialGraph(lambda, a, b, c);
       }          
}


function showValueExponential2(newValue) {
      if (radioType == 1) {
          var a, b, c, info;
          bar.selectAll("*").remove();
          var lambda = parseFloat(d3.select("#explambda").node().value); 
          if (lambda < 0.1) lambda = 0.1;
          if (lambda > 10) lambda = 10;
 
          document.getElementById("b").value  = f2(newValue/(300/gxmax));

          a = parseFloat(d3.select("#a").node().value); 
          if ( a < 0 ) a = 0.00001;   
          b = parseFloat(d3.select("#b").node().value);
          if ( b > 100 ) b = 100;
          if ( a > b ) {
            c = 0;
            b = a;
            document.getElementById("b").value = a.toString();
          }
          else c = exponential_cdf(b, lambda, info) - exponential_cdf(a, lambda, info);
          d3.select("#c").node().value = f4(c);
          drawExponentialGraph(lambda, a, b, c);
       }       
}

// Exponential분포 inverse  그리기 - 단측
function showValueExponential3(newValue) {
       if (radioType == 2) {
          var d, e, info;
          bar.selectAll("*").remove();
          var lambda = parseFloat(d3.select("#explambda").node().value); 
          if (lambda < 0.1) lambda = 0.1;
          if (lambda > 10) lambda = 10;

          document.getElementById("e").value  = newValue/100;
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.99999) d = 4;
          else if (e < 0.00001) d = - 4;
          else d = exponential_inv(e, lambda, info);
          d3.select("#d").node().value = f4(d);
          drawExponentialGraph(lambda, 0, d, e);
       }
} 

// Exponential분포 inverse  그리기  - 양측
function showValueExponential4(newValue) {   
       if (radioType == 3) {
          var h, g, f;
          bar.selectAll("*").remove();
          var lambda = parseFloat(d3.select("#explambda").node().value); 
          if (lambda < 0.1) lambda = 0.1;
          if (lambda > 10) lambda = 10;

          document.getElementById("h").value  = newValue/100;
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.999999) {
             f = 0;
             g = 100;
          }
          else {
             g = exponential_inv(1-(1-h)/2, lambda, info);
             f = exponential_inv((1-h)/2, lambda, info);
          }
          d3.select("#f").node().value = f4(f);
          d3.select("#g").node().value = f4(g);
          drawExponentialGraph(lambda, f, g, h); 
       }
}

// Exponential분포 그래프 함수 --------------------------------------------------
function drawExponentialGraph(lambda, a, b, prob) {
         var info;
         var margin  = {top: 50, bottom: 50, left: 50, right: 20};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, info;
         var ymax;

         lambda = parseFloat(d3.select("#explambda").node().value); 
         if (lambda < 0.1) { lambda = 0.1; d3.select("#explambda").node().value = f1(lambda);}
         else if (lambda > 10)  { lambda = 10; d3.select("#explambda").node().value = f1(lambda)};
         gxmin   = 0;
         gymin   = 0;
         if (lambda <= 0.2)  { gxmax = 5 ;  ymax = 5 }
         else if (lambda <= 1.0) { gxmax = 5 ;  ymax = 3 }
         else if (lambda < 2)    { gxmax = 15;  ymax = 0.8 }
         else if (lambda < 5)    { gxmax = 20; ymax = 0.7 }
         else {gxmax = 40; ymax = 0.4};
         gxrange = gxmax - gxmin;
         gymax   = ymax + ymax/5; 
         gyrange = gymax - gymin;

         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = exponential_pdf(x[0], lambda, info);
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = exponential_pdf(x[k], lambda, info);
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke","black").attr("stroke-width","2px");
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = exponential_pdf(tempx, lambda, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           bar.append("line")
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","#0055FF")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         bar.append("text")
            .attr("x", margin.left + graphWidth2*(a-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(a))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         bar.append("text")
            .attr("x", margin.left + graphWidth2*(b-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(b))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
 
         x1 = margin.left + graphWidth2*(b-gxmin)/gxrange + 20;
//         if (radioType == 2) x1 = margin.left + graphWidth2*((-2+b)/2-gxmin)/gxrange;
         y1 = svgHeight2 - margin.bottom - graphHeight2/10 + 10;
         bar.append("text")
            .attr("x", x1)
            .attr("y", y1)
            .text(f4(prob))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")

}     


// =====================================================================================
// Normal functions 
// =====================================================================================

// 정규 모집단의 Dot Graph Simulation =================================================================================
function showDotGraphNormalP(nobs, stat) {
      var i, j, nint, step, buffer, gxmin, gxmax, xrange, nvalue;
      var sum, sqsum, temp, tempi, avg, std;
      var min, max, median, Q1, Q3;
      var bins       = new Array(100)

      var dataSet    = new Array(nobs);
      var index      = new Array(nobs);
      var dataA      = new Array(nobs);
      var tdata      = new Array(nobs);
      var tdataY     = new Array(nobs);
      var tcolor     = new Array(nobs);
      var dataValue  = new Array(nobs);
      var dvalueFreq = new Array(nobs);

      //  data generation
      generator = d3.randomNormal(0,1)  
      for (var i=0; i<nobs; i++) dataSet[i] = generator();

      nint    = 35;
      step    = 7/nint;
      bins[0] = -3.5;

      for (k=1; k<=nint+1; k++) bins[k] = bins[k-1] + step;
      buffer = (bins[nint] - bins[0] + 2*step) / 20;
      gxmin  = bins[0]    - step - buffer;
      gxmax  = bins[nint] + step + buffer;
      xrange = gxmax - gxmin;

      // 통계량 계산
      for (i=0; i<nobs; i++) tdata[i] = dataSet[i];
      sum = 0;
      for (i=0; i<nobs; i++) {sum += dataSet[i];}
      avg = sum / nobs;
      sqsum = 0;
      for (i=0; i<nobs; i++) {
        temp = dataSet[i]-avg;
        sqsum += temp*temp;
      }
      std = Math.sqrt(sqsum / nobs);
  
      tdata.sort(function(a,b){return a-b})
      min    = tdata[0];
      max    = tdata[nobs-1];
      median = d3.quantile(tdata, 0.5);
      Q1     = d3.quantile(tdata, 0.25);
      Q3     = d3.quantile(tdata, 0.75);

      // data regenaration by bins interval
      for (i=0; i<nobs; i++) {
          if(dataSet[i] < bins[0])    {dataA[i] = bins[0] - step; break}
          for (k=1; k<=nint; k++) {
            if (dataSet[i] >= bins[k-1] && dataSet[i]<bins[k]) {dataA[i] = bins[k-1]; break;}
          }
          if (dataSet[i] >= bins[nint]) dataA[i] = bins[nint];
      }

      // Sorting and indexing data in ascending order
      for (i=0; i<nobs; i++) index[i] = i;
      for (i=0; i<nobs-1; i++) {
        for (j=i; j<nobs; j++) {
          if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  tempi    = index[i];
              dataA[i] = dataA[j];  index[i] = index[j];
              dataA[j] = temp;      index[j] = tempi;  
          }
        }
      } 

      // Counting the number of value 
      for(i=0; i<nobs; i++) {dvalueFreq[i]=0} ;
      nvalue = 0;
      dataValue[nvalue]  = dataA[0];  
      for (i=1; i<nobs; i++) {
        if (dataA[i] > dataA[i-1]) {
          nvalue++;
          dataValue[nvalue] = dataA[i];
        }
      }
      
      // Rearrange to original data with dataA and dataY in ascending
      for (i=0; i<nobs; i++) tdata[i]  = dataA[index[i]];
      for (j=0; j<=nvalue; j++) dvalueFreq[j] = 0;
      for (i=0; i<nobs; i++) {
        for (j=0; j<=nvalue; j++) {
          if(tdata[i] == dataValue[j]) {
            dvalueFreq[j]++; 
            tdataY[i] = dvalueFreq[j];
            tcolor[i] = j;
            break;
          };
        }
      }

      // Maximum of frequency
      freqMaxP = dvalueFreq[0];
      for (j=1; j<=nvalue; j++) {
        if (dvalueFreq[j] > freqMaxP) freqMaxP = dvalueFreq[j];
      }

      stat[1] = avg;
      stat[2] = std;
      stat[3] = min;
      stat[4] = Q1;
      stat[5] = median;
      stat[6] = Q3;
      stat[7] = max;
      stat[8] = freqMaxP;
      stat[9] = gxmin;
      stat[10]= gxmax;

      // 점그래프
      drawDotGraphNormal(nobs, tdata, tdataY, tcolor, 0, gxmin,gxmax);

}


// 점그래프 함수
function drawDotGraphNormal(obs,tdata,tdataY,tcolor, start, gxmin,gxmax) { 
         var xrange = gxmax - gxmin;
         // x 축
         var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
         var ty = start + margin.top + graphHeight;
         dot.append("g")
            .attr("transform","translate("+margin.left+","+ty+")")
            .call(d3.axisBottom(xScale))                  // 눈금을 표시할 함수 호출

         var cx = new Array(obs);
         for (i=0; i<obs; i++) cx[i] = margin.left + graphWidth*Math.random();
         dot.selectAll("circle")
            .data(tdata)
            .enter()
            .append("circle")
            .attr("cx", function(d,i){ return cx[i];} )
            .attr("cy", start + margin.top  + 10)
            .transition()                           // 애니매이션 효과 지정
            .delay(function(d,i) {return i*10;})   // 0.5초마다 그리도록 대기시간 설정
            .duration(100)                         // 1초동안 애니매이션이 진행되도록 설정
            .attr("r", 4)
            .attr("cx", function(d,i){ return margin.left+graphWidth*(d-gxmin)/xrange; } )
            .attr("cy", function(d,i){ return start+ margin.top + graphHeight - tdataY[i]*8; } )
            .attr("class","circleP")
            .style("fill",function(d,i){ return myColor[tcolor[i]%100]; } )
}

// 통계량 표시 함수
function drawStatNormal(stat, start) {
        var avg      = stat[1];
        var std      = stat[2];
        var freqMax  = stat[8];
        var gxmin    = stat[9];
        var gxmax    = stat[10];
        var xrange   = gxmax - gxmin;
        var ty       = start + margin.top  + graphHeight + 25;
        var avgx     = margin.left + graphWidth*(avg-gxmin)/xrange;
        var stdmx    = margin.left + graphWidth*(avg-std-gxmin)/xrange;
        var stdpx    = margin.left + graphWidth*(avg+std-gxmin)/xrange;

        dot.append("line")
           .attr("class","mean")
           .attr("x1",avgx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",start + margin.top + graphHeight - freqMax*8 - 40) 
        dot.append("circle")
           .attr("class","mean")
           .attr("cx",avgx)
           .attr("cy",ty)
           .attr("r",3)
        dot.append("line")
           .attr("class","mean")
           .attr("x1",stdmx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",ty)
        dot.append("line")
           .attr("class","mean")
           .attr("x1",stdpx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",ty)
        dot.append("circle")
           .attr("class","mean")
           .attr("cx",stdmx)
           .attr("cy",ty)
           .attr("r",3)
        dot.append("circle")
           .attr("class","mean")
           .attr("cx",stdpx)
           .attr("cy",ty)
           .attr("r",3)
        dot.append("text")
           .attr("class","mean")
           .attr("x", avgx)
           .attr("y", ty + 15)
           .text("mean="+f2(avg))
           .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
        dot.append("text")
           .attr("class","mean")
           .attr("x", stdpx+10)
           .attr("y", ty+15)
           .text("std dev="+f2(std))
           .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
}
     
// 상자그래프 표시 함수
function drawBoxNormal(stat, start) {
        var min      = stat[3];
        var Q1       = stat[4];
        var median   = stat[5];
        var Q3       = stat[6];
        var max      = stat[7];      
        var gxmin    = stat[9];
        var gxmax    = stat[10];

        var xrange   = gxmax - gxmin;
        var x1,x2,y1,y2,width,height;
        var lineHeight = 25;
        var IQR = Q3 - Q1;

        x1 = margin.left + graphWidth*(min-gxmin)/xrange;
        y1 = start + margin.top  + graphHeight + 45;
        x2 = x1;
        y2 = y1 + lineHeight;
        dot.append("line")
           .attr("class","mean")
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2)

        dot.append("text")
           .attr("x", x1)
           .attr("y", y1-3)
           .text("min="+f2(min))
           .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

        x2 = x1 + graphWidth*(Q1-min)/xrange;
        dot.append("line")
           .attr("class","mean")
           .attr("x1",x1)
           .attr("y1",y1+lineHeight/2)
           .attr("x2",x2)
           .attr("y2",y1+lineHeight/2)

        x1 = margin.left + graphWidth*(max-gxmin)/xrange;
        x2 = x1;
        dot.append("line")
           .attr("class","mean")
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2) 

        dot.append("text")
          .attr("x", x1)
          .attr("y", y1-3)
          .text("max="+f2(max))
          .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

        x1 = margin.left + graphWidth*(Q1-gxmin)/xrange;
        width = graphWidth*IQR/xrange;
        height = lineHeight;

        dot.append("rect")
           .attr("class","mean")
           .attr("x",x1)
           .attr("y",y1)
           .attr("width",width)
           .attr("height",height)
           .style("fill","yellow")
 
        dot.append("text")
           .attr("x", x1)
           .attr("y", y2+lineHeight/2)
           .text("Q1="+f2(Q1))
           .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

        dot.append("text")
           .attr("x", x1+width)
           .attr("y", y2+lineHeight/2)
           .text("Q3="+f2(Q3))
           .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

        x1 = margin.left + graphWidth*(Q3-gxmin)/xrange;
        x2 = x1 + graphWidth*(max-Q3)/xrange;
        dot.append("line")
           .attr("class","mean")
           .attr("x1",x1)
           .attr("y1",y1+lineHeight/2)
           .attr("x2",x2)
           .attr("y2",y1+lineHeight/2)

        x1 = margin.left + graphWidth*(median-gxmin)/xrange;
        x2 = x1;
        dot.append("line")
           .attr("class","mean")
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2)

        dot.append("text")
           .attr("x", x1)
           .attr("y", y2+lineHeight/2+10)
           .text("Med="+f2(median))
           .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

}

// 평균 상자그림 제거
function removeMeanNormal() {
	dot.selectAll("circle.mean").remove();
	dot.selectAll("text.mean").remove();
	dot.selectAll("line.mean").remove();
	dot.selectAll("rect.mean").remove();
}


// 정규분포 inverse  그리기 - 단측
   
function showValueNormal1(newValue) {
       if (radioType == 1) {
          var a, b, c;
          bar.selectAll("*").remove();
//          bar.selectAll("text.mean").remove();
//          bar.selectAll("line.lineb").remove();
          var mu    = parseFloat(d3.select("#mu").node().value); 
          var sigma = parseFloat(d3.select("#sigma").node().value); 
          document.getElementById("a").value  = f2(mu + sigma*(newValue-400)/100);
          a = parseFloat(d3.select("#a").node().value); 
          if ( a < mu-4*sigma ) a = mu - 4*sigma;   
          b = parseFloat(d3.select("#b").node().value);
          if ( b > mu+4*sigma ) b = mu + 4*sigma;
          if ( a > b ) {
            c = 0;
            a = b;
            document.getElementById("a").value = b.toString();
            document.getElementById("range1Normal").value = (400+100*(b-mu)/sigma).toString();
          } 
          else c = stdnormal_cdf((b-mu)/sigma) - stdnormal_cdf((a-mu)/sigma);
          d3.select("#c").node().value = f4(c);
          drawNormalGraph(mu, sigma, a, b, c);
       }       
}


function showValueNormal2(newValue) {
      if (radioType == 1) {
          var a, b, c;
          bar.selectAll("*").remove();
//          bar.selectAll("text.mean").remove();
//          bar.selectAll("line.lineb").remove();
          var mu    = parseFloat(d3.select("#mu").node().value); 
          var sigma = parseFloat(d3.select("#sigma").node().value); 
          document.getElementById("b").value  = f2(mu + sigma*(newValue-400)/100);
          a = parseFloat(d3.select("#a").node().value); 
          if ( a < mu-4*sigma ) a = mu - 4*sigma;   
          b = parseFloat(d3.select("#b").node().value);
          if ( b > mu+4*sigma ) b = mu + 4*sigma;
          if ( a > b ) {
            c = 0;
            b = a;
            document.getElementById("b").value = a.toString();
            document.getElementById("range2Normal").value = (400+100*(b-mu)/sigma).toString();
          }
          else c = stdnormal_cdf((b-mu)/sigma) - stdnormal_cdf((a-mu)/sigma);
          d3.select("#c").node().value = f4(c);
          drawNormalGraph(mu, sigma, a, b, c);
       }       
}
   
// 정규분포 inverse  그리기 - 단측
function showValueNormal3(newValue) {
       if (radioType == 2) {
          var d,e;
          bar.selectAll("*").remove();
//          bar.selectAll("text.mean").remove();
//          bar.selectAll("line.lineb").remove();
          var mu    = parseFloat(d3.select("#mu").node().value); 
          var sigma = parseFloat(d3.select("#sigma").node().value); 
          document.getElementById("e").value  = newValue/100;
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.99999) d = mu + 4*sigma;
          else if (e < 0.00001) d = mu - 4*sigma;
          else d = mu + sigma*stdnormal_inv(e);
          d3.select("#d").node().value = f4(d);
          drawNormalGraph(mu, sigma, mu-4*sigma, d, e);
       }
} 
// 정규분포 inverse  그리기  - 양측
function showValueNormal4(newValue) {
       if (radioType == 3) {
          var h, g, f;
          bar.selectAll("*").remove();
//          bar.selectAll("text.mean").remove();
//          bar.selectAll("line.lineb").remove();
          var mu    = parseFloat(d3.select("#mu").node().value); 
          var sigma = parseFloat(d3.select("#sigma").node().value); 
          document.getElementById("h").value  = newValue/100;
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.999999) {
             f = mu - 4*sigma;
             g = mu + 4*sigma;
          }
          else {
             g = mu + sigma*stdnormal_inv(1-(1-h)/2);
             f = mu - sigma*stdnormal_inv(1-(1-h)/2);
          }
          d3.select("#f").node().value = f4(f);
          d3.select("#g").node().value = f4(g);
          drawNormalGraph(mu, sigma, f, g, h); 
       }
}

      
// 축 그리기
function drawAxisNormal(top, bottom, left, right, gxmin, gxmax, gymin, gymax) {
        var margin  = {top, bottom, left, right};
        margin.top    = top;
        margin.bottom = bottom;
        margin.left   = left;
        margin.right  = right;

        var graphWidth2   = svgWidth2 - margin.left - margin.right;
        var graphHeight2  = svgHeight2 - margin.top - margin.bottom;

        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth2]);
        var yScale = d3.scaleLinear().domain([gymax,0]).range([0,graphHeight2]);
        var ty =  margin.top + graphHeight2;
        d3.select("#chart")
          .append("g")
          .attr("transform","translate("+margin.left+","+ty+")")
          .call(d3.axisBottom(xScale))     
        d3.select("#chart")
          .append("g")
          .attr("transform","translate("+margin.left+","+margin.top+")")
          .call(d3.axisLeft(yScale))                  // 눈금을 표시할 함수 호출
}

// 정규분포 그래프 함수 --------------------------------------------------
function drawNormalGraph(mu, sigma, a, b, prob) {
         var margin  = {top: 50, bottom: 50, left: 50, right: 20};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2
         var gxmin   = mu - 4*sigma;
         var gxmax   = mu + 4*sigma;
         var gxrange = gxmax - gxmin;
         var gymin   = 0;
         var ymax    = 1/(sigma*Math.sqrt(2*Math.PI));
         var gymax   = ymax + ymax/5; 
         var gyrange = gymax - gymin;

         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = normal_pdf(mu, sigma, x[0] );
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = normal_pdf(mu, sigma, x[k] );
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke","black").attr("stroke-width","2px");
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = normal_pdf(mu, sigma, tempx );
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           bar.append("line")
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","#0055FF")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         bar.append("text")
            .attr("x", margin.left + graphWidth2*(a-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(a))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         bar.append("text")
            .attr("x", margin.left + graphWidth2*(b-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(b))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
 
         x1 = margin.left + graphWidth2*(b-gxmin)/gxrange + 20;
//         if (radioType == 2) x1 = margin.left + graphWidth2*((-2+b)/2-gxmin)/gxrange;
         y1 = svgHeight2 - margin.bottom - graphHeight2/10+10;
         bar.append("text")
            .attr("x", x1)
            .attr("y", y1)
            .text(f4(prob))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")

}     

// ==========================================================================
// t-distribution function
// ==========================================================================

function showValueT0(newValue) {
       var a, b, c, d, e, f, g, h, info;

       bar.selectAll("*").remove();
       if(checkNormal) {
             drawStdNormalGraph();
             document.getElementById("normalGraph").checked = true;
       }
       else document.getElementById("normalGraph").checked = false;

       document.getElementById("dft").value  = newValue;
       var df = parseFloat(d3.select("#dft").node().value); 

       if (radioType == 1) {         
          a = parseFloat(d3.select("#a").node().value); 
          b = parseFloat(d3.select("#b").node().value);
          c = t_cdf(b, df, info) - t_cdf(a, df, info);
          d3.select("#c").node().value = f4(c);
          drawTdistGraph(df, a, b, c);
       }          
       else if (radioType == 2) {
          e = parseFloat(d3.select("#e").node().value); 
          d = t_inv(e, df, info);
          d3.select("#d").node().value = f4(d);
          drawTdistGraph(df, -5, d, e);
       }
       else if (radioType == 3) {
          h = parseFloat(d3.select("#h").node().value); 
          g = t_inv(1-(1-h)/2, df, info);
          f = -t_inv(1-(1-h)/2, df, info);
          d3.select("#f").node().value = f4(f);
          d3.select("#g").node().value = f4(g);
          drawTdistGraph(df, f, g, h); 
       }
}

function showValueT1(newValue) {
       if (radioType == 1) {
          var a, b, c, info;

          bar.selectAll("*").remove();
          var df = parseFloat(d3.select("#dft").node().value); 
          document.getElementById("a").value  = f2((newValue-500)/100);
          a = parseFloat(d3.select("#a").node().value); 
          b = parseFloat(d3.select("#b").node().value);
          if ( a > b ) {
            c = 0;
            a = b;
            document.getElementById("a").value = b.toString();
            document.getElementById("range1T").value = (500+100*b).toString();
          } 
          else c = t_cdf(b, df, info) - t_cdf(a, df, info);
          d3.select("#c").node().value = f4(c);
          if ( a < -5 ) a = - 5;   
          if ( b > 5 ) b = 5;
          drawTdistGraph(df, a, b, c);
       }          
}


function showValueT2(newValue) {
      if (radioType == 1) {
          var a, b, c, info;
          bar.selectAll("*").remove();
          var df = parseFloat(d3.select("#dft").node().value); 
          document.getElementById("b").value  = f2((newValue-500)/100);
          a = parseFloat(d3.select("#a").node().value); 
          b = parseFloat(d3.select("#b").node().value);
          if ( a > b ) {
            c = 0;
            b = a;
            document.getElementById("b").value = a.toString();
            document.getElementById("range2T").value = (500+100*b).toString();
          }
          else c = t_cdf(b, df, info) - t_cdf(a, df, info);
          d3.select("#c").node().value = f4(c);
          if ( a < -5 ) a = - 5;   
          if ( b > 5 ) b = 5;
          drawTdistGraph(df, a, b, c);
       }       
}

// t분포 inverse  그리기 - 단측
function showValueT3(newValue) {
       if (radioType == 2) {
          var d, e, info;
          bar.selectAll("*").remove();
          var df = parseFloat(d3.select("#dft").node().value); 
          document.getElementById("e").value  = newValue/100;
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.99999) d = 5;
          else if (e < 0.00001) d = - 5;
          else d = t_inv(e, df, info);
          d3.select("#d").node().value = f4(d);
          drawTdistGraph(df, -5, d, e);
       }
} 

// t분포 inverse  그리기  - 양측
function showValueT4(newValue) {   
       if (radioType == 3) {
          var h, g, f;
          bar.selectAll("*").remove();
          var df = parseFloat(d3.select("#dft").node().value); 
          document.getElementById("h").value  = newValue/100;
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.999999) {
             f = - 5;
             g = 5;
          }
          else {
             g = t_inv(1-(1-h)/2, df, info);
             f = -t_inv(1-(1-h)/2, df, info);
          }
          d3.select("#f").node().value = f4(f);
          d3.select("#g").node().value = f4(g);
          drawTdistGraph(df, f, g, h); 
       }
}

// t분포 그래프 함수 --------------------------------------------------
function drawTdistGraph(df, a, b, prob) {
         var margin  = {top: 50, bottom: 50, left: 50, right: 20};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, info;
         var gxmin   = - 5;
         var gxmax   = 5;
         var gxrange = gxmax - gxmin;
         var gymin   = 0;
         var ymax    = 1/(Math.sqrt(2*Math.PI));
         var gymax   = ymax + ymax/5; 
         var gyrange = gymax - gymin;

         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         df = parseFloat(d3.select("#dft").node().value); 
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = t_pdf(x[0], df, info);
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = t_pdf(x[k], df, info);
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke","black").attr("stroke-width","2px");
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = t_pdf(tempx, df, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           bar.append("line")
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","#0055FF")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         bar.append("text")
            .attr("x", margin.left + graphWidth2*(a-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(a))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         bar.append("text")
            .attr("x", margin.left + graphWidth2*(b-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(b))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
 
         x1 = margin.left + graphWidth2*(b-gxmin)/gxrange + 20;
//         if (radioType == 2) x1 = margin.left + graphWidth2*((-2+b)/2-gxmin)/gxrange;
         y1 = svgHeight2 - margin.bottom - graphHeight2/10 + 10;
         bar.append("text")
            .attr("x", x1)
            .attr("y", y1)
            .text(f4(prob))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")

}     

// N(0,1) 그래프 함수 --------------------------------------------------
function drawStdNormalGraph() {
         var margin  = {top: 50, bottom: 50, left: 50, right: 20};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2
         var gxmin   = - 5;
         var gxmax   = 5;
         var gxrange = gxmax - gxmin;
         var gymin   = 0;
         var ymax    = 1/(Math.sqrt(2*Math.PI));
         var gymax   = ymax + ymax/5; 
         var gyrange = gymax - gymin;

         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = normal_pdf(0, 1, x[0] );
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = normal_pdf(0, 1, x[k] );
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           bar.append("line").attr("class","lineNormal").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","red")
           x1   = x2;
           y1   = y2;    
         }
}     

//================================================================
// Chisq-distribution function
//================================================================

function showValueChisq0(newValue) {
       var a, b, c, d, e, f, g, h, info;

       bar.selectAll("*").remove();
       document.getElementById("dfchi").value  = newValue;
       var df = parseFloat(d3.select("#dfchi").node().value); 
       a = parseFloat(d3.select("#a").node().value); 
       b = parseFloat(d3.select("#b").node().value);
//       document.getElementById("rangeChi1").value  = a * (300/gxmax);
//       document.getElementById("rangeChi2").value  = b * (300/gxmax);

       if (radioType == 1) {         
          a = parseFloat(d3.select("#a").node().value); 
          b = parseFloat(d3.select("#b").node().value);
          c = chisq_cdf(b, df, info) - chisq_cdf(a, df, info);
          d3.select("#c").node().value = f4(c);
          drawChisqGraph(df, a, b, c);
       }          
       else if (radioType == 2) {
          e = parseFloat(d3.select("#e").node().value); 
          d = chisq_inv(e, df, info);
          d3.select("#d").node().value = f4(d);
          drawChisqGraph(df, 0, d, e);
       }
       else if (radioType == 3) {
          h = parseFloat(d3.select("#h").node().value); 
          g = chisq_inv(1-(1-h)/2, df, info);
          f = chisq_inv((1-h)/2, df, info);
          d3.select("#f").node().value = f4(f);
          d3.select("#g").node().value = f4(g);
          drawChisqGraph(df, f, g, h); 
       }
}

function showValueChisq1(newValue) {
       if (radioType == 1) {
          var a, b, c, info;

          bar.selectAll("*").remove();
          var df = parseFloat(d3.select("#dfchi").node().value); 
          document.getElementById("a").value  = f2(newValue/(300/gxmax));
          a = parseFloat(d3.select("#a").node().value); 
          if ( a < 0 ) a = 0.00001;   
          b = parseFloat(d3.select("#b").node().value);
          if ( b > 100 ) b = 100;
          if ( a > b ) {
            c = 0;
            a = b;
            document.getElementById("a").value = b.toString();
          } 
          else c = chisq_cdf(b, df, info) - chisq_cdf(a, df, info);
          d3.select("#c").node().value = f4(c);
          drawChisqGraph(df, a, b, c);
       }          
}


function showValueChisq2(newValue) {
      if (radioType == 1) {
          var a, b, c, info;
          bar.selectAll("*").remove();
          var df = parseFloat(d3.select("#dfchi").node().value); 
          document.getElementById("b").value  = f2(newValue/(300/gxmax));
          a = parseFloat(d3.select("#a").node().value); 
          if ( a < 0 ) a = 0.00001;   
          b = parseFloat(d3.select("#b").node().value);
          if ( b > 100 ) b = 100;
          if ( a > b ) {
            c = 0;
            b = a;
            document.getElementById("b").value = a.toString();
          }
          else c = chisq_cdf(b, df, info) - chisq_cdf(a, df, info);
          d3.select("#c").node().value = f4(c);
          drawChisqGraph(df, a, b, c);
       }       
}

// Chisq분포 inverse  그리기 - 단측
function showValueChisq3(newValue) {
       if (radioType == 2) {
          var d, e, info;
          bar.selectAll("*").remove();
          var df = parseFloat(d3.select("#dfchi").node().value); 
          document.getElementById("e").value  = newValue/100;
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.99999) d = 4;
          else if (e < 0.00001) d = - 4;
          else d = chisq_inv(e, df, info);
          d3.select("#d").node().value = f4(d);
          drawChisqGraph(df, 0, d, e);
       }
} 

// Chisq분포 inverse  그리기  - 양측
function showValueChisq4(newValue) {   
       if (radioType == 3) {
          var h, g, f;
          bar.selectAll("*").remove();
          var df = parseFloat(d3.select("#dfchi").node().value); 
          document.getElementById("h").value  = newValue/100;
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.999999) {
             f = 0;
             g = 100;
          }
          else {
             g = chisq_inv(1-(1-h)/2, df, info);
             f = chisq_inv((1-h)/2, df, info);
          }
          d3.select("#f").node().value = f4(f);
          d3.select("#g").node().value = f4(g);
          drawChisqGraph(df, f, g, h); 
       }
}

// Chisq분포 그래프 함수 --------------------------------------------------
function drawChisqGraph(df, a, b, prob) {
         var info;
         var margin  = {top: 50, bottom: 50, left: 50, right: 20};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, info;
         var ymax;

         df = parseFloat(d3.select("#dfchi").node().value); 
         gxmin   = 0;
         gymin   = 0;2
         if (df <= 3) { gxmax = 20; ymax = 1 }
         else if (df < 15) { gxmax = 30; ymax = 0.2 }
         else if (df < 50) { gxmax = 100; ymax = 0.1 }
         else { gxmax = 150; ymax = 0.1}
         gymax   = ymax + ymax/5; 
         gxrange = gxmax - gxmin;
         gyrange = gymax - gymin;
         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = chisq_pdf(x[0], df, info);
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = chisq_pdf(x[k], df, info);
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke","black").attr("stroke-width","2px");
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = chisq_pdf(tempx, df, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           bar.append("line")
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","#0055FF")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         bar.append("text")
            .attr("x", margin.left + graphWidth2*(a-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(a))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         bar.append("text")
            .attr("x", margin.left + graphWidth2*(b-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(b))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
 
         x1 = margin.left + graphWidth2*(b-gxmin)/gxrange + 20;
//         if (radioType == 2) x1 = margin.left + graphWidth2*((-2+b)/2-gxmin)/gxrange;
         y1 = svgHeight2 - margin.bottom - graphHeight2/10 + 10;
         bar.append("text")
            .attr("x", x1)
            .attr("y", y1)
            .text(f4(prob))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")

}     

//===========================================================================
// F-distribution function
//===========================================================================
function showValueF01(newValue) {
       var a, b, c, d, e, f, g, h, info;

       bar.selectAll("*").remove();
       document.getElementById("df1").value  = newValue;
       var df1 = parseFloat(d3.select("#df1").node().value);
       var df2 = parseFloat(d3.select("#df2").node().value);  

       if (radioType == 1) {         
          a = parseFloat(d3.select("#a").node().value); 
          b = parseFloat(d3.select("#b").node().value);
          c = f_cdf(b, df1, df2,  info) - f_cdf(a, df1, df2,  info);
          d3.select("#c").node().value = f4(c);
          drawFGraph(df1, df2,  a, b, c);
       }          
       else if (radioType == 2) {
          e = parseFloat(d3.select("#e").node().value); 
          d = f_inv(e, df1, df2,  info);
          d3.select("#d").node().value = f4(d);
          drawFGraph(df1, df2,  0, d, e);
       }
       else if (radioType == 3) {
          h = parseFloat(d3.select("#h").node().value); 
          g = f_inv(1-(1-h)/2, df1, df2,  info);
          f = f_inv((1-h)/2, df1, df2,  info);
          d3.select("#f").node().value = f4(f);
          d3.select("#g").node().value = f4(g);
          drawFGraph(df1, df2,  f, g, h); 
       }
}

function showValueF02(newValue) {
       var a, b, c, d, e, f, g, h, info;

       bar.selectAll("*").remove();
       document.getElementById("df2").value  = newValue;
       var df1 = parseFloat(d3.select("#df1").node().value);
       var df2 = parseFloat(d3.select("#df2").node().value);  

       if (radioType == 1) {         
          a = parseFloat(d3.select("#a").node().value); 
          b = parseFloat(d3.select("#b").node().value);
          c = f_cdf(b, df1, df2,  info) - f_cdf(a, df1, df2,  info);
          d3.select("#c").node().value = f4(c);
          drawFGraph(df1, df2,  a, b, c);
       }          
       else if (radioType == 2) {
          e = parseFloat(d3.select("#e").node().value); 
          d = f_inv(e, df1, df2,  info);
          d3.select("#d").node().value = f4(d);
          drawFGraph(df1, df2,  0, d, e);
       }
       else if (radioType == 3) {
          h = parseFloat(d3.select("#h").node().value); 
          g = f_inv(1-(1-h)/2, df1, df2,  info);
          f = f_inv((1-h)/2, df1, df2,  info);
          d3.select("#f").node().value = f4(f);
          d3.select("#g").node().value = f4(g);
          drawFGraph(df1, df2,  f, g, h); 
       }
}

function showValueF1(newValue) {
       if (radioType == 1) {
          var a, b, c, info;

          bar.selectAll("*").remove();
          var df1 = parseFloat(d3.select("#df1").node().value);
          var df2 = parseFloat(d3.select("#df2").node().value);  
          document.getElementById("a").value  = f2(newValue/10);
          a = parseFloat(d3.select("#a").node().value); 
          if ( a < 0 ) a = 0.00001;   
          b = parseFloat(d3.select("#b").node().value);
          if ( b > 100 ) b = 100;
          if ( a > b ) {
            c = 0;
            a = b;
            document.getElementById("a").value = b.toString();
            document.getElementById("range1T").value = b.toString();
          } 
          else c = f_cdf(b, df1, df2,  info) - f_cdf(a, df1, df2,  info);
          d3.select("#c").node().value = f4(c);
          drawFGraph(df1, df2,  a, b, c);
       }          
}


function showValueF2(newValue) {
      if (radioType == 1) {
          var a, b, c, info;
          bar.selectAll("*").remove();
          var df1 = parseFloat(d3.select("#df1").node().value);
          var df2 = parseFloat(d3.select("#df2").node().value);  
          document.getElementById("b").value  = f2(newValue/10);
          a = parseFloat(d3.select("#a").node().value); 
          if ( a < 0 ) a = 0.00001;   
          b = parseFloat(d3.select("#b").node().value);
          if ( b > 100 ) b = 100;
          if ( a > b ) {
            c = 0;
            b = a;
            document.getElementById("b").value = a.toString();
            document.getElementById("range2T").value = b.toString();
          }
          else c = f_cdf(b, df1, df2,  info) - f_cdf(a, df1, df2,  info);
          d3.select("#c").node().value = f4(c);
          drawFGraph(df1, df2,  a, b, c);
       }       
}

// F분포 inverse  그리기 - 단측
function showValueF3(newValue) {
       if (radioType == 2) {
          var d, e, info;
          bar.selectAll("*").remove();
          var df1 = parseFloat(d3.select("#df1").node().value);
          var df2 = parseFloat(d3.select("#df2").node().value);  
          document.getElementById("e").value  = newValue/100;
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.99999) d = 4;
          else if (e < 0.00001) d = - 4;
          else d = f_inv(e, df1, df2,  info);
          d3.select("#d").node().value = f4(d);
          drawFGraph(df1, df2,  0, d, e);
       }
} 

// F분포 inverse  그리기  - 양측
function showValueF4(newValue) {   
       if (radioType == 3) {
          var h, g, f;
          bar.selectAll("*").remove();
          var df1 = parseFloat(d3.select("#df1").node().value);
          var df2 = parseFloat(d3.select("#df2").node().value);  
          document.getElementById("h").value  = newValue/100;
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.999999) {
             f = 0;
             g = 100;
          }
          else {
             g = f_inv(1-(1-h)/2, df1, df2,  info);
             f = f_inv((1-h)/2, df1, df2,  info);
          }
          d3.select("#f").node().value = f4(f);
          d3.select("#g").node().value = f4(g);
          drawFGraph(df1, df2,  f, g, h); 
       }
}

// F분포 그래프 함수 --------------------------------------------------
function drawFGraph(df1, df2,  a, b, prob) {
         var info;
         var margin  = {top: 50, bottom: 50, left: 50, right: 20};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, info;
         var ymax, gxmin, gxmax, gxrange, gymin, gymax, gyrange;
     

         df1 = parseFloat(d3.select("#df1").node().value); 
         df2 = parseFloat(d3.select("#df2").node().value); 

         gxmin   = 0;
         gymin   = 0;
         gxmax   = 10;  
         if ( df1 <  2 ) {ymax = 2.5;}
         else if ( df1 < 50 ) ymax = 1.2;
         else  ymax = 1.5;

         gymax   = ymax + ymax/5; 
         gxrange = gxmax - gxmin;
         gyrange = gymax - gymin;
         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = f_pdf(x[0], df1, df2,  info);
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = f_pdf(x[k], df1, df2,  info);
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke","black").attr("stroke-width","2px");
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = f_pdf(tempx, df1, df2,  info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           bar.append("line")
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","#0055FF")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         bar.append("text")
            .attr("x", margin.left + graphWidth2*(a-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(a))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         bar.append("text")
            .attr("x", margin.left + graphWidth2*(b-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(b))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
 
         x1 = margin.left + graphWidth2*(b-gxmin)/gxrange + 20;
//         if (radioType == 2) x1 = margin.left + graphWidth2*((-2+b)/2-gxmin)/gxrange;
         y1 = svgHeight2 - margin.bottom - graphHeight2/10 + 10;
         bar.append("text")
            .attr("x", x1)
            .attr("y", y1)
            .text(f4(prob))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")

}     



// =====================================================================================
// sampling functions 
// =====================================================================================
// 정규확률변수 생성
function normalGenerator(nobs, dataSet) {
         var generator = d3.randomNormal(0,1) 
         for (var i=0; i<nobs; i++) {
           dataSet[i] = generator();
           if (dataSet[i] < -4) dataSet[i] = -4;
           if (dataSet[i] > 4)  dataSet[i] = 4;
         }
}

// 지수확률변수 생성
function expGenerator(nobs, dataSet) {
         var generator = d3.randomExponential(0.3)
         for (var i=0; i<nobs; i++) {
           dataSet[i] = generator();
           if (dataSet[i] > 18)  dataSet[i] = 18;
         }
}

// 모집단의 Dot Graph ================================================================
function showDotSampleP(nobs, dataSet, nint, step, bins, statP, tdata, tdataY, dataValue) {
      var i, j, k;
      var sum, sqsum, temp, avg, std;
      var min, max, median, Q1, Q3;
      var buffer, gxmin, gxmax, xrange, freqMaxP;

      var index      = new Array(nobs);
      var dataA      = new Array(nobs);
      var dvalueFreq = new Array(nobs);

      for (k=1; k<=nint+1; k++) bins[k] = bins[k-1] + step;
      buffer = (bins[nint] - bins[0] + 2*step) / 20;
      gxmin  = bins[0]    - step - buffer;
      gxmax  = bins[nint] + step + buffer;
      xrange = gxmax - gxmin;

      // 통계량 계산
      for (i=0; i<nobs; i++) tdata[i] = dataSet[i];
      sum = 0;
      for (i=0; i<nobs; i++) {sum += dataSet[i];}
      avg = sum / nobs;
      sqsum = 0;
      for (i=0; i<nobs; i++) {
        temp = dataSet[i]-avg;
        sqsum += temp*temp;
      }
      std = Math.sqrt(sqsum / nobs);
  
      tdata.sort(function(a,b){return a-b})
      min    = tdata[0];
      max    = tdata[nobs-1];
      median = d3.quantile(tdata, 0.5);
      Q1     = d3.quantile(tdata, 0.25);
      Q3     = d3.quantile(tdata, 0.75);

      // data regenaration by bins interval
      for (i=0; i<nobs; i++) {
          if(dataSet[i] < bins[0])    {dataA[i] = bins[0] - step; break}
          for (k=1; k<=nint; k++) {
            if (dataSet[i] >= bins[k-1] && dataSet[i]<bins[k]) {dataA[i] = bins[k-1]; break;}
          }
          if (dataSet[i] >= bins[nint]) dataA[i] = bins[nint];
      }

      // Sorting and indexing data in ascending order
      for (i=0; i<nobs; i++) index[i] = i;
      for (i=0; i<nobs-1; i++) {
        for (j=i; j<nobs; j++) {
          if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  tempi    = index[i];
              dataA[i] = dataA[j];  index[i] = index[j];
              dataA[j] = temp;      index[j] = tempi;  
          }
        }
      } 

      // Counting the number of value 
      for(i=0; i<nobs; i++) {dvalueFreq[i]=0} ;
      nvalue = 0;
      dataValue[nvalue]  = dataA[0];  
      for (i=1; i<nobs; i++) {
        if (dataA[i] > dataA[i-1]) {
          nvalue++;
          dataValue[nvalue] = dataA[i];
        }
      }
      
      // Rearrange to original data with dataA and dataY in ascending
      for (i=0; i<nobs; i++) tdata[i]  = dataA[index[i]];
      for (j=0; j<=nvalue; j++) dvalueFreq[j] = 0;
      for (i=0; i<nobs; i++) {
        for (j=0; j<=nvalue; j++) {
          if(tdata[i] == dataValue[j]) {
            dvalueFreq[j]++; 
            tdataY[i] = dvalueFreq[j];
            break;
          };
        }
      }

      // Maximum of frequency
      freqMaxP = dvalueFreq[0];
      for (j=1; j<=nvalue; j++) {
        if (dvalueFreq[j] > freqMaxP) freqMaxP = dvalueFreq[j];
      }

      // 점그래프
      var start = 0;
      drawDotSample(nobs, tdata, tdataY, gxmin, gxmax, start) 

      statP[0]  = nobs;
      statP[1]  = avg;
      statP[2]  = std;
      statP[3]  = dataA[0];
      statP[4]  = Q1;
      statP[5]  = median;
      statP[6]  = Q3;
      statP[7]  = dataA[nobs-1];
      statP[8]  = freqMaxP;
      statP[9]  = gxmin;
      statP[10] = gxmax;

}


// Sampling
function drawSampling(samplePercent, nobs, tdata, tdataY, nvalue, dataValue, statP, statS) {

        // 이전 그림 지우기
        removeAllSample();

        var i,j,k, start, sum, sqsum, temp, ty;
        var sobs, savg, sstd, smin, sQ1, smedian, sQ3, smax;  
        var freqMaxS; 
        var dvalueFreq = new Array(nobs); 
        var sdata  = [];
        var sdataY = [];
        var sindex = [];
        var gxmax  = statP[10];
        var gxmin  = statP[9];
        var xrange = gxmax - gxmin;

        var sobs = 0;
        for (i=0; i<nobs; i++) {
          if(Math.random() < samplePercent) {
            sdata[sobs]  = tdata[i];
            sindex[sobs] = i;
            sobs++;
          }
        }

        var str = Math.floor(samplePercent*100).toString()+"% Sample Dist (n="+sobs.toString()+")";
        dot.append("text")
           .attr("x", margin.left)
           .attr("y", svgHeight+20)
           .text(str)
           .attr("font-size","12pt").attr("stroke","#FF3500").attr("text-anchor","start")

        for (j=0; j<=nvalue; j++) dvalueFreq[j]=0;
        for (i=0; i<sobs; i++) {
          for (j=0; j<=nvalue; j++) {
            if(sdata[i] == dataValue[j]) {
              dvalueFreq[j]++; 
              sdataY[i] = dvalueFreq[j];
              break;
            };
          }
        }
 
        // Maximum of frequency
        freqMaxS = dvalueFreq[0];
        for (j=1; j<=nvalue; j++) {
          if (dvalueFreq[j] > freqMaxS) freqMaxS = dvalueFreq[j];
        }

       // draw dot graph using sample
        start = svgHeight*2/3;
        ty    = start+ margin.top + graphHeight
        dot.append("line")           
           .attr("x1",margin.left)
           .attr("y1",ty)
           .attr("x2",margin.left+graphWidth)
           .attr("y2",ty)
           .attr("stroke","#FF3500")

//        drawAxisSample(start,gxmin, gxmax);
        for (k=0; k<sobs; k++) {
          var cx1 = margin.left+graphWidth*(tdata[k]-gxmin)/xrange;
          var cy1 = margin.top + graphHeight - tdataY[k]*radius*2;
          var cx2 = margin.left+graphWidth*(sdata[k]-gxmin)/xrange;
          var cy2 = start+ margin.top + graphHeight - sdataY[k]*radius*2;

          dot.append("circle")
             .attr("fill","#FF3500").attr("stroke","black")
             .attr("cx", cx1)
             .attr("cy", cy1 )
             .transition()                           // 애니매이션 효과 지정
             .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
             .duration(2000)                         // 1초동안 애니매이션이 진행되도록 설정
             .attr("r", radius)
             .attr("cx", cx2)
             .attr("cy", cy2)
        }

        // 상자그림용 통계량 계산 after sorting
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
  
        smin    = sdata[0];
        smax    = sdata[sobs-1];
        smedian = d3.quantile(sdata, 0.5);
        sQ1     = d3.quantile(sdata, 0.25);
        sQ3     = d3.quantile(sdata, 0.75);

        if(checkMean) showMeanSample(statP, statS);

        statS[0]  = sobs;
        statS[1]  = savg;
        statS[2]  = sstd;
        statS[3]  = smin;
        statS[4]  = sQ1;
        statS[5]  = smedian;
        statS[6]  = sQ3;
        statS[7]  = smax;
        statS[8]  = freqMaxS;
        statS[9]  = gxmin;
        statS[10] = gxmax;

}


// CLT
function CLT() {      
        dot.append("text").attr("x", margin.left).attr("y", svgHeight - margin.bottom/2 + 20)
           .text("Dist of Sample Means (100 repetition)" )
           .attr("font-size","12pt").attr("stroke","#FF3500").attr("text-anchor","start")

        var niter = 3;  
        var n = new Array(30)
	n[0] = parseFloat(d3.select("#init1CLT").node().value);    // 표본크기 
	n[1] = parseFloat(d3.select("#init2CLT").node().value);    // 표본크기 
	n[2] = parseFloat(d3.select("#init3CLT").node().value);    // 표본크기 

        gxmin  = statP[9];
        gxmax  = statP[10];
        xrange = gxmax - gxmin;
        oneHeight   = (totalHeight - svgHeight) / niter; 

        var kiter = 100; // sample 반복 추출 회수
        for (var gg = 0; gg < niter; gg++) {  // 세 표본크기에 대한 표집분포

        dot.append("text")
           .attr("x", margin.left)
           .attr("y", svgHeight + gg*oneHeight)
           .text("n = "+n[gg])
           .attr("font-size","12pt").attr("stroke","#FF3500").attr("text-anchor","start")

          var sdata  = [];
          var sdataY = [];

          var avg = 0;
          for (j=0; j<=nint; j++) dvalueFreq[j]=0;     
          for (k=0; k<kiter; k++) {
            sdata[k] = 0;
            for (i=0; i<n[gg]; i++) {
              var jth = Math.floor(Math.random()*nobs);
              sdata[k]  += dataSet[jth];
            } // endof i
            sdata[k] = sdata[k] / n[gg];
            avg += sdata[k];

            if(sdata[k] < bins[0])    {dataA[k] = bins[0] - step; break}
            for (j=1; j<=nint; j++) {
              if (sdata[k] >= bins[j-1] && sdata[k]<bins[j]) {dataA[k] = bins[j-1]; break;}
            } // endof i
            if (sdata[k] >= bins[nint]) dataA[k] = bins[nint];
          } // endof k

          avg /= kiter;
          var std = 0;
          for (k=0; k<kiter; k++) {
            temp = sdata[k] - avg;
            std += temp*temp;
          }
          std = Math.sqrt(std/kiter);

          for (j=0; j<=nint; j++) dvalueFreq[j]=0;
          for (k=0; k<kiter; k++) {
            for (j=1; j<=nint; j++) {
              if(dataA[k] >= dataValue[j-1] && dataA[k] < dataValue[j]) {
                dvalueFreq[j]++; 
                sdataY[k] = dvalueFreq[j];
                break;
              };
            } // endof j
          } // endof k

          freqMax = dvalueFreq[0];
          for (k=1; k<kiter; k++) {
            if (dvalueFreq[k] > freqMax) freqMax = dvalueFreq[k];
          }

          // draw dot graph using sample
          start = svgHeight - margin.bottom/2 + gg*oneHeight;
          var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
          var ty = start + oneHeight;
          dot.append("line")            
             .attr("x1",margin.left)
             .attr("y1",ty)
             .attr("x2",margin.left+graphWidth)
             .attr("y2",ty)
             .attr("stroke","#FF3500")
           
          for (k=0; k<kiter; k++) {
            dot.append("circle")
               .attr("fill","#FF3500").attr("stroke","black")
               .transition()                           // 애니매이션 효과 지정
               .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
               .duration(2000)                         // 1초동안 애니매이션이 진행되도록 설정
               .attr("r", radius)
               .attr("cx", margin.left+graphWidth*(dataA[k]-gxmin)/xrange)
               .attr("cy", start + oneHeight - sdataY[k]*2*radius)
          } // end of k

          statS[1] = avg;
          statS[2] = std;
          statS[8] = freqMax;
          statS[9] = gxmin;
          statS[10]= gxmax;
          start    = margin.bottom/2 + (gg+1)*oneHeight;
          drawStatSample(statP, 0, 1) ;
          drawStatSample(statS, start, 2) ;
        } // endof gg

}



// 점그래프 함수
function drawDotSample(obs, tdata, tdataY, gxmin, gxmax, start) {
         var i; 
         var cx = new Array(obs);
         var xrange = gxmax - gxmin;

         drawAxisSample(start, gxmin, gxmax);
         for (i=0; i<obs; i++) cx[i] = margin.left + graphWidth*Math.random();

       if (checkSampling) {
         dot.selectAll("circle")
            .data(tdata)
            .enter()
            .append("circle")
            .attr("cx", function(d,i){ return cx[i];} )
            .attr("cy", start + margin.top  + 10)
            .transition()                           // 애니매이션 효과 지정
//            .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
//            .duration(1000)                         // 1초동안 애니매이션이 진행되도록 설정
            .attr("r", radius)
            .attr("cx", function(d,i){ return margin.left+graphWidth*(d-gxmin)/xrange; } )
            .attr("cy", function(d,i){ return start+ margin.top + graphHeight - tdataY[i]*2*radius; } )
            .attr("fill","#0055FF").attr("stroke","black")
       } else if (checkInterval) {
         dot2.selectAll("circle")
            .data(tdata)
            .enter()
            .append("circle")
            .attr("cx", function(d,i){ return cx[i];} )
            .attr("cy", start + margin.top  + 10)
            .transition()                           // 애니매이션 효과 지정
//            .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
//            .duration(1000)                         // 1초동안 애니매이션이 진행되도록 설정
            .attr("r", radius)
            .attr("cx", function(d,i){ return margin.left+graphWidth*(d-gxmin)/xrange; } )
            .attr("cy", function(d,i){ return start+ margin.top + graphHeight - tdataY[i]*2*radius; } )
            .attr("fill","#0055FF").attr("stroke","black")
       }

}

// x축 눈금 표시
function drawAxisSample(start, gxmin, gxmax) {
        var xScale = d3.scaleLinear().domain([gxmin,gxmax]).range([0,graphWidth])
        var ty = start + margin.top + graphHeight;
      if (checkSampling) {
        dot.append("g")
           .attr("transform","translate("+margin.left+","+ty+")")
           .call(d3.axisBottom(xScale))                  // 눈금을 표시할 함수 호출
      }
      else if (checkInterval) {
        dot2.append("g")
           .attr("transform","translate("+margin.left+","+ty+")")
           .call(d3.axisBottom(xScale))                  // 눈금을 표시할 함수 호출
      }
}

 
// 통계량 표시 함수
function drawStatSample(stat, start, type) {

        var avg    = stat[1];
        var std    = stat[2];
        var freqMax= stat[8];
        var gxmin  = stat[9];
        var gxmax  = stat[10];
        var xrange = gxmax - gxmin;

        if (type == 1) var strmean = "#00A2FF";
        else var strmean = "#FF3500";
        var strstd ="std dev ";
        if (type == 2 && checkSampling && checkCLT) strstd ="std err ";

        var ty    = start + margin.top  + graphHeight + 10;
        var avgx  = margin.left + graphWidth*(avg-gxmin)/xrange;
        var stdmx = margin.left + graphWidth*(avg-std-gxmin)/xrange;
        var stdpx = margin.left + graphWidth*(avg+std-gxmin)/xrange;

      if (checkSampling) {  
        dot.append("line") 
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("x1",avgx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",start + margin.top + graphHeight - freqMax*2*radius - 10) 
        dot.append("circle")
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("cx",avgx)
           .attr("cy",ty)
           .attr("r",2)
        dot.append("line")
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("x1",stdmx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",ty)
        dot.append("line")
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("x1",stdpx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",ty)
        dot.append("circle")
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("cx",stdmx)
           .attr("cy",ty)
           .attr("r",2)
        dot.append("circle")
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("cx",stdpx)
           .attr("cy",ty)
           .attr("r",2)
        dot.append("text")
           .attr("class","meanP")      
           .attr("font-size","8pt")
           .attr("stroke",strmean)
           .attr("x", avgx-28)
           .attr("y", ty + 15)
           .text("mean="+f2(avg))
        dot.append("text")
           .attr("class","meanP")      
           .attr("font-size","8pt")
           .attr("stroke",strmean)
           .attr("x", stdpx+10)
           .attr("y", ty+5)
           .text(strstd+f2(std))
      }

}
     
// 상자그래프 표시 함수
function drawBoxSample(stat, start, type) {
  
        if (type == 1) var strmean = "#00A2FF";   // type = 1 for population
        else var strmean = "#FF3500";             // type = 2 for sample

        var avg    = stat[1];
        var std    = stat[2];
        var min    = stat[3];
        var Q1     = stat[4];
        var median = stat[5];
        var Q3     = stat[6];
        var max    = stat[7];
        var freqMax= stat[8];
        var gxmin  = stat[9];
        var gxmax  = stat[10];
        var xrange = gxmax - gxmin;

        var x1,x2,y1,y2,width,height;
        var lineHeight = 25;
        var IQR = Q3 - Q1;

        x1 = margin.left + graphWidth*(min-gxmin)/xrange;
        y1 = start + margin.top  + graphHeight + 45;
        x2 = x1;
        y2 = y1 + lineHeight;
        dot.append("line")
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2)

        dot.append("text")
           .attr("class","meanP")      
           .attr("font-size","8pt")
           .attr("stroke",strmean)
           .attr("x", x2-28)
           .attr("y", y1-3)
           .text("min="+f2(min))

        x2 = x1 + graphWidth*(Q1-min)/xrange;
        dot.append("line")
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("x1",x1)
           .attr("y1",y1+lineHeight/2)
           .attr("x2",x2)
           .attr("y2",y1+lineHeight/2)

        x1 = margin.left + graphWidth*(max-gxmin)/xrange;
        x2 = x1;
        dot.append("line")
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2) 

        dot.append("text")
           .attr("class","meanP")      
           .attr("font-size","8pt")
           .attr("stroke",strmean)
           .attr("x", x2-28)
           .attr("y", y1-3)
           .text("max="+f2(max))

        x1 = margin.left + graphWidth*(Q1-gxmin)/xrange;
        width = graphWidth*IQR/xrange;
        height = lineHeight;

        dot.append("rect")
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("stroke-width","1px")
           .style("fill","yellow")
           .attr("x",x1)
           .attr("y",y1)
           .attr("width",width)
           .attr("height",height)
 
        dot.append("text")
           .attr("class","meanP")      
           .attr("font-size","8pt")
           .attr("stroke",strmean)
           .attr("x", x1-22)
           .attr("y", y2+lineHeight/2)
           .text("Q1="+f2(Q1))

        dot.append("text")
           .attr("class","meanP")      
           .attr("font-size","8pt")
           .attr("stroke",strmean)
           .attr("x", x1+width-20)
           .attr("y", y2+lineHeight/2)
           .text("Q3="+f2(Q3))

        x1 = margin.left + graphWidth*(Q3-gxmin)/xrange;
        x2 = x1 + graphWidth*(max-Q3)/xrange;
        dot.append("line")
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("x1",x1)
           .attr("y1",y1+lineHeight/2)
           .attr("x2",x2)
           .attr("y2",y1+lineHeight/2)

        x1 = margin.left + graphWidth*(median-gxmin)/xrange;
        x2 = x1;
        dot.append("line")
           .attr("class","meanP")      
           .attr("stroke",strmean)
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2)

        dot.append("text")
           .attr("class","meanP")      
           .attr("font-size","8pt")
           .attr("stroke",strmean)
           .attr("x", x1-30)
           .attr("y", y2+lineHeight/2+10)
           .text("Med="+f2(median))

}

// 평균 상자그림 그리기
function showMeanSample(statP, statS) {
          var start = 0;
          drawStatSample(statP, start, 1) ;
          drawBoxSample(statP, start, 1);
          if(checkSampling) {
            start = svgHeight*2/3;
            drawStatSample(statS, start, 2) ;
            drawBoxSample(statS, start, 2);
          } 
}

// 평균 상자그림 제거
function removeMeanSample() {
	dot.selectAll("circle.meanP").remove();
	dot.selectAll("text.meanP").remove();
	dot.selectAll("line.meanP").remove();
	dot.selectAll("rect.meanP").remove();
	dot.selectAll("circle.meanS").remove();
	dot.selectAll("text.meanS").remove();
	dot.selectAll("line.meanS").remove();
	dot.selectAll("rect.meanS").remove();
}

// 전체 표본그림 제거
function removeAllSample() {
	dot.selectAll("circle.circleS").remove();
	dot.selectAll("line.lineS").remove();
	dot.selectAll("text.titleS").remove();
        removeMeanSample();
}

// 대수의 법칙 함수
function lawLarge(nobs) {
        var i, k, g, sum, estp, color;
        var x1, x2, x3, y1, y2, y3, tx1, tx2, ty1, ty2;
        var xbuffer    = 20;   
        var ybuffer    = 30;
        var areaHeight = 200;
        var areaWidth  = graphWidth - 2*xbuffer;
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
        x1 = margin.left; 
        y1 = margin.top  + graphHeight - areaHeight - ybuffer;
        dot2.append("rect").attr("x",x1).attr("y",y1).attr("width",areaWidth+2*xbuffer).attr("height",areaHeight+2*ybuffer)
            .style("stroke","black").style("fill","white");

        // 손 tossing graph
        x1 = margin.left + 4*xbuffer;
        y1 = margin.top + ybuffer;
        //The data for hand path
        var lineDataT = [ [30,60], [70,50], [95,15], [105,15], [102,35], [100,40], [100,45], [160,50], [160,60], [100,60] ];
        var lineDataB = [ [30,90], [60,80], [80,95], [95,100], [105,95], [110,80] ];
//        var lineDataC = [ [175,60], [185,50], [195,60], [190,70], [205,60], [215,50] ];
        var lineGenerator = d3.line().curve(d3.curveCardinal);
        var pathString    = lineGenerator(lineDataT);
        dot2.append("path").attr("d", pathString).attr("stroke","black").attr("fill", "none").attr("class","hand");
        pathString    = lineGenerator(lineDataB);
        dot2.append("path").attr("d", pathString).attr("stroke","black").attr("fill", "none").attr("class","hand");
//        pathString    = lineGenerator(lineDataC);
//        dot2.append("path").attr("d", pathString).attr("stroke","black").attr("fill", "none").attr("class","hand");

        dot2.append("rect").attr("class","hand").attr("x",x1-tgapx).attr("y",y1+tgaph)
            .attr("width",twidth).attr("height",theight).attr("rx",trx).attr("ry",trx)
            .style("stroke","black").style("fill","white");
        dot2.append("rect").attr("class","hand").attr("x",x1-2*tgapx).attr("y",y1+2*tgaph)
            .attr("width",twidth).attr("height",theight).attr("rx",trx).attr("ry",trx)
            .style("stroke","black").style("fill","white");
        dot2.append("rect").attr("class","hand").attr("x",x1-3*tgapx).attr("y",y1+3*tgaph)
            .attr("width",twidth).attr("height",theight).attr("rx",trx).attr("ry",trx)
            .style("stroke","black").style("fill","white");

 
        // 0.5 선
        x1 = margin.left + xbuffer;
        y1 = margin.top  + graphHeight;
        dot2.append("text").attr("class","meanR").attr("x", x1).attr("y", y1-areaHeight+3).text("1.0");
        dot2.append("text").attr("class","meanR").attr("x", x1).attr("y", y1-areaHeight/2+3).text("0.5");
        dot2.append("text").attr("class","meanR").attr("x", x1).attr("y", y1+3).text("0.0");
        x1 = margin.left + 2*xbuffer;
        x2 = x1 + areaWidth;
        y1 = margin.top + graphHeight - areaHeight/2;
        y2 = y1;
        dot2.append("line").style("stroke","red").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2);

        // tick
        y1 = margin.top + graphHeight + ybuffer;
        y2 = y1 + 7;
        for (k=0; k<nobs+1; k++) {
          x1 = margin.left + 2*xbuffer + k*step;
          x2 = x1;
          if (k%(nobs/10) == 0) {
            dot2.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2).style("stroke","black");
            dot2.append("text").attr("class","xlevel").attr("x", x2).attr("y", y2+10).text(k.toString());
          }
        }

        tx = margin.left + areaWidth/2;
        ty = margin.top  + graphHeight - areaHeight - 2.5*ybuffer;
        dot2.append("text").attr("class","meanG").attr("x",tx-125).attr("y",ty+8).text("P(Coin Head) = ").style("stroke","blue");
        dot2.append("text").attr("class","meanG").attr("x",tx).attr("y",ty).text("Number of Heads").style("stroke","blue");
        dot2.append("line").attr("class","meanG").attr("x1",tx-10).attr("y1",ty+5).attr("x2",tx+90).attr("y2",ty+5);
        dot2.append("text").attr("class","meanG").attr("x",tx+100).attr("y",ty+8).text(" = ").style("stroke","black");
        dot2.append("line").attr("class","meanG").attr("x1",tx+120).attr("y1",ty+5).attr("x2",tx+160).attr("y2",ty+5);
        dot2.append("text").attr("class","meanG").attr("x",tx).attr("y",ty+20).text("Number of Trials").style("stroke","grey");

        dot2.append("text").attr("class","meanG").attr("x",tx+150).attr("y",ty-50).text("Head").style("stroke","blue");
        dot2.append("text").attr("class","meanG").attr("x",tx-135).attr("y",ty-50).text("Tail").style("stroke","red");
        dot2.append("text").attr("x",tx-20).attr("y",margin.top+ybuffer*0.5).text("Law of Large Numbers").style("stroke","blue")
            .attr("font-size","13pt").attr("stroke","blue").attr("text-anchor","start")

        // 첫째 원 동전던지기
        g = 0;
        sum = 0;
        if (Math.random() > 0.5) sum ++;
        estp = sum;

        tx1 = margin.left + 2*xbuffer;
        ty1 = margin.top + graphHeight - areaHeight*estp ;

        // 처음 50개 점 만들고 궤적 그리기
        for (k=1; k<50; k++) {

           setTimeout(function() {	      
              g++ ;            
              x1 = margin.left + graphWidth/3 ;            // 하늘 좌표
              y1 = margin.top + ybuffer;
              x2 = margin.left + graphWidth/2;
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

              var cir = dot2.append("circle").attr("class","circleR") 
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

              dot2.selectAll("text.meanB").remove();
              dot2.append("text").attr("class","meanB").attr("x",tx+128).attr("y",ty).text(sum.toString());
              dot2.append("text").attr("class","meanB").attr("x",tx+125).attr("y",ty+20).text((g+1).toString()).style("stroke","green");
              dot2.append("text").attr("class","meanB").attr("x",tx+165).attr("y",ty+8).text(" = "+f2(estp));

              tx2 = tx1 + step;
              ty2 = margin.top + graphHeight - areaHeight*estp ;
              dot2.append("line").attr("x1",tx1).attr("y1",ty1).attr("x2",tx2).attr("y2",ty2).style("stroke","blue")
              tx1 = tx2;
              ty1 = ty2;

            }, 300*k); // endof setTimeout

//              dot2.selectAll("rect.hand").remove();
//              dot2.selectAll("path.hand").remove();
         
        } // endof k 

        for (j=50; j<nobs; j++) {

              g++ ;            
              if (Math.random() > pp) {
                   sum ++;
                   estp = sum / (g+1);
              };         

              dot2.selectAll("text.meanB").remove();
              dot2.append("text").attr("class","meanB").attr("x",tx+128).attr("y",ty).text(sum.toString());
              dot2.append("text").attr("class","meanB").attr("x",tx+125).attr("y",ty+20).text((g+1).toString()).style("stroke","green");
              dot2.append("text").attr("class","meanB").attr("x",tx+165).attr("y",ty+8).text(" = "+f2(estp)).style("stroke","blue");

              tx2 = tx1 + step;
              ty2 = margin.top + graphHeight - areaHeight*estp ;
              dot2.append("line").attr("x1",tx1).attr("y1",ty1).attr("x2",tx2).attr("y2",ty2).style("stroke","blue")
              tx1 = tx2;
              ty1 = ty2;

        } // endof j

}

// 구간추정 표시 함수
function drawInterval(nobs, avg, std, gxmin, xrange, clevel, height, niter, start) {
        var ty    = start + height;
        var temp  = clevel*std/Math.sqrt(nobs);
        var avgx  = margin.left + graphWidth*(avg-gxmin)/xrange;
        var stdmx = margin.left + graphWidth*(avg-temp-gxmin)/xrange;
        var stdpx = margin.left + graphWidth*(avg+temp-gxmin)/xrange;
        var checkMu = true;
        if (avg - temp > 0) checkMu = false;
        if (avg + temp < 0) checkMu = false;

        if (checkMu) {
          dot2.append("circle").attr("class","meanG").attr("cx",avgx).attr("cy",ty).attr("r",2)
              .attr("stroke","green")
          dot2.append("line")  .attr("class","meanG").attr("x1",stdmx).attr("y1",ty).attr("x2",avgx).attr("y2",ty)
              .attr("stroke","green")
          dot2.append("line")  .attr("class","meanG").attr("x1",stdpx).attr("y1",ty).attr("x2",avgx).attr("y2",ty)
              .attr("stroke","green")
        }
        else {
          dot2.append("circle").attr("class","meanR").attr("cx",avgx).attr("cy",ty).attr("r",2)
              .attr("stroke","red")
          dot2.append("line")  .attr("class","meanR").attr("x1",stdmx).attr("y1",ty).attr("x2",avgx).attr("y2",ty)
              .attr("stroke","red")
          dot2.append("line")  .attr("class","meanR").attr("x1",stdpx).attr("y1",ty).attr("x2",avgx).attr("y2",ty)
              .attr("stroke","red")
        }
        if (niter < 6) {
          if (checkMu) dot2.append("text").attr("class","meanG").attr("x", avgx-28).attr("y", ty + 15).text("sample mean="+f2(avg))
                           .attr("stroke","green")
          else dot2.append("text").attr("class","meanR").attr("x", avgx-28).attr("y", ty + 15).text("sample mean="+f2(avg))
                   .attr("stroke","red")
        }
}

// 전체 구간추정 표본그림 제거
function removeAllSample3() {
	dot2.selectAll("circle.circleS").remove();
	dot2.selectAll("circle.meanG").remove();
	dot2.selectAll("circle.meanR").remove();
	dot2.selectAll("text.meanG").remove();
	dot2.selectAll("text.meanR").remove();
	dot2.selectAll("line.meanG").remove();
	dot2.selectAll("line.meanR").remove();
}


// =============================================================================================================
// Testing Hypothesis : mu
// =============================================================================================================

// t분포 testing hypothesis 그래프 함수 --------------------------------------------------
function drawTdistGraphTH(hypoType, h1Type, stat, df, a, b, prob, pvalue) {
         var margin  = {top: 40, bottom: 130, left: 80, right: 70};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, info, ta, tb, tx, ty, str;
         var gxmin   = - 5;
         var gxmax   = 5;
         var gxrange = gxmax - gxmin;
         var gymin   = 0;
         var ymax    = 1/(Math.sqrt(2*Math.PI));
         var gymax   = ymax + ymax/5; 
         var gyrange = gymax - gymin;

         tx = margin.left + graphWidth2/2;
         ty = margin.top + 15;
         if (hypoType == 1)      str = "[TestStat] = (m - mu) / ( s / sqrt(n) )  ~  t("+df+") Distribution";
         else if (hypoType == 41) str = "[TestStat] = (m1 - m2 - D) / ( pooled std * sqrt(1/n1+1/n2) )  ~  t("+df+") Distribution";
         else if (hypoType == 42) str = "[TestStat] = (m1 - m2 - D) / ( sqrt(var1/n1 + var2/n2) )  ~  t'("+df+") Distribution";

    
         bar.append("text").attr("x", tx).attr("y", ty).text(str)
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")
         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = t_pdf(x[0], df, info);
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = t_pdf(x[k], df, info);
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke","black").attr("stroke-width","2px");
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = t_pdf(tempx, df, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           bar.append("line")
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","#0055FF")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 40;
         bar.append("text").attr("x", ta).attr("y", ty).text(f2(a))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
         bar.append("text").attr("x", tb).attr("y", ty).text(f2(b))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         // Accept, Reject regions
         bar.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- Accept Ho ->")
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle") 
         if (h1Type == 1) {  
           bar.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+60).attr("y", ty).text("<- Rejectt Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")

         }
         else if (h1Type == 2) {
           bar.append("text").attr("x", tb+50).attr("y", ty).text("<- Rejectt Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }
         else {
           bar.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }

         // draw test statistics
         x1 = margin.left + graphWidth2*(stat-gxmin)/gxrange;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 60;
         bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2).style("stroke","green")
              .attr("stroke","black").attr("stroke-width","2px");
         bar.append("text").attr("x", x1).attr("y", y2+15)
            .text("[TestStat] = "+f3(stat))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")
         bar.append("text").attr("x", x1).attr("y", y2+30)
            .text(" p-value  = "+f3(pvalue))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")


         // Decision
         if (stat > a && stat < b) {
           bar.append("text").attr("x", tx).attr("y", y2+50)
              .text("[Decision] Accept Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","blue").attr("text-anchor","middle")
         }
         else {
           bar.append("text").attr("x", tx).attr("y", y2+50)
              .text("[Decision] Reject Ho")
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }

}     

// 정규분포 그래프 함수 --------------------------------------------------
function drawNormalGraphTH(hypoType, h1Type, stat, mu, sigma, a, b, prob, pvalue) {
         var margin  = {top: 40, bottom: 130, left: 80, right: 70};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, ta, tb, tx, ty, str;
         var gxmin   = mu - 5*sigma;
         var gxmax   = mu + 5*sigma;
         var gxrange = gxmax - gxmin;
         var gymin   = 0;
         var ymax    = 1/(sigma*Math.sqrt(2*Math.PI));
         var gymax   = ymax + ymax/5; 
         var gyrange = gymax - gymin;

         tx = margin.left + graphWidth2/2;
         ty = margin.top + 15;
         if (hypoType == 1)      str = "[TestStat] = (m - mu) / ( s / sqrt(n) )  ~  N(0,1) Distribution";
         else if (hypoType == 3) str = "[TestStat] = (p - Po) / ( sqrt(p*(1-p)/n) )  ~  N(0,1) Distribution";
         else if (hypoType == 6) str = "[TestStat] = (p1 - p2 - D) / (sqrt(pbar*(1-pbar)(1/n1 + 1/n2) )  ~  N(0,1) Distribution";
         bar.append("text").attr("x", tx).attr("y", ty).text(str)
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")
         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = normal_pdf(mu, sigma, x[0] );
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = normal_pdf(mu, sigma, x[k] );
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke","black").attr("stroke-width","2px");
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = normal_pdf(mu, sigma, tempx );
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           bar.append("line")
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","#0055FF")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 40;
         bar.append("text").attr("x", ta).attr("y", ty).text(f2(a))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
         bar.append("text").attr("x", tb).attr("y", ty).text(f2(b))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         // Accept, Reject regions
         bar.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- Accept Ho ->")
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
 
         if (h1Type == 1) {  
           bar.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+60).attr("y", ty).text("<- Rejectt Ho")
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }
         else if (h1Type == 2) {
           bar.append("text").attr("x", tb+50).attr("y", ty).text("<- Rejectt Ho")
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }
         else {
           bar.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }

         // draw test statistics
         x1 = margin.left + graphWidth2*(stat-gxmin)/gxrange;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 60;
         bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
            .attr("stroke","green").attr("stroke-width","2px");
         bar.append("text").attr("x", x1).attr("y", y2+15).text("[TestStat] = "+f3(stat))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")
         bar.append("text").attr("x", x1).attr("y", y2+30).text(" p-value  = "+f3(pvalue))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")

         // Decision
         if (stat > a && stat < b) {
           bar.append("text").attr("x", tx).attr("y", y2+50).text("[Decision] Accept Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","blue").attr("text-anchor","middle")
         }
         else {
           bar.append("text").attr("x", tx).attr("y", y2+50).text("[Decision] Reject Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }
}     

// =============================================================================================================
// Testing Hypothesis : sigma
// =============================================================================================================

// chisq 분포 가설검정 그래프 함수 --------------------------------------------------
function drawChisqGraphTH(hyphType, h1Type, stat, df, a, b, prob, pvalue) {
         var margin  = {top: 40, bottom: 130, left: 100, right: 100};
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, info, ta, tb, tx, ty, str;
         var ymax, gxmin, gxmax, gymin, gymax, gxrange, gyrange;

         gxmin = 0;
         gymin = 0;
         if (df < 2)  {gxmax = 12;  ymax = 1.5;}
         else if (df < 5)       {gxmax = 12;  ymax = 0.6;}
         else if (df < 10) {gxmax = 30;  ymax = 0.15;}
         else {gxmin = chisq_inv(0.0001, df, info), gxmax = chisq_inv(0.9999, df, info);  ymax = 0.1;}
  
         gxrange = gxmax - gxmin;
         gymax   = ymax + ymax/5; 
         gyrange = gymax - gymin;

         tx = margin.left + graphWidth2/2;
         ty = margin.top + 15;
         if (hypoType == 2)      str = "[TestStat] = (n - 1) s^2 / ( sigma_o^2 )  ~  ChiSq("+df+") Distribution";
         else if (hypoType == 8) str = "[TestStat] = Sum( EF - OF)^2 / EF ) ~  ChiSq("+df+") Distribution";
         bar.append("text").attr("x", tx).attr("y", ty).text(str)
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")

         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = chisq_pdf(x[0], df, info);
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = chisq_pdf(x[k], df, info);
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke","black").attr("stroke-width","2px");
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = chisq_pdf(tempx, df, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           bar.append("line")
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","#0055FF")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 40;
         bar.append("text").attr("x", ta).attr("y", ty).text(f2(a))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
         bar.append("text").attr("x", tb).attr("y", ty).text(f2(b))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         // Accept, Reject regions
         bar.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- Accept Ho ->")
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
         if (h1Type == 1) {  
           bar.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+60).attr("y", ty).text("<- Rejectt Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }
         else if (h1Type == 2) {
           bar.append("text").attr("x", tb+50).attr("y", ty).text("<- Rejectt Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }
         else {
           bar.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }

         // draw test statistics
         x1 = margin.left + graphWidth2*(stat-gxmin)/gxrange;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 60;
         bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
            .attr("stroke","green").attr("stroke-width","2px");
         bar.append("text").attr("x", x1).attr("y", y2+15).text("[TestStat] = "+f3(stat))
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")
         bar.append("text").attr("x", x1).attr("y", y2+30).text(" p-value  = "+f3(pvalue))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")

         // Decision
         if (stat > a && stat < b) {
           bar.append("text").attr("x", tx).attr("y", y2+50).text("[Decision] Accept Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","blue").attr("text-anchor","middle")
         }
         else {
           bar.append("text").attr("x", tx).attr("y", y2+50).text("[Decision] Reject Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }

}     

// =============================================================================================================
// Testing Hypothesis : (sigma1, sigma2),   ANOVA
// =============================================================================================================

// F 분포 가설검정 그래프 함수 --------------------------------------------------
function drawFdistGraphTH(hypoType, h1Type, stat, df1, df2, a, b, prob, pvalue) {
         var margin  = {top: 40, bottom: 130, left: 100, right: 100};
         if (hypoType == 7) margin.left = 50;
         var graphWidth2   = svgWidth2 - margin.left - margin.right;
         var graphHeight2  = svgHeight2 - margin.top - margin.bottom;
         var x1, y1, x2, y2, info, ta, tb, tc, td, te, t1, t2, t3, tx, ty, str;
         var ymax, gxmin, gxmax, gymin, gymax, gxrange, gyrange;

         gxmin = 0;
         gxmax = 10;
         gymin = 0;
         ymax  = 1.5;
 
         gxrange = gxmax - gxmin;
         gymax   = ymax + ymax/5; 
         gyrange = gymax - gymin;

         tx = margin.left + graphWidth2/2;
         ty = margin.top + 15;
         if (hypoType == 5)       str = "[TestStat] = (s1^2 / s2^2 )  ~  F("+df1+","+df2+") Distribution";
         else if (hypoType == 7)  str = "[TestStat] = (BSS / (k-1)) / (ESS / (n-k))  ~  F("+df1+","+df2+") Distribution";
         bar.append("text").attr("x", tx).attr("y", ty).text(str)
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")

         drawAxisNormal(margin.top, margin.bottom, margin.left, margin.right, gxmin, gxmax, gymin, gymax);
         
         var x = [];
         var y = [];
         var step = (gxmax - gxmin)/graphWidth2;
         x[0] = gxmin;
         y[0] = f_pdf(x[0], df1, df2, info);
         x1   = margin.left + graphWidth2*(x[0]-gxmin)/gxrange;
         y1   = margin.top + graphHeight2 - graphHeight2*(y[0]-gymin)/gyrange;

         for (var k=1; k<=graphWidth2; k++) {
           x[k] = x[k-1] + step;
           y[k] = f_pdf(x[k], df1, df2, info);
           x2   = margin.left + graphWidth2*(x[k]-gxmin)/gxrange;
           y2   = margin.top + graphHeight2 - graphHeight2*(y[k]-gymin)/gyrange;
           bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
              .attr("stroke","black").attr("stroke-width","2px");
           x1   = x2;
           y1   = y2;    
         }

         var tempx, tempy;
         var tempx = a;
         do { 
           tempy = f_pdf(tempx, df1, df2, info);
           x1   = margin.left + graphWidth2*(tempx-gxmin)/gxrange;
           x2   = x1;
           y1   = margin.top  + graphHeight2;
           y2   = margin.top  + graphHeight2 - graphHeight2*(tempy-gymin)/gyrange;
           bar.append("line")
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
              .attr("stroke-width","2px").attr("stroke","#0055FF")
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         ta = margin.left + graphWidth2*(a-gxmin)/gxrange;
         tb = margin.left + graphWidth2*(b-gxmin)/gxrange;
         ty = svgHeight2 - margin.bottom + 30;
         bar.append("text").attr("x", ta).attr("y", ty).text(f2(a))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
         bar.append("text").attr("x", tb).attr("y", ty).text(f2(b))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")

         // Accept, Reject regions
         bar.append("text").attr("x", (ta+tb)/2).attr("y", ty).text("<- Accept Ho ->")
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","#0055FF").attr("text-anchor","middle")
         if (h1Type == 1) {  
           bar.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+60).attr("y", ty).text("<- Rejectt Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", ta-40).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+45).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")

         }
         else if (h1Type == 2) {
           bar.append("text").attr("x", tb+50).attr("y", ty).text("<- Rejectt Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", tb+50).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }
         else {
           bar.append("text").attr("x", ta-60).attr("y", ty).text("Reject Ho ->")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           bar.append("text").attr("x", ta-50).attr("y", ty-60).text(f3(prob))
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
         }

         // draw test statistics
         x1 = margin.left + graphWidth2*(stat[0]-gxmin)/gxrange;
         x2 = x1;
         y1 = margin.top + graphHeight2;
         y2 = y1 + 45;
         bar.append("line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
            .attr("stroke","green").attr("stroke-width","2px");
         bar.append("text").attr("x", x1).attr("y", y2+10).text("Fobs = "+f2(stat[0])+", p-value  = "+f3(pvalue) )
            .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","green").attr("text-anchor","middle")

         // Decision
         if (hypoType == 7) {
           ta = 50;      tb = ta + 100; tc = tb + 60; td = tc + 100; te = td + 140;
           t1 = y2 + 30; t2 = t1 + 15; t3 = t2 + 15; t4 = t3 + 15;
           bar.append("text").attr("class","meanL").attr("x", ta).attr("y", t1).text("[ANOVA]");

           bar.append("text").attr("class","meanL").attr("x", ta).attr("y", t2).text("BSS="+f2(stat[1]) );
           bar.append("text").attr("class","meanL").attr("x", tb).attr("y", t2).text("df="+df1);
           bar.append("text").attr("class","meanL").attr("x", tc).attr("y", t2).text("MSB="+f2(stat[4]) );
           bar.append("text").attr("class","meanL").attr("x", td).attr("y", t2).text("Fobs="+f2(stat[0]) );
           if (stat[0] > a && stat[0] < b) {
             bar.append("text").attr("x", te).attr("y", t2).text("[Decision] Accept Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","blue").attr("text-anchor","middle")
           }
           else {
             bar.append("text").attr("x", te).attr("y", t2).text("[Decision] Reject Ho")
               .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           }

           bar.append("text").attr("class","meanL").attr("x", ta).attr("y", t3).text("ESS="+f2(stat[2]) );
           bar.append("text").attr("class","meanL").attr("x", tb).attr("y", t3).text("df="+df2);
           bar.append("text").attr("class","meanL").attr("x", tc).attr("y", t3).text("MSE="+f2(stat[5]) );

           bar.append("text").attr("class","meanL").attr("x", ta).attr("y", t4).text("TSS="+f2(stat[3]) );
         }
         else if (hypoType == 5){
           if (stat[0] > a && stat[0] < b) {
             bar.append("text").attr("x", tx).attr("y", y2+40).text("[Decision] Accept Ho")
                .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","blue").attr("text-anchor","middle")
           }
           else {
             bar.append("text").attr("x", tx).attr("y", y2+40).text("[Decision] Reject Ho")
              .attr("font-family","sans-serif").attr("font-size","9pt").attr("stroke","red").attr("text-anchor","middle")
           }
         }
}     

