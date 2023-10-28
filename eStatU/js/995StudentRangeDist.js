      // 유의수준
      var aa = document.myForm.type;
      var alpha = 0.05;
      var p = 1 - alpha;
      aa[0].onclick = function() {alpha = 0.05; p = 1-alpha;}
      aa[1].onclick = function() {alpha = 0.01; p = 1-alpha;}
      // 백분위수표 버튼 클릭
      d3.select("#percentileTable").on("click",function() {
        HSDTable(p);
      })
      // save Table
      d3.select("#saveTable").on("click", function() {
        head = '<html><head><meta charset="UTF-8"></head><body>';
        tail = '</body></html>';
        saveAs(new Blob([head + d3.select("#screenTable").html() + tail]), "eStatULog.html");
      });
      // HSD분포 백분위수표
      function HSDTable(p) {
        var screenTable = document.getElementById("screenTable");
        var table = document.createElement('table');
        loc.appendChild(table);

        var row, header;
        var i, j, k, p, df1, df2, info;
        var alpha = 1 - p;
        var nrow  = 121;
        var ncol  = 20;
        var cell = new Array(ncol);
        table.style.fontSize = "13px";
        k = 0;
    
          row = table.insertRow(k++);
          row.style.height ="30px";
          for (j=0; j<2; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
          }
          cell[0].style.width ="100px";
          cell[1].style.width ="60px";
          cell[0].innerHTML = "<h3>"+svgStrU[104][langNum]+"</h3>";
          cell[1].innerHTML = "df1 =";

          row = table.insertRow(k++);
          row.style.height ="30px";
          for (j=0; j<ncol; j++) {
            cell[j] = row.insertCell(j);
            cell[j].style.textAlign = "center";
            cell[j].style.border = "1px solid black";
            cell[j].style.width ="60px";
          }
          cell[0].innerHTML = "P(X &geq; x ) = "+f2(alpha);
          for (j=1; j<ncol; j++) {
            cell[j].innerHTML = j+1;
          }
       
          for (i=0; i<nrow; i++) {
            row = table.insertRow(k++);
            for (j=0; j<ncol; j++) {
              cell[j] = row.insertCell(j)          
              cell[j].style.textAlign = "center";
              cell[j].style.border = "1px solid black";
              cell[j].style.width ="60px";
            }
            cell[0].style.backgroundColor = "#eee";
            df2 = i + 1;
            if (df2 <= 120) cell[0].innerHTML = "df2 = "+df2;
            else cell[0].innerHTML = "df2 = &infin;";
            for (j=1; j<ncol; j++) {
              df1 = j + 1;
              cell[j].innerHTML =  f3(q_inv(p,df1,df2,info));
            }                   
          }
    } // end of HSD Table

