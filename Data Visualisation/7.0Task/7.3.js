var dataset = [

    { apples: 5, oranges: 10, grapes: 22 },

    { apples: 4, oranges: 12, grapes: 28 },

    { apples: 2, oranges: 19, grapes: 32 },

    { apples: 7, oranges: 23, grapes: 35 },

    { apples: 23, oranges: 17, grapes: 43 }

    ];
    d3.stack()

    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .style("fill", function(d,i){
                        return Color(i)
                    });