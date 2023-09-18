const Utils = {};
window.Utils = Utils;
Object.defineProperty(window.Utils, '_register', {
  value: function(id,n,p){
    // id
    Object.defineProperty(window.Utils, id, {
      value: p,
      writable: false,
    });
    // long name
    Object.defineProperty(window.Utils, n, {
      value: p,
      writable: false,
    });
  },
  writable: false,
});
