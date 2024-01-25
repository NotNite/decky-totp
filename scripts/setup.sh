#!/usr/bin/env bash
mkdir ./cli
curl -L -o ./cli/decky "https://github.com/SteamDeckHomebrew/cli/releases/latest/download/decky"
chmod +x ./cli/decky

pnpm i
pnpm update decky-frontend-lib --latest
