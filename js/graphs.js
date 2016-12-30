function clearsvg(){
    d3.select("#svgContainer").selectAll("g").remove();
    d3.select("#svgContainer").selectAll("text.labels").remove();
}

var height = document.getElementById("vis").offsetHeight;
var width = document.getElementById("vis").offsetWidth;
// var borderColor='#B0BEC5';
var borderColor='#90A4AE';

var freshWaterColor='rgb(79,195,247)';
var saltWaterColor='rgb(2,119,189)';
var landColor='rgb(0,150,136)';
var incomeGroupColors={
                    "high income":[{color:'rgb(1,133,113)', opacity:0.9}],
                    "upper middle income":[{color:'rgb(128,205,193)', opacity:0.9}],
                    "lower middle income":[{color:'rgb(223,194,125)', opacity:0.9}],
                    "low income":[{color:'rgb(166,97,26)', opacity:0.9}]
                    };

var continentGroupColors={
                        "Africa":[{color:'rgb(228,26,28)',opacity:0.9, tooltip:"trhtr"}],
                        "Americas":[{color:'rgb(152,78,163)',opacity:0.9,tooltip:"trhtr"}],
                        "Asia":[{color:'rgb(55,126,184)',opacity:0.9,tooltip:"trhtr"}],
                        "Europe":[{color:'rgb(77,175,74)',opacity:0.9,tooltip:"gjnf"}],
                        "Oceania":[{color:'rgb(255,255,51)',opacity:0.9,tooltip:"trhtr"}]
                        };



function init_p001_globeWater(){

    // 1600 pixel = whole amount of water in globe, 40 pixel = 2.5 % is freshwater
    // color chart guide: http://www.rapidtables.com/web/color/RGB_Color.htm
    // each pixel = 0.88 million cubic kilometer (KM^3)
    // 75% ( of globe is water) * 2.5% (2.5 % of globe water is fresh water) = 1.875 % ( 1.875 % of the globe is fresh water) > 30 pixel is for fresh water



    var tooltip = d3.select("body")
        .append("div")
        .attr("id","tooltip")
        .style("position", "absolute")
        .style("z-index", "1000")
        .style("background", "#FFFFFF")
        .style("visibility", "hidden")
        .text("a simple tooltip");

    console.log('height is :'+ height);
    console.log('width is :'+ width);


    var pixelWidth = 40;
    var pixelSize = screen.width/(pixelWidth+100);

    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

    //var chart1 = chart.append("g").attr("id","fresh water div"

    var groups = {
        "water":[30,1170,400]
    }

    var groupColors = {
        "water":[{color:'rgb(79,195,247)', opacity:1, tooltip:"Freshwater"},{color:'rgb(2,119,189)', opacity:1, tooltip:"Salt water"},{color:'rgb(0,150,136)', opacity:0.7, tooltip:"Land"}]
    }

    var xPos=width/2-(pixelWidth*pixelSize)/2;
    var yPos=height/2-(pixelWidth*pixelSize)/2;

    console.log("xPos is "+xPos);

    pixelGroupChart(chart, groups, xPos, yPos, groupColors, borderColor, pixelSize, pixelWidth);

    var legendVar = {
        //"Pixels Unit": "rgba(0,0,0,1)",
        "Freshwater":"rgba(79,195,247,1)",
        "Salt water":"rgba(2,119,189,1)",
        "Land":'rgba(0,150,136,0.7)'
    }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")

    updateChartTag(chart, " = 265 Quadrillion Gallons", "#FFFFFF", xPos, yPos - 40, pixelSize);
    //pixelChart(chart1, [1], xPos, yPos, [{color:'rgb(25,25,112, 0.2)',color:'rgb(0,25,112,1)', opacity:0.9}, color:'rgb(105,175,250,1)'], '#FFFFFF',pixelSize,pixelWidth, "dfdfbbgngfnfgnfgfgnfngfn", 1,1);

    //pixelChart(chartTag, [1], xPos, yPos + (pixelSize* 1600/pixelWidth) + 40, ['rgb(255,255,255)'], '#FFFFFF',pixelSize,pixelWidth,"1.875 % of the globe is fresh water",1,1);
}

