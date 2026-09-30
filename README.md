# CarGurus Scraper: US, Canada & UK Car Listings with Price, Deal Rating, VIN & Dealer Info

[![Run on Apify](https://img.shields.io/badge/Apify-Run%20the%20Actor-00A67E?logo=apify&logoColor=white)](https://apify.com/fayoussef/cargurus-listings-scraper?fpr=youssef)
![Countries](https://img.shields.io/badge/Countries-US%20%7C%20Canada%20%7C%20UK-2ea44f)
![Deal rating](https://img.shields.io/badge/Deal%20rating-included-1C7ED6)
![Photos](https://img.shields.io/badge/Photos-every%20image-8B5CF6)
![Export](https://img.shields.io/badge/Export-JSON%20%7C%20CSV%20%7C%20Excel-F59E0B)

> ### ▶️ [Run the CarGurus Scraper on Apify](https://apify.com/fayoussef/cargurus-listings-scraper?fpr=youssef)
> Scrape **CarGurus** listings from the US, Canada and the UK with price, **deal rating**, expected market price, mileage, **VIN**, full specs, dealer phone and rating, and **every listing photo**. Paste a URL or just pick a country and ZIP code.

**CarGurus Scraper** turns CarGurus search results into clean structured car data, one record per listing, from **cargurus.com, cargurus.ca and cargurus.co.uk**. It is built for car dealers, price intelligence tools, marketplaces and automotive researchers. This repository documents the Apify Actor and gives working Python, JavaScript and cURL examples for calling it through the API.

- **Run it in the browser:** [fayoussef/cargurus-listings-scraper on Apify](https://apify.com/fayoussef/cargurus-listings-scraper?fpr=youssef)
- **Guide and docs:** [automationbyexperts.com/apify/cargurus-listings-scraper](https://automationbyexperts.com/apify/cargurus-listings-scraper)
- **Actor ID for the API:** `fayoussef/cargurus-listings-scraper`

## What the CarGurus scraper does

- **Three countries, one Actor**: United States, Canada and United Kingdom, detected from your input.
- **Search without a URL**: pick the country, a ZIP or postal code and a radius, sort order and optional make and model.
- **Or paste any CarGurus search URL** with your filters already set.
- **CarGurus deal data**: `dealRating` (Great, Good, Fair...), `dealScore` and CarGurus' `expectedPrice` for the car.
- **Every full resolution photo**, often 25 to 80 per car, not just the thumbnail.
- **All pages or a limit**: `maxPages = 0` scrapes the whole result set.
- **Proxies built in**: country-matched residential proxies, no setup.

## Output fields: what data you get

One record per listing. The main fields:

| Field | Description |
|---|---|
| `listingId` / `listingUrl` / `title` | Listing identity |
| `year` / `make` / `model` / `trim` | Vehicle identity |
| `price` / `msrp` / `expectedPrice` | Asking price, MSRP and CarGurus market value |
| `dealRating` / `dealScore` | CarGurus deal rating |
| `mileage` / `condition` / `isNew` | Mileage and condition |
| `vin` / `stockNumber` | VIN and dealer stock number |
| `transmission` / `drivetrain` / `engine` / `fuelType` | Specs |
| `exteriorColor` / `interiorColor` / `doors` | Body details |
| `dealerName` / `dealerPhone` / `dealerWebsite` / `dealerRating` / `dealerReviewCount` | Dealer contact and reviews |
| `dealerLocation` / `postalCode` / `distance` | Location |
| `images` / `imageCount` / `mainImage` | Every photo |

## Input

Paste CarGurus URLs into `startUrls`, or leave it empty and search by location:

| Field | What it does |
|---|---|
| `startUrls` | CarGurus search URLs (US, CA or UK) |
| `searchCountry` | `US`, `CA` or `UK` |
| `zip` | ZIP or postal code to search around, e.g. `10001`, `M4B 1B4`, `SW1A 1AA` |
| `distance` | Search radius |
| `sortType` / `sortDirection` | Best match, deal score, price, mileage, year, distance, listing date |
| `makeModelTrimPaths` | Optional CarGurus make and model filter |
| `maxPages` | Result pages per URL, `0` for all |

## Use cases

- **Car dealers**: monitor competitor pricing and inventory in your area.
- **Price intelligence**: track deal ratings, expected prices and price drops.
- **Dealer lead generation**: build dealer lists with phone, website and ratings.
- **Marketplaces and aggregators**: import vehicle inventory with full photo sets.
- **Market research**: model prices by make, model and region in three countries.

Ready-made examples you can run in one click:

- [Find the best used car deals near New York on CarGurus](https://apify.com/fayoussef/cargurus-listings-scraper/examples/used-car-deals-near-new-york?fpr=youssef): Searches CarGurus US within 50 miles of Manhattan and returns listings ordered by CarGurus deal score, best deals first, with price, mileage, VIN, dealer and photos on every row. No URL to build: pick the country, type a ZIP, and the filter form does the rest.
- [Pull London used car deals from CarGurus UK](https://apify.com/fayoussef/cargurus-listings-scraper/examples/london-used-cars-cargurus-uk?fpr=youssef): Searches cargurus.co.uk within 30 miles of central London and returns the top deals with GBP price, mileage, registration year, dealer and images. Useful for UK dealers benchmarking stock and for buyers who want the whole market in one sortable sheet.

## Quick start

### 1. In the browser (no code)

1. Open the Actor on Apify and click **Try for free**.
2. Paste a CarGurus search URL, or pick a country and type a ZIP or postal code.
3. Click **Start**, then download Excel, CSV or JSON from the **Output** tab.

### 2. Through the API

1. Create a free [Apify account](https://console.apify.com/sign-up?fpr=youssef) and copy your API token from [Settings > Integrations](https://console.apify.com/settings/integrations).
2. Set it as an environment variable: `export APIFY_TOKEN=...` (PowerShell: `$env:APIFY_TOKEN="..."`).
3. Edit [`input.json`](input.json) and run one of the examples below.

#### Python

```bash
pip install apify-client
python examples/python/run_actor.py
```

```python
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])
run = client.actor("fayoussef/cargurus-listings-scraper").call(run_input={'searchCountry': 'US',
 'zip': '10001',
 'distance': 50,
 'sortType': 'DEAL_SCORE',
 'sortDirection': 'DESC',
 'maxPages': 5})

for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)
```

#### JavaScript / Node.js

```bash
npm install apify-client
node examples/javascript/run_actor.mjs
```

```javascript
import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor("fayoussef/cargurus-listings-scraper").call({
    "searchCountry": "US",
    "zip": "10001",
    "distance": 50,
    "sortType": "DEAL_SCORE",
    "sortDirection": "DESC",
    "maxPages": 5
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
```

#### cURL (plain HTTP)

Runs the Actor and returns the dataset items in one synchronous call:

```bash
curl -X POST "https://api.apify.com/v2/acts/fayoussef~cargurus-listings-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @input.json
```

Synchronous calls time out after 300 seconds. For larger runs use the client libraries above, or start the run with `POST /v2/acts/fayoussef~cargurus-listings-scraper/runs` and read the dataset when it finishes.

## Sample output

One record, from [`sample-output.json`](sample-output.json). Export the full dataset as JSON, CSV, Excel or HTML from the Apify Console, or read it through the API as shown above.

```json
{
  "country": "US",
  "listingId": 441325338,
  "title": "2023 Hyundai Tucson SEL FWD",
  "year": 2023,
  "make": "Hyundai",
  "model": "Tucson",
  "trim": "SEL FWD",
  "price": 21495,
  "priceString": "$21,495",
  "msrp": 28500,
  "expectedPrice": 22100,
  "dealScore": 8.7,
  "dealRating": "GREAT_PRICE",
  "mileage": 31250,
  "mileageString": "31,250 mi",
  "condition": "USED",
  "isNew": false,
  "vin": "5NMJBCAE8PH000000",
  "stockNumber": "H12345",
  "transmission": "Automatic",
  "drivetrain": "Front-Wheel Drive",
  "engine": "2.5L I4",
  "fuelType": "Gasoline",
  "exteriorColor": "White",
  "interiorColor": "Black",
  "doors": "4 doors",
  "postalCode": "11209",
  "distance": 8,
  "savedCount": 12,
  "dealerName": "Hyundai City of Bay Ridge",
  "dealerType": "FRANCHISE",
  "dealerPhone": "(718) 000-0000",
  "dealerLocation": "Brooklyn, NY, 11209",
  "dealerWebsite": "https://...",
  "dealerRating": 4.6,
  "dealerReviewCount": 1284,
  "imageCount": 49,
  "mainImage": "https://static.cargurus.com/.../1024x768.jpeg",
  "images": [
    "https://...",
    "https://..."
  ],
  "listingUrl": "https://www.cargurus.com/Cars/inventorylisting/...",
  "detailApiUrl": "https://www.cargurus.com/Cars/detailListingJson.action?inventoryListing=441325338",
  "sourceUrl": "https://www.cargurus.com/search?...",
  "scrapedAt": "2026-06-08T17:40:00+00:00"
}
```

## Integrations and automation

- **Schedule it** daily to catch new listings and deal rating changes.
- **Send results** to Google Sheets, Airtable, Slack, a webhook, Make, Zapier or n8n with Apify integrations.
- **Use it from AI agents** through the Apify MCP server.

## FAQ

### Does CarGurus have a public API?
No public listings API. This Actor is a CarGurus API alternative: one Apify API call returns structured JSON for every car.

### Which CarGurus sites are supported?
cargurus.com (US), cargurus.ca (Canada) and cargurus.co.uk (UK), detected automatically.

### Do I need a CarGurus URL?
No. Pick a country and a ZIP or postal code and the Actor builds the search.

### Does it include CarGurus' deal rating?
Yes: `dealRating`, `dealScore` and `expectedPrice`, CarGurus' estimate of the car's market value.

### Can I get all photos of a listing?
Yes. `images` holds every full resolution photo.

### How do I get every car, not just page 1?
Leave `maxPages` at `0`.

### Do I need proxies?
No. Country-matched residential proxies are built in.

## Pricing

Pay per use on Apify: you are charged per event (results produced), with no subscription to this Actor. The current rate is shown on the [Actor's Store page](https://apify.com/fayoussef/cargurus-listings-scraper?fpr=youssef). Free-plan runs are capped; an [Apify plan](https://apify.com/pricing?fpr=youssef) unlocks full runs.

## Related scrapers by AutomationByExperts

- [AutoTrader.ca Scraper: Canada Car Listings, VIN & Dealers](https://github.com/automationbyexperts/autotrader-canada-scraper)
- [AutoScout24 Scraper: European Car Listings & Dealer Phones](https://github.com/automationbyexperts/autoscout24-scraper)
- [Kijiji.ca Scraper: Cars, Rentals & Classifieds with Phones](https://github.com/automationbyexperts/kijiji-scraper)
- [AutoTrader.co.za Scraper: South Africa Cars with Seller Phones](https://github.com/automationbyexperts/autotrader-south-africa-scraper)
- [Bulk AI Image Generator: Nano Banana & GPT Image](https://github.com/automationbyexperts/bulk-ai-image-generator)
- [Bulk LLM Runner: ChatGPT, Claude & Gemini in Bulk](https://github.com/automationbyexperts/bulk-llm-runner)
- [Full catalog of our web scraping APIs](https://github.com/automationbyexperts/web-scraping-apis)

## Support

Questions, bugs or a custom scraper: open an issue here, use the Issues tab on the [Apify page](https://apify.com/fayoussef/cargurus-listings-scraper?fpr=youssef), or email youssefarhan24@gmail.com.

## License

The example code in this repo is MIT licensed. The Actor itself runs on Apify under its own terms.
