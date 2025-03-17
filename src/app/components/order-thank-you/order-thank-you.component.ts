import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-thank-you',
  templateUrl: './order-thank-you.component.html',
  styleUrls: ['./order-thank-you.component.scss']
})
export class OrderThankYouComponent implements OnInit{
  id: string = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.id = history.state.id;
    console.log('Received ID:', this.id);
  }

  viewOrders(): void {
    this.router.navigate(['/orders', this.id]);
  }

  createNewOrder(): void {
    this.router.navigate(['/orders/new']);
  }
}