function init_highlightFreshGlobalWater() {

    console.log('height is :'+ height);
    console.log('width is :'+ width);


    var pixelWidth = 40;
    var pixelSize = screen.width/(pixelWidth+100);

    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

    var groups = {
        "water":[30,1170,400]
    }

    var groupColors = {
        "water":[{color:'rgb(79,195,247)', opacity:1, tooltip:"Freshwater"},{color:'rgb(2,119,189)', opacity:0.2,tooltip: ""},{color:'rgb(0,150,136)', opacity:0.2, tooltip:""}]
    }

    var xPos=width/2-(pixelWidth*pixelSize)/2;
    var yPos=height/2-(pixelWidth*pixelSize)/2;

    console.log("xPos is "+xPos);

    var legendVar = {
        "Freshwater":"rgba(79,195,247,1)",
        //"Salt water":"rgba(2,119,189,0.2)",
        //"Land":'rgba(0,150,136,0.2)'
    }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")
    pixelGroupChart(chart, groups, xPos, yPos, groupColors, borderColor, pixelSize, pixelWidth);
    updateChartTag(chart, "Second tag", "#FFFFFF", xPos, yPos + (pixelSize* 1600/pixelWidth) + 40, pixelSize);
    
    updateChartTag(chart, " = 265 Quadrillion Gallons", "#FFFFFF", xPos, yPos - 40, pixelSize);

}
function init_p002_freshWater(){

    //page002
    // 68.5 %  = Glaciers,  30% = groundwater,   1% =  permafrost,  0.5% = surface and atmospheric water
    // pixel numbers: 1096 = Glaciers,  480 = groundwater,   16 =  permafrost,  8 = surface and atmospheric water



    var pixelWidth = 40
    var pixelSize = screen.width/(pixelWidth+100);
    var groups = {
        "water":[1600]
    }

    var groupColors = {
        "water":[{color:'rgb(79,195,247)', opacity:0.7, tooltip:"Freshwater"}]
    }

    var xPos=width/2-(pixelWidth*pixelSize)/2;
    var yPos=height/2-(pixelWidth*pixelSize)/2;

    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

        var legendVar = {
            "Freshwater":"rgba(79,195,247,0.9)",
        }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")
    pixelGroupChart(chart, groups, xPos, yPos, groupColors, borderColor, pixelSize, pixelWidth);
    
    //updateChartTag(chart, " = 265 Quadrillion Gallons", "#FFFFFF", xPos, yPos + (pixelSize* 1600/pixelWidth) + 40, pixelSize);
    updateChartTag(chart, " = 5.1 Quadrillion Gallons", "#FFFFFF", xPos, yPos  - 40, pixelSize);
}

function init_personChart() {
    console.log("inside person chart");
    datasetTotal = {
        "USA":[575],
        "Japan":[374],
        "France":[287],
        "Brazil":[187],
        "UK":[149],
        "India":[135],
        "China":[86],
        "Bangladesh":[46],
        "Kenya":[46],
        "Haiti":[15],
        "Mozambique":[4]

    };

    datasetOption1 = {
        "USA":[1],
        "Japan":[1.53],
        "France":[2.003484321],
        "Brazil":[3.07486631],
        "UK":[3.859060403],
        "India":[4.259259259],
        "China":[6.686046512],
        "Bangladesh":[12.5],
        "Kenya":[12.5],
        "Haiti":[38.33],
        "Mozambique":[143.75]

    };

    var groupColors = {
        "USA":[{color:'rgb(20,50,200)', opacity:0.9, value:1}],
        "Japan":[{color:'rgb(40,100)', opacity:0.9, value:2}],
        "France":[{color:'rgb(60,150)', opacity:0.9, value:3}],
        "Brazil":[{color:'rgb(80,200)', opacity:0.9, value:4}],
        "UK":[{color:'rgb(100,250,200)', opacity:0.9, value:4}],
        "India":[{color:'rgb(20,50,200)', opacity:0.9, value:5}],
        "China":[{color:'rgb(40,100,200)', opacity:0.9, value:7}],
        "Bangladesh":[{color:'rgb(60,150,200)', opacity:0.9, value:13}],
        "Kenya":[{color:'rgb(80,200,200)', opacity:0.9, value:13}],
        "Haiti":[{color:'rgb(100,250,200)', opacity:0.9, value:39}],
        "Mozambique":[{color:'rgb(100,250,200)', opacity:0.9, value:144}]
    };

    var scale=0.1;

    var personWidth=60*scale;
    chart = d3.select('#svgContainer')
        .attr("width", width)
        .attr("height", height)
    //peopleChart(chart, [143],100,100,[{color:'rgb(105,175,250,)', opacity:0.9}],'#FFFFFF',personWidth,scale, "Mozambique",1,1);
    peopleGroupChart(chart, datasetOption1, 100, 0, groupColors, borderColor, width, height);
}

