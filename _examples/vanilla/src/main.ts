import "@codewithrajat/universal-player";
import type { UniversalPlayerElement } from "@codewithrajat/universal-player/ui";
import "@codewithrajat/universal-player/styles.css";

const element = document.querySelector<UniversalPlayerElement>("universal-player");
const status = document.querySelector<HTMLParagraphElement>("#status");

if (element !== null) {
  element.addEventListener("statechange", (event) => {
    const state = (event as CustomEvent).detail as {
      status: string;
      currentTime: number;
      duration: number;
    };

    if (status !== null) {
      status.textContent = `Status: ${state.status} · ${state.currentTime.toFixed(
        1,
      )}s / ${state.duration.toFixed(1)}s`;
    }
  });

  element.addEventListener("error", (event) => {
    if (status !== null) {
      status.textContent = `Error: ${String((event as CustomEvent).detail)}`;
    }
  });
}
