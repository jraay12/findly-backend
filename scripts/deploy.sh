#!/bin/bash

sudo -i bash <<EOF

echo "Navigate to directory"
cd /root/findly-backend

echo "Stop the application"
docker-compose down

echo "Remove all docker images"
docker image prune -a -f

echo "Start the application"
docker-compose up -d


EOF