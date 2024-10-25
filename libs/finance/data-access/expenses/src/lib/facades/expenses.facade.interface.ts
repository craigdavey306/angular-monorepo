import { Observable } from 'rxjs';
import { ExpenseModel, ExpensesViewModel } from '../models/expenses.interface';
import { Signal } from '@angular/core';

export interface ExpensesFacadeInterface {
  expenseSelector$: Observable<ExpenseModel>;
  selectedExpense: Signal<ExpenseModel | null>;
  inclVat: Signal<boolean>;
  expenses: Signal<ExpensesViewModel>;
  addExpense: (expense: ExpenseModel) => void;
  adjustVat: () => void;
  clearExpenseSelection: () => void;
  fetchExpenses: () => void;
  getExpense: (id: number) => void;
  resetExpenseState: () => void;
  updateExpense: (expense: ExpenseModel) => void;
}
