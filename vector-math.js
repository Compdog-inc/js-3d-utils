window.Utils['_register']('VectorMath', function(factory){
  return function(id){
    const n = function (v) {
      const mag = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      return [v[0] / mag, v[1] / mag, v[2] / mag];
    };
    const N = function (p1, p2, p3) {
      return n([
        (p2[1] - p1[1]) * (p3[2] - p1[2]) - (p2[2] - p1[2]) * (p3[1] - p1[1]),
        (p2[2] - p1[2]) * (p3[0] - p1[0]) - (p2[0] - p1[0]) * (p3[2] - p1[2]),
        (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0])
      ]);
    };
    factory(id, {normalize:n,triNormal:N});
  }
});
