window.Utils['_register']('Hierarchy', function(factory){
  window.Utils.MatrixMath('_Hierarchy_matrixMath');
  window.Utils.MatrixGen('_Hierarchy_matrixGen');
  window.Utils.VertexAccess('_Hierarchy_vertexAccess');

  const vertexAccess = window.Utils['_Hierarchy_vertexAccess'];
  const matrixMath = window.Utils['_Hierarchy_matrixMath'];
  const matrixGen = window.Utils['_Hierarchy_matrixGen'];
  
  return function(id){
    const create = function(position, rotation, scale) {
      return {position,rotation,scale,parent:null,children:[]};
    };

    const addChild = function(parent, child) {
      child.parent = parent;
      parent.children.push(child);
    };

    const removeChild = function(parent, child) {
      if(child.parent === parent){
        child.parent = null;
        parent.children.splice(parent.children.indexOf(child), 1);
      }
    };

    const setParent = function(child, parent) {
      if(child.parent !== parent){
        if(child.parent != null){
          removeChild(child.parent, child);
        }

        if(parent != null){
          addChild(parent, child);
        }
      }
    };

    const getLocalMatrix = function(obj){
      const pos = matrixGen.Mtranslate(obj.position[0],obj.position[1],obj.position[2]);
      const rot = getLocalRotMatrix(obj);
      const scale = matrixGen.Mscale(obj.scale[0],obj.scale[1],obj.scale[2]);
      return matrixMath.mul(
          matrixMath.mul(
            pos, rot
          ),
          scale
        );
    };

    const getTransformMatrix = function(obj){
      const local = getLocalMatrix(obj);
      if(obj.parent == null)
        return local;

      return matrixMath.mul(getTransformMatrix(obj.parent), local);
    };

    const getLocalRotMatrix = function(obj){
      const rot = matrixGen.Mrot.q(obj.rotation);
      return rot;
    };

    const getRotationMatrix = function(obj){
      const local = getLocalRotMatrix(obj);
      if(obj.parent == null)
        return local;

      return matrixMath.mul(getRotationMatrix(obj.parent), local);
    };

    const getUnitVectors = function(obj){
      const rot = getRotationMatrix(obj);
      return {
        forward: matrixMath.transform(
          rot,
          vertexAccess.Ve([0, 0, 1])
        ),
        right: matrixMath.transform(
          rot,
          vertexAccess.Ve([1, 0, 0])
        ),
        up: matrixMath.transform(
          rot,
          vertexAccess.Ve([0, 1, 0])
        ),
      };
    };
    
    factory(id, {create,addChild,removeChild,setParent,getTransformMatrix,getRotationMatrix,getUnitVectors});
  }
});
