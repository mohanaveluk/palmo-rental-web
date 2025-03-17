import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-view-dialog',
  templateUrl: './order-view-dialog.component.html',
  styleUrls: ['./order-view-dialog.component.scss']
})
export class OrderViewDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public order: Order) {}
}