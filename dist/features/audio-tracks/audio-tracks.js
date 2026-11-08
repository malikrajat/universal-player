// src/features/audio-tracks/audio-tracks.ts
/** Reads the audio tracks exposed by a media element. */
function toAudioTrackInfos(media) {
	const tracks = [];
	const audioTracks = media.audioTracks;
	if (audioTracks === void 0) return tracks;
	for (let index = 0; index < audioTracks.length; index += 1) {
		const track = audioTracks[index];
		if (track === void 0) continue;
		tracks.push({
			id: track.id ?? `audio-${index}`,
			label: track.label ?? `Track ${index + 1}`,
			language: track.language ?? "",
			default: track.enabled
		});
	}
	return tracks;
}
/** Enables one audio track and disables the rest. */
function selectAudioTrack(media, id) {
	const audioTracks = media.audioTracks;
	if (audioTracks === void 0) return;
	for (let index = 0; index < audioTracks.length; index += 1) {
		const track = audioTracks[index];
		if (track !== void 0) track.enabled = track.id === id;
	}
}
export { selectAudioTrack, toAudioTrackInfos };

//# sourceMappingURL=audio-tracks.js.map