export default class Score{
    constructor(width,height, x, y, type,score) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.score = score;
    }
    updateScore(scoredBoxes) {
        this.score = this.score + scoredBoxes;
        return this.score;
    }
    update(ctx) {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("SCORE:" , this.x, this.y-30);
        ctx.fillText(this.score, this.x, this.y);
        ctx.fillText("REST AREA", this.x, this.y+300);
    } 


}