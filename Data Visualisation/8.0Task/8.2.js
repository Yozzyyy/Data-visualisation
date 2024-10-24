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

    var color = d3.scaleQuantize()
                .range(d3.schemePurples[5]);

    var svg = d3.select("#Map")
                .append("svg")
                .attr("width",w)
                .attr("height",h)
                .attr("fill","steelblue");
                
                d3.csv("VIC_LGA_unemployment.csv").then(function(data){

                    color.domain([
            
                        d3.min(data, function (d) { return d.unemployed; }),
                        d3.max(data, function (d) { return d.unemployed; })
            
                    ]);
            
                    d3.json("https://raw.githubusercontent.com/Yozzyyy/Data-visualisation/main/Data%20Visualisation/8.0Task/LGA_VIC.json").then(function(json){
            
                        for (var i = 0; i < data.length; i++) {
            
                            var dataState = data[i].LGA;
            
                            var dataValue = parseFloat(data[i].unemployed);
            
                            for (var j = 0; j < json.features.length; j++) {
                                
                                var jsonState = json.features[j].properties.LGA_name;
                                
                                if (dataState == jsonState) {
            
                                    json.features[j].properties.value = dataValue;
            
                                    break;
                                }
                            }
                        }
            
                        svg.selectAll("path")
                            .data(json.features)
                            .enter()
                            .append("path")
                            .attr("d", path)
                            .style("fill", function(d) {
            
                                var value = d.properties.value;
            
                                if (value) {
            
                                    return color(value);
            
                                } else {
            
                                    return "#ccc";
            
                                }
                        });
            
                        d3.csv("VIC_city.csv").then(function(data){
                            svg.selectAll("circle")
                                .data(data)
                                .enter()
                                .append("circle")
                                .attr("cx", function(d){
                                    return projection([d.lon, d.lat])[0];
                                })
                                .attr("cy", function(d){
                                    return projection([d.lon, d.lat])[1];
                                })
                                .attr("r", 5)
                                .style("fill", "red")
                                .style("opacity", 0.75);
                            });
                    });
                });
            }
             window.onload= init;