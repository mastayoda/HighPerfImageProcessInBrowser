#include "test.h"

Parent::Parent(int val) : value(val) {  }
Parent::Parent(Parent *p, Parent *q) : value(p->value + q->value) {}
void Parent::mulVal(int mul) { value *= mul; }

#include "glue.cpp"

