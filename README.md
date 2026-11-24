# OmniReply AI

A developing business messaging automation platform focused on receiving WhatsApp messages through Meta webhooks and responding through the WhatsApp Cloud API.

## Overview
OmniReply AI aims to help businesses acknowledge enquiries, answer common questions, capture leads, and route complex conversations to a human. The initial engineering work centres on a Node.js/Express webhook backend.

## Technology
- Node.js and JavaScript
- Express.js, dotenv and Helmet
- Meta WhatsApp Cloud API and Webhooks
- Cloudflare Tunnel for local HTTPS testing
- Postman

## Recorded status
**Observed:** Express server and health endpoint ran locally; Meta webhook verification worked; a sample inbound webhook event reached the local POST handler through Cloudflare Tunnel; an outgoing message request was attempted.

**Not confirmed:** A complete successful reply to a real WhatsApp recipient and production deployment.

**Planned:** AI-generated replies and RAG, Facebook Messenger, website chat, CRM/workflow integrations and human handoff.

## Routes
| Method | Route | Purpose |
|---|---|---|
| GET | /health | Service health check |
| GET | /webhooks/meta | Meta webhook subscription verification |
| POST | /webhooks/meta | Receive inbound webhook events |

## Local setup
The recorded development environment was Windows, with the project at C:\Users\User\Desktop\OmniReply-AI.

1. Install Node.js and the project dependencies (Express, dotenv and Helmet were recorded).
2. Create a local .env file using .env.example. Never commit real credentials.
3. Start the server with npm.cmd start on Windows if PowerShell blocks the npm.ps1 shim.
4. In another terminal, expose port 3000:
   
       .\cloudflared-windows-amd64.exe tunnel --protocol http2 --url http://localhost:3000

5. Configure Meta's callback URL as the generated HTTPS tunnel URL plus /webhooks/meta, and use the same private verify token.
6. Test the health and webhook endpoints.

A quick-tunnel hostname can change after restart; update the Meta callback URL when it does.

## Security
Never commit .env, access tokens, app secrets or business credentials. Keep tokens server-side. Add webhook signature validation, payload validation, idempotency, retry handling and safe error logging before production.

## Repository contents
- docs/architecture.md
- docs/setup-and-testing.md
- examples/express-webhook-reference.js
- .env.example

## Source accuracy
This repository is a documented project handover reconstructed from development records. Reference code is illustrative and is not a byte-for-byte export of the original local project. Compare it with live project files before production use.