# Deployment Guide - Netlify

## Prerequisites

- GitHub account with repository pushed
- Netlify account (free tier is sufficient)
- GitHub Personal Access Token

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure all files are committed and pushed to GitHub:

```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

### 2. Create Netlify Account

1. Go to [https://netlify.com](https://netlify.com)
2. Sign up with GitHub (recommended for easier integration)
3. Authorize Netlify to access your GitHub repositories

### 3. Import Your Project

1. From Netlify dashboard, click **"Add new site"**
2. Select **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select the **Mayen** repository from the list
5. Netlify will automatically detect the build settings from `netlify.toml`

### 4. Configure Build Settings

Verify these settings (should be auto-detected):

- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18`

### 5. Add Environment Variables

**CRITICAL STEP** - Your site won't work without these:

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add the following variables:

   | Key                    | Value                             |
   | ---------------------- | --------------------------------- |
   | `VITE_GITHUB_TOKEN`    | Your GitHub Personal Access Token |
   | `VITE_GITHUB_USERNAME` | `Mayen007`                        |

**Getting your GitHub Token:**

- Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
- Click "Generate new token (classic)"
- Give it a name: "Portfolio Website"
- Select scopes: `public_repo`, `read:user`
- Copy the token immediately (you won't see it again)

### 6. Deploy Your Site

1. Click **"Deploy site"**
2. Wait for the build to complete (usually 1-2 minutes)
3. Once deployed, you'll get a URL like: `https://random-name-123456.netlify.app`

### 7. Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the DNS configuration instructions
4. Netlify provides free HTTPS certificates automatically

### 8. Continuous Deployment

Your site is now set up for continuous deployment:

- Every push to `main` branch triggers a new deployment
- Pull requests create deploy previews
- Rollback to previous deployments anytime

## Troubleshooting

### Build Fails

**Check:**

- Node version is set to 18 in environment variables
- All dependencies are in `package.json`
- Build command is `npm run build`

### Site Loads but No GitHub Data

**Check:**

- Environment variables are set correctly
- GitHub token has required permissions
- Token hasn't expired

### 404 Errors on Routes

**Check:**

- `_redirects` file exists in public folder
- `netlify.toml` has redirect rules
- Publish directory is set to `dist`

## Performance Optimization

Netlify automatically provides:

- ✅ CDN distribution
- ✅ HTTPS/SSL certificates
- ✅ Asset compression
- ✅ Build caching
- ✅ Deploy previews

## Monitoring

Monitor your site:

- **Analytics**: Site settings → Analytics
- **Build logs**: Deploys → Click on any deploy
- **Function logs**: Functions tab (if using functions)

## Cost

Free tier includes:

- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites
- Deploy previews
- HTTPS

Perfect for portfolio sites!

## Next Steps

After deployment:

1. Test all functionality on live site
2. Set up custom domain
3. Add site to Google Search Console
4. Share your portfolio URL!

## Support

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://answers.netlify.com)
- [GitHub Issues](https://github.com/Mayen007/Mayen/issues)

---

**Your portfolio will be live at**: `https://your-site-name.netlify.app`

Good luck! 🚀
