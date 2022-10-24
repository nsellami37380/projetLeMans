import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { FormPilotComponent } from './components/form-pilot/form-pilot.component';
import { FormTeamComponent } from './components/form-team/form-team.component';
import { PilotDetailsComponent } from './components/pilot-details/pilot-details.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { PageContainerListComponent } from './pages/page-container-list/page-container-list.component';
import { PageFormComponent } from './pages/page-form/page-form.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';

const routes: Routes = [
  {path:'', component: PageHomeComponent },
  {path:'home', component: PageHomeComponent },
  {path:'addCar', component: PageFormComponent },
  {path:'addTeam', component: FormTeamComponent },
  {path:'addPilot', component: FormPilotComponent },
  {path:'category/:var', component: PageContainerListComponent},
  {path:'car-detail/:id', component: CarDetailsComponent},
  {path:'pilot-detail/:id', component: PilotDetailsComponent},
  {path:'team-detail/:id', component: TeamDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
