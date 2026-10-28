// Angular — extra questions from the docx study guides in "Study resources Questions" (deduplicated against angular_data.js / angular_advanced.js).
PREP_DATA.push(...[

{ cat:"Components & Templates", q:"What is an Angular template and its main syntax?",
  a:["The **HTML view** of a component, enhanced with Angular syntax",
     "`{{ value }}` – interpolation",
     "`[property]=\"expr\"` – property binding",
     "`(event)=\"handler()\"` – event binding",
     "`[(ngModel)]` – two-way binding",
     "`@if` / `@for` / `@switch` – control flow; `| pipe` – formatting; `#ref` – template variable",
     "Inline (`template`) or external (`templateUrl`) — prefer external for larger HTML"],
  code:`<h2>Welcome, {{ userName }}</h2>
<input [(ngModel)]="userName">
<button [disabled]="!isLoggedIn" (click)="greet()">Say Hello</button>
@if (isLoggedIn) { <p>You are logged in.</p> } @else { <p>Please log in.</p> }` },

{ cat:"State Management", q:"What does this.actions$.pipe(ofType(...)) mean in NgRx Effects?",
  a:["`actions$` = an **Observable stream of every dispatched action**",
     "`ofType(loadX)` **filters** to the actions this effect cares about",
     "Then a flattening operator (`switchMap`/`exhaustMap`/`concatMap`) calls the API",
     "Maps the result to a **success** or **failure** action → dispatched back to the store",
     "`catchError` **inside** the inner pipe so the effect stream keeps living"],
  code:`loadEngagements$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadEngagements),
    switchMap(() => this.api.getEngagements().pipe(
      map(data => loadEngagementsSuccess({ data })),
      catchError(err => of(loadEngagementsFailure({ err })))
    ))
  )
);`,
  tip:"actions$ listens for actions; pipe turns the action stream into side effects." },

{ cat:"Security", q:"How do you integrate Angular with Keycloak (or another OIDC provider)?",
  a:["Angular redirects to **Keycloak** login (OIDC **Authorization Code + PKCE**)",
     "Library: `keycloak-angular` / `angular-oauth2-oidc` / MSAL for Entra ID",
     "After login, app receives **access token** (+ refresh token) and refreshes silently",
     "**HTTP interceptor** adds `Authorization: Bearer <token>` to API calls",
     "**Route guards** check login and roles (from token claims)",
     "Backend (.NET) **validates the JWT** (issuer, audience, signature, expiry) — the real security boundary"],
  code:`export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  return next(token ? req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } }) : req);
};`,
  tip:"Keycloak handles login → Angular sends the token → backend validates it." },

{ cat:"Advanced: Directives & Components", level:"Advanced", q:"Is there a Higher-Order Component (HOC) in Angular? How do you reuse component behavior?",
  a:["**No true HOC** – wrapping a component in a function (React style) breaks Angular's compiler metadata & DI",
     "Old approach: **custom class decorator** patching `ngOnInit`/`ngOnDestroy` on the prototype (works in Ivy)",
     "Decorator limits: **can't use DI** (`inject()` needs injection context), **can't patch `ngOnChanges`** (wired at compile time), can't change template/inputs, mutates prototype → fragile",
     "✅ **`hostDirectives`** (v15+) – compose reusable directives onto a component",
     "✅ **`inject()` helper functions** + `DestroyRef` – share logic without inheritance",
     "✅ **Wrapper component** + `ng-content` / `ng-template` / `ngComponentOutlet` – wrap UI",
     "✅ **Guards / resolvers** for `withAuth`/`withData`-style concerns; base class / mixin as last resort"],
  code:`// Legacy: decorator "HOC"
export function TrackLifecycle(name: string) {
  return (target: Function) => {
    const init = target.prototype.ngOnInit;
    target.prototype.ngOnInit = function (...args: any[]) {
      console.log(\`\${name} init\`);
      init?.apply(this, args);
    };
  };
}

// Modern: hostDirectives + inject()
@Directive({ selector: '[trackLifecycle]' })
export class TrackLifecycleDirective {
  constructor() {
    const name = inject(ElementRef).nativeElement.tagName;
    console.log(\`\${name} init\`);
    inject(DestroyRef).onDestroy(() => console.log(\`\${name} destroyed\`));
  }
}

@Component({
  selector: 'app-user-profile',
  template: '<p>User profile</p>',
  hostDirectives: [TrackLifecycleDirective]
})
export class UserProfileComponent {}`,
  tip:"Key takeaway: \"Angular has no HOCs. The equivalent is composition through hostDirectives, inject() functions, and content projection.\"" }

]);
