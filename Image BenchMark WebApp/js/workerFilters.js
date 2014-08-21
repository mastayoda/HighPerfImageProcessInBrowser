/* Filter Object */
wFilters = {};

/* Utility Functions */
wFilters.getPixels = function(img, n) {
    /* Splited Pixel Data Object*/
    var data = [];

    /* Transforming the image into a canvas in order to extract data */
    var c = this.getCanvas(img.width, img.height);
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    /* Calculating the size of n horizontal image frames */
    var imgHeight = c.height

    /* Spliting array in multiples of n */
    while ((imgHeight % n) != 0)
        imgHeight--;

    var hFrameHeight = imgHeight / n;

    /* Setting Up the splited array */
    for (var i = 0; i < n; i++) {
        data.push(ctx.getImageData(0, hFrameHeight * i, c.width, hFrameHeight).data);
    }

    /* Pushing the last image chunk  (top left x, top left y, full width, remaining height)*/
    if ((c.height % n) != 0)
        data.push(ctx.getImageData(0, hFrameHeight * data.length, c.width, (c.height - hFrameHeight * data.length)).data);

    return data;
};

wFilters.getCanvas = function(w, h) {
    var c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
};

wFilters.filterImage = function(filter, image, n, var_args) {

    window.performance.mark('splitingStart');
    var args = [this.getPixels(image, n)];
    window.performance.mark('splitingEnd');

    for (var i = 3; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    return filter.apply(null, args);
};

/* Filter Functions */
wFilters.grayscale = function(pixels) {

    window.performance.mark('threadPrepStart');
    var wPool = [];

    /* Worker Array Function */
    var strf = "self.onmessage=function(p){var d = new Uint8ClampedArray(p.data.arr);for(var i=0;i<d.byteLength;i+=4){var r=d[i];var g=d[i+1];var b=d[i+2];var v=0.2126*r+0.7152*g+0.0722*b;d[i]=d[i+1]=d[i+2]=v}postMessage({'index':p.data.index,'pixels':d.buffer},[d.buffer]);}";

    for (var i = 0; i < pixels.length; i++) {

        /* Creating worker pool */
        wPool[i] = createWorkerFromString(strf);

        /* Response function */
        wPool[i].onmessage = function(e) {
            gSplitedArrays[e.data.index] = e.data.pixels;
            workCount--;
            if (workCount == 0) {
                window.performance.mark('mergeStart');
                var wData = mergeArrays();
                window.performance.mark('mergeEnds');

                window.performance.mark('renderChangesStart');
                gImageData.data.set(wData);

                workerImg.getContext("2d").putImageData(gImageData, 0, 0);
                window.performance.mark('renderChangesEnd');
                /* Adding Benchmark Graph Bars */
                window.performance.mark('wEnd');
                addBars();
                reportMarks();
            }
        };
        /*Counting the spawned workers */
        workCount++;
    }

    for (var i = 0; i < pixels.length; i++) {
        wPool[i].postMessage({
            'index': i,
            'arr': pixels[i].buffer
        }, [pixels[i].buffer]);
    }

    window.performance.mark('threadPrepEnd');


};


wFilters.brightness = function(pixels, adjustment) {

    window.performance.mark('threadPrepStart');
    var wPool = [];

    /* Worker Array Function */
    var strf = "self.onmessage=function(e){var t=new Uint8ClampedArray(e.data.arr);for(var n=0;n<t.byteLength;n+=4){t[n]+=e.data.adjustment;t[n+1]+=e.data.adjustment;t[n+2]+=e.data.adjustment}postMessage({index:e.data.index,pixels:t.buffer},[t.buffer])}";

    for (var i = 0; i < pixels.length; i++) {

        /* Creating worker pool */
        wPool[i] = createWorkerFromString(strf);

        /* Response function */
        wPool[i].onmessage = function(e) {
            gSplitedArrays[e.data.index] = e.data.pixels;
            workCount--;
            if (workCount == 0) {
                window.performance.mark('mergeStart');
                var wData = mergeArrays();
                window.performance.mark('mergeEnds');

                window.performance.mark('renderChangesStart');
                gImageData.data.set(wData);

                workerImg.getContext("2d").putImageData(gImageData, 0, 0);
                window.performance.mark('renderChangesEnd');
                /* Adding Benchmark Graph Bars */
                window.performance.mark('wEnd');
                addBars();
                reportMarks();
            }
        };
        /*Counting the spawned workers */
        workCount++;
    }

    for (var i = 0; i < pixels.length; i++) {
        wPool[i].postMessage({
            'index': i,
            'arr': pixels[i].buffer,
            'adjustment': adjustment,
        }, [pixels[i].buffer]);
    }

    window.performance.mark('threadPrepEnd');

};


wFilters.threshold = function(pixels, threshold) {
    window.performance.mark('threadPrepStart');
    var wPool = [];

    /* Worker Array Function */
    var strf = "self.onmessage=function(t){var n=new Uint8ClampedArray(t.data.arr);for(var r=0;r<n.byteLength;r+=4){var i=n[r];var s=n[r+1];var o=n[r+2];var u=.2126*i+.7152*s+.0722*o>=t.data.threshold?255:0;n[r]=n[r+1]=n[r+2]=u}postMessage({index:t.data.index,pixels:n.buffer},[n.buffer])}";

    for (var i = 0; i < pixels.length; i++) {

        /* Creating worker pool */
        wPool[i] = createWorkerFromString(strf);

        /* Response function */
        wPool[i].onmessage = function(e) {
            gSplitedArrays[e.data.index] = e.data.pixels;
            workCount--;
            if (workCount == 0) {
                window.performance.mark('mergeStart');
                var wData = mergeArrays();
                window.performance.mark('mergeEnds');

                window.performance.mark('renderChangesStart');
                gImageData.data.set(wData);

                workerImg.getContext("2d").putImageData(gImageData, 0, 0);
                window.performance.mark('renderChangesEnd');
                /* Adding Benchmark Graph Bars */
                window.performance.mark('wEnd');
                addBars();
                reportMarks();
            }
        };
        /*Counting the spawned workers */
        workCount++;
    }

    for (var i = 0; i < pixels.length; i++) {
        wPool[i].postMessage({
            'index': i,
            'arr': pixels[i].buffer,
            'threshold': threshold,
        }, [pixels[i].buffer]);
    }

    window.performance.mark('threadPrepEnd');

};

/* Convolute Algorithms */
wFilters.tmpCanvas = document.createElement('canvas');
wFilters.tmpCtx = wFilters.tmpCanvas.getContext('2d');

wFilters.createImageData = function(w, h) {
    return this.tmpCtx.createImageData(w, h);
};

wFilters.convolute = function(pixels, weights, h, w) {

    window.performance.mark('threadPrepStart');
    var wPool = [];

    /* Worker Array Function */
    var strf = "self.onmessage=function(p){var side=Math.round(Math.sqrt(p.data.weights.length));var halfSide=Math.floor(side/2);var src=new Uint8ClampedArray(p.data.arr);var sw=p.data.w;var sh=p.data.h;var w=sw;var h=sh;var dst=new Uint8ClampedArray(src.byteLength);var alphaFac=false?1:0;for(var y=0;y<h;y++){for(var x=0;x<w;x++){var sy=y;var sx=x;var dstOff=(y*w+x)*4;var r=0,g=0,b=0,a=0;for(var cy=0;cy<side;cy++){for(var cx=0;cx<side;cx++){var scy=sy+cy-halfSide;var scx=sx+cx-halfSide;if(scy>=0&&scy<sh&&scx>=0&&scx<sw){var srcOff=(scy*sw+scx)*4;var wt=p.data.weights[cy*side+cx];r+=src[srcOff]*wt;g+=src[srcOff+1]*wt;b+=src[srcOff+2]*wt;a+=src[srcOff+3]*wt}}}dst[dstOff]=r;dst[dstOff+1]=g;dst[dstOff+2]=b;dst[dstOff+3]=a+alphaFac*(255-a)}}postMessage({index:p.data.index,pixels:dst.buffer},[dst.buffer]);}";

    for (var i = 0; i < pixels.length; i++) {

        /* Creating worker pool */
        wPool[i] = createWorkerFromString(strf);

        /* Response function */
        wPool[i].onmessage = function(e) {
            gSplitedArrays[e.data.index] = e.data.pixels;
            workCount--;
            if (workCount == 0) {
                window.performance.mark('mergeStart');
                var wData = mergeArrays();
                window.performance.mark('mergeEnds');

                window.performance.mark('renderChangesStart');
                gImageData.data.set(wData);

                workerImg.getContext("2d").putImageData(gImageData, 0, 0);
                window.performance.mark('renderChangesEnd');
                /* Adding Benchmark Graph Bars */
                window.performance.mark('wEnd');
                addBars();
                reportMarks();
            }
        };
        /*Counting the spawned workers */
        workCount++;
    }

    for (var i = 0; i < pixels.length; i++) {
        wPool[i].postMessage({
            'index': i,
            'arr': pixels[i].buffer,
            'w': w,
            'h': h,
            'weights': weights,
        }, [pixels[i].buffer]);
    }

    window.performance.mark('threadPrepEnd');

};

wFilters.blur = function(image, n) {

    return wFilters.filterImage(wFilters.convolute, image, n, [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9], image.height, image.width);

};

wFilters.sharpen = function(image, n) {

    return wFilters.filterImage(wFilters.convolute, image, n, [0, -1, 0, -1, 5, -1, 0, -1, 0], image.height, image.width);

};