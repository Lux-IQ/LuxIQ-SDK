import { z } from 'zod';

// Agent Model Types
export const AgentModelEnum = z.enum([
  'gpt-4',
  'gpt-3.5-turbo',
]);

export type AgentModel = z.infer<typeof AgentModelEnum>;

// Agent Schema
export const AgentSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  personality: z.string().min(1),
  description: z.string().min(1),
  model: AgentModelEnum,
  logoUrl: z.string().url().optional(),
  createdAt: z.string().datetime().optional(),
});

export type Agent = z.infer<typeof AgentSchema>;

// Create Agent DTO
export const CreateAgentSchema = z.object({
  name: z.string().min(1),
  personality: z.string().min(1),
  description: z.string().min(1),
  model: AgentModelEnum,
  logoUrl: z.string().url().optional(),
});

export type CreateAgentDTO = z.infer<typeof CreateAgentSchema>;

// Chat Request DTO
export const ChatRequestSchema = z.object({
  agentName: z.string().min(1),
  message: z.string().min(1),
});

export type ChatRequestDTO = z.infer<typeof ChatRequestSchema>;

// SDK Config
export interface LuxIQSDKConfig {
  apiUrl?: string;
  apiKey: string;
} 