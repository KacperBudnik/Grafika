var canvas;
var ctx;
var height;
var width;


function Mandelbrot() {
    x_min = -2.5;
    x_max = 1.5;
    y_max = 1.25;
    y_min = -1.25

    var step_y = (y_max - y_min) / height;
    var step_x = (x_max - x_min) / width;

    for (var i = 0; i < width; i++) {

        for (var j = 0; j < height; j++) {

            z = [step_x * i + x_min, y_max - step_y * j]

            if (convergent([0, 0], z)) {
                Set_Pixel(i, j, "#0000FF")
            } else {
                Set_Pixel(i, j, "#000000")
            }
            //window.alert(5)
        }
    }

}

function Julia(C) {
    x_min = -2;
    x_max = 2;
    y_max = 2;
    y_min = -2
    C = [Number(C[0]), Number(C[1])]
    var step_y = (y_max - y_min) / height;
    var step_x = (x_max - x_min) / width;

    for (var i = 0; i < width; i++) {

        for (var j = 0; j < height; j++) {

            z = [step_x * i + x_min, y_max - step_y * j]

            if (convergent(z, C)) {
                Set_Pixel(i, j, "#0000FF")
            } else {
                Set_Pixel(i, j, "#000000")
            }
        }
    }

}

function Set_Pixel(x, y, color) {

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    ctx.stroke();
    ctx.closePath();
}


function convergent(z0, C, n = 1000) {
    var z = z0;
    for (var i = 0; i < n; i++) {
        z = [z[0] * z[0] - z[1] * z[1] + C[0], z[0] * z[1] + C[1]]
        if (z[0] * z[0] + z[1] * z[1] > 4) {
            return false;
        }
    }
    return true;
}

//Mandelbrot();


function Draw() {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.height = document.getElementById("height").value;
    canvas.width = document.getElementById("width").value;

    height = canvas.height;
    width = canvas.width;
    var item = document.getElementById('Julia');
    if (item.checked) {
        Julia([document.getElementById('julia_real').value, document.getElementById('julia_imag').value]);
    } else {
        Mandelbrot();
    }

    return false;
}
//Draw();