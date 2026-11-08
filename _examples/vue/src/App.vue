<script setup lang="ts">
import { UniversalPlayer } from "@codewithrajat/universal-player/vue";
import "@codewithrajat/universal-player/styles.css";
import "./styles.css";

const src =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

function onStateChange(state: unknown): void {
  console.log(state);
}
</script>

<template>
  <main>
    <h1>Universal Player — Vue</h1>
    <UniversalPlayer :src="src" theme="dark" @statechange="onStateChange" />
  </main>
</template>
