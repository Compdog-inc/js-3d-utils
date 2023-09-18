const Utils = {};
window.Utils = Utils;
Object.defineProperty(window.Utils, '_register', {
  value: function(n,p){
    Object.defineProperty(window.Utils, n, {
      value: p,
      writable: false,
    });
  },
  writable: false,
});
