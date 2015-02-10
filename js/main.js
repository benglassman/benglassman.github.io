var DoD = [
    new Date(2012,5,9),
    new Date(2012,0,30),
    new Date(2012,4,3),
    new Date(2013,7,6),
    ,,
    new Date(2013,4,3),,
    new Date(2011,4,28)
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
var eventTime=[];
var indicator = [];
var currentDate= new Date();

for(var i=0; i<PDD.length; i++){
    if(DoFP[i]){
        eventTime[i]= (DoFP[i].getTime()-PDD[i])/(1000 * 3600 * 24);
    } else if(DoD[i]){
        eventTime[i]= (DoD[i].getTime()-PDD[i].getTime())/(1000 * 3600 * 24);
    } else{
        eventTime[i]= (currentDate.getTime()-PDD[i].getTime())/(1000 * 3600 * 24);
}


document.getElementById("demo").innerHTML = (currentDate.getTime()-PDD[1].getTime())/(1000 * 3600 * 24);
