function init() {

     var w = 500;
     var h = 300;
     var barpadding = 1;

     var dataset = [14, 5, 26, 23, 9, 15, 20, 25, 5, 29, 15];

     var xScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .rangeRound([0,w])
            .paddingInner(0.05);

     var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([0,h]);





     var svg = d3.select("#chart")
                 .append("svg")
                 .attr("width", w)
                 .attr("height", h);

      svg.selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("x", function(d, i) {
            return xScale(i);
          })
          .attr("y", function(d) {
            return h - yScale(d);
          })
          .attr("width", xScale.bandwidth())
          .attr("height", function(d) {
            return yScale(d);
          });


     d3.select("button")
      .on("click", function() {
        
        var numValues = dataset.length;
        var maxValue = 25;

        dataset = [];

        for (var i = 0; i < numValues; i++) {
          var newNumber = Math.floor(Math.random()* maxValue);
          dataset.push(newNumber);
        }

        svg.selectAll("rect")
          .data(dataset)
          .attr("y", function(d) {
            return h - yScale(d);
          })
          .attr("height", function(d) {
            return yScale(d);
          })

      });

      var dataset1 = [11, 10, 2, 13, 5, 3, 2, 25, 5, 29];

      var svg1 = d3.select("#mychart")
                 .append("svg")
                 .attr("width", w)
                 .attr("height", h);

      svg1.selectAll("rect")
          .data(dataset1)
          .enter()
          .append("rect")
          .attr("x", function(d, i) {
            return xScale(i);
          })
          .attr("y", function(d) {
            return h - yScale(d);
          })
          .attr("width", xScale.bandwidth())
          .attr("height", function(d) {
            return yScale(d);
          });


      d3.select("#mybutton")
      .on("click", function() {
        
        var numValues = dataset1.length;
        var maxValue = 25;

        dataset1 = [];

        for (var i = 0; i < numValues; i++) {
          var newNumber = Math.floor(Math.random()* maxValue);
          dataset1.push(newNumber);
        }

        svg1.selectAll("rect")
          .data(dataset1)
          .attr("y", function(d) {
            return h - yScale(d);
          })
          .attr("height", function(d) {
            return yScale(d);
          })

      });




}

window.onload = init;