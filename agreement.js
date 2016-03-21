var krish=[[{'name':'Panji','value':0.56},{'name':'Chaggi','value':0.28},{'name':'Satti','value':-0.03},{'name':'Atthi','value':-0.37},{'name':'Nehli','value':-0.35}],
[{'name':'Panji','value':-0.34},{'name':'Chaggi','value':-0.33},{'name':'Satti','value':-0.058},{'name':'Atthi','value':0.44},{'name':'Nehli','value':1.08}],
[{'name':'Panji','value':-0.7},{'name':'Chaggi','value':0.14},{'name':'Satti','value':0.01},{'name':'Atthi','value':-0.08},{'name':'Nehli','value':0.05}],
[{'name':'Panji','value':-0.12},{'name':'Chaggi','value':-0.25},{'name':'Satti','value':-0.26},{'name':'Atthi','value':0.1},{'name':'Nehli','value':0.68}],
[{'name':'Panji','value':1},{'name':'Chaggi','value':0.65},{'name':'Satti','value':0.78},{'name':'Atthi','value':1.01},{'name':'Nehli','value':0.708}],
[{'name':'Panji','value':-0.23},{'name':'Chaggi','value':-0.07},{'name':'Satti','value':-0.05},{'name':'Atthi','value':-0.23},{'name':'Nehli','value':0.41}],
[{'name':'Panji','value':0.037},{'name':'Chaggi','value':0.1},{'name':'Satti','value':0.04},{'name':'Atthi','value':-0.15},{'name':'Nehli','value':-0.5}],
[{'name':'Panji','value':0.038},{'name':'Chaggi','value':0.105},{'name':'Satti','value':-0.03},{'name':'Atthi','value':-0.254},{'name':'Nehli','value':-0.236}]
];
var datab=[{'name':'Panji','value':-2},{'name':'Chaggi','value':2}];
var agrtxt=["I am not as happy as I thought I would be in my first year.","I will stay in my core field.","My academic workload is very stressful.","My CGPA represents my efforts well.","My Department's syllabus needs to be revised","My professors are friendly with students","My professors are partial","Acads comes in the way of achieving my goals."];
var counter=0;
d3.select("div.agrindtxt").text(agrtxt[0]);
var data=krish[0];
var margin = {top: 20, right: 30, bottom: 5, left: 30},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var x = d3.scale.linear()
    .domain(d3.extent(datab, function(d) { return d.value; })).nice()
    .range([0, width]);

var y = d3.scale.ordinal()
    .domain(data.map(function(d) { return d.name; }))
    .rangeRoundBands([0, height], 0.1);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(6);
var svg2 = d3.select("div.arenaagr").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg2.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x(Math.min(0, 2*d.value)); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return 2*(Math.abs(x(d.value) - x(0))); })
      .attr("height", y.rangeBand());

  svg2.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);
function type(d) {
  d.value = +d.value;
  return d;
}
d3.select("button.agr")
        .on("click", function() {
          counter++;
          d3.select("div.agrindtxt").text(agrtxt[counter%8]);
          data = krish[counter%8];

    svg2.selectAll(".bar")
    .data(data)
    .transition()
    
      .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x(Math.min(0, 2*d.value)); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return 2*(Math.abs(x(d.value) - x(0))); })
      .attr("height", y.rangeBand());
    });
