      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth    = 600;
      svgHeight   = 510;
      svgWidth2   = 600;
      svgHeight2  = 400;

      var nobs, avg, std, gxmin, gxmax, gymin, gymax;
      var stat = new Array(30);
      var title;
      var df, info;
      var checkNormal = false;
      var a, b, c, b2, c2, a3, c3, f, g, h, d, e, a6, c6;
      var checkParameter = false;
      var checkExecute = false

      document.getElementById("c").disabled  = true; 
      document.getElementById("c2").disabled = true; 
      document.getElementById("c3").disabled = true; 
      document.getElementById("f").disabled  = true; 
      document.getElementById("g").disabled  = true; 
      document.getElementById("d").disabled  = true; 
      document.getElementById("a6").disabled = true; 

      // 초기 t분포 (-1,1) 확률 그리기
      df    = parseFloat(d3.select("#dft").node().value); 
      a     = -2.228;
      b     = 2.228;
      c     = t_cdf(b,df,info) - t_cdf(a,df,info);
      drawTdistGraph(df, a, b, c);

      // t분포 확률 ------------------------------------------------------------------------------------
      var rad = document.myForm.type1;
      var radioType = 1;
      rad[0].onclick = function() {     // P(a< t < b) = c
          radioType = 1;  
          bar.selectAll("*").remove();
          df = parseFloat(d3.select("#dft").node().value); 
          a  = parseFloat(d3.select("#a").node().value); 
          b  = parseFloat(d3.select("#b").node().value);
          if ( a > b ) c = 0;
          else c = t_cdf(b, df, info) - t_cdf(a, df, info);
          d3.select("#a").node().value = f3(a)
          d3.select("#b").node().value = f3(b)
          d3.select("#c").node().value = f4(c);
          if ( a < -5 ) a = - 5;   
          if ( b > 5 ) b = 5;
          drawTdistGraph(df, a, b, c);
          document.getElementById("range21T").value = (500+100*a).toString();
          document.getElementById("range22T").value = (500+100*b).toString();
          if(checkNormal) drawStdNormalGraph();
      }
      rad[1].onclick = function() {     // P(t < b) = c
          radioType = 2;  
          bar.selectAll("*").remove();
          df = parseFloat(d3.select("#dft").node().value); 
          a  = -5;
          c = parseFloat(d3.select("#c2").node().value); 
          b = t_inv(c, df, info);
//          b  = parseFloat(d3.select("#b2").node().value);
//          if ( a > b ) c = 0;
//          else c = t_cdf(b, df, info) 
          d3.select("#b2").node().value = f3(b)
          d3.select("#c2").node().value = f4(c);
          if ( b > 5 ) b = 5;
          document.getElementById("range21T").value = (500+100*a).toString();
          document.getElementById("range22T").value = (500+100*b).toString();
          drawTdistGraph(df, a, b, c);
          if(checkNormal) drawStdNormalGraph();
      }
      rad[2].onclick = function() {     // P( t > a) = c
          radioType = 3;  
          bar.selectAll("*").remove();
          df = parseFloat(d3.select("#dft").node().value); 
          c = parseFloat(d3.select("#c3").node().value); 
          a = t_inv(1-c, df, info);
//          a  = parseFloat(d3.select("#a3").node().value); 
          b  = 5;
          if ( a > b ) c = 0;
          else c = 1 - t_cdf(a, df, info);
          if ( a < -5 ) a = - 5;   
          d3.select("#a3").node().value = f3(a)
          d3.select("#c3").node().value = f4(c);
          document.getElementById("range21T").value = (500+100*a).toString();
          document.getElementById("range22T").value = (500+100*b).toString();
          drawTdistGraph(df, a, b, c);
          if(checkNormal) drawStdNormalGraph();
      }
      rad[3].onclick = function() {     // P(f < t < g) = h
          radioType = 4;
          bar.selectAll("*").remove();
          df    = parseFloat(d3.select("#dft").node().value); 
          h = parseFloat(d3.select("#h").node().value);
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          g = t_inv(1-(1-h)/2, df, info);
          f = - t_inv(1-(1-h)/2, df, info);
          if (f < -5) f = -5;
          if (g > 5)  g = 5;
          d3.select("#f").node().value = f3(f);
          d3.select("#g").node().value = f3(g);
          d3.select("#h").node().value = f4(h);
          document.getElementById("range21T").value = (500+100*f).toString();
          document.getElementById("range22T").value = (500+100*g).toString();
          drawTdistGraph(df, f, g, h); 
          if(checkNormal) drawStdNormalGraph();
      }    
      rad[4].onclick = function() {     // P(t < d) = e
          radioType = 5;
          bar.selectAll("*").remove();
          df    = parseFloat(d3.select("#dft").node().value); 
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.9999) e = 0.9999;
          if (e < 0.0001) e = 0.0001;
          d = t_inv(e, df, info);
          d3.select("#d").node().value = f3(d);
          d3.select("#e").node().value = f4(e);
          if (d > 5) d = 5;
          a = -5;
          document.getElementById("range21T").value = (500+100*a).toString();
          document.getElementById("range22T").value = (500+100*d).toString();
          drawTdistGraph(df, a, d, e);
          if(checkNormal) drawStdNormalGraph();
      }
      rad[5].onclick = function() {     // P( Z > b) = c
          radioType = 6;  
          bar.selectAll("*").remove();
          h = parseFloat(d3.select("#c6").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = t_inv(1-h, df, info);
          g = 5;
          d3.select("#a6").node().value = f3(f);
          d3.select("#c6").node().value = f4(h);
          document.getElementById("range21T").value = (500+100*f).toString();
          document.getElementById("range22T").value = (500+100*g).toString();
          drawTdistGraph(df, f, g, h); 
      }

      // 확률계산 실행버튼 클릭
      d3.select("#Execute").on("click",function() {
        checkExecute = true;
        if (checkParameter == true) changeRangeTdf(); 
        bar.selectAll("*").remove();

        margin  = {top: 50, bottom: 50, left: 50, right: 40};
        graphWidth2   = svgWidth2 - margin.left - margin.right;
        graphHeight2  = svgHeight2 - margin.top - margin.bottom;
 
        df = parseFloat(d3.select("#dft").node().value); 
        a  = document.getElementById("a").value; 
        b  = document.getElementById("b").value;
        b2 = document.getElementById("b2").value;
        a3 = document.getElementById("a3").value; 
        e  = document.getElementById("e").value; 
        h  = document.getElementById("h").value;
        if (isNaN(a) || isNaN(b) || isNaN(b2) || isNaN(a3)) {
          alert("Enter number!");
          showValueT0(df)
          return;
        }
        if (isNaN(e) || isNaN(h)) {
          alert("Enter number between 0 and 1!");
          showValueT0(df)
          return;
        }

        if (radioType == 1) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = parseFloat(d3.select("#a").node().value); 
          b = parseFloat(d3.select("#b").node().value);
          if ( a > b ) c = 0;
          else c = t_cdf(b, df, info) - t_cdf(a, df, info);
          d3.select("#a").node().value = f3(a)
          d3.select("#b").node().value = f3(b)
          d3.select("#c").node().value = f4(c);
          if ( a < -5 ) a = - 5;   
          if ( b > 5 ) b = 5;
          document.getElementById("range21T").value = (500+100*a).toString();
          document.getElementById("range22T").value = (500+100*b).toString();
          drawTdistGraph(df, a, b, c);
          if(checkNormal) drawStdNormalGraph();
        } 
        else if (radioType == 2) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = -5;
          b = parseFloat(d3.select("#b2").node().value);
          if ( a > b ) c = 0;
          else c = t_cdf(b, df, info);
          d3.select("#b2").node().value = f3(b)
          d3.select("#c2").node().value = f4(c);
          if ( b > 5 ) b = 5;
          document.getElementById("range21T").value = (500+100*a).toString();
          document.getElementById("range22T").value = (500+100*b).toString();
          drawTdistGraph(df, a, b, c);
          if(checkNormal) drawStdNormalGraph();
        } 
        else if (radioType == 3) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = parseFloat(d3.select("#a3").node().value); 
          b = 5;
          if ( a > b ) c = 0;
          else c = 1 - t_cdf(a, df, info);
          d3.select("#a3").node().value = f3(a)
          d3.select("#c3").node().value = f4(c);
          if ( a < -5 ) a = - 5;   
          document.getElementById("range21T").value = (500+100*a).toString();
          document.getElementById("range22T").value = (500+100*b).toString();
          drawTdistGraph(df, a, b, c);
          if(checkNormal) drawStdNormalGraph();
        } 
        else if (radioType == 4) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
