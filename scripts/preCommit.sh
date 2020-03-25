#!/usr/bin/env sh
# file precommit.sh

# abort on errors
set -e

backEndStagedFiles=$( git status ./BE )
frontEndStagedFiles=$( git status ./FE )

if [[ ${backEndStagedFiles} == *"BE/"* ]]; then
	cd ./BE && npm test && echo 'BE: SERVER TESTS PASSED' || echo 'BE: server tests failed!' && exit 1
fi

if [[ ${frontEndStagedFiles} == *"FE/"* ]]; then
	cd ../FE && npm run test:unit && echo 'FE: APP TESTS PASSED' || echo 'FE: APP tests failed!' && exit 1
fi
