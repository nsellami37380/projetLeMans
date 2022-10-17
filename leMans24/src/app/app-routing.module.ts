import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageContainerListComponent } from './pages/page-container-list/page-container-list.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';

const routes: Routes = [
  {path:'', component: PageHomeComponent },
  {path:'home', component: PageHomeComponent },
  {path:'container-list/:var', component: PageContainerListComponent},
  {path:'container-list/:var', component: PageContainerListComponent},
  {path:'container-list/:var', component: PageContainerListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
