import { UniversalPlayer as UniversalPlayer$1 } from "../../core/player.js";
import { sourceToken } from "../../core/source.js";
import { createInitialState } from "../../core/state.js";
import { createElement, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
// src/frameworks/react/universal-player.ts
/**
* Creates and maintains one player for the lifetime of a component.
*
* Source changes are keyed through `sourceToken`, so equivalent URL values do
* not reload. The player is destroyed on unmount (including Strict Mode's
* simulated unmount).
*/
function useUniversalPlayer(options) {
	const hostRef = useRef(null);
	const playerRef = useRef(null);
	const latest = useRef(options);
	const [player, setPlayer] = useState(null);
	const [state, setState] = useState(() => createInitialState(options));
	useEffect(() => {
		latest.current = options;
	});
	useEffect(() => {
		const host = hostRef.current;
		if (host === null) return;
		const { source: initialSource, ...rest } = latest.current;
		const instance = new UniversalPlayer$1({
			...rest,
			container: host
		});
		playerRef.current = instance;
		setPlayer(instance);
		setState(instance.state);
		const unsubscribeState = instance.on("statechange", (next) => {
			setState(next);
		});
		const unsubscribeTime = instance.on("timeupdate", (event) => {
			setState((previous) => ({
				...previous,
				currentTime: event.currentTime,
				duration: event.duration,
				buffered: event.buffered
			}));
		});
		return () => {
			unsubscribeState();
			unsubscribeTime();
			instance.destroy();
			playerRef.current = null;
			setPlayer(null);
		};
	}, []);
	const token = sourceToken(options.source);
	useEffect(() => {
		const instance = playerRef.current;
		const source = latest.current.source;
		if (instance === null || source === void 0) return;
		instance.load(source).catch(() => {});
	}, [player, token]);
	useEffect(() => {
		if (player !== null) player.setVolume(options.volume ?? 1);
	}, [player, options.volume]);
	useEffect(() => {
		if (player !== null) player.setMuted(options.muted ?? false);
	}, [player, options.muted]);
	useEffect(() => {
		if (player !== null) player.setPlaybackRate(options.playbackRate ?? 1);
	}, [player, options.playbackRate]);
	return {
		hostRef,
		player,
		state,
		play: useCallback(async () => {
			await playerRef.current?.play();
		}, []),
		pause: useCallback(() => {
			playerRef.current?.pause();
		}, []),
		seek: useCallback((time) => {
			playerRef.current?.seek(time);
		}, []),
		load: useCallback(async (source) => {
			await playerRef.current?.load(source);
		}, [])
	};
}
/**
* React host component.
*
* It renders only the host element; media, engine and controls live in the
* framework-neutral core.
*/
const UniversalPlayer = forwardRef(function UniversalPlayer(props, ref) {
	const api = useUniversalPlayer(props);
	useImperativeHandle(ref, () => ({
		get player() {
			return api.player;
		},
		play: () => api.play(),
		pause: () => api.pause(),
		seek: (time) => api.seek(time),
		load: (source) => api.load(source)
	}), [api]);
	return createElement("div", {
		ref: api.hostRef,
		className: props.className,
		style: props.style,
		"data-up-framework": "react",
		"data-up-status": api.state.status
	}, props.children);
});
UniversalPlayer.displayName = "UniversalPlayer";
export { UniversalPlayer, useUniversalPlayer };

//# sourceMappingURL=universal-player.js.map