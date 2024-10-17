function init(){
    //Width and height
    var w = 500;
    var h = 300;

    var projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w / 2, h / 2])
                        .scale(3000);

    // set up the paths
    var path = d3.geoPath()
                .projection(projection);

    var svg = d3.select("#Map")
                .append("svg")
                .attr("width",w)
                .attr("height",h)
                .attr("fill","steelblue");

    d3.json("https://raw.githubusercontent.com/Yozzyyy/Data-visualisation/refs/heads/main/Data%20Visualisation/8.0Task/LGA_VIC.json").then(function(json){

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path);
    });
}
window.onload = init;