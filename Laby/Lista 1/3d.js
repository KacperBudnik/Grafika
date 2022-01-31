var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var height = ctx.height;
var width = ctx.width;


// kamera
var alfa1 = Math.PI / 6;

var turtle = {
    x: 100,
    y: 100,
    z: 100,
    wx: 1,
    wy: 0,
    wz: 0,
    penDown: true,
};




function transform3Dto2D(xyz, alfa) {
    return [xyz[0] + Math.cos(alfa) / 2 * xyz[2], xyz[1] + Math.sin(alfa) / 2 * xyz[2]];
};



// metoda zolwia -  ruch do przodu o dlugosc length
turtle.forward = function(length = Number(document.getElementById("len").value)) {

    //length = Number(document.getElementById("len").value);

    var x = this.x;
    var y = this.y;
    var z = this.z;


    this.x = x + length * this.wx;
    this.y = y + length * this.wy;
    this.z = z + length * this.wz;




    var end = transform3Dto2D([x, y, z], alfa1);
    var start = transform3Dto2D([this.x, this.y, this.z], alfa1);



    ctx.beginPath();

    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);

    ctx.stroke();


    return this;
};





//metoda zmiany kąta zółwia- względem osi OX  - kat podaje w stopniach 
turtle.OX = function(angle) {

    angle = angle * Math.PI / 180.0;

    var z = this.wz;
    var y = this.wy;

    this.wy = Math.cos(angle) * y - Math.sin(angle) * z;

    this.wz = Math.cos(angle) * z + Math.sin(angle) * y;

    return this;
};

//metoda zmiany kąta zółwia- względem osi OY  - kat podaje w stopniach 
turtle.OY = function(angle) {

    angle = angle * Math.PI / 180.0;

    var z = this.wz;
    var x = this.wx;

    this.wx = Math.cos(angle) * x + Math.sin(angle) * z;
    this.wz = Math.cos(angle) * z - Math.sin(angle) * x;
    return this;
};


//metoda zmiany kąta zółwia- względem osi OZ  - kat podaje w stopniach 
turtle.OZ = function(angle) {

    angle = angle * Math.PI / 180.0;

    var y = this.wy;
    var x = this.wx;

    this.wx = Math.cos(angle) * x - Math.sin(angle) * y;

    this.wy = Math.cos(angle) * y + Math.sin(angle) * x;
    return this;
};



function rotate() {
    val = document.getElementById("angle").value;
    var checkboxes = document.getElementsByName('check')

    var axis;

    checkboxes.forEach((item) => {
        if (item.checked)
            axis = item

    })


    if (axis.id == "OX")
        turtle.OX(parseFloat(val))

    if (axis.id == "OY")
        turtle.OY(parseFloat(val))

    if (axis.id == "OZ")
        turtle.OZ(parseFloat(val))
}

function cube() {
    turtle.forward(100);
    turtle.OY(90);
    turtle.forward(100);
    turtle.OY(90);
    turtle.forward(100);
    turtle.OY(90);
    turtle.forward(100);
    turtle.OY(90);

    turtle.OZ(90);
    turtle.forward(100);
    turtle.OZ(-90);



    turtle.forward(100);
    turtle.OY(90);
    turtle.OX(-90);
    turtle.forward(100);
    turtle.forward(-100)
    turtle.OX(90);


    turtle.forward(100);
    turtle.OY(90);
    turtle.OZ(90);
    turtle.forward(100);
    turtle.forward(-100)
    turtle.OZ(-90);



    turtle.forward(100);
    turtle.OY(90);
    turtle.OX(90);
    turtle.forward(100);
    turtle.forward(-100)
    turtle.OX(-90);


    turtle.forward(100);



}