#include <iostream>
#include <math.h>
#include <float.h>
#include <assert.h>
#include <string.h>
#include <stdint.h>

#ifdef _WIN32
extern "C" float roundf(float);
extern "C" double round(double);
#else
inline float asinh_f32(float x) {return asinhf(x);}
inline float acosh_f32(float x) {return acoshf(x);}
inline float atanh_f32(float x) {return atanhf(x);}
inline double asinh_f64(double x) {return asinh(x);}
inline double acosh_f64(double x) {return acosh(x);}
inline double atanh_f64(double x) {return atanh(x);}
#endif
inline float sqrt_f32(float x) {return sqrtf(x);}
inline float sin_f32(float x) {return sinf(x);}
inline float asin_f32(float x) {return asinf(x);}
inline float cos_f32(float x) {return cosf(x);}
inline float acos_f32(float x) {return acosf(x);}
inline float tan_f32(float x) {return tanf(x);}
inline float atan_f32(float x) {return atanf(x);}
inline float sinh_f32(float x) {return sinhf(x);}
inline float cosh_f32(float x) {return coshf(x);}
inline float tanh_f32(float x) {return tanhf(x);}
inline float hypot_f32(float x, float y) {return hypotf(x, y);}
inline float exp_f32(float x) {return expf(x);}
inline float log_f32(float x) {return logf(x);}
inline float pow_f32(float x, float y) {return powf(x, y);}
inline float floor_f32(float x) {return floorf(x);}
inline float ceil_f32(float x) {return ceilf(x);}
inline float round_f32(float x) {return roundf(x);}

inline double sqrt_f64(double x) {return sqrt(x);}
inline double sin_f64(double x) {return sin(x);}
inline double asin_f64(double x) {return asin(x);}
inline double cos_f64(double x) {return cos(x);}
inline double acos_f64(double x) {return acos(x);}
inline double tan_f64(double x) {return tan(x);}
inline double atan_f64(double x) {return atan(x);}
inline double sinh_f64(double x) {return sinh(x);}
inline double cosh_f64(double x) {return cosh(x);}
inline double tanh_f64(double x) {return tanh(x);}
inline double hypot_f64(double x, double y) {return hypot(x, y);}
inline double exp_f64(double x) {return exp(x);}
inline double log_f64(double x) {return log(x);}
inline double pow_f64(double x, double y) {return pow(x, y);}
inline double floor_f64(double x) {return floor(x);}
inline double ceil_f64(double x) {return ceil(x);}
inline double round_f64(double x) {return round(x);}

inline float maxval_f32() {return FLT_MAX;}
inline float minval_f32() {return -FLT_MAX;}
inline double maxval_f64() {return DBL_MAX;}
inline double minval_f64() {return -DBL_MAX;}
inline uint8_t maxval_u8() {return 0xff;}
inline uint8_t minval_u8() {return 0;}
inline uint16_t maxval_u16() {return 0xffff;}
inline uint16_t minval_u16() {return 0;}
inline uint32_t maxval_u32() {return 0xffffffff;}
inline uint32_t minval_u32() {return 0;}
inline uint64_t maxval_u64() {return 0xffffffffffffffff;}
inline uint64_t minval_u64() {return 0;}
inline int8_t maxval_s8() {return 0x7f;}
inline int8_t minval_s8() {return 0x80;}
inline int16_t maxval_s16() {return 0x7fff;}
inline int16_t minval_s16() {return 0x8000;}
inline int32_t maxval_s32() {return 0x7fffffff;}
inline int32_t minval_s32() {return 0x80000000;}
inline int64_t maxval_s64() {return 0x7fffffffffffffff;}
inline int64_t minval_s64() {return 0x8000000000000000;}

inline int8_t abs_i8(int8_t a) {return a >= 0 ? a : -a;}
inline int16_t abs_i16(int16_t a) {return a >= 0 ? a : -a;}
inline int32_t abs_i32(int32_t a) {return a >= 0 ? a : -a;}
inline int64_t abs_i64(int64_t a) {return a >= 0 ? a : -a;}
inline float abs_f32(float a) {return fabsf(a);}
inline double abs_f64(double a) {return fabs(a);}

