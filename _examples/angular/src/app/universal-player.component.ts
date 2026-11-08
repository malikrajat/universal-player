import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
} from "@angular/core";
import { AngularUniversalPlayer } from "@codewithrajat/universal-player/angular";
import type { PlayerState } from "@codewithrajat/universal-player/core";

/**
 * Consumers own the decorated component. The package ships a decorator-free
 * controller so the library stays AOT-compatible.
 */
@Component({
  selector: "app-universal-player",
  standalone: true,
  template: `<div #host class="up-host"></div>`,
  styles: [
    `
      .up-host {
        width: 100%;
        max-width: 960px;
      }
    `,
  ],
})
export class UniversalPlayerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) src!: string;
  @Output() readonly stateChange = new EventEmitter<PlayerState>();
  @ViewChild("host", { static: true }) host!: ElementRef<HTMLElement>;

  private controller: AngularUniversalPlayer | null = null;

  ngAfterViewInit(): void {
    this.controller = new AngularUniversalPlayer({
      elementRef: this.host,
      inputs: { source: this.src },
      outputs: {
        stateChange: (state) => this.stateChange.emit(state),
      },
    });
    this.controller.ngAfterViewInit();
  }

  ngOnChanges(): void {
    this.controller?.setInputs({ source: this.src });
  }

  ngOnDestroy(): void {
    this.controller?.ngOnDestroy();
  }
}
