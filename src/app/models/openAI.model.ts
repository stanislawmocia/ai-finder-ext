import { OpenAIModelEnum } from "@enums/openai.enum";
import { FinderModel } from "./finder.model";

export interface OpenAIModel {
    model: OpenAIModelEnum;
    messages?: FinderModel[];
    temperature: number;
    max_tokens: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
}

export interface OpenAIMessageContent {
    type: string;
    text: string;
}