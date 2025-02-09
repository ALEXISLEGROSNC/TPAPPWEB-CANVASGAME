import Game from "./Game.js";
import Config from "./Config.js";


window.onload = init;

async function init() {
    
    if (document.querySelector("#myCanvas")) existingCanvas.remove();

    let canvas = document.createElement("canvas");
    canvas.width = Config.Canvas.size.x;    //config
    canvas.height = Config.Canvas.size.y;   //config
    canvas.id = "myCanvas";

    document.body.appendChild(canvas);
    
    let game = new Game(canvas);
    
    await game.init();

    game.start();
}

