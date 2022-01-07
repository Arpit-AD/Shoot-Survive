export default class Box {
    constructor(canvasHeight, canvasWidth, x, y, color, health) {
        this.width = 35;
        this.height = 35;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        // this.x = Math.random()*canvasWidth - this.width;
        // this.y = canvasHeight;
        this.x = x;
        this.y = y;
        this.color = color;
        this.health = health;
        this.gravity = Math.random()/80;
        this.gravitySpeed = 0;
        this.speedX = 0;
        this.bounce = 1;
        this.speedY = 0;
        this.active = true;
    }
    newPos() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    hitBottom() {
        var rockbottom = this.canvasHeight - 2*this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
      }
    draw(ctx) {
        ctx.fillStyle = this.color;
        // if (this.health >= 1)
        // {
        //     ctx.strokeStyle = "white";
        // }
        // else {
            ctx.strokeStyle = this.color;
        // }
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // ctx.fillStyle = "black";
        // ctx.font = "25px Arial";
        // ctx.fillText(this.health, this.x + this.width / 3, this.y + this.height/1.5)

    }
    takeDamage() {
        this.health = 0;
    }
}

