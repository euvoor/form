.PHONY: watch

SHELL=bash

watch:
	npm run watch

publish:
	@read -p "Did you increase npm version? (y/n/a) " -n 1 -r; \
	if [[ $$REPLY =~ ^[Yy] ]]; then \
		echo \
		&& npm run build \
		&& git add . \
		&& read -p "Commit message: " COMMIT_MSG \
		&& git commit -m "$$COMMIT_MSG" \
		&& git push \
		&& npm publish --access public; \
	elif [[ $$REPLY =~ ^[Aa] ]]; then \
		echo \
		&& npm run build \
		&& git add . \
		&& read -p "Commit message: " COMMIT_MSG \
		&& git commit -m "$$COMMIT_MSG" \
		&& git push; \
	else \
		echo; \
	fi
