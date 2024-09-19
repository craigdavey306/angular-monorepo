import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddExpenseReactive } from './add-expense.interface';
import { maxWordCountValidator } from '@bt-libs/shared/util/form-validators';

@Component({
  selector: 'bt-libs-ui-add-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseComponent {
  @Input()
  public set expenseToAdd(value: AddExpenseReactive) {
    this.addExpenseForm.patchValue(value);

    this.addExpenseForm.controls.tags.clear();
    value.tags?.forEach((tag) => {
      this.addExpenseForm.controls.tags.push(new FormControl(tag));
    });
  }

  @Output() addExpense = new EventEmitter<AddExpenseReactive>();

  addExpenseForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      maxWordCountValidator(3),
    ]),
    amount: new FormGroup({
      amountExlcVat: new FormControl<number | null>(null, [
        Validators.required,
      ]),
      vatPercentage: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    }),
    date: new FormControl([''], [Validators.required]),
    tags: new FormArray([new FormControl('')]),
  });

  addTag() {
    this.addExpenseForm.controls.tags.insert(0, new FormControl(''));
  }

  removeTag(index: number) {
    this.addExpenseForm.controls.tags.removeAt(index);
  }
}
