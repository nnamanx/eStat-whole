      var dot = d3.select("#chart")
      var totalHeight = 640;
      var svgWidth    = 600;
      var svgHeight   = 320;  // 모집단 그래프 영역
      var margin, graphWidht, graphHeight;

      var i, j, k; // 
      var nint, step, buffer, nvalue, gxmin, gxmax; 
 
      var nobs   = 10000;
      var radius = 1;
      
      var checkSampling = true;
      var checkInterval = false;
      var checkMean     = false;
      var checkCLT      = true;

      var statP      = new Array(20);
      var statS      = new Array(20);
      var bins       = new Array(1001);
      var dataSet    = new Array(nobs);
      var dataA      = new Array(nobs);
      var dataValue  = new Array(nobs);
      var dvalueFreq = new Array(nobs);
      var tdata      = new Array(nobs);
      var tdataY     = new Array(nobs);

      var generator, title;

      // 표본추출 선택 ----------------------------------------------------------------------------------
      dot.selectAll("*").remove();        

      margin      = {top: 20, bottom: 100, left: 20, right: 20};
      graphWidth  = svgWidth - margin.left - margin.right;
      graphHeight = svgHeight - margin.top - margin.bottom;
      title  = "N(0,1) "+svgStrU[8][langNum]+" (N="+nobs.toString()+")";
      dot.append("text").attr("class","title").attr("x",margin.left).attr("y",margin.top).text(title);
      normalGenerator(nobs, dataSet);
      nint    = 400;
      step    = 8/nint;
      bins[0] = -4;
      showDotSampleP(nobs, dataSet, nint, step, bins, statP, tdata, tdataY, dataValue);
      gxmin = statP[9];
      gxmax = statP[10];

      // 라디오 버튼 클릭 for data generation
      var rad = document.myForm.type1;
      rad[0].onclick = function() {     // Normal(0,1)
         dot.selectAll("*").remove();
         title  = "N(0,1) "+svgStrU[8][langNum]+" (N="+nobs.toString()+")";
         dot.append("text").attr("class","title").attr("x",margin.left).attr("y",margin.top).text(title);
         normalGenerator(nobs, dataSet);
         nint    = 400;
         step    = 8/nint;
         bins[0] = -4;
         showDotSampleP(nobs, dataSet, nint, step, bins, statP, tdata, tdataY, dataValue);
      }
      rad[1].onclick = function() {     // Exponential(0.3)
         dot.selectAll("*").remove();
         title  = svgStrU[49][langNum]+"(0.3) "+svgStrU[8][langNum]+" (N="+nobs.toString()+")";
         dot.append("text").attr("class","title").attr("x",margin.left).attr("y",margin.top).text(title);
         expGenerator(nobs, dataSet);
         nint    = 900;
         step    = 30/nint;
         bins[0] = 0;
         showDotSampleP(nobs, dataSet, nint, step, bins, statP, tdata, tdataY, dataValue);
      }
      rad[2].onclick = function() {     // Uniform(0,10)
         dot.selectAll("*").remove();
         title  = svgStrU[50][langNum] + "(0,1) "+svgStrU[8][langNum]+" (N="+nobs.toString()+")";
         dot.append("text").attr("class","title").attr("x",margin.left).attr("y",margin.top).text(title);
         for (i=0; i<nobs; i++) dataSet[i] = Math.random();
         nint    = 250;
         step    = 1/nint;
         bins[0] = 0;
         showDotSampleP(nobs, dataSet, nint, step, bins, statP, tdata, tdataY, dataValue);
      }

      // CLT 샘플링 버튼 클릭
      d3.select("#samplingCLT").on("click",function() {
          removeAllSample();
          CLT();
      }) 
      // svg Graph Save
      d3.select("#saveGraphU").on("click", function() {
        var svg = d3.select("#chart");
        var width = svgWidth;
        var height = 600;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });


