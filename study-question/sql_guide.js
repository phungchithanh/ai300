// SQL & NoSQL — extra questions from the docx study guides in "Study resources Questions" (deduplicated against sql_data.js).
PREP_DATA.push(...[

{ cat:"Database Design", q:"What is the difference between 2NF and 3NF? Give an example.",
  a:["**2NF** removes **partial dependency** – non-key columns must depend on the **whole composite key**",
     "Ex: `Assignment(EngagementId, PractitionerId, PractitionerName, Hours)` → PractitionerName depends only on PractitionerId → move to `Practitioner` table",
     "**3NF** removes **transitive dependency** – non-key columns must not depend on **other non-key columns**",
     "Ex: `Practitioner(Id, DeptName, DeptManager)` → DeptManager depends on DeptName → move to `Department` table",
     "1NF first: one atomic value per cell (no `\"John, Mike, Sarah\"` lists)"],
  tip:"2NF = depend on the **whole** key; 3NF = depend on **nothing but** the key." },

{ cat:"Database Design", q:"Can views improve performance? Normal vs indexed/materialized views?",
  a:["A **normal view** is a saved query — **no stored data**, no performance gain by itself",
     "Benefits: simplify complex joins, security, stable read model for reports",
     "**Indexed view** (SQL Server) / **materialized view** (PostgreSQL, Oracle) **stores the result** → faster reads",
     "Cost: storage + slower writes / needs refresh",
     "Good for reporting & dashboards with expensive aggregations"] },

{ cat:"Database Design", q:"Database function vs stored procedure — what's the difference?",
  a:["**Purpose** – a **function** returns a value or a table (reusable calculation/filtering); a **stored procedure** performs a workflow (business transaction, batch process)",
     "**Use in a query** – functions work inside `SELECT` / `WHERE` / `JOIN` (`CROSS APPLY` for table-valued); procedures **can't** — run them with `EXEC` (SQL Server) / `CALL` (PostgreSQL)",
     "**Data modification** – limited for functions: SQL Server functions **can't** change table data (PostgreSQL ones can, but keep functions side-effect free); procedures are the normal place for INSERT/UPDATE/DELETE workflows",
     "**Return** – a function **must** return a value/table; for a procedure it's optional (return code, `OUTPUT` parameters, result sets)",
     "**Transactions & errors** – procedures can `BEGIN TRAN` / `COMMIT` / `ROLLBACK` and use `TRY…CATCH`; SQL Server functions can't (and can't call procedures)",
     "⚠️ A SQL Server **scalar function** in `SELECT`/`WHERE` runs **once per row** and can block parallelism → prefer **inline table-valued functions** (SQL Server 2019+ can inline some scalar UDFs)"],
  code:`-- Function: reusable calculation, usable inside a query
CREATE FUNCTION dbo.fn_GetEngagementStatus (@Hours INT)
RETURNS VARCHAR(20)
AS
BEGIN
    RETURN CASE WHEN @Hours > 40 THEN 'Overloaded' ELSE 'Normal' END;
END;
GO

-- Stored procedure: workflow that changes data
-- (in real code avoid the sp_ prefix — SQL Server reserves it for system procedures)
CREATE PROCEDURE dbo.sp_CreateEngagementAssignment
    @EngagementId   VARCHAR(20),
    @PractitionerId VARCHAR(20),
    @HoursAssigned  INT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO EngagementAssignments (EngagementId, PractitionerId, HoursAssigned)
    VALUES (@EngagementId, @PractitionerId, @HoursAssigned);
END;
GO

-- Usage
SELECT PractitionerId, dbo.fn_GetEngagementStatus(HoursAssigned) AS LoadStatus
FROM EngagementAssignments;

EXEC dbo.sp_CreateEngagementAssignment @EngagementId = 'E100', @PractitionerId = 'P1', @HoursAssigned = 40;`,
  tip:"Use functions inside queries for calculations; use stored procedures for workflows and transactions. Your story (Gi3 / GOA): functions for reusable calculations & reporting, stored procedures for transactional, high-performance database workflows." },

{ cat:"Indexes & Performance", q:"Why and when do you rebuild or reorganize an index?",
  a:["You rebuild a database index mainly to **fix index fragmentation and improve query performance**",
     "An index is like a **table of contents** for a database table. Over time, when data is inserted, updated, or deleted, the index pages can become messy or **fragmented**",
     "When that happens, SQL Server may need to **read more pages than necessary**, which can slow down queries",
     "We rebuild indexes to reduce fragmentation caused by frequent **inserts, updates, and deletes**. A fragmented index can **increase page reads** and slow down query performance",
     "**Rebuilding** the index recreates the index structure, **compacts pages**, and can improve read performance",
     "**Project example – Gi3 Engagement Management**: indexes on fields such as `EngagementId`, `ClientId`, `Status`, and `CreatedDate` could become fragmented after heavy data imports or updates, so rebuilding them as part of **database maintenance** helps keep search and reporting queries fast",
     "**What causes it** – inserts/updates/deletes cause **page splits → fragmentation** and half-empty pages",
     "**Reorganize** – light, online defrag → ~**5–30%** fragmentation",
     "**Rebuild** – drops & recreates index (also refreshes statistics) → **> 30%**",
     "Do it after bulk loads, mass deletes, migrations; schedule in maintenance windows",
     "Check with `sys.dm_db_index_physical_stats`"],
  code:`ALTER INDEX IX_Engagement_ClientId ON Engagements REORGANIZE;
ALTER INDEX ALL ON Engagements REBUILD WITH (ONLINE = ON);  -- Enterprise / Azure SQL`,
  tip:"On SSDs, fragmentation matters less — up-to-date **statistics** often matter more." },

{ cat:"SQL Basics", q:"What is PostgreSQL and what are its strengths?",
  a:["Open-source, **standards-compliant** relational database",
     "Rich types: **JSONB** (indexed JSON), arrays, ranges, UUID, full-text search",
     "Advanced indexes: B-tree, **GIN**, GiST, BRIN, partial & expression indexes",
     "**MVCC** concurrency, CTEs, window functions, `ON CONFLICT` upsert",
     "**Extensions**: PostGIS, pgvector, Citus (sharding)",
     "Managed on Azure (Flexible Server), AWS RDS/Aurora, GCP"] },

{ cat:"SQL Basics", q:"What Oracle-specific concepts are commonly asked?",
  a:["**PL/SQL** – procedural extension: procedures, functions, **packages** (spec + body), triggers",
     "**Sequences** for IDs (or identity columns in 12c+)",
     "`ROWNUM` / `FETCH FIRST n ROWS ONLY` for paging; `DUAL` table; `NVL` / `NVL2`",
     "Execution plans via `EXPLAIN PLAN` / AWR reports; optimizer hints",
     "Tablespaces, schemas = users, **RAC** for clustering, Data Guard for DR"] },

{ cat:"SQL Basics", q:"Do you have relational database experience? (How to answer)",
  a:["Open with a clear **yes** — extensive experience with **SQL Server, Oracle 19c/21c, PostgreSQL and Azure SQL**",
     "Cover the full lifecycle: **schema design**, **stored procedures**, **indexes**, **query/performance tuning**, reporting and **data integrity**",
     "Data access from .NET: **Entity Framework** and **NHibernate**",
     "Reporting & ETL tooling: **SSIS** and **SSRS**",
     "Domains: **financial, insurance, education, gaming** and **engagement-management** systems",
     "Finish with one **concrete story** — a slow query you tuned or a schema you designed — and its measurable result"],
  tip:"Your stories: **Oracle 19c** at Treasury Board & Finance / Enbridge (with .NET Core APIs), **Azure SQL** at AGLC (financial/transactional integrity), **PostgreSQL** at Gi3 (cloud-native microservices)." },

{ cat:"Advanced: Scaling & Architecture", level:"Advanced", q:"What are ETL, data warehouse and data lake?",
  a:["**ETL** – Extract, Transform, Load (transform **before** loading); **ELT** – load raw first, transform in the target",
     "**Data warehouse** – **structured, curated** data for BI/reporting (star schema) – Synapse, Snowflake, Fabric Warehouse",
     "**Data lake** – **raw** structured + semi/unstructured data at scale (ADLS, S3) for analytics/ML",
     "**Lakehouse** – lake storage + warehouse features (Delta/Parquet, Databricks, Fabric)",
     "Orchestration: **Azure Data Factory**, Airflow; transform: Databricks/Spark, dbt"] }

]);
