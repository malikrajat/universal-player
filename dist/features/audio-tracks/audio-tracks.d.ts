import { AudioTrackInfo } from "../../core/types.js";
/** Reads the audio tracks exposed by a media element. */
export declare function toAudioTrackInfos(media: HTMLMediaElement): readonly AudioTrackInfo[];
/** Enables one audio track and disables the rest. */
export declare function selectAudioTrack(media: HTMLMediaElement, id: string | null): void;
//# sourceMappingURL=audio-tracks.d.ts.map