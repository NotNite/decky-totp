import os
import sys
PLUGIN_DIR = os.path.dirname(os.path.realpath(__file__))
sys.path.append(PLUGIN_DIR + "/py_modules")

import pyotp
from settings import SettingsManager

settings_dir = os.environ["DECKY_PLUGIN_SETTINGS_DIR"]
settings = SettingsManager(name="settings", settings_directory=settings_dir)
settings.read()

class Plugin:
    async def entries(self):
        return settings.getSetting("entries", {})

    async def totp(self, key: str):
        entries = settings.getSetting("entries", {})
        setting = entries.get(key, None)
        if setting is None:
            return None

        totp = pyotp.TOTP(setting)
        return totp.now()

    async def _main(self):
        settings.read()

    async def _unload(self):
        pass
