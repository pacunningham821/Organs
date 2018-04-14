
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

	
var canvas = d3.select(".BOXES").append("svg")
						    .attr("width", width + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom);


	
var DaVal;
var i = 0

d3.csv("https://raw.githubusercontent.com/pacunningham821/Organs/master/2017_All.csv", function(data){

		DaVal = Math.sqrt(parseInt(data.Count))
		
		canvas.append("rect")
		.attr("x", 100)
		.attr("y", 500 - DaVal)
		.attr("width", DaVal)
		.attr("height", DaVal)
		.attr("fill", d3.rgb(data.R,data.G,data.B))
		.attr("id", data.Organ)
		.on("mouseover", handleMouseOver)
		.on("mouseout", handleMouseOut);
		
	i++;	
	console.log(data);
	console.log(i);
	});
	
	
	function handleMouseOver(d, i) {  // Add interactivity


            d3.select(this).attr("height", DaVal + 100);
			d3.select(this).attr("width", DaVal + 100);

          }

      function handleMouseOut(d, i) {
            d3.select(this).attr("height", DaVal);
			d3.select(this).attr("width", DaVal);

          }
	
	
