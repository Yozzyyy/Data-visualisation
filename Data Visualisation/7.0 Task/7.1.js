    function init() {
        var w = 600;
        var h = 300;
        var padding = 40;

        var dataset;

        // Load the CSV data
        d3.csv("Unemployment_78-95.csv", function(d) {
            return {
                date: new Date(+d.year, +d.month - 1),
                number: +d.number
            };
        }).then(function(data) {
            dataset = data;

            // Call the function to draw the line chart
            linechart(dataset);
        });

        function linechart(dataset) {
            // Create scales for x and y axes
            var xScale = d3.scaleTime()
                .domain([
                    d3.min(dataset, function(d) { return d.date; }),
                    d3.max(dataset, function(d) { return d.date; })
                ])
                .range([padding, w - padding]);

            var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d) { return d.number; })])
                .range([h - padding, padding]);

            // Define the line function
            var line = d3.line()
                .x(function(d) { return xScale(d.date); })
                .y(function(d) { return yScale(d.number); });

            // Create the SVG container
            var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w + 10)
                .attr("height", h + 10);

            // Append the line path to the SVG
            svg.append("path")
                .datum(dataset)
                .attr("class", "area")
                .attr("d", line)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2);
            
            svg.append("line")
                .attr("class","Line-Halfway")
                .attr("x1", padding)
                .attr("y1",yScale(500000))

                .attr("x2", w- padding)
                .attr("y2",yScale(500000))
                .attr("stroke", "red") // Set the stroke color to red
                .attr("stroke-width", 2)// Set the stroke width
                .attr("stroke-dasharray", "4 4");
            svg.append("text")
                .attr("class","halfLabel")
                .attr("x", padding + 100)
                .attr("y",yScale(500000)-7)
                .text("half a million unemployed!");
            area = d3.area()
                    .x(function(d){return xScale(d.date);})
                    .y0(h - padding)  // Bottom edge (fills to the bottom of the chart)
                    .y1(function(d){return yScale(d.number);});     // Top edge (fills to the top of the chart);

            // Create x and y axes
            var xAxis = d3.axisBottom(xScale).ticks(10);
            var yAxis = d3.axisLeft(yScale).ticks(10);

            // draw the x axis
            svg.append("g")
                .attr("transform", "translate(0," + (h - padding) + ")")
                .call(xAxis);

            // draw the y axis
            svg.append("g")
                .attr("transform", "translate(" + ( padding - 5 ) + ",0)")
                .call(yAxis);
        }
    }

    // Call init() function to start chart drawing
    init();
