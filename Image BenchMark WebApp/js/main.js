 $(function() {

     /****************************** INITIALIZATION *******************************/
     {
         if (true /*window.webcl != undefined*/ ) {

             /* Initializing webcl if available*/
             webClFilters.initWebCL();

             var options = $("#slctHostDevice");
             $.each(webclHostDevices, function() {
                 options.append($("<option />").val(this.getInfo(webcl.DEVICE_NAME)).text(this.getInfo(webcl.DEVICE_NAME) + "-" + this.getInfo(WebCL.DEVICE_TYPE)));
             });

         } else {
             $("#btnDumpWebCL").attr("disabled", "disabled");
         }

         /* Hidde image processing radios */
         $("#divImageAlgo").hide();

         $("#files").button();

         $("#dialogOriginal").dialog({
             autoOpen: false
         });
         $("#dialogSingleThread").dialog({
             autoOpen: false
         });
         $("#dialogWorkers").dialog({
             autoOpen: false
         });

         $("#dialogWebCl").dialog({
             autoOpen: false
         });

         var spinner = $("#spinner").spinner();
         $('#spinner').spinner('option', 'min', 1);
         $('#spinner').spinner('option', 'max', 16);
         spinner.val(4);


         $("#radio").buttonset();
         $("#imgRadio").buttonset();
         $("#check").button(); /*Object Transport*/

         var slider = $("#slider-range-min").slider({
             range: "min",
             value: 1,
             min: 1,
             max: 100,
             slide: function(event, ui) {
                 $("#amount").val(ui.value + " MB");
             }
         });

         $("#amount").val($("#slider-range-min").slider("value") + " MB");

         /* Graph initialization */
         var data = {
             labels: ["default"],
             datasets: [{
                 label: "My First dataset",
                 fillColor: "rgba(220,220,220,0.5)",
                 strokeColor: "rgba(220,220,220,0.8)",
                 highlightFill: "rgba(220,220,220,0.75)",
                 highlightStroke: "rgba(220,220,220,1)",
                 data: [100]
             }, {
                 label: "My Third dataset",
                 fillColor: "rgba(151,187,205,0.5)",
                 strokeColor: "rgba(151,187,205,0.8)",
                 highlightFill: "rgba(151,187,205,0.75)",
                 highlightStroke: "rgba(151,187,205,1)",
                 data: [100]
             }]
         };

         /* if Opencl is available, add the third column */
         if (window.webcl != undefined) {
             data.datasets[2] = data.datasets[1];
             data.datasets[1] = {
                 label: "My Second dataset",
                 fillColor: "rgba(228,53,53,0.5)",
                 strokeColor: "rgba(228,53,53,0.8)",
                 highlightFill: "rgba(228,53,53,0.75)",
                 highlightStroke: "rgba(228,53,53,1)",
                 data: [100]
             };
         }

         var options = {
             //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
             scaleBeginAtZero: true,

             //Boolean - Whether grid lines are shown across the chart
             scaleShowGridLines: true,

             //String - Colour of the grid lines
             scaleGridLineColor: "rgba(0,0,0,.05)",

             //Number - Width of the grid lines
             scaleGridLineWidth: 1,

             //Boolean - If there is a stroke on each bar
             barShowStroke: true,

             //Number - Pixel width of the bar stroke
             barStrokeWidth: 2,

             //Number - Spacing between each of the X value sets
             barValueSpacing: 5,

             //Number - Spacing between data sets within X values
             barDatasetSpacing: 1,

             //String - A legend template
             legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

         };


         var ctx = $("#benchMarkResults").get(0).getContext("2d");
         // This will get the first returned node in the jQuery collection.
         BarChart = new Chart(ctx).Bar(data, options);
     }

     /********************************** LOGIC ************************************/
     {

         $("#radio").click(function(event) {

             if ($("#radio :radio:checked").attr('id') == "rdProcessImage") {

                 $("#dialogSingleThread").dialog("open");
                 $("#dialogWorkers").dialog("open");
                 $("#dialogWebCl").dialog("open");
                 $("#dialogOriginal").dialog("open");

                 $("#divImageAlgo").show();

             } else {

                 $("#dialogOriginal").dialog("close");
                 $("#dialogSingleThread").dialog("close");
                 $("#dialogWorkers").dialog("close");
                 $("#dialogWebCl").dialog("close");
                 $("#divImageAlgo").hide();
             }

         });

         $("#btnDumpWebCL").button().click(function(event) {

             webClFilters.dumpWebCLInfo();


         });

         $("#btnExecute").button().click(function(event) {

             var nData = slider.slider("value");
             var nWorkers = spinner.val();
             var algoId = $("#radio :radio:checked").attr('id');
             var algo = $("#radio :radio:checked + label").text();
             var transObj = $("#check").prop("checked");

             /* Global Variables for the workers async results posting */
             gnData = nData;
             gAlgo = algo;
             gnWorkers = nWorkers;
             gTO = transObj

             benchMark(nData, algoId, nWorkers, transObj);

         });

         /* File Upload Event listener */
         function handleFileSelect(evt) {
             var files = evt.target.files; // FileList object
             // Loop through the FileList and render image files as thumbnails.
             for (var i = 0, f; f = files[i]; i++) {

                 // Only process image files.
                 if (!f.type.match('image.*')) {
                     continue;
                 }

                 var reader = new FileReader();

                 // Closure to capture the file information.
                 reader.onload = (function(theFile) {
                     return function(e) {
                         // Render thumbnail.
                         var img = $("#imgOriginal")[0];
                         img.src = e.target.result;
                         $("#dialogOriginal").dialog({
                             width: img.width + 10,
                             heigth: img.height + 10
                         });
                     };
                 })(f);

                 // Read in the image file as a data URL.
                 reader.readAsDataURL(f);
             }
         }
         document.getElementById('files').addEventListener('change', handleFileSelect, false);

         /* Benchmark 2 main algorithms or jump to image filters benchmark*/
         function benchMark(nData, algo, nWorkers, to) {
             /* Provided Array with MB size */
             var arr = gArr.subarray(0, 1024 * 1024 * nData);


             for (var i = 0; i < arr.length; i++)
                 arr[i] = Math.floor((Math.random() * 100) + 1);



             /*Plain javascript*/
             switch (algo) {
                 case "rdSumArray":

                     sumArrayPlain(arr);
                     if (to)
                         sumArrayWorkersTO(arr, nWorkers);
                     else
                         sumArrayWorkers(arr, nWorkers);

                     break;
                 case "rdReverseArray":
                     reverseArrayPlain(arr);
                     reverseArrayWorkers(arr, nWorkers);
                     break;
                 case "rdProcessImage":

                     benchFilters(nData, nWorkers, to);
                     break;
             }


         }

         function benchFilters(nData, nWorkers, to) {

             var filterFunct = $("#imgRadio :radio:checked").attr('id');
             var originalImg = $("#imgOriginal")[0];
             var singleThreadImg = $("#imgSingle")[0];
             workerImg = $("#imgWorkers")[0];
             var webClImage = $("#imgWebCl")[0];

             /*Preparing dialogs */
             singleThreadImg.height = originalImg.height;
             singleThreadImg.width = originalImg.width;
             $("#dialogSingleThread").dialog({
                 width: originalImg.width + 10,
                 heigth: originalImg.height + 10
             });

             workerImg.height = originalImg.height;
             workerImg.width = originalImg.width;
             $("#dialogWorkers").dialog({
                 width: originalImg.width + 10,
                 heigth: originalImg.height + 10
             });

             webClImage.height = originalImg.height;
             webClImage.width = originalImg.width;
             $("#dialogWorkers").dialog({
                 width: originalImg.width + 10,
                 heigth: originalImg.height + 10
             });


             gImageData = workerImg.getContext('2d').getImageData(0, 0, workerImg.width, workerImg.height);

             /* Set the global data size to the image's data size */
             gnData = gImageData.data.byteLength / (1024 * 1024);

             switch (filterFunct) {

                 case "rdGrayscale":
                     /* Single Thread Javascript */
                     var sData = Filters.filterImage(Filters.grayscale, originalImg);
                     singleThreadImg.getContext("2d").putImageData(sData, 0, 0);
                     window.performance.mark('pEnd');
                     /* Starting webCl */

                     if (isWebCLAvailable) {
                         var webclData = webClFilters.filterImage(webClFilters.grayscale, originalImg, originalImg.height, originalImg.width);
                         webClImage.getContext("2d").putImageData(webclData, 0, 0);
                         window.performance.mark('webClEnd');
                     }
                     /* Starting Workers */
                     window.performance.mark('wStart');
                     wFilters.filterImage(wFilters.grayscale, originalImg, nWorkers);

                     break;
                 case "rdBrightness":

                     /* Single Thread Javascript */
                     var sData = Filters.filterImage(Filters.brightness, originalImg, 80);
                     window.performance.mark('pEnd');
                     singleThreadImg.getContext("2d").putImageData(sData, 0, 0);


                     /* Starting Workers */
                     window.performance.mark('wStart');
                     wFilters.filterImage(wFilters.brightness, originalImg, nWorkers, 80);

                     break;
                 case "rdThreshold":

                     /* Single Thread Javascript */
                     var sData = Filters.filterImage(Filters.threshold, originalImg, 150);
                     window.performance.mark('pEnd');
                     singleThreadImg.getContext("2d").putImageData(sData, 0, 0);

                     /* Starting Workers */
                     window.performance.mark('wStart');
                     wFilters.filterImage(wFilters.threshold, originalImg, nWorkers, 150);

                     break;
                 case "rdBlur":

                     /* Single Thread Javascript */
                     var sData = Filters.blur(originalImg);
                     window.performance.mark('pEnd');
                     singleThreadImg.getContext("2d").putImageData(sData, 0, 0);

                     if (isWebCLAvailable) {
                         webClFilters.blur(originalImg);
                         window.performance.mark('webClEnd');
                     }

                     window.performance.mark('wStart');
                     wFilters.blur(originalImg, nWorkers);

                     break;
                 case "rdSharpen":

                     /* Single Thread Javascript */
                     var sData = Filters.sharpen(originalImg);
                     window.performance.mark('pEnd');
                     singleThreadImg.getContext("2d").putImageData(sData, 0, 0);

                     window.performance.mark('wStart');
                     wFilters.sharpen(originalImg, nWorkers);
                     break;


                 case "rdEdge":

                     /* Single Thread Javascript */
                     var sData = Filters.soberEdgeDetection(originalImg);
                     window.performance.mark('pEnd');

                     singleThreadImg.getContext("2d").putImageData(sData, 0, 0);
                     window.performance.mark('wStart');
                     break;
             }
         }


         /*+++++++++++++++++ SUM ARRAY FUNCTIONS ++++++++++++++++++*/
         function sumArrayPlain(arr) {

             window.performance.mark('pStart');

             var sum = 0;
             for (var i = 0; i < arr.length; i++)
                 sum += arr[i];

             pEnd = new Date().getTime();
             /* Adding data to the global array */
             window.performance.mark('pEnd');
             console.log("sumArrayPlain result: " + sum);
         }

         function sumArrayWorkers(arr, nWorkers) {

             var data = [];
             var begin = 0;
             var len = arr.length / nWorkers;

             /* Setting Up the splited array */
             for (var i = 0; i < nWorkers; i++) {
                 data.push(arr.subarray(begin, len * (i + 1)));
                 begin += len;

             }

             var p = new Parallel(data);

             function sum(a) {

                 var sum = 0;
                 for (var i = 0; i < a.length; i++)
                     sum += a[i];
                 return sum;
             }

             function add(v) {
                 return v[0] + v[1];
             }

             function post() {

                 window.performance.mark('wEnd');
                 addBars();
                 console.log("sumArrayWorkers result: " + arguments[0]);
             }

             window.performance.mark('wStart');
             p.map(sum).reduce(add).then(post);

         }

         function sumArrayWorkersTO(arr, nWorkers) {

             var data = [];
             var wPool = [];
             var begin = 0;
             var len = arr.length / nWorkers;

             var str = "self.onmessage=function(e){var sum=0;var arr = new Uint8Array(e.data);for(var i=0;i<arr.length;i++){sum+=arr[i];}postMessage(sum);}";


             /* Setting Up the splited array */
             for (var i = 0; i < nWorkers; i++) {

                 /* Creating worker pool */
                 wPool[i] = createWorkerFromString(str);
                 /* Creating subArray */
                 //data[i] = arr.buffer.subarray(begin, len * (i + 1));
                 data[i] = arr.buffer.slice(begin, len * (i + 1));
                 begin += len;

                 /* Response function */
                 wPool[i].onmessage = function(e) {
                     gAcu += e.data;
                     workCount--;
                     if (workCount == 0) {
                         window.performance.mark('pEnd');
                         addBars();
                         console.log("sumArrayWorkers Object Transfer result: " + gAcu);
                         gAcu = 0;
                     }
                 };

                 /*Counting the spawned workers */
                 workCount++;
             }

             window.performance.mark('wStart');
             for (var i = 0; i < nWorkers; i++) {

                 wPool[i].postMessage(data[i], [data[i]]);
             }
         }

         /* <<<<<<<<<<<<<< REVERSE ARRAY FUNCTIONS <<<<<<<<<<<<<<<*/
         function reverseArrayPlain(arr) {

             var swap;

             window.performance.mark('pStart');

             for (var i = 0; i < arr.length / 2; i++) {
                 swap = arr[i];
                 arr[i] = arr[arr.length - i];
                 arr[arr.length - i] = swap;
             }

             window.performance.mark('pEnd');
             console.log("reverseArrayPlain done!");

         }

         function reverseArrayWorkers(arr, nWorkers) {

             var data = [];
             var begin = 0;
             var len = arr.length / nWorkers;

             /* Setting Up the splited array */
             for (var i = 0; i < nWorkers; i++) {
                 data.push(arr.subarray(begin, len * (i + 1)));
                 begin += len;

             }

             var p = new Parallel(data);

             function reverse(a) {

                 var swap;

                 for (var i = 0; i < a.length / 2; i++) {
                     swap = a[i];
                     a[i] = a[a.length - i];
                     a[a.length - i] = swap;
                 }

                 return a;
             }

             function join(v) {

                 var c = new Int8Array(v[0].length + v[1].length);
                 c.set(v[0]);
                 c.set(v[1], v[0].length);

                 return c;
             }

             function post() {

                 window.performance.mark('pEnd');
                 addBars();
                 console.log("reverseArrayWorkers result: " + arguments[0]);
             }

             window.performance.mark('wStart');
             p.map(reverse).reduce(join).then(post);

         }
     }


 });
