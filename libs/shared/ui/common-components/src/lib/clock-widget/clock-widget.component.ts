import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bt-libs-ui-clock-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock-widget.component.html',
  styleUrl: './clock-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockWidgetComponent {}
