let fft;
let audio;
let source;
let started = false;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight - 160);
  canvas.style('display', 'none');

  fft = new p5.FFT();

  const startBtn = select('#startBtn');
  const selectInput = select('#audioSelect');

  startBtn.mousePressed(() => {
    if (started || !selectInput.value()) return;

    const selectedTrack = selectInput.value();
    audio = createAudio(selectedTrack);
    audio.volume(0.7);
    audio.loop();
    audio.play();

    const mediaElement = new p5.MediaElement(audio.elt);
    mediaElement.connect();
    fft.setInput(mediaElement);

    started = true;
    canvas.style('display', 'block');
  });
}

function draw() {
  if (!started || audio.elt.paused) return;

  background(20, 20, 30, 150);

  let spectrum = fft.analyze();
  strokeWeight(2);
  stroke(255, 180, 70);

  for (let i = 0; i < spectrum.length; i += 10) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    line(x, height, x, h);
  }

  let waveform = fft.waveform();
  noFill();
  stroke(100, 255, 255, 100);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 160);
}
