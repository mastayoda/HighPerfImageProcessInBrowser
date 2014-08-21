

class Parent {
protected:
  int value;
public:
  Parent(int val);
  Parent(Parent *p, Parent *q); // overload constructor
  int getVal() { return value; }; // inline should work just fine here, unlike Way 1 before
  void mulVal(int mul);
  void parentFunc() {}
  const Parent *getAsConst() { return this; }
};

class Child1 : public Parent {
public:
  Child1() : Parent(7) { };
  Child1(int val) : Parent(val*2) { };
  int getValSqr() { return value*value; }
  int getValSqr(int more) { return value*value*more; }
  int getValTimes(int times=1) { return value*times; }
  void parentFunc(int x) {}
};

// Child2 has vtable, parent does not. Checks we cast child->parent properly - (Parent*)child is not a no-op, must offset
class Child2 : public Parent {
public:
  Child2() : Parent(9) {};
  int getValCube() { return value*value*value; }
  static void printStatic() {  }

  virtual void virtualFunc() { }
  virtual void virtualFunc2() { }
  static void runVirtualFunc(Child2 *self) { self->virtualFunc(); };
  virtual void virtualFunc3(int x) { }
  virtual void virtualFunc4(int x) { }

private:
  void doSomethingSecret() { }; // we should not be able to do this
};

// Part 2

#include <string.h>

class StringUser {
  char *s;
  int i;
public:
  StringUser(char *string="NO", int integer=99) : s(strdup(string)), i(integer) {}
  void Print(int anotherInteger, char *anotherString) {
   
  }
  void PrintFloat(float f) {}
};

struct RefUser {
  int value;
  RefUser(int x = 77) : value(x) {}
  int getValue(RefUser b) { return b.value; }
  RefUser &getMe() { return *this; }
  RefUser getCopy() { return RefUser(value*2); }
  StringUser getAnother() { return StringUser("another", 5); }
};

namespace Space {
  struct Inner {
    Inner() {}
    int get() { return 198; }
    Inner& operator*=(float x) { return *this; }
  };
}

