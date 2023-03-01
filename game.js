const image = new Image(5000, 5000); // Using optional size for image

// Load an image of intrinsic size 300x227 in CSS pixels
image.src = "images/BasicGameMap600.png";

playerPos = [-2000, -2000]
playerVelocity = [0, 0]

window.onload = function() {
    board = document.getElementById("board");
    displayWindowSize()
    context = board.getContext("2d");

    //openFullscreen()

    document.addEventListener("keydown", playerInputDown);

    document.addEventListener("keyup", playerInputUp);

    window.addEventListener("resize", displayWindowSize);

    // update
    setInterval(update, 1000/60);
}

function update() {
    context.fillStyle="black";
    playerPos[0] += playerVelocity[0];
    playerPos[1] += playerVelocity[1];
    context.fillRect(0, 0, board.width, board.height);
    context.drawImage(image, playerPos[0], playerPos[1]);
}

function playerInputDown(e) {
    if(e.key == "ArrowUp" || e.key == "w") {
        playerVelocity[1] = 10;
    }
    if(e.key == "ArrowDown" || e.key == "s") {
        playerVelocity[1] = -10;
    } 
    if(e.key == "ArrowLeft" || e.key == "a") {
        playerVelocity[0] = 10;
    } 
    if(e.key == "ArrowRight" || e.key == "d") {
        playerVelocity[0] = -10;
    } 
}

function playerInputUp(e) {
    if((e.key == "ArrowUp" || e.key == "w") && playerVelocity[1] == 10) {
        playerVelocity[1] = 0;
    }
    if((e.key == "ArrowDown" || e.key == "s") && playerVelocity[1] == -10) {
        playerVelocity[1] = 0;
    } 
    if((e.key == "ArrowLeft" || e.key == "a") && playerVelocity[0] == 10) {
        playerVelocity[0] = 0;
    } 
    if((e.key == "ArrowRight" || e.key == "d") && playerVelocity[0] == -10) {
        playerVelocity[0] = 0 ;
    } 
}

function displayWindowSize() {
    board.width = (window.innerHeight-20) * 1.5;
    board.height = window.innerHeight-20;
}