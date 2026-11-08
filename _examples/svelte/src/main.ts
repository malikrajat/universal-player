import { mount } from "svelte";
import App from "./App.svelte";

const target = document.querySelector<HTMLDivElement>("#app");

if (target !== null) {
  mount(App, { target });
}
