import Obstacle from "./Obstacle.js";
import { drawCircleImmediat } from "./utils.js";

export default class SpaceJunk extends Obstacle {
    constructor(x, y, w, h,vX, vY) {
        super(x, y, w, h, "gray");
        this.vX=vX;
        this.vY=vY;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        drawCircleImmediat(ctx, this.x+this.w/2, this.y+this.h/2, 55, "gray"); // tour
        drawCircleImmediat(ctx, this.x+this.w/2, this.y+this.h/2, 50, "lightgray");
        ctx.restore();
    }
    move() {
        this.x += this.vX;
        this.y += this.vY;
    }
}