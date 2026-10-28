// Advanced Angular study questions (senior / lead level).
// Appended to PREP_DATA so existing question numbers (and saved "known" progress) stay stable.
PREP_DATA.push(...[

// ───────────── Advanced: Compiler & Rendering ─────────────
{ cat:"Advanced: Compiler & Rendering", q:"How does the Ivy compiler turn a template into code?",
  a:["Each component is compiled to a static **`ɵcmp` definition** with a **template function**",
     "Template function has 2 modes: **create** (build DOM once) and **update** (refresh bindings)",
     "Uses **instructions** like `ɵɵelementStart`, `ɵɵtext`, `ɵɵproperty`, `ɵɵtextInterpolate`",
     "**Locality**: each component compiled using only its own metadata → faster incremental builds",
     "Unused instructions are **tree-shaken** → smaller bundles"],
  tip:"Ivy = template → instruction calls (create + update blocks)." },

{ cat:"Advanced: Compiler & Rendering", q:"Incremental DOM (Angular) vs Virtual DOM (React) — what's the difference?",
  a:["**Virtual DOM**: re-render creates a **new tree in memory**, then diffs it with the old one",
     "**Incremental DOM**: template instructions walk the **real DOM** and update in place — **no tree copy**",
     "Incremental DOM → **lower memory**, tree-shakable instructions",
     "Angular compares **bindings** (previous value stored in `LView`), not whole element trees"] },

{ cat:"Advanced: Compiler & Rendering", q:"What are LView and TView?",
  a:["**TView** (Template View) – **static, shared** data for a template: structure, binding indexes, directives",
     "**LView** (Logical View) – **per-instance** array storing DOM nodes, binding values, context, flags",
     "One TView per component type, one LView per component instance",
     "Change detection walks the **LView tree** and compares stored binding values"] },

{ cat:"Advanced: Compiler & Rendering", q:"What causes ExpressionChangedAfterItHasBeenCheckedError and how do you fix it?",
  a:["**Dev-mode** check: Angular runs a **second verification pass** after CD",
     "Error if a binding value **changed during the same cycle** (one-way data flow violated)",
     "Typical causes: changing parent state in child `ngAfterViewInit`, getters returning new values, services updated during render",
     "Fixes: move logic earlier (`ngOnInit`), make data flow one-directional, use **signals**/async pipe",
     "Last resort: `Promise.resolve().then(...)` / `setTimeout` or `cdr.detectChanges()` — treat as a smell"] },

{ cat:"Advanced: Compiler & Rendering", q:"How does Angular's change detection traverse the tree with OnPush and signals?",
  a:["CD starts at the **root** and goes **top-down** through LViews",
     "**OnPush** views are **skipped** unless marked **dirty**",
     "`markForCheck()` / events / async pipe mark the view **and all ancestors** dirty",
     "**Signals** (v17+) mark only the consuming view with `RefreshView` → **local / targeted change detection**",
     "Ancestors get a `HasChildViewsToRefresh` flag and are traversed but **not re-checked**"] },

{ cat:"Advanced: Compiler & Rendering", q:"What is the @let template syntax?",
  a:["Declares a **read-only local variable** in the template (v18.1+)",
     "Avoids repeating expressions / multiple async pipes",
     "Scoped to the view & its children; re-evaluated on change detection"],
  code:`@let user = user$ | async;
@let fullName = user?.first + ' ' + user?.last;
<h1>{{ fullName }}</h1>` },

// ───────────── Advanced: Signals Deep Dive ─────────────
{ cat:"Advanced: Signals Deep Dive", q:"How do signals work internally?",
  a:["Signals form a **reactive graph** of **producers** (signal) and **consumers** (computed, effect, template)",
     "Reading a signal inside a reactive context **registers a dependency** automatically",
     "Writing **pushes a dirty notification**; values are **pulled lazily** when read",
     "`computed` is **memoized** and only recomputes if a dependency's **version** changed",
     "**Glitch-free**: consumers never see inconsistent intermediate state"],
  tip:"Push dirty notifications, pull values lazily." },

{ cat:"Advanced: Signals Deep Dive", q:"What are effect() pitfalls and best practices?",
  a:["Effects run **asynchronously** during change detection — not immediately after `.set()`",
     "**Don't use effects to sync state** → prefer `computed` or `linkedSignal`",
     "Good uses: logging, localStorage sync, imperative DOM/3rd-party APIs",
     "Use `untracked(() => …)` to read a signal **without** creating a dependency",
     "Effects need an **injection context**; auto-destroyed with the component (`DestroyRef`)",
     "Use `onCleanup` param to cancel timers/requests"],
  code:`effect((onCleanup) => {
  const id = this.userId();                       // tracked
  const log = untracked(() => this.logLevel());   // not tracked
  const t = setTimeout(() => save(id), 500);
  onCleanup(() => clearTimeout(t));
});` },

{ cat:"Advanced: Signals Deep Dive", q:"What are linkedSignal and resource / rxResource?",
  a:["`linkedSignal` – **writable** signal that **resets** when a source signal changes (e.g. selected item resets when list changes)",
     "`resource({ params, loader })` – loads **async data** into signals: `value()`, `status()`, `error()`, `isLoading()`",
     "Automatically **re-fetches** when params change and **aborts** previous via `abortSignal`",
     "`rxResource` – same but loader returns an Observable; `httpResource` – HttpClient-based"],
  code:`selected = linkedSignal(() => this.options()[0]);

user = resource({
  params: () => ({ id: this.userId() }),
  loader: ({ params, abortSignal }) =>
    fetch(\`/api/users/\${params.id}\`, { signal: abortSignal }).then(r => r.json())
});` },

{ cat:"Advanced: Signals Deep Dive", q:"How do toSignal and toObservable work, and what are their gotchas?",
  a:["`toSignal(obs$)` – subscribes immediately, **auto-unsubscribes** on destroy",
     "Initial value is `undefined` unless `initialValue` or `requireSync: true`",
     "Must be called in an **injection context**",
     "`toObservable(sig)` – emits via an **effect** → **asynchronous**, values may be coalesced",
     "Errors from the Observable are **thrown when the signal is read**"] },

{ cat:"Advanced: Signals Deep Dive", q:"How would you design state management with signals only (no NgRx)?",
  a:["**Service** with private writable signals + public `asReadonly()` / `computed` selectors",
     "Methods as **actions** that call `update()` immutably",
     "Async via `resource` / `rxMethod` or RxJS → `toSignal`",
     "For bigger needs: **NgRx SignalStore** (`signalStore`, `withState`, `withComputed`, `withMethods`, `withEntities`)"],
  code:`@Injectable({ providedIn: 'root' })
export class TodoStore {
  private _todos = signal<Todo[]>([]);
  todos = this._todos.asReadonly();
  done = computed(() => this._todos().filter(t => t.done).length);
  add(t: Todo) { this._todos.update(list => [...list, t]); }
}` },

// ───────────── Advanced: Dependency Injection ─────────────
{ cat:"Advanced: Dependency Injection", q:"Explain the full DI resolution order (element vs environment injectors).",
  a:["1️⃣ Search **element injectors** upward: current directive/component → parent components → root component",
     "2️⃣ If not found, search **environment injectors**: route/lazy injector → root → platform",
     "3️⃣ Finally **NullInjector** → throws `NullInjectorError` (unless `optional`)",
     "Modifiers (`self`, `skipSelf`, `host`) restrict this search"],
  tip:"Element tree first, then environment tree." },

{ cat:"Advanced: Dependency Injection", q:"What is the difference between providers and viewProviders?",
  a:["`providers` – visible to the component's **view AND projected content** (`ng-content`)",
     "`viewProviders` – visible **only to the component's own view**, **not** to projected content",
     "Use `viewProviders` to hide internal services from content children"] },

{ cat:"Advanced: Dependency Injection", q:"What are multi providers and app initializers?",
  a:["`multi: true` → token resolves to an **array** of all registered values",
     "Used by `HTTP_INTERCEPTORS`, `NG_VALIDATORS`, `APP_INITIALIZER`",
     "`provideAppInitializer(() => …)` (v19) / `APP_INITIALIZER` – run code **before app starts** (load config, auth)",
     "Returning a Promise/Observable **delays bootstrap** until complete",
     "`ENVIRONMENT_INITIALIZER` runs when an environment injector (e.g. lazy route) is created"],
  code:`providers: [
  provideAppInitializer(() => inject(ConfigService).load())
]` },

{ cat:"Advanced: Dependency Injection", q:"What is an injection context and runInInjectionContext?",
  a:["A context where `inject()` is allowed: constructors, field initializers, factory functions, provider `useFactory`, functional guards/resolvers/interceptors",
     "Outside it, `inject()` throws **NG0203**",
     "`runInInjectionContext(injector, () => …)` – run code in a context manually (e.g. inside a callback)",
     "`assertInInjectionContext()` – guard for your own helper functions"] },

{ cat:"Advanced: Dependency Injection", q:"How do you write reusable 'inject functions' (composition helpers)?",
  a:["Plain functions that call `inject()` and return values/signals",
     "Must be called from an injection context",
     "Angular's equivalent of **React custom hooks**",
     "Use `DestroyRef` inside for automatic cleanup"],
  code:`export function injectRouteParam(name: string) {
  const route = inject(ActivatedRoute);
  return toSignal(route.paramMap.pipe(map(p => p.get(name))));
}
// usage
id = injectRouteParam('id');` },

// ───────────── Advanced: Directives & Components ─────────────
{ cat:"Advanced: Directives & Components", q:"How do you build a custom structural directive?",
  a:["Inject `TemplateRef` (what to render) and `ViewContainerRef` (where)",
     "Call `vcr.createEmbeddedView(tpl, context)` / `vcr.clear()`",
     "Provide a **context** object (`$implicit` + named values)",
     "Add `static ngTemplateContextGuard` for **type-safe** templates"],
  code:`@Directive({ selector: '[appRepeat]', standalone: true })
export class RepeatDirective {
  private tpl = inject(TemplateRef);
  private vcr = inject(ViewContainerRef);
  @Input() set appRepeat(n: number) {
    this.vcr.clear();
    for (let i = 0; i < n; i++)
      this.vcr.createEmbeddedView(this.tpl, { $implicit: i });
  }
}
// <li *appRepeat="3; let i">Item {{ i }}</li>` },

{ cat:"Advanced: Directives & Components", q:"What is the Directive Composition API (hostDirectives)?",
  a:["Apply directives to a component's **host from inside the component** (v15+)",
     "Reuse behaviors (e.g. tooltip, focus, a11y) **without inheritance**",
     "Expose selected inputs/outputs with aliases",
     "Host directives must be **standalone**"],
  code:`@Component({
  selector: 'app-button',
  hostDirectives: [
    { directive: TooltipDirective, inputs: ['tooltip'] },
    FocusRingDirective
  ]
})` },

{ cat:"Advanced: Directives & Components", q:"How do you create dynamic components with inputs and outputs?",
  a:["`const ref = vcr.createComponent(MyComp, { injector, environmentInjector })`",
     "Set inputs with `ref.setInput('name', value)` → triggers OnPush & ngOnChanges correctly",
     "Subscribe to outputs: `ref.instance.closed.subscribe(...)`",
     "Destroy with `ref.destroy()`",
     "Outside a view: `createComponent(Comp, { environmentInjector, hostElement })` + `appRef.attachView`"] },

{ cat:"Advanced: Directives & Components", q:"What are the limitations of ng-content and how do you work around them?",
  a:["Projected content is **always instantiated**, even inside `@if` → can't lazily create it",
     "Content can be projected **only once** (no repeating)",
     "Workaround: accept an **`ng-template`** (via `@ContentChild(TemplateRef)` or input) and render with `ngTemplateOutlet`",
     "That enables lazy, repeated, context-aware rendering"] },

{ cat:"Advanced: Directives & Components", q:"What are Angular Elements?",
  a:["Package Angular components as **Web Components (custom elements)**",
     "`createCustomElement(Comp, { injector })` + `customElements.define('my-el', el)`",
     "Use Angular widgets in **React, Vue, plain HTML**, CMS pages",
     "Inputs become attributes/properties; outputs become **DOM CustomEvents**"] },

// ───────────── Advanced: RxJS ─────────────
{ cat:"Advanced: RxJS", q:"Why can a catchError in the wrong place kill your stream?",
  a:["When an Observable **errors, it completes** — no more values",
     "`catchError` on the **outer** stream replaces it → e.g. search box stops working after first failure",
     "Put `catchError` **inside** the inner Observable (inside `switchMap`) to keep the outer alive"],
  code:`search$.pipe(
  switchMap(term => this.api.search(term).pipe(
    catchError(() => of([]))       // ✅ inner – outer stream survives
  ))
);` },

{ cat:"Advanced: RxJS", q:"What are the pitfalls of shareReplay?",
  a:["`shareReplay(1)` without `refCount` keeps the **source subscribed forever** → possible memory leak",
     "Use `shareReplay({ bufferSize: 1, refCount: true })` to unsubscribe when no subscribers",
     "But with refCount, re-subscribing later **re-executes** the source (e.g. new HTTP call)",
     "Errors are not cached; a later subscriber retries"] },

{ cat:"Advanced: RxJS", q:"How do you write a custom RxJS operator?",
  a:["An operator is a function `(source: Observable<T>) => Observable<R>`",
     "Easiest: **compose existing operators** with `pipe()`",
     "Full control: `new Observable(subscriber => source.subscribe({...}))`"],
  code:`export const filterNil = <T>() =>
  (src: Observable<T | null | undefined>) =>
    src.pipe(filter((v): v is T => v != null));

export function retryWithBackoff<T>(count = 3, ms = 500) {
  return (src: Observable<T>) => src.pipe(
    retry({ count, delay: (_, i) => timer(ms * 2 ** i) })
  );
}` },

{ cat:"Advanced: RxJS", q:"What are RxJS schedulers?",
  a:["Control **when** notifications are delivered",
     "`asyncScheduler` – setTimeout-like; `asapScheduler` – microtask; `queueScheduler` – sync trampolining; `animationFrameScheduler` – requestAnimationFrame",
     "Used via `observeOn`, `subscribeOn`, or operator args (`debounceTime(300, scheduler)`)",
     "Useful for **testing** (TestScheduler) and smooth animations"] },

{ cat:"Advanced: RxJS", q:"What is marble testing?",
  a:["Test Observables with **ASCII diagrams** of time using `TestScheduler`",
     "`-` = 1 frame, `a` = value, `|` = complete, `#` = error",
     "Virtual time → test `debounceTime`, `delay` **synchronously**"],
  code:`testScheduler.run(({ cold, expectObservable }) => {
  const src = cold('a-b-c|');
  expectObservable(src.pipe(map(x => x.toUpperCase())))
    .toBe('A-B-C|');
});` },

// ───────────── Advanced: Router ─────────────
{ cat:"Advanced: Router", q:"What is a RouteReuseStrategy?",
  a:["Controls whether route components are **destroyed or cached** on navigation",
     "Implement `shouldDetach`, `store`, `shouldAttach`, `retrieve`, `shouldReuseRoute`",
     "Use case: keep list page **scroll & state** when going to details and back (tabs-like UX)",
     "Watch memory: cached components stay alive"] },

{ cat:"Advanced: Router", q:"How do you create a custom preloading strategy?",
  a:["Implement `PreloadingStrategy.preload(route, load)`",
     "Return `load()` to preload or `of(null)` to skip",
     "Example: preload only routes with `data: { preload: true }`, or on network conditions",
     "Register: `withPreloading(SelectivePreloading)`"],
  code:`@Injectable({ providedIn: 'root' })
export class SelectivePreloading implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>) {
    return route.data?.['preload'] ? load() : of(null);
  }
}` },

{ cat:"Advanced: Router", q:"What router features help advanced scenarios?",
  a:["**Router events** (`NavigationStart/End/Error`) → loaders, analytics",
     "**UrlMatcher** – custom URL matching logic",
     "**TitleStrategy** – set page titles from route data",
     "`withComponentInputBinding()` – params/data → inputs",
     "`withViewTransitions()` – animated page transitions",
     "**Named / auxiliary outlets** – multiple outlets (e.g. side panel)",
     "`canMatch` – role-based alternative routes for the same path"] },

// ───────────── Advanced: State (NgRx) ─────────────
{ cat:"Advanced: State (NgRx)", q:"What do modern NgRx Store APIs look like (createActionGroup, createFeature, functional effects)?",
  a:["`createActionGroup` – defines related actions in one place; event names become camelCase action creators",
     "`createFeature` – feature name + reducer → **auto-generated selectors** for every state property",
     "**Functional effects** – `createEffect(fn, { functional: true })` with `inject()`; no effect classes",
     "**Standalone setup** – `provideStore()`, `provideState(feature)`, `provideEffects(...)`, `provideStoreDevtools()`",
     "Read state as signals with `store.selectSignal(selector)`; works well with OnPush and zoneless"],
  code:`export const ProductsActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ products: Product[] }>(),
    'Load Failure': props<{ error: string }>(),
  },
});

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    { products: [] as Product[], loading: false },
    on(ProductsActions.load, s => ({ ...s, loading: true })),
    on(ProductsActions.loadSuccess, (s, { products }) => ({ ...s, products, loading: false })),
    on(ProductsActions.loadFailure, s => ({ ...s, loading: false })),
  ),
}); // generates productsFeature.selectProducts, selectLoading

export const loadProducts = createEffect(
  (actions$ = inject(Actions), api = inject(ProductsApi)) => actions$.pipe(
    ofType(ProductsActions.load),
    exhaustMap(() => api.getAll().pipe(
      map(products => ProductsActions.loadSuccess({ products })),
      catchError(() => of(ProductsActions.loadFailure({ error: 'Load failed' })))
    ))
  ),
  { functional: true }
);

// app.config: provideStore(), provideState(productsFeature), provideEffects({ loadProducts })
// component:  products = inject(Store).selectSignal(productsFeature.selectProducts);`,
  tip:"Modern NgRx = action groups + features with generated selectors + functional effects – far less boilerplate." },

{ cat:"Advanced: State (NgRx)", q:"How do memoized selectors work in NgRx?",
  a:["`createSelector(inputs…, projector)` **caches the last inputs & result**",
     "Projector runs only if input selector results **changed by reference**",
     "Compose small selectors into derived ones",
     "Selectors with props are deprecated → use **factory selectors**"] },

{ cat:"Advanced: State (NgRx)", q:"How do you handle errors in NgRx effects correctly?",
  a:["Catch errors **inside** the flattening operator (inner Observable)",
     "Map to a **failure action** instead of letting the effect die",
     "Choose operator by semantics: `switchMap` (latest), `concatMap` (ordered writes), `exhaustMap` (login), `mergeMap` (parallel deletes)"],
  code:`load$ = createEffect(() => this.actions$.pipe(
  ofType(loadUsers),
  switchMap(() => this.api.getUsers().pipe(
    map(users => loadUsersSuccess({ users })),
    catchError(err => of(loadUsersFailure({ err })))
  ))
));` },

{ cat:"Advanced: State (NgRx)", q:"What are @ngrx/entity and the facade pattern?",
  a:["**Entity adapter** stores collections as `{ ids: [], entities: {} }` → O(1) lookups",
     "Provides CRUD helpers (`addOne`, `upsertMany`, `removeOne`) and selectors",
     "**Facade**: a service hiding store details (`users$`, `loadUsers()`) from components",
     "Components don't know about actions/selectors → easier refactoring & testing"] },

// ───────────── Advanced: SSR & Hydration ─────────────
{ cat:"Advanced: SSR & Hydration", q:"How do you avoid duplicate HTTP calls with SSR?",
  a:["Server fetches data, client would fetch it **again** on bootstrap",
     "**HttpClient transfer cache** (`withHttpTransferCacheOptions`, on by default with `provideClientHydration()`) caches GET responses in the HTML",
     "Manual: `TransferState` with `makeStateKey()`"] },

{ cat:"Advanced: SSR & Hydration", q:"What are incremental hydration and event replay?",
  a:["**Incremental hydration** (v19): `@defer (hydrate on viewport | interaction | idle)` — parts stay **dehydrated** until triggered",
     "Reduces JS executed on load → better **INP / TTI**",
     "**Event replay**: captures user clicks before hydration completes and **replays** them afterwards",
     "Enable: `provideClientHydration(withIncrementalHydration(), withEventReplay())`"] },

{ cat:"Advanced: SSR & Hydration", q:"How do you write SSR-safe code?",
  a:["No `window`, `document`, `localStorage` on the server",
     "Use `afterNextRender` / `afterRender` for browser-only DOM work",
     "Or check `isPlatformBrowser(inject(PLATFORM_ID))`",
     "Inject `DOCUMENT` token instead of global `document`",
     "Avoid DOM manipulation that causes **hydration mismatch** (`ngSkipHydration` as escape hatch)"] },

// ───────────── Advanced: Architecture & Scale ─────────────
{ cat:"Advanced: Architecture & Scale", q:"How would you architect a large enterprise Angular application?",
  a:["**Monorepo** with **Nx** (libs: feature, ui, data-access, util) + enforced module boundaries",
     "**Standalone** + lazy-loaded feature routes",
     "Smart/dumb components, **OnPush** everywhere, signals for state",
     "State: services + signals, or NgRx/SignalStore for complex domains",
     "Shared **design system** library",
     "Strict TypeScript, ESLint, CI with affected builds/tests",
     "Consider **micro frontends** only for independent teams/deployments"] },

{ cat:"Advanced: Architecture & Scale", q:"What are micro frontends and how are they done in Angular?",
  a:["Split the UI into **independently deployable apps** owned by different teams",
     "**Module Federation / Native Federation** – load remote apps/components at runtime",
     "Shell (host) app handles routing & shared deps (`shared` singletons for Angular core)",
     "Alternatives: **Angular Elements**, iframes, single-spa",
     "Trade-offs: version alignment, bundle duplication, shared state, consistent UX"] },

{ cat:"Advanced: Architecture & Scale", q:"How do you build and publish an Angular library?",
  a:["`ng generate library my-lib` → built with **ng-packagr** (Angular Package Format)",
     "Expose API via `public-api.ts`",
     "Angular & RxJS as **peerDependencies**",
     "**Secondary entry points** (`my-lib/button`) for better tree-shaking",
     "Ship **schematics** for `ng add` / `ng update` migrations"] },

{ cat:"Advanced: Architecture & Scale", q:"How do you migrate a large app from NgModules to standalone?",
  a:["Run the schematic: `ng g @angular/core:standalone` (3 steps: convert, remove modules, bootstrap)",
     "Migrate **incrementally** — standalone and NgModules interoperate",
     "Replace `RouterModule.forRoot` with `provideRouter`, `HttpClientModule` with `provideHttpClient`",
     "Then migrate control flow (`@if/@for`) and signal inputs with their schematics"] },

{ cat:"Advanced: Architecture & Scale", q:"How do you migrate from AngularJS to Angular?",
  a:["**ngUpgrade** – run AngularJS and Angular **side by side** (hybrid app)",
     "`downgradeComponent` / `upgradeComponent`, `downgradeInjectable`",
     "Migrate **bottom-up** (leaf components & services first) or route by route",
     "Alternative: rewrite + micro frontends / strangler pattern"] },

// ───────────── Advanced: Performance & Debugging ─────────────
{ cat:"Advanced: Performance & Debugging", q:"How do you find and fix memory leaks in an Angular app?",
  a:["Chrome DevTools **Memory** tab → heap snapshots before/after navigating away",
     "Look for **detached DOM nodes** and component instances still retained",
     "Common causes: un-unsubscribed Observables, `setInterval`, global listeners, `shareReplay` without refCount, caches in root services",
     "Fix with `takeUntilDestroyed`, `DestroyRef.onDestroy`, async pipe, signals"] },

{ cat:"Advanced: Performance & Debugging", q:"When and how do you use NgZone.runOutsideAngular?",
  a:["For high-frequency events that **don't need UI updates every time**: mousemove, scroll, animation loops, websockets ticks",
     "Prevents a change detection run per event",
     "Re-enter with `zone.run(() => …)` only when the UI must update",
     "Not needed in **zoneless** apps"],
  code:`this.zone.runOutsideAngular(() => {
  window.addEventListener('mousemove', e => {
    if (this.shouldUpdate(e)) this.zone.run(() => this.pos = e);
  });
});` },

{ cat:"Advanced: Performance & Debugging", q:"How do you use Web Workers in Angular?",
  a:["`ng generate web-worker my-worker` sets up config",
     "Move **CPU-heavy work** (parsing, image processing, big calculations) off the main thread",
     "Communicate with `postMessage` / `onmessage` (or Comlink)",
     "Workers have **no DOM access**"] },

{ cat:"Advanced: Performance & Debugging", q:"How do you use the CDK virtual scroll and when is it needed?",
  a:["`<cdk-virtual-scroll-viewport itemSize=\"48\">` + `*cdkVirtualFor`",
     "Renders **only visible items** → constant DOM size for 10k+ rows",
     "Requires **fixed item size** (or custom strategy for variable)",
     "Combine with OnPush & trackBy"] },

// ───────────── Advanced: Testing ─────────────
{ cat:"Advanced: Testing", q:"What are component harnesses (CDK testing)?",
  a:["Test API that interacts with components **like a user**, hiding DOM details",
     "`TestbedHarnessEnvironment.loader(fixture)` → `loader.getHarness(MatButtonHarness)`",
     "Tests don't break when internal markup changes",
     "Same harness works in unit and E2E environments; write your own with `ComponentHarness`"] },

{ cat:"Advanced: Testing", q:"How do you test OnPush components, signals and async code?",
  a:["Change inputs with `fixture.componentRef.setInput()` → triggers OnPush correctly",
     "Signals: set the signal then `fixture.detectChanges()` (or `autoDetect`)",
     "Time: `fakeAsync` + `tick()` / `flush()`; or `jasmine.clock()` / Jest fake timers",
     "HTTP: `HttpTestingController.expectOne(url).flush(data)`",
     "`TestBed.runInInjectionContext` to test `inject()`-based functions"] },

// ───────────── Advanced: Security & i18n ─────────────
{ cat:"Advanced: Security & i18n", q:"How do CSP and Trusted Types work with Angular?",
  a:["**CSP** restricts which scripts/styles can run; Angular supports **nonce** via `ngCspNonce` attribute / `CSP_NONCE` token",
     "**Trusted Types** – browser enforces that only sanitized values reach DOM sinks",
     "Angular has a built-in Trusted Types policy (`angular`) — enable via CSP header `require-trusted-types-for 'script'`",
     "Avoid `bypassSecurityTrust*` with user data"] },

{ cat:"Advanced: Security & i18n", q:"How does internationalization (i18n) work in Angular?",
  a:["Mark text with `i18n` attribute / `$localize` in code",
     "`ng extract-i18n` → translation files (XLIFF/JSON)",
     "Built-in i18n compiles **one bundle per locale** at build time (fast, no runtime lookup)",
     "Runtime switching needs libraries like **Transloco** / ngx-translate",
     "Locale-aware pipes: `date`, `currency`, `number`"] },

// ───────────── Advanced: Scenario-based ─────────────
{ cat:"Advanced: Scenario-based", q:"A dashboard with many widgets is sluggish. Walk through your optimization approach.",
  a:["**Profile** with Angular DevTools (CD cycles, slow components) & Chrome Performance",
     "Switch widgets to **OnPush + signals**",
     "Replace template method calls with **computed / pure pipes**",
     "**@defer (on viewport)** for below-the-fold widgets",
     "Throttle real-time updates; run websocket handling **outside Angular**",
     "Virtual scroll for big tables; `track` in loops",
     "Move heavy calculations to **Web Workers**"] },

{ cat:"Advanced: Scenario-based", q:"How would you implement token refresh with concurrent requests?",
  a:["Interceptor catches **401**",
     "If a refresh is **already running**, queue other requests (BehaviorSubject / shared Observable)",
     "Only **one** refresh call → then retry all queued requests with new token",
     "If refresh fails → logout & redirect",
     "Skip interceptor logic for the refresh endpoint itself"],
  code:`private refresh$?: Observable<string>;

handle401(req, next) {
  this.refresh$ ??= this.auth.refresh().pipe(
    finalize(() => this.refresh$ = undefined), shareReplay(1));
  return this.refresh$.pipe(
    switchMap(t => next(req.clone({ setHeaders: { Authorization: \`Bearer \${t}\` } }))));
}` },

{ cat:"Advanced: Scenario-based", q:"How do you build a reusable, accessible form control library?",
  a:["Implement **ControlValueAccessor** so controls work with reactive & template forms",
     "Support `disabled`, `touched`, validation display via `NgControl` injection",
     "Use **CDK a11y** (FocusMonitor, LiveAnnouncer, aria attributes)",
     "**hostDirectives** for shared behavior; **OnPush** + signal inputs",
     "Test with **harnesses**; document with Storybook"] }

].map(q => ({ ...q, level:'Advanced' })));
