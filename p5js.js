const density = " .:;-=o+*#%@";
//const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
let img;
let startIndex = 0;

function preload() {
  img = loadImage("images/ed.jpg");
}

function setup() {
  var myCanvas = createCanvas(500, 500);
  myCanvas.parent("p5js");
  img.resize(100, 0);
  img.loadPixels();
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  background(255);

  let w = width / img.width;
  let h = height / img.height;

  for (let j = 0; j < img.height; j++) {
    for (let i = 0; i < img.width; i++) {
      const idx = (i + j * img.width) * 4;
      const r = img.pixels[idx + 0];
      const g = img.pixels[idx + 1];
      const b = img.pixels[idx + 2];

      const avg = (r + g + b) / 3;

      let charIndex = floor(map(avg, 255, 0, 0, density.length));
      
      charIndex = ((charIndex + startIndex) % density.length) / 1.5;

      fill(57, 255, 20);
      textSize(min(w, h) * 1.5);
      text(density.charAt(charIndex), i * w + w / 2, j * h + h / 2);
    }
  }

  startIndex += 0.3;
}