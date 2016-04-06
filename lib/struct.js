;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Struct = factory();
  }
}(this, function() {
'use strict'

Struct = function() {

}

Struct.prototype.add = function() {
	return "In add"
}
return Struct;
}));
