// C# — extra questions from the docx study guides in "Study resources Questions" (deduplicated against csharp_data.js).
PREP_DATA.push(...[

{ cat:"Async & Threading", q:"What is the difference between Task and async/await?",
  a:["**Task** – an **object** representing an asynchronous operation (status, result, exception)",
     "**async/await** – **language syntax** to write and wait for Tasks in readable, sequential style",
     "`async` marks a method; `await` **suspends without blocking** the thread until the Task completes",
     "You can create/hold Tasks without awaiting (start many, then `Task.WhenAll`)"],
  code:`Task<User> t = GetUserAsync(id);  // started, not awaited yet
DoOtherWork();
User u = await t;                  // now wait without blocking` },

{ cat:"Async & Threading", q:"What are the ways to implement multithreading / concurrency in C#?",
  a:["**async/await** – I/O-bound work (DB, HTTP, files)",
     "**Task.WhenAll** – run independent async calls concurrently",
     "**Task.Run** – offload a CPU-bound operation to the thread pool",
     "**Parallel.For/ForEach / PLINQ** – CPU-bound loops; **Parallel.ForEachAsync** – async with limited concurrency",
     "**BackgroundService** – long-running workers; **scheduled jobs** (`PeriodicTimer`, Hangfire, Quartz.NET) – cache refresh, daily digest; **queues** (Service Bus/RabbitMQ) to decouple work",
     "**Channel<T>** – in-memory producer/consumer; **TPL Dataflow** – multi-stage pipelines",
     "**SemaphoreSlim** – limit concurrency; `Thread` – low-level (rarely needed)"],
  tip:"Pick by workload: I/O-bound → async/await; CPU-bound → Parallel/Task.Run; long-running → BackgroundService/queue." },

{ cat:"Async & Threading", q:"Give a real-world multithreading / async example (e.g. a dashboard calling several services).",
  a:["Concurrency = running **independent** operations at the same time instead of one after another",
     "Example: an **engagement dashboard** needs details, staffing, comments, notifications and recommendations from different services",
     "The calls don't depend on each other → start them all, then `await Task.WhenAll(...)` → total time ≈ the **slowest call**, not the sum",
     "Same idea after a write: recalculate recommendations, send notifications and update analytics **concurrently** (or hand them off via events/queue)",
     "Other uses: CPU-bound processing, background jobs, **queue consumers**, high-volume data processing",
     "Needs care: thread-safe shared state, **error handling** (`await Task.WhenAll` rethrows only the first exception), cancellation, and **limiting concurrency** (`SemaphoreSlim`) to protect downstream services"],
  code:`var engagementTask     = engagementClient.GetAsync(id);
var staffingTask       = staffingClient.GetAsync(id);
var recommendationTask = recommendationClient.GetAsync(id);

await Task.WhenAll(engagementTask, staffingTask, recommendationTask);   // run concurrently

return new EngagementDashboard(
    await engagementTask, await staffingTask, await recommendationTask);  // already completed → no extra wait`,
  tip:"Your story: Gi3 Engagement Management – several microservices feed one user-facing dashboard via `Task.WhenAll`; at Enbridge, parallel/async processing supported alarm monitoring and event handling." },

{ cat:"Async & Threading", q:"What is the difference between Task.Run and Parallel.ForEach?",
  a:["`Task.Run` – runs **one** piece of work on a thread-pool thread; returns a Task to await",
     "`Parallel.ForEach` – splits **many items** across threads; **blocks** until done",
     "Both are for **CPU-bound** work",
     "Don't use them for **I/O** — use async/await or `Parallel.ForEachAsync`",
     "Avoid `Task.Run` in ASP.NET request code (just steals another pool thread)"],
  code:`await Task.Run(() => GenerateReport());                 // one CPU job
Parallel.ForEach(items, item => CalculateScore(item));   // many CPU jobs
await Parallel.ForEachAsync(ids, new ParallelOptions { MaxDegreeOfParallelism = 4 },
    async (id, ct) => await api.SyncAsync(id, ct));      // async + throttled` },

{ cat:"Async & Threading", q:"What is CPU-bound vs I/O-bound work, and what is high throughput?",
  a:["**CPU-bound** – limited by processor (calculations, image processing, scoring) → parallelism",
     "**I/O-bound** – waiting on DB, network, disk → **async/await** frees threads",
     "**High throughput** – processing **many requests/messages per second**",
     "Achieved with async I/O, batching, caching, queues, horizontal scaling, avoiding locks/contention"] },

{ cat:"Async & Threading", q:"What does the volatile keyword do in C#?",
  a:["In C#, the **`volatile` keyword indicates that a field can be modified by multiple concurrently executing threads**. It tells both the compiler and the processor to bypass certain optimizations, ensuring that changes made to a variable by one thread are correctly visible to other threads",
     "**What `volatile` actually does** – under normal circumstances, the .NET compiler, the Just-In-Time (JIT) compiler, and the CPU optimize code for performance. They might:",
     "**Cache values in CPU registers** – read a field once and keep reusing that copy (e.g. hoist the read out of a loop), so updates made by other threads are never seen",
     "**Reorder reads and writes** – execute memory operations in a different order than the code, as long as the result looks the same to a single thread",
     "Marking a field as `volatile` alters this behavior via two main mechanics:",
     "**1. Visibility (no caching)** – every read and write of the field is actually performed against memory; the compiler/JIT can't keep the value in a register, hoist the read out of a loop or optimize the access away",
     "**2. Ordering (acquire/release semantics)** – a volatile **read** has acquire semantics: reads/writes after it can't be moved before it. A volatile **write** has release semantics: reads/writes before it can't be moved after it",
     "**A common example: the worker flag** – without `volatile`, a background worker loop might run forever because the CPU caches the `_shouldStop` flag and never checks main memory for an update"],
  code:`class Worker
{
    // Marked volatile so the worker thread always checks main memory
    private volatile bool _shouldStop;

    public void DoWork()
    {
        while (!_shouldStop)
        {
            // Do some background processing...
        }
    }

    public void RequestStop()
    {
        _shouldStop = true; // Called from a different (e.g., UI) thread
    }
}`,
  tip:"`volatile` gives visibility and ordering, **not atomicity** – `_count++` on a volatile field is still a race condition. Use `lock` or `Interlocked` for compound operations, and prefer `CancellationToken` to stop work." },

{ cat:"OOP in C#", q:"Can a C# interface have an implementation?",
  a:["**Yes, since C# 8** – **default interface methods**",
     "Main reason: **add members to an interface without breaking** existing implementers",
     "Default method is callable through the **interface type**, not the class",
     "Interfaces still can't have **instance fields/state** or constructors",
     "Also allowed now: static members, private methods, static abstract members (C# 11)"],
  code:`public interface ILogger {
    void Log(string msg) => Console.WriteLine($"Default: {msg}");
}
public class FileLogger : ILogger { }

ILogger logger = new FileLogger();
logger.Log("Hello");   // Default: Hello` },

{ cat:"Delegates, Events & LINQ", q:"delegate vs event vs Action vs Func (and Predicate) — what's the difference?",
  a:["**delegate** – custom named type-safe method reference",
     "**Action<T…>** – built-in delegate, returns **void**",
     "**Func<T…, TResult>** – built-in delegate, **returns a value** (last type param)",
     "**Predicate<T>** – returns **bool**",
     "**event** – wraps a delegate so only the **declaring class can raise** it; others only `+=`/`-=`"],
  code:`Action<string> log = m => Console.WriteLine(m);
Func<int, int> square = x => x * x;
Predicate<int> isEven = x => x % 2 == 0;`,
  tip:"Action = do something; Func = compute something; event = notify subscribers." },

{ cat:"Exceptions & Resources", q:"What are the different uses of the using keyword?",
  a:["**Namespace import** – `using System.Text;` (and `global using` in C# 10)",
     "**Resource cleanup** – `using var conn = new SqlConnection(cs);` calls `Dispose()` automatically",
     "**Alias** – `using ProjectId = System.Guid;`",
     "**Static import** – `using static System.Math;` → `Sqrt(x)`"] },

{ cat:"Entity Framework Core", q:"What is an ORM? Benefits, risks and a real-world example.",
  a:["**ORM** (Object-Relational Mapper) maps database **tables ↔ classes**, so you work with domain objects instead of writing raw SQL everywhere",
     ".NET options: **EF Core**, NHibernate (full ORMs); **Dapper** (micro-ORM – you write the SQL)",
     "Key study points: **change tracking**, **migrations**, lazy vs eager loading, transactions, performance, when to use raw SQL",
     "**Benefits**: productivity, maintainability, type-safe LINQ, cleaner data access",
     "**Risk**: inefficient generated SQL (N+1, over-fetching) if you don't understand/check the SQL it produces",
     "**Enterprise answer**: ORM for maintainability + **optimized SQL** for hot paths",
     "Real-world: `Engagement`, `Practitioner`, `Assignment`, `Milestone` entities mapped to tables; services use `DbContext`/repositories so business logic stays separate from SQL details"],
  code:`public class Engagement
{
    public string EngagementId { get; set; } = "";
    public string ClientName { get; set; } = "";
    public List<EngagementAssignment> Assignments { get; set; } = new();
}

// EF Core generates the SQL and maps rows back to objects
var engagement = await db.Engagements
    .Include(e => e.Assignments)
    .FirstOrDefaultAsync(e => e.EngagementId == id);`,
  tip:"Your story: EF / NHibernate-style data access with SQL Server, Oracle and PostgreSQL across GOA, AGLC and Gi3 (engagement, practitioner, staffing and recommendation data)." },

{ cat:"Entity Framework Core", q:"EF Core vs Dapper — when to use which?",
  a:["**EF Core** – full ORM: LINQ, **change tracking**, migrations, relationships → high productivity",
     "**Dapper** – micro-ORM: you write SQL, maps results to objects → **very fast**, lightweight",
     "EF Core for rich **domain/transactional** workflows",
     "Dapper for **performance-critical** queries, reports, complex SQL",
     "Common: **use both** — EF Core for writes, Dapper for hot read paths"],
  code:`// EF Core
var active = await db.Engagements.Where(e => e.Status == "Active").ToListAsync();
// Dapper
var active2 = await conn.QueryAsync<Engagement>(
    "SELECT * FROM Engagements WHERE Status = @Status", new { Status = "Active" });` },

{ cat:"ASP.NET Core & DI", q:"SignalR vs polling for real-time notifications?",
  a:["**SignalR** – server **pushes** updates (WebSockets, falls back to SSE/long polling)",
     "Near **real-time**, less wasted traffic; supports groups/users",
     "**Polling** – client asks every N seconds → simpler, but delayed & more requests",
     "SignalR for notifications, chat, live dashboards; polling for infrequent status checks",
     "Scale-out: **Azure SignalR Service** or Redis backplane"],
  code:`await hub.Clients.Group(userId).SendAsync("NotificationReceived", notification);` },

{ cat:"Exceptions & Resources", q:"How does the using statement work under the hood? using block vs using declaration vs await using, and common pitfalls?",
  a:["The compiler **lowers** `using` into a `try / finally` that calls `Dispose()` → resource is released **even if an exception is thrown**",
     "Works with any type implementing **`IDisposable`** (or `IAsyncDisposable` for `await using`); a `null` resource is safely skipped",
     "**using block** – `using (var x = ...) { }` → disposed at the **closing brace** (tight, explicit scope)",
     "**using declaration** (C# 8) – `using var x = ...;` → disposed at the **end of the enclosing scope** (less nesting, but may hold the resource longer)",
     "**await using** – calls `DisposeAsync()` for async cleanup (`DbContext`, `Stream`, `Utf8JsonWriter`)",
     "Multiple resources are disposed in **reverse order** of declaration",
     "**Pitfall 1 – deferred execution**: returning a lazy `IEnumerable`/`IQueryable` from inside a `using` → `ObjectDisposedException` when enumerated later → materialize with `ToList()` first",
     "**Pitfall 2 – `HttpClient`**: `using var client = new HttpClient()` per request causes **socket exhaustion** → use `IHttpClientFactory` or a shared instance",
     "**Pitfall 3 – DI-owned objects**: don't wrap injected services (e.g. `DbContext`) in `using` – the **container owns and disposes** them",
     "**Pitfall 4 – fire-and-forget**: starting a task that uses the resource without awaiting it → resource disposed while the task is still running",
     "Your own `Dispose()` should be **idempotent** (safe to call twice) and not throw"],
  code:`// What you write
using (var conn = new SqlConnection(cs))
{
    conn.Open();
}

// What the compiler generates (roughly)
var conn = new SqlConnection(cs);
try { conn.Open(); }
finally { if (conn != null) ((IDisposable)conn).Dispose(); }

// using declaration (C# 8) + await using
public async Task ExportAsync(string path)
{
    await using var stream = File.Create(path);   // DisposeAsync at end of method
    using var writer = new StreamWriter(stream);  // disposed first (reverse order)
    await writer.WriteLineAsync("ReturnId,TaxYear,Status");
}

// ❌ Pitfall: lazy query escapes the using
IEnumerable<TaxReturn> GetReturns()
{
    using var db = new TaxDbContext();
    return db.TaxReturns.Where(r => r.TaxYear == 2024);           // ObjectDisposedException later
}
// ✅ Fix
List<TaxReturn> GetReturnsFixed()
{
    using var db = new TaxDbContext();
    return db.TaxReturns.Where(r => r.TaxYear == 2024).ToList();  // materialized before dispose
}`,
  tip:"One-liner to remember: \"`using` is syntactic sugar for **try/finally + Dispose()** – deterministic cleanup of unmanaged resources, without waiting for the GC.\"" },

{ cat:"Advanced: ASP.NET Core & Architecture", level:"Advanced", q:"How do you implement CQRS in .NET Core?",
  a:["**CQRS** – **commands** change state (return nothing or an ID); **queries** read state with no side effects",
     "In .NET: separate **command handlers** and **query handlers**, each with its own request/DTO types (often `record`s)",
     "Commonly dispatched with **MediatR** (`IRequest` / `IRequestHandler`) + pipeline behaviors for validation (FluentValidation), logging, transactions",
     "**Write side**: EF Core + domain rules; **read side**: lightweight queries (`AsNoTracking`, projections, Dapper, views/cache) shaped for the UI",
     "Optionally separate **read/write databases**, synced by events (e.g. Service Bus) → eventual consistency",
     "API mapping: `POST /engagements` → command; `GET /engagements/E100` → query"],
  code:`public record CreateEngagementCommand(string ClientName) : IRequest<string>;
public record GetEngagementQuery(string EngagementId) : IRequest<EngagementDto?>;

public class CreateEngagementHandler(AppDbContext db) : IRequestHandler<CreateEngagementCommand, string>
{
    public async Task<string> Handle(CreateEngagementCommand cmd, CancellationToken ct)
    {
        var engagement = new Engagement { EngagementId = Guid.NewGuid().ToString(), ClientName = cmd.ClientName };
        db.Engagements.Add(engagement);
        await db.SaveChangesAsync(ct);
        return engagement.EngagementId;               // command returns only the new ID
    }
}

public class GetEngagementHandler(AppDbContext db) : IRequestHandler<GetEngagementQuery, EngagementDto?>
{
    public Task<EngagementDto?> Handle(GetEngagementQuery q, CancellationToken ct) =>
        db.Engagements.AsNoTracking()                 // read-only, projected to a DTO
          .Where(e => e.EngagementId == q.EngagementId)
          .Select(e => new EngagementDto(e.EngagementId, e.ClientName, e.Assignments.Count))
          .FirstOrDefaultAsync(ct);
}

app.MapPost("/engagements", (CreateEngagementCommand cmd, ISender sender) => sender.Send(cmd));
app.MapGet("/engagements/{id}", (string id, ISender sender) => sender.Send(new GetEngagementQuery(id)));`,
  tip:"Why it helps (performance, independent scaling, trade-offs): see the CQRS questions on the **OOP & Patterns** page. Your story (Gi3): create/update engagement = commands; the engagement dashboard (staffing, comments, notifications, recommendation scores) = query." }

]);
