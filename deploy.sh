# file deploy.sh
#!/usr/bin/env sh

# abort on errors
set -e

# build
cd ./FE && npm run build

cd ..

git add .
git commit -m 'deploy'

git push origin master
