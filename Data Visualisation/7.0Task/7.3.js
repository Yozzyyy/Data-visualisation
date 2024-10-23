function init() {
    var dataset = [ //is dataset for the stacked graph
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
    ];

    var keys = ["apples", "oranges", "grapes"]; //key each key word and the initlize var 

    var w = 500;
    var h = 300;
    var margin = { top: 20, right: 20, bottom: 30, left: 40 }; //even padding around the svg
    
    var xscale = d3.scaleBand()
                   .domain(d3.range(dataset.length))
                   .range([margin.left, w - margin.right]) 
                   .padding(0.1);

    var yscale = d3.scaleLinear()
                   .domain([0, d3.max(dataset, d => d.apples + d.oranges + d.grapes)]) // on Y axis how the value is mapped based on how our pixel values
                   .range([h - margin.bottom, margin.top]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);  // color will be used from d3 color scheme

    // stack the data with each other 
    var series = d3.stack()
                   .keys(keys)(dataset); //stack keys and dataset 

    var svg = d3.select("#stacked") // calling it to body in html 
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    // Create groups for each series
    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .style("fill", function(d, i) { return color(i); });

    
    groups.selectAll("rect") //append the rect
          .data(function(d) { return d; })
          .enter()
          .append("rect")
          .attr("x", function(d, i) { return xscale(i); })
          .attr("y", function(d) { return yscale(d[1]); })
          .attr("height", function(d) { return yscale(d[0]) - yscale(d[1]); })
          .attr("width", xscale.bandwidth());
}

window.onload = init;
