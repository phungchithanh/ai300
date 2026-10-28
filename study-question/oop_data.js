// OOP & Design Patterns study questions — common and advanced questions with short, memorizable answers.
// Format: { cat, q, a:[bullets], code?, tip?, level? }   Bullets support `code` and **bold**. Code examples in C#.
const PREP_KEY = 'oop';
const PREP_DATA = [

// ───────────── OOP Fundamentals ─────────────
{ cat:"OOP Fundamentals", q:"What is Object-Oriented Programming?",
  a:["Paradigm that models software as **objects** = **data (state) + behavior (methods)**",
     "Objects are created from **classes** (blueprints)",
     "Goals: **reusability, maintainability, modularity**, modeling the real world",
     "Built on 4 pillars: **Encapsulation, Abstraction, Inheritance, Polymorphism**"],
  tip:"Pillars memory: **A PIE** — Abstraction, Polymorphism, Inheritance, Encapsulation." },

{ cat:"OOP Fundamentals", q:"What is the difference between a class and an object?",
  a:["**Class** – blueprint/template; defines fields & methods; no memory for data",
     "**Object** – **instance** of a class, with its own state in memory",
     "One class → many objects",
     "Example: `Car` is a class; `myTesla = new Car()` is an object"] },

{ cat:"OOP Fundamentals", q:"What is encapsulation?",
  a:["**Bundling data + methods** together and **hiding internal state**",
     "Access only through a public interface (methods/properties)",
     "Use access modifiers: `private`, `protected`, `public`",
     "Protects **invariants** (e.g. balance can't go negative)"],
  code:`public class BankAccount {
    private decimal _balance;               // hidden
    public decimal Balance => _balance;     // read-only access
    public void Withdraw(decimal amt) {
        if (amt > _balance) throw new InvalidOperationException();
        _balance -= amt;                    // rule enforced
    }
}` },

{ cat:"OOP Fundamentals", q:"What is abstraction?",
  a:["Exposing **what** an object does, hiding **how** it does it",
     "Focus on **essential** features, ignore details",
     "Achieved with **interfaces** and **abstract classes**",
     "Example: you call `car.Start()` without knowing the engine internals"] },

{ cat:"OOP Fundamentals", q:"What is the difference between abstraction and encapsulation?",
  a:["**Abstraction** – design level: **hides complexity**, shows only relevant behavior (what)",
     "**Encapsulation** – implementation level: **hides data**, controls access (how it's protected)",
     "Abstraction = interface/abstract class; Encapsulation = private fields + public methods",
     "They work together"] },

{ cat:"OOP Fundamentals", q:"What is inheritance and its types?",
  a:["A class (**child/derived**) acquires members of another (**parent/base**) → **is-a** relationship",
     "Promotes code reuse",
     "Types: **single**, **multilevel** (A→B→C), **hierarchical** (one base, many children), **multiple** (many bases), hybrid",
     "C#/Java: **no multiple class inheritance** (diamond problem) → use multiple **interfaces**"] },

{ cat:"OOP Fundamentals", q:"What is polymorphism? Compile-time vs runtime?",
  a:["**\"Many forms\"** – same interface, different behavior",
     "**Compile-time (static)** – **method overloading**, operator overloading (resolved by compiler)",
     "**Runtime (dynamic)** – **method overriding** via `virtual`/`override` (resolved at runtime via vtable)",
     "Lets you code against a base type and swap implementations"],
  code:`abstract class Shape { public abstract double Area(); }
class Circle(double r) : Shape { public override double Area() => Math.PI * r * r; }
class Square(double s) : Shape { public override double Area() => s * s; }

Shape[] shapes = [new Circle(1), new Square(2)];
foreach (var s in shapes) Console.WriteLine(s.Area()); // runtime dispatch` },

{ cat:"OOP Fundamentals", q:"What is the difference between overloading and overriding?",
  a:["**Overloading** – same name, **different parameters**, same class → compile-time",
     "**Overriding** – same signature in **derived class**, replaces base behavior → runtime",
     "Overriding requires inheritance + `virtual`/`abstract` in C#",
     "Return type alone can't distinguish overloads"] },

{ cat:"OOP Fundamentals", q:"What is the diamond problem?",
  a:["Class D inherits from B and C, both inherit from A and override the same method",
     "Ambiguity: **which version** does D get?",
     "C#/Java avoid it by disallowing multiple class inheritance",
     "C++ solves with **virtual inheritance**",
     "Default interface methods: compiler forces explicit resolution"] },

{ cat:"OOP Fundamentals", q:"What is the difference between an interface and an abstract class?",
  a:["**Interface** – a **contract** (can-do); no state/fields; a class can implement **many**",
     "**Abstract class** – partial implementation (is-a); can have **fields, constructors**, concrete methods; **single** inheritance",
     "Use interface for **capabilities** across unrelated types (`IComparable`, `IDisposable`)",
     "Use abstract class for **shared code** among closely related types"] },

{ cat:"OOP Fundamentals", q:"What are access modifiers?",
  a:["`public` – everywhere",
     "`private` – within the class only",
     "`protected` – class + derived classes",
     "`internal` (C#) – same assembly; `protected internal`, `private protected`",
     "Principle: **least privilege** — make things as private as possible"] },

{ cat:"OOP Fundamentals", q:"What is a constructor? Types of constructors?",
  a:["Special method that **initializes** a new object",
     "**Default** (parameterless), **parameterized**, **copy**, **static** (runs once per type), **private** (Singleton/factories)",
     "**Constructor chaining**: `: this(...)` or `: base(...)`",
     "C# 12: **primary constructors**"] },

// ───────────── Object Relationships ─────────────
{ cat:"Object Relationships", q:"What is the difference between association, aggregation and composition?",
  a:["**Association** – general \"uses/knows\" relationship (Teacher ↔ Student)",
     "**Aggregation** – **has-a**, weak ownership; part **can exist independently** (Team ◇— Player)",
     "**Composition** – **has-a**, strong ownership; part **dies with the whole** (House ◆— Room)",
     "Strength: Association < Aggregation < Composition"],
  tip:"UML: hollow diamond ◇ = aggregation, filled diamond ◆ = composition." },

{ cat:"Object Relationships", q:"Composition vs inheritance — which to prefer and why?",
  a:["**\"Favor composition over inheritance\"** (GoF)",
     "Inheritance: tight coupling, **fragile base class**, fixed at compile time, deep hierarchies",
     "Composition: **has-a**, flexible, behavior swappable at runtime, easier testing",
     "Use inheritance only for true **is-a** relationships that respect LSP"],
  code:`// Composition: behavior injected, swappable
class Car(IEngine engine) {
    public void Start() => engine.Start();
}
var ev  = new Car(new ElectricEngine());
var gas = new Car(new PetrolEngine());` },

{ cat:"Object Relationships", q:"What are coupling and cohesion?",
  a:["**Coupling** – how dependent modules are on each other → aim for **LOW**",
     "**Cohesion** – how focused a module's responsibilities are → aim for **HIGH**",
     "Low coupling: depend on abstractions, DI, events",
     "High cohesion: Single Responsibility"],
  tip:"Good design = **low coupling, high cohesion**." },

{ cat:"Object Relationships", q:"What is the Law of Demeter?",
  a:["\"**Talk only to your immediate friends**\" — principle of least knowledge",
     "A method should call only: its own members, parameters, objects it creates, its fields",
     "Avoid chains like `order.Customer.Address.City.Name` (train wreck)",
     "Reduces coupling to internal structure"] },

// ───────────── SOLID Principles ─────────────
{ cat:"SOLID Principles", q:"What are the SOLID principles?",
  a:["**S** – Single Responsibility Principle",
     "**O** – Open/Closed Principle",
     "**L** – Liskov Substitution Principle",
     "**I** – Interface Segregation Principle",
     "**D** – Dependency Inversion Principle",
     "Goal: code that is **maintainable, extensible, testable**"] },

{ cat:"SOLID Principles", q:"What is the Single Responsibility Principle (SRP)?",
  a:["A class should have **one reason to change**",
     "One job / one actor it serves",
     "Split: `InvoiceCalculator`, `InvoiceRepository`, `InvoiceEmailer` instead of one `Invoice` god class",
     "Benefits: smaller classes, easier testing, fewer side effects"] },

{ cat:"SOLID Principles", q:"What is the Open/Closed Principle (OCP)?",
  a:["Software entities should be **open for extension, closed for modification**",
     "Add new behavior by **adding new code** (new class), not editing existing tested code",
     "Achieved via **abstractions, polymorphism**, Strategy pattern",
     "Smell: growing `switch`/`if-else` on type"],
  code:`interface IDiscount { decimal Apply(decimal price); }
class BlackFriday : IDiscount { public decimal Apply(decimal p) => p * 0.7m; }
class Student     : IDiscount { public decimal Apply(decimal p) => p * 0.9m; }
// New discount = new class, no change to checkout code` },

{ cat:"SOLID Principles", q:"What is the Liskov Substitution Principle (LSP)?",
  a:["Subtypes must be **substitutable** for their base types **without breaking** correctness",
     "Derived class must honor the base contract: no stronger preconditions, no weaker postconditions, no unexpected exceptions",
     "Classic violation: **Square inherits Rectangle** (setting width changes height)",
     "Another smell: overriding to throw `NotImplementedException`"] },

{ cat:"SOLID Principles", q:"What is the Interface Segregation Principle (ISP)?",
  a:["Clients should not be forced to depend on methods they **don't use**",
     "Prefer **many small, specific interfaces** over one fat interface",
     "Example: split `IMachine { Print; Scan; Fax }` into `IPrinter`, `IScanner`, `IFax`"] },

{ cat:"SOLID Principles", q:"What is the Dependency Inversion Principle (DIP)?",
  a:["High-level modules should **not depend on low-level** modules — both depend on **abstractions**",
     "Abstractions shouldn't depend on details",
     "Implemented with **interfaces + Dependency Injection**",
     "Enables swapping implementations and **unit testing with mocks**"],
  code:`// ❌ class OrderService { SqlRepo repo = new SqlRepo(); }
// ✅
class OrderService(IOrderRepository repo) {
    public void Place(Order o) => repo.Save(o);
}` },

{ cat:"SOLID Principles", q:"What are DRY, KISS and YAGNI?",
  a:["**DRY** – Don't Repeat Yourself: single source of truth for knowledge",
     "**KISS** – Keep It Simple, Stupid: simplest solution that works",
     "**YAGNI** – You Aren't Gonna Need It: don't build features until needed",
     "Balance: over-applying DRY can create wrong abstractions (prefer duplication over the wrong abstraction)"] },

// ───────────── Design Patterns Basics ─────────────
{ cat:"Design Patterns Basics", q:"What are design patterns and their categories?",
  a:["**Reusable solutions** to common design problems (GoF book: 23 patterns)",
     "**Creational** – object creation: Singleton, Factory Method, Abstract Factory, Builder, Prototype",
     "**Structural** – composing classes/objects: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy",
     "**Behavioral** – communication & responsibility: Strategy, Observer, Command, State, Template Method, Chain of Responsibility, Iterator, Mediator, Memento, Visitor, Interpreter"],
  tip:"Creational = how objects are **made**; Structural = how they're **assembled**; Behavioral = how they **interact**." },

// ───────────── Creational Patterns ─────────────
{ cat:"Creational Patterns", q:"What is the Singleton pattern?",
  a:["Ensures a class has **only one instance** with a **global access point**",
     "Private constructor + static instance",
     "Uses: config, logging, caches, connection pools",
     "Downsides: **global state**, hidden dependencies, hard to test",
     "Modern approach: register as **singleton in DI container** instead"],
  code:`public sealed class Config {
    private static readonly Lazy<Config> _inst = new(() => new Config());
    public static Config Instance => _inst.Value;   // thread-safe, lazy
    private Config() { }
}` },

{ cat:"Creational Patterns", q:"What is the Factory Method pattern?",
  a:["Defines an interface for creating an object, but lets **subclasses / a method decide which class** to instantiate",
     "Client depends on the **product interface**, not concrete classes",
     "Removes `new ConcreteX()` scattered across code",
     "Examples: `ILoggerFactory.CreateLogger()`, `HttpClientFactory`"],
  code:`interface INotifier { void Send(string msg); }
static class NotifierFactory {
    public static INotifier Create(string type) => type switch {
        "email" => new EmailNotifier(),
        "sms"   => new SmsNotifier(),
        _ => throw new ArgumentException(type)
    };
}` },

{ cat:"Creational Patterns", q:"What is the Abstract Factory pattern?",
  a:["Creates **families of related objects** without specifying concrete classes",
     "A factory of factories",
     "Example: `IUIFactory` → `CreateButton()`, `CreateCheckbox()`; `WindowsFactory` vs `MacFactory`",
     "Ensures products from the same family are used together"] },

{ cat:"Creational Patterns", q:"Factory Method vs Abstract Factory?",
  a:["**Factory Method** – creates **one product**; uses inheritance/a method",
     "**Abstract Factory** – creates a **family** of related products; uses composition (factory object)",
     "Abstract Factory is often implemented with several factory methods"] },

{ cat:"Creational Patterns", q:"What is the Builder pattern?",
  a:["Constructs **complex objects step by step**",
     "Avoids **telescoping constructors** (many optional params)",
     "Often a **fluent** API",
     "Examples: `StringBuilder`, `WebApplication.CreateBuilder()`, `HostBuilder`, test data builders"],
  code:`var pizza = new PizzaBuilder()
    .Size("large")
    .AddTopping("cheese")
    .AddTopping("olives")
    .Build();` },

{ cat:"Creational Patterns", q:"What is the Prototype pattern?",
  a:["Create new objects by **cloning** an existing instance",
     "Useful when creation is **expensive** or configuration is complex",
     "Watch **shallow vs deep copy**",
     "C#: `ICloneable`, `MemberwiseClone()`, records with `with` expressions"] },

// ───────────── Structural Patterns ─────────────
{ cat:"Structural Patterns", q:"What is the Adapter pattern?",
  a:["Converts one interface into another the client expects — **wrapper**",
     "Lets **incompatible** classes work together",
     "Example: wrap a legacy/3rd-party payment SDK behind your `IPaymentGateway`",
     "Real-world analogy: power plug adapter"],
  code:`class StripeAdapter(StripeClient stripe) : IPaymentGateway {
    public void Pay(decimal amt) => stripe.CreateCharge((long)(amt * 100), "usd");
}` },

{ cat:"Structural Patterns", q:"What is the Decorator pattern?",
  a:["**Adds behavior dynamically** by wrapping an object with the **same interface**",
     "Alternative to subclassing for extending functionality",
     "Decorators can be **stacked**",
     "Examples: `BufferedStream(FileStream)`, caching/logging repository, ASP.NET middleware, `DelegatingHandler`"],
  code:`class CachedRepo(IProductRepo inner, IMemoryCache cache) : IProductRepo {
    public Product Get(int id) =>
        cache.GetOrCreate(id, _ => inner.Get(id))!;
}` },

{ cat:"Structural Patterns", q:"What is the Facade pattern?",
  a:["Provides a **simple, unified interface** to a complex subsystem",
     "Client calls one method instead of orchestrating many classes",
     "Example: `OrderFacade.PlaceOrder()` calls inventory, payment, shipping, email",
     "Reduces coupling to subsystem internals"] },

{ cat:"Structural Patterns", q:"What is the Proxy pattern?",
  a:["A **stand-in** object controlling access to another object (same interface)",
     "**Virtual proxy** – lazy loading (EF Core lazy-loading proxies)",
     "**Protection proxy** – access control",
     "**Remote proxy** – represents a remote object (gRPC/WCF clients)",
     "**Caching proxy**"] },

{ cat:"Structural Patterns", q:"Adapter vs Decorator vs Proxy vs Facade?",
  a:["**Adapter** – **changes** the interface (make it compatible)",
     "**Decorator** – **same** interface, **adds** behavior",
     "**Proxy** – **same** interface, **controls access**",
     "**Facade** – **new simplified** interface over **many** classes"] },

{ cat:"Structural Patterns", q:"What is the Composite pattern?",
  a:["Treat **individual objects and groups uniformly** (tree structures)",
     "Leaf and Composite implement the same interface",
     "Examples: file system (files & folders), UI component trees, org charts, menus"],
  code:`interface INode { long Size(); }
class FileNode(long size) : INode { public long Size() => size; }
class Folder(List<INode> children) : INode {
    public long Size() => children.Sum(c => c.Size());
}` },

{ cat:"Structural Patterns", q:"What are the Bridge and Flyweight patterns?",
  a:["**Bridge** – separate **abstraction from implementation** so both vary independently (Shape × Renderer instead of class explosion)",
     "**Flyweight** – **share** common intrinsic state among many fine-grained objects to save memory (characters in a text editor, game particles, string interning)"] },

// ───────────── Behavioral Patterns ─────────────
{ cat:"Behavioral Patterns", q:"What is the Strategy pattern?",
  a:["Define a **family of algorithms**, encapsulate each, make them **interchangeable** at runtime",
     "Replaces big `if/switch` on type → supports **OCP**",
     "Examples: payment methods, sorting, pricing/discount rules, compression"],
  code:`interface IShippingStrategy { decimal Cost(Order o); }
class Express  : IShippingStrategy { public decimal Cost(Order o) => 20; }
class Standard : IShippingStrategy { public decimal Cost(Order o) => 5; }

class Checkout(IShippingStrategy shipping) {
    public decimal Total(Order o) => o.Subtotal + shipping.Cost(o);
}` },

{ cat:"Behavioral Patterns", q:"What is the Observer pattern?",
  a:["**One-to-many**: when the **subject** changes, all **observers** are notified",
     "Loose coupling between publisher and subscribers",
     "Examples: C# **events**, `IObservable<T>`/Rx, UI data binding, RxJS, pub/sub",
     "⚠️ Unsubscribe to avoid **memory leaks**"] },

{ cat:"Behavioral Patterns", q:"What is the Command pattern?",
  a:["Encapsulate a **request as an object**",
     "Enables **undo/redo**, queuing, logging, retry, macro commands",
     "Parts: Command (`Execute`/`Undo`), Invoker, Receiver",
     "Examples: WPF `ICommand`, MediatR requests, job queues"] },

{ cat:"Behavioral Patterns", q:"What is the Template Method pattern?",
  a:["Base class defines the **skeleton of an algorithm**; subclasses override **specific steps**",
     "Uses inheritance (vs Strategy uses composition)",
     "Hook methods for optional steps",
     "Example: data import: `Read() → Validate() → Transform() → Save()`"],
  code:`abstract class Report {
    public void Generate() { var d = Load(); Format(d); Export(); } // template
    protected abstract object Load();
    protected abstract void Format(object d);
    protected virtual void Export() => Console.WriteLine("PDF");   // hook
}` },

{ cat:"Behavioral Patterns", q:"What is the State pattern?",
  a:["Object **changes behavior when its internal state changes** — appears to change class",
     "Each state is a class implementing a common interface",
     "Replaces large `switch(state)` blocks",
     "Examples: order lifecycle (New → Paid → Shipped), TCP connection, vending machine"] },

{ cat:"Behavioral Patterns", q:"Strategy vs State pattern?",
  a:["Same structure (context delegates to an interface)",
     "**Strategy** – client **chooses** the algorithm; strategies independent",
     "**State** – the object **transitions itself** between states; states know about each other",
     "Strategy = how to do it; State = what I am now"] },

{ cat:"Behavioral Patterns", q:"What is the Chain of Responsibility pattern?",
  a:["Pass a request along a **chain of handlers**; each handles it or passes it on",
     "Decouples sender from receivers",
     "Examples: **ASP.NET Core middleware pipeline**, approval workflows, validation chains, logging levels"] },

{ cat:"Behavioral Patterns", q:"What are the Iterator and Mediator patterns?",
  a:["**Iterator** – traverse a collection **without exposing its structure** (`IEnumerable`/`IEnumerator`, `yield return`)",
     "**Mediator** – objects communicate **through a central mediator** instead of directly → reduces many-to-many coupling",
     "Mediator examples: chat room, air traffic control, **MediatR** in .NET"] },

{ cat:"Behavioral Patterns", q:"What are the Memento and Visitor patterns?",
  a:["**Memento** – capture & restore an object's state **without violating encapsulation** (undo, snapshots)",
     "**Visitor** – add **new operations** to an object structure without changing its classes (double dispatch)",
     "Visitor examples: compilers/AST processing (Roslyn `SyntaxVisitor`), expression trees (`ExpressionVisitor`)"] }
];

