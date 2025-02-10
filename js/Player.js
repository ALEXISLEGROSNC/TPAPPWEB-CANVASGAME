import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";

export default class Player extends ObjectGraphique {
    constructor(x, y) {
        super(x, y, 50, 50);
        this.vitesseX = 0;
        this.vitesseY = 0;
        this.angle = 0;
        this.center = this.#getCenter();
    }

    #getCenter() {
        var res = [this.x + this.w / 2, this.y + this.h / 2];
        return res;
    }
    
    #drawShuttleTriangleHelper(ctx, x1, x2, x3, y1, y2, y3) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();
    }

    draw(ctx) {
        var center = this.#getCenter();
    
        var rotationOffsetX = -25;
        var rotationOffsetY = -25;
        var rotationPointX = center[0] + rotationOffsetX;
        var rotationPointY = center[1] + rotationOffsetY;
    
        ctx.save();
    
        // Dessiner en décalé
        ctx.translate(rotationPointX, rotationPointY);
        var angle = Math.atan2(this.vitesseY, this.vitesseX) + Math.PI / 2; // Ajouter 90 degrés en radians
        ctx.rotate(angle);
    
        // Appliquer une mise à l'échelle pour dessiner deux fois plus petit
        ctx.scale(0.5, 0.5);
    
        // Dessiner en décalé
        ctx.translate(-rotationPointX, -rotationPointY);
    
        // Corps
        drawCircleImmediat(ctx, this.x, this.y - 13, 20, "darkred"); // tour
        drawCircleImmediat(ctx, this.x, this.y - 13, 18, "red");
        // Corps
        ctx.fillStyle = "lightgray";
        ctx.fillRect(this.x - (this.w / 2) + 5, this.y - 13, 40, 40); // tour
        ctx.fillStyle = "white";
        ctx.fillRect(this.x - (this.w / 2) + 7, this.y - 13, 36, 38);
        // Hublot
        drawCircleImmediat(ctx, this.x, this.y + 2, 13, "red");
        drawCircleImmediat(ctx, this.x, this.y + 2, 10, "cyan");
        // Reflet
        drawCircleImmediat(ctx, this.x, this.y - 1, 2, "lightcyan");
        drawCircleImmediat(ctx, this.x + 2, this.y - 1, 2, "lightcyan");
        drawCircleImmediat(ctx, this.x + 4, this.y, 2, "lightcyan");
    
        // Ailerons
        ctx.fillStyle = "darkred";
        ctx.fillRect(this.x - 20, this.y + 28, 40, 5); // base basse
    
        ctx.fillStyle = "red";
        ctx.fillRect(this.x - 3, this.y + 23, 6, 15);
    
        var x1 = this.x - 15, y1 = this.y + 23;
        var x2 = this.x - 15, y2 = this.y + 38;
        var x3 = this.x - 25, y3 = this.y + 38;
        this.#drawShuttleTriangleHelper(ctx, x1, x2, x3, y1, y2, y3); // gauche
        x1 = this.x + 15, y1 = this.y + 23;
        x2 = this.x + 15, y2 = this.y + 38;
        x3 = this.x + 25, y3 = this.y + 38;
        this.#drawShuttleTriangleHelper(ctx, x1, x2, x3, y1, y2, y3); // droit
    
        ctx.fillStyle = "darkred";
        ctx.fillRect(this.x - 20, this.y + 23, 40, 5); // base haute
    
        ctx.restore();
    
        super.draw(ctx);
    }
    

    move(deltaT=1) {
        this.x += this.vitesseX*deltaT;
        this.y += this.vitesseY*deltaT;
    }
}
