/* Global WebCL variables */
var webclContext;
var webclHostDevices;
var webClPrograms = [];

/* Filter Object */
webClFilters = {};

/* Utility Functions */
webClFilters.getPixels = function(img) {

    var c = this.getCanvas(img.width, img.height);
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, c.width, c.height);
};

webClFilters.getCanvas = function(w, h) {
    var c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
};


webClFilters.filterImage = function(filter, image, var_args) {
    window.performance.mark('webClStart');
    var args = [this.getPixels(image)];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    return filter.apply(null, args);
};

webClFilters.dumpWebCLInfo = function() {

    cl = window.webcl;
    // let’s get all platforms on this machine
    var platforms = cl.getPlatforms();

    var report = "";

    // dump information about each platform
    for (var i = 0, il = platforms.length; i < il; ++i) {
        var p = platforms[i];
        var profile = p.getInfo(WebCL.PLATFORM_PROFILE);
        var version = p.getInfo(WebCL.PLATFORM_VERSION);
        var extensions = p.getInfo(WebCL.PLATFORM_EXTENSIONS);

        report += "profile: " + profile + "\n";
        report += "version: " + version + "\n";
        report += "extensions: " + extensions + "\n";
        report += "====================== Devices =======================\n";
        // list of devices on this platform p
        var devices = p.getDevices(WebCL.DEVICE_TYPE_ALL);

        // find appropriate device
        for (var j = 0, jl = devices.length; j < jl; ++j) {
            var d = devices[j];
            var devExts = d.getInfo(WebCL.DEVICE_EXTENSIONS);
            var devGMem = d.getInfo(WebCL.DEVICE_GLOBAL_MEM_SIZE);
            var devLMem = d.getInfo(WebCL.DEVICE_LOCAL_MEM_SIZE);
            var devCompUnits = d.getInfo(WebCL.DEVICE_MAX_COMPUTE_UNITS);
            var dev_hasImage = d.getInfo(WebCL.DEVICE_IMAGE_SUPPORT);
            var devHasImage = d.getInfo(WebCL.DEVICE_IMAGE_SUPPORT);

            // select device that match your requiremenents
            report += "Device Name: " + d.getInfo(cl.DEVICE_NAME) + "\n";
            switch (d.getInfo(WebCL.DEVICE_TYPE)) {
                case webcl.DEVICE_TYPE_CPU:
                    report += "Device Type: CPU\n";
                    break;
                case webcl.DEVICE_TYPE_GPU:
                    report += "Device Type: GPU\n";
                    break;
                case webcl.DEVICE_TYPE_ACCELERATOR:
                    report += "Device Type: WEBCL DEDICATED ACCELERATOR\n";
                    break;
            }

            report += "Device Extensions: " + devExts + "\n";
            report += "********************\n";
            report += "Device Global Memory: " + devGMem + "\n";
            report += "Device Local Memory: " + devLMem + "\n";
            report += "Device Computing Units: " + devCompUnits + "\n";
            report += "Device has Image(texture): " + dev_hasImage + "\n";
            report += "-------------------------------------------------\n";
        }


    }

    alert(report);
}

webClFilters.initWebCL = function() {

    /* Check webCL Availability */
    if (window.webcl == undefined) {
        alert("Unfortunately your system does not support WebCL. " +
            "Make sure that you have both the OpenCL driver " +
            "and the WebCL browser extension installed.");
        return false;
    }



    // Setup WebCL context using the default device
    webclContext = webcl.createContext();
    // Extracting System's host devices, i.e. graphics cards, processor, etc.
    webclHostDevices = webclContext.getInfo(WebCL.CONTEXT_DEVICES);

    var wholeKernel = filtersKernelSrc.grayscale + " " + filtersKernelSrc.convolute;

    // Creating a program for every device
    for (var i = 0; i < webclHostDevices.length; i++) {
        try {
            // Creating the program
            webClPrograms[i] = webclContext.createProgram(wholeKernel);
            // Building the program for the device
            webClPrograms[i].build([webclHostDevices[i]], "");
        } catch (e) {
            alert("Failed to build WebCL program. Error " + e.toString());
            /*webClPrograms[i].getBuildInfo(webclHostDevices[i],
                WebCL.PROGRAM_BUILD_STATUS) + ":  " + webClPrograms[i].getBuildInfo(webclHostDevices[i],
                WebCL.PROGRAM_BUILD_LOG));*/
            //throw e;
        }
    }

    /* WebCL availability flag */
    isWebCLAvailable = true;

}


