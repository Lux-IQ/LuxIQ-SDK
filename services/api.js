"use strict";
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
exports.ApiService = void 0;
const axios_1 = __importDefault(require("axios"));
class ApiService {
    constructor(baseURL, apiKey) {
        this.client = axios_1.default.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
    }
    createAgent(agentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.post('/api/agents', agentData);
                return response.data;
            }
            catch (error) {
                this.handleApiError(error, 'Failed to create agent');
                throw error; // TypeScript needs this even though handleApiError always throws
            }
        });
    }
    listAgents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get('/api/agents');
                return response.data;
            }
            catch (error) {
                this.handleApiError(error, 'Failed to list agents');
                throw error;
            }
        });
    }
    getAgentByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.client.get(`/api/agents/${name}`);
                return response.data;
            }
            catch (error) {
                // If 404, return null (agent not found)
                if (axios_1.default.isAxiosError(error) && ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                    return null;
                }
                this.handleApiError(error, 'Failed to get agent');
                throw error;
            }
        });
    }
    chatWithAgent(agentName, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.post(`/api/agents/${agentName}/chat`, { message });
                return response.data.response;
            }
            catch (error) {
                this.handleApiError(error, 'Failed to chat with agent');
                throw error;
            }
        });
    }
    handleApiError(error, defaultMessage) {
        var _a, _b;
        if (axios_1.default.isAxiosError(error)) {
            const responseData = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            const statusCode = (_b = error.response) === null || _b === void 0 ? void 0 : _b.status;
            const errorMessage = (responseData === null || responseData === void 0 ? void 0 : responseData.message) || error.message;
            throw new Error(`${defaultMessage}: [${statusCode}] ${errorMessage}`);
        }
        if (error instanceof Error) {
            throw new Error(`${defaultMessage}: ${error.message}`);
        }
        throw new Error(`${defaultMessage}: Unknown error`);
    }
}
exports.ApiService = ApiService;
//# sourceMappingURL=api.js.map