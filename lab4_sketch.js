let video;
let img;

function setup() {
    noCanvas();
    const content = select('#content');

    // Setup the video
    video = createVideo('sun.mp4');
    video.size(320, 240);
    video.parent(content);
    video.elt.controls = true;  // Display controls

    // Load and display the image
    img = createImg('sun1.jpg', 'beautiful sunset');
    img.size(320, 240);
    img.parent(content);

    // Button to manually start the video
    let playButton = createButton('Play Video');
    playButton.parent(content);
    playButton.mousePressed(() => {
        video.play();  // Play the video when the button is clicked
    });
}

function draw() {
    // No continuous rendering needed
}
