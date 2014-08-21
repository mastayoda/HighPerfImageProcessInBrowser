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
   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHE
   DEALINGS IN THE SOFTWARE.
*/

/* GLOBAL COMMON FUNCTIONS AND VAR */

var common = {

    /* Functions */
    treeConsoleOriginalJSON: null,
    treeConsoleOriginalJSON: null,
    transformTypeIDJSONToStringIDJSON: null,
    camelCaseToNormalForm: null,
    fromTypeIDToStringID: null,
    openConsoleIfClosed: null,
    initDialog: null,
    displayError: null,
    displaySuccess: null,
    colorPickerCallBack: null,

    /* Variables */
    tEditor: null,
    cEditor: null,
    eventCounter: 0,
    isTreeConsoleTransformed: false,

    /* Modules Ref */
    modules: {
        adapter: null,
        guides: null,
        event: null,
        document: null,
        PSConstants: null
    }

};

$(function() {

    common.treeConsoleOriginalJSON = function(obj) {

        var json = JSON.stringify(obj);
        var typeIDs = json.match(/(["'])((?:(?!\1)[^\\]|(?:\\\\)*\\[^\\])*)\1/g);
        var cleanTypeID;
        var strID;

        for (var i = 0; i < typeIDs.length; i++) {
            cleanTypeID = typeIDs[i].replace(/"/g, '');
            strID = common.fromTypeIDToStringID(cleanTypeID);
            if (strID != null) {
                strID = common.camelCaseToNormalForm(strID);
                json = json.replace(cleanTypeID, strID);
            } else {
                strID = common.camelCaseToNormalForm(cleanTypeID);
                json = json.replace(cleanTypeID, strID);

            }
        }

        return json;
    }


    common.transformTypeIDJSONToStringIDJSON = function(obj) {

        var json = JSON.stringify(obj);
        var typeIDs = json.match(/(["'])((?:(?!\1)[^\\]|(?:\\\\)*\\[^\\])*)\1/g);
        var cleanTypeID;
        var strID;

        for (var i = 0; i < typeIDs.length; i++) {
            cleanTypeID = typeIDs[i].replace(/"/g, '');
            strID = common.fromTypeIDToStringID(cleanTypeID);
            if (strID != null) {
                strID = common.camelCaseToNormalForm(strID);
                json = json.replace(cleanTypeID, strID);
            } else {
                strID = common.camelCaseToNormalForm(cleanTypeID);
                json = json.replace(cleanTypeID, strID);

            }
        }

        return json;
    }


    common.camelCaseToNormalForm = function(str) {

        var rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;

        return str.replace(rex, '$1$4 $2$3$5');

    }

    common.fromTypeIDToStringID = function(str) {

        tStr = common.modules.PSConstants.charIDToStringID(str);

        return tStr;
    }


    common.openConsoleIfClosed = function(console) {

        if (!console.dialog("isOpen"))
            console.dialog("open");
    }

    common.initDialog = function(containerRef, autoOpenVal, effectVal, durationVal, widthVal, heightVal) {

        containerRef.dialog({
            autoOpen: autoOpenVal,
            show: {
                effect: effectVal,
                duration: durationVal
            },
            width: widthVal,
            height: heightVal
        });

    }

    common.displayError = function(obj, msg) {

        obj.removeClass('ui-state-highlight ui-corner-all');
        obj.addClass('ui-state-error ui-corner-all');
        obj.text(msg);

    }

    common.displaySuccess = function(obj, msg) {

        obj.removeClass('ui-state-error ui-corner-all');
        obj.addClass('ui-state-highlight ui-corner-all');
        obj.text(msg);
    }

    common.adapterGet = function(str) {

        return common.modules.adapter.get(str);

    }

    common.adapterCall = function(str, params) {

        return common.modules.adapter.call(str, params);

    }



});