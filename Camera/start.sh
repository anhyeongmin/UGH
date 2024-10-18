cd $PWD/camera_app
npm install
yarn install
npm run pack-p

cd ../camera_service
npm install

cd ..
ares-package camera_app/dist camera_service
ares-install com.camera.app_1.0.0_all.ipk