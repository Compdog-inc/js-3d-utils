window.Utils['_register']('MatrixGen', function(factory){
  const D2r = Math.PI / 180.0;
  return function(id){
    const Mtranslate = function (x, y, z) {
      return [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1];
    };
    const Mscale = function (x, y, z) {
      return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
    };
    const MrotQ = function(q) {
      return [
        1-2*(q[1]*q[1]+q[2]*q[2]),
        2*(q[0]*q[1]-q[3]*q[2]),
        2*(q[3]*q[1]+q[0]*q[2]),
        0,
        2*(q[0]*q[1]+q[3]*q[2]),
        1-2*(q[0]*q[0]+q[2]*q[2]),
        2*(q[1]*q[2]-q[3]*q[0]),
        0,
        2*(q[0]*q[2]-q[3]*q[1]),
        2*(q[3]*q[0]+q[1]*q[2]),
        1-2*(q[0]*q[0]+q[1]*q[1]),
        0,
        0,
        0,
        0,
        1
      ];
    };
    const Mrotx = function (a) {
      return [
        1,
        0,
        0,
        0,
        0,
        Math.cos(-a),
        -Math.sin(-a),
        0,
        0,
        Math.sin(-a),
        Math.cos(-a),
        0,
        0,
        0,
        0,
        1
      ];
    };
    const Mroty = function (a) {
      return [
        Math.cos(-a),
        0,
        Math.sin(-a),
        0,
        0,
        1,
        0,
        0,
        -Math.sin(-a),
        0,
        Math.cos(-a),
        0,
        0,
        0,
        0,
        1
      ];
    };
    const Mrotz = function (a) {
      return [
        Math.cos(-a),
        -Math.sin(-a),
        0,
        0,
        Math.sin(-a),
        Math.cos(-a),
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ];
    };
    // DEGREES
    const QuaternionFromEuler = function(x,y,z){
      const cx = Math.cos(D2r * y * 0.5);
      const sx = Math.sin(D2r * y * 0.5);
      const cy = Math.cos(D2r * z * 0.5);
      const sy = Math.sin(D2r * z * 0.5);
      const cz = Math.cos(D2r * x * 0.5);
      const sz = Math.sin(D2r * x * 0.5);

      return [
        sz * cx * cy - cz * sx * sy,
        cz * sx * cy + sz * cx * sy,
        cz * cx * sy - sz * sx * cy,
        cz * cx * cy + sz * sx * sy
      ];
    };
    factory(id, {Mtranslate,Mscale,Mrot:{x:Mrotx,y:Mroty,z:Mrotz,q:MrotQ},QuaternionFromEuler});
  }
});
