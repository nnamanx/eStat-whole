      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight; 
      var margin = {top: 90, bottom: 90, left: 100, right: 120};
      svgWidth   = 600;
      svgHeight  = 400;
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;   

      var i,j,k,m, jj, nblock, nkk, kfact, sum, sumT, sqsumR, S, SP;
      var i1, i2, i3, i4, i5, nvalue;      
      var maxk     = 4;
      var maxblock = 5;
      var maxfact  = 4*3*2*1;
      var tobs, nvalue, checkData;
      var hypoType, h1Type, df, info, f, g, h, pvalue, stat;
      hypoType = 99;
      h1Type = 2; 
      var kobs    = new Array(maxblock+1);
      var ranksum = new Array(maxk+1);
      var R       = new Array(maxk);  
      var sumR    = new Array(maxk);  
      var tempR   = new Array(maxk);
      var T       = new Array(maxblock); //duplication weight of each block
      var tdata     = [];
      var dataValue = [];
      var dvalueP   = [];

      var y = new Array(maxblock);
      var w = new Array(maxblock);
      for (i=0; i<maxblock; i++) {
         y[i] = new Array(maxk);
         w[i] = new Array(maxk);
      }
      var x = new Array(maxk);
      for (i=0; i<maxfact; i++) {
         x[i] = new Array(maxk);
      }

      var checkExecute = false;  // 시간이 너무 걸려 체크
      document.getElementById("alpha2").disabled = true;  
      document.getElementById("xbar71").disabled = true;
      document.getElementById("xbar72").disabled = true;
      document.getElementById("xbar73").disabled = true;
      document.getElementById("xbar74").disabled = true;
      document.getElementById("nn71").disabled   = true;
      document.getElementById("nn72").disabled   = true;
      document.getElementById("friedmanS").disabled = true;

      // input data control ===================================================
      d3.select("#data1").on("input", function() {
        stat = simplestat("#data1");  
        y[0] = data;
        if (document.getElementById("data1").value == "") kobs[1] = 0;
        else kobs[1] = y[0].length;
        updateData();
      });
      d3.select("#data2").on("input", function() {
        stat = simplestat("#data2");  
        y[1] = data; 
        if (document.getElementById("data2").value == "") kobs[2] = 0;
        else kobs[2] = y[1].length;
        updateData();
      });
      d3.select("#data3").on("input", function() {
        stat = simplestat("#data3");  
        y[2] = data;
        if (document.getElementById("data3").value == "") kobs[3] = 0;
        else kobs[3] = y[2].length;
        updateData();
      });
      d3.select("#data4").on("input", function() {
        stat = simplestat("#data4");  
        y[3] = data;
        if (document.getElementById("data4").value == "") kobs[4] = 0;
        else kobs[4] = y[3].length;
        updateData();
      });
      d3.select("#data5").on("input", function() {
        stat = simplestat("#data5");  
        y[4] = data;
        if (document.getElementById("data5").value == "") kobs[5] = 0;
        else kobs[5] = y[4].length;
        updateData();
      });
      function updateData() {
        document.getElementById("xbar71").value = "";
        document.getElementById("xbar72").value = "";
        document.getElementById("xbar73").value = "";
        document.getElementById("xbar74").value = "";
        document.getElementById("nn71").value = "";
        document.getElementById("nn72").value = "";
        document.getElementById("friedmanS").value = "";
      }

      // erase Data and Graph
      d3.select("#erase").on("click",function() {
        bar.selectAll("*").remove();
        document.getElementById("data1").value  = "";
        document.getElementById("data2").value  = "";
        document.getElementById("data3").value  = "";
        document.getElementById("data4").value  = "";
        document.getElementById("data5").value  = "";
        document.getElementById("nn71").value   = "";
        document.getElementById("nn72").value   = "";
        document.getElementById("xbar71").value = "";
        document.getElementById("xbar72").value = "";
        document.getElementById("xbar73").value = "";
        document.getElementById("xbar74").value = "";
        document.getElementById("friedmanS").value = "";
        for (i=0; i<maxblock; i++) {
          for (j=0; j<maxk; j++) {
            y[i][j] = "";
            w[i][j] = "";
          }
        }
        for (i=0; i<maxblock+1; i++) kobs[i]=0;
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

        // check data
        nblock = 0;
        for (i=1; i<=5; i++) {
          if(kobs[i] > 4) {alert("k is too big!!!"); return}
          if(kobs[i] > 0) nblock++;
        }
        for (i=2; i<=nblock; i++) if (kobs[i] != kobs[i-1]) {alert("k should be equal"); return;}
        nkk = kobs[1];
        testingFriedman();
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

    // 크루스칼 통계표 버튼 클릭
    d3.select("#ranksumBtn").on("click",function() {
        FriedmanDistTable(nvalue, nkk, nblock, dataValue, dvalueP);
    })
    // save Table
    d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
    });

