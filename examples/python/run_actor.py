"""Run fayoussef/cargurus-listings-scraper through the Apify API and save the results.

pip install apify-client
export APIFY_TOKEN=<your token from https://console.apify.com/settings/integrations>
python run_actor.py
"""
import json
import os
from pathlib import Path

from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])

# Edit input.json (next to this repo's README) to change what gets scraped.
run_input = json.loads((Path(__file__).resolve().parents[2] / "input.json").read_text())

run = client.actor("fayoussef/cargurus-listings-scraper").call(run_input=run_input)
items = list(client.dataset(run["defaultDatasetId"]).iterate_items())

Path("output.json").write_text(json.dumps(items, indent=2, ensure_ascii=False))
print(f"Saved {len(items)} items to output.json")
