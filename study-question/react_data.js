// React study questions — common questions with short, memorizable answers.
// Format: { cat, q, a:[bullets], code?, tip? }   Bullets support `code` and **bold**.
const PREP_KEY = 'react';
const PREP_DATA = [

// ───────────── Fundamentals ─────────────
{ cat:"Fundamentals", q:"What is React?",
  a:["**JavaScript library for building user interfaces** (by Meta, 2013)",
     "**Component-based**: UI built from reusable pieces",
     "**Declarative**: describe UI for a given state; React updates the DOM",
     "Uses a **Virtual DOM** and efficient reconciliation",
     "**One-way data flow** (parent → child via props)",
     "Only the **view layer** — routing/state/data fetching come from ecosystem or frameworks (Next.js)"] },

{ cat:"Fundamentals", q:"What are the key features of React?",
  a:["**JSX** – HTML-like syntax in JavaScript",
     "**Components** – function components + hooks",
     "**Virtual DOM** – fast, minimal real DOM updates",
     "**One-way data binding** – predictable data flow",
     "**Hooks** – state & side effects in functions",
     "**Concurrent rendering**, Suspense, Server Components",
     "Huge ecosystem, **React Native** for mobile"] },

{ cat:"Fundamentals", q:"What is the Virtual DOM and how does it work?",
  a:["**Lightweight JS object representation** of the real DOM",
     "On state change → React builds a **new virtual tree**",
     "**Diffs** it with the previous tree (**reconciliation**)",
     "During **commit**, applies the DOM changes needed for the reconciled result; a render does not necessarily change the DOM",
     "Element **type, position and keys** guide reconciliation and preservation of component state",
     "Reconciliation uses heuristics, not a guarantee of a globally minimal edit sequence; rendering and diffing also have a cost"],
  tip:"State change → Render (new VDOM) → Diff → Patch real DOM." },

{ cat:"Fundamentals", q:"What is the difference between the real DOM, Virtual DOM and Shadow DOM?",
  a:["**Real DOM** – the browser's actual document tree; expensive to update",
     "**Virtual DOM** – React's in-memory copy used for diffing (library concept)",
     "**Shadow DOM** – browser feature for **style/DOM encapsulation** in Web Components",
     "VDOM is about **performance**; Shadow DOM is about **encapsulation**"] },

{ cat:"Fundamentals", q:"What is JSX?",
  a:["**JavaScript XML** – syntax extension to write HTML-like markup in JS",
     "Compiled (Babel/SWC/TS) into `React.createElement()` / `jsx()` calls",
     "Embed JS expressions with `{ }`",
     "Use `className` (not `class`), `htmlFor`, camelCase events (`onClick`)",
     "Must return **one root element** (or a Fragment)",
     "JSX is not an HTML string: expressions produce element descriptions; React escapes text values, but unsafe HTML/URLs still need care"],
  code:`const el = <h1 className="title">Hello {name}</h1>;
// compiles to:
const el = jsx('h1', { className: 'title', children: ['Hello ', name] });` },

{ cat:"Fundamentals", q:"What is a React component? Function vs class components?",
  a:["A **reusable piece of UI** that returns JSX",
     "**Function component**: plain function, uses **hooks** → recommended",
     "**Class component**: `extends React.Component`, `this.state`, lifecycle methods, `render()`",
     "Function components: less code, no `this`, easier logic reuse (custom hooks)",
     "Classes still needed only for **Error Boundaries** (or use a library)",
     "Component names must start with a **capital letter**"],
  code:`function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}` },

{ cat:"Fundamentals", q:"What is the difference between React element and React component?",
  a:["**Element** – a plain, immutable **object** describing what to render (`<Button />` result)",
     "**Component** – a **function/class** that returns elements",
     "Components create elements; React renders elements"] },

{ cat:"Fundamentals", q:"What is the difference between React and Angular?",
  a:["**React**: **library**, view only, JSX, one-way binding, Virtual DOM, flexible choices",
     "**Angular**: full **framework**, TypeScript, templates, DI, two-way binding option, RxJS, CLI",
     "React: lighter, bigger ecosystem freedom; Angular: opinionated, consistent for large teams",
     "Both component-based, both support SSR and signals/fine-grained reactivity in different ways"] },

// ───────────── Props & State ─────────────
{ cat:"Props & State", q:"What are props?",
  a:["**Inputs** passed from parent to child component",
     "**Read-only** (immutable) inside the child",
     "Can be any value: strings, objects, functions, JSX",
     "`props.children` – content between component tags",
     "Default values via destructuring defaults: `({ size = 'md' })`"] },

{ cat:"Props & State", q:"What is state?",
  a:["**Data owned by a component** that can change over time",
     "Created with `useState` / `useReducer`",
     "Updating state via the setter **triggers a re-render**",
     "State is **local & private** to the component",
     "Treat state as **immutable** — always set a new value"] },

{ cat:"Props & State", q:"What is the difference between props and state?",
  a:["**Props**: passed **from parent**, **read-only**, like function parameters",
     "**State**: component-owned data updated through a **setter/reducer**; treat each render's state as an **immutable snapshot**, never mutate it directly",
     "State updates schedule rendering; children normally render with their parent unless React can skip them",
     "Child changes parent data by calling a **callback prop**"] },

{ cat:"Props & State", q:"Why is setState / useState asynchronous? What is batching?",
  a:["Updates are **scheduled**, not applied immediately",
     "Current render keeps the **old value** (snapshot)",
     "React **batches** multiple updates into **one re-render** for performance",
     "React 18: **automatic batching** everywhere (promises, timeouts, native events)",
     "Need previous value? use **functional update**: `setCount(c => c + 1)`"],
  code:`// count = 0
setCount(count + 1);
setCount(count + 1);   // → 1 (both use snapshot 0)

setCount(c => c + 1);
setCount(c => c + 1);  // → 2 (uses latest pending)` },

{ cat:"Props & State", q:"Why should you not mutate state directly?",
  a:["React compares references with `Object.is` → **same reference = no re-render**",
     "Breaks `React.memo`, `useMemo`, and DevTools history",
     "Always create **new** objects/arrays: spread `...`, `map`, `filter`",
     "Immer library lets you write mutation-style code safely"],
  code:`// ❌ items.push(x); setItems(items);
setItems(prev => [...prev, x]);           // add
setItems(prev => prev.filter(i => i.id !== id)); // remove
setUser(prev => ({ ...prev, name: 'Ann' }));     // update` },

{ cat:"Props & State", q:"What is prop drilling and how do you avoid it?",
  a:["Passing props through **many intermediate components** that don't need them",
     "Hard to maintain & refactor",
     "Solutions: **Context API**, **component composition** (pass `children`), state libraries (Redux, Zustand, Jotai)",
     "Prefer nearby explicit props or composition first; Context distributes values but does not automatically prevent consumer re-renders"] },

{ cat:"Props & State", q:"What is lifting state up?",
  a:["Move shared state to the **closest common parent**",
     "Pass value + setter down as **props** to children",
     "Keeps a **single source of truth**, siblings stay in sync"] },

{ cat:"Props & State", q:"What is derived state and why avoid duplicating state?",
  a:["Values that can be **computed from existing props/state** shouldn't be stored in state",
     "Compute during render: `const total = items.reduce(...)`",
     "Duplicated state gets **out of sync**",
     "Use `useMemo` only if the calculation is expensive"] },

// ───────────── Hooks ─────────────
{ cat:"Hooks", q:"What are hooks? Why were they introduced?",
  a:["Functions that let function components **use state, lifecycle and other React features** (v16.8)",
     "Replace class components → **less code, no `this`**",
     "**Reuse stateful logic** via custom hooks (instead of HOCs/render props)",
     "Group related logic together (not split across lifecycle methods)"] },

{ cat:"Hooks", q:"What are the Rules of Hooks?",
  a:["Only call hooks at the **top level** — not in loops, conditions or nested functions",
     "Only call hooks from **React function components** or **custom hooks**",
     "Reason: React tracks hooks by **call order**",
     "Custom hooks must use a **`use` prefix** (for example `useOnlineStatus`); naming alone does not make arbitrary calls valid",
     "Call hooks **before conditional early returns**, never inside event handlers or effect callbacks",
     "Enforced by `eslint-plugin-react-hooks`",
     "Exception: React 19 `use()` can be called in conditions and loops, but only within a component or hook and not inside try/catch"] },

{ cat:"Hooks", q:"List the most common built-in hooks.",
  a:["**State**: `useState`, `useReducer`",
     "**Context**: `useContext`",
     "**Refs**: `useRef`, `useImperativeHandle`",
     "**Effects**: `useEffect`, `useLayoutEffect`, `useInsertionEffect`",
     "**Performance**: `useMemo`, `useCallback`, `useTransition`, `useDeferredValue`",
     "**Other**: `useId`, `useSyncExternalStore`, `useDebugValue`",
     "**React 19**: `use`, `useActionState`, `useFormStatus`, `useOptimistic`"] },

{ cat:"Hooks", q:"Explain useState.",
  a:["`const [value, setValue] = useState(initial)`",
     "Returns current value + **setter** that triggers a re-render",
     "**Lazy init** for expensive initial value: `useState(() => compute())`",
     "Functional update when depending on previous: `setValue(v => v + 1)`",
     "Setting the same value (Object.is) → React may **skip** the re-render"] },

{ cat:"Hooks", q:"Explain useEffect and its dependency array.",
  a:["Synchronizes with external systems **after a committed render** (subscriptions, timers, browser APIs); effects do not run during server rendering",
     "**No array** → runs after **every committed render**",
     "`[]` → setup on mount and cleanup on unmount; remounting runs setup again",
     "`[a, b]` → runs on mount and after commits where a dependency changed, compared with **`Object.is`**",
     "**Return a cleanup function** → runs before next effect & on unmount",
     "Under root StrictMode in development, React performs an extra **setup → cleanup → setup** cycle on initial mount to check cleanup",
     "Include every reactive value read by the effect; use the exhaustive-deps lint rule rather than suppressing it"],
  code:`useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);   // cleanup
}, []);` },

{ cat:"Hooks", q:"How do you map class lifecycle methods to hooks?",
  a:["`componentDidMount` → `useEffect(fn, [])`",
     "`componentDidUpdate` → `useEffect(fn, [deps])`",
     "`componentWillUnmount` → **cleanup** returned from `useEffect`",
     "`shouldComponentUpdate` → `React.memo`",
     "`getDerivedStateFromError` / `componentDidCatch` → no hook (Error Boundary class)"] },

{ cat:"Hooks", q:"What is the difference between useEffect and useLayoutEffect?",
  a:["`useEffect` – runs **after the browser paints** (non-blocking) → most side effects",
     "`useLayoutEffect` – runs **synchronously after DOM update, before paint**",
     "Use layout effect to **measure DOM / prevent flicker** (tooltips, positioning)",
     "Layout effect blocks painting → use sparingly"] },

{ cat:"Hooks", q:"What is useRef used for?",
  a:["Returns a mutable object `{ current }` that **persists across renders**",
     "**Changing `.current` does NOT re-render**",
     "Access **DOM elements**: focus, scroll, measure",
     "Store **mutable values**: timer IDs, previous value, instance variables"],
  code:`const inputRef = useRef(null);
<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus</button>` },

{ cat:"Hooks", q:"What is the difference between useMemo and useCallback?",
  a:["`useMemo(() => value, deps)` → memoizes a **computed value**",
     "`useCallback(fn, deps)` → memoizes a **function reference**",
     "`useCallback(fn, d)` ≡ `useMemo(() => fn, d)`",
     "Use for **expensive calculations** or **stable props** for `React.memo` children / effect deps",
     "Don't overuse — memoization has a cost; **React Compiler** can auto-memoize"],
  tip:"useMemo = memo **value**; useCallback = memo **callback**." },

{ cat:"Hooks", q:"When should you use useReducer instead of useState?",
  a:["**Complex state logic** or multiple related sub-values",
     "Next state depends on previous in several ways",
     "Centralizes updates in a **pure reducer** `(state, action) => newState`",
     "Easier to **test**; `dispatch` is **stable**",
     "Pairs well with Context for app-level state"],
  code:`function reducer(state, action) {
  switch (action.type) {
    case 'inc': return { count: state.count + 1 };
    case 'reset': return { count: 0 };
    default: return state;
  }
}
const [state, dispatch] = useReducer(reducer, { count: 0 });` },

{ cat:"Hooks", q:"What is useContext?",
  a:["Reads the nearest **Context Provider's value**",
     "Avoids **prop drilling** for global-ish data: theme, auth user, locale",
     "Component **re-renders when the context value changes**"] },

{ cat:"Hooks", q:"What is a custom hook?",
  a:["A function starting with `use` that **calls other hooks**",
     "**Reuses stateful logic** between components",
     "Each component using it gets **its own state** (shares logic, not state)",
     "Examples: `useFetch`, `useDebounce`, `useLocalStorage`, `useWindowSize`"],
  code:`function useDebounce(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}` },

{ cat:"Hooks", q:"What is a stale closure in hooks?",
  a:["A callback/effect **captures old state values** from the render it was created in",
     "Common with `setInterval`, event listeners, missing dependencies",
     "Fix: correct **dependency array**, **functional updates**, or store latest value in a **ref**",
     "Follow the `exhaustive-deps` lint rule"] },

{ cat:"Hooks", q:"What are useTransition and useDeferredValue?",
  a:["**Concurrent features** (React 18) to keep UI responsive",
     "`useTransition` → `[isPending, startTransition]`; mark a **state update** as non-urgent",
     "`useDeferredValue(value)` → a **lagging copy** of a value for expensive renders",
     "Urgent updates (typing) interrupt non-urgent ones (filtering big list)"] },

{ cat:"Hooks", q:"What are useId and useImperativeHandle?",
  a:["`useId()` – generates **unique, SSR-stable IDs** (for `htmlFor`/`aria` attributes)",
     "`useImperativeHandle(ref, () => ({ focus }))` – customize what a parent gets via **ref**",
     "Use imperative handles sparingly (prefer props)"] },

// ───────────── Rendering & Reconciliation ─────────────
{ cat:"Rendering & Reconciliation", q:"What is reconciliation?",
  a:["React's **diffing algorithm** comparing old and new element trees",
     "**Different element type** → tear down & rebuild subtree",
     "**Same type** → update changed attributes only",
     "**Keys** identify list children across renders",
     "Heuristic O(n) instead of O(n³)"] },

{ cat:"Rendering & Reconciliation", q:"What is React Fiber?",
  a:["React's **reconciliation engine** since v16",
     "Splits rendering work into **units (fibers)**",
     "Rendering can be **paused, resumed, prioritized, aborted**",
     "Foundation for **concurrent rendering**, Suspense, transitions"] },

{ cat:"Rendering & Reconciliation", q:"What are the render and commit phases?",
  a:["**Render phase**: React calls components, builds new tree, diffs — must be **pure**, can be interrupted",
     "**Commit phase**: applies DOM changes, runs `useLayoutEffect`, then `useEffect` after paint",
     "Side effects belong in effects/event handlers, **never in render**"] },

{ cat:"Rendering & Reconciliation", q:"When does a component re-render?",
  a:["Its **state** changes",
     "Its **parent re-renders** (even if props are the same!)",
     "A **context** it consumes changes",
     "NOT when a **ref** or plain variable changes",
     "Prevent unnecessary ones: `React.memo`, move state down, composition"] },

{ cat:"Rendering & Reconciliation", q:"Why are keys important in lists?",
  a:["Give each item a **stable identity**",
     "React matches items between renders → **preserves state & DOM**",
     "Must be **unique among siblings** and **stable** (e.g. database id)",
     "**Avoid index as key** if list can reorder/insert/delete → wrong state on wrong item",
     "Changing a key forces a **remount** (useful to reset a component)",
     "Do not generate keys during rendering with `Math.random()`; `key` is not passed as a normal prop, so pass `id` separately if needed"],
  code:`{users.map(u => <UserRow key={u.id} user={u} />)}` },

{ cat:"Rendering & Reconciliation", q:"What is conditional rendering? Show the patterns.",
  a:["**if/else** before return",
     "**Ternary**: `{ok ? <A/> : <B/>}`",
     "**Logical AND**: `{isOpen && <Modal/>}`",
     "⚠️ `{count && <X/>}` renders **0** when count is 0 → use `count > 0 &&`",
     "Return `null` to render nothing"] },

{ cat:"Rendering & Reconciliation", q:"What are Fragments?",
  a:["Group children **without adding an extra DOM node**",
     "Short syntax `<>...</>`; long `<React.Fragment key={id}>` when a **key** is needed",
     "Avoids breaking CSS (flex/grid) or table markup"] },

{ cat:"Rendering & Reconciliation", q:"What are Portals?",
  a:["`createPortal(child, domNode)` renders children **outside the parent DOM hierarchy**",
     "Use for **modals, tooltips, dropdowns** (escape `overflow:hidden` / z-index)",
     "Events still **bubble through the React tree**; context still works"] },

{ cat:"Rendering & Reconciliation", q:"What is StrictMode?",
  a:["**Development-only** helper `<React.StrictMode>`",
     "**Double-invokes** renders and effects (mount → unmount → mount)",
     "Detects **impure renders**, missing cleanup, deprecated APIs",
     "**No effect in production**"] },

// ───────────── Forms & Events ─────────────
{ cat:"Forms & Events", q:"What are controlled vs uncontrolled components?",
  a:["**Controlled**: value stored in **React state**, updated via `onChange` → single source of truth",
     "**Uncontrolled**: value lives in the **DOM**, initialized by `defaultValue`/`defaultChecked` and read via a ref or `FormData`; a ref does not store the field's current value itself",
     "Controlled → easy validation/formatting; uncontrolled → less code & re-renders",
     "React Hook Form uses mostly uncontrolled inputs for performance",
     "Do not switch an input between controlled and uncontrolled during its lifetime; initialize controlled text state to `''`, not `undefined`",
     "Checkboxes use `checked`/`defaultChecked` rather than `value` to control selection"],
  code:`// controlled
<input value={name} onChange={e => setName(e.target.value)} />
// uncontrolled
<input defaultValue="x" ref={inputRef} />` },

{ cat:"Forms & Events", q:"What are synthetic events?",
  a:["React's **cross-browser wrapper** around native events",
     "Same interface: `preventDefault()`, `stopPropagation()`, `target`",
     "Events are **delegated** to the root container (React 17+)",
     "camelCase names: `onClick`, `onChange`, `onSubmit`",
     "No event pooling since React 17"] },

{ cat:"Forms & Events", q:"How do you handle forms in React?",
  a:["Controlled inputs + `onSubmit` with `e.preventDefault()`",
     "Validation: manual, or libraries **React Hook Form**, **Formik** + **Zod/Yup** schemas",
     "React 19: `<form action={fn}>`, `useActionState`, `useFormStatus` for submit state"] },

{ cat:"Forms & Events", q:"How do you pass arguments to an event handler?",
  a:["Arrow function: `onClick={() => remove(id)}`",
     "Don't call it directly: `onClick={remove(id)}` ❌ runs on every render",
     "Or use `data-*` attributes and read `e.currentTarget.dataset`"] },

// ───────────── Context & State Management ─────────────
{ cat:"Context & State Management", q:"How do you manage state in React?",
  a:["State management = deciding **where state lives, who can change it and how changes reach the UI** – keep state **minimal** and **close to where it's used**",
     "**Local state** → `useState` (`useReducer` for complex updates); **derive** values during render instead of storing copies",
     "**Shared by siblings** → **lift state up** to the closest common parent; avoid prop drilling with **composition** (`children`) or Context",
     "**Rarely changing globals** (theme, locale, current user) → **Context**",
     "**Complex or frequently changing client state** → an external store: **Zustand**, **Redux Toolkit** or **Jotai** – components re-render only for the data they subscribe to",
     "**Server state** (API data) → **TanStack Query**, RTK Query or SWR; **URL state** (filters, sort, page) → search params; **form state** → React Hook Form",
     "**Rules**: single source of truth, **immutable updates**, one-way data flow – data goes down as props, changes go up through callbacks",
     "**vs Angular**: React has no injectable services – Context or an external store plays the role of an Angular service with signals, and Redux Toolkit is the counterpart of NgRx Store"],
  code:`// 1. Local – useState (useReducer for complex updates)
const [open, setOpen] = useState(false);

// 2. Shared by siblings – lift state up to the closest common parent
function Shop() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <ProductList onAdd={p => setCart(c => [...c, p])} />
      <CartSummary items={cart} />
    </>
  );
}

// 3. Derived – compute during render, don't store it
function CartSummary({ items }) {
  const total = items.reduce((sum, i) => sum + i.price, 0);
  return <p>{items.length} items, total {total}</p>;
}

// 4. Rarely changing globals – Context
const user = useContext(UserContext);

// 5. Complex global client state – an external store (Zustand)
const useCartStore = create(set => ({
  items: [],
  add: item => set(s => ({ items: [...s.items, item] })),
}));
const count = useCartStore(s => s.items.length);   // re-renders only when count changes

// 6. Server state – TanStack Query caches the API data
const { data: products, isPending } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });`,
  tip:"useState first → lift it up when it's shared → Context for rarely changing globals → a store for complex client state → TanStack Query for API data." },

{ cat:"Context & State Management", q:"What is the Context API?",
  a:["Share values **across the tree without prop drilling**",
     "`createContext(default)` → `<Ctx.Provider value>` (React 19: `<Ctx value>`) → `useContext(Ctx)`",
     "Good for: theme, auth user, locale, feature flags",
     "All consumers **re-render on value change** → not ideal for high-frequency updates",
     "Memoize the value object with `useMemo`; split contexts by concern"],
  code:`const ThemeCtx = createContext('light');
<ThemeCtx.Provider value={theme}><App /></ThemeCtx.Provider>
const theme = useContext(ThemeCtx);` },

{ cat:"Context & State Management", q:"How do you build global state with useReducer + Context, without a library?",
  a:["`useReducer` owns the state and a **pure reducer** handles every update; **Context** shares it with the tree",
     "Put **state** and **dispatch** in **separate contexts** – `dispatch` is stable, so components that only dispatch don't re-render when the state changes",
     "Expose **custom hooks** (`useTodos`, `useTodosDispatch`) so components never touch the contexts directly",
     "Good for small–medium shared state: cart, wizard, settings",
     "Limits: every reader re-renders on **any** change, and there are no selectors, middleware or DevTools → move to **Zustand / Redux Toolkit** as it grows"],
  code:`const TodosCtx = createContext([]);
const DispatchCtx = createContext(null);

export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <TodosCtx.Provider value={todos}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </TodosCtx.Provider>
  );
}

export const useTodos = () => useContext(TodosCtx);
export const useTodosDispatch = () => useContext(DispatchCtx);

// any component below the provider
const dispatch = useTodosDispatch();
dispatch({ type: 'added', text: 'Buy milk' });`,
  tip:"Context is the delivery mechanism, not a state manager – useReducer (or a store) does the managing." },

{ cat:"Context & State Management", q:"What is Redux and its core principles?",
  a:["Predictable **global state container**",
     "**Single source of truth** – one store",
     "**State is read-only** – change only by dispatching **actions**",
     "**Changes via pure reducers** – `(state, action) => newState`",
     "Flow: UI → `dispatch(action)` → reducer → store → UI",
     "**Middleware** (thunk, saga) for async side effects"],
  tip:"Modern Redux = **Redux Toolkit** (`configureStore`, `createSlice`, RTK Query)." },

{ cat:"Context & State Management", q:"What is Redux Toolkit and why use it?",
  a:["**Official, recommended** way to write Redux",
     "`createSlice` – reducers + actions in one, uses **Immer** (write mutating code)",
     "`configureStore` – DevTools & thunk set up automatically",
     "`createAsyncThunk` – async logic",
     "**RTK Query** – data fetching & caching",
     "Far less boilerplate than classic Redux"] },

{ cat:"Context & State Management", q:"Context vs Redux vs Zustand — when to use which?",
  a:["**Local state** (useState) – default choice",
     "**Context** – low-frequency global values (theme, user)",
     "**Redux Toolkit** – large apps, complex shared state, DevTools, strict patterns",
     "**Zustand / Jotai** – lightweight global stores, minimal boilerplate, selective re-renders",
     "**Server state** (API data) → **TanStack Query / SWR / RTK Query**, not global state"] },

{ cat:"Context & State Management", q:"What is the difference between server state and client state?",
  a:["**Client state**: UI state owned by the app (modals, form inputs, theme)",
     "**Server state**: data from APIs — async, shared, can be stale",
     "Server state needs **caching, refetching, deduping, invalidation**",
     "Use **TanStack Query (React Query)** / SWR for server state"] },

{ cat:"Context & State Management", q:"When should state live in the URL instead of in React state?",
  a:["When it should be **shareable, bookmarkable, survive refresh** and work with **Back/Forward**: search, filters, sort, page, active tab, selected item id",
     "Treat the URL as the **single source of truth** – read params during render instead of copying them into `useState`",
     "React Router: `useSearchParams()` for the query string, `useParams()` for path segments; Next.js: `useSearchParams()` + `router.replace()`",
     "**Parse and validate** – params are strings: convert types, apply defaults, ignore invalid values",
     "Use **replace** instead of push for rapid changes (typing, sliders) so the history isn't flooded",
     "Keep **ephemeral or sensitive** state out of the URL: hover, open menus, tokens, personal data",
     "Libraries like **nuqs** give type-safe, `useState`-style search-param hooks"],
  code:`const [params, setParams] = useSearchParams();
const page = Math.max(1, Number(params.get('page')) || 1);
const q = params.get('q') ?? '';

const goToPage = p =>
  setParams(prev => { prev.set('page', String(p)); return prev; });

const onSearch = text =>
  setParams(prev => { prev.set('q', text); prev.set('page', '1'); return prev; },
            { replace: true });`,
  tip:"If a user would want to share or bookmark it, it belongs in the URL." },

{ cat:"Context & State Management", q:"How do you persist state across page reloads in React?",
  a:["Decide **what** to persist: preferences, drafts, cart – not API data you can re-fetch; avoid **tokens or sensitive data** in `localStorage` (XSS can read it)",
     "**Plain React**: lazy-initialize `useState` from storage and save in a `useEffect` – wrap it in a `useLocalStorage` hook",
     "**Zustand**: `persist` middleware; **Redux**: `redux-persist` (whitelist only the slices to keep)",
     "**TanStack Query**: persist the query cache (`persistQueryClient`) for offline use or an instant start",
     "**URL** for shareable state – survives reloads and can be bookmarked",
     "**SSR / Next.js**: no `localStorage` on the server → read it after mount to avoid hydration mismatches",
     "**Version** the stored shape, handle corrupt JSON, and sync tabs with the `storage` event if needed"],
  code:`function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const [theme, setTheme] = useLocalStorage('theme', 'light');`,
  tip:"Persist only what you need, validate it on load, and keep secrets out of browser storage." },

// ───────────── Performance ─────────────
{ cat:"Performance", q:"How do you optimize React performance?",
  a:["**Measure first**: React DevTools Profiler",
     "Avoid unnecessary re-renders: `React.memo`, `useMemo`, `useCallback`",
     "**Keep state local** / move state down; split contexts",
     "**Code splitting**: `React.lazy` + `Suspense`, route-based",
     "**Virtualize long lists**: react-window / react-virtuoso",
     "Stable **keys**; avoid creating components inside components",
     "**Debounce/throttle** inputs; `useTransition` for heavy updates",
     "Optimize images, SSR/SSG, production build",
     "Clean up timers, listeners and subscriptions to avoid leaks; memoization is a measured optimization, not a correctness requirement"] },

{ cat:"Performance", q:"What is React.memo?",
  a:["**Higher-order component** that skips re-render if props are **shallowly equal**",
     "Still re-renders on own **state** or **context** change",
     "New object/array/function props each render **defeat** it → use `useMemo/useCallback`",
     "Optional custom compare: `React.memo(Comp, areEqual)`"] },

{ cat:"Performance", q:"What is code splitting and lazy loading?",
  a:["Split the bundle into **chunks loaded on demand**",
     "`React.lazy(() => import('./Page'))`",
     "Wrap in `<Suspense fallback={<Spinner/>}>`",
     "Best applied at **route level**",
     "Smaller initial bundle → **faster load**"],
  code:`const Dashboard = lazy(() => import('./Dashboard'));
<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>` },

{ cat:"Performance", q:"What is the React Compiler?",
  a:["Build-time compiler (React 19 era) that **automatically memoizes** components & values",
     "Reduces need for manual `useMemo` / `useCallback` / `React.memo`",
     "Requires code to follow the **Rules of React** (pure render, no mutation)"] },

{ cat:"Performance", q:"What is debouncing vs throttling?",
  a:["**Debounce** – run **after user stops** for X ms (search box)",
     "**Throttle** – run **at most once every** X ms (scroll, resize)",
     "Implement with `setTimeout` in a custom hook or lodash"] },

// ───────────── Advanced Patterns ─────────────
{ cat:"Advanced Patterns", q:"What is a Higher-Order Component (HOC)?",
  a:["A **function that takes a component and returns a new component**",
     "Reuses cross-cutting logic: auth, logging, data injection",
     "Example: `withAuth(Dashboard)`, Redux `connect()`",
     "Downsides: wrapper hell, prop collisions → **custom hooks preferred today**"],
  code:`const withLogger = (Comp) => (props) => {
  useEffect(() => console.log('mounted'), []);
  return <Comp {...props} />;
};` },

{ cat:"Advanced Patterns", q:"What is the render props pattern?",
  a:["A component takes a **function as a prop** and calls it to render",
     "Shares logic while letting caller control the UI",
     "Example: `<Mouse render={pos => <Cursor {...pos}/>} />`",
     "Mostly replaced by **custom hooks**"] },

{ cat:"Advanced Patterns", q:"What is composition vs inheritance in React?",
  a:["React favors **composition**: build components by **combining** others",
     "Use `children` and **slot props** (`header`, `footer`)",
     "Inheritance between components is **not recommended**",
     "Composition also helps avoid prop drilling"] },

{ cat:"Advanced Patterns", q:"What are compound components?",
  a:["A group of components that **work together sharing implicit state** via context",
     "Flexible, readable API",
     "Example: `<Tabs><Tabs.List/><Tabs.Panel/></Tabs>`, `<Select><Option/></Select>`"] },

{ cat:"Advanced Patterns", q:"What are refs forwarding and React 19 ref changes?",
  a:["`forwardRef` lets a parent pass a **ref through** a component to a DOM node",
     "**React 19**: `ref` is a **regular prop** for function components → `forwardRef` not needed",
     "Ref callbacks can return a **cleanup** function (React 19)"] },

{ cat:"Advanced Patterns", q:"What are Error Boundaries?",
  a:["Components that **catch render errors in child tree** and show a **fallback UI**",
     "Class with `static getDerivedStateFromError()` and/or `componentDidCatch()`",
     "Or use `react-error-boundary` library",
     "**Don't catch**: event handlers, async code (setTimeout/promises), SSR, errors in boundary itself",
     "Use try/catch for those"] },

{ cat:"Advanced Patterns", q:"What is Suspense?",
  a:["Shows a **fallback** while children are **waiting** (loading code or data)",
     "Works with `React.lazy`, Suspense-enabled data libs, RSC, `use(promise)`",
     "Nest boundaries to control loading granularity",
     "Enables **streaming SSR**"] },

// ───────────── React 18 / 19 ─────────────
{ cat:"React 18 / 19", q:"What's new in React 18?",
  a:["**Concurrent rendering** (opt-in via features)",
     "`createRoot` replaces `ReactDOM.render`",
     "**Automatic batching** everywhere",
     "**Transitions**: `useTransition`, `startTransition`; `useDeferredValue`",
     "New hooks: `useId`, `useSyncExternalStore`, `useInsertionEffect`",
     "**Streaming SSR** with Suspense, selective hydration"] },

{ cat:"React 18 / 19", q:"What's new in React 19?",
  a:["**Actions**: async functions in transitions, `<form action={fn}>`",
     "New hooks: `useActionState`, `useFormStatus`, `useOptimistic`",
     "`use()` API – read **promises & context** (can be conditional)",
     "**Server Components** & **Server Actions** stable",
     "`ref` as a prop, `<Context>` as provider, ref cleanup",
     "Document metadata (`<title>`, `<meta>`) rendered anywhere; stylesheet/script support",
     "Better hydration error messages"] },

{ cat:"React 18 / 19", q:"What are React Server Components (RSC)?",
  a:["Components that **render only on the server**",
     "Can be `async`, access **DB / file system / secrets** directly",
     "**Zero client JS** for those components → smaller bundles",
     "**Can't** use state, effects, or browser event handlers",
     "Interactive parts marked with `'use client'`",
     "Used via frameworks like **Next.js App Router**"] },

{ cat:"React 18 / 19", q:"What is useOptimistic?",
  a:["Shows an **optimistic UI** immediately while an async action runs",
     "Automatically **reverts** if the action fails / when real state arrives",
     "Example: show a new comment instantly before server confirms"] },

// ───────────── SSR & Next.js ─────────────
{ cat:"SSR & Next.js", q:"What is the difference between CSR, SSR, SSG and ISR?",
  a:["**CSR** – browser renders from empty HTML + JS (classic SPA) → slower first paint, weaker SEO",
     "**SSR** – server renders HTML **per request** → fresh data, good SEO",
     "**SSG** – HTML generated **at build time** → fastest, for static content",
     "**ISR** – SSG + **periodic regeneration** (Next.js)"] },

{ cat:"SSR & Next.js", q:"What is hydration?",
  a:["Client React **attaches event handlers & state** to server-rendered HTML",
     "`hydrateRoot(container, <App/>)`",
     "Server and client output **must match** → otherwise hydration mismatch error",
     "Avoid `Date.now()`, `Math.random()`, `window` during render"] },

{ cat:"SSR & Next.js", q:"What is Next.js and why use it?",
  a:["**React framework** by Vercel",
     "File-based **routing** (App Router / Pages Router)",
     "**SSR, SSG, ISR**, Server Components, Server Actions",
     "API routes / route handlers, image & font optimization",
     "Better **SEO** and performance out of the box"] },

// ───────────── Routing ─────────────
{ cat:"Routing", q:"How does routing work in React (React Router)?",
  a:["React has no built-in router → **React Router** (or framework routing)",
     "`createBrowserRouter` / `<BrowserRouter>` + `<Routes><Route path element/></Routes>`",
     "`<Link to>` / `<NavLink>` → navigate **without page reload**",
     "Hooks: `useNavigate`, `useParams`, `useLocation`, `useSearchParams`",
     "Nested routes render in `<Outlet />`",
     "Data APIs: `loader` / `action` per route"],
  code:`<Routes>
  <Route path="/" element={<Home />} />
  <Route path="users/:id" element={<User />} />
  <Route path="*" element={<NotFound />} />
</Routes>` },

{ cat:"Routing", q:"How do you implement protected routes?",
  a:["Wrapper component checks auth (context/store)",
     "If not logged in → `<Navigate to=\"/login\" replace />`",
     "Else render `children` or `<Outlet />`",
     "Always enforce authorization on the **server** too"],
  code:`function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}` },

// ───────────── Data Fetching ─────────────
{ cat:"Data Fetching", q:"How do you fetch data in React?",
  a:["Classic: `useEffect` + `fetch/axios` + loading/error state",
     "Handle **race conditions** & cleanup with `AbortController`",
     "Better: **TanStack Query / SWR / RTK Query** → caching, retries, dedupe, refetch",
     "Frameworks: Server Components, route loaders (React Router, Next.js)",
     "React 19: `use(promise)` with Suspense"],
  code:`useEffect(() => {
  const ctrl = new AbortController();
  fetch(\`/api/users/\${id}\`, { signal: ctrl.signal })
    .then(r => r.json()).then(setUser).catch(() => {});
  return () => ctrl.abort();
}, [id]);` },

{ cat:"Data Fetching", q:"Why does my effect fetch data twice in development?",
  a:["**StrictMode** intentionally mounts → unmounts → remounts in dev",
     "Exposes missing **cleanup**",
     "Doesn't happen in **production**",
     "Fix: abort/ignore in cleanup, or use a data-fetching library — don't remove StrictMode"] },

// ───────────── Testing ─────────────
{ cat:"Testing", q:"How do you test React components?",
  a:["**Jest** or **Vitest** as test runner",
     "**React Testing Library** – test like a user: `getByRole`, `getByLabelText`, `getByText`",
     "`@testing-library/user-event` for interactions",
     "`findBy*` / `waitFor` for async UI",
     "Mock APIs with **MSW** (Mock Service Worker)",
     "E2E: **Cypress** / **Playwright**"],
  code:`render(<Counter />);
await userEvent.click(screen.getByRole('button', { name: /add/i }));
expect(screen.getByText('1')).toBeInTheDocument();` },

{ cat:"Testing", q:"What is the guiding principle of React Testing Library?",
  a:["\"The more your tests resemble the way your software is used, the more confidence they give\"",
     "Test **behavior**, not implementation details (no internal state checks)",
     "Prefer **accessible queries** (`getByRole`) → also improves a11y"] },

// ───────────── Security & Best Practices ─────────────
{ cat:"Security & Best Practices", q:"How does React prevent XSS? What's dangerous?",
  a:["JSX `{value}` is **auto-escaped**",
     "`dangerouslySetInnerHTML` **bypasses** escaping → sanitize with **DOMPurify**",
     "Validate user URLs (`javascript:` in `href`)",
     "Don't store sensitive tokens in localStorage if avoidable (HttpOnly cookies)"] },

{ cat:"Security & Best Practices", q:"What are React best practices?",
  a:["Small, **single-responsibility** components",
     "Keep state **minimal & local**; derive what you can",
     "Immutable updates; stable **keys**",
     "**Custom hooks** for reusable logic",
     "Clean up effects; follow **Rules of Hooks** + ESLint",
     "TypeScript for props typing",
     "Folder by **feature**, not by file type",
     "Accessibility: semantic HTML, labels, keyboard support"] },

{ cat:"Security & Best Practices", q:"Should you define a component inside another component?",
  a:["**No** — a new component type is created on **every render**",
     "React **unmounts & remounts** it each time → loses state, input focus, slow",
     "Define components at **module top level**"] },

// ───────────── Scenario-based ─────────────
{ cat:"Scenario-based", q:"A search input triggers an API call on every keystroke. How do you optimize?",
  a:["**Debounce** the value (custom `useDebounce` hook)",
     "Cancel stale requests with **AbortController** in effect cleanup",
     "Cache results with **TanStack Query** (keyed by search term)",
     "`useDeferredValue` / `useTransition` to keep typing smooth"] },

{ cat:"Scenario-based", q:"A list of 10,000 items is slow to render. What do you do?",
  a:["**Virtualize** – render only visible rows (react-window, react-virtuoso)",
     "**Paginate** or infinite scroll",
     "`React.memo` rows + stable keys + `useCallback` handlers",
     "`useDeferredValue` for filtering"] },

{ cat:"Scenario-based", q:"A child wrapped in React.memo still re-renders. Why?",
  a:["Parent passes **new object/array/function** each render → props not shallow-equal",
     "Fix: `useMemo` for objects/arrays, `useCallback` for functions",
     "Or child consumes a **context** that changed",
     "Or child's own state changes"] },

{ cat:"Scenario-based", q:"How do you share state between two sibling components?",
  a:["**Lift state up** to common parent and pass via props",
     "If deeply nested → **Context**",
     "If app-wide/complex → **Redux Toolkit / Zustand**",
     "If it's API data → **TanStack Query** cache shared by key"] },

{ cat:"Scenario-based", q:"How would you implement authentication in a React app?",
  a:["**AuthContext/Provider** holding user + login/logout",
     "Token in **HttpOnly cookie** (preferred) or memory",
     "**Protected route** component redirects to `/login`",
     "Axios/fetch interceptor adds header & handles **401 / refresh**",
     "Use OIDC libs (MSAL, Auth0, NextAuth) for SSO"] },

{ cat:"Scenario-based", q:"useEffect causes an infinite loop. Why?",
  a:["Effect **sets state** that is in its own **dependency array**",
     "Or a dependency is a **new object/function every render**",
     "Fix: correct deps, memoize objects/functions, use functional updates",
     "Or move derived computation out of effect into render"] }
];
