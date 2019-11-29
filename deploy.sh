# file deploy.sh
#!/usr/bin/env sh

# abort on errors
set -e

export branchName=$( git rev-parse --abbrev-ref HEAD )

if [ $branchName != 'master' ];
then
	echo cannot deploy when not on master, you are currently on branch - $branchName
	exit 1
fi


# build
cd ./FE && npm run build

firebase deploy --only hosting

cd ..

git add .
git commit -m 'deploy'

git push origin master
