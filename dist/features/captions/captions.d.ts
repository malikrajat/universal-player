import { CaptionStyle, CaptionTrack, TextTrackInfo } from "../../core/types.js";
/** Reads the text tracks exposed by a media element. */
export declare function toTextTrackInfos(media: HTMLMediaElement): readonly TextTrackInfo[];
/** Shows one text track and disables the rest. */
export declare function selectTextTrack(media: HTMLMediaElement, id: string | null): void;
/** Returns the caption track with the given id, or null. */
export declare function findTextTrack(tracks: readonly TextTrackInfo[], id: string | null): TextTrackInfo | null;
/** Cycles through off and every available track. */
export declare function nextTextTrackId(tracks: readonly TextTrackInfo[], currentId: string | null): string | null;
/** A YouTube-style "Off + languages" caption menu model. */
export interface CaptionMenuItem {
  readonly id: string | null;
  readonly label: string;
  readonly language: string;
  readonly kind: TextTrackInfo["kind"];
  readonly selected: boolean;
}
/** Builds the caption menu, always including an explicit Off entry. */
export declare function captionMenuItems(tracks: readonly TextTrackInfo[], currentId: string | null, offLabel?: string): readonly CaptionMenuItem[];
/** Converts a consumer caption track to the native `<track>` attributes. */
export interface CaptionTrackElementOptions {
  readonly id: string;
  readonly src: string;
  readonly label: string;
  readonly language: string;
  readonly kind: string;
  readonly default: boolean;
}
/** Normalizes source/option caption tracks for the native engine. */
export declare function toCaptionTrackElements(tracks: readonly CaptionTrack[], fallbackIdPrefix?: string): readonly CaptionTrackElementOptions[];
/** Maps caption styling to CSS custom properties. */
export declare function captionStyleDeclarations(style: CaptionStyle): Readonly<Record<string, string>>;
//# sourceMappingURL=captions.d.ts.map