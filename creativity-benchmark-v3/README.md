# Creative Direction Benchmark v3.1

This benchmark retests whether a model can originate a distinctive website concept from a novice-level brief after the Creative Direction Engine and Reference Loading Contract redesign.

The two conditions differ by one creative-pressure cue:

- `01-neutral`: asks for a plan.
- `02-ambition-prime`: asks for the most ambitious plan the model can imagine.

Everything else is held constant. Every run contains a frozen, byte-identical copy of Creative Web Development 3.1. The standalone Story Engineer is deliberately excluded because its evidence-rich workflow is already canonical inside the Creative Web Development references.

## Run protocol

1. Start each run in a fresh conversation with its working directory set to the model-specific condition folder under `runs/`.
2. Use the same model settings, system instructions, tools, and time allowance for both conditions.
3. Send only the contents of that folder's `prompt.md` as the user prompt.
4. Do not provide the example prompts, evaluation rubric, another model's output, or follow-up coaching.
5. Require the Reference Receipt mandated by the skill; a missing or false receipt is a protocol failure.
6. Save the complete response inside only that model's run folder and update `RUN-METADATA.md` outside the model-facing directories.
7. For the first direct pre/post comparison, one run per condition reproduces the original sample. Run at least three times per condition before making stable model claims.
8. Anonymize and shuffle responses before scoring them with `EVALUATION.md`.

Each model-condition pair has a separate folder. Templates are never used as working directories.

## What this experiment can tell us

- Differences between models under `01-neutral` indicate baseline creative-direction ability.
- A model's change from `01-neutral` to `02-ambition-prime` indicates sensitivity to creative-pressure prompting.
- Repeated convergence on the skill's example motifs indicates skill anchoring rather than original discernment.
- Strong prose without a governing concept, necessary interactions, or disciplined exclusions is not a strong creative plan.

This is an ideation benchmark, not an implementation benchmark. Building the sites would test a different capability.
