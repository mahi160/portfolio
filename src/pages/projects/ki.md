---
layout: ../../layouts/ProjectLayout.astro
title: ki
description: A terminal-first AI chat client written in Go, with a Bubble Tea TUI and provider support for Anthropic, OpenAI, and Gemini.
tags: ['Go', 'Bubble Tea', 'TUI', 'AI', 'CLI']
githubUrl: https://github.com/mahi160/ki
featured: false
timestamp: 2025-05-17T00:00:00.000Z
filename: ki
---

`ki` is a terminal AI chat client written in Go. The goal is to build a small, fast, keyboard-native interface for talking to LLMs without leaving the terminal.

It is early, but already useful enough to represent the kind of tool I like building: focused, local-feeling, and designed around real developer workflows instead of a browser tab.

## Why I built this

I use AI tools constantly, but most interfaces either feel too heavy or too disconnected from where I actually work. My editor, shell, git history, and project context live in the terminal. `ki` is an attempt to make AI assistance feel like part of that environment instead of another app to manage.

It is also a learning project for Go, terminal UI architecture, streaming state, and provider abstraction.

## What it does

- Runs as a terminal chat client
- Supports multiple providers: Anthropic, OpenAI, and Gemini
- Streams assistant responses into the TUI
- Keeps keyboard-first controls
- Separates provider logic from interface logic
- Uses config/env-driven setup instead of hardcoded keys

## Architecture

```txt
cmd/ki
  └─ boot app + config

internals/config
  └─ provider/model/API key configuration

internals/agent
  ├─ provider interface
  ├─ anthropic client
  ├─ openai client
  └─ gemini client

internals/tui
  ├─ Bubble Tea model/update loop
  ├─ conversation state
  ├─ streaming renderer
  ├─ keymaps
  ├─ commands
  └─ layout/styles
```

The useful boundary is between `agent` and `tui`: the interface should not care which model provider is active. It should only care that messages can be submitted and streamed back.

## Technical challenges

### Streaming without UI jank

LLM output arrives in chunks. The TUI needs to render partial responses while preserving conversation state and not blocking input handling. This means treating streaming as state updates instead of a single request/response call.

### Provider abstraction

Anthropic, OpenAI, and Gemini all have different APIs and response shapes. `ki` hides those differences behind a provider interface so the UI can stay stable while providers change underneath.

### Terminal ergonomics

A terminal AI client lives or dies by small details: keybindings, history navigation, clear visual hierarchy, and not destroying the user's flow. The project is partly about learning those tradeoffs by building the interface directly.

## Stack

- **Go** for the application
- **Bubble Tea** for the TUI update loop
- **Bubbles** for terminal UI primitives
- **Lip Gloss** for styling
- Provider SDKs for Anthropic, OpenAI, and Gemini

## Current controls

```txt
Ctrl+C     Exit
Ctrl+L     Clear history
Up/Down    Navigate history
Enter      Send message
```

## What this proves

`ki` shows the direction I am moving toward: frontend taste applied to non-browser interfaces. It combines UI thinking, terminal constraints, async state, and systems-style boundaries in a small Go codebase.
