function setup() {
    createCanvas(windowWidth, windowHeight); // This will cover the entire window
    background('#303030');
    let numberOfCircles = 50; // Increased number of circles
    let circleSize = 20; // Smaller circle size for denser patterns
    let padding = 5; // Reduced padding for denser arrangement
    let totalSize = circleSize + padding;

    noStroke();
    fill('red');

    for (let x = 0; x < width; x += totalSize) {
        for (let y = 0; y < height; y += totalSize) {
            ellipse(x + circleSize / 2, y + circleSize / 2, circleSize);
        }
    }
}

function draw() {
    // No ongoing drawing needed
}
