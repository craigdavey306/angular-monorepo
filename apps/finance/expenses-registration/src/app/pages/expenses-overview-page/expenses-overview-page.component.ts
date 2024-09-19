import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AddExpenseComponent,
  AddExpenseReactive,
} from '@bt-libs/finance/ui/expenses-registration-forms';
import {
  ModalComponent,
  Widgets,
  SelectComponent,
  DeferWidgetComponent,
} from '@bt-libs/shared/ui/common-components';

@Component({
  selector: 'app-expenses-overview-page',
  standalone: true,
  imports: [
    CommonModule,
    AddExpenseComponent,
    ModalComponent,
    SelectComponent,
    DeferWidgetComponent,
  ],
  templateUrl: './expenses-overview-page.component.html',
  styleUrl: './expenses-overview-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesOverviewPageComponent implements OnInit {
  addExpenseShown = false;
  widget!: Widgets;
  widgetData: any = null;

  protected readonly cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    setInterval(() => {
      this.widget =
        this.widget === Widgets.Clock ? Widgets.Weather : Widgets.Clock;
      this.widgetData =
        this.widget === Widgets.Clock
          ? null
          : { city: 'New York', message: 'Sunny' };
      this.cd.detectChanges();
    }, 5000);
  }

  addExpense(expense: AddExpenseReactive) {
    console.log('addExpense ==> ', expense);
  }

  onOptionChange(value: unknown) {
    console.log('onOPtionChange ==>', value);
  }
}
