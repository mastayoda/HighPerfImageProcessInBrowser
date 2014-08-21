/*
   Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.

   Permission is hereby granted, free of charge, to any person obtaining a
   copy of this software and associated documentation files (the "Software"),
   to deal in the Software without restriction, including without limitation
   the rights to use, copy, modify, merge, publish, distribute, sublicense,
   and/or sell copies of the Software, and to permit persons to whom the
   Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
   DEALINGS IN THE SOFTWARE.
*/

#include <iostream>
#include <sstream>
#include <stdio.h>
#include <sys/stat.h>
#include "includes/static_image.h"
#include "includes/image_io.h"


bool fileExists(const char* filename);
bool openCFileExists(const char* filename);
const char * convertToJson(void * ptr, buffer_t * t, int type, char * imagePath);


extern "C" const char * loadImage(char * imagePath, int type);
extern "C" int destroyImage(void * ptr, std::string * str,  int type);

Image<uint8_t> * loadImage_8(char * imagePath);
Image<uint16_t> * loadImage_16(char * imagePath);
Image<uint32_t> * loadImage_32(char * imagePath);

const int ERROR = 0;
const int SUCCESS = 1;

/*
int main() {

	std::ostringstream json;

	char* filename ="rgb.png";


	Image<uint8_t> * input = loadImage_8(filename);


	std::cout<<"The dimensions of the picture is: "<<input->dimensions()<<std::endl;
	std::cout<<"The height of the picture is: "<<input->height()<<std::endl;
	std::cout<<"The width of the picture is: "<<input->width()<<std::endl;
	std::cout<<"The size of the buffer is: "<<input->stride(3)<<std::endl;


	for (int i = 0; i < 100; ++i) {

		printf("%d, ", (unsigned)input->getBuffer_t()->host[i]);
	}

	std::cout<<"\n";
	printf(loadImage(filename, 8));

	printf("The result of destruction is: %d\n", destroyImage((void*)input,(std::string *)0, 8));

	return 0;
}
*/



const char * convertToJson(void * ptr, buffer_t * t, int type, char * imagePath)
{
	std::ostringstream json;
	std::string * str;
	str = new std::string;

	json<<"{"<<std::endl;
			json<<"\"internals\":"<<std::endl;
			json<<"{"<<std::endl;
				/* Building buffer_t */
				json<<"\"buffer_t\":"<<std::endl;
				json<<"{"<<std::endl;
					json<<"\"dev\":"<<t->dev<<","<<std::endl;
					json<<"\"host\":"<<"\""<<(int *)(t->host)<<"\""<<","<<std::endl;
					json<<"\"extent\":"<<"["<<t->extent[0]<<", "<<t->extent[1]<<", "<<t->extent[2]<<", "<<t->extent[3]<<"],"<<std::endl;
					json<<"\"stride\":"<<"["<<t->stride[0]<<", "<<t->stride[1]<<", "<<t->stride[2]<<", "<<t->stride[3]<<"],"<<std::endl;
					json<<"\"min\":"<<"["<<t->min[0]<<", "<<t->min[1]<<", "<<t->min[2]<<", "<<t->min[3]<<"],"<<std::endl;
					json<<"\"elem_size\":"<<t->elem_size<<","<<std::endl;
					json<<"\"host_dirty\":"<<((t->host_dirty)?"true":"false")<<","<<std::endl;
					json<<"\"dev_dirty\":"<<((t->dev_dirty)?"true":"false")<<std::endl;
				json<<"},"<<std::endl;
				/* json string pointer */
				json<<"\"jsonStrPtr\":"<<"\""<<(int *)str<<"\""<<","<<std::endl;
				/* image object pointer */
				json<<"\"imagePtr\":"<<"\""<<(int *)ptr<<"\""<<","<<std::endl;
				/* buffer_t struct pointer */
				json<<"\"buffer_tPtr\":"<<"\""<<(int *)t<<"\""<<","<<std::endl;
				/* image object size type */
				json<<"\"imageType\":"<<"\"uint"<< type<<"_t\""<<","<<std::endl;
				/* image object size type */
				json<<"\"imagePath\":"<<"\""<<imagePath<<"\""<<","<<std::endl;
				/* host buffer size */
				json<<"\"hostBufferSize\":"<<t->stride[3]<<std::endl;
			json<<"},"<<std::endl;
			json<<"\"height\":"<<t->extent[1]<<","<<std::endl;
			json<<"\"width\":"<<t->extent[0]<<","<<std::endl;
			json<<"\"dimensions\":"<<t->extent[2]<<","<<std::endl;
			json<<"\"data\":"<<"null"<<std::endl;
	json<<"}"<<std::endl;

	*str = json.str();

	//printf("value is %d",(unsigned)((uint8_t*)intptr)[0]);

	return str->c_str();
}

