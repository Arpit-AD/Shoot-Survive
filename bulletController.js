import Bullet from "./bullet.js";

export default class bulletController {
    bullets = [];
    timefornextbullet = 0;

    constructor(canvas) {
        this.canvas = canvas;
    }
    shoot(x,y,damage,delay,speed) {
        if (this.timefornextbullet <= 0) {
            this.bullets.push(new Bullet(x, y, speed, damage));
            this.timefornextbullet = delay;
        }
        this.timefornextbullet--;
    }
    draw(ctx) {
        // console.log(this.bullets.length);
        this.bullets.forEach((bullet) => {
            if (this.isBulletOffScreen(bullet)) {
                const index = this.bullets.indexOf(bullet);
                this.bullets.splice(index,1);
            }
            bullet.draw(ctx)
        }
        );
    }

    collideWith(sprite) {
        return this.bullets.some(bullet => {
            if (bullet.collideWith(sprite)) {
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
                return true;
            }
            return false;
        })
        
    }

    isBulletOffScreen(bullet) {
        return bullet.y <= -bullet.height;
    }
}