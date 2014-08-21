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

$(function() {

    common.initDialog($("#divDevConsole"), false, "bounce", 500, 700, 500);

    /* TABS SETUP */
    $("#tabs").tabs({});

    /* TOOLS BUTTON EVENTS */
    $("#btnOpenConsole").button().click(function(event) {

        common.openConsoleIfClosed($("#divDevConsole"));

    });

    $("#btnJsonShowCodeConsole").button().click(function(event) {

        common.openConsoleIfClosed($("#divJsonCodeConsole"));

    });

    $("#btnEventListenerConsole").button().click(function(event) {

        common.openConsoleIfClosed($("#divEventListenerConsole"));

    });

    $("#btnEventLeapMotionConsole").button().click(function(event) {

        common.openConsoleIfClosed($("#divLeapMotionConsole"));

    });


    $("#btnJsonShowCodeConsole").button().click(function(event) {

        common.openConsoleIfClosed($("#divJsonCodeConsole"));

    });

    $("#btnEventListenerConsole").button().click(function(event) {

        common.openConsoleIfClosed($("#divEventListenerConsole"));

    });

    $("#btnEventLeapMotionConsole").button().click(function(event) {

        common.openConsoleIfClosed($("#divLeapMotionConsole"));

    });

    $("#btnBenchMark").button().click(function(event) {

    });

    $("#btnColorPicker").button().click(function(event) {

        common.openConsoleIfClosed($("#divColorPicker"));

    });

    $("#btnCallExecutor").button().click(function(event) {

        if (!window.dialogHasBeenOpened) {
            window.initializeTable();
            dialogHasBeenOpened = true;
        }

        common.openConsoleIfClosed($("#divExecConsole"));

        /* Get is selected by default so open the JSON tree console */
        common.openConsoleIfClosed($("#divJsonTreeConsole"));

    });

    $("#btnJsonShowTreeConsole").button().click(function(event) {

        common.openConsoleIfClosed($("#divJsonTreeConsole"));

    });


    /* API BUTTON EVENTS */
    $("#btnApplication").button().click(function(event) {
        common.openConsoleIfClosed($("#divApplicationConsole"));
    });

    $("#btnDocument").button().click(function(event) {
        common.openConsoleIfClosed($("#divDocumentConsole"));
    });

    $("#btnPreferences").button().click(function(event) {
        common.openConsoleIfClosed($("#divPreferencesConsole"));
    });

    $("#btnNotifier").button().click(function(event) {
        common.openConsoleIfClosed($("#divNotifierConsole"));
    });

    $("#btnGuides").button().click(function(event) {
        common.openConsoleIfClosed($("#divGuidesConsole"));

    });

    $("#btnLayers").button().click(function(event) {
        common.openConsoleIfClosed($("#divLayersConsole"));
    });

    $("#btnUnduandHistory").button().click(function(event) {
        common.openConsoleIfClosed($("#divUndoAndHistoryConsole"));
    });

    $("#btnVectorDrawing").button().click(function(event) {
        common.openConsoleIfClosed($("#divVectorDrawingConsole"));
    });

});