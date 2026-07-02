export const jobSearchPrompts = [
  {
    slug: "identifying-job-matches",
    title: "Identifying Job Matches",
    content:
      "My resume is attached. Search LinkedIn using Apify and return 20 jobs posted in the last 24 hours for Head of Operations, Director of Operations, or Director of S&OP (Sales and Operations Planning). Export the results to Excel.",
  },
  {
    slug: "job-search-cold-email-prompt",
    title: "Job Search Cold Email Prompt",
    description:
      "A Gmail-draft automation workflow for recruiter cold outreach, built to reduce repetitive manual work in an active job search.",
    githubLink: "https://github.com/ayushkh-code/job-search-cold-email-prompt",
    content: `I'm doing a job search and want you to find active job postings that match my target role, identify hiring managers, and create Gmail draft cold emails for each one.

My Background
[Describe yourself - e.g., "Former Amazon Principal (L7) with 14+ years across strategy, operations, supply chain, and finance. Most recently led planning for Amazon's 4.5B-unit North America network."]

Target Roles
Search for active postings at the following seniority levels:
- [e.g., Director, VP, Senior Director, Sr. Manager]

In these functions:
- [e.g., Supply Chain, Operations, Procurement, S&OP, Manufacturing]

Companies to Skip
Do not draft emails for any of these companies (already contacted):
- [List company names]

Search Instructions
1. Search for active job postings using site: searches on:
   - job-boards.greenhouse.io
   - jobs.lever.co
   - jobs.ashbyhq.com
   - boards.greenhouse.io

2. For every URL you find, verify it is still active before drafting:
   - Greenhouse: if the URL redirects to ?error=true, it is EXPIRED - skip it
   - Lever: fetch the URL; if it returns content with a job title, it is ACTIVE
   - Ashby: JS-rendered; if og:title meta tag has a job title, it is likely ACTIVE

3. For each confirmed active role, find the hiring manager - the person the role reports to, based on the job description's "reporting to" line. Search LinkedIn and the web for their name and LinkedIn profile URL.

Email Template
Use this exact HTML template for every draft:

<p>Hi [HM First Name].</p>
<p>The [Role Title] <a href="[JOB_POSTING_URL]">role</a> at [Company] looks closely aligned with my background. [One sentence summary of your background]. Would love to connect. I've attached my resume for your reference.</p>
<p>Regards,<br>[Your Name]<br>Ph: [Your Phone]<br>Email: <a href="mailto:[Your Email]">[Your Email]</a></p>

Rules:
- Hyperlink the word "role" in the body to the actual job posting URL
- Subject line format: [Company] [Role Title] Role
- No em dashes anywhere (including subject lines)
- No "Not X but Y" phrasing
- Always mention resume is attached
- Always greet with "Hi [First Name]." (period, not comma)

Gmail Draft Settings
- TO field: [your-email@gmail.com] (placeholder - you will manually replace with HM email)
- Create one draft per role
- Never send - only create drafts

Deliverables
After all drafts are created, provide a list of all hiring managers sorted alphabetically by last name, formatted as:

1. **[First Last]** ([Company], [HM Title]) - [LinkedIn URL]
2. ...`,
  },
  {
    slug: "auto-apply-to-jobs",
    title: "Auto-apply to jobs",
    content: `AUTOMATED JOB APPLICATION ASSISTANT

I want you to search for open job postings on Greenhouse (job-boards.greenhouse.io) that match my target roles, then fill out the application forms for me. Here's everything you need:

MY PROFILE:
- First Name: [FIRST]
- Last Name: [LAST]
- Email: [EMAIL]
- Phone: [PHONE]
- Address: [CITY, STATE ZIP]
- LinkedIn: [LINKEDIN URL]
- Website: [WEBSITE URL]
- Education: [SCHOOL, DEGREE, YEARS]

EEO / COMPLIANCE ANSWERS:
- Legally authorized to work in US: Yes
- Requires visa sponsorship: [Yes/No] (visa type: [e.g. H-1B])
- Gender: [Male/Female/Decline]
- Race/Ethnicity: [Asian/White/Black/Hispanic/etc.]
- Hispanic/Latino: [Yes/No]
- Veteran status: Not a protected veteran
- Disability: No
- Willing to work in-office / relocate: Yes
- Referral source: None
- Export controls (ITAR/EAR): Select "None of the above" / "I am not a U.S. person" (if on work visa)

TARGET ROLES (search for these titles):
- Strategy & Operations (Manager / Director / VP)
- Chief of Staff
- Head of Growth / GM
- Business Operations (Director / VP)

SEARCH INSTRUCTIONS:
1. Search site:job-boards.greenhouse.io for open roles matching the target titles above. Prioritize roles at well-known companies, based in New York (or remote). Use multiple Google searches to find 10-15 active listings.
2. For each job found, navigate to the Greenhouse application URL and verify the job is still open (not expired - expired jobs redirect to job-boards.greenhouse.io/[company]?error=true).
3. Fill all form fields using my profile above.
4. For cover letter: skip if optional; leave blank.
5. Click "Quick Apply with MyGreenhouse" to attach resume (this requires Greenhouse to already be connected in your Chrome browser with your resume saved).
6. Leave each completed tab open for me to review and submit - do NOT click Submit.

TECHNICAL APPROACH (for Claude):
- Text fields: inject value via React native setter + dispatch input and change events
- React-select dropdowns: walk __reactFiber up from the input element to find memoizedProps.selectOption, call it with the option object
- Verify fills by checking document.querySelectorAll('[class*="singleValue"]') after each batch
- Checkboxes: use label.click()
- Resume: click the "Quick Apply with MyGreenhouse" button

SETUP REQUIRED BEFORE STARTING:
- Use the Claude desktop app (Cowork mode) with Claude-in-Chrome connected
- Log into Greenhouse in Chrome and save your resume/profile via MyGreenhouse so it auto-populates
- Have multiple browser tabs available

BATCH SIZE: Fill 10-15 applications per session, then pause so I can review and submit before context resets.

Feel free to swap in your own profile details. The technical instructions are for Claude specifically and don't need to be changed.`,
  },
];

export function getJobSearchPromptBySlug(slug) {
  return jobSearchPrompts.find((prompt) => prompt.slug === slug);
}
