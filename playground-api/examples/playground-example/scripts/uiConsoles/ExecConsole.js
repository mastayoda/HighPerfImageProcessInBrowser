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

    common.initDialog($("#divExecConsole"), false, "bounce", 500, 950, 830);
    $("#divExecConsole").css("background-color", "white");


    /* GET/CALL RADIOS SETUP */
    $("#radio").buttonset().click(function(event) {

        if ($('#rdbCall').is(':checked')) {
            common.openConsoleIfClosed($("#divJsonCodeConsole"));
        } else if ($('#rdbGet').is(':checked')) {
            common.openConsoleIfClosed($("#divJsonTreeConsole"));
        }

    });;

    /*BIG TABLE EVENTS BINDINGS */
    window.initializeTable = function() {

        $(".btnconst").button().click(function(event) {
            console.log($(this).text());
        });

        $(".btnTypeID").button().click(function(event) {
            console.log($(this).text());
        });

        $(".btnCharID").button().click(function(event) {


            if ($('#rdbGet').is(':checked')) {

                common.adapterGet($(this).text()).then(function(obj) {

                    if (typeof(obj) === "string") {
                        common.displayError($("#spnExecutionMessage"), obj);
                        common.tEditor.set(null);

                    } else {

                        common.displaySuccess($("#spnExecutionMessage"), "Get " + $(this).text() + " Sucessful!");
                        common.tEditor.set(obj);
                    }
                }.bind(this));

            } else if ($('#rdbCall').is(':checked')) {

                common.adapterCall($(this).text(), common.cEditor.get()).then(function(obj) {

                    common.displaySuccess($("#spnExecutionMessage"), "Call " + $(this).text() + " Sucessful!");

                }.bind(this));
            }

        });

        $(".btnStringID").button().click(function(event) {
            console.log($(this).text());
        });
    }

});