function init_p003_freshWaterDiv(){

var pixelWidth = 40;
var pixelSize = screen.width/(pixelWidth+100);

chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height);

var groups= {
    "water": [1096, 16, 480,8]
    // "groundwater": [480],
    // "permafrost": [16],
    // "surface":  [8]
};

var groupColors = {
        "water":[{color:'rgb(0,100,220)', opacity:0.9, tooltip:"Glacier"},{color:'rgb(0,180,220)', opacity:0.9, tooltip:"Permafrost"},{color:'rgb(0,140,220)', opacity:0.9, tooltip:"Ground water"},{color:'rgb(79,195,247)',opacity:0.9, tooltip:"Surface water"}],
    };

    // var chart1 = chart.append("g").attr("id","fresh water div")
    // var chartTag = chart.append("g").attr("id","chart tag")

 var xPos=width/2-(pixelWidth*pixelSize)/2;
 var yPos=height/2-(pixelWidth*pixelSize)/2;

 var legendVar = {
            //"":"rgba(79,195,247,0.9)",
            "Glacier":"rgba(0,100,220,0.9)",
            "Ground water":"rgba(0,140,220,0.9)",
            "Permafrost":"rgba(0,180,220,0.9)",
            "Surface water":"rgba(79,195,247,0.9)",
        }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")
pixelGroupChart(chart, groups, xPos, yPos, groupColors, borderColor, pixelSize, pixelWidth);

 updateChartTag(chart, " = 5.1 Quadrillion Gallons", "#FFFFFF", xPos, yPos - 40, pixelSize);
    // pixelChart(chart1, [1096, 16, 480,8], xPos, yPos, [{color:'rgb(0,100,220,)', opacity:0.9}, {color:'rgb(0,140,220,)', opacity:0.9}, {color:'rgb(0,180,220,)', opacity:0.9}, {color:'rgb(0,220,220,)', opacity:0.9}], '#FFFFFF',pixelSize,pixelWidth,"", 1,1);

    // pixelChart(chartTag, [1], xPos, screen.height/10 + pixelSize*(pixelWidth + 6) , [{color:'rgb(105,175,250,1)', {color:'rgb(135,206,250,1)'], '#FFFFFF',pixelSize,pixelWidth,"text", 1,1);
}

function init_p004_AvailFreshWaterDiv(){
var pixelWidth = 40;
var pixelSize = screen.width/(pixelWidth+100);

chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height);

var groups= {
    "water": [1096,16,480,8],
    // "groundwater": [480],
    // "permafrost": [16],
    // "surface":  [8]
};

var groupColors = {
        "water":[{color:'rgb(0,100,220)', opacity:0.3, tooltip:""}, {color:'rgb(0,180,220)', opacity:0.3, tooltip:""},{color:'rgb(0,140,220)', opacity:0.9, tooltip:"Ground water"}, {color:'rgb(79,195,247)', opacity:0.9, tooltip:"Surface water"}]
    };

    // var chart1 = chart.append("g").attr("id","fresh water div")
    // var chartTag = chart.append("g").attr("id","chart tag")

 var xPos=width/2-(pixelWidth*pixelSize)/2;
 var yPos=height/2-(pixelWidth*pixelSize)/2;

 var legendVar = {
     "Ground water":"rgba(0,140,220,0.9)",
     "Surface water":"rgba(79,195,247,0.9)"
 }

createLegends(chart, legendVar, width - 200, 50, "Freshwater")

pixelGroupChart(chart, groups, xPos, yPos, groupColors, borderColor, pixelSize, pixelWidth);

updateChartTag(chart, " = 5.1 Quadrillion Gallons", "#FFFFFF", xPos, yPos - 40, pixelSize);
}


