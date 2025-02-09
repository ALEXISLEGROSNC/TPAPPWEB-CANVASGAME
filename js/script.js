import Game from "./Game.js";
import Config from "./Config.js";


export default class Init {
    static async init() {
        // Vérifiez si un élément avec l'ID 'myCanvas' existe déjà
        let existingCanvas = document.querySelector("#myCanvas");
        if (existingCanvas) {
            existingCanvas.remove();
        }

        // Créez un nouvel élément <canvas> avec les dimensions spécifiées dans Config
        let canvas = document.createElement("canvas");
        canvas.width = Config.Canvas.size.x;
        canvas.height = Config.Canvas.size.y;
        canvas.style = "background-color: black; border-radius: 20px; border: 3px solid gray";
        canvas.id = "myCanvas";

        // Ajoutez le nouvel élément <canvas> au DOM
        document.body.appendChild(canvas);

        // Créez une instance du jeu
        let game = new Game(canvas);

        // Initialisez le jeu
        await game.init();

        // Démarrez le jeu
        game.start();
    }
}

// Appel de la fonction init
Init.init();
