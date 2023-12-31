import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { map } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  account,
  rechargeAccount,
  transferAccount,
} from 'src/app/models/accountModels';
import { AccountService } from 'src/app/services/Account.service';
import { RechargeComponent } from '../recharge/recharge.component';
import { EditDescriptionComponent } from '../editDescription/editDescription.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { AccountPickerComponent } from '../accountPicker/accountPicker.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }],
})
export class TransferComponent implements OnInit {
  transactionForm = this.fb.group({
    transactionType: 'TRANSFER',
    fromAccountId: [0],
    toAccountId: [0],
    amount: ['0'],
    notes: [''],
    date: [new Date()],
  });
  selectedDate = new FormControl();

  fromAccount!: account;
  toAccount!: account | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected _data: account,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private accountService: AccountService,
    private rechargeDialogRef: MatDialogRef<RechargeComponent>
  ) {}

  ngOnInit() {
    this.fromAccount = this._data;
  }

  addNumber(num: string, event: Event) {
    event.preventDefault();
    if (this.transactionForm.controls.amount.value == '0') {
      this.transactionForm.controls.amount.setValue(num);
    } else {
      this.transactionForm.controls.amount.setValue(
        this.transactionForm.controls.amount.value + num
      );
    }
  }

  removeLastNumber(event: Event) {
    event.preventDefault();
    const amount = this.transactionForm.controls['amount'].value;

    if (amount !== null && amount !== '0') {
      let amountArr = amount.split('');
      if (amountArr[amountArr.length - 1] === '.') {
        amountArr.pop();
        amountArr.pop();
      } else if (amountArr.length == 1) {
        amountArr = ['0'];
      } else {
        amountArr.pop();
      }
      this.transactionForm.controls.amount.setValue(amountArr.join(''));
    }
  }

  openEditDescDialog() {
    const descRef = this.dialog.open(EditDescriptionComponent, {
      width: '80%',
      data: {
        title: 'Description',
        desc: this.transactionForm.controls.notes.value,
      },
      position: {
        top: '100px',
      },
    });

    descRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.transactionForm.controls.notes.setValue(data.desc);
      }
    });
  }

  openFromAccountPicker() {
    let accounts: account[] = [];
    this.accountService
      .getAllAccounts()
      .subscribe((accountsFromDB: account[]) => {
        // if(this.toAccount != null) {
        accounts = accountsFromDB.filter(
          (account: account) => account.accountId !== this.toAccount?.accountId
        );
        // }
        console.log(accounts);

        const transferDialogRef = this.dialog.open(AccountPickerComponent, {
          data: accounts,
        });
      });
  }

  openToAccountPicker() {
    let accounts: account[] = [];
    this.accountService
      .getAllAccounts()
      .subscribe((accountsFromDB: account[]) => {
        accounts = accountsFromDB.filter(
          (account: account) => account.accountId !== this.fromAccount.accountId
        );
        const transferDialogRef = this.dialog.open(AccountPickerComponent, {
          data: accounts,
        });
      });
  }

  openDatepicker(event: Event) {
    event.preventDefault();
  }

  saveTransfer(event: Event) {
    event.preventDefault();
    const data = this.transactionForm.value as transferAccount;
    data.date = new Date(data.date);

    console.log(data);
  }
}
