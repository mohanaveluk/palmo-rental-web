import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-pricing',
  templateUrl: './product-pricing.component.html',
  styleUrls: ['./product-pricing.component.scss']
})
export class ProductPricingComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  categories = [
    { id: 'chairs', name: 'Chairs', icon: 'event_seat' },
    { id: 'tables', name: 'Tables', icon: 'table_restaurant' },
    { id: 'flowers', name: 'Flowers', icon: 'local_florist' },
    { id: 'jewelry', name: 'Jewelry', icon: 'diamond' }
  ];
  selectedCategory: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
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

  filterByCategory(categoryId: string | null): void {
    this.selectedCategory = categoryId;
  }

  navigateToOrder(): void {
    this.router.navigate(['/orders/new']);
  }

  getProductCategory(product: Product): string {
    const productName = product.name.toLowerCase();
    if (productName.includes('chair')) return 'chairs';
    if (productName.includes('table')) return 'tables';
    if (productName.includes('flower') || productName.includes('floral')) return 'flowers';
    if (productName.includes('jewelry') || productName.includes('necklace')) return 'jewelry';
    return 'other';
  }

  getCategoryIcon(product: Product): string {
    const category = this.categories.find(c => c.id === this.getProductCategory(product));
    return category ? category.icon : 'inventory_2';
  }
  
  get filteredProducts(): Product[] {
    if (!this.selectedCategory) return this.products;
    return this.products.filter(product => 
      this.getProductCategory(product) === this.selectedCategory
    );
  }
}