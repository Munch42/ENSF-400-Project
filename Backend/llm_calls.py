from dotenv import load_dotenv
from litellm import completion
from pydantic import BaseModel
from typing import TypeVar

# Load API key(s) into the environment for LiteLLM
load_dotenv(override=True)

# Default model and fallbacks to use to generate responses
MAIN_MODEL = "gemini/gemini-3-flash-preview"
FALLBACKS = ["gemini/gemini-3.1-flash-lite-preview"]

# Type of structured output schema
S = TypeVar("S", bound=BaseModel)

# Response schema to generate a list of questions
class QuestionsList(BaseModel):
    """A list of ten (10) interview questions"""
    questions: list[str]

def llm_call(prompt: str, **kwargs) -> str:
    """Generate a response to `prompt` using `MAIN_MODEL` then `FALLBACK_MODELS`."""
    messages = [{"role": "user", "content": prompt}]
    response = completion(MAIN_MODEL, messages, fallbacks=FALLBACKS, **kwargs)
    return response.choices[0].message.content  # type: ignore

def llm_call_structured_output(prompt: str, schema: type[S]):
    """Generate a response to `prompt` in the format `schema` using `MAIN_MODEL` then `FALLBACK_MODELS`."""
    response = llm_call(prompt, response_format=schema, enable_json_schema_validation=True)
    return schema.model_validate_json(response)

def generate_questions(resume_text: str, job_posting_text: str):
    prompt = f"""Job Description:
{job_posting_text}
---
Resume:
{resume_text}
---
As a skilled professional, you are interviewing a candidate based on the job description. Craft 10 interview questions, ensuring an **even** split between:
- Common questions, based on the discipline and resources you have seen online
- Generic soft-skills questions
- How their skills would allow them to excel at the position
- How their job or project experience aligns with the position
Create a realistic interview, considering the profession and seniority of the job. **Not** all questions should specifically mention the resume, include some generic, high-level questions. Begin with introductions and end with what they hope to get out of the position.
"""
    questions_list = llm_call_structured_output(prompt, QuestionsList)
    return questions_list.questions

class FeedbackList(BaseModel):
    """A list of feedback items, one per interview question"""
    feedback: list[str]

def generate_feedback(resume_text: str, job_posting_text: str, questions: list[str], answers: list[str]):
    interview_text = "\n---\n".join(f"Question:\n{question}\n\nAnswer:\n{answer}" for question, answer in zip(questions, answers))

    prompt = f"""Job Description:
{job_posting_text}
---
Resume:
{resume_text}
---
Interview:
{interview_text}
--- 
As a skilled professional, you provided me with a practice interview for the given job description. Please craft constructive feedback on what I could do to improve for each question. Consider which experiences I could highlight better based on their resume and job description and how I could improve my delivery. Return one feedback item per question in the same order as the questions.
"""

    feedback_list = llm_call_structured_output(prompt, FeedbackList)
    return feedback_list.feedback


# Test llm call with structured output
if __name__ == "__main__":
    print(llm_call_structured_output("Hello!", QuestionsList))
