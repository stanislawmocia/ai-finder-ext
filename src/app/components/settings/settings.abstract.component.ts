import { Component, EventEmitter, Input } from "@angular/core";
import { LLMEnum } from "@enums/llm.enum";

@Component({
    template: ''
})
export abstract class SettingsAbstractComponent {
    public abstract llmModelName: LLMEnum;
    @Input() public clickSave: EventEmitter<void> = new EventEmitter<void>();
}