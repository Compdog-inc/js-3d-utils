const Utils = {};
window.Utils = Utils;
Object.defineProperty(window.Utils, '_register', {
  value: function(n,i){
    Object.defineProperty(window.Utils, n, {
      value: i,
      writable: false,
    });
    return function(id,v){
      Object.defineProperty(window.Utils[n], id, {
        value: v,
        writable: false,
      });
    };
  },
  writable: false,
});
