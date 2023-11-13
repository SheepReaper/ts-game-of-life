import p5 from 'p5';

const sketch = (p:p5) => {
  p.setup = () => {
    // Runs once
    p.createCanvas(800, 800);
    p.background(200);
  }
  p.draw = () => {
    // Runs every frame
  }
};

const element = document.getElementById("canvas-frame");

if (element) {
  new p5(sketch, element);
}
