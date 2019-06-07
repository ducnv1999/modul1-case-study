Enemies1 = function () {
    this.x = Math.floor(Math.random()*(maxwidth - 60))+30;
    this.y = 0;
    this.r = 20;
    this.speed = 1;
    this.color = 'blue';
    this.drawEnemy1 = function () {
        pen.beginPath();
        pen.lineWidth = '1';
        pen.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        pen.fillStyle = this.color;
        pen.fill();
        pen.stroke();
    };
    this.move = function () {
        this.y += this.speed;
    }
};

Enemies2 = function () {
    this.x = Math.floor(Math.random()*(maxwidth - 60))+30;
    this.y = 0;
    this.width = 20;
    this.speed = 1;
    this.color = 'red';
    this.drawEnemy2 = function () {
        pen.beginPath();
        pen.lineWidth = '1';
        pen.rect(this.x, this.y, this.width, this.width);
        pen.fillStyle = this.color;
        pen.fill();
        pen.stroke();
    };
    this.move = function () {
        this.y += this.speed;
    }
};

function checkEnemiesOverlap(enemies) {
    if (enemies === enemies1) {
        let enemy1 = new Enemies1();
        let check11 = true;
        for (let i = 0; i < enemies1.length; i++) {
            if (Math.sqrt(Math.pow((enemy1.x - enemies1[i].x), 2) + Math.pow((enemy1.y - enemies1[i].y), 2))
                <= (enemy1.r + enemies1[i].r)) {
                check11 = false;
                break;
            }
        }
        let check12 = true;
        for (let i = 0; i < enemies2.length; i++) {
            if (enemy1.x >= enemies2[i].x && enemy1.r >= enemies2[i].y && (enemy1.x - enemies2[i].x) <= (enemy1.r + enemies2[i].width)
                || enemy1.x <= enemies2[i].x && enemies2[i].y <= enemy1.r && (enemies2[i].x - enemy1.x ) <= enemies2[i].width) {
                check12 = false;
                break;
            }
        }
        if (check11 === true && check12 === true) {
            enemies1.push(enemy1);
        }
    }
    if (enemies === enemies2) {
        let enemy2 = new Enemies2();
        let check22 = true;
        for (let i = 0; i < enemies2.length; i++){
            if (Math.abs(enemies2[i].x - enemy2.x) <= enemies2[i].width && (enemies2[i].y - enemy2.y) <= enemies2[i].width) {
                check22 = false;
                break;
            }
        }
        let check21 = true;
        for (let i = 0; i < enemies1.length; i++) {
            if ((enemy2.x >= enemies1[i].x && (enemy2.width + enemies1[i].r) >= enemies1[i].y && (enemy2.x - enemies1[i].x) <= enemies1[i].r)
                || (enemy2.x <= enemies1[i].x && enemies1[i].y <= (enemy2.width + enemies1[i].r) && (enemies1[i].x - enemy2.x) <= (enemies1[i].r + enemy2.width))){
                check21 = false;
                break
            }
        }
        if (check22 === true && check21 === true) {
            enemies2.push(enemy2);
        }
    }
}
