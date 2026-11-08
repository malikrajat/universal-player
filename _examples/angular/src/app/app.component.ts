import { Component } from "@angular/core";
import type { PlayerState } from "@codewithrajat/universal-player/core";
import { UniversalPlayerComponent } from "./universal-player.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [UniversalPlayerComponent],
  template: `
    <main>
      <h1>Universal Player — Angular</h1>
      <app-universal-player [src]="src" (stateChange)="onState($event)" />
      <p>Status: {{ status }}</p>
    </main>
  `,
})
export class AppComponent {
  readonly src =
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
  status = "idle";

  onState(state: PlayerState): void {
    this.status = state.status;
  }
}
