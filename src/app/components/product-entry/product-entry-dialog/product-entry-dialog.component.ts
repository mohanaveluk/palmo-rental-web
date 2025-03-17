import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-entry-dialog',
  templateUrl: './product-entry-dialog.component.html',
  styleUrls: ['./product-entry-dialog.component.scss']
})
export class ProductEntryDialogComponent {
  productForm: FormGroup;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product }
  ) {
    this.isEditing = !!data.product;
    this.productForm = this.fb.group({
      name: [data.product?.name || '', [Validators.required]],
      description: [data.product?.description || '', [Validators.required]],
      price: [data.product?.price || '', [Validators.required, Validators.min(0)]],
      stockQuantity: [data.product?.stockQuantity || '', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}