// swap ith and jth of arr[]
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];	
  arr[j] = temp;
}
// All Possible Permutation
function perm(arr, depth, n, k) { 
/*
   arr   : array for permutation, 
   depth : 한번 depth 가 k로 도달하면 사이클이 돌았음. 출력함 시작 0
   n     : nPk 의 n
   k     : nPk 의 k
*/
  if (depth == k) { // 한번 depth 가 k로 도달하면 사이클이 돌았음. 출력함. 
    for (var m=0; m<n; m++)    x[jj][m] = arr[m];
//    console.log(x[jj]);
    jj++;
    return; 
  } 
  for (var i = depth; i < n; i++) {
    swap(arr, i, depth); 
    perm(arr, depth + 1, n, k, n); 
    swap(arr, i, depth); 
  } 
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

// Calculate average rank and duplication weight  
function rankFriedman(nkk, dataA, rank) {
      var i,j, temp, tempi, sum, t3;
      var index = new Array(nkk);
      var tempR = new Array(nkk);

      // Sorting and indexing data in ascending order
      for (i=0; i<nkk; i++) {
        index[i] = i; 
        tempR[i] = i+1;
      }
      for (i=0; i<nkk-1; i++) {
        for (j=i; j<nkk; j++) {
          if(dataA[i] > dataA[j]) {
              temp     = dataA[i];  tempi    = index[i];
              dataA[i] = dataA[j];  index[i] = index[j];
              dataA[j] = temp;      index[j] = tempi;  
          }
        }
      } 

      // Counting the same value, give average rank
      nvalue = 1;
      t3 = 0;
      sum = tempR[0];
      for (i=1; i<nkk; i++) {
        if (dataA[i] == dataA[i-1]) {
          nvalue++;
          sum += tempR[i];
        }
        else {
          t3 += nvalue*nvalue*nvalue;
          temp = sum / nvalue;
          for (k=i-1; k>= i-nvalue; k--) tempR[k] = temp;
          nvalue = 1;
          sum = tempR[i];
        }
      }
      if (nvalue > 1) { // 마지막 원소까지 같다가 끝났을 경우
          t3 += nvalue*nvalue*nvalue
          temp = sum / nvalue;
          for (k=i-1; k>= i-nvalue; k--) tempR[k] = temp;
      }
      else { // 마지막 원소가 다르게 끝난 경우 nvalue = 1 tempR[k]는 그대로
          t3 += nvalue*nvalue*nvalue
      }

      for (j=0; j<nkk; j++) rank[index[j]] = tempR[j];
      t3 = t3 - nkk;
      return t3;      
}


function drawFriedmanBarGraph(title,sub1,sub2, nvalue, dataValue, dvalueP, ranksum, alpha, h1Type, checkData) {
         var i, k, sum1, sum2, str, x1, y1, x2, y2;
         var sum32, loc32, loc;
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
           else if (Math.abs(dataValue[i] - ranksum) < 0.001 ) {
             loc = i;
             sum1 += dvalueP[i]; 
             break;
           }
           else {
             loc = i - 0.5;
             break;
           }
         }
         for (i=0; i<nvalue; i++) {
           if (dataValue[i] == ranksum) {
             sum2 += dvalueP[i];
           }
           else if (dataValue[i] > ranksum)  sum2 += dvalueP[i];
         }
         if (dataValue[nvalue-1] < ranksum) loc = nvalue-1;
         x1 = margin.left +barMargin + loc*betweenbarWidth + barWidth/2;
         x2 = x1;
         y1 = margin.top + 20;
         y2 = margin.top + graphHeight + 45;
         bar.append("line").style("stroke","green").style("stroke-width","2px")
            .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
         str = "S = "+f3(ranksum);
         bar.append("text").attr("x", x2).attr("y", y2+15).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","middle")
         str = "P(X \u2264 S) = "+f4(sum1);
         bar.append("text").attr("x", x2-5).attr("y", y2+30).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","end")
         str = "P(X \u2265 S) = "+f4(sum2);
         bar.append("text").attr("x", x2+5).attr("y", y2+30).text(str)
            .style("font-size","9pt").style("stroke","green").style("text-anchor","start")

         // 기준선 표시            
         sum32 = 0;
         for (i=nvalue-1; i>=0; i--) {
           sum32 += dvalueP[i];
           if (sum32 > alpha) {loc32 = i; break;}
         } 
         y1 = margin.top + graphHeight/2 + 20;
         y2 = margin.top + graphHeight + 30 ;
         x1 = margin.left + barMargin + loc32*betweenbarWidth + barWidth/2;
         x2 = x1;
         bar.append("line").style("stroke","red").style("stroke-width","1px")
            .attr("x1",x1).attr("y1",y1).attr("x2",x2).attr("y2",y2)
         bar.append("text").attr("x", x2).attr("y", y2+10).text(f3(dataValue[loc32]))
            .style("font-size","9pt").style("stroke","red").style("text-anchor","middle")
         bar.append("text").attr("x", x2+5).attr("y", y2-50).text(f4(sum32))
            .style("font-size","9pt").style("stroke","red").style("text-anchor","start")

}

