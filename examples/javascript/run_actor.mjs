// Run fayoussef/cargurus-listings-scraper through the Apify API and save the results.
//
// npm install apify-client
// export APIFY_TOKEN=<your token from https://console.apify.com/settings/integrations>
// node run_actor.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

// Edit input.json (next to this repo's README) to change what gets scraped.
const input = JSON.parse(readFileSync(new URL("../../input.json", import.meta.url), "utf8"));

const run = await client.actor("fayoussef/cargurus-listings-scraper").call(input);
const { items } = await client.dataset(run.defaultDatasetId).listItems();

writeFileSync("output.json", JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} items to output.json`);
