import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
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

import { ExpenseModel } from '@bt-libs/finance/data-access/expenses';

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
export class ExpensesOverviewPageComponent {
  expenses = signal<ExpenseModel[]>([
    {
      id: 1,
      description: 'Office Supplies',
      amount: {
        amountExclVat: 100,
        vatPercentage: 20,
      },
      date: '2024-01-04',
      tags: ['printer'],
    },
    {
      id: 2,
      description: 'Travel',
      amount: {
        amountExclVat: 50,
        vatPercentage: 20,
      },
      date: '2024-01-04',
      tags: ['train', 'public transport'],
    },
  ]);
  showAddExpenseModal = signal(false);
  showSummary = signal(false);
  showBtnText = computed(() => {
    console.log('summaryBtnText');
    return this.showSummary() ? 'Hide summary' : 'Show summary';
  });
  totalInclVat = computed(() =>
    this.showSummary()
      ? this.expenses().reduce(
          (total, { amount: { amountExclVat, vatPercentage } }) =>
            (amountExclVat / 100) * (100 + vatPercentage) + total,
          0
        )
      : null
  );
  modalTitle = 'Add expenses';

  e = effect(() => {
    console.log('effect', this.showSummary());
  });

  onSummaryChange() {
    this.showSummary.update((showSummary) => !showSummary);
  }

  onAddExpense(expenseToAdd: ExpenseModel): void {
    this.expenses.update((expenses) => [...expenses, expenseToAdd]);
    this.showAddExpenseModal.set(false);
  }
}
