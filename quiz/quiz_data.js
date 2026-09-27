const QUIZ_DATA = [
 {
  "number": 1,
  "type": "mc",
  "multi": false,
  "stem": "Background -\nFabrikam Inc. is a mid-sized healthcare analytics company that provides population health dashboards and predictive \ninsights to regional hospital systems across the United States. Fabrikam Inc. customers rely on near real time analytics to \nmonitor patient flow, staffing needs, and readmission risks. They use multiple traditional forecasting machine learning \nmodels for predictions.\nFabrikam Inc. has an established Microsoft Azure footprint. The company uses Jupyter Notebooks that run on a local server as \nthe primary development environment. The data science team is experiencing scalability, asset management and code \nmanagement issues with the current development platform. Fabrikam Inc. plans to migrate to a cloud-based development \nenvironment to mitigate the issues.\nAdditionally, the company plans to implement a Retrieval-Augmented Generation (RAG)-based chat application for client \nsupport. Leadership requires the application to be developed and deployed with a low operational risk.\nCurrent Environment -\nFabrikam Inc. operates a single Azure subscription that has the following components:\nAzure Data Lake Storage Gen2 that contains de-identified clinical and operational datasets\nAzure AI Search indexing curated analytical documents and reference materials\nA small set of Python-based training scripts maintained by data scientists\nAzure OpenAI Service with deployed foundational models\nA Microsoft Foundry resource for building a RAG-based solution\nEvaluation data has manually defined expected responses.\nThe current challenges faced by the data science team include the following:\nModel training jobs are run manually from notebooks.\nExperiment tracking is inconsistent\nModel versions are registered without standardized metadata.\nDeployment is performed manually by data scientists, with limited rollback capability.\nThe team has no standardized evaluation process for generative AI outputs.\nThe environment currently allows public network access. Authentication relies on user accounts rather than managed identities. \nCompute targets are manually created and shared across experiments. This has led to resource contention during peak usage.\nBusiness Requirements -\nFabrikam Inc. has the following business requirements for the modernization initiative:\nProvide a conversational interface that answers analytics questions by using internal documents and datasets.\nEnsure that sensitive healthcare-related data is not exposed outside the Fabrikam Inc. Azure tenant.\nEnable repeatable and auditable model training and deployment processes.\nSupport experimentation to compare prompt strategies and fine-tuned models.\nAlign the model with the ranked preferences and optimize behavior for the long term.\nMinimize disruption to existing analytics workloads during rollout.\nTechnical Requirements -\nTo support the business goals, Fabrikam Inc. identifies these technical requirements:\nUse Azure Machine Learning workspaces to centrally manage data assets, models, and environments.\nImplement experiment tracking and model versioning for all training jobs.\nOrchestrate training and evaluation by using pipelines rather than manually running notebooks.\nDeploy traditional machine learning models with support for staged rollout and rollback.\nImprove RAG-based solution output quality.\nUse the existing evaluation datasets that are based on real data with input-output pairs.\nApply advanced fine-tuning techniques only when prompt engineering is insufficient\nIssues and Constraints -\nFabrikam Inc. must comply with internal security policies that require the company to restrict network access and avoid \nlong-lived secrets. The data science team has limited Azure DevOps experience, so solutions must favor managed services \nand automation over custom infrastructure.\nCost predictability is important. Leadership prefers serverless or managed compute options where possible but is willing \nto approve dedicated compute for stable production workloads.\nProblem Statement -\nFabrikam Inc. must design and implement an Azure-based AI operations solution that enables reliable training, evaluation, \ndeployment, and iteration of generative AI models. The solution must support experimentation and gradual rollout while \nensuring governance, security, and operational stability. The data science and platform teams must collaborate to deliver \nthis solution by using Azure Machine Learning and Microsoft Foundry capabilities.\nYou need to standardize how Fabrikam Inc. manages machine learning assets.\nWhich action should you perform first?",
  "options": [
   {
    "letter": "A",
    "text": "Register assets in the Azure Machine Learning registry."
   },
   {
    "letter": "B",
    "text": "Create a shared Azure Machine Learning workspace."
   },
   {
    "letter": "C",
    "text": "Deploy a managed online endpoint."
   },
   {
    "letter": "D",
    "text": "Create a new Microsoft Foundry project."
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "The Azure Machine Learning workspace is the top-level container that centrally holds and governs all ML assets (datasets, models, environments, components). You must create it first before you can register or manage anything in it. A registry (A) and endpoints (C) come later; a Foundry project (D) targets generative AI, not traditional ML asset management."
 },
 {
  "number": 2,
  "type": "mc",
  "multi": false,
  "stem": "Background -\nFabrikam Inc. is a mid-sized healthcare analytics company that provides population health dashboards and predictive insights \nto regional hospital systems across the United States. Fabrikam Inc. customers rely on near real time analytics to monitor \npatient flow, staffing needs, and readmission risks. They use multiple traditional forecasting machine learning models for \npredictions.\nFabrikam Inc. has an established Microsoft Azure footprint. The company uses Jupyter Notebooks that run on a local server as \nthe primary development environment. The data science team is experiencing scalability, asset management and code \nmanagement issues with the current development platform. Fabrikam Inc. plans to migrate to a cloud-based development \nenvironment to mitigate the issues.\nAdditionally, the company plans to implement a Retrieval-Augmented Generation (RAG)-based chat application for client \nsupport. Leadership requires the application to be developed and deployed with a low operational risk.\nCurrent Environment -\nFabrikam Inc. operates a single Azure subscription that has the following components:\nAzure Data Lake Storage Gen2 that contains de-identified clinical and operational datasets\nAzure AI Search indexing curated analytical documents and reference materials\nA small set of Python-based training scripts maintained by data scientists\nAzure OpenAI Service with deployed foundational models\nA Microsoft Foundry resource for building a RAG-based solution\nEvaluation data has manually defined expected responses.\nThe current challenges faced by the data science team include the following:\nModel training jobs are run manually from notebooks.\nExperiment tracking is inconsistent\nModel versions are registered without standardized metadata.\nDeployment is performed manually by data scientists, with limited rollback capability.\nThe team has no standardized evaluation process for generative AI outputs.\nThe environment currently allows public network access. Authentication relies on user accounts rather than managed identities. \nCompute targets are manually created and shared across experiments. This has led to resource contention during peak usage.\nBusiness Requirements -\nFabrikam Inc. has the following business requirements for the modernization initiative:\nProvide a conversational interface that answers analytics questions by using internal documents and datasets.\nEnsure that sensitive healthcare-related data is not exposed outside the Fabrikam Inc. Azure tenant.\nEnable repeatable and auditable model training and deployment processes.\nSupport experimentation to compare prompt strategies and fine-tuned models.\nAlign the model with the ranked preferences and optimize behavior for the long term.\nMinimize disruption to existing analytics workloads during rollout.\nTechnical Requirements -\nTo support the business goals, Fabrikam Inc. identifies these technical requirements:\nUse Azure Machine Learning workspaces to centrally manage data assets, models, and environments.\nImplement experiment tracking and model versioning for all training jobs.\nOrchestrate training and evaluation by using pipelines rather than manually running notebooks.\nDeploy traditional machine learning models with support for staged rollout and rollback.\nImprove RAG-based solution output quality.\nUse the existing evaluation datasets that are based on real data with input-output pairs.\nApply advanced fine-tuning techniques only when prompt engineering is insufficient\nIssues and Constraints -\nFabrikam Inc. must comply with internal security policies that require the company to restrict network access and avoid long-\nlived secrets. The data science team has limited Azure DevOps experience, so solutions must favor managed services and \nautomation over custom infrastructure.\nCost predictability is important. Leadership prefers serverless or managed compute options where possible but is willing to \napprove dedicated compute for stable production workloads.\nProblem Statement -\nFabrikam Inc. must design and implement an Azure-based AI operations solution that enables reliable training, evaluation, \ndeployment, and iteration of generative AI models. The solution must support experimentation and gradual rollout while \nensuring governance, security, and operational stability. The data science and platform teams must collaborate to deliver this \nsolution by using Azure Machine Learning and Microsoft Foundry capabilities.\nYou need to isolate training workloads while remaining cost-aware to address Fabrikam Inc.’s issues, constraints, and \ntechnical requirements.\nWhat should you implement?",
  "options": [
   {
    "letter": "A",
    "text": "Training jobs that run on a single shared compute cluster"
   },
   {
    "letter": "B",
    "text": "Fixed-size compute cluster"
   },
   {
    "letter": "C",
    "text": "Dedicated compute clusters per experiment"
   },
   {
    "letter": "D",
    "text": "Managed compute targets with autoscaling"
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "Managed compute with autoscaling isolates each training workload while scaling to zero when idle, giving both isolation and cost control. Shared or fixed-size clusters cause resource contention or waste, and a dedicated cluster per experiment is not cost-aware."
 },
 {
  "number": 3,
  "type": "reveal",
  "question_images": [
   "assets/q3_q0.png",
   "assets/q3_q1.png"
  ],
  "answer_images": [
   "assets/q3_a0.png"
  ],
  "label": "Hotspot",
  "explanation": "This hotspot matches each requirement to the right managed inference option. Low-latency synchronous predictions need a Real-time (online) endpoint, which serves single requests with low latency. High-volume scheduled scoring needs a Batch endpoint, which processes large datasets on a schedule cost-efficiently. Training pipelines, registered artifacts and compute clusters   are not inference-serving options."
 },
 {
  "number": 4,
  "type": "mc",
  "multi": false,
  "stem": "You manage an Azure Machine learning workspace. You develop a machine learning model.\nYou must deploy the model to use a low-priority VM with a pricing discount.\nYou need to deploy the model.\nWhich compute target should you use?",
  "options": [
   {
    "letter": "A",
    "text": "Azure Container Instances (ACI)"
   },
   {
    "letter": "B",
    "text": "Azure Machine Learning compute clusters"
   },
   {
    "letter": "C",
    "text": "Local deployment"
   },
   {
    "letter": "D",
    "text": "Azure Kubernetes Service (AKS)"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Low-priority (Spot) VMs with discounted pricing are supported on Azure Machine Learning compute clusters. ACI and AKS do not offer low-priority pricing for this scenario, and local deployment has no VM discount."
 },
 {
  "number": 5,
  "type": "mc",
  "multi": false,
  "stem": "A team manages an Azure Machine Learning workspace where they deploy models to online endpoints.\nThe team needs to introduce a new version of a model to production without disrupting existing users.\nThe team must validate the new version before full rollout.\nYou need to reduce risk during deployment.\nWhat should you do?",
  "options": [
   {
    "letter": "A",
    "text": "Deploy the model to a batch endpoint."
   },
   {
    "letter": "B",
    "text": "Split traffic between deployments."
   },
   {
    "letter": "C",
    "text": "Replace the existing endpoint."
   },
   {
    "letter": "D",
    "text": "Route all traffic to the new deployment."
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Blue/green traffic splitting on an online endpoint routes a small percentage to the new deployment so you can validate it before shifting all traffic, with no disruption to existing users. Batch endpoints are not for real-time users, and replacing or routing all traffic is risky."
 },
 {
  "number": 6,
  "type": "mc",
  "multi": false,
  "stem": "You have a deployment of an Azure OpenAI Service base model.\nYou plan to fine-tune the model.\nYou need to prepare a file that contains training data.\nWhich file format should you use?",
  "options": [
   {
    "letter": "A",
    "text": "CSV"
   },
   {
    "letter": "B",
    "text": "TSV"
   },
   {
    "letter": "C",
    "text": "JSONL"
   },
   {
    "letter": "D",
    "text": "JSON"
   }
  ],
  "correct": [
   "C"
  ],
  "explanation": "Azure OpenAI fine-tuning requires training data in JSON Lines (JSONL) format, one JSON example per line. CSV, TSV and plain JSON are not accepted."
 },
 {
  "number": 7,
  "type": "mc",
  "multi": false,
  "stem": "You have a deployment of an Azure OpenAI Service base model.\nYou plan to fine-tune the model.\nYou need to prepare a file that contains training data for multi-turn chat.\nWhich file encoding method should you use?",
  "options": [
   {
    "letter": "A",
    "text": "ISO-8859-1"
   },
   {
    "letter": "B",
    "text": "UTF-16"
   },
   {
    "letter": "C",
    "text": "UTF-8"
   },
   {
    "letter": "D",
    "text": "ASCII"
   }
  ],
  "correct": [
   "C"
  ],
  "explanation": "Fine-tuning training files must be encoded as UTF-8. Other encodings (ASCII, UTF-16, ISO-8859-1) can corrupt tokens and special characters used in multi-turn chat data."
 },
 {
  "number": 8,
  "type": "mc",
  "multi": false,
  "stem": "You are fine-tuning a base language model to analyze customer feedback.\nYou label examples of support tickets. You must improve classification accuracy by configuring and fine-tuning the base \nmodel in Microsoft Foundry.\nYou need to configure and run fine-tuning.\nWhat should you do first?",
  "options": [
   {
    "letter": "A",
    "text": "Use prompt flow to generate multiple prompt templates for evaluation."
   },
   {
    "letter": "B",
    "text": "Deploy the base model to an online endpoint before starting fine-tuning."
   },
   {
    "letter": "C",
    "text": "Enable tracing for all inference calls in the evaluation pipeline."
   },
   {
    "letter": "D",
    "text": "Format the dataset as a JSONL file with prompt-completion pairs and upload the file."
   }
  ],
  "correct": [
   "D"
  ],
  "correction": {
   "answer": "D",
   "was": "C",
   "confidence": "High"
  },
  "explanation": "Fine-tuning begins with preparing labeled data as a JSONL file of prompt-completion pairs and uploading it. Prompt flow, deploying an endpoint, and enabling tracing are later or unrelated steps."
 },
 {
  "number": 9,
  "type": "mc",
  "multi": true,
  "stem": "A data science team trains a classification model that predicts loan approval outcomes.\nBefore registering the model, the team must ensure the following:\n- Predictions must not disproportionately impact protected groups.\n- Prediction errors can be evaluated across different data segments.\nYou need to assess whether the model meets Responsible AI expectations.\nWhich two approaches should you use? Each correct answer presents part of the solution.\nChoose two.\nNOTE: Each correct selection is worth one point.",
  "options": [
   {
    "letter": "A",
    "text": "Analyze error rates across defined demographic cohorts."
   },
   {
    "letter": "B",
    "text": "Evaluate feature importance for prediction transparency."
   },
   {
    "letter": "C",
    "text": "Measure endpoint latency under load."
   },
   {
    "letter": "D",
    "text": "Analyze error rates across the global cohort."
   },
   {
    "letter": "E",
    "text": "Validate inference schema compatibility."
   }
  ],
  "correct": [
   "A",
   "B"
  ],
  "explanation": "Fairness toward protected groups is assessed by comparing error rates across defined demographic cohorts (A), and prediction transparency across segments comes from feature importance (B). Latency and schema checks (C, E) are not Responsible-AI measures, and a single global cohort (D) hides group-level disparities."
 },
 {
  "number": 10,
  "type": "mc",
  "multi": false,
  "stem": "A team schedules weekly retraining of a model using Azure ML pipelines. They also want retraining triggered \nautomatically when production data significantly deviates from training data distribution, without duplicating pipeline \nlogic. What should they implement?",
  "options": [
   {
    "letter": "A",
    "text": "One pipeline triggered by schedule and data drift alerts"
   },
   {
    "letter": "B",
    "text": "Azure Function to retrain model manually"
   },
   {
    "letter": "C",
    "text": "Notebook-based retraining process"
   },
   {
    "letter": "D",
    "text": "Two independent pipelines with shared scripts"
   }
  ],
  "correct": [
   "A"
  ],
  "explanation": "A single pipeline with two triggers (a weekly schedule plus a data-drift alert) meets both needs without duplicating pipeline logic. Two pipelines duplicate logic, and functions or notebooks are manual."
 },
 {
  "number": 11,
  "type": "mc",
  "multi": false,
  "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series \ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct \nsolution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not \nappear on the review screen.\nYou work in Microsoft Foundry with a prompt flow.\nYou must manually evaluate prompts and compare results across prompt variants.\nYou need to capture the inputs, outputs, token usage, and latencies for each flow run for the evaluation.\nSolution: In Microsoft Foundry, turn on Tracing for the prompt flow of the project and execute test runs to produce trace \ndata.\nDoes the solution meet the goal?",
  "options": [
   {
    "letter": "A",
    "text": "No"
   },
   {
    "letter": "B",
    "text": "Yes"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Turning on Tracing for the prompt flow in Foundry captures the inputs, outputs, token usage and latency for each run, which is exactly what the goal requires. So the solution meets the goal (Yes)."
 },
 {
  "number": 12,
  "type": "mc",
  "multi": false,
  "stem": "A team develops multiple AI applications in Microsoft Foundry that rely on shared prompt templates.\nThe team requires a centralized way to track, version, and reuse prompt content across projects.\nYou need to recommend a solution to track and reuse prompt content.\nWhich approach should you recommend?",
  "options": [
   {
    "letter": "A",
    "text": "Embed prompts directly in application configuration files."
   },
   {
    "letter": "B",
    "text": "Store prompts as versioned files in a Git repository."
   },
   {
    "letter": "C",
    "text": "Register prompts as datasets in the Azure Machine Learning workspace."
   },
   {
    "letter": "D",
    "text": "Persist prompts in Azure Blob Storage with folder-level organization."
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "A Git repository gives centralized versioning, history and reuse of shared prompt templates across projects. Embedding prompts in config files, registering them as datasets, or dropping them in blob folders lacks proper version control and reuse."
 },
 {
  "number": 13,
  "type": "reveal",
  "question_images": [
   "assets/q13_q0.png",
   "assets/q13_q1.png"
  ],
  "answer_images": [
   "assets/q13_a0.png"
  ],
  "label": "Hotspot Question",
  "correction": {
   "answer": "Agent's latest published version reference",
   "was": "CI/CD pipeline",
   "confidence": "Medium"
  },
  "explanation": "Track prompt changes across teams uses a Git repository for version history across contributors. To apply prompt updates without redeployment, consuming applications reference the agent's latest published version, so new prompt versions are picked up automatically. [Corrected: the PDF marked CI/CD pipeline for the second box, but a CI/CD pipeline still triggers a deployment; referencing the agent's latest published version avoids redeployment.]"
 },
 {
  "number": 14,
  "type": "mc",
  "multi": false,
  "stem": "A company requires that only models meeting predefined performance thresholds are registered and deployed. The \nsolution must be fully automated within the ML workflow. What should you implement?",
  "options": [
   {
    "letter": "A",
    "text": "GitHub pull request checks"
   },
   {
    "letter": "B",
    "text": "Conditional logic in pipeline"
   },
   {
    "letter": "C",
    "text": "Azure Monitor alerts"
   },
   {
    "letter": "D",
    "text": "Manual approval gate"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Building threshold checks as conditional logic inside the pipeline automatically gates registration and deployment to only models that pass, fully within the ML workflow. PR checks, Monitor alerts, and manual gates are not fully automated in the workflow."
 },
 {
  "number": 15,
  "type": "mc",
  "multi": false,
  "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains \na unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while \nothers might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear \non the review screen.\nYou work in Microsoft Foundry with a prompt flow.\nYou must manually evaluate prompts and compare results across prompt variants.\nYou need to capture the inputs, outputs, token usage, and latencies for each flow run for the evaluation.\nSolution: Use the prompt flow SDK to enable tracing for the flow before executing runs. Then run the flow to generate \ntraceable results.\nDoes the solution meet the goal?",
  "options": [
   {
    "letter": "A",
    "text": "No"
   },
   {
    "letter": "B",
    "text": "Yes"
   }
  ],
  "correct": [
   "B"
  ],
  "correction": {
   "answer": "Yes",
   "was": "No",
   "confidence": "Medium"
  },
  "explanation": "The prompt flow SDK can enable tracing (start_trace) which captures inputs, outputs, token usage and latency per run, the same capability as the portal toggle, so it also meets the goal (Yes). [Corrected from the PDF, which marked No.]"
 },
 {
  "number": 16,
  "type": "reveal",
  "question_images": [
   "assets/q16_q0.png",
   "assets/q16_q1.png"
  ],
  "answer_images": [
   "assets/q16_a0.png"
  ],
  "label": "Drag and Drop",
  "explanation": "A Git repository gives version history to track prompt changes, and a branch-based workflow lets you evaluate prompt variants in isolation (feature branches) before merging. Azure Machine Learning notebooks and Azure Storage do not provide source-control semantics for prompts."
 },
 {
  "number": 17,
  "type": "mc",
  "multi": false,
  "stem": "An Azure Machine Learning workspace processes sensitive training data.\nThe workspace must NOT be accessible from the public internet.\nYou need to restrict network access.\nWhich configuration should you implement?",
  "options": [
   {
    "letter": "A",
    "text": "Service endpoints"
   },
   {
    "letter": "B",
    "text": "Network security groups"
   },
   {
    "letter": "C",
    "text": "Azure Firewall rules"
   },
   {
    "letter": "D",
    "text": "Private endpoints"
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "Private endpoints place the workspace on a private IP and remove public internet access entirely. Service endpoints, NSGs and firewall rules restrict traffic but do not fully remove public accessibility the way a private endpoint does."
 },
 {
  "number": 18,
  "type": "reveal",
  "question_images": [
   "assets/q18_q0.png"
  ],
  "answer_images": [
   "assets/q18_a0.png"
  ],
  "label": "Question",
  "explanation": "Correct order: 1) Define the required dependencies in an environment specification, 2) Register the environment in the Azure Machine Learning workspace, 3) Create a new version of the environment when dependencies change, 4) Reference the environment in training jobs and pipelines. This makes runtime dependencies consistent, versioned and reusable without modifying training code."
 },
 {
  "number": 19,
  "type": "mc",
  "multi": false,
  "stem": "During training, pipelines occasionally fail due to schema mismatch caused by upstream data changes. You need a \nrobust and automated solution that prevents invalid data from reaching training steps. What is the BEST approach?",
  "options": [
   {
    "letter": "A",
    "text": "Ignore schema differences"
   },
   {
    "letter": "B",
    "text": "Retrain manually when failure occurs"
   },
   {
    "letter": "C",
    "text": "Add a data validation component in pipeline"
   },
   {
    "letter": "D",
    "text": "Use larger compute"
   }
  ],
  "correct": [
   "C"
  ],
  "explanation": "Adding a data/schema-validation component catches upstream schema changes and blocks invalid data before it reaches training, which is automated and robust. Ignoring differences, retraining manually, or using larger compute do not prevent bad data."
 },
 {
  "number": 20,
  "type": "reveal",
  "question_images": [
   "assets/q20_q0.png"
  ],
  "answer_images": [
   "assets/q20_a0.png"
  ],
  "label": "Question",
  "explanation": "Isolated workspace for each team maps to a Microsoft Foundry project per team (projects provide per-team isolation), while security and governance across teams maps to a shared Microsoft Foundry resource (the resource centrally holds governed connections and settings). Per-team resources would break central governance;    a shared project would break isolation."
 },
 {
  "number": 21,
  "type": "reveal",
  "question_images": [
   "assets/q21_q0.png",
   "assets/q21_q1.png"
  ],
  "answer_images": [
   "assets/q21_a0.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Statement answers: (1) Yes - poor/overlapping chunking makes Configuration 1 produce duplicated content across retrieved chunks. (2) Yes - Configuration 2's stricter similarity filtering can exclude relevant chunks. (3) No - lowering the similarity threshold admits more loosely related chunks, which increases rather than reduces semantic dilution. (4) No - keyword-only search drops semantic matching, so it cannot preserve semantic relevance."
 },
 {
  "number": 22,
  "type": "mc",
  "multi": true,
  "stem": "A Retrieval-Augmented Generation (RAG) solution returns incomplete answers because relevant content is \ninconsistently retrieved from the knowledge source.\nYou need to improve RAG accuracy without changing the embedding model currently in use. You need to achieve this \ngoal while minimizing operational costs.\nWhich two actions should you perform? Each correct answer presents part of the solution.\nChoose two.\nNOTE: Each correct selection is worth one point.",
  "options": [
   {
    "letter": "A",
    "text": "Increase token limits for all requests."
   },
   {
    "letter": "B",
    "text": "Implement an optimized re-ranker."
   },
   {
    "letter": "C",
    "text": "Optimize the length of embedding vectors."
   },
   {
    "letter": "D",
    "text": "Tune chunk size and overlap to match content structure."
   }
  ],
  "correct": [
   "B",
   "D"
  ],
  "explanation": "Without changing the embedding model, retrieval improves by adding an optimized re-ranker (B) and tuning chunk size and overlap to match content structure (D). Increasing token limits (A) raises cost, and changing vector length (C) means changing the embedding model."
 },
 {
  "number": 23,
  "type": "mc",
  "multi": false,
  "stem": "You manage a Microsoft Foundry project. You build a multi-turn chatbot application.\nYou plan to filter your traces to identify issues while observing how the application is responding. The solution must not \nuse an external knowledge base.\nYou need to select an evaluation metric.\nWhich built-in evaluator should you use?",
  "options": [
   {
    "letter": "A",
    "text": "RelevanceEvaluator"
   },
   {
    "letter": "B",
    "text": "SimilarityEvaluator"
   },
   {
    "letter": "C",
    "text": "QAEvaluator"
   },
   {
    "letter": "D",
    "text": "CoherenceEvaluator"
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "Coherence measures how well a response reads and flows and needs no external reference or knowledge base, matching the constraint. Relevance, Similarity and QA-style evaluators rely on context or ground truth, which is not allowed here."
 },
 {
  "number": 24,
  "type": "mc",
  "multi": false,
  "stem": "You have a Microsoft Foundry project.\nYou plan to use the Microsoft Foundry portal to fine-tune a base Azure OpenAI Service model \nthat can accept both text and images as input.\nYou need to choose the suitable model.\nWhich model should you choose?",
  "options": [
   {
    "letter": "A",
    "text": "davinci-002"
   },
   {
    "letter": "B",
    "text": "gpt-4o"
   },
   {
    "letter": "C",
    "text": "gpt-35-turbo"
   },
   {
    "letter": "D",
    "text": "gpt-4"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "gpt-4o is the multimodal model that accepts both text and image input and supports fine-tuning. davinci-002, gpt-35-turbo and base gpt-4 do not fit the text+image fine-tuning requirement."
 },
 {
  "number": 25,
  "type": "reveal",
  "question_images": [
   "assets/q25_q0.png"
  ],
  "answer_images": [
   "assets/q25_a0.png"
  ],
  "label": "Question",
  "explanation": "Trigger provisioning on repository changes maps to Configure a GitHub Actions workflow (it runs automatically on template/repo changes with no manual step). Authenticate securely during workflow execution maps to Use an Azure service principal (secure non-interactive auth). A manual deployment script or local Azure CLI would require manual intervention."
 },
 {
  "number": 26,
  "type": "reveal",
  "question_images": [
   "assets/q26_q0.png",
   "assets/q26_q1.png"
  ],
  "answer_images": [
   "assets/q26_a0.png"
  ],
  "label": "Question",
  "explanation": "For summarization: choose GPT-4.1-Mini (a capable chat model) rather than Whisper (speech), Phi-3-Mini, or an embedding model; deploy to a Managed real-time (online) endpoint for interactive inference; and test it in the Microsoft Foundry Chat playground."
 },
 {
  "number": 27,
  "type": "reveal",
  "question_images": [
   "assets/q27_q0.png"
  ],
  "answer_images": [
   "assets/q27_a0.png"
  ],
  "label": "Question",
  "explanation": "Correct order: 1) Set up the model endpoint in Foundry, 2) Configure monitoring metrics (such as latency), 3) Enable logging to capture them. This gives performance observability under production load."
 },
 {
  "number": 28,
  "type": "reveal",
  "question_images": [
   "assets/q28_q0.png"
  ],
  "answer_images": [
   "assets/q28_a0.png"
  ],
  "label": "Question",
  "explanation": "Runtime monitoring maps to Observability metrics (continuously watch latency/errors in production), and Release validation maps to an Evaluation workflow (check model quality and safety before shipping updates). Diagnostic logs and blocklist updates do not satisfy these two requirements."
 },
 {
  "number": 29,
  "type": "reveal",
  "question_images": [
   "assets/q29_q0.png"
  ],
  "answer_images": [
   "assets/q29_a0.png"
  ],
  "label": "Question",
  "explanation": "Detect changes in input data distribution maps to Enable data drift monitoring, and Trigger action when thresholds are exceeded maps to Configure alerts. Increasing compute, retraining manually, deleting the endpoint, or re-registering the model      do not meet the monitoring requirements."
 },
 {
  "number": 30,
  "type": "mc",
  "multi": false,
  "stem": "A team is developing a generative AI assistant. The team is experimenting with multiple prompt variants to improve the \nuser experience.\nWhen comparing prompt variants, the team plans to assess whether the generated responses are grammatically correct.\nYou need to evaluate the quality of the language from the generated responses.\nWhich evaluator should you use?",
  "options": [
   {
    "letter": "A",
    "text": "Coherence"
   },
   {
    "letter": "B",
    "text": "Textual similarity"
   },
   {
    "letter": "C",
    "text": "Grounded ness"
   },
   {
    "letter": "D",
    "text": "Fluency"
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "Fluency evaluates grammatical correctness and language quality of generated text. Coherence measures logical flow, Groundedness measures source support, and Similarity measures closeness to a reference."
 },
 {
  "number": 31,
  "type": "mc",
  "multi": false,
  "stem": "Background -\nFabrikam Inc. is a mid-sized healthcare analytics company that provides population health dashboards and predictive \ninsights to regional hospital systems across the United States. Fabrikam Inc. customers rely on near real time analytics to \nmonitor patient flow, staffing needs, and readmission risks. They use multiple traditional forecasting machine learning \nmodels for predictions.\nFabrikam Inc. has an established Microsoft Azure footprint. The company uses Jupyter Notebooks that run on a local server \nas the primary development environment. The data science team is experiencing scalability, asset management and code \nmanagement issues with the current development platform. Fabrikam Inc. plans to migrate to a cloud-based development \nenvironment to mitigate the issues.\nAdditionally, the company plans to implement a Retrieval-Augmented Generation (RAG)-based chat application for client \nsupport. Leadership requires the application to be developed and deployed with a low operational risk.\nCurrent Environment -\nFabrikam Inc. operates a single Azure subscription that has the following components:\nAzure Data Lake Storage Gen2 that contains de-identified clinical and operational datasets\nAzure AI Search indexing curated analytical documents and reference materials\nA small set of Python-based training scripts maintained by data scientists\nAzure OpenAI Service with deployed foundational models\nA Microsoft Foundry resource for building a RAG-based solution\nEvaluation data has manually defined expected responses.\nThe current challenges faced by the data science team include the following:\nModel training jobs are run manually from notebooks.\nExperiment tracking is inconsistent\nModel versions are registered without standardized metadata.\nDeployment is performed manually by data scientists, with limited rollback capability.\nThe team has no standardized evaluation process for generative AI outputs.\nThe environment currently allows public network access. Authentication relies on user accounts rather than managed \nidentities. Compute targets are manually created and shared across experiments. This has led to resource contention \nduring peak usage.\nBusiness Requirements -\nFabrikam Inc. has the following business requirements for the modernization initiative:\nProvide a conversational interface that answers analytics questions by using internal documents and datasets.\nEnsure that sensitive healthcare-related data is not exposed outside the Fabrikam Inc. Azure tenant.\nEnable repeatable and auditable model training and deployment processes.\nSupport experimentation to compare prompt strategies and fine-tuned models.\nAlign the model with the ranked preferences and optimize behavior for the long term.\nMinimize disruption to existing analytics workloads during rollout.\nTechnical Requirements -\nTo support the business goals, Fabrikam Inc. identifies these technical requirements:\nUse Azure Machine Learning workspaces to centrally manage data assets, models, and environments.\nImplement experiment tracking and model versioning for all training jobs.\nOrchestrate training and evaluation by using pipelines rather than manually running notebooks.\nDeploy traditional machine learning models with support for staged rollout and rollback.\nImprove RAG-based solution output quality.\nUse the existing evaluation datasets that are based on real data with input-output pairs.\nApply advanced fine-tuning techniques only when prompt engineering is insufficient\nIssues and Constraints -\nFabrikam Inc. must comply with internal security policies that require the company to restrict network access and avoid long-\nlived secrets. The data science team has limited Azure DevOps experience, so solutions must favor managed services and \nautomation over custom infrastructure.\nCost predictability is important. Leadership prefers serverless or managed compute options where possible but is willing to \napprove dedicated compute for stable production workloads.\nProblem Statement -\nFabrikam Inc. must design and implement an Azure-based AI operations solution that enables reliable training, evaluation, \ndeployment, and iteration of generative AI models. The solution must support experimentation and gradual rollout while \nensuring governance, security, and operational stability. The data science and platform teams must collaborate to deliver this \nsolution by using Azure Machine Learning and Microsoft Foundry capabilities.\nYou need to recommend an experiment-tracking strategy that ensures consistent experiment results.\nWhat should you recommend?",
  "options": [
   {
    "letter": "A",
    "text": "Azure Machine Learning job output logs"
   },
   {
    "letter": "B",
    "text": "MLflow experiment tracking"
   },
   {
    "letter": "C",
    "text": "Application Insights logs"
   },
   {
    "letter": "D",
    "text": "Azure Monitor alerts"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Azure ML uses MLflow to consistently track parameters, metrics and artifacts across runs, ensuring reproducible, comparable experiment results. Job output logs, Application Insights, and Monitor alerts do not provide standardized experiment tracking."
 },
 {
  "number": 32,
  "type": "reveal",
  "question_images": [
   "assets/q32_q0.png",
   "assets/q32_q1.png"
  ],
  "answer_images": [
   "assets/q32_a0.png"
  ],
  "label": "Question",
  "correction": {
   "answer": "Yes / No / Yes",
   "was": "Yes / Yes / Yes",
   "confidence": "High"
  },
  "explanation": "Statement answers (Yes / No / Yes): (1) Yes - mlflow.log_param and mlflow.log_metric run inside start_run(), so parameters and metrics are tracked for each run. (2) No - the experiment name (set via mlflow.set_experiment) only groups runs; it does not define the logged model's artifact path, which is the name argument passed to log_model (for example 'model'). (3) Yes - set_experiment('classification-experiment') associates the run with a named experiment. [Corrected: the PDF marked the second statement Yes.]"
 },
 {
  "number": 33,
  "type": "mc",
  "multi": false,
  "stem": "You deploy a model to production but do not have labeled data available for evaluating prediction \naccuracy. However, you must monitor model health continuously. What is the BEST strategy?",
  "options": [
   {
    "letter": "A",
    "text": "Use data drift detection"
   },
   {
    "letter": "B",
    "text": "Disable monitoring"
   },
   {
    "letter": "C",
    "text": "Monitor accuracy metrics"
   },
   {
    "letter": "D",
    "text": "Perform manual evaluation only"
   }
  ],
  "correct": [
   "A"
  ],
  "explanation": "Without labels you cannot compute accuracy, so data drift detection monitors shifts in the input data distribution to flag model-health problems continuously. Disabling monitoring or relying on manual evaluation is not continuous, and accuracy metrics need labels."
 },
 {
  "number": 34,
  "type": "reveal",
  "question_images": [
   "assets/q34_q0.png",
   "assets/q34_q1.png"
  ],
  "answer_images": [
   "assets/q34_a0.png"
  ],
  "label": "Question",
  "explanation": "Preference (DPO) data answers (No / Yes / No / Yes): a usable record needs a preferred and a non-preferred response that genuinely differ. The first record does not provide a usable preference signal (No); the second record does (Yes); not every output contains a valid assistant message as DPO requires (No); and yes, the two outputs in a record must differ to produce a usable training signal (Yes)."
 },
 {
  "number": 35,
  "type": "mc",
  "multi": false,
  "stem": "You need to run large-scale inference jobs on millions of records periodically. Jobs are not latency-sensitive but must \nbe cost-efficient and scalable. Which deployment option is MOST appropriate?",
  "options": [
   {
    "letter": "A",
    "text": "Notebook execution"
   },
   {
    "letter": "B",
    "text": "Managed online endpoint"
   },
   {
    "letter": "C",
    "text": "Local endpoint"
   },
   {
    "letter": "D",
    "text": "Batch endpoint"
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "Batch endpoints are built for high-volume, non-latency-sensitive scoring of millions of records and scale cost-efficiently. Online and local endpoints target low-latency single requests, and notebooks do not scale."
 },
 {
  "number": 36,
  "type": "mc",
  "multi": true,
  "stem": "A financial services company is deploying Microsoft Foundry to host generative AI workloads that process regulated \ncustomer data. The Microsoft Foundry environment must prevent any public network exposure while still allowing services \nmanaged by Microsoft Foundry to communicate with dependent Azure resources.\nSecurity auditors require that all traffic to and from the Microsoft Foundry resource remain on private networks, with no public \nendpoints available.\nYou need to configure the Microsoft Foundry environment so that network access is restricted while maintaining full platform \nfunctionality.\nWhich two actions should you perform? Each correct answer presents part of the solution.\nChoose two.\nNOTE: Each correct selection is worth one point.",
  "options": [
   {
    "letter": "A",
    "text": "Disable all inbound network access."
   },
   {
    "letter": "B",
    "text": "Deploy the Microsoft Foundry resource in a separate Azure subscription."
   },
   {
    "letter": "C",
    "text": "Use API key authentication for all model endpoints."
   },
   {
    "letter": "D",
    "text": "Disable public network access to the Microsoft Foundry resource."
   },
   {
    "letter": "E",
    "text": "Configure a managed virtual network for the Microsoft Foundry resource."
   }
  ],
  "correct": [
   "D",
   "E"
  ],
  "correction": {
   "answer": "D, E",
   "was": "A, E",
   "confidence": "High"
  },
  "explanation": "Full private networking for Foundry requires disabling public network access (D) and configuring a managed virtual network (E) so managed services can still reach dependent Azure resources privately. Disabling all inbound access (A) breaks functionality, and a separate subscription (B) or API keys (C) do not provide network isolation."
 },
 {
  "number": 37,
  "type": "mc",
  "multi": true,
  "stem": "A company's platform engineers manage the resource settings and governance of Microsoft Foundry.\nDevelopers must be able to create and update project assets but must not be able to change resource-level configurations.\nYou need to enforce least privilege access for the engineers and developers.\nWhich two actions should you perform? Each correct answer presents part of the solution.\nChoose two.\nNOTE: Each correct selection is worth one point.",
  "options": [
   {
    "letter": "A",
    "text": "Share a single API key across all teams."
   },
   {
    "letter": "B",
    "text": "Assign a resource-level Azure AI Administrator role to the platform engineers."
   },
   {
    "letter": "C",
    "text": "Disable Microsoft Entra ID authentication for the Microsoft Foundry resource."
   },
   {
    "letter": "D",
    "text": "Assign the Azure AI Developer role to the developers."
   }
  ],
  "correct": [
   "B",
   "D"
  ],
  "explanation": "Least privilege is enforced with built-in RBAC roles: platform engineers get the resource-level Azure AI Administrator role (B) to manage settings, and developers get the Azure AI Developer role (D) to build project assets but not change resource configuration. Shared API keys or disabling Entra ID weaken security."
 },
 {
  "number": 38,
  "type": "mc",
  "multi": false,
  "stem": "You create a binary classification model. You use the Fairlearn package to assess model fairness.\nYou must eliminate the need to retrain the model.\nYou need to implement the Fairlearan package.\nWhich algorithm should you use?",
  "options": [
   {
    "letter": "A",
    "text": "fairiearn.reductions.ExponentiatedGradient"
   },
   {
    "letter": "B",
    "text": "fairlearn.preprocessing.CorrelationRemover"
   },
   {
    "letter": "C",
    "text": "fairlearn.reductions.GridSearch"
   },
   {
    "letter": "D",
    "text": "fairlearn.postprocessing.ThresholdOptimizer"
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "The post-processing ThresholdOptimizer adjusts decision thresholds after training to improve fairness without retraining the model. ExponentiatedGradient and GridSearch are reductions that retrain, and CorrelationRemover is a preprocessing step."
 },
 {
  "number": 39,
  "type": "mc",
  "multi": false,
  "stem": "A team accidentally deploys an outdated model version due to incorrect tagging. You need to enforce strict \ndeployment governance and version control. What should you implement?",
  "options": [
   {
    "letter": "A",
    "text": "Rename models"
   },
   {
    "letter": "B",
    "text": "Use version pinning and approval workflows"
   },
   {
    "letter": "C",
    "text": "Increase logging"
   },
   {
    "letter": "D",
    "text": "Store models locally"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Pinning specific model versions plus approval workflows prevents accidental deployment of the wrong version and enforces governance. Renaming models, increasing logging, or storing models locally do not control versions."
 },
 {
  "number": 40,
  "type": "mc",
  "multi": false,
  "stem": "A real-time endpoint experiences sporadic latency spikes. Investigation reveals instances scale down to zero during \ninactivity. You need to reduce latency without significantly increasing cost.\nWhat should you configure?",
  "options": [
   {
    "letter": "A",
    "text": "Increase timeout settings"
   },
   {
    "letter": "B",
    "text": "Set minimum instance count"
   },
   {
    "letter": "C",
    "text": "Switch to batch endpoint"
   },
   {
    "letter": "D",
    "text": "Reduce logging"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Setting a minimum instance count above zero keeps warm instances so the endpoint does not cold-start after scaling to zero, cutting latency spikes with minimal extra cost. Timeouts and logging do not fix cold starts, and batch endpoints are not real-time."
 },
 {
  "number": 41,
  "type": "mc",
  "multi": false,
  "stem": "You want to ensure ML pipelines produce identical results when executed in different regions or workspaces. Which \nfactor is MOST critical to control for reproducibility?",
  "options": [
   {
    "letter": "A",
    "text": "Same compute SKU"
   },
   {
    "letter": "B",
    "text": "Same dataset name"
   },
   {
    "letter": "C",
    "text": "Versioned datasets and environments"
   },
   {
    "letter": "D",
    "text": "Same user identity"
   }
  ],
  "correct": [
   "C"
  ],
  "explanation": "Reproducibility across regions and workspaces depends on versioned datasets and environments (pinned dependencies), not on identical hardware SKU, dataset name, or user identity."
 },
 {
  "number": 42,
  "type": "mc",
  "multi": false,
  "stem": "A team develops and manages a conversational assistant by using Microsoft Foundry.\nThe team must be able to validate that the assistant does not produce hateful responses before the application is \nexposed to any users.\nYou need to evaluate the model output for hateful responses as part of a repeatable validation process.\nWhich evaluator should you configure first?",
  "options": [
   {
    "letter": "A",
    "text": "Protected material"
   },
   {
    "letter": "B",
    "text": "Groundedness"
   },
   {
    "letter": "C",
    "text": "Indirect attacks"
   },
   {
    "letter": "D",
    "text": "Content safety"
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "The Content safety evaluator detects hateful and harmful content in model output, exactly the validation required before user exposure. Protected material, groundedness and indirect-attack evaluators target other risks."
 },
 {
  "number": 43,
  "type": "reveal",
  "question_images": [
   "assets/q43_q0.png"
  ],
  "answer_images": [
   "assets/q43_a0.png"
  ],
  "label": "Question",
  "correction": {
   "answer": "A, D, E",
   "was": "B, C, E",
   "confidence": "High"
  },
  "explanation": "Pick models by fit-for-requirement: A - a model optimized for conversational reasoning fits an interactive assistant (behavior aligns with task); D - a multimodal model fits workloads needing combined text and image analysis (task alignment); E - a model with enterprise governance controls fits regulated business data (data governance). B (always pick the largest) and C (always pick the smallest) are not justified by workload needs. [Corrected: the PDF marked B, C, E; the correct set is A, D, E.]"
 },
 {
  "number": 44,
  "type": "reveal",
  "question_images": [
   "assets/q44_q0.png"
  ],
  "answer_images": [
   "assets/q44_a0.png"
  ],
  "label": "Question",
  "explanation": "Track changes and maintain history maps to Store prompts in a Git repository; Review updates before production use maps to Use gated pull requests for prompt changes; Roll back to a specific prompt version maps to Use a prior agent version. Updating prompts directly in production would bypass the controlled, reviewed process."
 },
 {
  "number": 45,
  "type": "mc",
  "multi": false,
  "stem": "Your ML pipeline contains independent feature engineering steps that currently execute sequentially, increasing \noverall runtime. You want to optimize execution without modifying logic.\nWhat is the BEST solution?",
  "options": [
   {
    "letter": "A",
    "text": "Enable parallel step execution"
   },
   {
    "letter": "B",
    "text": "Reduce dataset size"
   },
   {
    "letter": "C",
    "text": "Increase compute size"
   },
   {
    "letter": "D",
    "text": "Combine all steps"
   }
  ],
  "correct": [
   "A"
  ],
  "explanation": "Independent feature-engineering steps can run in parallel to cut overall runtime without changing any logic. Reducing data or combining steps changes behavior, and bigger compute does not parallelize sequential steps."
 },
 {
  "number": 46,
  "type": "mc",
  "multi": false,
  "stem": "You must ensure full reproducibility of experiments including dataset, code, and environment across multiple runs \nand workspaces. Which combination of practices is MOST appropriate?",
  "options": [
   {
    "letter": "A",
    "text": "Git only"
   },
   {
    "letter": "B",
    "text": "Logging metrics only"
   },
   {
    "letter": "C",
    "text": "Dataset versioning only"
   },
   {
    "letter": "D",
    "text": "Environment + dataset + code versioning"
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "Full reproducibility requires versioning all three: code, dataset and environment. Any single one alone (Git only, metrics only, or dataset versioning only) is insufficient."
 },
 {
  "number": 47,
  "type": "mc",
  "multi": false,
  "stem": "An Azure Machine Learning workspace contains multiple registered versions of a model that is used in production.\nAn older model version must no longer be deployable, but it must remain available for compliance review and potential \nrollback.\nYou need to change the state of the model version to meet the requirements.\nWhat should you do?",
  "options": [
   {
    "letter": "A",
    "text": "Archive the training dataset for the model version."
   },
   {
    "letter": "B",
    "text": "Delete the model version."
   },
   {
    "letter": "C",
    "text": "Unregister the model version."
   },
   {
    "letter": "D",
    "text": "Archive the model version."
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "Archiving the model version hides it from active use so it can no longer be deployed while retaining it for compliance review and rollback. Deleting or unregistering removes it, and archiving the dataset does not change the model's deployability."
 },
 {
  "number": 48,
  "type": "reveal",
  "question_images": [
   "assets/q48_q0.png",
   "assets/q48_q1.png"
  ],
  "answer_images": [
   "assets/q48_a0.png"
  ],
  "label": "Question",
  "explanation": "Exact identifier matching maps to Keyword-based retrieval with lexical scoring (lexical/BM25 matches exact tokens), and Natural-language relevance maps to Semantic ranking over vector search results (embeddings capture meaning). Semantic-only or keyword-disabled options miss exact matches, and keyword-only search misses natural-language relevance."
 },
 {
  "number": 49,
  "type": "mc",
  "multi": false,
  "stem": "An organization maintains separate Azure Machine Learning workspaces for development and production.\nBoth environments must use the same validated assets without duplicating them.\nAssets must be shared across workspaces while maintaining centralized governance and version control.\nYou need to enable reuse of assets across workspaces without copying them.\nWhat should you do?",
  "options": [
   {
    "letter": "A",
    "text": "Enable workspace-level Git integration and sync assets between repositories."
   },
   {
    "letter": "B",
    "text": "Publish the asset as a pipeline component."
   },
   {
    "letter": "C",
    "text": "Create a shared Azure Machine Learning environment that includes the asset."
   },
   {
    "letter": "D",
    "text": "Publish the asset to an Azure Machine Learning registry."
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "An Azure Machine Learning registry shares validated assets (models, components, environments) across multiple workspaces without copying, with central governance and versioning. Git sync, pipeline components, or a shared environment do not provide cross-workspace registry sharing."
 },
 {
  "number": 50,
  "type": "mc",
  "multi": false,
  "stem": "A team is experimenting with traditional models for a classification workflow in Azure Machine Learning.\nThe team requires a consistent way to manage assets that are created during experimentation.\nYou need to ensure that artifacts can be reused and governed across projects.\nWhich asset should you register?",
  "options": [
   {
    "letter": "A",
    "text": "Model"
   },
   {
    "letter": "B",
    "text": "Component"
   },
   {
    "letter": "C",
    "text": "Environment"
   },
   {
    "letter": "D",
    "text": "Pipeline"
   }
  ],
  "correct": [
   "A"
  ],
  "explanation": "Registering the trained artifact as a Model asset provides versioning, lineage and governed reuse across projects. Components, environments and pipelines serve other purposes."
 },
 {
  "number": 51,
  "type": "mc",
  "multi": false,
  "stem": "A team deploys a model to a real-time endpoint in Azure Machine Learning. You deploy some updates to the \nendpoint.\nThe endpoint returns errors after the new deployment is released.\nYou need to restore the service as quickly as possible.\nWhat should you do first?",
  "options": [
   {
    "letter": "A",
    "text": "Roll back traffic to the previous deployment."
   },
   {
    "letter": "B",
    "text": "Delete the endpoint and immediately redeploy it."
   },
   {
    "letter": "C",
    "text": "Change the authentication type to Azure Machine Learning token-based authentication."
   },
   {
    "letter": "D",
    "text": "Increase the compute size."
   }
  ],
  "correct": [
   "A"
  ],
  "explanation": "The fastest recovery is rolling traffic back to the last known-good (previous) deployment using blue/green. Deleting and redeploying is slow, and changing authentication or compute size does not fix a bad release."
 },
 {
  "number": 52,
  "type": "mc",
  "multi": false,
  "stem": "You train models on GPU-enabled clusters but deploy them on CPU-based endpoints. Recently, inference failures \noccur due to incompatible dependencies. What should you do to ensure consistency?",
  "options": [
   {
    "letter": "A",
    "text": "Use batch endpoints"
   },
   {
    "letter": "B",
    "text": "Use same compute for training and inference"
   },
   {
    "letter": "C",
    "text": "Define and reuse environment configurations"
   },
   {
    "letter": "D",
    "text": "Increase endpoint compute size"
   }
  ],
  "correct": [
   "C"
  ],
  "explanation": "Defining and reusing a consistent environment (pinned dependencies) across training and inference prevents dependency mismatches between GPU training and CPU serving. Using the same compute is not required, and bigger compute does not fix dependency issues."
 },
 {
  "number": 53,
  "type": "mc",
  "multi": false,
  "stem": "Your model requires access to external APIs using sensitive credentials during inference. You must ensure \ncredentials are not exposed in code, logs, or environment variables. What should you implement?",
  "options": [
   {
    "letter": "A",
    "text": "Hardcode credentials"
   },
   {
    "letter": "B",
    "text": "Store in config files"
   },
   {
    "letter": "C",
    "text": "Use Azure Key Vault with managed identity"
   },
   {
    "letter": "D",
    "text": "Encrypt credentials locally"
   }
  ],
  "correct": [
   "C"
  ],
  "explanation": "Storing secrets in Azure Key Vault and accessing them through a managed identity keeps credentials out of code, logs and environment variables. Hardcoding, config files, or local encryption all risk exposure."
 },
 {
  "number": 54,
  "type": "mc",
  "multi": false,
  "stem": "A pipeline step fails intermittently due to transient compute issues. You need to improve reliability without \nmodifying core logic or increasing cost significantly. What is the BEST approach?",
  "options": [
   {
    "letter": "A",
    "text": "Increase compute size"
   },
   {
    "letter": "B",
    "text": "Enable retry policy on pipeline step"
   },
   {
    "letter": "C",
    "text": "Run pipeline manually"
   },
   {
    "letter": "D",
    "text": "Remove failing step"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "A step-level retry policy transparently recovers from transient compute failures without changing core logic or significantly raising cost. Bigger compute or manual runs do not address transient failures."
 },
 {
  "number": 55,
  "type": "mc",
  "multi": false,
  "stem": "A team is deploying machine learning models to a production inference endpoint in Azure Machine Learning.\nThe team requires a safe way to validate a new model version without disrupting existing users.\nYou need to recommend a deployment strategy for controlled testing of a new model version.\nWhat should you configure?",
  "options": [
   {
    "letter": "A",
    "text": "traffic splitting between deployments"
   },
   {
    "letter": "B",
    "text": "the model asset version in the registry"
   },
   {
    "letter": "C",
    "text": "deployment to a separate staging endpoint"
   },
   {
    "letter": "D",
    "text": "an evaluation script in Azure Machine Learning"
   }
  ],
  "correct": [
   "A"
  ],
  "explanation": "Traffic splitting sends a controlled percentage of production traffic to the new model for safe validation without disrupting users. A separate staging endpoint does not test real production traffic, and a registry version or evaluation script is not a rollout strategy."
 },
 {
  "number": 56,
  "type": "reveal",
  "question_images": [
   "assets/q56_q0.png"
  ],
  "answer_images": [
   "assets/q56_a0.png"
  ],
  "label": "Question",
  "explanation": "Ensure runs are recorded in the workspace experiment history maps to setting the MLflow tracking URI (points runs at the workspace), and Record performance values during model training maps to MLflow metrics logging (captures metrics into run history). Data asset, Azure Monitor workspace, prompt flow and model registry        do not record experiment runs or metrics."
 },
 {
  "number": 57,
  "type": "reveal",
  "question_images": [
   "assets/q57_q0.png"
  ],
  "answer_images": [
   "assets/q57_a0.png"
  ],
  "label": "Question",
  "explanation": "Guide the model with a few labeled examples maps to Few-shot prompting (examples included in the prompt), and Break a complex task into intermediate reasoning steps maps to Chain-of-thought prompting. Zero-shot provides no examples, and a system message alone does not add explicit reasoning steps."
 },
 {
  "number": 58,
  "type": "mc",
  "multi": false,
  "stem": "An organization validates generative AI applications during CI/CD Microsoft Foundry.\nEvaluation must run automatically and block releases when quality thresholds are NOT met.\nManual evaluation is no longer acceptable.\nEvaluation must use both predefined quality metrics and custom safety checks.\nYou need to implement an automated evaluation workflow that supports both built-in and custom metrics.\nWhat should you do?",
  "options": [
   {
    "letter": "A",
    "text": "Enable application tracing to collect runtime telemetry."
   },
   {
    "letter": "B",
    "text": "Review evaluation results manually after deployment."
   },
   {
    "letter": "C",
    "text": "Monitor latency metrics during model inference."
   },
   {
    "letter": "D",
    "text": "Implement an evaluation step by using GitHub Actions."
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "An automated evaluation step in CI/CD (for example GitHub Actions) can run both built-in and custom metrics and fail the build to block releases that miss the quality threshold. Tracing, manual review, or latency monitoring do not automatically gate releases."
 },
 {
  "number": 59,
  "type": "mc",
  "multi": false,
  "stem": "You work in Microsoft Foundry with a prompt flow.\nYou must manually evaluate prompts and compare results across prompt variants.\nYou need to capture the inputs, outputs, token usage, and latencies for each flow run for the evaluation.\nSolution: Create prompt variants and compare their outputs in the Evaluation experience.\nDoes the solution meet the goal?",
  "options": [
   {
    "letter": "A",
    "text": "Yes"
   },
   {
    "letter": "B",
    "text": "No"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "The Evaluation experience compares metric scores across variants but does not itself capture the raw inputs, outputs, token usage and latency traces the goal requires (that is what Tracing does), so it does not meet the goal (No)."
 },
 {
  "number": 60,
  "type": "mc",
  "multi": false,
  "stem": "Multiple teams need access to approved models with version tracking, lineage, and governance controls. Models \nmust be discoverable and reusable across projects. What Azure ML feature should you use?",
  "options": [
   {
    "letter": "A",
    "text": "Blob storage containers"
   },
   {
    "letter": "B",
    "text": "Model registry"
   },
   {
    "letter": "C",
    "text": "Git repositories"
   },
   {
    "letter": "D",
    "text": "Data lake"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "The model registry provides versioning, lineage, governance and discoverability/reuse of approved models across projects. Blob containers, Git, or a data lake lack model-specific governance."
 },
 {
  "number": 61,
  "type": "mc",
  "multi": true,
  "stem": "A team is validating a generative AI assistant for a company. The assistant generates responses by using \ninternal knowledge sources.\nThe company requires assurance that responses are accurate, supported by sources, and related to the user \nprompts before enabling production access.\nYou need to implement quality metrics that confirm the assistant produces reliable and meaningful responses.\nWhich two evaluation metrics should you use? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
  "options": [
   {
    "letter": "A",
    "text": "Groundedness"
   },
   {
    "letter": "B",
    "text": "Relevance"
   },
   {
    "letter": "C",
    "text": "Harmfulness"
   },
   {
    "letter": "D",
    "text": "Fairness"
   },
   {
    "letter": "E",
    "text": "Tone"
   }
  ],
  "correct": [
   "A",
   "B"
  ],
  "explanation": "Answers that are accurate and supported by sources are measured by Groundedness (A), and answers related to the user prompt are measured by Relevance (B). Harmfulness, Fairness and Tone do not measure answer reliability and meaningfulness for this goal."
 },
 {
  "number": 62,
  "type": "mc",
  "multi": false,
  "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the \nseries contains a unique solution that might meet the stated goals. Some question sets might have more than one \ncorrect solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will \nnot appear on the review screen.\nYou manage an Azure Machine Learning workspace. The Python script named script.py reads an argument named \ntraining_data. The training_data argument specifies the path to the training data in a file named dataset1.csv.\nYou plan to run the script.py Python script as a command job that trains a machine learning model.\nYou need to provide the command to pass the path for the dataset as a parameter value when you submit the \nscript as a training job.\nSolution: python train.py --training_data training_data\nDoes the solution meet the goal?",
  "options": [
   {
    "letter": "A",
    "text": "No"
   },
   {
    "letter": "B",
    "text": "Yes"
   }
  ],
  "correct": [
   "A"
  ],
  "explanation": "The command uses the wrong script name (train.py instead of script.py) and passes the literal word training_data instead of the dataset path via an input binding, so it does not meet the goal (No)."
 },
 {
  "number": 63,
  "type": "reveal",
  "question_images": [
   "assets/q63_q0.png"
  ],
  "answer_images": [
   "assets/q63_a0.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Allow Microsoft Foundry workloads to access Azure resources with key-less authentication maps to Managed identity (no stored secrets), and Control which users can manage projects and deployments maps to Role-based access control (RBAC) role assignment. API keys and service principals do not meet the key-less plus user-governance requirements as cleanly."
 },
 {
  "number": 64,
  "type": "mc",
  "multi": false,
  "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series \ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct \nsolution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not \nappear on the review screen.\nYou manage an Azure Machine Learning workspace. The Python script named script.py reads an argument named \ntraining_data. The training_data argument specifies the path to the training data in a file named dataset1.csv.\nYou plan to run the script.py Python script as a command job that trains a machine learning model.\nYou need to provide the command to pass the path for the dataset as a parameter value when you submit the script \nas a training job.\nSolution: python script.py --trainingdata ${{inputs.training_data}}\nDoes the solution meet the goal?",
  "options": [
   {
    "letter": "A",
    "text": "No"
   },
   {
    "letter": "B",
    "text": "Yes"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Running script.py with the Azure ML input binding ${{inputs.training_data}} correctly passes the dataset path as a parameter value at job submission, so it meets the goal (Yes)."
 },
 {
  "number": 65,
  "type": "reveal",
  "question_images": [
   "assets/q65_q0.png"
  ],
  "answer_images": [
   "assets/q65_a0.png"
  ],
  "label": "Drag and Drop",
  "explanation": "In prompt flow, Implement variants maps to the LLM tool (it supports variants - multiple prompt/model configurations to compare), and Invoke a custom API maps to the Python tool (runs custom code to call an API). The Embedding tool only generates embeddings."
 },
 {
  "number": 66,
  "type": "mc",
  "multi": false,
  "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the \nseries contains a unique solution that might meet the stated goals. Some question sets might have more than one \ncorrect solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not \nappear on the review screen.\nYou manage an Azure Machine Learning workspace. The Python script named script.py reads an argument named \ntraining_data. The training_data argument specifies the path to the training data in a file named dataset1.csv.\nYou plan to run the script.py Python script as a command job that trains a machine learning model.\nYou need to provide the command to pass the path for the dataset as a parameter value when you submit the \nscript as a training job.\nSolution: python script.py dataset1.csv\nDoes the solution meet the goal?",
  "options": [
   {
    "letter": "A",
    "text": "No"
   },
   {
    "letter": "B",
    "text": "Yes"
   }
  ],
  "correct": [
   "A"
  ],
  "explanation": "Passing a hardcoded positional filename (dataset1.csv) does not bind the training_data input parameter, so it does not meet the goal (No)."
 },
 {
  "number": 67,
  "type": "reveal",
  "question_images": [
   "assets/q67_q0.png"
  ],
  "answer_images": [
   "assets/q67_a0.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Requests fail after deployment updates maps to Review deployment logs; Endpoint responds but returns incorrect results maps to Validate scoring script and model version (a mismatch causes wrong output); Endpoint times out under increased traffic maps to Adjust autoscaling configuration (a capacity issue). Restarting the endpoint is not the targeted fix for any of these."
 },
 {
  "number": 68,
  "type": "mc",
  "multi": false,
  "stem": "You manage an Azure Machine Learning workspace.\nYou need to define an environment from a Docker image by using the Azure Machine Learning Python SDK v2.\nWhich parameter should you use?",
  "options": [
   {
    "letter": "A",
    "text": "image"
   },
   {
    "letter": "B",
    "text": "properties"
   },
   {
    "letter": "C",
    "text": "conda_file"
   },
   {
    "letter": "D",
    "text": "build"
   }
  ],
  "correct": [
   "A"
  ],
  "explanation": "In the SDK v2 Environment class, the image parameter specifies the base Docker image. conda_file adds packages, build is for a Dockerfile build context, and properties holds metadata."
 },
 {
  "number": 69,
  "type": "mc",
  "multi": false,
  "stem": "A team plans to deploy a large foundation model in Microsoft Foundry as part of a new enterprise AI capability.\nDifferent business units across the team's organization will access the model from various internal applications.\nYou need to deploy a foundation model by minimizing latency.\nWhich deployment type should you use?",
  "options": [
   {
    "letter": "A",
    "text": "Data Zone Batch"
   },
   {
    "letter": "B",
    "text": "Developer"
   },
   {
    "letter": "C",
    "text": "Data Zone Standard"
   },
   {
    "letter": "D",
    "text": "Global Batch"
   }
  ],
  "correct": [
   "C"
  ],
  "explanation": "For low-latency real-time access shared across business units, a Standard (real-time) deployment such as Data Zone Standard is appropriate. The Batch types add latency, and Developer is for testing with a limited SLA."
 },
 {
  "number": 70,
  "type": "mc",
  "multi": true,
  "stem": "You create a workspace by using Azure Machine Learning Studio.\nYou must run a Python SDK v2 notebook in the workspace by using Azure Machine Learning Studio.\nYou need to reset the state of the notebook.\nWhich three actions should you use? Each correct answer presents a complete solution.\nNOTE: Each correct selection is worth one point.",
  "options": [
   {
    "letter": "A",
    "text": "Change the compute."
   },
   {
    "letter": "B",
    "text": "stop the current kernel."
   },
   {
    "letter": "C",
    "text": "Reset the compute."
   },
   {
    "letter": "D",
    "text": "Navigate to another section of the workspace."
   },
   {
    "letter": "E",
    "text": "Change the current kernel."
   }
  ],
  "correct": [
   "B",
   "C",
   "E"
  ],
  "explanation": "Notebook/kernel state is reset by stopping the current kernel (B), resetting the compute (C), or changing the current kernel (E); each clears execution state. Changing compute or navigating away (A, D) do not reset the kernel state."
 },
 {
  "number": 71,
  "type": "reveal",
  "question_images": [
   "assets/q71_q0.png"
  ],
  "answer_images": [
   "assets/q71_a0.png"
  ],
  "label": "Question",
  "explanation": "Answer B - tuning chunk size and overlap directly changes what content is indexed and retrieved, improving retrieval relevance and completeness. Temperature only affects generation randomness, changing the embedding strategy is a larger redesign, and token limits only cap length."
 },
 {
  "number": 72,
  "type": "mc",
  "multi": false,
  "stem": "A data science team plans to evaluate multiple hyperparameter values automatically while training a model in \nAzure Machine Learning.\nThe tuning process must run multiple training trials without manually modifying the training script for each run.\nYou need to automate hyperparameter tuning for the training job.\nWhat should you do?",
  "options": [
   {
    "letter": "A",
    "text": "Run a single training job with fixed hyperparameters."
   },
   {
    "letter": "B",
    "text": "Select hyperparameters based only on default model settings."
   },
   {
    "letter": "C",
    "text": "Adjust hyperparameters after model deployment."
   },
   {
    "letter": "D",
    "text": "Create a tuning job that runs multiple trials with different parameter values."
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "A hyperparameter sweep (tuning job) automatically runs many trials with different parameter values without editing the training script for each run. The other options are manual or happen after deployment."
 },
 {
  "number": 73,
  "type": "reveal",
  "question_images": [
   "assets/q73_q0.png"
  ],
  "answer_images": [
   "assets/q73_a0.png"
  ],
  "label": "Question",
  "explanation": "Answer A - generate synthetic interaction data first to build a consistent, controlled test dataset for comparing prompt variants without relying on live user traffic. Content filters, a blocklist, or observability metrics          do not create evaluation input data."
 },
 {
  "number": 74,
  "type": "reveal",
  "question_images": [
   "assets/q74_q0.png"
  ],
  "answer_images": [
   "assets/q74_a0.png",
   "assets/q74_a1.png"
  ],
  "label": "Hotspot",
  "explanation": "The dropdowns should read mltable.load('./sample_data/MLTable'). Use load() to materialize data from an existing MLTable definition, and point it at the folder that contains the MLTable file (./sample_data/MLTable). save/take are wrong operations, and pointing at the parent folder or file*.txt would not use the MLTable blueprint."
 },
 {
  "number": 75,
  "type": "reveal",
  "question_images": [
   "assets/q75_q0.png"
  ],
  "answer_images": [
   "assets/q75_a0.png",
   "assets/q75_a1.png",
   "assets/q75_a2.png"
  ],
  "label": "Hotspot",
  "explanation": "The path uses the wasbs:// scheme (the container is exposed on the blob endpoint blob.core.windows.net), and because the asset must reference all blobs in the container the type is AssetTypes.URI_FOLDER. URI_FILE is a single file and URI_MLTABLE is a tabular definition; abfss is for ADLS Gen2 hierarchical namespace."
 },
 {
  "number": 76,
  "type": "reveal",
  "question_images": [
   "assets/q76_q0.png",
   "assets/q76_q1.png"
  ],
  "answer_images": [
   "assets/q76_a0.png",
   "assets/q76_a1.png",
   "assets/q76_a2.png",
   "assets/q76_a3.png"
  ],
  "label": "Hotspot",
  "explanation": "The Bicep deploys an AI Foundry account (Microsoft.CognitiveServices/accounts, kind 'AIServices', SKU S0) at resource-group scope. Key facts to read from it: identity type 'SystemAssigned' creates a system-assigned managed identity; allowProjectManagement: true enables Foundry project management; customSubDomainName sets a custom subdomain (required for token/Entra auth); and disableLocalAuth: true turns off key-based local authentication so only Microsoft Entra ID (key-less) auth is allowed."
 },
 {
  "number": 77,
  "type": "reveal",
  "question_images": [
   "assets/q77_q0.png"
  ],
  "answer_images": [
   "assets/q77_a0.png",
   "assets/q77_a1.png",
   "assets/q77_a2.png"
  ],
  "label": "Drag and Drop",
  "correction": {
   "answer": "AML compute cluster",
   "was": "Databricks cluster",
   "confidence": "High"
  },
  "explanation": "Interactive experimentation maps to an Azure Machine Learning compute instance (a personal single-node development box), and Scalable training jobs maps to an Azure Machine Learning compute cluster (autoscales nodes and scales to zero to minimize cost). [Corrected: the PDF marked Azure Databricks cluster for scalable training; the intended Azure ML answer is the AML compute cluster.]"
 },
 {
  "number": 78,
  "type": "reveal",
  "question_images": [
   "assets/q78_q0.png"
  ],
  "answer_images": [
   "assets/q78_a0.png",
   "assets/q78_a1.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Correct sequence: 1) run ssh-keygen to create a key pair, 2) run cat ~/.ssh/id_rsa.pub to display the public key, 3) Add the public key to the GitHub account, 4) run git clone to clone the repo into the workspace.            You add the public (not private) key to GitHub."
 },
 {
  "number": 79,
  "type": "reveal",
  "question_images": [
   "assets/q79_q0.png"
  ],
  "answer_images": [
   "assets/q79_a0.png"
  ],
  "label": "Question",
  "explanation": "In the SDK v2 an environment version is immutable, so to adopt a new Docker image you instantiate the Environment class with the new image and call ml_client.environments.create_or_update() to register a new version (this matches option D). Changing the description or the conda_file does not switch the base image. [Note: the PDF marks C, but its own explanation describes creating a new environment version, which is option D - treat D as the technically correct choice.]"
 },
 {
  "number": 80,
  "type": "reveal",
  "question_images": [
   "assets/q80_q0.png"
  ],
  "answer_images": [
   "assets/q80_a0.png",
   "assets/q80_a1.png"
  ],
  "label": "Question",
  "explanation": "A shared hub workspace centralizes governance and reusable assets, while per-team project workspaces provide team-level isolation for billing - meeting all requirements. A central storage account, a resource group, or a single shared workspace alone does not deliver both central governance and per-team isolation."
 },
 {
  "number": 81,
  "type": "reveal",
  "question_images": [
   "assets/q81_q0.png"
  ],
  "answer_images": [
   "assets/q81_a0.png"
  ],
  "label": "Question",
  "explanation": "GitHub Actions natively triggers on pull requests, supports required-reviewer approvals through Environments, and keeps auditable run logs - matching automated, auditable, approval-gated deployments. Azure Monitor is for monitoring, MLflow is for tracking, and Azure ML pipelines do not natively gate on PR approvals."
 },
 {
  "number": 82,
  "type": "reveal",
  "question_images": [
   "assets/q82_q0.png"
  ],
  "answer_images": [
   "assets/q82_a0.png"
  ],
  "label": "Question",
  "explanation": "A GitHub Actions workflow that executes the evaluation runs can automatically evaluate every pull request with the Azure AI Evaluation SDK and fail the CI build when safety thresholds are exceeded. A blocklist, a content filter in warning mode, or a retrieval chunking strategy do not gate the build in CI."
 },
 {
  "number": 83,
  "type": "reveal",
  "question_images": [
   "assets/q83_q0.png"
  ],
  "answer_images": [
   "assets/q83_a0.png",
   "assets/q83_a1.png",
   "assets/q83_a2.png",
   "assets/q83_a3.png",
   "assets/q83_a4.png"
  ],
  "label": "Hotspot",
  "explanation": "Define an Azure Machine Learning environment asset, which pins the exact Python packages, Docker image and settings so every training and inference job runs with identical dependencies. Job configuration, input/output bindings, and Azure Monitor alerts              do not standardize runtime dependencies."
 },
 {
  "number": 84,
  "type": "reveal",
  "question_images": [
   "assets/q84_q0.png"
  ],
  "answer_images": [
   "assets/q84_a0.png",
   "assets/q84_a1.png"
  ],
  "label": "Question",
  "explanation": "Answer C - managed online endpoints with traffic splitting give blue/green style staged rollout and near-instant rollback by shifting traffic back to the previous deployment, which is the managed, low-operations approach Fabrikam prefers. VM-hosted REST APIs and batch endpoints do not provide safe rollback, and self-managed AKS blue-green adds operational overhead."
 },
 {
  "number": 85,
  "type": "reveal",
  "question_images": [
   "assets/q85_q0.png"
  ],
  "answer_images": [
   "assets/q85_a0.png",
   "assets/q85_a1.png"
  ],
  "label": "Question",
  "explanation": "Answer B - Azure Machine Learning training pipelines make training repeatable and auditable: steps, inputs, outputs and runs are versioned and logged. Azure Logic Apps, Azure Functions, or scheduled notebook runs do not provide the same repeatable, auditable ML training orchestration."
 },
 {
  "number": 86,
  "type": "reveal",
  "question_images": [
   "assets/q86_q0.png"
  ],
  "answer_images": [
   "assets/q86_a0.png",
   "assets/q86_a1.png"
  ],
  "label": "Question",
  "explanation": "Answers B, C, E - to detect performance degradation under high traffic, monitor Requests per minute (throughput), Connections active (concurrency/saturation) and Request latency (response time). Feature count and dataset size are model/data properties, not runtime endpoint performance metrics."
 },
 {
  "number": 87,
  "type": "reveal",
  "question_images": [
   "assets/q87_q0.png"
  ],
  "answer_images": [
   "assets/q87_a0.png",
   "assets/q87_a1.png",
   "assets/q87_a2.png"
  ],
  "label": "Drag and Drop",
  "correction": {
   "answer": "Enable autoscaling",
   "was": "Trigger retraining pipeline",
   "confidence": "Medium"
  },
  "explanation": "Map each requirement to its first-step configuration: Automated response (notify downstream systems when thresholds are exceeded) = Configure alert rules; Infrastructure optimization = Enable autoscaling (scale compute with load). Triggering a retraining pipeline addresses model quality, not the automated-notification or infrastructure-optimization requirements - which is why the corrected choice for infrastructure optimization is Enable autoscaling."
 },
 {
  "number": 88,
  "type": "reveal",
  "question_images": [
   "assets/q88_q0.png"
  ],
  "answer_images": [
   "assets/q88_a0.png",
   "assets/q88_a1.png"
  ],
  "label": "Question",
  "explanation": "Answers A, B - to version a model from an MLflow run, first locate and capture the model artifacts from the training run outputs, then register the model in the Azure Machine Learning workspace so it is versioned centrally for reuse. Tagging the experiment or exporting files to local storage does not create a governed, versioned model."
 },
 {
  "number": 89,
  "type": "reveal",
  "question_images": [
   "assets/q89_q0.png"
  ],
  "answer_images": [
   "assets/q89_a0.png",
   "assets/q89_a1.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Correct order: 1) Monitor baseline metrics from production traffic, 2) Define performance thresholds for monitored metrics, 3) Configure alerts to notify stakeholders, 4) Enable scheduled or event-based retraining when thresholds are exceeded. Manually inspecting prediction logs is not an automated action and is not used."
 },
 {
  "number": 90,
  "type": "reveal",
  "question_images": [
   "assets/q90_q0.png",
   "assets/q90_q1.png"
  ],
  "answer_images": [
   "assets/q90_a0.png",
   "assets/q90_a1.png",
   "assets/q90_a2.png",
   "assets/q90_a3.png"
  ],
  "label": "Hotspot",
  "explanation": "Read the comparison table: Groundedness rose 0.82 to 0.91 (improved), Relevance rose 0.85 to 0.88 (improved), Hallucination rate fell 0.06 to 0.05 (improved), but Response latency rose 420 to 430 ms (slightly worse). So fine-tuning improved answer quality (groundedness, relevance, fewer hallucinations)                while latency did not improve."
 },
 {
  "number": 91,
  "type": "reveal",
  "question_images": [
   "assets/q91_q0.png"
  ],
  "answer_images": [
   "assets/q91_a0.png",
   "assets/q91_a1.png"
  ],
  "label": "Question",
  "explanation": "Answer B (No). Deleting the Python 3.6 - AzureML kernel is not a prerequisite for adding a new Jupyter kernel. You add a kernel by creating/registering a new environment as a kernel; removing an existing kernel is unnecessary, so the solution does not meet the goal."
 },
 {
  "number": 92,
  "type": "reveal",
  "question_images": [
   "assets/q92_q0.png"
  ],
  "answer_images": [
   "assets/q92_a0.png",
   "assets/q92_a1.png"
  ],
  "label": "Question",
  "explanation": "Answer B (No). As with the 3.6 variant, deleting the Python 3.8 - AzureML kernel is not required to add a new kernel. The prerequisite is creating an environment, not removing an existing kernel, so the solution does not meet the goal."
 },
 {
  "number": 93,
  "type": "reveal",
  "question_images": [
   "assets/q93_q0.png"
  ],
  "answer_images": [
   "assets/q93_a0.png",
   "assets/q93_a1.png"
  ],
  "label": "Question",
  "explanation": "Answer A (Yes). Creating an environment is the task that must be completed first: you create a conda/Python environment and then register it so it appears as a new Jupyter kernel in the terminal session. This satisfies the prerequisite."
 },
 {
  "number": 94,
  "type": "reveal",
  "question_images": [
   "assets/q94_q0.png"
  ],
  "answer_images": [
   "assets/q94_a0.png",
   "assets/q94_a1.png"
  ],
  "label": "Hotspot",
  "explanation": "Technique = Grid search and Constraint = Demographic parity. Fairlearn's GridSearch mitigation trains multiple models under a fairness constraint; Demographic parity minimizes disparities in selection rates across each Ethnicity category. Outlier detection and dimensionality reduction are not fairness-mitigation techniques, and false-positive rate parity targets error-rate balance rather than equal selection across groups."
 },
 {
  "number": 95,
  "type": "reveal",
  "question_images": [
   "assets/q95_q0.png"
  ],
  "answer_images": [
   "assets/q95_a0.png"
  ],
  "label": "Question",
  "explanation": "Answer D (%pip). The %pip line magic installs into the specific Python interpreter of the currently running kernel and syncs it to the session without a restart. !pip and !conda run shell commands against the compute instance's base environment (not scoped to the kernel), and %load                  just loads code into a cell."
 },
 {
  "number": 96,
  "type": "reveal",
  "question_images": [
   "assets/q96_q0.png"
  ],
  "answer_images": [
   "assets/q96_a0.png",
   "assets/q96_a1.png",
   "assets/q96_a2.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Match each workload to a global deployment type: Real-time, predictable (latency-sensitive, consistent performance) = Global Provisioned (reserved PTU throughput gives consistent latency); Flexible, cost efficient (variable performance) = Global Standard (pay-as-you-go token billing optimized for cost). Provisioned guarantees capacity/latency while Standard trades consistency for lower cost."
 },
 {
  "number": 97,
  "type": "reveal",
  "question_images": [
   "assets/q97_q0.png"
  ],
  "answer_images": [
   "assets/q97_a0.png"
  ],
  "label": "Question",
  "explanation": "Answer A - register the model with the workspace first. The studio UI's no-code Responsible AI dashboard wizard can only run against a model that already exists as a registered asset in the workspace registry. Creating explanations, converting the MLflow format, or deploying to an endpoint are not the required first step."
 },
 {
  "number": 98,
  "type": "reveal",
  "question_images": [
   "assets/q98_q0.png"
  ],
  "answer_images": [
   "assets/q98_a0.png",
   "assets/q98_a1.png",
   "assets/q98_a2.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Correct order for a safe promotion that does not disrupt production traffic: 1) Deploy a new model version, 2) Create an AI gateway route version (so traffic can be routed to the new version in a controlled way), 3) Validate the behavior of the new version before any cutover. Shifting 100% of traffic or updating the production route first would risk disrupting live users."
 },
 {
  "number": 99,
  "type": "reveal",
  "question_images": [
   "assets/q99_q0.png"
  ],
  "answer_images": [
   "assets/q99_a0.png",
   "assets/q99_a1.png",
   "assets/q99_a2.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Map each requirement to its metric: 'Detect when the system is slow at returning output' = Latency; 'Identify when the system cannot sustain expected request volume' = Throughput; 'Measure the duration of handling a request' = Response time. Concurrency is not needed. Latency captures responsiveness, throughput captures capacity, and response time captures per-request duration."
 },
 {
  "number": 100,
  "type": "reveal",
  "question_images": [
   "assets/q100_q0.png"
  ],
  "answer_images": [
   "assets/q100_a0.png",
   "assets/q100_a1.png",
   "assets/q100_a2.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Map each observed signal to its diagnostic action: 'Input feature distributions differ from training data' = Analyze dataset drift metrics; 'Model accuracy drops without code changes' = Review prediction and ground truth trends; 'Endpoint latency increases under load' = Investigate scaling and infrastructure metrics. Rebuilding the inference container image does not diagnose drift or capacity issues."
 },
 {
  "number": 102,
  "type": "reveal",
  "question_images": [
   "assets/q102_q0.png"
  ],
  "answer_images": [
   "assets/q102_a0.png",
   "assets/q102_a1.png",
   "assets/q102_a2.png"
  ],
  "label": "Hotspot",
  "explanation": "Both requirements map to 'Archive unused model versions.' Archiving keeps previous versions in the registry for audit and rollback (preserving history) while removing them from the active list so they cannot be selected for new deployments. Deleting would destroy the audit history,                    and overwriting would lose prior versions."
 },
 {
  "number": 103,
  "type": "reveal",
  "question_images": [
   "assets/q103_q0.png"
  ],
  "answer_images": [
   "assets/q103_a0.png",
   "assets/q103_a1.png",
   "assets/q103_a2.png"
  ],
  "label": "Hotspot",
  "explanation": "Termination policy type = Bandit and parameter = slack_factor. Bandit compares each run's primary metric against the best-performing run using a slack allowance, so setting slack_factor to 0.25 terminates runs that fall 25 percent or more below the best. Median stopping and truncation selection do not compare against the best run using a slack, and max_value/truncation_percentage are the wrong parameters."
 },
 {
  "number": 104,
  "type": "reveal",
  "question_images": [
   "assets/q104_q0.png"
  ],
  "answer_images": [
   "assets/q104_a0.png",
   "assets/q104_a1.png",
   "assets/q104_a2.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Correct order: 1) Create an Azure Machine Learning compute target, 2) Configure the AutoML job with task type, primary metric, and training data, 3) Submit the AutoML job to the workspace, 4) Review the completed runs and identify the best-performing model. Writing a custom training script per algorithm is not used because AutoML generates and compares the models for you."
 },
 {
  "number": 106,
  "type": "reveal",
  "question_images": [
   "assets/q106_q0.png"
  ],
  "answer_images": [
   "assets/q106_a0.png",
   "assets/q106_a1.png",
   "assets/q106_a2.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Load the model when the service starts = init(); Use the model to score new data = run(). An Azure ML scoring (entry) script requires exactly these two functions: init() runs once at startup to load the model, and run() executes per request to score incoming data. main(), score(), and predict() are not the required entry-script functions."
 },
 {
  "number": 107,
  "type": "reveal",
  "question_images": [
   "assets/q107_q0.png"
  ],
  "answer_images": [
   "assets/q107_a0.png",
   "assets/q107_a1.png",
   "assets/q107_a2.png"
  ],
  "label": "Hotspot",
  "explanation": "Map each concern to the metric that validates it: 'Prediction accuracy declines over time' = Model performance metrics; 'Response times increase during peak usage' = Endpoint latency metrics; 'Predictions remain accurate, but business outcomes worsen' = Prediction output distribution trends (the output mix is shifting even though per-prediction accuracy holds). Throughput, feature importance, and training dataset size do not directly validate these concerns."
 },
 {
  "number": 108,
  "type": "reveal",
  "question_images": [
   "assets/q108_q0.png"
  ],
  "answer_images": [
   "assets/q108_a0.png",
   "assets/q108_a1.png",
   "assets/q108_a2.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Azure OpenAI fine-tuning of a chat model (gpt-4o) uses JSONL where each message object has the keys 'role' and 'content' - so the two selections are role and content. 'prompt' and 'completion' belong to the legacy completions fine-tuning format, not the chat/messages format used here."
 },
 {
  "number": 109,
  "type": "mc",
  "multi": false,
  "stem": "You have a Microsoft Foundry project and a CSV file stored in Azure Blob Storage.\nYou plan to add the CSV file as the grounding data to the project for RAG by using the file data type.\nYou need to specify the URL schema to designate the blob location.\nWhich URL schema should you specify?",
  "options": [
   {
    "letter": "A",
    "text": "hdfs"
   },
   {
    "letter": "B",
    "text": "nfs"
   },
   {
    "letter": "C",
    "text": "file"
   },
   {
    "letter": "D",
    "text": "wasbs"
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "Azure Blob Storage locations are referenced with the wasbs:// (Windows Azure Storage Blob, secure) URL scheme. hdfs, nfs and file are not blob schemes."
 },
 {
  "number": 110,
  "type": "reveal",
  "question_images": [
   "assets/q110_q0.png"
  ],
  "answer_images": [
   "assets/q110_a0.png",
   "assets/q110_a1.png"
  ],
  "label": "Hotspot Question",
  "explanation": "With a Bandit policy, slack_factor 0.1 allows runs within about 91 percent of the best run's metric and terminates those below that band - so the worst-performing runs beyond the slack are stopped (91 percent). Because evaluation_delay is 5 and evaluation_interval is 1, the policy first evaluates at interval 5 and then at                      every interval when metrics are reported thereafter."
 },
 {
  "number": 111,
  "type": "mc",
  "multi": true,
  "stem": "You need to refine a GPT-5 model so that its performance and behavior align with the technical and business \nrequirements of Fabrikam Inc.\nWhich two Foundry strategies should you apply? Each correct answer presents a complete solution. Choose two.\nNOTE: Each correct selection is worth one point.",
  "options": [
   {
    "letter": "A",
    "text": "Supervised fine-tuning"
   },
   {
    "letter": "B",
    "text": "Evaluations"
   },
   {
    "letter": "C",
    "text": "Guardrails"
   },
   {
    "letter": "D",
    "text": "Synthetic data generation"
   }
  ],
  "correct": [
   "A",
   "B"
  ],
  "explanation": "To align a GPT model with the requirements you apply Supervised fine-tuning (A) to adapt behavior and Evaluations (B) to measure quality and groundedness before and after changes. Guardrails and synthetic data generation do not by themselves align model performance to the stated requirements."
 },
 {
  "number": 112,
  "type": "reveal",
  "question_images": [
   "assets/q112_q0.png"
  ],
  "answer_images": [
   "assets/q112_a0.png",
   "assets/q112_a1.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Model1 (text output that must read naturally like human language) = Coherence, which measures how fluent and natural the generated text is. Model2 (embeddings that must maximize recall while minimizing false matches, i.e. high precision) = F1 score, the harmonic mean of precision and recall. Accuracy, relevance, and Spearman correlation do not jointly capture precision and recall for retrieval."
 },
 {
  "number": 113,
  "type": "reveal",
  "question_images": [
   "assets/q113_q0.png"
  ],
  "answer_images": [
   "assets/q113_a0.png",
   "assets/q113_a1.png",
   "assets/q113_a2.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Log the accuracy (a single numerical value) with mlflow.log_metric(\"log\", num1) - log_metric records one scalar metric. Log the training-loss plot, which was saved as a PNG file (img1 = \"plot.png\"), with mlflow.log_artifact(img1) - log_artifact uploads a file. log_metrics/log_params are for dicts/params, and log_figure/log_image expect an in-memory figure or image object rather than a saved file path."
 },
 {
  "number": 114,
  "type": "mc",
  "multi": false,
  "stem": "You manage an Azure Machine Learning workspace. You have a folder that contains a CSV file.\nThe folder is registered as a folder data asset.\nYou plan to use the folder data asset for data wrangling during interactive development.\nYou need to access and load the folder data asset into a Pandas data frame.\nWhich method should you use to achieve this goal?",
  "options": [
   {
    "letter": "A",
    "text": "mltable.load()"
   },
   {
    "letter": "B",
    "text": "mltable.from_delimited_files()"
   },
   {
    "letter": "C",
    "text": "mltable.from_parquet_files()"
   },
   {
    "letter": "D",
    "text": "mltable.from_delta_lake()"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "A folder that contains a CSV is loaded into a Pandas data frame with mltable.from_delimited_files(). from_parquet_files and from_delta_lake are for other formats, and load() opens an existing MLTable definition."
 },
 {
  "number": 115,
  "type": "mc",
  "multi": false,
  "stem": "You are preparing training data for a fine-tuning job in Microsoft Foundry.\nReal production conversations cannot be used due to compliance requirements.\nYou need to generate synthetic interaction data that can be used for fine-tuning a generative model.\nWhat should you do?",
  "options": [
   {
    "letter": "A",
    "text": "Export model evaluation logs and use them directly as training data."
   },
   {
    "letter": "B",
    "text": "Use a simulator to generate prompt-response interaction data that matches the target task."
   },
   {
    "letter": "C",
    "text": "Enable A/B testing and capture live user traffic for data generation."
   },
   {
    "letter": "D",
    "text": "Run a simulator to produce telemetry logs and trace data from user interactions."
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "When real conversations cannot be used for compliance reasons, a simulator generates synthetic prompt-response interaction data matching the target task for fine-tuning. Evaluation logs and live traffic are not allowed or appropriate, and telemetry traces are not training pairs."
 },
 {
  "number": 116,
  "type": "mc",
  "multi": false,
  "stem": "A data science team plans to evaluate multiple hyperparameter values automatically while \ntraining a model in Azure Machine Learning.\nThe tuning process must run multiple training trials without manually modifying the training script for \neach run.\nYou need to automate hyperparameter tuning for the training job.\nWhat should you do?",
  "options": [
   {
    "letter": "A",
    "text": "Manually change hyperparameter values between training runs."
   },
   {
    "letter": "B",
    "text": "Create a tuning job that runs multiple trials with different parameter values."
   },
   {
    "letter": "C",
    "text": "Duplicate the training script for each parameter combination."
   },
   {
    "letter": "D",
    "text": "Adjust hyperparameters after model deployment."
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Create a hyperparameter tuning (sweep) job that runs multiple trials with different parameter values automatically. Manually changing values or duplicating the script does not automate tuning, and tuning after deployment is wrong."
 },
 {
  "number": 117,
  "type": "mc",
  "multi": false,
  "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains \na unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while \nothers might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear on \nthe review screen.\nYou manage a Retrieval-Augmented Generation (RAG) application built on Microsoft Foundry.\nThe application retrieves documents from an indexed knowledge base and generates answers for internal users.\nRecent feedback indicates that answers are fluent but sometimes include information that is not supported by the \ndocuments that were retrieved.\nYou need to evaluate whether a proposed change improves RAG answer quality by using supported and measurable \ntechniques.\nSolution: Compare embedding vector dimensions used by the retrieval pipeline before and after the change.\nDoes the solution meet the goal?",
  "options": [
   {
    "letter": "A",
    "text": "Yes"
   },
   {
    "letter": "B",
    "text": "No"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Comparing embedding vector dimensions before and after a change does not measure answer groundedness or quality, so it does not evaluate whether RAG answer quality improved (No)."
 },
 {
  "number": 118,
  "type": "reveal",
  "question_images": [
   "assets/q118_q0.png"
  ],
  "answer_images": [
   "assets/q118_a0.png",
   "assets/q118_a1.png",
   "assets/q118_a2.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Deploy resources from a pipeline = Azure CLI commands (the az ml/az deployment commands invoked by the automation pipeline). Define Azure resources declaratively = Bicep templates (declarative infrastructure-as-code). Prompt flow and the model registry are not infrastructure deployment mechanisms, and the Python SDK v2 is imperative rather than declarative."
 },
 {
  "number": 119,
  "type": "reveal",
  "question_images": [
   "assets/q119_q0.png"
  ],
  "answer_images": [
   "assets/q119_a0.png",
   "assets/q119_a1.png",
   "assets/q119_a2.png"
  ],
  "label": "Hotspot Question",
  "explanation": "import pandas as lib, then datasample.describe(). pandas.read_csv loads the file and DataFrame.describe() returns exactly the requested summary statistics for each numeric column - count of non-null values, mean, std, min, max, and the 25th/50th/75th percentiles. numpy/csv lack a single describe method, and query/rank do not compute summary statistics."
 },
 {
  "number": 120,
  "type": "reveal",
  "question_images": [
   "assets/q120_q0.png"
  ],
  "answer_images": [
   "assets/q120_a0.png",
   "assets/q120_a1.png",
   "assets/q120_a2.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Correct order to assess and then improve retrieval quality: 1) Collect retrieval logs, 2) Run RAG evaluators, 3) Adjust chunking strategy, 4) Re-index documents. You must measure current retrieval performance (logs, evaluators) before changing retrieval (chunking, re-indexing). Regenerating the prompt template and modifying model temperature affect generation, not retrieval quality, so they are not used."
 },
 {
  "number": 121,
  "type": "reveal",
  "question_images": [
   "assets/q121_q0.png"
  ],
  "answer_images": [
   "assets/q121_a0.png",
   "assets/q121_a1.png",
   "assets/q121_a2.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Active workload = tier: change the tier from dedicated to low-priority (spot) to cut cost while still handling interruptions. Idle workload = min_instances: set min_instances to 0 so the cluster scales in and costs nothing when idle. Neither change touches size or max_instances, so the maximum compute available to workloads (                       max_instances=4) is preserved."
 },
 {
  "number": 122,
  "type": "mc",
  "multi": false,
  "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series \ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct \nsolution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear \non the review screen.\nYou manage a Retrieval-Augmented Generation (RAG) application built on Microsoft Foundry.\nThe application retrieves documents from an indexed knowledge base and generates answers for internal users.\nRecent feedback indicates that answers are fluent but sometimes include information that is not supported by the \ndocuments that were retrieved.\nYou need to evaluate whether a proposed change improves RAG answer quality by using supported and measurable \ntechniques.\nSolution: Review user feedback comments collected after deployment to determine whether answers appear more \naccurate.\nDoes the solution meet the goal?",
  "options": [
   {
    "letter": "A",
    "text": "Yes"
   },
   {
    "letter": "B",
    "text": "No"
   }
  ],
  "correct": [
   "B"
  ],
  "correction": {
   "answer": "No",
   "was": "Yes",
   "confidence": "Medium"
  },
  "explanation": "Reviewing subjective user-feedback comments is not a supported, measurable evaluation technique for groundedness or answer quality, so it does not meet the goal (No). [Corrected from the PDF, which marked Yes.]"
 },
 {
  "number": 123,
  "type": "mc",
  "multi": false,
  "stem": "An organization operates a customer-facing generative AI chat service deployed by using Microsoft Foundry. The \nservice processes a predictable, sustained volume of requests. The service must meet strict response time service-\nlevel agreements (SLAs) during peak business hours.\nThe organization requires that:\n- Model responses remain consistent during sustained high traffic.\n- Latency does not degrade during peak usage periods.\n- Capacity planning avoids throttling and unpredictable performance.\nYou need to ensure that the deployed foundation model can reliably handle sustained, high- volume traffic while \nmeeting performance and availability requirements.\nWhat should you do?",
  "options": [
   {
    "letter": "A",
    "text": "Implement spillover traffic management for excess demand."
   },
   {
    "letter": "B",
    "text": "Increase batch size for inference requests."
   },
   {
    "letter": "C",
    "text": "Optimize prompts to reduce token usage."
   },
   {
    "letter": "D",
    "text": "Deploy the model by using serverless API endpoints."
   }
  ],
  "correct": [
   "A"
  ],
  "explanation": "For predictable, sustained high-volume traffic with strict SLAs, provisioned throughput with spillover traffic management absorbs excess demand and avoids throttling while keeping latency consistent. Increasing batch size, optimizing prompts, or serverless endpoints do not guarantee sustained capacity."
 },
 {
  "number": 124,
  "type": "reveal",
  "question_images": [
   "assets/q124_q0.png"
  ],
  "answer_images": [
   "assets/q124_a0.png",
   "assets/q124_a1.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Correct order to build a RAG flow over local files in Foundry: 1) Create a data asset (upload the local text files), 2) Create a connection (to the Azure AI Search / embedding service), 3) Create a vector index (embed and index the data asset for retrieval), 4) Create a flow (generate responses grounded on the indexed content). A separate 'Foundry Search resource' is not created here because the connection points to the search service."
 },
 {
  "number": 125,
  "type": "reveal",
  "question_images": [
   "assets/q125_q0.png"
  ],
  "answer_images": [
   "assets/q125_a0.png",
   "assets/q125_a1.png",
   "assets/q125_a2.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Track data changes over time = Create a versioned data asset (each version snapshots the data at that point in time without duplicating scripts). Associate a specific dataset version with a run = Use the data asset in the experiment (reference the versioned asset so the run records exactly which version it used). Caching, mounting, uploading per run, or hard-coding paths do not give reproducible versioning."
 },
 {
  "number": 126,
  "type": "mc",
  "multi": true,
  "stem": "You manage an Azure Machine Learning workspace. You build a model for which you must configure a \nResponsible Al dashboard.\nBased on what you learn from the dashboard, you must perform the following activities:\n- Determine what must be done to get a desirable outcome from the\nmodel.\n- Identify the features that have the most direct effect on your\noutcome of interest.\nYou need to select the components to use for the Responsible Al dashboard configuration.\nWhich two components should you add? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
  "options": [
   {
    "letter": "A",
    "text": "counterfactuals"
   },
   {
    "letter": "B",
    "text": "error analysis"
   },
   {
    "letter": "C",
    "text": "causal"
   },
   {
    "letter": "D",
    "text": "explanation"
   }
  ],
  "correct": [
   "A",
   "C"
  ],
  "explanation": "Determining what to do to get a desirable outcome is answered by the Counterfactuals component (A), and identifying the features with the most direct effect on the outcome is the Causal component (C). Error analysis and explanation answer different questions."
 },
 {
  "number": 127,
  "type": "mc",
  "multi": false,
  "stem": "You are a data scientist working for a hotel booking website company. You use the Azure Machine Learning \nservice to train a model that identifies fraudulent transactions.\nYou must deploy the model to an Azure Machine Learning online endpoint by using the Azure Machine Learning \nPython SDK v2. The deployed model must return real-time predictions of fraud based on transaction data input.\nYou need to create the script that is specified as the scoring_script parameter for the CodeConfiguration class used \nto deploy the model.\nWhat should the entry script do?",
  "options": [
   {
    "letter": "A",
    "text": "Create a Conda environment for the online endpoint compute and install the necessary Python packages."
   },
   {
    "letter": "B",
    "text": "Register the model with appropriate tags and properties."
   },
   {
    "letter": "C",
    "text": "Load the model and use it to predict labels from input data."
   },
   {
    "letter": "D",
    "text": "Start a node on the inference cluster where the model is deployed."
   },
   {
    "letter": "E",
    "text": "Specify the number of cores and the amount of memory required for the online endpoint compute."
   }
  ],
  "correct": [
   "C"
  ],
  "explanation": "The scoring/entry script (its init and run functions) loads the model and uses it to return predictions from input data. Creating a Conda environment, registering the model, starting nodes, or specifying compute size are not the entry script's role."
 },
 {
  "number": 128,
  "type": "reveal",
  "question_images": [
   "assets/q128_q0.png"
  ],
  "answer_images": [
   "assets/q128_a0.png",
   "assets/q128_a1.png",
   "assets/q128_a2.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Correct order: 1) Load and configure the Responsible AI Insights dashboard constructor component, 2) Add the counterfactuals component to the Responsible AI Insights dashboard, 3) Use the Gather Responsible AI Insights dashboard component to present the dashboard. Counterfactuals identify the minimal feature changes that flip a prediction. Error analysis, explanation, and causal components address other questions and are not needed here."
 },
 {
  "number": 129,
  "type": "mc",
  "multi": false,
  "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series \ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct \nsolution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not \nappear on the review screen.\nAn organization provisions Azure Machine Learning workspaces for development, test, and production \nenvironments.\nEach environment must be deployed consistently and updated through source control. The deployment process \nmust be automated, repeatable, and auditable.\nYou need to deploy Azure Machine Learning resources in a consistent and controlled manner.\nSolution: Clone an existing Azure Machine Learning workspace to create additional environments.\nDoes the solution meet the goal?",
  "options": [
   {
    "letter": "A",
    "text": "Yes"
   },
   {
    "letter": "B",
    "text": "No"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Cloning an existing workspace is not a source-controlled, automated, repeatable deployment method (no infrastructure-as-code or versioning), so it does not meet the goal (No)."
 },
 {
  "number": 130,
  "type": "reveal",
  "question_images": [
   "assets/q130_q0.png"
  ],
  "answer_images": [
   "assets/q130_a0.png",
   "assets/q130_a1.png",
   "assets/q130_a2.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Impact of treatment policy = Causal analysis (it estimates the real-world effect on an outcome of taking an action/treatment). Effect of change in data - the minimal change to a data point that flips the model's prediction - = Counterfactual analysis. Explanation and error-analysis components answer different questions, so they are not selected."
 },
 {
  "number": 131,
  "type": "reveal",
  "question_images": [
   "assets/q131_q0.png"
  ],
  "answer_images": [
   "assets/q131_a0.png",
   "assets/q131_a1.png",
   "assets/q131_a2.png"
  ],
  "label": "Hotspot Question",
  "explanation": "First use json.dump(table, f) to serialize the dictionary to the opened table.json file (json.load reads, encode is not a json method). Then use mlflow.log_artifact(\"table.json\") to attach the saved file to the run. log_text writes a string, and MlflowClient().log_batch logs metrics/params, not a file."
 },
 {
  "number": 132,
  "type": "mc",
  "multi": false,
  "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the \nseries contains a unique solution that might meet the stated goals. Some question sets might have more than \none correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will \nnot appear on the review screen.\nAn organization provisions Azure Machine Learning workspaces for development, test, and production \nenvironments.\nEach environment must be deployed consistently and updated through source control. The deployment \nprocess must be automated, repeatable, and auditable.\nYou need to deploy Azure Machine Learning resources in a consistent and controlled manner.\nSolution: Create Azure Machine Learning workspaces manually in the Azure portal for each environment.\nDoes the solution meet the goal?",
  "options": [
   {
    "letter": "A",
    "text": "Yes"
   },
   {
    "letter": "B",
    "text": "No"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Manually creating workspaces in the Azure portal for each environment is not automated, repeatable or auditable through source control, so it does not meet the goal (No)."
 },
 {
  "number": 133,
  "type": "reveal",
  "question_images": [
   "assets/q133_q0.png"
  ],
  "answer_images": [
   "assets/q133_a0.png",
   "assets/q133_a1.png",
   "assets/q133_a2.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Data asset type = uri_folder because the asset points to a collection (folder) of image files rather than a single file (uri_file) or a tabular MLTable. Scheme of the URL paths = wasbs, the scheme for Azure Blob Storage. abfss is for ADLS Gen2 and azureml is the datastore-URI scheme,                          neither of which matches plain Blob Storage."
 },
 {
  "number": 134,
  "type": "mc",
  "multi": true,
  "stem": "You are designing a new machine learning solution to predict customer churn by using Azure \nMachine Learning. You have raw data in CSV format stored in Azure Data Lake.\nYou need to design the solution so that it can efficiently handle large-scale model training and \niterative development.\nWhich two actions should you perform? Each correct answer presents part of the solution.\nChoose two.\nNOTE: Each correct selection is worth one point.",
  "options": [
   {
    "letter": "A",
    "text": "Convert the data into the JSONL format and upload into Blob Storage."
   },
   {
    "letter": "B",
    "text": "Schedule training using an Azure Data Factory pipeline."
   },
   {
    "letter": "C",
    "text": "Configure an Azure Machine Learning compute cluster for model training."
   },
   {
    "letter": "D",
    "text": "Register the data as a tabular dataset in the Azure Machine Learning workspace."
   },
   {
    "letter": "E",
    "text": "Configure an Azure Machine Learning compute instance for model training."
   }
  ],
  "correct": [
   "C",
   "D"
  ],
  "explanation": "For efficient large-scale training and iterative development, configure an Azure Machine Learning compute cluster (C) for scalable training and register the data as a tabular dataset (D) for versioned reuse. JSONL conversion, an ADF schedule, and a single-node compute instance do not fit large-scale training."
 },
 {
  "number": 135,
  "type": "reveal",
  "question_images": [
   "assets/q135_q0.png"
  ],
  "answer_images": [
   "assets/q135_a0.png",
   "assets/q135_a1.png",
   "assets/q135_a2.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Correct order to manually evaluate a model in the Foundry playground: 1) Import data in CSV format, 2) Evaluate the solution on 50 input rows of data, 3) Provide thumbs up or down ratings to model responses, 4) Save the evaluation results (so you can review them later). Automatically generating test data is not used because the task is a manual evaluation over your own imported rows."
 },
 {
  "number": 136,
  "type": "reveal",
  "question_images": [
   "assets/q136_q0.png"
  ],
  "answer_images": [
   "assets/q136_a0.png",
   "assets/q136_a1.png",
   "assets/q136_a2.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Box 1 = command_component: the @command_component decorator defines a reusable pipeline command component in the SDK v2. Box 2 = model_train: the execution logic (the train() function) lives in model_train.py, so the import is 'from model_train import train'. 'tool'/'pipeline' are the wrong decorators, and importing from train/train_component would not resolve the train() function."
 },
 {
  "number": 137,
  "type": "mc",
  "multi": false,
  "stem": "Note: This question is part of a series of questions that present the same scenario. Each question in the series \ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct \nsolution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not \nappear on the review screen.\nYou manage a Retrieval-Augmented Generation (RAG) application built on Microsoft Foundry.\nThe application retrieves documents from an indexed knowledge base and generates answers for internal users.\nRecent feedback indicates that answers are fluent but sometimes include information that is not supported by the \ndocuments that were retrieved.\nYou need to evaluate whether a proposed change improves RAG answer quality by using supported and measurable \ntechniques.\nSolution: Measure token throughput and average response latency before and after applying the proposed change.\nDoes the solution meet the goal?",
  "options": [
   {
    "letter": "A",
    "text": "Yes"
   },
   {
    "letter": "B",
    "text": "No"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Token throughput and average response latency measure performance, not answer quality or groundedness, so they do not evaluate whether the RAG quality change helped (No)."
 },
 {
  "number": 138,
  "type": "reveal",
  "question_images": [
   "assets/q138_q0.png",
   "assets/q138_q1.png"
  ],
  "answer_images": [
   "assets/q138_a0.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Box 1 = log_figure: mlflow.log_figure() is purpose-built to log a Matplotlib figure object directly. Box 2 = log_metric: to track a boolean as a numerical value over time you cast it to 1/0 and record it with mlflow.log_metric() (metrics accept only numeric values). log_artifact/log_image expect a saved file or image object, and log_param stores a static string rather than a tracked numeric value."
 },
 {
  "number": 139,
  "type": "reveal",
  "question_images": [
   "assets/q139_q0.png",
   "assets/q139_q1.png"
  ],
  "answer_images": [
   "assets/q139_a0.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Box 1 = load_component: from azure.ai.ml import load_component loads the component definition from its YAML file. Box 2 = ml_client.create_or_update: registering with ml_client.create_or_update(train_component) publishes the component to the workspace so it can be reused across pipelines and by others with workspace access."
 },
 {
  "number": 140,
  "type": "mc",
  "multi": false,
  "stem": "You create an Azure Machine Learning workspace.\nYou must use the Python SDK v2 to implement an experiment from a Jupyter notebook in the \nworkspace. The experiment must log a list of numerical metrics.\nYou need to implement a method to log a list of numerical metrics.\nWhich method should you use?",
  "options": [
   {
    "letter": "A",
    "text": "mlflow.log_batch()"
   },
   {
    "letter": "B",
    "text": "mlflow.log_metric()"
   },
   {
    "letter": "C",
    "text": "mlflow.log_artifact()"
   },
   {
    "letter": "D",
    "text": "mlflow.log_image()"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Numerical metrics are logged with mlflow.log_metric() (called per value or step to record a list of values). log_artifact and log_image are for files, and log_batch is not the standard per-metric method here."
 },
 {
  "number": 141,
  "type": "mc",
  "multi": false,
  "stem": "You deploy a new model version to a managed online endpoint. You must test it with 10% traffic and \nautomatically roll back if latency or error rate increases beyond threshold. What should you configure?",
  "options": [
   {
    "letter": "A",
    "text": "Separate endpoint for testing"
   },
   {
    "letter": "B",
    "text": "Traffic splitting with monitoring alerts"
   },
   {
    "letter": "C",
    "text": "Batch endpoint validation"
   },
   {
    "letter": "D",
    "text": "Manual testing workflow"
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Send 10% of traffic to the new deployment and use monitoring alerts on latency and error rate to trigger automatic rollback. Separate or batch endpoints and manual testing do not provide controlled rollout with automatic rollback."
 },
 {
  "number": 142,
  "type": "mc",
  "multi": false,
  "stem": "A team uses a hosted Git repository to store training code and pipeline definitions of a machine \nlearning experiment.\nThe team must ensure that access to the repository is granted without requiring each developer to store \npersonal access tokens on their machines.\nRepository access must be secure and centrally managed to reduce credential spread.\nYou need to enable secure access between an Azure Machine Learning workspace and the repository.\nWhat should you do?",
  "options": [
   {
    "letter": "A",
    "text": "Share a repository deploy key across all developers on the team."
   },
   {
    "letter": "B",
    "text": "Generate a personal access token and store it in a pipeline variable."
   },
   {
    "letter": "C",
    "text": "Require each developer to authenticate locally before every pipeline run."
   },
   {
    "letter": "D",
    "text": "Configure the workspace to use a managed identity for repository access."
   }
  ],
  "correct": [
   "D"
  ],
  "explanation": "A workspace managed identity authenticates to the Git repository centrally, so developers do not need to store personal access tokens locally and credential spread is reduced. Shared deploy keys, PATs in variables, or local authentication all spread credentials."
 },
 {
  "number": 143,
  "type": "mc",
  "multi": false,
  "stem": "An organization runs a customer-facing generative AI application built by using Microsoft Foundry. The \napplication uses multiple prompts linked to multiple workflows to generate responses in production.\nThe application occasionally returns incomplete responses. The model call succeeds, but the final message \nsometimes stops early.\nThe issue cannot be reproduced reliably in development.\nYou need to identify where and why response generation is terminating early in production.\nWhich approach should you use?",
  "options": [
   {
    "letter": "A",
    "text": "Run a pre-release evaluation workflow to score groundedness and relevance on a test dataset."
   },
   {
    "letter": "B",
    "text": "Enable tracing and logging so that each workflow can be inspected."
   },
   {
    "letter": "C",
    "text": "Increase max_tokens and temperature to reduce the chance of early termination."
   },
   {
    "letter": "D",
    "text": "Replace the deployed model with a smaller model to reduce variability across responses."
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Enabling tracing and logging lets you inspect each workflow and pinpoint where and why response generation terminates early in production. A pre-release evaluation, changing max_tokens/temperature, or swapping models does not identify the production cause."
 },
 {
  "number": 144,
  "type": "reveal",
  "question_images": [
   "assets/q144_q0.png"
  ],
  "answer_images": [
   "assets/q144_a0.png",
   "assets/q144_a1.png",
   "assets/q144_a2.png"
  ],
  "label": "Hotspot Question",
  "explanation": "First box = log_metrics: row1 is a dictionary of metric name/value pairs, so mlflow.log_metrics(row1) records them all at once (log_metric handles only a single value). Second box = log_artifact: the serialized table.json file is attached with mlflow.log_artifact(\"table.json\"). Third box = mlflow_run.info.run_id: MlflowClient().get_run() takes the run id to retrieve the finished run."
 },
 {
  "number": 145,
  "type": "mc",
  "multi": true,
  "stem": "You use Azure Machine Learning to train a model.\nYou must use Bayesian sampling to tune hyperparameters.\nYou need to select a learning_rate parameter distribution.\nWhich two distributions can you use? Each correct answer presents a complete solution.\nNOTE: Each correct selection is worth one point.",
  "options": [
   {
    "letter": "A",
    "text": "Choice"
   },
   {
    "letter": "B",
    "text": "Uniform"
   },
   {
    "letter": "C",
    "text": "QNormal"
   },
   {
    "letter": "D",
    "text": "LogUniform"
   },
   {
    "letter": "E",
    "text": "Normal"
   }
  ],
  "correct": [
   "A",
   "B"
  ],
  "explanation": "Azure ML Bayesian sampling supports only the choice, uniform and quniform distributions; for a continuous learning_rate the valid options here are Choice (A) and Uniform (B). QNormal, LogUniform and Normal are not supported by Bayesian sampling."
 },
 {
  "number": 147,
  "type": "reveal",
  "question_images": [
   "assets/q147_q0.png",
   "assets/q147_q1.png"
  ],
  "answer_images": [
   "assets/q147_a0.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Box 1 = Accuracy: an embedding model used to categorize documents is benchmarked on classification accuracy - the percentage of documents assigned to the correct category. Box 2 = Coherence: a general-purpose generation model must produce fluent, natural, contextually accurate text, which coherence measures.                            GPT similarity (semantic text similarity) is not the right benchmark for either requirement."
 },
 {
  "number": 148,
  "type": "reveal",
  "question_images": [
   "assets/q148_q0.png",
   "assets/q148_q1.png"
  ],
  "answer_images": [
   "assets/q148_a0.png",
   "assets/q148_a1.png"
  ],
  "label": "Hotspot Question",
  "explanation": "All four boxes = No. The snippet uses mlflow.search_runs to query runs. Box 1: search_runs does not filter by status directly - you filter the returned DataFrame afterward (e.g., runs[runs.status == 'FINISHED']), so the statement is No. Box 2: results are ordered descending by start_time by default; to get the oldest you must pass order_by=['start_time ASC'], so relying on the default for oldest-first is No. Box 3: 'Failed' and 'Killed' are distinct statuses (completed-with-errors vs canceled), so treating them as equivalent is No. Box 4: search_runs returns a limited Pandas DataFrame by default and you must use output_format / get_run to retrieve full metrics, params and artifacts, so the assumption is No."
 },
 {
  "number": 149,
  "type": "reveal",
  "question_images": [
   "assets/q149_q0.png"
  ],
  "answer_images": [
   "assets/q149_a0.png",
   "assets/q149_a1.png"
  ],
  "label": "Drag Drop",
  "explanation": "Correct order: 1) Install the Foundry SDK project client locally, 2) Configure safety evaluators, 3) Submit an evaluation to the Microsoft Foundry project in the cloud. You first need the SDK/project client to interact with Foundry. Safety evaluators (harmful/violent/sexual/self-harm content detectors) are AI-assisted and depend on the Azure-hosted safety evaluation service, so after configuring them the evaluation must be submitted to the Foundry project in the cloud - a local test run cannot reliably score safety. The evaluation dataset is already registered, so uploading data is not needed."
 },
 {
  "number": 150,
  "type": "reveal",
  "question_images": [
   "assets/q150_q0.png"
  ],
  "answer_images": [
   "assets/q150_a0.png",
   "assets/q150_a1.png"
  ],
  "label": "Drag Drop",
  "explanation": "Correct order: 1) Register the fine-tuned model version, 2) Evaluate and validate the model, 3) Create a Global Standard deployment. Promotion to production first requires versioning the fine-tuned model in the registry so it is tracked and immutable, then validating it against quality/safety criteria before release, and finally deploying it on a production-grade Global Standard deployment. A Developer Tier deployment is intended for experimentation, not production, so it is not used for the promotion path."
 },
 {
  "number": 151,
  "type": "reveal",
  "question_images": [
   "assets/q151_q0.png"
  ],
  "answer_images": [
   "assets/q151_a0.png"
  ],
  "label": "Question",
  "explanation": "Domain specialization -> Supervised fine-tuning: teaching the model specialized domain knowledge/behavior is best achieved by fine-tuning on labeled domain examples. Poor response accuracy of a RAG-based solution -> Apply prompt engineering: the first, cheapest and fastest lever for a RAG solution is to improve the prompt (grounding instructions, context formatting) before resorting to tuning temperature/max_tokens or retraining."
 },
 {
  "number": 152,
  "type": "reveal",
  "question_images": [
   "assets/q152_q0.png"
  ],
  "answer_images": [
   "assets/q152_a0.png",
   "assets/q152_a1.png"
  ],
  "label": "Drag and Drop",
  "explanation": "The number of tokens used by each LLM node -> Traces: traces capture per-node execution details including token consumption for each LLM call in the flow. The accuracy of the model -> Metrics: evaluation metrics (such as accuracy) are produced by the evaluation/metrics output, not by traces or logs."
 },
 {
  "number": 153,
  "type": "reveal",
  "question_images": [
   "assets/q153_q0.png"
  ],
  "answer_images": [
   "assets/q153_a0.png",
   "assets/q153_a1.png",
   "assets/q153_a2.png",
   "assets/q153_a3.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Correct order: 1) Generate a Secure Shell (SSH) key pair, 2) Add a public key to account1, 3) Create a compute instance, 4) Open a terminal window. To maximize clone performance you use SSH (not HTTPS): first generate the key pair, register the PUBLIC key with the GitHub account (the private key stays on the client), then create the compute instance that will host the clone, and finally open its terminal to run git clone with the SSH URL. Adding a private key to GitHub would be a security error."
 },
 {
  "number": 154,
  "type": "reveal",
  "question_images": [
   "assets/q154_q0.png",
   "assets/q154_q1.png"
  ],
  "answer_images": [
   "assets/q154_a0.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Provide expected results for metric comparison -> Reference dataset: a reference (ground-truth) dataset supplies the expected 'golden' outputs needed to score generated responses. Align model responses to evaluation fields -> Output mapping: output mapping maps parts of the model response to the evaluation fields so structured metrics can be computed consistently. Ensure results are comparable across runs -> Consistent test dataset: using the exact same fixed inputs each run ensures metric changes reflect model/app changes rather than test-data variation."
 },
 {
  "number": 155,
  "type": "mc",
  "multi": false,
  "stem": "You are implementing hyperparameter tuning by using Bayesian sampling for an Azure ML \nPython SDK v2-based model training from a notebook. The notebook is in an Azure Machine Learning \nworkspace. The notebook uses a training script that runs on a compute cluster with 20 nodes.\nThe code implements Bandit termination policy with slackjactor set to 0.2 and a sweep job with \nmax_concurrent_trials set to 10.\nYou must increase effectiveness of the tuning process by improving sampling convergence.\nYou need to select which sampling convergence to use.\nWhat should you select?",
  "options": [
   {
    "letter": "A",
    "text": "Set the value of max_concurrent_trials to 20."
   },
   {
    "letter": "B",
    "text": "Set the value of max_concurrent_trials to 4."
   },
   {
    "letter": "C",
    "text": "Set the value of slack_factor of early_termination policy to 0.1."
   },
   {
    "letter": "D",
    "text": "Set the value of slack_factor of early_termination policy to 0.9."
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Bayesian sampling improves by learning from previously completed trials, so lowering max_concurrent_trials (to 4) improves sampling convergence. Raising it to 20 hurts convergence, and slack_factor tunes early termination, not sampling convergence."
 },
 {
  "number": 156,
  "type": "mc",
  "multi": false,
  "stem": "A team manages prompts used by a generative AI application built on Microsoft Foundry. \nPrompt updates are frequent, and prior changes have caused unexpected behavior in \nproduction.\nThe team requires that new prompt versions can be tested and reviewed without affecting \nproduction behavior.\nYou need to implement a source control practice that allows safe prompt experimentation.\nWhat should you do?",
  "options": [
   {
    "letter": "A",
    "text": "Create a GitHub Action workflow."
   },
   {
    "letter": "B",
    "text": "Create a feature git branch for each prompt change."
   },
   {
    "letter": "C",
    "text": "Revert the prompt in the production environment to a previous commit."
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Creating a feature Git branch for each prompt change lets you test and review new prompt versions safely without affecting production. A GitHub Action workflow or reverting production does not provide isolated experimentation."
 },
 {
  "number": 157,
  "type": "reveal",
  "question_images": [
   "assets/q157_q0.png"
  ],
  "answer_images": [
   "assets/q157_a0.png"
  ],
  "label": "Hotspot Question",
  "explanation": "Store secrets securely -> Azure Key Vault: an AML workspace uses an associated Key Vault to securely store secrets, keys and connection strings. Collect logs and metrics -> Azure Application Insights: the workspace's associated Application Insights resource captures operational logs, metrics and telemetry for monitoring."
 },
 {
  "number": 158,
  "type": "reveal",
  "question_images": [
   "assets/q158_q0.png"
  ],
  "answer_images": [
   "assets/q158_a0.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Define how features are retrieved at inference -> Feature retrieval specification: it declares which features/feature sets to fetch at inference time. Ensure feature consistency between training and inference -> Feature set asset: the registered feature set asset holds the shared feature definitions used both in training and serving, preventing training/serving skew. Enable automated feature lookup in production -> Feature retrieval specification: packaging the retrieval spec with the model lets the deployed endpoint automatically look up the same features without manual configuration."
 },
 {
  "number": 159,
  "type": "mc",
  "multi": false,
  "stem": "You need to improve a GPT-5 model performance based on Fabrikam Inc.'s technical \nrequirements. Which action should you perform first?",
  "options": [
   {
    "letter": "A",
    "text": "Generate synthetic interaction data."
   },
   {
    "letter": "B",
    "text": "Evaluate the model output."
   },
   {
    "letter": "C",
    "text": "Fine-tune the model to improve accuracy."
   },
   {
    "letter": "D",
    "text": "Deploy the model to production to gather real-world feedback."
   }
  ],
  "correct": [
   "B"
  ],
  "explanation": "Because advanced techniques should be applied only when needed, you first evaluate the model output to establish a baseline before fine-tuning or generating synthetic data. Deploying to production to gather feedback is not the first step."
 },
 {
  "number": 160,
  "type": "reveal",
  "question_images": [
   "assets/q160_q0.png"
  ],
  "answer_images": [
   "assets/q160_a0.png"
  ],
  "label": "Drag and Drop",
  "explanation": "Significant change in input data distribution -> Investigate data drift: a shift in the input distribution is the definition of data drift, so investigate it. Sustained drop in prediction accuracy -> Trigger model retraining: persistent quality degradation indicates the model is stale and should be retrained. Sudden increase in endpoint error rate -> Inspect endpoint logs and health: a spike in errors is an operational/serving problem, so examine the endpoint logs and health rather than the model itself."
 }
];
