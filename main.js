const maxwidth = 400;
const maxheight = 600;

let canvas = document.getElementById('myCanvas');
let pen = canvas.getContext('2d');

let enemies1 = [];
let enemies2 = [];
let bullets = [];

let hp = 10;
let point = 0;
let stop = false;

let count = 0;
let loop;

let gun = new Guns();

function draw() {
    pen.clearRect(0,0,canvas.width, canvas.height);

    gun.drawBarrelGun();
    gun.drawStockGun();
    gun.drawShield();

    for (let i = 0; i < bullets.length; i++) {
        bullets[i].drawBullet();
    }
    for (let i = 0; i < enemies1.length; i++) {
        enemies1[i].drawEnemy1();
    }
    for (let i = 0; i < enemies2.length; i++) {
        enemies2[i].drawEnemy2();
    }
}

function moveGun(event) {
    switch (event.code) {
        case "KeyA" :
        case "ArrowLeft":
            if (gun.xStock - 5 >= gun.speed){
                gun.xStock -= gun.speed;
            }
            break;
        case "KeyD":
        case "ArrowRight":
            if (gun.xStock - 5 < maxwidth - (10 + gun.speed)) {
                gun.xStock += gun.speed;
            }
            break;
    }
}

function moveAllElements() {
    for (let i = 0; i < enemies1.length; i++) {
        enemies1[i].move();
        if (enemies1[i].y > gun.yShield - enemies1[i].r) {
            enemies1.splice(enemies1.indexOf(enemies1[i]),1);
            hp--;
        }
    }
    for (let i = 0; i < enemies2.length; i++) {
        enemies2[i].move();
        if (enemies2[i].y > gun.yShield - enemies2[i].width) {
            enemies2.splice(enemies2.indexOf(enemies2[i]),1);
            hp--;
        }
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].move();
    }
}

function killEnemy(enemies) {
    if (enemies === enemies1) {
        for (let i = 0; i < bullets.length; i++) {
            for (let j = 0; j < enemies1.length; j++) {
                if (Math.abs(bullets[i].x - enemies1[j].x) <= (bullets[i].r + enemies1[j].r)) {
                    if (Math.abs(bullets[i].y - enemies1[j].y) <= (bullets[i].r + enemies1[j].r)) {
                        bullets.splice(bullets.indexOf(bullets[i]),1);
                        enemies1.splice(enemies1.indexOf(enemies1[j]),1);
                        point +=2;
                    }
                }
            }
        }
    }
    if (enemies === enemies2) {
        for (let i = 0; i< bullets.length; i++) {
            for (let k = 0; k < enemies2.length; k++) {
                if (enemies2[k].x < bullets[i].x
                    && enemies2[k].y < bullets[i].y
                    && (bullets[i].x - enemies2[k].x) <= (bullets[i].r + enemies2[k].width)
                    && (bullets[i].y - enemies2[k].y) <= (enemies2[k].width + bullets[i].r)) {
                    bullets.splice(bullets.indexOf(bullets[i]),1);
                    enemies2.splice(enemies2.indexOf(enemies2[k]),1);
                    point+=1;
                } else if (enemies2[k].x >= bullets[i].x
                    && enemies2[k].y <= bullets[i].y
                    && (enemies2[k].x - bullets[i].x) <= bullets[i].r
                    && (bullets[i].y - enemies2[k].y) <= (bullets[i].r + enemies2[k].width)) {
                    bullets.splice(bullets.indexOf(bullets[i]),1);
                    enemies2.splice(enemies2.indexOf(enemies2[k]),1);
                    point+=1;
                }
            }
        }
    }
}

function checkWinLose() {
    if (hp <= 0) {
        stop = true;
        enemies1 = [];
        enemies2 = [];
        bullets = [];
        document.getElementById('result').innerHTML = 'Game Over';
    }
    if (point === 300) {
        stop = true;
        enemies1 = [];
        enemies2 = [];
        bullets = [];
        document.getElementById('result').innerHTML = 'You Win';
    }
}

function upLevel() {
    if (point <= 50) {
        document.getElementById('level').innerHTML = 'Level: 1';
    }
    if (50 <point && point <= 100) {
        document.getElementById('level').innerHTML = 'Level: 2';
        for (let i = 0; i < enemies1.length; i++) {
            enemies1[i].speed = 2;
        }
        for (let i = 0; i < enemies2.length; i++) {
            enemies2[i].speed = 2;
        }
    }
    if (100 <point && point <= 200) {
        document.getElementById('level').innerHTML = 'Level: 3';
        for (let i = 0; i < enemies1.length; i++) {
            enemies1[i].speed = 3;
        }
        for (let i = 0; i < enemies2.length; i++) {
            enemies2[i].speed = 3;
        }
    }
    if (200 <point && point <= 250) {
        document.getElementById('level').innerHTML = 'Level: 4';
        for (let i = 0; i < enemies1.length; i++) {
            enemies1[i].speed = 4;
        }
        for (let i = 0; i < enemies2.length; i++) {
            enemies2[i].speed = 4;
        }
    }
    if (250 <point && point <= 300) {
        document.getElementById('level').innerHTML = 'Level: 5';
        for (let i = 0; i < enemies1.length; i++) {
            enemies1[i].speed = 5;
        }
        for (let i = 0; i < enemies2.length; i++) {
            enemies2[i].speed = 5;
        }
    }
}

function start() {
    if (count%30 === 0 && stop === false && count %20 !==0) {
        checkEnemiesOverlap(enemies1);
    }
    if (count%20 === 0 && stop === false && count %30 !==0) {
        checkEnemiesOverlap(enemies2);
    }
    if (count%7 === 0 && stop === false) {
        bullets.push(new Bullets());
    }
    count++;
    draw();
    moveAllElements();
    killEnemy(enemies1);
    killEnemy(enemies2);
    document.getElementById('hp').innerHTML = "HP : " + hp;
    document.getElementById('point').innerHTML = "Point : " + point;
    checkWinLose();
    upLevel();
    loop = setTimeout(start, 25);
}

start();
document.addEventListener("keydown", moveGun);