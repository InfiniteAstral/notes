#!/bin/bash

git fetch --depth=1 --all

LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "仓库已是最新版本，跳过本次操作"
  exit 0
else
  echo "远程分支存在更新，开始同步..."
  git reset --hard origin/main
  git pull --depth=1

  git reflog expire --expire=all --all
  git gc --prune=all --aggressive

  echo "仓库同步完成"
fi

OUTDATED=$(npm outdated --json 2>/dev/null || echo "{}")
if [ "$OUTDATED" != "{}" ]; then
  echo "依赖不是最新版本，执行安装..."
  rm -rf node_modules
  npm install
  echo "依赖安装完成"
else
  echo "依赖已是最新版本，跳过安装"
fi

rm -rf public
echo "已删除 public 目录"

npm run build
echo "构建完成"

npm cache clean --force
echo "已清理 Node 缓存"

rm -rf package-lock.json
echo "已删除 package-lock.json"
