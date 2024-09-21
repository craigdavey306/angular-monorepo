import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetOption } from './widget-loaders';

@Component({
  selector: 'bt-libs-ui-widget-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget-container.component.html',
  styleUrl: './widget-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetContainerComponent implements OnChanges {
  @Input() injector!: Injector;
  @Input({ required: true }) widgetLoader!: WidgetOption;
  widget: widget = { component: null, injector: undefined };

  protected readonly cd = inject(ChangeDetectorRef);

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    const widgetLoader: WidgetOption = changes['widgetLoader'].currentValue;
    const widget = await widgetLoader();
    this.widget = {
      component: widget[Object.keys(widget)[0]],
      injector: this.injector,
    };
    this.cd.detectChanges();
  }
}

export interface widget {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Type<any> | null;
  injector?: Injector;
}
