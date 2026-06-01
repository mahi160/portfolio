---
title: flowd
description: A local coding-activity tracker that watches tmux sessions, builds focus-based summaries, and commits them to a private git journal. WakaTime-ish, but local-first and terminal-native.
tags: ['Go', 'SQLite', 'tmux', 'CLI', 'Developer Tools']
githubUrl: https://github.com/mahi160/flowd
featured: true
timestamp: 2025-04-30T00:00:00.000Z
---

`flowd` is a local coding-activity tracker for people who live in tmux.

It watches attached tmux sessions, records focused work, builds summaries, and commits them to a private git journal. Every focused block becomes a timestamped commit — which means your GitHub graph reflects when you actually worked, without sending activity data to a cloud service.

## Why I built this

I wanted WakaTime-style visibility without WakaTime-style data ownership. My editor, shell, AI tools, and git history already know enough about my work. `flowd` connects those signals locally instead of shipping them somewhere else.

The goal was not productivity theatre. The goal was a useful work journal: what I worked on, when I focused, how often I switched context, and which tools were involved.

## How it works

```txt
every few seconds
  └─ check attached tmux client
     └─ inspect active pane command + cwd
        └─ map cwd to git repo/project
           └─ write activity event to SQLite

every focus block
  └─ aggregate events
     └─ inspect git diff/stat
        └─ write markdown journal
           └─ commit to private repo
```

Idle time does not count. If tmux has no attached client, tracking pauses. File contents are not read — only metadata such as filenames, extensions, and line counts.

## Technical challenges

### Reliable focus tracking

The hard part is not sampling tmux. The hard part is deciding what counts as work. `flowd` has to ignore idle gaps, survive restarts, and avoid double-counting time when sessions sit open in the background.

The daemon persists block state in SQLite, so a restart or machine sleep does not destroy the current work block.

### Local-first journal sync

The journal is just markdown plus SQLite inside a private git repo. That sounds simple, but it means the tool has to be careful about machine names, commit timing, and push behavior.

Each machine writes to its own folder to avoid conflicts:

```txt
flowd-private/
  README.md
  macbook/
    2026-04.md
    2026-05.md
    flowd.db
```

### Tool classification

The tracker needs to understand whether an active command is coding, shell work, git, AI assistance, or idle background noise. This is handled with command classification instead of pretending every terminal process is equal.

## Stack

- **Go** for the daemon and CLI
- **SQLite** for local event storage
- **tmux** as the source of active-session truth
- **git** as the sync and journal transport
- **Markdown** as the human-readable output format
- Optional AI summaries through any stdin → stdout CLI

## Sample journal entry

```md
### Monday, 30 Apr

### 14:00 – 16:42

**Focus:** 30 min  ·  **Switches:** 4
**Repo:** flowd (main)
**Commands:** nvim 18min · claude 7min · git 5min
**Languages:** Go 16min · Markdown 2min
**Code:** 7 files (+142 −38)
```

## What this proves

This project is a good snapshot of the kind of software I like building: small tools with clear constraints, local-first defaults, boring persistence, and a workflow-first design. It is not trying to become a SaaS. It is trying to be useful every day.
