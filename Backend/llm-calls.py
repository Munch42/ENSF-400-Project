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

# Test llm call with structured output
if __name__ == "__main__":
    print(llm_call_structured_output("Hello!", QuestionsList))
