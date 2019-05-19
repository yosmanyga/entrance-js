# Instalación

docker run -it --rm -v $(pwd):/app -w /app --name node yosmy/node sh

npm install

exit

# Compilación

rm -rf build/* && node_modules/.bin/babel src --copy-files --out-dir build

# Test

docker-compose \
-f docker/all.yml \
-p entrance \
stop && docker-compose \
-f docker/all.yml \
-p entrance \
up

http://localhost:6006