// 프리드만분포표
function FriedmanDistTable(nvalue, nkk, nobs, dataValue, dvalueP) {
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
          for (j=0; j<3; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          cell[0].innerHTML = "<h3>"+svgStrU[72][langNum]+"</h3>";
          cell[1].innerHTML = "k = "+nkk;
          cell[2].innerHTML = "n = "+nobs;

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
            cell[0].innerHTML = f3(dataValue[i]);
            cell[1].innerHTML = f4(dvalueP[i]);
            sum += dvalueP[i];
            cell[2].innerHTML = f4(sum);
            cell[3].innerHTML = f4(1 - sum + dvalueP[i]);
          }
}
// Friedman Test
function testingFriedman() {
      bar.selectAll("*").remove();
      // calculate sample ranksum
      sumT = 0;
      for (i=0; i<nblock; i++) {
        for (k=0; k<nkk; k++) tdata[k] = y[i][k];
        T[i] = rankFriedman(nkk, tdata, tempR);  //duplication weight
        sumT += T[i];
        for (k=0; k<nkk; k++) w[i][k] = tempR[k];
      }  

      // calculate Friedman Stat
      sqsumR = 0;
      for (k=0; k<nkk; k++) {
        sum = 0;
        for (i=0; i<nblock; i++) {
          sum += w[i][k];
        }
        ranksum[k] = sum;
        str = "xbar7"+(k+1).toString();
        document.getElementById(str).value = ranksum[k];
        sqsumR += ranksum[k]*ranksum[k];
      }
      S  = 12*sqsumR/(nblock*nkk*(nkk+1)) - 3*nblock*(nkk+1);
      SP = S / (1 - sumT/(nblock*nkk*(nkk*nkk-1)) );
      document.getElementById("nn71").value = nkk;
      document.getElementById("nn72").value = nblock;
      document.getElementById("friedmanS").value = f2(SP);

     if (nkk < 5) { // exact Friedman Distribution
        // All possible factorial of Rank -팩토리얼 함수에서 메인으로 덤프 x[][] 하여 통계량 계산
        kfact = 1;
        for(i=0; i<nkk; i++) kfact *=(i+1);
        jj = 0; // factorial id num 초기치  메인으로 덤프 x[jj][]
        for (i=0; i<nkk; i++) R[i] = i+1;
        perm(R, 0, nkk, nkk) ;  // Permutation

        // Calculate Friedman Distribution 
        if (nblock == 2) {
           m =0;
           for (i1=0; i1<kfact; i1++) {
             for (i2=0; i2<kfact; i2++) {
               sqsumR = 0;
               for (k=0; k<nkk; k++) {
                 sumR[k] = x[i1][k] + x[i2][k];
                 sqsumR += sumR[k]*sumR[k];
               }
               tdata[m] = 12*sqsumR/(nblock*nkk*(nkk+1)) - 3*nblock*(nkk+1);
               m++;
             }
           }
         }
         else if (nblock == 3) {
           m =0;
           for (i1=0; i1<kfact; i1++) {
             for (i2=0; i2<kfact; i2++) {
               for (i3=0; i3<kfact; i3++) {
                 sqsumR = 0;
                 for (k=0; k<nkk; k++) {
                   sumR[k] = x[i1][k] + x[i2][k] + x[i3][k];
                   sqsumR += sumR[k]*sumR[k];
                 }
                 tdata[m] = 12*sqsumR/(nblock*nkk*(nkk+1)) - 3*nblock*(nkk+1);
                 m++;
               }
             }
           }
         }
         else if (nblock == 4) {
           m =0;
           for (i1=0; i1<kfact; i1++) {
             for (i2=0; i2<kfact; i2++) {
               for (i3=0; i3<kfact; i3++) {
                 for (i4=0; i4<kfact; i4++) {
                   sqsumR = 0;
                   for (k=0; k<nkk; k++) {
                     sumR[k] = x[i1][k] + x[i2][k] + x[i3][k] + x[i4][k];
                     sqsumR += sumR[k]*sumR[k];
                   }
                   tdata[m] = 12*sqsumR/(nblock*nkk*(nkk+1)) - 3*nblock*(nkk+1);
                   m++;
                 }
               }
             }
           }
         }
         else if (nblock == 5) {
           m =0;
           for (i1=0; i1<kfact; i1++) {
             for (i2=0; i2<kfact; i2++) {
               for (i3=0; i3<kfact; i3++) {
                 for (i4=0; i4<kfact; i4++) {
                   for (i5=0; i5<kfact; i5++) {
                     sqsumR = 0;
                     for (k=0; k<nkk; k++) {
                       sumR[k] = x[i1][k] + x[i2][k] + x[i3][k] + x[i4][k] + x[i5][k];
                       sqsumR += sumR[k]*sumR[k];
                     }
                     tdata[m] = 12*sqsumR/(nblock*nkk*(nkk+1)) - 3*nblock*(nkk+1);
                     m++;
                   }
                 }
               }
             }
           }
         }

        // Friedman distribution 계산
        tdata.sort(function(a, b){return a-b});
        tobs = tdata.length;
        nvalue = valueFreq(tobs, tdata, dataValue, dvalueP); 
        for (j=0; j<nvalue; j++) {
          dvalueP[j] = dvalueP[j] / tobs;
          dataValue[j] = f3(dataValue[j]);
        }

        // draw graph
        var title  = svgStrU[70][langNum] ;
        var sub1 = "H\u2080: M\u2081 = M\u2082 = ... = M\u2096 " ;
        var sub2 = svgStrU[71][langNum];
        drawFriedmanBarGraph(title, sub1, sub2, nvalue, dataValue, dvalueP, SP, alpha, h1Type, checkData) 
     }
     else {    // chisq-test
        df = nkk - 1;
        h = alpha;  
        if (df < 10) f = 0;
        else f = chisq_inv(0.0001, df, info);
        g = chisq_inv(1-h, df, info);
        pvalue = 1 - chisq_cdf(SP, df, info)
        drawChisqGraphTH(hypoType, h1Type, SP, df, f, g, h, pvalue, temp );
     }  
}
// alpha sliding bar control for testing hypothesis 
function showValueAlpha(newValue) {
        alpha = f3(newValue/1000);
        document.getElementById("alpha").value   = alpha;
        document.getElementById("alpha2").value  = alpha;
        if (checkExecute) testingFriedman();
} 