inline float nan_f32() {return NAN;}
inline float neg_inf_f32() {return -INFINITY;}
inline float inf_f32() {return INFINITY;}
inline float float_from_bits(uint32_t bits) {
 union {
  uint32_t as_uint;
  float as_float;
 } u;
 u.as_uint = bits;
 return u.as_float;
}

template<typename T> T max(T a, T b) {if (a > b) return a; return b;}
template<typename T> T min(T a, T b) {if (a < b) return a; return b;}
template<typename T> T mod(T a, T b) {T result = a % b; if (result < 0) result += b; return result;}
template<typename T> T sdiv(T a, T b) {return (a - mod(a, b))/b;}
template<typename A, typename B> A reinterpret(B b) {A a; memcpy(&a, &b, sizeof(a)); return a;}

#ifndef BUFFER_T_DEFINED
#define BUFFER_T_DEFINED
#include <stdint.h>
typedef struct buffer_t {
    uint64_t dev;
    uint8_t* host;
    int32_t extent[4];
    int32_t stride[4];
    int32_t min[4];
    int32_t elem_size;
    bool host_dirty;
    bool dev_dirty;
} buffer_t;
#endif
bool halide_rewrite_buffer(buffer_t *b, int32_t elem_size,
                           int32_t min0, int32_t extent0, int32_t stride0,
                           int32_t min1, int32_t extent1, int32_t stride1,
                           int32_t min2, int32_t extent2, int32_t stride2,
                           int32_t min3, int32_t extent3, int32_t stride3) {
 b->min[0] = min0;
 b->min[1] = min1;
 b->min[2] = min2;
 b->min[3] = min3;
 b->extent[0] = extent0;
 b->extent[1] = extent1;
 b->extent[2] = extent2;
 b->extent[3] = extent3;
 b->stride[0] = stride0;
 b->stride[1] = stride1;
 b->stride[2] = stride2;
 b->stride[3] = stride3;
 return true;
}


