
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

	
var canvas = d3.select(".BOXES").append("svg")
						    .attr("width", width + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom);


	
var DaVal;
var i = 0
var H;
var W;
var X;
var Y;

d3.csv("https://raw.githubusercontent.com/pacunningham821/Organs/master/2017_All.csv", function(data){

		DaVal = Math.sqrt(data.Count)*2.5
		
		canvas.append("rect")
		.attr("x", 100)
		.attr("y", 500 - DaVal)
		.attr("width", DaVal)
		.attr("height", DaVal)
		.attr("fill", d3.rgb(data.R,data.G,data.B))
		.attr("id", data.Organ)
		.on("mouseover", handleMouseOver)
		.on("mouseout", handleMouseOut);
		
		canvas.append("text")
			.attr("x", 115)
			.attr("y", 515 - DaVal)
			.attr("fint-family", "Calibri")
			.attr("font-size", "20px")
			.attr("fill", "white")
			.attr("font-weight", 700)
			.text(data.Organ);
		
	i++;	
	console.log(data);
	console.log(i);
	});
	
	
	function handleMouseOver(d, i) {  // Add interactivity

			H = parseFloat(d3.select(this).attr("height"));
			W = parseFloat(d3.select(this).attr("width"));
			X = parseInt(d3.select(this).attr("x"));
			Y = parseInt(d3.select(this).attr("y"));
			
            d3.select(this).attr("height", W + 40);
			d3.select(this).attr("width", H + 40);
			d3.select(this).attr("x", X - 20);
			d3.select(this).attr("y", Y - 20);

          }

      function handleMouseOut(d, i) {
            d3.select(this).attr("height", H);
			d3.select(this).attr("width", W);
			d3.select(this).attr("x", X);
			d3.select(this).attr("y", Y);

          }
	
	
