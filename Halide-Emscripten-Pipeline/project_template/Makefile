YOUR_FILES := brighter.cpp		# SET YOUR HALIDE GENERATED SOURCES
YOUR_FUNCTIONS:= '_brighter'	# SET YOUR FUNCTIONS SEPARATED BY COMMA, EX. '_function1','_function2'
MODULE_NAME:= FILENAME.js   	# CHANGE TO YOUR FILE NAME

GCC := em++
FLAGS := -O2 -s ALLOW_MEMORY_GROUTH=1
ROOT_DIR := $(shell pwd | sed 's/ /\\ /g')
INCLUDES := $(ROOT_DIR)/includes
STATIC_LIBS := $(ROOT_DIR)/libs/libpng16.a $(ROOT_DIR)/libs/libz.a
IN_SOURCES := image_io.cpp $(YOUR_FILES)
OUT_OBJECT := $(MODULE_NAME)
EXPORTED_FUCTIONS := -s EXPORTED_FUNCTIONS="['_loadImage','_destroyImage', $(YOUR_FUNCTIONS)]" 
BUILD_DIR := $(ROOT_DIR)/build

all: $(OUT_OBJECT)  

$(OUT_OBJECT): $(IN_SOURCES)
	mkdir $(BUILD_DIR)
	$(GCC) $(FLAGS) $(IN_SOURCES) -I $(INCLUDES) $(STATIC_LIBS) -o $(BUILD_DIR)/$(OUT_OBJECT) $(EXPORTED_FUCTIONS)

clean:
	rm -r $(BUILD_DIR)

