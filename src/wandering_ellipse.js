export default class WanderingEllipse {
  constructor(width, height, x, y, color, options = {}) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color; // { r, g, b, a? } required

    const factor = 1.2;
    const { minWidth, maxWidth, minHeight, maxHeight } = options;
    this.minWidth = minWidth !== undefined ? minWidth : width / factor;
    this.maxWidth = maxWidth !== undefined ? maxWidth : width * factor;
    this.minHeight = minHeight !== undefined ? minHeight : height / factor;
    this.maxHeight = maxHeight !== undefined ? maxHeight : height * factor;
  }

  iterate(p) {
    const nextW = this.width + p.random(-.2, .2);
    const nextH = this.height + p.random(-.2, .2);
    this.width = Math.max(this.minWidth, Math.min(this.maxWidth, nextW));
    this.height = Math.max(this.minHeight, Math.min(this.maxHeight, nextH));
  }

  draw(g) {
    const { r, g: green, b} = this.color;
    g.stroke(0);
    g.fill(r, green, b);
    g.ellipse(this.x, this.y, this.width, this.height);
  }
}


