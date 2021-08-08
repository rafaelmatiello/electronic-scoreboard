import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';

const routes: Routes = [
  {
    path: 'board', component: ScoreboardComponent
  },
  { path: '', redirectTo: '/board', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
