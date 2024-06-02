class SpelObject {
    constructor(x, y, v, imgSrc) {
        this.x = x;
        this.y = y;
        switch(v) {
            case 1:
                this.vx = 1;
                this.vy = 1;
                break;
            case 2:
                this.vx = -1;
                this.vy = 1;
                break;
            case 3:
                this.vx = 1;
                this.vy = -1;
                break;
            case 4:
                this.vx = -1;
                this.vy = -1;
                break;
            default:
                break;
        }
        this.size = 50;
        this.img = new Image();
        this.img.src = imgSrc;
    }
    move(canvas) {
        this.x+=this.vx;
        this.y+=this.vy;
        if(this.x+this.size>=canvas.clientWidth || this.x<=0) {
            this.vx = -this.vx
        }
        if(this.y+this.size>=canvas.clientHeight || this.y<=0) {
            this.vy= -this.vy;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
    collide(o) {
        if(this.x+this.size>o.x && this.x<o.x+o.size) {
            if(this.y+this.size>o.y && this.y<o.y+o.size) {
                return true
            }
        }
        return false;
    }
}
class Schaar extends SpelObject {
    constructor(x, y, v) {
        super(x, y, v, 'schaar.webp');
    }
}
class Steen extends SpelObject {
    constructor(x, y, v) {
        super(x, y, v, 'steen.webp');
    }
}
class Papier extends SpelObject {
    constructor(x, y, v) {
        super(x, y, v, 'papier.webp');
    }
}