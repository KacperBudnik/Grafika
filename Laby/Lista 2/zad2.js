var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function BrensenhamCircle(xs, ys, R, color) {

    var x = 0;
    var y = R;
    var d = 5 / 4 - R;
    PutEightPixels(xs, ys, x, y, color);
    while (x <= y) {
        if (d < 0) {
            d += 2 * x + 3;
            x++;
        } else {
            d += 2 * (x - y) + 5;
            x++;
            y--;
        }

        PutEightPixels(xs, ys, x, y, color);
    }
}

function PutEightPixels(xs, ys, x, y, color) {

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(xs + x, ys + y, 1, 1);
    ctx.fillRect(xs + y, ys + x, 1, 1);
    ctx.fillRect(xs - x, ys + y, 1, 1);
    ctx.fillRect(xs - y, ys + x, 1, 1);
    ctx.fillRect(xs + x, ys - y, 1, 1);
    ctx.fillRect(xs + y, ys - x, 1, 1);
    ctx.fillRect(xs - x, ys - y, 1, 1);
    ctx.fillRect(xs - y, ys - x, 1, 1);
    ctx.stroke();
    ctx.closePath();
}

function Set_Pixel(x, y, color) {

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    ctx.stroke();
    ctx.closePath();
}

function StupidCircle(xs, ys, R, color) {
    function pos_y(t) {
        return Math.round(Math.sqrt(R * R - t * t))
    }
    for (var x = R; x >= 0; x--) {
        /*Set_Pixel(xs + x, ys + pos_y(x), color);
        Set_Pixel(xs + x, ys - pos_y(x), color);
        Set_Pixel(xs - x, ys + pos_y(x), color);
        Set_Pixel(xs - x, ys - pos_y(x), color);*/
        PutEightPixels(xs, ys, x, pos_y(x), color)
    }
}


n = 100
var start = new Date().getTime();
for (var i = 0; i < n; i++) {
    BrensenhamCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), Math.floor(Math.min(canvas.height / 3, canvas.width / 3)) + i, "#000000")
}
var Ber_time = new Date().getTime() - start;

var start = new Date().getTime();
for (var i = 0; i < n; i++) {
    StupidCircle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), Math.floor(Math.min(canvas.height / 3, canvas.width / 3)) + i, "#FF0000")
}
var Stu_time = new Date().getTime() - start;

document.getElementById('czas_b').innerHTML = "Czas wykonania " + n + " kółek algorytmem Brensenham'a " + Ber_time + " ms";
document.getElementById('czas_stu').innerHTML = "Czas wykonania " + n + " kółek równaniem okręgu " + Stu_time + " ms";

document.getElementById('czas_iloraz').innerHTML = "Algorytm Bernsengam'a jest " + Stu_time / Ber_time + " razy szybszy";