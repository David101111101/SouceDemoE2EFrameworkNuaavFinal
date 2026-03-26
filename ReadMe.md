# SauceDemo Playwright Automation Suite

## Overview

This repository contains an end-to-end UI automation framework built with **Playwright and TypeScript** targeting the public SauceDemo application.

The objective of this suite is to demonstrate:

* scalable Page Object Model architecture
* deterministic test isolation and parallel execution
* stable selector and navigation strategies
* maintainable TypeScript design
* pragmatic use of AI tooling within an engineering workflow

The framework prioritises **reliability, clarity, and reproducibility** in a public test environment.

---

## Prerequisites

* Node.js **≥ 18**
* npm

Install dependencies and required browsers:

```bash
npm install
npx playwright install --with-deps
```

---

## Running the Test Suite

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/e2e/checkout-flow.spec.ts
```

Optional stability check:
I checked up to 20 for flakiness

```bash
npx playwright test --repeat-each=5
```

---

## Viewing the Test Report

After execution, open the Playwright HTML report:

```bash
npx playwright show-report
```

Execution artifacts such as screenshots and traces are stored in:

```
test-results/
```

These files are intentionally excluded from version control because they are transient diagnostic outputs that change on every run.

---

## Framework Design Decisions

### Test Isolation and Authentication Strategy

The suite is designed as a **fully parallel, stateless execution model**.

* Authentication state is generated once during global setup
* Each worker creates an isolated browser context from the saved state
* Authentication tests explicitly override this state when validating negative scenarios

This approach reduces execution time while maintaining deterministic test independence.

### Page Object Model

Page Objects are organised around **user capabilities** rather than DOM structure.

Implemented abstractions:

* LoginPage
* InventoryPage
* CartPage
* CheckoutInfoPage
* CheckoutOverviewPage
* HeaderComponent

Interaction logic is encapsulated inside Page Objects, while assertions remain in test specifications.
Selectors prioritise stable attributes such as `data-test` and `id`.

### Parallel Execution Strategy

* `fullyParallel` execution enabled
* multi-browser coverage: Chromium and Firefox

This configuration reflects realistic CI behaviour while balancing execution speed and debugging clarity.

### Stability Trade-offs

Because SauceDemo is a publicly hosted demo application with variable response times:

* conservative timeout thresholds were applied
* explicit readiness waits were implemented
* traces and screenshots are retained on failure

These decisions prioritise **signal reliability over aggressive timing assumptions.**

---

## Observability Insight (Optional Performance Note)

Repeated executions showed consistently slower and more variable load behaviour in Firefox compared to Chromium.
This illustrates how the automation suite can support performance-aware quality analysis, although functional reliability was prioritised for this exercise.

---

## LLM Usage

AI tools were used as **engineering assistants for architectural reasoning and risk analysis**, not as direct code end to end generators my background in backend development thrives through curiosity and adaptation.

Prompts and examples of how generated suggestions were reviewed and validated are documented in:

```
llm-prompts.md
```

This reflects a deliberate workflow where AI output is critically assessed before integration.

---

## Repository Structure

```
tests/
pages/
fixtures/
test-data/
utils/
global.setup.ts
playwright.config.ts
```

This structure separates domain abstractions and supports maintainable long-term evolution of the suite.
