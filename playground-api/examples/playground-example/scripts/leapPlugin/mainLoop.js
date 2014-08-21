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

define(['dependencies/three.js', 'dependencies/leap-0.6.0-beta3_1.min.js', 'dependencies/leap-plugins-0.1.5_1.js', 'dependencies/leap.rigged-hand-0.1.3.min.js'], function(d1, d2, d3, d4) {
    "use strict";


    /* For more information about the skeletal API please visit:
     * URL: https://developer.leapmotion.com/documentation/skeletal/javascript/devguide/Intro_Skeleton_API.html
     */

    /* Main Controller variable */
    var controller;


    /* Controller allocation and Main Loop 
     * This loop is different from the regular frame loop. The function will be trigger
     * only when a hand movement is detected
     */
    controller = Leap.loop({

        enableGestures: true,
        hand: function(hand) {

            /*
            var handMesh = hand.data('riggedHand.mesh');
            var screenPosition = handMesh.screenPosition(
                hand.palmPosition,
                controller.plugins.riggedHand.camera
            );
            */

            /* Basic positioning data */
            var position = hand.palmPosition;
            var velocity = hand.palmVelocity;
            var direction = hand.direction;

            /* Confidence: How well the internal hand model fits the observed data. (a value in the range [0..1])*/
            var confidence = hand.confidence;

            /* Direction:  A 3-element array representing a unit direction vector.*/
            var direction = hand.direction;

            /* Fingers: A array containing the hand's finger objects.*/
            var fingers = hand.fingers;

            /* Grab Strength: The strength of a grab hand pose. (a value in the range [0..1])*/
            var grabStrength = hand.grabStrength;

            /* Hand ID: The unique ID of the Hand in the consecutive frames. If the hand dissapear and reappear a new
             * id will be assigned.
             */
            var handID = hand.id;


            /* Index finger: The Index finger of the hand */
            var index = hand.indexFinger;
            /* Middle finger: The middle finger of the hand */
            var middle = hand.middleFinger;


            /* Palm Normal: A 3 points array vector representing the palm vector.
             * Documentation: The normal vector to the palm. If your hand is flat, this
             * vector will point downward, or “out” of the front surface of your palm.
             */
            var normal = hand.palmNormal;

            /* Speed: A 3 element vector representing the rate of change of the palm position in millimeters/second.*/
            var speed = hand.palmVelocity;

        }
    });

    /* Rigged Hand Plugin: */
    controller.use('riggedHand');

    /* Hand Entry Plugin: Makes it possible for detect 'handFound' and 'handLost' events. */
    controller.use('handEntry');


    /* LEAP EVENTS */
    controller.on('handFound', function(hand) {

        console.log("Hand Found: " + hand);
    });

    controller.on('handLost', function(hand) {

        console.log("Hand Lost: " + hand);
    });


    /* LEAP HARDWARE EVENTS */

    /**
     * Event handler for the Leap's ready state.
     *
     * @private
     */
    controller.on('ready', function() {

        console.log("ready");
    });


    /**
     * Event handler for the Leap's logical connect state.
     *
     * @private
     */
    controller.on('connect', function() {

        var rpv = controller.connection.opts.requestProtocolVersion;
        var sv = controller.connection.opts.serviceVersion;

        console.log("Leap logically connected with protocol v" + rpv + " to service version: " + sv);
    });

    /**
     * Event handler for the Leap's logical disconnect state.
     *
     * @private
     */
    controller.on('disconnect', function() {
        console.log("Leap logically disconnected");
    });

    /**
     * Event handler for the Leap's focus state.
     *
     * @private
     */
    controller.on('focus', function() {
        console.log("focus");
    });

    /**
     * Event handler for the Leap's blur state.
     *
     * @private
     */
    controller.on('blur', function() {
        console.log("blur");
    });

    /**
     * Event handler for the Leap's connect state.
     *
     * @private
     */
    controller.on('deviceAttached', function(deviceInfo) {
        console.log("Leap Hardware device attached", deviceInfo);
    });

    /**
     * Event handler for the Leap's device removed state.
     *
     * @private
     */
    controller.on('deviceRemoved', function(deviceInfo) {
        console.log("Leap Hardware device Removed", deviceInfo);
    });

    /**
     * Event handler for the Leap's device streaming state.
     *
     * @private
     */
    controller.on('deviceStreaming', function(deviceInfo) {
        console.log("Leap is streaming", deviceInfo);
    });

    /**
     * Event handler for the Leap's device stopped state.
     *
     * @private
     */
    controller.on('deviceStopped', function(deviceInfo) {
        console.log("Leap device stopped", deviceInfo);
    });


    /**
     * Event handler for the Leap's streaming started state.
     *
     * @private
     */
    controller.on('streamingStarted', function(deviceInfo) {
        console.log("Leap streaming Started", deviceInfo);
    });

    /**
     * Event handler for the Leap's streaming stopped state.
     *
     * @private
     */
    controller.on('streamingStopped', function(deviceInfo) {
        console.log("Leap streaming Stopped", deviceInfo);
    });


});