function init_p005_WaterDisPerCapita_continents_ideal(){

    //if fresh water was ideally distributed per capita per year
    //if each pixel = 4*10^3 liter inhab year
    var groups = {
        "Africa":[184],
        "Americas":[184],
        "Asia":[184],
        "Europe":[184],
        "Oceania":[184]
    }


    var continentGroupColors = {

        "Africa":[{color:'rgb(228,26,28)', opacity:0.7,tooltip:"Africa:201 liter per capita per day"}],
        "Americas":[{color:'rgb(152,78,163)', opacity:0.7,tooltip:"Americas:201 liter per capita per day"}],
        "Asia":[{color:'rgb(55,126,184)', opacity:0.7,tooltip:"Asia:201 liter per capita per day"}],
        "Europe":[{color:'rgb(77,175,74)', opacity:0.7,tooltip:"Europe:201 liter per capita per day"}],
        "Oceania":[{color:'rgb(255,255,51)', opacity:0.7,tooltip:"Oceania:201 liter per capita per day"}]
    }


    var pixelWidth = 12;
    var pixelSize = width/(pixelWidth+80);

    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

    //var xPos=width/2-(pixelWidth*pixelSize*5)/2;
    var xPos=width/2-(pixelWidth*pixelSize*5)/2 -70;
    var yPos=height/2-(pixelWidth*pixelSize*2);


    var legendVar = {
     "Africa":"rgba(228,26,28,0.9)",
     "Americas":"rgba(152,78,163,0.9)",
     "Asia":"rgba(55,126,184,0.9)",
     "Europe":"rgba(77,175,74,0.9)",
     "Oceania":"rgba(255,255,51,0.9)",
 }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")

    var labels = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    pixelGroupChart(chart, groups, xPos, yPos,continentGroupColors, borderColor, pixelSize, pixelWidth,labels);

    updateChartTag(chart, " = 1.1 liter per capita per day ", "#FFFFFF", xPos, yPos - 60, pixelSize);
}

function init_p006_WaterDisPerCapita_continents_real(){

    //if fresh water was ideally distributed per capita per year
    //if each pixel = 4*10^3 liter inhab year
    var groups = {
        "Africa":[116],
         "Americas":[628],
        "Asia":[136],
        "Europe":[264],
        "Oceania":[565]
    }

      var continentGroupColors = {

        "Africa":[{color:'rgb(228,26,28)', opacity:0.7,tooltip:"Africa:127 liter per capita per day"}],
        "Americas":[{color:'rgb(152,78,163)', opacity:0.7,tooltip:"Americas:688 liter per capita per day"}],
        "Asia":[{color:'rgb(55,126,184)', opacity:0.7,tooltip:"Asia:149 liter per capita per day"}],
        "Europe":[{color:'rgb(77,175,74)', opacity:0.7,tooltip:"Europe:289 liter per capita per day"}],
        "Oceania":[{color:'rgb(255,255,51)', opacity:0.7,tooltip:"Oceania:619 liter per capita per day"}]
    }

    var pixelWidth = 12;
    var pixelSize = width/(pixelWidth+80);
    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

  var xPos=width/2-(pixelWidth*pixelSize*5)/2-70;
var yPos=height/2-(pixelWidth*pixelSize*2);

     var legendVar = {
     "Africa":"rgba(228,26,28,0.9)",
     "Americas":"rgba(152,78,163,0.9)",
     "Asia":"rgba(55,126,184,0.9)",
     "Europe":"rgba(77,175,74,0.9)",
     "Oceania":"rgba(255,255,51,0.9)",
 }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")

    var labels = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    pixelGroupChart(chart, groups, xPos, yPos, continentGroupColors, borderColor, pixelSize, pixelWidth, labels);
    
     updateChartTag(chart, " = 1.1 liter per capita per day ", "#FFFFFF", xPos, yPos - 60, pixelSize);
}