/* Filter Functions */
webClFilters.grayscale = function(pixels, h, w) {

    window.performance.mark('webClpreparationStart');
    /* Index of the device */
    var i = document.getElementById("slctHostDevice").selectedIndex;

    var bufIn = webclContext.createBuffer(WebCL.MEM_READ_ONLY, pixels.data.byteLength);
    var bufOut = webclContext.createBuffer(WebCL.MEM_WRITE_ONLY, pixels.data.byteLength);

    // Create kernel and set arguments
    var kernel = webClPrograms[i].createKernel("grayscale");
    kernel.setArg(0, bufIn);
    kernel.setArg(1, bufOut);
    kernel.setArg(2, new Uint32Array([w]));
    kernel.setArg(3, new Uint32Array([h]));

    // Create command queue using the first available device
    var cmdQueue = webclContext.createCommandQueue(webclHostDevices[i]);
    // Write the buffer to OpenCL device memory
    cmdQueue.enqueueWriteBuffer(bufIn, false, 0, pixels.data.byteLength, pixels.data);


    // Init ND-range 
    var localWS = [16, 4];
    var globalWS = [Math.ceil(w / localWS[0]) * localWS[0],
        Math.ceil(h / localWS[1]) * localWS[1]
    ];

    window.performance.mark('webClpreparationEnd');


    window.performance.mark('webClExecutionStart');
    // Execute (enqueue) kernel
    cmdQueue.enqueueNDRangeKernel(kernel, 2, null,
        globalWS, localWS);
    window.performance.mark('webClExecutionEnd');


    // Read the result buffer from OpenCL device
    window.performance.mark('webClReadBufferStart');
    cmdQueue.enqueueReadBuffer(bufOut, false, 0, pixels.data.byteLength, pixels.data);
    window.performance.mark('webClReadBufferEnd');
    cmdQueue.finish(); //Finish all the operations

    return pixels;
};


