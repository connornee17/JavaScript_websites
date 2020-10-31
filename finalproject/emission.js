function init() {

  var w = 700;
  var h = 400;

  var xPadding = 50;
  var yPadding = 15;

  var dataset;

  var rowConverter = function(d) {
    return {
      date: new Date(d.year),
      number: parseFloat(d.emission)
    };
  }

  d3.csv("australiaCO2Emission.csv", rowConverter).then(function(data) {

      dataset = data;

      lineChart(dataset);
  });

   function lineChart() {



       xScale = d3.scaleTime()
                      .domain ([
                        d3.min(dataset, function(d) { return d.date; }),
                        d3.max(dataset, function(d) { return d.date; }),
                      ])
                      .range([xPadding+40, w - xPadding]);

       yScale = d3.scaleLinear()
                       .domain([0, d3.max(dataset, function(d) { return d.number; })
                        ])
                       .range([h - yPadding - 30, yPadding]);





        line = d3.line()
                    .x(function(d) { return xScale(d.date); })
                    .y(function(d) { return yScale(d.number); });

        area = d3.area()
                .x(function(d) { return xScale(d.date); })

                .y0(function() { return yScale.range()[0]; })

                .y1 (function(d) { return yScale(d.number); });
       




       var svg = d3.select("#co2chart")
                   .append("svg")
                   .attr("id", "mysvg")
                   .attr("width", w)
                   .attr("height", h);

               svg.append("path")
                   .datum(dataset)
                   .attr("class", "line")
                   .attr("d", line)
                   .attr("stroke", "blue");




        var xAxis = d3.axisBottom()
          .ticks(15)
          .scale(xScale);

        svg.append("g")
          .attr("transform", "translate(0, "+ (h - yPadding -30) +")")
          .call(xAxis);

        var yAxis = d3.axisLeft()
              .ticks(10)
              .scale(yScale);

        svg.append("g")
          .attr("transform", "translate("+ (xPadding + 40) + ",0)")
          .call(yAxis);




        

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", xPadding + 300)
            .attr("y", yScale(0) + 32)
            .text("YEAR");

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", xPadding - 50)
            .attr("y", yScale(0) - 170)
            .text("Co2");

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", xPadding - 50)
            .attr("y", yScale(0) - 160)
            .text("(kton)");


        d3.select("#buttonusa")
         .on("click", function() {

            d3.csv("americaCO2Emission.csv", rowConverter).then(function(data) {

              dataset = data;

              d3.select("#mysvg").remove();

              lineChart(dataset);    

              d3.select(".line").attr("stroke", "red");   
            });

         });

         d3.select("#buttonaus")
         .on("click", function() {

            d3.csv("australiaCO2Emission.csv", rowConverter).then(function(data) {

              dataset = data;

              d3.select("#mysvg").remove();

              lineChart(dataset);         
            });

         });

         d3.select("#buttonchina")
         .on("click", function() {

            d3.csv("chinaCO2Emission.csv", rowConverter).then(function(data) {

              dataset = data;

              d3.select("#mysvg").remove();

              lineChart(dataset);  

              d3.select(".line").attr("stroke", "green");       
            });

         });
        


  }


  var datasetsea;

  d3.csv("seaLevels.csv", rowConverter).then(function(data) {

      datasetsea = data;

      sealineChart(datasetsea);
  });

   function sealineChart() {



       xScale = d3.scaleTime()
                      .domain ([
                        d3.min(datasetsea, function(d) { return d.date; }),
                        d3.max(datasetsea, function(d) { return d.date; }),
                      ])
                      .range([xPadding+10, w - xPadding]);

       yScale = d3.scaleLinear()
                       .domain([0, d3.max(datasetsea, function(d) { return d.number; })
                        ])
                       .range([h - yPadding - 20, yPadding]);





        line = d3.line()
                    .x(function(d) { return xScale(d.date); })
                    .y(function(d) { return yScale(d.number); });

        area = d3.area()
                .x(function(d) { return xScale(d.date); })

                .y0(function() { return yScale.range()[0]; })

                .y1 (function(d) { return yScale(d.number); });
       




       var svg = d3.select("#seachart")
                   .append("svg")
                   .attr("id", "mysvg")
                   .attr("width", w)
                   .attr("height", h);

               svg.append("path")
                   .datum(datasetsea)
                   .attr("class", "area")
                   .attr("d", area)
                   .attr("fill", "blue");




        var xAxis = d3.axisBottom()
          .ticks(20)
          .scale(xScale);

        svg.append("g")
          .attr("transform", "translate(0, "+ (h - yPadding -20) +")")
          .call(xAxis);

        var yAxis = d3.axisLeft()
              .ticks(10)
              .scale(yScale);

        svg.append("g")
          .attr("transform", "translate("+ (xPadding + 10) + "-0.1)")
          .call(yAxis);




        

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", xPadding + 300)
            .attr("y", yScale(0) + 34)
            .text("YEAR");

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", xPadding - 50)
            .attr("y", yScale(0) - 170)
            .text("Sea-level");

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", xPadding - 50)
            .attr("y", yScale(0) - 160)
            .text("(inches)");


        svg.append("line")
            .attr("class", "linehalfMilMark")

            .attr("x1", xScale(7))
            .attr("y1", yPadding)

            .attr("x2", xScale(7))
            .attr("y2", h - 35);

        svg.append("text")
            
            .attr("x", xPadding + 365)
            .attr("class", "mylabel")
            .attr("y", yScale(5))
            .text("1970")
            .attr("stroke", "red");




        
        


  }

  


  
       
}

window.onload = init;