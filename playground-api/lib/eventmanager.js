/*
 * Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated guideation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */


define(function(require, exports, module) {
    "use strict";

    var EventEmitter = require("eventEmitter"),
        adapter = require("./adapter"),
        util = require("./util");


    /**
     * The EventManager provides an API for keeping track of all open
     * Photoshop guides.
     *
     * @extends EventEmitter
     * @constructor
     * @private
     */
    var EventManager = function() {
        EventEmitter.call(this);

        /* Selected Guide Event */
        adapter.on("nativePSEvent", this._handleGlobalEvent.bind(this));

    };
    util.inherits(EventManager, EventEmitter);

    /**
     * Event handler for low-level "Nw  " event.
     *
     * @private
     * @param {?} params Info about the event
     */
    EventManager.prototype._handleGlobalEvent = function(command, params) {

        window.nativePSEvent(command, params);

    };


    /** @type {EventManager} The EventManager singleton */
    var theEventManager = new EventManager();

    module.exports = theEventManager;

});