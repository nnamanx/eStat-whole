      var bar = d3.select("#chart");
      var svgWidth, svgHeight, margin, graphWidth, graphHeight;
      var svgWidth2, svgHeight2, graphWidth2, graphHeight2;
      svgWidth    = 600;
      svgHeight   = 510;
      svgWidth2   = 600;
      svgHeight2  = 400;

      var nobs, avg, std, min, Q1, median, Q3, max, freqMaxP;
      var gxmin, gxmax, gymin, gymax, gxrange, gyrange, info;
      var stat = new Array(30);
      var title;
      var mu, sigma;
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

      // 초기 정규분포 (-1,1) 확률 그리기
      mu    = 0;
      sigma = 1;
      a     = -1.96;
      b     = 1.96;
      c     = stdnormal_cdf(b) - stdnormal_cdf(a);
      gxmin   = mu - 4*sigma;
      gxmax   = mu + 4*sigma;
      gxrange = gxmax - gxmin;
      drawNormalGraph(mu, sigma, a, b, c);

      // 정규분포 확률 ------------------------------------------------------------------------------------
      var rad = document.myForm.type1;
      var radioType = 1;
      rad[0].onclick = function() {     // P(a< Z < b) = c
          radioType = 1;  
          bar.selectAll("*").remove();
          a = parseFloat(d3.select("#a").node().value); 
          if ( (a-mu)/sigma < -4 ) a = mu - 4*sigma;   
          b = parseFloat(d3.select("#b").node().value);
          if ( (b-mu)/sigma > 4 ) b = mu + 4*sigma;
          if ( a > b ) c = 0;
          else c = stdnormal_cdf((b-mu)/sigma) - stdnormal_cdf((a-mu)/sigma);
          d3.select("#a").node().value = f3(a)
          d3.select("#b").node().value = f3(b)
          d3.select("#c").node().value = f4(c);
          document.getElementById("range21N").value = (800*(a-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(b-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, a, b, c);
      }
      rad[1].onclick = function() {     // P( Z < b) = c
          radioType = 2;  
          bar.selectAll("*").remove();
          a = mu - 4*sigma;   
          b = parseFloat(d3.select("#b2").node().value);
          if ( b > mu + 4*sigma ) b = mu + 4*sigma;
          if ( a > b ) c = 0;
          else c = stdnormal_cdf((b-mu)/sigma);
          d3.select("#b2").node().value = f3(b)
          d3.select("#c2").node().value = f4(c);
          document.getElementById("range21N").value = (800*(a-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(b-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, a, b, c);
      }
      rad[2].onclick = function() {     // P( Z > b) = c
          radioType = 3;  
          bar.selectAll("*").remove();
          a = parseFloat(d3.select("#a3").node().value); 
          if ( a < mu - 4*sigma ) a = mu - 4*sigma;   
          b = mu + 4*sigma;
          if ( a > b ) c = 0;
          else c = 1 - stdnormal_cdf((a-mu)/sigma);
          d3.select("#a3").node().value = f3(a)
          d3.select("#c3").node().value = f4(c);
          document.getElementById("range21N").value = (800*(a-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(b-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, a, b, c);
      }
      rad[3].onclick = function() {     // P(f < Z < g) = h
          radioType = 4;
          bar.selectAll("*").remove();
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = mu - sigma*stdnormal_inv(1-(1-h)/2, info);
          g = mu + sigma*stdnormal_inv(1-(1-h)/2, info);
          d3.select("#f").node().value = f3(f);
          d3.select("#g").node().value = f3(g);
          d3.select("#h").node().value = f4(h);
          document.getElementById("range21N").value = (800*(f-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(g-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, f, g, h); 
      }    
      rad[4].onclick = function() {     // P(Z < d) = e
          radioType = 5;
          bar.selectAll("*").remove();
          e     = parseFloat(d3.select("#e").node().value); 
          if (e > 0.9999) e = 0.9999;
          if (e < 0.0001) e = 0.0001;
          a = mu - 4*sigma;
          d = mu + sigma*stdnormal_inv(e, info);
          d3.select("#d").node().value = f3(d);
          d3.select("#e").node().value = f4(e);
          document.getElementById("range21N").value = (800*(a-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(d-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, a, d, e);
      }
      rad[5].onclick = function() {     // P( Z > b) = c
          radioType = 6;  
          bar.selectAll("*").remove();
          h = parseFloat(d3.select("#c6").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = mu + sigma*stdnormal_inv(1-h, info);
          g = mu + 4*sigma;
          d3.select("#a6").node().value = f3(f);
          d3.select("#c6").node().value = f4(h);
          document.getElementById("range21N").value = (800*(f-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(g-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, f, g, h); 
      }

      // 확률계산 실행버튼 클릭
      d3.select("#Execute").on("click",function() {
        checkExecute = true;
        if (checkParameter == true) changeRangeMuSigma(); 

        bar.selectAll("*").remove();
        margin  = {top: 50, bottom: 50, left: 50, right: 40};
        graphWidth2   = svgWidth2 - margin.left - margin.right;
        graphHeight2  = svgHeight2 - margin.top - margin.bottom;
 
        mu    = parseFloat(d3.select("#mu").node().value); 
        sigma = parseFloat(d3.select("#sigma").node().value); 
        if (sigma < 0.0001) {
          sigma = 0.0001;
          d3.select("#sigma").node().value = f4(sigma);
        }
        a  = document.getElementById("a").value; 
        b  = document.getElementById("b").value;
        b2 = document.getElementById("b2").value;
        a3 = document.getElementById("a3").value; 
        e  = document.getElementById("e").value; 
        h  = document.getElementById("h").value;
        if (isNaN(a) || isNaN(b) || isNaN(b2) || isNaN(a3)) {
          alert("Enter number!");
          showValueNormal1()
          return;
        }
        if (isNaN(e) || isNaN(h)) {
          alert("Enter number between 0 and 1!");
          showValueNormal1()
          return;
        }

        if (radioType == 1) { // P( a < Z < b) = c
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = parseFloat(d3.select("#a").node().value); 
          if ( (a-mu)/sigma < -4 ) a = mu - 4*sigma;   
          b = parseFloat(d3.select("#b").node().value);
          if ( (b-mu)/sigma > 4 ) b = mu + 4*sigma;
          if ( a > b ) c = 0;
          else c = stdnormal_cdf((b-mu)/sigma) - stdnormal_cdf((a-mu)/sigma);
          d3.select("#a").node().value = f3(a)
          d3.select("#b").node().value = f3(b)
          d3.select("#c").node().value = f4(c);
          document.getElementById("range21N").value = (800*(a-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(b-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, a, b, c);
        } 
        else if (radioType == 2) {     // P( Z < b) = c
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = gxmin;   
          b = parseFloat(d3.select("#b2").node().value);
          if ( (b-mu)/sigma > 4 ) b = mu + 4*sigma;
          if ( a > b ) c = 0;
          else c = stdnormal_cdf((b-mu)/sigma);
          d3.select("#b2").node().value = f3(b)
          d3.select("#c2").node().value = f4(c);
          document.getElementById("range21N").value = (800*(a-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(b-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, a, b, c);
        }
        else if (radioType == 3) {     // P( Z > b) = c
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          a = parseFloat(d3.select("#a3").node().value); 
          if ( (a-mu)/sigma < -4 ) a = mu - 4*sigma;   
          b = gxmax;
          if ( a > b ) c = 0;
          else c = 1 - stdnormal_cdf((a-mu)/sigma);
          d3.select("#a3").node().value = f3(a)
          d3.select("#c3").node().value = f4(c);
          document.getElementById("range21N").value = (800*(a-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(b-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, a, b, c);
        }
        else if (radioType == 4) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          h = parseFloat(d3.select("#h").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
//          document.getElementById("range4N").value  = f0(h*1000);
          f = mu - sigma*stdnormal_inv(1-(1-h)/2, info);
          g = mu + sigma*stdnormal_inv(1-(1-h)/2, info);
          d3.select("#f").node().value = f3(f);
          d3.select("#g").node().value = f3(g);
          d3.select("#h").node().value = f4(h);
          document.getElementById("range21N").value = (800*(f-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(g-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, f, g, h); 
        }
        else if (radioType == 5) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          e = parseFloat(d3.select("#e").node().value); 
          if (e > 0.9999) e = 0.9999;
          if (e < 0.0001) e = 0.0001;
//          document.getElementById("range3N").value  = f0(e*1000);
          a = gxmin;
          d = mu + sigma*stdnormal_inv(e, info);
          d3.select("#d").node().value = f3(d);
          d3.select("#e").node().value = f4(e);
          document.getElementById("range21N").value = (800*(a-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(d-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, a, d, e);
        }
        else if (radioType == 6) {
          bar.selectAll("text.mean").remove();
          bar.selectAll("line.lineb").remove();
          h = parseFloat(d3.select("#c6").node().value); 
          if (h > 0.9999) h = 0.9999;
          if (h < 0.0001) h = 0.0001;
          f = mu + sigma*stdnormal_inv(1-h, info);
          g = mu + 4*sigma;
          d3.select("#a6").node().value = f3(f);
          d3.select("#c6").node().value = f4(h);
          document.getElementById("range21N").value = (800*(f-gxmin)/gxrange).toString();
          document.getElementById("range22N").value = (800*(g-gxmin)/gxrange).toString();
          drawNormalGraph(mu, sigma, f, g, h); 
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
      // 정규분포표 버튼 클릭
      d3.select("#normalTable").on("click",function() {
         mu    = parseFloat(d3.select("#mu").node().value); 
         sigma = parseFloat(d3.select("#sigma").node().value); 
         normalTable(mu, sigma);
      })
      // 백분위수표 버튼 클릭
      d3.select("#percentileTable").on("click",function() {
         mu    = parseFloat(d3.select("#mu").node().value); 
         sigma = parseFloat(d3.select("#sigma").node().value); 
         normalPercentileTable(mu, sigma);
      })
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });

    function changeRangeMuSigma(){
       if (checkExecute == false && event.keyCode != 13) return;
       var muStr    = d3.select("#mu").node().value;
       var sigmaStr = d3.select("#sigma").node().value;
       mu    = parseFloat(muStr); 
       sigma = parseFloat(sigmaStr); 
       if (isNaN(mu) || isNaN(sigma)) {
          alert("Enter number!");
          return;
       }
       if (sigma < 0) {
         alert("Enter positive number!");
         return;
       }
       showValueNormal0();
       checkExecute = false;
    }

