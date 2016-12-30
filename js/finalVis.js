function changeGroup(){
    console.log(this.value);

    var chart = d3.select("#finalContainer")
    groupVariable = this.value;
    updateFinalVis(chart, groupVariable, colorVariable, lowFilterValue, highFilterValue)
}
function changeGroup(group){


    var chart = d3.select("#finalContainer")
    groupVariable = group;
    updateFinalVis(chart, groupVariable, colorVariable, usageLowFilterValue, usageHighFilterValue, availLowFilterValue, availHighFilterValue, displayVariable)
}

function changeColor(){


    var chart = d3.select("#finalContainer")
    colorVariable = this.value;
    updateFinalVis(chart, groupVariable, colorVariable, lowFilterValue, highFilterValue)
}

function changeColor(colorGroup){
    console.log("Color", this.value);
    var chart = d3.select("#finalContainer")
    colorVariable = colorGroup;
    updateFinalVis(chart, groupVariable, colorVariable, usageLowFilterValue, usageHighFilterValue, availLowFilterValue, availHighFilterValue, displayVariable)
}

function changeDisplay(displayVar){
    console.log("Display", this.value);
    var chart = d3.select("#finalContainer")
    displayVariable = displayVar;
    updateFinalVis(chart, groupVariable, colorVariable, usageLowFilterValue, usageHighFilterValue, availLowFilterValue, availHighFilterValue, displayVariable)
}

function init_finalVis()
{
    var width = screen.width, height = screen.height;

    d3.select("#vis").remove();
    var chart = d3.select("#finalContainer")
        .attr("width", width)
        .attr("height", height);

    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)

    var xAxis = chart.append("g")
    .attr("class", "x axis")
    .attr("id", "xAxis")

    xAxis.append("text").attr("id", "xAxisTitle")

    groupVariable = "Continent";
    colorVariable = "Continent";
    displayVariable = "Availability per capita";

    usageLowFilterValue = 11
    usageHighFilterValue = 9142
    availLowFilterValue = 5
    availHighFilterValue = 516090
    $("#usageSliderLow").text(usageLowFilterValue)
    $("#usageSliderHigh").text(usageHighFilterValue)
    $( "#usageSlider" ).slider({
      range: true,
      min: 11,
      max: 9142,
      values: [ 11, 9142 ],
      stop: function( event, ui ) {
          usageLowFilterValue = ui.values[0]
          usageHighFilterValue = ui.values[1]
          $("#usageSliderLow").text(ui.values[0])
          $("#usageSliderHigh").text(ui.values[1])
          updateFinalVis(chart, groupVariable, colorVariable, usageLowFilterValue, usageHighFilterValue, availLowFilterValue, availHighFilterValue, displayVariable)
      }
    });

    $( "#availSlider" ).slider({
      range: true,
      min: 5,
      max: 516090,
      values: [ 5, 516090 ],
      stop: function( event, ui ) {
          availLowFilterValue = ui.values[0]
          availHighFilterValue = ui.values[1]
          $("#availSliderLow").text(ui.values[0])
          $("#availSliderHigh").text(ui.values[1])
          updateFinalVis(chart, groupVariable, colorVariable, usageLowFilterValue, usageHighFilterValue, availLowFilterValue, availHighFilterValue, displayVariable)
      }
    });

    d3.select("#group-by-div").select(".dropdown").on("change", changeGroup);
    d3.select("#colorform").selectAll("input").on("change", changeColor);

    updateFinalVis(chart, groupVariable, colorVariable, usageLowFilterValue, usageHighFilterValue, availLowFilterValue, availHighFilterValue, displayVariable);

    var legendSvg=d3.select("#legendContainer");
    var chartTag = legendSvg.append("g")
        .attr("id","pixelTag")
        .attr("class", "pixelTag")

    chartTag
        .append("rect")

    chartTag
        .append("text")

}

