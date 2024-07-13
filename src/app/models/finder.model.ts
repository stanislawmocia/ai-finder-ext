import { LLMEnum } from "@enums/llm.enum";
import { LlmStudioModel } from "./llm-studio.model";
import { OllamaModel } from "./ollama.model";
import { OpenAIModel } from "./openAI.model";

export interface FinderModel {
    role: string;
    content: string | null;
}

export interface LLMModelRequest {
    url: string;
    messages: FinderModel[];
    method: "GET" | "POST";
}

export interface AppCofngiration {
    useLLM: LLMEnum;
    apiKey?: string;
    configuration: OpenAIModel | OllamaModel | LlmStudioModel;
    systemPrompt: string;
}
