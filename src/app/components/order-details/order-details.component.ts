import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: Order | null = null;
  isLoading = false;
  displayedColumns: string[] = ['product', 'quantity', 'price', 'total'];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadOrder(params['id']);
      }
    });
  }

  private loadOrder(id: string): void {
    this.isLoading = true;
    this.orderService.getOrder(id).subscribe({
      next: (order) => {
        this.order = order;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading order details', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  getDaysDifference(): number {
    if (!this.order) return 0;
    const start = new Date(this.order.rentalStartDate);
    const end = new Date(this.order.rentalEndDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }
}