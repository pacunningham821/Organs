# Organs
organ donation data
Built by Paul Cunningham April 2018
Shows organ donations made in 2017 in the United States, the area of each square represents number of donations.
Hover over each block to see total number of donations.
Click each block to see some detailed data on those organ donations.

Data in 2017_All_Recep.csv pulled from multiple sources:
[1]2017 Organ donation count and recipant age information collected from the Organ Procurement and Transplantation Network website,
part of U.S. Department of Health & Human Servies. Data pulled 2017 from http://optn.transplant.hrsa.gov.
[2]Average wait times pulled from a Milliman Research Report
Bentley, Scott T. Phillips, Steven J. "2017 U.S. organ and Tissue Transplant cost Estimates and Discussion". Milliman Research Report.
August 2017. (accesible online at: http://www.milliman.com/insight/2017/2017-U_S_-organ-and-tissue-transplant-cost-estimates-and-discussion/)

Donation_age.xlsm - Contains some excel macros to manipulate data from Organ Procurement and Transplanation Network database to be used
in this visualization.

2017_All_Recep.csv - the data source for the visualization including colors
2017_All.csv - older version of data set, works with O.js
index.html - html file, majority of processing done in javascript file
js:
O2.js - javascript file that uses D3 to build visulaziation pulling data from 2017_All_Recep.csv
O.js - older version of javascript, simple graph