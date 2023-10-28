﻿      var bar = d3.select("#chart");
      var svgWidth, svgHeight, svgWidth2, svgHeight2, margin, graphWidth, graphHeight; 
      var margin = {top: 90, bottom: 90, left: 100, right: 120};
      svgWidth   = 600; svgWidth2  = svgWidth;
      svgHeight  = 400; svgHeight2 = svgHeight;
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;   

      var nvalue, checkData, mu0, mu, std, alpha;
      var hypoType, h1Type, df, info, f, g, h, pvalue, stat, T, zobs;
      hypoType = 95;
      var ngroup  = 2;
      var maxCell   = 1000;
      var nobs      = new Array(5);
      var ranksum   = new Array(5);
      var dataValue = new Array(maxCell);
      var dvalueP   = new Array(maxCell);
      var w = [];
      var x = [];
      var y = [];
      var i,j,k;
      var checkExecute = false;
      document.getElementById("alpha2").disabled = true;  
      document.getElementById("nn41").disabled   = true;
      document.getElementById("nn42").disabled   = true;
      document.getElementById("xbar41").disabled = true;
      document.getElementById("xbar42").disabled = true;
      // H1 type
      var h1 = document.myForm0.type0;
      var h1Type = 1; 
      h1[0].onclick = function() { h1Type = 1; if (checkExecute) testingSignedRanksum(); }    // 양측검정
      h1[1].onclick = function() { h1Type = 2; if (checkExecute) testingSignedRanksum(); }    // 우측검정
      h1[2].onclick = function() { h1Type = 3; if (checkExecute) testingSignedRanksum(); }    // 좌측검정

      // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        w = data;  
      });
      updateData = function() {
        document.getElementById("data1").value = '';
      }

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("data1").value  = "";
        document.getElementById("nn41").value   = "";
        document.getElementById("nn42").value   = "";
        document.getElementById("xbar41").value = "";
        document.getElementById("xbar42").value = "";
        document.getElementById("alpha").value  = "0.05";
        document.getElementById("alpha2").value = "0.05";
      })

    // Testing Hypothesis ===========================================================
    d3.select("#executeTH4").on("click",function() {
        checkExecute = true;
        // alpha
        alpha = parseFloat(d3.select("#alpha").node().value);
        if (alpha < 0.001) {
          alpha = 0.001;
          document.getElementById("alpha").value = alpha;
        }
        else if (alpha > 0.499) {
          alpha = 0.499;
          document.getElementById("alpha").value = alpha;
        }
        document.getElementById("alpha2").value = alpha;
        document.getElementById("rangeAlpha").value = alpha*1000;
        // enter mu0
        mu0 = parseFloat(document.getElementById("mu").value);
        if (isNaN(mu0)) {
          alert("Enter M\u2080 !!!");
          return;
        }
        testingSignedRanksum();
    })

    // svg Graph Save
    d3.select("#saveGraphU").on("click", function() {
        var svg = d3.select("#chart");
        var width = svgWidth;
        var height = svgHeight;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
    });

    // 순위합통계표 버튼 클릭
    d3.select("#ranksumBtn").on("click",function() {
      if (nobs[0] <= 20) WilcoxonSignedRankSumTable(nvalue, nobs, dataValue, dvalueP);
      else alert("No Exact Distribution if n > 20")

    })
    // save Table
    d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
    });

