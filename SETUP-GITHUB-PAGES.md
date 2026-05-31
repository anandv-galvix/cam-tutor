# How to Publish Your Site on GitHub Pages

Follow these steps once. After that, every time you add files and push, the site updates automatically.

---

## Step 1 — Push all files to GitHub

Open Terminal and run these commands one by one:

```bash
cd ~/Documents/Claude/Cam\ Tutor/cam-tutor-git

git init
git remote add origin https://github.com/anandv-galvix/cam-tutor.git
git add .
git commit -m "Add Cambridge Grade 4 Tutor website"
git branch -M main
git push -u origin main
```

> If it asks for a password, use a GitHub **Personal Access Token** (not your password).
> Create one at: https://github.com/settings/tokens → "Generate new token (classic)" → tick `repo` scope.

---

## Step 2 — Enable GitHub Pages

1. Go to https://github.com/anandv-galvix/cam-tutor
2. Click **Settings** (top tabs)
3. In the left sidebar → click **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Choose branch: **main** / folder: **/ (root)**
6. Click **Save**

Wait ~1 minute. Your site will be live at:

**https://anandv-galvix.github.io/cam-tutor/**

---

## Step 3 — Adding new lessons in future

Each time you create a new HTML or PDF file:

```bash
cd ~/Documents/Claude/Cam\ Tutor/cam-tutor-git

git add .
git commit -m "Add new lesson"
git push
```

The website updates automatically within ~1 minute.

---

## ⚠️ Note on large PDF files

GitHub works best with files under 50 MB.
- `Maths g4.pdf` is ~64 MB — it may push fine but could be slow to load.
- If you get an error, consider compressing the PDF first (use https://smallpdf.com).

---

Your live site URL: **https://anandv-galvix.github.io/cam-tutor/**
