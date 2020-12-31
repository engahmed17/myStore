import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsProductComponent } from './details-product/details-product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { NoauthGuardService } from './services/guard/noauth-guard.service';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login',component:LoginComponent,canActivate:[NoauthGuardService]},
  {path:'register',component:RegisterComponent,canActivate:[NoauthGuardService]},
  {path:'profil',component:ProfilComponent,canActivate:[AuthGuardService]},
  {path:'products',component:ProductsComponent,canActivate:[AuthGuardService]},
  {path:'myproducts',component:MyproductsComponent,canActivate:[AuthGuardService]},
  {path:'product/:id',component:DetailsProductComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
