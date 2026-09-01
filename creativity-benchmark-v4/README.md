# Creative Direction Benchmark v4

This final paired retest isolates Creative Web Development 3.2 against the completed v3.1 benchmark.

The prompts, model settings, and model-facing `AGENTS.md` instructions remain byte-identical to v3. The only experimental change is the skill snapshot, which adds:

- point-of-use Fact Trace;
- a plan-only deliverable boundary;
- a final receipt-contradiction audit;
- calibrated candidate self-evaluation.

## Run protocol

1. Start every run in a fresh conversation with its working directory set to the exact model-condition folder under `runs/`.
2. Use the same model settings, system instructions, tools, and time allowance as v3.
3. Send only the contents of that folder's `prompt.md`.
4. Do not provide prior outputs, example prompts, the evaluation rubric, or follow-up coaching.
5. Save the complete response inside only that run folder.
6. Update `RUN-METADATA.md` outside the model-facing folders.
7. Anonymize and shuffle responses before scoring with `EVALUATION.md`.

The standalone Story Engineer remains excluded. Creative Web Development contains the canonical evidence-rich story route, and this benchmark tests sparse greenfield direction.

One run per condition supports a direct v3.1-to-v3.2 diagnostic comparison. It does not establish a stable model-level claim without repeated runs.
