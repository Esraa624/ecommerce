import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
// import { BrandComponent } from './layout/pages/brand/brand.component';
import { CartComponent } from './layout/pages/cart/cart.component';
// import { LoginComponent } from './layout/pages/login/login.component';
// import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { CheckoutComponent } from './layout/additions/checkout/checkout.component';
import { WishlistComponent } from './layout/additions/wishlist/wishlist.component';


export const routes: Routes = [

    {path:" ",redirectTo:"home",pathMatch:'full'},
    {path:"home",component:HomeComponent,canActivate:[authGuard], title:"home" },
    {path:"brand",loadComponent:()=> import ('./layout/pages/brand/brand.component').then((c)=> c.BrandComponent),canActivate:[authGuard],title:"brand"},
    {path:"cart",component:CartComponent,canActivate:[authGuard],title:"cart"},
    {path:"wish list",component:WishlistComponent,canActivate:[authGuard],title:"wish list"},
    {path:"login",loadComponent:()=> import('./layout/pages/login/login.component').then((c)=> c.LoginComponent),title:"login"},
    {path:"categories",loadComponent:()=> import('./layout/pages/categories/categories.component').then((c)=> c.CategoriesComponent),canActivate:[authGuard],title:"categories"},
    {path:"product/:id",redirectTo:"product" , pathMatch:"full"  },
    {path:"product",component:ProductsComponent,canActivate:[authGuard] , title:"product" },
    {path:"register",component:RegisterComponent,title:"register"},
    {path:"forgetPassword",component:ForgetpasswordComponent, title:"forgetPassword"},
    {path:"productdetails/:pId",component:ProductDetailsComponent,canActivate:[authGuard],title:"productdetails"},
    {path:"checkout/:id",component:CheckoutComponent,canActivate:[authGuard],title:"checkout"},
    
    {path:"setting", loadChildren: ()=> import('./settings/settings.module').then((c)=> c.SettingsModule)},
    {path:"**",component:NotfoundComponent},
    
];
