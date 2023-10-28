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
      var df1, df2, info;
      var a, b, c, b2, c2, a3, c3, f, g, h, d, e, a6, c6;
      var checkParameter = false;
      var checkExecute = false;
      var checkF1 = false;
      var checkF2 = false;

      document.getElementById("c").disabled  = true; 
      document.getElementById("c2").disabled = true; 
      document.getElementById("c3").disabled = true; 
      document.getElementById("f").disabled  = true; 
      document.getElementById("g").disabled  = true; 
      document.getElementById("d").disabled  = true; 
      document.getElementById("a6").disabled = true; 

      gxmax = 10;

      // 초기 F분포 확률 그리기
      df1   = 5;
      df2   = 10;
      a     = 0.151;
      b     = 4.236;
      c     = f_cdf(b, df1, df2,info) - f_cdf(a, df1, df2, info);
      drawFGraph(df1, df2,  a, b, c);

      // F분포 확률 ------------------------------------------------------------------------------------
      var rad = document.myForm.type1;
      var radioType = 1;
      rad[0].onclick = function() {     // P(a< F < b) = c
          radioType = 1;  
          bar.selectAll("*").remove();
          df1 = parseFloat(d3.select("#df1").node().value);
          df2 = parseFloat(d3.select("#df2").node().value);  
          a = parseFloat(d3.select("#a").node().value); 
          if ( a < 0 ) a = 0;   
          b = parseFloat(d3.select("#b").node().value);
          if (a > b) c = 0;
          else c = f_cdf(b, df1, df2,  info) - f_cdf(a, df1, df2,  info);
          d3.select("#a").node().value = f3(a)
          d3.select("#b").node().value = f3(b)
          d3.select("#c").node().value = f4(c);
          document.getElementById("range21F").value = (100*a/gxmax).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22F").value = (100*b/gxmax).toString();
          drawFGraph(df1, df2,  a, b, c);
      }
      rad[1].onclick = function() {     // P(a< F < b) = c
          radioType = 2;  
          bar.selectAll("*").remove();
          df1 = parseFloat(d3.select("#df1").node().value);
          df2 = parseFloat(d3.select("#df2").node().value);  
          a = 0;  
          c = parseFloat(d3.select("#c2").node().value); 
          b = f_inv(c, df1, df2, info);
          c = f_cdf(b, df1, df2,  info);
          d3.select("#b2").node().value = f3(b)
          d3.select("#c2").node().value = f4(c);
          document.getElementById("range21F").value = (100*a/gxmax).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22F").value = (100*b/gxmax).toString();
          drawFGraph(df1, df2,  a, b, c);
      }
      rad[2].onclick = function() {     // P(a< F < b) = c
          radioType = 3;  
          bar.selectAll("*").remove();
          df1 = parseFloat(d3.select("#df1").node().value);
          df2 = parseFloat(d3.select("#df2").node().value);  
          c = parseFloat(d3.select("#c3").node().value); 
          a = f_inv(1-c, df1, df2, info);
          c = 1 - f_cdf(a, df1, df2,  info);
          d3.select("#a3").node().value = f3(a)
          d3.select("#c3").node().value = f4(c);
          document.getElementById("range21F").value = (100*a/gxmax).toString();
          b = gxmax;
          document.getElementById("range22F").value = (100*b/gxmax).toString();
          drawFGraph(df1, df2,  a, b, c);
      }
      rad[3].onclick = function() {     // P(f < F < g) = h
          radioType = 4;
          bar.selectAll("*").remove();
          df1 = parseFloat(d3.select("#df1").node().value);
          df2 = parseFloat(d3.select("#df2").node().value);  
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = f_inv((1-h)/2, df1, df2,  info);
          g = f_inv(1-(1-h)/2, df1, df2,  info);
          d3.select("#f").node().value = f3(f);
          d3.select("#g").node().value = f3(g);
          d3.select("#h").node().value = f4(h);
          document.getElementById("range21F").value = (100*f/gxmax).toString();
          document.getElementById("range22F").value = (100*g/gxmax).toString();
          drawFGraph(df1, df2,  f, g, h); 
      }    
      rad[4].onclick = function() {     // P(F < d) = e
          radioType = 5;
          bar.selectAll("*").remove();
          df1 = parseFloat(d3.select("#df1").node().value);
          df2 = parseFloat(d3.select("#df2").node().value);  
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.9999) e = 0.9999;
          if (e < 0.0001) e = 0.0001;
          d = f_inv(e, df1, df2,  info);
          a = 0;
          d3.select("#d").node().value = f3(d);
          d3.select("#e").node().value = f4(e);
          document.getElementById("range21F").value = (100*a/gxmax).toString();
          document.getElementById("range22F").value = (100*d/gxmax).toString();
          drawFGraph(df1, df2,  a, d, e);
      }
      rad[5].onclick = function() {     // P(f < F < g) = h
          radioType = 6;
          bar.selectAll("*").remove();
          df1 = parseFloat(d3.select("#df1").node().value);
          df2 = parseFloat(d3.select("#df2").node().value);  
          h = parseFloat(d3.select("#c6").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = f_inv(1-h, df1, df2,  info);
          g = gxmax;
          d3.select("#a6").node().value = f3(f);
          d3.select("#c6").node().value = f4(h);
          document.getElementById("range21F").value = (100*f/gxmax).toString();
          document.getElementById("range22F").value = (100*g/gxmax).toString();
          drawFGraph(df1, df2,  f, g, h); 
      }    

      // 확률계산 실행버튼 클릭
      d3.select("#Execute").on("click",function() {
        checkExecute = true;
        if (checkParameter == true) changeRangeFdf(); 
        bar.selectAll("*").remove();

        margin  = {top: 50, bottom: 50, left: 50, right: 20};
        graphWidth2   = svgWidth2 - margin.left - margin.right;
        graphHeight2  = svgHeight2 - margin.top - margin.bottom;
 
        df1 = parseFloat(d3.select("#df1").node().value);
        df2 = parseFloat(d3.select("#df2").node().value);  
        a  = document.getElementById("a").value; 
        b  = document.getElementById("b").value;
        b2 = document.getElementById("b2").value;
        a3 = document.getElementById("a3").value; 
        e  = document.getElementById("e").value; 
        h  = document.getElementById("h").value;
        if (isNaN(a) || isNaN(b) || isNaN(b2) || isNaN(a3)) {
          alert("Enter number!");
          showValueF1(df1);
          showValueF2(df2);
          return;
        }
        if (isNaN(e) || isNaN(h)) {
          alert("Enter number between 0 and 1!");
          showValueF1(df1);
          showValueF2(df2);
          return;
        }

        if (radioType == 1) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = parseFloat(d3.select("#a").node().value); 
          if ( a < 0 ) a = 0.0001;   
          b = parseFloat(d3.select("#b").node().value);
          if ( a > b ) c = 0;
          else c = f_cdf(b, df1, df2,  info) - f_cdf(a, df1, df2,  info);
          d3.select("#a").node().value = f3(a)
          d3.select("#b").node().value = f3(b)
          d3.select("#c").node().value = f4(c);
          document.getElementById("range21F").value = (100*a/gxmax).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22F").value = (100*b/gxmax).toString();
          drawFGraph(df1, df2,  a, b, c);
        } 
        else if (radioType == 2) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = 0.0001;   
          b = parseFloat(d3.select("#b2").node().value);
          c = f_cdf(b, df1, df2,  info);
          d3.select("#b2").node().value = f3(b)
          d3.select("#c2").node().value = f4(c);
          document.getElementById("range21F").value = (100*a/gxmax).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22F").value = (100*b/gxmax).toString();
          drawFGraph(df1, df2,  a, b, c);
        } 
        else if (radioType == 3) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = parseFloat(d3.select("#a3").node().value); 
          if ( a < 0 ) a = 0.0001;   
          c = 1 - f_cdf(a, df1, df2,  info);
          d3.select("#a3").node().value = f3(a)
          d3.select("#c3").node().value = f4(c);
          document.getElementById("range21F").value = (100*a/gxmax).toString();
          b = gxmax;
          document.getElementById("range22F").value = (100*b/gxmax).toString();
          drawFGraph(df1, df2,  a, b, c);
        } 
        else if (radioType == 4) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
