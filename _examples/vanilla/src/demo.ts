import "@codewithrajat/universal-player";
import "@codewithrajat/universal-player/styles.css";
import type { UniversalPlayerElement } from "@codewithrajat/universal-player/ui";
import type { PlayerState } from "@codewithrajat/universal-player/core";

const element = document.querySelector<UniversalPlayerElement>("#player");
const status = document.querySelector<HTMLElement>("#status");
const captions = document.querySelector<HTMLElement>("#captions");
const quality = document.querySelector<HTMLElement>("#quality");
const embed = document.querySelector<HTMLButtonElement>("#embed");
const embedCode = document.querySelector<HTMLElement>("#embed-code");
const openQuality = document.querySelector<HTMLButtonElement>("#open-quality");
const toggleCaptions = document.querySelector<HTMLButtonElement>("#toggle-captions");

function qualityLabel(state: PlayerState): string {
  if (state.quality === null) {
    return "auto";
  }

  const level = state.qualities.find((entry) => entry.id === state.quality);
  return level?.label ?? state.quality;
}

if (element !== null) {
  element.addEventListener("statechange", (event) => {
    const state = (event as CustomEvent<PlayerState>).detail;

    if (status !== null) {
      status.textContent = state.status;
    }

    if (captions !== null) {
      captions.textContent = state.textTrack?.label ?? "off";
    }

    if (quality !== null) {
      quality.textContent = qualityLabel(state);
    }
  });
}

openQuality?.addEventListener("click", () => {
  element?.dispatchEvent(new KeyboardEvent("keydown", { key: "q", bubbles: true }));
});

toggleCaptions?.addEventListener("click", () => {
  element?.shadowRoot?.querySelector<HTMLButtonElement>('[data-up-action="captions"]')?.click();
});

embed?.addEventListener("click", () => {
  if (embedCode === null) {
    return;
  }

  const code = element?.getEmbedCode() ?? "No embed code available.";

  if (embedCode.hidden) {
    embedCode.hidden = false;
    embedCode.textContent = code;
    embed?.setAttribute("aria-expanded", "true");
    return;
  }

  embedCode.hidden = true;
  embedCode.textContent = "";
  embed?.setAttribute("aria-expanded", "false");
});
