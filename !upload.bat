@echo off
echo start
git add .
git commit -am "linebot108508"
git push heroku master -f
heroku logs --tail
echo end