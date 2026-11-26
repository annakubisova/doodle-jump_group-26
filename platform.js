class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 15;
  }

  update() {
    // Base platform does not move, so no update logic here
  }

  draw() {
    stroke(30);
    strokeWeight(2);
    fill(120, 190, 90);
    rect(this.x, this.y, this.width, this.height, 6);
  }
}
