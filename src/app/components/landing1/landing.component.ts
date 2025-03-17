import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
  categories = [
    {
      name: 'Chairs',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
      description: 'Elegant chairs for all occasions - from classic dining to modern lounge chairs.'
    },
    {
      name: 'Tables',
      image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800',
      description: 'Wide variety of tables for dining, conferences, and special events.'
    },
    {
      name: 'Artificial Flowers',
      image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800',
      description: 'Beautiful, maintenance-free floral arrangements for any setting.'
    },
    {
      name: 'Artificial Jewelry',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
      description: 'Stunning costume jewelry for everyday wear and special occasions.'
    },
    {
      name: 'Bridal Jewelry',
      image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800',
      description: 'Exquisite bridal jewelry collections to make your special day perfect.'
    }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Event Planner',
      comment: 'The quality of their rental items is exceptional. Made my event planning so much easier!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Michael Chen',
      role: 'Wedding Coordinator',
      comment: 'Their bridal jewelry collection is stunning. My clients are always impressed.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Interior Designer',
      comment: 'The artificial flowers look so real! Perfect for my design projects.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
    }
  ];

  private imagesLoaded = false;

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // Initialize AOS with custom settings
   
  }

  ngAfterViewInit() {

  }

  private preloadImages(): Promise<void> {
    if (this.imagesLoaded) {
      return Promise.resolve();
    }

    const imageUrls = [
      ...this.categories.map(category => category.image),
      ...this.testimonials.map(testimonial => testimonial.image),
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=2000'
    ];

    const imageLoadPromises = imageUrls.map(url => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Continue even if image fails to load
        img.src = url;
      });
    });

    return Promise.all(imageLoadPromises).then(() => {
      this.imagesLoaded = true;
    });
  }

  private initializeAOS(): void {
    this.ngZone.runOutsideAngular(() => {
      // Force a reflow
      document.body.offsetHeight;
      




      // Clear interval after 5 seconds

    });
  }

  navigateToOrder() {
    this.router.navigate(['/orders/new']);
  }
}