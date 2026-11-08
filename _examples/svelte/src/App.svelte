<script lang="ts">
  import UniversalPlayer from "@codewithrajat/universal-player/svelte5";
  import "@codewithrajat/universal-player/styles.css";
  import "./styles.css";

  const src =
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
</script>

<main>
  <h1>Universal Player — Svelte 5</h1>
  <UniversalPlayer {src} theme="dark" />
</main>
