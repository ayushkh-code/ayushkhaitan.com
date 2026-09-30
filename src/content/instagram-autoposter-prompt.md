# Prompt: Build a Fully Automated Instagram Posting Account

Copy everything below the line into a new Claude chat. Fill in the bracketed fields in the "Account brief" section first.

---

I want you to build an end to end automated Instagram account that posts a branded image card with text every day, with no manual work after setup. Do as much of the setup as possible yourself using my Chrome browser (I am signed in to Facebook, Instagram and GitHub there). Only hand steps to me when they involve passwords, secret keys, OAuth approval popups, or public account changes you are not allowed to make. When you hand me a step, open the exact page first and tell me exactly which box or button to use.

## Account brief

- Instagram handle: [@handle]
- Theme / niche: [e.g. funny jokes about life in Bangalore, one AI fact a day, daily stoic quote]
- Tone and rules: [e.g. witty, affectionate, clean, never punch at communities, religion, gender or real people]
- Language flavour: [e.g. English with a few Kannada words]
- Posting time: [e.g. 7:00 PM IST daily]
- Card design: [colours, header label, font feel, or "you choose"]
- Content source: [A] Claude API writes fresh content daily (needs a paid Anthropic API key, a few rupees a month) or [B] a pre written content bank you write now (free, no API key). Default to B unless I say otherwise.
- Bank size if B: [e.g. 90 posts]
- GitHub repo name: [e.g. handle-bot]

## Architecture to build

1. `post.py` (Python, Pillow, requests):
   - Picks the next unused item from `content.json` (option B) or calls the Claude API (option A), and skips anything already listed in `history.json`.
   - Renders a 1080x1350 JPEG card: accent bars top and bottom, a small header label, the setup text, a divider, the punchline text in the accent colour, and the handle at the bottom. Rotate 2 or 3 palettes. Use DejaVu fonts on the runner.
   - Writes `pending.json` (file name plus caption plus hashtags) in the render stage.
   - In `--publish` mode, posts to the Instagram Graph API: POST `/{ig_user_id}/media` with `image_url` and `caption`, poll the container until `status_code` is FINISHED, then POST `/{ig_user_id}/media_publish`. Append the result with its media_id to `history.json`.
   - Supports `DRY_RUN=1` for local testing.
2. `.github/workflows/daily.yml`:
   - `schedule` cron in UTC (IST minus 5:30, so 7 PM IST is `30 13 * * *`), plus `workflow_dispatch` for manual runs.
   - `permissions: contents: write`.
   - Steps: checkout, setup Python 3.12, install fonts-dejavu-core and requirements, render, commit and push `images/` and `pending.json` so the image gets a public raw.githubusercontent.com URL, sleep 20 seconds, publish, then commit history.
   - Env: `IG_USER_ID`, `IG_ACCESS_TOKEN` from secrets, `IG_API_HOST` defaulting to graph.facebook.com, and `IMAGE_BASE_URL` set to `https://raw.githubusercontent.com/${{ github.repository }}/${{ github.ref_name }}`.
3. `requirements.txt` (requests, Pillow), `README.md`, and `content.json`.
4. The repo must be **public** so Instagram can fetch the images.

Render a sample card locally and show it to me before publishing anything.

## Setup sequence (use this order; it avoids known dead ends)

**Step 1. Instagram account type (my step).** I switch the account to Creator or Business in the Instagram app.

**Step 2. Meta developer app (you).** At developers.facebook.com: create an app (or reuse one) with the use case "Manage messaging & content on Instagram".

**Step 3. Use the Facebook login route.** Skip "API setup with Instagram login". Its Instagram Tester invite often fails with "does not resolve to a valid user ID" for professional accounts. Instead:
- Create a Facebook Page named after the account at facebook.com/pages/create (you fill the name and category and click Create).
- I link it in the Instagram app: Edit profile > Page > Connect. If the spinner hangs, I force close the app and check again; it usually connected anyway.

**Step 4. App permissions (you).** In the app, open Use cases > Customize > "API setup with Facebook login" and click **"Add required content permissions"**. This one button adds instagram_basic, instagram_content_publish, pages_show_list, pages_read_engagement and business_management. The individual "Add" buttons on the Permissions page are unreliable with automation, so use this button.

**Step 5. Token (you, then me).** Open the Graph API Explorer at `developers.facebook.com/tools/explorer/?app_id=APP_ID`. In the "Add a Permission" box, type each of the five permissions and click its dropdown option. Click **Generate Access Token**. I approve the popup and select the Page and Instagram account.

**Step 6. Verify and get the IG user ID (you).** Run `me/accounts?fields=name,instagram_business_account{id,username}` in the Explorer and read the `instagram_business_account.id`.

**Step 7. Long lived token (you, then me).** Click the info icon on the token > "Open in Access Token Tool" > **Extend Access Token**. I re-enter my Facebook password. Confirm the "new long-lived access token will expire on..." heading, and tell me that date. Keep that tab open.

**Step 8. GitHub repo (you).** Create the public repo at github.com/new using form fill (plain typing into GitHub inputs can silently fail). Upload files by injecting File objects into the upload page's file input with JavaScript (DataTransfer). Put the workflow file directly into `.github/workflows` via the upload URL `/upload/main/.github/workflows`. After attaching files, wait about 8 seconds, scroll to the Commit changes button, click it, and then confirm the new commit appears on the commits page. Earlier attempts failed silently when Commit was clicked too early.

**Step 9. Secrets.** You add `IG_USER_ID` yourself (it is only an ID). For `IG_ACCESS_TOKEN` (and `ANTHROPIC_API_KEY` if option A), open the New secret page, fill the Name box yourself, then stop and let me paste the value into the Secret box and click Add secret. Do not reload or navigate that tab until I confirm, or my paste is lost. Then check that the secrets list shows all names.

**Step 10. First run (you).** Actions tab > the workflow > Run workflow. Wait about a minute, open the run, and if it fails, read the failing step's log and fix it. Confirm success by reading `history.json` from raw.githubusercontent.com and checking it contains a media_id.

## Rules for you

- Never ask me to paste tokens, passwords or API keys into chat.
- Write content that punches at situations, never at groups of people or real individuals.
- Keep me informed with short updates; batch browser actions when possible.
- If a Meta or GitHub button does not respond after 2 tries, try an alternative route (a combined button, a different page, JavaScript) before handing it to me.

## Finish with

- A confirmation that the first post is live, with the joke or text that was posted.
- The posting schedule, the token expiry date (set a reminder about a week before it), and when the content bank runs out.
- How to edit content: edit `content.json` in the repo.
