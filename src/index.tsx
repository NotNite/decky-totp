import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ServerAPI,
  staticClasses
} from "decky-frontend-lib";
import React from "react";
import { FaLock } from "react-icons/fa";

function TotpEntry({
  serverAPI,
  entry
}: {
  serverAPI: ServerAPI;
  entry: string;
}) {
  const [code, setCode] = React.useState<string>("");
  const [secondsLeft, setSecondsLeft] = React.useState<number>(0);

  React.useEffect(() => {
    let interval = setInterval(async () => {
      const resp = await serverAPI.callPluginMethod<{ key: string }, string>(
        "totp",
        { key: entry }
      );

      setCode(resp.result);
      const secondsLeft = 30 - ((Date.now() / 1000) % 30);
      setSecondsLeft(Math.floor(secondsLeft));
    }, 1000);

    return () => clearInterval(interval);
  }, [entry]);

  if (code == "") return null;

  return (
    <PanelSection title={entry}>
      <PanelSectionRow>
        <span style={{ fontSize: "2em", color: "white" }}>{code}</span>
      </PanelSectionRow>
      <PanelSectionRow>
        <span style={{ fontSize: "1em" }}>{secondsLeft}s</span>
      </PanelSectionRow>
    </PanelSection>
  );
}

function Content({ serverAPI }: { serverAPI: ServerAPI }) {
  const [entries, setEntries] = React.useState<string[] | null>(null);

  React.useEffect(() => {
    async function get() {
      const resp = await serverAPI.callPluginMethod<{}, string[]>(
        "entries",
        {}
      );

      setEntries(Object.keys(resp.result));
    }

    get();
  }, []);

  return (
    <>
      {entries == null ? (
        <span>Loading...</span>
      ) : (
        entries.map((entry) => (
          <TotpEntry key={entry} serverAPI={serverAPI} entry={entry} />
        ))
      )}
    </>
  );
}

export default definePlugin((serverApi: ServerAPI) => {
  return {
    title: <div className={staticClasses.Title}>Decky TOTP</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaLock />
  };
});
