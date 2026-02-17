# Railway Deployment Guide for FinHealthTracker Backend

## Quick Setup (2 minutes)

### Step 1: Go to Railway
1. Open: https://railway.app/
2. Login with GitHub (or create account)
3. Click **New Project** → **Deploy from GitHub**

### Step 2: Connect GitHub
1. Select repository: `jantaoad/Finhealthtracker`
2. Authorize Railway to access GitHub
3. Railway will auto-detect the project

### Step 3: Configure Backend Service
1. Railway shows detected services
2. Select **backend** folder
3. Click **Deploy**

### Step 4: Environment Variables
1. Go to **backend** service → **Variables**
2. Add these variables:
```
NODE_ENV=production
PORT=5000
JWT_SECRET=your-secret-key-change-this
DATABASE_URL=postgresql://...  (or keep SQLite)
CORS_ORIGIN=*
```

3. Click **Save**

### Step 5: Get Your URL
1. Go to **Deployments** tab
2. Copy the **Public URL** (looks like: `https://your-app-xyz.railway.app`)
3. Your backend will be at: `https://your-app-xyz.railway.app/health`

---

## Backend URL for Frontend

Once deployed, update frontend:

**File:** `frontend/.env.production`
```
VITE_API_BASE_URL=https://your-app-xyz.railway.app/api
```

---

## Cost
**Railway Free Tier:** $5/month free credit (enough for 1 backend + database)

---

## Alternative: Use App Runner (Already Configured!)

If you prefer AWS App Runner (already set up), the backend might already be deploying!

Check: AWS Console → App Runner → Your service → Deployments

---

## Deploy Now!
https://railway.app/
