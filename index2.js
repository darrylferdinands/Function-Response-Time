window.onload = function () {
var dps=[];
var dps1=[];
var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    zoomEnabled: true,
    title :{
        text: "Testing Response Time of Function (Linear)"
    },
    axisX: {
        title:"Number of inputs to the function",
    },
    axisY:{
        title: "Time (in milliseconds)",
        minimum: 0,
        maximum: 0.5,
        gridThickness: 0
    },
    data: [{
        type: "scatter",
        toolTipContent: "<b>No of Inputs: </b>{x} <br/><b>Time: </b>{y}ms",
        dataPoints: dps
    }]
});
var chart1 = new CanvasJS.Chart("chartContainer1", {
    animationEnabled: true,
    zoomEnabled: true,
    theme: "dark2",
    title :{
        text: "Testing Response Time of Function (Exponential)"
    },
    axisX: {
        title:"Number of inputs to the function",
        interval:20
    },
    axisY:{
        title: "Time (in milliseconds)",
        minimum: 0,
        maximum: 80,
        lineColor: "#6D78AD",
		gridThickness: 0
    },
    data: [{
        type: "scatter",
        toolTipContent: "<b>No of Inputs: </b>{x} <br/><b>Time: </b>{y}ms",
        dataPoints: dps1
    }]
});

function performanceTesting(arr) {
    console.log(arr)
    let sum = 0;
    for (let i = 1; i <= arr.length - 1; i++) {
            sum += arr[i];    
    }
}
function performanceTesting1(arr1) {
    console.log(arr1)
    let sum1 = 0;
    for (let i = 1; i <= arr1.length - 1; i++) {
        for(let j=1;j<arr1.length;j++){
            for(let k=1;k<arr1.length;k++){
                sum1 += arr1[i]+arr1[j]+arr1[k];
            } 
        }
    }
}
function time_calc(n) {
    let arr=[];
    for (let i = 1; i <= n; i++) {
        arr.push(i);
    }
    const t0 = performance.now();
    performanceTesting(arr);
    const t1 = performance.now();
    return (t1 - t0);
}
function time_calc1(n) {
    let arr1=[];
    for (let i = 1; i <= n; i++) {
        arr1.push(i);
    }
    const t2 = performance.now();
    performanceTesting1(arr1);
    const t3 = performance.now();
    return (t3 - t2);
}
function updateChart(count) {  
    for (var j = 0; j <= count; j++) {
        dps.push({
            x: j,
            y: time_calc(j)
        });
    }
};
function updateChart1(count) {
    
    for (var j = 0; j <= count; j++) {
        dps1.push({
            x: j,
            y: time_calc1(j)
        });
    }
};
updateChart(400);
updateChart1(400);
chart.render();
chart1.render();
calculateTrendLine(chart);
calculateTrendLine(chart1);
function calculateTrendLine(chart){
    var a, b, c, d, e, slope, yIntercept;
    var xSum = 0, ySum = 0, xySum = 0, xSquare = 0, dpsLength = chart.data[0].dataPoints.length;
    for(var i = 0; i < dpsLength; i++)
        xySum += (chart.data[0].dataPoints[i].x * chart.data[0].dataPoints[i].y)
    a = xySum * dpsLength;

    for(var i = 0; i < dpsLength; i++){
        xSum += chart.data[0].dataPoints[i].x;
        ySum += chart.data[0].dataPoints[i].y;
    }
    b = xSum * ySum;

    for(var i = 0; i < dpsLength; i++)
        xSquare += Math.pow(chart.data[0].dataPoints[i].x, 2);
    c = dpsLength * xSquare;

    d = Math.pow(xSum, 2);
    slope = (a-b)/(c-d);
    e = slope * xSum;
    yIntercept = (ySum - e) / dpsLength;

    var startPoint = getTrendLinePoint(chart.data[0].dataPoints[0].x, slope, yIntercept);
    var endPoint = getTrendLinePoint(chart.data[0].dataPoints[dpsLength-1].x, slope, yIntercept);

    chart.addTo("data",{
        type: "line", //Line series showing trend
        markerSize: 0,
        dataPoints: [startPoint, endPoint]
    });
}

function getTrendLinePoint(x, slope, intercept){
    return {x: x, y: ((slope * x) + intercept)};
}
}