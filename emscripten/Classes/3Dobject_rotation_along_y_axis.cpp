/* 
*********************************************************
Author:Satyabrata Jena
Program Created on Date:March-2007
*********************************************************

PROGRAM IN C++ TO ILLUSTRATE THE IMPLEMENTATION OF
ROTATION TRANSFORMATION OF A 3-DIMENSIONAL OBJECT ALONG Y-AXIS

*/
//************************************************************************

#include"3dframe.CPP"
#include<iostream.h>
void rotate_polyhedron(int,int,int,int,int,int ,float);

void main()
{
    int gd=DETECT,gm;
    initgraph(&gd,&gm,"c:\\tc\\bgi");
    cout<<"\nEnter Your 3D-Frame Length:\n";
    cout<<"\nANY VALUE  BETWEEN 1000 - 30000:";
    cin>>frame_length;
    int x_start=0,y_start=0,z_start=0,l_x,b_y,h_z;
    cout<<"\nFor this frame:";
    cout<<"\nMaximum range of Length  = 0  TO \t"<<frame_length;
    cout<<"\nMaximum range of Breadth = 0  TO \t"<<frame_length;
    cout<<"\nMaximum range of Height  = 0  TO \t"<<frame_length;
    cout<<"\nEnter length,breadth,height of polyhedron:\n";
    cin>>l_x>>b_y>>h_z;

    DRAW3DFRAME();
    //CREATE THE POLYHEDRON
    polyhedron(x_start,y_start,z_start,l_x,b_y,h_z);
    getch();
    cleardevice();
    float angle;
    cout<<"\nYou can Rotate the polyhedron along Y-AXIS";
    cout<<"\nMAXIMUM RANGE OF ANGLE FOR ROTATION IS:\n";
    cout<<"FROM  (+0 OR -0)  TO (+360 OR -360)";
    cout<<"\nEnter the value of angle of rotation in degree:\n";
    cin>>angle;
    DRAW3DFRAME();
    rotate_polyhedron(x_start,y_start,z_start,l_x,b_y,h_z,angle);
    getch();
    closegraph();
}


