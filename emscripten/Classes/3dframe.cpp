/*	
*********************************************************
Author:Satyabrata Jena
Program Created on Date:March-2007

WHAT IS THIS 3DFRAME PROGRAM ?
-------------------------------
IT IS A PROGRAM IN C / C++ ,
1)FOR CREATING A 3-DIMENSIONAL FRAMES OF REFERENCE 

2)AND FOR CREATING DIFFERENT 3-DIMENISONAL OBJECTS ,
WITH RESPECT TO THAT 3-DIMENSIONAL FRAMES OF REFERENCE ,
BY USING VARIOUS BASIC FUNCTIONS PROVIDED IN THIS PROGRAM 

3)AND FOR PERFORMING VARIOUS TRANSFORMATION OPERATIONS 
( LIKE ROTATION / SCALING OPERATION OF THESE 3-DIMENISONAL OBJECTS,
WITH RESPECT TO THAT 3-DIMENSIONAL FRAMES OF REFERENCE)
BY USING VARIOUS TRANSFORMATION FUNCTIONS PROVIDED IN THIS PROGRAM 

*/

/*
PLEASE NOTE ABOUT THIS 3-DIMENSIONAL FRAMES OF REFERENCE
-----------------------------------------------------------

This program does not contain the main method ,
because this program contains the user defined functions,
that is to be called in other 3d-graphics programs ,
for creating the 3-dimensional frames of reference
and with respect to that 3-dimensional frames of reference,
various 3-dimensional objects can be created ,
by usng the basic functions ,provided in this program.

List of those basic functions  :
-----------------------------------------------------------

1)void DRAW3DFRAME( )
It Creates a 3-dimensioal frames of reference,
that is it creates  (Positive and Negative) X-axis, Y-axis and Z-axis,
and with respect to that, we can create various 3-dimensional objects.
Here X, Y, Z-axis represents length, breadth and height respectively.

2)void putxyz(int X,int Y,int Z,int arr[4],int color)
>It plots a pixel with respect to that 3-dimensional frames of reference ,
at the specified point ,whose coordinates is (X, Y, Z).
>Array arr[4] is used inside the function ‘putxyz’ to plot a Point.
>Color specifies the color of the pixel.

3)void line3d(int x1,int y1,int z1,int x2,int y2,int z2,int arr1[4],int arr2[4],int color)
>It is used to draw a Line with respect to that 3-dimensional frames of reference.
>Here (x1,y1,z1) and (x2,y2,z2) are the Start and End point
of a Line with respect to that 3-dimensional frames of reference.
>Arrays arr1[4] and arr2[4] are used inside the function ‘line3d’ to draw the line.
>Color specifies the color of the Line.

4)void polyhedron(int x,int y,int z,int length_x,int breadth_y,int height_z)
>It is used to create a Polyhedron with respect to that 3-dimensional frames of reference.
>Here (x, y, z) are the coordinates of the Starting point of the polyhedron.
> length_x , specifies the length of the polyhedron along the X-axis.
> breadth_y, specifies the breadth of the polyhedron along the Y-axis.
> height_z , specifies the height of the polyhedron along the Z-axis.

Besides those above functions ,
i have also added some fundamental transformation functions
(like 3D_translation ,3D_rotation or 3D_scaling of a point ),
that will allow us to rotate/scale a 3-dimensional object ,
with respect to that 3-dimensioal frames of reference.

List of those transformation functions :
-----------------------------------------------------------

1)void translate_point(int x,int y,int z,int tx,int ty,int tz)
Translates a point (x, y, z)  with respect to that 3-dimensional frames of reference,
by the translation factor (tx, ty, tz).

2)void rotate_point_X(int x,int y,int z,float angle)
Rotates a point (x,y,z) with respect to that 3-dimensional frames of reference ,
by the given angle and along the X-AXIS.

3)void rotate_point_Y(int x,int y,int z,float angle)
Rotates a point(x,y,z)  with respect to that 3-dimensional frames of reference ,
by the given angle and along the Y-AXIS.

4)void rotate_point_Z(int x,int y,int z,float angle)
Rotates a point(x,y,z)  with respect to that 3-dimensional frames of reference ,
by given angle and along the Z-AXIS.

5)void scale_point(int x,int y,int z,float sx,float sy,float sz)
Scale a point with respect to that 3-dimensional frames of reference ,
by the scaling factors (sx , sy , sz) 
and  with respect to some fixed point.

*/

