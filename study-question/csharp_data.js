// C# / .NET study questions — common and advanced questions with short, memorizable answers.
// Format: { cat, q, a:[bullets], code?, tip?, level? }   Bullets support `code` and **bold**.
const PREP_KEY = 'csharp';
const PREP_DATA = [

// ───────────── .NET Fundamentals ─────────────
{ cat:".NET Fundamentals", q:"What is .NET and what are its main components?",
  a:["**Free, open-source, cross-platform** developer platform by Microsoft",
     "**CLR** (Common Language Runtime) – executes code, GC, JIT, type safety, exceptions",
     "**BCL** (Base Class Library) – collections, IO, LINQ, networking…",
     "**Languages**: C#, F#, VB.NET — all compile to **IL**",
     "**SDK / CLI** (`dotnet build`, `dotnet run`), NuGet packages",
     "Evolution: .NET Framework (Windows only) → .NET Core → **.NET 5+** (unified)"] },

{ cat:".NET Fundamentals", q:"What is the difference between .NET Framework, .NET Core and .NET (5+)?",
  a:["**.NET Framework** – Windows-only, legacy (4.8 is last), in maintenance",
     "**.NET Core** – cross-platform, open-source, high-performance rewrite",
     "**.NET 5+** – unification of both; new major release **every November**",
     "**Even versions = LTS** (3 years), odd = STS (18 months)",
     "New projects → latest LTS .NET"] },

{ cat:".NET Fundamentals", q:"How is C# code compiled and executed?",
  a:["C# compiler (**Roslyn**) → **IL** (Intermediate Language) in an assembly (.dll/.exe)",
     "At runtime the **JIT** compiles IL → native machine code per method on first call",
     "**Tiered compilation**: quick JIT first, optimized re-JIT for hot methods",
     "**ReadyToRun / Native AOT** – precompile to native for faster startup"],
  tip:"C# → IL → (JIT) → native code." },

{ cat:".NET Fundamentals", q:"What are CLR, CTS and CLS?",
  a:["**CLR** – runtime engine: memory management, GC, JIT, security, exception handling, threading",
     "**CTS** (Common Type System) – defines how types are declared & used across .NET languages",
     "**CLS** (Common Language Specification) – subset of CTS rules for **language interoperability**"] },

{ cat:".NET Fundamentals", q:"What is managed vs unmanaged code?",
  a:["**Managed** – runs under the **CLR** (GC, type safety, exception handling)",
     "**Unmanaged** – runs directly on OS (C/C++, COM, Win32 APIs)",
     "Interop via **P/Invoke** (`DllImport` / `LibraryImport`) and COM interop",
     "Unmanaged resources (file handles, sockets) need **IDisposable** cleanup"] },

{ cat:".NET Fundamentals", q:"What is an assembly?",
  a:["**Compiled unit of deployment**: `.dll` or `.exe`",
     "Contains **IL code**, **metadata** (types), **manifest** (version, references), resources",
     "Basis for versioning and security",
     "Strong-named assemblies have a unique identity (public key)"] },

// ───────────── Types & Memory ─────────────
{ cat:"Types & Memory", q:"What is the difference between value types and reference types?",
  a:["**Value types** (`int`, `bool`, `struct`, `enum`, `DateTime`) – hold the **data itself**",
     "**Reference types** (`class`, `string`, arrays, `delegate`, `interface`) – hold a **reference** to heap object",
     "Assignment: value type **copies data**; reference type **copies the reference** (same object)",
     "Value types: usually stack / inline in containing object; reference types: **managed heap**",
     "Value types can't be null unless `Nullable<T>` (`int?`)"],
  code:`int a = 5; int b = a; b = 10;        // a is still 5
var p1 = new Person(); var p2 = p1;
p2.Name = "Bob";                       // p1.Name is also "Bob"` },

{ cat:"Types & Memory", q:"What is the difference between stack and heap?",
  a:["**Stack** – per thread, LIFO, very fast, stores **local value types & references**, freed automatically when method returns",
     "**Heap** – shared, stores **reference-type objects**, managed by the **GC**",
     "Value types inside a class live **on the heap** (inside the object)",
     "\"Value types on stack\" is an implementation detail, not a rule"] },

{ cat:"Types & Memory", q:"What are boxing and unboxing?",
  a:["**Boxing** – converting a value type to `object`/interface → **allocates on heap**",
     "**Unboxing** – extracting the value type from the object (explicit cast)",
     "Costly: allocations + GC pressure",
     "Avoid with **generics** (`List<int>` instead of `ArrayList`)"],
  code:`int x = 42;
object o = x;      // boxing
int y = (int)o;    // unboxing` },

{ cat:"Types & Memory", q:"What is the difference between class and struct?",
  a:["**class** – reference type, heap, supports **inheritance**, can be null",
     "**struct** – value type, copied on assignment, **no inheritance** (can implement interfaces)",
     "Use struct for **small, immutable**, short-lived data (≤ 16 bytes guideline): `Point`, `Money`",
     "`readonly struct` → guarantees immutability, avoids defensive copies",
     "Large structs → expensive copying"] },

{ cat:"Types & Memory", q:"What are records?",
  a:["Reference types (C# 9) designed for **immutable data models**",
     "**Value-based equality** (compares properties, not reference)",
     "Concise **positional syntax**, auto `ToString()`, deconstruction",
     "**Non-destructive mutation** with `with` expression",
     "`record struct` (C# 10) for value-type records"],
  code:`public record Person(string Name, int Age);
var p1 = new Person("Ann", 30);
var p2 = p1 with { Age = 31 };
Console.WriteLine(p1 == new Person("Ann", 30)); // True` },

{ cat:"Types & Memory", q:"Why is string immutable? What is StringBuilder?",
  a:["Every modification creates a **new string object**",
     "Benefits: **thread-safe**, safe as dictionary keys, **string interning**",
     "Concatenating in loops → many allocations",
     "**StringBuilder** – mutable buffer, efficient for many appends",
     "Rule: few concatenations → `+` / interpolation; loops → StringBuilder"] },

{ cat:"Types & Memory", q:"What are nullable value types and nullable reference types?",
  a:["**Nullable value types**: `int?` = `Nullable<int>`, has `.HasValue`, `.Value`",
     "**Nullable reference types** (C# 8): compiler **warnings** to prevent `NullReferenceException`",
     "`string` = non-null; `string?` = may be null",
     "Operators: `?.` (null-conditional), `??` (null-coalescing), `??=`, `!` (null-forgiving)"],
  code:`string? name = GetName();
int len = name?.Length ?? 0;
cache ??= new Dictionary<string, int>();` },

{ cat:"Types & Memory", q:"What is the difference between var, dynamic and object?",
  a:["`var` – **compile-time** type inference; still **strongly typed**",
     "`object` – base of all types; needs **casting**, boxing for value types",
     "`dynamic` – type checked at **runtime** (DLR); no IntelliSense, runtime errors",
     "Use `dynamic` rarely: COM interop, dynamic JSON, scripting"] },

{ cat:"Types & Memory", q:"What is the difference between const and readonly?",
  a:["`const` – **compile-time** constant, implicitly static, only primitives/strings",
     "Value is **baked into** calling assemblies → changing requires recompiling consumers",
     "`readonly` – assigned at declaration or in **constructor**, **runtime** value, any type",
     "`static readonly` – common for shared runtime constants"] },

{ cat:"Types & Memory", q:"What is the difference between == and Equals()?",
  a:["`==` – for reference types: **reference equality** by default (unless overloaded, like `string`)",
     "`Equals()` – virtual; can be overridden for **value equality**",
     "Value types: `Equals` compares values",
     "Override `Equals` → also override **`GetHashCode`**",
     "`ReferenceEquals(a, b)` – always reference comparison"] },

// ───────────── OOP in C# ─────────────
{ cat:"OOP in C#", q:"What are access modifiers in C#?",
  a:["`public` – accessible everywhere",
     "`private` – only within the **same class** (default for members)",
     "`protected` – class + **derived classes**",
     "`internal` – same **assembly** (default for top-level types)",
     "`protected internal` – same assembly **OR** derived classes",
     "`private protected` – same assembly **AND** derived classes",
     "`file` (C# 11) – visible only in the same source file"] },

{ cat:"OOP in C#", q:"What is the difference between abstract class and interface?",
  a:["**Abstract class**: can have **state (fields)**, constructors, implemented & abstract members; **single inheritance**",
     "**Interface**: contract; class can implement **many**",
     "Since C# 8 interfaces can have **default implementations**, static members — but no instance fields",
     "Use abstract class for **shared base behavior** (\"is-a\"); interface for **capabilities** (\"can-do\")"],
  table:{
    caption:"Direct Comparison",
    headers:["Feature", "Abstract Class (`abstract class`)", "Interface (`interface`)"],
    rows:[
      ["Inheritance", "**Single inheritance** (a class can only inherit from one base class).", "**Multiple inheritance** (a class can implement multiple interfaces)."],
      ["State / Fields", "**Can contain instance fields** (variables) to hold state.", "**Cannot contain instance fields**."],
      ["Constructors", "**Can have constructors** to initialize base state.", "**Cannot have instance constructors** (a `static` constructor is allowed since C# 8)."],
      ["Implementation", "Can contain both complete methods (concrete logic) and incomplete methods (abstract).", "Historically none. Since C# 8, they can provide **Default Interface Methods**."],
      ["Access Modifiers", "Can use `private`, `protected`, `internal`, `public`, etc.", "Members are implicitly `public` by default."],
      ["Versioning", "**Stronger flexibility**. Adding a concrete method won't break derived classes.", "**Risky**. Adding a method without a default implementation breaks all implementing classes."]
    ]
  } },

{ cat:"OOP in C#", q:"What is the difference between virtual, override, abstract, sealed and new?",
  a:["`virtual` – method **can** be overridden",
     "`abstract` – **must** be overridden (no body), class must be abstract",
     "`override` – provides a new implementation of a virtual/abstract member (**runtime polymorphism**)",
     "`sealed` – prevents further inheritance/overriding",
     "`new` – **hides** base member (method hiding); call depends on **reference type**, not object"],
  code:`Base b = new Derived();
b.Virt();   // Derived.Virt  (override → runtime type)
b.Hidden(); // Base.Hidden   (new → compile-time type)` },

{ cat:"OOP in C#", q:"What is method overloading vs overriding?",
  a:["**Overloading** – same name, **different parameters**, same class → **compile-time** polymorphism",
     "**Overriding** – same signature in **derived class** with `override` → **runtime** polymorphism",
     "Return type alone can't distinguish overloads"] },

{ cat:"OOP in C#", q:"What is a static class / static member?",
  a:["`static` members belong to the **type**, not an instance",
     "Static class: **can't be instantiated or inherited**, only static members (e.g. `Math`)",
     "**Static constructor** runs once, before first use, thread-safe",
     "Beware: static mutable state = global state → hard to test, thread-safety issues"] },

{ cat:"OOP in C#", q:"What are extension methods?",
  a:["Add methods to existing types **without modifying or inheriting**",
     "Static method in a **static class** with `this` on the first parameter",
     "LINQ is built on extension methods",
     "C# 14 adds **extension members** (properties, static members) via `extension` blocks"],
  code:`public static class StringExt {
    public static bool IsBlank(this string? s) => string.IsNullOrWhiteSpace(s);
}
"  ".IsBlank(); // true` },

{ cat:"OOP in C#", q:"What are properties and how do they differ from fields?",
  a:["**Field** – a variable storing data",
     "**Property** – `get`/`set` accessors wrapping a field (**encapsulation**, validation, computed values)",
     "Auto-properties: `public string Name { get; set; }`",
     "`init` accessor – settable only during **object initialization** (immutability)",
     "`required` (C# 11) – must be set by initializer"] },

{ cat:"OOP in C#", q:"What are partial classes and partial methods?",
  a:["Split a class definition across **multiple files** with `partial`",
     "Used by **code generators** (WinForms designer, source generators, EF)",
     "Compiled into one type",
     "Partial methods – declaration in one part, optional implementation in another"] },

// ───────────── Collections & Generics ─────────────
{ cat:"Collections & Generics", q:"What are generics and why use them?",
  a:["Type-safe code with **type parameters**: `List<T>`, `Dictionary<TKey,TValue>`",
     "**Type safety** at compile time, **no casting**",
     "**No boxing** for value types → better performance",
     "Code reuse",
     "**Constraints**: `where T : class`, `struct`, `new()`, `notnull`, `BaseClass`, `IInterface`"],
  code:`public T Max<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) >= 0 ? a : b;` },

{ cat:"Collections & Generics", q:"What is the difference between Array, List<T>, and ArrayList?",
  a:["**Array** – **fixed size**, strongly typed, fastest",
     "**List<T>** – **dynamic size**, strongly typed, generic → preferred",
     "**ArrayList** – dynamic but stores `object` → boxing, casting; **legacy**"] },

{ cat:"Collections & Generics", q:"IEnumerable vs IQueryable (and ICollection, IList) — what's the difference?",
  a:["`IEnumerable<T>` – **forward-only iteration** (foreach), deferred execution, LINQ to Objects (in memory)",
     "`ICollection<T>` – + `Count`, `Add`, `Remove`",
     "`IList<T>` – + **index access** `[i]`, `Insert`",
     "`IQueryable<T>` – builds an **expression tree** translated by a provider (e.g. **EF → SQL**) → filtering on the **database**",
     "Keep `IQueryable` until the query is fully built – calling `ToList()` / `AsEnumerable()` too early loads **all rows** and filters in memory"],
  code:`// IQueryable: Where becomes SQL → filtered in the database
var query = db.Engagements.Where(e => e.Status == "Active");

// IEnumerable after ToList(): loads every row, then filters in memory ❌
var list = db.Engagements.ToList().Where(e => e.Status == "Active");`,
  tip:"IEnumerable filters in memory; IQueryable filters in the database." },

{ cat:"Collections & Generics", q:"How does Dictionary<TKey,TValue> work?",
  a:["**Hash table**: key's `GetHashCode()` picks a bucket, `Equals()` resolves collisions",
     "Lookup / insert ≈ **O(1)** average",
     "Keys must be **unique** and should be **immutable**",
     "Use `TryGetValue` to avoid double lookup / exceptions",
     "Not thread-safe → `ConcurrentDictionary` for multi-threading"] },

{ cat:"Collections & Generics", q:"Name common collection types and when to use them.",
  a:["`List<T>` – ordered, indexed, general purpose",
     "`Dictionary<K,V>` – fast key lookup",
     "`HashSet<T>` – **unique** items, fast contains",
     "`Queue<T>` (FIFO), `Stack<T>` (LIFO), `PriorityQueue<T,P>`",
     "`LinkedList<T>` – fast insert/remove in middle",
     "`SortedDictionary` / `SortedSet` – ordered keys",
     "`ConcurrentDictionary`, `ConcurrentQueue`, `Channel<T>` – thread-safe",
     "`ImmutableList`, `FrozenDictionary` (.NET 8) – read-only / read-optimized"] },

{ cat:"Collections & Generics", q:"What is the yield keyword?",
  a:["Creates an **iterator** — returns items **one at a time, lazily**",
     "`yield return` produces next value; `yield break` ends",
     "Compiler generates a **state machine**",
     "Memory efficient for large/infinite sequences"],
  code:`IEnumerable<int> Evens() {
    for (int i = 0; ; i += 2) yield return i;
}
Evens().Take(3); // 0, 2, 4` },

// ───────────── Delegates, Events & LINQ ─────────────
{ cat:"Delegates, Events & LINQ", q:"What is a delegate?",
  a:["A **type-safe function pointer** — reference to a method with a specific signature",
     "Built-in: `Action<T>` (no return), `Func<T,TResult>` (returns), `Predicate<T>` (bool)",
     "**Multicast** – can hold multiple methods (`+=`)",
     "Basis for **events**, callbacks, LINQ lambdas"],
  code:`Func<int, int, int> add = (a, b) => a + b;
Action<string> log = Console.WriteLine;
log(add(2, 3).ToString());` },

{ cat:"Delegates, Events & LINQ", q:"What is the difference between a delegate and an event?",
  a:["An **event** is a **restricted delegate** for publisher/subscriber",
     "Outside code can only **subscribe/unsubscribe** (`+=` / `-=`)",
     "Only the **declaring class can raise** it",
     "Standard pattern: `EventHandler<TEventArgs>`, `(object sender, EventArgs e)`",
     "⚠️ Forgetting to unsubscribe → **memory leaks**"] },

{ cat:"Delegates, Events & LINQ", q:"What is LINQ?",
  a:["**Language Integrated Query** – query collections with C# syntax",
     "**Method syntax** (`Where`, `Select`) and **query syntax** (`from … where … select`)",
     "Works with objects, XML, databases (EF Core via IQueryable)",
     "Common: `Where`, `Select`, `SelectMany`, `OrderBy`, `GroupBy`, `Join`, `Any`, `All`, `First(OrDefault)`, `Single`, `Count`, `Sum`, `Distinct`, `Skip/Take`"],
  code:`var adults = people
    .Where(p => p.Age >= 18)
    .OrderBy(p => p.Name)
    .Select(p => p.Name)
    .ToList();` },

{ cat:"Delegates, Events & LINQ", q:"What is deferred vs immediate execution in LINQ?",
  a:["**Deferred** – query runs **when enumerated** (`Where`, `Select`, `OrderBy`)",
     "**Immediate** – runs now: `ToList()`, `ToArray()`, `Count()`, `First()`, `Sum()`",
     "Deferred query enumerated twice → **executes twice** (possible double DB call)",
     "Materialize with `ToList()` when reusing results"] },

{ cat:"Delegates, Events & LINQ", q:"First vs FirstOrDefault vs Single vs SingleOrDefault?",
  a:["`First()` – first match; **throws** if none",
     "`FirstOrDefault()` – first match or **default** (null/0)",
     "`Single()` – **exactly one** match; throws if none **or more than one**",
     "`SingleOrDefault()` – zero or one; throws if **more than one**",
     "Use Single when uniqueness is a **business rule** (e.g. by ID)"] },

{ cat:"Delegates, Events & LINQ", q:"What are lambda expressions and closures?",
  a:["**Lambda** – anonymous function: `x => x * 2`",
     "**Closure** – lambda **captures outer variables** by reference",
     "Captured variable changes are visible inside the lambda",
     "Captures can cause **allocations**; `static` lambdas prevent capture"] },

// ───────────── Exceptions & Resources ─────────────
{ cat:"Exceptions & Resources", q:"How does exception handling work in C#?",
  a:["`try` – code that may throw",
     "`catch (SpecificException ex)` – handle; order **specific → general**",
     "`finally` – **always runs** (cleanup)",
     "`when` filter: `catch (HttpRequestException ex) when (ex.StatusCode == 404)`",
     "Don't swallow exceptions; don't use them for normal control flow",
     "Create custom exceptions deriving from `Exception`"] },

{ cat:"Exceptions & Resources", q:"What is the difference between throw and throw ex?",
  a:["`throw;` – rethrows **preserving the original stack trace** ✅",
     "`throw ex;` – **resets the stack trace** to the current line ❌",
     "Wrap with context: `throw new MyException(\"msg\", ex)` (inner exception)"] },

{ cat:"Exceptions & Resources", q:"What is IDisposable and the using statement?",
  a:["`IDisposable.Dispose()` – release **unmanaged resources** deterministically (files, DB connections, sockets)",
     "`using` ensures `Dispose()` is called even if an exception occurs",
     "`using var x = …;` (C# 8) – disposed at end of scope",
     "`IAsyncDisposable` + `await using` for async cleanup"],
  code:`using var conn = new SqlConnection(cs);
await conn.OpenAsync();
// conn.Dispose() called automatically at end of scope` },

{ cat:"Exceptions & Resources", q:"What is the difference between Dispose and Finalize?",
  a:["**Dispose** – called **explicitly** (or via `using`), deterministic",
     "**Finalizer** (`~ClassName()`) – called by **GC**, non-deterministic, slower (objects survive an extra GC)",
     "**Dispose pattern**: `Dispose()` calls `Dispose(true)` + `GC.SuppressFinalize(this)`",
     "Prefer **SafeHandle** over writing finalizers"] },

// ───────────── Async & Threading ─────────────
{ cat:"Async & Threading", q:"async vs await — what's the difference and how do they work?",
  a:["`async` – modifier on the method **signature** that enables `await`; returns `Task`, `Task<T>`, `ValueTask` (or `void` for event handlers only)",
     "`await` – used **inside** an async method; **suspends** it until the awaited Task completes, **without blocking** the thread",
     "`async` alone doesn't make code asynchronous – without an `await` the method runs **synchronously** (warning CS1998)",
     "`await` **frees the thread** while waiting for I/O → better **scalability**; code still reads like synchronous code (no callbacks)",
     "Compiler generates a **state machine**; continues after the awaited task completes",
     "Async ≠ multithreading: I/O-bound work uses **no thread** while waiting",
     "Use async for **I/O-bound** work (DB, HTTP, files, queues); use `Task.Run` only for **CPU-bound** work"],
  code:`public async Task<User> GetUserAsync(int id) {
    var json = await _http.GetStringAsync($"/users/{id}");
    return JsonSerializer.Deserialize<User>(json)!;
}`,
  tip:"`async` enables asynchronous work; `await` waits for the result without blocking the request thread." },

{ cat:"Async & Threading", q:"What is the difference between Task and Thread?",
  a:["**Thread** – OS-level thread, expensive to create, low-level control",
     "**Task** – higher-level **unit of work**, usually runs on the **ThreadPool**",
     "Tasks support **return values, continuations, cancellation, async/await, composition** (`WhenAll`)",
     "Prefer Task in modern code"] },

{ cat:"Async & Threading", q:"Why avoid async void and .Result / .Wait()?",
  a:["**async void** – exceptions can't be caught by caller → may **crash the process**; can't be awaited (only for event handlers)",
     "**.Result / .Wait()** – **blocks** thread; can cause **deadlocks** with a SynchronizationContext (UI, old ASP.NET)",
     "Rule: **async all the way**"] },

{ cat:"Async & Threading", q:"What is ConfigureAwait(false)?",
  a:["Tells `await` **not to resume on the captured context** (UI thread / old ASP.NET context)",
     "Avoids deadlocks & slight overhead in **library code**",
     "ASP.NET Core has **no SynchronizationContext** → mostly unnecessary in app code",
     "UI apps: don't use it if you need to update UI after await"] },

{ cat:"Async & Threading", q:"How do you run tasks in parallel and cancel them?",
  a:["`await Task.WhenAll(t1, t2)` – wait for all (parallel I/O)",
     "`await Task.WhenAny(...)` – first to complete (timeouts)",
     "`Parallel.ForEachAsync` – bounded parallel processing",
     "**Cancellation**: pass `CancellationToken`, check `token.ThrowIfCancellationRequested()`",
     "`CancellationTokenSource.CancelAfter(TimeSpan)` for timeouts"] },

{ cat:"Async & Threading", q:"What is lock and other synchronization primitives?",
  a:["`lock(obj)` – mutual exclusion (Monitor); lock on a **private object**, never `this` or strings",
     "Can't `await` inside `lock` → use `SemaphoreSlim.WaitAsync()`",
     "`Interlocked` – atomic increment/compare-exchange",
     "`ReaderWriterLockSlim` – many readers / one writer",
     ".NET 9: new `System.Threading.Lock` type",
     "Prefer **immutable data** & concurrent collections"] },

{ cat:"Async & Threading", q:"What is a deadlock and how do you avoid it?",
  a:["Two+ threads **wait on each other's locks** forever",
     "Avoid: **consistent lock ordering**, short lock scopes, timeouts",
     "Async: don't block on async code (`.Result`), use `await`",
     "Prefer higher-level constructs (Channels, concurrent collections)"] },

// ───────────── Garbage Collection ─────────────
{ cat:"Garbage Collection", q:"How does the .NET Garbage Collector work?",
  a:["Automatically frees **unreachable** heap objects",
     "**Generational**: **Gen 0** (new, collected often), **Gen 1** (buffer), **Gen 2** (long-lived)",
     "Most objects die young → Gen 0 collections are cheap",
     "**LOH** (Large Object Heap) – objects ≥ 85 KB, collected with Gen 2, not compacted by default",
     "Phases: **mark** reachable from roots → **sweep/compact**",
     "Modes: Workstation vs **Server GC**, background/concurrent GC"] },

{ cat:"Garbage Collection", q:"Can you have memory leaks in .NET? How?",
  a:["Yes — objects still **referenced** are never collected",
     "Common causes: **event handlers not unsubscribed**, static collections/caches growing, long-lived closures, timers",
     "Unmanaged resources not disposed",
     "Diagnose: `dotnet-counters`, `dotnet-dump`, `dotnet-gcdump`, Visual Studio diagnostic tools, PerfView"] },

{ cat:"Garbage Collection", q:"Should you call GC.Collect()?",
  a:["**Almost never** — GC is self-tuning",
     "Forcing collection promotes objects and hurts performance",
     "Rare valid cases: after loading a huge one-time dataset, benchmarking, tests"] },

// ───────────── Modern C# Features ─────────────
{ cat:"Modern C# Features", q:"What is pattern matching in C#?",
  a:["Test a value's **shape/type** and extract data",
     "**Type pattern**: `if (o is string s)`",
     "**Switch expression**: concise mapping",
     "**Property pattern**: `{ Age: >= 18 }`",
     "**Relational/logical**: `>= 0 and < 10`, `not null`",
     "**List patterns** (C# 11): `[1, 2, ..]`"],
  code:`string Describe(object o) => o switch {
    null                     => "null",
    int n when n < 0         => "negative",
    Person { Age: >= 18 } p  => $"adult {p.Name}",
    [_, _, ..]               => "list with 2+ items",
    _                        => "other"
};` },

{ cat:"Modern C# Features", q:"Name important features in recent C# versions.",
  a:["**C# 8**: nullable reference types, async streams, default interface methods, `using` declarations, ranges `^1`, `..`",
     "**C# 9**: records, `init`, top-level statements, pattern improvements",
     "**C# 10**: global usings, file-scoped namespaces, record structs",
     "**C# 11**: raw string literals `\"\"\"`, `required` members, list patterns, generic math",
     "**C# 12**: **primary constructors** for classes, collection expressions `[1, 2, 3]`",
     "**C# 13**: `params` collections, new `Lock` type, `\\e` escape",
     "**C# 14**: extension members, `field` keyword in properties"] },

{ cat:"Modern C# Features", q:"What are tuples and deconstruction?",
  a:["`ValueTuple` – lightweight grouping: `(string Name, int Age)`",
     "Return multiple values without a class",
     "**Deconstruction**: `var (name, age) = GetPerson();`",
     "Classes can support it via `Deconstruct` method",
     "For public APIs prefer records for clarity"] },

{ cat:"Modern C# Features", q:"ref vs out vs in parameters — what's the difference?",
  a:["All three pass the argument **by reference** (no copy) – they differ in who initializes it and who can change it",
     "`ref` – caller **must initialize** it first; method **can read and modify** it → pass and update an existing variable",
     "`out` – caller **needn't initialize** it; method **must assign** it before returning → return an extra value (`TryParse` pattern)",
     "`in` – caller **must initialize** it; it's **readonly** inside the method → pass large structs efficiently without copying or mutation",
     "Call site: `ref` / `out` keywords are **required**; `in` is **optional**",
     "Gotcha: calling a member on an `in` parameter of a **non-readonly struct** can create a hidden **defensive copy** → prefer `readonly struct`",
     "`ref readonly` (C# 12) parameters – readonly like `in`, but the caller is expected to pass a variable explicitly by reference"],
  code:`void Update(ref int value) { value++; }                   // must be initialized; can change it
void Create(out int value) { value = 10; }                // must assign before returning
void Print(in int value)   { Console.WriteLine(value); }  // readonly: value++ won't compile

int a = 1;
Update(ref a);        // a == 2
Create(out int b);    // b == 10 (no initialization needed)
Print(a);             // 'in' is optional at the call site

if (int.TryParse("42", out var n)) Console.WriteLine(n);`,
  tip:"`ref` updates an existing value, `out` returns a value, `in` passes a readonly reference." },

// ───────────── ASP.NET Core & DI ─────────────
{ cat:"ASP.NET Core & DI", q:"What is Dependency Injection in ASP.NET Core and the service lifetimes?",
  a:["Built-in DI container: register in `builder.Services`, inject via **constructor**",
     "**Transient** – new instance **every time** requested",
     "**Scoped** – one instance **per HTTP request**",
     "**Singleton** – one instance for the **app lifetime**",
     "⚠️ **Captive dependency**: don't inject Scoped into Singleton",
     ".NET 8: **keyed services** (`[FromKeyedServices(\"key\")]`)"],
  code:`builder.Services.AddTransient<IEmailSender, SmtpSender>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddSingleton<ICache, MemoryCache>();` },

{ cat:"ASP.NET Core & DI", q:"What is middleware in ASP.NET Core?",
  a:["Components forming the **request pipeline**; each can handle request, call `next`, or short-circuit",
     "**Order matters**: exception handling → HTTPS → static files → routing → CORS → authentication → authorization → endpoints",
     "Add with `app.Use…()`; terminal with `app.Run()`",
     "Custom middleware: class with `InvokeAsync(HttpContext, RequestDelegate next)`"] },

{ cat:"ASP.NET Core & DI", q:"Controllers vs Minimal APIs?",
  a:["**Controllers** – classes with attributes, filters, model binding, conventions → large structured APIs",
     "**Minimal APIs** – `app.MapGet(\"/x\", handler)` → less ceremony, fast, great for microservices",
     "Both support DI, validation, OpenAPI, auth",
     "Group minimal endpoints with `MapGroup`"],
  code:`app.MapGet("/users/{id}", async (int id, IUserService svc) =>
    await svc.Find(id) is { } u ? Results.Ok(u) : Results.NotFound());` },

{ cat:"ASP.NET Core & DI", q:"How does configuration and the Options pattern work?",
  a:["Configuration sources: `appsettings.json`, `appsettings.{Env}.json`, **env variables**, user secrets, command line, Key Vault",
     "Later sources **override** earlier ones",
     "**Options pattern**: bind sections to classes",
     "`IOptions<T>` (singleton), `IOptionsSnapshot<T>` (per request, reloads), `IOptionsMonitor<T>` (change notifications)"] },

{ cat:"ASP.NET Core & DI", q:"What is the difference between authentication and authorization in ASP.NET Core?",
  a:["**Authentication** – **who are you?** (JWT bearer, cookies, OpenID Connect)",
     "**Authorization** – **what can you do?** (`[Authorize]`, roles, **policies**, claims)",
     "Middleware order: `UseAuthentication()` **before** `UseAuthorization()`",
     "Policy-based: `AddAuthorization(o => o.AddPolicy(\"Admin\", p => p.RequireRole(\"admin\")))`"] },

{ cat:"ASP.NET Core & DI", q:"What are filters in ASP.NET Core MVC?",
  a:["Run code **before/after** stages of MVC action execution",
     "Types (order): **Authorization** → **Resource** → **Action** → **Exception** → **Result**",
     "Cross-cutting concerns: logging, validation, caching",
     "Minimal APIs use **endpoint filters** instead"] },

// ───────────── Entity Framework Core ─────────────
{ cat:"Entity Framework Core", q:"What is Entity Framework Core?",
  a:["Microsoft's **ORM** – map C# classes to database tables",
     "`DbContext` = unit of work; `DbSet<T>` = table",
     "LINQ queries translated to **SQL**",
     "**Migrations** to evolve schema (`dotnet ef migrations add`)",
     "Approaches: **Code-first** (common) or Database-first (scaffold)"] },

{ cat:"Entity Framework Core", q:"What is lazy vs eager vs explicit loading?",
  a:["**Eager** – load related data in the same query: `.Include(o => o.Items)`",
     "**Lazy** – loads related data **when accessed** (proxies) → risk of **N+1 queries**",
     "**Explicit** – load later on demand: `context.Entry(o).Collection(x => x.Items).Load()`",
     "Prefer eager or **projection** (`Select` to DTO)"] },

{ cat:"Entity Framework Core", q:"What is the N+1 problem and how do you fix it?",
  a:["1 query to load parents + **N queries** to load each parent's children",
     "Caused by lazy loading or querying in loops",
     "Fix: `Include`, **projection** with `Select`, batch queries",
     "Watch SQL logs (`LogTo`) to detect"] },

{ cat:"Entity Framework Core", q:"How do you improve EF Core query performance?",
  a:["`AsNoTracking()` for **read-only** queries",
     "**Project** only needed columns (`Select` to DTO)",
     "Filter on the **database** (keep IQueryable until the end)",
     "Avoid N+1; use `AsSplitQuery()` for big Includes",
     "Pagination with `Skip/Take` (or keyset paging)",
     "**Compiled queries**, proper **indexes**",
     "Bulk ops: `ExecuteUpdate` / `ExecuteDelete` (EF 7+)"] },

{ cat:"Entity Framework Core", q:"What is change tracking in EF Core?",
  a:["DbContext tracks loaded entities' states: **Added, Modified, Deleted, Unchanged, Detached**",
     "`SaveChanges()` generates INSERT/UPDATE/DELETE for changes",
     "`AsNoTracking()` disables it for speed",
     "DbContext is **not thread-safe**, should be **short-lived** (scoped per request)"] }
];

