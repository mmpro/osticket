MOCHA_OPTS= --slow 0 -A
REPORTER = spec

lint-fix:
	./node_modules/.bin/eslint --fix index.js

lint-check:
	./node_modules/.bin/eslint index.js

rebase:
	git fetch origin master
	git rebase origin/master

release:
	./node_modules/corp-semantic-release/src/index.js --branch master --useTemplate "ac-conventional-changelog-template"


.PHONY: check
