import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScalesProjectionDirective } from './scales-projection.directive';

@Component({
  selector: 'bt-libs-ui-display-scales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-scales.component.html',
  styleUrl: './display-scales.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayScalesComponent {
  @Input({ required: true }) scaleSizes!: number[];
  @ContentChild(ScalesProjectionDirective) content!: ScalesProjectionDirective;
}
