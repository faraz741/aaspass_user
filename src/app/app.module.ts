import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OtpLoginComponent } from './pages/otp-login/otp-login.component';
import { VerificationPageComponent } from './pages/verification-page/verification-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ShopDetailsComponent } from './pages/shop-details/shop-details.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './interceptor/cache.interceptor';
import { HttpClientModule } from '@angular/common/http';
// import { FilterCategoriesPipePipe } from './helper/filter-categories-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    OtpLoginComponent,
    VerificationPageComponent,
    SearchPageComponent,
    ShopDetailsComponent,
    // FilterCategoriesPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
