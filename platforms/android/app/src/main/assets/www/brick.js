class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 88;
        this.height = 48;
        this.code;
        this.ball;
        this.color = "#0000FF";
        this.image = new Image();
        this.image.src = "images/bricks.png";
        this.imageX = 0;
        this.imageY = 0;
        this.isDead = false;
    }
    render(canvas) {
        if (this.isDead) return;
        let { x, y, width, height, imageX, imageY, image } = this;
        canvas.drawImage(image, imageX, imageY, 
                            width, height, x, y, width, height);
        // canvas.fillStyle = color;
        // canvas.fillRect(x, y, width, height);
    }

    kill() {
        let { code, ball, paddle } = this;
        this.isDead = true;
        switch (code) {
            case 10:
                ball.speedX = ball.speedX * 1.1;
                ball.speedY = ball.speedY * 1.1;
                break;
            case 11:
                paddle.width = paddle.width * 1.1;
                break;
            case 12:
                ball.radius = ball.radius * 1.1;
                break;
        }
    }
}