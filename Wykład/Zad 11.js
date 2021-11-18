function prosta(A, B, C, D) {
    if (B[0] - A[0] != 0) {
        function f(x) {
            var a = (B[1] - A[1]) / (B[0] - A[0]);
            var b = B[1] - a * B[0];
            return a * x + b;
        }
        if ((f(C[0]) - C[1]) * (f(D[0]) - D[1]) >= 0) {
            return true;
        }
        return false;
    } else {
        if ((C[0] - B[0]) * (D[0] - B[0]) >= 0) {
            return true;
        } else {
            return false;
        }
    }
}