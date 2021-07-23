.PHONY: compile dist

compile:
	npm run prepare

dist: compile
	npm pack
	mv shanhuio-misc-0.0.0.tgz misc.tgz