//          document.getElementById("range4F").value  = f0(h*1000);
          f = f_inv((1-h)/2, df1, df2,  info);
          g = f_inv(1-(1-h)/2, df1, df2,  info);
          d3.select("#f").node().value = f3(f);
          d3.select("#g").node().value = f3(g);
          d3.select("#h").node().value = f4(h);
          document.getElementById("range21F").value = (100*f/gxmax).toString();
          document.getElementById("range22F").value = (100*g/gxmax).toString();
          drawFGraph(df1, df2, f, g, h); 
        }
        else if (radioType == 5) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.9999) e = 0.9999;
          if (e < 0.0001) e = 0.0001;
//          document.getElementById("range3F").value  = f0(e*1000);
          d = f_inv(e, df1, df2,  info);
          d3.select("#d").node().value = f3(d);
          d3.select("#e").node().value = f4(e);
          a = 0;
          document.getElementById("range21F").value = (100*a/gxmax).toString();
          document.getElementById("range22F").value = (100*d/gxmax).toString();
          drawFGraph(df1, df2, a, d, e);
       }
       else if (radioType == 6) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          h = parseFloat(d3.select("#c6").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = f_inv(1-h, df1, df2, info);
          g = gxmax;
          d3.select("#a6").node().value = f3(f);
          d3.select("#c6").node().value = f4(h);
          document.getElementById("range21F").value = (100*f/gxmax).toString();
          document.getElementById("range22F").value = (100*g/gxmax).toString();
          drawFGraph(df1, df2, f, g, h); 
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
        df1 = parseFloat(d3.select("#df1").node().value);
        df2 = parseFloat(d3.select("#df2").node().value);  
        fPercentileTable(df1,df2);
      })
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });

    function changeRangeFdf(){
       if (checkExecute == false && event.keyCode != 13) return;
       df1 = document.getElementById("df1").value;
       df2 = document.getElementById("df2").value;
       if ( isNaN(df1) || isNaN(df2) ) {
          alert("Enter number between 1 and 100!");
          return;
       }
       if (df1 < 1)   {df1 = 1;   document.getElementById("df1").value = df1;}
       if (df1 > 100) {df1 = 100; document.getElementById("df1").value = df1;}
       document.getElementById("range1F").value = df1;
       if (df2 < 1)   {df2 = 1;   document.getElementById("df2").value = df2;}
       if (df2 > 100) {df2 = 100; document.getElementById("df2").value = df2;}
       document.getElementById("range2F").value = df2;
       if (checkF1) showValueF0(df1);
       if (checkF2) showValueF0(df2);
       checkExecute   = false;
    }
    function changeRangeFdf1(newValue){
       checkF1 = true;
       showValueF0(newValue)
    }
    function changeRangeFdf2(newValue){
       checkF2 = true;
       showValueF0(newValue)
    }

