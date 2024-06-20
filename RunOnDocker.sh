# Build API image
docker build -t api-files .

# Start container with previously built image
# Map host's port 3000 to container's port 300
docker run -d -p 3000:3000 --name api-files-prod api-files