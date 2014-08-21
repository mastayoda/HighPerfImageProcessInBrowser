/* Global Variables */
var BarChart;
var globalData = [];
var gSplitedArrays = [];
var gnData, gAlgo, gnWorkers, gTO;
var gImageData;
var workCount = 0;
var gAcu = 0;
var imageSize = 0;
var gRemoveDefault = true;
var isWebCLAvailable = false;
var workerImg;
var gArr = new Uint8Array(1024 * 1024 * 100); /*Initialize with 100 megabytes*/

/* If mark is not available add custom functions */
if (!window.performance.mark) {
    window.marks = {};
    window.performance.mark = function(m) {

        window.marks[m] = new Date().getTime();
    };

    window.measures = {};
    window.performance.measure = function(m, s, e) {
        window.measures[m] = Math.abs(window.marks[e] - window.marks[s]);
    };

    window.performance.getEntriesByName = function(e) {
        return [{
            duration: window.measures[e]
        }];
    };

    window.performance.clearMeasures = function() {};
    window.performance.clearMarks = function() {};

}


function addBars() {

    window.performance.measure('singleThreadTime', 'pStart', 'pEnd');
    window.performance.measure('multiThreadTime', 'wStart', 'wEnd');
    window.performance.measure('webClTime', 'webClStart', 'webClEnd');
    sTime = window.performance.getEntriesByName('singleThreadTime')[0].duration;
    webClTime = window.performance.getEntriesByName('webClTime')[0].duration;
    wTime = window.performance.getEntriesByName('multiThreadTime')[0].duration;

    var to = (gTO) ? " | Trans. Obj." : "";
    BarChart.addData([sTime, webClTime, wTime], gAlgo + " | " + gnData + "MB" + " | " + gnWorkers + " workers" + to);
    globalData = [];

    if (gRemoveDefault) {
        BarChart.removeData();
        gRemoveDefault = false;
    }

}

function createWorkerFromString(str) {
    // URL.createObjectURL
    window.URL = window.URL || window.webkitURL;

    // "Server response", used in all examples
    var response = str;

    var blob;
    try {
        blob = new Blob([response], {
            type: 'application/javascript'
        });
    } catch (e) { // Backwards-compatibility
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
        blob = new BlobBuilder();
        blob.append(response);
        blob = blob.getBlob();
    }

    return new Worker(URL.createObjectURL(blob));

}


function splitArray(arr, n) {

    var data = [];
    var begin = 0;
    var arrLen = arr.length;

    /*Spliting array in multiples of 4*/
    while ((arrLen / n) % 4 != 0)
        arrLen--;

    var len = arrLen / n;

    /* Setting Up the splited array */
    for (var i = 0; i < n - 1; i++) {
        data.push(arr.buffer.slice(begin, len * (i + 1)));
        begin += len;
    }

    /*pushing the last array (the shorter one in case the total length is not multiple of 4*/
    data.push(arr.buffer.slice(begin));

    return data;

}


function mergeArrays() {

    /* Calculating Total Size */
    var totalSize = 0;
    for (var i = 0; i < gSplitedArrays.length; i++)
        totalSize += gSplitedArrays[i].byteLength;

    /* Allocating new Array */
    var c = new Uint8ClampedArray(totalSize);

    /* Setting the first array */
    c.set(new Uint8ClampedArray(gSplitedArrays[0]));
    /* Calculating the first Offset for the second array */
    var offSet = gSplitedArrays[0].byteLength;

    /* Setting the other Arrays */
    for (var i = 1; i < gSplitedArrays.length; i++) {
        c.set(new Uint8ClampedArray(gSplitedArrays[i]), offSet); /* Insert this array after previous one(offSet) */
        offSet += gSplitedArrays[i].byteLength; /* Adding the just added array offset */
    }

    gSplitedArrays = [];

    /* Return the new Array */
    return c;
}

function reportMarks() {

    window.performance.measure('splitingTime', 'splitingStart', 'splitingEnd');
    window.performance.measure('mergeTime', 'mergeStart', 'mergeEnds');
    window.performance.measure('threadPrep', 'threadPrepStart', 'threadPrepEnd');
    window.performance.measure('renderChanges', 'renderChangesStart', 'renderChangesEnd');
    window.performance.measure('webClPreparations', 'webClpreparationStart', 'webClpreparationEnd');
    window.performance.measure('webClExecution', 'webClExecutionStart', 'webClExecutionEnd');
    window.performance.measure('webClReadBuffer', 'webClReadBufferStart', 'webClReadBufferEnd');
    window.performance.measure('singleThreadExecution', 'singleThreadExecutionStart', 'singleThreadExecutionEnd');

    console.log("-----------------------Single Thread-------------------------");
    console.log("Single Thread Javascript Time: " + window.performance.getEntriesByName('singleThreadExecution')[0].duration);
    console.log("------------------------WebWorkers---------------------------");
    console.log("Spliting Time: " + window.performance.getEntriesByName('splitingTime')[0].duration);
    console.log("Merge Time: " + window.performance.getEntriesByName('mergeTime')[0].duration);
    console.log("Threads Preparation Time: " + window.performance.getEntriesByName('threadPrep')[0].duration);
    console.log("Render Changes Time: " + window.performance.getEntriesByName('renderChanges')[0].duration);
    console.log("---------------------------webcl-----------------------------");
    console.log("WebCl preparation Time: " + window.performance.getEntriesByName('webClPreparations')[0].duration);
    console.log("WebCl Execution Time: " + window.performance.getEntriesByName('webClExecution')[0].duration);
    console.log("WebCl Read Buffer Time: " + window.performance.getEntriesByName('webClReadBuffer')[0].duration);

    console.log();


    window.performance.clearMeasures();
    window.performance.clearMarks();

}