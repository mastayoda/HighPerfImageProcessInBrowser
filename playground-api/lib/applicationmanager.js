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


    var ApplicationManager = function() {
        EventEmitter.call(this);

        /* Selected Document Event */
        //adapter.on("slct-Dcmn", this._handleSelect.bind(this));

    };
    util.inherits(ApplicationManager, EventEmitter);

    /**
     * Event handler for low-level "?" event.
     *
     * @private
     * @param {?} params Info about the event
     */
    ApplicationManager.prototype._handle = function(params) {
        /*if (params &&
            params["null"] &&
            params["null"].ref === "Dcmn") {
            this.getActiveDocument().then(function (doc) {
                this.emit("documentChanged", doc);
            }.bind(this));
        }
        */
    };


    ApplicationManager.prototype._getInterfaceButtonUpFill = function() {
        return this.InBF;
    };

    ApplicationManager.prototype._getInterpolationMethod = function() {
        return this.IntM;
    };

    ApplicationManager.prototype._getInterfaceButtonDarkShadow = function() {
        return this.Intk;
    };

    ApplicationManager.prototype._getTypePreferences = function() {
        return this.typePreferences;
    };

    ApplicationManager.prototype._getNC64 = function() {
        return this.NC64;
    };

    ApplicationManager.prototype._getZ3DPrefs = function() {
        return this.z3DPrefs;
    };

    ApplicationManager.prototype._getColorSettings = function() {
        return this.colorSettings;
    };

    ApplicationManager.prototype._getNumberOfCacheLevels = function() {
        return this.NCch;
    };

    ApplicationManager.prototype._getIsShowToolTips = function() {
        return this.ShwT;
    };

    ApplicationManager.prototype._getColorPickerPrefs = function() {
        return this.Clrr;
    };

    ApplicationManager.prototype._getPluginPicker = function() {
        return this.PlgP;
    };

    ApplicationManager.prototype._getInterfaceTransparencyBackground = function() {
        return this.ITBg;
    };

    ApplicationManager.prototype._getInterfaceIconFillDimmed = function() {
        return this.IntF;
    };

    ApplicationManager.prototype._getInterfaceBorder = function() {
        return this.Intd;
    };

    ApplicationManager.prototype._getInterfaceButtonText = function() {
        return this.interfaceButtonText;
    };

    ApplicationManager.prototype._getTool = function() {
        return this.Tool;
    };

    ApplicationManager.prototype._getWorkspaceList = function() {
        return this.workspaceList;
    };

    ApplicationManager.prototype._getTileSize = function() {
        return this.TlSz;
    };

    ApplicationManager.prototype._getInterfaceStaticText = function() {
        return this.interfaceStaticText;
    };

    ApplicationManager.prototype._getGlobalAngle = function() {
        return this.gblA;
    };

    ApplicationManager.prototype._getBuildNumber = function() {
        return this.buildNumber;
    };

    ApplicationManager.prototype._getGridMajor = function() {
        return this.GrdM;
    };

    ApplicationManager.prototype._getIsExactPoints = function() {
        return this.ExcP;
    };

    ApplicationManager.prototype._getFontLargeSize = function() {
        return this.fontLargeSize;
    };

    ApplicationManager.prototype._getRecentFiles = function() {
        return this.Rcnf;
    };

    ApplicationManager.prototype._getGuidesPrefs = function() {
        return this.GdPr;
    };

    ApplicationManager.prototype._getInterfaceButtonDownFill = function() {
        return this.Intt;
    };

    ApplicationManager.prototype._getPath = function() {
        return this.Path;
    };

    ApplicationManager.prototype._getInterfaceOWLPaletteFill = function() {
        return this.interfaceOWLPaletteFill;
    };

    ApplicationManager.prototype._getInterfaceIconFrameActive = function() {
        return this.Intm;
    };

    ApplicationManager.prototype._getFontLargeName = function() {
        return this.fontLargeName;
    };

    ApplicationManager.prototype._getFontList = function() {
        return this.fontList;
    };

    ApplicationManager.prototype._getInterfaceCanvasColor = function() {
        return this.interfaceCanvasColor;
    };

    ApplicationManager.prototype._getInterfaceBevelHighlight = function() {
        return this.IntH;
    };

    ApplicationManager.prototype._getInterfaceWhite = function() {
        return this.IntW;
    };

    ApplicationManager.prototype._getPanelList = function() {
        return this.panelList;
    };

    ApplicationManager.prototype._getPnCK = function() {
        return this.PnCK;
    };

    ApplicationManager.prototype._getTransparencyGamutPreferences = function() {
        return this.TrnG;
    };

    ApplicationManager.prototype._getGeneralPreferences = function() {
        return this.GnrP;
    };

    ApplicationManager.prototype._getRulerUnits = function() {
        return this.RlrU;
    };

    ApplicationManager.prototype._getInterfacePaletteFill = function() {
        return this.IntP;
    };

    ApplicationManager.prototype._getForegroundColor = function() {
        return this.FrgC;
    };

    ApplicationManager.prototype._getNumberOfDocuments = function() {
        return this.NmbD;
    };

    ApplicationManager.prototype._getPresetManager = function() {
        return this.presetManager;
    };

    ApplicationManager.prototype._getInterfaceIconFillActive = function() {
        return this.IntI;
    };

    ApplicationManager.prototype._getEyeDropperSample = function() {
        return this.EyDr;
    };

    ApplicationManager.prototype._getPreferencesFolder = function() {
        return this.preferencesFolder;
    };

    ApplicationManager.prototype._getInterfaceBevelShadow = function() {
        return this.Intv;
    };

    ApplicationManager.prototype._getBackgroundColor = function() {
        return this.BckC;
    };

    ApplicationManager.prototype._getFontSmallSize = function() {
        return this.fontSmallSize;
    };

    ApplicationManager.prototype._getInterfaceBlack = function() {
        return this.IntB;
    };

    ApplicationManager.prototype._getHostName = function() {
        return this.HstN;
    };

    ApplicationManager.prototype._getSerialString = function() {
        return this.SrlS;
    };

    ApplicationManager.prototype._getTransparencyPrefs = function() {
        return this.TrnP;
    };

    ApplicationManager.prototype._getIsLimited = function() {
        return this.limited;
    };

    ApplicationManager.prototype._getGradientClassEvent = function() {
        return this.Grdn;
    };

    ApplicationManager.prototype._getInterfacePrefs = function() {
        return this.interfacePrefs;
    };

    ApplicationManager.prototype._getFontSmallName = function() {
        return this.fontSmallName;
    };

    ApplicationManager.prototype._getHostVersion = function() {
        return this.HstV;
    };

    ApplicationManager.prototype._getSystemInfo = function() {
        return this.SstI;
    };

    ApplicationManager.prototype._getCachePrefs = function() {
        return this.CchP;
    };

    ApplicationManager.prototype._getIsUseCacheForHistograms = function() {
        return this.UsCc;
    };

    ApplicationManager.prototype._getInterfaceRed = function() {
        return this.IntR;
    };

    ApplicationManager.prototype._getCurrentToolOptions = function() {
        return this.CrnT;
    };

    ApplicationManager.prototype._getInterfaceTransparencyForeground = function() {
        return this.ITFg;
    };

    ApplicationManager.prototype._getRegionCode = function() {
        return this.regionCode;
    };

    ApplicationManager.prototype._getDisplayPrefs = function() {
        return this.DspP;
    };

    ApplicationManager.prototype._getIsQuickTimeInstalled = function() {
        return this.quickTimeInstalled;
    };

    ApplicationManager.prototype._getInterfaceToolTipText = function() {
        return this.ITTT;
    };

    ApplicationManager.prototype._getUnitsPrefs = function() {
        return this.UntP;
    };

    ApplicationManager.prototype._getIsExecutablePath = function() {
        return this.executablePath;
    };

    ApplicationManager.prototype._getWatchSuspension = function() {
        return this.WtcS;
    };

    ApplicationManager.prototype._getHistoryPreferences = function() {
        return this.HstP;
    };

    ApplicationManager.prototype._getInterfaceIconFrameSelected = function() {
        return this.IntS;
    };

    ApplicationManager.prototype._getIsDefaultAppScript = function() {
        return this.defaultAppScript;
    };

    ApplicationManager.prototype._getInterfaceButtonShadow = function() {
        return this.interfaceButtonShadow;
    };

    ApplicationManager.prototype._getFileSavePrefs = function() {
        return this.FlSP;
    };

    ApplicationManager.prototype._getGeneratorStatus = function() {
        return this.generatorStatus;
    };

    ApplicationManager.prototype._getInterfaceToolTipBackground = function() {
        return this.IntT;
    };

    ApplicationManager.prototype._getInterfaceIconFillSelected = function() {
        return this.Intc;
    };


    /** @type {theApplicationManager} The theApplicationManager singleton */
    var theApplicationManager = new ApplicationManager();

    module.exports = theApplicationManager;

});