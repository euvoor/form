.PHONY: watch

watch:
	npm run watch

publish:
	git push
	npm run build
	npm publish --access public
