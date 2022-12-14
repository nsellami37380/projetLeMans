import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { HomeComponent } from './components/home/home.component';
import { PageContainerListComponent } from './pages/page-container-list/page-container-list.component';
import { PageFormComponent } from './pages/page-form/page-form.component';
import { PageDetailsComponent } from './pages/page-details/page-details.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ContainerListComponent } from './components/container-list/container-list.component';
import { CardComponent } from './components/card/card.component';
import { PilotDetailsComponent } from './components/pilot-details/pilot-details.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { FormTeamComponent } from './components/form-team/form-team.component';
import { FormPilotComponent } from './components/form-pilot/form-pilot.component';
import { FormCarComponent } from './components/form-car/form-car.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PageHomeComponent,
    HomeComponent,
    PageContainerListComponent,
    PageFormComponent,
    PageDetailsComponent,
    SearchBarComponent,
    ContainerListComponent,
    CardComponent,
    PilotDetailsComponent,
    CarDetailsComponent,
    TeamDetailsComponent,
    FormTeamComponent,
    FormPilotComponent,
    FormCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
