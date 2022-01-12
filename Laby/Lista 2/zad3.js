var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height
var width = canvas.width

// Plansza

function Board() {
    ctx.beginPath();
    ctx.fillStyle = "#838383";
    ctx.fillRect(0, height / 3, width, 6);
    ctx.fillRect(0, 2 * height / 3, width, 6);
    ctx.fillRect(width / 3, 0, 6, height);
    ctx.fillRect(2 * width / 3, 0, 6, height);
    ctx.stroke();
    ctx.closePath();
}

// Kółko

function o(k) { // k - który kwadracik
    var l_h = Math.round(height / 6)
    var l_w = Math.round(width / 6)
    var R = Math.min(l_w * 0.9, l_h * 0.9)

    BrensenhamCircle(Math.round(width * (k % 3) / 3) + l_w, Math.round(height * (k - k % 3) / 9) + l_h, R, "F000000")
        //window.alert("sad")
}

function BrensenhamCircle(xs, ys, R, color) {
    //    window.alert(xs)
    //  window.alert(ys)

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
    ctx.fillRect(xs + x, ys + y, 6, 6);
    ctx.fillRect(xs + y, ys + x, 6, 6);
    ctx.fillRect(xs - x, ys + y, 6, 6);
    ctx.fillRect(xs - y, ys + x, 6, 6);
    ctx.fillRect(xs + x, ys - y, 6, 6);
    ctx.fillRect(xs + y, ys - x, 6, 6);
    ctx.fillRect(xs - x, ys - y, 6, 6);
    ctx.fillRect(xs - y, ys - x, 6, 6);
    ctx.stroke();
    ctx.closePath();
}


// iks

function x(k) {

    var l_h = height / 6
    var l_w = width / 6
    var R = Math.min(l_w, l_h) * 0.9

    Brensenham(Math.round(width * (k % 3) / 3 + l_w - R), Math.round(height * (k - k % 3) / 9 + l_h - R), Math.round(width * (k % 3) / 3 + l_w + R), Math.round(height * (k - k % 3) / 9 + l_h + R), "#000000")
    Straight(Math.round(width * (k % 3) / 3 + l_w - R), Math.round(height * (k - k % 3) / 9 + l_h + R), Math.round(width * (k % 3) / 3 + l_w + R), Math.round(height * (k - k % 3) / 9 + l_h - R), "#000000")

}

function Brensenham(xp, yp, xk, yk, color) {
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
        Set_Pixel(x, y, color);
    }
}

function Straight(xp, yp, xk, yk, color) {
    var x = xp;
    var y = yp;

    var a = (yp - yk) / (xp - xk);
    var b = yp - a * xp;


    while (x < xk) {
        x = x + 1;
        y = Math.round(a * x + b);
        Set_Pixel(x, y, color);
    }
}


function Set_Pixel(x, y, color) {

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 6, 6);
    ctx.stroke();
    ctx.closePath();
}


// Gra

Board();


var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var turn = true; //czy kolej x 
var end = false;

function play(k) {
    if (!end) {
        if (board[k] == 0) {
            if (turn) {
                board[k] = 1;
                x(k)
            } else {
                board[k] = 10;
                o(k)
            }
            turn = !turn

        }

        win();
    }

}

function win() {
    for (var i = 0; i < 3; i++) {

        if (board[i] == board[i + 3] && board[i + 3] == board[i + 6]) {
            if (board[i] == 1) {
                window.alert("Wygrał x")
                win_draw(i, i + 6);
                break;

            } else if (board[i] == 10) {
                window.alert("Wygrało o")
                win_draw(i, i + 6);
                break;

            }
        }

        if (board[i * 3] == board[i * 3 + 1] && board[i * 3 + 2] == board[i * 3 + 1]) {
            if (board[i * 3] == 1) {
                window.alert("Wygrał x")
                win_draw(i * 3, i * 3 + 2);
                break;

            } else if (board[i * 3] == 10) {
                window.alert("Wygrało o")
                win_draw(i * 3, i * 3 + 2);
                break;

            }
        }

        if (board[0] == board[4] && board[4] == board[8]) {
            if (board[4] == 1) {
                window.alert("Wygrał x")
                win_draw(0, 8);

                break;

            } else if (board[4] == 10) {
                window.alert("Wygrało o")
                win_draw(0, 8);
                break;

            }
        }

        if (board[6] == board[4] && board[4] == board[2]) {
            if (board[4] == 1) {
                window.alert("Wygrał x")
                win_draw(6, 2);

                break;

            } else if (board[4] == 10) {
                window.alert("Wygrało o")
                win_draw(6, 2);
                break;

            }
        }

    }
    if (!board.includes(0)) {
        window.alert("Nikt nie wygrał")
        end = true;
    }
}

function win_draw(k1, k2) {
    end = true;
    ctx.beginPath();

    ctx.fillStyle = "#FF0000";

    if (k1 == k2 - 6) {
        ctx.fillRect(k1 * width / 3 + width / 6, 0, 6, height);

    } else if (k1 == k2 - 2) {
        ctx.fillRect(0, (k1 - k1 % 3) / 3 * height / 3 + height / 6, width, 6);
    } else if (k1 == 0) {
        Brensenham(0, 0, width, height, "#ff0000");

    } else {
        Straight(0, height, width, 0, "#ff0000");

    }


    ctx.stroke();
    ctx.closePath();
}

//report the mouse position on click
canvas.addEventListener("click", function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var x = mousePos.x;
    var y = mousePos.y;

    play(Math.floor((3 * x) / width) + Math.floor((3 * y) / height) * 3)

}, false);

//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}