import instagramAutoposterMarkdown from "../content/instagram-autoposter-prompt.md?raw";

const promptBody = (markdown) => markdown.split(/\r?\n---\r?\n/).slice(1).join("\n---\n").trim();

export const agentSkills = [
  {
    slug: "instagram-autoposter",
    title: "Instagram Autoposter",
    summary:
      "Helps people use AI agents to automate an Instagram account to create and auto-post daily.",
    description:
      "Use AI agents to automate an Instagram account that creates and auto-posts a branded card every day. Paste into a new Claude chat and fill in the account brief first.",
    content: promptBody(instagramAutoposterMarkdown),
  },
];
