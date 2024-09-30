#!/bin/sh
export HOME=/home/svkruik
export PATH=/root/.nvm/versions/node/v20.15.1/bin:$PATH

# Git
cd ..
git config --global --add safe.directory /home/svkruik/Documents/GitHub/SK-Metrics
git reset --hard
git pull
echo "Git setup complete"

# Hosting - metrics.stefankruik.com
cd frontend
npm install
npm run build
sudo systemctl restart sk-metrics.service
echo "Hosting deployment complete. Reloading server."