webClFilters.convolute = function(pixels, weights, h, w) {

    var data = pixels.data;

    window.performance.mark('webClpreparationStart');
    /* Index of the device */
    var i = document.getElementById("slctHostDevice").selectedIndex;

    // create a 32-bit RGBA WebCLImage object
    // first, we define the format of the image
    /*var InputFormat = {
        'order': WebCL.RGBA,
        'data_type': WebCL.UNSIGNED_INT8,
        'size': [w, h]
    };
    */

    // Image on device
    //var image = webclContext.createImage(WebCL.MEM_READ_ONLY, InputFormat, data);

    var bufIn = webclContext.createBuffer(WebCL.MEM_READ_ONLY, data.byteLength);
    var bufFilt = webclContext.createBuffer(WebCL.MEM_READ_ONLY, weights.byteLength);
    var bufOut = webclContext.createBuffer(WebCL.MEM_WRITE_ONLY, data.byteLength);

    // Create kernel and set arguments
    var kernel = webClPrograms[i].createKernel("Convolve");
    kernel.setArg(0, bufIn);
    kernel.setArg(1, bufFilt);
    kernel.setArg(2, bufOut);
    kernel.setArg(3, new Uint32Array([w]));
    kernel.setArg(4, new Uint32Array([3]));

    // Create command queue using the first available device
    var cmdQueue = webclContext.createCommandQueue(webclHostDevices[i]);
    // Write the buffer to OpenCL device memory
    cmdQueue.enqueueWriteBuffer(bufIn, false, 0, data.byteLength, data);
    cmdQueue.enqueueWriteBuffer(bufFilt, false, 0, weights.byteLength, weights);


    // Init ND-range 

    var localWS = [16, 4];
    var globalWS = [Math.ceil(w / localWS[0]) * localWS[0],
        Math.ceil(h / localWS[1]) * localWS[1]
    ];

    /*
    var localWS = [];
    var globalWS = [];
    localWS[0] = kernel.getWorkGroupInfo(webclHostDevices[i], WebCL.KERNEL_PREFERRED_WORK_GROUP_SIZE_MULTIPLE);
    localWS[1] = kernel.getWorkGroupInfo(webclHostDevices[i], WebCL.KERNEL_WORK_GROUP_SIZE) / localWS[0];
    globalWS[0] = localWS[0] * divUp(w, localWS[0]);
    globalWS[1] = localWS[1] * divUp(h, localWS[1]);
    */


    window.performance.mark('webClpreparationEnd');


    window.performance.mark('webClExecutionStart');
    // Execute (enqueue) kernel
    cmdQueue.enqueueNDRangeKernel(kernel, 2, null, globalWS, localWS);
    window.performance.mark('webClExecutionEnd');


    // Read the result buffer from OpenCL device
    window.performance.mark('webClReadBufferStart');
    cmdQueue.enqueueReadBuffer(bufOut, false, 0, data.byteLength, pixels.data);
    window.performance.mark('webClReadBufferEnd');
    cmdQueue.finish(); //Finish all the operations

    return pixels;
};

function divUp(x, y) {
    return (x % y == 0) ? (x / y) : (x / y + 1);
}


webClFilters.blur = function(image) {

    return webClFilters.filterImage(webClFilters.convolute, image, new Float32Array([1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]), image.height, image.width);

};

webClFilters.sharpen = function(image) {

    return webClFilters.filterImage(webClFilters.convolute, image, new Float32Array([0, -1, 0, -1, 5, -1, 0, -1, 0]), image.height, image.width);

};





/* FILTERS KERNELS */

var filtersKernelSrc = {};
filtersKernelSrc.convolute = "__kernel void Convolve(const __global  float * pInput," + "\n                        __constant float * pFilter," + "\n                        __global  float * pOutput," + "\n                        const int nInWidth," + "\n                        const int nFilterWidth)" + "\n{" + "\n    const int nWidth = get_global_size(0);" + "\n" + "\n    const int xOut = get_global_id(0);" + "\n    const int yOut = get_global_id(1);" + "\n" + "\n    const int xInTopLeft = xOut;" + "\n    const int yInTopLeft = yOut;" + "\n" + "\n    float sum = 0;" + "\n    for (int r = 0; r < nFilterWidth; r++)" + "\n    {" + "\n        const int idxFtmp = r * nFilterWidth;" + "\n" + "\n        const int yIn = yInTopLeft + r;" + "\n        const int idxIntmp = yIn * nInWidth + xInTopLeft;" + "\n" + "\n        for (int c = 0; c < nFilterWidth; c++)" + "\n        {" + "\n            const int idxF  = idxFtmp  + c;" + "\n            const int idxIn = idxIntmp + c;" + "\n            sum += pFilter[idxF]*pInput[idxIn];" + "\n        }" + "\n    }" + "\n    const int idxOut = yOut * nWidth + xOut;" + "\n    pOutput[idxOut] = sum;" + "\n}";
filtersKernelSrc.grayscale = "__kernel void grayscale(global const uchar4* src,                           global uchar4* dst,                           uint width,                            uint height){    uint x = get_global_id(0);    uint y = get_global_id(1);    if (x >= width || y >= height) return;    int i = y * width + x;    uchar4 color = src[i];    uchar grayscl = (uchar)(0.2126f * color.x + 0.7152f * color.y + 0.0722f * color.z); dst[i] = src[i]; dst[i].x = grayscl;dst[i].y = grayscl; dst[i].z = grayscl;}";


{}