/**
 * @namespace Image related.
 */
dwv.image = dwv.image || {};
/**
 * @namespace Filter classes.
 */
dwv.image.filter = dwv.image.filter || {};

/**
 * @function Threshold an image between an input minimum and maximum.
 * @param min The new minimum.
 * @param max The new maximum.
 */
dwv.image.filter.Threshold = function()
{
    var min = 0;
    var max = 0;
};

dwv.image.filter.Threshold.prototype.setMin = function(value)
{
    min = value;
};

dwv.image.filter.Threshold.prototype.setMax = function(value)
{
    max = value;
};

dwv.image.filter.Threshold.prototype.update = function()
{
    var imageMin = app.getImage().getLookup().rescaleIntercept;
    var threshFunction = function(x){
        if(x<min||x>max) { return imageMin; } 
        else { return x; }
    };
    var newImage = app.getImage().transform( threshFunction );
    
    app.setImage(newImage);
    app.generateAndDrawImage();
};

/**
 * @function Sharpen an image using a sharpen convolution matrix.
 */
dwv.image.filter.Sharpen = function() {};

dwv.image.filter.Sharpen.prototype.update = function()
{
    var newImage = app.getImage().convolute(
        [  0, -1,  0,
          -1,  5, -1,
           0, -1,  0 ] );
    
    app.setImage(newImage);
    app.generateAndDrawImage();
};

/**
 * @function Apply a Sobel filter to an image.
 */
dwv.image.filter.Sobel = function() {};

dwv.image.filter.Sobel.prototype.update = function()
{
    var gradX = app.getImage().convolute(
        [ 1,  0,  -1,
          2,  0,  -2,
          1,  0,  -1 ] );

    var gradY = app.getImage().convolute(
        [  1,  2,  1,
           0,  0,  0,
          -1, -2, -1 ] );
    
    var sobel = gradX.compose( gradY, function(x,y){return Math.sqrt(x*x+y*y);} );
    
    app.setImage(sobel);
    app.generateAndDrawImage();
};
