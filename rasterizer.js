window.Utils['_register']('Rasterizer', function(factory){
  window.Utils.Projector('_Rasterizer_projector');
  
  const projector = window.Utils['_Rasterizer_projector'];
  
  return function(id){
    const boundTriangle = function (poly) {
      return {
        left: Math.floor(Math.min(poly[0][0], Math.min(poly[1][0], poly[2][0]))),
        right: Math.ceil(Math.max(poly[0][0], Math.max(poly[1][0], poly[2][0]))),
        top: Math.floor(Math.min(poly[0][1], Math.min(poly[1][1], poly[2][1]))),
        bottom: Math.ceil(Math.max(poly[0][1], Math.max(poly[1][1], poly[2][1])))
      };
    };
    
    const testTriangle = function (poly, pt) {
      return (
        (pt[0] - poly[0][0]) * (poly[1][1] - poly[0][1]) -
          (pt[1] - poly[0][1]) * (poly[1][0] - poly[0][0]) >=
          0 &&
        (pt[0] - poly[1][0]) * (poly[2][1] - poly[1][1]) -
          (pt[1] - poly[1][1]) * (poly[2][0] - poly[1][0]) >=
          0 &&
        (pt[0] - poly[2][0]) * (poly[0][1] - poly[2][1]) -
          (pt[1] - poly[2][1]) * (poly[0][0] - poly[2][0]) >=
          0
      );
    };
    
    const barycentric = function (poly, pt) {
      const v0 = [poly[1][0] - poly[0][0], poly[1][1] - poly[0][1], 0];
      const v1 = [poly[2][0] - poly[0][0], poly[2][1] - poly[0][1], 0];
      const v2 = [pt[0] - poly[0][0], pt[1] - poly[0][1], 0];
      const d00 = D(v0, v0);
      const d01 = D(v0, v1);
      const d11 = D(v1, v1);
      const d20 = D(v2, v0);
      const d21 = D(v2, v1);
      const denom = d00 * d11 - d01 * d01;
      const v = (d11 * d20 - d01 * d21) / denom;
      const w = (d00 * d21 - d01 * d20) / denom;
      const u = 1.0 - v - w;
      return [u, v, w];
    };

    const drawTriangles = function (vertexShader,geoShader,pixelShader,matrix, verts, tris, viewX, viewY, viewWidth,viewHeight,viewNear,viewFar) {
      for (let t = 0; t < tris.length / 3; ++t) {
        const p0=vertexShader(verts[tris[t*3+0]]);
        const p1=vertexShader(verts[tris[t*3+1]]);
        const p2=vertexShader(verts[tris[t*3+2]]);
        const poly = projector.project(
          matrix,
          p0.position,
          p1.position,
          p2.position,
          viewX,viewY,viewWidth,viewHeight,viewNear,viewFar);
        
        if (poly != null) {
          const bounds = boundTriangle(poly);
    
          if (
            bounds.right < 0 ||
            bounds.bottom < 0 ||
            bounds.left > ctdata.width ||
            bounds.top > ctdata.height
          )
            continue;

          const tri = geoShader([p0,p1,p2]);
          
          for (
            let i = 0;
            i < (bounds.right - bounds.left) * (bounds.bottom - bounds.top);
            ++i
          ) {
            const tx = Math.floor((i % (bounds.right - bounds.left)) + bounds.left);
            const ty = Math.floor(i / (bounds.right - bounds.left) + bounds.top);
            if (tx < viewX || tx >= viewWidth || ty < viewY || ty >= viewHeight)
              continue;
    
            if (testTriangle(poly, [tx, ty])) {
              const bary = barycentric(poly, [tx, ty]);
              const curDepth =
                poly[0][2] * bary[0] + poly[1][2] * bary[1] + poly[2][2] * bary[2];

              for(let prop in tri[0]){ // iterate over every property in vertex data
                if(typeof(tri[0][prop]) === 'number'){
                  // interpolate numbers
                  tri.interpolated = tri.interpolated || {};
                  tri.interpolated[prop] = tri[0][prop] * bary[0] + tri[1][prop] * bary[1] + tri[2][prop] * bary[2];
                }
              }

              const pixel = pixelShader(tri);
    
              if (curDepth < ctdata_depth[tx + ty * ctdata.width]) {
                ctdata.data[(tx + ty * ctdata.width) * 4 + 0] = Math.floor(pixel.target[0] * 255);
                ctdata.data[(tx + ty * ctdata.width) * 4 + 1] = Math.floor(pixel.target[1] * 255);
                ctdata.data[(tx + ty * ctdata.width) * 4 + 2] = Math.floor(pixel.target[2] * 255);
                ctdata.data[(tx + ty * ctdata.width) * 4 + 3] = 255;
    
                ctdata_depth[tx + ty * ctdata.width] = curDepth;
              }
            }
          }
        }
      }
    };
      
    factory(id,{drawTriangles});
  }
});
