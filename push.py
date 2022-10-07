import os
import time

gitName = "TB3417"

branch = "main"

origin = "https://github.com/elit30/" + str(gitName) +".git"

os.system('git init')
os.system('git add --all')
os.system('git commit -m ' + str(int(time.time())))
os.system('git remote add origin ' + origin)
os.system('git push -u origin ' + branch + ' --force')
