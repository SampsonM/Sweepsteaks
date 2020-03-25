#!/usr/bin/env sh
# file precommit.sh

# abort on errors
set -e

backEndStagedFiles=$( git status ./BE )
frontEndStagedFiles=$( git status ./FE )

if [[ ${backEndStagedFiles} == *"BE/"* ]]; then
	cd ./BE && npm test && echo 'BE: SERVER TESTS PASSED' || exit 1
	cd ..
fi

if [[ ${frontEndStagedFiles} == *"FE/"* ]]; then
	cd ./FE && npm run test:unit && echo 'FE: APP TESTS PASSED' || exit 1
fi
