import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-edit-dialog',
  templateUrl: './order-edit-dialog.component.html',
  styleUrls: ['./order-edit-dialog.component.scss']
})
export class OrderEditDialogComponent {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrderEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {
    this.orderForm = this.fb.group({
      rentalStartDate: [data.rentalStartDate, Validators.required],
      rentalEndDate: [data.rentalEndDate, Validators.required],
      comments: [data.comments]
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.dialogRef.close(this.orderForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}