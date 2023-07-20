
class Ball {
    constructor(x, y,vx, vy, r){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
    }
    
    draw() {
        ctx.fillStyle = "gray";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    bounceWall() {
        //TOP WALL
        if (this.y < this.r)  {
            this.vy = 1 * Math.abs(this.vy);
        }
        // BOTTOM WALL
        if (this.y > BOARDHEIGHT - this.r) {
            this.vy = -1 * Math.abs(this.vy);
        }
    }
    
    bouncePaddleL(paddle) {
        // not bouncing on paddle
        if (this.x - this.r > paddle.w) return false;
        
        // ball higher than paddle
        if (this.y < paddle.y) return true;
        
        // ball lower than paddle
        if (this.y > paddle.y + paddle.l) return true;
        
        // ball hit paddle
        this.vx = Math.abs(this.vx);
        let paddlePos = (this.y - paddle.y - paddle.l/2) / paddle.l * 2;
        this.vy = this.vy +  paddlePos*PADDLESPIN;
        
        return false;
    }
    
    bouncePaddleR(paddle) {
        // not bouncing on paddle
        if (this.x + this.r < paddle.x) return false;
        
        // ball higher than paddle
        if (this.y < paddle.y) return true;
        
        // ball lower than paddle
        if (this.y > paddle.y + paddle.l) return true;
        
        // ball hit paddle
        this.vx = -1 * Math.abs(this.vx);
        let paddlePos = (this.y - paddle.y - paddle.l/2) / paddle.l * 2;
        this.vy = this.vy +  paddlePos*PADDLESPIN;
        
        return false;
    }
    
    move() {
        this.x+=this.vx
        this.y+=this.vy
    }
}
