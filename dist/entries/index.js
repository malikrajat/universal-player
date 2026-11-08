import { activeChapterAt, chapterMarkers, chapterProgress, findChapterAt, nextChapter, previousChapter, sortChapters } from "../features/chapters/chapters.js";
import { createSurveyAnswers, createSurveyStore, createSurveySubmission, emptySurveyAnswer, evaluateSurveyAnswer, isChoiceQuestion, isRequiredQuestion, isSurveyAnswerEmpty, isSurveyComplete, normalizeSurvey, normalizeSurveyAnswers, surveyId, surveyTriggerTime, validateSurveyAnswers } from "../features/survey/survey.js";
import { EMBED_CAPABILITIES, IMAGE_CAPABILITIES, NATIVE_CAPABILITIES, capabilitiesForKind } from "../core/engine.js";
import { PLAYER_ERROR_CODES, createPlayerError, isPlayerError, toPlayerError } from "../core/errors.js";
import { PlayerEventBus, PlayerObservable, toRxjsObservable } from "../core/events.js";
import { clamp, finiteOr, formatTime, formatTimecode } from "../core/utils.js";
import { detectMediaKind, extensionOf, inferMimeType, isVimeoHost, isYouTubeHost, normalizeSource, revokeSource, sourceToken } from "../core/source.js";
import { createInitialState } from "../core/state.js";
import { UniversalPlayer, createPlayer } from "../core/player.js";
import { captionMenuItems, captionStyleDeclarations, findTextTrack, nextTextTrackId, selectTextTrack, toCaptionTrackElements, toTextTrackInfos } from "../features/captions/captions.js";
import { findQuality, normalizeQualityLevels, qualityLabel, stepQuality } from "../features/quality/quality.js";
import { IMAGE_TRANSFORM_DEFAULT, clampImageZoom, imageTransformCss, isImageTransformed, resetImageTransform, rotateImage, zoomImage } from "../features/image-viewer/image-viewer.js";
import { isAtLiveEdge, isLiveDuration, liveEdge, seekableRange } from "../features/live/live.js";
import { PLAYER_SHORTCUTS, shortcutForEvent } from "../features/shortcuts/shortcuts.js";
import { PLAYBACK_RATES, clampPlaybackRate, formatPlaybackRate } from "../features/speed/speed.js";
import { findThumbnailAt, thumbnailUrlAt, thumbnailWidth } from "../features/thumbnails/thumbnails.js";
import { PLAYER_STRINGS_EN, getStrings, registerLocale, setStrings } from "../ui/i18n.js";
import { UNIVERSAL_PLAYER_TAG, UniversalPlayerElement, defineUniversalPlayerElement } from "../ui/element.js";
import { mountUniversalPlayer } from "../vanilla/mount.js";
import { createAdController, findAdBreakAt } from "../features/ads/ads.js";
import { canAirPlay, showAirPlayPicker } from "../features/airplay/airplay.js";
import { createAnalyticsSink, toAnalyticsEvent } from "../features/analytics/analytics.js";
import { selectAudioTrack, toAudioTrackInfos } from "../features/audio-tracks/audio-tracks.js";
import { canCast, connectCast, disconnectCast, findAvailableCastProvider } from "../features/cast/cast.js";
import { canFullscreen, exitFullscreen, isFullscreen, onFullscreenChange, requestFullscreen } from "../features/fullscreen/fullscreen.js";
import { canUseMiniPlayer, enterMiniPlayer, exitMiniPlayer } from "../features/mini-player/mini-player.js";
import { canPictureInPicture, exitPictureInPicture, requestPictureInPicture } from "../features/pip/pip.js";
import { Playlist } from "../features/playlist/playlist.js";
import { DEFAULT_RESUME_KEY_PREFIX, createResumeStore } from "../features/resume/resume.js";
import { SURVEY_PRESETS, blockingReview, contentFeedback, endOfVideoFeedback, netPromoterScore, quizFeedback } from "../features/survey/presets.js";
import { clearVrMode, isVrSupported, setVrMode } from "../features/vr/vr.js";
// src/entries/index.ts
/**
* Public entry: `@codewithrajat/universal-player`.
*
* Batteries-included browser entry: headless core, built-in UI (registering
* `<universal-player>`), vanilla mount helper and feature utilities.
*/
defineUniversalPlayerElement();
export { DEFAULT_RESUME_KEY_PREFIX, EMBED_CAPABILITIES, IMAGE_CAPABILITIES, IMAGE_TRANSFORM_DEFAULT, NATIVE_CAPABILITIES, PLAYBACK_RATES, PLAYER_ERROR_CODES, PLAYER_SHORTCUTS, PLAYER_STRINGS_EN, PlayerEventBus, PlayerObservable, Playlist, SURVEY_PRESETS, UNIVERSAL_PLAYER_TAG, UniversalPlayer, UniversalPlayerElement, activeChapterAt, blockingReview, canAirPlay, canCast, canFullscreen, canPictureInPicture, canUseMiniPlayer, capabilitiesForKind, captionMenuItems, captionStyleDeclarations, chapterMarkers, chapterProgress, clamp, clampImageZoom, clampPlaybackRate, clearVrMode, connectCast, contentFeedback, createAdController, createAnalyticsSink, createInitialState, createPlayer, createPlayerError, createResumeStore, createSurveyAnswers, createSurveyStore, createSurveySubmission, defineUniversalPlayerElement, detectMediaKind, disconnectCast, emptySurveyAnswer, endOfVideoFeedback, enterMiniPlayer, evaluateSurveyAnswer, exitFullscreen, exitMiniPlayer, exitPictureInPicture, extensionOf, findAdBreakAt, findAvailableCastProvider, findChapterAt, findQuality, findTextTrack, findThumbnailAt, finiteOr, formatPlaybackRate, formatTime, formatTimecode, getStrings, imageTransformCss, inferMimeType, isAtLiveEdge, isChoiceQuestion, isFullscreen, isImageTransformed, isLiveDuration, isPlayerError, isRequiredQuestion, isSurveyAnswerEmpty, isSurveyComplete, isVimeoHost, isVrSupported, isYouTubeHost, liveEdge, mountUniversalPlayer, netPromoterScore, nextChapter, nextTextTrackId, normalizeQualityLevels, normalizeSource, normalizeSurvey, normalizeSurveyAnswers, onFullscreenChange, previousChapter, qualityLabel, quizFeedback, registerLocale, requestFullscreen, requestPictureInPicture, resetImageTransform, revokeSource, rotateImage, seekableRange, selectAudioTrack, selectTextTrack, setStrings, setVrMode, shortcutForEvent, showAirPlayPicker, sortChapters, sourceToken, stepQuality, surveyId, surveyTriggerTime, thumbnailUrlAt, thumbnailWidth, toAnalyticsEvent, toAudioTrackInfos, toCaptionTrackElements, toPlayerError, toRxjsObservable, toTextTrackInfos, validateSurveyAnswers, zoomImage };

//# sourceMappingURL=index.js.map