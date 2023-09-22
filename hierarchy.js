window.Utils['_register']('Hierarchy', function(factory){
  window.Utils.MatrixMath('_Hierarchy_matrixMath');
  window.Utils.MatrixGen('_Hierarchy_matrixGen');
  
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
      const rot = matrixGen.Mrot.q(obj.rotation);
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
    
    factory(id, {create,addChild,removeChild,setParent,getTransformMatrix});
  }
});
