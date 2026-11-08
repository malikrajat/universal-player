import { UniversalPlayer } from "@codewithrajat/universal-player/react";
import "@codewithrajat/universal-player/styles.css";
import "./styles.css";

const src =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export function App() {
  return (
    <main>
      <h1>Universal Player — React</h1>
      <UniversalPlayer
        src={src}
        theme="dark"
        onEvent={(event) => {
          if (event.type === "statechange") {
            console.log(event.detail.status);
          }
        }}
      />
    </main>
  );
}
