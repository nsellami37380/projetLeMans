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
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ContainerListComponent } from './components/container-list/container-list.component';
import { CardComponent } from './components/card/card.component';
import { PilotDetailsComponent } from './components/pilot-details/pilot-details.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { FormTeamComponent } from './components/form-team/form-team.component';
import { FormPilotComponent } from './components/form-pilot/form-pilot.component';
import { FormCarComponent } from './components/form-car/form-car.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PageHomeComponent,
    HomeComponent,
    PageContainerListComponent,
    PageFormComponent,
    SearchBarComponent,
    ContainerListComponent,
    CardComponent,
    PilotDetailsComponent,
    CarDetailsComponent,
    TeamDetailsComponent,
    FormTeamComponent,
    FormPilotComponent,
    FormCarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
