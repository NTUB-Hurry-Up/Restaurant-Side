@echo off
echo start
heroku login
git config --global user.email "joelin890120@gmail.com"
heroku git:remote -a linebot108508
heroku open
echo end