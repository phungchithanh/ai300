// Advanced React study questions (senior / lead level).
// Appended to PREP_DATA so existing question numbers (and saved "known" progress) stay stable.
PREP_DATA.push(...[

// ───────────── Advanced: Fiber & Concurrency ─────────────
{ cat:"Advanced: Fiber & Concurrency", q:"How does Fiber work internally (current vs work-in-progress tree)?",
  a:["Each component/element is a **fiber node** (type, props, state, child/sibling/return pointers)",
     "React keeps **two trees**: `current` (on screen) and `workInProgress` (being built)",
     "**Double buffering**: after commit, workInProgress becomes current (pointer swap)",
     "Work is a **loop over fibers** (`beginWork` / `completeWork`) → can **pause & resume**",
     "Effects are collected as **flags** and applied in the commit phase"],
  tip:"Two trees + linked-list traversal = interruptible rendering." },

{ cat:"Advanced: Fiber & Concurrency", q:"What are Lanes and how does React prioritize updates?",
  a:["**Lanes** = bitmask priorities assigned to each update",
     "`SyncLane` (discrete events like click/typing) > `InputContinuous` (scroll/drag) > `Default` > `Transition` > `Idle`",
     "Higher-priority work can **interrupt** lower-priority renders",
     "Updates in the same lane are **batched** together",
     "Transitions can be **abandoned** if new data makes them stale"] },

{ cat:"Advanced: Fiber & Concurrency", q:"How does time slicing in concurrent rendering work?",
  a:["The **Scheduler** runs render work in small chunks (~**5 ms**)",
     "After each chunk it checks `shouldYield()` → gives the browser time to paint & handle input",
     "Uses **MessageChannel** to schedule the next chunk",
     "Only applies to **concurrent** updates (transitions, deferred values); sync updates are not sliced",
     "Commit phase is **always synchronous**"] },

{ cat:"Advanced: Fiber & Concurrency", q:"What is tearing and how does useSyncExternalStore solve it?",
  a:["**Tearing**: in concurrent rendering, parts of the UI show **different versions** of an external store value",
     "Happens when an external mutable store changes **mid-render**",
     "`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` forces a **consistent snapshot**",
     "Used internally by Redux, Zustand, etc.",
     "`getSnapshot` must return a **cached/immutable** value (same reference if unchanged)"],
  code:`function useOnlineStatus() {
  return useSyncExternalStore(
    cb => { addEventListener('online', cb); addEventListener('offline', cb);
            return () => { removeEventListener('online', cb); removeEventListener('offline', cb); }; },
    () => navigator.onLine,
    () => true
  );
}` },

{ cat:"Advanced: Fiber & Concurrency", q:"startTransition vs setTimeout vs debounce — what's the difference?",
  a:["`setTimeout` **delays** the update; the render still **blocks** the main thread when it runs",
     "**Debounce** reduces the **number** of updates but each render is still blocking",
     "`startTransition` renders **immediately but interruptibly** — urgent input can cut in",
     "Transitions also keep **old UI visible** (no Suspense fallback flash) with `isPending`",
     "Combine: debounce network calls + transition for heavy rendering"] },

{ cat:"Advanced: Fiber & Concurrency", q:"What is flushSync and when would you use it?",
  a:["Forces React to **apply updates synchronously** and flush the DOM immediately",
     "Opt-out of automatic batching",
     "Use case: need DOM updated **right now** (e.g. scroll to a newly added item, third-party integration)",
     "Hurts performance — use rarely"],
  code:`flushSync(() => setItems([...items, newItem]));
listRef.current.lastChild.scrollIntoView();` },

// ───────────── Advanced: Hooks Internals ─────────────
{ cat:"Advanced: Hooks Internals", q:"How are hooks stored internally and why does call order matter?",
  a:["Hooks are stored as a **linked list** on the component's **fiber** (`memoizedState`)",
     "Each hook call reads the **next node** in the list",
     "No names/keys — React relies purely on **call order**",
     "Conditional hook calls shift the list → state gets **mismatched** → bugs/errors",
     "Mount uses `mountState`, updates use `updateState` dispatcher"] },

{ cat:"Advanced: Hooks Internals", q:"How does React decide whether to bail out of a state update?",
  a:["Setter compares new value with current using **`Object.is`**",
     "Equal → React may **skip rendering** children and effects (eager bailout)",
     "It might still render the component **once** before bailing out",
     "Hence: mutating objects and setting the same reference = **no update**"] },

{ cat:"Advanced: Hooks Internals", q:"What is useEffectEvent and what problem does it solve?",
  a:["Extracts **non-reactive logic** from effects (experimental / canary)",
     "The event function always sees **latest props/state** but is **not a dependency**",
     "Solves: effect re-running because of values that should only be **read**, not reacted to",
     "Workaround today: store latest value in a **ref**"],
  code:`const onConnected = useEffectEvent(() => showToast(theme)); // theme not a dep
useEffect(() => {
  const c = connect(roomId);
  c.on('connected', onConnected);
  return () => c.disconnect();
}, [roomId]);` },

{ cat:"Advanced: Hooks Internals", q:"What is useInsertionEffect?",
  a:["Fires **before** any layout effects and DOM reads",
     "Designed for **CSS-in-JS libraries** to inject `<style>` tags",
     "Avoids layout thrashing from style recalculation",
     "Can't update state or access refs; app code rarely needs it"] },

{ cat:"Advanced: Hooks Internals", q:"\"You might not need an effect\" — what are common effect anti-patterns?",
  a:["**Deriving state** in an effect → compute during render instead",
     "**Resetting state when a prop changes** → use a `key` instead",
     "**Responding to user events** in an effect → do it in the **event handler**",
     "**Chaining effects** that set state → compute in one place / event handler",
     "**Notifying parent** via effect → call callback in event handler",
     "Effects are for **synchronizing with external systems** only"],
  tip:"If it's caused by a user action → event handler. If it's caused by rendering → effect." },

// ───────────── Advanced: Reconciliation & State ─────────────
{ cat:"Advanced: Reconciliation & State", q:"How does React preserve or reset component state?",
  a:["State is tied to the component's **position in the tree**, not the component itself",
     "Same type at the same position → **state preserved**",
     "Different type at the position → **state reset** (subtree remounted)",
     "Changing the **`key`** → forces reset",
     "Pitfall: `{isA ? <Form/> : <Form/>}` keeps state; add different keys to reset"],
  code:`<Profile key={userId} userId={userId} />  // resets all state when user changes` },

{ cat:"Advanced: Reconciliation & State", q:"What is state colocation and why does it matter?",
  a:["Keep state **as close as possible** to where it's used",
     "State high in the tree → **re-renders large subtrees**",
     "Move state **down** into the component that needs it, or extract the stateful part",
     "Lift up only when siblings truly share it",
     "Often a better fix than `memo`"] },

{ cat:"Advanced: Reconciliation & State", q:"How does the 'children as props' composition trick prevent re-renders?",
  a:["Elements passed as `children` are created by the **parent's parent**",
     "When the wrapper's state changes, `children` is the **same element reference** → React skips re-rendering it",
     "Lets you isolate fast-changing state (scroll, mouse position) without memo"],
  code:`function ScrollTracker({ children }) {
  const [y, setY] = useState(0);   // changes often
  return <div onScroll={e => setY(e.currentTarget.scrollTop)}>{children}</div>;
}
<ScrollTracker><ExpensiveTree /></ScrollTracker>  // ExpensiveTree not re-rendered` },

{ cat:"Advanced: Reconciliation & State", q:"How do you avoid context causing too many re-renders?",
  a:["**Split** contexts: state vs dispatch, or by domain",
     "**Memoize** the provider value with `useMemo`",
     "Put frequently changing values in a **separate** context",
     "Use **selector-based** stores (Zustand, Redux, `use-context-selector`) for fine-grained subscriptions",
     "Wrap children in `React.memo` where needed"] },

{ cat:"Advanced: Reconciliation & State", q:"When would you use a state machine (XState / reducer) in React?",
  a:["UI with **many explicit states**: idle → loading → success/error, multi-step wizards, media players",
     "Prevents **impossible states** (e.g. `isLoading && isError`)",
     "Use a discriminated union `status` in `useReducer`, or **XState** for complex flows",
     "Makes transitions explicit & testable"] },

// ───────────── Advanced: Server Components & SSR ─────────────
{ cat:"Advanced: Server Components & SSR", q:"How do Server and Client Components work together?",
  a:["Server Components render on server → output the **RSC payload** (Flight format), not HTML",
     "`'use client'` marks a **boundary**: that module and its imports become client code",
     "Server → Client props must be **serializable** (no functions, except Server Actions)",
     "Client Components **can't import** Server Components, but can receive them as **`children`/props**",
     "Push `'use client'` **down to the leaves** to minimize client JS"] },

{ cat:"Advanced: Server Components & SSR", q:"What are Server Actions and their security concerns?",
  a:["Async functions marked `'use server'` callable from the client (forms, buttons)",
     "Work with `<form action>` → **progressive enhancement** (works without JS)",
     "They are **public HTTP endpoints** → always **validate input** & **check authorization**",
     "Don't trust closed-over/hidden values; avoid leaking secrets in returned data",
     "Revalidate cache after mutations (`revalidatePath` in Next.js)"] },

{ cat:"Advanced: Server Components & SSR", q:"How does streaming SSR with Suspense work?",
  a:["`renderToPipeableStream` (Node) / `renderToReadableStream` (Web) send HTML **in chunks**",
     "Shell renders first; Suspense boundaries stream in **as data resolves**",
     "Inline `<script>` tags swap fallbacks with real content",
     "**Selective hydration**: hydrate boundaries independently; prioritize what the user **interacts with**",
     "Better **TTFB & FCP** than waiting for the whole page"] },

{ cat:"Advanced: Server Components & SSR", q:"How do you fix hydration mismatches?",
  a:["Cause: server HTML ≠ first client render",
     "Common: `Date`, `Math.random`, `window`/`localStorage` checks, locale formatting, invalid HTML nesting (`<div>` in `<p>`)",
     "Fix: render browser-only values **after mount** (`useEffect` + state) or use `useSyncExternalStore` with server snapshot",
     "Use `useId` for IDs",
     "`suppressHydrationWarning` only for unavoidable text (timestamps)"] },

{ cat:"Advanced: Server Components & SSR", q:"Explain caching layers in Next.js App Router.",
  a:["**Request memoization** – dedupe identical `fetch` calls during one render",
     "**Data cache** – persistent `fetch` results across requests (`revalidate`, tags)",
     "**Full route cache** – prerendered HTML + RSC payload for static routes",
     "**Router cache** – client-side cache of visited segments",
     "Invalidate with `revalidatePath` / `revalidateTag`; opt out with `cache: 'no-store'` / dynamic APIs",
     "Note: defaults changed across Next.js versions (v15 is less aggressive)"] },

// ───────────── Advanced: Performance ─────────────
{ cat:"Advanced: Performance", q:"How do you profile and diagnose React performance problems?",
  a:["**React DevTools Profiler** – flamegraph, commit durations, \"why did this render?\"",
     "Enable \"Highlight updates when components render\"",
     "`<Profiler id onRender>` API for programmatic measurement",
     "Chrome **Performance** panel for long tasks, layout thrashing",
     "Measure **Web Vitals** (LCP, INP, CLS) in production",
     "Libraries: `why-did-you-render`"] },

{ cat:"Advanced: Performance", q:"When does memoization hurt rather than help?",
  a:["Cheap components/values → memo comparison **costs more** than re-rendering",
     "Props that change every render (inline objects, `children` JSX) → memo **never hits**",
     "Wrong/missing deps → **stale bugs**",
     "Adds complexity; fix structure first (**colocate state, composition**)",
     "**React Compiler** removes most manual memoization needs"] },

{ cat:"Advanced: Performance", q:"What rules must code follow for the React Compiler to work?",
  a:["Components & hooks must be **pure / idempotent** during render",
     "**Don't mutate** props, state, or values after they're used in JSX",
     "Follow **Rules of Hooks**",
     "Don't read/write `ref.current` during render",
     "Use `eslint-plugin-react-compiler`; opt out per file with `'use no memo'`"] },

{ cat:"Advanced: Performance", q:"How do you reduce bundle size in a React app?",
  a:["Analyze: `vite-bundle-visualizer`, `webpack-bundle-analyzer`, `source-map-explorer`",
     "**Route-based code splitting** with `lazy`",
     "Replace heavy libs (moment → date-fns/dayjs, lodash → per-method imports)",
     "Ensure **tree shaking** (ESM, `sideEffects: false`)",
     "Move work to **Server Components**",
     "Dynamic `import()` for rarely used features (charts, editors)"] },

// ───────────── Advanced: Patterns & TypeScript ─────────────
{ cat:"Advanced: Patterns & TypeScript", q:"How do you build a component that can be both controlled and uncontrolled?",
  a:["Accept `value` + `onChange` (controlled) **and** `defaultValue` (uncontrolled)",
     "If `value !== undefined` → controlled, else use internal state",
     "Common in design systems (Radix's `useControllableState`)",
     "Don't switch between modes during lifetime (React warns)"],
  code:`function useControllable({ value, defaultValue, onChange }) {
  const [inner, setInner] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const set = v => { if (!isControlled) setInner(v); onChange?.(v); };
  return [current, set];
}` },

{ cat:"Advanced: Patterns & TypeScript", q:"What are headless components?",
  a:["Components/hooks that provide **logic, state & accessibility** but **no styling/markup**",
     "Consumer renders the UI → full design freedom",
     "Examples: **Radix UI**, **Headless UI**, **TanStack Table**, **Downshift**, React Aria",
     "Implemented via hooks, render props, or compound components"] },

{ cat:"Advanced: Patterns & TypeScript", q:"How do you type React components well with TypeScript?",
  a:["Type props with an **interface/type**; avoid `React.FC` defaults issues (children implicit pre-18)",
     "Extend native props: `ComponentPropsWithoutRef<'button'>`",
     "Events: `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent<HTMLButtonElement>`",
     "Children: `React.ReactNode`",
     "**Generic components**: `function List<T>({ items, render }: Props<T>)`",
     "**Discriminated unions** for variant props"],
  code:`type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'ghost';
};
function List<T>({ items, render }: { items: T[]; render: (i: T) => ReactNode }) {
  return <ul>{items.map(render)}</ul>;
}` },

{ cat:"Advanced: Patterns & TypeScript", q:"What is a polymorphic component ('as' prop)?",
  a:["Component that can render **as different elements/components**: `<Text as=\"h1\">`, `<Button as={Link}>`",
     "Props should adapt to the chosen element (e.g. `href` when `as=\"a\"`)",
     "Typed with generics: `<C extends ElementType>` + `ComponentPropsWithoutRef<C>`",
     "Alternative: **`asChild`** / Slot pattern (Radix)"] },

{ cat:"Advanced: Patterns & TypeScript", q:"How do you combine Error Boundaries and Suspense properly?",
  a:["Suspense handles **loading**; Error Boundary handles **failures**",
     "Wrap the same region: `<ErrorBoundary><Suspense>…</Suspense></ErrorBoundary>`",
     "Provide **reset** (`resetKeys` / `onReset` in react-error-boundary) to retry",
     "Integrate with data libs (`QueryErrorResetBoundary` in TanStack Query)",
     "Place boundaries per **independent UI region** so one failure doesn't break the page"] },

// ───────────── Advanced: Data & State Libraries ─────────────
{ cat:"Advanced: Data & State Libraries", q:"How does TanStack Query work and what are its key concepts?",
  a:["**Server-state cache** keyed by `queryKey`",
     "`staleTime` – how long data is fresh; `gcTime` – how long unused data stays cached",
     "Auto **refetch** on window focus, reconnect, interval",
     "**Dedupes** identical requests; retries with backoff",
     "`useMutation` + `invalidateQueries` to refresh after writes",
     "Supports pagination, infinite queries, prefetching, SSR hydration"] },

{ cat:"Advanced: Data & State Libraries", q:"How do you implement optimistic updates with rollback?",
  a:["`onMutate`: **cancel** in-flight queries, **snapshot** previous data, **apply** optimistic change",
     "`onError`: **restore** snapshot",
     "`onSettled`: **invalidate** to sync with server",
     "React 19 alternative: `useOptimistic` within an Action"],
  code:`useMutation({
  mutationFn: addTodo,
  onMutate: async (todo) => {
    await qc.cancelQueries({ queryKey: ['todos'] });
    const prev = qc.getQueryData(['todos']);
    qc.setQueryData(['todos'], old => [...old, todo]);
    return { prev };
  },
  onError: (_e, _t, ctx) => qc.setQueryData(['todos'], ctx.prev),
  onSettled: () => qc.invalidateQueries({ queryKey: ['todos'] }),
});` },

{ cat:"Advanced: Data & State Libraries", q:"How do Redux middleware and RTK Query work?",
  a:["Middleware signature: `store => next => action => {...}` — intercept actions (logging, async, analytics)",
     "**Thunk** lets you dispatch functions for async logic",
     "**RTK Query**: define `createApi` endpoints → auto-generated hooks (`useGetUsersQuery`)",
     "Caching, **tag-based invalidation** (`providesTags` / `invalidatesTags`), polling, optimistic updates"] },

{ cat:"Advanced: Data & State Libraries", q:"How does Zustand avoid unnecessary re-renders?",
  a:["Store lives **outside React**; components subscribe with a **selector**",
     "Component re-renders only when its **selected slice** changes",
     "Use `useShallow` when selecting multiple fields as an object/array",
     "Built on `useSyncExternalStore` → concurrent-safe"],
  code:`const useStore = create(set => ({
  count: 0, inc: () => set(s => ({ count: s.count + 1 }))
}));
const count = useStore(s => s.count);  // re-renders only when count changes` },

{ cat:"Advanced: Data & State Libraries", q:"How do you normalize Redux state and write memoized selectors?",
  a:["**Normalize** collections like a database: `{ ids: [], entities: { [id]: item } }` – one copy per item, **O(1)** lookups and updates by id",
     "Store **ids as references** instead of nested copies, so each update happens in one place",
     "`createEntityAdapter` generates that shape, CRUD reducers (`addOne`, `upsertMany`, `removeOne`) and selectors (`selectAll`, `selectById`)",
     "`createSelector` (Reselect) **memoizes** derived data – recomputes only when its inputs change and returns the **same reference**, so `useSelector` doesn't re-render",
     "Pitfall: a selector that returns a new array/object on every call (e.g. an inline `.filter()`) re-renders the component on **every** store update",
     "Keep derived data **out of the store** – compute it with selectors"],
  code:`const todosAdapter = createEntityAdapter();

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState({ show: 'all' }),
  reducers: {
    todoAdded: todosAdapter.addOne,
    todoToggled(state, action) {
      const todo = state.entities[action.payload];
      todo.done = !todo.done;                 // Immer keeps it immutable
    },
  },
});

const { selectAll } = todosAdapter.getSelectors(state => state.todos);

export const selectVisibleTodos = createSelector(
  [selectAll, state => state.todos.show],
  (todos, show) => show === 'done' ? todos.filter(t => t.done) : todos
);

const visible = useSelector(selectVisibleTodos);  // same reference until inputs change`,
  tip:"Normalize the data, derive with memoized selectors, and select the smallest slice each component needs." },

{ cat:"Advanced: Data & State Libraries", q:"What is atomic state management (Jotai), and how does it differ from Redux or Zustand?",
  a:["State is split into small, independent **atoms**; components subscribe only to the atoms they use → **fine-grained re-renders**",
     "**Derived atoms** compute from other atoms (like selectors); **async atoms** work with Suspense",
     "**Bottom-up**: state is built from small pieces next to the features that use them – vs. **top-down** with one store (Redux) or a store plus selectors (Zustand)",
     "Feels like a shareable `useState`: `useAtom`, `useAtomValue`, `useSetAtom`",
     "Fits many small, interdependent pieces of client state (editors, dashboards, complex forms); offers less structure for large teams than Redux",
     "Recoil pioneered the model but is no longer maintained – **Jotai** is the common choice today"],
  code:`const countAtom = atom(0);
const doubledAtom = atom(get => get(countAtom) * 2);   // derived

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const doubled = useAtomValue(doubledAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count} / {doubled}</button>;
}`,
  tip:"Redux/Zustand: one store, select slices. Jotai: many atoms, compose them." },

// ───────────── Advanced: Architecture ─────────────
{ cat:"Advanced: Architecture", q:"How would you architect a large-scale React application?",
  a:["**Feature-based folders** (feature = components + hooks + api + tests)",
     "Framework choice: **Next.js / Remix (React Router)** for SSR & routing, or Vite SPA",
     "**Server state** via TanStack Query/RTK Query; **client state** local or Zustand/Redux",
     "Shared **design system** package; Storybook",
     "**Monorepo** (Nx/Turborepo), strict TypeScript, ESLint, CI",
     "Error boundaries per region, logging/monitoring (Sentry), feature flags",
     "Testing pyramid: unit (RTL), integration (MSW), E2E (Playwright)"] },

{ cat:"Advanced: Architecture", q:"How do micro frontends work with React?",
  a:["Independently deployed apps composed into one UI",
     "**Module Federation** (Webpack/Rspack/Vite plugin) – load remote components at runtime",
     "Share React as a **singleton** to avoid multiple React copies (hooks break otherwise)",
     "Communicate via props, custom events, or a shared event bus — avoid shared global state",
     "Trade-offs: complexity, version drift, performance"] },

{ cat:"Advanced: Architecture", q:"How do you handle accessibility (a11y) in complex React components?",
  a:["Use **semantic HTML** first; ARIA only when needed",
     "**Focus management**: move focus into modals, trap it, restore on close",
     "Keyboard support (Tab, Esc, arrow keys) for menus, tabs, comboboxes",
     "`useId` for label/aria associations",
     "Announce dynamic changes with **aria-live** regions",
     "Test with **axe**, screen readers; prefer accessible headless libs (Radix, React Aria)"] },

// ───────────── Advanced: Testing ─────────────
{ cat:"Advanced: Testing", q:"How do you test custom hooks and async behavior?",
  a:["`renderHook(() => useCounter())` from **@testing-library/react**",
     "Update via `act(() => result.current.inc())`",
     "Async: `await waitFor(() => expect(...))` or `findBy*` queries",
     "Mock network with **MSW** instead of mocking fetch",
     "Wrap with providers using the `wrapper` option"],
  code:`const { result } = renderHook(() => useCounter(), { wrapper: Providers });
act(() => result.current.inc());
expect(result.current.count).toBe(1);` },

{ cat:"Advanced: Testing", q:"What does the 'not wrapped in act(...)' warning mean?",
  a:["A state update happened **outside** React's test-aware scope",
     "Usually an **async update** finished after the test assertion/ended",
     "Fix: `await` the result with `findBy*` / `waitFor`, use `userEvent` (already wraps act)",
     "Clean up timers/subscriptions; use fake timers correctly"] },

// ───────────── Advanced: Scenario-based ─────────────
{ cat:"Advanced: Scenario-based", q:"A page is slow when typing in a filter input over a large table. Walk through your fix.",
  a:["**Profile** to confirm the table render is the bottleneck",
     "Keep the input state **local**; pass filtered value via `useDeferredValue` or `startTransition`",
     "**Virtualize** rows (TanStack Virtual / react-window)",
     "`React.memo` rows + stable callbacks; memoize filtering with `useMemo`",
     "For server data: debounce + query cache, filter on the server"] },

{ cat:"Advanced: Scenario-based", q:"You see 'Cannot update a component while rendering a different component'. Why?",
  a:["A component **sets state of another component during render**",
     "Often a child calling a parent's setter in its render body",
     "Render must be **pure**",
     "Fix: move the update into an **event handler** or `useEffect`, or derive the value instead"] },

{ cat:"Advanced: Scenario-based", q:"How would you migrate a large class-component codebase to hooks?",
  a:["No big-bang rewrite — classes and hooks **coexist**",
     "Migrate **leaf components** and new features first",
     "Extract shared logic (HOCs, mixins) into **custom hooks**",
     "Map lifecycles carefully (`componentDidUpdate` → effect with deps)",
     "Keep tests green (RTL tests survive refactors); use codemods where possible"] },

{ cat:"Advanced: Scenario-based", q:"How do you design a real-time feature (chat/notifications) in React?",
  a:["Connection in a **provider/custom hook** (WebSocket / SSE) with cleanup & reconnect",
     "Store messages in a **store** (Zustand/Redux) or update TanStack Query cache",
     "Subscribe components via **selectors** to limit re-renders",
     "Batch high-frequency updates; virtualize message lists",
     "Optimistic sending with `useOptimistic`; handle ordering & dedup via ids"] }

].map(q => ({ ...q, level:'Advanced' })));
