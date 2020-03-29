MOCHA_OPTS= --slow 0 -A
REPORTER = spec

lint-fix:
	./node_modules/.bin/eslint --fix index.js

lint-check:
	./node_modules/.bin/eslint index.js

rebase:
	git fetch origin master
	git rebase origin/master

commit:
	@node ./node_modules/ac-semantic-release/lib/commit.js

release:
	@node ./node_modules/ac-semantic-release/lib/release.js

.PHONY: check
