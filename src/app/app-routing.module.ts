import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductEntryComponent } from './components/product-entry/product-entry.component';
import { OrderEntryComponent } from './components/order-entry/order-entry.component';
import { OrderThankYouComponent } from './components/order-thank-you/order-thank-you.component';
import { OrderDashboardComponent } from './components/order-dashboard/order-dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { ModernHomeComponent } from './components/modern-home/modern-home.component';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { PagesComponent } from './pages/pages.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductPricingComponent } from './components/product-pricing/product-pricing.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FaceDetectionComponent } from './components/face-detection/face-detection.component';
import { FaceDetectionComponent1 } from './components/face-detection1/face-detection.component1';

const routes: Routes = [
  {
    path: "", component: PagesComponent, children: [
      { path: 'old', component: LandingHomeComponent },
      { path: '', component: ModernHomeComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'products/gallery', component: ProductGalleryComponent },
      { path: 'orders/new', component: OrderEntryComponent },
      { path: 'orders/thank-you', component: OrderThankYouComponent },
      { path: 'orders/:id', component: OrderDetailsComponent },
      { path: 'pricing', component: ProductPricingComponent },
    ]
  },
  {
    path: "admview", component: PagesComponent, children: [
      { path: '', component: ModernHomeComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'products', component: ProductEntryComponent },
      { path: 'products/gallery', component: ProductGalleryComponent },
      { path: 'orders/new', component: OrderEntryComponent },
      { path: 'orders/thank-you', component: OrderThankYouComponent },
      { path: 'ordersdb', component: OrderDashboardComponent },
      { path: 'orders/:id', component: OrderDetailsComponent },
      { path: 'pricing', component: ProductPricingComponent },
      { path: 'face-detection', component: FaceDetectionComponent },
      { path: 'face-detection1', component: FaceDetectionComponent1 }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {
      scrollPositionRestoration: 'top', // This will scroll to the top on every route change
      anchorScrolling: 'enabled',
      scrollOffset: [0, 0]
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }