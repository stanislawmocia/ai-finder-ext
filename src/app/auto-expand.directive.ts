import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'textarea[autoExpand]'
})
export class AutoExpandDirective {

  constructor(private elementRef: ElementRef) {}

  @HostListener('input')
  onInput(): void {
    this.adjustHeight();
  }

  ngOnInit(): void {
    this.adjustHeight();
  }

  private adjustHeight(): void {
    const textarea = this.elementRef.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
