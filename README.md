# Sales & Revenue Analysis Dashboard

A responsive, interactive sales dashboard built with HTML, CSS, JavaScript, and Chart.js.

## Features
- KPI cards: total revenue, orders, units sold, average order value
- Revenue trend chart
- Revenue breakdown by category, region, and channel
- Top-products table ranked by revenue
- Filters for date range, region, category, and channel
- Import your own CSV file
- Export the currently filtered data to CSV
- Responsive layout for desktop and mobile

## Run locally
1. Download and extract the ZIP.
2. Open `index.html` in a modern browser.
3. Internet access is needed to load Chart.js from its CDN.

You can also serve the folder using VS Code Live Server or Python's local server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## CSV format
The dashboard accepts CSV columns with these names (some aliases are supported):
- `date` — required, format `YYYY-MM-DD`
- `order_id` (or `order`)
- `product`
- `category`
- `region`
- `units` (or `quantity`)
- `unit_price` (or `price`)
- `channel`

Each row should represent a product line within an order. Revenue is calculated as `units × unit_price`.

Example:
```csv
date,order_id,product,category,region,units,unit_price,channel
2026-01-03,ORD-1001,Wireless Headphones,Electronics,North,2,79,Online
```

## GitHub upload
1. Extract the ZIP.
2. Create a new repository on GitHub.
3. Upload the files and folders from inside the extracted `sales-revenue-dashboard` folder (not the ZIP file alone if you want GitHub Pages to run directly).
4. Commit the changes.
5. To publish with GitHub Pages: open repository **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
6. Open the published Pages URL after deployment completes.

## Notes
- The included data is fictional demo data, not real business data.
- CSV import expects comma-separated values and currently assumes simple CSV rows (no embedded commas in unquoted fields).
