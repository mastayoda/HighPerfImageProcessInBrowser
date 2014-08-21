/*
 * Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
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

/* global require */

require.config({
    baseUrl: "../../",
    packages: [{
        name: "playground",
        location: "lib"
    }],
    paths: {
        "bluebird": "bower_components/bluebird/js/browser/bluebird",
        "eventEmitter": "bower_components/eventEmitter/EventEmitter"
        // "jquery": "node_modules/jquery/dist/jquery"
    }
});

define(function(require) {
    "use strict";

    var playground = require("playground"),
        adapter = require("playground/adapter"),
        guide = require("playground/guidemanager"),
        eventm = require("playground/eventmanager"),
        dm = require("playground/documentmanager"),
        psCons = require("playground/PSConstants");
    //$ = require("jquery");

    var _setup = function() {

        adapter.log("Version: " + playground.version);
        dm.getActiveDocument().then(function(doc) {
            adapter.log("Current document name: " + doc["Ttl "]);
        });

        dm.on("documentChanged", function(doc) {
            adapter.log("Doc changed to " + doc["Ttl "]);
            var docNameText = document.getElementsByClassName("doc-name-text")[0];
            if (docNameText) {
                docNameText.innerText = doc["Ttl "];
            }
        });

        dm.on("documentCreate", function(doc) {
            adapter.log("Doc Created and changed to " + doc["Ttl "]);
            var docNameText = document.getElementsByClassName("doc-name-text")[0];
            if (docNameText) {
                docNameText.innerText = "Just Created: " + doc["Ttl "];
            }
        });

        dm.on("documentOpen", function(numOfDocs) {

            var docNameText = document.getElementsByClassName("doc-name-text")[0];
            if (docNameText) {
                docNameText.innerText = "Number of open docs is " + numOfDocs["NmbD"];
            }
        });

        if (document.readyState === "complete") {
            _setup();
        } else {
            window.addEventListener("load", _setup);
        }
    }
});