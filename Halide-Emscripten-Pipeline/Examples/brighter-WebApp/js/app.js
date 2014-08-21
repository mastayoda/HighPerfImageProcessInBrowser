requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['HalemsUtils', 'app/brighter'],
    function(halemsUtils, brighter) {

        var img = document.getElementById("originalImage");

        var fileNode = halemsUtils.writeImageToFileSystem(img, "/", "cat.png");

        var nImg = halemsUtils.allocateNativeImage("cat.png", halemsUtils.imageType.uint8_t);

        var result = brighter.brighter(Number(nImg.internals.buffer_tPtr));

        var newImg = halemsUtils.transformNativeImageToHtmlImage(nImg);

    });