// src/features/captions/captions.ts
function trackId(track, index) {
	return track.id.length > 0 ? track.id : `text-${index}`;
}
/** Reads the text tracks exposed by a media element. */
function toTextTrackInfos(media) {
	const tracks = [];
	const textTracks = media.textTracks;
	if (textTracks === void 0) return tracks;
	for (let index = 0; index < textTracks.length; index += 1) {
		const track = textTracks[index];
		if (track === void 0) continue;
		tracks.push({
			id: trackId(track, index),
			label: track.label.length > 0 ? track.label : `Track ${index + 1}`,
			language: track.language,
			kind: track.kind,
			default: track.mode === "showing"
		});
	}
	return tracks;
}
/** Shows one text track and disables the rest. */
function selectTextTrack(media, id) {
	const textTracks = media.textTracks;
	if (textTracks === void 0) return;
	for (let index = 0; index < textTracks.length; index += 1) {
		const track = textTracks[index];
		if (track === void 0) continue;
		track.mode = id !== null && trackId(track, index) === id ? "showing" : "disabled";
	}
}
/** Returns the caption track with the given id, or null. */
function findTextTrack(tracks, id) {
	if (id === null) return null;
	return tracks.find((track) => track.id === id) ?? null;
}
/** Cycles through off and every available track. */
function nextTextTrackId(tracks, currentId) {
	if (tracks.length === 0) return null;
	if (currentId === null) return tracks[0]?.id ?? null;
	const index = tracks.findIndex((track) => track.id === currentId);
	const next = index < 0 ? 0 : index + 1;
	return next >= tracks.length ? null : tracks[next]?.id ?? null;
}
/** Builds the caption menu, always including an explicit Off entry. */
function captionMenuItems(tracks, currentId, offLabel = "Off") {
	const items = [{
		id: null,
		label: offLabel,
		language: "",
		kind: "subtitles",
		selected: currentId === null
	}];
	for (const track of tracks) items.push({
		id: track.id,
		label: track.label,
		language: track.language,
		kind: track.kind,
		selected: track.id === currentId
	});
	return items;
}
/** Normalizes source/option caption tracks for the native engine. */
function toCaptionTrackElements(tracks, fallbackIdPrefix = "caption") {
	return tracks.map((track, index) => ({
		id: track.id ?? `${fallbackIdPrefix}-${index}`,
		src: track.src,
		label: track.label,
		language: track.language,
		kind: track.kind ?? "subtitles",
		default: track.default === true
	}));
}
/** Maps caption styling to CSS custom properties. */
function captionStyleDeclarations(style) {
	const declarations = {};
	if (style.fontSize !== void 0) declarations["--up-caption-size"] = style.fontSize;
	if (style.color !== void 0) declarations["--up-caption-color"] = style.color;
	if (style.background !== void 0) declarations["--up-caption-background"] = style.background;
	if (style.opacity !== void 0) declarations["--up-caption-opacity"] = String(Math.min(Math.max(style.opacity, 0), 1));
	if (style.edge !== void 0) declarations["--up-caption-edge"] = style.edge;
	if (style.fontFamily !== void 0) declarations["--up-caption-font"] = style.fontFamily;
	return declarations;
}
export { captionMenuItems, captionStyleDeclarations, findTextTrack, nextTextTrackId, selectTextTrack, toCaptionTrackElements, toTextTrackInfos };

//# sourceMappingURL=captions.js.map