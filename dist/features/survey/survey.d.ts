import { SurveyAnswerValue, SurveyAnswers, SurveyConfig, SurveyQuestion, SurveySubmission, SurveyTrigger } from "../../core/types.js";
/** A single validation problem. */
export interface SurveyValidationIssue {
  readonly questionId: string;
  readonly message: string;
}
/** Storage used to remember surveys that were already shown. */
export interface SurveyStoreOptions {
  readonly storage?: Storage | null;
  readonly key?: string;
}
/** Small best-effort persistence helper for "show once" surveys. */
export interface SurveyStore {
  readonly key: string;
  wasShown(): boolean;
  markShown(): void;
  clear(): void;
}
/** Returns true when a question renders a list of options. */
export declare function isChoiceQuestion(question: SurveyQuestion): boolean;
/** Returns true when a question is required by default or explicitly. */
export declare function isRequiredQuestion(question: SurveyQuestion): boolean;
/** The stable id used by a survey. */
export declare function surveyId(survey: SurveyConfig): string;
/** Fills defaults so the UI and the event payloads are predictable. */
export declare function normalizeSurvey(survey: SurveyConfig): SurveyConfig;
/** Converts a trigger into a time in seconds, or null for lifecycle triggers. */
export declare function surveyTriggerTime(trigger: SurveyTrigger | undefined): number | null;
/** Returns a value describing an untouched answer for a question. */
export declare function emptySurveyAnswer(question: SurveyQuestion): SurveyAnswerValue;
/** Creates an answer map with every question initialised. */
export declare function createSurveyAnswers(survey: SurveyConfig): SurveyAnswers;
/** Normalizes arbitrary input into a safe answer map. */
export declare function normalizeSurveyAnswers(survey: SurveyConfig, answers: Readonly<Record<string, unknown>>): SurveyAnswers;
/** Returns true when an answer has no meaningful value. */
export declare function isSurveyAnswerEmpty(question: SurveyQuestion, value: SurveyAnswerValue): boolean;
/** Validates answers and returns readable issues. */
export declare function validateSurveyAnswers(survey: SurveyConfig, answers: SurveyAnswers): readonly SurveyValidationIssue[];
/** Returns true when every required question has a valid answer. */
export declare function isSurveyComplete(survey: SurveyConfig, answers: SurveyAnswers): boolean;
/** Evaluates an answer against `question.correct`, or null when not a quiz. */
export declare function evaluateSurveyAnswer(question: SurveyQuestion, value: SurveyAnswerValue): {
  readonly correct: boolean;
  readonly explanation: string;
} | null;
/** Builds the payload delivered to consumers. */
export declare function createSurveySubmission(survey: SurveyConfig, answers: SurveyAnswers, context?: {
  readonly source?: string | null;
  readonly position?: number;
  readonly duration?: number;
  readonly skipped?: boolean;
  readonly at?: number;
  readonly attempt?: number;
}): SurveySubmission;
/** Creates a best-effort "already shown" store. */
export declare function createSurveyStore(survey: SurveyConfig, source: string | null, options?: SurveyStoreOptions): SurveyStore;
//# sourceMappingURL=survey.d.ts.map