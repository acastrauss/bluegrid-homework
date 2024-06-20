docker build -t api-files .
docker run -d -p 3000:3000 --name api-files-prod api-files