function initListeners(inputStates, canvas) {
    window.onkeydown = (event) => {
        console.log("Touche pressée : " + event.key);
        if(event.key === "ArrowRight") {
            inputStates.ArrowRight = true;
        }
        if(event.key === "ArrowLeft") {
            inputStates.ArrowLeft = true;
        }
        if(event.key === "ArrowUp") {
            inputStates.ArrowUp = true;
        }
        if(event.key === "ArrowDown") {
            inputStates.ArrowDown = true;
        }
    }

    window.onkeyup = (event) => {
        console.log("Touche relachée : " + event.key);
        if(event.key === "ArrowRight") {
            inputStates.ArrowRight = false;
        }
        if(event.key === "ArrowLeft") {
            inputStates.ArrowLeft = false;
        }
        if(event.key === "ArrowUp") {
            inputStates.ArrowUp = false;
        }
        if(event.key === "ArrowDown") {
            inputStates.ArrowDown = false;
        }
    }

    window.onmousemove = (event) => {
        inputStates.mouseX = event.clientX - canvas.getBoundingClientRect().left;
        inputStates.mouseY = event.clientY - canvas.getBoundingClientRect().top;
    }

    canvas.onmousedown = (event) => {
        inputStates.mouseDown=true;
    }
    window.onmouseup = (event) => {
        inputStates.mouseDown=false;
    }

}

export { initListeners };