
// this function is called once at the beginning
function setup() 
{
    // feel free to change the size
    createCanvas(600, 600, SVG);
    frameRate(60);
}

// this function is called once every frame i.e. 60 times per second
// most of your work will probably happen here
function draw() 
{

}

// this function is called any time a key is pressed
function keyTyped() 
{
    // just press any button to save your canvas as an svg
    save();
}