//SOURCE CODE OF THIS 3-DIMENSIONAL FRAMES OF REFERENCE

#include<graphics.h>
#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
#include<math.h>
#include<dos.h>
#define ROUND(a) ((int) (a+0.5))
/////////////////////////////////////////////////////////////////
void DRAW3DFRAME();
void putxyz(int ,int,int,int arr[],int);
void line3d(int,int,int,int,int,int,int arr1[4],int arr2[4],int);
void polyhedron(int,int,int,int,int,int);
////////////////////////////////////////////////////////////////
void matrixMul(float P[1][4],float T[4][4]) ;
void matrixIdentity(float T[4][4]);
void translate_point(int,int,int,int,int,int);
void rotate_point_X(int ,int ,int ,float );
void rotate_point_Y(int ,int ,int ,float );
void rotate_point_Z(int ,int ,int ,float );
void scale_point(int,int,int,float,float,float);
//////////////////////////////////////////////////////////////
int color=0;
int frame_length=1000;//DEFAULT FRAME LENGTH
int arryX[500];
int arryY[500];
int arry_nX[500];
int arry_nY[500];
int arrx_nX[500];
int arrx_nY[500];
int arrxX[500];
int arrxY[500];

int COUNTERY;
int COUNTERX;

int STORE_YLINE_X[200];
int STORE_YLINE_Y[200];
int STORE_XLINE_X[200];
int STORE_XLINE_Y[200];
//////////////////////////////////////////////////////////////////
/*  Matrix P stores the original coodinates of a point,Matrix P1
    stores the new coorinates of a point after transformation */
float P[1][4],P1[1][4];

int pivot_x=0,pivot_y=0,pivot_z=0;
/////////////////////////////////////////////////////////////////////

