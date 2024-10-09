var w = 500;
var h = 100;
var barPadding = 3;

var dataset = [12, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28]; // Initial dataset
var easeType = d3.easeBounce;  // Correctly initialized

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// Create the initial bar chart
function drawBars(data) {
    var xscale = d3.scaleBand()
                    .domain(d3.range(data.length))
                    .range([0, w])
                    .paddingInner(0.05);

    var yscale = d3.scaleLinear()
                    .domain([0, d3.max(data)])
                    .range([h, 0]);

    // Create bars
    var bars = svg.selectAll("rect")
                    .data(data);

    bars.enter()
        .append("rect")
        .merge(bars)
        .attr("x", function(d, i) {
            return xscale(i);
        })
        .attr("y", h)  // Start from the bottom (initial position)
        .attr("width", xscale.bandwidth())
        .attr("height", 0) // Start with height 0
        .attr("fill", "rgb(106,90,205)")
        .transition()  // Now apply the transition
        .duration(2000)
        .ease(easeType)  // Apply easing AFTER the transition call
        .attr("y", function(d) {
            return yscale(d);
        })
        .attr("width", xscale.bandwidth())
        .attr("height", function(d) {
            return h - yscale(d);
        });

    bars.exit()
        .transition()
        .duration(2000)
        .attr("x", w)  // Move the exiting bars out of the view
        .remove();  // removing the bar

    // Add text to bars
    var labels = svg.selectAll("text")
                    .data(data);

    labels.enter()
        .append("text")
        .merge(labels)
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xscale(i) + xscale.bandwidth() / 2;
        })
        .attr("y", h)
        .transition()
        .duration(2000)
        .ease(easeType)  // Apply easing AFTER the transition call
        .attr("y", function(d) {
            return yscale(d) + 15;
        })
        .attr("fill", "black") //black text
        .attr("text-anchor", "middle"); //middle text

    labels.exit().remove();  // Remove old labels
}

// Draw the initial chart
drawBars(dataset);

// Update button functionality
d3.select("#updateButton").on("click", function() {
    dataset = dataset.map(function() {
        return Math.floor(Math.random() * 30);  // set a random number
    });
    drawBars(dataset);  // Redraw chart with updated data
});

// Add button functionality
d3.select("#Adding").on("click", function() {
    dataset.push(Math.floor(Math.random() * 30));  // Add a new random value
    drawBars(dataset);  // Redraw chart with new data
});

// Remove button functionality
d3.select("#Removing").on("click", function() {
    dataset.shift();  // Remove the first value from the dataset
    drawBars(dataset);  // Redraw chart with updated data
});
