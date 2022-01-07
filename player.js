export default class Player {
    constructor(x, y, bulletController) {
        this.x = x;
        this.y = y;
        this.bulletController = bulletController;
        this.width = 40;
        this.height = 40;
        this.speed = 8;
        this.left = false;
        this.right = false;
        this.active = true;
        document.addEventListener("keydown", this.keydown)
        document.addEventListener("keyup", this.keyup)
    }

    draw(ctx) {
        this.move();
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#ccc";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.shoot()
    }
    shoot() {
        if (this.shootPressed) {
            let speed = 13;
            let delay = 8;
            let damage = 20;
            let bulletX = this.x + this.width / 2;
            let bulletY = this.y ;
            this.bulletController.shoot(bulletX, bulletY, damage, delay, speed);
        }

    }
    move() {
        // if (this.downPressed)
        //     this.y += this.speed;
        // if (this.upPressed)
        //     this.y -= this.speed;
        if (this.leftPressed)
            this.x -= this.speed;
        if (this.rightPressed)
            this.x += this.speed;
            
    }

    keydown = (e) => {
        // if (e.code === "ArrowDown")
        //     this.downPressed = true;
        // if (e.code === "ArrowUp")
        //     this.upPressed = true;
        if (e.code === "ArrowRight")
            this.rightPressed = true;
        if (e.code === "ArrowLeft")
            this.leftPressed = true;
        if (e.code === "Space")
            this.shootPressed = true;
            
    }
    keyup = (e) => {
        // if (e.code === "ArrowDown")
        //     this.downPressed = false;
        // if (e.code === "ArrowUp")
        //     this.upPressed = false;
        if (e.code === "ArrowRight")
            this.rightPressed = false;
        if (e.code === "ArrowLeft")
            this.leftPressed = false;
        if (e.code === "Space")
            this.shootPressed = false;
            
    }
    collideWith(box) {
        if (
            this.x < box.x + box.width &&
            this.x + this.width > box.x &&
            this.y < box.y + box.height &&
            this.y + this.height > box.y
        )
            return true;
        else return false;
    }

}