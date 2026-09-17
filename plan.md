Viewed plan.md:1-128

Connecting your **GoDaddy domain** to your new React website can be done in two ways depending on what you purchased on GoDaddy:

---

### Option 1: You bought only the Domain on GoDaddy (Recommended & Free Hosting)

Deploy your React app on **Vercel** or **Netlify** (free, fast global CDN, automatic SSL certificate), and point your GoDaddy domain to it.

#### Step 1: Deploy to Vercel (or Netlify)
1. Push your project to **GitHub** (or run `npx vercel` directly in your terminal).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `Vittiya-Salakhaar` repository.
4. Framework preset will automatically detect **Vite**. Click **"Deploy"**.
5. Once deployed, go to **Project Settings → Domains**.
6. Enter your GoDaddy domain name (e.g., `vittiyasalakhaar.com` and `www.vittiyasalakhaar.com`).
7. Vercel will show you the exact DNS records to add.

#### Step 2: Add DNS Records in GoDaddy
1. Log in to [GoDaddy](https://www.godaddy.com/) and go to **My Account → Manage Domains**.
2. Click on your domain name, then scroll down to **Manage DNS** (or **DNS Records**).
3. Update or add these two records:
   - **Record 1 (Apex Domain)**:
     - **Type**: `A`
     - **Name**: `@`
     - **Value**: `76.76.21.21`
     - **TTL**: `1 Hour` (or Default)
   - **Record 2 (Subdomain `www`)**:
     - **Type**: `CNAME`
     - **Name**: `www`
     - **Value**: `cname.vercel-dns.com`
     - **TTL**: `1 Hour`
4. Save the records. Your website will be live with free SSL (`https://`) within 10 to 30 minutes!

---

### Option 2: You bought GoDaddy Web Hosting / cPanel

If you have an active Linux / cPanel hosting plan on GoDaddy:

#### Step 1: Build your React App
In your terminal, run:
```bash
cmd.exe /c "npm run build"
```
This will generate an optimized production folder called **`dist/`** containing `index.html`, `assets/`, etc.

#### Step 2: Add `.htaccess` for Client-Side Routing
Create a file named `.htaccess` inside the `dist` folder (or in your public folder) so that page refreshing doesn't cause a 404 error:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Step 3: Upload files to GoDaddy cPanel
1. Log in to **GoDaddy → My Products → Web Hosting → Manage → cPanel Admin**.
2. Open **File Manager**.
3. Navigate to **`public_html`**.
4. Click **Upload** and upload all files from inside your local **`dist/`** folder (make sure `index.html` is directly inside `public_html`).
5. Your domain will now serve the React website directly from GoDaddy.

---

### Which option do you have?
- **Only the domain name registered on GoDaddy?** Follow **Option 1** (Vercel).
- **Domain + Web Hosting (cPanel) on GoDaddy?** Follow **Option 2**.

If you'd like assistance deploying to GitHub, Vercel, or preparing the `.htaccess` file for cPanel, let me know!

## Verification Plan

### Automated / Browser Verification
- Load the web app in the browser using the `browser_subagent` to visually test and verify:
  1. Home page rendering, hero card charts, navigation to all 5 pages.
  2. Services page: Check all 6 service sections, deliverables, audience cards, and 5-step workflow.
  3. Financial Tools page: Test SIP calculator, Income Tax calculator, EMI calculator, and GST calculator calculations and interactive sliders.
  4. Test Financial Health Check quiz: answer questions, calculate score, verify recommendation output.
  5. Learn page: Test category filtering, article modal reader, dictionary search.
  6. About & Pricing page: Test pricing cards, contact form submission, and consultation booking modal.
  7. Mobile responsive layout and hamburger menu test.
