# 📦 TradeMind SDK – Project Description

## Overview
**TradeMind SDK** is a **TypeScript** library designed to provide a simple, programmatic interface for interacting with the **TradeMind Agent Network**.  
It offers the same functionality as the **TradeMind Framework CLI tool**, but as an **SDK package** that can be imported into any Node.js application, backend, or CLI tool.

---

## Purpose
The SDK allows developers to:
- Create agents
- List existing agents
- Interact (chat) with agents

All functionality is provided through **easy-to-use methods** without needing to interact manually with the database or API endpoints.

---

## Core Features

### 1. Create Agent
Programmatically create a new agent by providing:
- `name`
- `personality`
- `description`
- `model`
- `logoUrl` (optional)

The SDK ensures that agent names are unique and persists the agent into the backend.

---

### 2. List Agents
Retrieve a list of all currently created agents, along with their metadata:
- `id`
- `name`
- `personality`
- `description`
- `model`
- `logoUrl`
- `createdAt`

---

### 3. Interact with Agent
Send a message to a selected agent and receive a real-time AI response using the agent's associated model (e.g., OpenAI GPT-4, GPT-3.5-turbo).

The interaction respects:
- The agent's selected model
- System prompts that frame the conversation as part of the **TradeMind Network**

---

## Tech Stack

| Layer         | Technology                     |
|---------------|---------------------------------|
| Language      | TypeScript (strict mode)        |
| Runtime       | Node.js (>=18)                  |
| AI Interaction | LLM SDK for Node.js         |
| HTTP Client   | Axios (if external API needed)  |
| Validation    | Zod                             |
| Environment Management | dotenv                |

---

## Project Structure


---

## Public SDK Methods

```typescript
// Initialize SDK)
initializeSDK();

// Agent Management
createAgent({ name, personality, description, model, logoUrl? }): Promise<Agent>;
listAgents(): Promise<Agent[]>;
getAgentByName(name: string): Promise<Agent | null>;

// Agent Interaction
chatWithAgent(agentName: string, message: string): Promise<string>;
```