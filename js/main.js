// create test dataset

var DoD = [
    new Date(2012,5,9),
    new Date(2012,0,30),
    new Date(2012,4,3),
    new Date(2013,7,6),
    ,
    new Date(2013,4,3),,
    new Date(2011,4,28),,
    ];
var DoFP = [,
    new Date(2011,10,11), , , ,new Date(2013,0,28), ,,,]
var PDD = [
    new Date(2012,0,1),
    new Date(2011,7,15),
    new Date(2011,2,1),
    new Date(2012,8,12),
    new Date(2012,3,4),
    new Date(2012,11,28),
    new Date(2012,12,24),
    new Date(2011,2,22),
    new Date(2013,11,24)
];

// find time to limiting event (progression, death, or censor) and determine whether or not to censor

var eventTime=[];
var indicator = []
var currentDate= new Date();
for(var i=0; i<PDD.length; i++){
    if(DoFP[i]){
        eventTime[i]= (DoFP[i].getTime()-PDD[i])/(1000 * 3600 * 24);
        indicator[i] = 0;
    } else if(DoD[i]){
        eventTime[i]= (DoD[i].getTime()-PDD[i].getTime())/(1000 * 3600 * 24);
        indicator[i]=0;
    } else{
        eventTime[i]= (currentDate.getTime()-PDD[i].getTime())/(1000 * 3600 * 24)
        indicator[i]=1;
}
    }

document.getElementById("demo").innerHTML = eventTime

// initiate variables for KM calculation

var atrisk = eventTime.length;
var cen = 0;
var calc = 1;
var deaths = 0;
var time = [];
var result = [];

// loop through time to be calculated
for(var i = 0; i< 35; i++){
	deaths =0;
	cen = 0
	// loop through event list at each time
    for(var j = 0; j< eventTime.length; j++){
    	// find if event occurs during interval studied
        if(eventTime[j] < (i*30) && eventTime[j] > (i-1)*30){
        	// find number of censored and number of deaths
            cen = cen + indicator[j]
            if(indicator[j] == 0){
                deaths++;
            }
        }
    }
    //create time and result vecturs, calculate 
    time[i]=i*30;
    calc =calc * (atrisk-deaths)/atrisk;
    result[i] = calc;
    atrisk= atrisk-deaths-cen;
}

// add data points to create vertical drop

stop = result.length

modtime = time.slice(0)

for(var i =0; i<stop-1; i++){
	modtime[i] = time[i]+ .01
	time.push(modtime[i])
	result.push(result[i+1])
}

document.getElementById("test1").innerHTML = time
document.getElementById("test2").innerHTML = result

//sort times and results for easy graphing 

time = time.sort(function(a, b) {
  return a - b;
})
result = result.sort(function(a, b) {
  return a - b;
})
result = result.reverse()

console.log(time)
console.log(result)

// use D3.js to make line plot
InitChart();

function InitChart() {

lineData = [];
for(var i =0; i< result.length; i++){
    lineData[i] = {
    'x': time[i],
    'y': result[i]
    }
}

  console.log(lineData)
  var vis = d3.select("#visualisation"),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(time),
      d3.max(lineData, function (d) {
        return d.x;
      })
    ]),

    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
      d3.max(lineData, function (d) {
        return d.y;
      })
    ]),

    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),

    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);


  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

  var lineFunc = d3.svg.line()
  .x(function (d) {
    return xRange(d.x);
  })
  .y(function (d) {
    return yRange(d.y);
  })
  .interpolate('linear');

vis.append("svg:path")
  .attr("d", lineFunc(lineData))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");
vis.append("svg:text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", WIDTH/2)
    .attr("y", HEIGHT - 6)
    .text("Time (Months)");

vis.append("svg:text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Survival Value");

}
