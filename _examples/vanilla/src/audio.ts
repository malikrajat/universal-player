import "@codewithrajat/universal-player";
import "@codewithrajat/universal-player/styles.css";
import type { UniversalPlayerElement } from "@codewithrajat/universal-player/ui";
import type { PlayerState } from "@codewithrajat/universal-player/core";

const pairs: Array<[string, string]> = [
  ["audio-art", "art-status"],
  ["audio-visual", "visual-status"],
];

for (const [playerId, statusId] of pairs) {
  const element = document.querySelector<UniversalPlayerElement>(`#${playerId}`);
  const status = document.querySelector<HTMLElement>(`#${statusId}`);

  element?.addEventListener("statechange", (event) => {
    const state = (event as CustomEvent<PlayerState>).detail;

    if (status !== null) {
      status.textContent = `Status: ${state.status} — ${state.currentTime.toFixed(
        0,
      )}s / ${state.duration.toFixed(0)}s`;
    }
  });
}
