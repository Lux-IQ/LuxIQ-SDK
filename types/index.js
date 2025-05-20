"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRequestSchema = exports.CreateAgentSchema = exports.AgentSchema = exports.AgentModelEnum = void 0;
const zod_1 = require("zod");
// Agent Model Types
exports.AgentModelEnum = zod_1.z.enum([
    'gpt-4',
    'gpt-3.5-turbo',
]);
// Agent Schema
exports.AgentSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string().min(1),
    personality: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    model: exports.AgentModelEnum,
    logoUrl: zod_1.z.string().url().optional(),
    createdAt: zod_1.z.string().datetime().optional(),
});
// Create Agent DTO
exports.CreateAgentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    personality: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    model: exports.AgentModelEnum,
    logoUrl: zod_1.z.string().url().optional(),
});
// Chat Request DTO
exports.ChatRequestSchema = zod_1.z.object({
    agentName: zod_1.z.string().min(1),
    message: zod_1.z.string().min(1),
});
//# sourceMappingURL=index.js.map