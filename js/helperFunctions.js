
function peopleChart(pixelChart, items,x0,y0, colors,borderColor,pixelSize,scale, xratio,yratio) {
    var xPos = 0
    var yPos = 0
    var t = d3.transition()
      .duration(750);
    var data = pixelData(items, colors);
    console.log(data);


    var pixels = pixelChart.selectAll("g")
        .data(data);

    pixels.exit()
        .transition(t)
        .attr("width", 1)
        .attr("height", 1)
        .remove()

   var pixel=pixels.enter()
            .append("g")
            .attr("transform", function(d, idx){
                var y = y0;
                var x = x0 + idx*pixelSize;
                return "translate(" + x + "," + y +"),scale("+scale+")";
            }
        )
            .attr("opacity",0);
    pixel.append("use").attr("xlink:href","#person");

    pixel.transition().delay(function(d,idx){
     return idx*100;
    }).duration(20).attr("opacity",1);

}

function peopleGroupChart(svgElem, groups, x0, y0, groupColors, borderColor, width, height) {

    var origWidth = 48.1;
    var origHeight = 130;

    var width = 0.60 * screen.width;

    var padding = { "right" : 200, "bottom": 200}

    var data = pixelGroupData(groups, groupColors);
    var t = d3.transition()
      .duration(750);
    var xPos = 0
    var yPos = 0

    xScale = d3.scale.linear()
        .range([x0, width])
        .domain([0, 144])

    yScale = d3.scale.ordinal()
        .domain(d3.entries(groups).map(function (d){ return d.key;}))
        .rangePoints([y0, height], 5)

    var personWidth = xScale(1) - xScale(0);
    var scale = personWidth/origWidth;

    charts = svgElem.selectAll("g .chart")
        .data(d3.entries(data), function key(d){
            return d.key;
        });

    charts.exit()
        .remove()

    charts.enter()
        .append("g")
        .attr("class", "chart")
        .attr("id", function (d){ return d.key;})

    charts
        .attr("transform", function (d,idx) {
            var y = yScale(d.key);
            var x = x0;
            return "translate(" + x + "," + (y-5) + ")";
        }
    );

    charts.exit()
        .transition(t)
        .attr("width", 1)
        .attr("height", 1)
        .remove()


    var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")

    chart.append("g")
            .attr("class", "y axis")
            .attr("transform", function (d) { return "translate(" + (x0-5) + ",0)"})
            .call(yAxis)

    d3.selectAll("g.chart").append("text")
            .attr("transform", function (d) {
                var x = (d.value.length+1)*personWidth;
                return "translate(" + x + ",0)"
            }
            )
            .attr("opacity", 0)
            .text(function(d){return d.value.length;})
            .attr("dy", "0.6em")
            .transition()
            .delay(function(d, idx) {
                console.log(idx);
                if(idx<7)
                return idx*500;
                // else if (idx<7)
                //     return idx*700;
                else if (idx==7)
                    return 3900;
                else if(idx==8)
                    return idx*600;
                else if(idx==9)
                    return idx*1000;
                else if(idx==10) return idx*2300;
            })
            .attr("opacity", 1)
            .attr("fill",'#FFFFFF')


    var people = charts.selectAll("text.personcount").data(function (d) {return d.value;})

    people.enter()
        .append("text")
        .attr("class", "personcount")
        .text(function(d, idx) {return idx;} )
        .attr("opacity", "0")
        .attr("transform", function(d, idx){
            var x = (idx+2)*personWidth;
            return "translate(" + x + "," + 0 +")";
        })
        .attr("dy", "0.6em")
        .attr("fill",'#FFFFFF')

    d3.selectAll("text.personcount").transition().delay(function(d,idx){
         return idx*100;
    }).duration(20).attr("opacity",1);

    d3.selectAll("text.personcount").transition().delay(function(d,idx){
         return (idx+1)*100;
    }).duration(20).attr("opacity",0).remove();

    var pixel = d3.selectAll("g.chart").selectAll("g .person")
        .data(function (d) {
            return d.value;
        }
        );

    pixel.enter()
        .append("g")
        .attr("class", "person")
        .attr("transform", function(d, idx){
            var x = idx*personWidth;
            return "translate(" + x + "," + 0 +"),scale("+scale+")";
        }
        )
        .attr("opacity",0);

    d3.selectAll("g.person").append("use").attr("xlink:href","person.svg#person");

    d3.selectAll("g.person").transition().delay(function(d,idx){
     return idx*100;
    }).duration(20).attr("opacity",1);

}



function pixel (svgElem, pixelSize, color, x, y) {
    return svgElem
        .append("rect")
        .attr("width", pixelSize)
        .attr("height", pixelSize)
        .attr('fill', color)
        .attr('stroke', '#000000')
        .attr('stroke-width', 1)
        .attr("transform", "translate(" + x + "," + y +")");
};