void DRAW3DFRAME ()
{
      cleardevice();
      setcolor(YELLOW);
      outtextxy(15,470,"+Y:AXIS");
      outtextxy(580,470,"+X:AXIS");
      outtextxy(580,15,"-Y:AXIS");
      outtextxy(15,15,"-X:AXIS");
      outtextxy(320,15,"+Z:AXIS");
      outtextxy(320,470,"-Z:AXIS");

      int Length,i;
      float dx,dy,x,y;
      dx=dy=x=y=0;
      int x_start=319, y_start=239, x_end=0,y_end =479;

      ///////////////////////////////////////////////    POSITIVE Y-AXIS
      //Approximate the length of the line
      if(abs(x_end-x_start)>abs(y_end-y_start))
		 Length=abs(x_end-x_start);
      else
		 Length=abs(y_end-y_start);

      //Select the larger of dx or dy to be one raster unit
      dx=(x_end-x_start)/(float) Length;
      dy=(y_end-y_start)/(float) Length;

      x=x_start;
      y=y_start;
      i=0;
      int count2=0;
      while(i<=Length)
      {
	     x=x+dx;
	     y=y+dy;

	     float a=x;
	     float b=y;

	     arryX[i]=a;
	     arryY[i]=b;

	     i=i+1;
	     count2=count2+1;
	     if(count2==350)
		   break;

      }

      count2=240;
      for( i=0;i<count2;i++)
	    putpixel(arryX[i],arryY[i],DARKGRAY);

      //////////////////////////////   POSITIVE X-AXIS
      x_start=319, y_start=239, x_end=639,y_end =479;

      //Approximate the length of the line
      if(abs(x_end-x_start)>abs(y_end-y_start))
		 Length=abs(x_end-x_start);
      else
		 Length=abs(y_end-y_start);

      //Select the larger of dx or dy to be one raster unit
      dx=(x_end-x_start)/(float) Length;
      dy=(y_end-y_start)/(float) Length;

      x=x_start;
      y=y_start;
      i=0;
      int count1=0;
      while(i<=Length)
      {
	     x=x+dx;
	     y=y+dy;

	     float a=x;
	     float b=y;
	     arrxX[i]=a;
	     arrxY[i]=b;

	     i=i+1;
	     count1=count1+1;
	     if(count1==350)
		   break;

      }
      count1=240;
      for(i=0;i<count1;i++)
	  putpixel(arrxX[i],arrxY[i],DARKGRAY);

       /////////////////////////////////// NEGATIVE X-AXIS
       x_start=319, y_start=239, x_end=0,y_end =0;

      //Approximate the length of the line
      if(abs(x_end-x_start)>abs(y_end-y_start))
		 Length=abs(x_end-x_start);
      else
		 Length=abs(y_end-y_start);


      //Select the larger of dx or dy to be one raster unit
      dx=(x_end-x_start)/(float) Length;
      dy=(y_end-y_start)/(float) Length;

      x=x_start;
      y=y_start;
      i=0;
      int count5=0;
      while(i<=Length)
      {
	     x=x+dx;
	     y=y+dy;

	     float a=x;
	     float b=y;
	     arrx_nX[i]=a;
	     arrx_nY[i]=b;

	     i=i+1;
	     count5=count5+1;
	     if(count5==350)
		   break;

      }
      count5=240;
      for(i=0;i<count5;i++)
	  putpixel(arrx_nX[i],arrx_nY[i],DARKGRAY);

      ////////////////////////////////////////////////    NEGATIVE Y-AXIS
      dx=dy=x=y=0;
      x_start=319, y_start=239, x_end=639,y_end =0;

      //Approximate the length of the line
      if(abs(x_end-x_start)>abs(y_end-y_start))
		 Length=abs(x_end-x_start);
      else
		 Length=abs(y_end-y_start);


      //Select the larger of dx or dy to be one raster unit
      dx=(x_end-x_start)/(float) Length;
      dy=(y_end-y_start)/(float) Length;

      x=x_start;
      y=y_start;
      i=0;
      int count4=0;
      while(i<=Length)
      {
	     x=x+dx;
	     y=y+dy;
	     int a=x;
	     int b=y;
	     arry_nX[i]=a;
	     arry_nY[i]=b;

	     i=i+1;
	     count4=count4+1;
	     if(count4==350)
		   break;

      }
       count4=240;
       for(i=0;i<count4;i++)
	  putpixel(arry_nX[i],arry_nY[i],DARKGRAY);

      ////////////////////////////////////////////////    POSITIVE Z-AXIS

      dx=dy=x=y=0;
      x_start=320, y_start=240, x_end=320,y_end =0;

      //Approximate the length of the line
      if(abs(x_end-x_start)>abs(y_end-y_start))
		 Length=abs(x_end-x_start);
      else
		 Length=abs(y_end-y_start);

      //Select the larger of dx or dy to be one raster unit
      dx=(x_end-x_start)/(float) Length;
      dy=(y_end-y_start)/(float) Length;

      x=x_start;
      y=y_start;
      i=0;
      int count3=0;
      int arrzX[500];
      int arrzY[500];
      while(i<=Length)
      {
	     x=x+dx;
	     y=y+dy;

	     int a=x;
	     int b=y;
	     arrzX[i]=a;
	     arrzY[i]=b;

	     i=i+1;
	     count3=count3+1;
	     if(count3==350)
		   break;

      }
      count3=240;
      for(i=0;i<count3;i++)
	 putpixel(arrzX[i],arrzY[i],DARKGRAY);


}

