import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

interface GalleryItem {
  image: string;
  title: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent {
  galleryItems: GalleryItem[] = [
    {
      image: 'https://images.unsplash.com/photo-1506326426992-32b61983f2fd',
      title: 'Chiavari Chairs',
      description: 'Elegant gold Chiavari chairs perfect for weddings and formal events',
      category: 'Chairs'
    },
    {
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
      title: 'Banquet Tables',
      description: '6ft rectangular tables ideal for large gatherings',
      category: 'Tables'
    },
    {
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9',
      title: 'Floral Arrangements',
      description: 'Stunning artificial flower arrangements for any occasion',
      category: 'Flowers'
    },
    {
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908',
      title: 'Statement Necklaces',
      description: 'Elegant jewelry pieces for special events',
      category: 'Jewelry'
    },
    {
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267',
      title: 'Wedding Chairs',
      description: 'Beautiful white chairs for wedding ceremonies',
      category: 'Chairs'
    },
    {
      image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc',
      title: 'Round Tables',
      description: 'Elegant round tables for intimate gatherings',
      category: 'Tables'
    },
    {
      image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6',
      title: 'Table Centerpieces',
      description: 'Beautiful floral centerpieces for any table setting',
      category: 'Flowers'
    },
    {
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
      title: 'Fashion Jewelry Set',
      description: 'Complete jewelry sets for a coordinated look',
      category: 'Jewelry'
    },
    {
      image: 'https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/6668142/6668142_o01_112020/6668142',
      title: 'Chairs Collection',
      description: 'Elegant gold Regular chairs perfect for weddings and formal events',
      category: 'Chairs'
    },
    {
      image: 'https://www.alliedpartyrentals.com/wp-content/uploads/2023/05/round-tables-1.jpg',
      title: 'Premium Round Tables',
      description: 'Elegant gold Regular chairs perfect for weddings and formal events',
      category: 'Tables'
    },
    {
      image: 'https://mall2mart.com/cdn/shop/files/810-RXPxnpL_800x.jpg?v=1725448665',
      title: 'Mala Garland',
      description: 'Beautiful Handmade Mala Garland for Photo Frames | Plastic Artificial',
      category: 'Flowers'
    },
    {
      image: 'https://premiereeventsonline.com/wp-content/uploads/2014/03/White-Cottonique-Gold-Chiavari-Chairs-Caroline-Lima-Photography.jpg',
      title: 'Banquet Table Setup',
      description: 'Beautiful Handmade Mala Garland for Photo Frames | Plastic Artificial',
      category: 'Tables'
    },
    {
      image: 'https://5.imimg.com/data5/OU/RG/LP/SELLER-82006211/wedding-garland.jpg',
      title: 'Pink Garland',
      description: 'solawoodflowerluv Wood Flower Mala/Garland for Bride and Groom (Red and  White) : Amazon.in: Home & Kitchen',
      category: 'Flowers'
    },
    {
      image: 'https://i.ebayimg.com/images/g/cSYAAOSwL5ZnkgfD/s-l1200.jpg',
      title: 'Marigold Garland',
      description: 'Artificial Marigold Garland With Pom Pom & Bell For Home Decoration Pack Of  5 v3',
      category: 'Flowers'
    },
  ];

  categories: string[] = ['All', 'Chairs', 'Tables', 'Flowers', 'Jewelry'];
  selectedCategory: string = 'All';

  constructor(private dialog: MatDialog) {}

  get filteredItems(): GalleryItem[] {
    return this.selectedCategory === 'All'
      ? this.galleryItems
      : this.galleryItems.filter(item => item.category === this.selectedCategory);
  }

  openImageDialog(item: GalleryItem): void {
    this.dialog.open(ImageDialogComponent, {
      data: item,
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'image-dialog'
    });
  }

}