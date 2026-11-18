let character;
let platforms = [];

function setup() {
  createCanvas(800, 600);
  character = new Character(380, 400);

  // Platform directly under the character
  platforms.push(new Platform(363, 570));

  // More platforms above it
  for (let i = 1; i < 6; i++) {
    platforms.push(new Platform(random(width - 80), 570 - i * 100));
  }

  character.jump();
}

function draw() {
  background(250, 245, 230);
  character.update();

  for (let platform of platforms) {
    if (character.landsOn(platform)) {
      character.jump();
    }
    platform.draw();
  }

  character.draw();
}
