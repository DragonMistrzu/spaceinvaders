document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        tr.wLewo();
    }
    else if(event.keyCode == 39) {
        tr.wPrawo();
    }
    else if(event.keyCode == 38) {
        tr.wGore();
    }
    else if(event.keyCode == 40) {
        tr.wDol();
    }
    if(event.keyCode == 32) { 
        tr.strzelaj();
    }
});

var Auto = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.autoElement = null; 
    this.direction = Math.floor(Math.random() * 4); 
} 

Auto.prototype.rysuj = function () {
    var autoHtml = this.sprite;
    this.autoElement = $(autoHtml);
    this.autoElement.css({
        position: "absolute",
        left: this.x,
        top: this.y
    });
    $("body").append(this.autoElement);
}

Auto.prototype.wPrawo = function() {
    this.x += 20;
    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}
Auto.prototype.wLewo = function() {
    this.x -= 20;
    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}
Auto.prototype.wGore = function() {
    this.y -= 20;
    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}
Auto.prototype.wDol = function() {
    this.y += 20;
    this.autoElement.css({
        left: this.x,
        top: this.y
    });
}
Auto.prototype.strzelaj = function() {
    var bullet = new Bullet(this.x + 20, this.y);
    bullet.rysuj();
};

var Bullet = function(x, y) {
    this.x = x;
    this.y = y;
    this.bulletElement = $('<img src="imgs/bullet.png" class="bullet">');
}

Bullet.prototype.rysuj = function() {
    this.bulletElement.css({
        position: "absolute",
        left: this.x,
        top: this.y
    });
    $("body").append(this.bulletElement);
    this.move(); 
}

Bullet.prototype.move = function() {
    var interval = setInterval(() => {
        this.y -= 5; 
        this.bulletElement.css({ top: this.y });

        for (let enemy of [enemy1, enemy2, enemy3, enemy4]) {
            let colcheckX = Math.abs(this.x - enemy.x);
            let colcheckY = Math.abs(this.y - enemy.y);
            if (colcheckX < 80 && colcheckY < 60) { 
                this.bulletElement.remove();
                enemy.autoElement.remove();
                enemy.x=99999999999;
                enemy.y=99999999999;
                score++;
                clearInterval(interval);
                return;
            }
        }

        if (this.y < 0) {
            clearInterval(interval);
            this.bulletElement.remove();
        }
    }, 20);
};

Auto.prototype.updatePosition = function() {

    if (Math.random() < 0.1) { 
        this.direction = Math.floor(Math.random() * 4);
    }

    switch (this.direction) {
        case 0: // Lewo
            if (this.x > 0) {
                this.wLewo();
            } else {
                this.direction = 1; 
            }
            break;
        case 1: // Prawo
            if (this.x < $(window).width() - 80) { 
                this.wPrawo();
            } else {
                this.direction = 0; 
            }
            break;
        case 2: // Góra
            if (this.y > 0) {
                this.wGore();
            } else {
                this.direction = 3; 
            }
            break;
        case 3: // Dół
            if (this.y < $(window).height() - 80) {
            } else {
                this.direction = 2; 
            }
            break;
    }
};

var tr = new Auto(800, 500, '<img src="imgs/ship.png">');
var enemy1 = new Auto(Math.random() * 1300 + 1, Math.random() * 200 + 1, '<img src="imgs/enemy.png">');
var enemy2 = new Auto(Math.random() * 1300 + 1, Math.random() * 200 + 1, '<img src="imgs/enemy.png">');
var enemy3 = new Auto(Math.random() * 1300 + 1, Math.random() * 200 + 1, '<img src="imgs/enemy.png">');
var enemy4 = new Auto(Math.random() * 1300 + 1, Math.random() * 200 + 1, '<img src="imgs/enemy.png">');
var score=0;

enemy1.rysuj();
enemy2.rysuj();
enemy3.rysuj();
enemy4.rysuj();
tr.rysuj();

setInterval(function() {
    enemy1.updatePosition();
    enemy2.updatePosition();
    enemy3.updatePosition();
    enemy4.updatePosition();
}, 100);

let colcheckX = Math.abs(this.x - tr.x);
let colcheckY = Math.abs(this.y - tr.y);
if (colcheckX < 80 && colcheckY < 60) { 
    alert("Koniec gry! Przeciwnik zderzył się z Trampem.");
    location.reload(); 
}