function init_p007_WaterDisPerCapita_income_ideal() {

    //if fresh water was ideally distributed per capita per year
    //if each pixel = 4*10^3 liter inhab year
    var groups = {
        "high income":[165],
        "upper middle income":[165],
        "lower middle income":[165],
        "low income":[165],
        // "low income food deficit":[165],
        // "least developed countries": [165]
    }

var incomeGroupColors={
                    "high income":[{color:'rgb(1,133,113)', opacity:0.9, tooltip:"High Income:181 liter per capita per day"}],
                    "upper middle income":[{color:'rgb(128,205,193)', opacity:0.9, tooltip:"Upper Middle Income:181 liter per capita per day"}],
                    "lower middle income":[{color:'rgb(223,194,125)', opacity:0.9, tooltip:"Lower Middle Income:181 liter per capita per day"}],
                    "low income":[{color:'rgb(166,97,26)', opacity:0.9, tooltip:"Low Income:181 liter per capita per day"}]
                    };


    var pixelWidth = 12;
    var pixelSize = width/(pixelWidth+80);
    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

    var xPos=width/2-(pixelWidth*pixelSize*5)/2 -70;
    var yPos=height/2-(pixelWidth*pixelSize*2);

    var legendVar = {
     "High Income":"rgba(1,133,113,0.9)",
     "Upper Middle Income":"rgba(128,205,193,0.9)",
     "Lower Middle Income":"rgba(223,194,125,0.9)",
     "Low income":"rgba(166,97,26,0.9)",
 }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")

    var labels = ["High Income", "Upper Middle Income", "Lower Middle Income", "Low Income"]
    pixelGroupChart(chart, groups, xPos, yPos, incomeGroupColors, borderColor, pixelSize, pixelWidth, labels);
}
function init_p008_WaterDisPerCapita_income_real() {

    //if fresh water was ideally distributed per capita per year
    //if each pixel = 4*10^3 liter inhab year
    var groups = {
        "high income":[300],
        "upper middle income":[220],
        "lower middle income":[101],
        "low income":[238],
        // "low income food deficit":[108],
        // "least developed countries": [191]
    }

var incomeGroupColors={
                    "high income":[{color:'rgb(1,133,113)', opacity:0.9, tooltip:"High Income:327 liter per capita per day"}],
                    "upper middle income":[{color:'rgb(128,205,193)', opacity:0.9, tooltip:"Upper Middle Income:241 liter per capita per day"}],
                    "lower middle income":[{color:'rgb(223,194,125)', opacity:0.9, tooltip:"Lower Middle Income:110 liter per capita per day"}],
                    "low income":[{color:'rgb(166,97,26)', opacity:0.9, tooltip:"Low Income:261 liter per capita per day"}]
                    };

    var pixelWidth = 12;
    var pixelSize = width/(pixelWidth+80);
    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

    var xPos=width/2-(pixelWidth*pixelSize*5)/2 -70;
    var yPos=height/2-(pixelWidth*pixelSize*2);

    var legendVar = {
     "High Income":"rgba(1,133,113,0.9)",
     "Upper Middle Income":"rgba(128,205,193,0.9)",
     "Lower Middle Income":"rgba(223,194,125,0.9)",
     "Low income":"rgba(166,97,26,0.9)",
 }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")


    var labels = ["High Income", "Upper Middle Income", "Lower Middle Income", "Low Income"]
    pixelGroupChart(chart, groups, xPos, yPos, incomeGroupColors, borderColor, pixelSize, pixelWidth, labels);
}


function init_p009_WaterUsePerCapita_income_ideal(){

    //if fresh water was ideally distributed per capita per year
    //if each pixel = 4*10^3 liter inhab year
    var groups = {
        "high income":[129],
        "upper middle income":[129],
        "lower middle income":[129],
        "low income":[129],
        //"low income food deficit":[165],
        //"least developed countries": [165]
    }



  var incomeGroupColors={
                    "high income":[{color:'rgb(1,133,113)', opacity:0.9, tooltip:"High Income:129 liter per capita per day"}],
                    "upper middle income":[{color:'rgb(128,205,193)', opacity:0.9, tooltip:"Upper Middle Income:129 liter per capita per day"}],
                    "lower middle income":[{color:'rgb(223,194,125)', opacity:0.9, tooltip:"Lower Middle Income:129 liter per capita per day"}],
                    "low income":[{color:'rgb(166,97,26)', opacity:0.9, tooltip:"Low Income:129 liter per capita per day"}]
                    };

    var pixelWidth = 12;
    var pixelSize = width/(pixelWidth+80);
    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

    var xPos=width/2-(pixelWidth*pixelSize*5)/2 -70;
    var yPos=height/2-(pixelWidth*pixelSize*2);

    var legendVar = {
     "High Income":"rgba(1,133,113,0.9)",
     "Upper Middle Income":"rgba(128,205,193,0.9)",
     "Lower Middle Income":"rgba(223,194,125,0.9)",
     "Low income":"rgba(166,97,26,0.9)",
 }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")

     var labels = ["High Income", "Upper Middle Income", "Lower Middle Income", "Low Income"]
     
    pixelGroupChart(chart, groups, xPos, yPos, incomeGroupColors, borderColor, pixelSize, pixelWidth, labels);
}

