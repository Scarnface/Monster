import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { CreateComponent } from "./create/create.component";
import { RevealComponent } from "./reveal/reveal.component";
import { BattleComponent } from "./battle/battle.component";

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'create', component:CreateComponent },
  { path: 'reveal', component:RevealComponent },
  { path: 'battle', component:BattleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
