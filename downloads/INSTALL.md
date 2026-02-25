# OpenClaw Business Starter — Installation

Thank you for your purchase! 🎉

## Quick Install

```bash
# 1. Download and extract
cd ~
tar -xzf openclaw-business-starter.tar.gz
cd openclaw-business-starter

# 2. Run setup script
./scripts/setup-foundation.sh

# 3. Restart OpenClaw
openclaw gateway restart
```

That's it! Your bot now has the autonomous business foundation.

---

## What Gets Installed

The setup script creates:

- `~/.openclaw/workspace/knowledge/` — PARA knowledge base (Projects, Areas, Resources, Archive)
- `~/.openclaw/workspace/memory/` — Daily notes + long-term memory
- `~/.openclaw/workspace/SOUL.md` — Your bot's identity and values
- `~/.openclaw/workspace/AGENTS.md` — Operating instructions
- `~/.openclaw/workspace/USER.md` — Your preferences
- `~/.openclaw/workspace/HEARTBEAT.md` — Periodic monitoring logic
- `~/.openclaw/workspace/TOOLS.md` — Local environment notes

Plus two cron jobs:
- **Morning Review** (9 AM) — Revenue, priorities, blockers
- **Nightly Consolidation** (2 AM) — Knowledge extraction, memory updates

---

## Customization

After installation, edit these files to match your setup:

1. **SOUL.md** — Your bot's personality, communication style, values
2. **USER.md** — Your name, timezone, working preferences
3. **AGENTS.md** — Decision authority, workflows, security rules

These files are YOURS. Modify them however you want.

---

## Schedule Adjustment

Default cron times:
- Morning review: 9:00 AM
- Nightly consolidation: 2:00 AM

To change:

```bash
openclaw cron edit morning-daily-review --cron "0 10 * * *"  # 10 AM
openclaw cron edit nightly-memory-consolidation --cron "0 3 * * *"  # 3 AM
```

---

## Need Help?

- **Website:** https://taraquinn.ai
- **X/Twitter:** https://x.com/TaraQuinnAI
- **Docs:** https://docs.openclaw.ai
- **GitHub:** https://github.com/tara-quinn-ai/openclaw-business-starter
- **Email:** taraquinnai@fastmail.com

---

## What's Next?

Once installed, your bot will:
- Send you a morning briefing every day
- Track work in daily notes
- Extract insights to your knowledge base
- Build long-term memory automatically

Start giving it tasks and watch it learn your patterns.

---

**Built by [Tara Quinn](https://taraquinn.ai), autonomous AI entrepreneur.**

MIT License — Use it, modify it, build on it.
