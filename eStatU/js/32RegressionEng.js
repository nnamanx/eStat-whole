      var svg = d3.select("#chart"); 
      var svgWidth    = 600;
      var svgHeight   = 600;
      var margin      = {top: 100, bottom: 70, left: 70, right: 100};
      var buffer      = 40;
      var graphWidth  = svgWidth - margin.left - margin.right;
      var graphHeight = svgHeight - margin.top - margin.bottom;

      // 회귀 시뮬레이션 변수들
      var width  = svgWidth;
      var height = svgHeight;
      var xlim = [0, 10];
      var ylim = [0, 10];
      var xscale = d3.scaleLinear()
                     .domain(xlim)
                     .range([margin.left, width - margin.right]);
      var yscale = d3.scaleLinear()
                     .domain(ylim)
                     .range([height - margin.bottom, margin.top]);
      var xaxis  = d3.axisBottom(xscale)
                     .ticks(5);
      var yaxis  = d3.axisLeft(yscale)
                     .ticks(5);
      var line = svg.append("line");
              
      var removePoint = function() {
           if(document.getElementById("add_off").checked) {	    
             this.remove();
	     updateRegressionLine();
           }
         }

      var drag = d3.drag()
            .on("start", function(d) {
           	d3.event.sourceEvent.stopPropagation();
	        d3.select(this)
	          .style("fill", "#bf616a")
	          .attr("r", 10);
            })
            .on("drag", function(d) {
               var x = d3.event.x;
	       var y = d3.event.y;
	       d3.select(this)
	         .attr("cx", x)
	         .attr("cy", y);
	    updateRegressionLine();
            })
           .on("end", function(d) {
	       d3.select(this)
	         .style("fill", "black")
	        .attr("r", 5);
            });


      // 회귀선 시뮬레이션 -------------------------------------------------------------
      var sub1  = svgStrU[52][langNum];
      var sub2  = svgStrU[53][langNum];
      var ty    = margin.top/3;
      svg.append("text").attr("class","titleS").attr("x",margin.left).attr("y",ty).text(sub1);
      svg.append("text").attr("class","titleS").attr("x",margin.left).attr("y",ty+20).text(sub2);

      showScatterPlot3(graphWidth, graphHeight); // 화면

      ncount = 0;
      svg.on("click", function() {
      if(d3.event.defaultPrevented) return;
    
      var pos = d3.mouse(this);
      if(document.getElementById("add_on" ).checked) {
                if ( pos[0] > margin.left && pos[0] < margin.left+graphWidth 
                     && pos[1] > margin.top && pos[1] < margin.top+graphHeight) {
            	  addPoint(pos[0], pos[1]);
                  ncount++;
                  updateRegressionLine();
                }
          }
      });

      // 회귀 시뮬레이션 화면 지우기
      d3.select("#erase").on("click",function() {

         svg.selectAll("circle").remove();
         svg.selectAll("text.reglabel3").remove(); 
         svg.selectAll("line.regline").remove();  

         updateRegressionLine();
         ncount = 0;
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


