// System Design, Cloud & DevOps study questions — built from the docx study guides in "Study resources Questions".
// Format: { cat, q, a:[bullets], code?, tip?, level? }   Bullets support `code` and **bold**.
const PREP_KEY = 'system';
const PREP_DATA = [

// ───────────── REST & HTTP ─────────────
{ cat:"REST & HTTP", q:"What is a REST API and what makes a good one?",
  a:["**REST** – architectural style exposing **resources** over HTTP",
     "Principles: **stateless**, client-server, uniform interface, cacheable, layered",
     "**Nouns in URLs**, verbs from HTTP methods: `GET /api/engagements/E100`",
     "Correct **status codes**: 200 OK, 201 Created, 204 No Content, 400, 401, 403, 404, 409, 500",
     "Versioning (`/v1`), pagination, filtering, consistent errors (**ProblemDetails**), OpenAPI docs",
     "Security: HTTPS, auth tokens, rate limiting, input validation"],
  code:`GET    /api/engagements          // list
GET    /api/engagements/E100     // read one
POST   /api/engagements          // create → 201 + Location
PUT    /api/engagements/E100     // replace
PATCH  /api/engagements/E100     // partial update
DELETE /api/engagements/E100     // delete → 204` },

{ cat:"REST & HTTP", q:"Explain the HTTP methods and which are safe / idempotent.",
  a:["**GET** – read; safe & idempotent",
     "**POST** – create / trigger action; **not guaranteed idempotent** (retries may create duplicates unless the API deduplicates them)",
     "**PUT** – **replace** whole resource; idempotent",
     "**PATCH** – **partial** update; **not guaranteed** idempotent (e.g. `increment`)",
     "**DELETE** – remove; idempotent (same final state)",
     "**HEAD** – headers only (exists? size?); **OPTIONS** – allowed methods / **CORS preflight**",
     "**Safe** = no requested state-changing effect (GET, HEAD, OPTIONS); **Idempotent** = repeating an identical request has the same intended effect as executing it once, not necessarily the same response"],
  tip:"Make POST retries safe with a server-supported **Idempotency-Key** contract; sending the header alone does not provide deduplication." },

{ cat:"REST & HTTP", q:"PUT vs PATCH vs POST?",
  a:["**POST** – create a new resource (server assigns ID) or run an action",
     "**PUT** – send a **replacement representation**; omitted writable fields may be reset, removed or rejected according to the API contract, rather than automatically preserved",
     "**PATCH** – send **only changed fields** (JSON Merge Patch / JSON Patch)",
     "PUT can also create at a **client-known** URL (`PUT /users/123`)"] },

{ cat:"REST & HTTP", q:"What is the difference between PUT and POST in idempotency, resource URLs, payloads and status codes?",
  a:["The primary difference between **PUT and POST** lies in **idempotency and resource control**.",
     "**An operation is idempotent if making the same request multiple times produces the exact same server-side outcome as making it just once.**",
     "**PUT** is **idempotent**: repeating the exact same request leaves the resource in the same intended state as sending it once. You control the exact URL of the resource."],
  table:{
    caption:"Core Differences at a Glance",
    headers:["Feature", "POST", "PUT"],
    rows:[
      ["Primary Intent", "Create a new subordinate resource, or trigger a generic server-side action.", "Replace an entire existing resource, or create it if it does not exist yet (**upsert**, if supported)."],
      ["Idempotent?", "Not guaranteed; repeating the request may create duplicates.", "Yes; repeating the request has the same intended resource-state effect as the first execution."],
      ["URL Path", "Typically a collection endpoint, e.g. `/users`.", "A specific, unique endpoint, e.g. `/users/123`."],
      ["ID Assignment", "The server typically decides the resource ID.", "The client specifies the resource ID in the URL."],
      ["Payload Requirement", "Can be partial or full data, depending on the operation.", "Requires a complete replacement payload under the API contract; missing writable fields may be wiped, reset or set to null."],
      ["Success Status", "Typically `201 Created` for creation.", "`200 OK` or `204 No Content` for replacement; `201 Created` if a new resource is created."]
    ]
  },
  tip:"**an operation is idempotent if making the same request multiple times produces the exact same server-side outcome as making it just once**." },

// ───────────── Authentication & Identity ─────────────
{ cat:"Authentication & Identity", q:"What is a JWT and how is it validated?",
  a:["**JSON Web Token** – compact, **signed** token carrying **claims**",
     "3 Base64URL parts: **Header** (alg, type) . **Payload** (sub, roles, exp, iss, aud) . **Signature**",
     "Signed, **not encrypted** → never put secrets in the payload",
     "API validates: **signature**, `iss` (issuer), `aud` (audience), `exp`/`nbf` (lifetime)",
     "Sent as `Authorization: Bearer <token>`; stateless → can't easily revoke → keep **short-lived**"],
  code:`builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o => {
        o.Authority = "https://login.microsoftonline.com/<tenant>/v2.0";
        o.Audience  = "api://my-api";
    });` },

{ cat:"Authentication & Identity", q:"Describe the JWT flow between an Angular/React SPA and a .NET API.",
  a:["1️⃣ SPA redirects user to **Identity Provider** (Entra ID, Keycloak, Okta)",
     "2️⃣ User logs in → IdP returns an **authorization code** (Auth Code + **PKCE**)",
     "3️⃣ SPA exchanges code for **access token** (+ ID token, refresh token)",
     "4️⃣ **HTTP interceptor** adds `Authorization: Bearer <token>` to API calls",
     "5️⃣ .NET API **validates the JWT** and checks roles/policies → returns data",
     "6️⃣ Token expires → silent **refresh** → retry"],
  code:`SPA → IdP login → code → token endpoint → access token
SPA → GET /api/data  (Authorization: Bearer eyJ...) → API validates → 200` },

{ cat:"Authentication & Identity", q:"How does the refresh token workflow work?",
  a:["Login issues a **short-lived access token** (minutes) + **long-lived refresh token**",
     "Access token expires → client sends **refresh token** to the token endpoint",
     "IdP returns a **new access token** (and usually a **rotated** refresh token) — no re-login",
     "**Rotation + reuse detection**: old refresh token becomes invalid; reuse = revoke session",
     "Store securely: **httpOnly secure cookie** / BFF; avoid localStorage",
     "Queue concurrent 401s so only **one refresh** happens"],
  tip:"Short access token limits damage if stolen; refresh token keeps UX smooth." },

{ cat:"Authentication & Identity", q:"What is OAuth 2.0 and its main flows? How is OIDC different?",
  a:["**OAuth 2.0** – **authorization** framework: app gets **delegated access** to an API via tokens, not passwords",
     "Roles: Resource Owner (user), Client (app), Authorization Server (IdP), Resource Server (API)",
     "**Authorization Code + PKCE** – SPAs, mobile, web apps (recommended)",
     "**Client Credentials** – service-to-service (no user)",
     "**Device Code** – TVs/CLIs; ❌ Implicit & Password flows are deprecated",
     "**OpenID Connect (OIDC)** – identity layer on top of OAuth → adds **ID token** (who the user is) = **authentication**"],
  tip:"OAuth = authorization (access); OIDC = authentication (identity)." },

{ cat:"Authentication & Identity", q:"What is Microsoft Entra ID (Azure AD)?",
  a:["Microsoft's **cloud identity & access management** service",
     "**SSO**, MFA, Conditional Access, users/groups, **app registrations**",
     "Issues OAuth 2.0 / OIDC tokens; supports **app roles** & scopes for APIs",
     "**Managed identities** – Azure resources access other services **without secrets**",
     "Libraries: **MSAL** (SPA/mobile), `Microsoft.Identity.Web` (.NET API)",
     "Entra External ID (B2C) for customer-facing apps"] },

{ cat:"Authentication & Identity", q:"What is Okta and how do you integrate it?",
  a:["Third-party **Identity Provider** (IDaaS): SSO, MFA, user lifecycle",
     "Supports **OIDC / OAuth 2.0** and **SAML**",
     "SPA: Okta SDK / generic OIDC library with Auth Code + PKCE",
     "Backend validates Okta-issued JWTs (issuer + audience)",
     "Legacy/enterprise: **SAML** (e.g. Express + passport-saml)"] },

{ cat:"Authentication & Identity", q:"Keycloak as Identity Provider vs Identity Broker?",
  a:["**Keycloak** – open-source IAM (OIDC, OAuth 2.0, SAML), realms, roles, clients",
     "**Identity Provider** – Keycloak **authenticates users itself** (users stored in its realm/LDAP)",
     "**Identity Broker** – Keycloak **delegates login** to another IdP (Entra ID, Okta, Google) and issues **its own standardized tokens**",
     "Broker = one integration point for apps, many upstream IdPs (federation)"],
  tip:"IdP = Keycloak is the login system; Broker = Keycloak redirects to another login system." },

// ───────────── Cloud & Azure ─────────────
{ cat:"Cloud & Azure", q:"What is AKS (Azure Kubernetes Service)?",
  a:["**Managed Kubernetes** – Azure runs the control plane; you manage node pools & workloads",
     "Core objects: **Pod**, **Deployment**, **Service**, **Ingress**, ConfigMap, Secret, Namespace",
     "Scaling: **HPA** (pods), cluster autoscaler (nodes), KEDA (event-driven)",
     "Integrations: ACR (images), Entra ID / workload identity, Key Vault, Azure Monitor",
     "Deploy with **Helm** / manifests via CI/CD or GitOps (Flux, Argo CD)"] },

{ cat:"Cloud & Azure", q:"What is Azure Container Apps and when would you choose it over AKS?",
  a:["**Serverless containers** built on Kubernetes — no cluster to manage",
     "Built-in: **autoscaling (KEDA) incl. scale-to-zero**, revisions, traffic splitting, ingress, **Dapr**",
     "Choose **Container Apps** for microservices/APIs/workers when you want simplicity",
     "Choose **AKS** when you need full Kubernetes control (custom operators, networking, service mesh, GPU pools)"] },

{ cat:"Cloud & Azure", q:"What does Azure API Management (APIM) do?",
  a:["Managed **API gateway** in front of backend APIs",
     "**Policies**: JWT validation, rate limiting/quotas, caching, transformation, CORS, IP filtering",
     "Routing, **versioning** & revisions; products & subscription keys",
     "**Developer portal** for API consumers; analytics & monitoring",
     "Hides internal microservice structure from clients"] },

{ cat:"Cloud & Azure", q:"What is Azure Blob Storage?",
  a:["Object storage for **unstructured data**: documents, images, videos, logs, backups, exports",
     "Blob types: **Block** (files), Append (logs), Page (VM disks)",
     "Access tiers: **Hot / Cool / Cold / Archive** + lifecycle policies to cut cost",
     "Secure with **Entra ID / managed identity**, SAS tokens, private endpoints",
     "**ADLS Gen2** = Blob + hierarchical namespace for data lakes"] },

{ cat:"Cloud & Azure", q:"What is Azure Data Factory?",
  a:["Cloud **ETL/ELT orchestration** service",
     "**Pipelines** of **activities** (Copy, Data Flow, Databricks notebook, stored procedure)",
     "**Linked services** (connections) + **datasets**; 90+ connectors",
     "**Triggers**: schedule, tumbling window, storage events",
     "**Integration Runtime** – Azure, self-hosted (on-prem data), SSIS",
     "In Microsoft Fabric: **Data Factory pipelines**"] },

// ───────────── Scalability & Distributed Systems ─────────────
{ cat:"Scalability & Distributed Systems", q:"Horizontal vs vertical scaling?",
  a:["**Vertical (scale up)** – bigger machine (more CPU/RAM); simple but has a **ceiling** & single point of failure",
     "**Horizontal (scale out)** – **more instances** behind a load balancer; near-unlimited, fault tolerant",
     "Horizontal needs **stateless** services (state in DB/Redis), load balancing",
     "Cloud: AKS pods / Container Apps replicas / App Service instances with **autoscaling**"] },

{ cat:"Scalability & Distributed Systems", q:"How do you design a high-throughput system?",
  a:["**Async, non-blocking I/O** everywhere",
     "**Queues/streams** to absorb spikes (Service Bus, Kafka) + competing consumers",
     "**Batching** writes, **caching** reads (Redis, CDN)",
     "**Stateless** services + horizontal autoscaling",
     "Partition data (sharding, partition keys); avoid hot spots & locks",
     "Backpressure, rate limiting, idempotent consumers; measure with load tests"] },

{ cat:"Scalability & Distributed Systems", q:"What are the main challenges of distributed systems?",
  a:["**Network is unreliable** – latency, timeouts, partial failures",
     "**Data consistency** across services (CAP, eventual consistency)",
     "**Duplicate / out-of-order messages** → idempotency",
     "**Observability** – distributed tracing (OpenTelemetry, correlation IDs), logging, metrics",
     "Clock skew, service discovery, config & secret management",
     "Mitigate: retries + backoff, timeouts, circuit breakers, sagas, outbox"],
  tip:"Fallacies of distributed computing: the network is NOT reliable, latency is NOT zero, bandwidth is NOT infinite." },

// ───────────── DevOps & CI/CD ─────────────
{ cat:"DevOps & CI/CD", q:"What is CI/CD?",
  a:["**CI (Continuous Integration)** – every commit is automatically **built & tested**",
     "**Continuous Delivery** – every good build is **deployable**; production release needs approval",
     "**Continuous Deployment** – every good build goes to production **automatically**",
     "Pipeline: build → unit tests → code quality/security scans → package artifact → deploy dev → test → staging → prod",
     "Benefits: fast feedback, fewer integration bugs, **repeatable, safe** releases"] },

{ cat:"DevOps & CI/CD", q:"How do Azure DevOps YAML pipelines work?",
  a:["Pipeline as code in `azure-pipelines.yml`",
     "**Trigger** (branches/PRs) → **Stages** → **Jobs** (run on agents) → **Steps** (tasks/scripts)",
     "**Artifacts** passed from build to deploy stages",
     "**Environments** with **approvals & checks**; **variables / variable groups / Key Vault** for config & secrets",
     "**Templates** & **parameters** for reuse (e.g. deploy only frontend or backend)"],
  code:`trigger: [ main ]
stages:
- stage: Build
  jobs:
  - job: build
    pool: { vmImage: ubuntu-latest }
    steps:
    - script: dotnet test && dotnet publish -o $(Build.ArtifactStagingDirectory)
    - publish: $(Build.ArtifactStagingDirectory)
      artifact: api
- stage: Deploy_Dev
  dependsOn: Build
  jobs:
  - deployment: deploy
    environment: dev          # approvals configured on the environment
    strategy: { runOnce: { deploy: { steps: [ script: echo deploy ] } } }` },

{ cat:"DevOps & CI/CD", q:"What is DevOps / DevSecOps?",
  a:["**Culture + practices** uniting development and operations",
     "Automation (CI/CD), **Infrastructure as Code** (Terraform, Bicep), monitoring & feedback",
     "Small, frequent releases; shared ownership (\"you build it, you run it\")",
     "**DevSecOps** – shift security left: SAST, dependency scanning, secret scanning, container scanning in the pipeline",
     "Measure with **DORA metrics**: deployment frequency, lead time, change failure rate, MTTR"] },

{ cat:"DevOps & CI/CD", q:"What deployment strategies do you know?",
  a:["**Rolling** – replace instances gradually; no extra infra",
     "**Blue-Green** – deploy to idle environment, **switch traffic**; instant rollback",
     "**Canary** – release to a **small % of users**, monitor, then expand",
     "**Feature flags** – deploy dark, **toggle features** without redeploying",
     "Always have a **rollback** plan; watch health checks & metrics",
     "Azure: App Service **deployment slots**, Container Apps **revisions/traffic split**"] },

// ───────────── AI-Assisted Development ─────────────
{ cat:"AI-Assisted Development", q:"What is spec-driven development, and how does it differ from TDD?",
  a:["**Spec-driven development** starts with an explicit, agreed specification of what a feature must do, then uses that specification to guide design, implementation and verification",
     "**A useful spec includes** the problem and scope, expected behavior, API/data contracts, acceptance criteria, edge cases, error handling and measurable non-functional requirements such as performance, security and accessibility",
     "**Workflow**: clarify requirements → review the spec → create a technical plan and small tasks → implement → test against acceptance criteria → review and update the spec as requirements evolve",
     "**With AI coding tools**, give the agent the approved spec, constraints and task boundaries. Review generated code and run tests; a spec improves guidance but does not guarantee correctness",
     "**Example**: for an order-creation API, specify required fields, authorization, duplicate-request behavior, response codes and validation errors before writing the endpoint",
     "**Compared with TDD**: TDD uses the red → green → refactor cycle, writing a failing test before the implementation. Spec-driven development describes the broader intended behavior and constraints; the two approaches complement each other",
     "**Benefits**: fewer ambiguous requirements, better alignment, traceability from requirements to tests, and more consistent human/AI implementations",
     "**Trade-offs**: upfront effort and specification drift. Keep specs proportional to the task, version them with code, resolve contradictions early and verify them through tests and review"],
  code:`Feature: Create an order
Contract: POST /orders

Acceptance criteria:
- An authenticated customer can order one or more items.
- Every quantity must be a positive integer.
- The server calculates prices; it does not trust client totals.
- Success returns 201 Created and Location: /orders/{id}.
- Invalid input returns 400 with field-level errors.
- Repeating the same request with the same supported idempotency
  key does not create another order.
- Reusing that key with a different payload returns 409 Conflict.

Verification:
- Test success, validation, authorization and duplicate retries.
- Verify stored order data and response contracts.`,
  tip:"Spec-driven = agree on what and why before implementing how. TDD = use failing tests to drive implementation. Neither requires AI." },

{ cat:"AI-Assisted Development", q:"Vibe coding vs spec-driven development?",
  a:["**Vibe coding** – prompt AI and iterate quickly with minimal upfront design → great for **prototypes/MVPs**",
     "Risk: inconsistent architecture, hidden bugs, hard to maintain",
     "**Spec-driven** – write specs, contracts, acceptance criteria, ADRs first → AI generates code **guided by the spec**",
     "Slower upfront, but **maintainable, reviewable, testable** → enterprise systems",
     "Either way: human review, tests and CI gates on AI-generated code"] }

];