void putxyz(int X,int Y,int Z,int arr[],int color)
{


      Y=(int)Y/(int)(frame_length/100);
      X=(int)X/(int)(frame_length/100);
      Z=(int)Z/(int)(frame_length/100);
      int X1,Y1;
      int tempx,tempy;
      COUNTERX=COUNTERY=0;
      ///////////////////////////////////////////////////////(+x+y)
      if((X>=0)&&(Y>=0))
      {
	   for( int i=0;i<=350;i++)
	   {
		   if(i==Y )
		      break;
		   COUNTERY=COUNTERY+1;

	   }

	   for(  i=0;i<=350;i++)
	   {

		 if(i==X )
		    break;

		 COUNTERX=COUNTERX+1;
	   }

	  int diffXY=abs(arrxX[COUNTERX]-arryX[COUNTERX]);
	  int diffYX=abs(arrxX[COUNTERY]-arryX[COUNTERY]);

	  int big;
	  if((Y-X)  >0)
	      big=Y;
	  else
	      big=X;


	  for( i=0;i<=big;i++)
	  {
		  int Xx,Yx;
		  Xx=arryX[COUNTERX]+diffXY;     //from X axis
		  Yx=arryY[COUNTERX];

		  STORE_XLINE_X[i]=Xx;
		  STORE_XLINE_Y[i]=Yx;
		  COUNTERX=COUNTERX+1;

		  int Xy,Yy;                     //fromr Y axis
		  Xy=arrxX[COUNTERY]-diffYX;
		  Yy=arrxY[COUNTERY];
		  STORE_YLINE_X[i]=Xy;
		  STORE_YLINE_Y[i]=Yy ;

		  COUNTERY=COUNTERY+1;

	  }

	  if((big-Y)  ==0)
	     moveto(STORE_XLINE_X[i-1],STORE_XLINE_Y[i-1]);
	  else
	     moveto(STORE_YLINE_X[i-1],STORE_YLINE_Y[i-1]);

	  X1=getx();
	  Y1=gety();
	  arr[2]=X1;
	  arr[3]=Y1;
	  ////////////////// //ADDING Z TRANSFORMATION
	  int znew=Z;
	  moverel(0,-(znew));
	  X1=getx();
	  Y1=gety();
	  arr[0]=X1;
	  arr[1]=Y1;
	  putpixel(X1,Y1,color);
	  return;
      }


      ///////////////////////////////////////////////////////////(-x-y)
      if(X<0&&Y<0)
      {

	  for( int i=0;i<=350;i++)
	  {
	     if(i==abs(Y) )
		break;
	     COUNTERY=COUNTERY+1;

	  }

	  for(  i=0;i<=350;i++)
	  {
		 if(i==abs(X) )
		    break;

		 COUNTERX=COUNTERX+1;
	  }

	  int diffXY=abs(arrx_nX[COUNTERX]-arry_nX[COUNTERX]);
	  int diffYX=abs(arrx_nX[COUNTERY]-arry_nX[COUNTERY]);
	  int big;
	  if((abs(Y)-abs(X))  >0)
	   big=abs(Y);
	  else
	   big=abs(X);

	  for( i=0;i<=big;i++)
	  {
	       int Xx,Yx;
	       Xx=arry_nX[COUNTERX]-diffXY;     //from X axis
	       Yx=arry_nY[COUNTERX];

	       STORE_XLINE_X[i]=Xx;
	       STORE_XLINE_Y[i]=Yx;
	       COUNTERX=COUNTERX+1;
	       int Xy,Yy;                        //fromr Y axis
	       Xy=arrx_nX[COUNTERY]+diffYX;
	       Yy=arrx_nY[COUNTERY];
	       STORE_YLINE_X[i]=Xy;
	       STORE_YLINE_Y[i]=Yy ;

	       COUNTERY=COUNTERY+1;
	  }

	  if((big-abs(Y))  ==0)
	       moveto(STORE_XLINE_X[i-1],STORE_XLINE_Y[i-1]);
	  else
	       moveto(STORE_YLINE_X[i-1],STORE_YLINE_Y[i-1]);

	  X1=getx();
	  Y1=gety();
	  arr[2]=X1;
	  arr[3]=Y1;

	  ////////////////// //ADDING Z TRANSFORMATION
	  int znew=Z;
	  moverel(0,-(znew));
	  X1=getx();
	  Y1=gety();
	  arr[0]=X1;
	  arr[1]=Y1;
	  putpixel(X1,Y1,color);
	  return;

      }

      //////////////////////////////////////// (-x+y)
      if((X<0)&&(Y>=0))
      {
	   for( int i=0;i<=350;i++)
	   {
		   if(i==Y )
		      break;
		   COUNTERY=COUNTERY+1;

	   }

	   for(  i=0;i<=350;i++)
	   {
		 if(i==abs(X) )
		    break;

		 COUNTERX=COUNTERX+1;
	   }

	  int diffXY=abs(arrx_nY[COUNTERX]-arryY[COUNTERX]);
	  int diffYX=abs(arrx_nY[COUNTERY]-arryY[COUNTERY]);

	  int big;
	  if((Y-abs(X))  >=0)
	     big=Y;
	  else
	     big=abs(X);


	  for( i=0;i<=big;i++)
	  {
	    int Xx,Yx;
	    Xx=arryX[COUNTERX];     //from X axis
	    Yx=arryY[COUNTERX]-diffXY;
	    STORE_XLINE_X[i]=Xx;
	    STORE_XLINE_Y[i]=Yx;
	    COUNTERX=COUNTERX+1;

	    int Xy,Yy;                        //fromr Y axis
	    Xy=arrx_nX[COUNTERY];
	    Yy=arrx_nY[COUNTERY]+diffYX;

	    STORE_YLINE_X[i]=Xy;
	    STORE_YLINE_Y[i]=Yy ;

	    COUNTERY=COUNTERY+1;

	  }

	  if(abs(Y)>abs(X))
	     moveto(STORE_XLINE_X[i-1],STORE_XLINE_Y[i-1]);
	  else
	     moveto(STORE_YLINE_X[i-1],STORE_YLINE_Y[i-1]);


	   X1=getx();
	   Y1=gety();
	   arr[2]=X1;
	   arr[3]=Y1;
	   ////////////////// //ADDING Z TRANSFORMATION
	   int znew=Z;
	   moverel(0,-(znew));
	   X1=getx();
	   Y1=gety();
	   arr[0]=X1;
	   arr[1]=Y1;
	   putpixel(X1,Y1,color);

	   return;

      }

      //////////////////////////////////////////////////(+x-y)
      if((X>=0)&&(Y<0))
      {
	  for( int i=0;i<=350;i++)
	  {
	    if(i==abs(Y) )
		break;
	    COUNTERY=COUNTERY+1;

	  }

	  for(  i=0;i<=350;i++)
	  {

	    if(i==X )
	       break;
	    COUNTERX=COUNTERX+1;
	   }

	  int diffXY=abs(arrx_nY[COUNTERX]-arryY[COUNTERX]);
	  int diffYX=abs(arrx_nY[COUNTERY]-arryY[COUNTERY]);

	  int big;
	  if((abs(Y)-X)  >=0)
	      big=abs(Y);
	  else
	      big=X;


	  for( i=0;i<=big;i++)
	  {
	     int Xx,Yx;
	     Xx=arry_nX[COUNTERX];     //from X axis
	     Yx=arry_nY[COUNTERX]+diffXY;


	     STORE_XLINE_X[i]=Xx;
	     STORE_XLINE_Y[i]=Yx;
	     COUNTERX=COUNTERX+1;

	     int Xy,Yy;                        //fromr Y axis
	     Xy=arrxX[COUNTERY];
	     Yy=arrxY[COUNTERY]-diffYX;

	     STORE_YLINE_X[i]=Xy;
	     STORE_YLINE_Y[i]=Yy ;

	     COUNTERY=COUNTERY+1;
	  }

	  if(abs(Y)>abs(X))
	      moveto(STORE_XLINE_X[i-1],STORE_XLINE_Y[i-1]);
	  else
	      moveto(STORE_YLINE_X[i-1],STORE_YLINE_Y[i-1]);

	     X1=getx();
	     Y1=gety();
	     arr[2]=X1;
	     arr[3]=Y1;

	  ////////////////// //ADDING Z TRANSFORMATION
	     int znew=Z;
	     moverel(0,-(znew));
	     X1=getx();
	     Y1=gety();
	     arr[0]=X1;
	     arr[1]=Y1;
	     putpixel(X1,Y1,color);
	     return;

      }

}

