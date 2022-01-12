var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



function Brensenham(xp, yp, xk, yk) {
    var x = xp;
    var y = yp;

    var dy = yk - yp;
    var dx = xk - xp;

    var d = 2 * dy;
    var dA = d;
    var dB = 2 * (dy - dx);

    while (x < xk) {
        if (d > 0) {
            x++;
            d += dB;
            y++;
        } else {
            x++;
            d += dA;

        }
        Set_Pixel(x, y, "#FF0000");
    }
}

function Set_Pixel(x, y, color) {

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    ctx.stroke();
    ctx.closePath();
}

function Straight(xp, yp, xk, yk) {
    var x = xp;
    var y = yp;

    var a = (yp - yk) / (xp - xk);
    var b = yp - a * xp;


    while (x < xk) {
        x = x + 1;
        y = Math.round(a * x + b);
        Set_Pixel(x, y, "#0000FF");
    }
}

var n = 10;

height = Math.min(canvas.height);
width = Math.min(canvas.width)


var start = new Date().getTime();
for (var i = 0; i < n; i++) {
    Straight(1 + i, n - i, width - 1, height - 1)
}
var Str_time = new Date().getTime() - start;

var start = new Date().getTime();
for (var i = 0; i < n; i++) {
    Brensenham(1 + i, n - i, width - 1, height - 1)
}

var Ber_time = new Date().getTime() - start;



document.getElementById('czas_b').innerHTML = "Czas wykonania prostej algorytmem Brensenham'a " + Ber_time + " ms";
document.getElementById('czas_r').innerHTML = "Czas wykonania prostej oparty na jej równaniu  " + Str_time + " ms";

document.getElementById('czas_iloraz').innerHTML = "Algorytm Bernsenham'a jest " + Math.round((Str_time / Ber_time) * 100) / 100 + " razy szybszy w wykonaniu (przeprowadzono " + n + " prób)";