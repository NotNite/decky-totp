#!/usr/bin/env bash

# Why in the fuck does this need root
printf "Enter deck sudo password: "
read -s deckpass
printf "\n"

scp ./out/decky-totp.zip deck@$1:/tmp/decky-totp.zip
ssh deck@$1 "echo $deckpass | sudo -S unzip -o /tmp/decky-totp.zip -d /home/deck/homebrew/plugins"
