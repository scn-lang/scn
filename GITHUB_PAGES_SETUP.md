# 🚀 GitHub Pages Setup - Step by Step

## 📋 Pre-Deployment Checklist

### 1. **Update astro.config.mjs**
Replace the placeholders in `astro.config.mjs`:

```javascript
// BEFORE (current)
site: 'https://USERNAME.github.io',
base: '/REPOSITORY-NAME',

// AFTER (your actual values)
site: 'https://yourusername.github.io',
base: '/your-repo-name',
```

**Example:**
If your GitHub username is `johndoe` and repository is `scn-website`:
```javascript
site: 'https://johndoe.github.io',
base: '/scn-website',
```

### 2. **Update All Internal Links**
The current links are set for `/scn/` base path. If your repository name is different, update these files:

**Files to check if repository name ≠ "scn":**
- `src/pages/index.astro` - navigation links
- `src/pages/docs.astro` - navigation links  
- `src/components/Hero.astro` - CTA buttons
- `src/components/CTA.astro` - footer links

**Find and replace:**
- `/scn/` → `/your-repo-name/`

## 🚀 Deployment Steps

### Step 1: Configure Repository
```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit changes
git commit -m "Initial commit - SCN website ready for GitHub Pages"

# 4. Add remote origin (replace with your repository URL)
git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git

# 5. Push to GitHub
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### Step 3: Monitor Deployment
1. Go to **Actions** tab in your repository
2. Watch the "Deploy to GitHub Pages" workflow
3. First deployment takes ~5-10 minutes
4. Your site will be live at: `https://USERNAME.github.io/REPOSITORY-NAME/`

## 🔧 Quick Configuration Examples

### Example 1: Repository named "scn"
```javascript
// astro.config.mjs
site: 'https://johndoe.github.io',
base: '/scn',
```
**Site URL:** `https://johndoe.github.io/scn/`
**No link updates needed** ✅

### Example 2: Repository named "scn-website"
```javascript
// astro.config.mjs
site: 'https://johndoe.github.io',
base: '/scn-website',
```
**Site URL:** `https://johndoe.github.io/scn-website/`
**Need to update links:** `/scn/` → `/scn-website/`

### Example 3: Custom domain
```javascript
// astro.config.mjs
site: 'https://yourdomain.com',
base: '/',
```
**Site URL:** `https://yourdomain.com/`
**Need to update links:** `/scn/` → `/`
**Add CNAME file:** `echo "yourdomain.com" > public/CNAME`

## 🛠️ Automated Workflow Features

The `.github/workflows/deploy.yml` provides:
- ✅ **Auto-deployment** on every push to main
- ✅ **Node.js 18** with npm caching
- ✅ **Optimized builds** with Astro
- ✅ **Proper permissions** for GitHub Pages
- ✅ **Manual trigger** option

## 🔍 Troubleshooting

### Common Issues & Solutions

**❌ 404 on navigation:**
```bash
# Check base path matches repository name
# Update astro.config.mjs and internal links
```

**❌ Build fails:**
```bash
# Check Actions tab for errors
# Ensure package.json has all dependencies
npm install
npm run build  # Test locally first
```

**❌ Assets not loading:**
```bash
# Verify site and base configuration
# Check browser developer tools for 404s
```

**❌ Workflow not running:**
```bash
# Ensure .github/workflows/deploy.yml exists
# Check repository Settings > Pages > Source = "GitHub Actions"
```

## ✅ Final Verification

After deployment, test:
- [ ] Home page loads correctly
- [ ] Navigation between pages works
- [ ] Mobile menu functions properly
- [ ] All images and assets load
- [ ] External links (GitHub) work
- [ ] Anchor links scroll correctly

## 🎉 You're Live!

Once configured, your professional SCN website will be automatically deployed and updated with every code change!