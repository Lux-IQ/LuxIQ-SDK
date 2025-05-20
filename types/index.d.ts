import { z } from 'zod';
export declare const AgentModelEnum: z.ZodEnum<["gpt-4", "gpt-3.5-turbo"]>;
export type AgentModel = z.infer<typeof AgentModelEnum>;
export declare const AgentSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    personality: z.ZodString;
    description: z.ZodString;
    model: z.ZodEnum<["gpt-4", "gpt-3.5-turbo"]>;
    logoUrl: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    personality: string;
    description: string;
    model: "gpt-4" | "gpt-3.5-turbo";
    id?: string | undefined;
    logoUrl?: string | undefined;
    createdAt?: string | undefined;
}, {
    name: string;
    personality: string;
    description: string;
    model: "gpt-4" | "gpt-3.5-turbo";
    id?: string | undefined;
    logoUrl?: string | undefined;
    createdAt?: string | undefined;
}>;
export type Agent = z.infer<typeof AgentSchema>;
export declare const CreateAgentSchema: z.ZodObject<{
    name: z.ZodString;
    personality: z.ZodString;
    description: z.ZodString;
    model: z.ZodEnum<["gpt-4", "gpt-3.5-turbo"]>;
    logoUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    personality: string;
    description: string;
    model: "gpt-4" | "gpt-3.5-turbo";
    logoUrl?: string | undefined;
}, {
    name: string;
    personality: string;
    description: string;
    model: "gpt-4" | "gpt-3.5-turbo";
    logoUrl?: string | undefined;
}>;
export type CreateAgentDTO = z.infer<typeof CreateAgentSchema>;
export declare const ChatRequestSchema: z.ZodObject<{
    agentName: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    agentName: string;
}, {
    message: string;
    agentName: string;
}>;
export type ChatRequestDTO = z.infer<typeof ChatRequestSchema>;
export interface TradeMindSDKConfig {
    apiUrl?: string;
    apiKey: string;
}
