//version 2 added on click


var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

	
var canvas = d3.select(".BOXES").append("svg")
						    .attr("width", width + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom);


	
var DaVal;
var i = 0
var H;
var W;
var X;
var Y;
var ID;
var D =[];

d3.csv("https://raw.githubusercontent.com/pacunningham821/Organs/master/2017_All_Recep.csv", function(data){

		DaVal = Math.sqrt(data.Count)*2.5
		D[i] = data;
		
		canvas.append("rect")
		.attr("x", 100)
		.attr("y", 550 - DaVal)
		.attr("width", DaVal)
		.attr("height", DaVal)
		.attr("fill", d3.rgb(data.R,data.G,data.B))
		.attr("stroke-width", 0.5)
		.attr("stroke", d3.rgb(80,80,80))
		.attr("id", data.Organ)
		.attr("rx", 20)
		.attr("ry", 20)
		.on("mouseover", handleMouseOver)
		.on("mouseout", handleMouseOut)
		.on("click", handleMouseClick);
		
		canvas.append("text")
			.attr("x", 115)
			.attr("y", 565 - DaVal)
			.attr("font-family", "Calibri")
			.attr("font-size", "20px")
			.attr("fill", "white")
			.attr("font-weight", 400)
			.attr("id", data.Organ + "TXT")
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
			ID = "#" + d3.select(this).attr("id") + "TXT";
			
            d3.select(this).attr("height", W + 40)
			.attr("width", H + 40)
			.attr("x", X - 20)
			.attr("y", Y - 20)
			.attr("stroke-width", 2);
			
			d3.select(ID).attr("font-weight", 700);
			
			canvas.append("rect")
			.attr("x", X - 25)
			.attr("y", Y - 40)
			.attr("fill", d3.rgb(145,145,145))
			.attr("id", "Bub")
			.attr("height", 19)
			.attr("width", 130)
			.attr("rx", 7.5)
			.attr("ry", 7.5);
			
			canvas.append("text")
			.attr("x", X - 19)
			.attr("y", Y - 27)
			.attr("font-family", "Calibri")
			.attr("font-size", "16px")
			.attr("fill", "white")
			.attr("font-weight", 700)
			.attr("id", "TXT")
            .text(Math.round(Math.pow(W/2.5, 2)).toLocaleString('en') + " Donations");
			

          }

    function handleMouseOut(d, i) {
            d3.select(this).attr("height", H)
			.attr("width", W)
			.attr("x", X)
			.attr("y", Y)
			.attr("stroke-width", 0.5);
			
			d3.select(ID).attr("font-weight", 400);
			
			d3.select("#Bub").remove();
			
			d3.select("#TXT").remove();

          }
	
	function handleMouseClick(d, i) {
			ID = d3.select(this).attr("id");
			
			canvas.append("rect")
				.attr("height", 500)
				.attr("width", 500)
				.attr("x",90)
				.attr("y", 80)
				.attr("rx", 20)
				.attr("ry", 20)
				.attr("stroke-width", 2)
				.attr("stroke", d3.rgb(80,80,80))
				.attr("fill", d3.select("#" + ID).attr("fill"))
				.on("click", function(){
					d3.select("#extTXT").remove();
					d3.select(this).remove();
					});
			
			canvas.append("text")
				.attr("x", 105)
				.attr("y", 98)
				.attr("font-family", "Calibri")
				.attr("font-size", "20px")
				.attr("fill", "white")
				.attr("font-weight", 700)
				.attr("id", "extTXT")
				.text(ID);
		
				
			}
