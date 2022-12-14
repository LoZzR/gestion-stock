import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './shared/main/main.component';
import { StoreListComponent } from './stores/store-list/store-list.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "signin", component: LoginComponent },
  { path: "signup", component: RegisterComponent },
  { path: "main", component: MainComponent, children: [
    { path: "", component: WelcomeComponent },
    { path: "entreprise", component: EntrepriseComponent },
    { path: "magasins", component: StoreListComponent },
    { path: "articles", component: ArticleListComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