function init_WaterUsePerCapita_continent_ideal() {

    //if fresh water was ideally distributed per capita per year
    //if each pixel = 4*10^3 liter inhab year
    var groups = {
        "Africa":[143],
         "Americas":[143],
        "Asia":[143],
        "Europe":[143],
        "Oceania":[143]
    }

      var continentGroupColors = {

        "Africa":[{color:'rgb(228,26,28)', opacity:0.7,tooltip:"Africa:156 liter per capita per day"}],
        "Americas":[{color:'rgb(152,78,163)', opacity:0.7,tooltip:"Americas:156 liter per capita per day"}],
        "Asia":[{color:'rgb(55,126,184)', opacity:0.7,tooltip:"Asia:156 liter per capita per day"}],
        "Europe":[{color:'rgb(77,175,74)', opacity:0.7,tooltip:"Europe:156 liter per capita per day"}],
        "Oceania":[{color:'rgb(255,255,51)', opacity:0.7,tooltip:"Oceania:156 liter per capita per day"}]
    }

    var pixelWidth = 12;
    var pixelSize = width/(pixelWidth+80);
    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)


    var xPos=width/2-(pixelWidth*pixelSize*5)/2 -70;
    var yPos=height/2-(pixelWidth*pixelSize*2);


     var legendVar = {
     "Africa":"rgba(228,26,28,0.9)",
     "Americas":"rgba(152,78,163,0.9)",
     "Asia":"rgba(55,126,184,0.9)",
     "Europe":"rgba(77,175,74,0.9)",
     "Oceania":"rgba(255,255,51,0.9)",
 }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")

    var labels = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    pixelGroupChart(chart, groups, xPos, yPos, continentGroupColors, borderColor, pixelSize, pixelWidth, labels);
}


function init_WaterUsePerCapita_continent_real() {

    var groups = {
        "Africa":[60],
         "Americas":[180],
        "Asia":[138],
        "Europe":[210],
        "Oceania":[297]
    };

        //if fresh water was ideally distributed per capita per year
    //if each pixel = 4*10^3 liter inhab year
    var groups = {
        "Africa":[60],
         "Americas":[180],
        "Asia":[138],
        "Europe":[210],
        "Oceania":[297]
    }

      var continentGroupColors = {

        "Africa":[{color:'rgb(228,26,28)', opacity:0.7,tooltip:"Africa:65 liter per capita per day"}],
        "Americas":[{color:'rgb(152,78,163)', opacity:0.7,tooltip:"Americas:195 liter per capita per day"}],
        "Asia":[{color:'rgb(55,126,184)', opacity:0.7,tooltip:"Asia:151 liter per capita per day"}],
        "Europe":[{color:'rgb(77,175,74)', opacity:0.7,tooltip:"Europe:230 liter per capita per day"}],
        "Oceania":[{color:'rgb(255,255,51)', opacity:0.7,tooltip:"Oceania:325 liter per capita per day"}]
    }

    var pixelWidth = 12;
    var pixelSize = width/(pixelWidth+80);
    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

    var xPos=width/2-(pixelWidth*pixelSize*5)/2 -70;
    var yPos=height/2-(pixelWidth*pixelSize*2);


     var legendVar = {
     "Africa":"rgba(228,26,28,0.9)",
     "Americas":"rgba(152,78,163,0.9)",
     "Asia":"rgba(55,126,184,0.9)",
     "Europe":"rgba(77,175,74,0.9)",
     "Oceania":"rgba(255,255,51,0.9)",
 }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")

    var labels = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    pixelGroupChart(chart, groups, xPos, yPos, continentGroupColors, borderColor, pixelSize, pixelWidth, labels);
}


