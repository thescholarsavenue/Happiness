//Width and height
			
			var radha=[[ 26, 39, 53, 72, 86],[ 51, 53, 62, 67, 75],[ 46, 66, 70, 76, 75],[ 55, 64, 60, 61, 63],[ 46, 65, 65, 65, 62],[ 40, 57, 55, 58, 60],[ 66, 76, 77, 79, 73]];
			var payradha=[[ 22, 21, 11, 16, 28],[ 19, 4, 1, 1, 1],[ 26, 8, 5, 2, 0],[ 4, 18, 13, 7, 6],[ 19, 24, 30, 28, 17],[ 11, 11, 25, 23, 11],[ 0, 11, 11, 18, 22],[ 0, 4, 4, 5, 15]];
			var payproshno=["Placements don't matter to me.","I am okay with a package below 6 lpa.","I need a package between 6 to 8 lpa to be happy.","I need a package between 8 to 10 lpa to be happy.","I want a package between 10 to 15 lpa to be happy.","I want a package between 15 to 20 lpa to be happy.","I want a package between 20 to 50 lpa to be happy.","I want a package above 50 lpa to be happy."]
			var proshno=["How satisfied are you with your CGPA?","How satisfied are you with your Department?","How satisfied are you with IIT?","How satisfied are you with your Hall?",
			"How satisfied are you with your Social Life?","How comfortable are you with your Body Image?","How satisfied are you with your Friend Circle?"];
			
displayonce(radha,proshno,"div.arena","div.cghpindtxt","button.arenap");
displayonce(payradha,payproshno,"div.arenapay","div.payindtxt","button.payy");

			function displayonce(datax,txtarray,displaydiv,displaytxtdiv,btntgt){
			var w = 400;
			var h = 300;
			var counter=0;
			var dataset=datax[0];
			var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, w], 0.1);

			var yScale = d3.scale.linear()
							.domain([0, d3.max([].concat.apply([], datax))])
							.range([0, h]);
			
			//Create SVG element
			var svg = d3.select(displaydiv)
						.append("svg")
						.attr("width", w)
						.attr("height", h)
						

			d3.select(displaytxtdiv)
			.text(txtarray[0]);
			

			//Create bars
			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d);
			   })
			   .attr("width", xScale.rangeBand())
			   .attr("height", function(d) {
			   		return yScale(d);
			   });

			//Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.rangeBand() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "black");
			svg.append("g")
				.attr("transform","translate(0,300)")
				




			//On click, update with new data			
			d3.select(btntgt)
				.on("click", function() {
					counter++;
					d3.select(displaytxtdiv).text(txtarray[counter%(datax.length)]);

					dataset = datax[counter%(datax.length)];
					

					//Update all rects
					svg.selectAll("rect")
					   .data(dataset)
					   .transition()								// <-- This makes it a smooth transition!
					   .attr("y", function(d) {
					   		return h - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });

					//Update all labels
					svg.selectAll("text")
					   .data(dataset)
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return h - yScale(d) + 14;
					   });
					   				
				});


};

