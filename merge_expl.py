import json

QUIZ = r"c:\Training\AI 300\quiz\quiz_data.js"
EXPL_FILES = [
    r"c:\Training\AI 300\quiz\explanations.json",
    r"c:\Training\AI 300\quiz\explanations_reveal.json",
]

src = open(QUIZ, encoding="utf-8").read()
i = src.index("["); j = src.rindex("]") + 1
data = json.loads(src[i:j])
expl = {}
import os
for f in EXPL_FILES:
    if os.path.exists(f):
        expl.update(json.load(open(f, encoding="utf-8")))

applied = 0
for q in data:
    key = str(q["number"])
    if key in expl and expl[key].strip():
        q["explanation"] = expl[key].strip()
        applied += 1

out = "const QUIZ_DATA = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
open(QUIZ, "w", encoding="utf-8").write(out)

missing = [q["number"] for q in data if not q.get("explanation")]
print(f"applied {applied} explanations; still missing {len(missing)}")
print("missing:", missing)
