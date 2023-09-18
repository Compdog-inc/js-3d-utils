window.Utils['_register']('ProjectionMatrix', function(factory){
  return function(id){
    const D2r = Math.PI / 180.0;
    function yscale(fov) {
      return 1.0 / Math.tan((D2r * fov) / 2.0);
    }
    function xscale(fov, width, height) {
      return yscale(fov) / (width / height);
    }
    function zrange(near, far) {
      return near - far;
    }
    function Pmatrix(fov, near, far, width, height) {
      return [
        xscale(fov, width, height),
        0,
        0,
        0,
        0,
        yscale(fov),
        0,
        0,
        0,
        0,
        (far + near) / zrange(near, far),
        -1,
        0,
        0,
        (2 * far * near) / zrange(near,far),
        0
      ];
    }
    factory(id, {perspective:Pmatrix});
  }
});
