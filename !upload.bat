@echo off
echo start
git add .
git commit -am "108508"
git push heroku master -f
heroku logs --tail
echo end