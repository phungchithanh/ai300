// AB-100 practice quiz data — Microsoft Certified: Agentic AI Business
// Solutions Architect. 85 questions total.
// Q1-Q50: extracted from the original AB-100 Exam Prep video. That video reads
// the correct answer + explanation aloud but does NOT speak the on-screen
// options, so option text for Q1-Q50 is reconstructed from the narration
// ("why the other options are incorrect") and some wording is approximate.
// Q51-Q85: gathered from additional public AB-100 practice videos that DO read
// the full option text aloud (see source note before Q51), so that wording is
// accurate. ExamTopics currently has no free AB-100 questions (beta exam).
//
// Types: "single" (pick one), "multi" (pick N), "yesno" (Yes/No),
//        "twopart" (two dropdown-style sub-questions, pick one each).
const AB100_DATA = [
{
  number: 1, type: "twopart",
  stem: "A company deploys a Microsoft Copilot Studio agent that integrates with a Microsoft Power Automate desktop flow. You need to recommend a testing solution that meets two requirements. What should you recommend for each requirement?",
  parts: [
    { prompt: "Validate the most recent changes to the agent before release",
      options: [
        {letter:"A", text:"Run tests against the latest unpublished version of the agent"},
        {letter:"B", text:"Run tests against the published production version of the agent"},
        {letter:"C", text:"Publish the agent to live users and monitor for issues"}
      ], correct:"A" },
    { prompt: "Validate the flow as part of the agent's orchestration",
      options: [
        {letter:"A", text:"Add the flow to the agent as a tool"},
        {letter:"B", text:"Add the flow to a canvas app"},
        {letter:"C", text:"Run the flow from the Power Automate desktop console"}
      ], correct:"A" }
  ],
  explanation: "Unpublished versions contain the newest changes not yet in production, so testing them lets you catch issues safely before publishing without impacting real users. In Copilot Studio, Power Automate flows act as tools the agent can invoke dynamically during a conversation, so adding the flow as a tool validates it as part of orchestration. Publishing to live users adds production risk, the production version misses the newest changes, and a canvas app only connects a UI—not the agent's orchestration."
},
{
  number: 2, type: "single",
  stem: "A company plans to deploy a Copilot Studio agent to enhance customer support. Customer data is stored across ServiceNow, Dynamics 365 Finance, Dynamics 365 Supply Chain Management, and Excel files in SharePoint Online. You need to ensure the agent can deliver accurate and timely responses. What should you recommend?",
  options: [
    {letter:"A", text:"Select which AI model processes each request"},
    {letter:"B", text:"Create custom prompts to guide the agent's responses"},
    {letter:"C", text:"Implement Microsoft Power Platform connectors"},
    {letter:"D", text:"Configure a search index to improve indexing efficiency"}
  ], correct:["C"],
  explanation: "Power Platform connectors are built to integrate Copilot Studio with enterprise apps and services, letting the agent securely retrieve real-time data from all these systems so responses are context-aware and current. Choosing an AI model only decides how a request is processed, custom prompts only guide response style, and improving indexing only speeds search—none connect the multiple data sources."
},
{
  number: 3, type: "twopart",
  stem: "A company has Power Platform development, staging, and production environments, each with its own Dataverse tables and Azure AI Search index. You are designing ALM to deploy a Copilot Studio agent (agent1) from dev to production. It must use the production grounding data sources, minimize downtime, and handle credentials/endpoints securely. What should you include in the deployment package, and what should you reconfigure afterward?",
  parts: [
    { prompt: "Include in the deployment package solution",
      options: [
        {letter:"A", text:"Agent1 and references to the data sources"},
        {letter:"B", text:"Agent1 and the actual data-source connections embedded in the solution"},
        {letter:"C", text:"Agent1 only"}
      ], correct:"A" },
    { prompt: "Reconfigure after the deployment",
      options: [
        {letter:"A", text:"The environment variables"},
        {letter:"B", text:"The connections, reconfigured manually"},
        {letter:"C", text:"The Dataverse tables"}
      ], correct:"A" }
  ],
  explanation: "In Power Platform ALM the package should contain the agent plus references to data sources rather than hardcoded, environment-specific configurations, keeping it portable. Environment variables manage per-environment settings (search endpoints, index names, URLs), so after deployment you update them to point production at the right resources without changing the solution. Embedding connections reduces portability and manual reconfiguration isn't the preferred ALM approach."
},
{
  number: 4, type: "single",
  stem: "You are creating validation criteria for a custom generative AI model that produces business reports based on internal enterprise data. You need to assess whether the model's outputs are appropriate and meaningful for the business reports. Which metric should you use?",
  options: [
    {letter:"A", text:"User adoption and engagement rates"},
    {letter:"B", text:"Alignment of the output to domain-specific tasks"},
    {letter:"C", text:"Inference efficiency and infrastructure utilization"},
    {letter:"D", text:"Model training duration"}
  ], correct:["B"],
  explanation: "Alignment to domain-specific tasks directly measures how well the model performs in the intended business context—whether reports are accurate, relevant, context-aware, and aligned with enterprise reporting standards. Adoption/engagement doesn't validate output quality, inference efficiency measures system performance, and training duration has no bearing on usefulness."
},
{
  number: 5, type: "single",
  stem: "A company has an Azure environment supporting multiple business units and plans an AI solution that performs sentiment analysis on customer product reviews. You need to evaluate the potential cost of the solution to support Return on AI (ROAI) analysis. What should you use?",
  options: [
    {letter:"A", text:"Microsoft Cost Management"},
    {letter:"B", text:"Microsoft Fabric capacity estimator"},
    {letter:"C", text:"Total Cost of Ownership (TCO) calculator"},
    {letter:"D", text:"Azure reservations"}
  ], correct:["C"],
  explanation: "The Azure TCO calculator estimates and compares the cost of running workloads in Azure, providing projected infrastructure and operational estimates during planning and business justification. Cost Management monitors actual spend after deployment, the Fabric estimator is unrelated to general AI cost, and Azure Reservations reduce cost via reserved pricing but don't estimate overall solution cost."
},
{
  number: 6, type: "twopart",
  stem: "You need to design a multi-agent solution that includes a custom agent. It must define the rules and constraints the agent must follow, and automate a back-end process involving data movement between services that runs independently of the agent's reasoning steps. What should you include for each requirement?",
  parts: [
    { prompt: "Define the rules and constraints the agent must follow",
      options: [
        {letter:"A", text:"Conversation topics"},
        {letter:"B", text:"Agent flows"},
        {letter:"C", text:"Power Pages"}
      ], correct:"A" },
    { prompt: "Automate a back-end data-movement process independent of reasoning",
      options: [
        {letter:"A", text:"Microsoft Power Automate cloud flow"},
        {letter:"B", text:"Agent flows"},
        {letter:"C", text:"Power Pages"}
      ], correct:"A" }
  ],
  explanation: "In Copilot Studio, conversation topics control agent behavior—response logic, branching, business rules, and constraints. Power Automate cloud flows are built for back-end automation (integrations, approvals, API calls, data movement) and run independently of conversational reasoning. Agent flows aren't for conversational constraints, and Power Pages builds websites/portals."
},
{
  number: 7, type: "single",
  stem: "A company uses Dynamics 365 Finance to manage accounts payable. You are designing an AI invoice-processing solution and need to recommend the prerequisites to configure a prebuilt copilot for accounts payable. What should you recommend?",
  options: [
    {letter:"A", text:"From Copilot Studio, create a custom agent for accounts payable"},
    {letter:"B", text:"Deploy Microsoft 365 Copilot for Sales"},
    {letter:"C", text:"Build a custom AI tool in Microsoft Foundry"},
    {letter:"D", text:"From the Power Platform admin center, assign the Finance and Operations AI security role to users"}
  ], correct:["D"],
  explanation: "Users must have the Finance and Operations AI security role before they can access AI-powered copilot features in Dynamics 365 Finance—a required prerequisite for enabling the capability securely. A custom Copilot Studio agent isn't needed for an existing prebuilt copilot, Copilot for Sales targets sales, and a custom Foundry tool is unnecessary when a prebuilt copilot exists."
},
{
  number: 8, type: "twopart",
  stem: "You need to design a Copilot Studio agent that supports interactive speech responses and optimizes decision making and accuracy of the responses. Select the option for each requirement (each option may be used once).",
  parts: [
    { prompt: "Supports interactive speech responses",
      options: [
        {letter:"A", text:"Copilot Studio voice features"},
        {letter:"B", text:"A deep reasoning model"},
        {letter:"C", text:"Azure Language and Foundry tools"},
        {letter:"D", text:"Azure AI Speech"},
        {letter:"E", text:"SSML"}
      ], correct:"A" },
    { prompt: "Optimizes decision making and accuracy of the responses",
      options: [
        {letter:"A", text:"Copilot Studio voice features"},
        {letter:"B", text:"A deep reasoning model"},
        {letter:"C", text:"Azure Language and Foundry tools"},
        {letter:"D", text:"Azure AI Speech"},
        {letter:"E", text:"SSML"}
      ], correct:"B" }
  ],
  explanation: "Copilot Studio voice features provide built-in speech-to-text/text-to-speech; even though Azure AI Speech is the underlying service, exam questions expect the higher-level Copilot Studio capability for design. A deep reasoning model gives advanced contextual, multi-step reasoning to improve accuracy. Azure Language/Foundry tools aren't reasoning/voice focused, Azure AI Speech is backend infrastructure, and SSML only customizes voice output."
},
{
  number: 9, type: "single",
  stem: "A company uses multiple Copilot Studio agents across different channels. You need a monitoring solution that provides comprehensive telemetry data and performance insights for the agents. What should you include?",
  options: [
    {letter:"A", text:"Application Insights"},
    {letter:"B", text:"Azure Advisor"},
    {letter:"C", text:"Azure DevOps"},
    {letter:"D", text:"Dynamics 365 Customer Voice surveys"}
  ], correct:["A"],
  explanation: "Application Insights is designed for application monitoring, diagnostics, and telemetry—detailed insight into performance, response times, failures, interactions, dependencies, and health—and integrates with Azure Monitor for dashboards/alerts. Azure Advisor gives best-practice recommendations, Azure DevOps handles development/CI-CD, and Customer Voice collects surveys—not telemetry."
},
{
  number: 10, type: "single",
  stem: "A company uses a Copilot Studio agent to automate tasks in a web app. During testing the automation sometimes fails because of frequent changes to the app's UI. You need to ensure the agent successfully automates the tasks while minimizing changes to the agent. What should you include?",
  options: [
    {letter:"A", text:"Computer use in Copilot Studio"},
    {letter:"B", text:"Microsoft Foundry model customization"},
    {letter:"C", text:"Copilot Studio topics"},
    {letter:"D", text:"Power Automate cloud flows"}
  ], correct:["A"],
  explanation: "Computer use in Copilot Studio provides adaptive, AI-driven UI automation that recognizes and interacts with interfaces dynamically instead of relying on fixed selectors, making automation resilient to layout changes and minimizing agent redesign. Model customization, topic logic, and workflow orchestration don't solve failures caused by a changing UI."
},
{
  number: 11, type: "single",
  stem: "You are evaluating a Copilot Studio agent that supports Dynamics 365 customer service representatives. You need a testing solution that evaluates agent effectiveness during active sessions, validates whether responses are accurate and helpful, and provides measurable, actionable insights for continuous improvement. What should you recommend?",
  options: [
    {letter:"A", text:"Track resolution, deflection, and accuracy by using dashboards and use scripts to ensure consistent responses"},
    {letter:"B", text:"Run load tests to validate high chat-volume scalability"},
    {letter:"C", text:"Review historical support performance reports"},
    {letter:"D", text:"Monitor infrastructure availability and system performance"}
  ], correct:["A"],
  explanation: "Resolution, deflection, and accuracy metrics directly measure real-session performance—resolution shows issues handled, deflection shows reduced human intervention, accuracy validates correctness—while dashboards provide measurable insight and scripts ensure consistency. The others focus on scalability, historical performance, or infrastructure rather than conversational quality."
},
{
  number: 12, type: "twopart",
  stem: "You are designing end-to-end test scenarios for a business solution that uses Dynamics 365 Sales and Dynamics 365 Finance. Which type of testing should you use for each requirement?",
  parts: [
    { prompt: "Properly exchanges data between the Dynamics 365 apps",
      options: [
        {letter:"A", text:"Integration testing"},
        {letter:"B", text:"User acceptance testing"},
        {letter:"C", text:"Drift testing"},
        {letter:"D", text:"Exploratory testing"},
        {letter:"E", text:"Performance testing"}
      ], correct:"A" },
    { prompt: "Aligns with defined user workflows and business processes",
      options: [
        {letter:"A", text:"Integration testing"},
        {letter:"B", text:"User acceptance testing"},
        {letter:"C", text:"Drift testing"},
        {letter:"D", text:"Exploratory testing"},
        {letter:"E", text:"Performance testing"}
      ], correct:"B" }
  ],
  explanation: "Integration testing validates that multiple systems, apps, APIs, and workflows communicate correctly and that data flows accurately. UAT validates the solution meets business expectations and that users can perform their tasks. Drift testing monitors model changes, exploratory testing is informal discovery, and performance testing targets scalability/responsiveness."
},
{
  number: 13, type: "single",
  stem: "A company uses Microsoft Foundry agents. You need to ensure an agent can dynamically use external tools at runtime without updating the agent. What should you include in the solution?",
  options: [
    {letter:"A", text:"A Microsoft Foundry hub"},
    {letter:"B", text:"A Model Context Protocol (MCP) server"},
    {letter:"C", text:"Azure AI Search"},
    {letter:"D", text:"Microsoft Copilot Studio"}
  ], correct:["B"],
  explanation: "MCP is a standardized interface that lets an agent discover and use external tools, APIs, and services at runtime, so new tools can be added or changed independently without redeploying the agent (think of MCP as 'USB-C' for connecting AI systems to data sources). A Foundry hub organizes resources, Azure AI Search indexes/retrieves data, and Copilot Studio builds conversational agents."
},
{
  number: 14, type: "twopart",
  stem: "A company deploys agents that use Azure OpenAI resources, deployed to both the United States and Europe. You need a governance solution that enforces deployment of resources only to approved regions and provides continuous compliance verification. What should you include for each requirement?",
  parts: [
    { prompt: "Enforce deployment of resources to only approved regions",
      options: [
        {letter:"A", text:"Azure Policy"},
        {letter:"B", text:"Microsoft Defender for Cloud"},
        {letter:"C", text:"Azure Monitor"},
        {letter:"D", text:"Microsoft Purview"},
        {letter:"E", text:"Microsoft Sentinel"}
      ], correct:"A" },
    { prompt: "Provide continuous compliance verification of the resources",
      options: [
        {letter:"A", text:"Azure Policy"},
        {letter:"B", text:"Microsoft Defender for Cloud"},
        {letter:"C", text:"Azure Monitor"},
        {letter:"D", text:"Microsoft Purview"},
        {letter:"E", text:"Microsoft Sentinel"}
      ], correct:"B" }
  ],
  explanation: "Azure Policy enforces governance rules such as denying resource creation outside approved regions. Defender for Cloud continuously assesses resources against security and compliance standards, flagging non-compliant resources and generating recommendations. Azure Monitor is telemetry, Purview is data governance, and Sentinel is SIEM/threat detection."
},
{
  number: 15, type: "single",
  stem: "You are designing a low-code AI business solution using Copilot Studio. It must include an agent that automates tasks by simulating user interactions across third-party apps and websites—clicking buttons, entering text, and extracting information from screens. What should you include in the agent?",
  options: [
    {letter:"A", text:"A Model Context Protocol (MCP) server"},
    {letter:"B", text:"NLU+ language models"},
    {letter:"C", text:"Computer use in Copilot Studio"},
    {letter:"D", text:"Copilot skills"}
  ], correct:["C"],
  explanation: "Computer use in Copilot Studio is built for UI-based automation: it recognizes screen elements, performs interactions, and automates workflows across web/desktop apps even when APIs are limited. MCP connects to external tools but not graphical UI automation, NLU+ handles language understanding, and copilot skills extend functionality but don't simulate on-screen interactions."
},
{
  number: 16, type: "single",
  stem: "A company has a Power Platform solution with Dataverse tables, a Power BI workspace (WS1), a canvas app (app1) that uses Dataverse, and a Power BI semantic model that connects to Dataverse using DirectQuery. You plan to use generative AI to answer queries based on a subset of corporate data and need to ensure the data is available as a grounding data source for AI systems. What should you do?",
  options: [
    {letter:"A", text:"Populate a Dataverse table with the data"},
    {letter:"B", text:"Share the Power BI workspace"},
    {letter:"C", text:"Endorse the semantic model"},
    {letter:"D", text:"Export the semantic model"}
  ], correct:["C"],
  explanation: "Endorsing a Power BI semantic model marks it as a trusted, governed enterprise data source, improving discoverability, reliability, and governance so it can ground generative AI responses. Populating a Dataverse table is unnecessary (data already exists), sharing the workspace only grants access, and exporting doesn't make it a governed grounding source."
},
{
  number: 17, type: "twopart",
  stem: "A company plans an AI solution containing a Copilot Studio agent and a Microsoft Foundry agent, stored in a source-code repository. The deployment must use a test environment before production, isolate production from dev/testing, be repeatable and fully automated, and require no manual intervention. Which deployment method should you recommend for each agent?",
  parts: [
    { prompt: "Copilot Studio agent",
      options: [
        {letter:"A", text:"Use a Microsoft Power Platform deployment pipeline"},
        {letter:"B", text:"Use an Azure DevOps (ADO) pipeline"},
        {letter:"C", text:"Manually export and import the solution"}
      ], correct:"A" },
    { prompt: "Microsoft Foundry agent",
      options: [
        {letter:"A", text:"Use a Microsoft Power Platform deployment pipeline"},
        {letter:"B", text:"Use an Azure DevOps (ADO) pipeline"},
        {letter:"C", text:"Manually export and import the solution"}
      ], correct:"B" }
  ],
  explanation: "Power Platform deployment pipelines are built for Power Platform ALM—automated promotion across dev/test/prod with isolation and governance. Azure DevOps provides enterprise-grade CI/CD for Azure AI/infrastructure, integrating with source control for automated, repeatable, isolated deployments of the Foundry agent. Manual export/import isn't fully automated."
},
{
  number: 18, type: "yesno",
  stem: "Case (same scenario for Q18–Q20): A company uses Microsoft 365 and Dynamics 365. You need a solution to automatically summarize email threads, generate suggested replies in Outlook, and provide meeting-preparation summaries that include relevant CRM data.\n\nSolution: You recommend Microsoft 365 Copilot for Sales. Does this meet the goal?",
  correct:["A"],
  explanation: "Microsoft 365 Copilot for Sales is purpose-built for this: it integrates M365 apps (Outlook, Teams) with CRM including Dynamics 365, so it can summarize email conversations, generate suggested replies, and produce meeting-prep insights with customer/opportunity/account details. It fully satisfies the requirements—yes, it meets the goal."
},
{
  number: 19, type: "yesno",
  stem: "Case (same scenario as Q18): Summarize email threads, generate suggested replies in Outlook, and provide meeting-prep summaries that include relevant CRM data.\n\nSolution: You recommend a classic Microsoft Dataverse workflow. Does this meet the goal?",
  correct:["B"],
  explanation: "Classic Dataverse workflows are for traditional process automation (updating records, notifications, rule-based actions). They provide no generative AI capabilities—no conversation summarization, natural-language replies, or contextual CRM meeting insights. Those come from Microsoft 365 Copilot for Sales, so this does not meet the goal."
},
{
  number: 20, type: "yesno",
  stem: "Case (same scenario as Q18): Summarize email threads, generate suggested replies in Outlook, and provide meeting-prep summaries that include relevant CRM data.\n\nSolution: You recommend a Microsoft 365 Copilot agent template. Does this meet the goal?",
  correct:["B"],
  explanation: "A generic Microsoft 365 Copilot agent template does not, by itself, provide the integrated sales-productivity capabilities required (email summarization, Outlook replies, meeting-prep summaries enriched with Dynamics 365 CRM data). Those specialized features are delivered by Microsoft 365 Copilot for Sales, so this does not meet the goal."
},
{
  number: 21, type: "twopart",
  stem: "A company has a Microsoft 365 E5 subscription and uses Copilot Studio. A SharePoint Online library contains 10,000 policy PDFs and a populated 'department' column for each PDF. You need a Copilot Studio agent that can answer questions about company policies and identify which departments and policies are connected. What should you include for each requirement?",
  parts: [
    { prompt: "Enable the agent to answer questions about company policies",
      options: [
        {letter:"A", text:"From Copilot Studio, add SharePoint as a knowledge source"},
        {letter:"B", text:"From Copilot Studio, configure the SharePoint tool"},
        {letter:"C", text:"Build a custom model in Microsoft Foundry"},
        {letter:"D", text:"Import the PDFs into Dataverse"}
      ], correct:"A" },
    { prompt: "Identify which departments and policies are connected",
      options: [
        {letter:"A", text:"From Copilot Studio, add SharePoint as a knowledge source"},
        {letter:"B", text:"From Copilot Studio, configure the SharePoint tool"},
        {letter:"C", text:"Build a custom model in Microsoft Foundry"},
        {letter:"D", text:"Use AI Builder document processing"}
      ], correct:"B" }
  ],
  explanation: "Copilot Studio natively supports SharePoint Online as a knowledge source, letting the agent retrieve from the PDFs and give grounded answers. Configuring the SharePoint tool lets the agent access SharePoint metadata—including the department column—so it understands department–policy relationships. A custom Foundry model, importing to Dataverse, and AI Builder are unnecessary here."
},
{
  number: 22, type: "single",
  stem: "A financial services company uses Dynamics 365 Finance. Support staff manually review customer transaction histories to detect potential fraud before escalating. You need an automation solution for the review process that ensures escalations reach a human analyst for the final decision. What should you recommend?",
  options: [
    {letter:"A", text:"Configure an agent to automatically close low-risk fraud cases"},
    {letter:"B", text:"Use Microsoft 365 Copilot in Word to review transactions"},
    {letter:"C", text:"Configure a task agent to generate fraud risk scores for the human analyst to review"},
    {letter:"D", text:"Build a Power BI analytics and reporting dashboard"}
  ], correct:["C"],
  explanation: "A task agent can analyze transaction data, detect suspicious patterns, and generate fraud risk scores that streamline review—while the final escalation and decision remain with the human analyst (human-in-the-loop, standard in regulated industries). Auto-closing cases removes human review, Copilot in Word is for documents, and analytics/reporting doesn't automate the review workflow."
},
{
  number: 23, type: "multi",
  stem: "A company has a Copilot Studio agent that answers from a knowledge base for customer support. Users report occasional inaccurate answers. You need to use metrics from the Analytics tab in Copilot Studio to identify the cause. Which two options should you use?",
  options: [
    {letter:"A", text:"Survey results"},
    {letter:"B", text:"Session information and session outcomes"},
    {letter:"C", text:"Topic usage and topics with low resolution"},
    {letter:"D", text:"Engagement and escalation trends"},
    {letter:"E", text:"Quality of generated answers"}
  ], correct:["C","E"],
  explanation: "Topic usage analytics reveal which topics are triggered most and which have low resolution rates—pinpointing where inaccuracies occur in the conversational flow. Quality of generated answers directly evaluates relevance, grounding quality, and usefulness of AI responses, critical for a knowledge-base agent. Survey results, session information, and engagement trends don't directly diagnose answer accuracy."
},
{
  number: 24, type: "twopart",
  stem: "A company uses Dynamics 365 Finance for accounts payable and customer debt recovery. You are designing an AI finance process. Which Microsoft Copilot feature should you recommend for each requirement?",
  parts: [
    { prompt: "Provide AI-driven details to identify overdue vendor invoices and outstanding balances",
      options: [
        {letter:"A", text:"Account reconciliation agent"},
        {letter:"B", text:"Collections coordinator summary"},
        {letter:"C", text:"Supplier communication agent"},
        {letter:"D", text:"Analyze demand plans with Copilot"}
      ], correct:"A" },
    { prompt: "Help staff reduce how long it takes to review overdue invoices and payment history",
      options: [
        {letter:"A", text:"Account reconciliation agent"},
        {letter:"B", text:"Collections coordinator summary"},
        {letter:"C", text:"Supplier communication agent"},
        {letter:"D", text:"AI summaries with Copilot (generic)"}
      ], correct:"B" }
  ],
  explanation: "The account reconciliation agent is designed for reconciliation in Dynamics 365 Finance—identifying discrepancies, unpaid invoices, and overdue balances by matching owed vs paid. The collections coordinator summary provides AI-generated summaries of payment history, overdue balances, and collections info, cutting review time. Supplier communication, generic AI summaries, and demand-plan analysis don't fit."
},
{
  number: 25, type: "multi",
  stem: "A company uses a fine-tuned Microsoft Foundry model that requires frequent updates as new customer feedback becomes available. You need an ALM process where data changes are tracked and versioned, and the model is retrained consistently using approved training data. Which two actions should you include?",
  options: [
    {letter:"A", text:"Adjust operational configuration settings for the model"},
    {letter:"B", text:"Configure AI content-safety filtering"},
    {letter:"C", text:"Store the training data in Azure Files shared storage"},
    {letter:"D", text:"Upload the training data to Microsoft Foundry data files"},
    {letter:"E", text:"Store the training data in Azure Blob Storage that has version control enabled"}
  ], correct:["D","E"],
  explanation: "Azure Blob Storage with versioning provides enterprise-grade dataset governance—tracking changes, keeping historical versions, supporting rollback and auditability. Foundry data files let you register and manage approved training datasets as governed assets—the controlled source of truth for retraining. Operational config, content-safety filtering, and Azure Files don't provide governed ALM."
},
{
  number: 26, type: "twopart",
  stem: "You are designing two Copilot Studio agents. Each must use a standard model and must not use generative orchestration. Agent1 must support simple, short phrases for a given topic. Agent2 must integrate with the Dynamics 365 Contact Center voice channel. Which language model should you recommend for each?",
  parts: [
    { prompt: "Agent1 (simple, short phrases for a given topic)",
      options: [
        {letter:"A", text:"Natural Language Understanding (NLU)"},
        {letter:"B", text:"NLU Plus (NLU+)"},
        {letter:"C", text:"Azure OpenAI"},
        {letter:"D", text:"Azure Language in Foundry tools"},
        {letter:"E", text:"Conversational Language Understanding (CLU)"}
      ], correct:"A" },
    { prompt: "Agent2 (integrate with Dynamics 365 Contact Center voice channel)",
      options: [
        {letter:"A", text:"Natural Language Understanding (NLU)"},
        {letter:"B", text:"NLU Plus (NLU+)"},
        {letter:"C", text:"Azure OpenAI"},
        {letter:"D", text:"Azure Language in Foundry tools"},
        {letter:"E", text:"Conversational Language Understanding (CLU)"}
      ], correct:"B" }
  ],
  explanation: "For simple, short, predictable phrases with classic topic routing, traditional NLU is the best non-generative fit. NLU+ is optimized for voice/IVR, handling spoken language and advanced entity extraction while remaining non-generative—ideal for the contact-center voice channel. Azure OpenAI is generative (prohibited), and Language/Foundry tools and CLU aren't the expected Copilot Studio answers."
},
{
  number: 27, type: "single",
  stem: "A company has two Power Platform environments named Dev1 and Prod1. A Copilot Studio agent (agent1) is built into a solution in Dev1. You plan to deploy agent1 to Prod1 and make it available to users while minimizing administrative effort. What should you do?",
  options: [
    {letter:"A", text:"Share agent1 with the users in Prod1"},
    {letter:"B", text:"Export the solution as an unmanaged solution and import it into Prod1"},
    {letter:"C", text:"Export the solution as a managed solution and import the solution into Prod1"},
    {letter:"D", text:"Manually recreate agent1 in Prod1"}
  ], correct:["C"],
  explanation: "Managed solutions are the recommended way to deploy Power Platform/Copilot Studio solutions to production—supporting proper ALM, protecting production from unintended edits, and packaging the agent and components for consistent, low-effort deployment. Sharing doesn't deploy it, unmanaged solutions are for dev and allow uncontrolled changes, and manual recreation adds effort and risk."
},
{
  number: 28, type: "twopart",
  stem: "You are designing an AI strategy for Dynamics 365 Finance and Operations apps and evaluating Copilot Studio to provide in-app help and guidance based on generative AI general knowledge. You need to recommend knowledge-source settings that minimize the risk of inaccurate responses. What should you recommend?",
  parts: [
    { prompt: "Custom knowledge sources",
      options: [
        {letter:"A", text:"Must be uploaded to the agent"},
        {letter:"B", text:"Must be excluded from the agent"}
      ], correct:"A" },
    { prompt: "General (open) knowledge",
      options: [
        {letter:"A", text:"Must be enabled for the agent"},
        {letter:"B", text:"Must be disabled for the agent"}
      ], correct:"B" }
  ],
  explanation: "Grounding the agent on trusted, uploaded enterprise knowledge sources provides authoritative information for accurate responses. General (open) knowledge should be disabled because it introduces a high risk of hallucinations and answers not aligned with the organization's policies and finance processes. Restricting to approved knowledge improves governance, accuracy, and reliability."
},
{
  number: 29, type: "multi",
  stem: "A company has Microsoft 365 Copilot agents. You need a security solution that identifies and mitigates AI-use risks, protects AI apps and the sensitive data processed or generated by the agents, and supports responsible AI governance (retaining/logging interactions, detecting policy violations, investigating incidents). Which two components should you include?",
  options: [
    {letter:"A", text:"Microsoft Purview"},
    {letter:"B", text:"Azure AI Content Safety"},
    {letter:"C", text:"Microsoft Foundry RBAC"},
    {letter:"D", text:"Microsoft Defender"}
  ], correct:["A","D"],
  explanation: "Purview provides governance and compliance for AI—retention, auditing, interaction logging, eDiscovery, and policy-violation detection—supporting incident investigation and compliance. Defender provides security protection—threat detection, monitoring, anomaly analysis, and protection of sensitive information. Content Safety only moderates harmful content, and Foundry RBAC only manages access."
},
{
  number: 30, type: "single",
  stem: "A retail company plans to deploy Copilot Studio agents supporting Dynamics 365 Commerce scenarios and a Power Apps inventory-management solution. You need to organize product catalog data as a consistent source for multiple AI systems. What should you recommend?",
  options: [
    {letter:"A", text:"Scrape product data from SharePoint libraries"},
    {letter:"B", text:"Maintain separate product tables for each agent"},
    {letter:"C", text:"Extract product details from vendor PDFs"},
    {letter:"D", text:"Centralize the product catalog data in Microsoft Dataverse and expose the data to both agents"}
  ], correct:["D"],
  explanation: "Dataverse acts as a centralized enterprise data platform for Dynamics 365 and Power Platform, so storing the catalog there gives both agents the same trusted, governed dataset—a single source of truth with better governance, scalability, and integration. Scraping SharePoint is unreliable, per-agent tables cause duplication/sync issues, and extracting from vendor PDFs is inefficient."
},
{
  number: 31, type: "single",
  stem: "You need to design ALM for a Power Platform environment containing solution1, which must include a custom connector for Copilot in Dynamics 365 Customer Service. It must ensure the connector is deployed consistently across environments and can be edited only in the dev environment. What should you include?",
  options: [
    {letter:"A", text:"Add the custom connector to a GitHub repository"},
    {letter:"B", text:"Share the custom connector with the dev team"},
    {letter:"C", text:"Create the custom connector in the default solution"},
    {letter:"D", text:"Add the custom connector to solution1"}
  ], correct:["D"],
  explanation: "Adding the connector to the solution makes it part of the deployment package so it moves consistently across dev/test/prod, and using managed solutions downstream prevents direct editing in production—edits happen only in dev. GitHub is source control (not packaging), sharing only grants access, and the default solution isn't designed for controlled enterprise ALM."
},
{
  number: 32, type: "single",
  stem: "A company has a Copilot Studio agent that uses custom connectors to interact with enterprise APIs. You need an ALM process ensuring the connectors are deployed consistently across dev, test, and prod, and that meets governance and traceability requirements. What should you recommend?",
  options: [
    {letter:"A", text:"Host the enterprise APIs as Azure Functions"},
    {letter:"B", text:"Manage the connectors as solution components and deploy the components by using ALM pipelines"},
    {letter:"C", text:"Store connector settings in environment variables"},
    {letter:"D", text:"Deploy the connectors by using unmanaged solutions"}
  ], correct:["B"],
  explanation: "Including custom connectors as components in managed solutions lets them participate fully in enterprise ALM—versioned, packaged, deployed, and governed consistently. ALM pipelines (Power Platform deployment pipelines or Azure DevOps) ensure repeatable, automated deployments with governance and traceability. Azure Functions doesn't address connector lifecycle, environment variables only manage config, and unmanaged solutions lack production governance."
},
{
  number: 33, type: "twopart",
  stem: "A company has a Power Platform environment. You need to build two agents. Agent1 must be extendable using the Semantic Kernel and connect to multiple business apps and APIs. Agent2 must connect directly to data in Microsoft Dataverse and be embeddable in a Power Apps canvas app. What should you use to build each agent?",
  parts: [
    { prompt: "Agent1 (Semantic Kernel; connect to multiple apps and APIs)",
      options: [
        {letter:"A", text:"Microsoft Foundry"},
        {letter:"B", text:"Microsoft Copilot Studio"},
        {letter:"C", text:"Azure Logic Apps"},
        {letter:"D", text:"Copilot in Power Apps"}
      ], correct:"A" },
    { prompt: "Agent2 (connect directly to Dataverse; embeddable in a Power Apps canvas app)",
      options: [
        {letter:"A", text:"Microsoft Foundry"},
        {letter:"B", text:"Microsoft Copilot Studio"},
        {letter:"C", text:"Azure Logic Apps"},
        {letter:"D", text:"Copilot in Power Apps"}
      ], correct:"B" }
  ],
  explanation: "Foundry is Microsoft's pro-code AI platform for advanced orchestration and extensibility—Semantic Kernel integration, custom plugins, API orchestration, memory, and enterprise multi-system connectivity—matching agent1. Copilot Studio is native to Power Platform with direct Dataverse integration and seamless Power Apps embedding, matching agent2. Logic Apps is workflow automation and Copilot in Power Apps isn't an agent-building platform."
},
{
  number: 34, type: "single",
  stem: "A company has Microsoft Foundry agents that use Azure OpenAI resources, deployed to both the United States and Europe. A mandate states the agents and their grounding data must adhere to data-residency and data-movement regulations. You need to recommend a governance solution. What should you include?",
  options: [
    {letter:"A", text:"Microsoft Defender for Cloud"},
    {letter:"B", text:"Azure Policy"},
    {letter:"C", text:"Azure Monitor"},
    {letter:"D", text:"Microsoft Purview"}
  ], correct:["D"],
  explanation: "Purview is Microsoft's enterprise data governance and compliance platform—classifying, governing, monitoring, and managing sensitive data with lineage, compliance management, auditing, and classification—ideal for enforcing where data is stored and how it moves across regions. Defender for Cloud is security posture, Azure Policy restricts deployment locations but not full data governance, and Azure Monitor is telemetry."
},
{
  number: 35, type: "multi",
  stem: "A company has an AI solution built with Copilot Studio and Power Platform, used by sales, marketing, and customer service. You are performing a Return on AI (ROAI) investment analysis and need to identify measurable business drivers. Which two business drivers should you identify?",
  options: [
    {letter:"A", text:"Reduced average case resolution time"},
    {letter:"B", text:"Market capitalization"},
    {letter:"C", text:"Economic market productivity"},
    {letter:"D", text:"Increased employee productivity"},
    {letter:"E", text:"Brand awareness"}
  ], correct:["A","D"],
  explanation: "Reduced average case resolution time is a direct, measurable operational benefit of AI-assisted service. Increased employee productivity (from automating repetitive work and speeding decisions) is one of the most important measurable AI outcomes. Market capitalization and macroeconomic productivity depend on many external factors, and brand awareness is hard to quantify for operational ROAI."
},
{
  number: 36, type: "twopart",
  stem: "A company has a cloud-based AI solution using Azure OpenAI models. You need a monitoring solution that uses Azure-native capabilities and minimizes development effort. What should you use for each requirement?",
  parts: [
    { prompt: "Monitor performance metrics and operational health for the models",
      options: [
        {letter:"A", text:"Azure Monitor"},
        {letter:"B", text:"Microsoft Purview"},
        {letter:"C", text:"Azure API Management"},
        {letter:"D", text:"Azure Policy"},
        {letter:"E", text:"Azure Stream Analytics"}
      ], correct:"A" },
    { prompt: "Monitor AI apps and agents for compliance",
      options: [
        {letter:"A", text:"Azure Monitor"},
        {letter:"B", text:"Microsoft Purview"},
        {letter:"C", text:"Azure API Management"},
        {letter:"D", text:"Azure Policy"},
        {letter:"E", text:"Azure Stream Analytics"}
      ], correct:"B" }
  ],
  explanation: "Azure Monitor natively provides telemetry, diagnostics, logs, alerts, availability, and performance analysis with minimal custom development—covering operational health. Purview provides enterprise governance and compliance for AI—auditing, policy management, classification, compliance tracking. API Management governs APIs, Azure Policy enforces config governance, and Stream Analytics is event-stream processing."
},
{
  number: 37, type: "single",
  stem: "A company has a canvas app (app1) in a Power Platform environment named ENV1, which uses a customer-managed key for data encryption. App1 connects to multiple data sources. You need to add Copilot components to app1 without modifying the current security or encryption configurations of ENV1. What should you include?",
  options: [
    {letter:"A", text:"Modify the app's existing data sources"},
    {letter:"B", text:"Duplicate and republish app1"},
    {letter:"C", text:"Enable Copilot features for ENV1"},
    {letter:"D", text:"Move app1 to an environment that uses Microsoft-managed keys"}
  ], correct:["C"],
  explanation: "Copilot capabilities can be enabled directly within the existing environment even when customer-managed keys are used, preserving the current security architecture and compliance controls while adding AI functionality. Modifying data sources isn't needed, duplicating/republishing doesn't enable Copilot, and moving to a Microsoft-managed-key environment would violate the encryption requirement."
},
{
  number: 38, type: "multi",
  stem: "A company uses Dynamics 365 to manage service operations. Dispatchers coordinate service requests and technicians perform scheduled on-site work. You need a solution that uses Microsoft Copilot to help staff organize and resolve work orders, and to deliver contextual AI support to frontline workers as they prepare for and complete customer appointments. Which two components should you include?",
  options: [
    {letter:"A", text:"Copilot Service workspace"},
    {letter:"B", text:"Copilot in Outlook"},
    {letter:"C", text:"Dynamics 365 Customer Service"},
    {letter:"D", text:"Copilot in Customer Service"},
    {letter:"E", text:"Copilot in Field Service"},
    {letter:"F", text:"Dynamics 365 Field Service mobile app"}
  ], correct:["E","F"],
  explanation: "Copilot in Field Service helps dispatchers and managers organize and resolve work orders—summaries, scheduling assistance, technician recommendations, operational insights. The Dynamics 365 Field Service mobile app, with Copilot enabled, gives technicians contextual AI support on-site (appointment summaries, work-order details, task guidance, voice updates). The other options target workspace UI, inbox productivity, or case management."
},
{
  number: 39, type: "twopart",
  stem: "A company uses Azure OpenAI models that use grounding data from Microsoft Fabric for agents; the models are fine-tuned with proprietary datasets. You need a governance solution that restricts access to the grounding data to only assigned roles and restricts model fine-tuning to only the AI engineering team. What should you include for each requirement?",
  parts: [
    { prompt: "Restrict access to the grounding data to only assigned roles",
      options: [
        {letter:"A", text:"Microsoft Purview access policies"},
        {letter:"B", text:"Azure AI Content Safety"},
        {letter:"C", text:"Azure Monitor alerts"},
        {letter:"D", text:"Azure Policy"}
      ], correct:"A" },
    { prompt: "Restrict model fine-tuning to only the AI engineering team",
      options: [
        {letter:"A", text:"Role-based access control (RBAC) in Microsoft Foundry"},
        {letter:"B", text:"Azure Policy"},
        {letter:"C", text:"ARM resource logs"},
        {letter:"D", text:"Azure Monitor alerts"}
      ], correct:"A" }
  ],
  explanation: "Purview access policies provide enterprise data governance and role-based access to sensitive datasets and grounding information. RBAC in Foundry enables granular permission control over AI resources and fine-tuning, ensuring only authorized users (AI engineers) can retrain or modify models. Content Safety filters harmful content, Azure Monitor alerts don't control access, Azure Policy governs resource compliance, and ARM logs don't manage authorization."
},
{
  number: 40, type: "single",
  stem: "A company has a customer-order system that creates sales orders manually. You need an AI solution to automate: saving order details to a database, updating order status, extracting order details from an order file, and sending a confirmation email. It must minimize development effort and support intelligent automation and integration. What should you include?",
  options: [
    {letter:"A", text:"An Azure Logic Apps workflow"},
    {letter:"B", text:"A Semantic Kernel SDK solution"},
    {letter:"C", text:"A Microsoft Foundry agent service solution"},
    {letter:"D", text:"A Microsoft Copilot Studio agent that uses Microsoft Power Automate workflows"}
  ], correct:["D"],
  explanation: "Copilot Studio with Power Automate is a low-code intelligent-automation platform: Power Automate integrates with databases, email, and document processing via built-in connectors, while Copilot Studio adds AI-driven automation—covering the end-to-end order process with minimal custom code. Logic Apps lacks the business-focused AI experience, the Semantic Kernel SDK is pro-code, and Foundry agent service is unnecessarily complex here."
},
{
  number: 41, type: "single",
  stem: "A manufacturing company wants to deploy an agent to automate supplier invoice processing and is designing a solution to evaluate the financial implications, especially budget overruns. It must consider total cost of ownership, expected savings from automation, and whether to extend existing AI capabilities. What should you include in the design?",
  options: [
    {letter:"A", text:"A break-even analysis"},
    {letter:"B", text:"Adopt prebuilt agents"},
    {letter:"C", text:"Train a custom model"},
    {letter:"D", text:"A return on AI investment (ROAI) analysis"}
  ], correct:["D"],
  explanation: "ROAI analysis is built for this—it considers implementation costs, operating costs, business benefits, productivity improvements, risk factors, and long-term value, giving a comprehensive financial assessment. A break-even analysis only finds when costs equal benefits (too narrow), adopting prebuilt agents reduces effort but doesn't evaluate financial impact, and training a custom model is a technical choice, not a financial framework."
},
{
  number: 42, type: "single",
  stem: "A company has a solution (solution1) in production that uses an Azure OpenAI model to generate marketing emails for existing customers. An internal review found it creates different emails depending on the customer's traits. You need a strategy to mitigate the bias that adheres to Microsoft Responsible AI principles. What should you recommend?",
  options: [
    {letter:"A", text:"Increase the model's temperature to add randomness"},
    {letter:"B", text:"Modify the system instructions of solution1"},
    {letter:"C", text:"Retrain the model with a larger dataset"},
    {letter:"D", text:"Modify the foundation model's original training dataset"}
  ], correct:["B"],
  explanation: "Azure OpenAI models are managed foundation models that organizations don't retrain directly; the recommended, effective mitigation is to modify the system instructions (meta prompts) to enforce fairness guidelines, standardize messaging, prevent discriminatory responses, and keep output consistent across customer groups—aligning with Responsible AI fairness/inclusiveness. Randomness doesn't fix bias, retraining a foundation model isn't typical, and customers don't control the original training data."
},
{
  number: 43, type: "twopart",
  stem: "You need to recommend a Power Platform solution for customer support that includes AI capabilities in Power Automate. Select the option for each requirement.",
  parts: [
    { prompt: "Use a centralized workspace for AI models",
      options: [
        {letter:"A", text:"A Microsoft Foundry hub"},
        {letter:"B", text:"Microsoft Copilot Studio"},
        {letter:"C", text:"Dataverse"},
        {letter:"D", text:"Azure OpenAI"}
      ], correct:"A" },
    { prompt: "Generate short overviews from large amounts of unstructured text without additional training or coding",
      options: [
        {letter:"A", text:"An AI Builder prebuilt prompt"},
        {letter:"B", text:"Azure OpenAI"},
        {letter:"C", text:"GitHub Copilot"},
        {letter:"D", text:"Microsoft Copilot Studio"}
      ], correct:"A" }
  ],
  explanation: "A Foundry hub provides centralized AI resource management, governance, orchestration, and workspace capabilities. AI Builder prebuilt prompts are designed for low-code generative AI (summarization, content generation) inside Power Automate—no training or coding required. Copilot Studio is for conversational agents, Dataverse is a data platform, Azure OpenAI needs more development, and GitHub Copilot is for software development."
},
{
  number: 44, type: "single",
  stem: "You need to design a Microsoft 365 Copilot solution to optimize employee productivity. Employees must be able to query content stored in a subset of SharePoint Online sites and in Teams using natural-language prompt actions, and receive contextually relevant responses in Microsoft 365 Copilot. What should you include in the design?",
  options: [
    {letter:"A", text:"Configure Power Automate desktop flows"},
    {letter:"B", text:"Modify the SharePoint Online site settings"},
    {letter:"C", text:"Build a custom REST API"},
    {letter:"D", text:"Configure Microsoft Graph access"}
  ], correct:["D"],
  explanation: "Microsoft 365 Copilot uses Microsoft Graph as its core data-access and grounding layer, securely connecting SharePoint Online, Teams, Outlook, and OneDrive. Configuring Graph access lets employees query authorized content in natural language and get contextually relevant responses, while Graph respects existing permissions. Desktop flows aren't needed for grounding, SharePoint settings alone don't provide semantic integration, and a custom REST API is unnecessary since Graph integrates natively."
},
{
  number: 45, type: "single",
  stem: "You need to design a Copilot Studio agent for customer support that must securely retrieve product warranty data from a REST API, while minimizing development effort. What should you include in the design?",
  options: [
    {letter:"A", text:"Use a Power Automate desktop flow"},
    {letter:"B", text:"Create a custom connector in Copilot Studio and use the connector to call the API"},
    {letter:"C", text:"Use screen scraping to read the data"},
    {letter:"D", text:"Configure a fallback topic to retrieve the data"}
  ], correct:["B"],
  explanation: "Custom connectors are the standard low-code integration mechanism in Copilot Studio/Power Platform: the connector securely authenticates to the REST API, retrieves warranty data dynamically, and is configured with built-in capabilities instead of custom code. They support enterprise auth (OAuth, API keys, Entra ID). The others don't provide API integration, rely on unreliable screen scraping, or use fallback topics (for unrecognized conversations, not data retrieval)."
},
{
  number: 46, type: "twopart",
  stem: "A company has a Copilot Studio agent in production for 3 months with positive feedback. Which Copilot Studio insight should you use for each requirement?",
  parts: [
    { prompt: "Identify the number of questions unanswered by the agent",
      options: [
        {letter:"A", text:"Generated answer written quality"},
        {letter:"B", text:"Conversation outcomes"},
        {letter:"C", text:"Reactions"},
        {letter:"D", text:"Survey results"}
      ], correct:"A" },
    { prompt: "Identify the number of abandoned sessions",
      options: [
        {letter:"A", text:"Generated answer written quality"},
        {letter:"B", text:"Conversation outcomes"},
        {letter:"C", text:"Reactions"},
        {letter:"D", text:"Survey results"}
      ], correct:"B" }
  ],
  explanation: "Generated answer written quality measures how often the agent successfully generates responses and their effectiveness—low/failed generated answers indicate unanswered questions. Conversation outcomes tracks how conversations end (completed, escalated, failed, abandoned), giving direct visibility into abandoned sessions. Reactions capture sentiment and survey results give satisfaction feedback—neither directly tracks these."
},
{
  number: 47, type: "single",
  stem: "A company has a Microsoft Foundry generative AI model. You need to evaluate the model's output to measure the overall quality and coherence of generated responses. The evaluation must use GPT-4 as a judge and return a numeric score for each output. Which type of metric should you use?",
  options: [
    {letter:"A", text:"AI quality (NLP)"},
    {letter:"B", text:"Risk and safety metrics"},
    {letter:"C", text:"Groundedness"},
    {letter:"D", text:"AI quality (AI assisted)"}
  ], correct:["D"],
  explanation: "AI-assisted quality metrics use advanced models such as GPT-4 as a judge to evaluate outputs for coherence, fluency, completeness, relevance, and overall quality, assigning numeric scores—scalable, context-aware assessment. AI quality (NLP) uses traditional NLP techniques, risk and safety metrics focus on harmful content, and groundedness checks whether responses are supported by source data rather than measuring coherence/quality."
},
{
  number: 48, type: "yesno",
  stem: "Case (same scenario for Q48–Q50): A company has a Dynamics 365 Sales environment with Microsoft Copilot enabled. You need to customize Copilot by tailoring how opportunity summaries are generated or presented to users.\n\nSolution: You add fields to the opportunity summary. Does this meet the goal?",
  correct:["A"],
  explanation: "Dynamics 365 Sales Copilot lets organizations customize opportunity summaries by configuring the fields included in the generated summary. Adding relevant fields influences the information shown and tailors summaries to sales/reporting needs—so this meets the goal."
},
{
  number: 49, type: "yesno",
  stem: "Case (same scenario as Q48): Customize how opportunity summaries are generated or presented in Dynamics 365 Sales Copilot.\n\nSolution: You build Microsoft Power Automate flows to trigger customized Copilot summaries. Does this meet the goal?",
  correct:["B"],
  explanation: "Power Automate is for workflow automation and process orchestration. While flows can automate actions and integrate systems, they don't customize the native Copilot opportunity-summary generation logic in Dynamics 365 Sales. Summary customization is done through Copilot configuration features (summary fields and presentation settings), so this does not meet the goal."
},
{
  number: 50, type: "yesno",
  stem: "Case (same scenario as Q48): Customize how opportunity summaries are generated or presented in Dynamics 365 Sales Copilot.\n\nSolution: You configure AI Builder lead-scoring models to influence opportunity summaries. Does this meet the goal?",
  correct:["B"],
  explanation: "AI Builder lead-scoring models are for predictive analytics—evaluating lead quality, predicting conversion likelihood, prioritizing leads. They focus on lead intelligence, not controlling Copilot-generated summaries. Opportunity-summary customization is handled through supported Copilot configuration features, so configuring lead scoring does not meet the goal."
},

// ===================================================================
// ADDITIONAL QUESTIONS (Q51-Q85) gathered from other public AB-100
// practice sources on YouTube. These read the full option text aloud,
// so wording here is accurate (not reconstructed):
//   Q51-Q70: conceptual/fundamentals set (source: "Microsoft AB-100
//            Practice Questions & Answers", youtu.be/XdsyyUwfHkI)
//   Q71-Q80: scenario set (source: "AB-100 ... Exam Practice Questions
//            with explanations", youtu.be/SjxZG08_Knk)
//   Q81-Q84: scenario set (source: "Pass the AB-100 Exam ...",
//            youtu.be/JpVcjPuseVA)
//   Q85:     adaptive-card scenario (source: youtu.be/A-juFfZY2Bo)
// ExamTopics currently publishes NO free AB-100 questions (beta exam),
// and the 5-part "120 questions" series only exposes the same 50 as Q1-50.
// ===================================================================
{
   number: 51, type: "single",
   stem: "A company wants AI agents to complete business tasks with minimal human intervention. What is the primary benefit of an agentic AI solution?",
   options: [
     {letter:"A", text:"It only answers predefined questions"},
     {letter:"B", text:"It can reason, plan, and execute multi-step tasks"},
     {letter:"C", text:"It stores files automatically"},
     {letter:"D", text:"It replaces cloud storage"}
   ], correct:["B"],
   explanation: "Agentic AI systems can analyze goals, create execution plans, call tools or services, and complete complex multi-step workflows with limited human guidance. Simply answering predefined questions, storing files, or replacing cloud storage do not describe agentic behavior."
},
{
   number: 52, type: "single",
   stem: "As a business solutions architect, what should be your first step before designing an AI solution?",
   options: [
     {letter:"A", text:"Deploy the application"},
     {letter:"B", text:"Understand business goals and stakeholder requirements"},
     {letter:"C", text:"Purchase cloud licenses"},
     {letter:"D", text:"Train every available AI model"}
   ], correct:["B"],
   explanation: "A successful AI solution begins with understanding business objectives, user needs, success metrics, and operational constraints. Deploying, buying licenses, or training models before understanding requirements risks building the wrong solution."
},
{
   number: 53, type: "single",
   stem: "Which Microsoft platform is commonly used to build conversational AI agents?",
   options: [
     {letter:"A", text:"Microsoft Copilot Studio"},
     {letter:"B", text:"Microsoft Paint"},
     {letter:"C", text:"Microsoft Access"},
     {letter:"D", text:"Microsoft Visio"}
   ], correct:["A"],
   explanation: "Copilot Studio enables organizations to create AI-powered conversational agents that integrate with Microsoft services and business applications. Paint, Access, and Visio are unrelated to conversational AI."
},
{
   number: 54, type: "single",
   stem: "Why is retrieval-augmented generation (RAG) important in enterprise AI solutions?",
   options: [
     {letter:"A", text:"It increases monitor resolution"},
     {letter:"B", text:"It combines trusted business data with AI-generated responses"},
     {letter:"C", text:"It replaces authentication"},
     {letter:"D", text:"It removes all security controls"}
   ], correct:["B"],
   explanation: "RAG improves response quality and accuracy by retrieving relevant information from approved knowledge sources before generating an answer, grounding the AI in trusted business data instead of relying on the model alone."
},
{
   number: 55, type: "single",
   stem: "Which Microsoft service is commonly used to automate actions performed by AI agents?",
   options: [
     {letter:"A", text:"Power Automate"},
     {letter:"B", text:"Microsoft Word"},
     {letter:"C", text:"Excel Online"},
     {letter:"D", text:"OneDrive Sync"}
   ], correct:["A"],
   explanation: "Power Automate connects AI agents with business systems, allowing them to create records, send emails, update databases, and trigger workflows. Word, Excel, and OneDrive Sync do not orchestrate automated actions for agents."
},
{
   number: 56, type: "single",
   stem: "Why should sensitive business information be protected with role-based access control (RBAC)?",
   options: [
     {letter:"A", text:"To reduce internet usage"},
     {letter:"B", text:"To ensure only authorized users access resources"},
     {letter:"C", text:"To improve graphics"},
     {letter:"D", text:"To increase storage capacity"}
   ], correct:["B"],
   explanation: "Role-based access control ensures only authorized users can access specific resources, protecting confidential information while supporting governance and compliance requirements."
},
{
   number: 57, type: "single",
   stem: "Which factor is most important when selecting an AI model?",
   options: [
     {letter:"A", text:"Logo color"},
     {letter:"B", text:"Business requirements and use case"},
     {letter:"C", text:"Office location"},
     {letter:"D", text:"Screen size"}
   ], correct:["B"],
   explanation: "The chosen AI model should align with business goals, required capabilities, cost, latency, and regulatory requirements. Cosmetic or unrelated factors do not drive model selection."
},
{
   number: 58, type: "single",
   stem: "Why is prompt engineering valuable when designing AI solutions?",
   options: [
     {letter:"A", text:"It improves AI response quality"},
     {letter:"B", text:"It upgrades hardware"},
     {letter:"C", text:"It replaces application testing"},
     {letter:"D", text:"It increases bandwidth"}
   ], correct:["A"],
   explanation: "Effective prompts help AI models better understand user intent, producing more accurate and useful responses. Prompt engineering is unrelated to hardware, testing, or bandwidth."
},
{
   number: 59, type: "single",
   stem: "What is one advantage of integrating Microsoft Dataverse with AI agents?",
   options: [
     {letter:"A", text:"It provides structured business data"},
     {letter:"B", text:"It increases internet speed"},
     {letter:"C", text:"It replaces Azure"},
     {letter:"D", text:"It stores operating systems"}
   ], correct:["A"],
   explanation: "Dataverse securely stores structured business information that AI agents can access to deliver contextual and personalized responses. It is not an internet accelerator, a replacement for Azure, or an OS store."
},
{
   number: 60, type: "single",
   stem: "Which deployment practice helps reduce risks before releasing an AI solution?",
   options: [
     {letter:"A", text:"Skip testing"},
     {letter:"B", text:"Pilot testing with selected users"},
     {letter:"C", text:"Disable monitoring"},
     {letter:"D", text:"Remove authentication"}
   ], correct:["B"],
   explanation: "Pilot deployments let organizations gather feedback, identify issues, and refine AI behavior before an enterprise-wide rollout. Skipping testing, disabling monitoring, or removing authentication all increase risk."
},
{
   number: 61, type: "single",
   stem: "What is the primary purpose of governance in AI projects?",
   options: [
     {letter:"A", text:"Increase processor speed"},
     {letter:"B", text:"Ensure responsible, secure, and compliant AI usage"},
     {letter:"C", text:"Reduce internet traffic"},
     {letter:"D", text:"Improve monitor quality"}
   ], correct:["B"],
   explanation: "AI governance establishes policies for security, compliance, transparency, accountability, and ethical AI implementation, ensuring the solution is used responsibly."
},
{
   number: 62, type: "single",
   stem: "Which Azure capability helps monitor application performance and health?",
   options: [
     {letter:"A", text:"Azure Monitor"},
     {letter:"B", text:"Paint"},
     {letter:"C", text:"Calculator"},
     {letter:"D", text:"Sticky Note"}
   ], correct:["A"],
   explanation: "Azure Monitor collects logs, metrics, and alerts that help teams detect issues and optimize application performance. The other choices are unrelated desktop utilities."
},
{
   number: 63, type: "single",
   stem: "Why should AI-generated outputs be reviewed in critical business scenarios?",
   options: [
     {letter:"A", text:"AI is always perfect"},
     {letter:"B", text:"Human validation reduces the impact of incorrect responses"},
     {letter:"C", text:"To reduce storage"},
     {letter:"D", text:"To improve network speed"}
   ], correct:["B"],
   explanation: "Human oversight is essential for high-impact decisions because AI-generated content may occasionally contain inaccuracies; validation reduces the impact of any incorrect responses."
},
{
   number: 64, type: "single",
   stem: "Which Microsoft identity solution supports secure authentication?",
   options: [
     {letter:"A", text:"Microsoft Entra ID"},
     {letter:"B", text:"Notepad"},
     {letter:"C", text:"Windows Media Player"},
     {letter:"D", text:"PowerPoint"}
   ], correct:["A"],
   explanation: "Microsoft Entra ID provides secure authentication, identity management, and access control across Microsoft cloud services. The other options are not identity providers."
},
{
   number: 65, type: "single",
   stem: "A customer wants AI to summarize lengthy reports. Which AI capability best fits this requirement?",
   options: [
     {letter:"A", text:"Text summarization"},
     {letter:"B", text:"Image compression"},
     {letter:"C", text:"Network routing"},
     {letter:"D", text:"Disk partitioning"}
   ], correct:["A"],
   explanation: "Text summarization uses generative AI to extract the most important information from long documents into concise summaries. The other options are unrelated to language tasks."
},
{
   number: 66, type: "single",
   stem: "What is one benefit of continuous monitoring after deployment?",
   options: [
     {letter:"A", text:"It identifies opportunities to improve AI performance"},
     {letter:"B", text:"It permanently removes bugs"},
     {letter:"C", text:"It eliminates updates"},
     {letter:"D", text:"It replaces security reviews"}
   ], correct:["A"],
   explanation: "Monitoring usage patterns and performance helps organizations improve accuracy, reliability, and user satisfaction over time. It does not permanently remove bugs or replace updates and security reviews."
},
{
   number: 67, type: "single",
   stem: "Which design principle improves user trust in AI systems?",
   options: [
     {letter:"A", text:"Transparency"},
     {letter:"B", text:"Random responses"},
     {letter:"C", text:"Hidden decisions"},
     {letter:"D", text:"Unlimited permissions"}
   ], correct:["A"],
   explanation: "Transparent AI helps users understand how responses are generated and builds confidence in AI-assisted decisions. Randomness, hidden logic, and unlimited permissions erode trust."
},
{
   number: 68, type: "single",
   stem: "What is the benefit of integrating external business systems into an AI solution?",
   options: [
     {letter:"A", text:"AI can perform real business operations"},
     {letter:"B", text:"It increases screen resolution"},
     {letter:"C", text:"It removes authentication"},
     {letter:"D", text:"It replaces databases"}
   ], correct:["A"],
   explanation: "Integrating business systems enables AI agents to retrieve information, update records, approve requests, and automate real workflows rather than only conversing."
},
{
   number: 69, type: "single",
   stem: "Which metric is most useful when evaluating an AI business solution?",
   options: [
     {letter:"A", text:"Number of desktop wallpapers"},
     {letter:"B", text:"Business outcomes and user satisfaction"},
     {letter:"C", text:"Keyboard model"},
     {letter:"D", text:"Cable length"}
   ], correct:["B"],
   explanation: "The success of an AI solution should be measured using business value, efficiency improvements, accuracy, and user experience, not unrelated hardware attributes."
},
{
   number: 70, type: "single",
   stem: "What is considered a best practice for maintaining enterprise AI solutions?",
   options: [
     {letter:"A", text:"Publish once and never review"},
     {letter:"B", text:"Continuously monitor, improve, retrain, and update the solution"},
     {letter:"C", text:"Remove all logs"},
     {letter:"D", text:"Ignore user feedback"}
   ], correct:["B"],
   explanation: "Enterprise AI solutions require ongoing optimization, monitoring, governance, retraining, and updates to remain accurate, secure, and aligned with changing business needs."
},
{
   number: 71, type: "single",
   stem: "A global enterprise is migrating its entire on-premises infrastructure to the cloud to support new AI-driven initiatives. It requires a structured methodology to ensure user authentication, security frameworks, and service adoption follow industry best practices. Which framework should be recommended to guide this infrastructure transition?",
   options: [
     {letter:"A", text:"Microsoft Cloud Adoption Framework for Azure"},
     {letter:"B", text:"Success by Design"},
     {letter:"C", text:"Microsoft Power Platform Well-Architected Framework"},
     {letter:"D", text:"Center of Excellence (CoE) accelerator for Microsoft Power Platform"}
   ], correct:["A"],
   explanation: "The Cloud Adoption Framework (CAF) for Azure provides documentation, implementation guidance, and best practices for building cloud business and technology strategies, including infrastructure migration, security, and identity management. It establishes the scalable, secure foundation needed for AI solutions and reduces digital-transformation risk."
},
{
   number: 72, type: "single",
   stem: "A company uses Dynamics 365 Sales where lead data is stored in a Dataverse table. The table uses custom column names and industry-specific terminology that differ from standard defaults. You need Copilot features to accurately summarize these leads with minimal configuration effort. How should the business terms be configured in the Dataverse table?",
   options: [
     {letter:"A", text:"Consolidate all relevant data into a single long-form custom field"},
     {letter:"B", text:"Assign the field display names as the primary business terms"},
     {letter:"C", text:"Use the underlying technical schema names as business terms"},
     {letter:"D", text:"Manually define entirely new business terms for every individual field"}
   ], correct:["B"],
   explanation: "Mapping field display names as business terms lets Copilot understand the context and meaning of data in custom columns by reusing existing metadata. This bridges technical schema and natural language with minimal administrative overhead, producing summaries that reflect the sales team's business language."
},
{
   number: 73, type: "single",
   stem: "An organization wants an AI-powered customer service solution that handles routine inquiries and escalates complex issues to a human agent. Before proceeding, the board requires a rigorous analysis to justify the investment. What is the first step to perform a return-on-AI-investment (ROI) analysis?",
   options: [
     {letter:"A", text:"Define the specific AI performance metrics to be tracked"},
     {letter:"B", text:"Perform a market benchmarking study of similar AI solutions"},
     {letter:"C", text:"Map out the entire customer journey and experience model"},
     {letter:"D", text:"Identify and quantify all development, deployment, and operational costs"}
   ], correct:["D"],
   explanation: "Calculating ROI requires first establishing a clear baseline of all costs—development, deployment, and ongoing maintenance/subscription fees. Without this total cost of ownership, any later calculation of savings or productivity gains is flawed."
},
{
   number: 74, type: "single",
   stem: "A financial institution is deploying a Copilot Studio agent to predict customer churn by analyzing historical data currently scattered across Azure SQL databases, flat files, and various APIs. You need to consolidate this information into a searchable format the agent can use as a knowledge source. Which component should be included in the solution?",
   options: [
     {letter:"A", text:"Azure AI Search"},
     {letter:"B", text:"Azure Data Lake Storage"},
     {letter:"C", text:"Azure Cosmos DB"},
     {letter:"D", text:"Azure Translator"}
   ], correct:["A"],
   explanation: "Azure AI Search ingests data from diverse sources (SQL, files, APIs) and indexes it for efficient retrieval, providing the grounding that lets a Copilot Studio agent search organizational data for relevant answers. Data Lake stores raw data, Cosmos DB is a distributed database, and Translator only handles language translation."
},
{
   number: 75, type: "single",
   stem: "A company has several AI initiatives at various stages, from prototypes to fully deployed agents. Leadership needs a structured way to evaluate the financial impact of these projects while balancing immediate productivity gains against long-term strategic value. Which framework should be recommended?",
   options: [
     {letter:"A", text:"A standard cost-benefit analysis grid"},
     {letter:"B", text:"A horizon-based framework"},
     {letter:"C", text:"Internal rate of return (IRR) modeling"},
     {letter:"D", text:"A simple prioritization matrix"}
   ], correct:["B"],
   explanation: "A horizon-based framework categorizes AI investments by time frame—Horizon 1 (improve current operations), Horizon 2 (expand into new areas), and Horizon 3 (long-term disruptive innovation). It prevents focusing only on short-term ROI at the expense of future competitive advantage and shows how projects contribute to strategy over time."
},
{
   number: 76, type: "single",
   stem: "A retail business plans to deploy two AI systems: a Copilot Studio agent for commerce and a Power App for inventory management. Both need to access the same product catalog data to ensure consistency. What is the most effective way to organize the product catalog data?",
   options: [
     {letter:"A", text:"Configure each agent to scrape data from individual SharePoint libraries"},
     {letter:"B", text:"Create separate custom tables for the product data within each individual agent"},
     {letter:"C", text:"Extract product details from vendor-provided PDF documents using prompts"},
     {letter:"D", text:"Centralize the data in Microsoft Dataverse and share it with both systems"}
   ], correct:["D"],
   explanation: "Centralizing data in Dataverse creates a single source of truth accessible by multiple apps and agents at once, so updates are immediately reflected everywhere—preventing data silos and inconsistencies. Dataverse also adds security, auditing, and data classification for enterprise-grade AI."
},
{
   number: 77, type: "single",
   stem: "A developer is extending a Microsoft 365 Copilot solution so it can trigger specific business logic hosted in an external Azure-based service. Which component must be implemented to allow the Copilot to invoke this external logic?",
   options: [
     {letter:"A", text:"Microsoft Copilot Studio skills"},
     {letter:"B", text:"Microsoft Power Platform connectors"},
     {letter:"C", text:"Custom engine agents"},
     {letter:"D", text:"Azure AI Search indexes"}
   ], correct:["B"],
   explanation: "Power Platform connectors bridge Copilot and external services, enabling defined triggers and actions that the Copilot can invoke—such as calling a specialized API or a legacy system on Azure. This extensibility lets agents act across a wide ecosystem of tools."
},
{
   number: 78, type: "single",
   stem: "An organization using Dynamics 365 Finance and Operations wants to enhance its internal Copilot agent with specific business-process documentation to guide employees through complex tasks, without creating entirely new topics. Which knowledge source should be added to the agent?",
   options: [
     {letter:"A", text:"A connection to the local Dataverse environment"},
     {letter:"B", text:"A link to a public-facing corporate website"},
     {letter:"C", text:"An Azure AI Search service index"},
     {letter:"D", text:"A direct file upload of the process documentation"}
   ], correct:["D"],
   explanation: "Uploading files directly as a knowledge source lets the agent use generative AI to answer from the documents' content without authoring new conversation topics—the most efficient way to add internal manuals, SOPs, or process guides to an existing agent while keeping the knowledge easy to update."
},
{
   number: 79, type: "single",
   stem: "A financial services firm wants to automate fraud detection. Staff currently check transaction logs for red flags manually. The new solution must use AI to identify risks but must always require a human analyst to authorize the final escalation. What automation strategy should be recommended?",
   options: [
     {letter:"A", text:"Deploy an autonomous agent that can independently close cases"},
     {letter:"B", text:"Use a Copilot agent in Word to draft new fraud policies"},
     {letter:"C", text:"Implement a task-based agent that calculates risk scores for human review"},
     {letter:"D", text:"Move all logs to a data lake for manual analysis in Power BI"}
   ], correct:["C"],
   explanation: "A task-based agent performs specific high-volume processing—calculating fraud risk scores from historical patterns—while leaving the final decision to a human. This keeps a human in the loop for critical decisions, aligns with responsible AI (augment rather than replace), and still boosts review efficiency."
},
{
   number: 80, type: "single",
   stem: "Sales executives at a consumer goods company need to access internal policies and customer data while on-site with clients. To maintain eye contact they cannot use keyboards or mobile phones. Which Microsoft Copilot Studio template should be used?",
   options: [
     {letter:"A", text:"IT help desk"},
     {letter:"B", text:"AI agents in Microsoft Foundry"},
     {letter:"C", text:"Voice"},
     {letter:"D", text:"AI chat in Microsoft Foundry"}
   ], correct:["C"],
   explanation: "The Voice template in Copilot Studio supports hands-free, speech-based interactions through voice channels/headsets—letting executives ask questions and hear responses without a keyboard or phone, so they can focus fully on the customer during field visits."
},
{
   number: 81, type: "multi",
   stem: "A company needs to recommend an automated application lifecycle management (ALM) approach for its Copilot Studio components across environments. Which two options should you recommend?",
   options: [
     {letter:"A", text:"Use an unmanaged solution in the production environment"},
     {letter:"B", text:"Rebuild the agents in every environment"},
     {letter:"C", text:"Implement Microsoft Power Platform pipelines"},
     {letter:"D", text:"Package the components inside a solution"}
   ], correct:["C","D"],
   explanation: "Power Platform pipelines automate deployment across environments and ensure safe promotion of Copilot components, while packaging components inside a solution supports versioning, dependencies, and ALM governance. Unmanaged solutions should not be used in production, and rebuilding agents per environment increases risk and effort."
},
{
   number: 82, type: "single",
   stem: "You need to recommend a solution that can evaluate the impact of a deployment while enhancing business continuity and supporting compliance review of prior releases. What should you recommend?",
   options: [
     {letter:"A", text:"Create a central model registry with version history"},
     {letter:"B", text:"Establish a promotion process using a quality gate"},
     {letter:"C", text:"Implement version control for all AI system components"},
     {letter:"D", text:"Track model retirement schedules to avoid service disruption"}
   ], correct:["A"],
   explanation: "A central model registry with version history provides version tracking and supports compliance review of prior releases, letting you evaluate deployment impact and roll back for continuity. Quality gates enforce standards but do not retain historical versions; general version control manages code, not deployed-model governance; retirement schedules prevent disruption but don't address compliance review or deployment impact."
},
{
   number: 83, type: "single",
   stem: "A company needs a governance solution that can monitor and audit changes to model configuration and data usage while minimizing administrative overhead. Which solution should you recommend?",
   options: [
     {letter:"A", text:"Azure Monitor"},
     {letter:"B", text:"Azure Stream Analytics"},
     {letter:"C", text:"Azure API Management"},
     {letter:"D", text:"Microsoft Purview"}
   ], correct:["D"],
   explanation: "Microsoft Purview provides governance, auditing, and compliance capabilities for monitoring model configuration and data usage. Azure Monitor tracks performance/metrics, Stream Analytics processes real-time streams, and API Management secures APIs—none provide governance/audit of model configuration. Tip: when you see the keyword governance, think Microsoft Purview."
},
{
   number: 84, type: "multi",
   stem: "To support a return-on-AI-investment (ROI) analysis, you need to identify the measurable business drivers of an AI customer-service solution. Which two drivers should you select?",
   options: [
     {letter:"A", text:"Reduce average case resolution time"},
     {letter:"B", text:"Market capitalization"},
     {letter:"C", text:"Economic market predictability"},
     {letter:"D", text:"Increased employee productivity"}
   ], correct:["A","D"],
   explanation: "Reducing average case resolution time measures efficiency gains in customer service, and increased employee productivity reflects improved performance from AI support—both are tangible, AI-driven business drivers. Market capitalization reflects investor value and economic predictability is external; neither is directly influenced by the AI solution."
},
{
   number: 85, type: "single",
   stem: "A support agent must present three structured incident fields and let the user confirm or correct them before creating a ticket. Which response component is most appropriate?",
   options: [
     {letter:"A", text:"An adaptive card with input controls and a submit action"},
     {letter:"B", text:"A static knowledge source"},
     {letter:"C", text:"An Application Insights query"},
     {letter:"D", text:"An environment variable"}
   ], correct:["A"],
   explanation: "Adaptive cards provide structured presentation, input controls, and a submit action inside the conversation, making them ideal for letting a user review, confirm, or correct fields before a ticket is created. A knowledge source only supplies content, Application Insights is for telemetry, and an environment variable stores configuration—none capture interactive user input."
}
];
