from dotenv import load_dotenv
from litellm import completion

# Load API key from 
load_dotenv(override=True)

MAIN_MODEL = "gemini/gemini-3-flash-preview"
FALLBACKS = ["gemini/gemma-3-27b-it"]

def llm_call(prompt: str):
    messages = [{"role": "user", "content": prompt}]
    response = completion(MAIN_MODEL, messages, fallbacks=FALLBACKS)
    return response.choices[0].message.content  # type: ignore

if __name__ == "__main__":
    print(llm_call("Hello!"))
