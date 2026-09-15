/**
 * Digital products sold or listed on the site.
 * status: "live" | "coming-soon" | "placeholder"
 * link: checkout or landing URL when ready; null for placeholders
 */
export const productCategories = [
  {
    slug: "linkedin-outreach",
    title: "LinkedIn cold outreach",
    description:
      "Message sequences for opening conversations and staying in the thread.",
    products: [
      {
        slug: "cold-message",
        title: "Cold message",
        description:
          "Opening note for people you do not know yet. Placeholder for now.",
        status: "placeholder",
        price: null,
        link: null,
      },
      {
        slug: "follow-up",
        title: "Follow-up",
        description:
          "Second and third touches after a cold message. Placeholder for now.",
        status: "placeholder",
        price: null,
        link: null,
      },
    ],
  },
  {
    slug: "job-search",
    title: "Job search",
    description:
      "Prompts and workflows for fit, outreach, prep, and tracking.",
    products: [
      {
        slug: "search-runbook",
        title: "Search Runbook",
        description:
          "AI workflows for every stage of the search. Runs in your own AI account. One-time purchase.",
        status: "live",
        price: "$14.99 – $39",
        link: "https://ai-job-search-toolkit-ten.vercel.app",
      },
      {
        slug: "resume-tailoring",
        title: "Resume tailoring pack",
        description:
          "Role-specific resume and cover letter prompts. Placeholder for now.",
        status: "placeholder",
        price: null,
        link: null,
      },
      {
        slug: "interview-prep",
        title: "Interview prep briefs",
        description:
          "Company and role briefs before interviews. Placeholder for now.",
        status: "placeholder",
        price: null,
        link: null,
      },
    ],
  },
  {
    slug: "writing-ops",
    title: "Writing and ops",
    description: "Templates and workflows for operators who write for work.",
    products: [
      {
        slug: "exec-update",
        title: "Executive update template",
        description:
          "Weekly or monthly update format for leadership. Placeholder for now.",
        status: "placeholder",
        price: null,
        link: null,
      },
      {
        slug: "decision-memo",
        title: "Decision memo pack",
        description:
          "Short memo structure for recommending a call. Placeholder for now.",
        status: "placeholder",
        price: null,
        link: null,
      },
    ],
  },
];

export function getLiveProducts() {
  return productCategories.flatMap((category) =>
    category.products
      .filter((product) => product.status === "live")
      .map((product) => ({ ...product, category }))
  );
}