Image<uint8_t> * loadImage_8(char * imagePath)
{
	Image<uint8_t> * img;

	if(!fileExists(imagePath))
	{
		printf("File not found!\n");
		return (Image<uint8_t> *)ERROR;
	}

	img = load<uint8_t>(imagePath);

	if(img)
		return img;
	else
		return (Image<uint8_t> *)ERROR;
}

Image<uint16_t> * loadImage_16(char * imagePath)
{
	Image<uint16_t> * img;

	if(!fileExists(imagePath))
	{
		printf("File not found!\n");
		return (Image<uint16_t> *)ERROR;
	}

	img = load<uint16_t>(imagePath);

	if(img)
		return img;
	else
		return (Image<uint16_t> *)ERROR;
}

Image<uint32_t> * loadImage_32(char * imagePath)
{
	Image<uint32_t> * img;

	if(!fileExists(imagePath))
	{
		printf("File not found!\n");
		return (Image<uint32_t> *)ERROR;
	}

	img = load<uint32_t>(imagePath);

	if(img)
		return img;
	else
		return (Image<uint32_t> *)ERROR;
}

bool fileExists(const char* filename)
{
  struct stat info;
  int ret = -1;

  //get the file attributes
  ret = stat(filename, &info);
  if(ret == 0)
    {
    //stat() is able to get the file attributes,
    //so the file obviously exists
    return true;
    }
  else
    {
    //stat() is not able to get the file attributes,
    //so the file obviously does not exist or
    //more capabilities is required
    return false;
    }
}

bool openCFileExists(const char* filename)
{
    FILE* fp = NULL;

    //this will fail if more capabilities to read the
    //contents of the file is required (e.g. \private\...)
    fp = fopen(filename, "r");

    if(fp != NULL)
      {
        fclose(fp);
        return true;
      }
    fclose(fp);

    return false;
}


extern "C" int destroyImage(void * ptr, std::string * str,  int type)
{

	/* deleting image pointers */
	switch(type)
	{
		case 8:
			 delete ((Image<uint8_t>*)ptr);
			break;
		case 16:
			 delete ((Image<uint16_t>*)ptr);
			break;
		case 32:
			 delete ((Image<uint32_t>*)ptr);
			break;
	}

	/* deleting JSON string pointer */
	delete str;

	return SUCCESS;
}


extern "C" const char * loadImage(char * imagePath, int type)
{
	void * input;
	buffer_t * t;

	switch(type)
	{
		case 8: input = loadImage_8(imagePath);
			t = ((Image<uint8_t>*)input)->getBuffer_t();
			break;
		case 16: input = loadImage_16(imagePath);
			t = ((Image<uint16_t>*)input)->getBuffer_t();
			break;
		case 32: input = loadImage_32(imagePath);
			t = ((Image<uint32_t>*)input)->getBuffer_t();
			break;
	}

	if(!input){
		printf("Error Allocating file pointer! Aborting.\n");
		return (char *)ERROR;
	}

	return convertToJson(input,t, type,imagePath);


}
