import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HabitsComponent } from './habits/habits.component';

import { AppRoutingModule }     from './app-routing.module';
import { HabitDetailComponent } from './habit-detail/habit-detail.component';
import { HabitService } from './habit.service';

import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { HabitCalendarComponent } from './habit-calendar/habit-calendar.component';

import { XunkCalendarModule} from 'xunk-calendar';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HabitDetailEditComponent } from './habit-detail-edit/habit-detail-edit.component';


@NgModule({
  imports:  [ BrowserModule, FormsModule, AppRoutingModule, 
              HttpClientModule,

              // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
              // and returns simulated server responses.
              // Remove it when a real server is ready to receive requests.
              HttpClientInMemoryWebApiModule.forRoot(
                InMemoryDataService, { dataEncapsulation: false }
              ),
              XunkCalendarModule,
              MDBBootstrapModule.forRoot()
            ],
  declarations: [ AppComponent, HelloComponent, HabitsComponent, HabitDetailComponent, HabitCalendarComponent, HabitDetailEditComponent],
  bootstrap:    [ AppComponent ],
  providers: [HabitService, InMemoryDataService]
})
export class AppModule { }