//********************************************************************
function drawSignedRankGraph(title,sub1,sub2, nvalue, dataValue, dvalueP, ranksum, alpha, h1Type, checkData) {
         var i, k, sum1, sum2, str, x1, y1, x2, y2;
         var sum11, sum12, sum22, sum31, loc11, loc12, loc22, loc31;
         var xmin      = dataValue[0];
         var xmax      = dataValue[nvalue-1];
         var ymin      = d3.min(dvalueP);
         var ymax      = d3.max(dvalueP);
         var gymin     = ymin;
         var gymax     = ymax + ymax/5;  
         var yRatio    = graphHeight / gymax;          // 그래프 영역과 데이터 영역의 비율
         var betweenbarWidth = graphWidth / nvalue;   // 막대와 막대 사이의 너비
         var barWidth  = betweenbarWidth * 2 / 3;    // 막대의 너비
         var barMargin = (betweenbarWidth / 3) / 2; // 왼쪽 마진

         // draw title
         x1 = margin.left + graphWidth/2;
         y1 = margin.top/2;
         bar.append("text").attr("x",x1).attr("y",y1).text(title)
            .style("font-family","sans-serif").style("font-size","12pt").style("stroke","black").style("text-anchor","middle")         
         bar.append("text").attr("x",x1).attr("y",y1+15).text(sub1)
            .style("font-family","sans-serif").style("font-size","9pt").style("stroke","black").style("text-anchor","middle")
         bar.append("text").attr("x",x1).attr("y",y1+30).text(sub2)
            .style("font-family","sans-serif").style("font-size","9pt").style("stroke","green").style("text-anchor","middle")

         // draw Y and X axis
         drawBinomialAxis(gymin, gymax);
         drawBinomialLabel(nvalue, dataValue, betweenbarWidth);
         // 분포함수 막대그래프
         for (var k=0; k<nvalue; k++) {
           bar.append("rect")
            .style("fill",myColor[0])
            .attr("height",0)
            .attr("width",barWidth)
            .attr("x", margin.left +barMargin + k*betweenbarWidth)
            .attr("y",svgHeight - margin.bottom)
            .transition()                           // 애니매이션 효과 지정
            .delay(function(d,i) {return i*100;})   // 0.5초마다 그리도록 대기시간 설정
            .duration(1000)                         // 2초동안 애니매이션이 진행되도록 설정
            .attr("y", svgHeight - margin.bottom - dvalueP[k]*yRatio)
            .attr("height", dvalueP[k]*yRatio)
         }
         if (checkData == false) return; 
         // 표본통계량 위치 표시
         sum1 = 0;
         sum2 = 0;
         for (i=0; i<nvalue; i++) {
           if (dataValue[i] < ranksum) sum1 += dvalueP[i];
           else if (dataValue[i] == ranksum) {
             sum1 += dvalueP[i];
             sum2 += dvalueP[i];
           }
           else sum2 += dvalueP[i];
         }
         x1 = margin.left +barMargin + (ranksum-dataValue[0])*betweenbarWidth + barWidth/2;
         x2 = x1;
         y1 = margin.top + 20;
         y2 = margin.top + graphHeight + 30;
         bar.append("line").style("stroke","green").style("stroke-width","2px")
            .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
         str = "R+ = "+ranksum;
         bar.append("text").attr("x", x2).attr("y", y2+15).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","middle")
         str = "P( X \u2264 (R+) ) = "+f4(sum1);
         bar.append("text").attr("x", x2-5).attr("y", y2+30).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","end")
         str = "P( X \u2265 (R+) ) = "+f4(sum2);
         bar.append("text").attr("x", x2+5).attr("y", y2+30).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","start")

         // 기준선 표시            
         sum11 = 0;
         for (i=0; i<nvalue; i++) {
           sum11 += dvalueP[i];
           if (sum11 > alpha/2) {loc11 = dataValue[i]; break;}
         }
         sum12 = 0;
         for (i=nvalue-1; i>=0; i--) {
           sum12 += dvalueP[i];
           if (sum12 > alpha/2) {loc12 = dataValue[i]; break;}
         } 
         sum22 = 0;
         for (i=nvalue-1; i>=0; i--) {
           sum22 += dvalueP[i];
           if (sum22 > alpha) {loc22 = dataValue[i]; break;}
         } 
         sum31 = 0;
         for (i=0; i<nvalue; i++) {
           sum31 += dvalueP[i];
           if (sum31 > alpha) {loc31 = dataValue[i]; break;}
         }
         y1 = margin.top + graphHeight/2 + 20;
         y2 = margin.top + graphHeight + 20 ;
         if (h1Type == 1) {
           x1 = margin.left +barMargin + (loc11-dataValue[0])*betweenbarWidth + barWidth/2;
           x2 = x1;
           bar.append("line").style("stroke","red").style("stroke-width","1px")
              .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           bar.append("text").attr("x", x2).attr("y", y2+10).text(loc11)
              .style("font-size","9pt").style("stroke","red").style("text-anchor","middle")
           bar.append("text").attr("x", x2-5).attr("y", y2-50).text(f4(sum11))
              .style("font-size","9pt").style("stroke","red").style("text-anchor","end")
           x1 = margin.left +barMargin + (loc12-dataValue[0])*betweenbarWidth + barWidth/2;
           x2 = x1;
           bar.append("line").style("stroke","red").style("stroke-width","1px")
              .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           bar.append("text").attr("x", x2).attr("y", y2+10).text(loc12)
              .style("font-size","9pt").style("stroke","red").style("text-anchor","middle")
           bar.append("text").attr("x", x2+5).attr("y", y2-50).text(f4(sum12))
              .style("font-size","9pt").style("stroke","red").style("text-anchor","start")
         }
         else if (h1Type == 2) {
           x1 = margin.left +barMargin + (loc22-dataValue[0])*betweenbarWidth + barWidth/2;
           x2 = x1;
           bar.append("line").style("stroke","red").style("stroke-width","1px")
              .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           bar.append("text").attr("x", x2).attr("y", y2+10).text(loc22)
              .style("font-size","9pt").style("stroke","red").style("text-anchor","middle")
           bar.append("text").attr("x", x2-5).attr("y", y2-50).text(f4(sum22))
              .style("font-size","9pt").style("stroke","red").style("text-anchor","start")
         }
         else {
           x1 = margin.left +barMargin + (loc31-dataValue[0])*betweenbarWidth + barWidth/2;
           x2 = x1;
           bar.append("line").style("stroke","red").style("stroke-width","1px")
              .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
           bar.append("text").attr("x", x2).attr("y", y2+10).text(loc31)
              .style("font-size","9pt").style("stroke","red").style("text-anchor","middle")
           bar.append("text").attr("x", x2+5).attr("y", y2-50).text(f4(sum31))
              .style("font-size","9pt").style("stroke","red").style("text-anchor","end")
         }

}

