import { Injectable } from '@angular/core';
import { GenericHttpService } from '@bt-libs/shared/data-access/generic-http';
import { ExpenseDto, ExpenseModel } from '../models/expenses.interface';
import { ExpensesModelAdapter } from '../adapters/expense.adapter';

const EXPENSE_ENDPOINT = '/expenses';

@Injectable({
  providedIn: 'root',
})
export class ExpenseHttpService extends GenericHttpService<
  ExpenseDto,
  ExpenseModel
> {
  constructor() {
    super(EXPENSE_ENDPOINT, '', new ExpensesModelAdapter());
  }
}
