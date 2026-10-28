// Angular study questions — common questions with short, memorizable answers.
// Format: { cat, q, a:[bullets], code?, tip? }   Bullets support `code` and **bold**.
const PREP_KEY = 'angular';
const PREP_DATA = [

// ───────────── Fundamentals ─────────────
{ cat:"Fundamentals", q:"What is Angular?",
  a:["**TypeScript-based, open-source front-end framework** by Google for building SPAs",
     "**Component-based** architecture: UI = tree of components",
     "**Batteries included**: router, forms, HttpClient, DI, testing, CLI, i18n, animations",
     "Uses **AOT compilation**, **change detection** and **dependency injection**",
     "Opinionated & structured → good for large enterprise apps"] },

{ cat:"Fundamentals", q:"What is the difference between AngularJS and Angular?",
  a:["**AngularJS (1.x)**: JavaScript, MVC, `controllers` + `$scope`, digest-cycle dirty checking",
     "**Angular (2+)**: complete rewrite in **TypeScript**, **component-based**",
     "Angular has hierarchical **DI**, **AOT** compilation, mobile support, better performance",
     "Not backward compatible — AngularJS reached end of life in Dec 2021"] },

{ cat:"Fundamentals", q:"What are the main building blocks of an Angular application?",
  a:["**Components** – UI + logic (template, class, styles)",
     "**Templates** – HTML with Angular syntax (binding, directives, pipes)",
     "**Directives** – add behavior / change DOM structure",
     "**Services** – reusable logic & data, injected via **DI**",
     "**Pipes** – transform values in templates",
     "**Routing** – navigate between views",
     "**NgModules** or **standalone** APIs – organize & bootstrap the app"] },

{ cat:"Fundamentals", q:"What are the advantages of Angular?",
  a:["Full framework — no need to pick many libraries",
     "**TypeScript** → type safety, better tooling, refactoring",
     "**Two-way binding**, powerful **DI**, reusable components",
     "**Angular CLI** for scaffolding, build, test, update (`ng update`)",
     "Strong conventions → consistent code across big teams",
     "Backed by Google, predictable release schedule (major every ~6 months)"] },

{ cat:"Fundamentals", q:"What is the Angular CLI and common commands?",
  a:["Command-line tool to create, build, serve, test and update Angular apps",
     "`ng new app` – create project",
     "`ng serve` – dev server with live reload",
     "`ng generate component|service|pipe|guard name` (`ng g c name`)",
     "`ng build` – production build (AOT, minify, tree-shake)",
     "`ng test` / `ng e2e` – run tests",
     "`ng update` – upgrade Angular versions with migrations",
     "`ng add` – add libraries with schematics (e.g. `ng add @angular/material`)"] },

{ cat:"Fundamentals", q:"What happens when an Angular app starts (bootstrapping)?",
  a:["`main.ts` is the entry point",
     "Calls `bootstrapApplication(AppComponent, appConfig)` (standalone) or `platformBrowserDynamic().bootstrapModule(AppModule)` (NgModule)",
     "Angular creates the root injector & providers",
     "Root component is rendered into its selector in `index.html` (e.g. `<app-root>`)",
     "Change detection starts and the component tree renders"],
  code:`// main.ts (standalone)
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()]
});` },

{ cat:"Fundamentals", q:"What is TypeScript and why does Angular use it?",
  a:["**Superset of JavaScript** that adds static types, compiled to JS",
     "Catches errors at **compile time** instead of runtime",
     "Better **IntelliSense**, refactoring, navigation",
     "Supports **decorators**, interfaces, generics, access modifiers",
     "Angular relies on decorators & type metadata for DI and compilation"] },

{ cat:"Fundamentals", q:"What are decorators in Angular?",
  a:["Functions prefixed with `@` that attach **metadata** to classes, properties, methods or parameters",
     "**Class**: `@Component`, `@Directive`, `@Pipe`, `@Injectable`, `@NgModule`",
     "**Property**: `@Input`, `@Output`, `@ViewChild`, `@ContentChild`, `@HostBinding`",
     "**Method**: `@HostListener`",
     "**Parameter**: `@Inject`, `@Optional`, `@Self`, `@SkipSelf`, `@Host`"] },

// ───────────── Components & Templates ─────────────
{ cat:"Components & Templates", q:"What is an Angular component?",
  a:["The **basic UI building block** of an Angular app",
     "= **TypeScript class** + **HTML template** + **CSS styles**",
     "Defined with the `@Component` decorator",
     "Key metadata: `selector`, `template/templateUrl`, `styleUrl(s)`, `imports` (standalone), `changeDetection`",
     "Has a **lifecycle** (ngOnInit, ngOnDestroy…)",
     "Components form a **tree** starting from the root component"],
  code:`@Component({
  selector: 'app-hello',
  standalone: true,
  template: '<h1>Hello {{ name }}</h1>',
  styles: ['h1 { color: teal; }']
})
export class HelloComponent {
  name = 'Angular';
}` },

{ cat:"Components & Templates", q:"What are the types of data binding in Angular?",
  a:["**Interpolation** `{{ value }}` – component → view (text)",
     "**Property binding** `[src]=\"url\"` – component → view (DOM property)",
     "**Event binding** `(click)=\"save()\"` – view → component",
     "**Two-way binding** `[(ngModel)]=\"name\"` – both directions (\"banana in a box\")",
     "Also: **attribute** `[attr.aria-label]`, **class** `[class.active]`, **style** `[style.width.px]`"] },

{ cat:"Components & Templates", q:"How does two-way binding work internally?",
  a:["`[(x)]` is syntactic sugar for `[x]=\"val\"` + `(xChange)=\"val=$event\"`",
     "`ngModel` needs `FormsModule`",
     "Custom two-way binding: an `@Input() size` + `@Output() sizeChange`",
     "Angular 17.2+: `model()` signal creates a two-way bindable input"],
  code:`// child
size = model(16);          // or @Input() size + @Output() sizeChange
// parent
<app-font [(size)]="fontSize" />` },

{ cat:"Components & Templates", q:"What is the difference between property binding and attribute binding?",
  a:["**Property binding** sets a **DOM property**: `[value]`, `[disabled]`",
     "**Attribute binding** sets an **HTML attribute**: `[attr.colspan]`, `[attr.aria-label]`",
     "Use attribute binding when no matching DOM property exists (ARIA, colspan, SVG)",
     "Attributes initialize properties; properties hold the current value"] },

{ cat:"Components & Templates", q:"What is a template reference variable?",
  a:["Declared with `#name` in a template",
     "References a **DOM element**, component or directive instance",
     "Usable anywhere in the same template",
     "Can be read in the class with `@ViewChild('name')` / `viewChild('name')`"],
  code:`<input #email />
<button (click)="send(email.value)">Send</button>` },

{ cat:"Components & Templates", q:"What is content projection (ng-content)?",
  a:["Lets a parent **pass HTML into a child component's template**",
     "Child marks the slot with `<ng-content>`",
     "**Multi-slot**: `<ng-content select=\"[header]\">`",
     "Used for reusable wrappers: cards, modals, tabs, layouts",
     "Projected content accessed with `@ContentChild`, ready in `ngAfterContentInit`"],
  code:`<!-- card.component.html -->
<div class="card">
  <ng-content select="[header]"></ng-content>
  <ng-content></ng-content>
</div>

<!-- usage -->
<app-card><h2 header>Title</h2><p>Body</p></app-card>` },

{ cat:"Components & Templates", q:"What is the difference between ng-template, ng-container and ngTemplateOutlet?",
  a:["`<ng-template>` – defines a template block that is **not rendered** until used",
     "`<ng-container>` – **grouping element with no DOM output**; apply structural directives without extra divs",
     "`ngTemplateOutlet` – **renders** an ng-template, optionally with a context",
     "Classic use: `*ngIf=\"x; else loading\"` with `<ng-template #loading>`"] },

{ cat:"Components & Templates", q:"What is View Encapsulation?",
  a:["Controls how component **CSS is scoped**",
     "**Emulated** (default) – adds unique attributes (`_ngcontent-xxx`) → styles stay inside the component",
     "**ShadowDom** – uses native browser Shadow DOM",
     "**None** – styles become **global**",
     "`:host` styles the component's host element; `::ng-deep` pierces encapsulation (deprecated, avoid)"] },

{ cat:"Components & Templates", q:"What is the difference between @ViewChild and @ContentChild?",
  a:["**@ViewChild** – queries elements in the component's **own template**",
     "→ available in `ngAfterViewInit`",
     "**@ContentChild** – queries **projected content** (via ng-content)",
     "→ available in `ngAfterContentInit`",
     "Plural versions return a `QueryList`: `@ViewChildren`, `@ContentChildren`",
     "Signal versions (v17+): `viewChild()`, `contentChild()`"] },

{ cat:"Components & Templates", q:"What are @HostBinding and @HostListener?",
  a:["**@HostBinding** – binds a property/class/style of the **host element**",
     "**@HostListener** – listens to events on the host (or `window`/`document`)",
     "Common in directives (e.g. highlight on hover)",
     "Modern alternative: `host: { '[class.active]': 'isActive', '(click)': 'onClick()' }` in metadata"],
  code:`@HostBinding('class.active') isActive = false;
@HostListener('mouseenter') onEnter() { this.isActive = true; }` },

{ cat:"Components & Templates", q:"What are dynamic components and how do you create them?",
  a:["Components created **at runtime** instead of declared in the template",
     "Use `ViewContainerRef.createComponent(MyComponent)`",
     "Or declaratively: `*ngComponentOutlet=\"comp\"`",
     "Use cases: modals, dialogs, dashboards, plugin UIs",
     "No `entryComponents` needed since Ivy (v9+)"] },

// ───────────── Directives & Pipes ─────────────
{ cat:"Directives & Pipes", q:"What is a directive and what types exist?",
  a:["A class that **adds behavior** to DOM elements",
     "**Components** – directives with a template",
     "**Structural directives** – change DOM layout (add/remove): `*ngIf`, `*ngFor`, `*ngSwitch`",
     "**Attribute directives** – change appearance/behavior: `ngClass`, `ngStyle`, `ngModel`",
     "Custom directives created with `@Directive`"] },

{ cat:"Directives & Pipes", q:"How do you create a custom attribute directive?",
  a:["Use `@Directive({ selector: '[appHighlight]' })`",
     "Inject `ElementRef` (and `Renderer2` for safe DOM changes)",
     "Use `@HostListener` / `@HostBinding` for events & styles",
     "Accept config via `@Input()`"],
  code:`@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  @HostBinding('style.backgroundColor') bg = '';
  @HostListener('mouseenter') on()  { this.bg = this.appHighlight; }
  @HostListener('mouseleave') off() { this.bg = ''; }
}` },

{ cat:"Directives & Pipes", q:"What does the * (asterisk) mean in structural directives?",
  a:["**Syntactic sugar** – Angular wraps the element in an `<ng-template>`",
     "`<div *ngIf=\"show\">` → `<ng-template [ngIf]=\"show\"><div>…</div></ng-template>`",
     "Only **one structural directive per element** → use `<ng-container>` to combine"] },

{ cat:"Directives & Pipes", q:"What is a pipe? Name built-in pipes.",
  a:["Transforms a value **for display** in templates: `{{ value | pipeName:arg }}`",
     "Built-in: `date`, `uppercase`, `lowercase`, `titlecase`, `currency`, `decimal`, `percent`, `json`, `slice`, `async`, `keyvalue`",
     "Can be **chained**: `{{ d | date:'short' | uppercase }}`",
     "Custom pipe: `@Pipe({ name })` + implement `PipeTransform.transform()`"] },

{ cat:"Directives & Pipes", q:"What is the difference between pure and impure pipes?",
  a:["**Pure** (default): runs only when the **input reference/primitive changes** → fast",
     "**Impure** (`pure: false`): runs on **every change detection cycle** → expensive",
     "Pure pipes don't detect mutations inside arrays/objects",
     "`async` pipe is impure",
     "Prefer pure pipes over method calls in templates (methods run every CD cycle)"] },

{ cat:"Directives & Pipes", q:"What does the async pipe do?",
  a:["**Subscribes** to an Observable/Promise in the template",
     "Returns the **latest value**",
     "**Auto-unsubscribes** when the component is destroyed → no memory leaks",
     "Marks component for check → works great with **OnPush**"],
  code:`<li *ngFor="let u of users$ | async">{{ u.name }}</li>` },

// ───────────── Lifecycle Hooks ─────────────
{ cat:"Lifecycle Hooks", q:"What are Angular lifecycle hooks and their order?",
  a:["`constructor` – DI only (not a hook)",
     "1️⃣ `ngOnChanges` – when **@Input** values change (before ngOnInit, then on every change)",
     "2️⃣ `ngOnInit` – **once**, after first ngOnChanges → init logic",
     "3️⃣ `ngDoCheck` – every change detection run (custom change detection)",
     "4️⃣ `ngAfterContentInit` – once, after projected content initialized",
     "5️⃣ `ngAfterContentChecked` – after every check of projected content",
     "6️⃣ `ngAfterViewInit` – once, after view & child views initialized",
     "7️⃣ `ngAfterViewChecked` – after every check of the view",
     "8️⃣ `ngOnDestroy` – cleanup before component is removed",
     "The order above describes **initialization**, followed eventually by destruction; on later checks only the applicable change/check hooks repeat",
     "`ngOnChanges` runs only when Angular sets a changed input; it is not guaranteed to run for a component with no bound inputs",
     "Use `ngOnInit` for initial API calls and `ngOnDestroy` for subscriptions, timers and listener cleanup"],
  tip:"Memory trick: **C-I-D, Content (Init/Checked), View (Init/Checked), Destroy**" },

{ cat:"Lifecycle Hooks", q:"What is the difference between constructor and ngOnInit?",
  a:["**constructor**: TypeScript feature, used for **dependency injection** only",
     "@Input values are **not yet available** in the constructor",
     "**ngOnInit**: Angular hook, runs **after inputs are set**",
     "Put **initialization logic / API calls** in ngOnInit",
     "Keeps components easier to test"] },

{ cat:"Lifecycle Hooks", q:"What should you do in ngOnDestroy?",
  a:["**Unsubscribe** from Observables",
     "Clear **timers** (`setInterval`, `setTimeout`)",
     "Remove manual **event listeners**",
     "Detach third-party widgets / free resources",
     "Modern alternative: `DestroyRef` + `takeUntilDestroyed()`"] },

{ cat:"Lifecycle Hooks", q:"When is ngOnChanges called and what does it receive?",
  a:["Called when a **data-bound @Input property changes** (by reference)",
     "Called **before ngOnInit** and on every subsequent input change",
     "Receives `SimpleChanges` with `previousValue`, `currentValue`, `firstChange`",
     "Not triggered by **mutating** an object input (same reference)"] },

// ───────────── Component Communication ─────────────
{ cat:"Component Communication", q:"How do components communicate with each other?",
  a:["**Parent → Child**: `@Input()` / `input()`",
     "**Child → Parent**: `@Output()` + `EventEmitter` / `output()`",
     "**Parent reads child**: `@ViewChild` or template reference variable",
     "**Siblings / unrelated**: **shared service** with Subject/BehaviorSubject or signals",
     "**Global state**: NgRx / NGXS / SignalStore",
     "**Via router**: route params, query params, state"] },

{ cat:"Component Communication", q:"Explain @Input and @Output with an example.",
  a:["`@Input()` receives data from parent via **property binding**",
     "`@Output()` emits events to parent via **event binding**",
     "`EventEmitter.emit(value)` → parent receives it as `$event`",
     "v17+: `input()`, `input.required()`, `output()` functions"],
  code:`// child
@Input() product!: Product;
@Output() addToCart = new EventEmitter<Product>();
add() { this.addToCart.emit(this.product); }

// parent
<app-product [product]="p" (addToCart)="onAdd($event)" />` },

{ cat:"Component Communication", q:"How do you share data between sibling components using a service?",
  a:["Create a `providedIn: 'root'` service",
     "Hold state in a **private BehaviorSubject** (or signal)",
     "Expose it as **read-only Observable** (`asObservable()`)",
     "One component calls a method to update; others subscribe / use async pipe"],
  code:`@Injectable({ providedIn: 'root' })
export class CartService {
  private items = new BehaviorSubject<Item[]>([]);
  items$ = this.items.asObservable();
  add(i: Item) { this.items.next([...this.items.value, i]); }
}` },

// ───────────── Dependency Injection & Services ─────────────
{ cat:"Dependency Injection & Services", q:"What is Dependency Injection in Angular?",
  a:["Design pattern: a class **receives** dependencies instead of **creating** them",
     "Angular's **injector** creates & provides instances",
     "Request via **constructor** or `inject()` function",
     "Benefits: **loose coupling**, **testability** (mock services), reusability, singletons"] },

{ cat:"Dependency Injection & Services", q:"What is a service and why use it?",
  a:["A class with `@Injectable()` holding **reusable logic or data**",
     "Examples: API calls, logging, auth, shared state",
     "Keeps components **thin** (only UI logic)",
     "Typically a **singleton** with `providedIn: 'root'`"] },

{ cat:"Dependency Injection & Services", q:"What does providedIn: 'root' mean?",
  a:["Registers the service in the **root injector**",
     "→ **one instance (singleton)** for the whole app",
     "**Tree-shakable**: removed from bundle if never injected",
     "Other options: `'platform'`, `'any'` (rare), or provide in component/route"] },

{ cat:"Dependency Injection & Services", q:"Explain the hierarchical injector in Angular.",
  a:["Two hierarchies: **Environment injectors** (root, route/lazy) and **Element injectors** (components/directives)",
     "Lookup goes **from the requesting component upward** to root",
     "Provided in **component `providers`** → new instance per component instance",
     "Provided in **lazy route** → separate instance for that feature",
     "Not found anywhere → `NullInjectorError`"] },

{ cat:"Dependency Injection & Services", q:"What are the provider types (useClass, useValue, useFactory, useExisting)?",
  a:["`useClass` – provide a (different) class: swap implementations",
     "`useValue` – provide a fixed value / config object",
     "`useFactory` – create via a function (with `deps`)",
     "`useExisting` – alias one token to another",
     "`multi: true` – collect multiple providers for the same token (e.g. HTTP_INTERCEPTORS)"],
  code:`providers: [
  { provide: Logger, useClass: ConsoleLogger },
  { provide: API_URL, useValue: 'https://api.x.com' },
  { provide: Store, useFactory: (h: HttpClient) => new Store(h), deps: [HttpClient] }
]` },

{ cat:"Dependency Injection & Services", q:"What is an InjectionToken?",
  a:["A token for injecting **non-class values** (strings, config objects, functions)",
     "Avoids naming collisions vs plain string tokens",
     "Inject with `@Inject(TOKEN)` or `inject(TOKEN)`"],
  code:`export const API_URL = new InjectionToken<string>('API_URL');
providers: [{ provide: API_URL, useValue: '/api' }]
private url = inject(API_URL);` },

{ cat:"Dependency Injection & Services", q:"What are the resolution modifiers @Optional, @Self, @SkipSelf, @Host?",
  a:["`@Optional()` – return `null` instead of throwing if not found",
     "`@Self()` – look **only** in the current element injector",
     "`@SkipSelf()` – **start from the parent** injector",
     "`@Host()` – stop the search at the **host component**",
     "With `inject()`: `inject(X, { optional: true, self: true })`"] },

{ cat:"Dependency Injection & Services", q:"What is the inject() function?",
  a:["Gets a dependency **without constructor parameters**: `http = inject(HttpClient)`",
     "Works only in an **injection context** (field initializer, constructor, factory, functional guard/interceptor)",
     "Easier **inheritance** (no `super(...)` param passing)",
     "Required for **functional guards, resolvers, interceptors**"] },

// ───────────── RxJS & Observables ─────────────
{ cat:"RxJS & Observables", q:"What is RxJS and why does Angular use it?",
  a:["**Reactive Extensions for JavaScript** – library for async/event streams",
     "Core type: **Observable** – stream of values over time",
     "Angular uses it in **HttpClient**, **Router events**, **Reactive Forms** (`valueChanges`), EventEmitter",
     "Powerful **operators** to transform, combine, cancel streams"] },

{ cat:"RxJS & Observables", q:"What is the difference between Observable and Promise?",
  a:["**Promise**: **eager**, **single** value, **not cancellable**",
     "**Observable**: **lazy** (runs on subscribe), **multiple** values, **cancellable** (unsubscribe)",
     "Observables have **operators** (map, filter, retry, debounce…)",
     "Promise is always async; Observable can be sync or async",
     "Convert: `firstValueFrom(obs$)` / `from(promise)`"] },

{ cat:"RxJS & Observables", q:"What is the difference between Subject, BehaviorSubject, ReplaySubject and AsyncSubject?",
  a:["**Subject** – multicast; subscribers get only **future** values",
     "**BehaviorSubject** – needs **initial value**; new subscribers get the **latest** value; has `.value`",
     "**ReplaySubject(n)** – replays the **last n** values to new subscribers",
     "**AsyncSubject** – emits only the **last value on complete**"],
  tip:"BehaviorSubject is the go-to for shared state in services." },

{ cat:"RxJS & Observables", q:"Explain switchMap vs mergeMap vs concatMap vs exhaustMap.",
  a:["All map each value to an **inner Observable** and flatten it",
     "**switchMap** – **cancels previous**, keeps latest → search/typeahead",
     "**mergeMap** – runs **all in parallel** → independent requests",
     "**concatMap** – **queues**, one after another in order → ordered saves",
     "**exhaustMap** – **ignores new** values while busy → prevent double submit / login click",
     "These are **higher-order mapping operators**: the projection returns an Observable, and the operator manages its subscription",
     "`switchMap` unsubscribes from the previous inner stream; cancelling a client HTTP request does **not** undo a write already processed by the server",
     "`mergeMap` results can arrive out of order; use its concurrency parameter to bound parallel work"],
  tip:"Switch = cancel, Merge = parallel, Concat = queue, Exhaust = ignore." },

{ cat:"RxJS & Observables", q:"What are hot vs cold Observables?",
  a:["**Cold** – producer created **per subscriber**; each gets its own execution (e.g. `HttpClient` → each subscribe = new request)",
     "**Hot** – producer **shared**; subscribers join mid-stream (e.g. DOM events, Subjects)",
     "Make cold → hot/shared with `share()` or `shareReplay(1)`"] },

{ cat:"RxJS & Observables", q:"Name commonly used RxJS operators.",
  a:["**Transform**: `map`, `switchMap`, `mergeMap`, `concatMap`, `scan`",
     "**Filter**: `filter`, `take`, `takeUntil`, `first`, `distinctUntilChanged`, `debounceTime`, `throttleTime`",
     "**Combine**: `combineLatest`, `forkJoin`, `merge`, `withLatestFrom`, `zip`",
     "**Error**: `catchError`, `retry`",
     "**Utility**: `tap`, `finalize`, `shareReplay`, `startWith`, `delay`"] },

{ cat:"RxJS & Observables", q:"What is the difference between forkJoin and combineLatest?",
  a:["**forkJoin** – waits for **all to complete**, emits **once** with last values → like `Promise.all` (parallel HTTP calls)",
     "**combineLatest** – emits **every time any** source emits (after all emitted once) → combining live streams like filters",
     "forkJoin never emits if a source never completes"] },

{ cat:"RxJS & Observables", q:"How do you avoid memory leaks with subscriptions?",
  a:["Use the **async pipe** (auto-unsubscribe)",
     "`takeUntilDestroyed()` (v16+) or `takeUntil(this.destroy$)`",
     "Store `Subscription` and call `unsubscribe()` in `ngOnDestroy`",
     "Use `take(1)` / `first()` for one-shot values",
     "Convert to signals with `toSignal()` (auto cleanup)",
     "Note: HttpClient observables **complete automatically**"],
  code:`constructor() {
  this.route.params.pipe(takeUntilDestroyed())
    .subscribe(p => this.load(p['id']));
}` },

{ cat:"RxJS & Observables", q:"How do you implement a debounced search box?",
  a:["Listen to input changes (`FormControl.valueChanges`)",
     "`debounceTime(300)` – wait for typing pause",
     "`distinctUntilChanged()` – skip same value",
     "`switchMap` – cancel previous HTTP request",
     "Render with `async` pipe"],
  code:`results$ = this.search.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.api.search(term))
);` },

// ───────────── Change Detection & Signals ─────────────
{ cat:"Change Detection & Signals", q:"What is change detection in Angular?",
  a:["Process that **syncs component state with the DOM**",
     "Traditionally triggered by **Zone.js** after async events (click, timers, HTTP, promises)",
     "Checks the component tree **top-down**, comparing template bindings",
     "Updates the DOM where values changed",
     "No virtual DOM — Angular compares bindings directly"] },

{ cat:"Change Detection & Signals", q:"What is Zone.js?",
  a:["Library that **patches async browser APIs** (setTimeout, events, XHR, promises)",
     "Notifies Angular when async work finishes → triggers change detection",
     "`NgZone.runOutsideAngular()` – run code without triggering CD (performance)",
     "Angular 18+ supports **zoneless** apps (`provideZonelessChangeDetection()`) using signals"] },

{ cat:"Change Detection & Signals", q:"What is the difference between Default and OnPush change detection?",
  a:["**Default** – component checked on **every** CD cycle",
     "**OnPush** – checked only when:",
     "  • an **@Input reference** changes",
     "  • an **event** fires in the component/children",
     "  • **async pipe** emits / a **signal** read in the template changes",
     "  • `markForCheck()` is called manually",
     "OnPush + **immutable data** = big performance gain"] },

{ cat:"Change Detection & Signals", q:"What is the difference between markForCheck() and detectChanges()?",
  a:["`ChangeDetectorRef.markForCheck()` – marks the component **and ancestors** dirty for the **next** CD cycle (OnPush)",
     "`detectChanges()` – runs CD **immediately and synchronously** on this component & children",
     "`detach()` / `reattach()` – remove/add component from CD tree"] },

{ cat:"Change Detection & Signals", q:"What are Signals in Angular?",
  a:["**Reactive primitive** (v16+) holding a value that notifies consumers on change",
     "`signal(v)` – writable; read with `count()`, update with `.set()` / `.update()`",
     "`computed(() => …)` – derived, **memoized**, read-only",
     "`effect(() => …)` – side effect that re-runs when dependencies change",
     "**Dependency tracking** identifies consumers that need refreshing; Angular still checks affected views and updates their bindings, not isolated DOM nodes directly",
     "Synchronous, always have a value, no subscribe/unsubscribe"],
  code:`count = signal(0);
double = computed(() => this.count() * 2);
inc() { this.count.update(c => c + 1); }` },

{ cat:"Change Detection & Signals", q:"Signals vs RxJS Observables — when to use which?",
  a:["**Signals**: synchronous **state**, UI values, derived values → simple & glitch-free",
     "**Observables**: **async events/streams**, HTTP, websockets, time-based operators (debounce, retry)",
     "Signals are read by calling a getter; reading them needs **no subscription or unsubscription**",
     "Observables may emit **synchronously or asynchronously**, may complete/error, and support cancellation and stream composition",
     "Long-lived manual Observable subscriptions need cleanup; `async` pipe and `takeUntilDestroyed()` manage it automatically",
     "Interop: `toSignal(obs$)` and `toObservable(sig)` from `@angular/core/rxjs-interop`",
     "Rule of thumb: **RxJS for events, Signals for state**"] },

{ cat:"Change Detection & Signals", q:"What are signal inputs, model(), and linkedSignal / resource?",
  a:["`input()` / `input.required()` – inputs as **read-only signals**",
     "`output()` – function-based outputs",
     "`model()` – **two-way** bindable signal input",
     "`viewChild()`, `contentChild()` – signal-based queries",
     "`linkedSignal()` – writable signal that resets when a source changes",
     "`resource()` / `httpResource()` – async data loading as signals (experimental/new)"] },

// ───────────── Routing ─────────────
{ cat:"Routing", q:"How does routing work in Angular?",
  a:["Define a `Routes` array: `{ path, component | loadComponent | loadChildren, children, canActivate… }`",
     "Register with `provideRouter(routes)` or `RouterModule.forRoot(routes)`",
     "`<router-outlet>` – where routed component renders",
     "`routerLink` – navigate from template; `Router.navigate()` – from code",
     "`routerLinkActive` – CSS class for active link",
     "Wildcard `**` for 404; `redirectTo` + `pathMatch: 'full'` for redirects"],
  code:`export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'admin', loadChildren: () => import('./admin/routes') },
  { path: '**', component: NotFoundComponent }
];` },

{ cat:"Routing", q:"How do you read route parameters?",
  a:["Inject `ActivatedRoute`",
     "**Snapshot** (one-time): `route.snapshot.paramMap.get('id')`",
     "**Observable** (updates when param changes on same component): `route.paramMap.subscribe(...)`",
     "Query params: `queryParamMap`",
     "v16+: `withComponentInputBinding()` → params bound to **@Input()** automatically"] },

{ cat:"Routing", q:"What is lazy loading and why use it?",
  a:["Load feature code **only when the route is visited**",
     "`loadComponent: () => import('./x.component').then(m => m.X)`",
     "`loadChildren: () => import('./feature/routes')`",
     "**Smaller initial bundle → faster startup**",
     "Preload in background: `withPreloading(PreloadAllModules)`"] },

{ cat:"Routing", q:"What are route guards? Name the types.",
  a:["Control **navigation** to/from routes",
     "`canActivate` – can the user **enter** the route? (auth)",
     "`canActivateChild` – protect child routes",
     "`canDeactivate` – can the user **leave**? (unsaved changes)",
     "`canMatch` – should this route config **match** at all? (role-based lazy loading)",
     "`resolve` – **pre-fetch data** before activation",
     "Modern: **functional guards** (`CanActivateFn`) using `inject()`"],
  code:`export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() || inject(Router).createUrlTree(['/login']);
};` },

{ cat:"Routing", q:"What is a resolver?",
  a:["Fetches data **before** the route activates",
     "Router waits until it completes",
     "Data available in `route.data` or as input",
     "Pros: no empty-state flicker; Cons: navigation feels slower"] },

{ cat:"Routing", q:"What is the difference between routerLink and href?",
  a:["`href` → **full page reload**, app restarts, state lost",
     "`routerLink` → **client-side navigation** via History API, no reload",
     "Always use routerLink for internal links in SPAs"] },

{ cat:"Routing", q:"What are the location strategies?",
  a:["**PathLocationStrategy** (default) – clean URLs `/users/1` via HTML5 History API; server must redirect all routes to `index.html`",
     "**HashLocationStrategy** – `/#/users/1`; works without server config",
     "Enable hash: `withHashLocation()` or `useHash: true`"] },

// ───────────── Forms ─────────────
{ cat:"Forms", q:"What is the difference between template-driven and reactive forms?",
  a:["**Setup**: template-driven (`FormsModule`) declares controls in HTML with `ngModel`; reactive (`ReactiveFormsModule`) builds an explicit TypeScript model with `FormControl`, `FormGroup` and `FormArray`",
     "**Data flow**: template-driven model/view synchronization involves asynchronous updates; reactive control-model updates are synchronous and expose `valueChanges`/`statusChanges` Observables",
     "**Validation**: template-driven uses directives such as `required`/`email` and custom validator directives; reactive uses functions such as `Validators.required`, `Validators.email` and custom validators",
     "**Testing**: template-driven forms can be **component-unit-tested**, but require template setup, change detection and sometimes waiting for stabilization; they do not require E2E tests exclusively",
     "Reactive form-model values and synchronous validators can be unit tested **without rendering a component**; async validators still need async tests",
     "**Scale**: template-driven suits simple forms; reactive suits dynamic fields, cross-field validation and complex enterprise workflows",
     "Reactive forms support **strict typing** since v14"],
  code:`// Template-driven: import FormsModule; email is a component property.
<input name="email" [(ngModel)]="email" required email>

// Reactive: import ReactiveFormsModule, FormControl and Validators.
emailControl = new FormControl('', {
  nonNullable: true,
  validators: [Validators.required, Validators.email]
});
<input [formControl]="emailControl">

// Model-only test (no TestBed or DOM required)
const control = new FormControl('', Validators.required);
expect(control.valid).toBe(false);
control.setValue('ana@example.com');
expect(control.valid).toBe(true);` },

{ cat:"Forms", q:"What are FormControl, FormGroup, FormArray and FormBuilder?",
  a:["**FormControl** – a single field (value + validation state)",
     "**FormGroup** – a group of named controls (object)",
     "**FormArray** – a dynamic list of controls (add/remove rows)",
     "**FormBuilder** – shorthand service to build them: `fb.group({...})`"],
  code:`form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  phones: this.fb.array([this.fb.control('')])
});` },

{ cat:"Forms", q:"How do you create a custom validator?",
  a:["A function returning `ValidationErrors | null`",
     "**Sync**: `ValidatorFn` → `(control) => invalid ? { key: true } : null`",
     "**Async**: `AsyncValidatorFn` → returns Observable/Promise (e.g. check username on server)",
     "**Cross-field**: attach to the **FormGroup** (e.g. password match)"],
  code:`export const noSpaces: ValidatorFn = c =>
  /\\s/.test(c.value) ? { noSpaces: true } : null;` },

{ cat:"Forms", q:"What are form control states?",
  a:["`valid` / `invalid` – passes validation?",
     "`pristine` / `dirty` – value changed by user?",
     "`touched` / `untouched` – field blurred?",
     "`pending` – async validation running",
     "CSS classes: `ng-valid`, `ng-invalid`, `ng-dirty`, `ng-touched`…",
     "Show errors typically when `invalid && (dirty || touched)`"] },

{ cat:"Forms", q:"What is ControlValueAccessor?",
  a:["Interface that lets a **custom component work with forms** (`ngModel`, `formControlName`)",
     "Implement `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`",
     "Register with `NG_VALUE_ACCESSOR` provider",
     "Use case: custom date picker, rating stars, rich input"] },

// ───────────── HTTP ─────────────
{ cat:"HTTP", q:"How do you make HTTP calls in Angular?",
  a:["Use `HttpClient` (register with `provideHttpClient()`)",
     "Methods: `get`, `post`, `put`, `patch`, `delete` → return **Observables**",
     "Typed responses: `http.get<User[]>(url)`",
     "Request is sent **only when subscribed** (cold)",
     "Handle errors with `catchError`, retry with `retry(n)`"] },

{ cat:"HTTP", q:"What is an HTTP interceptor?",
  a:["Middleware that **intercepts every HTTP request/response**",
     "Use cases: add **auth token**, logging, global **error handling**, loading spinner, caching, retry",
     "Requests are **immutable** → use `req.clone({...})`",
     "Modern: functional `HttpInterceptorFn` with `provideHttpClient(withInterceptors([...]))`"],
  code:`export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  return next(req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } }));
};` },

{ cat:"HTTP", q:"How do you handle errors from HTTP calls?",
  a:["`catchError` in the service → map to friendly error / fallback value",
     "`retry(2)` for transient failures",
     "**Global** handling in an interceptor (401 → redirect to login)",
     "Global `ErrorHandler` class for unhandled runtime errors",
     "Show user-friendly message; log details"] },

// ───────────── Modules & Architecture ─────────────
{ cat:"Modules & Architecture", q:"What is an NgModule?",
  a:["Class with `@NgModule` that **groups related code**",
     "`declarations` – components/directives/pipes belonging to the module",
     "`imports` – other modules needed",
     "`exports` – what other modules can use",
     "`providers` – services",
     "`bootstrap` – root component (AppModule only)",
     "Being replaced by **standalone components** in modern Angular"] },

{ cat:"Modules & Architecture", q:"What are standalone components?",
  a:["Components that **don't need an NgModule** (v14+, default since v17/v19)",
     "Declare dependencies directly in `imports: [...]`",
     "Bootstrap with `bootstrapApplication()`",
     "Easier **lazy loading** via `loadComponent`",
     "Less boilerplate, simpler mental model"] },

{ cat:"Modules & Architecture", q:"What are feature, shared and core modules (folder structure best practice)?",
  a:["**Core** – singleton services, interceptors, guards, app-wide layout (loaded once)",
     "**Shared** – reusable dumb components, pipes, directives (imported by many)",
     "**Feature** – a business area (orders, users), usually **lazy loaded**",
     "With standalone: same idea using **folders** instead of modules"] },

{ cat:"Modules & Architecture", q:"What is the difference between smart (container) and dumb (presentational) components?",
  a:["**Smart**: talks to services/store, fetches data, handles logic",
     "**Dumb**: receives data via **inputs**, emits **outputs**, only displays",
     "Dumb components are **reusable, easy to test**, ideal for **OnPush**"] },

{ cat:"Modules & Architecture", q:"What is forRoot() vs forChild()?",
  a:["Pattern for modules that provide **services + configuration**",
     "`forRoot()` – used **once** in root → registers providers (singleton)",
     "`forChild()` – used in feature modules → no duplicate providers",
     "Example: `RouterModule.forRoot(routes)` vs `RouterModule.forChild(routes)`"] },

// ───────────── Performance ─────────────
{ cat:"Performance", q:"How do you optimize the performance of an Angular app?",
  a:["**OnPush** change detection + **signals**",
     "**Lazy loading** routes and `@defer` blocks",
     "`trackBy` / `@for (…; track id)` for lists",
     "**Pure pipes** / computed instead of template method calls",
     "Unsubscribe → avoid **memory leaks**",
     "**Virtual scrolling** (CDK) for large lists",
     "**AOT**, production build, tree shaking, bundle budgets",
     "**SSR + hydration**, image optimization (`NgOptimizedImage`)",
     "`runOutsideAngular` for heavy non-UI work; Web Workers for CPU tasks"] },

{ cat:"Performance", q:"Why use trackBy (or track in @for)?",
  a:["Gives each list item a **stable identity** (e.g. `id`)",
     "Angular **reuses DOM nodes** instead of re-creating all items when array changes",
     "Big win when list is refreshed from API",
     "`track` is **mandatory** in the new `@for` syntax"],
  code:`@for (user of users; track user.id) {
  <li>{{ user.name }}</li>
} @empty {
  <li>No users</li>
}` },

{ cat:"Performance", q:"What is AOT vs JIT compilation?",
  a:["**JIT** (Just-in-Time): templates compiled **in the browser** at runtime",
     "**AOT** (Ahead-of-Time): compiled **at build time** (default since v9/Ivy)",
     "AOT benefits: **faster render**, **smaller bundle** (no compiler), **template errors at build time**, more secure"] },

{ cat:"Performance", q:"What is Ivy?",
  a:["Angular's **rendering engine & compiler** (default since v9), replaced View Engine",
     "**Smaller bundles** (better tree-shaking)",
     "Faster compilation, better debugging",
     "Enabled standalone components, dynamic components without entryComponents"] },

{ cat:"Performance", q:"What is tree shaking?",
  a:["Build step that **removes unused code** from the final bundle",
     "Relies on ES module static imports",
     "Why `providedIn: 'root'` services are preferred — tree-shakable"] },

{ cat:"Performance", q:"What does @defer do?",
  a:["**Template-level lazy loading** (v17+)",
     "Eligible components, directives, pipes and their styles are loaded through **dynamic imports**, reducing the initial bundle",
     "Directly deferred dependencies must be **standalone** and not referenced outside defer blocks in the same file (including ViewChild queries); their transitive dependencies may use NgModules",
     "Triggers: `on viewport`, `on idle`, `on interaction`, `on hover`, `on timer`, `when condition`",
     "Sub-blocks: `@placeholder`, `@loading`, `@error`; their dependencies are **eagerly loaded**, so keep them lightweight",
     "Default trigger is **idle**; `prefetch on idle` can download code before a viewport/interaction render trigger"],
  code:`@defer (on viewport) {
  <app-heavy-chart />
} @placeholder {
  <p>Chart loads when visible…</p>
}` },

// ───────────── State Management ─────────────
{ cat:"State Management", q:"How do you manage state in Angular?",
  a:["State management = deciding **where state lives, who can change it and how changes reach the view** – keep state **as local as possible** and use the **lightest tool** that works",
     "**Local UI state** (toggles, selected tab) → `signal()` and `computed()` in the component",
     "**Parent ↔ child** → `input()`, `output()` and `model()`; if data has to pass through many layers, move it into a service",
     "**Shared state** (cart, filters, current user) → an injectable **service** holding signals (or a `BehaviorSubject`) – the default for most apps; `providedIn: 'root'` for app-wide state, a component's `providers` for feature-scoped state",
     "**Complex global state** (many features or teams, strict event flow, DevTools/time-travel) → **NgRx SignalStore** or the classic **NgRx Store**",
     "**Server state** (API data) → HTTP services with caching, `httpResource` or NgRx effects; **URL state** (filters, sort, page) → route and query params; **form state** → Reactive Forms",
     "**Rules**: single source of truth, one-way data flow, **immutable updates**; expose state **read-only** and change it only through methods or actions",
     "**vs React**: a signal-based service does the job of React's Context or Zustand, and NgRx Store is the counterpart of Redux Toolkit"],
  code:`// 1. Local – state only this component needs
export class FaqItem {
  open = signal(false);
  toggle() { this.open.update(o => !o); }
}

// 2. Parent ↔ child – data down through inputs, events up through outputs
export class ProductCard {
  product = input.required<Product>();
  addToCart = output<Product>();
}

// 3. Shared – a signal-based service: one source of truth, read-only outside
@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly state = signal<CartItem[]>([]);
  readonly items = this.state.asReadonly();
  readonly total = computed(() =>
    this.state().reduce((sum, i) => sum + i.price * i.qty, 0));

  add(item: CartItem) { this.state.update(list => [...list, item]); }
  remove(id: number) { this.state.update(list => list.filter(i => i.id !== id)); }
}

// any component
readonly cart = inject(CartStore);
// template: {{ cart.total() }}  (click)="cart.add(item)"

// 4. Complex / global – NgRx SignalStore or NgRx Store`,
  tip:"Start with component signals, move shared state into a service, and add NgRx only when the app's size and team workflow justify it." },

{ cat:"State Management", q:"What is NgRx?",
  a:["**Redux-pattern** state management for Angular using RxJS",
     "**Store** – single immutable state tree",
     "**Actions** – events describing what happened",
     "**Reducers** – pure functions: (state, action) → new state",
     "**Selectors** – memoized queries of state",
     "**Effects** – side effects (API calls) → dispatch new actions",
     "Lighter options: **NgRx SignalStore**, ComponentStore, services + signals"],
  tip:"Flow: Component → dispatch(Action) → Reducer → Store → Selector → Component; Effects handle API calls." },

{ cat:"State Management", q:"When should you use NgRx vs a simple service?",
  a:["**Service + BehaviorSubject/signals**: small–medium apps, local feature state",
     "**NgRx**: large apps, many teams, complex shared state, need **DevTools/time-travel**, strict unidirectional flow",
     "NgRx adds **boilerplate** — don't use it by default"] },

{ cat:"State Management", q:"What is NgRx SignalStore, and when would you choose it over the classic NgRx Store?",
  a:["**SignalStore** (`@ngrx/signals`) – a lightweight, **signal-based** store composed from features: `withState`, `withComputed`, `withMethods`, `withHooks`",
     "State is read as **signals** and changed with `patchState()` → **immutable** updates; outside code can't patch it by default",
     "**No actions/reducers boilerplate** – store methods are the API; `rxMethod` for RxJS flows (debounce, `switchMap`)",
     "Reusable building blocks: `withEntities` for collections, custom features with `signalStoreFeature` (loading/error, persistence)",
     "Scope it: `providedIn: 'root'` for global state, or a component's `providers` for **feature/local state** destroyed with the component",
     "**Classic Store** still fits very large apps with event-driven flows, many teams, and action history / time-travel in Redux DevTools"],
  code:`export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState({ todos: [] as Todo[], filter: 'all' as 'all' | 'done', loading: false }),
  withComputed(({ todos, filter }) => ({
    visible: computed(() => filter() === 'done' ? todos().filter(t => t.done) : todos()),
  })),
  withMethods((store, api = inject(TodoApi)) => ({
    setFilter(filter: 'all' | 'done') { patchState(store, { filter }); },
    async load() {
      patchState(store, { loading: true });
      try { patchState(store, { todos: await firstValueFrom(api.getAll()) }); }
      finally { patchState(store, { loading: false }); }
    },
  })),
);

// component
readonly store = inject(TodoStore);
// template: @for (t of store.visible(); track t.id) { ... }`,
  tip:"SignalStore = signals + structure without the Redux ceremony; classic Store = events, history and strict flow at scale." },

{ cat:"State Management", q:"How do you manage server state (API data) and caching in Angular?",
  a:["**Server state** = data owned by the backend: async, shared, and can go **stale** – it needs different handling from UI state",
     "Concerns: **caching**, de-duplicating requests, loading/error state, **refresh & invalidation** after writes",
     "**Service + `shareReplay`** – fetch once, replay the cached response to every subscriber",
     "**`resource` / `httpResource`** – signal-based loading with `value()`, `isLoading()`, `error()`, `reload()`; re-fetches when the signals it reads change",
     "**NgRx effects + entity** – API data normalized in the store with loading/error flags",
     "**TanStack Query** (Angular adapter) – query keys, caching, background refetch, retries, invalidation",
     "Don't copy server data into several places – keep one cache and **reload or invalidate it after mutations**"],
  code:`// Cache one response and share it with every subscriber
readonly products$ = this.http.get<Product[]>('/api/products').pipe(
  shareReplay({ bufferSize: 1, refCount: true })
);

// Signal-based: re-fetches whenever userId changes
userId = input.required<number>();
user = httpResource<User>(() => '/api/users/' + this.userId());
// template: user.isLoading(), user.error(), user.value(); refresh with user.reload()`,
  tip:"Treat API data as a cache with a freshness policy, not as state your app owns." },

{ cat:"State Management", q:"How do you persist state across page reloads in Angular?",
  a:["Decide **what** to persist: preferences, drafts, cart – not data you can re-fetch; avoid **tokens or sensitive data** in `localStorage` (XSS can read it)",
     "**Signals**: initialize from storage, save on every change with an `effect()`",
     "**NgRx Store**: a **meta-reducer** (e.g. `ngrx-store-localstorage`) rehydrates selected slices",
     "**SignalStore**: load in `withHooks({ onInit })` and save with an effect, or wrap it in a reusable custom feature",
     "**URL** for shareable state (filters, sort, page) – survives refresh and can be bookmarked",
     "**SSR**: `localStorage` doesn't exist on the server → access it only in the browser (`isPlatformBrowser`, `afterNextRender`)",
     "**Version** the stored shape and handle missing or corrupt data"],
  code:`@Injectable({ providedIn: 'root' })
export class SettingsStore {
  readonly theme = signal<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark' | null) ?? 'light'
  );

  constructor() {
    effect(() => localStorage.setItem('theme', this.theme()));
  }
}`,
  tip:"Persist only what you need, validate it on load, and keep secrets out of browser storage." },

// ───────────── Testing ─────────────
{ cat:"Testing", q:"How do you unit test Angular components and services?",
  a:["Default tools: **Jasmine + Karma** (newer: Jest / Vitest / Web Test Runner)",
     "`TestBed.configureTestingModule({...})` – sets up a test module",
     "`fixture = TestBed.createComponent(X)`; `fixture.detectChanges()`",
     "Query DOM via `fixture.nativeElement` / `debugElement`",
     "Mock dependencies with `jasmine.createSpyObj` or `{ provide: X, useValue: mock }`",
     "HTTP: `provideHttpClientTesting()` + `HttpTestingController`",
     "Async: `fakeAsync` + `tick()`, or `waitForAsync`"] },

{ cat:"Testing", q:"What tools are used for E2E testing?",
  a:["**Protractor** – deprecated (end of life 2022)",
     "**Cypress**, **Playwright**, WebdriverIO – current choices",
     "E2E tests simulate real user flows in a real browser"] },

// ───────────── Security ─────────────
{ cat:"Security", q:"How does Angular protect against XSS?",
  a:["Treats all values as **untrusted** by default",
     "**Automatically sanitizes** HTML, styles, URLs bound into the DOM (`[innerHTML]`)",
     "Interpolation `{{ }}` is always **escaped**",
     "`DomSanitizer.bypassSecurityTrust…()` – only for content you trust",
     "Avoid direct DOM access via `ElementRef.nativeElement.innerHTML`; use `Renderer2`"] },

{ cat:"Security", q:"What other security practices apply to Angular apps?",
  a:["**XSRF/CSRF**: HttpClient supports XSRF tokens (`withXsrfConfiguration`)",
     "Use **HTTPS**, **Content Security Policy**, **Trusted Types**",
     "Store tokens carefully (HttpOnly cookies preferred over localStorage)",
     "Route guards are **UX only** — always enforce auth on the **server**",
     "Keep Angular updated (`ng update`); audit dependencies"] },

// ───────────── SSR & Build ─────────────
{ cat:"SSR & Build", q:"What is Angular SSR (formerly Angular Universal)?",
  a:["Renders pages **on the server** → sends ready HTML",
     "Benefits: **faster first paint**, **SEO**, social previews",
     "**Hydration** (v16+) reuses server DOM instead of re-rendering",
     "Also supports **SSG / prerendering** at build time",
     "Add with `ng add @angular/ssr`",
     "Caution: no `window`/`document` on server → use `isPlatformBrowser` / `afterNextRender`"] },

{ cat:"SSR & Build", q:"What are environments in Angular?",
  a:["Files like `environment.ts` / `environment.prod.ts` for **config per build**",
     "Swapped via `fileReplacements` in `angular.json`",
     "Contain API URLs, feature flags — **never secrets** (they ship to the browser)"] },

{ cat:"SSR & Build", q:"What is angular.json?",
  a:["**Workspace configuration** for the Angular CLI",
     "Defines projects, build/serve/test **targets** (builders)",
     "Options: output path, assets, styles, scripts, **budgets**, file replacements",
     "Modern builder: **esbuild + Vite** (`@angular/build:application`)"] },

// ───────────── Modern Angular (v14–v19+) ─────────────
{ cat:"Modern Angular", q:"What is the new built-in control flow (@if, @for, @switch)?",
  a:["Introduced in **v17**, replaces `*ngIf`, `*ngFor`, `*ngSwitch`",
     "**Built into the compiler** — no imports needed",
     "Better **type narrowing**, more readable, **faster**",
     "`@for` requires `track` and supports `@empty`",
     "Migrate with `ng generate @angular/core:control-flow`"],
  code:`@if (user) {
  <p>Hi {{ user.name }}</p>
} @else {
  <p>Please log in</p>
}

@switch (role) {
  @case ('admin') { <admin-panel /> }
  @default { <user-panel /> }
}` },

{ cat:"Modern Angular", q:"What are the key features of recent Angular versions?",
  a:["**v14**: standalone components (preview), typed forms, `inject()`",
     "**v15**: standalone stable, functional guards/interceptors, `NgOptimizedImage`",
     "**v16**: **signals** (preview), `takeUntilDestroyed`, required inputs, SSR hydration",
     "**v17**: `@if/@for/@defer` control flow, Vite+esbuild builder, new docs (angular.dev)",
     "**v18**: zoneless (experimental), `@let`… stable control flow & defer",
     "**v19**: standalone by default, `linkedSignal`, `resource`, incremental hydration",
     "**v20+**: signals APIs stable, zoneless stable, continued modernization"] },

{ cat:"Modern Angular", q:"What is zoneless Angular?",
  a:["Running Angular **without Zone.js** monkey-patching asynchronous browser APIs to schedule change detection",
     "Angular schedules refreshes from explicit notifications: template-read signal updates, bound event listeners, `AsyncPipe` (via `markForCheck`), `ComponentRef.setInput()` and manual `markForCheck()`",
     "Signals are useful but **not mandatory**; Observable-based components also work when they notify Angular",
     "Benefits: **smaller bundle**, better performance, cleaner stack traces",
     "**Angular v21+**: zoneless is the default unless overridden with `provideZoneChangeDetection()`; **v20**: opt in with `provideZonelessChangeDetection()`",
     "Remove `zone.js`/`zone.js/testing` from build and test polyfills; audit libraries and callbacks that relied on Zone.js",
     "A timer changing a plain field does not itself notify zoneless Angular; use a template-read signal or call `markForCheck()`"] },

// ───────────── Scenario-based ─────────────
{ cat:"Scenario-based", q:"A component with OnPush doesn't update when you push an item into an input array. Why and how to fix?",
  a:["OnPush checks **input references**, not deep mutations",
     "`arr.push(x)` keeps the **same reference** → no update",
     "Fix: create a **new array** `arr = [...arr, x]`",
     "Or use **signals** / async pipe / `markForCheck()`"] },

{ cat:"Scenario-based", q:"How would you implement authentication in Angular?",
  a:["**AuthService** – login/logout, store token/user (signal or BehaviorSubject)",
     "**HTTP interceptor** – attach `Authorization` header, handle 401 → refresh token or logout",
     "**Route guards** – `canActivate` / `canMatch` to protect routes",
     "Token storage: HttpOnly cookie (safer) or memory/localStorage",
     "Use OIDC libraries (MSAL, angular-oauth2-oidc) for SSO"] },

{ cat:"Scenario-based", q:"Your app loads slowly. How do you investigate and fix it?",
  a:["Measure: **Lighthouse**, Chrome DevTools Performance, **Angular DevTools profiler**",
     "Analyze bundle: `ng build --stats-json` + **source-map-explorer** / esbuild analyzer",
     "Fix: **lazy load** routes, `@defer`, remove heavy libraries, tree-shake",
     "**OnPush**, trackBy, avoid template method calls",
     "**SSR/prerender**, caching, compress images, CDN"] },

{ cat:"Scenario-based", q:"Two components need the same data loaded from an API only once. How?",
  a:["Put the call in a **root service**",
     "Cache with `shareReplay({ bufferSize: 1, refCount: true })`",
     "Or store result in a **signal/BehaviorSubject** after first load",
     "Both components consume via async pipe / signal"],
  code:`users$ = this.http.get<User[]>('/api/users').pipe(shareReplay(1));` },

{ cat:"Scenario-based", q:"How do you handle a global loading spinner for HTTP requests?",
  a:["**LoadingService** with a counter signal/BehaviorSubject",
     "**Interceptor**: increment before request, `finalize()` → decrement",
     "Spinner component shows when counter > 0"] },

{ cat:"Scenario-based", q:"How do you prevent a user from leaving a form with unsaved changes?",
  a:["Add a **canDeactivate** guard on the route",
     "Component exposes `hasUnsavedChanges()` (e.g. `form.dirty`)",
     "Guard shows `confirm()` / dialog and returns true/false",
     "Optionally handle browser close via `@HostListener('window:beforeunload')`"] }
];
