@echo off
echo start
heroku login
git config --global user.email "ntub108508@gmail.com"
heroku git:remote -a ntub108508
heroku open
echo end