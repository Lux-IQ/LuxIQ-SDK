import { LuxIQSDK } from '../src';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize the SDK with API key from environment variable
// Make sure LUXIQ_API_KEY is set in your .env file
const sdk = LuxIQSDK.initialize();

async function demoLuxIQSDK() {
  try {
    // Create a new agent
    console.log('Creating a new agent...');
    const agent = await sdk.createAgent({
      name: 'Market Analyst',
      personality: 'Professional, detail-oriented, and helpful',
      description: 'An AI assistant specializing in market analysis and trading recommendations',
      model: 'gpt-3.5-turbo'
    });
    console.log('Created agent:', agent);

    // List all agents
    console.log('\nListing all agents...');
    const agents = await sdk.listAgents();
    console.log('Available agents:', agents);

    // Get an agent by name
    console.log('\nGetting agent by name...');
    const retrievedAgent = await sdk.getAgentByName('Market Analyst');
    console.log('Retrieved agent:', retrievedAgent);

    // Chat with the agent
    console.log('\nChatting with agent...');
    const response = await sdk.chatWithAgent(
      'Market Analyst',
      'What factors should I consider when evaluating a stock for long-term investment?'
    );
    console.log('Agent response:', response);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the demo
demoLuxIQSDK(); 