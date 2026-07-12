# council-pixel-portraits

Portable pixel-art portrait skill. Drop the whole folder into the
[the-council](https://github.com/irshaid/the-council/) repo (or any repo).

## Use it as a Claude Code skill
Copy the folder to `.claude/skills/council-pixel-portraits/` in the target repo.
Claude will pick it up from `SKILL.md`.

## Just want the pictures?
Open `gallery.html`. If your browser blocks `file://` scripts, run a tiny server:

```bash
cd council-pixel-portraits
python3 -m http.server 8000
# then open http://localhost:8000/gallery.html
```

## Files
| file | what |
|------|------|
| `SKILL.md`     | skill manifest + full guide |
| `pixel-art.js` | palette + templates + generator (`window.PIXEL`) |
| `portraits.js` | the 50 advisors (`window.MENTORS`) |
| `gallery.html` | self-contained viewer (filters + light/dark) |

Everything is pure code — no image files, no dependencies, no build step.
