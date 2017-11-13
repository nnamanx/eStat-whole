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

var f1 = d3.format(".1f");
var f2 = d3.format(".2f");
var f3 = d3.format(".3f");
var f4 = d3.format(".4f");

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
                 .text("r = "+f2(corr[k])+" "+" r^2 = "+f2(rsquare[k]))
        } // endof k  
}

// Remove Regression Line
function removeRegression() {
	 scatter.selectAll("line.reglabel").remove();
         scatter.selectAll("text.reglabel").remove();
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
        var title = "상관계수를 바꾸고 실행버튼을 누르세요"
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
                .text("r = "+f2(corr)+" r^2 = "+f2(rsquare))
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
/*
        var title = "Regression Simulation";
        var sub1  = "- Creating points(>=3) by mouse shows a regression line.";
        var sub2  = "- Move or erase a point and watch the regression line.";
        var ty    = margin.top/3;
        svg.append("text").attr("class","title").attr("x",margin.left).attr("y",ty).text(title);
        svg.append("text").attr("class","titleS").attr("x",margin.left).attr("y",ty+20).text(sub1);
        svg.append("text").attr("class","titleS").attr("x",margin.left).attr("y",ty+35).text(sub2);
*/
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
        .text("r2 = "+f2(coef.rsq))
 
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
           .attr("class","rect")
           .attr("x", t1 - rectSize)
           .attr("y", t2 - rectSize)
           .attr("width",  2*rectSize)
           .attr("height", 2*rectSize)
        dot.append("line")
           .attr("class","lineB")
           .attr("x1", t1)
           .attr("y1", t2+rectSize)
           .attr("x2", t1)
           .attr("y2", t2+3*rectSize+oneHeight)

        // 각 사각형 좌표 계산      
        for (i=0; i<nvalue; i++) {
          tx[i][0] = margin.left + graphWidth/2 - rectSizeDiv2- i*oneWidth;
          ty[i][0] = margin.top + (i+1)*oneHeight;
          if (i != nvalue-1) {
            dot.append("rect")
               .attr("class","rect")
               .attr("x", tx[i][0] )
               .attr("y", ty[i][0])
               .attr("width",  rectSize)
               .attr("height", rectSize)
          }
          for (k=1; k<=i; k++) {
            tx[i][k] = tx[i][k-1] + 2*oneWidth; 
            ty[i][k] = ty[i][0];
            if (i != nvalue-1) {
              dot.append("rect")
                 .attr("class","rect")
                 .attr("x", tx[i][k] )
                 .attr("y", ty[i][k])
                 .attr("width",  rectSize)
                 .attr("height", rectSize)
            }
          } // endof k
        } // endof i


	  
        // 마지막 라인은 점수 합계용
        for (j=0; j<nvalue; j++) {
          t1 = tx[nvalue-1][j] + rectSizeDiv2;
          t2 = ty[nvalue-1][j] + rectSize + 6;
          dot.append("circle").attr("class","circleN").attr("cx",t1).attr("cy",t2).attr("r",rectSize);
          dot.append("text").attr("class","평균").attr("x",t1).attr("y",t2+5).text(j);
        }        

        // 사각형 연결 line
        for (i=0; i<nvalue-1; i++) {
          for (j=0; j<=i; j++) {
            x1 = tx[i][j] + rectSizeDiv2;
            y1 = ty[i][j] + rectSizeDiv2;
            for (k=j; k<=j+1; k++) {
              x2 = tx[i+1][k] + rectSizeDiv2;
              y2 = ty[i+1][k] + rectSizeDiv2;
              if (k==j && pp < 0.5) dot.append("line").attr("class","lineB").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2).style("stoke-width","2px")
              else                  dot.append("line").attr("class","lineB").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2).style("stoke-width","1px")
              if (k==j+1 && pp < 0.5) dot.append("line").attr("class","lineB").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2).style("stoke-width","1px")
              else                    dot.append("line").attr("class","lineB").attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2).style("stoke-width","2px")
              t1 = (x1 + x2) / 2;
              t2 = (y1 + y2) / 2;
              if (k==j) dot.append("text").attr("class","font01").attr("x", t1).attr("y", t2).text("0")
              else      dot.append("text").attr("class","font01").attr("x", t1).attr("y", t2).text("1");
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
            .attr("class","line")
            .attr("x1", margin.left)
            .attr("y1", y1)
            .attr("x2", margin.left+graphWidth)
            .attr("y2", y1)
         for (j=0; j<nvalue; j++) {
           x1 = tx[nvalue-1][j]+rectSizeDiv2;
           dot.append("text")
              .attr("class","freqfont")
              .attr("x", x1)
              .attr("y", y1+15)
              .text(j)
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

              var cir = dot.append("circle").attr("class","circleR") 
              var currentPath = dot.append("line").attr("class","lineR")
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

          var str = "반복회수="+nobs;
          dot.append("text").attr("class","mean")
             .attr("x", margin.left+20)
             .attr("y", svgHeight-margin.bottom/2)
             .text(str);        
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
        var str = "평균 = "+savg+",  표준편차 = "+f2(sstd);
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
          } else if (nvalue2 < 70) {
             if  (k%2 == 1) {
               bar.append("text")
                  .attr("class","barname")
                  .attr("x",margin.left + barMargin + barWidth/2 + k*betweenbarWidth )
                  .attr("y",y1+20)
                  .text(label[k])
            }
          } else {
             if  (k%3 == 1) {
               bar.append("text")
                  .attr("class","barname")
                  .attr("x",margin.left + barMargin + barWidth/2 + k*betweenbarWidth )
                  .attr("y",y1+20)
                  .text(label[k])
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
         var gymin     = ymin;
         var gymax     = ymax + ymax/5;  
         var yRatio    = graphHeight / gymax;          // 그래프 영역과 데이터 영역의 비율
         var betweenbarWidth = graphWidth / nvalue2;   // 막대와 막대 사이의 너비
         var barWidth  = betweenbarWidth * 2 / 3;    // 막대의 너비
         var barMargin = (betweenbarWidth / 3) / 2; // 왼쪽 마진

         var title  = "이항분포 n = "+nn2.toString()+", p = "+f2(pp2);
         bar.append("text").attr("class","title").attr("x", margin.left).attr("y", margin.top/2).text(title);
         var avg  = nn2 * pp2;
         var std  = Math.sqrt(nn2*pp2*(1-pp2));
         var str = "평균 = "+f2(avg)+",  표준편차 = "+f2(std);
         bar.append("text").attr("class","mean")
            .attr("x", margin.left + graphWidth/2 - 40)
            .attr("y", svgHeight - margin.bottom/3).text(str);

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

// 이항 정규분포 근사 함수
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
           bar.append("line").attr("class","lineNormal").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2);
           x1   = x2;
           y1   = y2;    
//           document.write(k+" "+x[k]+" "+y[k]+"<br>")
         }
}


