import Game from "./Game.js";
import Config from "./Config.js";

export default class Init {
    static init() {
        let container = document.getElementById("container");
        if (!container) {
            console.error("Erreur : L'élément #container est introuvable !");
            return;
        }

        let existingCanvas = document.getElementById("myCanvas");
        if (existingCanvas) {
            existingCanvas.remove();
        }

        let canvas = document.createElement("canvas");
        canvas.width = Config.Canvas.size.x;
        canvas.height = Config.Canvas.size.y;
        canvas.style.backgroundColor = "black";
        canvas.style.borderRadius = "20px";
        canvas.style.border = "3px solid gray";
        canvas.id = "myCanvas";

        container.appendChild(canvas);

        let panelsContainer = document.createElement("div");
        panelsContainer.width = "100%";
        panelsContainer.height = "100%";
        panelsContainer.style.padding    = "Opx Opx Opx Opx";
        panelsContainer.style.margin     = "Opx Opx Opx Opx";
        panelsContainer.style.top        = "0px";
        panelsContainer.style.left       = "0px";
        panelsContainer.id = "panelsContainer";

        container.appendChild(panelsContainer);

        let game = new Game(canvas);
        game.init();
        game.start();
    }
}

// Appel de la fonction init
Init.init();
