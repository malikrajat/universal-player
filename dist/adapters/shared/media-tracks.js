// src/adapters/shared/media-tracks.ts
function textTrackId(track, index) {
	return track.id.length > 0 ? track.id : `text-${index}`;
}
/** Reads the text tracks exposed by a media element. */
function listTextTracks(media) {
	const tracks = [];
	const textTracks = media.textTracks;
	if (textTracks === void 0) return tracks;
	for (let index = 0; index < textTracks.length; index += 1) {
		const track = textTracks[index];
		if (track === void 0) continue;
		tracks.push({
			id: textTrackId(track, index),
			label: track.label.length > 0 ? track.label : `Track ${index + 1}`,
			language: track.language,
			kind: track.kind,
			default: track.mode === "showing"
		});
	}
	return tracks;
}
/** Shows one text track and disables the rest. */
function setMediaTextTrack(media, id) {
	const textTracks = media.textTracks;
	if (textTracks === void 0) return;
	for (let index = 0; index < textTracks.length; index += 1) {
		const track = textTracks[index];
		if (track === void 0) continue;
		track.mode = id !== null && textTrackId(track, index) === id ? "showing" : "disabled";
	}
}
/** Reads the audio tracks exposed by a media element. */
function listAudioTracks(media) {
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
function setMediaAudioTrack(media, id) {
	const audioTracks = media.audioTracks;
	if (audioTracks === void 0) return;
	for (let index = 0; index < audioTracks.length; index += 1) {
		const track = audioTracks[index];
		if (track !== void 0) track.enabled = track.id === id;
	}
}
/**
* Appends `<track>` elements for consumer-provided captions/subtitles.
*
* Native `<track>` only supports WebVTT. Callers should pass VTT URLs.
*/
function applyCaptionTracks(media, tracks) {
	if (tracks === void 0 || tracks.length === 0) return;
	for (let index = 0; index < tracks.length; index += 1) {
		const caption = tracks[index];
		if (caption === void 0) continue;
		const element = document.createElement("track");
		element.kind = caption.kind ?? "subtitles";
		element.label = caption.label;
		element.srclang = caption.language;
		element.src = caption.src;
		element.default = caption.default === true;
		if (caption.id !== void 0 && caption.id.length > 0) element.id = caption.id;
		media.append(element);
	}
}
export { applyCaptionTracks, listAudioTracks, listTextTracks, setMediaAudioTrack, setMediaTextTrack };

//# sourceMappingURL=media-tracks.js.map