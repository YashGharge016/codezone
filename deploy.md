# 🚀 Deploy to Vercel - Step by Step

## Prerequisites
- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))

## Step 1: Push to GitHub
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Ready for Vercel deployment"

# Add your GitHub remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the configuration
5. Click "Deploy"

## Step 3: Test Your App
- Your app will be available at `https://your-project-name.vercel.app`
- Test the code execution functionality
- Try different programming languages

## ✅ What's Already Configured
- ✅ Vercel configuration (`vercel.json`)
- ✅ API routes (`/api/execute`)
- ✅ Frontend with all functionality
- ✅ Environment variable support
- ✅ CORS configuration
- ✅ Error handling

## 🔧 Optional: Environment Variables
In Vercel dashboard → Settings → Environment Variables:
- `JUDGE0_BASE_URL`: Custom Judge0 endpoint
- `RAPIDAPI_KEY`: For RapidAPI Judge0

## 🎉 You're Done!
Your online compiler is now live and working on Vercel!
