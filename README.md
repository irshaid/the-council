# The Council

> Bring a decision. Thirteen of the sharpest minds in business argue it out — then tell you what to do.

The Council is a set of **thinking lenses** — thirteen founders and operators distilled into how they actually reason and decide — plus an **orchestrator** that routes your question to the right ones. You don't get a bland, averaged answer. You get a scored shortlist of who's best suited to weigh in, each answering in their own voice, and an honest map of where they disagree.

---

## The advisors

| Advisor | Role | Sharpest on |
|---|---|---|
| **[Jeff Bezos](lenses/jeff-bezos.md)** | Founder, Amazon | deciding under uncertainty · reversible vs. irreversible calls |
| **[Alex Hormozi](lenses/alex-hormozi.md)** | Founder, Acquisition.com | offers · pricing · getting customers |
| **[Steve Jobs](lenses/steve-jobs.md)** | Co-founder, Apple | focus · taste · shipping · saying no |
| **[Naval Ravikant](lenses/naval-ravikant.md)** | Founder, AngelList | leverage · the solo builder · inner game |
| **[Demis Hassabis](lenses/demis-hassabis.md)** | CEO, Google DeepMind | long-horizon deep-tech · problem selection |
| **[Dario Amodei](lenses/dario-amodei.md)** | CEO, Anthropic | building a frontier company on a technical thesis |
| **[Sam Altman](lenses/sam-altman.md)** | CEO, OpenAI | network · capital · resourcefulness |
| **[Elon Musk](lenses/elon-musk.md)** | CEO, Tesla & SpaceX | first principles · execution velocity |
| **[Larry Fink](lenses/larry-fink.md)** | CEO, BlackRock | risk · capital allocation · institution building |
| **[Peter Thiel](lenses/peter-thiel.md)** | Co-founder, PayPal & Palantir | contrarian strategy · monopoly |
| **[Seth Godin](lenses/seth-godin.md)** | Author & marketer | marketing · brand · distribution · audience |
| **[Ben Horowitz](lenses/ben-horowitz.md)** | Co-founder, a16z | leadership · people · culture · scaling teams |
| **[Charlie Munger](lenses/charlie-munger.md)** | Vice Chairman, Berkshire Hathaway | value investing · capital allocation · mental models |

---

## What it looks like

You ask:

> *"What's the best way to get my first customer?"*

The Council answers in three moves:

**1 — A fit table.** Every advisor scored on how suited they are to *this* question:

| Advisor | Fit | Why |
|---|-----|-----|
| Alex Hormozi | 97% | first customer = offer + leads + sales — dead center of his wheelhouse |
| Sam Altman | 72% | "make a few people love it" + resourcefulness for the first break |
| Peter Thiel | 58% | dominate one tiny, specific niche first |

**2 — The top advisors, in their own voice.** For each: how they read it, their move, and their blind spot.

> **Hormozi:** Your only constraint right now is *volume* — nobody sees your offer yet. Pick one of the Core Four (warm outreach is fastest for customer #1), build a Grand Slam Offer with a risk-reversing guarantee, and run the Rule of 100. *Blind spot: this breaks down for long enterprise sales cycles.*

**3 — A synthesis.** Where they agree, where they clash, and the single sharpest takeaway — never averaged into mush.

---

## Install on Claude

**Claude Code (recommended):**
```bash
git clone https://github.com/irshaid/the-council.git
cd the-council
claude
```
The included [`CLAUDE.md`](CLAUDE.md) turns Claude into the Council orchestrator automatically. Just ask a question — routing happens every time, no exceptions.

**Claude.ai / Claude Desktop (Projects):**
1. Create a new Project.
2. Paste the contents of [`orchestrator.md`](orchestrator.md) into the Project's custom instructions.
3. Upload the `lenses/` files to the Project knowledge.
4. Ask any question in the Project.

---

## How the routing works

Ask anything — *"Should I raise prices or add a tier?"*, *"Do I hire now or wait?"* — and the orchestrator ([`orchestrator.md`](orchestrator.md)):

1. **Identifies the real decision domains** behind your question.
2. **Scores every advisor 0–100%** on fit and shows the table, sorted high → low.
3. **Consults the top 1–4** — reading each lens and answering in their voice: their read, their move, their blind spot.
4. **Synthesizes** — agreement, conflict, and the takeaway that fits *your* situation.

---

## Consult a single lens manually

Open any file in [`lenses/`](lenses/) — or paste it into any AI assistant — and ask:

> *"Act as this lens. Here's my decision: `<...>`. Give me your heuristics, your verdict, and the one blind spot I should watch."*

---

## A note on honesty

Each lens is an **approximation from the public record** — a tool to sharpen your thinking, not the real person, and not gospel. Every lens documents its own blind spots and failure modes, on purpose. The point isn't to obey a famous founder; it's to borrow many different ways of seeing the same problem.

## Contributing

PRs welcome. Keep lenses evidence-based, follow the existing format (snapshot → how they decide → decision playbook → blind spots), and be honest about where each mind misleads.

## License

CC BY 4.0.
