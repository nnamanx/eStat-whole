      var chartAdd = d3.select("#chartAdd");
      var marginAdd      = {top: 10, bottom: 10, left: 10, right: 10};
      var svgWidthAdd    = 600;
      var svgHeightAdd   = 480;
      var graphWidthAdd  = svgWidthAdd - marginAdd.left - marginAdd.right;
      var graphHeightAdd = svgHeightAdd - marginAdd.top - marginAdd.bottom;
      var i, pa, pb, panb, paub, temp, tmin, tmax, str1, str2, str3;
      var colr = ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FFFF","#BF00FF","#FF00FF","#0080FF","#00BFFF","#8000FF"];
      str1 = "P(A ∪ B) = P(A) + P(B) - P(A∩B)" ;

      // Calculate A union B ======================================
      d3.select("#executeAUB").on("click",function() {
        chartAdd.selectAll("*").remove();
        pa   = d3.select("#pa").node().value;
        pb   = d3.select("#pb").node().value;
        panb = d3.select("#panb").node().value;
        // initial calculation
        tmin = 0;
        tmax = pb;
        document.getElementById("rangePA").value = f0(pa*20);
        document.getElementById("rangePB").value = f0(pb*20);
        document.getElementById("rangePANB").value = f0(20 * (panb - tmin) / (tmax - tmin));
        // input value
        if ( isNaN(pa) || isNaN(pb) || isNaN(panb) ) {  // wrong input
          chartAdd.append("text").attr("class","mean")
             .attr("x", 250).attr("y", 100)
             .text(alertMsg[48][langNum])
             .style("stroke","red")
             .style("font-size","1.2em")
          return;
        }
        if ( panb > pa || panb > pb ) {  // wrong input
          chartAdd.append("text").attr("class","mean")
             .attr("x", 250).attr("y", 100)
             .text("P(A ∩ B) < P(A) or P(B)")
             .style("stroke","red")
             .style("font-size","1.2em")
          return;
        }
        calculateAUB();
      })

      // svg Graph Save
      d3.select("#saveGraphADD").on("click", function() {
        var svg = d3.select("#chartAdd");
        var width = svgWidthAdd;
        var height = svgHeightAdd;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });

      // Calculate paub
      function calculateAUB() {
        pa   = parseFloat(d3.select("#pa").node().value);
        pb   = parseFloat(d3.select("#pb").node().value);
        panb = parseFloat(d3.select("#panb").node().value);
        if (panb > pa) {panb = pa }
        if (panb > pb) {panb = pb;}
        if (pa <= pb) tmax = pa;
        else tmax = pb;
        tmin = 0;
        if (pa+pb >= 1) tmin = pa + pb - 1;
        document.getElementById("pa").value   = f3(pa);
        document.getElementById("pb").value   = f3(pb);
        document.getElementById("panb").value = f3(panb);
        document.getElementById("minPANB").innerHTML = f3(tmin);
        document.getElementById("maxPANB").innerHTML = f3(tmax);
        if (tmin == tmax) temp = 20;
        else temp = 20*(panb-tmin)/(tmax-tmin)
        document.getElementById("rangePANB").value = temp;
        // P(A U B)
        paub = parseFloat(pa) + parseFloat(pb) - parseFloat(panb);
        str2 = " = " + f3(pa) + " + " + f3(pb) + " - " + f3(panb); 
        str3 = " = " + f3(paub);
        document.getElementById("paubstr").innerHTML = str1 + str2 + str3;
        drawUnion(pa, pb, panb, paub, str3);   
      }

      // pa slidebar
      function showValuePA(newValue) {
        document.getElementById("pa").value = f3(newValue*0.05);
        pa   = parseFloat(d3.select("#pa").node().value);
        pb   = parseFloat(d3.select("#pb").node().value);
        panb = parseFloat(d3.select("#panb").node().value);
        calculateAUB();       
      }
      // pb slide bar
      function showValuePB(newValue) {
        document.getElementById("pb").value = f3(newValue*0.05);
        pa   = parseFloat(d3.select("#pa").node().value);
        pb   = parseFloat(d3.select("#pb").node().value);
        panb = parseFloat(d3.select("#panb").node().value);
        calculateAUB();
      }
      // panb slide bar
      function showValuePANB(newValue) {
        pa   = parseFloat(d3.select("#pa").node().value);
        pb   = parseFloat(d3.select("#pb").node().value);
        if (pa <= pb) tmax = pa;
        else tmax = pb;
        tmin = 0;
        if (pa+pb >= 1) tmin = pa + pb - 1;
        panb = tmin + (tmax - tmin) * newValue * 0.05;
        document.getElementById("panb").value = f3(panb);
        pa   = parseFloat(d3.select("#pa").node().value);
        pb   = parseFloat(d3.select("#pb").node().value);
        panb = parseFloat(d3.select("#panb").node().value);
        calculateAUB();
      }
      // draw paub
      function drawUnion(pa, pb, panb, paub, str3) {
        chartAdd.selectAll("*").remove();
        var i, j, tx, ty, cx, cy, rx, ry, width, height;
        var radius, radiusA, radiusB, radiusAB;
        var xgap   = 20;
        var ygap   = 20;
        var fontsize  = "0.9em";
        var fontsize2 = "1.3em";
        radius   = 150;
        radiusA  = radius * Math.sqrt(pa);
        radiusB  = radius * Math.sqrt(pb);
        radiusAB = radius * Math.sqrt(panb)
        cx = marginAdd.left + xgap + radius;
        cy = marginAdd.top  + 170;
        tx = marginAdd.left + 10;
        ty = marginAdd.top  + 10;
        rx = 20;
        ry = 20;
        width  = graphWidthAdd - xgap;
        height = graphHeightAdd - ygap;
        // A union B
//        chartAdd.style("fill","yellow");
        chartAdd.append("rect").attr("x",tx).attr("y",ty).attr("rx",rx).attr("ry",ry).attr("width",width).attr("height",height)
             .style("stroke","black").style("stroke-width","2").style("opacity","0.2").style("fill","yellow");
        chartAdd.append("circle").attr("cx",cx).attr("cy",cy).attr("r",radiusA)
             .style("stroke","black").style("stroke-width","2").style("opacity","0.2").style("fill","red");
        chartAdd.append("text").attr("x", cx-10).attr("y", cy-radiusA+30).text("P(A)="+f3(pa))
             .style("font-size",fontsize).style("stroke","black").style("text-anchor","middle")
        if (pa == 1 || pb == 1) tx = cx;
        else if (panb == 0)  tx = cx + 2*radiusA; 
        else if (pb == panb) tx = cx + radiusAB/3;
        else tx = cx + radius - radiusAB/2+10;
        chartAdd.append("circle").attr("cx",tx).attr("cy",cy).attr("r",radiusB)
             .style("stroke","black").style("stroke-width","2").style("opacity","0.2").style("fill","green");
        chartAdd.append("text").attr("x", tx+20).attr("y", cy-radiusB+30).text("P(B)="+f3(pb))
             .style("font-size",fontsize).style("stroke","black").style("text-anchor","middle")
        chartAdd.append("text").attr("x", (cx+tx)/2).attr("y", cy+10).text("P(A∩B)="+f3(panb))
             .style("font-size",fontsize).style("stroke","black").style("text-anchor","middle")
        tx = marginAdd.left + xgap + 30;
        ty =  cy + 200;
        chartAdd.append("text").attr("x", tx).attr("y", ty).text(str1)
             .style("font-size",fontsize2).style("stroke","black").style("text-anchor","begin")
        chartAdd.append("text").attr("x", tx).attr("y", ty+30).text(str2)
             .style("font-size",fontsize2).style("stroke","black").style("text-anchor","begin")
        chartAdd.append("text").attr("x", tx).attr("y", ty+60).text(str3)
             .style("font-size",fontsize2).style("stroke","black").style("text-anchor","begin")
      }