// 이항 정규분포 제거 함수
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
          row.innerHTML = "<h3>이항분포표</h3>";
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

function binomial_pdf( x, n, p, info ) {
/* 
    - pdf of a binomial distribution BIN(x; n, p)
   
         pdf = nCx p^x (1-p)^n-x ,  x = 0, 1, 2, ...., n  
	  input 
	  x : (0,1, ..., n)
      n : >= 1, integer
	  p : [0,1]
	  output
     binomial_pdf : 
	    info = 0 : normal return
                1 : p < 0 or p > 1
*/
    var i;
    var pval, temp1, temp2;
		info = 0;
    if( p<0.0 || p>1.0 ) {
		info = 1;
		return -1.0;
	}
	    if( p==0.0 || p==1.0 ) return 0.0;
	if( x < 0 || x > n ) return 0.0;
	if( x == 0 ) {
            pval = Math.exp( n * Math.log(1.0-p) );
	}
        else if( x == n ) {
            pval = Math.exp( n * Math.log(p) );
	}
        else {
            temp1 = 0.0; temp2 = 0.0;
            for(i=1; i<=x; i++) {
		temp1 += Math.log( (n+1-i) );
                temp2 += Math.log( (i) );
	    }
            pval = temp1 - temp2 + x * Math.log(p) + (n-x) * Math.log(1.0-p);
            pval = Math.exp(pval);
	}
	return pval;
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
           .text("평균="+f2(avg))
        dot.append("text")
           .attr("class","mean")
           .attr("x", stdpx+10)
           .attr("y", ty+15)
           .text("표준편차="+f2(std))
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
           .attr("class","mean")
           .attr("x", x1)
           .attr("y", y1-3)
           .text("min="+f2(min))

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
          .attr("class","mean")
          .attr("x", x1)
          .attr("y", y1-3)
          .text("max="+f2(max))

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
           .attr("class","mean")
           .attr("x", x1)
           .attr("y", y2+lineHeight/2)
           .text("Q1="+f2(Q1))

        dot.append("text")
           .attr("class","mean")
           .attr("x", x1+width)
           .attr("y", y2+lineHeight/2)
           .text("Q3="+f2(Q3))

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
          .attr("class","mean")
          .attr("x", x1)
          .attr("y", y2+lineHeight/2+10)
          .text("Med="+f2(median))

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
function drawAxisNormal(gxmin, gxmax, gymin, gymax) {
        var margin  = {top: 50, bottom: 50, left: 50, right: 20};
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

         drawAxisNormal(gxmin, gxmax, gymin, gymax);
         
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
           bar.append("line").attr("class","line").attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2);
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
              .attr("class","lineb")
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
           tempx += step;        
         } while( tempx <= b ) 

         // a, b, prob 표시
         bar.append("text").attr("class","mean")
            .attr("x", margin.left + graphWidth2*(a-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(a))

         bar.append("text").attr("class","mean")
            .attr("x", margin.left + graphWidth2*(b-gxmin)/gxrange)
            .attr("y", svgHeight2 - margin.bottom/3)
            .text(f2(b))
 
         x1 = margin.left + graphWidth2*(b-gxmin)/gxrange + 20;
//         if (radioType == 2) x1 = margin.left + graphWidth2*((-2+b)/2-gxmin)/gxrange;
         y1 = svgHeight2 - margin.bottom - graphHeight2/10;
         bar.append("text").attr("class","mean")
            .attr("x", x1)
            .attr("y", y1)
            .text(f4(prob))
            .style("stroke","red")

}     