//          document.getElementById("range4T").value  = f0(h*1000);
          g = t_inv(1-(1-h)/2, df, info);
          f = - t_inv(1-(1-h)/2, df, info);
          d3.select("#f").node().value = f3(f);
          d3.select("#g").node().value = f3(g);
          d3.select("#h").node().value = f4(h);
          if (f < -5) f = -5;
          if (g > 5)  g = 5;
          document.getElementById("range21T").value = (500+100*f).toString();
          document.getElementById("range22T").value = (500+100*g).toString();
          drawTdistGraph(df, f, g, h); 
          if(checkNormal) drawStdNormalGraph();
        }
        else if (radioType == 5) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.9999) e = 0.9999;
          if (e < 0.0001) e = 0.0001;
//          document.getElementById("range3T").value  = f0(e*1000);
          a = -5;
          d = t_inv(e, df, info);
          d3.select("#d").node().value = f3(d);
          d3.select("#e").node().value = f4(e);
          if (d > 5) d = 5;
          document.getElementById("range21T").value = (500+100*a).toString();
          document.getElementById("range22T").value = (500+100*d).toString();
          drawTdistGraph(df, a, d, e);
          if(checkNormal) drawStdNormalGraph();
        }
        else if (radioType == 6) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          h = parseFloat(d3.select("#c6").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = t_inv(1-h, df, info);
          g = 5;
          d3.select("#a6").node().value = f3(f);
          d3.select("#c6").node().value = f4(h);
          document.getElementById("range21T").value = (500+100*f).toString();
          document.getElementById("range22T").value = (500+100*g).toString();
          drawTdistGraph(df, f, g, h); 
          if(checkNormal) drawStdNormalGraph();
        }
      })

      // 정규분포 그래프 버튼 클릭
      d3.select("#normalGraph").on("click",function() {
        if(this.checked) {
          checkNormal = true;
          drawStdNormalGraph();
        } else {
          document.getElementById("normalGraph").checked = false;
          checkNormal = false;
	  bar.selectAll("line.lineNormal").remove();
        }
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
      // 백분위수표 버튼 클릭
      d3.select("#percentileTable").on("click",function() {
         df    = parseFloat(d3.select("#dft").node().value); 
         tPercentileTable(df);
      })
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });

    function changeRangeTdf(){
       if (checkExecute == false && event.keyCode != 13) return;
       df = document.getElementById("dft").value;
       if (isNaN(df)) {
          alert("Enter number between 1 and 100!");
          return;
       }
       if (df < 1) { df = 1; document.getElementById("dft").value = df;}
       if (df > 100) {df = 100; document.getElementById("dft").value = df;}
       document.getElementById("range1T").value = df;
       showValueT0(df)
       checkExecute   = false;
    }