void rotate_polyhedron
(int x,int y,int z,int l_x,int b_y,int h_z,float angle)
{
     int arr1[4],arr2[4],arr3[4],arr4[4];
     int X1,Y1,Z1,X2,Y2,Z2;
     int x1,y1,z1,x2,y2,z2;
     DRAW3DFRAME();
     outtextxy(25,40,"Before rotation");
     polyhedron(x,y,z,l_x,b_y,h_z);
     getch();
     cleardevice();
     DRAW3DFRAME();
     outtextxy(25,40,"After rotation");
     ///////////////////////////////////////////////////////////////////
     x1=x,y1=y,z1=z;
     x2=x1,y2=y1+b_y,z1=z;
     rotate_point_Y(x1,y1,z1,angle);
     X1=P1[0][0];
     Y1=P1[0][1];
     Z1=P1[0][2];
     rotate_point_Y(x2,y2,z2,angle);
     X2=P1[0][0];
     Y2=P1[0][1];
     Z2=P1[0][2];
     line3d(X1,Y1,Z1,X2,Y2,Z2,arr1,arr2,RED);
     //////////////////////////////////////////////////////////////////////
     x1=x,y1=y,z1=z+h_z;
     x2=x,y2=y+b_y,z2=z+h_z;
     rotate_point_Y(x1,y1,z1,angle);
     X1=P1[0][0];
     Y1=P1[0][1];
     Z1=P1[0][2];
     rotate_point_Y(x2,y2,z2,angle);
     X2=P1[0][0];
     Y2=P1[0][1];
     Z2=P1[0][2];
     line3d(X1,Y1,Z1,X2,Y2,Z2,arr3,arr4,BLUE);
     /////////////////////////////////////////////////////////////////////
     setcolor(YELLOW);
     line(arr1[0],arr1[1],arr3[0],arr3[1]);
     line(arr2[0],arr2[1],arr4[0],arr4[1]);
     //*******************************************************************
     //*******************************************************************
     x1=x+l_x;y1=y,z1=z;
     x2=x+l_x,y2=y+b_y,z2=z;
     rotate_point_Y(x1,y1,z1,angle);
     X1=P1[0][0];
     Y1=P1[0][1];
     Z1=P1[0][2];
     rotate_point_Y(x2,y2,z2,angle);
     X2=P1[0][0];
     Y2=P1[0][1];
     Z2=P1[0][2];
     line3d(X1,Y1,Z1,X2,Y2,Z2,arr1,arr2,BROWN);
     ////////////////////////////////////////////////////////////////////
     x1=x+l_x,y1=y,z1=z+h_z;
     x2=x+l_x,y2=y+b_y,z2=z+h_z;
     rotate_point_Y(x1,y1,z1,angle);
     X1=P1[0][0];
     Y1=P1[0][1];
     Z1=P1[0][2];
     rotate_point_Y(x2,y2,z2,angle);
     X2=P1[0][0];
     Y2=P1[0][1];
     Z2=P1[0][2];
     line3d(X1,Y1,Z1,X2,Y2,Z2,arr3,arr4,MAGENTA);
     ///////////////////////////////////////////////////////////////////
     setcolor(CYAN);
     line(arr1[0],arr1[1],arr3[0],arr3[1]);
     line(arr2[0],arr2[1],arr4[0],arr4[1]);
     //****************************************************************
     //****************************************************************
     x1=x,y1=y,z1=z;
     x2=x+l_x,y2=y1,z2=z;
     rotate_point_Y(x1,y1,z1,angle);
     X1=P1[0][0];
     Y1=P1[0][1];
     Z1=P1[0][2];
     rotate_point_Y(x2,y2,z2,angle);
     X2=P1[0][0];
     Y2=P1[0][1];
     Z2=P1[0][2];
     line3d(X1,Y1,Z1,X2,Y2,Z2,arr1,arr2,LIGHTGREEN);
     /////////////////////////////////////////////////////////////////////
     x1=x,y1=y,z1=z+h_z;
     x2=x+l_x,y2=y,z2=z2+h_z;
     rotate_point_Y(x1,y1,z1,angle);
     X1=P1[0][0];
     Y1=P1[0][1];
     Z1=P1[0][2];
     rotate_point_Y(x2,y2,z2,angle);
     X2=P1[0][0];
     Y2=P1[0][1];
     Z2=P1[0][2];
     line3d(X1,Y1,Z1,X2,Y2,Z2,arr1,arr2,WHITE);
     //*******************************************************************
     //*******************************************************************
     x1=x,y1=y+b_y,z1=z;
     x2=x+l_x,y2=y+b_y,z2=z;
     rotate_point_Y(x1,y1,z1,angle);
     X1=P1[0][0];
     Y1=P1[0][1];
     Z1=P1[0][2];
     rotate_point_Y(x2,y2,z2,angle);
     X2=P1[0][0];
     Y2=P1[0][1];
     Z2=P1[0][2];
     line3d(X1,Y1,Z1,X2,Y2,Z2,arr1,arr2,LIGHTBLUE);
     ///////////////////////////////////////////////////////////////////
     x1=x,y1=y+b_y,z1=z+h_z;
     x2=x+l_x,y2=y+b_y,z2=z+h_z;
     rotate_point_Y(x1,y1,z1,angle);
     X1=P1[0][0];
     Y1=P1[0][1];
     Z1=P1[0][2];
     rotate_point_Y(x2,y2,z2,angle);
     X2=P1[0][0];
     Y2=P1[0][1];
     Z2=P1[0][2];
     line3d(X1,Y1,Z1,X2,Y2,Z2,arr3,arr4,LIGHTRED);
     //******************************************************************
     //******************************************************************
}



