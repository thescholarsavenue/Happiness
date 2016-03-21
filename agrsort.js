var krush=[[{'name':'AE','value':0.24137931},{'name':'AG','value':0.041666667},{'name':'AR','value':-0.22},{'name':'BT','value':-0.2},{'name':'CE','value':-0.023809524},{'name':'CH','value':-0.318181818},{'name':'CSE','value':-0.3125},{'name':'ECE','value':0.163265306},{'name':'EE','value':0.305084746},{'name':'GG','value':-0.043478261},{'name':'HS','value':-0.8125},{'name':'IM','value':-0.275862069},{'name':'MA','value':-0.133333333},{'name':'ME','value':-0.152173913},{'name':'MI','value':0.032258065},{'name':'MT','value':0.115384615},{'name':'NA','value':0.6},{'name':'PH','value':-0.423076923}],[{'name':'AE','value':-0.068965517},{'name':'AG','value':-0.24},{'name':'AR','value':0.12},{'name':'BT','value':-0.466666667},{'name':'CE','value':-0.119047619},{'name':'CH','value':-0.090909091},{'name':'CSE','value':1.1125},{'name':'ECE','value':0.34},{'name':'EE','value':-0.06779661},{'name':'GG','value':0.043478261},{'name':'HS','value':0.625},{'name':'IM','value':-0.137931034},{'name':'MA','value':0.466666667},{'name':'ME','value':0.131868132},{'name':'MI','value':-0.53125},{'name':'MT','value':-0.576923077},{'name':'NA','value':0},{'name':'PH','value':0.615384615}],[{'name':'AE','value':-0.392857143},{'name':'AG','value':-0.36},{'name':'AR','value':1.12},{'name':'BT','value':-0.866666667},{'name':'CE','value':-0.069767442},{'name':'CH','value':-0.409090909},{'name':'CSE','value':0.6875},{'name':'ECE','value':0.34},{'name':'EE','value':0.694915254},{'name':'GG','value':-0.47826087},{'name':'HS','value':-0.5625},{'name':'IM','value':-0.24137931},{'name':'MA','value':-0.5},{'name':'ME','value':-0.241758242},{'name':'MI','value':-0.15625},{'name':'MT','value':-0.230769231},{'name':'NA','value':-0.366666667},{'name':'PH','value':0.230769231}],[{'name':'AE','value':-0.137931034},{'name':'AG','value':-0.28},{'name':'AR','value':-0.26},{'name':'BT','value':0},{'name':'CE','value':0.142857143},{'name':'CH','value':-0.022727273},{'name':'CSE','value':0.075},{'name':'ECE','value':0.08},{'name':'EE','value':-0.305084746},{'name':'GG','value':0.304347826},{'name':'HS','value':0.0625},{'name':'IM','value':-0.413793103},{'name':'MA','value':0.166666667},{'name':'ME','value':0.02173913},{'name':'MI','value':0.28125},{'name':'MT','value':-0.423076923},{'name':'NA','value':0.166666667},{'name':'PH','value':-0.153846154}],[{'name':'AE','value':0.857142857},{'name':'AG','value':1},{'name':'AR','value':0.775510204},{'name':'BT','value':1.066666667},{'name':'CE','value':0.976190476},{'name':'CH','value':0.5},{'name':'CSE','value':0.375},{'name':'ECE','value':0.8},{'name':'EE','value':1.237288136},{'name':'GG','value':1.260869565},{'name':'HS','value':0.75},{'name':'IM','value':0.724137931},{'name':'MA','value':1.333333333},{'name':'ME','value':0.782608696},{'name':'MI','value':0.6875},{'name':'MT','value':0.653846154},{'name':'NA','value':0.724137931},{'name':'PH','value':1.076923077}],[{'name':'AE','value':0.214285714},{'name':'AG','value':0.76},{'name':'AR','value':0.48},{'name':'BT','value':0.333333333},{'name':'CE','value':-0.119047619},{'name':'CH','value':0.23255814},{'name':'CSE','value':0.725},{'name':'ECE','value':-0.24},{'name':'EE','value':-0.796610169},{'name':'GG','value':-0.260869565},{'name':'HS','value':0.375},{'name':'IM','value':-0.607142857},{'name':'MA','value':-0.466666667},{'name':'ME','value':-0.02173913},{'name':'MI','value':0.4375},{'name':'MT','value':0.230769231},{'name':'NA','value':0},{'name':'PH','value':-0.115384615}],[{'name':'AE','value':-0.103448276},{'name':'AG','value':-0.08},{'name':'AR','value':0.7},{'name':'BT','value':0.466666667},{'name':'CE','value':-0.097560976},{'name':'CH','value':-0.227272727},{'name':'CSE','value':-0.7125},{'name':'ECE','value':0.28},{'name':'EE','value':-0.220338983},{'name':'GG','value':-0.130434783},{'name':'HS','value':-0.3125},{'name':'IM','value':0.206896552},{'name':'MA','value':-0.333333333},{'name':'ME','value':-0.086956522},{'name':'MI','value':-0.03125},{'name':'MT','value':-0.038461538},{'name':'NA','value':0.266666667},{'name':'PH','value':-0.115384615}]];var datab=[{'name':'Panji','value':-2},{'name':'Chaggi','value':2}];
var agritxt=["I am not as happy as I thought I would be in my first year.","I will stay in my core field.","My academic workload is very stressful.","My CGPA represents my efforts well.","My Department's syllabus needs to be revised","My professors are friendly with students","My professors are partial","Acads comes in the way of achieving my goals."];

