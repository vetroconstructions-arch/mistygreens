# Google Cloud Service Account Key Directory (Enterprise Quota Federation)

This directory is monitored by `scripts/enterprise_google_indexing.js`.

---

## How Google Indexing API Quota Works

- **Standard Quota:** Google allocates **200 URLs per day per Google Cloud Project** for the Indexing API.
- **Multiple Keys in Same Project:** Dropping multiple service account keys from the *same* GCP project ID shares the same 200/day limit.
- **Multi-Project Federation:** By creating separate Google Cloud projects and dropping their service account JSON keys here, the Enterprise Indexer **automatically pools their quotas**:
  - 1 Unique GCP Project = **200 URLs / day**
  - 2 Unique GCP Projects = **400 URLs / day**
  - 3 Unique GCP Projects = **600 URLs / day**
  - 5 Unique GCP Projects = **1,000 URLs / day**
  - 10 Unique GCP Projects = **2,000 URLs / day**

---

## Step-by-Step: Adding an Additional Google Cloud Project

1. **Go to Google Cloud Console**:  
   [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate)  
   Create a new project (e.g., `paranjape-indexer-pool-2`).

2. **Enable Web Search Indexing API**:  
   Navigate to **APIs & Services > Library** > Search for **Web Search Indexing API** > Click **Enable**.

3. **Create Service Account**:  
   Go to **IAM & Admin > Service Accounts** > Click **Create Service Account**.  
   Name: `google-indexing-bot`  
   Role: **Owner** (or Indexing API permissions).

4. **Generate JSON Key**:  
   Click the created Service Account > **Keys** tab > **Add Key** > **Create new key** > Select **JSON** > Click **Create**.  
   Save the downloaded file into this `keys/` directory (e.g. `keys/service-account-pool2.json`).

5. **Grant Ownership in Google Search Console**:  
   Copy the `client_email` from your downloaded JSON (e.g., `google-indexing-bot@paranjape-indexer-pool-2.iam.gserviceaccount.com`).  
   Go to [Google Search Console](https://search.google.com/search-console) > Select `https://www.paranjapetownship.com/` > **Settings** > **Users and permissions** > **Add User** > Paste email > Set Permission to **Owner**.

6. **Verify Quota Expansion**:  
   Run:
   ```bash
   node scripts/enterprise_google_indexing.js --status
   ```
   The engine will automatically detect the new unique project and increase your daily quota capacity!

---

## Official Google Quota Increase Request (Direct Form)

To request a permanent quota increase to **5,000 URLs/day** on your primary project (`thematic-gift-461211-f1`):
👉 [Submit Google Indexing API Quota Request](https://docs.google.com/forms/d/e/1FAIpQLSc_mpLw3WnnCt3pVbUHYZZ6ZdOS-c0GIj-WZ_k54SG-jDqCXQ/viewform?entry.840738641=657035699673&entry.1781339011=propsmartrealty%40gmail.com&entry.1191128052=Vikas%20Yewle&entry.1492822222=5000&entry.838995858=https%3A%2F%2Fwww.paranjapetownship.com%2F)
