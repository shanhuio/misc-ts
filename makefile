.PHONY: tsc

tsc: 
	tsc

fmt:
	tsfmt -r `find ./src -name "*.tsx"`
