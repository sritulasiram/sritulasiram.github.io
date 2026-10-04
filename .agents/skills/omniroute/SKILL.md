---
name: omniroute
description: >
  Unified AI router and gateway with 358 providers, 150+ free tiers, RTK+Caveman compression,
  auto-fallback, and OpenAI-compatible local APIs. Use this skill when asked to configure,
  start, stop, query, or route requests through OmniRoute (http://localhost:20128/v1),
  set up coding tool integrations (Claude Code, Codex, Cursor, Cline), or manage providers and models.
argument-hint: "[serve|status|providers|models|setup|mcp]"
license: MIT
---

# OmniRoute — The Free AI Gateway

OmniRoute is a local AI gateway and router that aggregates 358 AI providers (including 150+ free tiers),
providing a unified OpenAI-compatible endpoint at `http://localhost:20128/v1` with intelligent fallback,
19 routing strategies, and RTK + Caveman prompt compression.

## Gateway Endpoints

- **Dashboard**: `http://localhost:20128`
- **Base API**: `http://localhost:20128/v1`
- **Chat Completions**: `http://localhost:20128/v1/chat/completions`
- **Models Catalog**: `http://localhost:20128/v1/models`
- **MCP Server**: Stdio via `omniroute --mcp`, or HTTP streamable at `http://localhost:20128/api/mcp/stream`

## CLI Quick Reference

### Server Lifecycle
```bash
omniroute                # Start server on default port 20128
omniroute serve          # Start with options (--daemon, --port, --no-open)
omniroute stop           # Stop running server
omniroute restart        # Restart active server
omniroute status         # Inspect server status, DB, and configured tools
omniroute doctor         # Run diagnostics and verify network / dependencies
```

### Providers & Authentication
```bash
omniroute providers available              # List available providers in catalog
omniroute providers available --category api-key
omniroute providers list                   # Show connected providers
omniroute providers auth <provider>        # Authenticate via OAuth or CLI prompt
omniroute providers add <name> --credential-env <ENV_VAR>
omniroute providers test <id-or-name>      # Test connection
omniroute providers test-all               # Test all connected providers
```

### Models & Routing Combos
OmniRoute includes zero-config virtual combos that route intelligently:
- `auto`: Balanced default (LKGP — Last-Known-Good Provider)
- `auto/coding`: Quality-first weights tuned for programming and code generation
- `auto/fast`: Lowest latency first
- `auto/cheap`: Lowest cost per token first
- `auto/offline`: Most quota / rate-limit headroom first
- `auto/smart`: Quality-first with exploration for discovering better models

Example request:
```bash
curl http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello world"}]}'
```

### Integrating Coding CLIs & Editors
OmniRoute automatically configures downstream AI tools to point to its gateway:
```bash
omniroute setup-claude     # Configures Claude Code profiles (~/.claude/profiles/)
omniroute setup-codex      # Configures OpenAI Codex CLI (~/.codex/)
omniroute setup-cline      # Configures Cline
omniroute setup-opencode   # Configures OpenCode
omniroute setup-cursor     # Prints Cursor integration steps
```

### MCP (Model Context Protocol)
Run OmniRoute as an MCP server for IDEs or agents:
```bash
omniroute --mcp
```
Or check / restart MCP transports:
```bash
omniroute mcp status
omniroute mcp enable --transport stdio
```

### Antigravity Bridge & Quota Management
For Antigravity environments, OmniRoute routes non-native requests and Gemini/Claude models through
shared Google Cloud Code quotas or external fallback providers when limits are hit.