void line3d
(int x1,int y1,int z1,int x2,int y2,int z2,int arr1[4],int arr2[4],int color)
{

	putxyz(x1,y1,z1,arr1,color);
	putxyz(x2,y2,z2,arr2,color);
	setcolor(color);
	line(arr1[0],arr1[1],arr2[0],arr2[1]);

}

void polyhedron(int x1,int y1,int z1,int l_x,int b_y,int h_z)
{

    int arr1[4],arr2[4],arr3[4],arr4[4];

    if(x1>=0&&y1>=0)
    {
       line3d(x1,y1,z1,x1,y1+b_y,z1,arr1,arr2,RED);
       line3d(x1,y1,z1+h_z,x1,y1+b_y,z1+h_z,arr3,arr4,BLUE);
       setcolor(YELLOW);
       line(arr1[0],arr1[1],arr3[0],arr3[1]);

       line(arr2[0],arr2[1],arr4[0],arr4[1]);
       /////////////////////////////////////////////////////////////////
       line3d(x1+l_x,y1,z1,x1+l_x,y1+b_y,z1,arr1,arr2,BROWN);
       line3d(x1+l_x,y1,z1+h_z,x1+l_x,y1+b_y,z1+h_z,arr3,arr4,MAGENTA);
       setcolor(CYAN);
       line(arr1[0],arr1[1],arr3[0],arr3[1]);
       line(arr2[0],arr2[1],arr4[0],arr4[1]);
       //////////////////////////////////////////////////////////////////
       line3d(x1,y1,z1,x1+l_x,y1,z1,arr1,arr2,LIGHTGREEN);
       line3d(x1,y1,z1+h_z,x1+l_x,y1,z1+h_z,arr1,arr2,WHITE);
       //////////////////////////////////////////////////////////////////
       line3d(x1,y1+b_y,z1,x1+l_x,y1+b_y,z1,arr1,arr2,LIGHTBLUE);
       line3d(x1,y1+b_y,z1+h_z,x1+l_x,y1+b_y,z1+h_z,arr1,arr2,LIGHTRED);
       return;
    }

    if(x1<0&&y1<0)
    {
       line3d(x1,y1,z1,x1,y1-b_y,z1,arr1,arr2,RED);
       line3d(x1,y1,z1+h_z,x1,y1-b_y,z1+h_z,arr3,arr4,BLUE);
       setcolor(YELLOW);
       line(arr1[0],arr1[1],arr3[0],arr3[1]);
       line(arr2[0],arr2[1],arr4[0],arr4[1]);
       /////////////////////////////////////////////////////////////////
       line3d(x1-l_x,y1,z1,x1-l_x,y1-b_y,z1,arr1,arr2,BROWN);
       line3d(x1-l_x,y1,z1+h_z,x1-l_x,y1-b_y,z1+h_z,arr3,arr4,MAGENTA);
       setcolor(CYAN);
       line(arr1[0],arr1[1],arr3[0],arr3[1]);
       line(arr2[0],arr2[1],arr4[0],arr4[1]);
       //////////////////////////////////////////////////////////////////
       line3d(x1,y1,z1,x1-l_x,y1,z1,arr1,arr2,LIGHTGREEN);
       line3d(x1,y1,z1+h_z,x1-l_x,y1,z1+h_z,arr1,arr2,WHITE);
       //////////////////////////////////////////////////////////////////
       line3d(x1,y1-b_y,z1,x1-l_x,y1-b_y,z1,arr1,arr2,LIGHTBLUE);
       line3d(x1,y1-b_y,z1+h_z,x1-l_x,y1-b_y,z1+h_z,arr1,arr2,LIGHTRED);
       return;
    }

    if(x1<0&&y1>=0)
    {
       line3d(x1,y1,z1,x1,y1+b_y,z1,arr1,arr2,RED);
       line3d(x1,y1,z1+h_z,x1,y1+b_y,z1+h_z,arr3,arr4,BLUE);
       setcolor(YELLOW);
       line(arr1[0],arr1[1],arr3[0],arr3[1]);
       line(arr2[0],arr2[1],arr4[0],arr4[1]);
       /////////////////////////////////////////////////////////////////
       line3d(x1-l_x,y1,z1,x1-l_x,y1+b_y,z1,arr1,arr2,BROWN);
       line3d(x1-l_x,y1,z1+h_z,x1-l_x,y1+b_y,z1+h_z,arr3,arr4,MAGENTA);
       setcolor(CYAN);
       line(arr1[0],arr1[1],arr3[0],arr3[1]);
       line(arr2[0],arr2[1],arr4[0],arr4[1]);
       //////////////////////////////////////////////////////////////////
       line3d(x1,y1,z1,x1-l_x,y1,z1,arr1,arr2,LIGHTGREEN);
       line3d(x1,y1,z1+h_z,x1-l_x,y1,z1+h_z,arr1,arr2,WHITE);
       //////////////////////////////////////////////////////////////////
       line3d(x1,y1+b_y,z1,x1-l_x,y1+b_y,z1,arr1,arr2,LIGHTBLUE);
       line3d(x1,y1+b_y,z1+h_z,x1-l_x,y1+b_y,z1+h_z,arr1,arr2,LIGHTRED);
       return;
    }

    if(x1>=0&&y1<0)
    {
       line3d(x1,y1,z1,x1,y1-b_y,z1,arr1,arr2,RED);
       line3d(x1,y1,z1+h_z,x1,y1-b_y,z1+h_z,arr3,arr4,BLUE);
       setcolor(YELLOW);
       line(arr1[0],arr1[1],arr3[0],arr3[1]);
       line(arr2[0],arr2[1],arr4[0],arr4[1]);
       /////////////////////////////////////////////////////////////////
       line3d(x1+l_x,y1,z1,x1+l_x,y1-b_y,z1,arr1,arr2,BROWN);
       line3d(x1+l_x,y1,z1+h_z,x1+l_x,y1-b_y,z1+h_z,arr3,arr4,MAGENTA);
       setcolor(CYAN);
       line(arr1[0],arr1[1],arr3[0],arr3[1]);
       line(arr2[0],arr2[1],arr4[0],arr4[1]);
       //////////////////////////////////////////////////////////////////
       line3d(x1,y1,z1,x1+l_x,y1,z1,arr1,arr2,LIGHTGREEN);
       line3d(x1,y1,z1+h_z,x1+l_x,y1,z1+h_z,arr1,arr2,WHITE);
       //////////////////////////////////////////////////////////////////
       line3d(x1,y1-b_y,z1,x1+l_x,y1-b_y,z1,arr1,arr2,LIGHTBLUE);
       line3d(x1,y1-b_y,z1+h_z,x1+l_x,y1-b_y,z1+h_z,arr1,arr2,LIGHTRED);
       return;
    }

}

