# 🎯 FinHealthTracker - Complete Setup Guide

## ✅ Current Status

- ✅ Backend running locally on `http://localhost:5000`
- ✅ Frontend built and ready
- ✅ S3 bucket created: `finhealthtracker-janta-39776`

---

## 🚀 To Get Full App Working: 3 Steps

### **STEP 1: Test Locally (5 minutes)**

**Terminal 1 - Start Backend:**
```powershell
cd "d:\Janta App\finhealthtracker\backend"
npm start
```

Expected output:
```
✅ Database connection successful
✅ Database models synced
✅ Server running on port 5000
🚀 API available at http://localhost:5000/api
```

**Terminal 2 - Start Frontend:**
```powershell
cd "d:\Janta App\finhealthtracker\frontend"
npm run dev
```

Expected output:
```
VITE v5.4.21 ready in ### ms
Local: http://localhost:3000/
```

**TEST IN BROWSER:**
- Open: http://localhost:3000
- You should see the login page
- Try registering or other features
- Check browser console (F12) - no errors should appear

---

### **STEP 2: Deploy Backend (5 minutes)**

Your app can't go online until backend is on internet. Use **Railway** (free tier).

#### A. Create Railway Account
1. Go to: https://railway.app/
2. Click **Sign Up**
3. Login with **GitHub** (recommended)
4. Authorize Railway

#### B. Deploy Backend
1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Choose: `jantaoad/Finhealthtracker`
4. Select **Root Directory:** `backend/`
5. Click **Deploy**
6. **Wait 2-3 minutes** for deployment

#### C. Get Your Backend URL
1. Go to **Deployments** tab
2. Look for **Public URL** (something like: `https://finhealthtracker-xxxx.railway.app`)
3. **Copy this URL** - you'll need it next

#### D. Test Backend is Live
Open in browser:
```
https://finhealthtracker-xxxx.railway.app/health
```

Should show:
```json
{"status":"ok","message":"FinHealthTracker API is running"}
```

---

### **STEP 3: Update Frontend & Redeploy to S3**

#### A. Update Backend URL

**Edit this file:**
```
d:\Janta App\finhealthtracker\frontend\.env.production
```

**Change this line:**
```
From: VITE_API_BASE_URL=http://localhost:5000/api
To:   VITE_API_BASE_URL=https://finhealthtracker-xxxx.railway.app/api
```

*(Replace `xxxx` with your actual Railway URL from Step 2C)*

#### B. Rebuild Frontend
```powershell
cd "d:\Janta App\finhealthtracker\frontend"
npm run build
```

Wait for: `✓ built in X.XXs`

#### C. Upload to S3
```powershell
cd "d:\Janta App\finhealthtracker\frontend\dist"
aws s3 sync . s3://finhealthtracker-janta-39776 --delete
```

---

## 🎉 Your App is Now LIVE!

### Frontend URL (Public)
```
http://finhealthtracker-janta-39776.s3-website-us-east-1.amazonaws.com
```

### Backend URL (Public)
```
https://finhealthtracker-xxxx.railway.app/api
```

**Both are now connected and working!** ✅

---

## 🔍 Testing Your Live App

1. Open: `http://finhealthtracker-janta-39776.s3-website-us-east-1.amazonaws.com`
2. Try to **Register** a new account
3. Try to **Login**
4. Try any feature (transactions, budgets, etc.)
5. Open browser console (F12) - check for errors

---

## 📊 What's Deployed

| Component | Location | URL |
|-----------|----------|-----|
| **Frontend** | AWS S3 | http://finhealthtracker-janta-39776.s3-website-us-east-1.amazonaws.com |
| **Backend** | Railway | https://finhealthtracker-xxxx.railway.app/api |
| **Database** | SQLite (on Railway) | Automatic |

---

## 💰 Costs

- **S3:** ~$1/month
- **Railway:** Free tier ($5/month credit, more than enough)
- **Total:** ~$1/month

---

## 🐛 Troubleshooting

### App loads but no data?
- Check browser console (F12) for API errors
- Verify Railway URL is correct in `.env.production`
- Rebuild frontend: `npm run build`

### Login doesn't work?
- Check backend is running on Railway
- Test: `https://finhealthtracker-xxxx.railway.app/health`
- Check browser console for network errors

### S3 page shows 404?
- Make sure all files in `dist/` were uploaded
- Command: `aws s3 ls s3://finhealthtracker-janta-39776`

---

## 📱 Share Your App

Once everything works:

**Share this URL with anyone:**
```
http://finhealthtracker-janta-39776.s3-website-us-east-1.amazonaws.com
```

They can access your app from anywhere in the world! 🌍

---

## ⚠️ Important: Clean Up Credentials

Remember to **delete/regenerate** AWS credentials you provided:
1. Go to: https://console.aws.amazon.com/iam/
2. Find Access Key: `AKIAX4ZRGHF2GG4M646T`
3. Click **Deactivate**
4. Create new one for future use

**Never commit credentials to GitHub!**

---

## 📞 Need Help?

Check:
- Browser console (F12) for errors
- Railway dashboard for backend logs
- S3 bucket permissions
- Backend URL in `.env.production` is correct

---

**Good luck! Your app will be live soon! 🚀**
