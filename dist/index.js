"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeMindSDK = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const types_1 = require("./types");
const api_1 = require("./services/api");
dotenv_1.default.config();
class TradeMindSDK {
    constructor(config) {
        const apiUrl = config.apiUrl || 'https://trademind-api.vercel.app';
        this.apiService = new api_1.ApiService(apiUrl, config.apiKey);
    }
    /**
     * Initialize the TradeMind SDK
     * Automatically connects to the TradeMind API
     */
    static initialize(config) {
        const apiKey = (config === null || config === void 0 ? void 0 : config.apiKey) || process.env.TRADEMIND_API_KEY || '';
        const apiUrl = (config === null || config === void 0 ? void 0 : config.apiUrl) || process.env.TRADEMIND_API_URL || 'https://trademind-api.vercel.app';
        // Validate configuration
        if (!apiKey) {
            throw new Error('Missing API Key. Set TRADEMIND_API_KEY environment variable or pass in config.');
        }
        return new TradeMindSDK({ apiKey, apiUrl });
    }
    /**
     * Create a new agent
     * @param agentData The agent data to create
     * @returns The created agent
     */
    createAgent(agentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate agent data
                types_1.CreateAgentSchema.parse(agentData);
                // Create agent
                return yield this.apiService.createAgent(agentData);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to create agent: ${error.message}`);
                }
                throw new Error('Unknown error occurred when creating agent');
            }
        });
    }
    /**
     * List all agents
     * @returns Array of agents
     */
    listAgents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.apiService.listAgents();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to list agents: ${error.message}`);
                }
                throw new Error('Unknown error occurred when listing agents');
            }
        });
    }
    /**
     * Get an agent by name
     * @param name The name of the agent to get
     * @returns The agent, or null if not found
     */
    getAgentByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name || typeof name !== 'string') {
                    throw new Error('Agent name must be a non-empty string');
                }
                return yield this.apiService.getAgentByName(name);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to get agent: ${error.message}`);
                }
                throw new Error('Unknown error occurred when getting agent');
            }
        });
    }
    /**
     * Chat with an agent
     * @param agentName The name of the agent to chat with
     * @param message The message to send to the agent
     * @returns The agent's response
     */
    chatWithAgent(agentName, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate request
                types_1.ChatRequestSchema.parse({ agentName, message });
                return yield this.apiService.chatWithAgent(agentName, message);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to chat with agent: ${error.message}`);
                }
                throw new Error('Unknown error occurred when chatting with agent');
            }
        });
    }
}
exports.TradeMindSDK = TradeMindSDK;
// Export types
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map