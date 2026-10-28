// AI — applied GenAI questions: executive-grade outputs, prompt design, data grounding, structured retrieval & RAG,
// critical evaluation of AI output (accuracy, risk, hallucination, sensitivity) and AI-augmented workflows.
PREP_DATA.push(...[

// ───────────── Applied GenAI: Executive Outputs ─────────────
{ cat:"Applied GenAI: Executive Outputs", q:"What makes an output \"executive-grade\", and how do you get GenAI to produce one?",
  a:["**Answer first** (BLUF / Pyramid Principle) – the conclusion, decision or ask in the first two lines, then the support",
     "**So what?** – every point is tied to impact: cost, revenue, risk, timeline or options",
     "**Short & scannable** – one page, 3–5 bullets per section, plain language, no filler or AI-isms (\"delve\", \"in today's fast-paced world\")",
     "**Accurate & consistent** – numbers reconcile, facts are sourced, assumptions are stated",
     "Prompt with the **audience, purpose, decision needed, format and length**, plus a **good example**; SCQA (Situation, Complication, Question, Answer) is a useful structure",
     "AI drafts – **you own** the final judgment, facts and tone"],
  code:`Audience: CFO and COO – 5-minute read before the steering committee
Goal:     decide whether to extend the pilot to 3 more regions
Format:   BLUF (2 sentences) → 3 findings with numbers + source
          → options with cost/risk → recommendation → open questions
Rules:    use only the attached data; mark gaps as [MISSING]; max 300 words`,
  tip:"Executives skim: if they read only the first two lines, they should know the answer and the ask." },

{ cat:"Applied GenAI: Executive Outputs", q:"How do you use GenAI to turn long or messy source material into an executive briefing?",
  a:["**1. Scope** – collect the right sources and write down the one question the briefing must answer",
     "**2. Extract** – per document, pull key facts, numbers and quotes **with source/page references** (map step)",
     "**3. Synthesize** – merge the extracts into themes, conflicts and gaps (reduce step); avoids context limits and \"lost in the middle\"",
     "**4. Outline → draft** – agree the storyline (BLUF + 3 key points + ask) before generating prose",
     "**5. Critique & verify** – have the model challenge the draft, then check every number and claim against the extracts",
     "**6. Finalize** – human edit for tone, politics and sensitivity; list sources and assumptions"],
  tip:"Extract → synthesize → outline → draft → verify. Don't jump from 200 pages to a final memo in one prompt." },

{ cat:"Applied GenAI: Executive Outputs", q:"How do you use GenAI for analysis without getting made-up numbers or false conclusions?",
  a:["LLMs **predict text** – they can be unreliable at exact arithmetic, counting and large tables, and invented numbers look plausible",
     "Give the model the **actual data** (file or table) – never ask for figures from memory",
     "Use **code execution** (data-analysis / code-interpreter tools, Python, Copilot in Excel) so numbers are **computed, not generated** – and review the code",
     "Ask for the **method and assumptions**; reconcile totals with the source system and spot-check a sample by hand",
     "Separate **facts** (from the data) from **interpretation** (the model's reasoning) and label confidence",
     "Use AI to **find patterns, generate hypotheses and draft the narrative** – confirm conclusions with evidence before they reach a decision-maker"],
  tip:"Let the model write the code, let the code do the math, and let a human sign off on the conclusion." },

// ───────────── Applied GenAI: Prompt Design ─────────────
{ cat:"Applied GenAI: Prompt Design", q:"How do you structure a prompt for a complex, high-stakes deliverable?",
  a:["**Role** – the perspective the model should take (strategy consultant, risk reviewer, CFO)",
     "**Context** – background, audience, constraints and the **source material**, clearly delimited",
     "**Task** – one clear objective, with numbered steps for multi-part work",
     "**Output** – format, length, structure, tone, and what to do when information is missing",
     "**Examples** – a short sample of \"good\" sets the quality bar better than adjectives",
     "**Guardrails** – use only the provided sources, cite them, don't invent numbers, flag uncertainty"],
  code:`# Role
You are a senior strategy consultant writing for a CEO.
# Context
<background>...</background>
<sources>...</sources>   (use ONLY these)
# Task
1. Identify the 3 most material risks in the sources.
2. For each: impact, likelihood and evidence [doc, page].
# Output
2-sentence BLUF + a table. Max 250 words.
If something is not in the sources, write "Not in sources".`,
  tip:"Role, Context, Task, Output, Examples, Guardrails – vague prompts get generic answers." },

{ cat:"Applied GenAI: Prompt Design", q:"The AI output isn't good enough. How do you iterate on the prompt?",
  a:["**Diagnose the gap**: wrong facts → add or ground sources; wrong focus → sharpen the task; wrong shape → specify the format; too generic → add audience and examples",
     "Change **one thing at a time** and compare outputs side by side",
     "Ask the model to **ask you clarifying questions first**, or to list the information it is missing",
     "Split the work into **smaller steps** (outline first, then sections) instead of one mega-prompt",
     "Give **specific feedback** on the draft (\"lead with the recommendation, cut section 3, max 200 words\") instead of starting over",
     "Save the version that works as a **template**, with a few test inputs to re-check it later"],
  tip:"Treat prompts like code: debug, test, version and reuse." },

{ cat:"Applied GenAI: Prompt Design", q:"What is the draft → critique → revise pattern, and why does it improve quality?",
  a:["Generate a **draft**, have the model **critique it against explicit criteria** (accuracy, clarity, so-what, missing risks), then **revise**",
     "Reviewing is easier than generating – a focused critique pass catches issues the drafting pass missed",
     "Use **perspective reviews**: \"review this as a skeptical CFO / legal counsel / someone who disagrees\"",
     "**Self-consistency** for key judgments – generate several independent answers; disagreement signals uncertainty to investigate",
     "Use a **separate prompt or model** as the reviewer to reduce self-agreement",
     "Still no substitute for **human verification** of facts and numbers"],
  code:`Step 1: Draft the memo from <sources>.
Step 2: You are a skeptical CFO. List the 5 weakest points in the draft:
        unsupported claims, missing risks, unclear asks.
Step 3: Revise the draft to fix each point. Mark anything you could not
        verify from <sources> as [UNVERIFIED].`,
  tip:"Draft → critique → revise turns a single shot into a mini editorial process." },

{ cat:"Applied GenAI: Prompt Design", q:"How do you get reliable structured output (JSON, tables) from an LLM for automation?",
  a:["Define an explicit **schema**: fields, types, allowed values (enums), required fields",
     "Use the platform feature – **Structured Outputs / JSON-schema mode** or **function calling** – so the model is constrained to the schema",
     "Add 1–2 **examples**, keep **temperature low**, and say what to return when data is missing (`null`, never a guess)",
     "**Validate in code** (parse + schema check + business rules) and **retry** with the error message if it fails",
     "Keep **extraction** and **reasoning** separate: extract the fields first, analyze in a second step",
     "Log failures – they reveal unclear instructions or messy inputs"],
  code:`{ "type": "object",
  "properties": {
    "risk":       { "type": "string" },
    "severity":   { "type": "string", "enum": ["Low", "Medium", "High"] },
    "owner":      { "type": ["string", "null"] },
    "source_ref": { "type": "string" } },
  "required": ["risk", "severity", "owner", "source_ref"],
  "additionalProperties": false }`,
  tip:"Schema in, validated JSON out – never parse free text when a workflow depends on it." },

{ cat:"Applied GenAI: Prompt Design", q:"How do you build and maintain a reusable prompt library for yourself or your team?",
  a:["Capture prompts that **consistently work** for recurring tasks: executive summary, meeting recap, risk review, research brief, email reply",
     "Turn them into **templates with placeholders** (`{audience}`, `{sources}`, `{word_limit}`) plus a sample of good output",
     "Note the **purpose, best tool/model, known limitations** and a short review checklist for each",
     "**Version** them and re-test on a few saved inputs when models or tools change",
     "Share them in a team space (SharePoint, OneNote, Git, custom GPT / Copilot agent instructions) and collect feedback",
     "Retire prompts that no longer add value – quality over quantity"],
  tip:"A prompt library turns one-off wins into repeatable routines for the whole team." },

// ───────────── Applied GenAI: Retrieval & RAG ─────────────
{ cat:"Applied GenAI: Retrieval & RAG", q:"What is data grounding, and how do you ground AI answers in trusted data?",
  a:["**Grounding** = anchoring the model's answer in **specific, trusted data supplied at run time** – the model isn't retrained: update the data and the answers change",
     "Why: built-in knowledge is **generic, frozen at a training cutoff and unsourced** – grounding adds **private, current, traceable** facts and cuts hallucinations",
     "Common **grounding sources**:",
     "  • **Prompt context** – paste or attach the source material (a few documents, one-off tasks)",
     "  • **RAG over documents** – retrieve the most relevant passages from a search index at query time",
     "  • **Structured data & APIs** – query databases and business systems via tool / function calling or text-to-SQL for exact, live numbers",
     "  • **Web search** – public, recent information, e.g. Grounding with Bing Search (Foundry Agent Service), Grounding with Google Search (Gemini)",
     "  • **Enterprise graph** – e.g. Microsoft 365 Copilot grounds prompts in your emails, files, chats and meetings via Microsoft Graph, within your permissions",
     "**Instruct** the model: answer only from the sources, cite them, and say \"not found\" instead of guessing from memory",
     "**Verify**: check citations, run groundedness checks (e.g. Azure AI Content Safety groundedness detection, Foundry or Ragas evaluators), human review when stakes are high",
     "Grounding **reduces, but doesn't eliminate**, errors – retrieval can miss, data can be stale or wrong, and the model can still misread it or mix in its own knowledge"],
  code:`Question: "How did EMEA revenue change in Q3?"

Ungrounded → the model has no access to your numbers: it declines,
             or worse, invents a plausible figure

Grounded   → 1. Tool call: get_revenue(region="EMEA", quarter="Q3")
                returns { "q2": 41.2, "q3": 44.9, "change_pct": 9.0,
                          "source": "Finance DW, refreshed 2026-10-01" }
             2. Prompt: answer ONLY from this data, cite the source,
                say "not in the data" if something is missing
             3. Answer: "EMEA revenue grew 9.0% in Q3 (41.2M → 44.9M)
                [Finance DW, refreshed 2026-10-01]"`,
  tip:"Grounding is the goal, RAG is one way to get there: every key claim should trace back to trusted data." },

{ cat:"Applied GenAI: Retrieval & RAG", q:"How do you get data ready for grounding, and why does data quality matter so much?",
  a:["A grounded model repeats what it retrieves – **outdated, duplicate or wrong content turns into a confident, cited wrong answer**",
     "**Authoritative** – one source of truth per topic; archive or exclude old versions, drafts and duplicates (ROT: redundant, obsolete, trivial content)",
     "**Fresh** – named owners and review dates; re-index on a schedule so answers reflect current policies, prices and numbers",
     "**Permission-safe** – fix oversharing before rollout; users must only get answers from content they are allowed to see (security trimming, sensitivity labels)",
     "**Retrievable** – clear titles and headings, metadata (owner, date, region, doc type), text extracted from scans and tables, consistent terms",
     "**Complete** – confirm the content behind the most common questions actually exists; log \"not found\" questions to find gaps",
     "**Governed** – a process to update and retire content, plus monitoring of which sources get retrieved and cited"],
  tip:"Many grounding failures are really data problems – clean up and govern the content before tuning prompts or models." },

{ cat:"Applied GenAI: Retrieval & RAG", q:"What is structured retrieval, and how does it differ from plain semantic (vector) search?",
  a:["**Semantic search** finds text that is **similar in meaning** – great for open questions, weak for exact filters, numbers and joins",
     "**Structured retrieval** uses structure to fetch **exactly** the right records:",
     "  • **Metadata filters / facets** – date, client, region, document type, sensitivity label",
     "  • **Text-to-SQL / APIs** – the LLM turns the question into a query over tables (read-only, validated, query shown to the user)",
     "  • **Knowledge graphs / GraphRAG** – entities and relationships for multi-hop and whole-corpus questions",
     "  • **Pre-extracted fields** – pull key fields from documents into a table once, then query them reliably",
     "Best practice: **combine** – filter by structure first, then rank by meaning (hybrid search + re-ranking)"],
  code:`Q: "Which EMEA projects are over budget and have open high-severity risks?"

Structured part (exact) → SQL over project data:
  SELECT DISTINCT p.name, p.budget_variance
  FROM projects p JOIN risks r ON r.project_id = p.id
  WHERE p.region = 'EMEA' AND p.budget_variance > 0
    AND r.severity = 'High' AND r.status = 'Open';

Unstructured part (the "why") → vector search over those projects' status reports`,
  tip:"Use structure to decide WHICH records, semantics to understand WHAT they say." },

{ cat:"Applied GenAI: Retrieval & RAG", q:"How do you use GenAI to extract structured data from unstructured documents (contracts, reports, invoices)?",
  a:["Define the **target schema** first: fields, types, allowed values and how to represent \"not found\"",
     "Pre-process PDFs and scans with OCR / layout extraction (e.g. **Azure AI Document Intelligence**) and keep page numbers",
     "Have the model fill the schema and give the **exact quote + page** as evidence for each field",
     "**Validate**: types, ranges and cross-field rules (end date after start date, totals add up)",
     "Route **missing or low-confidence** fields to a human reviewer; sample-audit the rest",
     "Measure field-level **accuracy** on a small labeled set before scaling up"],
  code:`{ "counterparty": "Contoso Ltd",
  "renewal_date": "2026-03-31",
  "auto_renew": true,
  "termination_notice_days": 90,
  "evidence": {
    "termination_notice_days": "p.12 – ninety (90) days written notice" } }`,
  tip:"Schema + evidence quote + validation + human review of exceptions = trustworthy extraction." },

{ cat:"Applied GenAI: Retrieval & RAG", q:"When do you paste documents straight into a long-context model, and when do you build RAG instead?",
  a:["**Long context** – a few documents, a one-off analysis, or reasoning across the whole text (compare two contracts, summarize one report)",
     "**RAG** – a large or growing corpus, repeated questions, many users, **per-document access control**, citations at scale",
     "Long context costs more per call, is slower, and can miss details buried mid-document (\"**lost in the middle**\")",
     "RAG can miss context when retrieval fails – answers are only as good as the chunks it finds",
     "**Hybrid**: retrieve the most relevant documents, then pass them **in full** to a long-context model",
     "Either way: ask for citations and verify the key facts"],
  tip:"Few docs + deep reasoning → long context. Big, changing, shared knowledge → RAG." },

{ cat:"Applied GenAI: Retrieval & RAG", q:"How do you make AI answers traceable, with citations you can actually trust?",
  a:["Keep **source metadata** on every chunk: document, section, page, date, owner, link",
     "Prompt: answer **only from the sources**, cite `[doc, page]` after each claim, and say \"not found\" otherwise",
     "**Quote first, then answer** – have the model pull the supporting quotes, then write the answer from those quotes",
     "**Verify citations** – a model can cite a real source that doesn't support the claim; spot-check or use automated groundedness checks",
     "Show users the **source snippet or link** so they can verify in one click",
     "Prefer recent, authoritative sources, and **flag conflicts** between sources instead of silently picking one"],
  tip:"A citation is only useful if it actually supports the sentence next to it – check it." },

{ cat:"Applied GenAI: Retrieval & RAG", q:"What is agentic RAG, and when do you need it instead of a single retrieve-then-answer step?",
  a:["**Classic RAG** – one search, top-k chunks, one answer; fine for simple lookups",
     "**Agentic RAG** – an agent **plans the retrieval**: rewrites or splits the question, picks tools (vector search, SQL, web, APIs), retrieves **iteratively** and checks whether it has enough evidence",
     "Needed for **multi-hop** questions (\"compare our Q3 margin with our top 3 competitors and explain the gap\"), mixed structured + unstructured data, and research tasks",
     "Patterns: query decomposition, routing to the right index, self-reflection (\"is this answered? what's missing?\"), corrective re-retrieval",
     "Costs: more latency, tokens and failure modes – set **step limits**, log every tool call, evaluate end to end"],
  tip:"Use the simplest retrieval that answers the question; escalate to agentic RAG only for multi-step research.",
  level:"Advanced" },

// ───────────── Applied GenAI: Evaluating AI Output ─────────────
{ cat:"Applied GenAI: Evaluating AI Output", q:"How do you critically evaluate an AI-generated output before you use or share it?",
  a:["**Accuracy** – are facts, numbers, names, dates and quotes correct and traceable to a source?",
     "**Completeness** – does it answer the real question? What is missing (risks, counter-evidence, stakeholders)?",
     "**Reasoning** – do the conclusions follow from the evidence? Watch for leaps, circular logic and false precision",
     "**Hallucination** – unsupported specifics, invented sources, claims beyond the material provided",
     "**Risk** – legal, regulatory, financial or reputational impact if it is wrong",
     "**Sensitivity** – confidential, client or personal data; tone on sensitive topics (people, restructuring, disputes); bias or unfair framing",
     "Then decide: use, edit, verify further with an SME, or discard – **you are accountable**, not the tool"],
  tip:"Treat AI output like work from a smart but unverified new hire: fast and useful – and checked before it goes out." },

{ cat:"Applied GenAI: Evaluating AI Output", q:"What are the warning signs that an AI output contains hallucinations?",
  a:["**Very specific details without a source** – exact figures, percentages, dates, quotes, case or report names",
     "**Citations that don't exist** or don't say what is claimed (broken links, wrong pages, made-up reports)",
     "**Confident answers on obscure or recent topics** – beyond the model's knowledge cutoff or the sources you gave it",
     "**Internal inconsistencies** – numbers that don't add up, sections that contradict each other",
     "**Answers that change** when you rephrase or regenerate the question (low self-consistency)",
     "Quick checks: ask \"which source supports this sentence?\", regenerate, search the claim, verify numbers in the source system"],
  tip:"The more precise and convenient a claim looks, the more it deserves a source check." },

{ cat:"Applied GenAI: Evaluating AI Output", q:"What risks do you assess in AI-generated content, and how does the review depth change with the risk?",
  a:["**Accuracy** – wrong facts or numbers driving a bad decision",
     "**Legal & regulatory** – advice, contractual or regulated statements, privacy, AI-use disclosure requirements",
     "**Confidentiality & IP** – leaking client or internal data; copyrighted or protected material in the output",
     "**Reputational & ethical** – bias, insensitive tone, misrepresenting people or clients",
     "**Security** – hidden instructions in source content (indirect prompt injection), unsafe links or code",
     "**Tier the review**: low (internal brainstorm) → quick read; medium (internal decision) → fact-check + peer review; high (client-facing, financial, legal, public) → full verification + SME / legal sign-off"],
  tip:"Match the review effort to the cost of being wrong." },

{ cat:"Applied GenAI: Evaluating AI Output", q:"How do you handle confidential, client or personal data when using GenAI tools day to day?",
  a:["Use only **approved enterprise tools** (e.g. Microsoft 365 Copilot, an internal Azure OpenAI app) where data stays inside your organization's boundary and isn't used for training – never paste client data into consumer chatbots",
     "Know the **classification** of what you share (public / internal / confidential / restricted) and follow policy and client contracts",
     "**Minimize & anonymize** – share only what the task needs; mask names, IDs and figures where possible",
     "Watch for **oversharing**: assistants can surface anything you have access to – respect **sensitivity labels** and report bad permissions",
     "Check outputs for **leaked** confidential details before forwarding; store results in governed locations",
     "When unsure, ask your risk / privacy team, and disclose AI use where policy or the client requires it"],
  tip:"If you wouldn't email it to an outside party, don't paste it into an unapproved AI tool." },

{ cat:"Applied GenAI: Evaluating AI Output", q:"How do you build an evaluation rubric or test set to check AI output quality consistently?",
  a:["Define **criteria** that match the goal: accuracy, groundedness, completeness, clarity, tone, format, policy compliance",
     "Write a **scoring rubric** (e.g. 1–5 per criterion) with concrete descriptions of good and bad",
     "Build a **test set** of real inputs + ideal outputs, including edge cases and past failures",
     "Score with **SMEs** and/or **LLM-as-a-judge**, and calibrate the judge against human scores",
     "Watch judge biases – **position**, **verbosity**, **self-preference**: use pairwise comparisons, swap the order, keep the rubric specific",
     "Re-run the set on **every prompt, model or source change** (regression testing) and track scores over time"],
  tip:"Without a test set you can't tell whether a new prompt is better or just different.",
  level:"Advanced" },

// ───────────── Applied GenAI: Workflows & Agents ─────────────
{ cat:"Applied GenAI: Workflows & Agents", q:"What kinds of agentic tools help with knowledge work, and what is each good for?",
  a:["**Deep research agents** (e.g. ChatGPT deep research, Microsoft 365 Copilot Researcher, Gemini Deep Research) – plan searches across many sources and return a cited report → first-pass research briefs",
     "**Knowledge agents** (custom GPTs, Copilot Studio agents, Claude Projects) – fixed instructions grounded on curated documents → team Q&A, policies, playbooks",
     "**Data-analysis agents** (code-interpreter tools, Copilot Analyst, Copilot in Excel) – write and run code over your files → reliable calculations and charts",
     "**Automation flows** (Power Automate, Copilot Studio, Zapier with AI steps) – multi-step work across email, Teams, SharePoint and CRM",
     "**Coding agents** (e.g. GitHub Copilot agent mode) – build scripts and small tools that automate your routines",
     "Same rules for all: approved tools only, verify the output, human approval for anything external"],
  tip:"Pick the agent by the job: research, grounded Q&A, analysis, automation or tool-building." },

{ cat:"Applied GenAI: Workflows & Agents", q:"What is an AI-augmented workflow, and how do you design one?",
  a:["A repeatable process where AI handles specific steps (drafting, summarizing, extracting, classifying) and **humans own judgment and approval**",
     "**1. Pick the task** – frequent, time-consuming, text-heavy, with a clear definition of good",
     "**2. Map the steps** – inputs, outputs, decision points; mark each step as AI, human or automated",
     "**3. Build the AI steps** – prompt templates, grounding sources, structured outputs",
     "**4. Add checkpoints** – human review before anything external, irreversible or high-risk",
     "**5. Automate the glue** – Power Automate, Copilot Studio or scripts move data between steps",
     "**6. Measure & iterate** – time saved, quality and error rate; refine prompts and steps"],
  code:`Example: weekly executive status report
Inputs:  project trackers + Teams/email updates + risk log
AI:      extract updates per project → flag slips and new risks → draft BLUF summary
Human:   verify flagged items, adjust tone, approve
Auto:    publish to SharePoint and email the steering group
Result:  e.g. 3 hours → 45 minutes, same format every week`,
  tip:"Automate the routine, keep humans on the judgment calls." },

{ cat:"Applied GenAI: Workflows & Agents", q:"Workflow vs. AI agent – when do you use a predefined AI workflow and when an autonomous agent?",
  a:["**Workflow** – steps are predefined in code and the LLM works inside each step → predictable, testable, cheaper",
     "Common patterns: **prompt chaining**, **routing** (classify, then handle), **parallelization** (sections or reviewers in parallel), **evaluator–optimizer** (draft + critique loop)",
     "**Agent** – the LLM decides the steps and tool calls at run time → flexible for open-ended tasks (research, multi-system troubleshooting)",
     "Agents add **cost, latency and unpredictability**, and are harder to test and govern",
     "Rule: single prompt → workflow → agent, moving up **only when the path truly can't be predefined**"],
  tip:"Most business automation needs a well-designed workflow, not a fully autonomous agent." },

{ cat:"Applied GenAI: Workflows & Agents", q:"How do you add guardrails and human-in-the-loop checkpoints to agentic automation?",
  a:["**Least privilege** – only the tools, data and permissions the task needs (read-only by default)",
     "**Approval gates** before external, financial or irreversible actions (send email, update records, make payments)",
     "**Limits** – max steps, time and token/cost budget; stop and escalate when uncertain",
     "**Treat retrieved content as untrusted** – guard against indirect prompt injection; validate tool arguments",
     "**Observability** – log every prompt, tool call and decision for audit and replay",
     "**Test before trusting** – sandbox / dry-run mode, evaluation scenarios, gradual rollout, an easy kill switch"],
  tip:"Autonomy is earned: start with AI suggesting and humans approving, then widen it as evidence builds.",
  level:"Advanced" },

{ cat:"Applied GenAI: Workflows & Agents", q:"What AI-augmented routines can improve your day-to-day productivity?",
  a:["**Morning triage** – summarize inbox and Teams, flag decisions and deadlines, draft quick replies",
     "**Meeting prep** – brief on attendees, open actions and relevant documents, with suggested questions",
     "**Meeting follow-up** – recap with decisions, owners and dates; draft the follow-up email",
     "**Weekly roll-up** – status report or leadership update from trackers and notes",
     "**Research digest** – summarize new reports and articles on your topics, with sources",
     "**Writing loop** – outline → draft → critique → tighten for every important document",
     "Make them **repeatable**: saved prompts, scheduled flows and a quick human review"],
  tip:"Routines beat ad-hoc prompting: the same good prompt, every week, compounds." },

{ cat:"Applied GenAI: Workflows & Agents", q:"What does \"going beyond basic AI tool usage\" look like?",
  a:["**Level 1 – Ad hoc**: one-off questions and rewrites in a chat window",
     "**Level 2 – Structured**: prompt templates, examples, critique loops and verification habits",
     "**Level 3 – Grounded**: assistants over curated knowledge (custom GPTs, Copilot agents, RAG) with citations",
     "**Level 4 – Automated**: AI steps built into workflows with human checkpoints",
     "**Level 5 – Measured & shared**: impact tracked; prompts and workflows shared and improved across the team",
     "Mindset: **redesign the process**, not just speed up a task – and know when **not** to use AI"],
  tip:"Basic usage asks \"what can AI do for this task?\" – advanced usage asks \"how should this process work now that AI exists?\"" },

{ cat:"Applied GenAI: Workflows & Agents", q:"How can GenAI improve decision quality, not just speed?",
  a:["**Frame** the decision – objective, constraints, criteria and who decides",
     "**Widen the options** – ask for alternatives you haven't considered, including \"do nothing\"",
     "**Stress-test** – pre-mortem, devil's advocate, steelman the opposing view",
     "**Surface assumptions** – list what must be true for each option, then test the weakest with data",
     "**Scenarios & sensitivity** – best / base / worst cases; which variables change the answer",
     "Guard against **automation bias** and **anchoring** on the first AI answer – the human owns the decision"],
  code:`We plan to <decision>. Imagine it is 12 months later and it failed badly.
1. List the 5 most likely reasons it failed.
2. For each: early warning signs and a mitigation we can start now.
3. Which assumption is weakest, and how could we test it this month?`,
  tip:"Use AI as a sparring partner that challenges your thinking, not an oracle that replaces it." },

{ cat:"Applied GenAI: Workflows & Agents", q:"How do you measure the productivity and decision-quality impact of AI?",
  a:["Set a **baseline** first (time and quality before AI) – otherwise gains are guesses",
     "**Productivity** – time per task, cycle time, throughput, turnaround for stakeholders",
     "**Quality** – rework rate, errors found in review, reviewer or stakeholder ratings against a rubric",
     "**Decision quality** – options considered, assumptions made explicit, evidence cited, risks identified early, fewer reversals; later, outcomes vs. expectations",
     "**Adoption & risk** – usage, incidents (data leaks, wrong facts caught late), user feedback",
     "Report **net** value – include the time spent prompting, reviewing and fixing AI output"],
  tip:"Faster isn't better if rework goes up – track speed and quality together." },

// ───────────── Applied GenAI: Behavioral & Scenario ─────────────
{ cat:"Applied GenAI: Behavioral & Scenario", q:"Tell me about a time you used GenAI to produce an executive-level deliverable.",
  a:["Use **STAR**: Situation, Task, Action, Result",
     "**Situation / Task** – audience, deadline and the decision at stake (e.g. steering-committee briefing in 24 hours)",
     "**Action (AI)** – sources gathered, prompt approach (extract → outline → draft → critique), tools used",
     "**Action (judgment)** – how you **verified**: fact-checks, number reconciliation, SME review, sensitivity check",
     "**Result** – measurable impact: time saved, decision made, leadership feedback",
     "**Learning** – what you'd do differently, or what you turned into a reusable template"],
  tip:"Show judgment, not just tool skills: what you checked and changed matters more than what the AI generated." },

{ cat:"Applied GenAI: Behavioral & Scenario", q:"Describe an AI-augmented workflow or routine you built. What impact did it have?",
  a:["**Problem** – the recurring pain (e.g. 4 hours a week compiling status updates)",
     "**Design** – the steps, which ones AI handles, where humans review, tools used",
     "**Build & iterate** – prompt templates, structured outputs, early failures and how you fixed them",
     "**Impact** – before/after metrics: time, quality, consistency, adoption by others",
     "**Governance** – data handling, review checkpoints, how you kept it reliable"],
  tip:"Quantify: \"cut weekly reporting from 4 hours to 1, adopted by 3 teams\" beats \"made it faster\"." },

{ cat:"Applied GenAI: Behavioral & Scenario", q:"Tell me about a time an AI output was wrong or risky. How did you catch it, and what did you change?",
  a:["**Situation** – what the AI produced and what was at stake (client email, executive memo, analysis)",
     "**Catch** – how you noticed: verification habit, source check, numbers didn't reconcile, tone felt off",
     "**Fix** – corrected the output and informed stakeholders if needed",
     "**Prevention** – changed the prompt (grounding, citations, \"say not found\") or added a checklist or review step",
     "Shows **healthy skepticism**, accountability and continuous improvement"],
  tip:"A strong answer shows you use AI and verify it – both halves matter." },

{ cat:"Applied GenAI: Behavioral & Scenario", q:"A leader needs a board-ready briefing by tomorrow morning. How would you use AI to deliver it?",
  a:["**Clarify** – the decision or message, audience, length and sensitive points",
     "**Gather** approved sources only, and check the confidentiality rules for the tools you'll use",
     "**Extract** key facts and numbers with references, then **outline** the storyline (BLUF + 3 points + ask)",
     "**Draft** with AI, then run a **critique pass** (\"review as a skeptical board member\")",
     "**Verify** every number and claim; get a quick SME check on the riskiest points",
     "**Finalize** – human edit for tone and politics; list sources and assumptions; tell the leader where confidence is lower"],
  tip:"AI compresses the drafting time, so spend the hours you save on verification and storyline." },

{ cat:"Applied GenAI: Behavioral & Scenario", q:"An executive wants to act on an AI-generated analysis. What do you check and communicate first?",
  a:["**Provenance** – which data and sources were used, how fresh they are, who validated them",
     "**Method** – how the numbers were computed (code/tool vs. model text) and the key assumptions",
     "**Robustness** – does the conclusion hold under reasonable changes (sensitivity, alternative data)?",
     "**Confidence & gaps** – what is verified, what is estimated, what is unknown",
     "**Cost of being wrong** – if high, get independent validation before acting",
     "Present it as **decision support** – a clear recommendation with its caveats, not an oracle answer"],
  tip:"Executives need the answer and how much to trust it." },

]);
