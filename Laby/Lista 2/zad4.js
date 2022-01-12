var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;
var start = false;
var turn = true; //czyja kolej
var first = true; // która karta odkryta
var to_match = -1;
var wait = false;

var img = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()]
for (var i = 0; i < 10; i++) {
    img[i] = document.getElementById("img_" + (i + 1).toString());
}
var quest = new Image();
quest.src = "https://i.etsystatic.com/7434544/r/il/50f372/1637920754/il_570xN.1637920754_4zhg.jpg";

var discovered = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 20 zer, czy odkryte
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // plansza

for (var i = 0; i < 20; i++) {
    discovered[i] = (i - i % 2) / 2 + 1 // chwilowo
}

for (var i = 19; i >= 0; i--) {
    board[i] = discovered.splice(Math.floor(Math.random() * (i + 1)), 1)
}

var discovered = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 20 zer, czy odkryte


function play(k) {

    if (!discovered[k] && k != to_match && !wait) {
        if (to_match == -1) {
            to_match = k;
            show(k);
        } else {
            show(k)

            if (board[k] - board[to_match] == 0) { // nie wiem dlaczego nie działa board[k]==board[to_match]
                discovered[k] = true;
                discovered[to_match] = true;
                to_match = -1
                if (!discovered.includes(0)) {
                    if (turn) {
                        window.alert("Grę wygrywa gracz pierwszy")
                    } else {
                        window.alert("Grę wygrywa gracz drugi")

                    }
                }
                turn = !turn
            } else {
                hide(k, to_match)
                to_match = -1;
                turn = !turn

            }
            document.getElementById('kolej').innerHTML = "Tura gracza " + (turn + 1).toString();

        }
    }
}

function show(k) {
    ctx.drawImage(img[board[k] - 1], (k % 5) * width / 5, (k - k % 5) / 5 * height / 4, width / 5, height / 4);
}

function hide(k1, k2) {
    wait = true;
    setTimeout(function() {
        ctx.drawImage(quest, (k1 % 5) * width / 5, (k1 - k1 % 5) / 5 * height / 4, width / 5, height / 4);
        ctx.drawImage(quest, (k2 % 5) * width / 5, (k2 - k2 % 5) / 5 * height / 4, width / 5, height / 4);
        wait = false;
    }, 500);

}


//report the mouse position on click
canvas.addEventListener("click", function(evt) {
    if (start) {
        var mousePos = getMousePos(canvas, evt);
        var x = mousePos.x;
        var y = mousePos.y;
        play(Math.floor(5 * x / width) + Math.floor(4 * y / height) * 5)

    } else {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 5; j++) {
                ctx.drawImage(quest, i * width / 5, j * height / 4, width / 5, height / 4);
            }
        }
        start = true;
    }
}, false);

//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}




/*
function getMeta(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function() { callback(this.width, this.height); }
}*/
/*getMeta(
    "http://snook.ca/files/mootools_83_snookca.png",
    function(width, height) { alert(width + 'px ' + height + 'px') }
);*/

//https://images.unsplash.com/photo-1640092256131-8ade8d6e8fee?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=160&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MjAxMDk4MA&ixlib=rb-1.2.1&q=80&w=150

//https://ia803209.us.archive.org/20/items/QuestionMark/Question%20Mark.jpg