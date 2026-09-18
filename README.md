# CarGurus Scraper (US, Canada & UK Car Listings)

Scrape CarGurus vehicle listings from .com, .ca and .co.uk. Returns price, mileage, VIN, specs, dealer info and all images per listing.

This repo shows how to call the [CarGurus Scraper (US, Canada & UK Car Listings)](https://apify.com/fayoussef/cargurus-listings-scraper?fpr=youssef) Apify Actor from your own code: a Python and a JavaScript example, the input they send, and a sample of the output. Everything runs in the Apify cloud, so there is nothing to host, scale or maintain on your side.

- **Run it in the browser:** [fayoussef/cargurus-listings-scraper on Apify](https://apify.com/fayoussef/cargurus-listings-scraper?fpr=youssef)
- **Guide and docs:** [automationbyexperts.com/apify/cargurus-listings-scraper](https://automationbyexperts.com/apify/cargurus-listings-scraper)
- **Actor ID for the API:** `fayoussef/cargurus-listings-scraper`

## Use cases

- [Find the best used car deals near New York on CarGurus](https://apify.com/fayoussef/cargurus-listings-scraper/examples/used-car-deals-near-new-york?fpr=youssef): Searches CarGurus US within 50 miles of Manhattan and returns listings ordered by CarGurus deal score, best deals first, with price, mileage, VIN, dealer and photos on every row. No URL to build: pick the country, type a ZIP, and the filter form does the rest.
- [Export Toronto used car listings from CarGurus Canada](https://apify.com/fayoussef/cargurus-listings-scraper/examples/toronto-used-cars-cargurus-canada?fpr=youssef): Pulls used car listings from cargurus.ca within 50 km of downtown Toronto, cheapest first, with CAD price, kilometres, VIN, dealer name and photo URLs. Made for Ontario dealers pricing trade-ins and for anyone building a GTA used car price index.
- [Pull London used car deals from CarGurus UK](https://apify.com/fayoussef/cargurus-listings-scraper/examples/london-used-cars-cargurus-uk?fpr=youssef): Searches cargurus.co.uk within 30 miles of central London and returns the top deals with GBP price, mileage, registration year, dealer and images. Useful for UK dealers benchmarking stock and for buyers who want the whole market in one sortable sheet.

## Quick start

1. Create a free [Apify account](https://console.apify.com/sign-up?fpr=youssef) and copy your API token from [Settings > Integrations](https://console.apify.com/settings/integrations).
2. Set it as an environment variable: `export APIFY_TOKEN=...` (PowerShell: `$env:APIFY_TOKEN="..."`).
3. Edit [`input.json`](input.json) and run one of the examples below.

### Python

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

### JavaScript / Node.js

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

### cURL (plain HTTP)

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

## Pricing

Pay per use on Apify: you are charged per event (results produced), with no subscription to this Actor. The current rate is shown on the [Actor's Store page](https://apify.com/fayoussef/cargurus-listings-scraper?fpr=youssef). Free-plan runs are capped; an [Apify plan](https://apify.com/pricing?fpr=youssef) unlocks full runs.

## More Actors by AutomationByExperts

- [AutoTrader Canada Car Scraper: Prices, VIN, Mileage & Dealers](https://github.com/automationbyexperts/autotrader-canada-scraper)
- [AutoScout24 All-Country Scraper](https://github.com/automationbyexperts/autoscout24-scraper)
- [Kijiji.ca Scraper: Autos, Real Estate & Classifieds](https://github.com/automationbyexperts/kijiji-scraper)
- [autotrader.co.za Car Scraper with Seller Phone Numbers](https://github.com/automationbyexperts/autotrader-south-africa-scraper)
- [Bulk AI Image Generator (NO API KEY)](https://github.com/automationbyexperts/bulk-ai-image-generator)
- [Bulk LLM Runner GPT, Claude, Perplexity, Kimi (No API Key)](https://github.com/automationbyexperts/bulk-llm-runner)
- [Full catalog of our web scraping APIs](https://github.com/automationbyexperts/web-scraping-apis)

## Support

Questions, bugs or a custom scraper: open an issue here, use the Issues tab on the [Apify page](https://apify.com/fayoussef/cargurus-listings-scraper?fpr=youssef), or email youssefarhan24@gmail.com.

## License

The example code in this repo is MIT licensed. The Actor itself runs on Apify under its own terms.
