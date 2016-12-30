var height = 800;
var width = 800;

function init(){

  padding = {top:20, left:40, right:40, bottom:30};

  chart = d3.select('#vis').append('svg')
        .attr("width", width + padding.left + padding.right)
        .attr("height", height + padding.top + padding.bottom)

  var chart1 = chart.append("g")
  //var chart1 = pixelChart(chart1, [10, 20, 30], ["blue", "red", "green"]);

  //var chart1 = pixelChart(chart1, [10, 20, 10], ["blue", "red", "green"]);

  var chart1 = pixelChart(chart1, [5, 15, 10], ["blue", "red", "green"]);
  //pixelChart(chart, [5, 15, 20], ["blue", "red", "green"])
  //.attr("transform", "translate(200,0)");
;

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

function pixelChart (pixelChart, items, colors){

    var x0 = 10
    var y0 = 500
    var pixelSize = 10
    var pixelWidth = 4
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
            .attr('stroke', '#000000')
            .attr('stroke-width', 1)
        .merge(pixels)
            .transition(t)
            .attr('fill', function(d){ return d; })
            .attr("transform", function(d, idx){
                var x = x0 + (idx%pixelWidth)*pixelSize;
                var y = y0 - Math.floor(idx/pixelWidth)*pixelSize;
                return "translate(" + x + "," + y +")";
            }
        )
    return pixelChart;
};
