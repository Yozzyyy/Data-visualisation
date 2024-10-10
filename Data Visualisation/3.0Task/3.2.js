
var dataset = [
    [5, 20, 5], 
    [500, 90, 5], 
    [250, 50, 10],
    [100, 33, 5], 
    [330, 95, 6], 
    [410, 12, 3],
    [475, 44, 10], 
    [25, 67, 5], 
    [85, 21, 5],
    [220, 88, 10]
];  // Array of data points: [x, y, radius] for circles

var w = 800;   // Width of the SVG canvas
var h = 160;   // Height of the SVG canvas
var padding = 30;  // Padding around the canvas for axes

// xScale: scales the x-values of the dataset to fit within the canvas width, considering padding
var xScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) { return d[0]; }),  // Minimum x-value in the dataset
             d3.max(dataset, function(d) { return d[0]; })]) // Maximum x-value in the dataset
    .range([padding, w - padding - 120]);  // Maps values between the canvas padding and its width minus padding

// yScale: scales the y-values of the dataset to fit within the canvas height, considering padding
var yScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) { return d[1]; }),  // Minimum y-value in the dataset
             d3.max(dataset, function(d) { return d[1]; })]) // Maximum y-value in the dataset
    .range([h - padding, padding]);  // Maps values between the height minus padding and padding (inverted in SVG)

var svg = d3.select("article.content")  // Selects the container to append the SVG
    .append("svg")  // Adds an SVG element
    .attr("width", w)  // Sets the width of the SVG
    .attr("height", h);  // Sets the height of the SVG

// xAxis: creates the x-axis based on xScale and specifies 10 ticks (divisions)
var xAxis = d3.axisBottom()
    .scale(xScale)  // Uses the xScale to scale the axis
    .ticks(10);  // Suggests 10 tick marks

// yAxis: creates the y-axis based on yScale and specifies 4 ticks (divisions)
var yAxis = d3.axisLeft()
    .scale(yScale)  // Uses the yScale to scale the axis
    .ticks(4);  // Suggests 4 tick marks

// Creates circles for each data point
svg.selectAll("circle")  // Selects all existing circle elements (if any)
    .data(dataset)  // Binds the dataset to the selection
    .enter()  // Creates placeholders for each data point
    .append("circle")  // Appends a circle element for each data point
    .attr("cx", function(d) { return xScale(d[0]); })  // Sets the x-coordinate of the circle based on the x-value (d[0])
    .attr("cy", function(d) { return yScale(d[1]); })  // Sets the y-coordinate of the circle based on the y-value (d[1])
    .attr("r", function(d) { return d[2]; })  // Sets the radius of the circle based on the third value in the dataset (d[2])
    .attr("fill", function(d) { return d[0] === 500 ? "red" : "rgb(49, 145, 0)"; });  // Sets the color of the circle (red if x-value is 500, otherwise green)

// Adds text labels next to each data point
svg.selectAll("text")  // Selects all existing text elements (if any)
    .data(dataset)  // Binds the dataset to the selection
    .enter()  // Creates placeholders for each data point
    .append("text")  // Appends a text element for each data point
    .text(function(d) { return d[0] + "," + d[1]; })  // Sets the text content to the x and y values
    .attr("x", function(d) { return xScale(d[0]) + 10; })  // Positions the text slightly to the right of the circle (x + 10)
    .attr("y", function(d) { return yScale(d[1]) - 1; })  // Positions the text slightly above the circle (y - 1)
    .attr("fill", "green");  // Sets the text color to green

// Appends the x-axis to the SVG at the bottom (height - padding)
svg.append("g")  // Adds a group element (g) to hold the x-axis
    .attr("class", "x axis")  // Assigns a class to the axis for styling purposes
    .attr("transform", "translate(0, " + (h - padding) + ")")  // Moves the x-axis to the bottom of the canvas
    .call(xAxis);  // Draws the x-axis using the defined xScale

// Appends the y-axis to the SVG on the left (at padding position)
svg.append("g")  // Adds a group element (g) to hold the y-axis
    .attr("class", "y axis")  // Assigns a class to the axis for styling purposes
    .attr("transform", "translate(" + padding + ", 0)")  // Moves the y-axis to the left side of the canvas
    .call(yAxis);  // Draws the y-axis using the defined yScale
