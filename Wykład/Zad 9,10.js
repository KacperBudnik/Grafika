function współliniowe(a, b, c, n) {
    if (a == b || b == c || a == c) {
        return true;
    }
    var x = [],
        y = [];
    for (var i = 0; i < n; ++i) {
        x.push(a[i] - b[i]);
        y.push(a[i] - c[i]);
    }
    var c = 0;
    if (x[0] != 0) {
        c = y[0] / x[0];
    } else {
        if (y[0] == 0) {
            var t = 1;
            while (t <= n) {
                if (x[t] != 0) {
                    c = y[t] / x[t];
                    break;
                } else {
                    t++;
                }
            }
        } else {
            return false;
        }
    }
    for (var i = 0; i < n; ++i) {
        if (x[i] != 0) {
            if (abs(y[i] / x[i] - c) > 0.0001) {
                return false;
            }
        } else {
            if (y[i] != 0) {
                return false;
            }
        }
    }
    return true;
}