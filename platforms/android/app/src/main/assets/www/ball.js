class Ball {
    constructor(x, y) {
        this.game;
        this.paddle;
        this.bricks;
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.speed = 5;
        this.speedX;
        this.speedY;
        this.randomDirection();
        this.color = "#00FF00";
        this.image = new Image();
        this.image.src = "images/ball.png";
        this.angle = 0;
    }

    // 3.14рад = 180градусов
    randomDirection() {
        let angle = Math.random() * 2 * Math.PI;
        this.speedY = this.speed * Math.sin(angle) / Math.sin(Math.PI / 2);
        this.speedX = Math.sqrt(this.speed * this.speed - this.speedY * this.speedY);
    }

    render(canvas) {
        let { x, y, radius, image } = this;
        canvas.drawImage(image, x - radius,
            y - radius, radius * 2, radius * 2);
    }

    collisionWalls() {
        let { width, height } = this.game;
        let { x, y, radius } = this;
        if (y < radius) { // верхняя
            this.speedY = -this.speedY;
        }
        if (x > width - radius) { // правая
            this.speedX = -this.speedX;
        }
        if (y > height - radius) { // нижняя
            this.gameOver();
        }
        if (x < radius) { // левая
            this.speedX = -this.speedX;
        }
    }


    collisionPaddle() {
        let { radius } = this;
        let { x, y, width } = this.paddle;
        let partWidth = width / 3;
        if (this.speedX > 0) {
            if (this.x + radius > x && this.x + radius < x + partWidth
                && this.y + radius > y) {
                this.speedX = -Math.abs(this.speedX);
                this.speedY = -this.speedY;
            }
            if (this.x + radius > x + partWidth
                && this.x + radius < x + 2 * partWidth
                && this.y + radius > y) {
                this.speedY = -this.speedY;
            }
            if (this.x + radius > x + 2 * partWidth
                && this.x + radius < x + 3 * partWidth
                && this.y + radius > y) {
                this.speedX = Math.abs(this.speedX);
                this.speedY = -this.speedY;
            }
        } else {
            if (this.x - radius > x && this.x - radius < x + partWidth
                && this.y + radius > y) {
                this.speedX = -Math.abs(this.speedX);
                this.speedY = -this.speedY;
            }
            if (this.x - radius > x + partWidth
                && this.x - radius < x + 2 * partWidth
                && this.y + radius > y) {
                this.speedY = -this.speedY;
            }
            if (this.x - radius > x + 2 * partWidth
                && this.x - radius < x + 3 * partWidth
                && this.y + radius > y) {
                this.speedX = Math.abs(this.speedX);
                this.speedY = -this.speedY;
            }
        }
    }

    collisionBrick(brick) {
        if (brick.isDead) return;
        let { x, y, width, height } = brick;
        if (this.x > x && this.x < x + width) {
            if (this.y - this.radius < y + height &&
                this.y + this.radius > y) {
                this.speedY = -this.speedY;
                brick.kill();
            }
        }
        if (this.y > y && this.y < y + height) {
            if (this.x + this.radius > x &&
                this.x - this.radius < x + width) {
                this.speedX = -this.speedX;
                brick.kill();
            }
        }
    }

    move() {
        this.collisionWalls();
        this.collisionPaddle();
        for (let brick of this.bricks) {
            this.collisionBrick(brick);
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }
}