import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ProfileVisitorComponent } from './profile-visitor/profile-visitor.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchCommunityComponent } from './search-community/search-community.component';

const routes: Routes = [{
  path: '', component: HomeComponent
},{
  path: 'login', component: LoginComponent
},{
  path: 'music-lab', component:MarketplaceComponent
}, {
  path:'community', component: SearchCommunityComponent
}, {
  path: 'chat', component: ChatComponent
}, {
  path: 'profile/:username', component: ProfileComponent
}, {
  path: 'profile/:username/visit', component: ProfileVisitorComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
