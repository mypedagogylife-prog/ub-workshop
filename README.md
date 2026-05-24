# Upward Bound Virtual Workshop — Deployment Guide

This is a self-guided, AI-powered workshop app for Upward Bound students.
Students open one URL in any browser and complete all 3 days independently.
No Zoom facilitation required. The AI coach responds personally to every submission.

---

## What's in this folder

```
ub-workshop/
├── index.html              ← The student-facing workshop app
├── netlify.toml            ← Tells Netlify how to build and route
├── netlify/
│   └── functions/
│       └── chat.js         ← Secure AI proxy (hides your API key)
└── README.md               ← This file
```

---

## Deploy in 5 steps (no coding required)

### Step 1 — Get a free Netlify account
Go to https://netlify.com and sign up with your email or Google account.

### Step 2 — Get an Anthropic API key
1. Go to https://console.anthropic.com
2. Sign up or log in
3. Click **API Keys** in the left sidebar
4. Click **Create Key**, name it "Upward Bound Workshop"
5. Copy the key — it starts with `sk-ant-...`
6. Keep it safe — you won't see it again

> **Cost note:** The workshop uses Claude Haiku, the most affordable model.
> At typical usage (30–50 students, each completing all 3 days, ~15 AI responses each),
> total API cost will be approximately **$2–5 for the entire cohort**.

### Step 3 — Deploy to Netlify

**Option A — Drag and drop (easiest)**
1. Zip the entire `ub-workshop` folder
2. Go to https://app.netlify.com
3. Click **Add new site → Deploy manually**
4. Drag and drop your zip file onto the upload area
5. Wait ~30 seconds for deployment

**Option B — GitHub (recommended for ongoing updates)**
1. Create a free GitHub account at https://github.com
2. Create a new repository called `ub-workshop`
3. Upload all files from this folder to the repository
4. In Netlify: **Add new site → Import an existing project → GitHub**
5. Select your repository and click **Deploy**

### Step 4 — Add your API key (the most important step)
1. In Netlify, go to your site dashboard
2. Click **Site configuration → Environment variables**
3. Click **Add a variable**
4. Key: `ANTHROPIC_API_KEY`
5. Value: paste your key from Step 2
6. Click **Save**
7. Go to **Deploys** and click **Trigger deploy → Deploy site**

### Step 5 — Share with students
1. Your site will have a URL like `https://funky-name-123.netlify.app`
2. Optional: click **Domain management** to set a custom name like `https://ub-workshop-2025.netlify.app`
3. Share that URL with students — they open it in any browser and go

---

## Customizing the workshop

### Change the headline (Day 1 Current Events)
Open `index.html` and search for `"Scientists confirm the ocean"` — replace with any headline you want.

### Add your program name or logo
At the top of `index.html`, find:
```html
<div class="logo">Upward Bound <span>Virtual Week 1</span></div>
```
Change "Upward Bound" to your program name, or add an `<img>` tag for your logo.

### Change the budget scenario (Day 3)
Search for `Medical Office Receptionist` in `index.html` and update the job, city, salary, and life event to match any of the 6 scenario cards from the facilitator package.

### Update in-person courses (Day 1 preview)
Search for `English &nbsp;·&nbsp; Upper Level Math` and update the course list to match your actual offerings.

---

## Monitoring usage

In Netlify, click **Functions** to see how many AI requests are being made.
In your Anthropic console at https://console.anthropic.com, you can see token usage and costs in real time.

---

## Troubleshooting

**"Could not reach the AI coach"**
→ Check that your `ANTHROPIC_API_KEY` environment variable is set correctly in Netlify.
→ Trigger a fresh deploy after adding the variable.

**Students see a blank page**
→ Make sure the `index.html` file is at the root of the uploaded folder, not inside a subfolder.

**Function times out**
→ This is rare. Have the student click the button again — it will retry.

---

## Security notes

- Your API key is **never exposed** to students. It lives only in Netlify's environment variables.
- The `chat.js` function validates all inputs and enforces length limits before passing anything to the AI.
- The function only accepts POST requests from the workshop page — other request types are rejected.

---

## Support

For Netlify questions: https://docs.netlify.com
For Anthropic API questions: https://docs.anthropic.com
For workshop content questions: refer to the Facilitator Guide document.
