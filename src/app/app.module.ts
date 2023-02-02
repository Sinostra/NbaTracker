import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TeamsSelectComponent } from './teams-select/teams-select.component';
import { TeamCardComponent } from './team-card/team-card.component';

import { NbaService } from './nba.service';
import { DatesService } from './dates.service';
import { GamesDetailsComponent } from './games-details/games-details.component';
import { StorageService } from './storage.service';


@NgModule({
  declarations: [
    AppComponent,
    TeamsSelectComponent,
    TeamCardComponent,
    GamesDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [NbaService, DatesService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }