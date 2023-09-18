window.Utils['_register']('Projector', function(factory){
  window.Utils.MatrixMath('_Projector_matrixMath');
  window.Utils.VertexAccess('_Projector_vertexAccess');
  
  const matrixMath = window.Utils['_Projector_matrixMath'];
  const vertexAccess = window.Utils['_Projector_vertexAccess'];
  
  return function(id){
    const pn = function (pmat) {
      const tmp = pmat;
      const det = tmp[3];
      return [tmp[0] / det, tmp[1] / det, tmp[2] / det, tmp[3] / det];
    };
    const pcull = function (pmat) {
      const tmp = pmat;
      if (
        -tmp[3] <= tmp[0] &&
        tmp[0] <= tmp[3] &&
        -tmp[3] <= tmp[1] &&
        tmp[1] <= tmp[3]
      ) {
        return true;
      } else {
        return false;
      }
    };
    const p = function (mvpMat, c, x,y,width,height,near,far) {
      const pmat = matrixMath.transform(mvpMat, vertexAccess.V4(c));
      const t = pn(pmat);
      return {
        screen:
        [
          (width / 2.0) * t[0] + x + width / 2.0,
          height - ((height / 2.0) * t[1] + y + height / 2.0),
          ((far - near) / 2.0) * ((t[2] - near) / (far - near)) +
            (far + near) / 2.0
        ],
        cull:
          pcull(pmat)
      };
    };
    factory(id, {project:p});
  }
});
