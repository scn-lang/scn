# 🚀 GitHub Pages Deployment Guide

## Quick Setup Instructions

### 1. **Update Astro Configuration**
Edit `astro.config.mjs` and replace the placeholders:

```javascript
export default defineConfig({
  integrations: [tailwind(), react()],
  site: 'https://YOUR-USERNAME.github.io',
  base: '/YOUR-REPOSITORY-NAME',
  output: 'static'
});
```

**Replace:**
- `YOUR-USERNAME` with your GitHub username
- `YOUR-REPOSITORY-NAME` with your repository name

### 2. **Push to GitHub**
```bash
git add .
git commit -m "Add GitHub Pages deployment configuration"
git push origin main
```

### 3. **Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The deployment will start automatically

### 4. **Access Your Site**
Your site will be available at:
```
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

## 📁 Files Added for Deployment

### `.github/workflows/deploy.yml`
- Automated deployment workflow
- Builds and deploys on every push to main/master
- Uses Node.js 18 and npm
- Optimized for Astro static sites

### Updated `astro.config.mjs`
- Added `site` configuration for proper URL generation
- Set `output: 'static'` for GitHub Pages compatibility
- Configured `base` path for repository deployment

## 🔧 Configuration Details

### Workflow Features
- ✅ **Automatic Deployment**: Deploys on every push to main branch
- ✅ **Manual Trigger**: Can be run manually from GitHub Actions tab
- ✅ **Optimized Build**: Uses npm cache for faster builds
- ✅ **Security**: Proper permissions and concurrency handling

### Astro Configuration
- ✅ **Static Output**: Perfect for GitHub Pages
- ✅ **Proper Base Path**: All links work correctly
- ✅ **Site URL**: Enables absolute URL generation

## 🚨 Important Notes

### Repository Settings
1. **Branch**: Make sure you're pushing to `main` or `master` branch
2. **Pages Source**: Must be set to "GitHub Actions" (not "Deploy from branch")
3. **Repository Name**: Must match the `base` path in astro.config.mjs

### First Deployment
- First deployment may take 5-10 minutes
- Subsequent deployments are typically faster (2-3 minutes)
- Check the **Actions** tab to monitor deployment progress

### Custom Domain (Optional)
If you want to use a custom domain:
1. Add a `CNAME` file to the `public/` directory
2. Update the `site` configuration in astro.config.mjs
3. Configure DNS settings with your domain provider

## 🔍 Troubleshooting

### Common Issues

**404 Errors on Navigation:**
- Ensure `base` path in astro.config.mjs matches your repository name
- Check that all internal links use the correct base path

**Build Failures:**
- Check the Actions tab for detailed error logs
- Ensure all dependencies are listed in package.json
- Verify Node.js version compatibility

**Assets Not Loading:**
- Confirm `site` and `base` configurations are correct
- Check that asset paths are relative or use proper base path

### Deployment Status
Monitor deployment at:
```
https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME/actions
```

## ✅ Deployment Checklist

Before deploying:
- [ ] Updated `astro.config.mjs` with correct username and repository name
- [ ] Committed and pushed all changes to main branch
- [ ] Enabled GitHub Pages with "GitHub Actions" source
- [ ] Verified build passes locally with `npm run build`

After deployment:
- [ ] Check site loads at the GitHub Pages URL
- [ ] Test navigation between pages
- [ ] Verify mobile responsiveness
- [ ] Confirm all links and assets work correctly

## 🎉 You're Ready!

Your SCN website is now configured for automatic GitHub Pages deployment. Every time you push changes to the main branch, your site will automatically update!