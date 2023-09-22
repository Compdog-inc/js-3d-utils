window.Utils['_register']('MatrixGen', function(factory){
  return function(id){
    const Mtranslate = function (x, y, z) {
      return [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1];
    };
    const Mscale = function (x, y, z) {
      return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
    };
    const MrotQ = function(q) {
      return [
        2 * (q0 * q0 + q1 * q1) - 1,
        2 * (q1 * q2 - q0 * q3),
        2 * (q1 * q3 + q0 * q2),
        0,
        2 * (q1 * q2 + q0 * q3),
        2 * (q0 * q0 + q2 * q2) - 1,
        2 * (q2 * q3 - q0 * q1),
        0,
        2 * (q1 * q3 - q0 * q2),
        2 * (q2 * q3 + q0 * q1),
        2 * (q0 * q0 + q3 * q3) - 1,
        0,
        0,0,0,1
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
    factory(id, {Mtranslate,Mscale,Mrot:{x:Mrotx,y:Mroty,z:Mrotz,q:MrotQ}});
  }
});
