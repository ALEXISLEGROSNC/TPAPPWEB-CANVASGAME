import Game from "./Game.js";
import Config from "./Config.js";

export default class Init {
    static init() {
        let container = document.getElementById("container"); // ✅ Supprimer le #
        if (!container) {
            console.error("Erreur : L'élément #container est introuvable !");
            return;
        }

        // Vérifie si le canvas existe déjà
        let existingCanvas = document.getElementById("myCanvas"); // ✅ Utiliser document au lieu de container
        if (existingCanvas) {
            existingCanvas.remove();
        }

        // Crée un nouveau canvas
        let canvas = document.createElement("canvas"); // ✅ Utiliser document.createElement
        canvas.width = Config.Canvas.size.x;
        canvas.height = Config.Canvas.size.y;
        canvas.style.backgroundColor = "black";
        canvas.style.borderRadius = "20px";
        canvas.style.border = "3px solid gray";
        canvas.id = "myCanvas";

        // Ajoute le canvas au container
        container.appendChild(canvas); // ✅ Ajouter au container au lieu de document.body

        // Création et démarrage du jeu
        let game = new Game(canvas);
        game.init(); // ✅ Suppression de await si init() n'est pas async
        game.start();
    }
}

// Appel de la fonction init
Init.init();
