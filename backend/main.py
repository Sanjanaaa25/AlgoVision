from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# INPUT MODEL
class ProblemRequest(BaseModel):
    text: str


@app.post("/analyze")
def analyze_problem(problem: ProblemRequest):

    prompt = f"""
You are an expert DSA tutor.

Analyze the following coding problem.

Problem:
{problem.text}

Return ONLY valid JSON in this format:

{{
  "pattern": "",
  "difficulty": "",
  "coreIdea": "",
  "hint1": "",
  "hint2": "",
  "hint3": "",
  "timeComplexity": "",
  "spaceComplexity": "",
  "pseudocode": ""
}}

Keep answers short and student-friendly.
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        },
        json={
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
    )

    data = response.json()

    print(data)

    # HANDLE API ERRORS
    if "choices" not in data:
        return {
            "pattern": "API Error",
            "difficulty": "-",
            "coreIdea": str(data),
            "hint1": "-",
            "hint2": "-",
            "hint3": "-",
            "timeComplexity": "-",
            "spaceComplexity": "-",
            "pseudocode": "-"
        }

    ai_text = data["choices"][0]["message"]["content"]

    try:
        parsed = json.loads(ai_text)
        return parsed

    except:
        return {
            "pattern": "Parsing Error",
            "difficulty": "-",
            "coreIdea": ai_text,
            "hint1": "-",
            "hint2": "-",
            "hint3": "-",
            "timeComplexity": "-",
            "spaceComplexity": "-",
            "pseudocode": "-"
        }