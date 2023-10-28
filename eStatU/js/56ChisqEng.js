      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth    = 600;
      svgHeight   = 510;
      svgWidth2   = 600;
      svgHeight2  = 400;
      margin  = {top: 50, bottom: 50, left: 50, right: 40};
      graphWidth2   = svgWidth2 - margin.left - margin.right;
      graphHeight2  = svgHeight2 - margin.top - margin.bottom;

      var nobs, avg, std, gxmin, gxmax, gxrange, gymin, gymax, gyrange;
      var stat = new Array(30);
      var title;
      var df, info;
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

      // 초기 Chisq분포 확률 그리기
      df    = 10;
      a     = 3.247;
      b     = 20.483;
      c     = chisq_cdf(b,df,info) - chisq_cdf(a,df,info);
      gxmax = 30;
      drawChisqGraph(df, a, b, c);

      // Chisq분포 확률 ------------------------------------------------------------------------------------
      var rad = document.myForm.type1;
      var radioType = 1;
      rad[0].onclick = function() {     // P(a< ChiSq < b) = c
          radioType = 1;  
          bar.selectAll("*").remove();
          df    = parseFloat(d3.select("#dfchi").node().value); 
          a = parseFloat(d3.select("#a").node().value); 
          if ( a < 0 ) a = 0.0001;   
          b = parseFloat(d3.select("#b").node().value);
          c = chisq_cdf(b, df, info) - chisq_cdf(a, df, info);
          d3.select("#a").node().value = f3(a)
          d3.select("#b").node().value = f3(b)
          d3.select("#c").node().value = f4(c);
          document.getElementById("range21Chi").value = (300*a/gxmax - 5).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22Chi").value = (300*b/gxmax - 5).toString();
          drawChisqGraph(df, a, b, c);
      }
      rad[1].onclick = function() {     // P(a< ChiSq < b) = c
          radioType = 2;  
          bar.selectAll("*").remove();
          df    = parseFloat(d3.select("#dfchi").node().value); 
          a = 0.0001;   
          c = parseFloat(d3.select("#c2").node().value); 
          b = chisq_inv(c, df, info);
          d3.select("#b2").node().value = f3(b)
          d3.select("#c2").node().value = f4(c);
          document.getElementById("range21Chi").value = (300*a/gxmax - 5).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22Chi").value = (300*b/gxmax - 5).toString();
          drawChisqGraph(df, a, b, c);
      }
      rad[2].onclick = function() {     // P(a< ChiSq < b) = c
          radioType = 3;  
          bar.selectAll("*").remove();
          df    = parseFloat(d3.select("#dfchi").node().value); 
          c = parseFloat(d3.select("#c3").node().value); 
          a = chisq_inv(1-c, df, info);
          if ( a < 0 ) a = 0.0001;   
          c = 1 - chisq_cdf(a, df, info);
          d3.select("#a3").node().value = f3(a)
          d3.select("#c3").node().value = f4(c);
          document.getElementById("range21Chi").value = (300*a/gxmax - 5).toString();
          b = gxmax
          document.getElementById("range22Chi").value = (300*b/gxmax - 5).toString();
          drawChisqGraph(df, a, b, c);
      }
      rad[3].onclick = function() {     // P(f < ChiSq < g) = h
          radioType = 4;
          bar.selectAll("*").remove();
          df    = parseFloat(d3.select("#dfchi").node().value); 
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = chisq_inv((1-h)/2, df, info);
          g = chisq_inv(1-(1-h)/2, df, info);
          d3.select("#f").node().value = f3(f);
          d3.select("#g").node().value = f3(g);
          d3.select("#h").node().value = f4(h);
          document.getElementById("range21Chi").value = (300*f/gxmax - 5).toString();
          document.getElementById("range22Chi").value = (300*g/gxmax - 5).toString();
          drawChisqGraph(df, f, g, h); 
      }    
      rad[4].onclick = function() {     // P(ChiSq < d) = e
          radioType = 5;
          bar.selectAll("*").remove();
          df    = parseFloat(d3.select("#dfchi").node().value); 
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.9999) e = 0.9999;
          if (e < 0.0001) e = 0.0001;
          d = chisq_inv(e, df, info);
          d3.select("#d").node().value = f3(d);
          d3.select("#e").node().value = f4(e);
          a = 0;
          document.getElementById("range21Chi").value = (300*a/gxmax - 5).toString();
          document.getElementById("range22Chi").value = (300*d/gxmax - 5).toString();
          drawChisqGraph(df, a, d, e);
      }
      rad[5].onclick = function() {     // P( Z > b) = c
          radioType = 6;  
          bar.selectAll("*").remove();
          h = parseFloat(d3.select("#c6").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = chisq_inv(1-h, df, info);
          g = gxmax;
          d3.select("#a6").node().value = f3(f);
          d3.select("#c6").node().value = f4(h);
          document.getElementById("range21Chi").value = (300*f/gxmax - 5).toString();
          document.getElementById("range22Chi").value = (300*g/gxmax - 5).toString();
          drawChisqGraph(df, f, g, h); 
      }

      // 확률계산 실행버튼 클릭
      d3.select("#Execute").on("click",function() {
        checkExecute = true;
        if (checkParameter == true) changeRangeCdf(); 
        bar.selectAll("*").remove();
        df    = parseFloat(d3.select("#dfchi").node().value); 
        a  = document.getElementById("a").value; 
        b  = document.getElementById("b").value;
        b2 = document.getElementById("b2").value;
        a3 = document.getElementById("a3").value; 
        e  = document.getElementById("e").value; 
        h  = document.getElementById("h").value;
        if (isNaN(a) || isNaN(b) || isNaN(b2) || isNaN(a3)) {
          alert("Enter number!");
          showValueChisq0(df)
          return;
        }
        if (isNaN(e) || isNaN(h)) {
          alert("Enter number between 0 and 1!");
          showValueChisq0(df)
          return;
        }

        if (radioType == 1) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = parseFloat(d3.select("#a").node().value); 
          if ( a < 0 ) a = 0.0001;   
          b = parseFloat(d3.select("#b").node().value);
          c = chisq_cdf(b, df, info) - chisq_cdf(a, df, info);
          d3.select("#a").node().value = f3(a)
          d3.select("#b").node().value = f3(b)
          d3.select("#c").node().value = f4(c);
          document.getElementById("range21Chi").value = (300*a/gxmax - 5).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22Chi").value = (300*b/gxmax - 5).toString();
          drawChisqGraph(df, a, b, c);
        } 
        else if (radioType == 2) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = 0.0001;   
          b = parseFloat(d3.select("#b2").node().value);
          c = chisq_cdf(b, df, info);
          d3.select("#b2").node().value = f3(b)
          d3.select("#c2").node().value = f4(c);
          document.getElementById("range21Chi").value = (300*a/gxmax - 5).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22Chi").value = (300*b/gxmax - 5).toString();
          drawChisqGraph(df, a, b, c);
        } 
        else if (radioType == 3) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = parseFloat(d3.select("#a3").node().value); 
          if ( a < 0 ) a = 0.0001;   
          c = 1 - chisq_cdf(a, df, info);
          d3.select("#a3").node().value = f3(a)
          d3.select("#c3").node().value = f4(c);
          document.getElementById("range21Chi").value = (300*a/gxmax - 5).toString();
          b = gxmax;
          document.getElementById("range22Chi").value = (300*b/gxmax - 5).toString();
          drawChisqGraph(df, a, b, c);
        } 
       else if (radioType == 4) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          d3.select("#h").node().value = f4(h);