function init_p009_WaterUsePerCapita_income_real(){

    //if fresh water was ideally distributed per capita per year
    //if each pixel = 4*10^3 liter inhab year

    var groups = {
            "high income":[158],
            "upper middle income":[138],
            "lower middle income":[125],
            "low income":[51]
            //"low income food deficit":[108],
           // "least developed countries": [191]
    }

var incomeGroupColors={
                    "high income":[{color:'rgb(1,133,113)', opacity:0.9, tooltip:"High Income:173 liter per capita per day"}],
                    "upper middle income":[{color:'rgb(128,205,193)', opacity:0.9, tooltip:"Upper Middle Income:151 liter per capita per day"}],
                    "lower middle income":[{color:'rgb(223,194,125)', opacity:0.9, tooltip:"Lower Middle Income:136 liter per capita per day"}],
                    "low income":[{color:'rgb(166,97,26)', opacity:0.9, tooltip:"Low Income:55 liter per capita per day"}]
                    };


    var pixelWidth = 12;
    var pixelSize = width/(pixelWidth+80);
    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

    var xPos=width/2-(pixelWidth*pixelSize*5)/2 -70;
    var yPos=height/2-(pixelWidth*pixelSize*2);

    var legendVar = {
     "High Income":"rgba(1,133,113,0.9)",
     "Upper Middle Income":"rgba(128,205,193,0.9)",
     "Lower Middle Income":"rgba(223,194,125,0.9)",
     "Low income":"rgba(166,97,26,0.9)",
 }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")

    var labels = ["High Income", "Upper Middle Income", "Lower Middle Income", "Low Income"]
    
    pixelGroupChart(chart, groups, xPos, yPos, incomeGroupColors, borderColor, pixelSize, pixelWidth,labels);
}

