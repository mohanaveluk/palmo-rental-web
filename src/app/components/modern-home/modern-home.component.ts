import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT, ViewportScroller } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NavigationEnd, Router } from '@angular/router';

interface CategoryImage {
  url: string;
  alt: string;
}

interface Category {
  name: string;
  description: string;
  images: CategoryImage[];
  features: string[];
  currentImageIndex: number;
}

@Component({
  selector: 'app-modern-home',
  templateUrl: './modern-home.component.html',
  styleUrls: ['./modern-home.component.scss']
})
export class ModernHomeComponent implements OnInit {
  //headerImage = 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1920&q=80';
  headerImage = './assets/images/designer4.jpg';
  
  categories = [
    {
      title: 'Elegant Seating',
      image: './assets/images/seating.jpg', //'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=80',
      description: 'Luxurious chairs and seating arrangements for all occasions'
    },
    {
      title: 'Premium Tables',
      image: 'https://m.media-amazon.com/images/I/81H+dP3BAbL._AC_UF894,1000_QL80_.jpg',
      description: 'High-quality tables for dining and decoration'
    },
    {
      title: 'Floral Artistry',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
      description: 'Beautiful artificial flowers and garlands'
    },
    {
      title: 'Traditional Jewelry',
      image: './assets/images/jewel.jpg', //'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80',
      description: 'Exquisite Indian jewelry collection for special occasions'
    }
  ];

  categories1: Category[] = [
    {
      name: 'Luxury Chairs',
      description: 'Elegant seating solutions for weddings, events, and special occasions. Our premium chairs add sophistication to any gathering.',
      images: [
        { url: 'https://images.unsplash.com/photo-1506326426992-32b61983f2fd?auto=format&fit=crop&q=80&w=800', alt: 'Gold Chiavari Chair' },
        { url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800', alt: 'White Wedding Chair' },
        { url: 'https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/6668142/6668142_o01_112020/6668142', alt: 'Luxury Event Chair' }
      ],
      features: ['Chiavari Chairs', 'Wedding Chairs', 'Banquet Seating', 'Designer Lounge Chairs'],
      currentImageIndex: 0
    },
    {
      name: 'Premium Tables',
      description: 'Exquisite tables for every occasion. From intimate gatherings to grand celebrations, our collection suits all needs.',
      images: [
        { url: 'https://premiereeventsonline.com/wp-content/uploads/2014/03/White-Cottonique-Gold-Chiavari-Chairs-Caroline-Lima-Photography.jpg', alt: 'Banquet Table Setup' },
        { url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800', alt: 'Round Table Setup' },
        { url: 'https://www.alliedpartyrentals.com/wp-content/uploads/2023/05/round-tables-1.jpg', alt: 'Cocktail Table' }
      ],
      features: ['6ft Rectangular Tables', '8ft Rectangular Tables', 'Round Tables', 'Cocktail Tables'],
      currentImageIndex: 0
    },
    {
      name: 'Artificial Flowers & Garlands',
      description: 'Vibrant, lifelike flowers and garlands that bring eternal beauty to your events. Perfect for any season or theme.',
      images: [
        { url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800', alt: 'Floral Arrangement' },
        { url: 'https://mall2mart.com/cdn/shop/files/810-RXPxnpL_800x.jpg?v=1725448665', alt: 'Mala Garland' },
        { url: 'https://5.imimg.com/data5/OU/RG/LP/SELLER-82006211/wedding-garland.jpg', alt: 'Floral Arch' },
        { url: 'https://i.ebayimg.com/images/g/cSYAAOSwL5ZnkgfD/s-l1200.jpg', alt: 'Table Centerpiece' },
        { url: 'https://mall2mart.com/cdn/shop/files/810-RXPxnpL_800x.jpg?v=1725448665', alt: 'Floral Arch' }
      ],
      features: ['Wedding Arrangements', 'Decorative Garlands', 'Table Centerpieces', 'Floral Arches'],
      currentImageIndex: 0
    },
    {
      name: 'Fashion Jewelry',
      description: 'Contemporary jewelry pieces that add sparkle to any outfit. Perfect for special events and everyday elegance.',
      images: [
        { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800', alt: 'Statement Necklace' },
        { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800', alt: 'Fashion Ring' },
        { url: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800', alt: 'Bridal Set' }
      ],
      features: ['Statement Necklaces', 'Designer Earrings', 'Bracelet Sets', 'Fashion Rings'],
      currentImageIndex: 0
    }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      event: 'Wedding Reception',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      comment: 'The quality of their rental items exceeded our expectations. Everything was perfect!',
      rating: 5
    },
    {
      name: 'Priya Patel',
      event: 'Engagement Ceremony',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
      comment: 'Beautiful traditional decorations and jewelry. Made our day truly special.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      event: 'Corporate Event',
      image: 'https://images.unsplash.com/photo-1557555187-23d685287bc3?auto=format&fit=crop&q=80&w=200',
      comment: 'Professional service and high-quality equipment. Will definitely use again.',
      rating: 5
    }
  ];

  constructor(
      private router: Router,
      private viewportScroller: ViewportScroller,
      @Inject(DOCUMENT) private document: Document
    ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });    
  }


  navigateToOrder() {
    this.document.defaultView?.scrollTo(0, 0);
    this.router.navigate(['/orders/new']);
  }

  navigateToGallery() {
    this.document.defaultView?.scrollTo(0, 0);
    this.router.navigate(['/products/gallery']);
  }

  nextImage(category: Category, event: Event) {
    event.stopPropagation();
    category.currentImageIndex = (category.currentImageIndex + 1) % category.images.length;
  }

  previousImage(category: Category, event: Event) {
    event.stopPropagation();
    category.currentImageIndex = (category.currentImageIndex - 1 + category.images.length) % category.images.length;
  }

}