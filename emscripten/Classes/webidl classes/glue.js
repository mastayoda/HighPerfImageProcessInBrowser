
// Bindings utilities

function WrapperObject() {
}
WrapperObject.prototype = Object.create(WrapperObject.prototype);
WrapperObject.prototype.constructor = WrapperObject;
WrapperObject.prototype.__class__ = WrapperObject;
WrapperObject.__cache__ = {};
Module['WrapperObject'] = WrapperObject;

function getCache(__class__) {
  return (__class__ || WrapperObject).__cache__;
}
Module['getCache'] = getCache;

function wrapPointer(ptr, __class__) {
  var cache = getCache(__class__);
  var ret = cache[ptr];
  if (ret) return ret;
  ret = Object.create((__class__ || WrapperObject).prototype);
  ret.ptr = ptr;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  delete getCache(obj.__class__)[obj.ptr];
}
Module['destroy'] = destroy;

function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

// Converts a value into a C-style string.
function ensureString(value) {
  if (typeof value == 'string') return allocate(intArrayFromString(value), 'i8', ALLOC_STACK);
  return value;
}


// Parent
function Parent(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  this.ptr = _emscripten_bind_Parent_Parent_1(arg0);
  getCache(Parent)[this.ptr] = this;
};
Parent.prototype = Object.create(WrapperObject.prototype);
Parent.prototype.constructor = Parent;
Parent.prototype.__class__ = Parent;
Parent.__cache__ = {};
Module['Parent'] = Parent;

Parent.prototype.getVal = function() {
  var self = this.ptr;
  return _emscripten_bind_Parent_getVal_0(self);
};

Parent.prototype.mulVal = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Parent_mulVal_1(self, arg0);
};

Parent.prototype.parentFunc = function() {
  var self = this.ptr;
  _emscripten_bind_Parent_parentFunc_0(self);
};

Parent.prototype.getAsConst = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Parent_getAsConst_0(self), Parent);
};

  Parent.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Parent___destroy___0(self);
}
// Child1
function Child1(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg0 === undefined) { this.ptr = _emscripten_bind_Child1_Child1_0(); getCache(Child1)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_Child1_Child1_1(arg0);
  getCache(Child1)[this.ptr] = this;
};
Child1.prototype = Object.create(Parent.prototype);
Child1.prototype.constructor = Child1;
Child1.prototype.__class__ = Child1;
Child1.__cache__ = {};
Module['Child1'] = Child1;

Child1.prototype.getValSqr = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg0 === undefined) { return _emscripten_bind_Child1_getValSqr_0(self) }
  return _emscripten_bind_Child1_getValSqr_1(self, arg0);
};

Child1.prototype.getValTimes = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg0 === undefined) { return _emscripten_bind_Child1_getValTimes_0(self) }
  return _emscripten_bind_Child1_getValTimes_1(self, arg0);
};

Child1.prototype.parentFunc = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Child1_parentFunc_1(self, arg0);
};

Child1.prototype.getVal = function() {
  var self = this.ptr;
  return _emscripten_bind_Child1_getVal_0(self);
};

Child1.prototype.mulVal = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Child1_mulVal_1(self, arg0);
};

Child1.prototype.getAsConst = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Child1_getAsConst_0(self), Parent);
};

  Child1.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Child1___destroy___0(self);
}
// Child2
function Child2() {
  this.ptr = _emscripten_bind_Child2_Child2_0();
  getCache(Child2)[this.ptr] = this;
};
Child2.prototype = Object.create(Parent.prototype);
Child2.prototype.constructor = Child2;
Child2.prototype.__class__ = Child2;
Child2.__cache__ = {};
Module['Child2'] = Child2;

Child2.prototype.getValCube = function() {
  var self = this.ptr;
  return _emscripten_bind_Child2_getValCube_0(self);
};

Child2.prototype.printStatic = function() {
  var self = this.ptr;
  _emscripten_bind_Child2_printStatic_0(self);
};

Child2.prototype.virtualFunc = function() {
  var self = this.ptr;
  _emscripten_bind_Child2_virtualFunc_0(self);
};

Child2.prototype.virtualFunc2 = function() {
  var self = this.ptr;
  _emscripten_bind_Child2_virtualFunc2_0(self);
};

Child2.prototype.virtualFunc3 = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Child2_virtualFunc3_1(self, arg0);
};

