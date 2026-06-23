export const jobSearchPrompts = [
  {
    slug: "identifying-job-matches",
    title: "Identifying Job Matches",
    content:
      "My resume is attached. Search LinkedIn using Apify and return 20 jobs posted in the last 24 hours for Head of Operations, Director of Operations, or Director of S&OP (Sales and Operations Planning). Export the results to Excel.",
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
1. Search site:job-boards.greenhouse.io for open roles matching the target titles above. Prioritize roles at well-known companies, based in New York (or remote). Use multiple Google searches to find 10–15 active listings.
2. For each job found, navigate to the Greenhouse application URL and verify the job is still open (not expired — expired jobs redirect to job-boards.greenhouse.io/[company]?error=true).
3. Fill all form fields using my profile above.
4. For cover letter: skip if optional; leave blank.
5. Click "Quick Apply with MyGreenhouse" to attach resume (this requires Greenhouse to already be connected in your Chrome browser with your resume saved).
6. Leave each completed tab open for me to review and submit — do NOT click Submit.

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
