import p5 from 'p5';
import WanderingEllipse from './wandering_ellipse.js';

const sketch = (p) => {
  let fixedSize = 100;
  // Scaling factor for the entire sketch.
  let scaleUnit;
  // Graphics object used to draw everything.
  let pg;
  let ellipses = [];

  p.setup = () => {
    p.randomSeed($fx.rand() * 1000000);
    p.noiseSeed($fx.rand() * 1000000);
    const w = window.innerWidth;
    const h = window.innerHeight;
    p.createCanvas(w, h, p.WEBGL);
    // Dynamically calculate how much we need to scale the entire sketch by.
    // This ensures that the sketch scales well with the window size.
    scaleUnit = Math.min(p.width, p.height) / fixedSize;
    // Allows for crisper images on retina displays.
    p.pixelDensity(2);

    pg = p.createGraphics(w, h);
    // Allows for crisper images on retina displays.
    pg.pixelDensity(2);
    console.log(p.random(0, 100));
    // Initialize a collection of wandering ellipses
    const count = 10;
    const neonPalette = [
      { r: 57, g: 255, b: 20 },   // neon green
      { r: 0, g: 255, b: 255 },   // cyan
      { r: 255, g: 20, b: 147 },  // deep pink
      { r: 255, g: 0, b: 255 },   // magenta
      { r: 255, g: 255, b: 0 },   // yellow
      { r: 80, g: 200, b: 255 }   // electric blue
    ];
    for (let i = 0; i < count; i++) {
      const size = 100 - (10 * i);
      const color = neonPalette[i % neonPalette.length];
      ellipses.push(new WanderingEllipse(size, size, 0, 0, color));
    }
  };

  p.draw = () => {
    // Update ellipse sizes over time
    for (let i = 0; i < ellipses.length; i++) {
      ellipses[i].iterate(p);
    }
    pg.push();
    pg.clear();
    // Start drawing at the center of the screen.
    pg.translate(pg.width / 2, pg.height / 2);
    // Scale the sketch up/down to allow for dimensionless.
    pg.scale(scaleUnit);
    for (let i = 0; i < ellipses.length; i++) {
      ellipses[i].draw(pg);
    }
    pg.pop();
    // Draw the graphics buffer to screen.
    p.image(pg, -p.width / 2, -p.height / 2);
  };

  p.windowResized = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    p.resizeCanvas(w, h);
    // Regenerate graphics buffer
    pg = p.createGraphics(w, h);
    pg.pixelDensity(2);
    // Recalculate scaleUnit for updated canvas size.
    scaleUnit = Math.min(p.width, p.height) / fixedSize;
  };
};

new p5(sketch);
