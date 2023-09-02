echo "Building app ..."
npm run build

echo "Deploying files to server ..."
scp -r build/* root@164.90.243.101:/var/www/tipme 

echo "Done :)"