
#include <emscripten.h>

class Child2JS : public Child2 {
public:
  void virtualFunc() {
    EM_ASM_INT({
      var self = Module['getCache'](Module['Child2JS'])[$0];
      if (!self.hasOwnProperty('virtualFunc')) throw 'a JSImplementation must implement all functions, you forgot Child2JS::virtualFunc.';
      self.virtualFunc();
    }, (int)this);
  }
  void virtualFunc2() {
    EM_ASM_INT({
      var self = Module['getCache'](Module['Child2JS'])[$0];
      if (!self.hasOwnProperty('virtualFunc2')) throw 'a JSImplementation must implement all functions, you forgot Child2JS::virtualFunc2.';
      self.virtualFunc2();
    }, (int)this);
  }
  void virtualFunc3(int arg0) {
    EM_ASM_INT({
      var self = Module['getCache'](Module['Child2JS'])[$0];
      if (!self.hasOwnProperty('virtualFunc3')) throw 'a JSImplementation must implement all functions, you forgot Child2JS::virtualFunc3.';
      self.virtualFunc3();
    }, (int)this, arg0);
  }
  void virtualFunc4(int arg0) {
    EM_ASM_INT({
      var self = Module['getCache'](Module['Child2JS'])[$0];
      if (!self.hasOwnProperty('virtualFunc4')) throw 'a JSImplementation must implement all functions, you forgot Child2JS::virtualFunc4.';
      self.virtualFunc4();
    }, (int)this, arg0);
  }
  void __destroy__() {
    EM_ASM_INT({
      var self = Module['getCache'](Module['Child2JS'])[$0];
      if (!self.hasOwnProperty('__destroy__')) throw 'a JSImplementation must implement all functions, you forgot Child2JS::__destroy__.';
      self.__destroy__();
    }, (int)this);
  }
};

extern "C" {

// Parent

Parent* EMSCRIPTEN_KEEPALIVE emscripten_bind_Parent_Parent_1(int arg0) {
  return new Parent(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Parent_getVal_0(Parent* self) {
  return self->getVal();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Parent_mulVal_1(Parent* self, int arg0) {
  self->mulVal(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Parent_parentFunc_0(Parent* self) {
  self->parentFunc();
}

const Parent* EMSCRIPTEN_KEEPALIVE emscripten_bind_Parent_getAsConst_0(Parent* self) {
  return self->getAsConst();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Parent___destroy___0(Parent* self) {
  delete self;
}

// Child1

Child1* EMSCRIPTEN_KEEPALIVE emscripten_bind_Child1_Child1_0() {
  return new Child1();
}

Child1* EMSCRIPTEN_KEEPALIVE emscripten_bind_Child1_Child1_1(int arg0) {
  return new Child1(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Child1_getValSqr_0(Child1* self) {
  return self->getValSqr();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Child1_getValSqr_1(Child1* self, int arg0) {
  return self->getValSqr(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Child1_getValTimes_0(Child1* self) {
  return self->getValTimes();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Child1_getValTimes_1(Child1* self, int arg0) {
  return self->getValTimes(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child1_parentFunc_1(Child1* self, int arg0) {
  self->parentFunc(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Child1_getVal_0(Child1* self) {
  return self->getVal();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child1_mulVal_1(Child1* self, int arg0) {
  self->mulVal(arg0);
}

const Parent* EMSCRIPTEN_KEEPALIVE emscripten_bind_Child1_getAsConst_0(Child1* self) {
  return self->getAsConst();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child1___destroy___0(Child1* self) {
  delete self;
}

// Child2

Child2* EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2_Child2_0() {
  return new Child2();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2_getValCube_0(Child2* self) {
  return self->getValCube();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2_printStatic_0(Child2* self) {
  self->printStatic();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2_virtualFunc_0(Child2* self) {
  self->virtualFunc();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2_virtualFunc2_0(Child2* self) {
  self->virtualFunc2();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2_virtualFunc3_1(Child2* self, int arg0) {
  self->virtualFunc3(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2_virtualFunc4_1(Child2* self, int arg0) {
  self->virtualFunc4(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2_runVirtualFunc_1(Child2* self, Child2* arg0) {
  self->runVirtualFunc(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2_getVal_0(Child2* self) {
  return self->getVal();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2_mulVal_1(Child2* self, int arg0) {
  self->mulVal(arg0);
}

const Parent* EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2_getAsConst_0(Child2* self) {
  return self->getAsConst();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2___destroy___0(Child2* self) {
  delete self;
}

// StringUser

StringUser* EMSCRIPTEN_KEEPALIVE emscripten_bind_StringUser_StringUser_0() {
  return new StringUser();
}

StringUser* EMSCRIPTEN_KEEPALIVE emscripten_bind_StringUser_StringUser_2(char* arg0, int arg1) {
  return new StringUser(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_StringUser_Print_2(StringUser* self, int arg0, char* arg1) {
  self->Print(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_StringUser_PrintFloat_1(StringUser* self, float arg0) {
  self->PrintFloat(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_StringUser___destroy___0(StringUser* self) {
  delete self;
}

// Child2JS

Child2JS* EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2JS_Child2JS_0() {
  return new Child2JS();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2JS_virtualFunc_0(Child2JS* self) {
  self->virtualFunc();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2JS_virtualFunc2_0(Child2JS* self) {
  self->virtualFunc2();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2JS_virtualFunc3_1(Child2JS* self, int arg0) {
  self->virtualFunc3(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2JS_virtualFunc4_1(Child2JS* self, int arg0) {
  self->virtualFunc4(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Child2JS___destroy___0(Child2JS* self) {
  delete self;
}

// Inner

Space::Inner* EMSCRIPTEN_KEEPALIVE emscripten_bind_Inner_Inner_0() {
  return new Space::Inner();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Inner_get_0(Space::Inner* self) {
  return self->get();
}

Space::Inner* EMSCRIPTEN_KEEPALIVE emscripten_bind_Inner_mul_1(Space::Inner* self, float arg0) {
  return &(*self *= arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Inner___destroy___0(Space::Inner* self) {
  delete self;
}

// RefUser

RefUser* EMSCRIPTEN_KEEPALIVE emscripten_bind_RefUser_RefUser_0() {
  return new RefUser();
}

RefUser* EMSCRIPTEN_KEEPALIVE emscripten_bind_RefUser_RefUser_1(int arg0) {
  return new RefUser(arg0);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_RefUser_getValue_1(RefUser* self, RefUser* arg0) {
  return self->getValue(*arg0);
}

RefUser* EMSCRIPTEN_KEEPALIVE emscripten_bind_RefUser_getMe_0(RefUser* self) {
  return &self->getMe();
}

RefUser* EMSCRIPTEN_KEEPALIVE emscripten_bind_RefUser_getCopy_0(RefUser* self) {
  static RefUser temp;
  return (temp = self->getCopy(), &temp);
}

StringUser* EMSCRIPTEN_KEEPALIVE emscripten_bind_RefUser_getAnother_0(RefUser* self) {
  static StringUser temp;
  return (temp = self->getAnother(), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_RefUser___destroy___0(RefUser* self) {
  delete self;
}

}

