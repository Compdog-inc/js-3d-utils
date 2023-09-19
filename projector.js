window.Utils['_register']('Projector', function(factory){
  window.Utils.MatrixMath('_Projector_matrixMath');
  window.Utils.VertexAccess('_Projector_vertexAccess');
  window.Utils.VectorMath('_Projector_vectorMath');
  
  const matrixMath = window.Utils['_Projector_matrixMath'];
  const vertexAccess = window.Utils['_Projector_vertexAccess'];
  const vectorMath = window.Utils['_Projector_vectorMath'];
  
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
    const p = function (pmat, x,y,width,height,near,far,znear,zfar) {
      const t = pn(pmat);
      return {
        screen:
        [
          (width / 2.0) * t[0] + x + width / 2.0,
          height - ((height / 2.0) * t[1] + y + height / 2.0),
          ((far - near) / 2.0) * ((t[2] - znear) / (zfar - znear)) +
            (far + near) / 2.0
        ],
        cull:
          pcull(pmat)
      };
    };

    const r = function (mvpMat, p0,p1,p2, x,y,width,height,near,far,znear,zfar) {
      const Tmats = [
        matrixMath.transform(mvpMat, vertexAccess.Ve(p0)),
        matrixMath.transform(mvpMat, vertexAccess.Ve(p1)),
        matrixMath.transform(mvpMat, vertexAccess.Ve(p2))
      ];

      if (
        matrixMath.dot(
          pn(Tmats[0]).map((v) => -v),
          vectorMath.triNormal(
            pn(Tmats[0]),
            pn(Tmats[1]),
            pn(Tmats[2])
          )
        ) > 0
      ) {
        return null;
      } else {
        const cull0 = pcull(Tmats[0]);
        const cull1 = pcull(Tmats[1]);
        const cull2 = pcull(Tmats[2]);
        if(cull0 || cull1 || cull2)
          return [
            p(Tmats[0],x,y,width,height,near,far,znear,zfar),
            p(Tmats[1],x,y,width,height,near,far,znear,zfar),
            p(Tmats[2],x,y,width,height,near,far,znear,zfar)
                 ];
        else
          return null;
      }
    };
    factory(id, {project:r});
  }
});