// 윌콕슨분포표
function WilcoxonSignedRankSumTable(nvalue, nobs, dataValue, dvalueP) {
    var screenTable = document.getElementById("screenTable");
    var table = document.createElement('table');
    loc.appendChild(table);

        var row, header;
        var i, j, sum;
        var nrow = 0;
        var ncol = 4;
        var cell = new Array(4);

         table.style.fontSize = "13px";
    
          row = table.insertRow(nrow);
          row.style.height ="30px";
          for (j=0; j<2; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          cell[0].innerHTML = "<h3>"+svgStrU[68][langNum]+"</h3>";
          cell[1].innerHTML = "n = "+nobs[0];

          row  = table.insertRow(++nrow);
          row.style.height ="30px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.backgroundColor = "#eee";
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          for (j=0; j<ncol; j++) {
            cell[j].style.width ="80px";
          }
          cell[0].innerHTML = "x";
          cell[1].innerHTML = "P(X = x)";
          cell[2].innerHTML = "P(X &leq; x)";
          cell[3].innerHTML = "P(X &geq; x)";
          sum = 0;
          for (i=0; i<nvalue; i++) {
            row = table.insertRow(++nrow);
            for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j)          
              cell[j].style.textAlign = "center";
              cell[j].style.border = "1px solid black";
            }
            cell[0].style.backgroundColor = "#eee";
            cell[0].innerHTML = dataValue[i];
            cell[1].innerHTML = f4(dvalueP[i]);
            sum += dvalueP[i];
            cell[2].innerHTML = f4(sum);
            cell[3].innerHTML = f4(1 - sum + dvalueP[i]);
          }
}
/*
// rank sum distribution for Ranksum1 : Signed Rank  
function rankSumDist(m, n, dataValue, dvalueP) {
      var i, j, k, p, N2, nobs, nvalue, sumB, sumR;
      var k = m + n;
      var B = new Array(k+1);  // Binary
      var R = new Array(k+1);  // Rank
      var tdata = [];
      N2 = 1;
      for (j=1; j<=k; j++) {
        B[j] = 0;
        R[j] = j;
        N2 *=2;
      }
      // rank sum의 모든 경우의 수
      for (i=1; i<=N2; i++) {
        j = k; 
        B[j] ++;
        do {
          if (B[j] > 1) {
            B[j] = 0;
            j--
            B[j]++;
          }
          else break;
        } while (B[j] > 1)
        // Binary 합계가 n과 일치될때만 rank sum 계산
//        sumB = 0;
//        for (j=1; j<=k; j++) sumB += B[j];
//        if (sumB == n) {
          sumR = 0;
          for (j=1; j<=k; j++) {
            sumR += B[j]*R[j];
          }
          tdata.push(sumR);
//        }
//        else sumR = NaN;
      }
      // rank sum의 distribution 계산
      tdata.sort(function(a, b){return a-b});
      nobs = tdata.length;
      nvalue = valueFreq(nobs, tdata, dataValue, dvalueP); 
      for (j=0; j<nvalue; j++) dvalueP[j] = dvalueP[j] / nobs;
      return nvalue;
}

// Counting value & freq of sorted array dataA
function valueFreq(tobs, dataA, dataValue, dvalueFreq ) {
        var i, nvalue;
        for(i=0; i<tobs; i++) {
          dvalueFreq[i]=0; 
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
        }
        nvalue++;
        return nvalue;
}
*/

