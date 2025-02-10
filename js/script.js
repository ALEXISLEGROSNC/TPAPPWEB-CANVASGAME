import Game from "./Game.js";
import Config from "./Config.js";

export default class Init {
    static init() {
        let container = document.getElementById("container");
        if (!container) {
            console.error("Erreur : L'élément #container est introuvable !");
            return;
        }
        container.position="relative";

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
        panelsContainer.style.width = "100%";
        panelsContainer.style.height = "100%";
        panelsContainer.style.padding = "0px";
        panelsContainer.style.margin = "0px";
        panelsContainer.style.position = "absolute";
        panelsContainer.style.top = "0px";
        panelsContainer.style.left = "0px";
        panelsContainer.id = "panelsContainer";
        container.appendChild(panelsContainer);

        let game = new Game(canvas);
        game.init();
        game.start();
    }
}

// Appel de la fonction init
Init.init();
