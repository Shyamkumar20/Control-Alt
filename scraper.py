
import json
import os
import time
from datetime import datetime, timezone

import requests
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("GITHUB_TOKEN")
API_URL = "https://api.github.com/search/repositories"

headers = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}
if TOKEN:
    headers["Authorization"] = f"Bearer {TOKEN}"

# Start small. Each query returns at most 100 results per page,
# and GitHub repository search exposes at most 1,000 per query.
'''queries = [
    "topic:productivity stars:>50",
    "topic:developer-tools stars:>50",
    "topic:machine-learning stars:>50",
    "topic:self-hosted stars:>50",
]'''

queries = {
    "productivity": [
        "topic:productivity stars:>50",
        "topic:project-management stars:>20",
    ],
    "developer_tools": [
        "topic:developer-tools stars:>50",
        "topic:code-editor stars:>20",
    ],
    "ai_ml": [
        "topic:machine-learning stars:>50",
        "topic:artificial-intelligence stars:>20",
    ],
    "music_audio": [
        "topic:music-player stars:>=20",
        "topic:audio-editor stars:>=10",
        "topic:music-streaming stars:>=10",
        "topic:podcast stars:>=10",
    ],
    "video_streaming": [
        "topic:video-player stars:>=20",
        "topic:video-streaming stars:>=10",
        "topic:media-server stars:>=20",
        "topic:live-streaming stars:>=10",
        "topic:youtube-alternative stars:>=10",
    ],
    "editing_design": [
        "topic:video-editor stars:>=10",
        "topic:image-editor stars:>=10",
        "topic:photo-editing stars:>=10",
        "topic:animation stars:>=20",
        "topic:screen-recorder stars:>=10",
    ],
}




repositories = {}

for query in queries:
    print(f"Searching: {query}")

    for page in range(1, 3):  # Up to 200 results per query
        response = requests.get(
            API_URL,
            headers=headers,
            params={
                "q": query,
                "sort": "stars",
                "order": "desc",
                "per_page": 100,
                "page": page,
            },
            timeout=30,
        )

        if response.status_code == 403:
            raise RuntimeError(
                "GitHub rate limit or access restriction. "
                "Wait and try again, or check your token."
            )

        response.raise_for_status()
        payload = response.json()

        for repo in payload.get("items", []):
            repo_id = repo["id"]
            license_info = repo.get("license") or {}

            record = {
                "github_repo_id": repo_id,
                "full_name": repo["full_name"],
                "name": repo["name"],
                "description": repo.get("description"),
                "html_url": repo["html_url"],
                "homepage": repo.get("homepage"),
                "license_spdx": license_info.get("spdx_id"),
                "language": repo.get("language"),
                "topics": repo.get("topics", []),
                "stars": repo.get("stargazers_count", 0),
                "forks": repo.get("forks_count", 0),
                "open_issues": repo.get("open_issues_count", 0),
                "created_at": repo.get("created_at"),
                "pushed_at": repo.get("pushed_at"),
                "fetched_at": datetime.now(timezone.utc).isoformat(),
            }

            repositories[repo_id] = record

        print(
            f"Page {page}: collected "
            f"{len(payload.get('items', []))} results"
        )

        if len(payload.get("items", [])) < 100:
            break

        time.sleep(2)

with open("software.json", "w", encoding="utf-8") as file:
    json.dump(
        list(repositories.values()),
        file,
        ensure_ascii=False,
        indent=2,
    )

print(f"Saved {len(repositories)} unique repositories to software.json")
