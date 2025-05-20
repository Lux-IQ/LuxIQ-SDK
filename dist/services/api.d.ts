import { Agent, CreateAgentDTO } from '../types';
export declare class ApiService {
    private client;
    constructor(baseURL: string, apiKey: string);
    createAgent(agentData: CreateAgentDTO): Promise<Agent>;
    listAgents(): Promise<Agent[]>;
    getAgentByName(name: string): Promise<Agent | null>;
    chatWithAgent(agentName: string, message: string): Promise<string>;
    private handleApiError;
}
