class MovingPlatform extends Platform {
    constructor(x, y) {
        super(x, y);
        this.speed = 2;
    }

    update() {
        this.x += this.speed;
        if (this.x < 0) {
            this.x + 0;
            this.speed *= -1;
        } else if (this.x + this.width > width) {
            this.x = width - this.width;
            this.speed *= -1;
        }
    }
}