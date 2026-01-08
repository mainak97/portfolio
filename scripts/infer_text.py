import sys
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

MODEL_ID = "google/flan-t5-base"

tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForSeq2SeqLM.from_pretrained(
    MODEL_ID,
    device_map="auto",
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
)

model.eval()

semantic = sys.argv[1]

prompt = (
    "Create a unique artistic caption, strictly 5 to 10 words, "
    "that does NOT repeat the input text:\n\n"
    f"{semantic}\n\n"
)

inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

with torch.no_grad():
    output_ids = model.generate(
        **inputs,
        max_new_tokens=50,
        do_sample=True,
        top_p=0.95,
        temperature=1.0,
        repetition_penalty=1.5,
        eos_token_id=tokenizer.eos_token_id,
        pad_token_id=tokenizer.pad_token_id
    )

caption = tokenizer.decode(output_ids[0], skip_special_tokens=True).strip()

# Ensure full sentence ends with proper punctuation
if not caption.endswith(('.', '!', '?')):
    caption += "."

# Enforce 5-10 words by trimming excess words if necessary
words = caption.split()
if len(words) < 5:
    # If too short, leave as is
    final_caption = caption
elif len(words) > 10:
    # Trim to 10 words, keep proper punctuation
    final_caption = " ".join(words[:10])
    if not final_caption.endswith(('.', '!', '?')):
        final_caption += "."
else:
    final_caption = caption

print(caption)
