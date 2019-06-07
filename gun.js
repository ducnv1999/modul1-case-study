Guns = function () {
    this.xStock = maxwidth/2;
    this.yStock = maxheight;
    this.rStock = 30;

    this.xShield = 0;
    this.yShield = 580;
    this.widthShield = maxwidth;
    this.heightShield = 120;

    this.speed = 18;
    this.color = '#ffffff';

    this.drawStockGun = function () {
        pen.beginPath();
        pen.lineWidth = '1';
        pen.fillStyle = this.color;
        pen.arc(this.xStock, this.yStock, this.rStock , Math.PI, Math.PI *2);
        pen.fill();
        pen.stroke();
    };

    this.drawBarrelGun = function () {
        pen.beginPath();
        pen.lineWidth = '10';
        pen.moveTo(this.xStock, this.yStock);
        pen.lineTo(this.xStock, this.yStock - 60);
        pen.stroke();
    };

    this.drawShield = function () {
        pen.beginPath();
        pen.lineWidth = '1';
        pen.rect(this.xShield, this.yShield, this.widthShield, this.heightShield);
        pen.stroke();
    }
};

Bullets = function() {
    this.x = gun.xStock;
    this.y = gun.yStock - 40;
    this.r = 5;
    this.speedY = 10;
    this.color = '#ffffff';
    this.drawBullet = function () {
        pen.beginPath();
        pen.fillStyle = this.color;
        pen.lineWidth = '1';
        pen.arc(this.x, this.y, this.r, 0, Math.PI*2);
        pen.fill();
    };
    this.move = function () {
        this.y -= this.speedY;

    };
};