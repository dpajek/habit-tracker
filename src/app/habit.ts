export class Habit {
    id: number;
  name: string;
  description: string;
  created_date: Date;
}

export class Habit_Record {
      id: number;
habit_id: number;
    date: Date;
}

export class Recent_Date {
    habit_id: number; 
    completed: boolean;
    date: Date;
    day_letter: string; // used as an indicator of day of week
}
