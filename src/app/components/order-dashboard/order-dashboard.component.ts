import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { OrderViewDialogComponent } from '../order-view-dialog/order-view-dialog.component';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.scss']
})
export class OrderDashboardComponent implements OnInit {
  orders: Order[] = [];
  isLoading = false;
  currentPage = 0;
  hasMoreOrders = true;
  @ViewChild('ordersList', { static: false }) ordersList!: ElementRef;

  displayedColumns: string[] = [
    'createdAt',
    'customer',
    'rentalDates',
    'totalAmount',
    'status',
    'actions'
  ];

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    if (!this.hasMoreOrders || this.isLoading) return;

    this.isLoading = true;
    this.orderService.getOrders(this.currentPage).subscribe({
      next: (newOrders) => {
        this.orders = [...this.orders, ...newOrders];
        this.hasMoreOrders = newOrders.length === 20;
        this.currentPage++;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading orders', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onScroll(event: any): void {
    const element = event.target;
    if (
      element.scrollHeight - element.scrollTop <= element.clientHeight * 1.5 &&
      !this.isLoading &&
      this.hasMoreOrders
    ) {
      this.loadOrders();
    }
  }

  viewOrder(order: Order): void {
    this.dialog.open(OrderViewDialogComponent, {
      width: '650px',
      data: order
    });
  }

  cancelOrder(order: Order): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(order.id).subscribe({
        next: (updatedOrder) => {
          const index = this.orders.findIndex(o => o.id === order.id);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
            this.orders = [...this.orders];
          }
          this.snackBar.open('Order cancelled successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Error cancelling order', 'Close', { duration: 3000 });
        }
      });
    }
  }
}