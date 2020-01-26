import { Component, OnInit } from '@angular/core';

import { Habit } from '../habit';

import { HabitService } from '../habit.service';

import { ActivatedRoute, Router } from '@angular/router';

import { NgModule } from '@angular/core'

@Component({
  selector: 'app-habit-detail-edit',
  templateUrl: './habit-detail-edit.component.html',
  styleUrls: ['./habit-detail-edit.component.css']
})
export class HabitDetailEditComponent implements OnInit {

  habit_id: number;
  habit: Habit;

  constructor(
    private habitService: HabitService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.getHabit();
  }

  getHabit(): void {
  //+ converts a string to a number
  //const id = +this.route.snapshot.paramMap.get('id');
  this.habit_id = +this.route.snapshot.paramMap.get('id');

  //subscribe to observable so it's async (place output into this.habit)
  this.habitService.getHabitId(this.habit_id)
    .subscribe(habit => this.habit = habit);
      
  }

  updateHabit(name: String, description: String): void {
    this.habit.name = name.trim();
    this.habit.description = description.trim();
    this.habitService.updateHabit(this.habit)
      .subscribe(habit => {
        this.router.navigate(['/detail/',this.habit_id]);
      });
  }

}