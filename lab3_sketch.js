let colorPicker;
let brushSizeSlider;
let backgroundColorSlider;
let resetButton;
let brushSize = 10;
let currentColor;
let backgroundColor = 255; // Default background color is white

function setup() {
    createCanvas(800, 600);
    background(backgroundColor);

    // Setup the GUI elements
    setupGUI();
}

function setupGUI() {
    // Color picker to change the brush color
    colorPicker = createColorPicker('#000000'); // Default color is black
    colorPicker.position(10, 40);

    // Slider for adjusting the brush size
    brushSizeSlider = createSlider(1, 50, 10); // Slider ranges from 1 to 50, default at 10
    brushSizeSlider.position(10, 100);

    // Slider for changing the background color
    backgroundColorSlider = createSlider(0, 255, 255);
    backgroundColorSlider.position(10, 160);

    // Reset button to clear canvas and reset values
    resetButton = createButton('Reset Canvas');
    resetButton.position(10, 220);
    resetButton.mousePressed(resetCanvas);

   
}

function draw() {
    // Update the brush size and color from the GUI elements
    brushSize = brushSizeSlider.value();
    currentColor = colorPicker.value();                           
    let bgValue = backgroundColorSlider.value();   
    
    // Update the background color if changed   
    if (bgValue !== backgroundColor) {   
        backgroundColor = bgValue;   
        background(backgroundColor);
    }

    if (mouseIsPressed && mouseX < 800) { // Ensure drawing only within the canvas area
        fill(currentColor);
        noStroke();
        ellipse(mouseX, mouseY, brushSize, brushSize);
    }
}

function resetCanvas() {
    background(255); // Reset to white background
    backgroundColorSlider.value(255); // Reset background slider
}

function mouseDragged() {
    fill(currentColor);
    noStroke();
    ellipse(mouseX, mouseY, brushSize, brushSize); // Ensure continuous drawing while dragging
    return false; // Prevent default
}
