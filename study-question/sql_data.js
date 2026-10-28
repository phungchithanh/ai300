// SQL & NoSQL study questions — common and advanced questions with short, memorizable answers.
// Format: { cat, q, a:[bullets], code?, tip?, level? }   Bullets support `code` and **bold**.
const PREP_KEY = 'sql';
const PREP_DATA = [

// ───────────── SQL Basics ─────────────
{ cat:"SQL Basics", q:"What is SQL and what are its command categories?",
  a:["**Structured Query Language** – standard language for relational databases",
     "**DDL** (definition): `CREATE`, `ALTER`, `DROP`, `TRUNCATE`",
     "**DML** (manipulation): `INSERT`, `UPDATE`, `DELETE`, `MERGE`",
     "**DQL** (query): `SELECT`",
     "**DCL** (control): `GRANT`, `REVOKE`",
     "**TCL** (transactions): `COMMIT`, `ROLLBACK`, `SAVEPOINT`"] },

{ cat:"SQL Basics", q:"What is the logical order of execution of a SELECT query?",
  a:["1️⃣ `FROM` / `JOIN`",
     "2️⃣ `WHERE`",
     "3️⃣ `GROUP BY`",
     "4️⃣ `HAVING`",
     "5️⃣ `SELECT` (incl. window functions)",
     "6️⃣ `DISTINCT`",
     "7️⃣ `ORDER BY`",
     "8️⃣ `LIMIT` / `OFFSET` / `TOP`",
     "That's why you **can't use a SELECT alias in WHERE**, but can in ORDER BY"],
  tip:"Memory: **F**rom **W**here **G**roup **H**aving **S**elect **O**rder **L**imit — \"Frank Went Golfing, Hit Some Old Lady\"." },

{ cat:"SQL Basics", q:"What is the difference between primary key, unique key and foreign key?",
  a:["**Primary key** – uniquely identifies a row; **NOT NULL**, **one per table**; usually clustered index",
     "**Unique key** – enforces uniqueness; **allows NULL** (one in SQL Server, many in PostgreSQL); many per table",
     "**Foreign key** – references a primary/unique key in another table → **referential integrity**",
     "FK actions: `ON DELETE CASCADE / SET NULL / RESTRICT`"] },

{ cat:"SQL Basics", q:"What are constraints in SQL?",
  a:["Rules enforced on data",
     "`PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`",
     "`NOT NULL`",
     "`CHECK` (e.g. `CHECK (age >= 0)`)",
     "`DEFAULT` value"] },

{ cat:"SQL Basics", q:"What is the difference between DELETE, TRUNCATE and DROP?",
  a:["`DELETE` – removes **rows** (with optional WHERE), **logged per row**, fires triggers, can roll back",
     "`TRUNCATE` – removes **all rows**, minimal logging, **faster**, resets identity, no WHERE",
     "`DROP` – removes the **whole table** (structure + data + indexes)",
     "TRUNCATE fails if referenced by a foreign key (SQL Server)"] },

{ cat:"SQL Basics", q:"What is the difference between WHERE and HAVING?",
  a:["`WHERE` – filters **rows before** grouping; can't use aggregates",
     "`HAVING` – filters **groups after** `GROUP BY`; can use aggregates",
     "Filter in WHERE when possible (less data to group)"],
  code:`SELECT dept, COUNT(*) AS cnt
FROM employees
WHERE active = 1
GROUP BY dept
HAVING COUNT(*) > 5;` },

{ cat:"SQL Basics", q:"What are aggregate functions and how does GROUP BY work?",
  a:["Aggregate: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` (also `STRING_AGG`)",
     "`GROUP BY` collapses rows with same values into groups",
     "Every non-aggregated SELECT column must be in GROUP BY",
     "`COUNT(*)` counts rows; `COUNT(col)` ignores NULLs; `COUNT(DISTINCT col)` unique values"] },

{ cat:"SQL Basics", q:"How does NULL behave in SQL?",
  a:["NULL = **unknown / missing**, not zero or empty string",
     "Comparisons with NULL return **UNKNOWN** → use `IS NULL` / `IS NOT NULL`, never `= NULL`",
     "Aggregates **ignore NULLs** (except COUNT(*))",
     "`COALESCE(a, b, …)` – first non-null; `NULLIF(a, b)`",
     "⚠️ `NOT IN (subquery)` returns nothing if the subquery contains a NULL → use `NOT EXISTS`"] },

{ cat:"SQL Basics", q:"What is the difference between UNION and UNION ALL?",
  a:["Both combine results of two SELECTs (same column count & compatible types)",
     "`UNION` – **removes duplicates** (extra sort/hash → slower)",
     "`UNION ALL` – keeps all rows → **faster**",
     "Also: `INTERSECT` (common rows), `EXCEPT` / `MINUS` (difference)"] },

{ cat:"SQL Basics", q:"What is the difference between CHAR, VARCHAR and NVARCHAR?",
  a:["`CHAR(n)` – **fixed** length, padded with spaces",
     "`VARCHAR(n)` – **variable** length, non-Unicode (or UTF-8 collation)",
     "`NVARCHAR(n)` – variable length **Unicode** (UTF-16, 2 bytes/char) in SQL Server",
     "Use NVARCHAR for international text"] },

// ───────────── Joins & Subqueries ─────────────
{ cat:"Joins & Subqueries", q:"Explain the types of JOINs.",
  a:["**INNER JOIN** – only matching rows in both tables",
     "**LEFT (OUTER) JOIN** – all rows from left + matches (NULL if none)",
     "**RIGHT (OUTER) JOIN** – all rows from right + matches",
     "**FULL (OUTER) JOIN** – all rows from both",
     "**CROSS JOIN** – Cartesian product (every combination)",
     "**SELF JOIN** – table joined to itself (e.g. employee → manager)"],
  code:`SELECT e.name, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;` },

{ cat:"Joins & Subqueries", q:"How do you find rows in table A that have no match in table B?",
  a:["**LEFT JOIN … WHERE b.id IS NULL** (anti-join)",
     "Or **NOT EXISTS** (NULL-safe, often best plan)",
     "Avoid `NOT IN` if the subquery can return NULL"],
  code:`SELECT c.*
FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);` },

{ cat:"Joins & Subqueries", q:"What is a subquery? Correlated vs non-correlated?",
  a:["A query **nested** inside another (in SELECT, FROM, WHERE)",
     "**Non-correlated** – runs independently, once",
     "**Correlated** – references outer query → evaluated **per outer row** (can be slow)",
     "Often rewritable as JOIN or window function"] },

{ cat:"Joins & Subqueries", q:"What is the difference between IN and EXISTS?",
  a:["`IN` – compares a value to a **list/subquery result**",
     "`EXISTS` – returns true if subquery returns **any row**; stops at first match",
     "EXISTS is **NULL-safe** and often better for large/correlated subqueries",
     "Modern optimizers often produce the same plan for IN vs EXISTS (semi-join)"] },

{ cat:"Joins & Subqueries", q:"What is a CTE (Common Table Expression)?",
  a:["Named temporary result set defined with `WITH`",
     "Improves **readability** of complex queries",
     "Can be referenced multiple times in the query",
     "**Recursive CTE** – hierarchies (org charts, categories, graphs)"],
  code:`WITH RECURSIVE org AS (
  SELECT id, name, manager_id, 1 AS lvl FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, o.lvl + 1
  FROM employees e JOIN org o ON e.manager_id = o.id
)
SELECT * FROM org;   -- SQL Server: omit RECURSIVE` },

// ───────────── Window Functions ─────────────
{ cat:"Window Functions", q:"What are window functions?",
  a:["Calculations **across a set of rows related to the current row** — without collapsing rows (unlike GROUP BY)",
     "Syntax: `func() OVER (PARTITION BY … ORDER BY … ROWS …)`",
     "Ranking: `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `NTILE`",
     "Offset: `LAG`, `LEAD`, `FIRST_VALUE`, `LAST_VALUE`",
     "Aggregates: `SUM() OVER` (running totals), `AVG() OVER` (moving averages)"],
  code:`SELECT name, dept, salary,
       SUM(salary) OVER (PARTITION BY dept) AS dept_total,
       salary - LAG(salary) OVER (ORDER BY hired) AS diff_prev
FROM employees;` },

{ cat:"Window Functions", q:"What is the difference between ROW_NUMBER, RANK and DENSE_RANK?",
  a:["Scores 100, 90, 90, 80:",
     "`ROW_NUMBER` → 1, 2, 3, 4 (always unique)",
     "`RANK` → 1, 2, 2, **4** (gaps after ties)",
     "`DENSE_RANK` → 1, 2, 2, **3** (no gaps)"] },

{ cat:"Window Functions", q:"How do you find the Nth highest salary (e.g. 2nd)?",
  a:["**DENSE_RANK** handles ties correctly",
     "Or `ORDER BY salary DESC OFFSET N-1 ROWS FETCH NEXT 1 ROW ONLY` on DISTINCT salaries",
     "Classic: `MAX(salary) WHERE salary < (SELECT MAX(salary) …)` for 2nd highest"],
  code:`SELECT DISTINCT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
) t WHERE rnk = 2;` },

{ cat:"Window Functions", q:"How do you find and delete duplicate rows?",
  a:["Find: `GROUP BY` columns `HAVING COUNT(*) > 1`",
     "Delete: number duplicates with **ROW_NUMBER() PARTITION BY** the duplicate columns, delete where rn > 1"],
  code:`WITH d AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) AS rn
  FROM users
)
DELETE FROM users WHERE id IN (SELECT id FROM d WHERE rn > 1);` },

{ cat:"Window Functions", q:"How do you get the top N rows per group?",
  a:["`ROW_NUMBER() OVER (PARTITION BY group ORDER BY metric DESC)` then filter `rn <= N`",
     "Alternatives: `CROSS APPLY` / `LATERAL` with `TOP/LIMIT`"],
  code:`SELECT * FROM (
  SELECT p.*, ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) rn
  FROM products p
) t WHERE rn <= 3;` },

// ───────────── Indexes & Performance ─────────────
{ cat:"Indexes & Performance", q:"What is an index and how does it work?",
  a:["Data structure (usually **B+ tree**) that speeds up lookups — like a book index",
     "Turns full table scans into **seeks** (O(log n))",
     "Speeds up **WHERE, JOIN, ORDER BY, GROUP BY**",
     "Cost: **extra storage** + slower **INSERT/UPDATE/DELETE**",
     "Index columns used in filters & joins with **high selectivity**"] },

{ cat:"Indexes & Performance", q:"What is the difference between clustered and non-clustered index?",
  a:["**Clustered** – defines the **physical order** of data; the table **is** the index; **only one** per table (usually PK)",
     "**Non-clustered** – separate structure with key + **pointer** to the row (row locator); many per table",
     "Clustered suits **range queries** and the main access path (IDs, dates); non-clustered suits **lookups, filters, joins, sorting** on other columns",
     "Non-clustered lookup may need a **key lookup** back to the clustered index",
     "**Covering index** (`INCLUDE` columns) avoids that lookup"],
  code:`CREATE CLUSTERED INDEX IX_Engagement_Id ON Engagements (EngagementId);
CREATE NONCLUSTERED INDEX IX_Practitioner_Skill ON Practitioners (Skill) INCLUDE (Name);`,
  tip:"Clustered = a dictionary sorted by word (the data itself is in order); non-clustered = a book's index pointing to page numbers." },

{ cat:"Indexes & Performance", q:"What is a composite index and why does column order matter?",
  a:["Index on **multiple columns**: `(last_name, first_name)`",
     "Usable for queries filtering on the **leftmost prefix** (`last_name`, or both)",
     "**Not** efficient for filtering only on `first_name`",
     "Put **equality** columns first, then range columns; most selective first (generally)"],
  tip:"Leftmost prefix rule: an index on (A, B, C) helps A, A+B, A+B+C — not B or C alone." },

{ cat:"Indexes & Performance", q:"When will an index NOT be used?",
  a:["Function/expression on the column: `WHERE YEAR(created) = 2024` (**non-SARGable**)",
     "Leading wildcard: `LIKE '%abc'`",
     "Implicit **type conversion** (varchar vs nvarchar)",
     "Low selectivity (e.g. boolean column) → scan is cheaper",
     "OR conditions across different columns, `!=`, outdated statistics",
     "Fix: rewrite as range `created >= '2024-01-01' AND created < '2025-01-01'`, computed/functional indexes"] },

{ cat:"Indexes & Performance", q:"Query optimization — how do you speed up a slow SQL query and improve database performance?",
  a:["**Measure first** – find the slow queries (Query Store, `pg_stat_statements`, APM) and optimize based on evidence, not guesses",
     "Read the **execution plan** (`EXPLAIN ANALYZE` / actual plan)",
     "Look for **table scans**, key lookups, bad estimates, sorts/spills",
     "Add/adjust **indexes** (covering, composite)",
     "Make predicates **SARGable**; return only needed columns (no `SELECT *`) and avoid unnecessary joins",
     "Reduce rows early; avoid correlated subqueries / N+1 from app",
     "Update **statistics**; check parameter sniffing",
     "Paginate with **keyset** instead of large OFFSET",
     "Cache stable lookup data; consider denormalized read models / partitioning for big data"],
  code:`-- Only the needed columns; WHERE + ORDER BY served by one covering index
SELECT EngagementId, ClientName, Status
FROM Engagements
WHERE Status = 'Active'
ORDER BY CreatedDate DESC;

CREATE INDEX IX_Engagements_Status_CreatedDate
    ON Engagements (Status, CreatedDate DESC) INCLUDE (EngagementId, ClientName);`,
  tip:"Make the database do less work: fewer rows scanned, fewer columns returned, indexes that match the WHERE + ORDER BY." },

{ cat:"Indexes & Performance", q:"What is an execution plan?",
  a:["The **steps** the optimizer chooses to run a query (scans, seeks, joins, sorts)",
     "Based on **statistics** (data distribution) & cost estimates",
     "**Estimated** vs **actual** plan — compare estimated vs actual row counts",
     "Join algorithms: **Nested Loops** (small sets), **Hash Join** (large, unsorted), **Merge Join** (sorted inputs)"] },

{ cat:"Indexes & Performance", q:"OFFSET pagination vs keyset (seek) pagination?",
  a:["**OFFSET/LIMIT** – simple, but DB must **read & skip** all previous rows → slow on deep pages; unstable with inserts",
     "**Keyset** – `WHERE id > @lastId ORDER BY id LIMIT 20` → uses index, **constant speed**",
     "Keyset can't jump to arbitrary page numbers"],
  code:`SELECT * FROM orders
WHERE (created_at, id) < (@lastCreated, @lastId)
ORDER BY created_at DESC, id DESC
LIMIT 20;` },

// ───────────── Transactions & Concurrency ─────────────
{ cat:"Transactions & Concurrency", q:"What are ACID properties?",
  a:["**Atomicity** – all or nothing (money transfer: the debit **and** the credit both succeed, or both roll back)",
     "**Consistency** – DB moves from one valid state to another (constraints, foreign keys, balance rules hold)",
     "**Isolation** – concurrent transactions don't interfere (two users can't book the **same seat**)",
     "**Durability** – committed data survives crashes (write-ahead log)"] },

{ cat:"Transactions & Concurrency", q:"What are transaction isolation levels and the anomalies they prevent?",
  a:["Anomalies: **dirty read** (uncommitted data), **non-repeatable read** (row changes between reads), **phantom read** (new rows appear)",
     "**Read Uncommitted** – allows all three",
     "**Read Committed** (default in SQL Server/PostgreSQL) – prevents dirty reads",
     "**Repeatable Read** – + prevents non-repeatable reads",
     "**Serializable** – prevents all (strictest, most locking)",
     "**Snapshot / MVCC** – readers see a consistent snapshot without blocking writers"],
  tip:"Higher isolation = more consistency, less concurrency." },

{ cat:"Transactions & Concurrency", q:"What is a deadlock in a database and how do you avoid it?",
  a:["Two transactions each hold a lock the other needs → DB **kills one** (victim)",
     "Avoid: access tables/rows in **consistent order**",
     "Keep transactions **short**; proper **indexes** (fewer locks)",
     "Use appropriate isolation level / snapshot isolation",
     "**Retry** the victim transaction in the app"] },

{ cat:"Transactions & Concurrency", q:"Optimistic vs pessimistic locking?",
  a:["**Pessimistic** – lock data when reading (`SELECT … FOR UPDATE`) → safe but blocks others",
     "**Optimistic** – no lock; check a **version/rowversion** on update; conflict → retry",
     "Optimistic is better for **low-contention** web apps",
     "Pessimistic for high-contention critical sections (inventory, seats)"] },

// ───────────── Database Design ─────────────
{ cat:"Database Design", q:"What is normalization? Explain 1NF, 2NF, 3NF.",
  a:["Organizing tables to **reduce redundancy & update anomalies**",
     "**1NF** – atomic values, no repeating groups, each row unique",
     "**2NF** – 1NF + no **partial dependency** on part of a composite key",
     "**3NF** – 2NF + no **transitive dependency** (non-key depends only on the key)",
     "**BCNF** – every determinant is a candidate key",
     "**Real example – tax preparation platform** (see tables below):",
     "**Unnormalized** – `Forms` holds a list (`\"1040, Schedule C, W-2\"`) → you can't track each form's status, query \"all returns with Schedule C\", or index it",
     "**→ 1NF** – one row per form on a return, key `(ReturnId, FormCode)`. But tax year, client and preparer columns repeat on every form row of the same return",
     "**→ 2NF** – `TaxYear`, `ClientId`, `PreparerId` depend only on `ReturnId`; `FormName` depends only on `FormCode` (**partial dependencies**) → split into `TaxReturns`, `Forms`, `ReturnForms`",
     "**→ 3NF** – in `TaxReturns`, `ClientName`/`ClientTIN` depend on `ClientId` and `PreparerName` on `PreparerId`, not on `ReturnId` (**transitive**: ReturnId → ClientId → ClientName) → move to `Clients` and `Preparers`",
     "**Anomalies it fixes** – **update**: client changes legal name after marriage → 1 row, not every return for 10 years; **insert**: add new IRS form `8995` before any return uses it; **delete**: deleting a preparer's last return no longer loses the preparer's PTIN/details",
     "Other tax cases: `Jurisdiction(StateCode, StateName)` repeated on every state filing → own table; `Engagement(EngagementId, ClientId, ClientIndustry, PartnerId, PartnerOffice)` → client & partner data in their own tables"],
  code:`-- UNNORMALIZED
TaxReturns(ReturnId, TaxYear, ClientId, ClientName, ClientTIN, PreparerId, PreparerName, Forms)
R100 | 2024 | C7 | Alice Nguyen | XXX-XX-1234 | P3 | John Smith | "1040, Schedule C, W-2"

-- 1NF: atomic values, one row per form on a return, PK (ReturnId, FormCode)
ReturnFormLines(ReturnId, FormCode, TaxYear, ClientId, ClientName, ClientTIN, PreparerId, PreparerName, FormName, Status)
R100 | 1040  | 2024 | C7 | Alice Nguyen | XXX-XX-1234 | P3 | John Smith | Individual Income Tax Return | Complete
R100 | SCH-C | 2024 | C7 | Alice Nguyen | XXX-XX-1234 | P3 | John Smith | Profit or Loss from Business | In Review
R100 | W-2   | 2024 | C7 | Alice Nguyen | XXX-XX-1234 | P3 | John Smith | Wage and Tax Statement       | Complete
                                         -- return, client & preparer data repeated on every form row

-- 2NF: remove partial dependencies on the composite key
TaxReturns(ReturnId PK, TaxYear, ClientId, ClientName, ClientTIN, PreparerId, PreparerName)
Forms(FormCode PK, FormName)
ReturnForms(ReturnId FK, FormCode FK, Status)   PK (ReturnId, FormCode)

-- 3NF: remove transitive dependencies ReturnId -> ClientId -> ClientName/TIN, ReturnId -> PreparerId -> PreparerName
Clients(ClientId PK, ClientName, ClientTIN)
Preparers(PreparerId PK, PreparerName, PTIN)
TaxReturns(ReturnId PK, TaxYear, ClientId FK, PreparerId FK)
Forms(FormCode PK, FormName)
ReturnForms(ReturnId FK, FormCode FK, Status)

-- Rebuild the original view with joins
SELECT r.ReturnId, r.TaxYear, c.ClientName, p.PreparerName, f.FormCode, f.FormName, rf.Status
FROM TaxReturns r
JOIN Clients     c  ON c.ClientId   = r.ClientId
JOIN Preparers   p  ON p.PreparerId = r.PreparerId
JOIN ReturnForms rf ON rf.ReturnId  = r.ReturnId
JOIN Forms       f  ON f.FormCode   = rf.FormCode;`,
  tip:"3NF: \"The key, the whole key, and nothing but the key.\" Real-world twist: tax systems often store the client's **filing name/address and the tax rate on the return itself** on purpose – it's a **snapshot of what was filed** for that year (audit trail), not a 3NF violation, because it's a different fact than the client's current name in `Clients`." },

{ cat:"Database Design", q:"Normalization vs denormalization — when to use which?",
  a:["**Normalization** – split data into related tables to **reduce duplication** and protect **data integrity** → more tables & joins",
     "**Denormalization** – intentionally add **redundancy** (fewer joins) to **speed up reads**",
     "Normalize **transactional (OLTP)** systems; denormalize for **reporting, analytics and read-heavy** screens",
     "Risk: normalized → more joins; denormalized → more storage and data that's **harder to keep consistent**",
     "Denormalization examples: storing `order_total`, materialized views, data warehouses (star schema), CQRS read models",
     "Real-world splits: **AGLC** – users, transactions, payments, game activity; **Gi3** – engagements, practitioners, departments, staffing, recommendations; **Alberta Insurance** – customers, policies, coverages, claims"],
  tip:"Normalize for clean transactions; denormalize for faster reporting. Your story (AGLC): normalized Azure SQL for transactions + denormalized reporting models for Power BI dashboards." },

{ cat:"Database Design", q:"What are the types of relationships and how do you model them?",
  a:["**One-to-one** – FK with UNIQUE constraint (user ↔ profile)",
     "**One-to-many** – FK on the \"many\" side (customer → orders)",
     "**Many-to-many** – **junction table** with two FKs (students ↔ courses)"] },

{ cat:"Database Design", q:"Natural key vs surrogate key?",
  a:["**Natural key** – real-world unique value (email, SSN) — can change, may be large",
     "**Surrogate key** – system-generated (`IDENTITY`, sequence, **UUID/GUID**)",
     "Surrogates are stable & compact; still add **UNIQUE** constraints on natural keys",
     "Random GUIDs fragment clustered indexes → use sequential GUIDs / **UUIDv7**"] },

{ cat:"Database Design", q:"What are views, stored procedures, functions and triggers?",
  a:["**View** – saved query / virtual table (security, simplification); **materialized view** stores results",
     "**Stored procedure** – precompiled set of statements; can modify data, return multiple results",
     "**Function** – returns a value/table; usable in SELECT; (usually) no side effects",
     "**Trigger** – runs automatically on INSERT/UPDATE/DELETE (auditing) — use sparingly (hidden logic)"] },

{ cat:"Database Design", q:"How do you prevent SQL injection?",
  a:["**Parameterized queries / prepared statements** — never concatenate user input",
     "ORMs (EF Core, Hibernate) parameterize by default",
     "Least-privilege DB accounts",
     "Validate input; escape identifiers in dynamic SQL (`QUOTENAME`)",
     "Stored procedures help only if they don't build dynamic SQL from input"],
  code:`-- ❌ "SELECT * FROM users WHERE name = '" + input + "'"
-- ✅
SELECT * FROM users WHERE name = @name;` },

// ───────────── NoSQL Fundamentals ─────────────
{ cat:"NoSQL Fundamentals", q:"What is NoSQL and what types exist?",
  a:["Non-relational databases with **flexible schemas** and **horizontal scaling**",
     "**Document** – JSON-like docs: MongoDB, Cosmos DB, Couchbase",
     "**Key-value** – simple key → value, very fast: Redis, DynamoDB",
     "**Wide-column** – rows with dynamic columns, huge write throughput: Cassandra, HBase",
     "**Graph** – nodes & relationships: Neo4j, Cosmos DB Gremlin",
     "Also: time-series (InfluxDB), search (Elasticsearch), vector DBs"] },

{ cat:"NoSQL Fundamentals", q:"SQL vs NoSQL — differences and when to choose which?",
  a:["**SQL**: fixed schema, relations & JOINs, **ACID**, vertical scaling (mostly), powerful ad-hoc queries",
     "**NoSQL**: flexible schema, **denormalized**, **horizontal scaling**, often eventual consistency, query by access pattern",
     "Choose SQL: complex relationships, transactions, reporting, strong consistency (finance, ERP)",
     "Choose NoSQL: massive scale, high write throughput, flexible/evolving data, low latency (catalogs, IoT, sessions, feeds)",
     "Many systems use **both** (polyglot persistence)"] },

{ cat:"NoSQL Fundamentals", q:"What is the CAP theorem?",
  a:["In a distributed system during a **network Partition**, you must choose:",
     "**Consistency** – every read sees the latest write",
     "**Availability** – every request gets a response",
     "**P is unavoidable** → choose **CP** (MongoDB default, HBase) or **AP** (Cassandra, DynamoDB)",
     "**PACELC** extends it: Else (no partition) trade-off **Latency vs Consistency**"] },

{ cat:"NoSQL Fundamentals", q:"ACID vs BASE — what's the difference?",
  a:["**ACID** – Atomicity, Consistency, Isolation, Durability → **strong consistency** (relational DBs); may sacrifice availability to stay correct",
     "**BASE** – **B**asically **A**vailable, **S**oft state, **E**ventual consistency → prioritizes **availability & scale**",
     "BASE trades immediate consistency for availability & horizontal scaling",
     "Use **ACID** for money, insurance, orders; **BASE** for social feeds, activity streams, cached recommendations",
     "Many NoSQL DBs now support **multi-document ACID transactions** too (MongoDB 4+, Cosmos DB within partition)"],
  tip:"ACID is for correctness; BASE is for large-scale availability where eventual consistency is acceptable." },

{ cat:"NoSQL Fundamentals", q:"What is eventual consistency?",
  a:["Replicas may be **temporarily out of sync**, but converge if no new writes",
     "Reads may return **stale** data",
     "Enables high availability & low latency across regions",
     "Variants: read-your-writes, session, causal, bounded staleness"] },

{ cat:"NoSQL Fundamentals", q:"What is sharding vs replication?",
  a:["**Sharding (partitioning)** – split data across nodes by a **shard/partition key** → scale **writes & storage**",
     "**Replication** – copy the same data to multiple nodes → **availability** & read scaling",
     "Usually combined: each shard is a replica set",
     "Bad shard key → **hot partitions**"] },

// ───────────── MongoDB & Document DBs ─────────────
{ cat:"MongoDB & Document DBs", q:"What are MongoDB's core concepts?",
  a:["**Database → Collection → Document** (BSON / JSON-like)",
     "Every document has a unique `_id` (ObjectId by default)",
     "Flexible schema; optional **schema validation**",
     "Rich queries, secondary indexes, **aggregation pipeline**",
     "**Replica sets** (HA) & **sharding** (scale-out)"],
  code:`db.users.find({ age: { $gte: 18 }, city: "Seattle" })
        .sort({ name: 1 }).limit(10);` },

{ cat:"MongoDB & Document DBs", q:"Embedding vs referencing in document databases?",
  a:["**Embed** – store related data **inside** the document → one read, atomic updates",
     "Good for **one-to-few**, data read together, bounded size (address in user)",
     "**Reference** – store IDs to other documents (like FKs) → `$lookup` or multiple queries",
     "Good for **one-to-many/many-to-many**, unbounded growth, shared data",
     "MongoDB doc limit: **16 MB**"],
  tip:"Model for your queries: data accessed together should be stored together." },

{ cat:"MongoDB & Document DBs", q:"What is the MongoDB aggregation pipeline?",
  a:["Series of **stages** transforming documents",
     "`$match` (filter), `$group`, `$project`, `$sort`, `$limit`, `$lookup` (join), `$unwind`, `$addFields`",
     "Put `$match` **early** to use indexes and reduce data"],
  code:`db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 5 }
]);` },

{ cat:"MongoDB & Document DBs", q:"How does indexing work in MongoDB?",
  a:["B-tree indexes: single field, **compound**, multikey (arrays), text, geospatial, hashed, TTL, wildcard",
     "Compound index follows **ESR rule**: **E**quality → **S**ort → **R**ange",
     "Check with `.explain(\"executionStats\")` — look for `COLLSCAN` (bad) vs `IXSCAN`",
     "**TTL index** auto-deletes expired docs (sessions, logs)"] },

// ───────────── Redis & Key-Value ─────────────
{ cat:"Redis & Key-Value", q:"What is Redis and its common use cases?",
  a:["**In-memory** key-value data store — sub-millisecond latency",
     "Data types: **strings, hashes, lists, sets, sorted sets**, streams, bitmaps, HyperLogLog, JSON, vectors",
     "Use cases: **caching**, sessions, rate limiting, leaderboards (sorted sets), pub/sub, queues, distributed locks",
     "Persistence options: **RDB** snapshots, **AOF** log",
     "Scaling: replication, Sentinel (HA), **Redis Cluster** (sharding)"] },

{ cat:"Redis & Key-Value", q:"What are caching strategies?",
  a:["**Cache-aside (lazy loading)** – app checks cache → miss → read DB → populate cache (most common)",
     "**Read-through** – cache loads from DB itself",
     "**Write-through** – write to cache **and** DB synchronously",
     "**Write-behind** – write to cache, DB updated **asynchronously** (risk of loss)",
     "Always set **TTL**; plan **invalidation**"],
  tip:"\"There are only two hard things in CS: cache invalidation and naming things.\"" },

{ cat:"Redis & Key-Value", q:"What are cache stampede, penetration and avalanche?",
  a:["**Stampede** – hot key expires, many requests hit DB at once → use **locking / single-flight**, early refresh",
     "**Penetration** – requests for keys that **don't exist** bypass cache → cache **null** results, **Bloom filter**",
     "**Avalanche** – many keys expire **at the same time** → add **TTL jitter**, multi-level cache"] },

// ───────────── Other NoSQL ─────────────
{ cat:"Other NoSQL", q:"What is Cassandra and when would you use it?",
  a:["**Wide-column**, masterless (peer-to-peer) distributed DB",
     "Massive **write throughput**, linear scaling, multi-datacenter",
     "**AP** with **tunable consistency** (`ONE`, `QUORUM`, `ALL`)",
     "Model tables **per query**; partition key + clustering columns",
     "Use for: time-series, IoT, logs, messaging at scale"] },

{ cat:"Other NoSQL", q:"What is DynamoDB / Cosmos DB partition key design?",
  a:["Partition key determines **data distribution** and **scalability**",
     "Choose **high-cardinality**, evenly accessed keys (userId, deviceId)",
     "Avoid **hot partitions** (e.g. date as key, status as key)",
     "Queries within one partition are cheapest; cross-partition = fan-out",
     "DynamoDB: **single-table design** with PK/SK + GSIs; Cosmos DB: RU-based throughput, 5 consistency levels"] },

{ cat:"Other NoSQL", q:"When would you use a graph database?",
  a:["Data where **relationships are first-class**: social networks, recommendations, fraud detection, knowledge graphs, network topology",
     "Traversing many hops is fast (no expensive multi-joins)",
     "Query languages: **Cypher** (Neo4j), Gremlin, SPARQL"],
  code:`MATCH (me:Person {name:'Ann'})-[:FRIEND]->()-[:FRIEND]->(fof)
WHERE NOT (me)-[:FRIEND]->(fof) AND me <> fof
RETURN DISTINCT fof.name;   // friends of friends` }
];

