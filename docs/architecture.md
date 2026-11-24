# OmniReply AI — Architecture

## Recorded development flow
1. A customer sends a WhatsApp message.
2. Meta delivers an HTTPS webhook event.
3. During local development, Cloudflare Tunnel forwards it to the Express server on localhost:3000.
4. The POST handler parses entry[].changes[].value.messages[].
5. The handler extracts sender and message text.
6. The reply service attempts an authenticated Graph API request to /{PHONE_NUMBER_ID}/messages.

The inbound webhook path was demonstrated with Meta's sample test event. A complete real-customer message-and-reply round trip was not confirmed.

## Components
- Health endpoint: confirms the Express process is reachable.
- Webhook verification: GET /webhooks/meta checks subscription mode and verify token, then returns Meta's challenge.
- Webhook receiver: POST /webhooks/meta accepts inbound event JSON.
- Message extraction: inspects the nested payload for messages and sender identifiers.
- Reply service: makes an authenticated WhatsApp Cloud API request.
- Future AI layer: planned between message extraction and reply sending, using approved business knowledge.

## Status boundaries
| Capability | Recorded status |
|---|---|
| Local Express server and health route | Observed working |
| Meta webhook verification | Observed working |
| Sample inbound webhook delivery | Observed |
| Successful real-recipient reply | Not confirmed |
| AI-generated answers / RAG | Planned |
| Messenger and website chat | Planned |
| Human handoff and workflow integrations | Planned |

## Production considerations
Implement and test Meta webhook signature verification, payload validation, message idempotency, retry handling, rate limiting, structured logging and secure secret storage before production use.