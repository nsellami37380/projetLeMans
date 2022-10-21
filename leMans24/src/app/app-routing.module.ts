import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { PilotDetailsComponent } from './components/pilot-details/pilot-details.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { PageContainerListComponent } from './pages/page-container-list/page-container-list.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';

const routes: Routes = [
  {path:'', component: PageHomeComponent },
  {path:'home', component: PageHomeComponent },
  {path:'container-list/:var', component: PageContainerListComponent},
  {path:'container-list/:var', component: PageContainerListComponent},
  {path:'container-list/:var', component: PageContainerListComponent},
  {path:'container-list/:var/pilot-detail/:id', component: PilotDetailsComponent},
  {path:'container-list/:var/car-detail/:id', component: CarDetailsComponent},
  {path:'container-list/:var/team-detail/:id', component: TeamDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
