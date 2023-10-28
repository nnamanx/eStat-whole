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
      var lambda, info;
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

      // 초기 Exponential분포 확률 그리기
      lambda = 1;
      c      = 0.95;
      a      = exponential_inv((1-c)/2, lambda, info);
      b      = exponential_inv(1-(1-c)/2, lambda, info);
      gxmax  = 5;
      drawExponentialGraph(lambda, a, b, c);

      // Exponential분포 확률 ------------------------------------------------------------------------------------
      var rad = document.myForm.type1;
      var radioType = 1;
      rad[0].onclick = function() {     // P(a< X < b) = c
          radioType = 1;  
          bar.selectAll("*").remove();
          lambda    = parseFloat(d3.select("#explambda").node().value); 
          if (lambda < 0.1) { lambda = 0.1; d3.select("#explambda").node().value = f1(lambda);}
          else if (lambda > 10)  { lambda = 10; d3.select("#explambda").node().value = f1(lambda);}
          a = parseFloat(d3.select("#a").node().value); 
          if ( a < 0 ) a = 0.0001;   
          b = parseFloat(d3.select("#b").node().value);
          if ( a > b ) c = 0;
          else c = exponential_cdf(b, lambda, info) - exponential_cdf(a, lambda, info);
          d3.select("#a").node().value = f3(a)
          d3.select("#b").node().value = f3(b)
          d3.select("#c").node().value = f4(c);
          document.getElementById("range21E").value = (300*a/gxmax - 5).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22E").value = (300*b/gxmax - 5).toString();
          drawExponentialGraph(lambda, a, b, c);
      }
      rad[1].onclick = function() {     // P(a< X < b) = c
          radioType = 2;  
          bar.selectAll("*").remove();
          lambda    = parseFloat(d3.select("#explambda").node().value); 
          if (lambda < 0.1) { lambda = 0.1; d3.select("#explambda").node().value = f1(lambda);}
          else if (lambda > 10)  { lambda = 10; d3.select("#explambda").node().value = f1(lambda);}
          a = 0;   
          c = parseFloat(d3.select("#c2").node().value); 
          b = exponential_inv(c, lambda, info);
          d3.select("#b2").node().value = f3(b)
          d3.select("#c2").node().value = f4(c);
          document.getElementById("range21E").value = (300*a/gxmax - 5).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22E").value = (300*b/gxmax - 5).toString();
          drawExponentialGraph(lambda, a, b, c);
      }
      rad[2].onclick = function() {     // P(a< X < b) = c
          radioType = 3;  
          bar.selectAll("*").remove();
          lambda    = parseFloat(d3.select("#explambda").node().value); 
          if (lambda < 0.1) { lambda = 0.1; d3.select("#explambda").node().value = f1(lambda);}
          else if (lambda > 10)  { lambda = 10; d3.select("#explambda").node().value = f1(lambda);}
          c = parseFloat(d3.select("#c3").node().value); 
          a = exponential_inv(1-c, lambda, info);
          b = exponential_inv(0.9999, lambda, info);
          if ( a < 0 ) a = 0.0001;   
          if ( a > b ) c = 0;
          else c = 1 - exponential_cdf(a, lambda, info);
          d3.select("#a3").node().value = f3(a)
          d3.select("#c3").node().value = f4(c);
          document.getElementById("range21E").value = (300*a/gxmax - 5).toString();
          b = gxmax;
          document.getElementById("range22E").value = (300*b/gxmax - 5).toString();
          drawExponentialGraph(lambda, a, b, c);
      }
      rad[3].onclick = function() {     // P(f < X < g) = h
          radioType = 4;
          bar.selectAll("*").remove();
          lambda    = parseFloat(d3.select("#explambda").node().value); 
          if (lambda < 0.1) { lambda = 0.1; d3.select("#explambda").node().value = f1(lambda);}
          else if (lambda > 10)  { lambda = 10; d3.select("#explambda").node().value = f1(lambda);}
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = exponential_inv((1-h)/2, lambda, info);
          g = exponential_inv(1-(1-h)/2, lambda, info);
          d3.select("#f").node().value = f3(f);
          d3.select("#g").node().value = f3(g);
          d3.select("#h").node().value = f4(h);
          document.getElementById("range21E").value = (300*f/gxmax - 5).toString();
          document.getElementById("range22E").value = (300*g/gxmax - 5).toString();
          drawExponentialGraph(lambda, f, g, h); 
      }    
      rad[4].onclick = function() {     // P(X < d) = e
          radioType = 5;
          bar.selectAll("*").remove();
          lambda    = parseFloat(d3.select("#explambda").node().value); 
          if (lambda < 0.1) { lambda = 0.1; d3.select("#explambda").node().value = f1(lambda);}
          else if (lambda > 10)  { lambda = 10; d3.select("#explambda").node().value = f1(lambda);}
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.9999) e = 0.9999;
          if (e < 0.0001) e = 0.0001;
          a = 0;
          d = exponential_inv(e, lambda, info);
          d3.select("#d").node().value = f3(d);
          d3.select("#e").node().value = f4(e);
          document.getElementById("range21E").value = (300*a/gxmax - 5).toString();
          document.getElementById("range22E").value = (300*d/gxmax - 5).toString();
          drawExponentialGraph(lambda, 0, d, e);
      }
      rad[5].onclick = function() {     // P( Z > b) = c
          radioType = 6;  
          bar.selectAll("*").remove();
          lambda    = parseFloat(d3.select("#explambda").node().value); 
          if (lambda < 0.1) { lambda = 0.1; d3.select("#explambda").node().value = f1(lambda);}
          else if (lambda > 10)  { lambda = 10; d3.select("#explambda").node().value = f1(lambda);}
          h = parseFloat(d3.select("#c6").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = exponential_inv(1-h, lambda, info);
          g = gxmax;
          d3.select("#a6").node().value = f3(f);
          d3.select("#c6").node().value = f4(h);
          document.getElementById("range21E").value = (300*f/gxmax - 5).toString();
          document.getElementById("range22E").value = (300*g/gxmax - 5).toString();
          drawExponentialGraph(lambda, f, g, h); 
      }

      // 확률계산 실행버튼 클릭
      d3.select("#Execute").on("click",function() {
        checkExecute = true;
        if (checkParameter == true) changeRangeLambda();
        bar.selectAll("*").remove();

        margin  = {top: 50, bottom: 50, left: 50, right: 40};
        graphWidth2   = svgWidth2 - margin.left - margin.right;
        graphHeight2  = svgHeight2 - margin.top - margin.bottom;
 
        lambda    = parseFloat(d3.select("#explambda").node().value); 
        if (lambda < 0.1) { lambda = 0.1; d3.select("#explambda").node().value = f1(lambda);}
        else if (lambda > 10)  { lambda = 10; d3.select("#explambda").node().value = f1(lambda);}
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
          if (checkParameter == true){
            c = 0.95;
            a = exponential_inv((1-c)/2, lambda, info);
            b = exponential_inv(1-(1-c)/2, lambda, info);
            checkParameter = false; 
          }
          else {
            a = parseFloat(d3.select("#a").node().value); 
            b = parseFloat(d3.select("#b").node().value);
            if ( a < 0 ) a = 0.0001;   
            if ( a > b ) c = 0;
            else c = exponential_cdf(b, lambda, info) - exponential_cdf(a, lambda, info);
          }
          d3.select("#a").node().value = f3(a)
          d3.select("#b").node().value = f3(b)
          d3.select("#c").node().value = f4(c);
          document.getElementById("range21E").value = (300*a/gxmax - 5).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22E").value = (300*b/gxmax - 5).toString();
          drawExponentialGraph(lambda, a, b, c);
        } 
        else if (radioType == 2) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = 0;   
          b = parseFloat(d3.select("#b2").node().value);
          if ( a > b ) c = 0;
          else c = exponential_cdf(b, lambda, info);
          d3.select("#b2").node().value = f3(b)
          d3.select("#c2").node().value = f4(c);
          document.getElementById("range21E").value = (300*a/gxmax - 5).toString();
          if ( b > gxmax ) b = gxmax;
          document.getElementById("range22E").value = (300*b/gxmax - 5).toString();
          drawExponentialGraph(lambda, a, b, c);
        } 
        else if (radioType == 3) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = parseFloat(d3.select("#a3").node().value); 
          b = exponential_inv(0.9999, lambda, info);
          if ( a < 0 ) a = 0.0001;   
          if ( a > b ) c = 0;
          else c = 1 - exponential_cdf(a, lambda, info);
          d3.select("#a3").node().value = f3(a)
          d3.select("#c3").node().value = f4(c);
          document.getElementById("range21E").value = (300*a/gxmax - 5).toString();
          b = gxmax; 
          document.getElementById("range22E").value = (300*b/gxmax - 5).toString();
          drawExponentialGraph(lambda, a, b, c);
        } 
        else if (radioType == 4) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
