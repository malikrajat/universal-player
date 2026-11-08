// src/features/survey/survey.ts
const CHOICE_TYPES = /* @__PURE__ */ new Set([
	"radio",
	"checkbox",
	"select"
]);
function defaultTitle(kind) {
	switch (kind) {
		case "feedback": return "Feedback";
		case "review": return "Review";
		case "quiz": return "Quiz";
		default: return "Survey";
	}
}
/** Returns true when a question renders a list of options. */
function isChoiceQuestion(question) {
	return CHOICE_TYPES.has(question.type);
}
/** Returns true when a question is required by default or explicitly. */
function isRequiredQuestion(question) {
	return question.required === true;
}
/** The stable id used by a survey. */
function surveyId(survey) {
	if (survey.id !== void 0 && survey.id.length > 0) return survey.id;
	return `${survey.kind ?? "survey"}:${survey.title ?? defaultTitle(survey.kind)}`;
}
/** Fills defaults so the UI and the event payloads are predictable. */
function normalizeSurvey(survey) {
	const kind = survey.kind ?? "survey";
	const required = survey.required ?? survey.blocking ?? false;
	const allowSkip = survey.allowSkip ?? !required;
	return {
		...survey,
		id: surveyId(survey),
		kind,
		title: survey.title ?? defaultTitle(kind),
		submitLabel: survey.submitLabel ?? "Submit",
		skipLabel: survey.skipLabel ?? "Skip",
		closeLabel: survey.closeLabel ?? "Close",
		thankYouTitle: survey.thankYouTitle ?? "Thank you!",
		thankYouText: survey.thankYouText ?? "",
		trigger: survey.trigger ?? "ended",
		once: survey.once ?? true,
		allowSkip,
		required,
		blocking: survey.blocking ?? required,
		submitMode: survey.submitMode ?? (survey.autoSubmit === true ? "on-select" : "manual"),
		autoSubmitDelay: Math.max(0, survey.autoSubmitDelay ?? 0),
		instantFeedback: survey.instantFeedback ?? kind === "quiz",
		allowRetake: survey.allowRetake ?? survey.allowResubmit ?? false,
		...survey.maxAttempts === void 0 ? {} : { maxAttempts: survey.maxAttempts }
	};
}
/** Converts a trigger into a time in seconds, or null for lifecycle triggers. */
function surveyTriggerTime(trigger) {
	if (typeof trigger === "number") return Number.isFinite(trigger) ? Math.max(0, trigger) : null;
	if (typeof trigger === "object" && trigger !== null) return Number.isFinite(trigger.at) ? Math.max(0, trigger.at) : null;
	return null;
}
/** Returns a value describing an untouched answer for a question. */
function emptySurveyAnswer(question) {
	switch (question.type) {
		case "checkbox": return [];
		case "rating":
		case "scale": return question.min ?? (question.type === "rating" ? 0 : 0);
		default: return "";
	}
}
/** Creates an answer map with every question initialised. */
function createSurveyAnswers(survey) {
	const answers = {};
	for (const question of survey.questions) answers[question.id] = emptySurveyAnswer(question);
	return answers;
}
/** Normalizes arbitrary input into a safe answer map. */
function normalizeSurveyAnswers(survey, answers) {
	const result = {};
	for (const question of survey.questions) {
		const value = answers[question.id];
		if (question.type === "checkbox") {
			const list = Array.isArray(value) ? value.filter((entry) => typeof entry === "string") : typeof value === "string" && value.length > 0 ? [value] : [];
			result[question.id] = list;
			continue;
		}
		if (question.type === "rating" || question.type === "scale") {
			const numeric = typeof value === "number" ? value : Number(value);
			result[question.id] = Number.isFinite(numeric) ? numeric : question.min ?? 0;
			continue;
		}
		result[question.id] = typeof value === "string" ? value : typeof value === "number" || typeof value === "boolean" ? String(value) : "";
	}
	return result;
}
/** Returns true when an answer has no meaningful value. */
function isSurveyAnswerEmpty(question, value) {
	if (question.type === "checkbox") return !Array.isArray(value) || value.length === 0;
	if (question.type === "rating" || question.type === "scale") {
		const number = typeof value === "number" ? value : Number(value);
		return !Number.isFinite(number) || number <= (question.min ?? 0);
	}
	if (value === null || value === void 0) return true;
	return String(value).trim().length === 0;
}
/** Validates answers and returns readable issues. */
function validateSurveyAnswers(survey, answers) {
	const issues = [];
	for (const question of survey.questions) {
		const value = answers[question.id] ?? emptySurveyAnswer(question);
		if (isRequiredQuestion(question) && isSurveyAnswerEmpty(question, value)) {
			issues.push({
				questionId: question.id,
				message: "This question is required."
			});
			continue;
		}
		if (question.type === "text" || question.type === "textarea") {
			const text = typeof value === "string" ? value : String(value ?? "");
			if (question.minLength !== void 0 && text.length < question.minLength) issues.push({
				questionId: question.id,
				message: `Enter at least ${question.minLength} characters.`
			});
			if (question.maxLength !== void 0 && text.length > question.maxLength) issues.push({
				questionId: question.id,
				message: `Enter at most ${question.maxLength} characters.`
			});
		}
		if (question.type === "checkbox" && Array.isArray(value)) {
			if (question.minSelections !== void 0 && value.length < question.minSelections) issues.push({
				questionId: question.id,
				message: `Select at least ${question.minSelections} options.`
			});
			if (question.maxSelections !== void 0 && value.length > question.maxSelections) issues.push({
				questionId: question.id,
				message: `Select at most ${question.maxSelections} options.`
			});
		}
		if (question.type === "rating" || question.type === "scale") {
			const number = typeof value === "number" ? value : Number(value);
			if (Number.isFinite(number) && (question.min !== void 0 && number < question.min || question.max !== void 0 && number > question.max)) issues.push({
				questionId: question.id,
				message: "The selected value is out of range."
			});
		}
	}
	return issues;
}
/** Returns true when every required question has a valid answer. */
function isSurveyComplete(survey, answers) {
	return validateSurveyAnswers(survey, answers).length === 0;
}
function normalizeComparable(value) {
	if (Array.isArray(value)) return value.map((entry) => entry.trim().toLowerCase()).sort((a, b) => a.localeCompare(b));
	if (typeof value === "number") return value;
	return String(value ?? "").trim().toLowerCase();
}
/** Evaluates an answer against `question.correct`, or null when not a quiz. */
function evaluateSurveyAnswer(question, value) {
	if (question.correct === void 0) return null;
	const expected = question.correct;
	const actual = normalizeComparable(value);
	let correct = false;
	if (Array.isArray(expected)) {
		const wanted = expected.map((entry) => entry.trim().toLowerCase()).sort((a, b) => a.localeCompare(b));
		if (Array.isArray(actual)) correct = wanted.length === actual.length && wanted.every((entry, index) => entry === actual[index]);
	} else if (typeof actual === "number") {
		const wanted = Number(expected);
		correct = Number.isFinite(wanted) && actual === wanted;
	} else correct = actual === String(expected).trim().toLowerCase();
	return {
		correct,
		explanation: question.explanation ?? ""
	};
}
/** Builds the payload delivered to consumers. */
function createSurveySubmission(survey, answers, context = {}) {
	return {
		survey,
		answers,
		submittedAt: context.at ?? Date.now(),
		source: context.source ?? null,
		position: context.position ?? 0,
		duration: context.duration ?? 0,
		skipped: context.skipped ?? false,
		attempt: context.attempt ?? 0
	};
}
function storageKeyFor(survey, source, override) {
	if (override !== void 0 && override.length > 0) return override;
	if (survey.storageKey !== void 0 && survey.storageKey.length > 0) return survey.storageKey;
	return `universal-player:survey:${surveyId(survey)}:${source ?? "unknown"}`;
}
/** Creates a best-effort "already shown" store. */
function createSurveyStore(survey, source, options = {}) {
	const key = storageKeyFor(survey, source, options.key);
	const resolveStorage = () => {
		if (options.storage !== void 0) return options.storage;
		try {
			return typeof localStorage === "undefined" ? null : localStorage;
		} catch {
			return null;
		}
	};
	return {
		key,
		wasShown() {
			const storage = resolveStorage();
			if (storage === null) return false;
			try {
				return storage.getItem(key) === "1";
			} catch {
				return false;
			}
		},
		markShown() {
			const storage = resolveStorage();
			if (storage === null) return;
			try {
				storage.setItem(key, "1");
			} catch {}
		},
		clear() {
			const storage = resolveStorage();
			if (storage === null) return;
			try {
				storage.removeItem(key);
			} catch {}
		}
	};
}
export { createSurveyAnswers, createSurveyStore, createSurveySubmission, emptySurveyAnswer, evaluateSurveyAnswer, isChoiceQuestion, isRequiredQuestion, isSurveyAnswerEmpty, isSurveyComplete, normalizeSurvey, normalizeSurveyAnswers, surveyId, surveyTriggerTime, validateSurveyAnswers };

//# sourceMappingURL=survey.js.map