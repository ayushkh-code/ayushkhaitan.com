export const articles = [
  {
    slug: "agentic-ai-sop-eisenhower",
    title: "Plans Are Worthless, Planning Is Everything",
    description:
      "What Eisenhower understood about planning applies directly to modern S&OP, and agentic AI is about to change how we operationalize it.",
    date: "2026-06-15",
    content: `Dwight D. Eisenhower said it best. Plans are worthless, but planning is everything.

Every S&OP leader has lived this sentence without knowing they were quoting or at the very least embodying the words of a five-star general.

The weekly/monthly plan you build is obsolete the moment demand shifts, a Suez canal bottleneck occurs, or as new tariffs get announced via a formalized 140 character social media message. I have watched carefully built production plans unravel in a single week because of one upstream disruption. The plan itself rarely survives contact with reality.

But then, planning isn't futile. It opens up the "what-if" dialogue. It creates scenarios to minimize the amount of time spent in reactive discussions. What if Forecast WAPE was 500 bps above tolerance limits due to demand not materializing, or a large inbound shipment arrived early which led to a yard gridlock. That muscle memory is what lets a team react in hours instead of weeks when the real disruption shows up.

Here's where Agentic AI comes in. Agentic AI models are as good as we train them and find use cases for. The math already exists and has been done and redone multiple times. This is now data that we can utilize to feed Agentic AI models to model out the outcomes of multivariate changes, as opposed to changing inputs on Excel and running crude sensitivity models.

The plan is still worthless if these variables change unless we think through the what-if scenarios. Winning the planning game boils down to our ability to ingest history, identify the scenarios where "quick napkin math" was needed, and to operationalize them into Agentic models. The opportunity cost of leaders' time is the resource that becomes relevant here. Is it better served in repeating permutations of this crude modeling? I think not.

The true value lies in taking pause to (i) have a very high bar for avoiding the avoidable models and scenario testing reactively, and (ii) utilizing this new-found time to actually drive strategy and execution. Move the needle where it counts.`,
  },
  {
    slug: "five-step-agentic-sop-fix",
    title: "Five Steps to Fix a Broken S&OP Process with Agentic AI",
    description:
      "A practical framework for using agentic AI to modernize stale demand planning cadences.",
    date: "2026-06-10",
    content: `So, how do you use agentic AI to fix a broken or stale S&OP process? Here's a five step strategy to change this.

A new AI model ships every few hours, but demand planning cadences still follow the same shell that was created years ago. It's time to adapt. Most S&OP processes are stale because they're built around WBRs and MBRs that follow the same format every week, and quarterly business reviews that take four weeks to prep and indefinite weeks to follow up on with ETAs that keep getting pushed out. Bridging already automated dashboard reports takes up more time than the actual fixes.

Agentic AI changes what a human is actually needed for in this process.

Step 1: Define variables. Topline error, WAPE at each business unit and region grain (plan vs actuals), and week-to-week variance in actuals.

Step 2: Define guardrails based on absolute deviation (units, revenue, etc), percentage points for each relevant grain (200 bps in either direction, for example), and variation over a time period (YoY or WtW variation beyond 5%).

Step 3: Automate all the "reading the news" actions and auto publish to key leaders and owners. This should replace or supplement the 50 page decks that exist today but never get actioned.

Step 4: Triage 80% of root causing to AI. Most root causing and bridge building is repeatable, like simulation inputs being off, demand forecasts being miscalibrated, or execution missing its target. These can be linked to an indicator metric to build waterfall logic. The remaining 20% of cases shouldn't all go to humans either. Only triage manually if they move the needle defined in step 2.

Step 5: Reinforcement learning. AI is only as good as the feedback we give it. Allocate two weeks to proof test this approach and move to production in three weeks with a generous feedback system to tighten guardrails, communication preferences, and most importantly, cut information that is not actionable. Noise information is a waste of resources, both to generate as well as in camouflaging the relevant information.

The planner's job moves from finding the problem to deciding what to do about it. Move the needle instead of talking about the needle.`,
  },
  {
    slug: "willy-wonka-supply-chain",
    title: "Inside Willy Wonka's Supply Chain",
    description:
      "A look at the Golden Ticket announcement as a high volume demand event, and what it would take to actually plan for it.",
    date: "2026-06-15",
    content: `I was recently rewatching Charlie and the Chocolate Factory.

Call it an unintended side effect of being in Operations for too long, but I found myself thinking from an operations perspective on what it would take this Chocolatier/CEO to pull off a successful high volume event (HVE) from a Golden Ticket announcement.

From a business perspective, Wonka had just announced a global event that would fundamentally change consumer behavior. People were no longer buying chocolate simply because they wanted chocolate. Every bar now carried the possibility of something more valuable.

Problem statement: How do you prepare a supply chain for a demand event with no historical precedent while balancing growth, customer experience, working capital, and spoilage risk?

This was the first HVE of its kind, with no historical demand signal to anchor against. Willy Wonka (I'll call him WW to maintain the gravitas of this post) would need to plan for materials, labor, spoilage, working capital, and distribution capacity, all while maintaining customer experience and product quality.

There are dozens of dimensions a planning team would need to consider, but I kept coming back to three that would likely be the focus of every executive review.

1) Production

The strategic decision becomes how much additional capacity should be committed before there was any evidence of actual demand. Do we undertake fixed cost or mechanical adjustments to scale up capacity for a seasonal event? If this has potential for incremental long-term free cash flow from the new customers, accounting for how many of the new customers stick around to try a WW bar, then maybe. If not, we flex up using more flexible levers. This decision will depend on risk appetite to deploy capex.

Now, once the capacity math is accounted for, we'll need to account for how much quantity to actually produce for. Producing too aggressively would require securing additional raw materials, expanding labor capacity, and tying up cash in inventory that might never be sold. Producing too conservatively would increase the likelihood of stockouts during the exact period when consumer excitement was highest.

Add on a layer of complexity that chocolate is perishable from natural expiry as well as from weather exposure. Every incremental unit produced ahead of demand begins accumulating age, storage costs, and spoilage risk. The same inventory that protects service levels during a demand surge can become a liability if demand falls short of expectations.

2) Distribution

Production is only useful if product is sitting in the right place at the right time. Distribution will need to be optimized based on which regions have strategic value, such as low penetration markets, which regions currently account for the largest share of demand, and which regions, while not accounting for the largest baseline demand, account for the largest price sensitivity and therefore the most incremental demand opportunity. Some regions would inevitably react more strongly than others, but there was no historical precedent to indicate where those spikes would occur. Inventory positioned too aggressively would create pockets of excess stock. Inventory positioned too conservatively would leave empty shelves in the very markets where excitement was highest. By the time demand became visible, much of the opportunity would already be gone.

3) Risk appetite and sensitivity

Forecasting is most effective when the future resembles the past. WW had deliberately created a demand driver that had never existed before. At some point, the discussion would stop being about forecast accuracy and start becoming a conversation about uncertainty. How much working capital is the business willing to commit? How much downside inventory exposure was acceptable? How much operational flexibility was worth paying for? To add to these, a dynamic scenario analysis of how operations will adapt with every subsequent ticket being discovered will be key, for example what happens if the first ticket is discovered with only 80% of the expected demand being met. Scenario modeling will be key here, and a playbook to accompany this will be crucial. If X happens, how do we react, and what will be the decision tree of each scenario. The goal is to cut reaction time to the minimum. Long before the first Golden Ticket was discovered, those decisions will already have been made. Everything else becomes execution and following the playbook once the promotion is announced.

This is a simplified version of a very comprehensive strategy which will require planning at a SKU level, evaluating demand spikes and drops to reduce "peakiness" and impact to the supply chain, and optimizing for cost structure to make this growth sustainable. Somewhere beneath the chocolate rivers and edible fountains sits a surprisingly complex supply chain problem. I'll wait for Warner Bros. Entertainment for a more business oriented sequel. I'd watch that.`,
  },
];

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}

export function formatArticleDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getSortedArticles() {
  return [...articles].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
}