// N(mu,std) 정규분포 pdf -------------------------------------------------------------------------------------------
function normal_pdf(mu, std, x) {
      /*        
        - pdf of the  normal distribution, N(mu,std)
        pdf = (2*pi)^(-1/2) (std)^(-1) exp( - ((x-mu)/std)^2/2) ),   -inf < z < inf
      input 
        x : value
      output
        normal_pdf :
      */
      	var root2pi;
      	var zabs, pdf;
      	var temp, expntl;
     	var root2pi = Math.sqrt(2*Math.PI);
      	var z = (x-mu) / std;
        var zabs = Math.abs(z);
      	// |z| > 37.
      	if( zabs > 37.0 ) return 0.0;
      	
      	// |z| < 37.
      	temp  = -0.5 * zabs * zabs;
      	expntl = Math.exp(temp);
      	pdf = expntl / (root2pi * std);
      	return pdf;
}

function stdnormal_pdf( z ) {
/*
    - pdf of the standard normal distribution, N(0,1)
	 
	     pdf = (2*pi)^(-1/2) exp( - z^2/2 ),   -inf < z < inf
  input 
      z : no. of standard deviations from the mean.
  output
     stdnormal_pdf :
*/
	var root2pi;
	var zabs, pdf;
	var temp, expntl;
	root2pi = 2.506628274631001;
	zabs = Math.abs(z);
	// |z| > 37.
	if( zabs > 37.0 ) return 0.0;
	
	// |z| < 37.
	temp  = -0.5 * zabs * zabs;
	expntl = Math.exp(temp);
	pdf = expntl / root2pi;
	return pdf;
}