function testingSignedRanksum() {
      bar.selectAll("*").remove();
      nobs[1] = 0;
      nobs[2] = 0;
      for (i=0; i<w.length; i++) {
        if (w[i] < mu0) {
          x[nobs[1]] = Math.abs(w[i]-mu0); 
          nobs[1]++;
        }
        else if (w[i] > mu0) {
          y[nobs[2]] = Math.abs(w[i] - mu0);
          nobs[2]++;
        }
      }
      document.getElementById("nn41").value   = nobs[1];    
      document.getElementById("nn42").value   = nobs[2];    

      nobs[0] = nobs[1] + nobs[2]; 
      var z = new Array(nobs[0]);
      z = x.concat(y);        
      // Calculate signed rank sum
      T = statRankSum(ngroup, nobs, z, ranksum);
      document.getElementById("xbar41").value = ranksum[1];
      document.getElementById("xbar42").value = ranksum[2];

      // check exact or approximation
      if (nobs[0] < 21) { // Wilcoxon Signed Rank Test
        // Wilcoxon Rank Sum Distribution
        var checkRankSum = false;
        for (j=0; j<maxCell; j++) dvalueP[j] = 0;
        nvalue = rankSumDist(0, nobs[0], dataValue, dvalueP, checkRankSum);
        // draw graph
        var title  = svgStrU[68][langNum]; // "Wilcoxon Rank Sum Test" 
        var sub1 = "H\u2080: M = M\u2080  " + " , H\u2081: M "+ symbol[h1Type-1] + " M\u2080" ;
        var sub2 = svgStrU[23][langNum]+" (R+) ~ Wilcoxson Sign (n = "+nobs[0]+") "+svgStrU[24][langNum];
        drawSignedRankGraph(title, sub1, sub2, nvalue, dataValue, dvalueP, ranksum[2], alpha, h1Type, checkData) 
      }
      else {  // Z-test
        mu  = nobs[0]*(nobs[0]+1)/4;
        std = Math.sqrt( (nobs[0]*(nobs[0]+1)*(2*nobs[0]+1) - 0.5*T) / 24 ); 
        teststat = ranksum[2];
        zobs = (ranksum[2] - mu) / std;
        
        if (h1Type == 1) {
            h = alpha / 2;  
            f = mu + stdnormal_inv(h, info)*std;
            g = mu + stdnormal_inv(1-h, info)*std;
            if (zobs < 0) pvalue = 2 * stdnormal_cdf(zobs);
            else  pvalue = 2 * (1 - stdnormal_cdf(zobs));
            drawNormalGraphTH(hypoType, h1Type, teststat, mu, std, f, g, h, pvalue, mu0);
        }
        else if (h1Type == 2) {
            h = alpha;  
            f = mu - 5*std
            g = mu + stdnormal_inv(1-h, info)*std;
            pvalue = 1 - stdnormal_cdf(zobs);
            drawNormalGraphTH(hypoType, h1Type, teststat, mu, std, f, g, h, pvalue, mu0);
        }
        else {
            h = alpha;  
            f = mu + stdnormal_inv(h, info)*std;
            g = mu + 5*std;
            pvalue = stdnormal_cdf(zobs);
            drawNormalGraphTH(hypoType, h1Type, teststat, mu, std, f, g, h, pvalue, mu0);
        }
      }  
}
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingSignedRanksum();
} 
