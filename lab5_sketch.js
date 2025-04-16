let quotes = {
  "quotes": [
    "The sunset paints the sky.",
    "Data brings stories to life.",
    "P5.js makes creativity easier.",
    "JavaScript gives the web its pulse."
  ]
};

function setup() {
  createCanvas(800, 400);
  background(30);
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);

  let y = 50;
  for (let i = 0; i < quotes.quotes.length; i++) {
    text(quotes.quotes[i], width / 2, y);
    y += 50;
  }
}