function stdnormal_cdf(z ) {
/*
    - cdf of the standard normal distribution, N(0,1)
	 
	     pdf = (2*pi)^(-1/2) exp( - z^2/2 ),   -inf < z < inf
         cdf = int_-inf^x pdf dz
  input 
      z : no. of standard deviations from the mean.
  output
	 stdnormal_cdf : probability to the left of z
*/
/* Normal distribution probabilities accurate to 1.e-15.
   z = no. of standard deviations from the mean.
   returns probability to the left of z. 
   Based upon algorithm 5666 for the error function, from:
   Hart, J.F. et al, 'Computer Approximations', Wiley 1968
   Translated from Fortran to C by JungHo Ahn & GunSeog Kang 
*/
	var p0, p1, p2, p3, p4, p5, p6;
	var q0, q1, q2, q3, q4, q5, q6, q7;
	var cutoff, root2pi;
	var zabs, prob;
	var temp, expntl, pdf;
	p0 = 220.2068679123761;
	p1 = 221.2135961699311;
	p2 = 112.0792914978709;
	p3 = 33.91286607838300;
	p4 = 6.373962203531650;
	p5 = .7003830644436881;
	p6 = .3526249659989109e-1;
	q0 = 440.4137358247522;
	q1 = 793.8265125199484;
	q2 = 637.3336333788311;
	q3 = 296.5642487796737;
	q4 = 86.78073220294608;
	q5 = 16.06417757920695;
	q6 = 1.755667163182642;
	q7 = .8838834764831844e-1;
	cutoff = 7.071;
	root2pi = 2.506628274631001;
	zabs = Math.abs(z);
	/////////////////////////////////////////////
	// |z| > 37.
	if( zabs > 37.0 )
	{
		pdf = 0.0;
		if( z > 0.0 ) prob = 1.0;
		else          prob = 0.0;
		
		return prob;
	}
	///////////////////////////////////////////
	// |z| < 37.
	temp  = -0.5 * zabs * zabs;
	expntl = Math.exp(temp);
	pdf = expntl / root2pi;
	////////////////////////////////////////
	// |z| < coutoff = 10/sqrt(2).
	if( zabs < cutoff ) 
	{
		prob = expntl * ((((((p6*zabs + p5)*zabs + p4)*zabs + p3)*zabs +
     		p2)*zabs + p1)*zabs + p0) / (((((((q7*zabs + q6)*zabs +
     		q5)*zabs + q4)*zabs + q3)*zabs + q2)*zabs + q1)*zabs + q0);
	}
	else	// |z| >= coutoff.
	{
		prob =  pdf / (zabs + 1.0/(zabs + 2.0/(zabs + 3.0/(zabs + 4.0/
     		(zabs + 0.65)))));
	}
	if( z >= 0.0 ) prob = 1.0 - prob;
	
	return prob;
}

