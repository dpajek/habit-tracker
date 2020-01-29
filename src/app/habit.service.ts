import { Injectable } from '@angular/core';

import { Habit, Habit_Record } from './habit';

//import { HABITS } from './mock-habits';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class HabitService {

  /* 
  Define the heroesUrl of the form :base/:collectionName with the address of the heroes resource on the server. Here base is the resource to which requests are made, and collectionName is the heroes data object in the in-memory-data-service.ts.
  */
  private habitsUrl = 'api/habits';  // URL to web api
  private habitRecordUrl = 'api/habit_record';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, 
    private firestore: AngularFirestore) { }

  /*
  getHabits(): Observable<Habit[]>{
    return of(HABITS);
  }
  */

//
  /** GET habits from the server */
  getHabits (): Observable<Habit[]> {
    return this.firestore.collection('habits').snapshotChanges();
    //return this.http.get<Habit[]>(this.habitsUrl)
  }

  getHabitRecords (): Observable<Habit_Record[]> {
    return this.http.get<Habit_Record[]>(this.habitRecordUrl)
  }

  getHabitRecordsHabitId (habit_id: number): Observable<Habit_Record[]> {
    let params = new HttpParams().set('habit_id', habit_id.toString());
    return this.http.get<Habit_Record[]>(this.habitRecordUrl,{ params: params })
  }
  // chooses the variable based on the second part of the URL "habits"

  /*
  getHabitId(id: number): Observable<Habit> {
    return of(HABITS.find(habit => habit.id === id));
  }
  */

  /*
  Most web APIs support a get by id request in the form :baseURL/:id.

  Here, the base URL is the habitsURL defined in the Habits and HTTP section (api/habits) and id is the number of the habit that you want to retrieve. For example, api/habits/11.
  */

  // Adds to server and returns Habit with ID
  //addHabit(habit: Habit): Observable<Habit> {
  addHabit(habit: Habit) {
    return this.firestore.collection('habits').add(habit);
    /*return this.http.post<Habit>(
      this.habitsUrl, habit, this.httpOptions
    ); */
  }

  updateHabit(habit: Habit): Observable<Habit> {
    return this.http.put<Habit>(
      this.habitsUrl, habit, this.httpOptions
    );
  }

  addHabitRecord(habit_record: Habit_Record): Observable<Habit_Record> {
    return this.http.post<Habit_Record>(
      this.habitRecordUrl, habit_record, this.httpOptions
    );
  }

  deleteHabit_byID(id: number): Observable<{}> {
    const url = `${this.habitsUrl}/${id}`;
    return this.http.delete<Habit>(
      url, this.httpOptions
    );
  }

  deleteHabitRecord_byID(id: number): Observable<{}> {
    const url = `${this.habitRecordUrl}/${id}`;
    return this.http.delete<Habit_Record>(
      url, this.httpOptions
    );
  }

  getHabitId(id: number): Observable<Habit> {
    const url = `${this.habitsUrl}/${id}`;
    return this.http.get<Habit>(url);
  }

  getHabitIdsCompletedToday(): Observable<number[]> {
    
    return this.http.get<number[]>(this.habitRecordUrl);
  }

}