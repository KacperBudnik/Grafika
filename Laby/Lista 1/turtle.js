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
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    color = c;
    ctx.strokeStyle = c;
    ctx.fillStyle = c;
    forward(0);
    ctx.stroke();

    return true;
}

function draw_figure(n, new_color = color, h = 100) {
    if (n >= 3) {

        if (n % 2 == 0) {
            var size = Math.tan(Math.PI / n) * h;
        } else {
            var size = Math.tan(Math.PI / n / 2) * h * 2;
        }
        var old_color = color;
        col(new_color);
        for (var i = 0; i <= n; i++) {
            forward(size);
            left(360 / n);
        }
        left(-360 / n);
        forward(-size);

        ctx.stroke();
        col(old_color)
    }
    return false;
}

function graph_complete(n, new_color = color, h = 200) {
    if (n >= 3) {
        if (n % 2 == 0) {
            var size = Math.tan(Math.PI / n) * h;
        } else {
            var size = Math.tan(Math.PI / n / 2) * h * 2;
        }
        var vertex_x = [pos[0]];
        var vertex_y = [pos[1]];
        for (var i = 0; i < n; i++) {
            forward(size);
            left(360 / n);
            vertex_x.push(pos[0]);
            vertex_y.push(pos[1]);

        }

        while (vertex_y.length > 0) {
            var x = vertex_x.pop();
            var y = vertex_y.pop();

            for (var i = 1; i < vertex_y.length - 1; i++) {
                ctx.moveTo(x, y);
                ctx.lineTo(vertex_x[i], vertex_y[i]);
            }
        }
        ctx.moveTo(pos[0], pos[1]);


        ctx.stroke();
    }
    return false;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/*function graph_bipartial(n, new_color = color, h = 200) {
    if (n >= 2) {
        var r = getRandomInt(1, n - 1);
        var first_x = [];
        var first_y = [];
        var secound_x = [];
        var secound_y = [];
        for (var i = 0; i < r; i++) {
            first_x.push(getRandomInt(10, width - 10));
            first_y.push(getRandomInt(10, height - 10));
        }
        for (var i = r; i < n; i++) {
            secound_x.push(getRandomInt(10, width - 10));
            secound_y.push(getRandomInt(10, height - 10));
        }

        for(var i=0;i<2*n;i++){
            r1=getRandomInt(0,r-1);
            r2=getRandomInt(r,n-1);
            moveTo(first_x[],)
        }
    }
    return false;
}*/


function graph_bipartial(n, new_color = color, h = 200) {
    //ctx.clearRect(0, 0, width, height);

    if (n >= 2) {
        var r = getRandomInt(1, n - 1);
        var x = [];
        var y = [];

        for (var i = 0; i < r; i++) {
            r1 = getRandomInt(10, width - 10)
            r2 = getRandomInt(10, height - 10)
            x.push(r1);
            y.push(r2);
            /*ctx.moveTo(r1, r2);
            ctx.arc(r1, r2, 10, 0, 2 * Math.PI);
            ctx.fill();*/
        }

        for (var i = r; i < n; i++) {
            r1 = getRandomInt(10, width - 10)
            r2 = getRandomInt(10, height - 10)
            x.push(r1);
            y.push(r2);
            /* ctx.moveTo(r1, r2);
             ctx.arc(r1, r2, 10, 0, 2 * Math.PI);
             ctx.fill();*/
        }


        for (var i = 0; i < 2 * n; i++) {
            r1 = getRandomInt(0, r - 1);
            r2 = getRandomInt(r, n - 1);

            ctx.moveTo(x[r1], y[r1]);
            ctx.lineTo(x[r2], y[r2]);
        }
    }

    col('Blue')

    for (var i = 0; i < r; i++) {
        r1 = x[i];
        r2 = y[i];
        ctx.moveTo(r1, r2);
        ctx.arc(r1, r2, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
    col('Red')

    for (var i = r; i < n; i++) {
        r1 = x[i];
        r2 = y[i];
        ctx.moveTo(r1, r2);
        ctx.arc(r1, r2, 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    col("white");


    ctx.stroke();
    return false;
}

function sierpinski(n, size, first = false) {
    if (first) {
        ctx.moveTo(150, 500);
        pos = [150, 500];
        rot = 90;
    }
    if (n > 0) {

        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        var colormap = ["Blue", "Red", "Green", "Yellow", "Violet", "Orange"];
        forward(size);
        left(120);
        forward(size);
        left(120);
        forward(size);
        left(120);
        forward(size);
        forward(-size);
        ctx.stroke();
        ctx.fillStyle = colormap[n % 6];
        ctx.fill();
        ctx.stroke();
        //window.alert("tak");

        sierpinski(n - 1, size / 2);

        //window.alert("nie");
        forward(size / 2);
        sierpinski(n - 1, size / 2);
        //window.alert("moze");
        left(120);
        pen_up()
        forward(size / 2);
        pen_down();
        left(-120);
        sierpinski(n - 1, size / 2);
        //window.alert("cos")
        left(-120);
        forward(size / 2);
        left(120);
    }
    return false;
}

function koch(n, size, first = false) {
    if (first) {
        koch(n, size);
        left(-120);
        koch(n, size);
        left(-120);
        koch(n, size);
        left(-120);
        ctx.fillStyle = "white";
        ctx.fill();
    } else {
        if (n > 0) {
            koch(n - 1, size / 3);
            left(60);
            koch(n - 1, size / 3);
            left(-120);
            koch(n - 1, size / 3);
            left(60);
            koch(n - 1, size / 3);
        } else {
            forward(size);
            ctx.stroke();
        }
    }
    return false;
}



function Clear() {
    ctx.clearRect(0, 0, width, height);
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