PREP_DATA.push(...[

// ───────────── Advanced: SQL Internals ─────────────
{ cat:"Advanced: SQL Internals", q:"How does MVCC (Multi-Version Concurrency Control) work?",
  a:["Writers create **new row versions** instead of overwriting in place",
     "Readers see a **snapshot** as of their transaction/statement start",
     "**Readers don't block writers, writers don't block readers**",
     "PostgreSQL: old versions cleaned by **VACUUM**; SQL Server: version store in tempdb (RCSI / Snapshot)",
     "Write–write conflicts still need locks or abort"] },

{ cat:"Advanced: SQL Internals", q:"What is the write-ahead log (WAL) / transaction log?",
  a:["Changes are written to a **sequential log before** data pages",
     "Guarantees **durability** & crash recovery (redo/undo)",
     "Enables **replication**, point-in-time restore, change data capture",
     "Sequential writes are fast; data pages flushed later (checkpoints)"] },

{ cat:"Advanced: SQL Internals", q:"What is parameter sniffing and how do you fix it?",
  a:["SQL Server compiles a plan using the **first parameter values** and **caches** it",
     "Great for typical values, **terrible for skewed** ones (e.g. a customer with 1M orders)",
     "Fixes: `OPTION (RECOMPILE)`, `OPTIMIZE FOR`, query store **plan forcing**, split procedures",
     "SQL Server 2022: **Parameter Sensitive Plan** optimization (multiple plans)"] },

{ cat:"Advanced: SQL Internals", q:"How do database statistics affect query plans?",
  a:["Statistics = **histograms** of column value distribution",
     "Optimizer uses them to **estimate row counts** → choose join types, index usage, memory grants",
     "**Stale stats** → bad estimates → bad plans (spills, wrong join type)",
     "Update with auto-stats, `UPDATE STATISTICS` / `ANALYZE`"] },

{ cat:"Advanced: SQL Internals", q:"What is lock escalation and what are lock types?",
  a:["Lock types: **Shared (S)** for reads, **Exclusive (X)** for writes, **Update (U)**, **Intent (IS/IX)** at higher levels",
     "Granularity: row → page → table",
     "**Lock escalation**: many row locks converted to a **table lock** (SQL Server ~5,000 locks) → blocks others",
     "Mitigate: batch large updates, proper indexes, snapshot isolation"] },

// ───────────── Advanced: Query Patterns ─────────────
{ cat:"Advanced: Query Patterns", q:"How do you solve the 'gaps and islands' problem?",
  a:["Find **consecutive runs** (islands) or missing ranges (gaps) in sequences/dates",
     "Trick: `value - ROW_NUMBER()` is **constant within an island**",
     "Group by that difference"],
  code:`SELECT MIN(d) AS start_day, MAX(d) AS end_day
FROM (
  SELECT login_date AS d,
         DATEADD(day, -ROW_NUMBER() OVER (ORDER BY login_date), login_date) AS grp
  FROM logins WHERE user_id = 1
) t
GROUP BY grp;` },

{ cat:"Advanced: Query Patterns", q:"How do you compute running totals and moving averages?",
  a:["`SUM(x) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` – running total",
     "`AVG(x) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` – 7-day moving average",
     "Prefer `ROWS` over default `RANGE` (faster, predictable with ties)"] },

{ cat:"Advanced: Query Patterns", q:"What is an UPSERT and how is it done?",
  a:["Insert if not exists, otherwise update",
     "PostgreSQL: `INSERT … ON CONFLICT (key) DO UPDATE`",
     "MySQL: `INSERT … ON DUPLICATE KEY UPDATE`",
     "SQL Server: `MERGE` (watch race conditions → `HOLDLOCK`) or UPDATE-then-INSERT in a transaction",
     "Requires a **unique constraint** to be safe under concurrency"],
  code:`INSERT INTO stock (sku, qty) VALUES ('A1', 5)
ON CONFLICT (sku) DO UPDATE SET qty = stock.qty + EXCLUDED.qty;` },

{ cat:"Advanced: Query Patterns", q:"What are PIVOT / conditional aggregation?",
  a:["Turn **rows into columns** (e.g. monthly sales per product)",
     "Portable way: **conditional aggregation** with `SUM(CASE WHEN …)`",
     "SQL Server also has `PIVOT` / `UNPIVOT`; PostgreSQL `crosstab` or `FILTER`"],
  code:`SELECT product,
  SUM(CASE WHEN month = 1 THEN amount END) AS jan,
  SUM(CASE WHEN month = 2 THEN amount END) AS feb
FROM sales GROUP BY product;` },

// ───────────── Advanced: Scaling & Architecture ─────────────
{ cat:"Advanced: Scaling & Architecture", q:"How do you scale a relational database (SQL scalability)?",
  a:["**Vertical** scaling (bigger server) first",
     "**Indexing & query tuning**, caching (Redis), **connection pooling**",
     "**Read replicas** for read-heavy workloads (watch replication lag)",
     "**Partitioning** tables (by date/range) for manageability",
     "**Sharding** across servers (app-level or Citus/Vitess) — complex: cross-shard joins/transactions",
     "CQRS: separate read models; archive old data"],
  tip:"For high-scale systems, combine relational consistency with read models or distributed caches. Your story (Gi3 / AGLC): SQL Server / PostgreSQL / Azure SQL alongside Redis, Cosmos DB and analytics stores." },

{ cat:"Advanced: Scaling & Architecture", q:"What is table partitioning and how does it differ from sharding?",
  a:["**Partitioning** – split one table into parts **within one DB server** (range/list/hash)",
     "Benefits: **partition pruning**, fast archival (switch/drop partition), maintenance",
     "**Sharding** – split data across **multiple servers**",
     "Partitioning helps manageability; sharding helps **scale-out**"] },

{ cat:"Advanced: Scaling & Architecture", q:"How do you handle distributed transactions across services/databases?",
  a:["**2PC (two-phase commit)** – coordinator prepare/commit; strong but slow & blocking",
     "Microservices prefer **Saga pattern**: sequence of local transactions + **compensating actions**",
     "**Outbox pattern**: write data + event in the **same local transaction**, publish later → no dual-write problem",
     "Design for **idempotency** and eventual consistency"] },

{ cat:"Advanced: Scaling & Architecture", q:"What is OLTP vs OLAP?",
  a:["**OLTP** – many small, fast transactions; normalized; row-store (orders, banking)",
     "**OLAP** – complex analytical queries over large data; denormalized (**star/snowflake schema**); **columnar** storage",
     "Columnar = read only needed columns + great compression",
     "Data flows OLTP → ETL/ELT → warehouse/lakehouse (Synapse, Snowflake, BigQuery, Fabric)"] },

{ cat:"Advanced: Scaling & Architecture", q:"What is Change Data Capture (CDC)?",
  a:["Captures **inserts/updates/deletes** from the DB log",
     "Streams changes to other systems (search index, cache, data warehouse, events)",
     "Tools: **Debezium**, SQL Server CDC, DynamoDB Streams, Cosmos DB change feed, MongoDB change streams",
     "Avoids dual writes; enables event-driven architecture"] },

// ───────────── Advanced: NoSQL Deep Dive ─────────────
{ cat:"Advanced: NoSQL Deep Dive", q:"What is consistent hashing?",
  a:["Maps both nodes and keys onto a **hash ring**",
     "Each key goes to the **next node clockwise**",
     "Adding/removing a node moves only **~1/N of keys** (vs rehashing everything)",
     "**Virtual nodes** balance load",
     "Used in Cassandra, DynamoDB, distributed caches"] },

{ cat:"Advanced: NoSQL Deep Dive", q:"How do quorum reads and writes work (R + W > N)?",
  a:["**N** = replicas, **W** = acks needed for a write, **R** = replicas read",
     "If **R + W > N**, read and write sets overlap → read sees latest write (strong consistency)",
     "Example N=3: W=2, R=2 → `QUORUM`",
     "Lower R/W → faster but possibly stale",
     "Conflicts resolved with timestamps (last-write-wins), vector clocks, or read repair"] },

{ cat:"Advanced: NoSQL Deep Dive", q:"How do LSM trees differ from B-trees?",
  a:["**B-tree** – update in place; great **reads**; random writes (relational DBs, MongoDB WiredTiger)",
     "**LSM tree** – writes go to memory (**memtable**) + log, flushed to immutable sorted files (**SSTables**), merged by **compaction**",
     "LSM: very fast **writes**; reads may check multiple files (**Bloom filters** help)",
     "Used by Cassandra, RocksDB, HBase, LevelDB"] },

{ cat:"Advanced: NoSQL Deep Dive", q:"How do you model data in NoSQL for access patterns (single-table design)?",
  a:["Start from **queries**, not entities",
     "Denormalize and **duplicate** data to serve each query with one request",
     "DynamoDB: generic `PK` / `SK` (e.g. `CUSTOMER#1` / `ORDER#2024-10`) to store related items together",
     "**GSIs** for alternate access patterns",
     "Trade-off: harder ad-hoc queries & updates of duplicated data"] },

{ cat:"Advanced: NoSQL Deep Dive", q:"How do you implement a distributed lock or rate limiter with Redis?",
  a:["**Lock**: `SET key token NX PX 30000` (set if not exists with expiry); release only if token matches (Lua script)",
     "Redlock across multiple Redis nodes (debated — use fencing tokens for correctness)",
     "**Rate limiter**: `INCR` + `EXPIRE` (fixed window) or **sorted set sliding window** / token bucket in Lua",
     "Atomicity via **Lua scripts** or `MULTI/EXEC`"] },

// ───────────── Advanced: Scenario-based ─────────────
{ cat:"Advanced: Scenario-based", q:"A query was fast yesterday and is slow today. How do you investigate?",
  a:["Compare **execution plans** (Query Store / pg_stat_statements)",
     "Check **parameter sniffing**, **stale statistics**, data growth",
     "Check **blocking/locks**, deadlocks, waits (`sys.dm_os_wait_stats`, `pg_locks`)",
     "Index fragmentation or dropped index",
     "Server resources: CPU, memory, IO, tempdb",
     "Recent deployments / schema changes"] },

{ cat:"Advanced: Scenario-based", q:"Design the database for an e-commerce system. SQL or NoSQL?",
  a:["**Orders, payments, inventory** → **SQL** (ACID, relations)",
     "**Product catalog** with varied attributes → document DB or JSON columns",
     "**Cart / sessions** → Redis",
     "**Search** → Elasticsearch / Azure AI Search",
     "**Analytics** → data warehouse",
     "Keep in sync with events / CDC → **polyglot persistence**"] }

].map(q => ({ ...q, level:'Advanced' })));
