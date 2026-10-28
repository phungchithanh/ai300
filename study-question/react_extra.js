// Extra React questions based on past study topics (React vs others, Redux, portals, performance, hooks, routing, security, responsive design, error handling).
PREP_DATA.push(...[
{ cat:"Fundamentals", q:"Why would you choose React over other frameworks like Angular and Vue.js?",
  a:["**Huge ecosystem & community** → libraries, answers and **talent pool** are easy to find",
     "**Just a UI library** → pick the best router/state/data tools for the problem",
     "**Component model + hooks** are simple and composable; JSX is 'just JavaScript'",
     "**Full-stack & SSR** via **Next.js / Remix**, Server Components",
     "**React Native** → share knowledge/code with **mobile apps**",
     "vs **Angular**: lighter, less boilerplate, smaller learning curve, but fewer built-in conventions",
     "vs **Vue**: bigger job market and enterprise adoption; Vue is simpler but smaller ecosystem",
     "When NOT React: team wants an **opinionated all-in-one** framework → Angular"] },

{ cat:"Props & State", q:"What is props.children and how do you use it?",
  a:["`children` is a special prop containing whatever is placed **between the opening and closing tags**",
     "Enables **composition**: layout/wrapper components (Card, Modal, Layout) without knowing their content",
     "Can be text, elements, arrays, or even a **function** (render-prop style)",
     "Type it as `React.ReactNode` in TypeScript",
     "Passing JSX as children also helps performance: children created by the parent **don't re-render** when the wrapper's state changes"],
  code:`type CardProps = { title: string; children: React.ReactNode };
function Card({ title, children }: CardProps) {
  return <section className="card"><h2>{title}</h2>{children}</section>;
}

<Card title="Profile">
  <Avatar user={user} />
  <p>{user.bio}</p>
</Card>` },

{ cat:"Hooks", q:"When does the useEffect cleanup function run, and what are common useEffect mistakes?",
  a:["Cleanup runs **before the effect re-runs** (when deps change) and **when the component unmounts**",
     "In dev **StrictMode**, React mounts → unmounts → mounts again to **test your cleanup**",
     "Mistake 1: **missing dependencies** → stale values; follow the `exhaustive-deps` lint rule",
     "Mistake 2: **objects/functions in deps** recreated every render → effect runs every render",
     "Mistake 3: using effects for **derived data** — compute during render instead",
     "Mistake 4: setting state the effect depends on → **infinite loop**",
     "Mistake 5: not cancelling fetches → **race conditions**; use `AbortController` or an `ignore` flag"],
  code:`useEffect(() => {
  const controller = new AbortController();
  fetch('/api/users/' + id, { signal: controller.signal })
    .then(r => r.json()).then(setUser)
    .catch(e => { if (e.name !== 'AbortError') setError(e); });
  return () => controller.abort();           // cleanup
}, [id]);` },

{ cat:"Hooks", q:"What is the difference between useMemo and React.memo?",
  a:["**`useMemo`** – a **hook** that caches a **computed value** inside a component between renders",
     "**`React.memo`** – a **higher-order component** that skips re-rendering a **whole component** when its props are shallowly equal",
     "**`useCallback`** – caches a **function** reference (= `useMemo(() => fn, deps)`)",
     "They work together: `React.memo(Child)` only helps if the parent passes **stable props** (memoized objects/callbacks)",
     "Use `useMemo` for **expensive calculations** or to keep **referential equality**; don't wrap everything",
     "The **React Compiler** can add this memoization automatically"],
  code:`const filtered = useMemo(() => items.filter(i => i.name.includes(query)), [items, query]);
const onSelect = useCallback((id: string) => setSelected(id), []);
const Row = React.memo(function Row({ item, onSelect }: RowProps) { /* ... */ });` },

{ cat:"Rendering & Reconciliation", q:"How do events bubble through a React Portal, and what are portal use cases?",
  a:["`createPortal(children, domNode)` renders children into a **different DOM node** (e.g. `document.body`)",
     "Use cases: **modals, dialogs, tooltips, dropdowns, toasts** — escape `overflow:hidden` and `z-index` stacking contexts",
     "Events bubble according to the **React tree, not the DOM tree** → a click inside the portal reaches the parent component's `onClick`",
     "Context also flows through portals normally",
     "Accessibility: manage **focus trapping**, `aria-modal`, `role=\"dialog\"`, close on **Escape**, restore focus on close"],
  code:`function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return createPortal(
    <div className="backdrop" onClick={onClose}>
      <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>{children}</div>
    </div>,
    document.body
  );
}` },

{ cat:"Context & State Management", q:"Explain Redux data flow with useSelector and useDispatch (Redux Toolkit).",
  a:["**Store** – single source of truth (`configureStore`)",
     "**Slice** – `createSlice` generates the **reducer + action creators**; Immer lets you write 'mutating' code safely",
     "**Dispatch** – component calls `dispatch(action)`",
     "**Reducer** – computes the new state",
     "**useSelector** – subscribes to a slice of state; component re-renders only when that selected value changes",
     "Async: `createAsyncThunk` or **RTK Query** for API calls",
     "Flow: UI → dispatch(action) → reducer → new state → useSelector → UI re-renders"],
  code:`const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as Item[] },
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => { state.items.push(action.payload); },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});
export const { addItem, removeItem } = cartSlice.actions;
export const store = configureStore({ reducer: { cart: cartSlice.reducer } });

function CartButton({ item }: { item: Item }) {
  const count = useSelector((s: RootState) => s.cart.items.length);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(addItem(item))}>Add ({count})</button>;
}` },

{ cat:"Context & State Management", q:"Redux Thunk vs Redux Saga vs RTK Query — what's the difference?",
  a:["**Thunk** – dispatch a **function** that can do async work then dispatch actions; simplest, built into RTK (`createAsyncThunk`)",
     "**Saga** – uses **generator functions** to orchestrate complex flows (cancellation, debounce, retries, races); more powerful but more complex",
     "**RTK Query** – data fetching & **caching** layer: auto-generated hooks, cache invalidation via tags, loading/error state",
     "Rule of thumb: **API data → RTK Query** (or TanStack Query); simple async → thunk; complex long-running workflows → saga"] },

{ cat:"Routing", q:"How do nested routes work in React Router v6+ (Outlet, useParams, useNavigate)?",
  a:["Define routes as a **tree**; parent renders `<Outlet />` where child routes appear",
     "`index` route = default child",
     "`useParams()` reads `:id`; `useSearchParams()` reads query strings",
     "`useNavigate()` for programmatic navigation; `<Navigate to=... replace />` for redirects",
     "`path=\"*\"` for a 404 route",
     "Data routers (`createBrowserRouter`) add **loaders/actions** and `errorElement`"],
  code:`const router = createBrowserRouter([
  { path: '/', element: <Layout />, errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetail />, loader: productLoader },
      { path: '*', element: <NotFound /> },
    ] },
]);

function Layout() { return <><Nav /><main><Outlet /></main></>; }
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <button onClick={() => navigate('/products')}>Back from {id}</button>;
}` },

{ cat:"Routing", q:"How do you implement role-based route guards in React with Keycloak (the React equivalent of Angular guards)?",
  a:["React has no built-in guards → wrap routes in a **guard component** that checks auth and renders `<Outlet />` or `<Navigate />`",
     "Initialize **keycloak-js** once (`onLoad: 'login-required'` or `'check-sso'`, `pkceMethod: 'S256'`)",
     "Expose auth state through **Context** (`useAuth()`)",
     "Check roles with `keycloak.hasRealmRole('admin')` or `hasResourceRole`",
     "Refresh tokens with `keycloak.updateToken(30)` before API calls; attach `Authorization: Bearer` header",
     "Remember: client-side guards are **UX only** — the **API must validate the token and roles**"],
  code:`const keycloak = new Keycloak({ url: 'https://sso.example.com', realm: 'demo', clientId: 'spa' });
await keycloak.init({ onLoad: 'check-sso', pkceMethod: 'S256' });

function RequireRole({ roles }: { roles?: string[] }) {
  const location = useLocation();
  if (!keycloak.authenticated) {
    keycloak.login({ redirectUri: window.location.origin + location.pathname });
    return null;
  }
  if (roles && !roles.some(r => keycloak.hasRealmRole(r))) return <Navigate to="/forbidden" replace />;
  return <Outlet />;
}

<Route element={<RequireRole roles={['admin']} />}>
  <Route path="/admin" element={<AdminPage />} />
</Route>

// API calls
async function api(url: string) {
  await keycloak.updateToken(30);
  return fetch(url, { headers: { Authorization: 'Bearer ' + keycloak.token } });
}` },

{ cat:"Security & Best Practices", q:"Where should you store auth tokens in a React SPA?",
  a:["**localStorage/sessionStorage** – easy but readable by **any XSS** script → avoid for long-lived tokens",
     "**In memory** (variable/context) – safer against persistence attacks, lost on refresh → refresh silently",
     "**HttpOnly, Secure, SameSite cookies** – JS **cannot read** them; need **CSRF** protection",
     "Best practice: **BFF (Backend-for-Frontend)** pattern — server holds tokens, browser only has a session cookie",
     "Use **Authorization Code + PKCE** (never implicit flow), short-lived access tokens, rotate refresh tokens",
     "Plus: strict **CSP**, sanitize HTML (`DOMPurify`), keep dependencies patched"] },

{ cat:"Security & Best Practices", q:"How do you build responsive design in a React app?",
  a:["**Mobile-first CSS** with media queries; layout with **Flexbox and CSS Grid**",
     "Fluid units: `%`, `rem`, `vw`, `clamp()`; responsive images with `srcSet`/`sizes`",
     "**Container queries** (`@container`) for component-level responsiveness",
     "UI frameworks: **Tailwind** breakpoints (`md:flex`), MUI `Grid`/`useMediaQuery`, Bootstrap",
     "Prefer **CSS over JS**; use a `useMediaQuery` hook only when behavior (not style) must change",
     "Test on real devices / DevTools device mode; meet **accessibility** (tap targets, zoom)"],
  code:`function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}
const isMobile = useMediaQuery('(max-width: 768px)');` },

{ cat:"Advanced Patterns", q:"How do you handle errors comprehensively in React (render, async, event handlers, global)?",
  a:["**Error Boundaries** catch errors during **render, lifecycle and constructors** of children — show fallback UI",
     "They do **NOT** catch errors in **event handlers, async code (setTimeout/fetch), SSR**, or the boundary itself",
     "Event handlers / async → **try/catch** and set error state; or rethrow into a boundary via state (`throw` during render)",
     "Use `react-error-boundary` for `resetKeys`, `onReset`, `useErrorBoundary()`",
     "Data libraries (TanStack Query, RTK Query) expose `error` state and can throw to boundaries",
     "Global: `window.onerror` / `unhandledrejection` + logging (**Sentry, App Insights**)",
     "React 19: `createRoot(el, { onCaughtError, onUncaughtError })` for central reporting"],
  code:`<ErrorBoundary FallbackComponent={ErrorFallback} onError={logToSentry} resetKeys={[userId]}>
  <UserProfile id={userId} />
</ErrorBoundary>

function SaveButton() {
  const { showBoundary } = useErrorBoundary();
  const onClick = async () => {
    try { await save(); }
    catch (e) { showBoundary(e); }          // forward async error to nearest boundary
  };
  return <button onClick={onClick}>Save</button>;
}` },

{ cat:"Performance", q:"What practical checklist do you follow to improve React app performance?",
  a:["**Measure first**: React DevTools Profiler, Lighthouse, Web Vitals (LCP, INP, CLS)",
     "**Reduce bundle**: route-based `lazy()` + `Suspense`, tree-shaking, analyze with `vite-bundle-visualizer`/`webpack-bundle-analyzer`",
     "**Avoid wasted renders**: state colocation, split contexts, `React.memo` + stable props, React Compiler",
     "**Large lists**: virtualization (`react-window`, TanStack Virtual)",
     "**Responsiveness**: `useTransition` / `useDeferredValue`, debounce input",
     "**Data**: cache with TanStack Query/RTK Query, prefetch, avoid request waterfalls",
     "**Assets**: compress/lazy-load images, CDN, HTTP caching; **SSR/SSG** for faster first paint"] },
]);
