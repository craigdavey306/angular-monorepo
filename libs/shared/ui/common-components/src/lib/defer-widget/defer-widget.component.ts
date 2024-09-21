import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widgets } from './widgets.enum';
import { ClockWidgetComponent } from '../clock-widget/clock-widget.component';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';

@Component({
  selector: 'bt-libs-ui-defer-widget',
  standalone: true,
  imports: [CommonModule, ClockWidgetComponent, WeatherWidgetComponent],
  templateUrl: './defer-widget.component.html',
  styleUrl: './defer-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferWidgetComponent {
  @Input() activeWidget!: Widgets;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() widgetData!: any;
  widgets = Widgets;
}
