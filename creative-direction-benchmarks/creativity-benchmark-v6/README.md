# New-model creative direction benchmark

This suite tests one new model against the same two laundromat prompts used for Gemini 3.7 Flash High and GPT 5.6 Sol Medium.

Each run contains the full multi-file Creative Web Development 3.2 package. It does not contain the portable single-file edition or the standalone Story Engineer skill.

## Run protocol

1. Start each condition in a fresh conversation.
2. Set the working directory to the exact condition folder under `runs/new-model/`.
3. Keep the model, reasoning setting, system instructions, tools, and time allowance identical across both conditions.
4. Send only that condition's `prompt.md` as the user prompt.
5. Do not provide earlier model outputs, example prompts, the evaluation rubric, or follow-up coaching.
6. Save the complete response inside its condition folder.
7. Record the exact model identity and settings in `RUN-METADATA.md` after the runs.

Use `EVALUATION.md` only after both responses are complete.
