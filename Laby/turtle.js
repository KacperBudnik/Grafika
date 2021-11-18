var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");
/*var width = canvas.getWidth();
var height = canvas.getHeight();*/
const { width, height } = canvas.getBoundingClientRect();
var pos = [width / 2, height / 2];
var rot = 0;
ctx.strokeStyle = "#ffffff"
ctx.moveTo(pos[0], pos[1]);
//ctx.lineTo(100, 100);
//ctx.stroke();

function draw(string) {
    /*window.alert(5 + 6);
    window.alert(string)
    console.log(53 + 6);

    window.alert(5 + 623);*/
    var words = string.split(" ");
    //window.alert(5 + 6);

    //window.alert(words);

    for (var i = 0; i < words.length; i++) {
        if (words[i] == "lt" || words[i] == "left" || words[i] == "l") {
            if (left(words[i + 1])) {
                i++;
            }
        } else if (words[i] == "rt" || words[i] == "right" || words[i] == "r") {
            if (right(words[i + 1])) {
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
        }
    }
    ctx.stroke();
    return false;
}

function left(x) {
    rot += x;
    return true;
}

function right(x) {
    rot -= x;
    return true;
}

function forward(x) {
    pos[0] += x * Math.sin(2 * Math.PI * rot / 360)
    pos[1] -= x * Math.cos(2 * Math.PI * rot / 360)
    ctx.lineTo(pos[0], pos[1])

    return true;
}