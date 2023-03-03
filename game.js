// Map Data
const image = new Image(2560, 2560); // Using optional size for image
image.src = "images/BasicGameMap400.png"; //Load Image

// Image Data
const walkUpImage = new Image();
walkUpImage.src = "images/ACharUp.png";
const walkDownImage = new Image();
walkDownImage.src = "images/ACharDown.png";
const walkLeftImage = new Image();
walkLeftImage.src = "images/ACharLeft.png";
const walkRightImage = new Image();
walkRightImage.src = "images/ACharRight.png";

const Actor1 = new Image();
Actor1.src = "images/Actor1.png";

walkAnimationDirections = [walkUpImage, walkDownImage, walkLeftImage, walkRightImage];

const mapDimensions = [40, 40];

var collisionMap = []
for (y = 0; y < mapDimensions[1]; y++) {
    for (x = 0; x < mapDimensions[1]; x++) {
        collisionMap.push(0)
    }
}

collisionMap[2 + 40] = 1

var gridSize = image.width/mapDimensions[0];

console.log(gridSize);

// Player Game Data
var playerPos = [-.5 * mapDimensions[0] * gridSize, -.5 * mapDimensions[1] * gridSize];
var projectedPosition = [0, 0]
var playerVelocity = [0, 0];
var playerDirection = 0;

// Drawing Data
const playerRect = [50, 80];
var gloabalAnimationFrame = 0;
var gloabalAnimationDuraiton = 40;
var playerAnimationFrame = 1;
var playerAnimationDuraiton = 40;
var animate = false

window.onload = function() {
    // Canvas Setup
    board = document.getElementById("board");
    displayWindowSize();
    context = board.getContext("2d");

    // Event Listeners
    document.addEventListener("keydown", playerInputDown);
    document.addEventListener("keyup", playerInputUp);
    window.addEventListener("resize", displayWindowSize);

    // update
    setInterval(update, 1000/60);
}

function update() {
    
    //Draw Map
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
    context.drawImage(image, playerPos[0] + board.width/2, playerPos[1] + board.height/2);
    
    // Game Updates
    projectedPosition = [playerPos[0] + playerVelocity[0], playerPos[1] + playerVelocity[1]]
    if (collisionMap[Math.floor(projectedPosition[0]/gridSize + .5) * -1 + Math.floor(playerPos[1]/gridSize + .5) * -1 * 40] == 0)  {
        playerPos[0] += playerVelocity[0];
    }
    if (collisionMap[Math.floor(playerPos[0]/gridSize + .5) * -1 + Math.floor(projectedPosition[1]/gridSize + .5) * -1 * 40] == 0)  {
        playerPos[1] += playerVelocity[1];
    }
    //console.log(collisionMap[Math.floor(playerPos[0]/gridSize + .5) * -1 + Math.floor(playerPos[1]/gridSize + .5) * -1 * 40])
    
    gloabalAnimationFrame += 1;
    if (gloabalAnimationFrame >= gloabalAnimationDuraiton){
        gloabalAnimationFrame = 1;
    }
    
    if (animate) {
        playerAnimationFrame += 1;
        if (playerAnimationFrame >= playerAnimationDuraiton) {
            playerAnimationFrame = 1;
        }
    }
    
    if (playerVelocity[1] == 5){
        playerDirection = 3;
    }
    else if (playerVelocity[1] == -5){
        playerDirection = 0;
    }   
    else if (playerVelocity[0] == 5){
        playerDirection = 1;
    }   
    else if (playerVelocity[0] == -5){
        playerDirection = 2;
    }
        
    
    // Draw Player Rect
    
    //context.drawImage(walkAnimationDirections[playerDirection], Math.floor(playerAnimationFrame%(playerAnimationDuraiton/2)/(playerAnimationDuraiton/4))*walkUpImage.width/2, Math.floor(playerAnimationFrame/(gloabalAnimationDuraiton/2))*walkUpImage.width/2, walkUpImage.width/2, walkUpImage.width/2, board.width/2 - playerRect[0]/2, board.height/2 - playerRect[1]/2, 64*1.5, 64*1.5);
    context.drawImage(Actor1, Math.floor(playerAnimationFrame/playerAnimationDuraiton * 3)*Actor1.width/3, playerDirection*Actor1.height/4, Actor1.width/3, Actor1.height/4, board.width/2 - Actor1.width/3, board.height/2 - Actor1.height/4, gridSize * 1.2, gridSize * 1.2);

}

function playerInputDown(e) {
    if(e.key == "ArrowUp" || e.key == "w") {
        playerVelocity[1] = 5;
        //playerDirection = 0;
    }
    if(e.key == "ArrowDown" || e.key == "s") {
        playerVelocity[1] = -5;
        //playerDirection = 1;
    } 
    if(e.key == "ArrowLeft" || e.key == "a") {
        playerVelocity[0] = 5;
        //playerDirection = 2;
    } 
    if(e.key == "ArrowRight" || e.key == "d") {
        playerVelocity[0] = -5;
        //playerDirection = 3;
    } 
    if (e.key == "ArrowUp" || e.key == "w" || e.key == "ArrowDown" || e.key == "s" || e.key == "ArrowLeft" || e.key == "a" || e.key == "ArrowRight" || e.key == "d") {
        animate = true
    }
}

function playerInputUp(e) {
    if((e.key == "ArrowUp" || e.key == "w") && playerVelocity[1] == 5) {
        playerVelocity[1] = 0;
        playerAnimationFrame = 1;
    }
    if((e.key == "ArrowDown" || e.key == "s") && playerVelocity[1] == -5) {
        playerVelocity[1] = 0;
        playerAnimationFrame = 1;
    } 
    if((e.key == "ArrowLeft" || e.key == "a") && playerVelocity[0] == 5) {
        playerVelocity[0] = 0;
        playerAnimationFrame = 1;
    } 
    if((e.key == "ArrowRight" || e.key == "d") && playerVelocity[0] == -5) {
        playerVelocity[0] = 0 ;
        playerAnimationFrame = 1;
    } 
    if (e.key == "ArrowUp" || e.key == "w" || e.key == "ArrowDown" || e.key == "s" || e.key == "ArrowLeft" || e.key == "a" || e.key == "ArrowRight" || e.key == "d") {
        if (playerVelocity[0] == 0 && playerVelocity[1] == 0 ) {
            animate = false;
            playerAnimationFrame = 1;
        }
    }
}

function displayWindowSize() {
    board.width = (window.innerHeight-20) * 1.5;
    board.height = window.innerHeight-20;
}