PREP_DATA.push(...[

// ───────────── Advanced: Runtime & Performance ─────────────
{ cat:"Advanced: Runtime & Performance", q:"What are Span<T> and Memory<T>?",
  a:["`Span<T>` – a **ref struct** view over contiguous memory (array, stack, native) **without copying**",
     "**Stack-only**: can't be boxed, stored in fields of classes, or used across `await`",
     "`Memory<T>` – heap-storable counterpart, usable in **async** code",
     "Use for **zero-allocation** parsing/slicing (`ReadOnlySpan<char>` for strings)",
     "`stackalloc` + Span for small temporary buffers"],
  code:`ReadOnlySpan<char> s = "2024-10-24";
int year = int.Parse(s[..4]);   // no substring allocation` },

{ cat:"Advanced: Runtime & Performance", q:"What is the difference between Task and ValueTask?",
  a:["`Task` – reference type → **allocation** each call (cached for some results)",
     "`ValueTask` – struct; **avoids allocation** when the result is often **synchronous** (cache hit)",
     "Rules: await **once only**, don't await concurrently, don't block on it",
     "Default to Task; use ValueTask on **hot paths** after measuring"] },

{ cat:"Advanced: Runtime & Performance", q:"How do you reduce allocations and GC pressure?",
  a:["Avoid boxing, LINQ in hot loops, string concatenation",
     "`ArrayPool<T>.Shared`, `ObjectPool<T>`, `StringBuilder` pooling",
     "`Span<T>`, `stackalloc`, `ValueTask`, structs for small data",
     "Pre-size collections (`new List<T>(capacity)`)",
     "`static` lambdas to avoid closure allocations",
     "Measure with **BenchmarkDotNet** (`[MemoryDiagnoser]`)"] },

{ cat:"Advanced: Runtime & Performance", q:"What is Native AOT and ReadyToRun?",
  a:["**ReadyToRun** – precompiles IL to native but keeps JIT for tiering → faster startup",
     "**Native AOT** – compiles **whole app to native** executable: no JIT, **fast startup**, low memory, small footprint",
     "Limitations: no runtime code generation, **limited reflection**, trimming required",
     "Great for **serverless, containers, CLI tools**",
     "Use **source generators** (e.g. `System.Text.Json` context) instead of reflection"] },

{ cat:"Advanced: Runtime & Performance", q:"What are source generators?",
  a:["Roslyn components that **generate C# code at compile time**",
     "Replace runtime reflection → faster, **AOT-friendly**",
     "Examples: `System.Text.Json` serializers, `[LoggerMessage]`, `[GeneratedRegex]`, `[LibraryImport]`",
     "Incremental generators (`IIncrementalGenerator`) for IDE performance"] },

{ cat:"Advanced: Runtime & Performance", q:"What are expression trees?",
  a:["Code represented as **data** (`Expression<Func<T,bool>>`)",
     "Can be **inspected and translated** (EF Core → SQL)",
     "Can be compiled to delegates at runtime (`.Compile()`)",
     "Difference: `Func<T>` = compiled code; `Expression<Func<T>>` = analyzable tree"] },

{ cat:"Advanced: Runtime & Performance", q:"How does reflection work and what are its costs?",
  a:["Inspect & invoke types/members at **runtime** (`typeof`, `GetType()`, `GetMethod`, `Activator.CreateInstance`)",
     "Used by serializers, DI containers, ORMs, test frameworks",
     "Costs: **slow**, breaks with trimming/AOT, no compile-time safety",
     "Mitigate: cache `MethodInfo`, compiled delegates/expressions, **source generators**"] },

// ───────────── Advanced: Async Internals ─────────────
{ cat:"Advanced: Async Internals", q:"What does the compiler generate for an async method?",
  a:["A **state machine struct** implementing `IAsyncStateMachine`",
     "Local variables become **fields**; each `await` is a **state**",
     "If the awaited task is **already complete**, continues **synchronously** (no allocation)",
     "Otherwise registers a **continuation** and returns; state machine boxed to heap",
     "`AsyncTaskMethodBuilder` creates the returned Task"] },

{ cat:"Advanced: Async Internals", q:"What is SynchronizationContext and why can it cause deadlocks?",
  a:["Abstraction for **where continuations run** (UI thread, legacy ASP.NET request context)",
     "Deadlock: UI thread **blocks** on `.Result` → continuation needs the **same UI thread** → both wait forever",
     "Fix: `await` all the way, or `ConfigureAwait(false)` in libraries",
     "ASP.NET Core & console apps have **no** SynchronizationContext"] },

{ cat:"Advanced: Async Internals", q:"What are async streams and Channels?",
  a:["**Async streams**: `IAsyncEnumerable<T>` + `await foreach` + `yield return` with awaits",
     "Stream data as it arrives (DB rows, paged API, gRPC streaming)",
     "**Channel<T>** – high-performance async **producer/consumer queue**",
     "Bounded channels provide **backpressure** (`BoundedChannelFullMode`)"],
  code:`var ch = Channel.CreateBounded<Job>(100);
_ = Task.Run(async () => { await foreach (var j in ch.Reader.ReadAllAsync()) await Process(j); });
await ch.Writer.WriteAsync(new Job());` },

{ cat:"Advanced: Async Internals", q:"How do you handle exceptions from Task.WhenAll?",
  a:["`await Task.WhenAll(...)` throws **only the first** exception",
     "All exceptions are in the task's `.Exception` (**AggregateException**) → inspect `InnerExceptions`",
     "Pattern: keep a reference to the WhenAll task and inspect it in catch"],
  code:`var all = Task.WhenAll(tasks);
try { await all; }
catch { foreach (var e in all.Exception!.InnerExceptions) Log(e); }` },

{ cat:"Advanced: Async Internals", q:"What is thread pool starvation and how do you detect it?",
  a:["ThreadPool runs out of threads because they're **blocked** (sync-over-async, `.Result`, long CPU work)",
     "Symptoms: rising latency, low CPU, growing request queue",
     "Pool injects threads slowly (~1–2/sec beyond minimum)",
     "Detect: `dotnet-counters` (`threadpool-queue-length`, `threadpool-thread-count`)",
     "Fix: async all the way, don't block, offload long CPU work"] },

// ───────────── Advanced: Language Deep Dive ─────────────
{ cat:"Advanced: Language Deep Dive", q:"What are covariance and contravariance?",
  a:["**Covariance** (`out T`) – use a **more derived** type than specified: `IEnumerable<string>` → `IEnumerable<object>`",
     "**Contravariance** (`in T`) – use a **less derived** type: `Action<object>` → `Action<string>`",
     "Applies to **generic interfaces & delegates** (reference types only)",
     "Out = produces values; In = consumes values"],
  code:`IEnumerable<object> objs = new List<string>();   // covariance
Action<string> act = (object o) => Console.WriteLine(o); // contravariance` },

{ cat:"Advanced: Language Deep Dive", q:"How should you implement Equals and GetHashCode correctly?",
  a:["Equal objects **must** have equal hash codes",
     "Hash code should be based on **immutable** fields (mutating keys breaks dictionaries)",
     "Implement `IEquatable<T>` to avoid boxing",
     "Use `HashCode.Combine(a, b, c)`",
     "Overload `==`/`!=` consistently — or just use a **record**"] },

{ cat:"Advanced: Language Deep Dive", q:"What are ref structs, ref returns and ref locals?",
  a:["`ref struct` – must live on the **stack** (e.g. `Span<T>`); no boxing, no class fields, no async (relaxed in C# 13)",
     "**ref returns** – return a reference to storage (e.g. array element) to avoid copies",
     "**ref locals** – local alias to storage",
     "Used for high-performance, low-allocation code"] },

{ cat:"Advanced: Language Deep Dive", q:"What is generic math (static abstract interface members)?",
  a:["C# 11: interfaces can declare **static abstract** members (operators, constants)",
     "Enables generic algorithms over numbers: `INumber<T>`, `IAdditionOperators<…>`",
     "Write one `Sum<T>` for int, double, decimal…"],
  code:`static T Sum<T>(IEnumerable<T> xs) where T : INumber<T> {
    T total = T.Zero;
    foreach (var x in xs) total += x;
    return total;
}` },

{ cat:"Advanced: Language Deep Dive", q:"What are primary constructors (C# 12) and their gotchas?",
  a:["Constructor parameters declared on the class: `class Svc(ILogger<Svc> log)`",
     "Parameters are in scope throughout the class body",
     "Great for **DI** — removes field boilerplate",
     "Gotcha: parameters are **mutable captured variables**, not readonly fields",
     "Assign to a `readonly` field explicitly if immutability matters"] },

// ───────────── Advanced: ASP.NET Core & Architecture ─────────────
{ cat:"Advanced: ASP.NET Core & Architecture", q:"How do you handle global errors in ASP.NET Core?",
  a:["`app.UseExceptionHandler()` + **`IExceptionHandler`** (.NET 8) implementations",
     "Return RFC 7807 **ProblemDetails** (`AddProblemDetails()`)",
     "Log with correlation IDs; don't leak stack traces in production",
     "Validation errors → 400 with details"] },

{ cat:"Advanced: ASP.NET Core & Architecture", q:"How do you build resilient HTTP calls?",
  a:["Use **IHttpClientFactory** (avoid socket exhaustion & stale DNS from `new HttpClient()` per call)",
     "Typed/named clients",
     "**Resilience** with Polly / `Microsoft.Extensions.Http.Resilience`: retry with backoff, **circuit breaker**, timeout, hedging",
     "`AddStandardResilienceHandler()` (.NET 8)"] },

{ cat:"Advanced: ASP.NET Core & Architecture", q:"What caching options exist in ASP.NET Core?",
  a:["`IMemoryCache` – in-process, fast, lost on restart, not shared across instances",
     "`IDistributedCache` – Redis/SQL, shared across servers",
     "**HybridCache** (.NET 9) – L1 memory + L2 distributed + **stampede protection**",
     "**Output caching** middleware – cache whole responses",
     "Response caching – HTTP cache headers"] },

{ cat:"Advanced: ASP.NET Core & Architecture", q:"What are background services in .NET?",
  a:["`IHostedService` / **`BackgroundService`** (`ExecuteAsync`) for long-running work",
     "Respect the `stoppingToken` for graceful shutdown",
     "Background services are **singletons** → create a scope (`IServiceScopeFactory`) to use scoped services like DbContext",
     "For durable jobs: Hangfire, Quartz.NET, Azure Functions, queues"] },

{ cat:"Advanced: ASP.NET Core & Architecture", q:"What is Clean Architecture / Onion architecture in .NET?",
  a:["Layers: **Domain** (entities, rules) ← **Application** (use cases, interfaces) ← **Infrastructure** (EF, external services) / **Presentation** (API)",
     "**Dependencies point inward**; domain has no framework dependencies",
     "Interfaces in inner layers, implementations in outer (DIP)",
     "Often with **CQRS + MediatR**, FluentValidation",
     "Alternative: **Vertical Slice** architecture (organize by feature)"] },

{ cat:"Advanced: ASP.NET Core & Architecture", q:"How do you handle concurrency conflicts in EF Core?",
  a:["**Optimistic concurrency**: add a concurrency token (`[Timestamp] byte[] RowVersion`)",
     "UPDATE includes `WHERE RowVersion = @original`",
     "0 rows affected → `DbUpdateConcurrencyException`",
     "Resolve: reload & retry, merge, or show conflict to user",
     "Pessimistic locking (`SELECT … FOR UPDATE`) only when necessary"] },

{ cat:"Advanced: ASP.NET Core & Architecture", q:"How do you secure an ASP.NET Core API?",
  a:["**HTTPS** + HSTS",
     "**JWT bearer** / OpenID Connect (Entra ID), validate issuer/audience/lifetime",
     "Policy-based **authorization**, least privilege",
     "**Input validation**, parameterized queries (EF does this)",
     "**CORS** restricted origins, **rate limiting** middleware",
     "Secrets in **Key Vault** / user secrets, never in source",
     "Data Protection API for encryption of cookies/tokens"] },

{ cat:"Advanced: ASP.NET Core & Architecture", q:"Your API is slow under load. How do you diagnose it?",
  a:["Observability: **OpenTelemetry**, Application Insights, structured logs (Serilog)",
     "`dotnet-counters` (CPU, GC, threadpool), `dotnet-trace`, `dotnet-dump`",
     "Look for: sync-over-async / **threadpool starvation**, N+1 / slow SQL, excessive allocations / GC, lock contention, HttpClient misuse",
     "Fix & verify with **load tests** (k6, NBomber) and BenchmarkDotNet"] }

].map(q => ({ ...q, level:'Advanced' })));
