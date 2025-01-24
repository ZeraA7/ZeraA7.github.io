function setup() {
    let canvas = createCanvas(720, 480);
    canvas.style('display', 'block'); // Ensures the canvas is block level
    background('#FFFFFF'); // White background for the canvas
}

function draw() {
    if (mouseIsPressed) {
        fill(0); // Black color for the circle
        noStroke();
        ellipse(mouseX, mouseY, 20, 20); // Draws a circle at (mouseX, mouseY) with a diameter of 20
    }
}

function resetSketch() {
    background('#FFFFFF'); // Resets the canvas to white
}
