# decky-totp

Show TOTP codes on your Steam Deck.

## Building

```shell
pnpm i
./scripts/build.sh && ./scripts/deploy.sh <deck IP>
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
