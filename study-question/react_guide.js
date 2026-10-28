// React — extra questions from the docx study guides in "Study resources Questions" (deduplicated against react_data.js / react_advanced.js).
// Appended to PREP_DATA so saved "known" ids stay stable. The renderer groups them under their category.
PREP_DATA.push(...[

{ cat:"Props & State", q:"What is one-way data flow and why does it matter?",
  a:["Data flows **down** from parent to child via **props**",
     "Children send changes **up** via **callbacks** (or dispatch actions)",
     "One clear **owner** for each piece of state → easy to trace bugs",
     "Predictable rendering and simpler debugging vs two-way binding"],
  code:`function Page() {
  const [selected, setSelected] = useState(null);
  return <List onSelect={setSelected} selected={selected} />; // down: data, up: callback
}` },

{ cat:"Data Fetching", q:"How do you handle race conditions when fetching data?",
  a:["Problem: a **slow old request** finishes after a newer one → shows **stale data**",
     "Cancel obsolete requests with **AbortController** in the effect cleanup",
     "Or ignore results with an `ignore` / `cancelled` flag",
     "Libraries (**TanStack Query**, SWR, RTK Query) handle this via query keys",
     "Show loading/error state tied to the **current** request"],
  code:`useEffect(() => {
  const ctrl = new AbortController();
  fetch(\`/api/facility/\${id}\`, { signal: ctrl.signal })
    .then(r => r.json()).then(setData)
    .catch(e => { if (e.name !== 'AbortError') setError(e); });
  return () => ctrl.abort();   // cancels when id changes / unmount
}, [id]);` },

{ cat:"Testing", q:"What is the difference between unit, integration and end-to-end tests?",
  a:["**Unit** – one small isolated piece (pure function, reducer, hook) → fast, precise",
     "**Integration** – several pieces together (component + hook + mocked API)",
     "**E2E** – real browser, full app flow (**Playwright**, Cypress) → slowest, most realistic",
     "Testing pyramid / trophy: many unit & integration, **few E2E** for critical journeys"] },

{ cat:"Testing", q:"What is Jest and how does it work with React?",
  a:["JavaScript **test runner + assertion + mocking** framework",
     "Runs tests in Node with **jsdom** (simulated browser DOM)",
     "Features: `describe`/`it`, `expect` matchers, `jest.fn()`, `jest.mock()`, coverage, watch mode",
     "Used with **React Testing Library** to render and query components",
     "**Vitest** is a fast, Jest-compatible alternative for Vite projects"] },

{ cat:"Testing", q:"How do you test asynchronous behavior in React?",
  a:["Use `async` tests and **`findBy*`** queries (wait for element to appear)",
     "`waitFor(() => expect(...))` for assertions that become true later",
     "Mock network with **MSW** or `jest.mock`; use `userEvent` (async) for interactions",
     "Fake timers (`jest.useFakeTimers()`) for debounce/timeouts"],
  code:`test('shows users', async () => {
  render(<Users />);
  expect(await screen.findByText('Ann')).toBeInTheDocument();
});` },

{ cat:"Testing", q:"What is snapshot testing and when is it useful?",
  a:["Saves the rendered output to a file; later runs **compare** against it",
     "Catches **unexpected UI changes**",
     "Downsides: large snapshots get **blindly updated**, test implementation not behavior",
     "Use **small, targeted** snapshots; prefer behavior-based assertions"] },

{ cat:"Testing", q:"How do you mock APIs or components in React tests?",
  a:["`jest.mock('./api')` to replace a module; `jest.fn()` / `mockResolvedValue` for responses",
     "**MSW (Mock Service Worker)** – intercept real HTTP calls at network level (preferred, realistic)",
     "Mock heavy child components (charts, maps) to isolate the unit",
     "Wrap with test providers (router, query client, store)"],
  code:`jest.mock('./api');
api.getUser.mockResolvedValue({ name: 'Ann' });` },

{ cat:"Security & Best Practices", q:"How do you secure a React application?",
  a:["Treat the browser as **untrusted** — enforce **authorization in the API**, not just by hiding buttons",
     "Use a proven **OAuth 2.0 / OIDC** flow (Auth Code + PKCE, e.g. MSAL / Entra ID)",
     "Avoid storing tokens in localStorage if possible (XSS risk) → prefer **BFF / httpOnly cookies**",
     "Avoid `dangerouslySetInnerHTML`; sanitize with DOMPurify if needed",
     "**CSP** headers, HTTPS, dependency scanning, no secrets in front-end code"] },

{ cat:"Security & Best Practices", q:"How do you maintain code quality on a React team?",
  a:["**TypeScript** + ESLint (incl. hooks rules) + Prettier",
     "Small, focused components and **small PRs**",
     "**Code reviews** with agreed conventions and architecture boundaries",
     "Automated tests + **CI quality gates** (lint, type-check, tests, build)",
     "Shared design system, documented patterns, coaching on the *why*"] },

{ cat:"Data Fetching", q:"How do you integrate React with an ASP.NET Core API?",
  a:["Define a clear **REST API contract** (OpenAPI/Swagger)",
     "Generate or maintain **typed TypeScript models** from the contract",
     "Centralize HTTP concerns in an **API client**: auth token, error mapping, cancellation, correlation IDs",
     "Use a query library for caching/invalidation",
     "API owns **business rules & data access**; React owns the UI",
     "Configure **CORS** (or same-origin via reverse proxy/BFF)"] },

// ───────────── Senior & Behavioral ─────────────
{ cat:"Senior & Behavioral", q:"Tell us about a React modernization project you worked on.",
  a:["**Situation** – legacy app (e.g. Django + jQuery) hard to maintain",
     "**Task** – modernize to **React + ASP.NET Core APIs** without disrupting users",
     "**Action** – identify critical behaviors, migrate **incrementally** (strangler approach), add tests & telemetry, reusable components",
     "**Result** – maintainable UI, faster delivery, better performance & reliability"],
  tip:"Your story: Enbridge **Leak Detection Alarm Manager** — Django/jQuery → React + ASP.NET Core. Use STAR: Situation, Task, Action, Result." },

{ cat:"Senior & Behavioral", q:"Tell us about a difficult React performance issue and how you solved it.",
  a:["**Measure first** – reproduce with realistic data; React Profiler + browser DevTools",
     "Trace the **full request**: renders, list size, derived calculations, payload size, API & DB timing",
     "Fix the real bottleneck: **virtualize** big lists, scope/batch frequent updates, memoize expensive work, optimize API query",
     "Verify improvement with numbers"],
  tip:"Example: alarm screen with large list + frequent live updates → virtualized rows, batched updates, optimized API/Oracle query." },

{ cat:"Senior & Behavioral", q:"How do you balance reusable components with over-engineering?",
  a:["Extract when there's **real repetition** or a stable design pattern (rule of three)",
     "Not just because two screens look similar today",
     "Keep business-specific components **inside their feature**",
     "Good shared candidates: form controls, status badges, error summaries, accessible modals"] },

{ cat:"Senior & Behavioral", q:"How do you review a React pull request?",
  a:["Does it meet the **requirement** and fit the **architecture**?",
     "Correctness: state ownership, effects & dependencies, error/loading paths",
     "**Accessibility, security, performance**",
     "Tests included and meaningful",
     "Readability & naming; API contract / deployment impact",
     "Be constructive: explain the *why*, separate blocking vs nit"] },

{ cat:"Senior & Behavioral", q:"How do you handle changing requirements during a sprint?",
  a:["**Clarify** what changed and why",
     "**Assess impact** across UI, API, data, tests and deployment",
     "Bring **options** to the product owner: reduce scope, split the story, or move to next sprint",
     "Keep the sprint goal visible; use **feature flags** / thin vertical slices",
     "Communicate trade-offs transparently"] },

{ cat:"Senior & Behavioral", q:"What would you improve in an existing React codebase in your first month?",
  a:["First **learn** the product, users and delivery pressures — no big rewrite",
     "Review architecture, CI pipeline, runtime errors, a11y, test coverage, dependency health, performance data",
     "Pick **low-risk, high-value** wins: centralize API error handling, fix unstable effects, add tests to a critical flow, improve CI checks, cut a large bundle",
     "Agree on priorities with the team"] }

]);
