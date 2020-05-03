#!/usr/bin/env sh
# file precommit.sh

# abort on errors
set -e

stagedFiles=$( git diff --name-only --staged )

if [[ ${stagedFiles} == *"BE/"* ]]; then
	cd ./BE && npm test && echo 'BE: SERVER TESTS PASSED' || exit 1
	cd ..
fi

if [[ ${stagedFiles} == *"FE/"* ]]; then
	cd ./FE && npm run test:unit --passWithNoTests && echo 'FE: APP TESTS PASSED' || exit 1
fi
