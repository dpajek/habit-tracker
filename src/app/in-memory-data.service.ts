import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Habit, Habit_Record } from './habit';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  //constructor() { }

  createDb() {
    const habits = [
      { id: 11, name: 'Daily jog', description: 'Jog every day', created_date: '2019-12-10T05:00:00.000Z' },
      { id: 12, name: '10 PM bedtime', description: 'Be in bed by 10 PM daily', created_date: '2019-12-11T05:00:00.000Z' },
      { id: 13, name: 'Daily meditation', description: '20 minutes each day', created_date: '2019-12-12T05:00:00.000Z' },
      { id: 14, name: 'Daily SW dev', description: 'Spend 1 hour on dev each day', created_date: '2019-12-08T05:00:00.000Z' }
      ];
    const habit_record = [
      { id: 11, habit_id: 11, date: '2019-12-13T09:21:20.000Z' },
      { id: 12, habit_id: 11, date: '2019-12-15T15:21:20.000Z' },
      { id: 16, habit_id: 11, date: '2019-12-18T15:21:20.000Z' },
      { id: 17, habit_id: 11, date: '2019-12-19T15:21:20.000Z' },
      { id: 13, habit_id: 12, date: '2019-12-15T09:31:20.000Z' },
      { id: 14, habit_id: 12, date: '2019-12-17T05:51:20.000Z' },
      { id: 15, habit_id: 12, date: '2019-12-18T20:11:20.000Z' },
      { id: 18, habit_id: 12, date: '2019-12-20T20:11:20.000Z' },
      { id: 19, habit_id: 12, date: '2019-12-31T09:31:20.000Z' },
      { id: 20, habit_id: 12, date: '2020-01-20T05:51:20.000Z' },
      { id: 21, habit_id: 12, date: '2020-01-21T20:11:20.000Z' },
      { id: 22, habit_id: 12, date: '2020-01-23T20:11:20.000Z' },
      { id: 23, habit_id: 11, date: '2020-01-19T15:21:20.000Z' },
      { id: 24, habit_id: 11, date: '2020-01-21T15:21:20.000Z' },
      { id: 25, habit_id: 11, date: '2020-01-22T15:21:20.000Z' },
      { id: 26, habit_id: 13, date: '2020-01-24T15:21:20.000Z' }
      ];
    return {habits, habit_record};
  }

  // Overrides the genId method to ensure that a habit always has an id.
  // If the habits array is empty,
  // the method below returns the initial number (11).
  // if the habits array is not empty, the method below returns the highest
  // habit id + 1.

  /*
  genId(habits: Habit[]): number {
    return habits.length > 0 ? Math.max(...habits.map(habit => habit.id)) + 1 : 11;
  }
  */

  // Use a TypeScript Generic template to genID work for any type
  genId<T extends Habit | Habit_Record>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }

}