PREP_DATA.push(...[

{ cat:"Advanced: Architecture Stories", q:"Describe a microservices architecture you designed (e.g. Gi3 Platform).",
  a:["**Frontend** (Angular/React) → **BFF / API Management** (auth, routing, rate limits)",
     "**Domain services**: Engagement, Staffing/Profile, Recommendation (AI), Notification, Analytics",
     "**Data per service**: PostgreSQL/Azure SQL (transactions), Cosmos DB, Redis (cache)",
     "**Events** via Azure Service Bus / Event Grid → near real-time recommendation recalculation",
     "Hosted on **AKS / Container Apps** with **Dapr** sidecars; CI/CD via Azure DevOps",
     "Cross-cutting: Entra ID, App Insights tracing, circuit breakers, CQRS read models"],
  code:`Angular / React
   → BFF / Azure API Management
      → Engagement Svc ─ PostgreSQL
      → Staffing Svc   ─ Azure SQL
      → Recommendation Svc ─ Cosmos DB + AI
      → Notification Svc
   ⇄ Azure Service Bus (EngagementCreated, PractitionerAssigned)
   Redis cache · App Insights · Entra ID`,
  tip:"Explain: business capabilities → service boundaries → data ownership → communication (sync vs events) → resilience → deployment." },

{ cat:"Advanced: Architecture Stories", q:"What is an AI Agent Orchestrator and how would you design one?",
  a:["Coordinates **LLM agents, tools, memory and workflows** to complete multi-step tasks",
     "**Planner** breaks a request into steps (often a **DAG**) → **executor** runs steps/agents",
     "**Tool adapters** (APIs, DB, search) with strict schemas & permissions",
     "**Memory**: short-term context + long-term (vector store)",
     "**Human-in-the-loop** approvals for risky actions; guardrails & content safety",
     "Observability: trace every step, cost/token tracking, evaluation",
     "Frameworks: Semantic Kernel, Azure AI Foundry Agent Service, LangGraph, AutoGen"] }

].map(q => ({ ...q, level:'Advanced' })));
