# decky-totp

Show TOTP codes on your Steam Deck.

## Installation

Download the latest release from GitHub Actions, then unzip it:

```shell
sudo unzip -o ./decky-totp.zip -d /home/deck/homebrew/plugins
```

## Building

You will need pnpm and Python 3 installed.

```shell
pnpm i
./scripts/build.sh && ./scripts/pack.sh && ./scripts/deploy.sh <deck IP>
```

## Usage

Create `/home/deck/homebrew/settings/decky-totp/settings.json`:

```json
{
  "entries": {
    "service name": "totp secret"
  }
}
```

Then reload the plugin/restart Steam.
