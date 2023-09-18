window.Utils['_register']('MatrixMath', function(factory){
  return function(id, indexLookup){
    const D = function (a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    };
    const S = function (x) {
      return typeof indexLookup === 'function' ? indexLookup(x) : x;
    };
    const Mi = function (A, i, j) {
      return A[4 * i + j];
    };
    const M = function (A, B) {
      return [
        Mi(A, 0, 0) * Mi(B, 0, 0) +
          Mi(A, 0, 1) * Mi(B, 1, 0) +
          Mi(A, 0, 2) * Mi(B, 2, 0) +
          Mi(A, 0, 3) * Mi(B, 3, 0),
        Mi(A, 0, 0) * Mi(B, 0, 1) +
          Mi(A, 0, 1) * Mi(B, 1, 1) +
          Mi(A, 0, 2) * Mi(B, 2, 1) +
          Mi(A, 0, 3) * Mi(B, 3, 1),
        Mi(A, 0, 0) * Mi(B, 0, 2) +
          Mi(A, 0, 1) * Mi(B, 1, 2) +
          Mi(A, 0, 2) * Mi(B, 2, 2) +
          Mi(A, 0, 3) * Mi(B, 3, 2),
        Mi(A, 0, 0) * Mi(B, 0, 3) +
          Mi(A, 0, 1) * Mi(B, 1, 3) +
          Mi(A, 0, 2) * Mi(B, 2, 3) +
          Mi(A, 0, 3) * Mi(B, 3, 3),
        Mi(A, 1, 0) * Mi(B, 0, 0) +
          Mi(A, 1, 1) * Mi(B, 1, 0) +
          Mi(A, 1, 2) * Mi(B, 2, 0) +
          Mi(A, 1, 3) * Mi(B, 3, 0),
        Mi(A, 1, 0) * Mi(B, 0, 1) +
          Mi(A, 1, 1) * Mi(B, 1, 1) +
          Mi(A, 1, 2) * Mi(B, 2, 1) +
          Mi(A, 1, 3) * Mi(B, 3, 1),
        Mi(A, 1, 0) * Mi(B, 0, 2) +
          Mi(A, 1, 1) * Mi(B, 1, 2) +
          Mi(A, 1, 2) * Mi(B, 2, 2) +
          Mi(A, 1, 3) * Mi(B, 3, 2),
        Mi(A, 1, 0) * Mi(B, 0, 3) +
          Mi(A, 1, 1) * Mi(B, 1, 3) +
          Mi(A, 1, 2) * Mi(B, 2, 3) +
          Mi(A, 1, 3) * Mi(B, 3, 3),
        Mi(A, 2, 0) * Mi(B, 0, 0) +
          Mi(A, 2, 1) * Mi(B, 1, 0) +
          Mi(A, 2, 2) * Mi(B, 2, 0) +
          Mi(A, 2, 3) * Mi(B, 3, 0),
        Mi(A, 2, 0) * Mi(B, 0, 1) +
          Mi(A, 2, 1) * Mi(B, 1, 1) +
          Mi(A, 2, 2) * Mi(B, 2, 1) +
          Mi(A, 2, 3) * Mi(B, 3, 1),
        Mi(A, 2, 0) * Mi(B, 0, 2) +
          Mi(A, 2, 1) * Mi(B, 1, 2) +
          Mi(A, 2, 2) * Mi(B, 2, 2) +
          Mi(A, 2, 3) * Mi(B, 3, 2),
        Mi(A, 2, 0) * Mi(B, 0, 3) +
          Mi(A, 2, 1) * Mi(B, 1, 3) +
          Mi(A, 2, 2) * Mi(B, 2, 3) +
          Mi(A, 2, 3) * Mi(B, 3, 3),
        Mi(A, 3, 0) * Mi(B, 0, 0) +
          Mi(A, 3, 1) * Mi(B, 1, 0) +
          Mi(A, 3, 2) * Mi(B, 2, 0) +
          Mi(A, 3, 3) * Mi(B, 3, 0),
        Mi(A, 3, 0) * Mi(B, 0, 1) +
          Mi(A, 3, 1) * Mi(B, 1, 1) +
          Mi(A, 3, 2) * Mi(B, 2, 1) +
          Mi(A, 3, 3) * Mi(B, 3, 1),
        Mi(A, 3, 0) * Mi(B, 0, 2) +
          Mi(A, 3, 1) * Mi(B, 1, 2) +
          Mi(A, 3, 2) * Mi(B, 2, 2) +
          Mi(A, 3, 3) * Mi(B, 3, 2),
        Mi(A, 3, 0) * Mi(B, 0, 3) +
          Mi(A, 3, 1) * Mi(B, 1, 3) +
          Mi(A, 3, 2) * Mi(B, 2, 3) +
          Mi(A, 3, 3) * Mi(B, 3, 3)
      ];
    };
    const Minvd = function (A) {
      return [
        A[S(5)] * A[S(10)] * A[S(15)] -
          A[S(5)] * A[S(11)] * A[S(14)] -
          A[S(9)] * A[S(6)] * A[S(15)] +
          A[S(9)] * A[S(7)] * A[S(14)] +
          A[S(13)] * A[S(6)] * A[S(11)] -
          A[S(13)] * A[S(7)] * A[S(10)],
        -A[S(1)] * A[S(10)] * A[S(15)] +
          A[S(1)] * A[S(11)] * A[S(14)] +
          A[S(9)] * A[S(2)] * A[S(15)] -
          A[S(9)] * A[S(3)] * A[S(14)] -
          A[S(13)] * A[S(2)] * A[S(11)] +
          A[S(13)] * A[S(3)] * A[S(10)],
        A[S(1)] * A[S(6)] * A[S(15)] -
          A[S(1)] * A[S(7)] * A[S(14)] -
          A[S(5)] * A[S(2)] * A[S(15)] +
          A[S(5)] * A[S(3)] * A[S(14)] +
          A[S(13)] * A[S(2)] * A[S(7)] -
          A[S(13)] * A[S(3)] * A[S(6)],
        -A[S(1)] * A[S(6)] * A[S(11)] +
          A[S(1)] * A[S(7)] * A[S(10)] +
          A[S(5)] * A[S(2)] * A[S(11)] -
          A[S(5)] * A[S(3)] * A[S(10)] -
          A[S(9)] * A[S(2)] * A[S(7)] +
          A[S(9)] * A[S(3)] * A[S(6)],
        -A[S(4)] * A[S(10)] * A[S(15)] +
          A[S(4)] * A[S(11)] * A[S(14)] +
          A[S(8)] * A[S(6)] * A[S(15)] -
          A[S(8)] * A[S(7)] * A[S(14)] -
          A[S(12)] * A[S(6)] * A[S(11)] +
          A[S(12)] * A[S(7)] * A[S(10)],
        A[S(0)] * A[S(10)] * A[S(15)] -
          A[S(0)] * A[S(11)] * A[S(14)] -
          A[S(8)] * A[S(2)] * A[S(15)] +
          A[S(8)] * A[S(3)] * A[S(14)] +
          A[S(12)] * A[S(2)] * A[S(11)] -
          A[S(12)] * A[S(3)] * A[S(10)],
        -A[S(0)] * A[S(6)] * A[S(15)] +
          A[S(0)] * A[S(7)] * A[S(14)] +
          A[S(4)] * A[S(2)] * A[S(15)] -
          A[S(4)] * A[S(3)] * A[S(14)] -
          A[S(12)] * A[S(2)] * A[S(7)] +
          A[S(12)] * A[S(3)] * A[S(6)],
        A[S(0)] * A[S(6)] * A[S(11)] -
          A[S(0)] * A[S(7)] * A[S(10)] -
          A[S(4)] * A[S(2)] * A[S(11)] +
          A[S(4)] * A[S(3)] * A[S(10)] +
          A[S(8)] * A[S(2)] * A[S(7)] -
          A[S(8)] * A[S(3)] * A[S(6)],
        A[S(4)] * A[S(9)] * A[S(15)] -
          A[S(4)] * A[S(11)] * A[S(13)] -
          A[S(8)] * A[S(5)] * A[S(15)] +
          A[S(8)] * A[S(7)] * A[S(13)] +
          A[S(12)] * A[S(5)] * A[S(11)] -
          A[S(12)] * A[S(7)] * A[S(9)],
        -A[S(0)] * A[S(9)] * A[S(15)] +
          A[S(0)] * A[S(11)] * A[S(13)] +
          A[S(8)] * A[S(1)] * A[S(15)] -
          A[S(8)] * A[S(3)] * A[S(13)] -
          A[S(12)] * A[S(1)] * A[S(11)] +
          A[S(12)] * A[S(3)] * A[S(9)],
        A[S(0)] * A[S(5)] * A[S(15)] -
          A[S(0)] * A[S(7)] * A[S(13)] -
          A[S(4)] * A[S(1)] * A[S(15)] +
          A[S(4)] * A[S(3)] * A[S(13)] +
          A[S(12)] * A[S(1)] * A[S(7)] -
          A[S(12)] * A[S(3)] * A[S(5)],
        -A[S(0)] * A[S(5)] * A[S(11)] +
          A[S(0)] * A[S(7)] * A[S(9)] +
          A[S(4)] * A[S(1)] * A[S(11)] -
          A[S(4)] * A[S(3)] * A[S(9)] -
          A[S(8)] * A[S(1)] * A[S(7)] +
          A[S(8)] * A[S(3)] * A[S(5)],
        -A[S(4)] * A[S(9)] * A[S(14)] +
          A[S(4)] * A[S(10)] * A[S(13)] +
          A[S(8)] * A[S(5)] * A[S(14)] -
          A[S(8)] * A[S(6)] * A[S(13)] -
          A[S(12)] * A[S(5)] * A[S(10)] +
          A[S(12)] * A[S(6)] * A[S(9)],
        A[S(0)] * A[S(9)] * A[S(14)] -
          A[S(0)] * A[S(10)] * A[S(13)] -
          A[S(8)] * A[S(1)] * A[S(14)] +
          A[S(8)] * A[S(2)] * A[S(13)] +
          A[S(12)] * A[S(1)] * A[S(10)] -
          A[S(12)] * A[S(2)] * A[S(9)],
        -A[S(0)] * A[S(5)] * A[S(14)] +
          A[S(0)] * A[S(6)] * A[S(13)] +
          A[S(4)] * A[S(1)] * A[S(14)] -
          A[S(4)] * A[S(2)] * A[S(13)] -
          A[S(12)] * A[S(1)] * A[S(6)] +
          A[S(12)] * A[S(2)] * A[S(5)],
        A[S(0)] * A[S(5)] * A[S(10)] -
          A[S(0)] * A[S(6)] * A[S(9)] -
          A[S(4)] * A[S(1)] * A[S(10)] +
          A[S(4)] * A[S(2)] * A[S(9)] +
          A[S(8)] * A[S(1)] * A[S(6)] -
          A[S(8)] * A[S(2)] * A[S(5)]
      ];
    };
    const Mdet = function (A, I0) {
      return (
        1.0 /
        (A[S(0)] * I0[S(0)] +
          A[S(1)] * I0[S(4)] +
          A[S(2)] * I0[S(8)] +
          A[S(3)] * I0[S(12)])
      );
    };
    const Minv = function (A) {
      const inv = Minvd(A);
      const det = Mdet(A, inv);
      return inv.map((v) => v * det);
    };
    const m = function (A, B) {
      return [
        A[0] * B[0] + A[1] * B[1] + A[2] * B[2] + A[3] * B[3],
        A[4] * B[0] + A[5] * B[1] + A[6] * B[2] + A[7] * B[3],
        A[8] * B[0] + A[9] * B[1] + A[10] * B[2] + A[11] * B[3],
        A[12] * B[0] + A[13] * B[1] + A[14] * B[2] + A[15] * B[3]
      ];
    };
    factory(id, {dot:D,mul:M,inv:Minv,transform:m});
  }
});
