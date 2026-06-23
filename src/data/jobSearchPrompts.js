export const jobSearchPrompts = [
  {
    slug: "identifying-job-matches",
    title: "Identifying Job Matches",
    content:
      "My resume is attached. Search LinkedIn using Apify and return 20 jobs posted in the last 24 hours for Head of Operations, Director of Operations, or Director of S&OP (Sales and Operations Planning). Export the results to Excel.",
  },
];

export function getJobSearchPromptBySlug(slug) {
  return jobSearchPrompts.find((prompt) => prompt.slug === slug);
}