Child2.prototype.virtualFunc4 = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Child2_virtualFunc4_1(self, arg0);
};

Child2.prototype.runVirtualFunc = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Child2_runVirtualFunc_1(self, arg0);
};

Child2.prototype.getVal = function() {
  var self = this.ptr;
  return _emscripten_bind_Child2_getVal_0(self);
};

Child2.prototype.mulVal = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Child2_mulVal_1(self, arg0);
};

Child2.prototype.getAsConst = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Child2_getAsConst_0(self), Parent);
};

  Child2.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Child2___destroy___0(self);
}
// StringUser
function StringUser(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  if (arg0 === undefined) { this.ptr = _emscripten_bind_StringUser_StringUser_0(); getCache(StringUser)[this.ptr] = this;return }
  if (arg1 === undefined) { this.ptr = _emscripten_bind_StringUser_StringUser_1(arg0); getCache(StringUser)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_StringUser_StringUser_2(arg0, arg1);
  getCache(StringUser)[this.ptr] = this;
};
StringUser.prototype = Object.create(WrapperObject.prototype);
StringUser.prototype.constructor = StringUser;
StringUser.prototype.__class__ = StringUser;
StringUser.__cache__ = {};
Module['StringUser'] = StringUser;

StringUser.prototype.Print = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  else arg1 = ensureString(arg1);
  _emscripten_bind_StringUser_Print_2(self, arg0, arg1);
};

StringUser.prototype.PrintFloat = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_StringUser_PrintFloat_1(self, arg0);
};

  StringUser.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_StringUser___destroy___0(self);
}
// Child2JS
function Child2JS() {
  this.ptr = _emscripten_bind_Child2JS_Child2JS_0();
  getCache(Child2JS)[this.ptr] = this;
};
Child2JS.prototype = Object.create(Child2.prototype);
Child2JS.prototype.constructor = Child2JS;
Child2JS.prototype.__class__ = Child2JS;
Child2JS.__cache__ = {};
Module['Child2JS'] = Child2JS;

Child2JS.prototype.virtualFunc = function() {
  var self = this.ptr;
  _emscripten_bind_Child2JS_virtualFunc_0(self);
};

Child2JS.prototype.virtualFunc2 = function() {
  var self = this.ptr;
  _emscripten_bind_Child2JS_virtualFunc2_0(self);
};

Child2JS.prototype.virtualFunc3 = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Child2JS_virtualFunc3_1(self, arg0);
};

Child2JS.prototype.virtualFunc4 = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  _emscripten_bind_Child2JS_virtualFunc4_1(self, arg0);
};

  Child2JS.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Child2JS___destroy___0(self);
}
// Inner
function Inner() {
  this.ptr = _emscripten_bind_Inner_Inner_0();
  getCache(Inner)[this.ptr] = this;
};
Inner.prototype = Object.create(WrapperObject.prototype);
Inner.prototype.constructor = Inner;
Inner.prototype.__class__ = Inner;
Inner.__cache__ = {};
Module['Inner'] = Inner;

Inner.prototype.get = function() {
  var self = this.ptr;
  return _emscripten_bind_Inner_get_0(self);
};

Inner.prototype.mul = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return wrapPointer(_emscripten_bind_Inner_mul_1(self, arg0), Inner);
};

  Inner.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Inner___destroy___0(self);
}
// RefUser
function RefUser(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  if (arg0 === undefined) { this.ptr = _emscripten_bind_RefUser_RefUser_0(); getCache(RefUser)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_RefUser_RefUser_1(arg0);
  getCache(RefUser)[this.ptr] = this;
};
RefUser.prototype = Object.create(WrapperObject.prototype);
RefUser.prototype.constructor = RefUser;
RefUser.prototype.__class__ = RefUser;
RefUser.__cache__ = {};
Module['RefUser'] = RefUser;

RefUser.prototype.getValue = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  else arg0 = ensureString(arg0);
  return _emscripten_bind_RefUser_getValue_1(self, arg0);
};

RefUser.prototype.getMe = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_RefUser_getMe_0(self), RefUser);
};

RefUser.prototype.getCopy = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_RefUser_getCopy_0(self), RefUser);
};

RefUser.prototype.getAnother = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_RefUser_getAnother_0(self), StringUser);
};

  RefUser.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_RefUser___destroy___0(self);
}
