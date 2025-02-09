import Config from "./Config.js";
import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import SpaceJunk from "./SpaceJunk.js";
import ObjetSouris from "./ObjetSouris.js";
import Script from "./script.js";
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";
export default class Game {
    objetsGraphiques = [];

    constructor(canvas) {
        this.canvas = canvas;
        // etat du clavier
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
            mouseDown: false,
        };
        this.SpaceJunkList=[];
    }

    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");

        this.player = new Player(100, 100);
        this.objetsGraphiques.push(this.player);

        this.objetSouris = new ObjetSouris(
            200, 200,
            25, 25,
            Config.Cursor.color, Config.Cursor.pathColor
        );
        this.objetsGraphiques.push(this.objetSouris);


        let obstacle1 = new SpaceJunk(500, 500, 100, 100, -2,-2);
        this.SpaceJunkList.push(obstacle1);
        this.objetsGraphiques.push(obstacle1);

        // On ajoute la sortie
        // TODO

        // On initialise les écouteurs de touches, souris, etc.
        initListeners(this.inputStates, this.canvas);

        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");

        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAllObjects();
        this.update();
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects() {
        this.objetsGraphiques.forEach(obj => {
            if(!(obj instanceof ObjetSouris)) obj.draw(this.ctx);
        });
        this.objetSouris.draw(this.ctx);
    }

    update() {
        
        this.movePlayer();
        this.moveSpaceJunk();
        this.objetSouris.x = this.inputStates.mouseX;
        this.objetSouris.y = this.inputStates.mouseY;
        this.objetSouris.isClicking=this.inputStates.mouseDown;

        // On regarde si le joueur a atteint la sortie
        // TODO

    }

    movePlayer() {

        //SORTIES
            // cotes
        if((this.player.x+this.player.w/2)>Config.Canvas.size.x){ // droit
            this.player.x=0+this.player.w/2;
        }
        if((this.player.x-this.player.w/2)<0){ // gauche
            this.player.x=Config.Canvas.size.x-this.player.w/2;
        }
            // haut/bas
        if((this.player.y+this.player.h/2)>Config.Canvas.size.y){ // haut
            this.player.y=0+this.player.h/2;
        }
        if((this.player.y-this.player.h/2)<0){ // bas
            this.player.y=Config.Canvas.size.y-this.player.h/2;
        }

        var dragValue = this.objetSouris.getDragValue();
        if(dragValue!=null){
            this.player.vitesseX+=dragValue[0]*0.2;
            this.player.vitesseY+=dragValue[1]*0.2;
        }

        this.player.move();

        this.testCollisionsPlayer();
    }
    moveSpaceJunk(){
        this.SpaceJunkList.forEach(obj => {
            obj.move();
        });
    }

    testCollisionsPlayer() {
        this.testCollisionPlayerObstacles();
    }

    testCollisionPlayerObstacles() {
        this.objetsGraphiques.forEach(obj => {
            if(obj instanceof Obstacle) {
                if(rectsOverlap(this.player.x-this.player.w/2, this.player.y - this.player.h/2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {

                    console.log("Collision!");
                    this.init();

                }
            }
        });
    }

}

