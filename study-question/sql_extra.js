// Extra SQL & NoSQL questions based on past study topics (NULL checks, fragmentation, Azure NoSQL / Cosmos DB, scalability).
PREP_DATA.push(...[
{ cat:"SQL Basics", q:"How many ways can you check or handle NULL in SQL (SQL Server)?",
  a:["**`IS NULL` / `IS NOT NULL`** – the only correct comparison (`= NULL` is never true)",
     "**`ISNULL(expr, replacement)`** – SQL Server only, 2 args, result type = **first** argument's type",
     "**`COALESCE(a, b, c, ...)`** – ANSI standard, **first non-NULL** of many args, type = highest precedence",
     "**`NULLIF(a, b)`** – returns NULL when `a = b` (e.g. avoid divide-by-zero)",
     "**`CASE WHEN col IS NULL THEN ... END`** and **`IIF(col IS NULL, x, y)`**",
     "**`IS [NOT] DISTINCT FROM`** (SQL Server 2022 / PostgreSQL) – NULL-safe equality",
     "Aggregates (`SUM`, `AVG`, `COUNT(col)`) **ignore NULLs**; `COUNT(*)` counts all rows",
     "`NOT IN` with a subquery that returns a NULL returns **no rows** → prefer `NOT EXISTS`"],
  code:`SELECT Name,
       ISNULL(MiddleName, '')                 AS M1,
       COALESCE(Mobile, HomePhone, 'n/a')     AS Phone,
       Total / NULLIF(Quantity, 0)            AS UnitPrice,
       CASE WHEN Email IS NULL THEN 'missing' ELSE 'ok' END AS EmailStatus
FROM Customers
WHERE ManagerId IS NULL;

-- NULL-safe comparison (SQL Server 2022+)
SELECT * FROM A JOIN B ON A.Code IS NOT DISTINCT FROM B.Code;`,
  tip:"ISNULL vs COALESCE: ISNULL = 2 args, T-SQL only, uses first arg's type; COALESCE = ANSI, many args." },

{ cat:"Indexes & Performance", q:"How do you check index fragmentation in SQL Server (MSSQL)?",
  a:["Query the DMV **`sys.dm_db_index_physical_stats`**",
     "**`avg_fragmentation_in_percent`** – logical fragmentation (out-of-order pages)",
     "**`avg_page_space_used_in_percent`** – page density (needs `SAMPLED`/`DETAILED` mode)",
     "Guideline: **5–30% → REORGANIZE**, **> 30% → REBUILD**; ignore small indexes (< ~1000 pages)",
     "On SSD storage, **page density** and **up-to-date statistics** often matter more than fragmentation %",
     "Automate with **Ola Hallengren's** maintenance scripts or SQL Agent jobs"],
  code:`SELECT  OBJECT_NAME(ips.object_id)          AS TableName,
        i.name                               AS IndexName,
        ips.index_type_desc,
        ips.avg_fragmentation_in_percent,
        ips.page_count
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') AS ips
JOIN sys.indexes i ON i.object_id = ips.object_id AND i.index_id = ips.index_id
WHERE ips.page_count > 1000 AND ips.avg_fragmentation_in_percent > 5
ORDER BY ips.avg_fragmentation_in_percent DESC;

ALTER INDEX IX_Orders_CustomerId ON dbo.Orders REORGANIZE;
ALTER INDEX IX_Orders_CustomerId ON dbo.Orders REBUILD WITH (ONLINE = ON);  -- Enterprise / Azure SQL
UPDATE STATISTICS dbo.Orders;` },

{ cat:"NoSQL Fundamentals", q:"What NoSQL database options does Azure offer?",
  a:["**Azure Cosmos DB** – globally distributed, multi-model: **NoSQL (Core/SQL) API, MongoDB, Cassandra, Gremlin (graph), Table**, plus PostgreSQL (Citus)",
     "**Azure Table Storage** – cheap, simple **key-value** store (PartitionKey + RowKey)",
     "**Azure Cache for Redis** / Azure Managed Redis – in-memory key-value cache",
     "**Azure Blob Storage** – object storage for unstructured data/files",
     "**Azure Data Explorer** – time-series / log analytics",
     "Choose Cosmos DB for **low latency at global scale**; Table Storage for **cheap simple lookups**"] },

{ cat:"Other NoSQL", q:"What is Azure Cosmos DB and what are its key features?",
  a:["Fully managed, **globally distributed**, multi-model NoSQL database",
     "**Single-digit ms** reads/writes at the 99th percentile, **99.999%** availability with multi-region",
     "**Turnkey global distribution** – add regions with a click; optional **multi-region writes**",
     "**5 consistency levels**: Strong, Bounded Staleness, Session (default), Consistent Prefix, Eventual",
     "Throughput measured in **Request Units (RU/s)** – provisioned, **autoscale**, or **serverless**",
     "**Automatic indexing** of all properties (customizable indexing policy)",
     "Structure: **Account → Database → Container → Items**, scaled by **partition key**",
     "Features: **change feed**, TTL, stored procedures/triggers (JS), vector search for AI apps"],
  tip:"Remember: account → database → container → item; RU/s = currency; partition key = scalability." },

{ cat:"Other NoSQL", q:"What are the Cosmos DB consistency levels?",
  a:["**Strong** – linearizable; always latest committed write (highest latency, single write region)",
     "**Bounded Staleness** – reads lag by at most **K versions or T time**",
     "**Session** (default) – **read-your-own-writes** within a session; most popular",
     "**Consistent Prefix** – reads never see out-of-order writes",
     "**Eventual** – no ordering guarantee; lowest latency and RU cost",
     "Stronger consistency → **higher latency, more RUs, lower availability**"] },

{ cat:"Other NoSQL", q:"How do you idempotently create a Cosmos DB database and container in code?",
  a:["Use **`CreateDatabaseIfNotExistsAsync`** and **`CreateContainerIfNotExistsAsync`** (.NET) / `create_if_not_exists` (Python)",
     "Safe to run on every startup or deployment — returns existing resources if present",
     "Note: if the container exists, its **partition key and throughput are NOT changed**",
     "For production prefer **infrastructure as code** (Bicep/Terraform) and use the SDK only to read",
     "Use **Managed Identity** (`DefaultAzureCredential`) instead of account keys"],
  code:`// .NET
var client = new CosmosClient(endpoint, new DefaultAzureCredential());
Database db = await client.CreateDatabaseIfNotExistsAsync("shop");
Container orders = await db.CreateContainerIfNotExistsAsync(
    new ContainerProperties("orders", partitionKeyPath: "/customerId"),
    ThroughputProperties.CreateAutoscaleThroughput(4000));

# Python
db = client.create_database_if_not_exists(id="shop")
orders = db.create_container_if_not_exists(id="orders", partition_key=PartitionKey(path="/customerId"))` },

{ cat:"Other NoSQL", q:"How do you process Cosmos DB container changes in near real time (change feed)?",
  a:["The **change feed** is a persistent, ordered log of **inserts and updates** per partition",
     "Default mode = **latest version** (no deletes) → use **soft delete + TTL** to capture deletes; or **all versions and deletes** mode",
     "Consume via: **Azure Functions Cosmos DB trigger** (easiest), **Change Feed Processor** (SDK), or pull model",
     "A **lease container** tracks progress (checkpoints) and distributes partitions across instances",
     "Use cases: materialized views, sync to search/cache, event-driven microservices, audit",
     "Processing is **at-least-once** → make handlers **idempotent**"],
  code:`// Azure Function (isolated worker)
[Function("OrdersChanged")]
public void Run([CosmosDBTrigger(
    databaseName: "shop", containerName: "orders",
    Connection = "CosmosConnection", LeaseContainerName = "leases",
    CreateLeaseContainerIfNotExists = true)] IReadOnlyList<Order> changes)
{
    foreach (var order in changes) _logger.LogInformation("Changed: {Id}", order.Id);
}

// Change Feed Processor (SDK)
var processor = orders.GetChangeFeedProcessorBuilder<Order>("orderProcessor", HandleChangesAsync)
    .WithInstanceName(Environment.MachineName)
    .WithLeaseContainer(leases)
    .Build();
await processor.StartAsync();` },

{ cat:"Other NoSQL", q:"A Cosmos DB container has the wrong partition key. How do you fix it?",
  a:["Partition key is **immutable** — you must **create a new container** and **migrate** data",
     "Steps: 1) create new container with the correct key, 2) **copy data** (Container Copy job, Data Factory, Spark connector, or change feed), 3) keep in sync via **change feed** while migrating, 4) switch the app, 5) delete the old container",
     "If you need the **same name**: copy to a temp container, delete & recreate the original, copy back (requires downtime or dual-writes)",
     "Good partition key: **high cardinality**, **even distribution** of storage and RU, used in most **queries' filters**",
     "Consider **hierarchical partition keys** (e.g. `/tenantId/userId`) or a **synthetic key** for hot partitions"] },

{ cat:"Other NoSQL", q:"How does Cosmos DB scale, and what are Request Units (RUs)?",
  a:["**RU** = normalized cost of an operation (CPU + IO + memory); a **1 KB point read = 1 RU**",
     "Throughput modes: **manual provisioned**, **autoscale** (scales 10%–100% of max), **serverless** (pay per request)",
     "Data is split into **logical partitions** (per key value, max **20 GB**) placed on **physical partitions** (up to 10,000 RU/s, 50 GB each)",
     "Scaling out = more physical partitions automatically; a **hot partition** limits throughput → `429 Too Many Requests`",
     "Reduce RUs: **point reads** (id + partition key) over queries, exclude unused paths from indexing, avoid **cross-partition queries**",
     "**Global scale**: add read regions; multi-region writes for low-latency writes"] },

{ cat:"Advanced: Scaling & Architecture", level:"Advanced", q:"What are the main strategies for database scalability (SQL and NoSQL)?",
  a:["**Vertical scaling (scale up)** – bigger CPU/RAM; simple but has a ceiling",
     "**Horizontal scaling (scale out)** – more nodes: **sharding/partitioning**",
     "**Read replicas** – offload reads; accept replication lag",
     "**Caching** – Redis/CDN in front of the DB",
     "**CQRS** – separate read and write models/stores",
     "**Partitioning** tables by date/tenant; **archiving** cold data",
     "**Connection pooling**, query/index tuning before buying hardware",
     "NoSQL (Cosmos, DynamoDB, Cassandra) scales horizontally **by design** via partition keys; relational needs more effort (Azure SQL Hyperscale, Citus, Vitess)"] },
]);
