import pymupdf, re, os, json

PDF = r"c:\Training\AI 300\AI-300.pdf"
OUTDIR = r"c:\Training\AI 300\quiz"
ASSETS = os.path.join(OUTDIR, "assets")
os.makedirs(ASSETS, exist_ok=True)

doc = pymupdf.open(PDF)
WM = "https://shapingpixel.com"

def raw(pi):
    return doc[pi].get_text()

def clean(pi):
    t = raw(pi).replace(WM, "")
    return t.strip()

def norm(pi):
    return re.sub(r"\s+", " ", clean(pi)).strip().lower()

def has_img(pi):
    return len(doc[pi].get_images()) > 0

# 1) find question start pages
starts = {}
for i in range(doc.page_count):
    m = re.search(r"(?m)^\s*(\d+)\)[.\s]", raw(i))
    if m:
        n = int(m.group(1))
        if n not in starts:
            starts[n] = i
nums = sorted(starts)

# build spans
spans = {}
for idx, n in enumerate(nums):
    start = starts[n]
    end = starts[nums[idx + 1]] - 1 if idx + 1 < len(nums) else doc.page_count - 1
    spans[n] = list(range(start, end + 1))

MARKERS = ("Correct Answer", "Answer(s):", "Box 1:", "Correct:")

def has_marker(pi):
    t = raw(pi)
    return any(mk in t for mk in MARKERS)

ANSWER_KEYWORDS = ("HOTSPOT", "Hotspot Question", "Drag and Drop", "DRAG DROP",
                   "Select and Place", "Drag Drop")

questions = []
for n in nums:
    pages = spans[n]
    qnorms = []
    answer_start = None
    for k, pi in enumerate(pages):
        if k == 0:
            qnorms.append(norm(pi))
            continue
        nm = norm(pi)
        if has_marker(pi):
            answer_start = k; break
        if nm != "" and nm in qnorms:
            answer_start = k; break
        if nm == "" and has_img(pi):
            # second image-only page => answer
            if any(norm(pages[j]) == "" and has_img(pages[j]) for j in range(k)):
                answer_start = k; break
        qnorms.append(nm)
    if answer_start is None:
        answer_start = len(pages)
    qpages = pages[:answer_start]
    apages_raw = pages[answer_start:]
    qset = set(norm(p) for p in qpages if norm(p) != "")
    apages = [p for p in apages_raw
              if has_img(p) or not (norm(p) != "" and norm(p) in qset)]
    # fallback: if no answer boundary found but multiple pages, last page is the answer
    if not apages and len(pages) > 1:
        apages = [pages[-1]]
        qpages = pages[:-1] if len(qpages) == len(pages) else qpages

    span_text = "\n".join(clean(p) for p in pages)
    is_special = any(kw in span_text for kw in ANSWER_KEYWORDS)
    has_diagram = any(has_img(p) for p in pages)

    # try parse MC
    qtext = "\n".join(clean(p) for p in qpages)
    # remove leading "N)" or "N)."
    qtext = re.sub(r"^\s*\d+\)[.\s]*", "", qtext).strip()
    # strip standard case-study boilerplate block (ends right before "Background -")
    qtext = re.sub(r"Case Study\s*-\s*", "", qtext, count=1)
    qtext = re.sub(r"This is a case study\..*?(?=Background\s*-)",
                   "", qtext, flags=re.S).strip()
    # find options
    opt_pat = re.compile(r"(?m)^\s*([A-F])[.\)]\s+(.*)$")
    opts = []
    for m in opt_pat.finditer(qtext):
        opts.append((m.group(1), m.start()))
    ca_match = re.search(r"(?:Correct Answer|Answer|Correct)\s*:\s*([A-F](?:\s*,\s*[A-F])*)\b", span_text)
    correct = []
    if ca_match:
        correct = [c.strip() for c in ca_match.group(1).split(",")]

    is_mc = (not is_special) and (not has_diagram) and len(opts) >= 2 and len(correct) >= 1

    entry = {"number": n}
    if is_mc:
        # stem = text before first option
        first_opt_pos = opts[0][1]
        stem = qtext[:first_opt_pos].strip()
        # parse options with text spanning until next option
        options = []
        matches = list(opt_pat.finditer(qtext))
        for i2, m in enumerate(matches):
            letter = m.group(1)
            text_start = m.start(2)
            text_end = matches[i2 + 1].start() if i2 + 1 < len(matches) else len(qtext)
            otext = qtext[text_start:text_end].strip()
            otext = re.sub(r"\s+", " ", otext)
            options.append({"letter": letter, "text": otext})
        entry["type"] = "mc"
        entry["multi"] = len(correct) > 1
        entry["stem"] = stem
        entry["options"] = options
        entry["correct"] = correct
    else:
        entry["type"] = "reveal"
        # render question pages and answer pages to PNG
        qimgs = []
        for k, pi in enumerate(qpages):
            fn = f"q{n}_q{k}.png"
            pix = doc[pi].get_pixmap(dpi=200)
            pix.save(os.path.join(ASSETS, fn))
            qimgs.append("assets/" + fn)
        aimgs = []
        for k, pi in enumerate(apages):
            fn = f"q{n}_a{k}.png"
            pix = doc[pi].get_pixmap(dpi=200)
            pix.save(os.path.join(ASSETS, fn))
            aimgs.append("assets/" + fn)
        entry["question_images"] = qimgs
        entry["answer_images"] = aimgs
        # subtype label
        label = "Question"
        for kw in ANSWER_KEYWORDS:
            if kw in span_text:
                label = kw.title() if kw.isupper() else kw
                break
        entry["label"] = label
    questions.append(entry)

# stats
mc = sum(1 for q in questions if q["type"] == "mc")
rv = sum(1 for q in questions if q["type"] == "reveal")
print("total", len(questions), "mc", mc, "reveal", rv)
with open(os.path.join(OUTDIR, "quiz_data.json"), "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=1)
print("wrote quiz_data.json")
