import { Component, OnInit } from '@angular/core';

import { Habit, Habit_Record, Recent_Date } from '../habit';

import { HabitService } from '../habit.service';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.component.html',
  styleUrls: ['./habit-detail.component.css']
})
export class HabitDetailComponent implements OnInit {

  habit_id: string;
  habit: Habit;
  habit_records: Habit_Record[]; // declares as an array of type 

  num_recent_days: number = 5; // number of previous days to show

  recent_dates: Recent_Date[];
  completed: boolean;

  public heatmap = {} as any;

  constructor(
    private habitService: HabitService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  pad(num:number, size:number): string {
      let s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
  }

  ngOnInit() {
    this.getHabit();

    this.recent_dates = []; // fill in info for last x days for all habits
    this.completed = false; // store habit ids for all completed habits

    //this.habitService.getHabitRecords()
    //this.habit_id
    this.habitService.getHabitRecords()
      .subscribe(data => {
          this.habit_records = data.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Habit_Record;
          })

          this.fillRecentDates(this.habit_id);
          
          //this.fillRecentDates();

          // get date habit was created
          let created_date = new Date(this.habit.created_date);

          // highlight created date on calendar
          this.heatmap[Number("" 
              + created_date.getFullYear() 
              + this.pad(created_date.getMonth()+1,2) 
              + this.pad(created_date.getDate(),2))] = 0.3;

          // loop through records, highlight completed dates
          for (let entry of this.habit_records) {
            let entry_date = new Date(entry.date);

            this.heatmap[Number("" 
              + entry_date.getFullYear() 
              + this.pad(entry_date.getMonth()+1,2) 
              + this.pad(entry_date.getDate(),2))] = 1;
          }
        }
      );

    
  }

  

  getHabit(): void {
    //+ converts a string to a number
    //const id = +this.route.snapshot.paramMap.get('id');
    this.habit_id = this.route.snapshot.paramMap.get('id');
    //this.habit = this.getHabitId(id)

    //this.habit = this.habitService.getHabitId(id)

    //subscribe to observable so it's async (place output into this.habit)

    /*
    this.habitService.getHabitId(this.habit_id)
      .subscribe(habit => this.habit = habit);
    */

    let habits : Habit[];

    this.habitService.getHabits()
      .subscribe( data => {
        habits = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Habit;
        })              
        this.habit = habits.find(item => {
          return item.id === this.habit_id;
        });
      });
      
  }


fillRecentDates(habit_id: string): void {

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

        if(this.habit_records.filter((item: any) => {
          let prev_date = new Date(item.date);
          prev_date.setHours(0,0,0,0);
          return prev_date.getTime() === current_date.getTime();
        }).length > 0){
          this.completed = true;
        } // store ids for habits that have been completed

        for(var i = 0; i < this.num_recent_days; i++) {

          // set defaults for x recent days
          let recent_completed : boolean = false;

          let recent_date : Date = new Date(current_date.getTime() - (this.num_recent_days-i)*(24*60*60*1000));
          recent_date.setHours(0,0,0,0);

          if(this.habit_records.filter((item: any) => {
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

  }


  addHabitRecord(): void {
    //if (!name) { return; }
    let new_date : Date = new Date;
    new_date.setHours(0,0,0,0); // Strip timestamp from date

    //check for duplicate date
    if(this.habit_records.filter((item: any) => {
        let prev_date = new Date(item.date);
        prev_date.setHours(0,0,0,0);
        return prev_date.getTime() === new_date.getTime();
      }).length > 0){
        return;
      }
        

    let new_habit_record : Habit_Record = {habit_id: this.habit_id, date: new_date};

    this.recent_dates = []; // fill in info for last x days for all habits
    this.completed = true;

    this.habitService.addHabitRecord(new_habit_record)

    /*
      .subscribe(habit_record => {
        this.habit_records.push(habit_record);
        this.completed = true;

        this.heatmap[Number("" 
              + new_date.getFullYear() 
              + this.pad(new_date.getMonth()+1,2) 
              + this.pad(new_date.getDate(),2))] = 1;
      });
    */

    //this.test = new_date.toString();
  }

  deleteHabit(): void {
    for (let habit_record of this.habit_records) {
      this.habitService.deleteHabitRecord_byID(habit_record.id)
      .subscribe();
    }

    this.habitService.deleteHabit_byID(this.habit_id)
      .subscribe();
    
    this.router.navigate(['/habits']);
  }
  

  deleteHabitRecord(): void {
    //if (!name) { return; }
    let new_date : Date = new Date;
    new_date.setHours(0,0,0,0); // Strip timestamp from date

    let habit_record = this.habit_records.filter((item: any) => {
        let prev_date = new Date(item.date);
        prev_date.setHours(0,0,0,0);
        return prev_date.getTime() === new_date.getTime();
      })[0];

    this.habitService.deleteHabitRecord_byID(habit_record.id)
      .subscribe();
    
    this.habit_records.pop();
    this.completed = false;

    this.heatmap[Number("" 
          + new_date.getFullYear() 
          + this.pad(new_date.getMonth()+1,2) 
          + this.pad(new_date.getDate(),2))] = 0;

    //this.test = new_date.toString();
  }

  // true if passed habit is complete today (ie, habit record exists)
  isComplete(habit: Habit): boolean {

    return this.completed; 
  }

/*
  getHabitId(id: number): Habit {
    return HABITS.find(habit => habit.id === id);
  }
*/

}