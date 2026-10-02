# Google Indexing API Multi-Project Key Pool

To multiply your daily Google indexing quota (e.g. from 200/day to 1,000/day or 2,000/day), place additional Google Cloud Service Account JSON key files in this directory.

## How Horizontal Quota Pooling Works
* Google Cloud enforces a limit of **200 publish requests per day per project**.
* Having multiple keys from the **same** project does not increase quota (they share 200).
* Having keys from **different** GCP projects scales linearly:
  - 1 Project = 200 URLs/day
  - 3 Projects = 600 URLs/day
  - 5 Projects = 1,000 URLs/day
  - 10 Projects = 2,000 URLs/day

## 3-Step Setup for Each New Project:
1. **Create Project**: Go to [Google Cloud Console](https://console.cloud.google.com/) and create a new project (e.g. `pscl-indexing-02`).
2. **Enable API**: Search for and enable the **Web Search Indexing API**.
3. **Create Service Account**:
   - Go to IAM & Admin → Service Accounts → Create Service Account.
   - Role: Owner or Editor.
   - Create Key → Key type: JSON.
   - Save the downloaded file here: `keys/project-02.json`.
4. **Grant Access in Google Search Console**:
   - Go to [Google Search Console](https://search.google.com/search-console).
   - Settings → Users and permissions → Add user.
   - Paste the service account email (`...@...gserviceaccount.com`).
   - Permission: **Owner** (or Full).

The `google-quota-manager.js` script will automatically discover all keys in this folder and pool them into a unified multi-project quota engine!