function stdnormal_inv(P, info ) {
/*
    - percentile of the standard normal distribution, N(0,1)
	 
	     pdf = (2*pi)^(-1/2) exp( - z^2/2 ),   -inf < z < inf
         cdf = Phi(x) = xint_-inf^x pdf dz
         inv = Phi^-1(p)
    - Should use only when info=0.
  input 
      P : probability
  output
	 stdnormal_inv : the normal deviate Z corresponding to a given lower tail area of P
         info = 0 : normal return
	             1 : P < 0 or P > 1
*/
/* 
	Produces the normal deviate Z corresponding to a given lower
	tail area of P; Z is accurate to about 1 part in 10**16.
    should use only when info=0.
  
	ALGORITHM AS 241  APPL. STATIST. (1988) VOL. 37, NO. 3
	The hash sums below are the sums of the mantissas of the
	coefficients.  They are included for use in checking
	transcription.
     Translated by G. Kang, Aug. 2000
*/
	var ZERO, ONE, HALF, SPLIT1, SPLIT2, CONST1, CONST2, 
		A0, A1,	A2, A3, A4, A5, A6, A7, B1, B2, B3, B4, B5, B6, B7,
     		C0, C1, C2, C3, C4, C5, C6, C7,	D1, D2, D3, D4, D5, D6, D7, 
		E0, E1, E2, E3, E4, E5, E6, E7, F1, F2, F3, F4, F5, F6, F7, Q, R;
	var dtemp;
	ZERO = 0.0;	ONE = 1.0; HALF = 0.5;
    SPLIT1 = 0.425; SPLIT2 = 5.0; CONST1 = 0.180625; CONST2 = 1.6; 
/*
 	Coefficients for P close to 0.5
*/
	A0 = 3.3871328727963666080;     A1 = 1.3314166789178437745e+2;
    	A2 = 1.9715909503065514427e+3;  A3 = 1.3731693765509461125e+4;
	A4 = 4.5921953931549871457e+4;  A5 = 6.7265770927008700853e+4;
	A6 = 3.3430575583588128105e+4;  A7 = 2.5090809287301226727e+3;
    	B1 = 4.2313330701600911252e+1;  B2 = 6.8718700749205790830e+2;
    	B3 = 5.3941960214247511077e+3;  B4 = 2.1213794301586595867e+4;
    	B5 = 3.9307895800092710610e+4;  B6 = 2.8729085735721942674e+4;
    	B7 = 5.2264952788528545610e+3;
/* HASH SUM AB    55.88319 28806 14901 4439
	Coefficients for P not close to 0, 0.5 or 1.
*/
	C0 = 1.42343711074968357734;     C1 = 4.63033784615654529590;
    	C2 = 5.76949722146069140550;     C3 = 3.64784832476320460504;
    	C4 = 1.27045825245236838258;     C5 = 2.41780725177450611770e-1;
    	C6 = 2.27238449892691845833e-2;  C7 = 7.74545014278341407640e-4;
    	D1 = 2.05319162663775882187;     D2 = 1.67638483018380384940;
    	D3 = 6.89767334985100004550e-1;  D4 = 1.48103976427480074590e-1;
    	D5 = 1.51986665636164571966e-2;  D6 = 5.47593808499534494600e-4;
    	D7 = 1.05075007164441684324e-9;
/*	HASH SUM CD    49.33206 50330 16102 89036
	Coefficients for P near 0 or 1.
*/
	E0 = 6.65790464350110377720;       E1 = 5.46378491116411436990;
    	E2 = 1.78482653991729133580;       E3 = 2.96560571828504891230e-1;
    	E4 = 2.65321895265761230930e-2;    E5 = 1.24266094738807843860e-3;
    	E6 = 2.71155556874348757815e-5;    E7 = 2.01033439929228813265e-7;
    	F1 = 5.99832206555887937690e-1;    F2 = 1.36929880922735805310e-1;
    	F3 = 1.48753612908506148525e-2;    F4 = 7.86869131145613259100e-4;
    	F5 = 1.84631831751005468180e-5;    F6 = 1.42151175831644588870e-7;
   	 F7 = 2.04426310338993978564e-15;
//	HASH SUM EF    47.52583 31754 92896 71629
//
	info = 0;
	Q = P - HALF;
	if (Math.abs(Q) <= SPLIT1) {
	  R = CONST1 - Q * Q;
	  dtemp = Q * (((((((A7 * R + A6) * R + A5) * R + A4) * R + A3)
     			* R + A2) * R + A1) * R + A0) /
     		      (((((((B7 * R + B6) * R + B5) * R + B4) * R + B3)
     			* R + B2) * R + B1) * R + ONE) ;
	  return dtemp; 
	}
	else {
	  if (Q < ZERO) R = P;
	  else R = ONE - P;
	  if (R <= ZERO) {
	    info = 1;
	    dtemp = ZERO;
	    return dtemp; 
	  }
	  R = Math.sqrt(-Math.log(R));
	  if(R <= SPLIT2) {
	    R = R - CONST2;
	    dtemp = (((((((C7 * R + C6) * R + C5) * R + C4) * R + C3)
     			* R + C2) * R + C1) * R + C0) /
     		     (((((((D7 * R + D6) * R + D5) * R + D4) * R + D3)
     			* R + D2) * R + D1) * R + ONE) ;
	  }
	  else {
	    R = R - SPLIT2;
	    dtemp = (((((((E7 * R + E6) * R + E5) * R + E4) * R + E3)
     			* R + E2) * R + E1) * R + E0) /
     		     (((((((F7 * R + F6) * R + F5) * R + F4) * R + F3)
     			* R + F2) * R + F1) * R + ONE) ;
	  }
	  if(Q < ZERO) dtemp = - dtemp; 
	  return dtemp;
	}
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

        var str = Math.floor(samplePercent*100).toString()+"% 표본의 분포 (n="+sobs.toString()+")";
        dot.append("text").attr("class","titleS")
           .attr("x", margin.left)
           .attr("y", svgHeight+20)
           .text(str)

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
           .attr("class","lineS")
           .attr("x1",margin.left)
           .attr("y1",ty)
           .attr("x2",margin.left+graphWidth)
           .attr("y2",ty)

//        drawAxisSample(start,gxmin, gxmax);
        for (k=0; k<sobs; k++) {
          var cx1 = margin.left+graphWidth*(tdata[k]-gxmin)/xrange;
          var cy1 = margin.top + graphHeight - tdataY[k]*radius*2;
          var cx2 = margin.left+graphWidth*(sdata[k]-gxmin)/xrange;
          var cy2 = start+ margin.top + graphHeight - sdataY[k]*radius*2;

          dot.append("circle")
             .attr("class","circleS")
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
        dot.append("text").attr("class","titleS").attr("x", margin.left).attr("y", svgHeight - margin.bottom/2 + 20)
           .text("표본평균의 분포 (반복수=100)" )

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

          dot.append("text").attr("class","titleS")
             .attr("x", margin.left)
             .attr("y", svgHeight + gg*oneHeight)
             .text("n = "+n[gg])

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
             .attr("class","lineS")
             .attr("x1",margin.left)
             .attr("y1",ty)
             .attr("x2",margin.left+graphWidth)
             .attr("y2",ty)
/*
          dot.append("g")
             .attr("transform","translate("+margin.left+","+ty+")")
             .call(d3.axisBottom(xScale))                  // 눈금을 표시할 함수 호출
*/            
          for (k=0; k<kiter; k++) {
            dot.append("circle")
               .attr("class","circleS")
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
            .attr("class","circleP")
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
            .attr("class","circleP")
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

        if (type == 1) var strmean = "meanP";
        else var strmean = "meanS";
        var strstd ="표준편차 ";
        if (type == 2 && checkSampling && checkCLT) strstd ="표준오차=";

        var ty    = start + margin.top  + graphHeight + 10;
        var avgx  = margin.left + graphWidth*(avg-gxmin)/xrange;
        var stdmx = margin.left + graphWidth*(avg-std-gxmin)/xrange;
        var stdpx = margin.left + graphWidth*(avg+std-gxmin)/xrange;

      if (checkSampling) {  
        dot.append("line")       
           .attr("class",strmean)
           .attr("x1",avgx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",start + margin.top + graphHeight - freqMax*2*radius - 10) 
        dot.append("circle")
           .attr("class",strmean)
           .attr("cx",avgx)
           .attr("cy",ty)
           .attr("r",2)
        dot.append("line")
           .attr("class",strmean)
           .attr("x1",stdmx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",ty)
        dot.append("line")
           .attr("class",strmean)
           .attr("x1",stdpx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",ty)
        dot.append("circle")
           .attr("class",strmean)
           .attr("cx",stdmx)
           .attr("cy",ty)
           .attr("r",2)
        dot.append("circle")
           .attr("class",strmean)
           .attr("cx",stdpx)
           .attr("cy",ty)
           .attr("r",2)
        dot.append("text")
           .attr("class",strmean)
           .attr("x", avgx-28)
           .attr("y", ty + 15)
           .text("평균="+f2(avg))
        dot.append("text")
           .attr("class",strmean)
           .attr("x", stdpx+10)
           .attr("y", ty+5)
           .text(strstd+f2(std))
      }
/*
      else {
        dot2.append("line")       
           .attr("class",strmean)
           .attr("x1",avgx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",start + margin.top + graphHeight - freqMax*2*radius - 10) 
        dot2.append("circle")
           .attr("class",strmean)
           .attr("cx",avgx)
           .attr("cy",ty)
           .attr("r",2)
        dot2.append("line")
           .attr("class",strmean)
           .attr("x1",stdmx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",ty)
        dot2.append("line")
           .attr("class",strmean)
           .attr("x1",stdpx)
           .attr("y1",ty)
           .attr("x2",avgx)
           .attr("y2",ty)
        dot2.append("circle")
           .attr("class",strmean)
           .attr("cx",stdmx)
           .attr("cy",ty)
           .attr("r",2)
        dot2.append("circle")
           .attr("class",strmean)
           .attr("cx",stdpx)
           .attr("cy",ty)
           .attr("r",2)
        dot2.append("text")
           .attr("class",strmean)
           .attr("x", avgx-28)
           .attr("y", ty + 15)
           .text("평균="+f2(avg))
        dot2.append("text")
           .attr("class",strmean)
           .attr("x", stdpx+10)
           .attr("y", ty+5)
           .text("표준편차="+f2(std))
      }
*/
}
     
// 상자그래프 표시 함수
function drawBoxSample(stat, start, type) {
  
        if (type == 1) var strmean = "meanP";   // type = 1 for population
        else var strmean = "meanS";             // type = 2 for sample

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
           .attr("class",strmean)
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2)

        dot.append("text")
           .attr("class",strmean)
           .attr("x", x2-28)
           .attr("y", y1-3)
           .text("min="+f2(min))

        x2 = x1 + graphWidth*(Q1-min)/xrange;
        dot.append("line")
           .attr("class",strmean)
           .attr("x1",x1)
           .attr("y1",y1+lineHeight/2)
           .attr("x2",x2)
           .attr("y2",y1+lineHeight/2)

        x1 = margin.left + graphWidth*(max-gxmin)/xrange;
        x2 = x1;
        dot.append("line")
           .attr("class",strmean)
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2) 

        dot.append("text")
          .attr("class",strmean)
          .attr("x", x2-28)
          .attr("y", y1-3)
          .text("max="+f2(max))

        x1 = margin.left + graphWidth*(Q1-gxmin)/xrange;
        width = graphWidth*IQR/xrange;
        height = lineHeight;

        dot.append("rect")
           .attr("class",strmean)
           .attr("x",x1)
           .attr("y",y1)
           .attr("width",width)
           .attr("height",height)
           .style("fill","yellow")
 
        dot.append("text")
           .attr("class",strmean)
           .attr("x", x1-22)
           .attr("y", y2+lineHeight/2)
           .text("Q1="+f2(Q1))

        dot.append("text")
           .attr("class",strmean)
           .attr("x", x1+width-20)
           .attr("y", y2+lineHeight/2)
           .text("Q3="+f2(Q3))

        x1 = margin.left + graphWidth*(Q3-gxmin)/xrange;
        x2 = x1 + graphWidth*(max-Q3)/xrange;
        dot.append("line")
           .attr("class",strmean)
           .attr("x1",x1)
           .attr("y1",y1+lineHeight/2)
           .attr("x2",x2)
           .attr("y2",y1+lineHeight/2)

        x1 = margin.left + graphWidth*(median-gxmin)/xrange;
        x2 = x1;
        dot.append("line")
           .attr("class",strmean)
           .attr("x1",x1)
           .attr("y1",y1)
           .attr("x2",x2)
           .attr("y2",y2)

        dot.append("text")
          .attr("class",strmean)
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
        dot2.append("text").attr("class","meanG").attr("x",tx-125).attr("y",ty+8).text("P(동전 겉면) = ").style("stroke","blue");
        dot2.append("text").attr("class","meanG").attr("x",tx).attr("y",ty).text("동전 겉면의 수").style("stroke","blue");
        dot2.append("line").attr("class","meanG").attr("x1",tx-10).attr("y1",ty+5).attr("x2",tx+90).attr("y2",ty+5);
        dot2.append("text").attr("class","meanG").attr("x",tx+100).attr("y",ty+8).text(" = ").style("stroke","black");
        dot2.append("line").attr("class","meanG").attr("x1",tx+120).attr("y1",ty+5).attr("x2",tx+160).attr("y2",ty+5);
        dot2.append("text").attr("class","meanG").attr("x",tx).attr("y",ty+20).text("동전 시행 횟수 ").style("stroke","grey");

        dot2.append("text").attr("class","meanG").attr("x",tx+150).attr("y",ty-50).text("겉면").style("stroke","blue");
        dot2.append("text").attr("class","meanG").attr("x",tx-135).attr("y",ty-50).text("뒷면").style("stroke","red");
        dot2.append("text").attr("class","title").attr("x",tx-20).attr("y",margin.top+ybuffer*0.5).text("대수의 법칙").style("stroke","blue");

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


// 대수의 법칙 데모 함수
function lawLargeDemo(nobs) {
        var i, i1, i2, k, color;
        var x1, x2, x3, y1, y2, y3;
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


        // 손 tossing graph
        x1 = margin.left + 4*xbuffer;
        y1 = margin.top + ybuffer;
        //The data for hand path
        var lineDataT = [ [30,60], [70,50], [95,15], [105,15], [102,35], [100,40], [100,45], [160,50], [160,60], [100,60] ];
        var lineDataB = [ [30,90], [60,80], [80,95], [95,100], [105,95], [110,80] ];
//        var lineDataC = [ [175,60], [185,50], [195,60], [190,70], [205,60], [215,50] ];
        var lineGenerator = d3.line().curve(d3.curveCardinal);
        var pathString    = lineGenerator(lineDataT);
        svg.append("path").attr("d", pathString).attr("stroke","black").attr("fill", "none").attr("class","hand");
        pathString    = lineGenerator(lineDataB);
        svg.append("path").attr("d", pathString).attr("stroke","black").attr("fill", "none").attr("class","hand");
//        pathString    = lineGenerator(lineDataC);
//        svg.append("path").attr("d", pathString).attr("stroke","black").attr("fill", "none").attr("class","hand");

        svg.append("rect").attr("class","hand").attr("x",x1-tgapx).attr("y",y1+tgaph)
            .attr("width",twidth).attr("height",theight).attr("rx",trx).attr("ry",trx)
            .style("stroke","black").style("fill","white");
        svg.append("rect").attr("class","hand").attr("x",x1-2*tgapx).attr("y",y1+2*tgaph)
            .attr("width",twidth).attr("height",theight).attr("rx",trx).attr("ry",trx)
            .style("stroke","black").style("fill","white");
        svg.append("rect").attr("class","hand").attr("x",x1-3*tgapx).attr("y",y1+3*tgaph)
            .attr("width",twidth).attr("height",theight).attr("rx",trx).attr("ry",trx)
            .style("stroke","black").style("fill","white");


        // 처음 50개 점 만들고 궤적 그리기
        i1 = -50; i2 = -50;
        for (k=0; k<tobs; k++) {

           setTimeout(function() {	               
              x1 = margin.left + graphWidth/2 ;            // 하늘 좌표
              y1 = margin.top + ybuffer+33;
              x2 = margin.left + graphWidth/2;
              y2 = y1 + gap;
              if (Math.random() < pp) {
                   x3 = x2 - gap;
                   y3 = y2 + gap;
                   color = "#FF4500";
                   i1 += 15;
                   i  = i1;
              } else { 
                   x3 = x2 + gap;
                   y3 = y2 + gap;
                   color = "#0055FF";
                   i2 += 15;
                   i  = i2
              };    
              
              var cir = svg.append("circle").attr("class","circleR") 
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
	         .attr("cy", y3+i)
                 .style("fill",color)
                 .style("stroke","white")

            }, 300*k); // endof setTimeout
        
        } // endof k 

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
          dot2.append("circle").attr("class","meanG").attr("cx",avgx).attr("cy",ty).attr("r",2);
          dot2.append("line")  .attr("class","meanG").attr("x1",stdmx).attr("y1",ty).attr("x2",avgx).attr("y2",ty);
          dot2.append("line")  .attr("class","meanG").attr("x1",stdpx).attr("y1",ty).attr("x2",avgx).attr("y2",ty);
        }
        else {
          dot2.append("circle").attr("class","meanR").attr("cx",avgx).attr("cy",ty).attr("r",2);
          dot2.append("line")  .attr("class","meanR").attr("x1",stdmx).attr("y1",ty).attr("x2",avgx).attr("y2",ty);
          dot2.append("line")  .attr("class","meanR").attr("x1",stdpx).attr("y1",ty).attr("x2",avgx).attr("y2",ty);
        }
        if (niter < 6) {
          if (checkMu) dot2.append("text").attr("class","meanG").attr("x", avgx-28).attr("y", ty + 15).text("표본평균="+f2(avg))
          else dot2.append("text").attr("class","meanR").attr("x", avgx-28).attr("y", ty + 15).text("표본평균="+f2(avg))
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
