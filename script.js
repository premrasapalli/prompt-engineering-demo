const goalInput = document.querySelector("#goal");
const audienceInput = document.querySelector("#audience");
const constraintsInput = document.querySelector("#constraints");
const promptOutput = document.querySelector("#promptOutput");
const copyButton = document.querySelector("#copyPrompt");
const copyStatus = document.querySelector("#copyStatus");
const techniqueButtons = document.querySelectorAll(".technique");

let activeMode = "zero-shot";

const templates = {
  "zero-shot": ({ goal, audience, constraints }) => `You are an expert AI trainer.

Task:
${goal}

Audience:
${audience}

Constraints:
${constraints}

Return the answer in a clear, practical format.`,

  "few-shot": ({ goal, audience, constraints }) => `You are an expert AI trainer.

Task:
${goal}

Audience:
${audience}

Constraints:
${constraints}

Use the examples below to match the expected style.

Example 1:
Input: Explain a technical idea to beginners.
Output: Start with a plain-language definition, then give a workplace example.

Example 2:
Input: Compare two AI techniques.
Output: Use a short table, then recommend when to use each one.

Now complete the task.`,

  structured: ({ goal, audience, constraints }) => `Role:
Act as an expert AI trainer.

Goal:
${goal}

Context:
The reader is ${audience}.

Requirements:
${constraints}

Output format:
1. One-sentence definition
2. Four practical benefits
3. Two prompting techniques
4. One example prompt`
};

function getPromptParts() {
  return {
    goal: goalInput.value.trim() || "Explain prompt engineering.",
    audience: audienceInput.value.trim() || "beginners",
    constraints: constraintsInput.value.trim() || "be concise"
  };
}

function renderPrompt() {
  promptOutput.textContent = templates[activeMode](getPromptParts());
  copyStatus.textContent = "";
}

techniqueButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeMode = button.dataset.mode;
    techniqueButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderPrompt();
  });
});

[goalInput, audienceInput, constraintsInput].forEach((input) => {
  input.addEventListener("input", renderPrompt);
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(promptOutput.textContent);
    copyStatus.textContent = "Prompt copied.";
  } catch {
    copyStatus.textContent = "Select the prompt text to copy it.";
  }
});

renderPrompt();