function pixelData(data, colors){
    return [].concat.apply([], data.map(function (n, idx) {
        a = []
        for (var i=0;i<n; i++){
            a.push(colors[idx])
        }
        return a;
    }));
}

//groups like {"africa": [2,1], "asia":[1,2]}
//groupColors like {"africa":["red", "blue"], "asia":["white", "black"]}
//returns like {"africa":["red", "red", "blue"], "asia": ["white", "black", "black"]}
function pixelGroupData(groups, groupColors) {
    return Object.keys(groups).reduce(function(previous, current) {
    previous[current] = pixelData(groups[current], groupColors[current]);
    return previous;
    }, {});
}

//groups like {"africa": [2,1], "asia":[1,2]}
//groupColors like {"africa":["red", "blue"], "asia":["white", "black"]}
//Creates groups, associates keys as ids, and draws the pixel charts inside them.
function pixelGroupChart(svgElem, groups, x0, y0, groupColors, borderColor, pixelSize, pixelWidth, labels){

    var data = pixelGroupData(groups, groupColors);
    console.log(data);

    var t = d3.transition()
      .duration(1500);

    charts = svgElem.selectAll("g.charts")
        .data(d3.entries(data), function key(d){
            return d.key;
        });

    var tooltip = d3.select("body")
        .append("div")
        .attr("id","tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("background", "#FFFFFF")
        .style("visibility", "hidden")
        .text("a simple tooltip");

    charts.exit()
        .transition()
        .duration(250)
        .remove()

    charts
            .transition()
            .duration(250)
            .attr("transform", function (d,idx) {
                var x = x0 + idx * (pixelSize*pixelWidth);
                var y = y0;
                return "translate(" + x + "," + y + ")";
            }
        );
    charts.enter()
        .append("g")
        .attr("class","charts")
        .attr("id", function (d){ return d.key;})
        .attr("transform", function (d,idx) {
            var x = x0 + idx * (pixelSize*pixelWidth);
            var y = y0;
            return "translate(" + x + "," + y + ")";
        }
    );


    var pixels = svgElem.selectAll("g.charts").selectAll("rect")
        .data(function (d) {
            return d.value;
        }
        );

    pixels.exit()
        .transition(t)
        .duration(750)
        .attr("width", 1)
        .attr("height", 1)
        .remove()

        pixels.enter()
            .append("rect")
                .attr("transform", function(d, idx){
                    var x = (idx%pixelWidth)*pixelSize;
                    var y = Math.floor(idx/pixelWidth)*pixelSize;
                    return "translate(" + x + "," + y +")";
                })
                .attr("width", 1)
                .attr("height", 1)
                .attr('stroke', borderColor)
                .attr('stroke-width', 0.6)
                .attr('fill', function(d){ return d.color; })
                .attr('fill-opacity', function(d){ return d.opacity; })
                .transition()
                .duration(1000)

        pixels
            .transition()
            .duration(2000)
            .attr("width", pixelSize)
            .attr("height", pixelSize)
            .attr('fill', function(d){ return d.color; })
            .attr('fill-opacity', function(d){ return d.opacity; })

var tooltip = d3.select("#tooltip")

//         var tooltip = d3.select("body")
//        .append("div")
//        .attr("id","tooltip")
//        .style("position", "absolute")
//        .style("z-index", "1000")
//        .style("background", "#FFFFFF")
//        .style("visibility", "hidden")
//        .text("a simple tooltip");

charts
            .on("mouseover", function(d){var index=findIndex(pixelSize,pixelWidth,event.x,event.y,d.key);
                                         if (index<d.value.length){document.getElementById("tooltip").innerHTML=d.value[index].tooltip;

                                                                   console.log(index);
                                                                   document.getElementById("tooltip").style.visibility="visible";}

                                         else document.getElementById("tooltip").style.visibility="hidden";})

            .on("mousemove", function(d){var index=findIndex(pixelSize,pixelWidth,event.x,event.y,d.key); if (index<d.value.length){
    console.log("d", d, index);
        console.log("d",    d.value[index].tooltip);
    document.getElementById("tooltip").innerHTML=d.value[index].tooltip; document.getElementById("tooltip").style.visibility="visible"; document.getElementById("tooltip").style.top=(d3.event.pageY-10)+"px";

    document.getElementById("tooltip").style.left=(d3.event.pageX+10)+"px";}
                                         else document.getElementById("tooltip").style.visibility="hidden";} )
            .on("mouseout", function(d){document.getElementById("tooltip").style.visibility="hidden";})

    if (labels == undefined){
            labels = []
            console.log("undefined labels")
    }

    labelSelection = svgElem.selectAll("text.labels")
        .data(labels, function (d) { return d;} )

    labelSelection.enter()
        .append("text")
        .attr("class", "labels")

    labelSelection
        .attr("x", function(d,idx) {return x0 + (idx*pixelWidth*pixelSize) + pixelWidth*pixelSize/2;})
        .attr("y", y0 - 10)
        .attr("text-anchor", "middle")
        .text(function (d){ return d;})


    labelSelection.exit().remove();


}

    function findIndex(pixelSize,pixelWidth,width,height,id){
        var index=0;
        var left=document.getElementById(id).getElementsByTagName("rect")[0].getBoundingClientRect().left;
        var top=document.getElementById(id).getElementsByTagName("rect")[0].getBoundingClientRect().top;
        return parseInt((width-left)/pixelSize)+parseInt((height-top)/pixelSize)*pixelWidth;
    }


function updateTotal(elem,cal,ltr){

    document.getElementById("text-pound-"+elem.id).value = elem.value;
    document.getElementById("text-cal-"+elem.id).value = elem.value*cal*2;
    document.getElementById("text-liter-"+elem.id).value = elem.value*ltr*2;
    var arr = document.getElementsByName("pound");
    var total=0;
    for(var i=0;i<arr.length;i++){
        total+=parseFloat(arr[i].value);
    }
    document.getElementById("text-pound-total").value = total.toFixed(1);
    arr = document.getElementsByName("cal");
    total=0;
    for(var i=0;i<arr.length;i++){
        total+=parseFloat(arr[i].value);
    }
    document.getElementById("text-cal-total").value = total.toFixed(1);
    arr = document.getElementsByName("liter");
    total=0;
    for(var i=0;i<arr.length;i++){
        total+=parseFloat(arr[i].value);
    }
    document.getElementById("text-liter-total").value = total.toFixed(1);
}



function pixelChart (pixelChart, items, x0, y0, colors,borderColor,pixelSize,pixelWidth, label,xratio,yratio){

    var xPixelPos = 0
    var yPixelPos = 0

    var t = d3.transition()
      .duration(750);
    //var pixelChart = svgElem.append("g");
    var data = pixelData(items, colors);

    var pixels = pixelChart.selectAll("rect")
        .data(data);

    pixels.exit()
        .transition(t)
        .attr("width", 1)
        .attr("height", 1)
        .remove()

    pixels.enter()
        .append("rect")
            .attr("width", pixelSize)
            .attr("height", pixelSize)
            .attr('stroke', borderColor)
            .attr('stroke-width', 0.6)

    pixels.transition(t)
            .attr('fill', function(d){ return d; })
            .attr("transform", function(d, idx){
                var x = x0 + xratio*(idx%pixelWidth)*pixelSize;
                var y = y0 + yratio*Math.floor(idx/pixelWidth)*pixelSize;
                return "translate(" + x + "," + y +")";
            }
        )
       if(label.length>0){
        var text = pixelChart.append("text")
        //text.selectAll("text").enter();

        var textLabels = text
                     .attr("x", function(d) { return 0; })
                     .attr("y", function(d) { return 0; })
                     .text( function (d) { return label; })
                     .attr("dy", pixelSize*2)
                     .attr("font-family", "sans-serif")
                     .attr("font-size", "60px")
                     .attr("fill", "#FFFFFF")
                     .transition(t)
                     .attr("transform", function(d, idx){
                        var x = x0 + xratio*(idx%pixelWidth)*pixelSize+ 20;
                        var y = y0 + yratio*Math.floor(idx/pixelWidth)*pixelSize;
                        return "translate(" + x + "," + y +")";
                     });
    }
return pixelChart;
};

function createLegends(chart, legendData, x0, y0, pixelSize, title){

    var data = d3.entries(legendData)

    var colorScale = d3.scale.ordinal()
            .domain(data.map(function(d){return d.key;}))
            .range(data.map(function(d){return d.value;}))

    var legendSelection = chart.selectAll("g.legendOrdinal")
        .data([title], function(d){ return d;})

    var colorLegend = d3.legend.color()
        .scale(colorScale)
        .title("Legend")

    legendSelection.enter().append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(" + x0 + "," + y0 + ")")

    legendSelection.exit().remove();

    legendSelection
        .call(colorLegend)
        .transition()
        .duration(2000);
}

function updateChartTag(chart, tagName, rectColor, x0, y0, pixelSize){

    initChartTag(chart);
    var chartTag = chart.select("#chartTag")

    var translateCoords = "translate(" + x0 + "," + y0 + ")";

    chartTag
        .attr("transform", translateCoords)

    chartTag.select("rect")
        .attr("width", pixelSize)
        .attr("height", pixelSize)
        .attr("fill", rectColor)

    chartTag.select("text")
        .text(tagName)
        .attr("dx", pixelSize*1.5)
        .attr("dy", "0.1em")
}

function initChartTag(chart){

    if (!document.getElementById("chartTag"))
    {
        var chartTag = chart.append("g")
            .attr("id","chartTag")

        chartTag
            .append("rect")

        chartTag
            .append("text")
    }
}