function idealWaterDis_continents(){

    /*
    - world population 2016    7,432,663,000
    - Total available freshwater for all countries with values: 3503187.349 * 10^6 liter inhab year
    - ideal available freshwater per capita: 3503187.349 * 10^6 liter inhab year/ 7,432,663 * 10^3 =
                                           : 471*10^3 liter inhab year


    TABLE for Ideal Water Avaialbility per continent

    Africa:      573121.4502964* 10^6 liter inhab year  16.36%
    Americas:    471879.3359103* 10^6 liter inhab year  13.47%
    Asia:       2091052.5286181* 10^6 liter inhab year  59.69%
    Europe:      348216.8224906* 10^6 liter inhab year   9.94%
    Oceania:     18917.2116846* 10^6 liter inhab year    0.54%

    Africa:      573121.5 * 10^6 liter inhab year  16.36%
    Americas:    471879.0 * 10^6 liter inhab year  13.47%
    Asia:       2091052.5 * 10^6 liter inhab year  59.69%
    Europe:      348217.0 * 10^6 liter inhab year   9.94%
    Oceania:      18917.0 * 10^6 liter inhab year   0.54%

    if each pixel = 5*10^9 liter inhab year

    Pixel value for ideal distribution of water in globe per continent
    Africa:        115
    Americas:      95
    Asia:          418
    Europe:        70
    Oceania:       4

    */

    var groups = {
        "Africa":[115],
        "Americas":[95],
        "Asia":[418],
        "Europe":[70],
        "Oceania":[4]
    }

    var groupColors = {
        "Africa":[{color:'rgb(20,50,200,)', opacity:0.9}],
        "Americas":[{color:'rgb(40,100,200,)', opacity:0.9}],
        "Asia":[{color:'rgb(60,150,200,)', opacity:0.9}],
        "Europe":[{color:'rgb(80,200,200,)', opacity:0.9}],
        "Oceania":[{color:'rgb(100,250,200,)', opacity:0.9}]
    }

    var height = window.outerHeight;
    var width = window.outerWidth;

    var pixelSize = screen.width/200
    var pixelWidth = 16
    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

    pixelGroupChart(chart, groups, screen.width*3/10, screen.height/10, groupColors, '#FFFFFF', pixelSize, pixelWidth);
}
function init_p(){

    var legendVar = {

         "Chocolate":'rgb(139,58,58)',
         "Beef" :'rgb(139,105,105)',
         "Pork":'rgb(141,211,199)',
         "Chicken":'rgb(251,128,114)',
         "Rice":'rgb(255,245,238)',
         "Bread":'rgb(205,192,176)',
         "Apple":'rgb(179,222,105)',
         "Potato":'rgb(255,255,0)',
         "Milk":'rgb(190,186,218)',
         "Beer" :'rgb(188,128,189)',
         "Tomato":'rgb(204,235,197)',
         "Cabbage":'rgb(255,237,111)'
    }

    createLegends(chart, legendVar, width - 200, 50, "Freshwater")

    var items = [];
    var unit = 15;
    items.push(document.getElementById("text-liter-r1").value/unit);
    items.push(document.getElementById("text-liter-r2").value/unit);
    items.push(document.getElementById("text-liter-r3").value/unit);
    items.push(document.getElementById("text-liter-r4").value/unit);
    items.push(document.getElementById("text-liter-r5").value/unit);
    items.push(document.getElementById("text-liter-r6").value/unit);
    items.push(document.getElementById("text-liter-r7").value/unit);
    items.push(document.getElementById("text-liter-r8").value/unit);
    items.push(document.getElementById("text-liter-r9").value/unit);
    items.push(document.getElementById("text-liter-r10").value/unit);
    items.push(document.getElementById("text-liter-r11").value/unit);
    items.push(document.getElementById("text-liter-r12").value/unit);

    var groups = {
        "water":items
    }
    var groupColors = {

        "water":[{color:'rgb(139,58,58)', opacity:0.9, tooltip:"Chocolate"},
                 {color:'rgb(139,105,105)', opacity:0.9, tooltip:"Beef"},
                 {color:'rgb(141,211,199)', opacity:0.9, tooltip:"Pork"},
                 {color:'rgb(251,128,114)', opacity:0.9, tooltip:"Chicken"},
                 {color:'rgb(255,245,238)', opacity:0.9, tooltip:"Rice"},
                 {color:'rgb(205,192,176)', opacity:0.9, tooltip:"Bread"},
                 {color:'rgb(179,222,105)', opacity:0.9, tooltip:"Apple"},
                 {color:'rgb(255,255,0)', opacity:0.9, tooltip:"Potato"},
                 {color:'rgb(190,186,218)', opacity:0.9, tooltip:"Milk"},
                 {color:'rgb(188,128,189)', opacity:0.9, tooltip:"Beer"},
                 {color:'rgb(204,235,197)', opacity:0.9, tooltip:"Tomato"},
                 {color:'rgb(255,237,111)', opacity:0.9, tooltip:"Cabbage"}
                 ]
    }

    var pixelWidth = 40;
    var pixelSize = width/(pixelWidth+40);
    chart = d3.select("#svgContainer")
        .attr("width", width)
        .attr("height", height)

    //var chart1 = chart.append("g").attr("id","fresh water")
    //var chartTag = chart.append("g").attr("id","chart tag")


//    var legendVar = {
//        "Freshwater":"rgba(79,195,247,1)",
//        "Salt water":"rgba(2,119,189,1)",
//        "Land":'rgba(0,150,136,0.7)'
//    }
//
//    createLegends(chart, legendVar, width - 200, 50, "Freshwater")


    var xPos=width/2-(pixelWidth*pixelSize)/2;
    var yPos=height/2-(pixelWidth*pixelSize*0.7)/2-60;

    pixelGroupChart(chart, groups, xPos, yPos, groupColors, borderColor, pixelSize, pixelWidth);

    updateChartTag(chart, " = 15 Liter", "#FFFFFF", xPos, yPos - 40, pixelSize);

    //pixelChart(chart1, items, screen.width*3/10, screen.height/10, [{color:'rgb(25,25,112, 0.2)',color:'rgb(0,25,112, 0.9)', color:'rgb(105,175,250,1)', color:'rgb(25,185,112, 0.2)'], '#FFFFFF',pixelSize,pixelWidth, "", 1,1);

    //pixelChart(chartTag, [1], screen.width*3/10, screen.height/10 + pixelSize*(pixelWidth + 6) , [{color:'rgb(105,175,250,1)', {color:'rgb(135,206,250,1)'], '#FFFFFF',pixelSize,pixelWidth,"text",12,3);

//    var pixelGroupChart = svgElem.append("g");
//    var data = pixelData([400,1170,30], [{color:'rgb(25,25,112, 0.2)',{color:'rgb(25,25,112, 0.2)', {color:'rgb(25,25,112, 0.2)']);
    var arr = document.getElementsByName("liter");
    var total=0;
    for(var i=0;i<arr.length;i++){
        total+=parseFloat(arr[i].value);
    }
    document.getElementById("text-liter-total").value = total;
}
