import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWidgetData } from '../widget-container/widget-tokens';

@Component({
  selector: 'bt-libs-ui-weather-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherWidgetComponent {
  @Input() widgetData!: WeatherWidgetData | null;
}
