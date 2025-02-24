// Initializing GUI elements for an interactive drawing application.
// Reference to the basic setup inspired by P5.js examples.
// Source: https://p5js.org/examples/drawing-continuous-lines.html

function setup() {
    createCanvas(800, 600);
    background(255);  // Sets up a white canvas initially.

    // Initialize color pickers, sliders, and buttons with specific functionalities.
    initGUI();
}

function initGUI() {
    // Brush color picker setup, inspired by P5.js 'Color' tutorial.
    // Source: https://p5js.org/learn/color.html
    colorPicker = createColorPicker('#000000');
    colorPicker.position(20, 20);
    createElement('label', 'Brush Color').position(20, 0).style('color', 'white');

    // Brush size slider, using HTML range input setup as learned from W3Schools.
    // Source: https://www.w3schools.com/howto/howto_js_rangeslider.asp
    brushSizeSlider = createSlider(1, 50, 10);
    brushSizeSlider.position(20, 70);
    createElement('label', 'Brush Size').position(20, 50).style('color', 'white');

    // Opacity slider, my extension to allow dynamic brush transparency.
    opacitySlider = createSlider(0, 255, 255);
    opacitySlider.position(20, 120);
    createElement('label', 'Opacity').position(20, 100).style('color', 'white');

    // Background color picker which changes the canvas background.
    // My extension to enhance interactivity.
    backgroundColorPicker = createColorPicker('#ffffff');
    backgroundColorPicker.position(20, 170);
    createElement('label', 'Background Color').position(20, 150).style('color', 'white');
    backgroundColorPicker.input(() => background(backgroundColorPicker.value()));  // Fix to make background color picker functional.

    // Save button to allow users to download their drawing.
    // My extension to add practical functionality.
    saveButton = createButton('Save Drawing');
    saveButton.position(20, 220);
    saveButton.mousePressed(() => saveCanvas('myDrawing', 'png'));

    // Dropdown menu for selecting brush type, demonstrating how to combine HTML and P5.js.
    // My own addition to provide multiple drawing options.
    select = createSelect();
    select.position(20, 270);
    select.option('ellipse');
    select.option('rectangle');
    select.option('line');
    createElement('label', 'Brush Type').position(20, 250).style('color', 'white');
}

// Function to handle continuous drawing on canvas, using mouse input.
// Directly adapted from P5.js 'Continuous Lines' example.
function mouseDragged() {
    fill(colorPicker.color());
    stroke(colorPicker.color());
    strokeWeight(brushSizeSlider.value());
    strokeOpacity(opacitySlider.value());  // Handling dynamic opacity based on my additional slider.
    switch (select.value()) {
        case 'ellipse':
            ellipse(mouseX, mouseY, brushSizeSlider.value(), brushSizeSlider.value());
            break;
        case 'rectangle':
            rect(mouseX, mouseY, brushSizeSlider.value(), brushSizeSlider.value());
            break;
        case 'line':
            line(pmouseX, pmouseY, mouseX, mouseY);
            break;
    }
    return false; // Prevent default behavior.
}

// Function to dynamically adjust the stroke opacity, my extension to add depth to drawing tools.
function strokeOpacity(alpha) {
    let c = colorPicker.color();
    c.setAlpha(alpha);
    stroke(c);
}

// Optional function to clear the canvas and reset to the chosen background color.
// Extended functionality to improve user experience.
function keyPressed() {
    if (key === 'c' || key === 'C') {
        clear();
        background(backgroundColorPicker.color());
    }
}
