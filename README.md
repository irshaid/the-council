# The Council

Thinking lenses of ten founders and operators — how they think and decide — plus an **orchestrator** that routes any question to the right advisor(s). Bring a decision; The Council shows you which of the ten are best suited to answer (with a fit score), answers in their voices, and tells you where they disagree.

## The lenses
- **[Jeff Bezos](lenses/jeff-bezos.md)** — deciding under uncertainty; reversible vs. irreversible calls.
- **[Alex Hormozi](lenses/alex-hormozi.md)** — offers, pricing, getting customers.
- **[Steve Jobs](lenses/steve-jobs.md)** — focus, taste, shipping.
- **[Naval Ravikant](lenses/naval-ravikant.md)** — leverage and the solo builder.
- **[Demis Hassabis](lenses/demis-hassabis.md)** — long-horizon deep-tech strategy and problem selection.
- **[Dario Amodei](lenses/dario-amodei.md)** — building a frontier company on a technical thesis.
- **[Sam Altman](lenses/sam-altman.md)** — network, capital, and resourcefulness.
- **[Elon Musk](lenses/elon-musk.md)** — first principles and execution velocity.
- **[Larry Fink](lenses/larry-fink.md)** — risk, capital allocation, and building an institution.
- **[Peter Thiel](lenses/peter-thiel.md)** — contrarian strategy and monopoly.

## Install on Claude

**Claude Code (recommended):**
```bash
git clone https://github.com/irshaid/the-council.git
cd the-council
claude
```
The included `CLAUDE.md` turns Claude into the Council orchestrator automatically. Just ask a question.

**Claude.ai / Claude Desktop (Projects):**
1. Create a new Project.
2. Paste the contents of [`orchestrator.md`](orchestrator.md) into the Project's custom instructions.
3. Upload the `lenses/` files to the Project knowledge.
4. Ask any question in the Project.

## How it works
Ask anything — *"Should I raise prices or add a tier?"*, *"Do I hire now or wait?"* — and the orchestrator:
1. **Shows a fit table** — each advisor scored 0–100% on how suited they are to *this* question, with a one-line reason.
2. **Consults the top advisors** — answering in each one's voice: how they read it, their move, their blind spot.
3. **Synthesizes** — where they agree, where they clash, and the sharpest takeaway.

## Consult a single lens manually
Open any file in [`lenses/`](lenses/) (or paste it into any AI assistant) and ask:

> *"Act as this lens. Here's my decision: `<...>`. Give me your heuristics, your verdict, and the one blind spot I should watch."*

Each lens is an approximation from the public record — a tool to sharpen your thinking, not the real person. Every lens lists its own blind spots.

## Contributing
PRs welcome. Keep lenses evidence-based, follow the same format, and be honest about blind spots.

## License
CC BY 4.0.
