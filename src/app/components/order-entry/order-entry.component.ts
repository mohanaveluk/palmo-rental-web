import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.scss']
})
export class OrderEntryComponent implements OnInit, AfterViewInit  {
  orderForm: FormGroup;
  products: Product[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private snackBar: MatSnackBar
  ) {
    this.orderForm = this.fb.group({
      customer: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        emailId: ['', [Validators.required, Validators.email]],
        mobileNumber: ['', Validators.required],
        address: ['', Validators.required],
        aptSuite: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      rentalStartDate: ['', Validators.required],
      rentalEndDate: ['', Validators.required],
      comments: [''],
      orderDetails: this.fb.array([])
    });
    setTimeout(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    }, 0);
  }

  ngOnInit(): void {
    this.loadProducts();
    this.addOrderDetail();
    this.viewportScroller.scrollToPosition([0, 0]);
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    const scrollContainer = document.querySelector('.custom-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
    this.viewportScroller.scrollToAnchor('top-anchor');
    window.scrollTo(0, 0);
  }

  get orderDetails(): FormArray {
    return this.orderForm.get('orderDetails') as FormArray;
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  addOrderDetail(): void {
    const orderDetail = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.orderDetails.push(orderDetail);
  }

  removeOrderDetail(index: number): void {
    this.orderDetails.removeAt(index);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.isLoading = true;
      this.orderService.createOrder(this.orderForm.value).subscribe({
        next: (order) => {
          this.router.navigate(['/orders/thank-you'], { state: { id: order.id } });
        },
        error: (error) => {
          this.snackBar.open('Error creating order', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}