#!/bin/bash -e
branch=($(git rev-parse --abbrev-ref HEAD))
if [ $branch == "master" ]
then
    echo "Please checkout to your branch."
    exit 0
fi

set -x
git fetch --all
git pull origin "$branch"
git merge origin/master
git push origin "$branch"

git diff origin/master...origin/"$branch" > mydiff

