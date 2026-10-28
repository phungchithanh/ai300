// AI / ML / GenAI study questions — most common AI questions.
// Format: { cat, q, a:[bullets], code?, tip?, level? }   Bullets support `code` and **bold**.
// Append new questions at the END so saved "known" ids stay stable.
const PREP_KEY = 'ai';
const PREP_DATA = [

// ───────────── ML Fundamentals ─────────────
{ cat:"ML Fundamentals", q:"What is the difference between AI, Machine Learning, Deep Learning and Generative AI?",
  a:["**AI** – broad field: systems that perform tasks needing human-like intelligence",
     "**Machine Learning** – subset of AI: models **learn patterns from data** instead of explicit rules",
     "**Deep Learning** – subset of ML using **multi-layer neural networks** (vision, speech, language)",
     "**Generative AI** – DL models that **create new content** (text, images, code, audio) – e.g. GPT, DALL·E, Stable Diffusion",
     "Nesting: AI ⊃ ML ⊃ DL ⊃ GenAI"] },

{ cat:"ML Fundamentals", q:"Supervised vs unsupervised vs reinforcement learning?",
  a:["**Supervised** – learn from **labeled** data (input → known output): classification, regression",
     "**Unsupervised** – find structure in **unlabeled** data: clustering (K-Means), dimensionality reduction (PCA), anomaly detection",
     "**Semi-/Self-supervised** – labels generated from the data itself (e.g. next-token prediction for LLMs)",
     "**Reinforcement learning** – agent learns by **trial & error** to maximize **reward** (games, robotics, **RLHF** for LLMs)"],
  tip:"Give a real example for each – concrete use cases make it stick." },

{ cat:"ML Fundamentals", q:"Classification vs regression vs clustering?",
  a:["**Classification** – predict a **category** (spam / not spam, churn yes/no) – logistic regression, decision trees, random forest",
     "**Regression** – predict a **continuous number** (house price, demand) – linear regression, gradient boosting",
     "**Clustering** – **group similar items** with no labels (customer segmentation) – K-Means, DBSCAN"] },

{ cat:"ML Fundamentals", q:"What is overfitting and underfitting? How do you prevent overfitting?",
  a:["**Overfitting** – model memorizes training data (incl. noise) → great on train, **poor on unseen data** (high variance)",
     "**Underfitting** – model too simple → poor on **both** train and test (high bias)",
     "Prevent overfitting: **more data**, data augmentation, **regularization** (L1/L2), **dropout**, **early stopping**",
     "Simpler model / fewer features, **cross-validation**, ensembling (bagging)",
     "Detect: training loss ↓ while **validation loss ↑**"] },

{ cat:"ML Fundamentals", q:"Explain the bias–variance tradeoff.",
  a:["**Bias** – error from wrong/simplistic assumptions → **underfitting**",
     "**Variance** – error from sensitivity to small changes in training data → **overfitting**",
     "Total error ≈ Bias² + Variance + irreducible noise",
     "Increasing model complexity ↓ bias but ↑ variance – aim for the **sweet spot** that minimizes validation error"] },

{ cat:"ML Fundamentals", q:"Why split data into training, validation and test sets? What is cross-validation?",
  a:["**Training set** – fit model weights",
     "**Validation set** – tune hyperparameters, pick the model, early stopping",
     "**Test set** – final, **untouched** estimate of real-world performance",
     "Typical split: 70/15/15 or 80/10/10; use **stratified** splits for imbalanced classes; **time-based** splits for time series",
     "**K-fold cross-validation** – split into K folds, train K times each holding out one fold → average score; more reliable on small data"],
  tip:"Mention **data leakage** – never let test information influence training or preprocessing (e.g. fit the scaler on train only)." },

{ cat:"ML Fundamentals", q:"What is feature engineering and why does it matter?",
  a:["Turning raw data into **informative inputs** for a model",
     "Techniques: **scaling/normalization**, **one-hot / label encoding**, binning, date parts, text TF-IDF, interaction features",
     "Handle **missing values** (impute, flag), **outliers**, skewed data (log transform)",
     "**Feature selection** – remove irrelevant/correlated features to reduce overfitting",
     "Deep learning learns features automatically, but good data still beats a fancy model"] },

{ cat:"ML Fundamentals", q:"How do you handle imbalanced datasets?",
  a:["Use the right metrics: **precision, recall, F1, PR-AUC** – not accuracy",
     "**Resampling**: oversample minority (**SMOTE**) or undersample majority",
     "**Class weights** in the loss function",
     "Adjust the **decision threshold**",
     "Collect more minority data; use anomaly-detection approaches for extreme imbalance"],
  tip:"Fraud at 1%: a model predicting \"never fraud\" is 99% accurate and useless." },

{ cat:"ML Fundamentals", q:"What are common ML algorithms and when would you use them?",
  a:["**Linear / Logistic regression** – simple, interpretable baselines",
     "**Decision tree** – interpretable rules; prone to overfit",
     "**Random forest** (bagging) – robust, little tuning",
     "**Gradient boosting** (XGBoost, LightGBM, CatBoost) – often **best for tabular data**",
     "**K-NN**, **SVM** – small/medium datasets; **Naive Bayes** – fast text classification",
     "**Neural networks** – images, audio, text, very large data"] },

// ───────────── Model Evaluation ─────────────
{ cat:"Model Evaluation", q:"Explain the confusion matrix, precision, recall and F1-score.",
  a:["Confusion matrix: **TP, FP, TN, FN**",
     "**Precision** = TP / (TP + FP) – of predicted positives, how many are correct?",
     "**Recall** (sensitivity) = TP / (TP + FN) – of actual positives, how many did we find?",
     "**F1** = harmonic mean of precision & recall – good for imbalanced data",
     "Prefer **recall** when missing positives is costly (cancer, fraud); **precision** when false alarms are costly (spam filter)"],
  code:`              Predicted +   Predicted -
Actual +         TP            FN
Actual -         FP            TN` },

{ cat:"Model Evaluation", q:"What are ROC curve and AUC?",
  a:["**ROC** plots **True Positive Rate** vs **False Positive Rate** across all thresholds",
     "**AUC** = area under ROC: 0.5 = random, 1.0 = perfect",
     "Threshold-independent measure of ranking quality",
     "For heavily imbalanced data prefer **PR curve / PR-AUC**"] },

{ cat:"Model Evaluation", q:"Which metrics do you use for regression models?",
  a:["**MAE** – mean absolute error; easy to explain, robust to outliers",
     "**MSE / RMSE** – penalizes large errors more; RMSE in original units",
     "**R²** – proportion of variance explained (1 = perfect)",
     "**MAPE** – percentage error; business-friendly but breaks near zero"] },

// ───────────── Deep Learning ─────────────
{ cat:"Deep Learning", q:"How does a neural network learn? Explain forward pass, loss, backpropagation and gradient descent.",
  a:["**Forward pass** – inputs flow through layers (weights · inputs + bias → activation) to a prediction",
     "**Loss function** measures error (cross-entropy for classification, MSE for regression)",
     "**Backpropagation** – chain rule computes the **gradient** of loss w.r.t. every weight",
     "**Gradient descent** – update weights opposite the gradient: `w = w - lr * grad`",
     "Repeat over **mini-batches** for many **epochs**; optimizers: SGD, Momentum, **Adam**"] },

{ cat:"Deep Learning", q:"What are activation functions and why are they needed?",
  a:["Add **non-linearity** – without them stacked layers collapse into one linear function",
     "**ReLU** – `max(0,x)`; default for hidden layers, fast; risk of dead neurons",
     "**Sigmoid** – (0,1) for binary output; **Softmax** – probabilities across classes",
     "**Tanh** – (-1,1); **GELU / SwiGLU** – used in Transformers/LLMs",
     "Sigmoid/tanh in deep nets cause **vanishing gradients**"] },

{ cat:"Deep Learning", q:"What are vanishing and exploding gradients? How do you fix them?",
  a:["**Vanishing** – gradients shrink layer by layer → early layers stop learning",
     "**Exploding** – gradients grow huge → unstable training, NaN loss",
     "Fixes: **ReLU**-family activations, proper **weight initialization** (He/Xavier)",
     "**Batch / Layer normalization**, **residual (skip) connections**",
     "**Gradient clipping** for exploding gradients; LSTM/GRU gates for RNNs"] },

{ cat:"Deep Learning", q:"CNN vs RNN vs Transformer – when to use each?",
  a:["**CNN** – convolutions capture **local spatial patterns** → images, video, some audio",
     "**RNN / LSTM / GRU** – process sequences **step by step** with memory → older NLP, time series; slow, hard with long context",
     "**Transformer** – **self-attention** over the whole sequence **in parallel** → state of the art for text, code, and increasingly vision (ViT) and audio",
     "Transformers scale much better on GPUs → foundation of all modern LLMs"] },

{ cat:"Deep Learning", q:"What are epochs, batch size and learning rate?",
  a:["**Epoch** – one full pass over the training data",
     "**Batch size** – samples per weight update; larger = faster/stable but more memory",
     "**Learning rate** – step size of updates; too high = diverge, too low = slow/stuck",
     "Use **learning-rate schedules** (warm-up, cosine decay) and early stopping"] },

{ cat:"Deep Learning", q:"What is transfer learning?",
  a:["Reuse a model **pre-trained on a large dataset** and adapt it to a new task",
     "Freeze early layers (general features), **fine-tune** later layers / a new head",
     "Needs **far less data and compute** than training from scratch",
     "Examples: ResNet on ImageNet → medical images; BERT/GPT → domain classification"] },

// ───────────── NLP & Transformers ─────────────
{ cat:"NLP & Transformers", q:"Explain the Transformer architecture and self-attention.",
  a:["Introduced in **\"Attention Is All You Need\"** (2017)",
     "**Self-attention** – each token looks at every other token to build context-aware representations",
     "Each token → **Query, Key, Value** vectors; attention = `softmax(QKᵀ / √d) · V`",
     "**Multi-head attention** – several attention heads learn different relationships in parallel",
     "Plus **positional encoding** (order), feed-forward layers, residual connections, layer norm",
     "**Encoder** (BERT – understanding), **Decoder** (GPT – generation), **Encoder-Decoder** (T5 – translation)"],
  tip:"Self-attention cost grows **O(n²)** with sequence length – why long context windows are expensive." },

{ cat:"NLP & Transformers", q:"What are tokens and tokenization?",
  a:["Models read **tokens**, not words – sub-word pieces (BPE, WordPiece, SentencePiece)",
     "Rough rule: **1 token ≈ 4 English characters ≈ ¾ of a word**",
     "Pricing, **context window** limits and latency are all measured in tokens",
     "Rare words/other languages/code may use more tokens"] },

{ cat:"NLP & Transformers", q:"What are embeddings?",
  a:["**Dense numeric vectors** that capture **semantic meaning** of text, images, etc.",
     "Similar meaning → vectors **close together** (cosine similarity)",
     "Uses: **semantic search**, RAG retrieval, clustering, recommendations, classification",
     "Examples: `text-embedding-3-small/large`, sentence-transformers, Cohere Embed"],
  code:`sim("king","queen")  ≈ 0.8   // close
sim("king","banana") ≈ 0.1   // far` },

{ cat:"NLP & Transformers", q:"BERT vs GPT – what's the difference?",
  a:["**BERT** – **encoder-only**, bidirectional; trained with **masked language modeling** → great for classification, NER, embeddings",
     "**GPT** – **decoder-only**, left-to-right; trained with **next-token prediction** → great for **generation**",
     "Modern LLMs (GPT-4o, Llama, Mistral, Claude) are decoder-only"] },

// ───────────── LLMs & Generative AI ─────────────
{ cat:"LLMs & Generative AI", q:"What is a Large Language Model (LLM) and how is it trained?",
  a:["A huge **Transformer (decoder)** with billions of parameters that predicts the **next token**",
     "1️⃣ **Pre-training** – self-supervised on massive internet/text corpora → base model",
     "2️⃣ **Supervised fine-tuning (SFT)** / instruction tuning on prompt-response pairs",
     "3️⃣ **Alignment** – **RLHF** or **DPO** using human preferences → helpful, harmless, honest",
     "Capabilities emerge with scale: reasoning, code, summarization, translation"] },

{ cat:"LLMs & Generative AI", q:"What are hallucinations and how do you reduce them?",
  a:["LLM generates **fluent but false or unsupported** content",
     "Cause: models predict **plausible** text, not verified facts; knowledge gaps/cutoff",
     "Mitigate: **RAG** grounding on trusted data, ask to **cite sources**",
     "Prompt: \"If you don't know, say you don't know\"; lower **temperature**",
     "**Groundedness evaluation**, output validation, human-in-the-loop for high-risk cases"] },

{ cat:"LLMs & Generative AI", q:"Explain temperature, top-p, max tokens and other generation parameters.",
  a:["**Temperature** – randomness: `0` = deterministic/factual, `0.7–1.0` = creative",
     "**Top-p (nucleus)** – sample only from tokens covering p probability mass",
     "**Top-k** – sample from k most likely tokens",
     "**Max tokens** – caps output length (and cost)",
     "**Stop sequences**, **frequency/presence penalty** – reduce repetition",
     "Tip: tune **either** temperature **or** top-p, not both"] },

{ cat:"LLMs & Generative AI", q:"What is a context window and what happens when you exceed it?",
  a:["Max number of tokens (**input + output**) the model can process in one call",
     "Exceed it → error or truncation; long contexts also cost more and can suffer \"**lost in the middle**\"",
     "Strategies: **chunking + RAG**, summarization of history, sliding window memory, selecting only relevant content"] },

{ cat:"LLMs & Generative AI", q:"Prompt engineering vs RAG vs fine-tuning – when do you use each?",
  a:["**Prompt engineering** – cheapest & fastest; first thing to try",
     "**RAG** – model needs **your private / up-to-date knowledge**; gives citations; easy to update data",
     "**Fine-tuning** – change **style, format, tone, or specialized behavior**; shorten prompts; NOT ideal for injecting changing facts",
     "Often combined: fine-tuned model + RAG",
     "Order to try: Prompt → RAG → Fine-tune"],
  tip:"\"RAG for **knowledge**, fine-tuning for **behavior**\" – a classic one-liner to remember." },

{ cat:"LLMs & Generative AI", q:"What are common prompt engineering techniques?",
  a:["Clear **system message** (role, rules, output format, boundaries)",
     "**Zero-shot** vs **few-shot** (give examples)",
     "**Chain-of-thought** – ask the model to reason step by step",
     "Use **delimiters** to separate instructions from data; specify output **format (JSON)**",
     "Break complex tasks into steps (**prompt chaining**); ground with context; iterate & evaluate"],
  code:`System: You are a support assistant for Contoso. Answer ONLY from the
provided sources. If the answer is not there, say "I don't know".
Return JSON: {"answer": string, "citations": string[]}
User: <question>...</question>  <sources>...</sources>` },

{ cat:"LLMs & Generative AI", q:"What is the difference between open-source/open-weight and proprietary models? How do you pick a model?",
  a:["**Proprietary** (GPT-4o, Claude, Gemini) – top quality, managed API, less control",
     "**Open-weight** (Llama, Mistral, Phi, Qwen) – self-host, fine-tune, data stays in-house, more ops work",
     "**Small Language Models (SLMs)** like Phi – cheaper, faster, edge/on-device",
     "Choose by: **quality on your eval set**, latency, cost per token, context length, data privacy/compliance, multimodality, licensing"] },

{ cat:"LLMs & Generative AI", q:"What are multimodal models?",
  a:["Models that understand/produce **multiple modalities**: text, images, audio, video",
     "Examples: GPT-4o (text+vision+audio), Gemini, Claude vision",
     "Use cases: document/receipt understanding, image Q&A, speech assistants, video summarization"] },

// ───────────── RAG & Vector Search ─────────────
{ cat:"RAG & Vector Search", q:"How does a RAG pipeline work end to end?",
  a:["Combine **retrieval** of relevant documents with LLM **generation** to ground answers in your data",
     "**Ingestion**: load docs → **chunk** → **embed** → store in a **vector index**",
     "**Query**: embed question → **retrieve top-k** similar chunks → (re-rank) → put into prompt",
     "**Generate**: LLM answers using only the context, with **citations**",
     "Benefits: fresh/private knowledge, fewer hallucinations, no retraining"],
  code:`User question
   └─► embed ─► vector search (top-k) ─► re-rank
                                       └─► prompt = system + context + question
                                                    └─► LLM ─► grounded answer + citations` },

{ cat:"RAG & Vector Search", q:"What is a vector database and how does similarity search work?",
  a:["Stores **embeddings** and finds nearest neighbors quickly",
     "Similarity metrics: **cosine**, dot product, Euclidean",
     "**ANN** (approximate nearest neighbor) indexes like **HNSW**, IVF for speed at scale",
     "Examples: **Azure AI Search**, Pinecone, Weaviate, Qdrant, Milvus, pgvector, Cosmos DB vector search"] },

{ cat:"RAG & Vector Search", q:"What chunking strategies do you know? How do you choose chunk size?",
  a:["**Fixed-size** with **overlap** (e.g. 500–1000 tokens, 10–20% overlap)",
     "**Semantic / structure-aware** – split by headings, paragraphs, sections",
     "Too small → loses context; too large → noisy retrieval and wasted tokens",
     "Keep **metadata** (title, source, page, date) for filtering & citations",
     "Tune by **evaluating retrieval quality** on real questions"] },

{ cat:"RAG & Vector Search", q:"What is hybrid search and re-ranking?",
  a:["**Keyword search (BM25)** – exact terms, IDs, product codes",
     "**Vector search** – meaning, synonyms, paraphrases",
     "**Hybrid** – combine both (e.g. **Reciprocal Rank Fusion**) → best of both",
     "**Re-ranking** – a cross-encoder / **semantic ranker** re-scores top results for precision"],
  tip:"Hybrid + semantic re-ranking is the typical best-practice setup in Azure AI Search." },

{ cat:"RAG & Vector Search", q:"How do you evaluate and improve a RAG system?",
  a:["**Retrieval metrics**: recall@k, precision@k, MRR – did we fetch the right chunks?",
     "**Generation metrics**: **groundedness/faithfulness**, **relevance**, coherence, fluency, completeness",
     "Build a **golden Q&A dataset**; use **LLM-as-a-judge** + human review",
     "Improve: better chunking, hybrid search, re-ranking, query rewriting, metadata filters, better prompts",
     "Tools: Azure AI Foundry evaluations, Ragas, Prompt flow, DeepEval"] },

// ───────────── AI Agents ─────────────
{ cat:"AI Agents", q:"What is an AI agent and how is it different from a chatbot?",
  a:["**Agent** = LLM + **tools** + **memory** + **planning** that autonomously works toward a goal",
     "Loop: **Reason → Act (call tool) → Observe result → repeat** (ReAct pattern)",
     "Chatbot just responds; an agent can **take actions**: query APIs, DBs, send email, run code",
     "Frameworks: **Azure AI Foundry Agent Service**, Semantic Kernel, AutoGen, LangChain/LangGraph, OpenAI Agents SDK"] },

{ cat:"AI Agents", q:"What is function calling / tool use?",
  a:["You describe tools with a **JSON schema** (name, description, parameters)",
     "Model decides **when** to call a tool and returns **structured arguments**",
     "Your code **executes** the function and sends the result back to the model",
     "Model uses the result to produce the final answer",
     "Validate arguments and enforce permissions – never trust model output blindly"],
  code:`{ "name": "get_weather",
  "description": "Get current weather for a city",
  "parameters": { "type":"object",
    "properties": { "city": { "type":"string" } },
    "required": ["city"] } }` },

{ cat:"AI Agents", q:"What are multi-agent systems and the Model Context Protocol (MCP)?",
  a:["**Multi-agent** – specialized agents (planner, researcher, coder, reviewer) collaborate via an orchestrator",
     "Patterns: sequential, hierarchical/supervisor, group chat, handoff",
     "**MCP** – open standard for connecting LLM apps to **tools and data sources** in a uniform way (client ↔ server)",
     "**A2A** (Agent-to-Agent) – protocol for agents from different vendors to communicate",
     "Risks: cost, latency, loops – add limits, observability and human approval"],
  level:"Advanced" },

// ───────────── MLOps & LLMOps ─────────────
{ cat:"MLOps & LLMOps", q:"What is MLOps and what does the ML lifecycle look like?",
  a:["**MLOps** = DevOps practices for ML: reproducible, automated, monitored models",
     "Lifecycle: problem → data collection/prep → training → evaluation → **deployment** → **monitoring** → retraining",
     "Key pieces: **experiment tracking**, **model registry**, CI/CD pipelines, feature store, versioned data",
     "Tools: **Azure Machine Learning**, MLflow, Kubeflow, SageMaker, Vertex AI"] },

{ cat:"MLOps & LLMOps", q:"What is model drift and how do you monitor models in production?",
  a:["**Data drift** – input distribution changes over time",
     "**Concept drift** – relationship between inputs and target changes",
     "Monitor: prediction distributions, **accuracy vs ground truth**, latency, errors, cost",
     "Alert on thresholds → trigger **retraining** pipeline",
     "For LLMs also track: token usage, groundedness, safety violations, user feedback (👍/👎)"] },

{ cat:"MLOps & LLMOps", q:"What is LLMOps and how do you deploy a GenAI app to production?",
  a:["Manage prompts, models, evaluations and safety across the GenAI lifecycle",
     "**Prompt versioning** + **automated evaluations** in CI/CD (regression tests on a golden set)",
     "Deploy behind an API / **API gateway**: auth, **rate limiting**, retries, fallback models",
     "**Observability/tracing** (OpenTelemetry, App Insights): tokens, latency, cost per request",
     "**Content safety** filters, caching (semantic cache), A/B testing"] },

{ cat:"MLOps & LLMOps", q:"How do you reduce cost and latency of an LLM application?",
  a:["Use the **smallest model** that passes your evals (routing: small model first, escalate if needed)",
     "Shorter prompts, fewer retrieved chunks, limit `max_tokens`",
     "**Caching** (prompt caching / semantic cache), **batching**",
     "**Streaming** responses to improve perceived latency",
     "Provisioned throughput for steady loads; **quantization** / distillation for self-hosted models"] },

{ cat:"MLOps & LLMOps", q:"What are LoRA, quantization and distillation?",
  a:["**LoRA / QLoRA** – parameter-efficient fine-tuning: train small **low-rank adapter** matrices instead of all weights → cheap fine-tuning",
     "**Quantization** – store weights in fewer bits (FP16 → INT8/INT4) → less memory, faster inference, slight quality loss",
     "**Distillation** – a small **student** model learns to mimic a large **teacher** model"],
  level:"Advanced" },

// ───────────── Responsible AI & Security ─────────────
{ cat:"Responsible AI & Security", q:"What are the principles of Responsible AI?",
  a:["Microsoft's 6 principles: **Fairness**, **Reliability & Safety**, **Privacy & Security**, **Inclusiveness**, **Transparency**, **Accountability**",
     "Practices: bias testing, explainability, human oversight, red-teaming, documentation (model cards, transparency notes)",
     "Regulation: **EU AI Act** (risk-based), NIST AI RMF, GDPR for data"],
  tip:"Memory aid: \"**FRPITA**\" – Fairness, Reliability, Privacy, Inclusiveness, Transparency, Accountability." },

{ cat:"Responsible AI & Security", q:"What is prompt injection and how do you defend against it?",
  a:["Attacker inserts instructions that **override the system prompt** (\"Ignore previous instructions...\")",
     "**Direct** – in user input; **Indirect** – hidden in retrieved docs, web pages, emails",
     "Defenses: **Prompt Shields** / input classifiers, separate & delimit untrusted content",
     "**Least privilege** for tools, human approval for risky actions, output filtering",
     "Never put secrets in prompts; validate tool arguments; red-team regularly"] },

{ cat:"Responsible AI & Security", q:"How do you detect and mitigate bias in AI models?",
  a:["Sources: **unrepresentative training data**, historical bias, labeling bias, proxy features",
     "Measure fairness metrics across groups: demographic parity, equal opportunity",
     "Mitigate: balance/augment data, remove proxy features, re-weighting, post-processing thresholds",
     "Tools: **Fairlearn**, Azure ML Responsible AI dashboard; continuous monitoring"] },

{ cat:"Responsible AI & Security", q:"How do you protect sensitive data when using LLMs?",
  a:["Use enterprise endpoints (e.g. **Azure OpenAI**) – data **not used to train** base models",
     "**PII detection & redaction** before sending prompts",
     "**Private endpoints**, VNet, **managed identity** / Entra ID instead of API keys",
     "**Document-level security trimming** in RAG so users only retrieve what they can access",
     "Logging policies, data retention, encryption at rest/in transit"] },

// ───────────── Azure AI ─────────────
{ cat:"Azure AI", q:"What are the main Azure AI services?",
  a:["**Azure AI Foundry** – unified platform to build, evaluate & deploy GenAI apps and agents (model catalog, prompt flow, evaluations)",
     "**Azure OpenAI** – GPT-4o, o-series, embeddings, DALL·E, Whisper with enterprise security",
     "**Azure AI Search** – vector + hybrid search for RAG",
     "**Azure AI Services**: Language, Speech, Vision, Translator, **Document Intelligence**, **Content Safety**",
     "**Azure Machine Learning** – classic ML training, MLOps, model registry"] },

{ cat:"Azure AI", q:"What is Azure AI Content Safety?",
  a:["Detects harmful content in text & images: **hate, sexual, violence, self-harm** with severity levels",
     "**Prompt Shields** – detect jailbreak & indirect prompt injection attacks",
     "**Groundedness detection** – flags ungrounded (hallucinated) responses",
     "**Protected material** detection (copyrighted text/code)",
     "Built into Azure OpenAI as configurable **content filters**"] },

{ cat:"Azure AI", q:"How would you design an enterprise \"chat with your documents\" solution on Azure?",
  a:["Docs in **Blob Storage / SharePoint** → **Document Intelligence** to extract text/tables",
     "Chunk + embed with Azure OpenAI embeddings → index in **Azure AI Search** (hybrid + semantic ranker)",
     "App (App Service / Container Apps / Functions) orchestrates RAG with **Semantic Kernel** or LangChain",
     "**Azure OpenAI** GPT model generates grounded answers with citations",
     "Security: **Entra ID**, managed identity, private endpoints, security trimming, Content Safety",
     "Ops: App Insights tracing, Foundry evaluations, API Management for throttling"],
  level:"Advanced" },

// ───────────── Behavioral & Scenario ─────────────
{ cat:"Behavioral & Scenario", q:"Walk me through an end-to-end AI/ML project you have worked on.",
  a:["Use **STAR**: Situation, Task, Action, Result",
     "Business problem & success metric (e.g. reduce ticket handling time by 30%)",
     "Data sources, cleaning, features / chunking, model choice & why",
     "Evaluation approach, deployment architecture, monitoring",
     "**Measurable result**, what went wrong, what you'd improve"],
  tip:"Prepare 2–3 stories with numbers – people remember impact." },

{ cat:"Behavioral & Scenario", q:"A stakeholder says \"let's use AI for this.\" How do you decide if AI is the right solution?",
  a:["Clarify the **business problem** and success metrics first",
     "Would rules/SQL/simple automation solve it? → don't over-engineer",
     "Is there enough **quality data**? Is some error tolerable?",
     "Estimate cost, latency, risk, compliance; plan for **human-in-the-loop**",
     "Start with a small **POC + evaluation set**, then iterate"] },

{ cat:"Behavioral & Scenario", q:"Your RAG chatbot gives wrong answers in production. How do you troubleshoot?",
  a:["Check **tracing logs**: which chunks were retrieved for the failing question?",
     "If wrong chunks → retrieval problem: chunking, embeddings, hybrid search, filters, re-ranker",
     "If right chunks but wrong answer → generation problem: prompt, model, temperature, context order",
     "If no relevant doc exists → **content gap**; teach the bot to say \"I don't know\"",
     "Add the case to the **evaluation set** to prevent regressions"] },

{ cat:"RAG & Vector Search", q:"What is RAG (Retrieval-Augmented Generation)?",
  a:["A technique that lets an LLM answer using **external, trusted data** retrieved **at query time**, not only what it learned in training",
     "**Retrieval** – search your documents/knowledge base for the content most relevant to the question",
     "**Augmented** – add that content to the prompt as **context**",
     "**Generation** – the LLM writes the answer **grounded** in that context, ideally with **citations**",
     "Why use it: **private/company data**, **up-to-date** information, **fewer hallucinations**, traceable answers, and **no retraining** (just update the index)",
     "Typical use cases: chat with your documents, internal knowledge assistants, customer support bots, policy/HR Q&A",
     "Limitations: answers are only as good as the **retrieval**; adds latency and cost; context window limits how much you can include"],
  tip:"Analogy: RAG is an **open-book exam** – instead of answering from memory, the model looks up the relevant pages first, then answers." },

];
