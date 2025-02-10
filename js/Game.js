import Config from "./Config.js";
import Star from "./Star.js"; // c'est juste de la deco
import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import SpaceJunk from "./SpaceJunk.js";
import ObjetSouris from "./ObjetSouris.js";
import Script from "./script.js";
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";

import { drawCircleImmediat } from "./utils.js";
export default class Game {
    objetsGraphiques = [];
    SpaceJunkList=[];
    StarList = [];
    score = 0;

    StartPanel=null;
    GameOver=null;

    constructor(canvas) {
        this.canvas = canvas;
        // etat du clavier
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
            mouseDown: false,
        };
        this.animationFrameId = null;
        this.running = false;

        this.timer = 0;
        this.spawnInterval = 1500;
        this.spawnIntervalStars = 300;
        this.lastSpawnTime = 0;
        this.lastSpawnTimeStars = 0;
        
        let panelsContainer = document.getElementById("panelsContainer");
        if (!panelsContainer) {
            console.error("Erreur : L'élément #container est introuvable !");
            return;
        }

        this.StartPanel = document.getElementById("StartPanel");
        if (this.StartPanel) {
            this.StartPanel.remove();
        }
        this.StartPanel= document.createElement("div");
        this.StartPanel.id="StartPanel";
        this.StartPanel.style.backgroundColor = "rgba(20,20,20,0.7)";
        this.StartPanel.style.borderRadius = "20px";
        this.StartPanel.style.border = "3px solid gray";
        this.StartPanel.style.color = "white";
        this.StartPanel.innerText="aaaa";
        panelsContainer.appendChild(this.StartPanel);



    }
    getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");
        this.score=0;
        this.player = new Player(Config.Canvas.size.x/2, Config.Canvas.size.y/2);
        this.objetsGraphiques.push(this.player);

        this.objetSouris = new ObjetSouris(
            200, 200,
            25, 25,
            Config.Cursor.color, Config.Cursor.pathColor
        );
        this.objetsGraphiques.push(this.objetSouris);


        // On ajoute la sortie
        // TODO

        // On initialise les écouteurs de touches, souris, etc.
        initListeners(this.inputStates, this.canvas);

        console.log("Game initialisé");
    }

    drawStar(ctx, x, y, size = 10, opacity = 1) {
        ctx.save();
        
        ctx.globalAlpha = opacity;
        ctx.fillStyle = "white";
    
        ctx.beginPath();
        for (let i = 0; i < 5; i++) { // pour faire une etoile
            let angle = (Math.PI / 5) * (i * 2);
            let xPos = x + Math.cos(angle) * size;
            let yPos = y + Math.sin(angle) * size;
            ctx.lineTo(xPos, yPos);
        }
        ctx.closePath();
        ctx.fill();
    
        ctx.restore();
    }
    

    drawRandomStars() {
        dessiner 
    }


    SpawnNewSpaceJunk() {
        const centerX = Config.Canvas.size.x / 2;
        const centerY = Config.Canvas.size.y / 2;
        const minSpeed = 300;
        const maxSpeed = 100;
    
        var bord = this.getRandomValue(0, 3); // 0 gauche, 1 haut, 2 droit, 3 bas
        let x, y, speedX, speedY;
    
        switch (bord) {
            case 0: // Gauche
                x = 1;
                y = this.getRandomValue(0, Config.Canvas.size.y);
                break;
            case 1: // Haut
                x = this.getRandomValue(0, Config.Canvas.size.x);
                y = 1;
                break;
            case 2: // Droite
                x = Config.Canvas.size.x-1;
                y = this.getRandomValue(0, Config.Canvas.size.y);
                break;
            case 3: // Bas
                x = this.getRandomValue(0, Config.Canvas.size.x);
                y = Config.Canvas.size.y-1;
                break;
        }
    
        // Calcule la direction vers le centre
        let directionX = centerX - x;
        let directionY = centerY - y;
        let length = Math.sqrt(directionX ** 2 + directionY ** 2);
    
        // Normalisation et application de la vitesse
        speedX = (directionX / length) * this.getRandomValue(minSpeed, maxSpeed);
        speedY = (directionY / length) * this.getRandomValue(minSpeed, maxSpeed);

        var size = this.getRandomValue(25, 40);

        this.SpaceJunkList.push(new SpaceJunk(x, y, size, size, speedX, speedY));
    }
    

    start() {
        console.log("Game démarré");
        this.running = true;
        this.timer = 0;
        this.lastSpawnTime = performance.now();
        this.lastSpawnTimeStars = performance.now();
        this.animationFrameId = requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }
    
    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
            this.running = false;
            console.log(`Game stoppé après ${this.timer / 1000} secondes`);
        }
    }
    
    mainAnimationLoop() {
        if (!this.running) return;
    
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAllObjects();
        this.update();
        
        this.animationFrameId = requestAnimationFrame(this.mainAnimationLoop.bind(this));

        this.ctx.fillStyle = "white";
        this.ctx.font = "15px Arial";
        this.ctx.justify = "center";
        this.ctx.fillText(`Score: ${this.score}`, 15 , 20);

    }

    drawAllObjects() {
        //background
        drawCircleImmediat(this.ctx,Config.Canvas.size.x/2, Config.Canvas.size.y*2 , Config.Canvas.size.y*1.2+6 , "IndianRed");
        drawCircleImmediat(this.ctx,Config.Canvas.size.x/2, Config.Canvas.size.y*2 , Config.Canvas.size.y*1.2+3 , "LightCoral");
        drawCircleImmediat(this.ctx,Config.Canvas.size.x/2, Config.Canvas.size.y*2 , Config.Canvas.size.y*1.2 , "DarkSalmon");
        this.StarList.forEach(star => star.draw(this.ctx));
        //objects
        
        this.SpaceJunkList.forEach(obj => {
            if (!(obj instanceof ObjetSouris)) obj.draw(this.ctx);
        });
    
        this.objetsGraphiques.forEach(obj => {
            if (!(obj instanceof ObjetSouris)) obj.draw(this.ctx);
        });
    
        this.objetSouris.draw(this.ctx);
    }
    

    update() {
        

        let currentTime = performance.now();  // Temps actuel en millisecondes
        let deltaT = (currentTime - (this.lastUpdateTime || currentTime)) / 1000; // Converti en secondes
    
        this.timer += deltaT;
        this.lastUpdateTime = currentTime;
    
        this.movePlayer(deltaT);
        this.moveSpaceJunk(deltaT);
        this.moveStars(deltaT); // Ajouté pour les étoiles
    
        this.objetSouris.x = this.inputStates.mouseX;
        this.objetSouris.y = this.inputStates.mouseY;
        this.objetSouris.isClicking = this.inputStates.mouseDown;
        this.testCollisionPlayerBordsEcran();
    
        if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
            let randomCount = this.getRandomValue(1, 3);
            for (let i = 0; i < randomCount; i++) {
                // this.SpawnNewSpaceJunk(); // todo reenable
            }
            this.lastSpawnTime = currentTime;
        }
        if (currentTime - this.lastSpawnTimeStars >= this.spawnIntervalStars) {
            let randomCount = this.getRandomValue(5, 10);
            for (let i = 0; i < randomCount; i++) {
                this.SpawnNewStar();
            }
            this.lastSpawnTimeStars = currentTime;
        }
    }
    
    

    movePlayer(deltaT) {

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

        //controle souris
        var dragValue = this.objetSouris.getDragValue();
        if(dragValue!=null){
            this.player.vitesseX+=dragValue[0]*30;
            this.player.vitesseY+=dragValue[1]*30;
        }
        this.player.move(deltaT);

        this.testCollisionsPlayer();
    }
    moveSpaceJunk(deltaT){
        this.SpaceJunkList.forEach(obj => {
            obj.move(deltaT);
        });
    }

    testCollisionsPlayer() {
        this.testCollisionPlayerObstacles();
    }

    testCollisionPlayerObstacles() {
        this.SpaceJunkList.forEach(obj => {
            if(obj instanceof Obstacle) {
                if(rectsOverlap(this.player.x-this.player.w/2, this.player.y - this.player.h/2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {

                    console.log("Collision!");
                    
                    this.inputStates.mouseDown=false;
                    this.stop();
                    alert("votre score est "+this.score+"!");
                    this.resetAll();

                }
            }
        });
    }
    testCollisionPlayerBordsEcran() {
        // filter plutot que foreach pour enlever le space junk au passage
        this.SpaceJunkList = this.SpaceJunkList.filter(obj => {
            if (
                (obj.x + obj.w / 2 > Config.Canvas.size.x) ||
                (obj.x + obj.w / 2 < 0) ||
                (obj.y + obj.h / 2 > Config.Canvas.size.y) ||
                (obj.y + obj.h / 2 < 0)
            ) {
                this.score++;
                return false;
            }
            return true;
        });
    }



    resetAll(){
        this.objetsGraphiques = [];
        this.SpaceJunkList=[];
        this.init();
        this.start();
    }


    moveStars() {
        this.StarList.forEach(star => {
            star.move();
        });
    
        // Supprimer les étoiles hors écran
        this.StarList = this.StarList.filter(star => 
            star.x >= 0 && star.x <= Config.Canvas.size.x &&
            star.y >= 0 && star.y <= Config.Canvas.size.y
        );
    }
    SpawnNewStar() { // etoiles derivees des spacejunk
        const centerX = Config.Canvas.size.x / 2;
        const centerY = Config.Canvas.size.y / 2;
        const minSpeed = 2;
        const maxSpeed = 10;
    
        var bord = this.getRandomValue(0, 3);
        let x, y, speedX, speedY, size, opacity;
    
        switch (bord) {
            case 0: // Gauche
                x = 0;
                y = this.getRandomValue(0, Config.Canvas.size.y);
                break;
            case 1: // Haut
                x = this.getRandomValue(0, Config.Canvas.size.x);
                y = 0;
                break;
            case 2: // Droite
                x = Config.Canvas.size.x;
                y = this.getRandomValue(0, Config.Canvas.size.y);
                break;
            case 3: // Bas
                x = this.getRandomValue(0, Config.Canvas.size.x);
                y = Config.Canvas.size.y;
                break;
        }
    
        let directionX = centerX - x;
        let directionY = centerY - y;
        let length = Math.sqrt(directionX ** 2 + directionY ** 2);
    
        speedX = (directionX / length) * this.getRandomValue(minSpeed, maxSpeed);
        speedY = (directionY / length) * this.getRandomValue(minSpeed, maxSpeed);
    
        size = this.getRandomValue(3, 8);
        opacity = Math.random() * 0.5;
    
        this.StarList.push(new Star(x, y, size, speedX, speedY, opacity));
    }




}

