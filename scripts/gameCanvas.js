class Sprite {
	constructor(image, x, y, width, height, type) {
		this.image = image;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.type = type;
	}
}


function drawSprite(path, x, y, width, height) {
    var image = new Image();
	image.src = path;
	ctx.drawImage(image, x, y, width, height);
}


function drawVasyl() {
    drawSprite(Vasyl.image, Vasyl.x, Vasyl.y, Vasyl.width, Vasyl.height, "hero");
    drawInfo();

    if(rightPressed && Vasyl.x + Vasyl.width < canvas.width) {
        Vasyl.x += 4;
    }
    else if(leftPressed && Vasyl.x > 0) {
        Vasyl.x -= 4;
    }
}


function drawingMilks() {
	var dy = 3;
	for(var i = 0; i < milksArray.length; i++) {
		var milkObject = milksArray[i];
    	drawSprite(milkObject.image, milkObject.x, milkObject.y, milkObject.width, milkObject.height);
    	milkObject.y += dy;
	}
}


function creationMilks() {
	var milks_count = score / 10 + 1;
	for(var i = 0; i < milks_count; i++) {
		setTimeout(function() {
			var chance = Math.floor(Math.random() * 10);
			var milkObject;
			if (chance <= 3) {
				milkObject = new Sprite(
					"images/sandwich.png", Math.floor(Math.random() * (canvas.width - 50)), -50, 50, 50, "sandwich"
				);
			} else {
				milkObject = new Sprite(
					"images/good_milk.png", Math.floor(Math.random() * canvas.width), -50, 50, 50, "goodMilk"
				);
			}
			milksArray.push(milkObject);
		}, 300);
    }
}


function movingMilks() {
	for(var i = 0; i < milksArray.length; i++) {
		if (milksArray[i].y > canvas.height) {
			milksArray.splice(i, 1);
		}
	}
}

function collisionDetection() {
    for(var i = 0; i < milksArray.length; i++) {
        var milkObject = milksArray[i];
        if( Vasyl.x <= milkObject.x + milkObject.width && 
        	Vasyl.x + Vasyl.width >= milkObject.x && 
        	Vasyl.y <= milkObject.y + milkObject.height && 
        	Vasyl.y + Vasyl.height >= milkObject.y ) 
        {
        	if (milkObject.type == "goodMilk") {
        		score++;
        	} else {
        		if (health > 0) {
        			health -= 25;
				}
				else {
        			health = 0;
				}
        	}
            milksArray.splice(i, 1);
            
        }
    }
}


function drawInfo() {
    ctx.font = "16px Helvetica";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Випитого молока: " + score, 8, 20);
    ctx.fillText("Здоров'я: " + health + "%", 8, 40);
}


function gameOverCheck() {
	if (health == 0) {
		clearInterval(mainGameTimer);
		clearInterval(creatingMilksTimer);
		ctx.font = "60px Helvetica";
    	ctx.fillStyle = "#FFFFFF";
    	ctx.fillText("Ви програли", 250, 250);
	}
}


function processingGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	gameOverCheck();
	drawingMilks();
	drawVasyl();
	movingMilks();
	collisionDetection();
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}


function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var Vasyl = new Sprite("images/vasyl_stand.png", canvas.width / 2, canvas.height - 130, 80, 130);
var rightPressed = false;
var leftPressed = false;
var milksArray = [];
var score = 0;
var health = 100;
var mainGameTimer;
var creatingMilksTimer;

document.getElementById("startGameButton").onclick = function() {
	document.getElementById("startGameButton").style.display = "none";
	document.getElementById("gameCanvas").style.display = "block";
	mainGameTimer = setInterval(processingGame, 10);
	creatingMilksTimer = setInterval(creationMilks, 700);
};
