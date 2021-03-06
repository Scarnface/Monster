import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { RevealComponent } from './reveal/reveal.component';
import { BattleComponent } from './battle/battle.component';
import { OutcomeComponent } from './outcome/outcome.component';
import { SharingService } from './services/sharing.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    RevealComponent,
    BattleComponent,
    OutcomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ SharingService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
