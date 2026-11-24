# Local setup and testing

## Environment
The recorded development environment was Windows, with the project at C:\Users\User\Desktop\OmniReply-AI. The server used port 3000. On the recorded machine, npm.cmd start worked when PowerShell blocked the npm.ps1 shim.

## Configuration
Create a plain-text .env file in the project root. Do not create a directory named .env, and do not commit the real file. Use .env.example as a placeholder reference.

## Start the server
    cd C:\Users\User\Desktop\OmniReply-AI
    npm.cmd start

## Expose the local server
In a second terminal:
    cd C:\Users\User\Desktop\OmniReply-AI
    .\cloudflared-windows-amd64.exe tunnel --protocol http2 --url http://localhost:3000

Configure Meta's callback as the generated HTTPS tunnel URL followed by /webhooks/meta. If the tunnel restarts and generates a new hostname, update the callback URL.

## Recorded tests
- GET /health: local health response observed.
- GET /webhooks/meta: Meta verification progressed to a successful challenge response.
- POST /webhooks/meta: Meta's sample Test event reached the local handler and appeared in the server terminal.
- Outgoing reply attempt: authentication error 190 was encountered and a refreshed token was generated; a subsequent recipient allow-list error 131030 occurred. This did not prove delivery to a real customer.

## Next verification
Send a message from an allowed real test recipient and confirm the complete inbound/outbound flow. Then test invalid signatures, duplicate webhook deliveries, malformed payloads, API errors and retry behavior.