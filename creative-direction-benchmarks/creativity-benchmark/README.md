# Creative Direction Benchmark

This benchmark tests whether a model can originate a distinctive website concept from a novice-level brief while using the same Creative Web Development skill.

The two conditions differ by one creative-pressure cue:

- `01-neutral`: asks for a plan.
- `02-ambition-prime`: asks for the most ambitious plan the model can imagine.

Everything else is held constant. The skill copies are frozen and identical.

## Run protocol

1. Start each run in a fresh conversation with its working directory set to the condition folder.
2. Use the same model settings, system instructions, tools, and time allowance for both conditions.
3. Send only the contents of that folder's `prompt.md` as the user prompt.
4. Do not provide the example prompts, evaluation rubric, another model's output, or follow-up coaching.
5. Save the complete response with the model name, exact version, condition, date, and run number.
6. Run each model at least three times per condition. One response can reflect sampling luck more than stable capability.
7. Anonymize and shuffle responses before scoring them with `EVALUATION.md`.

The model-facing folders instruct the agent to stay inside its folder. Keep completed outputs elsewhere so later runs cannot inspect them.

## What this experiment can tell us

- Differences between models under `01-neutral` indicate baseline creative-direction ability.
- A model's change from `01-neutral` to `02-ambition-prime` indicates sensitivity to creative-pressure prompting.
- Repeated convergence on the skill's example motifs indicates skill anchoring rather than original discernment.
- Strong prose without a governing concept, necessary interactions, or disciplined exclusions is not a strong creative plan.

This is an ideation benchmark, not an implementation benchmark. Building the sites would test a different capability.