void matrixMul(float P[1][4],float T[4][4])
{

     int i,j,k;

     //Initialize Matrix P1 with Zero
     for(i=0;i<4;i++)
	     P1[0][i]=0;

     //Mutiply T with P and store the result in P1
     for(k=0;k<1;k++)
       for(i=0;i<4;i++)
	   for(j=0;j<4;j++)
		P1[k][i]+=P[k][j]*T[j][i];

}

void matrixIdentity(float T[4][4])
{

     int i,j;

    /*  Make matrix T as Identity Matrix by
	Storing 1 in the left diagonal positions of Matrix T
	and store 0 in other positions  */

     for(i=0;i<4;i++)
     {
	 for(j=0;j<4;j++)
	 {
		 if(i==j)
		   T[i][j]=1;
		 else
		   T[i][j]=0;

	  }

     }


}


void translate_point(int x,int y,int z,int tx,int ty,int tz)
//Translate a point by translation factors tx,ty,tz
{

     float T[4][4];
     matrixIdentity(T);
     T[3][0]=tx;
     T[3][1]=ty;
     T[3][2]=tz;

     P[0][0]=x;
     P[0][1]=y;
     P[0][2]=z;
     P[0][3]=1;

     matrixMul(P,T);
}



void rotate_point_X(int x,int y,int z,float angle)
// Rotate a point by given angle and
 //  along the X-AXIS
{

     float R[4][4];
     float radian;

     radian=(3.141/180)*angle;
     matrixIdentity(R);

     R[1][1]=cos(radian);
     R[2][1]=-1*sin(radian);
     R[1][2]=sin(radian);
     R[2][2]=cos(radian);

     P[0][0]=x;
     P[0][1]=y;
     P[0][2]=z;
     P[0][3]=1;
     matrixMul(P,R);

}

