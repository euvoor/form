.PHONY: watch

SHELL=bash

watch:
	npm run watch

publish:
	@read -p "Did you increase npm version? " -n 1 -r; \
	if [[ $$REPLY =~ ^[Yy] ]]; then \
		echo \
		&& git add . \
		&& read -p "Commit message: " COMMIT_MSG \
		&& git commit -m "$$COMMIT_MSG" \
		&& git push \
		&& npm run build \
		&& npm publish --access public; \
	else \
		echo; \
	fi
