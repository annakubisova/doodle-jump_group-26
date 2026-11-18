class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 46;
    this.height = 52;
    this.facing = 1;
    this.velocityY = 0;
    this.gravity = 0.4;
    this.jumpForce = -10;
    this.speed = 5;
  }

  update() {
    this.handleInput();
    this.velocityY += this.gravity;
    this.y += this.velocityY;
    this.wrapAroundEdges();
  }

  // Left & right with arrow keys and A/D
  handleInput() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= this.speed;
      this.facing = -1;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += this.speed;
      this.facing = 1;
    }
  }

  // Leaving one screen brings you back to the other side
  wrapAroundEdges() {
    if (this.x > width) {
      this.x = -this.width;
    } else if (this.x + this.width < 0) {
      this.x = width;
    }
  }

  jump() {
    this.velocityY = this.jumpForce;
  }

  isFalling() {
    return this.velocityY > 0;
  }

  // True if character is falling and his feet cross the platform's top
  landsOn(platform) {
    const feet = this.y + this.height;
    const previousFeet = feet - this.velocityY;
    const overlapsHorizontally =
      this.x + this.width > platform.x && this.x < platform.x + platform.width;

    return (
      this.isFalling() &&
      overlapsHorizontally &&
      previousFeet <= platform.y &&
      feet >= platform.y
    );
  }

  hasFallenOff() {
    return this.y > height;
  }

  draw() {
    push(); // Move the origin to the character's centre, all parts are drawn around
    translate(this.x + this.width / 2, this.y + this.height / 2);

    // Flip horizontally when facing left
    scale(this.facing, 1);

    // Stretch taller after jumping, back to normal at the top of the jump
    const stretch = map(this.velocityY, this.jumpForce, 0, 1.15, 1, true);
    scale(1 / stretch, stretch);

    stroke(30);
    strokeWeight(2.5);

    // Legs
    const legLength = this.velocityY < 0 ? 5 : 10;
    line(-8, 16, -10, 16 + legLength);
    line(8, 16, 10, 16 + legLength);
    // Feet point forward
    line(-10, 16 + legLength, -4, 16 + legLength);
    line(10, 16 + legLength, 16, 16 + legLength);

    // Anthena with a ball on top
    noFill();
    bezier(0, -22, 2, -32, 10, -34, 12, -38);
    fill(255, 90, 90);
    circle(12, -38, 7);

    // Body
    fill(255, 170, 60);
    ellipse(0, 0, 44, 46);

    // Body outline
    noFill();
    strokeWeight(1);
    ellipse(1, -1, 45, 45);

    // Belly
    noStroke();
    fill(255, 215, 140);
    ellipse(3, 15, 22, 10);

    // Scarf around the neck
    stroke(30);
    strokeWeight(2);
    fill(70, 130, 220);
    rect(-20, 4, 40, 7, 3);

    // Scarf tail flutters behind the character
    const flutter = sin(frameCount * 0.3) * 3;
    quad(-16, 6, -28, 8 + flutter, -27, 14 + flutter, -15, 11);

    // Eyes
    fill(255);
    ellipse(-2, -10, 13, 15);
    ellipse(11, -10, 13, 15);

    // Pupils
    noStroke();
    fill(30);
    const pupilY = this.velocityY > 0 ? -7 : -12;
    circle(1, pupilY, 5);
    circle(14, pupilY, 5);

    // Smile
    stroke(30);
    strokeWeight(2);
    noFill();
    arc(7, -1, 10, 6, 0, PI);

    pop();
  }
}
