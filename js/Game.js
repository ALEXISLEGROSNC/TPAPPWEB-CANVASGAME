import Config from "./Config.js";
import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import ObjetSouris from "./ObjetSouris.js";
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


        // On cree deux obstacles
        let obstacle1 = new Obstacle(300, 0, 40, 600, "red");
        this.objetsGraphiques.push(obstacle1);
        let obstacle2 = new Obstacle(500, 500, 100, 100, "blue");
        this.objetsGraphiques.push(obstacle2);

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

        this.objetSouris.x = this.inputStates.mouseX;
        this.objetSouris.y = this.inputStates.mouseY;
        this.objetSouris.isClicking=this.inputStates.mouseDown;

        // On regarde si le joueur a atteint la sortie
        // TODO

    }

    movePlayer() {
        // this.player.vitesseX = 0;
        // this.player.vitesseY = 0;
        

        // if(this.inputStates.ArrowRight) {
        //     this.player.vitesseX = 3;
        // } 
        // if(this.inputStates.ArrowLeft) {
        //     this.player.vitesseX = -3;
        // } 

        // if(this.inputStates.ArrowUp) {
        //     this.player.vitesseY = -3;
        // } 

        // if(this.inputStates.ArrowDown) {
        //     this.player.vitesseY = 3;
        // }

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
            this.player.vitesseX+=dragValue[0]*5;
            this.player.vitesseY+=dragValue[1]*5;
        }

        this.player.move();

        this.testCollisionsPlayer();
    }

    testCollisionsPlayer() {
        // Teste collision avec les bords du canvas
        // this.testCollisionPlayerBordsEcran();

        // Teste collision avec les obstacles
        this.testCollisionPlayerObstacles();
       
    }

    testCollisionPlayerBordsEcran() {
        // Raoppel : le x, y du joueur est en son centre, pas dans le coin en haut à gauche!
        if(this.player.x - this.player.w/2 < 0) {
            // On stoppe le joueur
            this.player.vitesseX = 0;
            // on le remet au point de contaxct
            this.player.x = this.player.w/2;
        }
        if(this.player.x + this.player.w/2 > this.canvas.width) {
            this.player.vitesseX = 0;
            // on le remet au point de contact
            this.player.x = this.canvas.width - this.player.w/2;
        }

        if(this.player.y - this.player.h/2 < 0) {
            this.player.y = this.player.h/2;
            this.player.vitesseY = 0;

        }
       
        if(this.player.y + this.player.h/2 > this.canvas.height) {
            this.player.vitesseY = 0;
            this.player.y = this.canvas.height - this.player.h/2;
        }
    }

    testCollisionPlayerObstacles() {
        this.objetsGraphiques.forEach(obj => {
            if(obj instanceof Obstacle) {
                if(rectsOverlap(this.player.x-this.player.w/2, this.player.y - this.player.h/2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    // collision

                    // ICI TEST BASIQUE QUI ARRETE LE JOUEUR EN CAS DE COLLIION.
                    // SI ON VOULAIT FAIRE MIEUX, ON POURRAIT PAR EXEMPLE REGARDER OU EST LE JOUEUR
                    // PAR RAPPORT A L'obstacle courant : il est à droite si son x est plus grand que le x de l'obstacle + la largeur de l'obstacle
                    // il est à gauche si son x + sa largeur est plus petit que le x de l'obstacle
                    // etc.
                    // Dans ce cas on pourrait savoir comment le joueur est entré en collision avec l'obstacle et réagir en conséquence
                    // par exemple en le repoussant dans la direction opposée à celle de l'obstacle...
                    // Là par défaut on le renvoie en x=10 y=10 et on l'arrête
                    console.log("Collision avec obstacle");
                    // this.player.x = 10;
                    // this.player.y = 10;
                    // this.player.vitesseX = 0;
                    // this.player.vitesseY = 0;
                }
            }
        });
    }

}

