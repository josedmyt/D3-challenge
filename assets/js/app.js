
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
var chart =svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


chart
.append("rect")
.attr("x",0)
.attr("y",0)
.attr("height", height)
.attr("width", height)
.style("fill", "EBEBEB");

//Read the data
d3.csv("./assets/data/data.csv").then(function(data) {
    console.log(data);

  data.forEach(function(state) {
    state.poverty = +state.poverty;
    state.healthcare = +state.healthcare;
  });

  var xScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.poverty - 2), d3.max(data, d => d.poverty + 2)])
    .range([0, width]);
  chart.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));
    

  var yScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.healthcare - 2), d3.max(data, d => d.healthcare + 2)])
    .range([height, 0])
  chart.append("g")
    .call(d3.axisLeft(yScale));

  // Add X axis label:
  chart.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2 )
      .attr("y", height + margin.top + 20)
      .text("Poverty");

  // Y axis label:
  chart.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top - height/2 + 20)
      .text("Healthcare")

  // Add dots
  chart.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d.poverty); } )
    .attr("cy", function (d) { return yScale(d.healthcare); } )
    .attr("r", 8)
    .style("fill", "#619CFF" )

  chart.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr('x', function (d) { return xScale(d.poverty);})
    .attr('y', function (d) {return yScale(d.healthcare);})
    .attr('font-size', '9px')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('fill', 'white')
    .text(function (d) {return d.abbr;});

})
