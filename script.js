import Player from "./player.js";
import bulletController from "./bulletController.js";
import Box from "./Box.js";
import Score from "./Score.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const MILLISECONDS_BETWEEN_BOXES = 3000;


canvas.width = 650;
canvas.height = 600;

const bulletcontroller = new bulletController(canvas);
const player = new Player(canvas.width / 2.2, canvas.height / 1.1, bulletcontroller);
const boxes = [];
var gameover = false;
var randomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
}
const scoreCard = new Score(canvas.width, canvas.height, 520, 80, "text", 0);
let boxesGenerator;
let startBoxesGenerator = () => {
    boxesGenerator = setInterval(() => {
        if (boxes.length != 50) {
            boxes.push(new Box(
                canvas.height, canvas.width,
                Math.floor(Math.random() * canvas.width/1.4), 0,"#" + randomColor(), 100
            ));
        }
    }, MILLISECONDS_BETWEEN_BOXES);
};

function gameloop() {
    setCommonStyle();
    if (gameover) {
        return;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    bulletcontroller.draw(ctx);
    player.draw(ctx);
    var z = 1;
    scoreCard.update(ctx, z);
  
    boxes.forEach(box => {
        
        if (bulletcontroller.collideWith(box)) {
            if (box.health <= 0) {  
                scoreCard.updateScore(z);
                const i = boxes.indexOf(box);
                boxes.splice(i, 1); 
                
            }
        }
        else {
            box.draw(ctx);
            box.newPos();
        }
    })
    boxes.forEach(box => {
        isGameOver(box);
    })
    
    startBoxesGenerator();
    
    
}


function isGameOver(box) {
    if (player.collideWith(box)) {
        gameover = true;
    }
    if (gameover) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }
}
function setCommonStyle() {
    ctx.shadowColor = "red";
    // ctx.shadowBlur = 20;
    ctx.lineJoin = "bevel";
    ctx.lineWidth = 5;
}

setInterval(gameloop, 1000 / 60);