$(function() {

    /* ADAPTER WRAPPER FUNCTIONS  AND HELPERS*/
    function adapterGet(str) {
        return require("playground/adapter").get(str);
    }

    function adapterCall(str, params) {
        return require("playground/adapter").call(str, params);
    }

    function openJSONConsoleIfClosed() {

        if (!$("#divJsonCodeConsole").dialog("isOpen"))
            $("#divJsonCodeConsole").dialog("open");
    }

    function openJSONTreeConsoleIfClosed() {

        if (!$("#divJsonTreeConsole").dialog("isOpen"))
            $("#divJsonTreeConsole").dialog("open");
    }

    function displayError(obj, msg) {

        obj.removeClass('ui-state-highlight ui-corner-all');
        obj.addClass('ui-state-error ui-corner-all');
        obj.text(msg);

    }

    function displaySuccess(obj, msg) {

        obj.removeClass('ui-state-error ui-corner-all');
        obj.addClass('ui-state-highlight ui-corner-all');
        obj.text(msg);
    }


    /*JSON EDITORS SETUP */

    var tContainer = document.getElementById('jsonTreeEditor');
    var tEditor = new JSONEditor(tContainer, {
        mode: 'tree',
        modes: ['code', 'form', 'text', 'tree', 'view']
    });

    var cContainer = document.getElementById('jsonCodeEditor');
    var cEditor = new JSONEditor(cContainer, {
        mode: 'code'
    });

    /* TABS SETUP */

    $("#tabs").tabs({

    });

    /* DIVISIONS SETUP */

    $("#divDevDialog").dialog({
        autoOpen: false,
        show: {
            effect: "bounce",
            duration: 500
        },
        width: 700,
        height: 500
    });

    $("#divExecDialog").dialog({
        autoOpen: false,
        show: {
            effect: "bounce",
            duration: 500
        },
        width: 950,
        height: 830
    });

    $("#divExecDialog").css("background-color", "white");

    $("#divJsonTreeConsole").dialog({
        autoOpen: false,
        show: {
            effect: "bounce",
            duration: 500
        },
        width: 500,
        height: 600
    });

    $("#divJsonCodeConsole").dialog({
        autoOpen: false,
        show: {
            effect: "bounce",
            duration: 500
        },
        width: 500,
        height: 600
    });



    /* BUTTONS SETUP */

    $("#btnOpenConsole").button().click(function(event) {
        if (!$("#divDevDialog").dialog("isOpen"))
            $("#divDevDialog").dialog("open");
    });

    $("#btnBenchMark").button().click(function(event) {

    });

    $("#btnCallExecutor").button().click(function(event) {

        if (!window.dialogHasBeenOpened) {
            window.initializeTable();
            dialogHasBeenOpened = true;
        }


        if (!$("#divExecDialog").dialog("isOpen"))
            $("#divExecDialog").dialog("open");

        /* Get is selected by default so open the JSON tree console */
        openJSONTreeConsoleIfClosed();
        /*
        var mArr = require("playground/PSConstants").getMasterArray();
    var i = 0;
        for (i = 0; i < PSConstantsData.length; i++) {

      
            adapterGet(mArr[i][2]).then(function(obj) {

                if (typeof(obj) === "string") {
                    console.log("<font color='red'>Not Accessible</font>");
                } else {
                    console.log(obj);
                }

            }.bind(this));
      
      
        }
    */

    });

    $("#btnJsonShowTreeConsole").button().click(function(event) {
        if (!$("#divJsonTreeConsole").dialog("isOpen"))
            $("#divJsonTreeConsole").dialog("open");

    });

    $("#btnJsonShowCodeConsole").button().click(function(event) {
        if (!$("#divJsonCodeConsole").dialog("isOpen"))
            $("#divJsonCodeConsole").dialog("open");

    });

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

                adapterGet($(this).text()).then(function(obj) {

                    if (typeof(obj) === "string") {
                        displayError($("#spnExecutionMessage"), obj);
                        tEditor.set(null);

                    } else {

                        displaySuccess($("#spnExecutionMessage"), "Get " + $(this).text() + " Sucessful!");
                        tEditor.set(obj);
                    }
                }.bind(this));

            } else if ($('#rdbCall').is(':checked')) {

                adapterCall($(this).text(), cEditor.get()).then(function(obj) {

                    displaySuccess($("#spnExecutionMessage"), "Call " + $(this).text() + " Sucessful!");

                }.bind(this));

            }

        });

        $(".btnStringID").button().click(function(event) {
            console.log($(this).text());
        });

    }

    /* GET/CALL RADIOS SETUP */
    $("#radio").buttonset().click(function(event) {

        if ($('#rdbCall').is(':checked')) {
            openJSONConsoleIfClosed();
        } else if ($('#rdbGet').is(':checked')) {
            openJSONTreeConsoleIfClosed();
        }

    });;

    /* API BUTTON EVENTS */
    $("#btnApplication").button().click(function(event) {

    });

    $("#btnDocument").button().click(function(event) {

    });

    $("#btnPreferences").button().click(function(event) {

    });

    $("#btnNotifier").button().click(function(event) {

    });





});