import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HabitsComponent } from './habits/habits.component';
import { HabitDetailComponent } from './habit-detail/habit-detail.component';
import { HabitDetailEditComponent } from './habit-detail-edit/habit-detail-edit.component';

const routes: Routes = [
  { path: 'habits', component: HabitsComponent },
  { path: 'detail/:id', component: HabitDetailComponent },
  { path: 'edit/:id', component: HabitDetailEditComponent },
  { path: '', redirectTo: '/habits', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }