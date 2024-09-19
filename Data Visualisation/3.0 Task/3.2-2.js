//---------------------------------------------------------------------------------------------------------------------------------------
// modified version for demo 2 
var dataset = [
    [2,8], 
    [3,5], 
    [5,17],
    [6,6], 
    [6,12], 
    [7,20],
    [8,22], 
    [10,11], 
    [5,12],
    [6,16]
];  //array list for data set 
var w = 800;   // Width
var h = 400;   // height
var padding = 50;  // padding

//x-value for better x scalling
var xScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) { return d[0]; }),  // min x value 
             d3.max(dataset, function(d) { return d[0]; })]) // Max x value
    .range([padding, w - padding]);  // Maps values between the canvas padding and its width minus padding

// y-value for better scalling
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])  // 0 to max y value
    .range([h - padding, padding]);  

var svg = d3.select("article.content")  // Selects the container to place the object
    .append("svg")  
    .attr("width", w)  
    .attr("height", h);  

//create the x graph to set at 10 ticks
var xAxis = d3.axisBottom()
    .scale(xScale)  // set a x scale
    .ticks(10);  //  10 tick marks

//create the y graph to set at 8 ticks
var yAxis = d3.axisLeft()
    .scale(yScale)  // Uses the yScale to scale the axis
    .ticks(8);  // Specifies 8 tick marks for better spacing

// Creates circles for each data point
svg.selectAll("circle")  // Selects all existing circle elements (if any)
    .data(dataset)  // Binds the dataset to the selection
    .enter()  // Creates placeholders for each data point
    .append("circle")  // Appends a circle element for each data point
    .attr("cx", function(d) { return xScale(d[0]); })  // Sets the x-coordinate of the circle based on the x-value (d[0])
    .attr("cy", function(d) { return yScale(d[1]); })  // Sets the y-coordinate of the circle based on the y-value (d[1])
    .attr("r", 6)  // Sets a fixed radius for all circles
    .attr("fill", "rgb(49, 145, 0)");  // Sets the color of the circle

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

// Adding labels for the axes
// x-axis label
svg.append("text")  // Adds a text element
    .attr("text-anchor", "middle")  // Centers the text
    .attr("x", w / 2)  // Positions it in the middle of the width
    .attr("y", h - 10)  // Positions it slightly below the x-axis
    .text("Tree Age(years)")  // Sets the label text
    .attr("font-size", "12px")  // Sets font size
    .attr("fill", "black");  // Sets text color

// y-axis label
svg.append("text")  // Adds a text element
    .attr("text-anchor", "middle")  // Centers the text
    .attr("transform", "rotate(-90)")  // Rotates the text to be vertical
    .attr("x", -h / 2)  // Moves the label to the center of the y-axis
    .attr("y", 15)  // Positions it slightly to the left of the y-axis
    .text("Tree Height(m)")  // Sets the label text
    .attr("font-size", "12px")  // Sets font size
    .attr("fill", "black");  // Sets text color
