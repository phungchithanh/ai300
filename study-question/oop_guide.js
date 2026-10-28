// OOP & Design Patterns — extra questions from the docx study guides in "Study resources Questions" (deduplicated against oop_data.js).
PREP_DATA.push(...[

{ cat:"Advanced: Architecture Patterns", q:"What are the benefits of CQRS? Explain with a real example.",
  a:["**Performance** – read side uses **denormalized read models / cache**, no heavy joins per page load",
     "**Independent scaling** – reads (dashboards) usually far outnumber writes",
     "**Clean separation** – commands hold business rules & validation; queries just return UI-shaped data",
     "**Event-friendly** – commands publish events → other services update their own read models",
     "**Security** – different authorization for commands vs queries",
     "**Testability** – test rules and read formatting separately",
     "Cost: more moving parts, **eventual consistency** between write and read models"],
  code:`// Command side (writes)            // Query side (reads)
CreateEngagementCommand             GetEngagementDashboardQuery
AssignPractitionerCommand           SearchPractitionersQuery
  → validate → save → publish         → read model / cache → DTO for UI
    EngagementCreated (Service Bus)`,
  tip:"Your story (Gi3): engagement create/assign = commands with business rules; dashboard, practitioner search and AI recommendations = optimized read models updated via Azure Service Bus events." },

{ cat:"Advanced: Microservice Patterns", q:"What are the Sidecar and Database-per-Service patterns?",
  a:["**Sidecar** – helper container runs **next to** each service and handles cross-cutting infra: pub/sub, service invocation, secrets, mTLS, telemetry",
     "Examples: **Dapr** sidecar, Envoy/Istio service mesh proxy",
     "Keeps service code focused on business logic; language-agnostic",
     "**Database per Service** – each service **owns its data**; others access it only via **API or events**",
     "Enables independent deploy/scale and right DB per need (SQL, Cosmos, Redis)",
     "Trade-off: no cross-service joins/transactions → use **Saga**, events, CQRS read models"] },

{ cat:"Advanced: Microservice Patterns", q:"What are the Aggregator pattern and service orchestration vs choreography?",
  a:["**Aggregator** – one service calls several downstream services (in parallel) and **composes one response** (dashboards, BFF)",
     "Aggregator composes; **domain services keep the business rules**",
     "**Orchestration** – a central coordinator tells each service what to do, in order (clear flow, easier monitoring; risk: central point)",
     "**Choreography** – services react to **events** without a coordinator (loose coupling; harder to trace)",
     "Use timeouts, partial results and circuit breakers when aggregating"],
  code:`var e = engagementClient.GetAsync(id);
var s = staffingClient.GetAsync(id);
var r = recommendationClient.GetAsync(id);
await Task.WhenAll(e, s, r);
return new DashboardDto(await e, await s, await r);` },

{ cat:"Advanced: Microservice Patterns", q:"What is event-driven architecture?",
  a:["Services communicate **asynchronously via events** (something happened)",
     "**Producer** publishes → **broker** routes (Service Bus, Event Grid, Kafka, RabbitMQ) → **consumers** react",
     "Benefits: **loose coupling**, independent scaling, resilience (buffering), easy to add consumers",
     "Challenges: **eventual consistency**, ordering, duplicates (**idempotency**), tracing, schema versioning",
     "Events vs commands: event = fact (past tense), command = request to do"],
  code:`EngagementCreated → Service Bus topic
   ├─ Notification Service (send alert)
   ├─ Recommendation Service (recalculate)
   └─ Analytics Service (update report)` }

].map(q => ({ ...q, level:'Advanced' })));
