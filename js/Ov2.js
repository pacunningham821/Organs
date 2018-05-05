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
var ID2;
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
			.on("mouseover", handleMouseOver)
			.on("mouseout", handleMouseOut)
			.on("click", handleMouseClick)
			.text(LabelMe(data.Organ));
		
	i++;	
	console.log(data);
	console.log(i);
	});
	
	function LabelMe(d) {// add spaces where needed to labels
		var inde = d.indexOf("And");
		var otpt;
		if (inde != -1){
			otpt = d.substr(0,inde) + " and " + d.substr(inde + 3, d.length);
		} else {
			otpt = d;
		}
		return otpt;
	}
		
	
	function handleMouseOver(d) {  // Add interactivity
	
			ID = d3.select(this).attr("id");
			//if statement to figure out if hover over was text or rectangle
			if (ID.substr(ID.length - 3, 3) == "TXT") {
				ID2 = "#" + ID.substr(0, ID.length - 3);
			} else {
				ID2 = "#" + ID;
			}

			H = parseFloat(d3.select(ID2).attr("height"));
			W = parseFloat(d3.select(ID2).attr("width"));
			X = parseInt(d3.select(ID2).attr("x"));
			Y = parseInt(d3.select(ID2).attr("y"));
			ID = "#" + d3.select(ID2).attr("id") + "TXT";
			
            d3.select(ID2).attr("height", W + 40)
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
            d3.select(ID2).attr("height", H)
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
			//if statement to figure out if hover over was text or rectangle
			if (ID.substr(ID.length - 3, 3) == "TXT") {
				ID = "#" + ID.substr(0, ID.length - 3);
			} else {
				ID = "#" + ID;
			}
			//load cooresponding information from D
			Recep = D.filter(function( obj ) {
				return obj.Organ == ID.substr(1, ID.length); })[0];
				
			// build custom SVG shape to be built by path
			var xk = 195;
			var yk = 286;
			var wk = 55;
			var hk = 70;
			var xp = 105 + 8*56 + 5;
			var outline = [{"x": xk, "y": yk},
						   {"x": xk+wk, "y": yk},
						   {"x": xk+wk, "y": yk+hk},
						   {"x": xk+wk-2.5, "y": yk+hk+2},
						   {"x": xk+wk-7.5, "y": yk+hk-2},
						   {"x": xk+wk-12.5, "y": yk+hk+2},
						   {"x": xk+wk-17.5, "y": yk+hk-2},
						   {"x": xk+wk-22.5, "y": yk+hk+2},
						   {"x": xk+wk-27.5, "y": yk+hk-2},
						   {"x": xk+wk-32.5, "y": yk+hk+2},
						   {"x": xk+wk-37.5, "y": yk+hk-2},
						   {"x": xk+wk-42.5, "y": yk+hk+2},
						   {"x": xk+wk-47.5, "y": yk+hk-2},
						   {"x": xk+wk-52.5, "y": yk+hk+2},
						   {"x": xk, "y": yk+hk},
						   {"x": xk, "y": yk},
						];
			var mealine = [{"x": xk - 10, "y": yk},
						   {"x": xk - 15, "y": yk},
						   {"x": xk - 15, "y": yk+hk},
						   {"x": xk - 10, "y": yk+hk}
						];
			var perline = [{"x": xp, "y": 560},
						   {"x": xp + 5, "y": 560},
						   {"x": xp + 5, "y": 560-6*55},
						   {"x": xp, "y": 560-6*55}
						];
						
			var line = d3.line()
						.x(function(d) {return d.x;})
						.y(function(d) {return d.y;});
			
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
				.attr("fill", d3.select(ID).attr("fill"))
				.attr("id", "R")
				.on("click", ClickRemove);
			
			canvas.append("path")
					.attr("d", line(perline))
					.attr("stroke-width", 1.25)
					.attr("stroke", d3.rgb(80,80,80))
					.attr("fill", "none")
					.attr("id", "RP1")
					.on("click", ClickRemove);			
			
			canvas.append("text")
					.attr("x", xp+6)
					.attr("y", 572)
					.attr("font-family", "Calibri")
					.attr("font-size", "14px")
					.attr("fill", "white")
					.attr("font-weight", 400)
					.attr("id", "TP1")
					.on("click", ClickRemove)
					.text("0%");
					
			canvas.append("text")
					.attr("x", xp+6)
					.attr("y", 560-6*55)
					.attr("font-family", "Calibri")
					.attr("font-size", "14px")
					.attr("fill", "white")
					.attr("font-weight", 400)
					.attr("id", "TP2")
					.on("click", ClickRemove)
					.text("55%");
			
			
				
			// add key for bar graph
			canvas.append("path")
					.attr("d", line(outline))
					.attr("stroke-width", 0.75)
					.attr("stroke", d3.rgb(80,80,80))
					.attr("fill", d3.rgb(145,145,145))
					.attr("id", "RK")
					.on("click", ClickRemove);
					
			canvas.append("path")
					.attr("d", line(mealine))
					.attr("stroke-width", 1.25)
					.attr("stroke", d3.rgb(80,80,80))
					.attr("fill", "none")
					.attr("id", "RK2")
					.on("click", ClickRemove);
			
				
				canvas.append("text")
					.attr("x", 175)
					.attr("y", 280)
					.attr("font-family", "Calibri")
					.attr("font-size", "15px")
					.attr("fill", "white")
					.attr("font-weight", 700)
					.attr("id", "TK0")
					.on("click", ClickRemove)
					.text("# of Recipents");
					
				canvas.append("text")
					.attr("x", 175)
					.attr("y", 264)
					.attr("font-family", "Calibri")
					.attr("font-size", "15px")
					.attr("fill", "white")
					.attr("font-weight", 700)
					.attr("id", "TK1")
					.on("click", ClickRemove)
					.text("Age Group (years)");
					
				canvas.append("text")
					.attr("x", 107)
					.attr("y", 314)
					.attr("font-family", "Calibri")
					.attr("font-size", "15px")
					.attr("fill", "white")
					.attr("font-weight", 700)
					.attr("id", "TK2")
					.on("click", ClickRemove)
					.text("% of Organ");
				
				canvas.append("text")
					.attr("x", 110)
					.attr("y", 330)
					.attr("font-family", "Calibri")
					.attr("font-size", "15px")
					.attr("fill", "white")
					.attr("font-weight", 700)
					.attr("id", "TK3")
					.on("click", ClickRemove)
					.text("Recipents");
				
			// add text to main box
			canvas.append("text")
				.attr("x", 105)
				.attr("y", 106)
				.attr("font-family", "Calibri")
				.attr("font-size", "28px")
				.attr("fill", "white")
				.attr("font-weight", 700)
				.attr("id", "extTXT")
				.on("click", ClickRemove)
				.text(LabelMe(ID.substr(1, ID.length)));
				
			canvas.append("text")
				.attr("x", 105)
				.attr("y", 138)
				.attr("font-family", "Calibri")
				.attr("font-size", "18px")
				.attr("fill", "white")
				.attr("font-weight", 400)
				.attr("id", "extTXT2")
				.on("click", ClickRemove)
				.text("2017 Donations Made: " + parseFloat(Recep['Count']).toLocaleString('en'));
			
			canvas.append("text")
				.attr("x", 105)
				.attr("y", 156)
				.attr("font-family", "Calibri")
				.attr("font-size", "18px")
				.attr("fill", "white")
				.attr("font-weight", 400)
				.attr("id", "extTXT3")
				.on("click", ClickRemove)
				.text("2014 Average Wait time: " + Recep['Waiting'] + " days");
			
			canvas.append("text")
				.attr("x", 235)
				.attr("y", 186)
				.attr("font-family", "Calibri")
				.attr("font-size", "24px")
				.attr("fill", "white")
				.attr("font-weight", 700)
				.attr("id", "extTXT4")
				.on("click", ClickRemove)
				.text("Age of Recipents in 2017");		
		
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
			// this corrects for label length
			var correction;
			// this corrects for count length
			var correction2;
			// stores the age group recipient count
			var rec_count;
			

			//for loop to build 7 age group rectangels for stacked bar (100%)
			//Switch statement defines the age group for each pass through the for loop
			for (c = 0; c <= 7; c++) {
				switch(c){
					case 0:
						agecol = 'LessThan1'
						agelabel = "< 1"
						correction = 11;
						rec_count = parseInt(Recep[agecol]).toLocaleString('en');
						break;
					case 1:
						agecol = '1To5'
						agelabel = " 1-5"
						correction = 11;
						rec_count = parseInt(Recep[agecol]).toLocaleString('en');
						break;
					case 2:
						agecol = '6To10'
						agelabel = " 6-10"
						correction = 7;
						rec_count = parseInt(Recep[agecol]).toLocaleString('en');
						break;
					case 3:
						agecol = '11To17'
						agelabel = "11-17"
						correction = 0;
						rec_count = parseInt(Recep[agecol]).toLocaleString('en');
						break;
					case 4:
						agecol = '18To34'
						agelabel = "18-34"
						correction = 0;
						rec_count = parseInt(Recep[agecol]).toLocaleString('en');
						break;
					case 5:
						agecol = '35To49'
						agelabel = "35-49"
						correction = 0;
						rec_count = parseInt(Recep[agecol]).toLocaleString('en');
						break;
					case 6:
						agecol = '50To64'
						agelabel = "50-64"
						correction = 0;
						rec_count = parseInt(Recep[agecol]).toLocaleString('en');
						break;
					case 7:
						agecol = '65Plus'
						agelabel = "65 +"
						correction = 9;
						rec_count = parseInt(Recep[agecol]).toLocaleString('en');
						break;
				}// Switch c
				
				switch(rec_count.length){
					case 1:
						correction2 = 15;
						break;
					case 2:
						correction2 = 11;
						break;
					case 3:
						correction2 = 7;
						break;
					case 5:
						correction2 = 0;
						break;
					case 6:
						correction2 = -4;
						break;
				}// Switch rec_count.length
				
				DaValS = parseInt(Recep[agecol+"p"])*6;
				
				canvas.append("rect")
					.attr("height", DaValS)
					.attr("width", 53)
					.attr("x", 105 + 56.75*c)
					.attr("y", 560 - DaValS)
					.attr("stroke-width", 0.75)
					.attr("stroke", d3.rgb(80,80,80))
					.attr("fill", d3.rgb(145,145,145))
					.attr("id", "R"+c)
					.on("click", ClickRemove);
				
				canvas.append("text")
					.attr("x", 110 + correction + 56.75*c)
					.attr("y", 538 - DaValS)
					.attr("font-family", "Calibri")
					.attr("font-size", "17px")
					.attr("fill", "white")
					.attr("font-weight", 700)
					.attr("id", "T"+c)
					.text(agelabel);
				
				canvas.append("text")
					.attr("x", 111 + correction2 + 56.75*c)
					.attr("y", 554 - DaValS)
					.attr("font-family", "Calibri")
					.attr("font-size", "17px")
					.attr("fill", "white")
					.attr("font-weight", 700)
					.attr("id", "T2"+c)
					.text(rec_count);
					
				h_store += DaValS; 
				
			};// For Loop
		
				
		};// handleMouseClick
		
		//function to remove elements when clicking out
		function ClickRemove(){
					d3.select(ID+"TXT").attr("font-weight", 400);
					d3.select("#extTXT").remove();
					d3.select("#extTXT2").remove();
					d3.select("#extTXT3").remove();
					d3.select("#extTXT4").remove();
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
					d3.select("#TK0").remove();
					d3.select("#TK1").remove();
					d3.select("#RK").remove();
					d3.select("#RK2").remove();
					d3.select("#TK2").remove();
					d3.select("#TK3").remove();
					d3.select("#RP1").remove();
					d3.select("#TP1").remove();
					d3.select("#TP2").remove();
					};
