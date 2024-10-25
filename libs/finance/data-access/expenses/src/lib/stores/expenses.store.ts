import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ExpenseModel } from '../models/expenses.interface';
import { ExpenseHttpService } from '../http/expenses.http';

@Injectable({
  providedIn: 'root',
})
export class ExpensesStore {
  protected expensesApi = inject(ExpenseHttpService);

  private expense: Subject<ExpenseModel> = new Subject();
  expense$: Observable<ExpenseModel> = this.expense.asObservable();

  private expenses = new BehaviorSubject<ExpenseModel[]>([]);
  expenses$ = this.expenses.asObservable();

  private selectedExpense: BehaviorSubject<ExpenseModel | null> =
    new BehaviorSubject<ExpenseModel | null>(null);
  selectedExpense$ = this.selectedExpense.asObservable();

  private get currentExpenses() {
    return this.expenses.value;
  }

  addExpense(expense: ExpenseModel): void {
    this.expensesApi.post(expense).subscribe({
      next: (addedExpense) => {
        addedExpense.id = !addedExpense.id
          ? this.currentExpenses.length + 1
          : addedExpense.id;
        this.expenses.next([...this.currentExpenses, addedExpense]);
      },
      error: (err) => {
        console.log('addExpense error ==>', err);
      },
    });
  }

  deleteExpense(id: number): void {
    this.expensesApi.delete(id).subscribe({
      next: () => {
        this.expenses.next(
          this.currentExpenses.filter((expense) => expense.id !== id)
        );
      },
      error: (err) => {
        console.log('deleteExpense error ==>', err);
      },
    });
  }

  fetchExpenses(): void {
    this.expensesApi.get().subscribe({
      next: (expenses) => {
        this.expenses.next(expenses);
      },
      error: (err) => {
        console.log('fetchExpenses error ==> ', err);
      },
    });
  }

  getExpense(id: number): void {
    const expense = this.currentExpenses.find((expense) => expense.id === id);
    expense ? this.expense.next(expense) : this.fetchExpenseById(id, true);
  }

  selectExpense(id: number): void {
    const expense = this.currentExpenses.find((expense) => expense.id === id);
    expense
      ? this.selectedExpense.next(expense)
      : this.fetchExpenseById(id, true);
  }

  private fetchExpenseById(id: number, select = false) {
    this.expensesApi.getById(id).subscribe({
      next: (expense) => {
        select
          ? this.selectedExpense.next(expense)
          : this.expense.next(expense);
      },
      error: (err) => {
        console.log('fetchExpenseById error ==> ', err);
      },
    });
  }
}
