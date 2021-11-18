function zad_12(x, y, a, b, c) {
    var n = [(a[2] - b[2]) * (a[3] - c[3]) - (a[3] - b[3]) * (a[2] - c[2]), (a[1] - b[1]) * (a[3] - c[3]) - (a[3] - b[3]) * (a[1] - c[1]), (a[1] - b[1]) * (a[2] - c[2]) - (a[2] - b[2]) * (a[1] - c[1])];
    var D = -(a[0] * n[0] + a[1] * n[1] + a[2] * n[2]);
    if ((x[0] * n[0] + x[1] * n[1] + x[2] * n[2] + D) * (y[0] * n[0] + y[1] * n[1] + y[2] * n[2] + D) >= 0) {
        return true;
    }
    return false;
}


function zad_13(x, y, a, b, c) {
    if (zad_12(x, y, a, b, c)) {
        return false;
    }
    var n = [(a[2] - b[2]) * (a[3] - c[3]) - (a[3] - b[3]) * (a[2] - c[2]), (a[1] - b[1]) * (a[3] - c[3]) - (a[3] - b[3]) * (a[1] - c[1]), (a[1] - b[1]) * (a[2] - c[2]) - (a[2] - b[2]) * (a[1] - c[1])];
    var D = -(a[0] * n[0] + a[1] * n[1] + a[2] * n[2]);
    if (x[0] * n[0] + x[1] * n[1] + x[2] * n[2] + D == y[0] * n[0] + y[1] * n[1] + y[2] * n[2] + D) {
        return [x, y]; //oba na płaszczyźnie, czyli zwraca cały odcinek
    }
    var g = [x[0] - y[0], x[1] - y[1], x[2] - y[2]];
    var t = (D - (n[0] * y[0] + n[1] * y[1] + n[2] * y[2])) / (n[0] * g[0] + n[1] * g[1] + n[2] * g[2]);
    return [y[0] + g[0] * t, y[1] + g[1] * t, y[2] + g[2] * t]
}