import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent {
  categories1 = [
    {
      name: 'Luxury Chairs',
      image: 'https://images.unsplash.com/photo-1506326426992-32b61983f2fd?auto=format&fit=crop&q=80&w=800',
      description: 'Elegant seating solutions for weddings, events, and special occasions. Our premium chairs add sophistication to any gathering.',
      features: ['Chiavari Chairs', 'Wedding Chairs', 'Banquet Seating', 'Designer Lounge Chairs']
    },
    {
      name: 'Premium Tables',
      image: 'https://images.unsplash.com/photo-1699190556821-68169095a62b?auto=format&fit=crop&q=80&w=800',
      description: 'Exquisite 6ft x 2.5ft rectangular tables for every occasion. From intimate gatherings to grand celebrations, our collection suits all needs.',
      features: ['6ft Rectangular Tables', '8ft Rectangular Tables', 'Round Tables', 'Cocktail Tables']
    },
    {
      name: 'Artificial Flowers & Garlands',
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800',
      description: 'Vibrant, lifelike flowers and garlands that bring eternal beauty to your events. Perfect for any season or theme.',
      features: ['Wedding Arrangements', 'Decorative Garlands', 'Table Centerpieces', 'Floral Arches']
    },
    {
      name: 'Fashion Jewelry',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
      description: 'Contemporary jewelry pieces that add sparkle to any outfit. Perfect for special events and everyday elegance.',
      features: ['Statement Necklaces', 'Designer Earrings', 'Bracelet Sets', 'Fashion Rings']
    },
    {
      name: 'Bridal Jewelry',
      image: 'https://images.unsplash.com/photo-1684868682581-4cac3af5b8d4?auto=format&fit=crop&q=80&w=800',
      description: 'Stunning bridal collections that make your special day unforgettable. Timeless pieces for the perfect bride.',
      features: ['Complete Bridal Sets', 'Tiaras & Crowns', 'Wedding Necklaces', 'Bridal Accessories']
    }
  ];
  
  categories: Category[] = [
    {
      name: 'Luxury Chairs',
      description: 'Elegant seating solutions for weddings, events, and special occasions. Our premium chairs add sophistication to any gathering.',
      images: [
        { url: 'https://images.unsplash.com/photo-1506326426992-32b61983f2fd?auto=format&fit=crop&q=80&w=800', alt: 'Gold Chiavari Chair' },
        { url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800', alt: 'White Wedding Chair' },
        { url: 'https://images.unsplash.com/photo-1561677978-583a8c7a4b43?auto=format&fit=crop&q=80&w=800', alt: 'Luxury Event Chair' }
      ],
      features: ['Chiavari Chairs', 'Wedding Chairs', 'Banquet Seating', 'Designer Lounge Chairs'],
      currentImageIndex: 0
    },
    {
      name: 'Premium Tables',
      description: 'Exquisite tables for every occasion. From intimate gatherings to grand celebrations, our collection suits all needs.',
      images: [
        { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800', alt: 'Banquet Table Setup' },
        { url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800', alt: 'Round Table Setup' },
        { url: 'https://images.unsplash.com/photo-1507484467459-544f5e438d44?auto=format&fit=crop&q=80&w=800', alt: 'Cocktail Table' }
      ],
      features: ['6ft Rectangular Tables', '8ft Rectangular Tables', 'Round Tables', 'Cocktail Tables'],
      currentImageIndex: 0
    },
    {
      name: 'Artificial Flowers & Garlands',
      description: 'Vibrant, lifelike flowers and garlands that bring eternal beauty to your events. Perfect for any season or theme.',
      images: [
        { url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800', alt: 'Floral Arrangement' },
        { url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800', alt: 'Table Centerpiece' },
        { url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800', alt: 'Floral Arch' }
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
      name: 'Isabella Martinez',
      role: 'Wedding Planner',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      comment: 'The quality of their rental items is exceptional. My brides are always thrilled with the elegant selection.'
    },
    {
      name: 'Sophie Anderson',
      role: 'Event Coordinator',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
      comment: 'Their attention to detail and customer service is unmatched. A trusted partner for all my events.'
    },
    {
      name: 'Emma Thompson',
      role: 'Interior Stylist',
      image: 'https://images.unsplash.com/photo-1557555187-23d685287bc3?auto=format&fit=crop&q=80&w=200',
      comment: 'The artificial flowers are incredibly realistic. Perfect for both temporary and permanent installations.'
    }
  ];

  features = [
    {
      icon: 'diamond',
      title: 'Premium Quality',
      description: 'Carefully curated collection of high-end rental items'
    },
    {
      icon: 'local_shipping',
      title: 'Professional Delivery',
      description: 'Timely delivery and setup by our expert team'
    },
    {
      icon: 'support_agent',
      title: 'Expert Support',
      description: 'Dedicated assistance throughout your rental period'
    },
    {
      icon: 'price_check',
      title: 'Competitive Pricing',
      description: 'Best value for premium quality rentals'
    }
  ];

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) {}
  
  ngOnInit() {
      
    }
  
    
    ngAfterViewInit() {

    }

  private initializeAOS() : void {
    this.ngZone.runOutsideAngular(() => {
      // Force a reflow
      document.body.offsetHeight;



      // Add scroll event listener to refresh AOS on scroll
      window.addEventListener('scroll', () => {

      }, { passive: true });



      // Clear interval after 5 seconds

    });
  }



  navigateToOrder() {
    this.router.navigate(['/orders/new']);
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