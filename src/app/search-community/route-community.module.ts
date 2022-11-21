import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceComponent } from '../marketplace/marketplace.component';
import { ProfileComponent } from '../profile/profile.component';


const routes: Routes = [{
  path: 'profile/:username', component: ProfileComponent
},{
  path: 'music-lab', component:MarketplaceComponent
},];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class RouteCommunityModule { }