extern "C" int brighter(buffer_t * _brighter) {

/*
printf("Host is: %d\n",_brighter->host);
printf("_Brighter is: %d\n",_brighter);
printf("no \n");
  
for (int i = 0; i < 100; ++i) {
    printf("%d\n", (unsigned)_brighter->host[i]);
}
*/

uint8_t *brighter = (uint8_t *)(_brighter->host);
const bool brighter_host_and_dev_are_null = (_brighter->host == NULL) && (_brighter->dev == 0);
(void)brighter_host_and_dev_are_null;
const int32_t brighter_min_0 = _brighter->min[0];
(void)brighter_min_0;
const int32_t brighter_min_1 = _brighter->min[1];
(void)brighter_min_1;
const int32_t brighter_min_2 = _brighter->min[2];
(void)brighter_min_2;
const int32_t brighter_min_3 = _brighter->min[3];
(void)brighter_min_3;
const int32_t brighter_extent_0 = _brighter->extent[0];
(void)brighter_extent_0;
const int32_t brighter_extent_1 = _brighter->extent[1];
(void)brighter_extent_1;
const int32_t brighter_extent_2 = _brighter->extent[2];
(void)brighter_extent_2;
const int32_t brighter_extent_3 = _brighter->extent[3];
(void)brighter_extent_3;
const int32_t brighter_stride_0 = _brighter->stride[0];
(void)brighter_stride_0;
const int32_t brighter_stride_1 = _brighter->stride[1];
(void)brighter_stride_1;
const int32_t brighter_stride_2 = _brighter->stride[2];
(void)brighter_stride_2;
const int32_t brighter_stride_3 = _brighter->stride[3];
(void)brighter_stride_3;
const int32_t brighter_elem_size = _brighter->elem_size;
uint8_t *i0 = (uint8_t *)(_brighter->host);
const bool i0_host_and_dev_are_null = (_brighter->host == NULL) && (_brighter->dev == 0);
(void)i0_host_and_dev_are_null;
const int32_t i0_min_0 = _brighter->min[0];
(void)i0_min_0;
const int32_t i0_min_1 = _brighter->min[1];
(void)i0_min_1;
const int32_t i0_min_2 = _brighter->min[2];
(void)i0_min_2;
const int32_t i0_min_3 = _brighter->min[3];
(void)i0_min_3;
const int32_t i0_extent_0 = _brighter->extent[0];
(void)i0_extent_0;
const int32_t i0_extent_1 = _brighter->extent[1];
(void)i0_extent_1;
const int32_t i0_extent_2 = _brighter->extent[2];
(void)i0_extent_2;
const int32_t i0_extent_3 = _brighter->extent[3];
(void)i0_extent_3;
const int32_t i0_stride_0 = _brighter->stride[0];
(void)i0_stride_0;
const int32_t i0_stride_1 = _brighter->stride[1];
(void)i0_stride_1;
const int32_t i0_stride_2 = _brighter->stride[2];
(void)i0_stride_2;
const int32_t i0_stride_3 = _brighter->stride[3];
(void)i0_stride_3;
const int32_t i0_elem_size = _brighter->elem_size;
bool V0 = !(i0_host_and_dev_are_null);
bool V1 = 0 <= brighter_min_0;
int32_t V2 = brighter_min_0 + brighter_extent_0;
bool V3 = V2 <= 399;
bool V4 = V1 && V3;
bool V5 = V0 || V4;
if (!V5) {
 printf("Applying the constraints to the required region made it smaller\n");
 return -1;
}
bool V6 = 0 <= brighter_min_1;
int32_t V7 = brighter_min_1 + brighter_extent_1;
bool V8 = V7 <= 279;
bool V9 = V6 && V8;
bool V10 = V0 || V9;
if (!V10) {
 printf("Applying the constraints to the required region made it smaller\n");
 return -1;
}
bool V11 = brighter_extent_0 <= 399;
bool V12 = V0 || V11;
if (!V12) {
 printf("Applying the constraints to the required stride made it smaller\n");
 return -1;
}
bool V13 = 0 <= brighter_min_2;
int32_t V14 = brighter_min_2 + brighter_extent_2;
bool V15 = V14 <= 4;
bool V16 = V13 && V15;
bool V17 = V0 || V16;
if (!V17) {
 printf("Applying the constraints to the required region made it smaller\n");
 return -1;
}
int32_t V18 = brighter_extent_0 * brighter_extent_1;
bool V19 = V18 <= 111321;
bool V20 = V0 || V19;
if (!V20) {
 printf("Applying the constraints to the required stride made it smaller\n");
 return -1;
}
if (brighter_host_and_dev_are_null)
{
 int32_t V21 = brighter_extent_0 * brighter_extent_1;
 bool V22 = halide_rewrite_buffer(_brighter, 1, brighter_min_0, brighter_extent_0, 1, brighter_min_1, brighter_extent_1, brighter_extent_0, brighter_min_2, brighter_extent_2, V21, 0, 0, 0);
 (void)V22;
} // if brighter_host_and_dev_are_null
if (i0_host_and_dev_are_null)
{
 bool V23 = halide_rewrite_buffer(_brighter, 1, 0, 399, 1, 0, 279, 399, 0, 4, 111321, 0, 0, 0);
 (void)V23;
} // if i0_host_and_dev_are_null
bool V24 = brighter_host_and_dev_are_null || i0_host_and_dev_are_null;
bool V25 = !(V24);
if (V25)
{
 bool V26 = brighter_elem_size == 1;
 if (!V26) {
  printf("Output buffer brighter has type uint8, but elem_size of the buffer_t passed in is %d instead of 1\n", brighter_elem_size);
  return -1;
 }
 bool V27 = i0_elem_size == 1;
 if (!V27) {
  printf("Input buffer i0 has type uint8, but elem_size of the buffer_t passed in is %d instead of 1\n", i0_elem_size);
  return -1;
 }
 bool V28 = i0_min_0 <= brighter_min_0;
 if (!V28) {
  printf("Input buffer i0 is accessed at %d, which before the min (%d) in dimension 0\n", brighter_min_0, i0_min_0);
  return -1;
 }
 int32_t V29 = brighter_min_0 + brighter_extent_0;
 int32_t V30 = V29 - i0_extent_0;
 bool V31 = V30 <= i0_min_0;
 int32_t V32 = V29 + -1;
 int32_t V33 = i0_min_0 + i0_extent_0;
 int32_t V34 = V33 + -1;
 if (!V31) {
  printf("Input buffer i0 is accessed at %d, which is beyond the max (%d) in dimension 0\n", V32, V34);
  return -1;
 }
 bool V35 = i0_min_1 <= brighter_min_1;
 if (!V35) {
  printf("Input buffer i0 is accessed at %d, which before the min (%d) in dimension 1\n", brighter_min_1, i0_min_1);
  return -1;
 }
 int32_t V36 = brighter_min_1 + brighter_extent_1;
 int32_t V37 = V36 - i0_extent_1;
 bool V38 = V37 <= i0_min_1;
 int32_t V39 = V36 + -1;
 int32_t V40 = i0_min_1 + i0_extent_1;
 int32_t V41 = V40 + -1;
 if (!V38) {
  printf("Input buffer i0 is accessed at %d, which is beyond the max (%d) in dimension 1\n", V39, V41);
  return -1;
 }
 bool V42 = i0_min_2 <= brighter_min_2;
 if (!V42) {
  printf("Input buffer i0 is accessed at %d, which before the min (%d) in dimension 2\n", brighter_min_2, i0_min_2);
  return -1;
 }
 int32_t V43 = brighter_min_2 + brighter_extent_2;
 int32_t V44 = V43 - i0_extent_2;
 bool V45 = V44 <= i0_min_2;
 int32_t V46 = V43 + -1;
 int32_t V47 = i0_min_2 + i0_extent_2;
 int32_t V48 = V47 + -1;
 if (!V45) {
  printf("Input buffer i0 is accessed at %d, which is beyond the max (%d) in dimension 2\n", V46, V48);
  return -1;
 }
 bool V49 = brighter_stride_0 == 1;
 if (!V49) {
  printf("Static constraint violated: brighter.stride.0 == 1\n");
  return -1;
 }
 bool V50 = i0_stride_0 == 1;
 if (!V50) {
  printf("Static constraint violated: i0.stride.0 == 1\n");
  return -1;
 }
 bool V51 = i0_min_0 == 0;
 if (!V51) {
  printf("Static constraint violated: i0.min.0 == 0\n");
  return -1;
 }
 bool V52 = i0_extent_0 == 399;
 if (!V52) {
  printf("Static constraint violated: i0.extent.0 == 399\n");
  return -1;
 }
 bool V53 = i0_stride_1 == 399;
 if (!V53) {
  printf("Static constraint violated: i0.stride.1 == 399\n");
  return -1;
 }
 bool V54 = i0_min_1 == 0;
 if (!V54) {
  printf("Static constraint violated: i0.min.1 == 0\n");
  return -1;
 }
 bool V55 = i0_extent_1 == 279;
 if (!V55) {
  printf("Static constraint violated: i0.extent.1 == 279\n");
  return -1;
 }
 bool V56 = i0_stride_2 == 111321;
 if (!V56) {
  printf("Static constraint violated: i0.stride.2 == 111321\n");
  return -1;
 }
 bool V57 = i0_min_2 == 0;
 if (!V57) {
  printf("Static constraint violated: i0.min.2 == 0\n");
  return -1;
 }
 bool V58 = i0_extent_2 == 4;
 if (!V58) {
  printf("Static constraint violated: i0.extent.2 == 4\n");
  return -1;
 }
 int64_t V59 = (int64_t)(brighter_extent_0);
 int64_t V60 = (int64_t)(brighter_extent_1);
 int64_t V61 = (int64_t)(brighter_extent_2);
 int64_t V62 = V60 * V59;
 int64_t V63 = V61 * V62;
 int64_t V64 = (int64_t)(4);
 int64_t V65 = (int64_t)(279);
 int64_t V66 = (int64_t)(399);
 int64_t V67 = V65 * V66;
 int64_t V68 = V64 * V67;
 int64_t V69 = (int64_t)(1);
 int64_t V70 = (int64_t)(30);
 int64_t V71 = V69 << V70;
 bool V72 = V59 <= V71;
 if (!V72) {
  printf("Total allocation for buffer brighter exceeds 2^31 - 1\n");
  return -1;
 }
 int64_t V73 = (int64_t)(brighter_stride_1);
 int64_t V74 = V60 * V73;
 bool V75 = V74 <= V71;
 if (!V75) {
  printf("Total allocation for buffer brighter exceeds 2^31 - 1\n");
  return -1;
 }
 bool V76 = V62 <= V71;
 if (!V76) {
  printf("Product of extents for buffer brighter exceeds 2^31 - 1\n");
  return -1;
 }
 int64_t V77 = (int64_t)(brighter_stride_2);
 int64_t V78 = V61 * V77;
 bool V79 = V78 <= V71;
 if (!V79) {
  printf("Total allocation for buffer brighter exceeds 2^31 - 1\n");
  return -1;
 }
 bool V80 = V63 <= V71;
 if (!V80) {
  printf("Product of extents for buffer brighter exceeds 2^31 - 1\n");
  return -1;
 }
 bool V81 = V66 <= V71;
 if (!V81) {
  printf("Total allocation for buffer i0 exceeds 2^31 - 1\n");
  return -1;
 }
 bool V82 = V67 <= V71;
 if (!V82) {
  printf("Total allocation for buffer i0 exceeds 2^31 - 1\n");
  return -1;
 }
 if (!V82) {
  printf("Product of extents for buffer i0 exceeds 2^31 - 1\n");
  return -1;
 }
 int64_t V83 = (int64_t)(111321);
 int64_t V84 = V64 * V83;
 bool V85 = V84 <= V71;
 if (!V85) {
  printf("Total allocation for buffer i0 exceeds 2^31 - 1\n");
  return -1;
 }
 bool V86 = V68 <= V71;
 if (!V86) {
  printf("Product of extents for buffer i0 exceeds 2^31 - 1\n");
  return -1;
 }
 // produce brighter
 for (int brighter_s0_c = brighter_min_2; brighter_s0_c < brighter_min_2 + brighter_extent_2; brighter_s0_c++)
 {
  for (int brighter_s0_y = brighter_min_1; brighter_s0_y < brighter_min_1 + brighter_extent_1; brighter_s0_y++)
  {
   for (int brighter_s0_x = brighter_min_0; brighter_s0_x < brighter_min_0 + brighter_extent_0; brighter_s0_x++)
   {
    int32_t V87 = brighter_s0_x - brighter_min_0;
    int32_t V88 = brighter_s0_y - brighter_min_1;
    int32_t V89 = V88 * brighter_stride_1;
    int32_t V90 = V87 + V89;
    int32_t V91 = brighter_s0_c - brighter_min_2;
    int32_t V92 = V91 * brighter_stride_2;
    int32_t V93 = V90 + V92;
    int32_t V94 = brighter_s0_y * 399;
    int32_t V95 = brighter_s0_x + V94;
    int32_t V96 = brighter_s0_c * 111321;
    int32_t V97 = V95 + V96;
    uint8_t V98 = i0[V97];
    float V99 = (float)(V98);
    float V100 = V99 * float_from_bits(1069547520 /* 1.5 */);
    float V101 = min(V100, float_from_bits(1132396544 /* 255 */));
    uint8_t V102 = (uint8_t)(V101);
    brighter[V93] = V102;
   } // for brighter_s0_x
  } // for brighter_s0_y
 } // for brighter_s0_c
 // consume brighter
 (void)0;
} // if V25

return 0;
}
