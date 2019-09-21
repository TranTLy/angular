import { CategoryService } from './services/category/category.service';
import { LoginComponent } from './component/user/login/login.component';
import { AdminAuthGuardService } from './services/admin-auth-guard/admin-auth-guard.service';
import { UserService } from './services/user-service/user.service';
import { AuthService } from './services/auth-service/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { RouterModule, CanActivate } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './component/user/bs-navbar/bs-navbar.component';
import { ProductsComponent } from './component/user/products/products.component';
import { ShopppingCartComponent } from './component/user/shoppping-cart/shoppping-cart.component';
import { CheckOutComponent } from './component/user/check-out/check-out.component';
import { OrderSuccessComponent } from './component/user/order-success/order-success.component';
import { MyOrderComponent } from './component/user/my-order/my-order.component';
import { AdminProductsComponent } from './component/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './component/admin/admin-orders/admin-orders.component';
import { HomeComponent } from './component/user/home/home.component';
import { ProductFormComponent } from './component/admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular5-data-table';
import { ProductFilterComponent } from './component/user/product-filter/product-filter.component';
import { ProductCardComponent } from './component/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    ProductsComponent,
    ShopppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    HomeComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CustomFormsModule,
    NgbModule,
    FormsModule,
    DataTableModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShopppingCartComponent },

      {
        path: 'check-out', component: CheckOutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'order-success', component: OrderSuccessComponent,
        canActivate: [AuthGuardService]
      },
      { path: 'my-order', component: MyOrderComponent, canActivate: [AuthGuardService] },

      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService] }
    ])
  ],
  providers: [
    AuthGuardService,
    AuthService,
    AdminAuthGuardService,
    UserService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
