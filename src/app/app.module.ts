import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Scroll } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';


import { AppComponent } from './app.component';
import { ProductEntryComponent } from './components/product-entry/product-entry.component';
import { OrderEntryComponent } from './components/order-entry/order-entry.component';
import { OrderThankYouComponent } from './components/order-thank-you/order-thank-you.component';
import { OrderDashboardComponent } from './components/order-dashboard/order-dashboard.component';
import { OrderViewDialogComponent } from './components/order-view-dialog/order-view-dialog.component';
import { OrderEditDialogComponent } from './components/order-edit-dialog/order-edit-dialog.component';
import { LandingComponent } from './components/landing/landing.component';

import { AppRoutingModule } from './app-routing.module';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { ModernHomeComponent } from './components/modern-home/modern-home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { ImageDialogComponent } from './components/product-gallery/image-dialog/image-dialog.component';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { PagesComponent } from './pages/pages.component';
import { Nav2Component } from './shared/components/nav2/nav2.component';
import { ProductEntryDialogComponent } from './components/product-entry/product-entry-dialog/product-entry-dialog.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductPricingComponent } from './components/product-pricing/product-pricing.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FaceDetectionComponent } from './components/face-detection/face-detection.component';
import { FaceDetectionComponent1 } from './components/face-detection1/face-detection.component1';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ProductEntryComponent,
    ProductEntryDialogComponent,
    OrderEntryComponent,
    OrderThankYouComponent,
    OrderDashboardComponent,
    OrderViewDialogComponent,
    OrderEditDialogComponent,
    OrderDetailsComponent,
    LandingHomeComponent,
    ModernHomeComponent,
    LandingComponent,
    ProductGalleryComponent,
    ImageDialogComponent,
    PagesComponent,
    Nav2Component,
    ProductPricingComponent,
    FooterComponent,
    FaceDetectionComponent,
    FaceDetectionComponent1
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    LayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    //MatLegacyChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  /*constructor(router: Router, viewportScroller: ViewportScroller) {
    router.events.pipe(
      filter((e): e is Scroll => e instanceof Scroll)
    ).subscribe(e => {
      if (e.position) {
        // backward navigation
        viewportScroller.scrollToPosition(e.position);
      } else if (e.anchor) {
        // anchor navigation
        viewportScroller.scrollToAnchor(e.anchor);
      } else {
        // forward navigation
        viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }*/
}