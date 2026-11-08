// src/features/survey/presets.ts
/**
* Ready-to-use end-of-media survey examples.
*
* Every preset is a plain {@link SurveyConfig}; spread it and override any
* field, or use it directly inside `PlayerOptions.survey`, source metadata or
* the `survey` JSON attribute.
*/
/** A short CSAT form shown after the media ends. */
function endOfVideoFeedback(overrides = {}) {
	return {
		id: "end-of-video-feedback",
		kind: "feedback",
		title: "How was the video?",
		description: "Your feedback helps us make the next one better.",
		trigger: "ended",
		once: true,
		allowSkip: true,
		submitMode: "manual",
		questions: [
			{
				id: "rating",
				type: "rating",
				label: "Rate your overall experience",
				max: 5,
				required: true
			},
			{
				id: "topics",
				type: "checkbox",
				label: "What should we cover next?",
				maxSelections: 3,
				allowOther: true,
				otherLabel: "Another topic",
				options: [
					{
						id: "api",
						label: "API design"
					},
					{
						id: "ui",
						label: "UI patterns"
					},
					{
						id: "performance",
						label: "Performance"
					},
					{
						id: "testing",
						label: "Testing"
					}
				]
			},
			{
				id: "comment",
				type: "textarea",
				label: "Anything else?",
				placeholder: "Optional comment…",
				maxLength: 500
			}
		],
		...overrides
	};
}
/** A standard 0–10 Net Promoter Score question. */
function netPromoterScore(overrides = {}) {
	return {
		id: "nps",
		kind: "survey",
		title: "How likely are you to recommend this?",
		description: "0 means not at all likely, 10 means extremely likely.",
		trigger: "ended",
		once: true,
		allowSkip: true,
		questions: [{
			id: "score",
			type: "scale",
			label: "Your score",
			min: 0,
			max: 10,
			step: 1,
			required: true
		}, {
			id: "reason",
			type: "textarea",
			label: "What is the main reason for your score?",
			placeholder: "Optional, but very useful…",
			maxLength: 400
		}],
		...overrides
	};
}
/** A content-quality feedback form with a single-choice follow-up. */
function contentFeedback(overrides = {}) {
	return {
		id: "content-feedback",
		kind: "feedback",
		title: "Did this answer your question?",
		trigger: "ended",
		once: true,
		allowSkip: true,
		submitMode: "on-select",
		questions: [{
			id: "helpful",
			type: "radio",
			label: "Was this helpful?",
			required: true,
			autoSubmit: true,
			options: [
				{
					id: "yes",
					label: "Yes"
				},
				{
					id: "somewhat",
					label: "Somewhat"
				},
				{
					id: "no",
					label: "No"
				}
			]
		}, {
			id: "missing",
			type: "text",
			label: "What was missing?",
			placeholder: "One line is enough",
			maxLength: 200
		}],
		...overrides
	};
}
/** A blocking review that must be completed before the player can continue. */
function blockingReview(overrides = {}) {
	return {
		id: "blocking-review",
		kind: "review",
		title: "Before you continue",
		description: "Please confirm the key points from this module.",
		trigger: "ended",
		once: false,
		allowSkip: false,
		required: true,
		blocking: true,
		submitMode: "manual",
		allowRetake: true,
		maxAttempts: 2,
		questions: [{
			id: "watched",
			type: "checkbox",
			label: "What did you learn?",
			required: true,
			minSelections: 1,
			options: [
				{
					id: "first",
					label: "The first concept"
				},
				{
					id: "second",
					label: "The second concept"
				},
				{
					id: "third",
					label: "The third concept"
				}
			]
		}, {
			id: "notes",
			type: "textarea",
			label: "Your notes",
			required: true,
			minLength: 20,
			maxLength: 800
		}],
		...overrides
	};
}
/** A quiz with instant correct/incorrect feedback. */
function quizFeedback(overrides = {}) {
	return {
		id: "knowledge-check",
		kind: "quiz",
		title: "Quick knowledge check",
		trigger: "ended",
		once: false,
		allowSkip: false,
		submitMode: "on-select",
		instantFeedback: true,
		questions: [{
			id: "answer",
			type: "radio",
			label: "Which answer is correct?",
			required: true,
			correct: "b",
			explanation: "Option B is correct because it matches the lesson.",
			options: [
				{
					id: "a",
					label: "Option A"
				},
				{
					id: "b",
					label: "Option B"
				},
				{
					id: "c",
					label: "Option C"
				}
			]
		}],
		...overrides
	};
}
/** All built-in survey presets, keyed for docs and demos. */
const SURVEY_PRESETS = {
	endOfVideoFeedback,
	netPromoterScore,
	contentFeedback,
	blockingReview,
	quizFeedback
};
export { SURVEY_PRESETS, blockingReview, contentFeedback, endOfVideoFeedback, netPromoterScore, quizFeedback };

//# sourceMappingURL=presets.js.map