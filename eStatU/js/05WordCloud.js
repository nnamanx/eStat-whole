/*
      document.getElementById("textarea").value = "The development of these technologies has created massive data, simply called ‘Big Data’, that were unimaginable in the past. Typical examples of the big data include data from Google's search records, social media messages by mobile phones, web logs by internet connections, and telephone records of global telecom companies. The big data are expected to grow and increase exponentially in the future and the hyper-forecasting is also expected to be possible. The success or failure of each individual, group, company and even country would depend on how to utilize the big data efficiently. The analysis of the big data that emerged this century is so enormous and diverse in the amount of data that can not be fully utilized just by traditional statistical approaches. For the analysis and utilization of the big data, theories of statistics, computer science, mathematics, management or related disciplines must also be applied simultaneously. Data Science is a new area of study in which statistics, mathematics, computer science and other disciplines are fused to analyze and utilize the big data that emerged this century."; 
*/
      var svg = d3.select("#chartWord");
      var svgWidth, svgHeight;
      svgWidth    = 750;
      svgHeight   = 540;

      // erase Word Data
      d3.select("#eraseWordData").on("click",function() {
        svg.selectAll("*").remove();
        // title
        document.getElementById("textarea").value = "";
      })
      // execute Word Cloud
      d3.select("#executeWord").on("click", function() {
        $("#chartWord").empty();
        text_string = $("#textarea").val();
        drawWordCloud(text_string); 
      });

      // svg Graph Save
      d3.select("#saveGraphWord").on("click", function() {
        var width  = svgWidth;
        var height = svgHeight;
        var svgString = getSVGString(svg.node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
          saveAs(dataBlob, 'eStatGraphU.png');
        }
      });

      function drawWordCloud(text_string){
        var common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";

        var word_count = {};

        var words = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
          if (words.length == 1){
            word_count[words[0]] = 1;
          } else {
            words.forEach(function(word){
              var word = word.toLowerCase();
              if (word != "" && common.indexOf(word)==-1 && word.length>1){
                if (word_count[word]){
                  word_count[word]++;
                } else {
                  word_count[word] = 1;
                }
              }
            })
          }

        var svg_location = "#chartWord";
        var width = svgWidth; // $(document).width();
        var height = svgHeight; // $(document).height();

        var fill = d3.schemeCategory20;

        var word_entries = d3.entries(word_count);

        var xScale = d3.scaleLinear()
           .domain([0, d3.max(word_entries, function(d) {
              return d.value;
            })
           ])
           .range([10,100]);

        d3.layout.cloud().size([width, height])
          .timeInterval(20)
          .words(word_entries)
          .fontSize(function(d) { return xScale(+d.value); })
          .text(function(d) { return d.key; })
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .font("Impact")
          .on("end", draw)
          .start();

        function draw(words) {
          d3.select(svg_location).append("svg")
              .attr("width", width)
              .attr("height", height)
            .append("g")
              .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
            .selectAll("text")
              .data(words)
            .enter().append("text")
              .style("font-size", function(d) { return xScale(d.value) + "px"; })
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return fill[i]; })
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .text(function(d) { return d.key; });
        }

        d3.layout.cloud().stop();
      }