//          document.getElementById("range4C").value  = f0(h*1000);
          g = chisq_inv(1-(1-h)/2, df, info);
          f = chisq_inv((1-h)/2, df, info);
          d3.select("#f").node().value = f3(f);
          d3.select("#g").node().value = f3(g);
          d3.select("#h").node().value = f4(h);
          document.getElementById("range21Chi").value = (300*f/gxmax - 5).toString();
          document.getElementById("range22Chi").value = (300*g/gxmax - 5).toString();
          drawChisqGraph(df, f, g, h); 
       }
        else if (radioType == 5) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.9999) e = 0.9999;
          if (e < 0.0001) e = 0.0001;
//          document.getElementById("range3C").value  = f0(e*1000);
          d = chisq_inv(e, df, info);
          d3.select("#d").node().value = f3(d);
          d3.select("#e").node().value = f4(e);
          a = 0;
          if ( d > gxmax ) d = gxmax;
          document.getElementById("range21Chi").value = (300*a/gxmax - 5).toString();
          document.getElementById("range22Chi").value = (300*d/gxmax - 5).toString();
          drawChisqGraph(df, a, d, e);
       }
       else if (radioType == 6) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          h = parseFloat(d3.select("#c6").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = chisq_inv(1-h, df, info);
          g = gxmax;
          d3.select("#a6").node().value = f3(f);
          d3.select("#c6").node().value = f4(h);
          document.getElementById("range21Chi").value = (300*f/gxmax - 5).toString();
          document.getElementById("range22Chi").value = (300*g/gxmax - 5).toString();
          d3.select("#f").node().value = f3(f);
          d3.select("#g").node().value = f3(g);
          drawChisqGraph(df, f, g, h); 
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
         df    = parseFloat(d3.select("#dfchi").node().value); 
         chisqPercentileTable(df);
      })
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });

    function changeRangeCdf(){
       if (checkExecute == false && event.keyCode != 13) return;
       df = document.getElementById("dfchi").value;
       if (isNaN(df)) {
          alert("Enter number between 1 and 100!");
          return;
       }
       if (df < 1) { df = 1; document.getElementById("dfchi").value = df;}
       if (df > 100) {df = 100; document.getElementById("dfchi").value = df;}
       document.getElementById("range1C").value = df;
       showValueChisq0(df)
       checkExecute   = false;
    }
