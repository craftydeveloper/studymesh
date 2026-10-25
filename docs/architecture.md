# Architecture

## Boundaries

The domain layer owns validation and project-specific deterministic logic. The repository interface isolates persistence. HTTP handlers translate requests into service calls and map known domain errors to safe responses.

## Project-specific core

StudyMesh demonstrates privacy-aware analysis using synthetic data: cohort summaries are suppressed below a configurable minimum cell size. It is designed to expose the limits of aggregation clearly, not to claim that a threshold alone guarantees privacy.

## Deliberate limitations

The included server uses an in-memory repository and has no authentication. It is suitable for local exploration and tests only. A production deployment needs durable transactional storage, access control, request limits, observability, and a documented threat model.
