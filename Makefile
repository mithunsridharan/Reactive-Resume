docker stop $(docker ps -q)
docker rm $(docker ps -a -q)
docker compose down -v
docker rmi rxresume:1.0
docker build -t rxresume:1.0 .
docker compose up -d
