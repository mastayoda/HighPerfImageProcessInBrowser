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


define(function(require, exports, module) {
    "use strict";

    var EventEmitter = require("eventEmitter"),
        adapter = require("./adapter"),
        util = require("./util");


    /**
     * The DocumentManager provides an API for keeping track of all open
     * Photoshop documents.
     *
     * Emits "documentChanged" event whenever the current document changes
     * with the following parameters
     *    1. @param {Object} the document
     *
     * @extends EventEmitter
     * @constructor
     * @private
     */
    var DocumentManager = function() {
        EventEmitter.call(this);

        /* Selected Document Event */
        adapter.on("slct-Dcmn", this._handleSelect.bind(this));
        /* Created Document Event */
        adapter.on("Mk  -Dcmn", this._handleCreate.bind(this));
        /* Open Document Event */
        /* TODO: Not enough info to create this event: PS.call('Opn ',{"null" : true}) */
        adapter.on("Opn -", this._handleOpen.bind(this));
        /* Close Document Event */
        /* TODO: Not enough info to create this event: PS.call('Cls ',{ }) */
        adapter.on("Cls -Dcmn", this._handleClose.bind(this));

    };
    util.inherits(DocumentManager, EventEmitter);

    /**
     * Event handler for low-level "slct" event.
     *
     * @private
     * @param {?} params Info about the event
     */
    DocumentManager.prototype._handleSelect = function(params) {
        if (params &&
            params["null"] &&
            params["null"].ref === "Dcmn") {
            this.getActiveDocument().then(function(doc) {
                this.emit("documentChanged", doc);
            }.bind(this));
        }
    };

    /**
     * Event handler for low-level "Nw  " event.
     *
     * @private
     * @param {?} params Info about the event
     */
    DocumentManager.prototype._handleCreate = function(params) {

        if (params &&
            params["Nw  "] &&
            params["Nw  "].obj === "Dcmn") {
            this.getActiveDocument().then(function(doc) {
                this.emit("documentCreate", doc);
            }.bind(this));
        }
    };

    /**
     * Event handler for low-level "Opn " event.
     *
     * @private
     * @param {?} params Info about the event
     */
    DocumentManager.prototype._handleOpen = function(params) {

        /* TODO:  Implement this when possible.*/
        //this.getNumberOfDocuments().then(function (numOfDocs) {
        //    this.emit("documentOpen", numOfDocs);
        //}.bind(this));

    };

    /**
     * Event handler for low-level "Cls " event.
     *
     * @private
     * @param {?} params Info about the event
     */
    DocumentManager.prototype._handleClose = function(params) {

        /* TODO:  Implement this when possible.*/


    };

    /**
     * Returns a Promise that resolves to the active document, or
     * rejects if there is no active document.
     *
     * @return {Promise.<Object|string>} The active document, or an error string
     */
    DocumentManager.prototype.getActiveDocument = function() {
        return adapter.get("Dcmn");
    };


    DocumentManager.prototype.getNumberOfDocuments = function() {
        return adapter.get("capp");
    };

    /** @type {DocumentManager} The DocumentManager singleton */
    var theDocumentManager = new DocumentManager();

    module.exports = theDocumentManager;

});