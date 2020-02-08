import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HabitsComponent } from './habits/habits.component';
import { HabitDetailComponent } from './habit-detail/habit-detail.component';
import { HabitDetailEditComponent } from './habit-detail-edit/habit-detail-edit.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: HabitsComponent },
  { path: 'habits', component: HabitsComponent },
  { path: 'detail/:id', component: HabitDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: HabitDetailEditComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }