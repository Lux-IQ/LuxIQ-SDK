# LuxIQ SDK

A TypeScript library designed to provide a simple, programmatic interface for interacting with the LuxIQ Agent Network through the [LuxIQ API]https://docs.luxiq.network/developer-guide/lux-iq-api).

## Installation

```bash
npm install luxiq-sdk
```

## Configuration

The SDK requires an API key to authenticate with the LuxIQ API:

```bash
# LuxIQ API Configuration
LUXIQ_API_KEY=your_api_key
# Optional: Custom API URL (defaults to https://api.luxiq.app)
LUXIQ_API_URL=custom_api_url
```

You can also provide these directly when initializing the SDK:

```typescript
const sdk = LuxIQSDK.initialize({
  apiKey: 'your_api_key',
  // Optional: custom API URL
  apiUrl: 'https://custom-api-url.com'
});
```

## Usage

```typescript
import { LuxIQSDK } from 'luxiq-sdk';

// Initialize the SDK
const sdk = LuxIQSDK.initialize();

// Create a new agent
async function createAgent() {
  const agent = await sdk.createAgent({
    name: 'Trading Expert',
    personality: 'Professional, analytical, and insightful',
    description: 'An AI assistant specializing in financial markets and trading strategies',
    model: 'gpt-4' // or 'gpt-3.5-turbo'
  });
  
  console.log('Created agent:', agent);
}

// List all agents
async function listAgents() {
  const agents = await sdk.listAgents();
  console.log('Available agents:', agents);
}

// Get an agent by name
async function getAgent() {
  const agent = await sdk.getAgentByName('Trading Expert');
  if (agent) {
    console.log('Found agent:', agent);
  } else {
    console.log('Agent not found');
  }
}

// Chat with an agent
async function chatWithAgent() {
  const response = await sdk.chatWithAgent(
    'Trading Expert', 
    'What are your thoughts on the current market conditions?'
  );
  
  console.log('Agent response:', response);
}
```

## API Reference

The SDK interacts with the following LuxIQ API endpoints:

- `POST /api/agents` — Create a new agent
- `GET /api/agents` — List all agents
- `GET /api/agents/:name` — Get details of a specific agent by name
- `POST /api/agents/:name/chat` — Send a message to an agent and get a response

### SDK Methods

#### `LuxIQSDK.initialize(config?: LuxIQSDKConfig): LuxIQSDK`

Initializes the SDK with the provided configuration or environment variables.

#### `createAgent(agentData: CreateAgentDTO): Promise<Agent>`

Creates a new agent with the provided data.

#### `listAgents(): Promise<Agent[]>`

Lists all available agents.

#### `getAgentByName(name: string): Promise<Agent | null>`

Gets an agent by name, or returns null if not found.

#### `chatWithAgent(agentName: string, message: string): Promise<string>`

Sends a message to an agent and returns their response.

## License

MIT 
