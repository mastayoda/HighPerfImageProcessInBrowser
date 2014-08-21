/*
   Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
    
   Permission is hereby granted, free of charge, to any person obtaining a
   copy of this software and associated documentation files (the "Software"),
   to deal in the Software without restriction, including without limitation
   the rights to use, copy, modify, merge, publish, distribute, sublicense,
   and/or sell copies of the Software, and to permit persons to whom the
   Software is furnished to do so, subject to the following conditions:
    
   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.
    
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
   DEALINGS IN THE SOFTWARE.
*/

define(["./Image_io"], function(imageio) {
    "use strict";



    /* Constructor */
    var HalemsUtils = function() {

    };

    /* Adding image_io module */
    HalemsUtils.prototype.imageio = imageio;

    /* LLVM data types enumerator */
    HalemsUtils.prototype.results = {
        'SUCCESS': true,
        'ERROR': false,
    }

    /* LLVM data types enumerator */
    HalemsUtils.prototype.llvmDataType = {
        'i1': 'i1',
        'i8': 'i8',
        'i16': 'i16',
        'i32': 'i32',
        'i64': 'i64',
        'float': 'float',
        'double': 'double'
    }

    /* Image size types */
    HalemsUtils.prototype.imageType = {
        'uint8_t': 8,
        'uint16_t': 16,
        'uint32_t': 32,
    }

    /**
     * Converts an HTML image object to canvas.
     *
     * @param {Image} Image to be converted to canvas.
     * @return {Canvas} The new Canvas from the provided image.
     */
    HalemsUtils.prototype.transformImageToCanvas = function(img) {

        /* Validations */
        if (!(img instanceof HTMLImageElement)) {
            throw new Error(img + ": First parameter{image} must be a valid html image instance");
            return;
        }

        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);

        return canvas;
    }

    /**
     * Converts an HTML Canvas object to html image.
     *
     * @param {Cavas} Canvas to be converted to image.
     * @return {Image} The new image from the provided canvas.
     */
    HalemsUtils.prototype.transformCanvasToImage = function(canvas) {

        /* Validations */
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error(canvas + ": First parameter{canvas} must be a valid html canvas instance");
            return;
        }

        var image = new Image();
        image.src = canvas.toDataURL("image/png");

        return image;
    }

    /**
     */
    HalemsUtils.prototype.transformNativeImageToHtmlImage = function(img) {

        /* Creating Intermediate Canvas */
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        var imageData = ctx.getImageData(0, 0, img.width, img.height);

        /* Loading the native buffer */
        img = this.loadtNativeBuffer(img);
        /* Transforming image data */
        imageData = this.transformNativeBufferToImageData(img.data, imageData);

        /* Setting the new image data */
        ctx.putImageData(imageData, 0, 0);

        return this.transformCanvasToImage(canvas);
    }

    /**
     * Copies a Halide native buffer array(buffer_t's host pointer field) to a Canva's
     * 2d context image data.
     *
     * @param {nbuffer} Array of native bytes.
     * @param {imageData} A canvas imageData object.
     * @return {imageData} The imageData with native bytes.
     */
    HalemsUtils.prototype.transformNativeBufferToImageData = function(nbuffer, imageData) {

        /* Validations */
        if (!(nbuffer instanceof Uint8Array)) {
            throw new Error(nbuffer + ": First parameter{nbuffer} must be a valid integer Array");
            return;
        }

        if (imageData.constructor != ImageData) {
            throw new Error(imageData + ": Second parameter{imageData} must be a valid canvas ImageData");
            return;
        }

        var data = imageData.data;

        /* Calculating the Strides of native buffer */
        var stride = nbuffer.length / 4;
        var nCount = 0;

        /* Copying native buffer to new canvas buffer */
        for (var i = 0; i < data.length; i += 4) {

            /* First Stride */
            data[i] = nbuffer[nCount];

            /* Second Stride */
            data[i + 1] = nbuffer[nCount + stride];

            /* Third Stride */
            data[i + 2] = nbuffer[nCount + stride * 2];

            /* Forth Stride */
            data[i + 3] = nbuffer[nCount + stride * 3];

            nCount++;
        }

        /* Return new image data */
        return imageData;
    }


    /**
     * Converts an HTML image object to canvas.
     *
     * @param {Integer} Low level memory address integer.
     * @param {Image} Image to be converted to canvas.
     * @return {value} The requested pointer value.
     */
    HalemsUtils.prototype.getNativePointerValue = function(ptr, type) {

        /* Validations */
        if (typeof ptr != 'number' || ptr % 1 == 0) {

            throw new Error(ptr + ": First parameter{ptr} must be an integer");
            return;
        }

        if (type != 'i1' || type != 'i8' || type != 'i16' || type != 'i32' || type != 'i64' || type != 'float' || type != 'double') {

            throw new Error(type + ": Second parameter{type} must be a valid llvm primitive data type. See the 'llvmDataType' property of HalemsUtils");
            return;
        }

        return imageio.getValue(ptr, type);

    }

    /**
     * Reads image from emscripten filesystem and returns a new HTML image object.
     *
     * @param {filename} The filename(including path and extension).
     * @return {img} The new HTML image object.
     */
    HalemsUtils.prototype.readImageFromFileSystem = function(filename) {

        if (imageio.FS.root.contents[filename] == undefined) {

            throw new Error(filename + ": File not found. Verify that you include the full path and correct file name including extension");
            return;
        }

        var data = imageio.FS.root.contents[filename].contents;
        data.map = [].map;
        data = data.map(function(x) {
            return String.fromCharCode(unSign(x, 8));
        }).join('');
        var img = document.createElement('img');
        img.src = 'data:image/png;base64,' + btoa(data);

        return img;
    }

    /**
     * Write image to emscripten's filesystem.
     *
     * @param {img} The filename(including path and extension).
     * @param {path} The filename(including path and extension).
     * @return {img} The new HTML image object.
     */
    HalemsUtils.prototype.writeImageToFileSystem = function(img, path, filename) {

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var data;
        var binaryData;
        var file;

        /* Validations */
        if (!(img instanceof HTMLImageElement)) {
            throw new Error(image + ": First parameter{image} must be a valid html image instance");
            return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        data = canvas.toDataURL("image/png");

        /* Extracting the image hex data, decoding the base-64 string, and returning an array of characters */
        data = atob(data.substr(data.indexOf(',') + 1)).split("");

        /* Allocating array size for better performance */
        binaryData = new Array(data.length);

        /* Decoding characters into bytes */
        for (var i = 0; i < data.length; i++) {
            binaryData[i] = data[i].charCodeAt(0);
        }

        /* Creating file */
        file = imageio.FS.createDataFile(path, filename, binaryData, true, true);

        return file;

    }


    /**
     * Allocate a new native image to be processed by Halide's functions.
     *
     * @param {filename} The filename(including path and extension).
     * @param {type} The native image type. This is necessary for size specifications.
     * @return {img} A javascript object representing the native image.
     */
    HalemsUtils.prototype.allocateNativeImage = function(filename, type) {

        var img;

        if (imageio.FS.root.contents[filename] == undefined) {

            throw new Error(filename + ": File not found. Verify that you include the full path and correct file name including extension");
            return;
        }

        if (type != 8 && type != 16 && type != 32) {

            throw new Error(type + ": Second parameter{type} must be a valid image type. See the 'imageType' property of HalemsUtils");
            return;
        }

        img = JSON.parse(imageio.loadImage(filename, type));

        if (!(img instanceof Object)) {

            throw new Error("Error allocating native image. Aborting.");
            return;
        }

        return img;
    }

    /**
     * Allocate a new native image to be processed by Halide's functions.
     *
     * @param {img} A javascript object representing the native image.
     * @param {type} The native image type. This is necessary for size specifications.
     */
    HalemsUtils.prototype.deallocateNativeImage = function(img, type) {

        var img;
        var result;

        if (type != 'uint8_t' || type != 'uint16_t' || type != 'uint32_t') {

            throw new Error(type + ": Second parameter{type} must be a valid image type. See the 'imageType' property of HalemsUtils");
            return;
        }

        result = imageio.destroyImage(Number(img.internals.imagePtr), Number(img.internals.jsonStrPtr), type);

        if (result != 1) {

            throw new Error("Error deallocating native image. Make sure you pass a native image object via parameter. Details: " + err);
            return;
        }

    }

    /**
     * Allocate a new native image to be processed by Halide's functions.
     *
     * @param {img} A javascript object representing the native image.
     * @param {type} The native image type. This is necessary for size specifications.
     */
    HalemsUtils.prototype.loadtNativeBuffer = function(img) {

        var size = img.internals.buffer_t.stride[3];
        var ptr = img.internals.buffer_t.host;

        img.data = new Uint8Array(this.imageio.HEAPU8.buffer, ptr, size);

        return img;
    }

    return new HalemsUtils();
});