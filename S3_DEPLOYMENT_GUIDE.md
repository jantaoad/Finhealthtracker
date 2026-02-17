# S3 Deployment Guide - FinHealthTracker

Your frontend is now built and ready to deploy to AWS S3! 🚀

## 📦 What's Ready

- **Build Location:** `frontend/dist/`
- **Files:** 
  - `index.html` (main app)
  - `assets/index-*.css` (styles)
  - `assets/index-*.js` (React app)

---

## 🔧 Step-by-Step S3 Deployment

### Step 1: Create S3 Bucket

1. Go to **AWS Console** → **S3**
2. Click **Create bucket**
3. **Bucket name:** `finhealthtracker-app-prod` (or any unique name)
4. **Region:** us-east-1
5. **Uncheck** "Block all public access" (we want public access)
6. Click **Create bucket**

---

### Step 2: Enable Static Website Hosting

1. Select your bucket
2. Go to **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. **Enable:** ✅ Static website hosting
6. **Hosting type:** Host a static website
7. **Index document:** `index.html`
8. **Error document:** `index.html` (important for SPA routing)
9. Click **Save**

---

### Step 3: Bucket Policy (Make Public)

1. Go to **Permissions** tab
2. Click **Bucket policy** → **Edit**
3. Paste this policy (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

4. Click **Save**

---

### Step 4: Upload Files to S3

**Option A: Using AWS Console (Easy)**

1. Go to your bucket
2. Click **Upload**
3. Add files:
   - Drag & drop entire `frontend/dist/` folder contents OR
   - Select all files from `dist/` folder
4. Click **Upload**
5. Wait for completion ✅

**Option B: Using AWS CLI (Faster)**

```powershell
# Install AWS CLI (if not already installed)
# https://aws.amazon.com/cli/

# Configure AWS CLI with your credentials
aws configure

# Upload to S3
cd "d:\Janta App\finhealthtracker\frontend\dist"
aws s3 sync . s3://YOUR-BUCKET-NAME/

# Example:
# aws s3 sync . s3://finhealthtracker-app-prod/
```

---

### Step 5: Get Your Website URL

1. Go to **Properties** tab
2. Scroll to **Static website hosting**
3. Copy the **Bucket website endpoint**

**Example URL:**
```
http://finhealthtracker-app-prod.s3-website-us-east-1.amazonaws.com
```

---

## 🔗 Configure Backend API URL

Your frontend needs to know where the backend is!

**Current Backend URL in Use:**
- Production: `https://finhealthtracker-backend.onrender.com/api`
- Or your App Runner URL: `https://YOUR-APP-RUNNER-URL/api`

### To Change Backend URL:

1. Edit `frontend/.env.production`:
```
VITE_API_BASE_URL=https://YOUR-BACKEND-URL/api
```

2. Rebuild:
```powershell
cd "d:\Janta App\finhealthtracker\frontend"
npm run build
```

3. Upload new `dist/` folder to S3 (replace files)

---

## ✅ Testing Your App

1. Open your S3 URL in browser
2. You should see the FinHealthTracker login page
3. Try to register/login
4. Check browser console (F12) for any API errors

---

## 🎯 Final S3 URL

Once deployed, your app will be live at:

```
http://finhealthtracker-app-prod.s3-website-us-east-1.amazonaws.com
```

(Replace bucket name with yours)

---

## 📊 Cost Estimate

- S3 Storage: ~$5/month (for your app files)
- Data Transfer: ~$1-5/month (depending on usage)
- **Total:** ~$6-10/month

---

## 🚀 Advanced: CloudFront CDN (Optional)

For faster global access:

1. Create **CloudFront Distribution**
2. Set S3 bucket as origin
3. Set default root object to `index.html`
4. Get CloudFront domain (much faster!)

---

## ❓ Troubleshooting

**App shows 404 errors?**
- Make sure Error document is set to `index.html`
- SPA routing requires this!

**API calls failing?**
- Check CORS in backend
- Verify API URL in `.env.production`
- Check browser console (F12) for errors

**Images/styles not loading?**
- Clear browser cache
- Check file paths are correct
- Verify all files uploaded to S3

---

## 📝 Next Steps

1. ✅ Upload `dist/` files to S3
2. ✅ Access your S3 URL from browser
3. ✅ Test login/transactions/features
4. ✅ Share URL with team!

**Your FinHealthTracker app will be live! 🎉**
