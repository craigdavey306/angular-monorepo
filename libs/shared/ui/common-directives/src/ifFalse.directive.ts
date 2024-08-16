import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[btLibsUiIfFalse]',
  standalone: true,
})
export class IfFalseDirective {
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  private embeddedTemplateAdded = false;

  // Defines the condition to assess in determining whether the template should be added or removed.
  // NOTE: The name must mach the selector!
  @Input() set btLibsUiIfFalse(condition: boolean) {
    if (!condition && !this.embeddedTemplateAdded) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.embeddedTemplateAdded = true;
    } else if (condition && this.embeddedTemplateAdded) {
      this.viewContainer.clear();
      this.embeddedTemplateAdded = false;
    }
  }
}
