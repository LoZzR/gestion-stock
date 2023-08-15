import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MainComponent } from './shared/main/main.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { StoreListComponent } from './stores/store-list/store-list.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { StoreComponent } from './stores/store/store.component';
import { EditStoreComponent } from './stores/edit-store/edit-store.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalFocus } from './shared/modal-focus/modal-focus.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    MainComponent,
    EntrepriseComponent,
    StoreListComponent,
    ArticleListComponent,
    LoadingSpinnerComponent,
    StoreComponent,
    EditStoreComponent,
    NgbdModalFocus
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
