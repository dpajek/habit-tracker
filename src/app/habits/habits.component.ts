import { Component, OnInit } from '@angular/core';

import { Habit, Habit_Record, Recent_Date } from '../habit';

import { HabitService } from '../habit.service';

import { filter } from 'rxjs/operators';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

//import { Observable, of } from 'rxjs';
//import { map } from 'rxjs/operators';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent implements OnInit {

  habits: Habit[]; // declares as an array of type Habit
  //recent_habit_records: Habit_Record[]; // declares as an array of type Habit_Record
  num_recent_days: number = 5; // number of previous days to show

  recent_dates: Recent_Date[];
  completed_ids: number[];

  constructor(private habitService: HabitService) { }


  ngOnInit() {

    this.habitService.getHabits()
      .subscribe( data => {
        this.habits = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Habit;
        })  
        
        //habits => {
        //this.habits = habits;

        this.recent_dates = []; // fill in info for last x days for all habits
        this.completed_ids = []; // store habit ids for all completed habits

        for(let habit of this.habits) {
          this.fillRecentDates(habit.id);
        }

      });
  }

  fillRecentDates(habit_id: string): void {

    let habit_records : Habit_Record[] = [];

    this.habitService.getHabitRecordsHabitId(habit_id)
      .then(snapshot => {

        snapshot.ForEach(doc => {
          habit_records.push({
            id: doc.id,
            ...doc.data()
          } as Habit);
        })
      });

        var weekday = [];
        weekday[0] = "S";
        weekday[1] = "M";
        weekday[2] = "T";
        weekday[3] = "W";
        weekday[4] = "T";
        weekday[5] = "F";
        weekday[6] = "S";

        let current_date : Date = new Date;
        current_date.setHours(0,0,0,0);

        if(habit_records.filter((item: any) => {
          let prev_date = new Date(item.date);
          prev_date.setHours(0,0,0,0);
          return prev_date.getTime() === current_date.getTime();
        }).length > 0){
          this.completed_ids.push(habit_id);
        } // store ids for habits that have been completed

        for(var i = 0; i < this.num_recent_days; i++) {

          // set defaults for x recent days
          let recent_completed : boolean = false;

          let recent_date : Date = new Date(current_date.getTime() - (this.num_recent_days-i)*(24*60*60*1000));
          recent_date.setHours(0,0,0,0);

          if(habit_records.filter((item: any) => {
            let prev_date = new Date(item.date);
            prev_date.setHours(0,0,0,0);
            return prev_date.getTime() === recent_date.getTime();
          }).length > 0){
            recent_completed = true;
          } // set to true if date for this badge equals one of the habit_records

          let day_letter: string = "";
          day_letter = weekday[recent_date.getDay()];

          let item : Recent_Date = { id: i, habit_id: habit_id, completed: recent_completed, date: recent_date, day_letter: day_letter };

          this.recent_dates.push(item);
        }
      }); 

  }

  addHabit(name: String, description: String): void {
    name = name.trim();
    description = description.trim();
    let new_date : Date = new Date;
    if (!name) { return; }
    this.habitService.addHabit({ name, description, created_date: new_date } as Habit);

      //.subscribe(habit => {
        //this.habits.push(habit);
        //this.fillRecentDates(habit.id);
      //});
  }

  // true if passed habit is complete today (ie, habit record exists)
  isComplete(habit: Habit): boolean {
    let new_date : Date = new Date;
    new_date.setHours(0,0,0,0); // Strip timestamp from date

    //check for duplicate date
    return this.completed_ids.filter((item: any) => item === habit.id)
      .length > 0; 
  }

  // complete habit (make habit_record with date = today)
  completeHabit(habit : Habit): void {
    
    let new_date : Date = new Date;
    new_date.setHours(0,0,0,0); // Strip timestamp from date

    //check for duplicate date
    if(this.completed_ids.filter((item: any) => item === habit.id)
      .length > 0) return;

    let new_habit_record : Habit_Record = {habit_id: habit.id, date: new_date};

    this.habitService.addHabitRecord(new_habit_record)
      .subscribe(habit_record => 
        this.completed_ids.push(habit_record.habit_id));
  }
}