//          document.getElementById("range4E").value  = f0(h*100);
          g = exponential_inv(1-(1-h)/2, lambda, info);
          f = exponential_inv((1-h)/2, lambda, info);
          d3.select("#f").node().value = f3(f);
          d3.select("#g").node().value = f3(g);
          d3.select("#h").node().value = f4(h);
          document.getElementById("range21E").value = (300*f/gxmax - 5).toString();
          document.getElementById("range22E").value = (300*g/gxmax - 5).toString();
          drawExponentialGraph(lambda, f, g, h); 
        }
        else if (radioType == 5) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.9999) e = 0.9999;
          if (e < 0.0001) e = 0.0001;
//          document.getElementById("range3E").value  = f0(e*100);
          d = exponential_inv(e, lambda, info);
          d3.select("#d").node().value = f3(d);
          d3.select("#e").node().value = f4(e);
          a = 0;
          if ( d > gxmax ) d = gxmax;
          document.getElementById("range21E").value = (300*a/gxmax - 5).toString();
          document.getElementById("range22E").value = (300*d/gxmax - 5).toString();
          drawExponentialGraph(lambda, a, d, e);
       }
        else if (radioType == 6) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          h = parseFloat(d3.select("#c6").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = exponential_inv(1-h, lambda, info);
          g = gxmax;
          d3.select("#a6").node().value = f3(f);
          d3.select("#c6").node().value = f4(h);
          document.getElementById("range21E").value = (300*f/gxmax - 5).toString();
          document.getElementById("range22E").value = (300*g/gxmax - 5).toString();
          drawExponentialGraph(lambda, f, g, h); 
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
        lambda    = parseFloat(d3.select("#explambda").node().value); 
        expPercentileTable(lambda);
      })
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });

    function changeRangeLambda(){
       if (checkExecute == false && event.keyCode != 13) return;
       lambda = document.getElementById("explambda").value;
       if (isNaN(lambda) || parseFloat(lambda) <= 0) {
          alert("Enter number between 0 and 10 !");
          return;
       }
       if (lambda < 0.1) { lambda = 0.1; document.getElementById("explambda").value = lambda;}
       if (lambda > 10)  { lambda = 10;  document.getElementById("explambda").value = lambda;}
       document.getElementById("range1E").value = lambda*10;
       showValueExponential0(lambda*10);
       checkExecute   = false;
    }

