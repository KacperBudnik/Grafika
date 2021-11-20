var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");
/*var width = canvas.getWidth();
var height = canvas.getHeight();*/
const { width, height } = canvas.getBoundingClientRect();
var pos = [width / 2, height / 2];
var rot = 0;
ctx.strokeStyle = "#ffffff"
ctx.moveTo(pos[0], pos[1]);
var color = "#ffffff"
var pen = true;

function draw(string) {

    var words = string.split(" ");


    for (var i = 0; i < words.length; i++) {
        if (words[i] == "lt" || words[i] == "left" || words[i] == "l") {
            if (left(words[i + 1])) {
                i++;
            }
        } else if (words[i] == "rt" || words[i] == "right" || words[i] == "r") {
            if (left(-words[i + 1])) {
                i++;
            }
        } else if (words[i] == "f" || words[i] == "forward") {
            if (forward(words[i + 1])) {
                i++;
            }
        } else if (words[i] == "pu" || words[i] == "penup" || words[i] == "up") {
            pen_up();
        } else if (words[i] == "pd" || words[i] == "pendown" || words[i] == "down") {
            pen_down();
        } else if (words[i] == "c" || words[i] == "col" || words[i] == "color") {
            col(words[i + 1]);
        }
    }
    ctx.stroke();
    return false;
}

function left(x) {
    rot -= x;
    return true;
}


function pen_up() {
    pen = false;
}

function pen_down() {
    pen = true;
}

function forward(x) {
    pos[0] += x * Math.sin(2 * Math.PI * rot / 360)
    pos[1] -= x * Math.cos(2 * Math.PI * rot / 360)
    if (pen) {
        ctx.lineTo(pos[0], pos[1]);
    } else {
        ctx.moveTo(pos[0], pos[1]);
    }

    return true;
}

function col(c) {
    ctx.closePath();
    window.alert("sada");
    ctx.beginPath();
    window.alert("sasadsadda");
    color = c;
    ctx.strokeStyle = c;
    return true;
}

function draw_figure(n) {
    for (var i = 0; i < n; i++) {
        forward(50);
        left(360 / n);
    }
    ctx.stroke();
    return false;
}

function star(n) {
    for (var i = 0; i < n; i++) {
        forward(50);
        left(90);
        forward(50);

    }
}