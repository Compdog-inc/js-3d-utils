const Utils = {};
window.Utils = Utils;
Object.defineProperty(window.Utils, '_register', {
  value: function(n,i){
    Object.defineProperty(window.Utils, n, {
      value: i(function(id,v){
        Object.defineProperty(window.Utils, id, {
          value: v,
          writable: false,
        });
      }),
      writable: false,
    });
  },
  writable: false,
});
