import dotenv from 'dotenv';
import { 
  Agent, 
  CreateAgentDTO, 
  CreateAgentSchema, 
  ChatRequestSchema,
  LuxIQSDKConfig
} from './types';
import { ApiService } from './services/api';

dotenv.config();

export class LuxIQSDK {
  private apiService: ApiService;
  
  private constructor(config: LuxIQSDKConfig) {
    const apiUrl = config.apiUrl || 'https://luxiq-api.vercel.app';
    this.apiService = new ApiService(apiUrl, config.apiKey);
  }

  /**
   * Initialize the LuxIQ SDK
   * Automatically connects to the LuxIQ API
   */
  static initialize(config?: LuxIQSDKConfig): LuxIQSDK {
    const apiKey = config?.apiKey || process.env.LUXIQ_API_KEY || '';
    const apiUrl = config?.apiUrl || process.env.LUXIQ_API_URL || 'https://luxiq-api.vercel.app';

    // Validate configuration
    if (!apiKey) {
      throw new Error('Missing API Key. Set LUXIQ_API_KEY environment variable or pass in config.');
    }

    return new LuxIQSDK({ apiKey, apiUrl });
  }

  /**
   * Create a new agent
   * @param agentData The agent data to create
   * @returns The created agent
   */
  async createAgent(agentData: CreateAgentDTO): Promise<Agent> {
    try {
      // Validate agent data
      CreateAgentSchema.parse(agentData);

      // Create agent
      return await this.apiService.createAgent(agentData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create agent: ${error.message}`);
      }
      throw new Error('Unknown error occurred when creating agent');
    }
  }

  /**
   * List all agents
   * @returns Array of agents
   */
  async listAgents(): Promise<Agent[]> {
    try {
      return await this.apiService.listAgents();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to list agents: ${error.message}`);
      }
      throw new Error('Unknown error occurred when listing agents');
    }
  }

  /**
   * Get an agent by name
   * @param name The name of the agent to get
   * @returns The agent, or null if not found
   */
  async getAgentByName(name: string): Promise<Agent | null> {
    try {
      if (!name || typeof name !== 'string') {
        throw new Error('Agent name must be a non-empty string');
      }
      
      return await this.apiService.getAgentByName(name);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get agent: ${error.message}`);
      }
      throw new Error('Unknown error occurred when getting agent');
    }
  }

  /**
   * Chat with an agent
   * @param agentName The name of the agent to chat with
   * @param message The message to send to the agent
   * @returns The agent's response
   */
  async chatWithAgent(agentName: string, message: string): Promise<string> {
    try {
      // Validate request
      ChatRequestSchema.parse({ agentName, message });
      
      return await this.apiService.chatWithAgent(agentName, message);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to chat with agent: ${error.message}`);
      }
      throw new Error('Unknown error occurred when chatting with agent');
    }
  }
}

// Export types
export * from './types'; 