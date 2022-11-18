import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { SearchCommunityComponent } from './search-community/search-community.component';
import { ChatComponent } from './chat/chat.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { ProfileVisitorComponent } from './profile-visitor/profile-visitor.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SearchCommunityComponent,
    ChatComponent,
    MarketplaceComponent,
    ProfileComponent,
    ProfileVisitorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule  
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
