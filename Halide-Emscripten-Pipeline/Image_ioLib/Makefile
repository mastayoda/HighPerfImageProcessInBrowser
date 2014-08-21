
GCC := em++
FLAGS := -O2 -s ALLOW_MEMORY_GROUTH=1
ROOT_DIR := $(shell pwd | sed 's/ /\\ /g')
INCLUDES := $(ROOT_DIR)/includes
STATIC_LIBS := $(ROOT_DIR)/libs/libpng16.a $(ROOT_DIR)/libs/libz.a
IN_SOURCES := image_io.cpp
OUT_OBJECT := Image_io.js
EXPORTED_FUCTIONS := -s EXPORTED_FUNCTIONS="['_loadImage','_destroyImage']" 
BUILD_DIR := $(ROOT_DIR)/build

all: $(OUT_OBJECT)  

$(OUT_OBJECT): $(IN_SOURCES)
	mkdir $(BUILD_DIR)
	$(GCC) $(FLAGS) $(IN_SOURCES) -I $(INCLUDES) $(STATIC_LIBS) -o $(BUILD_DIR)/$(OUT_OBJECT) $(EXPORTED_FUCTIONS)

clean:
	rm -r $(BUILD_DIR)