void rotate_point_Y(int x,int y,int z,float angle)
// Rotate a point by given angle and
 //  along the Y-AXIS

{


     float R[4][4];
     float radian;

     radian=(3.141/180)*angle;
     matrixIdentity(R);
     R[0][0]=cos(radian);
     R[2][0]=sin(radian);
     R[0][2]=-1*sin(radian);
     R[2][2]=cos(radian);

     P[0][0]=x;
     P[0][1]=y;
     P[0][2]=z;
     P[0][3]=1;
     matrixMul(P,R);

}

void rotate_point_Z(int x,int y,int z,float angle)
// Rotate a point by given angle and
 //  along the Z-AXIS
{

     float R[4][4];
     float radian;

     radian=(3.141/180)*angle;
     matrixIdentity(R);
     R[0][0]=cos(radian);
     R[1][0]=-1*sin(radian);
     R[0][1]=sin(radian);
     R[1][1]=cos(radian);

     P[0][0]=x;
     P[0][1]=y;
     P[0][2]=z;
     P[0][3]=1;
     matrixMul(P,R);

}

void scale_point(int x,int y,int z,float sx,float sy,float sz)
/* Scale a point by scaling factors sx,sy ,sz and
   with respect to some fixed point  */
{

      float S[4][4];
      matrixIdentity(S);
      pivot_x=x,pivot_y=y,pivot_z=z;
      S[0][0]=sx;
      S[3][0]=(1-sx)*pivot_x;
      S[1][1]=sy;
      S[3][1]=(1-sy)*pivot_y;
      S[2][2]=sz;
      S[3][2]=(1-sz)*pivot_z;

      P[0][0]=x;
      P[0][1]=y;
      P[0][2]=z;
      P[0][3]=1;
      matrixMul(P,S);

}

