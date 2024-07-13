import { Component, EventEmitter, Input } from "@angular/core";
import { LLMEnum } from "@enums/llm.enum";

@Component({
    template: ''
})
export abstract class SettingsAbstractComponent {
    public abstract llmModelName: LLMEnum;
    public abstract save(): void ;
}