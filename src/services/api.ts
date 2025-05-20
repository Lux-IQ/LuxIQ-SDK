import axios, { AxiosInstance } from 'axios';
import { Agent, CreateAgentDTO } from '../types';

export class ApiService {
  private client: AxiosInstance;

  constructor(baseURL: string, apiKey: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
  }

  async createAgent(agentData: CreateAgentDTO): Promise<Agent> {
    try {
      const response = await this.client.post('/api/agents', agentData);
      return response.data;
    } catch (error) {
      this.handleApiError(error, 'Failed to create agent');
      throw error; // TypeScript needs this even though handleApiError always throws
    }
  }

  async listAgents(): Promise<Agent[]> {
    try {
      const response = await this.client.get('/api/agents');
      return response.data;
    } catch (error) {
      this.handleApiError(error, 'Failed to list agents');
      throw error;
    }
  }

  async getAgentByName(name: string): Promise<Agent | null> {
    try {
      const response = await this.client.get(`/api/agents/${name}`);
      return response.data;
    } catch (error) {
      // If 404, return null (agent not found)
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      this.handleApiError(error, 'Failed to get agent');
      throw error;
    }
  }

  async chatWithAgent(agentName: string, message: string): Promise<string> {
    try {
      const response = await this.client.post(`/api/agents/${agentName}/chat`, { message });
      return response.data.response;
    } catch (error) {
      this.handleApiError(error, 'Failed to chat with agent');
      throw error;
    }
  }

  private handleApiError(error: unknown, defaultMessage: string): never {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      const statusCode = error.response?.status;
      const errorMessage = responseData?.message || error.message;

      throw new Error(`${defaultMessage}: [${statusCode}] ${errorMessage}`);
    }
    
    if (error instanceof Error) {
      throw new Error(`${defaultMessage}: ${error.message}`);
    }
    
    throw new Error(`${defaultMessage}: Unknown error`);
  }
} 