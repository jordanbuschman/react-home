#!/bin/bash
echo "Running build/deploy scripts"
npm run build
./deploy.sh
git status
git add .
git status
git commit -m "Updating the Doug Score"
git push