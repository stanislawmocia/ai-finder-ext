import { FinderModel } from "./finder.model";

export interface LlmStudioModel {
    url: string;
    model: string;
    messages?: FinderModel[];
    temperature: number;
    max_tokens: number;
}