import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductEntryDialogComponent } from './product-entry-dialog/product-entry-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.scss']
})
export class ProductEntryComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  displayedColumns: string[] = ['name', 'description', 'price', 'stockQuantity', 'actions'];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
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

  openProductDialog(product?: Product): void {
    const dialogRef = this.dialog.open(ProductEntryDialogComponent, {
      width: '600px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        if (product) {
          this.updateProduct(product.id, result);
        } else {
          this.createProduct(result);
        }
      }
    });
  }

  deleteProduct(product: Product): void {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      this.isLoading = true;
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.snackBar.open('Product deleted successfully', 'Close', { duration: 3000 });
          this.loadProducts();
        },
        error: (error) => {
          this.snackBar.open('Error deleting product', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }
  
  private createProduct(productData: Partial<Product>): void {
    this.isLoading = true;
    this.productService.createProduct(productData).subscribe({
      next: () => {
        this.snackBar.open('Product created successfully', 'Close', { duration: 3000 });
        this.loadProducts();
      },
      error: (error) => {
        this.snackBar.open('Error creating product', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  private updateProduct(id: string, productData: Partial<Product>): void {
    this.isLoading = true;
    this.productService.updateProduct(id, productData).subscribe({
      next: () => {
        this.snackBar.open('Product updated successfully', 'Close', { duration: 3000 });
        this.loadProducts();
      },
      error: (error) => {
        this.snackBar.open('Error updating product', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}