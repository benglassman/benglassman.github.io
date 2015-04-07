/*
Implementation of Kaplan Meier Curve plotted using Chart.js
*/

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
var cen = 0;
var calc = 1;
var deaths = 0;
var time = [];
var result = [];

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
console.log(eventTime)

// initiate variables for KM calculation

var atrisk = eventTime.length;


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


//sort times and results for easy graphing 

time = time.sort(function(a, b) {
  return a - b;
})
result = result.sort(function(a, b) {
  return a - b;
})
result = result.reverse()

labels = []
for(var i=0; i<35;i++){
		labels.push(""+i+"")
	}
	console.log(labels)
var lineChartData={
	labels : time
	,
			datasets : [
				{
					label: "My Second dataset",
					fillColor : "rgba(151,187,205,0.2)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(151,187,205,1)",
					data : result
				}
			]
		}


window.onload = function(){
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(ctx).Line(lineChartData, {
			responsive: true
		});
	}