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


$(function() {

    common.initDialog($("#divGuidesConsole"), false, "bounce", 500, 1040, 740);

    /* Create Guide */
    $("#btnCreateGuide").button().click(function(event) {

        var orientation = $("#divCreateGuide").find("[name='orientation']").val();
        var position = $("#divCreateGuide").find("[name='position']").val();

        if (orientation == "Horizontal") {
            orientation = common.modules.PSConstants.Orientation.horizontal;
        } else {
            orientation = common.modules.PSConstants.Orientation.vertical;
        }

        common.modules.guides.createGuide(orientation, position);
    });

    /* Clear Guide */
    $("#btnClearGuide").button().click(function(event) {

        common.modules.guides.clearGuides();
    });

    /* Open Color Picker */
    $("#txtguideColor").click(function(event) {

        common.colorPickerCallBack = function(color) {

            if (typeof color == "string") {
                $("#txtguideColor").val(color);
            } else {
                $("#txtguideColor").val(color.toRgb().r + ',' + color.toRgb().g + ',' + color.toRgb().b);
            }
        }

        common.openConsoleIfClosed($("#divColorPicker"));

    });

    /* set color */
    $("#btnSetColor").button().click(function(event) {

        var colorVal = $("#txtguideColor").val();

        if (colorVal.indexOf(",") > -1) {
            var rgbArray = colorVal.split(",");
            common.modules.guides.setGuidesCustomColor(rgbArray[0], rgbArray[1], rgbArray[2]);
        } else {
            common.modules.guides.setGuidesColor(colorVal);
        }

    });

    /* set style */
    $("#btnSetGuideStyle").button().click(function(event) {

        var style = $("#divSetGuideStyle").find("[name='guideStyle']").val();

        common.modules.guides.setGuideStyle(style);

    });



});