PREP_DATA.push(...[

// ───────────── Advanced: Patterns in Practice ─────────────
{ cat:"Advanced: Patterns in Practice", q:"How do you implement a thread-safe Singleton? What are the options?",
  a:["**Static readonly field** – CLR guarantees thread-safe type init (eager-ish)",
     "**`Lazy<T>`** – lazy + thread-safe (recommended)",
     "**Double-checked locking** with `volatile` – classic, error-prone",
     "❌ Plain `if (_inst == null) _inst = new()` – race condition",
     "Best in modern apps: `services.AddSingleton<T>()`"],
  code:`public sealed class Logger {
    private static volatile Logger? _inst;
    private static readonly object _lock = new();
    public static Logger Instance {
        get {
            if (_inst is null)
                lock (_lock)
                    _inst ??= new Logger();
            return _inst;
        }
    }
    private Logger() { }
}` },

{ cat:"Advanced: Patterns in Practice", q:"Why is Singleton considered an anti-pattern by some?",
  a:["**Global mutable state** → hidden coupling",
     "**Hard to unit test** (can't easily mock/replace)",
     "Violates **SRP** (manages own lifecycle + business logic)",
     "Concurrency issues with mutable state",
     "Alternative: DI container with **singleton lifetime** — same single instance, but injectable & testable"] },

{ cat:"Advanced: Patterns in Practice", q:"What is Dependency Injection and Inversion of Control?",
  a:["**IoC** – framework controls object creation/flow instead of your code (\"don't call us, we'll call you\")",
     "**DI** – a form of IoC: dependencies are **provided from outside**, not created inside",
     "Types: **constructor** (preferred), property/setter, method injection",
     "Benefits: loose coupling, **testability**, configurable lifetimes",
     "**Service Locator** is considered an anti-pattern (hidden dependencies)"] },

{ cat:"Advanced: Patterns in Practice", q:"What are the Repository and Unit of Work patterns?",
  a:["**Repository** – collection-like abstraction over data access (`GetById`, `Add`, `Remove`)",
     "Hides persistence details, keeps domain **persistence-ignorant**, eases testing",
     "**Unit of Work** – tracks changes and **commits them in one transaction**",
     "EF Core's `DbSet` ≈ repository and `DbContext` ≈ unit of work → wrapping them is debated",
     "Avoid **generic repositories** that leak `IQueryable` everywhere"] },

{ cat:"Advanced: Patterns in Practice", q:"What is the Specification pattern?",
  a:["Encapsulate a **business rule / query criteria** as a reusable object",
     "Combinable with **And / Or / Not**",
     "Used with repositories to avoid method explosion (`GetActiveCustomersInRegion…`)",
     "In .NET often an `Expression<Func<T,bool>>`"] },

{ cat:"Advanced: Patterns in Practice", q:"What is the Null Object pattern?",
  a:["Provide an object with **do-nothing behavior** instead of `null`",
     "Removes repetitive null checks",
     "Examples: `NullLogger.Instance`, `Stream.Null`, `Enumerable.Empty<T>()`"] },

{ cat:"Advanced: Patterns in Practice", q:"How does ASP.NET Core / .NET use design patterns?",
  a:["**Chain of Responsibility** – middleware pipeline",
     "**Decorator** – `DelegatingHandler`, stream wrappers",
     "**Factory** – `IHttpClientFactory`, `ILoggerFactory`",
     "**Builder** – `WebApplicationBuilder`, `HostBuilder`",
     "**Observer** – events, `IObservable`, `IOptionsMonitor.OnChange`",
     "**Strategy** – authentication schemes, policies",
     "**Iterator** – `IEnumerable`; **Options** pattern; **DI** everywhere"] },

// ───────────── Advanced: Architecture Patterns ─────────────
{ cat:"Advanced: Architecture Patterns", q:"MVC vs MVP vs MVVM?",
  a:["**MVC** – Controller handles input, updates Model, picks View (ASP.NET MVC)",
     "**MVP** – Presenter mediates; View is passive, talks to Presenter via interface (WinForms)",
     "**MVVM** – ViewModel exposes state/commands; View **data-binds** to it (WPF, MAUI, Angular-ish)",
     "All separate **UI from logic** for testability"] },

{ cat:"Advanced: Architecture Patterns", q:"What is Clean / Onion / Hexagonal architecture?",
  a:["**Domain at the center**, infrastructure at the edges",
     "**Dependency rule**: dependencies point **inward** (UI/DB depend on core, never reverse)",
     "Layers: Domain → Application (use cases) → Infrastructure / Presentation",
     "**Hexagonal (Ports & Adapters)**: core defines ports (interfaces), adapters implement them (DB, HTTP, queue)",
     "Benefits: testable core, swap frameworks/DBs"] },

{ cat:"Advanced: Architecture Patterns", q:"What is CQRS?",
  a:["**Command Query Responsibility Segregation** – separate **write model (commands)** from **read model (queries)**",
     "Commands change state, return nothing (or ID); queries return data, no side effects",
     "Read side can be **denormalized / separate store** optimized for queries",
     "Performance improves by avoiding expensive joins, adding read-side indexes/caches, and scaling read and write workloads independently",
     "Trade-off: read models may be **eventually consistent**, so CQRS is not automatically faster for every workload",
     "Often with MediatR, event sourcing",
     "Adds complexity → use for complex domains / different read-write scaling needs"] },

{ cat:"Advanced: Architecture Patterns", q:"What is Event Sourcing?",
  a:["Store **state changes as an append-only sequence of events**, not current state",
     "Current state = **replay** events (+ snapshots for speed)",
     "Benefits: full **audit trail**, time travel, rebuild projections",
     "Challenges: event versioning, eventual consistency, complexity",
     "Often paired with **CQRS** (events → read-model projections)"] },

{ cat:"Advanced: Architecture Patterns", q:"What are key Domain-Driven Design (DDD) concepts?",
  a:["**Ubiquitous language** – shared vocabulary between devs & domain experts",
     "**Bounded context** – explicit boundary where a model applies",
     "**Entity** – has identity; **Value Object** – defined by values, immutable (Money, Address)",
     "**Aggregate** – cluster of objects with an **aggregate root** enforcing invariants; transaction boundary",
     "**Domain events**, **repositories** (per aggregate), **domain services**",
     "Anemic vs **rich domain model** (behavior inside entities)"] },

{ cat:"Advanced: Architecture Patterns", q:"Monolith vs Microservices?",
  a:["**Monolith** – single deployable; simple dev/debug/transactions; scales as one unit",
     "**Microservices** – independent services per business capability; own data; independent deploy & scale",
     "Microservices cost: distributed complexity, network failures, data consistency, ops overhead",
     "Middle ground: **modular monolith**",
     "Start monolith, split when team/scale needs justify it"] },

// ───────────── Advanced: Microservice Patterns ─────────────
{ cat:"Advanced: Microservice Patterns", q:"What is the Circuit Breaker pattern?",
  a:["Stops calling a **failing dependency** to prevent cascading failures",
     "States: **Closed** (normal) → **Open** (fail fast after N failures) → **Half-Open** (trial calls) → Closed",
     "Combine with **retry with exponential backoff + jitter**, timeouts, fallbacks, bulkheads",
     ".NET: **Polly** / `Microsoft.Extensions.Http.Resilience`"] },

{ cat:"Advanced: Microservice Patterns", q:"What is the Saga pattern?",
  a:["Manage a **distributed transaction** as a sequence of **local transactions**",
     "On failure, run **compensating transactions** to undo previous steps",
     "**Choreography** – services react to each other's events (decentralized)",
     "**Orchestration** – central orchestrator tells each service what to do",
     "Example: Order → Reserve stock → Charge payment → (fail) → Release stock, Cancel order"] },

{ cat:"Advanced: Microservice Patterns", q:"What are API Gateway, BFF and Service Discovery?",
  a:["**API Gateway** – single entry point: routing, auth, rate limiting, aggregation (YARP, Azure APIM, Kong)",
     "**Backend for Frontend (BFF)** – separate gateway per client type (web, mobile)",
     "**Service Discovery** – services find each other dynamically (Consul, Kubernetes DNS)"] },

{ cat:"Advanced: Microservice Patterns", q:"What are the Outbox, Idempotent Consumer and Strangler Fig patterns?",
  a:["**Transactional Outbox** – save business data + outgoing message in **same DB transaction**; relay publishes later → no lost/phantom events",
     "**Idempotent Consumer** – handle duplicate messages safely (store processed message IDs)",
     "**Strangler Fig** – incrementally replace a legacy system by routing features to new services one by one",
     "Also: **Anti-Corruption Layer** – translate between legacy and new models"] },

{ cat:"Advanced: Microservice Patterns", q:"What are the Bulkhead and Retry patterns?",
  a:["**Bulkhead** – isolate resources (thread pools, connections) per dependency so one failure doesn't sink everything",
     "**Retry** – retry **transient** failures with **exponential backoff + jitter**",
     "Only retry **idempotent** operations; cap attempts",
     "Combine with **timeouts** and circuit breakers"] },

// ───────────── Advanced: Anti-patterns & Code Smells ─────────────
{ cat:"Advanced: Anti-patterns & Smells", q:"What are common anti-patterns?",
  a:["**God Object** – one class knows/does everything",
     "**Spaghetti code** – tangled control flow",
     "**Golden Hammer** – using one favorite tool/pattern for everything",
     "**Anemic Domain Model** – entities with only getters/setters, logic in services",
     "**Lava flow** – dead code nobody dares remove",
     "**Premature optimization**, **copy-paste programming**, **Service Locator**, **Distributed monolith**"] },

{ cat:"Advanced: Anti-patterns & Smells", q:"What are common code smells and their refactorings?",
  a:["**Long method** → Extract Method",
     "**Large class** → Extract Class (SRP)",
     "**Long parameter list** → Parameter Object / Builder",
     "**Switch on type** → Polymorphism / Strategy",
     "**Feature envy** (method uses another class's data more) → Move Method",
     "**Primitive obsession** → Value Objects",
     "**Shotgun surgery** (one change touches many classes) → consolidate"] },

{ cat:"Advanced: Anti-patterns & Smells", q:"When should you NOT use design patterns?",
  a:["When a simple solution works — patterns add **indirection & complexity**",
     "Don't apply patterns **speculatively** (YAGNI)",
     "Refactor **toward** a pattern when a real need/smell appears",
     "Patterns are a vocabulary, not a goal"] },

// ───────────── Advanced: Design Scenarios ─────────────
{ cat:"Advanced: Design Scenarios", q:"Which pattern would you use for a payment system supporting multiple providers?",
  a:["**Strategy** – `IPaymentProvider` per provider (Stripe, PayPal), selected at runtime",
     "**Adapter** – wrap each provider SDK into your interface",
     "**Factory** – create the right provider based on config/user choice",
     "**Decorator** – add logging/retry/fraud checks",
     "**Circuit breaker** around external calls"] },

{ cat:"Advanced: Design Scenarios", q:"Which pattern would you use for a notification system (email, SMS, push)?",
  a:["**Observer / pub-sub** – events trigger notifications",
     "**Strategy** – channel implementations behind `INotificationChannel`",
     "**Factory** – pick channel by user preference",
     "**Template Method / Builder** – compose message content",
     "**Queue + Retry + Idempotency** for reliability"] },

{ cat:"Advanced: Design Scenarios", q:"How would you design an undo/redo feature?",
  a:["**Command** pattern – each action is an object with `Execute()` and `Undo()`",
     "Two stacks: **undo stack** and **redo stack**",
     "New action → push to undo, clear redo",
     "Alternative: **Memento** – store state snapshots",
     "Combine both for complex editors"] },

{ cat:"Advanced: Design Scenarios", q:"How would you design a parking lot system (OOP design question)?",
  a:["Clarify requirements: vehicle types, spot sizes, payment, multiple levels",
     "Classes: `ParkingLot`, `Level`, `ParkingSpot` (Small/Medium/Large), `Vehicle` (Car/Bike/Truck), `Ticket`, `Payment`",
     "**Strategy** for pricing & spot allocation; **Singleton/DI** for the lot; **Factory** for vehicles/spots",
     "Apply **SRP** and **encapsulation**; handle concurrency on spot assignment",
     "Walk through a use case: enter → assign spot → ticket → exit → pay"],
  tip:"OOD questions: clarify requirements → identify entities → relationships → key methods → patterns → edge cases." }

].map(q => ({ ...q, level:'Advanced' })));
