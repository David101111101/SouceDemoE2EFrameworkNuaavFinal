SauceDemo Playwright Automation Suite

Overview

This repository contains an AI assisted end-to-end QA/UI automation framework built with Playwright and TypeScript targeting the public SauceDemo application.

The framework was designed to demonstrate how a modern UI automation suite can be engineered with:

- deterministic execution behavior
- scalable parallel architecture
- maintainable abstraction layers
- stable selector strategies
- CI-ready configuration discipline
- pragmatic integration of AI-assisted engineering workflows

The objective is not only functional validation, but also to illustrate automation architecture reasoning and long-term maintainability considerations.

---

 Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node.js)

Verify installation:

node -v
npm -v

---

Install dependencies and required browsers:

npm install
npx playwright install --with-deps

---

Running the Test Suite

Execute the full test suite:

npx playwright test

Optional repeat execution to observe stability behavior:

npx playwright test --repeat-each=5

---

Viewing the Test Report

After execution, open the Playwright HTML report:

npx playwright show-report

Execution artefacts such as traces and screenshots are generated in:

test-results/

These outputs are intentionally excluded from version control because they are transient diagnostic data.

---

Framework Architecture Decisions

Deterministic Test Isolation and Authentication Strategy

The suite follows a fully parallel, stateless execution model:

- Authentication state is generated once during global setup.
- Each worker creates an isolated browser context using the persisted storage state.
- Negative authentication scenarios explicitly override the stored state.

This design:

- reduces execution time
- preserves test independence
- avoids inter-test coupling
- reflects realistic CI execution patterns

Stable selectors rely on explicit application contracts:

await this.page.waitForSelector('[data-test="inventory-container"]');

---

Page Object Model Design

Page Objects are organized around user capabilities rather than DOM structure, enabling clearer intent modelling and easier long-term evolution.

Implemented abstractions include:

- LoginPage
- InventoryPage
- CartPage
- CheckoutInfoPage
- CheckoutOverviewPage
- HeaderComponent

Interaction logic is encapsulated inside Page Objects, while assertions remain within test specifications to preserve separation of concerns.

---

Parallel Execution Configuration

The framework is configured for:

- full parallel test execution
- multi-browser coverage (Chromium and Firefox)

This configuration mirrors typical CI pipelines while maintaining a balance between execution speed and debuggability.

---

Stability Trade-offs

Because SauceDemo is a publicly hosted demo environment with variable performance characteristics:

- conservative timeout thresholds were applied
- explicit readiness waits were introduced
- traces and screenshots are retained on failure

These decisions prioritize signal reliability over aggressive execution timing assumptions.

---

Observability Insight

Repeated executions indicated consistently slower and more variable loading behavior in Firefox compared to Chromium.

Although functional validation remains the primary objective, the framework demonstrates how automation suites can also surface performance-related quality signals.

---

LLM-Assisted Engineering Workflow

AI tooling was used as a technical reasoning assistant during architecture design and risk evaluation.

Generated suggestions were critically reviewed and manually implemented.

Prompt strategy and collaboration examples are documented in:

llm-prompts.md

This reflects a deliberate engineering workflow where automation design decisions remain human-driven and auditable.

---

Authentication Lifecycle

flowchart TD
	A[Test run starts] --> B[Global setup launches browser]
	B --> C[Login with standard user]
	C --> D[Wait for inventory readiness]
	D --> E[Persist storage state file]
	E --> F[Config sets default storageState]

	F --> G{Worker starts a test}
	G --> H[Create isolated context from saved state]
	H --> I[Test begins authenticated]
	I --> G

	G --> J{Negative auth scenario?}
	J -- Yes --> K[Override with empty storage state]
	K --> L[Open login page and submit credentials]
	L --> M[Assert locked-out error message]

	J -- No --> N[Continue authenticated test flow]

---

Checkout Happy Path Journey

flowchart LR
	A[Inventory page loaded] --> B[Add Sauce Labs Backpack]
	B --> C[Open cart from header]
	C --> D[Cart page starts checkout]
	D --> E[Checkout info entered]
	E --> F[Continue to overview]
	F --> G[Finish order]
	G --> H[Confirmation is visible]

	subgraph Journey_Pages[Pages Traversed]
		A
		D
		E
		F
		G
		H
	end

---

This structure deliberately separates domain abstractions and execution concerns, enabling the suite to scale and evolve without introducing architectural debt.
