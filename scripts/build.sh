#!/usr/bin/env bash
pnpm run build

rm -rf ./out/decky-totp
mkdir -p ./out/decky-totp
cp LICENSE main.py package.json plugin.json README.md ./out/decky-totp
cp -r ./dist ./out/decky-totp/dist
cp -r ./py_modules ./out/decky-totp/py_modules

cd out
zip -r ./decky-totp.zip ./decky-totp
cd ..
