import ObjectGraphique from "./ObjectGraphique.js";
import Config from "./Config.js";

export default class ObjetSouris extends ObjectGraphique {
    #dragValue= null;
    constructor(x, y, w, h, couleur, couleurChemin, inverseSensivity=15) {
        super(x, y, w, h, couleur);
        this.isClicking = false;
        this.couleurChemin=couleurChemin;
        this.inverseSensivity=inverseSensivity;
        this.clickPosition = null;
        if(this.inverseSensivity==0||this.inverseSensivity==null) this.inverseSensivity=1;
    }
    getDragValue(){ // emulating an event : get the value every update , do nothing when it's null
        var temp = this.#dragValue;
        this.#dragValue=null
        return temp;
    }
    
    #calculateDragValue(){
        var diffX=Math.round(
            (this.x-this.clickPosition[0])/this.inverseSensivity
        );
        var diffY=Math.round(
            (this.y-this.clickPosition[1])/this.inverseSensivity
        );

        diffX=diffX==0?1:diffX;
        diffY=diffY==0?1:diffY;

        var resX=(diffX<0?-1:1)-1/(diffX);
        var resY=(diffY<0?-1:1)-1/(diffY);

        return[
            resX
            ,
            resY
        ] ;
    }
    draw(ctx) {
        ctx.save();

        //croix grise
        ctx.beginPath();
        ctx.strokeStyle = this.couleur;
        ctx.moveTo(this.x-this.w/2, this.y);
        ctx.lineTo(this.x+this.w/2, this.y);
        ctx.moveTo(this.x,this.y-this.h/2);
        ctx.lineTo(this.x,this.y+this.h/2);
        ctx.stroke();

        // chemin si clic
        if(this.isClicking){
            this.clickPosition=this.clickPosition==null?[this.x,this.y]:this.clickPosition;
            ctx.strokeStyle = this.couleurChemin;
            ctx.beginPath();
            ctx.moveTo(this.clickPosition[0],this.clickPosition[1]);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        } else {    
            if(this.clickPosition!=null){
                this.#dragValue=this.#calculateDragValue();
            }
            this.clickPosition=null;    
        }

    }
}   