export default class Star {
    constructor(x, y, size, speedX, speedY, opacity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.opacity = opacity;
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.opacity += (Math.random() - 0.5) * 0.05;
        this.opacity = Math.max(0, Math.min(1, this.opacity));
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "white";
        ctx.beginPath();
        for (let i = 0; i < 5; i++) { 
            let angle = (Math.PI / 5) * (i * 2);
            let xPos = this.x + Math.cos(angle) * this.size;
            let yPos = this.y + Math.sin(angle) * this.size;
            ctx.lineTo(xPos, yPos);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}
