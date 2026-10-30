
import json
import os
import time

from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

url = os.environ["SUPABASE_URL"]
key = os.environ["SUPABASE_SECRET_KEY"]

supabase = create_client(url, key)

with open("software.json", "r", encoding="utf-8") as file:
    records = json.load(file)

if not isinstance(records, list):
    raise ValueError("software.json must contain a JSON list")

batch_size = 100
processed = 0


for start in range(0, len(records), batch_size):
    batch = records[start:start + batch_size]

    for attempt in range(3):
        try:
            result = (
                supabase
                .table("software")
                .upsert(batch, on_conflict="github_repo_id")
                .execute()
            )

            processed += len(batch)
            print(f"Processed {processed}/{len(records)} records")
            break

        except Exception as error:
            if attempt == 2:
                raise RuntimeError(
                    f"Upload failed for batch starting at {start}"
                ) from error

            wait_seconds = 2 ** (attempt + 1)
            print(f"Upload error: {error}")
            print(f"Retrying in {wait_seconds} seconds...")
            time.sleep(wait_seconds)

print(f"Upload finished. Processed {processed} records.")
