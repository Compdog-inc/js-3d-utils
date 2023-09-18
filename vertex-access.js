window.Utils['_register']('VertexAccess', function(factory){
  return function(id, verts){
    const Vx = function (c) {
      return verts[3 * c + 0];
    };
    const Vy = function (c) {
      return verts[3 * c + 1];
    };
    const Vz = function (c) {
      return verts[3 * c + 2];
    };
    const V4 = function (c) {
      return [Vx(c), Vy(c), Vz(c), 1];
    };
    const Ve = function (v) {
      return [v[0], v[1], v[2], 1];
    };
    factory(id, {Vx,Vy,Vz,V4,Ve});
  }
});
