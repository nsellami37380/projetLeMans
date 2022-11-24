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
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {MenubarModule} from 'primeng/menubar';
import {CarouselModule} from 'primeng/carousel';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import {InputTextModule} from 'primeng/inputtext';
import {DatePipe} from '@angular/common';
import { AuthInterceptor } from './core/auth.interceptor';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';
import {ProgressSpinnerModule} from 'primeng/progressspinner';



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
    PageNotFoundComponent,
    SponsorComponent,
    FormLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DropdownModule,
    MenubarModule,
    CarouselModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    ToastModule,
    RippleModule,
    ProgressSpinnerModule,
  ],
  providers: [DatePipe,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
