function zad_15(x, y) {
    var theta = (x[0] * y[0] + x[1] * y[1]) / Math.sqrt((x[0] * x[0] + x[1] * x[1]) * (y[0] * y[0] + y[1] * y[1]));
    return Math.matrix([math.cos(theta), -math.sin(theta)], [math.sin(theta), math.cos(theta)])
}