import { FinderModel } from "./finder.model";

export interface OllamaModel {
    apiKey?: string;
    messages?: FinderModel[];
}
