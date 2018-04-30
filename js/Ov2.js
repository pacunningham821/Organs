//version 2 added on click


var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

	
var canvas = d3.select(".BOXES").append("svg")
						    .attr("width", width + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom);


	
var DaVal; // this is length of one side of the sqaure, square root of count
var i = 0 // index function to count in d3.csv function
var H; // will store svg height information on mouseover
var W; // will store svg width information on mouseover
var X; // will store svg X location information on mouseover
var Y; // will store svg Y location information on mouseover
var ID; // will store svg ID information on mouseover and click
var D =[]; // will store whole csv file array
var Recep = []; // will be the specific organ array on click event




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
			//get ID for clicked object
			ID = d3.select(this).attr("id");
			//load cooresponding information from D
			Recep = D.filter(function( obj ) {
				return obj.Organ == ID; })[0];
				
				
			// build the new larege rectangel for details on clicked organ
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
				.attr("id", "R")
				.on("click", ClickRemove);
				
			// add text to main box
			canvas.append("text")
				.attr("x", 105)
				.attr("y", 98)
				.attr("font-family", "Calibri")
				.attr("font-size", "20px")
				.attr("fill", "white")
				.attr("font-weight", 700)
				.attr("id", "extTXT")
				.text(ID);
		
			// counter varible for age groups
			var c;
			// define age group column name in Recep in below switch
			var agecol;
			//age label
			var agelabel;
			// store the sum height so far in for loop
			var h_store = 0;
			// display value
			var DaValS;
			

			//for loop to build 7 age group rectangels for stacked bar (100%)
			//Switch statement defines the age group for each pass through the for loop
			for (c = 0; c <= 7; c++) {
				switch(c){
					case 0:
						agecol = 'LessThan1'
						agelabel = "<1yo"
						break;
					case 1:
						agecol = '1To5'
						agelabel = "1-5yo"
						break;
					case 2:
						agecol = '6To10'
						agelabel = "6-10yo"
						break;
					case 3:
						agecol = '11To17'
						agelabel = "11-17yo"
						break;
					case 4:
						agecol = '18To34'
						agelabel = "18-34yo"
						break;
					case 5:
						agecol = '35To49'
						agelabel = "35-49yo"
						break;
					case 6:
						agecol = '50To64'
						agelabel = "50-64yo"
						break;
					case 7:
						agecol = '65Plus'
						agelabel = "65+yo"
						break;
				}// Switch
				
				DaValS = parseInt(Recep[agecol+"p"])*6;
				
				canvas.append("rect")
					.attr("height", DaValS)
					.attr("width", 55)
					.attr("x", 105 + 58.75*c)
					.attr("y", 560 - DaValS)
					.attr("stroke-width", 0.75)
					.attr("stroke", d3.rgb(80,80,80))
					.attr("fill", d3.rgb(145,145,145))
					.attr("id", "R"+c)
					.on("click", ClickRemove);
				
				canvas.append("text")
					.attr("x", 105 + 58.75*c)
					.attr("y", 538 - DaValS)
					.attr("font-family", "Calibri")
					.attr("font-size", "17px")
					.attr("fill", "white")
					.attr("font-weight", 700)
					.attr("id", "T"+c)
					.attr("stroke", d3.rgb(70,70,70))
					.attr("stroke-width", 0.5)
					.text(agelabel);
				
				canvas.append("text")
					.attr("x", 109 + 58.75*c)
					.attr("y", 554 - DaValS)
					.attr("font-family", "Calibri")
					.attr("font-size", "17px")
					.attr("fill", "white")
					.attr("font-weight", 700)
					.attr("id", "T2"+c)
					.attr("stroke", d3.rgb(70,70,70))
					.attr("stroke-width", 0.5)
					.text(parseInt(Recep[agecol]).toLocaleString('en'));
					
				h_store += DaValS; 
				
			};// For Loop
		
				
		};// handleMouseClick
		
		//function to remove elements when clicking out
		function ClickRemove(){
					d3.select("#extTXT").remove();
					d3.select("#R").remove();
					d3.select("#R0").remove();
					d3.select("#R1").remove();
					d3.select("#R2").remove();
					d3.select("#R3").remove();
					d3.select("#R4").remove();
					d3.select("#R5").remove();
					d3.select("#R6").remove();
					d3.select("#R7").remove();
					d3.select("#T0").remove();
					d3.select("#T1").remove();
					d3.select("#T2").remove();
					d3.select("#T3").remove();
					d3.select("#T4").remove();
					d3.select("#T5").remove();
					d3.select("#T6").remove();
					d3.select("#T7").remove();
					d3.select("#T20").remove();
					d3.select("#T21").remove();
					d3.select("#T22").remove();
					d3.select("#T23").remove();
					d3.select("#T24").remove();
					d3.select("#T25").remove();
					d3.select("#T26").remove();
					d3.select("#T27").remove();
					};
