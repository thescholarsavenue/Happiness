
var depdata=[
{
	"cat": "A",
	"b1": "lamatra",
	"b2": 2010,
	"b3": "auto",
	"b4": "4d",
	"b5": 30
},
{
	"cat": "A",
	"b1": "zara",
	"b2": 2011,
	"b3": "auto",
	"b4": "4d",
	"b5": 22
},
{
	"cat": "C",
	"b1": "karen",
	"b2": 2009,
	"b3": "auto",
	"b4": "3d",
	"b5": 36
},
{
	"cat": "C",
	"b1": "karen",
	"b2": 2013,
	"b3": "auto",
	"b4": "4d",
	"b5": 27
},
{
	"cat": "B",
	"b1": "deux",
	"b2": 2013,
	"b3": "manual",
	"b4": "2d",
	"b5": 27
},
{
	"cat": "B",
	"b1": "deux",
	"b2": 1009,
	"b3": "manual",
	"b4": "4d",
	"b5": 19
},
{
	"cat": "B",
	"b1": "popp",
	"b2": 2010,
	"b3": "auto",
	"b4": "3d",
	"b5": 30
},
{
	"cat": "A",
	"b1": "lamatra",
	"b2": 2013,
	"b3": "auto",
	"b4": "2d",
	"b5": 30
},
{
	"cat": "C",
	"b1": "ytti",
	"b2": 2010,
	"b3": "manual",
	"b4": "2d",
	"b5": 32
},
{
	"cat": "B",
	"b1": "deux",
	"b2": 2011,
	"b3": "manual",
	"b4": "2d",
	"b5": 27
},
{
	"cat": "B",
	"b1": "popp",
	"b2": 2013,
	"b3": "manual",
	"b4": "3d",
	"b5": 32
}];
var depthings=["cat","b1","b2","b3","b4","b5"];
var depbuttonid="#bubtn";
var depqsts=["Do you think people in societies have more friends?","Have you ever been in depression?","Do you think your friends in IIT will stay for life?","Are you friends with students not from your home state?","Are you friends with the opposite gender?","How often do you exercize?","How many close friends do you have?","Do you play sports?", "Which traits in your opinion are most important to be happy in KGP?","Are you satisfied on a spiritual level?"];
execute(depdata,"#chaert",depbuttonid,depthings,depqsts,".bubdeptxt");
function execute(dataxz,idt,buttonid,things,qsts,tgttx){
	var counter=0;
	var width = 800, height = 400;
	var fill = d3.scale.ordinal().range(['#FFE870','#FFD433','#FF910F','#FF5C03','#ED3225','#B5291B'])
	var svg = d3.select(idt).append("svg")
	.attr("width", width)
	.attr("height", height);

	for (var j = 0; j < dataxz.length; j++) {
		dataxz[j].radius = +dataxz[j].b5 / 2;
		dataxz[j].x = Math.random() * width;
		dataxz[j].y = Math.random() * height;
	}

	var padding = 2;
	var maxRadius = d3.max(_.pluck(dataxz, 'radius'));

	var getCenters = function (vname, size) {
		var centers, map;
		centers = _.uniq(_.pluck(dataxz, vname)).map(function (d) {
			return {name: d, value: 1};
		});

		map = d3.layout.treemap().size(size).ratio(1/1);
		map.nodes({children: centers});

		return centers;
	};

	var nodes = svg.selectAll("circle")
	.data(dataxz);

	nodes.enter().append("circle")
	.attr("class", "node")
	.attr("cx", function (d) { return d.x; })
	.attr("cy", function (d) { return d.y; })
	.attr("r", function (d) { return 20; })
	.style("fill", function (d) { return fill(d.cat); })
	.on("mouseover", function (d) { showPopover.call(this, d); })
	.on("mouseout", function (d) { removePopovers(); })

	var force = d3.layout.force();

	draw('cat');

	$(buttonid).click(function() {
		counter++;
		draw(things[counter%(things.length)]);
		$(tgttx).text(qsts[counter%(qsts.length)]);

	});

	function draw (varname) {
		var centers = getCenters(varname, [width, height]);
		force.on("tick", tick(centers, varname));
		labels(centers)
		force.start();
	}

	function tick (centers, varname) {
		var foci = {};
		for (var i = 0; i < centers.length; i++) {
			foci[centers[i].name] = centers[i];
		}
		return function (e) {
			for (var i = 0; i < dataxz.length; i++) {
				var o = dataxz[i];
				var f = foci[o[varname]];
				o.y += ((f.y + (f.dy / 2)) - o.y) * e.alpha;
				o.x += ((f.x + (f.dx / 2)) - o.x) * e.alpha;
			}
			nodes.each(collide(.11))
			.attr("cx", function (d) { return d.x; })
			.attr("cy", function (d) { return d.y; });
		}
	}

	function labels (centers) {
		svg.selectAll(".labelxx").remove();

		svg.selectAll(".labelxx")
		.data(centers).enter().append("text")
		.attr("class", "labelxx")
		.text(function (d) { return d.name })
		.attr("transform", function (d) {
			return "translate(" + (d.x + (d.dx / 2)) + ", " + (d.y + d.dy/2 +50) + ")";
		});
	}

	function removePopovers () {
		$('.popover').each(function() {
			$(this).remove();
		}); 
	}

	function showPopover (d) {
		$(this).popover({
			placement: 'auto top',
			container: 'body',
			trigger: 'manual',
			html : true,
			content: function() { 
				return "Category: " + d.cat; 
			}
		});
		$(this).popover('show')
	}

	function collide(alpha) {
		var quadtree = d3.geom.quadtree(dataxz);
		return function (d) {
			var r = d.radius + maxRadius + padding,
			nx1 = d.x - r,
			nx2 = d.x + r,
			ny1 = d.y - r,
			ny2 = d.y + r;
			quadtree.visit(function(quad, x1, y1, x2, y2) {
				if (quad.point && (quad.point !== d)) {
					var x = d.x - quad.point.x,
					y = d.y - quad.point.y,
					l = Math.sqrt(x * x + y * y),
					r = d.radius + quad.point.radius + padding;
					if (l < r) {
						l = (l - r) / l * alpha;
						d.x -= x *= l;
						d.y -= y *= l;
						quad.point.x += x;
						quad.point.y += y;
					}
				}
				return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
			});
		};
	}
}
