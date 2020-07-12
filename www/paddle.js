class Paddle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 228;
        this.height = 46;
        this.color = "red";
        this.image = new Image();
        this.image.src = "images/paddle.png";
    }
    render(canvas) {
        let { x, y, width, height, image } = this;
        // canvas.fillStyle = color;
        // canvas.fillRect(x, y, width, height);
        canvas.drawImage(image, x, y, width, height);
    }

    move(newX, gameWidth) {
        if (newX > 0 && newX < gameWidth - this.width) {
            this.x = newX;
        }
    }
}