var fullheight1 = 300;
			var fullwidth1 = 600;

			var margin1 = {top: 30, right:100, bottom: 30, left: 100};
			var width_p1 = fullwidth1 - margin1.left - margin1.right,
			height_p1 = fullheight1 - margin1.top - margin1.bottom;

			// Set up the range here - my output sizes
			var widthScale1 = d3.scale.linear()
								.range([0, width_p1]);
			var heightScale1 = d3.scale.ordinal()
			                    .rangeRoundBands([margin1.top, height_p1], 0.2);
            var xAxis1 = d3.svg.axis()
                              .scale(widthScale1)
                              .orient("bottom")
			                  .tickFormat(d3.format("%"));
            var yAxis1 = d3.svg.axis()
                              .scale(heightScale1)
                              .orient("left");


			var svg = d3.select("#top5dazhou")
						.append("svg")
						.attr("width", fullwidth1)
						.attr("height", fullheight1);

			var tooltip = d3.select("#top5dazhou")
                    .append("div")
                    .attr("class","tooltip_qiuyuanbili");


			d3.csv("data/top5bili.csv", function(error, data) {

				if (error) {
					console.log("error reading file");
				}

				data.sort(function(a, b) {
					return d3.descending(+a.year2013, +b.year2013);
				});

				widthScale1.domain([0, d3.max(data, function(d) {
					return +d.year2013;
				})]);

				heightScale1.domain(data.map(function(d){
					return d.countryName;
				}));

			

				var rects1 = svg.selectAll("rect")
						.data(data)
						.enter()
						.append("rect");

				rects1.attr("x", margin1.left)
					.attr("y", function(d) {
						return heightScale1(d.countryName);   
					})
					.attr("width", function(d) {
						return widthScale1(d.year2013);
					})
				    .attr("height", heightScale1.rangeBand())
				    .style("fill", function(d){
				    	if(d.countryName === "Mean"){
				    	return "#80AEBD";
				    }
				})
					.append("title") 
					//.text(function(d) {
					//	return d.countryName + "的足球运动员比例为" + (d.year2013*100) + "%";
					//})
					.style('cursor','pointer');


rects1.on("mouseover",mouseoverRect)
               .on("mousemove",mousemoveRect)
               .on("mouseout",mouseoutRect);


				svg.append("g")
				   .attr("class", "x axis")
				   .attr("transform", "translate(" + margin1.left + "," + height_p1 + ")")
				   .call(xAxis1)


				svg.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + margin1.left + ",0)")
					.call(yAxis1);

				svg.append("text")
					.attr("class", "xlabel")
        	        .attr("transform", "translate(" + (margin1.left + width_p1 / 2) + " ," +
        				(height_p1 + margin1.bottom) + ")")
        	        .style("text-anchor", "middle")
        	        .attr("dy", "12")
        	        .attr("font-family", "sans-serif")
        	        .attr("font-size","10");




        	    
                   var label = svg.selectAll("text.labels")
                                       .data(data)
                                       .enter()
                                       .append("text")
                                       .attr("class", "labels");
                    label.attr("x", function(d){
                    	return (widthScale1(d.year2013) + margin1.left+ 10);
                    })
                         .attr("y", function(d){
                         	return (heightScale1(d.countryName) + (margin1.top)/3);
                         })
                         .text(function(d){
                         	return d.year2013*100+"%";
                         })
                         .attr("font-family", "sans-serif")
                         .attr("font-size", "9px")
                         .attr("transform","translate(-36,6)")
                         .attr("fill","#e1fbf0")



			});



function mouseoverRect(d){
        d3.select(this)
          .transition()
          .style("fill","#3d665e");

          


          tooltip.style("display",null)
                 .html(
                   "<p>"+d.countryName +" (" +d.dazhou+")"+"<br>" + (d.year2013*100) + "%" + "的人口是足球运动员" +"</p>")
    }

    function mousemoveRect(d) {
        tooltip
            .style("top", (d3.event.pageY - 10) + "px" )
            .style("left", (d3.event.pageX +40) + "px");
            }

    function mouseoutRect(d){
        d3.select(this)
          .transition()
          .style("fill","#3d785e");
          tooltip.style("display", "none")
    }