import os
from dotenv import load_dotenv

load_dotenv(override=True)

if __name__ == "__main__":
    api_key = os.getenv("API_KEY")
    print(api_key)
