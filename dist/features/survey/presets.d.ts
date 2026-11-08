import { SurveyConfig } from "../../core/types.js";
/**
 * Ready-to-use end-of-media survey examples.
 *
 * Every preset is a plain {@link SurveyConfig}; spread it and override any
 * field, or use it directly inside `PlayerOptions.survey`, source metadata or
 * the `survey` JSON attribute.
 */
/** A short CSAT form shown after the media ends. */
export declare function endOfVideoFeedback(overrides?: Partial<SurveyConfig>): SurveyConfig;
/** A standard 0–10 Net Promoter Score question. */
export declare function netPromoterScore(overrides?: Partial<SurveyConfig>): SurveyConfig;
/** A content-quality feedback form with a single-choice follow-up. */
export declare function contentFeedback(overrides?: Partial<SurveyConfig>): SurveyConfig;
/** A blocking review that must be completed before the player can continue. */
export declare function blockingReview(overrides?: Partial<SurveyConfig>): SurveyConfig;
/** A quiz with instant correct/incorrect feedback. */
export declare function quizFeedback(overrides?: Partial<SurveyConfig>): SurveyConfig;
/** All built-in survey presets, keyed for docs and demos. */
export declare const SURVEY_PRESETS: {
  readonly endOfVideoFeedback: typeof endOfVideoFeedback;
  readonly netPromoterScore: typeof netPromoterScore;
  readonly contentFeedback: typeof contentFeedback;
  readonly blockingReview: typeof blockingReview;
  readonly quizFeedback: typeof quizFeedback;
};
//# sourceMappingURL=presets.d.ts.map