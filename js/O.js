
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

	
var canvas = d3.select(".BOXES").append("svg")
						    .attr("width", width + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom);


	
var DaVal;

d3.csv("https://raw.githubusercontent.com/pacunningham821/Organs/master/2017_All.csv", function(data){

		DaVal = Math.sqrt(parseInt(data['Kidney'])) * 100
		canvas.append("rect")
		.attr("x", 100)
		.attr("y", 500 - DaVal)
		.attr("width", DaVal)
		.attr("height", DaVal)
		.attr("fill", d3.rgb(125,171,250))
		.on("mouseover", handleMouseOver)
		.on("mouseout", handleMouseOut);
		
		DaVal2 = Math.sqrt(parseInt(data['Liver'])) * 100
		canvas.append("rect")
		.attr("x", 100)
		.attr("y", 500 - DaVal2)
		.attr("width", DaVal2)
		.attr("height", DaVal2)
		.attr("fill", d3.rgb(212,141,230));
		
		
		
		
	console.log(data);
	});
	
	
	function handleMouseOver(d, i) {  // Add interactivity


            d3.select(this).attr("height", DaVal + 100);
			d3.select(this).attr("width", DaVal + 100);

          }

      function handleMouseOut(d, i) {
            d3.select(this).attr("height", DaVal);
			d3.select(this).attr("width", DaVal);

          }
	
	
