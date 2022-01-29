var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var height = canvas.height;
var width = canvas.width;

var matrix = Array(height).fill().map(() => Array(width).fill(false))

var draw = false;

canvas.addEventListener("mousedown", function(evt) {

    draw = true
}, false);

canvas.addEventListener('mouseup', e => {
    draw = false
}, false);

canvas.addEventListener("mousemove", function(evt) {
    if (draw) {

        var mousePos = getMousePos(canvas, evt);
        var x = mousePos.x;
        var y = mousePos.y;

        if (x > 0) {
            if (y > 0)
                matrix[y - 1][x - 1] = true;
            matrix[y][x - 1] = true;
            if (y < height - 1)
                matrix[y + 1][x - 1] = true;
        }
        if (y > 0)
            matrix[y - 1][x] = true;
        matrix[y][x] = true;
        if (y < height - 1)
            matrix[y + 1][x] = true;
        if (x < width - 1) {
            if (y > 0)
                matrix[y - 1][x + 1] = true;
            matrix[y][x + 1] = true;
            if (y < height - 1)
                matrix[y + 1][x + 1] = true;
        }

        ctx.beginPath();
        ctx.fillStyle = "#000000"

        ctx.fillRect(x - 1, y - 1, 3, 3);
        ctx.stroke();
        ctx.closePath();
    }

}, false);


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function Draw() {
    function f1(xy) {
        return [width - xy[0], xy[1]]
    }

    function f2(xy) {
        alpha = Math.PI / 6
        return [xy[0] + width / 10, xy[1] + height / 25]
        return [xy[0] * Math.cos(alpha) + xy[1] * Math.sin(alpha), xy[1] * Math.cos(alpha) + xy[0] * Math.sin(alpha)]
    }

    function f3(xy) {
        return [4 * xy[0] / 5, 4 * xy[1] / 5]
    }

    function sierpinski(x, y) {
        return [
            [x / 2, y / 2],
            [x / 2 + width / 2, y / 2],
            [x / 2 + width / 4, y / 2 + height / 2]
        ]
    }

    var matrix_temp = Array(height).fill().map(() => Array(width).fill(false))




    ctx.beginPath();
    ctx.fillStyle = "#ff0000"

    for (var k = 0; k < 3; k++) {
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                //console.log("Dla i=" + i.toString() + "oraz j=" + j.toString())
                if (matrix[i][j]) {

                    xy = sierpinski(j, i)
                    for (var l = 0; l < 3; l++) {
                        x = Math.round([xy[l][0]])
                        y = Math.round([xy[l][1]])
                        matrix_temp[y][x] = true;
                        ctx.fillRect(x, y, 1, 1);
                    }

                    /*xy = f1(f2(f3([j, i])))
                    x = Math.round(xy[0])
                    y = Math.round(xy[1])

                    matrix_temp[y][x] = true;
                    ctx.fillRect(x, y, 1, 1);*/

                }
            }
        }
        ctx.stroke();

        matrix = matrix_temp
        matrix_temp = Array(height).fill().map(() => Array(width).fill(false))
    }
    ctx.closePath();


}