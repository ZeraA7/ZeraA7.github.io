let video;
let img;
let playButton;

function setup() {
  noCanvas();

  const container = select('#mediaContainer');

  // Load image
  img = createImg('sun1.jpg', 'Sunset Image');
  img.size(320, 180);
  img.parent(container);

  // Load video
  video = createVideo(['sun.mp4']);
  video.size(320, 180);
  video.parent(container);
  video.hide(); // Hide by default — show it when user clicks play

  // Add a Play Button
  playButton = createButton('▶️ Play Video');
  playButton.parent(container);
  playButton.mousePressed(() => {
    video.show();
    video.loop();
    video.volume(0); // Mute by default for autoplay compliance
    video.play();
    playButton.hide(); // Hide the button after playing
  });
}
