// Extra Angular questions based on past study topics (parent→child data, routing/guards, lifecycle, services, DI, RxJS, NgRx).
PREP_DATA.push(...[
{ cat:"Fundamentals", q:"Angular vs React — which is better for enterprise app development?",
  a:["**Angular** = full **framework**: routing, forms, HttpClient, DI, testing, CLI built in → **consistent structure** across large teams",
     "**React** = **UI library**: you choose router, state, forms, data fetching → more **flexibility**, more decisions",
     "Angular strengths: **TypeScript-first**, opinionated architecture, strong DI, long-term support releases, great for **large line-of-business apps**",
     "React strengths: huge ecosystem & talent pool, **Next.js/SSR**, React Native for mobile, lighter learning curve",
     "Angular weaknesses: steeper learning curve (RxJS, DI, decorators); React weaknesses: **architecture drift** between teams without strong conventions",
     "Choose by **team skills, existing ecosystem, governance needs, SSR/mobile needs** — both are enterprise-ready"],
  tip:"Interview answer: 'Angular gives guardrails, React gives freedom — for big teams that need consistency I lean Angular; for flexibility, SSR with Next.js or mobile reuse I lean React.'" },

{ cat:"Modules & Architecture", q:"What is the difference between an Angular component and a module?",
  a:["**Component** = a piece of **UI**: TypeScript class + template + styles, decorated with `@Component`",
     "**NgModule** = a **container/compilation context** that groups components, directives, pipes and providers, decorated with `@NgModule`",
     "A component **renders** something; a module **organizes and wires** things (declarations, imports, exports, providers)",
     "Before v14 every component **had to be declared** in exactly one NgModule",
     "Today **standalone components** import their own dependencies (`imports: [...]`) → NgModules are **optional** (default since v17)",
     "Modules are still useful for legacy code and some libraries"],
  code:`// Component
@Component({ selector: 'app-user', standalone: true, imports: [DatePipe],
  template: '<p>{{ user().name }} - {{ user().joined | date }}</p>' })
export class UserComponent { user = input.required<User>(); }

// NgModule (legacy style)
@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, RouterModule],
  exports: [UserListComponent]
})
export class UsersModule {}` },

{ cat:"Component Communication", q:"What are ALL the ways to pass data from a parent component to a child component?",
  a:["**1. `@Input()` / signal `input()`** – the standard way: `<app-child [user]=\"user\">`",
     "**2. `@Input` with a setter** or **`ngOnChanges`** – react whenever the input value changes",
     "**3. `@ViewChild`** – parent gets a reference to the child instance and calls methods/sets properties",
     "**4. Template reference variable** – `<app-child #c>` then `c.doSomething()` in the parent template",
     "**5. Shared service** (BehaviorSubject / signal) – works for any relationship, not just parent→child",
     "**6. Content projection** – `<ng-content>` passes **markup** into the child",
     "**7. DI from parent** – child injects the parent component/service provided at parent level (`providers: [...]`)",
     "**8. Router** – route params, query params, `data`, resolvers or `withComponentInputBinding()`",
     "Child → parent: **`@Output()` / `output()`**, `model()` for two-way, or a shared service"],
  code:`// Parent
@Component({ selector: 'app-parent', standalone: true, imports: [ChildComponent],
  template: \`
    <app-child #c [title]="title" [(count)]="count" (saved)="onSaved($event)">
      <p>Projected content</p>
    </app-child>
    <button (click)="c.reset()">Reset via template ref</button>\` })
export class ParentComponent {
  title = 'Hello';
  count = signal(0);
  @ViewChild(ChildComponent) child!: ChildComponent;   // 3. ViewChild
  onSaved(v: string) { console.log(v); }
}

// Child
@Component({ selector: 'app-child', standalone: true,
  template: '<h3>{{ title() }}</h3><ng-content /><button (click)="save()">Save</button>' })
export class ChildComponent {
  title = input<string>('');        // 1. signal input
  count = model(0);                  // two-way binding
  saved = output<string>();          // child -> parent
  save() { this.saved.emit('done'); }
  reset() { this.count.set(0); }
}` },

{ cat:"Lifecycle Hooks", q:"Which lifecycle hooks matter most for performance, and what are afterNextRender and DestroyRef?",
  a:["`ngDoCheck`, `ngAfterContentChecked`, `ngAfterViewChecked` run on **every change detection cycle** → keep them **tiny** or avoid",
     "`ngOnChanges` runs on every **input change** — avoid heavy work, compare `previousValue`/`currentValue`",
     "Do initial data loading in **`ngOnInit`**, not the constructor",
     "Clean up subscriptions, timers, listeners in **`ngOnDestroy`** to avoid memory leaks",
     "**`afterNextRender()` / `afterRender()`** (v16+) – run code after the DOM renders (e.g. measure elements, init 3rd-party charts); **browser-only**, SSR-safe",
     "**`DestroyRef`** – inject it and call `onDestroy(cb)`; used by `takeUntilDestroyed()`"],
  code:`export class ChartComponent {
  private destroyRef = inject(DestroyRef);
  constructor() {
    afterNextRender(() => this.initChart());           // DOM is ready, browser only
    interval(1000).pipe(takeUntilDestroyed()).subscribe(() => this.tick());
    this.destroyRef.onDestroy(() => this.chart?.destroy());
  }
}` },

{ cat:"Routing", q:"How do you write a functional route guard (CanActivateFn) with role checking?",
  a:["Since v15, guards are **plain functions**; class guards are deprecated",
     "Use `inject()` inside the function to get services",
     "Return `true`, `false`, a **`UrlTree`** (redirect), or an Observable/Promise of these",
     "Prefer returning a **UrlTree** over calling `router.navigate()` inside a guard — avoids navigation race conditions",
     "Pass required roles through route **`data`**"],
  code:`export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
  const roles = route.data['roles'] as string[] | undefined;
  return !roles || roles.some(r => auth.hasRole(r)) ? true : router.createUrlTree(['/forbidden']);
};

export const routes: Routes = [
  { path: 'admin', canActivate: [roleGuard], data: { roles: ['admin'] },
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) },
];` },

{ cat:"Routing", q:"What is the difference between canActivate, canActivateChild, canMatch and canDeactivate?",
  a:["**canActivate** – can the user **enter** this route? (route still matched; lazy code may already be loaded)",
     "**canActivateChild** – runs before activating **any child** route; one guard protects a whole section",
     "**canMatch** – can this route even be **matched**? If false the router tries the **next route**, and **lazy chunks are not downloaded** (replaces deprecated `canLoad`)",
     "**canDeactivate** – can the user **leave**? Used for unsaved-changes prompts",
     "**resolve** – not a guard, but pre-fetches data before activation",
     "Order: canMatch → canActivateChild (parents) → canActivate → resolve; canDeactivate runs first on the route being left"],
  code:`{ path: 'dashboard', canMatch: [isAdmin], loadComponent: () => import('./admin-dash') },
{ path: 'dashboard', loadComponent: () => import('./user-dash') },   // fallback when canMatch=false
{ path: 'settings', canActivateChild: [authGuard], children: [ /* ... */ ] },
{ path: 'edit/:id', component: EditComponent, canDeactivate: [unsavedChangesGuard] }` },

{ cat:"Routing", q:"How do you pass data to a route (params, query params, data, state)?",
  a:["**Path params** – `/users/:id` → `route.paramMap` or `input()` with `withComponentInputBinding()`",
     "**Query params** – `/users?page=2` → `route.queryParamMap`; set via `[queryParams]` or `router.navigate([], { queryParams })`",
     "**Static `data`** – `{ path, data: { title: 'Users', roles: [...] } }` → `route.data`",
     "**Resolver data** – fetched before navigation → `route.data` or component input",
     "**Navigation state** – `router.navigate(['/x'], { state: { item } })` → `history.state`; **not** kept on refresh",
     "Rule: anything that must survive refresh/bookmark goes in **path or query params**"],
  code:`// app.config.ts
provideRouter(routes, withComponentInputBinding())

// Component receives route param, query param and data as inputs
export class UserComponent {
  id = input.required<string>();      // :id
  page = input<string>();              // ?page=
  title = input<string>();             // data.title
}` },

{ cat:"Routing", q:"How do you set up nested (child) routes, wildcard and redirect routes?",
  a:["**Child routes** render inside the parent's own `<router-outlet>`",
     "**Redirect**: `{ path: '', redirectTo: 'home', pathMatch: 'full' }` — `pathMatch:'full'` is required for empty paths",
     "**Wildcard**: `{ path: '**', component: NotFoundComponent }` must be **last** (first match wins)",
     "**Named outlets** allow secondary routes, e.g. `<router-outlet name=\"side\">`",
     "Lazy-load a whole feature with `loadChildren: () => import('./admin/routes')`"],
  code:`export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsShellComponent,     // has <router-outlet>
    children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailComponent },
    ] },
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES) },
  { path: '**', component: NotFoundComponent },
];` },

{ cat:"Dependency Injection & Services", q:"What is the difference between @Injectable, @Inject and the providers array?",
  a:["**`@Injectable()`** – marks a **class** as able to receive injected dependencies; `providedIn` also registers it",
     "**`@Inject(TOKEN)`** – used on a **constructor parameter** when the token is not a class (e.g. `InjectionToken`, string)",
     "**`providers: [...]`** – **registers** how to create a dependency at a specific injector level (app, route, component)",
     "Modern alternative: `inject(TOKEN)` function instead of `@Inject`",
     "Same service in **component `providers`** → **new instance per component**; `providedIn: 'root'` → **singleton**"],
  code:`export const API_URL = new InjectionToken<string>('API_URL');

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient, @Inject(API_URL) private apiUrl: string) {}
  // or: private apiUrl = inject(API_URL);
}

bootstrapApplication(AppComponent, { providers: [{ provide: API_URL, useValue: '/api' }] });` },

{ cat:"RxJS & Observables", q:"What is takeUntilDestroyed and how does it compare to takeUntil(destroy$)?",
  a:["`takeUntilDestroyed()` (from `@angular/core/rxjs-interop`) **completes the stream automatically** when the component/service is destroyed",
     "Without arguments it must be called in an **injection context** (constructor/field initializer); otherwise pass a `DestroyRef`",
     "Replaces the old boilerplate: `private destroy$ = new Subject<void>()` + `takeUntil(this.destroy$)` + `next()/complete()` in `ngOnDestroy`",
     "Place it as the **last operator** in the pipe so inner subscriptions are also cleaned up",
     "Even simpler: use the **`async` pipe** or **`toSignal()`** — both unsubscribe automatically"],
  code:`export class SearchComponent {
  private destroyRef = inject(DestroyRef);
  constructor() {
    this.form.valueChanges.pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe(v => this.search(v));
  }
  ngOnInit() {
    this.store.select(selectUser).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(u => this.user = u);
  }
}` },

{ cat:"State Management", q:"Walk through a complete NgRx feature: actions, reducer, selectors and effects.",
  a:["**Action** – describes an event: `[Products Page] Load`",
     "**Reducer** – pure function `(state, action) => newState`, **immutable** updates",
     "**Selector** – memoized query over the store",
     "**Effect** – handles **side effects** (HTTP), listens to actions, dispatches success/failure actions",
     "**Component** – dispatches actions and reads state via selectors (`selectSignal` or `async` pipe)",
     "Flow: Component → **dispatch(action)** → Reducer updates Store → Selector emits → UI; Effect calls API → new action → Reducer"],
  code:`export const ProductActions = createActionGroup({ source: 'Products', events: {
  'Load': emptyProps(),
  'Load Success': props<{ products: Product[] }>(),
  'Load Failure': props<{ error: string }>(),
}});

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer({ items: [] as Product[], loading: false, error: null as string | null },
    on(ProductActions.load, s => ({ ...s, loading: true })),
    on(ProductActions.loadSuccess, (s, { products }) => ({ ...s, items: products, loading: false })),
    on(ProductActions.loadFailure, (s, { error }) => ({ ...s, error, loading: false }))),
});  // auto-generates selectItems, selectLoading, selectError

export const loadProducts = createEffect((actions$ = inject(Actions), api = inject(ProductApi)) =>
  actions$.pipe(ofType(ProductActions.load),
    switchMap(() => api.getAll().pipe(
      map(products => ProductActions.loadSuccess({ products })),
      catchError(e => of(ProductActions.loadFailure({ error: e.message })))))),
  { functional: true });

// Component
products = this.store.selectSignal(productsFeature.selectItems);
ngOnInit() { this.store.dispatch(ProductActions.load()); }` },

{ cat:"Scenario-based", q:"Interview: A user's session expires while they are on a guarded page. How should the app behave?",
  a:["An **HTTP interceptor** catches `401` → tries **token refresh** once",
     "If refresh fails → clear auth state and redirect to login with **`returnUrl`**",
     "Guards only run on **navigation**, so they won't catch expiry on the current page — the **interceptor** handles it",
     "With Keycloak: `keycloak.updateToken(30)` before requests; on failure call `keycloak.login()`",
     "Optionally show a 'session expiring' dialog using the token `exp` claim"] },
]);
