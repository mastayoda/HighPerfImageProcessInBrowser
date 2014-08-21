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

    common.initDialog($("#divEventListenerConsole"), false, "bounce", 500, 1150, 600);

    function appendEventRow(cmd, origCmd, str, origStr) {

        var formatStr = JSON.stringify(origStr, undefined, 2);
        var code = "<pre><code id='cod" + common.eventCounter + "'>function " + cmd + "_(){\nadapter.call(\"" + origCmd + "\",\n" + formatStr + ");\n}</code></pre>";
        var rowBGColor = (common.eventCounter % 2 == 0) ? "#0099ff" : "#7657de";
        var tdContent = '<td>' + (common.eventCounter + 1) + '</td><td>' + cmd + '</td><td><br><div id="evt' + common.eventCounter + 'tsfm"></div><br></td>' + '<td><div id="evt' + common.eventCounter + 'orgl"></div></td><<td style="text-align: left;">' + code + '</td>';
        var rowContent = '<tr id="event' + common.eventCounter + '" style="background-color:' + rowBGColor + '">' + tdContent + '</tr>';
        $("#tblEventList > tbody:last").append(rowContent);

        var container = document.getElementById('evt' + common.eventCounter + 'tsfm');
        var editor = new JSONEditor(container, {
            mode: 'tree'
        });


        /* Expanding Transformed editors */
        editor.setText(str);
        editor.setName(cmd);
        editor.expandAll();


        var container = document.getElementById('evt' + common.eventCounter + 'orgl');
        var editor = new JSONEditor(container, {
            mode: 'tree',
        });

        /* Expanding original editors */
        editor.set(origStr);
        editor.setName(origCmd)
        editor.expandAll()

        /*Scroll down container */
        scrollContent($("#divEventListenerConsole"), "down");


        /* Syntax Highlighting Code Blocks */
        $('#cod' + common.eventCounter).each(function(i, e) {
            hljs.highlightBlock(e)
        });

        /* Event Counter */
        common.eventCounter++;
    }



    function scrollContent(container, direction) {

        container.scrollTop(container.prop("scrollHeight"));
    }


    $("#btnClearEventList").button().click(function(event) {

        $("#tblEventList > tbody").html("");

    });

    /* EVENTS BINDING */
    function psEvent(command, params) {

        var transformedParams = common.transformTypeIDJSONToStringIDJSON(params);
        var transformedCommand = common.camelCaseToNormalForm(common.fromTypeIDToStringID(command));

        appendEventRow(transformedCommand, command, transformedParams, params);

    };
    window.nativePSEvent = psEvent;

});