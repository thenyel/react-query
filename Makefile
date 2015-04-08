BIN = ./node_modules/.bin
TEST_OPTIONS = -R dot --transform [ reactify --harmony ]
AUTOTEST_FLAGS = --autotest --watch lib/*
BABEL_FLAGS = --watch

SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=lib/%.js)

watch:
	./node_modules/.bin/jasmine-node spec/ $(AUTOTEST_FLAGS)

lib: $(LIB)
lib/%.js: src/%.js
	mkdir -p $(@D)
	babel $< -o $@ $(BABEL_FLAGS)

test:
	./node_modules/.bin/jasmine-node spec/

install link:
	@npm $@

clean:
	rm -rf lib/

.PHONY: clean