function visualize(){
var counter=0;
var sortcoun=0;
d3.select("div.depgrindtxt").text(agritxt[0]);
var dataq=krush[0];
var margin = {top: 20, right: 30, bottom: 5, left: 30},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var x = d3.scale.linear()
    .domain(d3.extent(datab, function(d) { return d.value; })).nice()
    .range([0, width]);

var y = d3.scale.ordinal()
    .domain(dataq.map(function(d) { return d.name; }))
    .rangeRoundBands([0, height], 0.1);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(6);
var svg3 = d3.select("div.depgrar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg3.selectAll(".bar")
      .data(dataq)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x(Math.min(0, d.value)); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return (Math.abs(x(d.value) - x(0))); })
      .attr("height", y.rangeBand());

  svg3.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);
function type(d) {
  d.value = +d.value;
  return d;
}

 d3.select("button.depgrsort")
        .on("click", function() {
          sortcoun++;
          var btnval=sortcoun%2==1?"Unsort":"Sort";
          document.getElementById("dsog").innerHTML=btnval;
    

    // Copy-on-write since tweens are evaluated after a delay.
    var y0 = y.domain(dataq.sort(sortcoun%2==1
        ? function(a, b) { return b.value - a.value; }
        : function(a, b) { return d3.ascending(a.name, b.name); })
        .map(function(d) { return d.name; }))
        .copy();

    svg3.selectAll(".bar")
        .sort(function(a, b) { return y0(a.name) - y0(b.name); });

    var transition = svg3.transition().duration(750),
        delay = function(d, i) { return i * 50; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("y", function(d) { return y0(d.name); });
    transition.select(".y.axis")
        .call(yAxis)
      .selectAll("g")
        .delay(delay);
  });
  d3.select("button.depgrnxt")
        .on("click", function() {
          counter++;
          sortcoun=0;
          d3.select("div.depgrindtxt").text(agritxt[counter%(krush.length)]);
          document.getElementById("dsog").innerHTML="Sort";
          dataq=krush[counter%(krush.length)];
          svg3.selectAll(".bar")
          .data(dataq)
          .transition()
          .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x(Math.min(0, d.value)); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return (Math.abs(x(d.value) - x(0))); })
      .attr("height", y.rangeBand());


        });




      };

visualize(krush[0]);
