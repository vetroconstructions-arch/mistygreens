# Phase 51: Hard-Force Indexing Activation Guide

The Paranjape Forest Trails platform is now equipped with the **Stage 51 Indexing Suite**. To achieve "Instant" search indexing for the 80+ pSEO pages, follow these 3 steps:

## 1. Setup the Google Service Account
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a **New Project** (e.g., `forest-trails-indexing`).
3.  Enable the **Indexing API** for this project.
4.  Go to **IAM & Admin > Service Accounts** and create a service account.
5.  Create a **JSON Key** for this account and download it.
6.  Rename this file to `service-account.json` and move it to the **root directory** of this project.

## 2. Authorize the Service Account
To allow the API to submit URLs, you must add the service account as an **Owner** of your site:
1.  Open [Google Search Console](https://search.google.com/search-console).
2.  Select the property: `https://www.paranjapetownship.com/`.
3.  Go to **Settings > Users and Permissions**.
4.  Click **Add User** and enter the `client_email` found in your `service-account.json`.
5.  Set the permission to **Owner**.

## 3. Run the Hard-Force Indexer
Once authorized, run the following command to trigger instant indexing:
```bash
node scripts/google-indexing-worker.js
```

### ✧ IndexNow (Bing/Yandex)
The IndexNow worker is **already active** and will run automatically during every deploy via `scripts/deploy-and-index.sh`. No additional setup is required.

---
> [!IMPORTANT]
> The Indexing API has a default quota of **200 URLs per day**. The worker is optimized to submit the top-priority conversion pages (Plots, Price, Investment) first.
