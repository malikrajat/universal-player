import { createSurveyAnswers, evaluateSurveyAnswer, isChoiceQuestion, isSurveyAnswerEmpty, isSurveyComplete, validateSurveyAnswers } from "../features/survey/survey.js";
// src/ui/survey-panel.ts
const OTHER_VALUE = "__up_other__";
function element(tag, className) {
	const node = document.createElement(tag);
	if (className !== void 0) node.className = className;
	return node;
}
function appendText(parent, tag, text, className) {
	const node = element(tag, className);
	node.textContent = text;
	parent.append(node);
	return node;
}
function kindLabel(survey, strings) {
	switch (survey.kind) {
		case "feedback": return strings.feedback;
		case "review": return strings.review;
		case "quiz": return strings.quiz;
		default: return strings.survey;
	}
}
function buildChoice(question, answers) {
	const wrapper = element("div", "up-choices");
	const current = answers[question.id];
	const multiple = question.type === "checkbox";
	const selected = new Set(multiple ? Array.isArray(current) ? current : [] : [typeof current === "string" ? current : ""]);
	for (const option of question.options ?? []) {
		const label = element("label", "up-choice");
		const input = element("input");
		input.type = multiple ? "checkbox" : "radio";
		input.name = question.id;
		input.value = option.value ?? option.id;
		input.checked = selected.has(input.value);
		label.append(input, appendText(element("span"), "span", option.label));
		wrapper.append(label);
	}
	const first = wrapper.querySelector("input");
	if (first !== null) first.id = question.id;
	if (question.allowOther === true) {
		const label = element("label", "up-choice");
		const input = element("input");
		input.type = multiple ? "checkbox" : "radio";
		input.name = question.id;
		input.value = OTHER_VALUE;
		input.checked = selected.has(OTHER_VALUE);
		label.append(input, appendText(element("span"), "span", question.otherLabel ?? "Other"));
		wrapper.append(label);
		const other = element("input", "up-input up-other");
		other.type = "text";
		other.placeholder = question.otherLabel ?? "Other";
		other.dataset.otherFor = question.id;
		wrapper.append(other);
	}
	return wrapper;
}
function buildSelect(question, answers) {
	const select = element("select", "up-survey-select");
	select.id = question.id;
	select.dataset.questionId = question.id;
	const blank = element("option");
	blank.value = "";
	blank.textContent = "—";
	select.append(blank);
	const current = answers[question.id];
	const value = typeof current === "string" ? current : "";
	for (const option of question.options ?? []) {
		const node = element("option");
		node.value = option.value ?? option.id;
		node.textContent = option.label;
		node.selected = node.value === value;
		select.append(node);
	}
	if (question.allowOther === true) {
		const other = element("option");
		other.value = OTHER_VALUE;
		other.textContent = question.otherLabel ?? "Other";
		other.selected = value === OTHER_VALUE;
		select.append(other);
	}
	return select;
}
function buildText(question, answers) {
	const current = answers[question.id];
	const value = typeof current === "string" ? current : "";
	if (question.type === "textarea") {
		const textarea = element("textarea", "up-input up-textarea");
		textarea.id = question.id;
		textarea.dataset.questionId = question.id;
		textarea.rows = 4;
		textarea.placeholder = question.placeholder ?? "";
		textarea.maxLength = question.maxLength ?? 2e3;
		textarea.value = value;
		return textarea;
	}
	const input = element("input", "up-input");
	input.type = "text";
	input.id = question.id;
	input.dataset.questionId = question.id;
	input.placeholder = question.placeholder ?? "";
	input.maxLength = question.maxLength ?? 500;
	input.value = value;
	return input;
}
function buildRating(question) {
	const wrapper = element("div", "up-rating");
	wrapper.id = question.id;
	wrapper.dataset.questionId = question.id;
	wrapper.setAttribute("role", "group");
	wrapper.setAttribute("aria-label", question.label);
	const max = Math.max(1, Math.min(question.max ?? 5, 10));
	const min = Math.max(0, question.min ?? 0);
	for (let value = Math.max(1, min); value <= max; value += 1) {
		const button = element("button", "up-rating-button");
		button.type = "button";
		button.dataset.ratingValue = String(value);
		button.setAttribute("aria-label", `${value} / ${max}`);
		button.setAttribute("aria-pressed", "false");
		button.textContent = "★";
		wrapper.append(button);
	}
	const output = element("output", "up-rating-value");
	output.value = "";
	wrapper.append(output);
	return wrapper;
}
function buildScale(question) {
	const wrapper = element("div", "up-scale");
	wrapper.id = question.id;
	const input = element("input", "up-range");
	input.type = "range";
	input.dataset.questionId = question.id;
	input.min = String(question.min ?? 1);
	input.max = String(question.max ?? 10);
	input.step = String(question.step ?? 1);
	input.value = input.min;
	const output = element("output", "up-scale-value");
	output.value = input.value;
	input.addEventListener("input", () => {
		output.value = input.value;
	});
	wrapper.append(input, output);
	return wrapper;
}
function buildQuestion(question, strings, answers) {
	const wrapper = element("div", "up-question");
	wrapper.dataset.questionId = question.id;
	wrapper.dataset.questionType = question.type;
	const label = element("label", "up-question-label");
	label.textContent = question.label;
	label.htmlFor = question.id;
	wrapper.append(label);
	if (question.required === true) appendText(label, "span", ` ${strings.required}`, "up-required");
	if (question.description !== void 0) appendText(wrapper, "p", question.description, "up-question-description");
	if (question.type === "radio" || question.type === "checkbox") wrapper.append(buildChoice(question, answers));
	else if (question.type === "select" || isChoiceQuestion(question)) wrapper.append(buildSelect(question, answers));
	else if (question.type === "text" || question.type === "textarea") wrapper.append(buildText(question, answers));
	else if (question.type === "rating") wrapper.append(buildRating(question));
	else if (question.type === "scale") wrapper.append(buildScale(question));
	const error = appendText(wrapper, "p", "", "up-question-error");
	error.hidden = true;
	const feedback = appendText(wrapper, "p", "", "up-question-feedback");
	feedback.hidden = true;
	return wrapper;
}
function collectAnswers(root, survey) {
	const answers = { ...createSurveyAnswers(survey) };
	for (const question of survey.questions) {
		const wrapper = root.querySelector(`.up-question[data-question-id="${question.id}"]`);
		if (wrapper === null) continue;
		if (question.type === "radio" || question.type === "checkbox") {
			const checked = Array.from(wrapper.querySelectorAll("input[type=\"radio\"]:checked, input[type=\"checkbox\"]:checked")).map((input) => input.value);
			const otherValue = wrapper.querySelector(".up-other")?.value.trim() ?? "";
			const hasOther = checked.includes(OTHER_VALUE);
			if (question.type === "checkbox") {
				const list = checked.filter((value) => value !== OTHER_VALUE);
				if (hasOther && otherValue.length > 0) list.push(otherValue);
				answers[question.id] = list;
			} else {
				const value = checked[0] ?? "";
				if (value === OTHER_VALUE) answers[question.id] = otherValue;
				else answers[question.id] = value;
			}
			continue;
		}
		if (question.type === "select") {
			const value = wrapper.querySelector("select")?.value ?? "";
			const other = wrapper.querySelector(".up-other");
			answers[question.id] = value === OTHER_VALUE ? other?.value.trim() ?? "" : value;
			continue;
		}
		if (question.type === "text" || question.type === "textarea") {
			const input = wrapper.querySelector("input, textarea");
			answers[question.id] = input?.value ?? "";
			continue;
		}
		if (question.type === "rating") {
			const pressed = wrapper.querySelector(".up-rating-button[aria-pressed=\"true\"]");
			answers[question.id] = pressed === null ? 0 : Number(pressed.dataset.ratingValue ?? 0);
			continue;
		}
		if (question.type === "scale") {
			const input = wrapper.querySelector("input[type=\"range\"]");
			answers[question.id] = input === null ? 0 : Number(input.value);
		}
	}
	return answers;
}
/** Creates the end-of-media survey overlay. */
function createSurveyPanel(handlers) {
	const overlay = element("div", "up-survey");
	overlay.hidden = true;
	overlay.setAttribute("role", "dialog");
	overlay.setAttribute("aria-modal", "true");
	overlay.setAttribute("part", "survey");
	const card = element("div", "up-survey-card");
	overlay.append(card);
	let survey = null;
	let strings = null;
	let autoSubmitTimer = null;
	let completed = false;
	const clearTimer = () => {
		if (autoSubmitTimer !== null) {
			clearTimeout(autoSubmitTimer);
			autoSubmitTimer = null;
		}
	};
	const changedQuestion = (target) => {
		if (!(target instanceof Element)) return;
		const wrapper = target.closest(".up-question");
		const id = wrapper?.dataset.questionId;
		const type = wrapper?.dataset.questionType;
		return id !== void 0 && type !== void 0 ? {
			id,
			type
		} : void 0;
	};
	const close = () => {
		handlers.onClose();
	};
	const showFeedback = (config) => {
		if (config.instantFeedback !== true) return;
		const answers = collectAnswers(card, config);
		for (const question of config.questions) {
			const feedback = card.querySelector(`.up-question[data-question-id="${question.id}"]`)?.querySelector(".up-question-feedback");
			if (feedback === null || feedback === void 0) continue;
			const value = answers[question.id];
			if (value === void 0 || isSurveyAnswerEmpty(question, value)) {
				feedback.hidden = true;
				continue;
			}
			const result = evaluateSurveyAnswer(question, value);
			if (result === null) {
				feedback.hidden = true;
				continue;
			}
			feedback.hidden = false;
			feedback.className = `up-question-feedback ${result.correct ? "up-correct" : "up-incorrect"}`;
			feedback.textContent = `${result.correct ? strings?.correct ?? "Correct" : strings?.incorrect ?? "Incorrect"}${result.explanation.length > 0 ? ` — ${result.explanation}` : ""}`;
		}
	};
	const showCompletion = (config, currentStrings) => {
		completed = true;
		clearTimer();
		overlay.hidden = false;
		card.replaceChildren();
		const header = element("div", "up-survey-completion");
		appendText(header, "span", kindLabel(config, currentStrings), "up-survey-eyebrow");
		appendText(header, "h2", config.thankYouTitle ?? currentStrings.thankYou, "up-survey-title");
		if ((config.thankYouText ?? "").length > 0) appendText(header, "p", config.thankYouText ?? "", "up-survey-description");
		const footer = element("div", "up-survey-footer");
		if (config.allowRetake === true) {
			const retake = element("button", "up-button up-survey-action up-survey-retake");
			retake.type = "button";
			retake.textContent = currentStrings.retake;
			retake.addEventListener("click", () => handlers.onRetake());
			footer.append(retake);
		}
		const done = element("button", "up-button up-survey-action up-survey-submit");
		done.type = "button";
		done.textContent = currentStrings.done;
		done.addEventListener("click", () => handlers.onDone());
		footer.append(done);
		header.append(footer);
		card.append(header);
		card.querySelector("button")?.focus();
	};
	const submit = () => {
		const config = survey;
		if (config === null || completed) return;
		clearTimer();
		const answers = collectAnswers(card, config);
		const issues = validateSurveyAnswers(config, answers);
		for (const node of card.querySelectorAll(".up-question-error")) {
			node.textContent = "";
			node.hidden = true;
		}
		if (issues.length > 0) {
			for (const issue of issues) {
				const error = card.querySelector(`.up-question[data-question-id="${issue.questionId}"]`)?.querySelector(".up-question-error");
				if (error !== null && error !== void 0) {
					error.textContent = issue.message;
					error.hidden = false;
				}
			}
			card.querySelector(".up-question-error:not([hidden])")?.scrollIntoView?.({ block: "nearest" });
			return;
		}
		const currentStrings = strings;
		if (handlers.onSubmit(answers) && config.allowRetake === true && currentStrings !== null) showCompletion(config, currentStrings);
	};
	const scheduleAutoSubmit = (changed) => {
		const config = survey;
		if (config === null || config.submitMode === "manual" || completed) return;
		if (config.submitMode === "on-select") {
			if (changed === void 0 || changed.type === "text" || changed.type === "textarea") return;
			if (changed.type === "checkbox") {
				const question = config.questions.find((entry) => entry.id === changed.id);
				const value = collectAnswers(card, config)[changed.id];
				if (question === void 0 || !Array.isArray(value) || question.maxSelections !== void 0 && value.length < question.maxSelections) return;
			}
		}
		const answers = collectAnswers(card, config);
		if (!isSurveyComplete(config, answers)) {
			clearTimer();
			return;
		}
		clearTimer();
		const delay = config.autoSubmitDelay ?? (config.instantFeedback === true ? 1200 : config.submitMode === "on-complete" ? 650 : 0);
		if (delay <= 0) {
			submit();
			return;
		}
		autoSubmitTimer = setTimeout(() => {
			autoSubmitTimer = null;
			submit();
		}, delay);
	};
	overlay.addEventListener("click", (event) => {
		if (event.target === overlay && survey?.required !== true && !completed) close();
	});
	overlay.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && survey?.required !== true && !completed) {
			event.preventDefault();
			close();
		}
	});
	const render = (next, nextStrings) => {
		survey = next;
		strings = nextStrings;
		completed = false;
		clearTimer();
		overlay.setAttribute("aria-label", next.title ?? nextStrings.survey);
		card.replaceChildren();
		const header = element("div", "up-survey-header");
		const titleWrap = element("div");
		appendText(titleWrap, "span", kindLabel(next, nextStrings), "up-survey-eyebrow");
		appendText(titleWrap, "h2", next.title ?? nextStrings.survey, "up-survey-title");
		if (next.required !== true) {
			const closeButton = element("button", "up-button up-survey-close");
			closeButton.type = "button";
			closeButton.setAttribute("aria-label", next.closeLabel ?? nextStrings.close);
			closeButton.textContent = "×";
			closeButton.addEventListener("click", close);
			header.append(titleWrap, closeButton);
		} else header.append(titleWrap);
		card.append(header);
		if (next.description !== void 0 && next.description.length > 0) appendText(card, "p", next.description, "up-survey-description");
		const form = element("form", "up-survey-form");
		form.noValidate = true;
		const answers = createSurveyAnswers(next);
		for (const question of next.questions) form.append(buildQuestion(question, nextStrings, answers));
		const footer = element("div", "up-survey-footer");
		if (next.allowSkip !== false) {
			const skip = element("button", "up-button up-survey-action up-survey-skip");
			skip.type = "button";
			skip.textContent = next.skipLabel ?? nextStrings.skip;
			skip.addEventListener("click", () => handlers.onSkip());
			footer.append(skip);
		}
		const submitButton = element("button", "up-button up-survey-action up-survey-submit");
		submitButton.type = "submit";
		submitButton.textContent = next.submitLabel ?? nextStrings.submit;
		footer.append(submitButton);
		form.append(footer);
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			submit();
		});
		card.append(form);
		form.addEventListener("input", (event) => {
			const target = event.target;
			if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) scheduleAutoSubmit(changedQuestion(target));
		});
		form.addEventListener("change", (event) => {
			showFeedback(next);
			scheduleAutoSubmit(changedQuestion(event.target));
		});
		form.addEventListener("click", (event) => {
			const target = event.target;
			if (!(target instanceof Element)) return;
			const rating = target.closest(".up-rating-button");
			if (rating !== null) {
				const wrapper = rating.closest(".up-rating");
				const output = wrapper?.querySelector(".up-rating-value");
				for (const button of wrapper?.querySelectorAll(".up-rating-button") ?? []) button.setAttribute("aria-pressed", String(button === rating));
				if (output !== null && output !== void 0) output.value = rating.dataset.ratingValue ?? "";
				showFeedback(next);
				scheduleAutoSubmit(changedQuestion(rating));
			}
		});
	};
	return {
		element: overlay,
		render(surveyConfig, playerStrings) {
			render(surveyConfig, playerStrings);
			overlay.hidden = false;
		},
		clear() {
			clearTimer();
			completed = false;
			overlay.hidden = true;
			card.replaceChildren();
			survey = null;
			strings = null;
		},
		focus() {
			card.querySelector("input, select, textarea, button")?.focus();
		}
	};
}
export { createSurveyPanel };

//# sourceMappingURL=survey-panel.js.map