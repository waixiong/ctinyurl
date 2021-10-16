# build web
cd ./web
npm install
npm run build

cd ../
# build api
npm install
npm run build
cp -r ./web/build ./dist/web

npm run start:prod