function updateFinalVis(chart, groupVariable, colorVariable, usageLowFilterValue, usageHighFilterValue, availLowFilterValue, availHighFilterValue, displayVariable){
    var data_source = "data/country_water_data.csv"

    //var displayVariable = "Availability per capita"
    console.log(displayVariable);
    var width = screen.width*0.8, height = screen.height;

    var totalGroupOrdering = {
        "Income Group": {
            "Low Income" : 1,
            "Lower Middle Income": 2,
            "Upper Middle Income": 3,
            "High Income": 4,
        },
        "Continent": {
            "Africa":1,
            "Americas":2,
            "Asia":3,
            "Europe":4,
            "Oceania":5,
        },
        "Stress Group":{
            "0":0,
            "1":1,
            "2":2,
            "3":3,
            "4":4,
            "5":5
        },
        "Safe Group":{
            "25":0,
            "50":1,
            "75":2,
            "100":3
        }
    }

    var totalGroupDisplay = {
        "Income Group": {
            "Low Income" : "Low Income",
            "Lower Middle Income": "Lower Middle Income",
            "Upper Middle Income": "Upper Middle Income",
            "High Income": "High Income",
        },
        "Continent": {
            "Africa":"Africa",
            "Americas":"Americas",
            "Asia":"Asia",
            "Europe":"Europe",
            "Oceania":"Oceania",
        },
        "Stress Group":{
            "0":"0-1",
            "1":"1-2",
            "2":"2-3",
            "3":"3-4",
            "4":"4-5",
            "5":"5"
        },
        "Safe Group":{
            "25":"25%-50%",
            "50":"50%-75%",
            "75":"75%-100%",
            "100":"100%"
        }
    }

    var reverseMap = {
        "Income Group": {
            "Low Income" : "Low Income",
            "Lower Middle Income": "Lower Middle Income",
            "Upper Middle Income": "Upper Middle Income",
            "High Income": "High Income",
        },
        "Continent": {
            "Africa":"Africa",
            "Americas":"Americas",
            "Asia":"Asia",
            "Europe":"Europe",
            "Oceania":"Oceania",
        },
        "Stress Group":{
            "0-1":"0",
            "1-2":"1",
            "2-3":"2",
            "3-4":"3",
            "4-5":"4",
            "5":"5"
        },
        "Safe Group":{
            "25%-50%":25,
            "50%-75%":50,
            "75%-100%":75,
            "100%":100
        }
    }

    var totalGroupColors = {
        "Income Group": {
            "Low Income" : "rgb(166,97,26)",
            "Lower Middle Income": "rgb(223,194,125)",
            "Upper Middle Income": "rgb(128,205,193)",
            "High Income": "rgb(1,133,113)",
        },
        "Continent": {
            "Africa":"rgb(228,26,28)",
            "Americas":"rgb(152,78,163)",
            "Asia":"rgb(55,126,184)",
            "Europe":"rgb(77,175,74)",
            "Oceania":"rgb(255,255,51)",
        },
        "Stress Group":{
            "0":"rgb(69,117,180)",
            "1":"rgb(145,191,219)",
            "2":"rgb(224,243,248)",
            "3":"rgb(254,224,144)",
            "4":"rgb(252,141,89)",
            "5":"rgb(215,48,39)"
        },
        "Safe Group":{
            "25":"rgb(166,97,26)",
            "50":"rgb(223,194,125)",
            "75":"rgb(128,205,193)",
            "100":"rgb(1,133,113)"
        }
    }

    var pixelUnits = {
        "Availability per capita":1000,
        "Usage per capita":50
    }

    d3.csv(data_source, function (d){
        return {
            "Agriculture" : +d.Agriculture,
            "Municipal" : +d.Municipal,
            "Industry" : +d.Industry,
            "Population" : +d.Population,
            "Safe drinking water" : +d["Safe drinking water"],
            "Stress" : +d["Water Stress"],
            "Usage per capita" : +d["Usage per capita"],
            "Continent" : d.Continent,
            "Country" : d.Country,
            "Country Code" : d["Country Code"],
            "Region": d["Region"],
            "Income Group": d["Income Group"],
            "Stress Group" : +d["Stress Group"],
            "Safe Group" : +d["Safe Group"],
            "Availability per capita" : +d["Availability per capita"],
            "pixels": pixelData([parseInt(d[displayVariable])/pixelUnits[displayVariable]], [d[colorVariable]]),
        };
    }, function(errors, rows) {

        rows = rows.filter(function(d) {
            return (
                d["Usage per capita"] >= usageLowFilterValue && d["Usage per capita"] <= usageHighFilterValue  && d["Availability per capita"] >= availLowFilterValue && d["Availability per capita"] <= availHighFilterValue
         );
        });
        console.log(errors, rows);

        var groupOrdering = totalGroupOrdering[groupVariable];
        var groupColors = totalGroupColors[colorVariable];
        nested = d3.nest()
            .key(function (d) { return d[groupVariable];})
            .sortKeys(function(a,b){
                return d3.ascending(groupOrdering[a], groupOrdering[b]);
            })
            .sortValues(function(a,b){ return d3.ascending(a[displayVariable], b[displayVariable]);})
            .entries(rows)

        flatNest = nested.reduce(function (a,b) {
            return a.concat(b.values);
        }, []);

        var padding = 20;
        groupYScale = d3.scale.ordinal()
            .domain(flatNest.map(function(d) {return d.Country}))
            .rangeBands([padding, height - (nested.length+5)*padding], 5);

        localYScales = {}
        localYAxes = {}
        groupStartY = {}

        nested.forEach(function (d, idx) {

            var localHeight = groupYScale(d.values[d.values.length - 1].Country) - groupYScale(d.values[0].Country);
            localYScales[d.key] = d3.scale.ordinal()
                .domain(d.values.map(function(d){ return d.Country;}))
                .rangeBands([0, localHeight]);

            localYAxes[d.key] = d3.svg.axis()
                .scale(localYScales[d.key])
                .orient("left");

            groupStartY[d.key] = groupYScale(d.values[0].Country) + (idx-1)*padding;
        })

        if (flatNest.length > 1) {
        pixelHeight = groupYScale(flatNest[1].Country) - groupYScale(flatNest[0].Country);
        }
        else{
            pixelHeight = height/8;
        }

        barXScale = d3.scale.linear()
            .domain([0, d3.max(flatNest, function(d){return d.pixels.length;})])
            .range([0, width - (100 + 100 + 200)])

        xScale = d3.scale.linear()
            .domain([0, d3.max(flatNest, function(d){return d[displayVariable];})])
            .range([0, width - (100 + 100 + 200)])

        var colors = d3.entries(groupColors)
        colorScale = d3.scale.ordinal()
                .domain(colors.map(function(d){return d.key;}))
                .range(colors.map(function(d){return d.value;}))

        colorScaleKey = d3.scale.ordinal()
                .domain(colors.map(function(d){return totalGroupDisplay[colorVariable][d.key];}))
                .range(colors.map(function(d){return d.value;}))

        pixelWidth = barXScale(1) - barXScale(0)

        groups = chart.selectAll("text.groupText")
            .data(nested, function(d){return d.key;})

        groups.enter()
            .append("text")
            .attr("class", "groupText")

        groups
            .attr("x", 270)
            .attr("y", function (d) {
                var localHeight = groupYScale(d.values[d.values.length - 1].Country) - groupYScale(d.values[0].Country)
                return groupStartY[d.key] + localHeight/2;
            })
            .text(function(d) { return totalGroupDisplay[groupVariable][d.key];})
            .attr("text-anchor", "end")

        groups.exit().remove()

        bars = chart.selectAll("g.bars")
            .data(flatNest, function (d) { return d.Country;})

        bars.exit().transition().duration(2000).attr("transform", function (d, idx)
        {
            return "translate(-300, -1000)";
        }).remove()

        bars
            .transition()
            .duration(2000)
            .delay(function(d, idx){return idx*10;})
            .attr("transform", function (d, idx)
            {
                return "translate(300," + (groupStartY[d[groupVariable]] + localYScales[d[groupVariable]](d.Country)) + ")";
            }
            )

        bars.enter()
            .append("g")
            .attr("class", "bars")
            .transition()
            .delay(200)
            .duration(2000)
            .attr("transform", function (d, idx)
            {
                return "translate(300," + (groupStartY[d[groupVariable]] + localYScales[d[groupVariable]](d.Country)) + ")";
            }
            )

        bars.append("text")
            .attr("x", "0")
            .attr("y", "0")
            .attr("dx", "-2.5em")
            .attr("dy", "-0.2em")
            .text(function(d) { return d["Country Code"]})
            .attr("font-size", "4px")
            .attr("text-anchor", "right")
            .attr("stroke", "white")
            .attr("stroke-width", "0.08em")

        bars.selectAll("text")
            .attr("x", 0)
            .attr("y", -pixelHeight/2)

        pixels = bars.selectAll("rect")
            .data(function (d) { return d.pixels;})

        pixels.enter()
                .append("rect")
                    .attr('stroke', "#212121")
                    .attr('stroke-width', 0.6)

        pixels.transition().duration(250).
            attr("x", function(d, idx){
                        var x = pixelWidth * idx;
                        return x;
                    })
            .attr("y", -pixelHeight)
            .attr('fill', function(d){ return colorScale(d); })
            .attr("width", pixelWidth)
            .attr("height", pixelHeight/2);

        pixels.exit().remove()

        var legendSvg=d3.select("#legendContainer");
        console.log(legendSvg);
        var legendSelection = legendSvg.selectAll("g.legendOrdinal").data([colorVariable], function(d){ console.log(d); return d;})

        var colorLegend = d3.legend.color()
            .scale(colorScaleKey)
            .title("Legend")
            .on("cellover", function(cell){
                bars.filter( function (d){
                    console.log(d)
                    var value = reverseMap[colorVariable][cell]
                    console.log(value, cell);
                    if (value){
                        return d[colorVariable] != value;
                    }
                    else {
                        return d[colorVariable] != cell;
                    }
                }).transition().duration(200).attr("fill-opacity", 0.3)
                .attr("opacity", 0.3)
            })
            .on("cellout", function(cell){
                bars.filter( function (d){
                    var value = parseInt(cell);
                    if (value){
                        return d[colorVariable] != value;
                    }
                    else {
                        return d[colorVariable] != cell;
                    }
                }).transition().duration(200).attr("fill-opacity", 1)
                .attr("opacity", 1)
            })

        legendSelection.enter().append("g")
            .attr("class", "legendOrdinal")

        legendSelection.attr("transform", "translate(0,"+ (pixelHeight+50) + ")")

        legendSelection.exit().remove();

        legendSelection.call(colorLegend);

        var chartTag = legendSvg.select("#pixelTag")

        var translateCoords = "translate(0,20)";

        chartTag
            .attr("transform", translateCoords)

        chartTag.select("rect")
            .attr("width", pixelWidth)
            .attr("height", pixelHeight)
            .attr("fill", "#FFFFFF")

        chartTag.select("text")
            .text("= " + pixelUnits[displayVariable] + " m3/inhab/year")
            .attr("dx", pixelWidth+20)
            .attr("dy", pixelHeight/2)

        var div = d3.select("div.tooltip");

        bars.on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.Country + "<br/>"  + d[displayVariable])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

        xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")

        chart.select("#xAxis")
            .attr("transform", function(){
                var lastGroup = flatNest[flatNest.length-1][groupVariable]
                var height = (groupStartY[lastGroup] + localYScales[lastGroup](flatNest[flatNest.length-1].Country))
                return "translate(300,"+ (height+10) + ")";
            })
            .call(xAxis)

        chart.select("#xAxisTitle").text("Water " + displayVariable + " per year")
        .attr("transform", function(){
            return "translate(" + (width - (100 + 100 + 200))/2 + ","+ 50 + ")";
        })
        .attr("text-anchor", "middle")
    });
}
