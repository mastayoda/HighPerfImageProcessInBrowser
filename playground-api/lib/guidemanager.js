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
     * The GuideManager provides an API for keeping track of all open
     * Photoshop guides.
     *
     * Emits "guideChanged" event whenever the current guide changes
     * with the following parameters
     *    1. @param {Object} the guide
     *
     * @extends EventEmitter
     * @constructor
     * @private
     */
    var GuideManager = function() {
        EventEmitter.call(this);

        /* Selected Guide Event */
        adapter.on("Mk  -Gd  ", this._handleCreate.bind(this));

    };
    util.inherits(GuideManager, EventEmitter);

    /**
     * Event handler for low-level "Nw  " event.
     *
     * @private
     * @param {?} params Info about the event
     */
    GuideManager.prototype._handleCreate = function(params) {

        if (params &&
            params["Nw  "] &&
            params["Nw  "].obj === "Gd  ") {
            /*  this.getActiveGuide().then(function(doc) {
                    this.emit("guideCreate", doc);
                }.bind(this));
            */
            // console.log("Guide Created");
        }
    };

    /**
     * Returns a Promise that resolves to the active guide, or
     * rejects if there is no active guide.
     *
     * @return {Promise.<Object|string>} The active guide, or an error string
     */
    GuideManager.prototype.createGuide = function(orientation, position) {

        adapter.call("Mk  ", {
            "Nw  ": {
                "obj": "Gd  ",
                "Pstn": {
                    "value": position,
                    "unit": "#Rlt"
                },
                "Ornt": {
                    "value": orientation,
                    "enumType": "Ornt"
                }
            }
        });
    };

    GuideManager.prototype.clearGuides = function() {

        adapter.call("Dlt ", {
            "null": {
                "ref": "Gd  ",
                "value": "Al  ",
                "enumType": "Ordn"
            }
        });
    };


    GuideManager.prototype.setGuidesColor = function(color) {

        /* Setting application properties */
        adapter.call("setd", {
            "T   ": {
                "obj": "GnrP",
                "legacyPathDrag": 1
            },
            "null": {
                "ref": [{
                    "ref": "capp",
                    "value": "Trgt",
                    "enumType": "Ordn"
                }, {
                    "property": "GnrP"
                }]
            }
        });

        adapter.call("setd", {
            "T   ": {
                "obj": "GdPr",
                "GdsC": {
                    "value": color,
                    "enumType": "GdGr"
                }
            },
            "null": {
                "ref": [{
                    "ref": "capp",
                    "value": "Trgt",
                    "enumType": "Ordn"
                }, {
                    "property": "GdPr"
                }]
            }
        });

    };

    GuideManager.prototype.setGuidesCustomColor = function(red, green, blue) {



        var psParams = {
            "T   ": {
                "obj": "GdPr",
                "GdsC": {
                    "value": "Cst ",
                    "enumType": "GdGr"
                },
                "Gdss": {
                    "Grn ": parseInt(green),
                    "Rd  ": parseInt(red),
                    "obj": "RGBC",
                    "Bl  ": parseInt(blue)
                }
            },
            "null": {
                "ref": [{
                    "ref": "capp",
                    "value": "Trgt",
                    "enumType": "Ordn"
                }, {
                    "property": "GdPr"
                }]
            }
        };

        console.log(psParams);

        adapter.call("setd", psParams);

    };

    GuideManager.prototype.setGuideStyle = function(style) {

        /* Setting application properties */
        adapter.call("setd", {
            "T   ": {
                "obj": "GnrP",
                "legacyPathDrag": 1
            },
            "null": {
                "ref": [{
                    "ref": "capp",
                    "value": "Trgt",
                    "enumType": "Ordn"
                }, {
                    "property": "GnrP"
                }]
            }
        });

        adapter.call("setd", {
            "T   ": {
                "obj": "GdPr",
                "GdsS": {
                    "value": style,
                    "enumType": "GdGS"
                }
            },
            "null": {
                "ref": [{
                    "ref": "capp",
                    "value": "Trgt",
                    "enumType": "Ordn"
                }, {
                    "property": "GdPr"
                }]
            }
        });

    };

    GuideManager.prototype.setSmartGuideColor = function(color) {

        /* Setting application properties */
        adapter.call("setd", {
            "T   ": {
                "obj": "GnrP",
                "legacyPathDrag": 1
            },
            "null": {
                "ref": [{
                    "ref": "capp",
                    "value": "Trgt",
                    "enumType": "Ordn"
                }, {
                    "property": "GnrP"
                }]
            }
        });

        adapter.call("setd", {
            "T   ": {
                "obj": "GdPr",
                "smartGuidesColor": {
                    "value": color,
                    "enumType": "GdGr"
                }
            },
            "null": {
                "ref": [{
                    "ref": "capp",
                    "value": "Trgt",
                    "enumType": "Ordn"
                }, {
                    "property": "GdPr"
                }]
            }
        });

    };

    GuideManager.prototype.setSmartGuidesCustomColor = function(red, green, blue) {

        /* Setting application properties */
        adapter.call("setd", {
            "T   ": {
                "obj": "GnrP",
                "legacyPathDrag": 1
            },
            "null": {
                "ref": [{
                    "ref": "capp",
                    "value": "Trgt",
                    "enumType": "Ordn"
                }, {
                    "property": "GnrP"
                }]
            }
        });

        adapter.call("setd", {
            "T   ": {
                "obj": "GdPr",
                "smartGuidesColor": {
                    "value": "Cst ",
                    "enumType": "GdGr"
                },
                "smartGuidesCustomColor": {
                    "Grn ": green,
                    "Rd  ": red,
                    "obj": "RGBC",
                    "Bl  ": blue
                }
            },
            "null": {
                "ref": [{
                    "ref": "capp",
                    "value": "Trgt",
                    "enumType": "Ordn"
                }, {
                    "property": "GdPr"
                }]
            }
        });

    };


    /** @type {GuideManager} The GuideManager singleton */
    var theGuideManager = new GuideManager();

    module.exports = theGuideManager;

});