var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var height = canvas.height;
var width = canvas.width;

var matrix = Array(height).fill().map(() => Array(width).fill(false))

//---------------------------- kwadracik grającego--------------
var player = {
    xpos: Math.round(width / 2),
    ypos: Math.round(height / 2),
    r: 2,
    score: 0,
    velocity: 5,
    rotation: 1,
    pause: true,
    end: false,
    draw: function() {
        //window.alert(this.ypos);
        ctx.beginPath();
        ctx.arc(this.xpos, this.ypos, 2, 0, 2 * Math.PI, false);

        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    },
    collision: function() {
        var x = this.xpos;
        var y = this.ypos;
        var crash = false;
        if (x <= 0 || y <= 0 || x >= width || y >= height) {
            crash = true;
        }
        if (matrix[y][x] == true) {
            crash = true;
        }
        if (crash) {
            player.end = true
            matrix = Array(height).fill().map(() => Array(width).fill(false))
            window.alert("Crash!")

        }
        return crash;
    },
    reborn: function() {
        this.xpos = Math.round(width / 2);
        this.ypos = Math.round(height / 2);
        this.score = 0;
        this.velocity = 5;
        this.rotation = 1;
        this.pause = true;
        this.end = false;
        ctx.clearRect(0, 0, width, height);
    }

}


//---------------------inicjalizacja---------------

player.ctx = canvas.getContext('2d');
player.draw();


function update() {
    if (!player.pause && !player.end) {
        if (player.rotation == 0) {
            player.xpos += 1;
            player.collision();
        } else if (player.rotation == 1) {
            player.ypos -= 1;
            player.collision();
        } else if (player.rotation == 2) {
            player.xpos -= 1;
            player.collision();
        } else if (player.rotation == 3) {
            player.ypos += 1;
            player.collision();
        }
        if (!player.end) {
            player.draw();
            player.score += 1;
            matrix[player.ypos][player.xpos] = true;
        }
        scr = Math.round(player.score * 2 * Math.PI * player.r * player.r / (height * width) * 100);
        //scr /= 100;
        document.getElementById("score").innerHTML = "Score:  " + scr.toString() // + "%";
    }
}
interv = setInterval(update, 1);


document.addEventListener("keydown", function(event) {
    if (event.keyCode == 39) {
        //right arrow
        if (player.rotation != 2) {
            player.rotation = 0;
        }
    }
    if (event.keyCode == 37) {
        //left arrow
        if (player.rotation != 0) {
            player.rotation = 2;
        }
    }
    if (event.keyCode == 40) {
        //down arrow
        if (player.rotation != 1) {
            player.rotation = 3;
        }
    }
    if (event.keyCode == 38) {
        //up arrow
        if (player.rotation != 3) {
            player.rotation = 1;
        }
    }

    if (event.keyCode == 32) {
        //spacebar
        if (!player.end) {
            player.pause = !player.pause
        } else {
            player.reborn();
        }
    }
});