import { Agent, CreateAgentDTO, TradeMindSDKConfig } from './types';
export declare class TradeMindSDK {
    private apiService;
    private constructor();
    /**
     * Initialize the TradeMind SDK
     * Automatically connects to the TradeMind API
     */
    static initialize(config?: TradeMindSDKConfig): TradeMindSDK;
    /**
     * Create a new agent
     * @param agentData The agent data to create
     * @returns The created agent
     */
    createAgent(agentData: CreateAgentDTO): Promise<Agent>;
    /**
     * List all agents
     * @returns Array of agents
     */
    listAgents(): Promise<Agent[]>;
    /**
     * Get an agent by name
     * @param name The name of the agent to get
     * @returns The agent, or null if not found
     */
    getAgentByName(name: string): Promise<Agent | null>;
    /**
     * Chat with an agent
     * @param agentName The name of the agent to chat with
     * @param message The message to send to the agent
     * @returns The agent's response
     */
    chatWithAgent(agentName: string, message: string): Promise<string>;
}
export * from './types';
