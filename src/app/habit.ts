export class Habit {
    id: string;
  name: string;
  description: string;
  created_date: Date;
}

export class Habit_Record {
      id: string;
habit_id: string;
    date: Date;
}

export class Recent_Date {
    habit_id: string; 
    completed: boolean;
    date: Date;
    day_letter: string; // used as an indicator of day of week
}
