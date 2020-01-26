import { Component, OnInit, Input } from '@angular/core';

import { XunkCalendarModule} from 'xunk-calendar';

@Component({
  selector: 'app-habit-calendar',
  templateUrl: './habit-calendar.component.html',
  styleUrls: ['./habit-calendar.component.css']
})
export class HabitCalendarComponent implements OnInit {

  @Input() heatmap: any;
  
  public selDate = { date:1, month:1, year:1 };
  //public heatmap = {} as any;

  test2 : string = 'start';

  constructor() { }

  ngOnInit() {
    this.selDate = XunkCalendarModule.getToday();
    //this.heatmap = this.genDemoHeatmap();

    this.test2 = 'hello';
  }


    /** Generates a demo heatmap */
    /*
  genDemoHeatmap(): any {
    const year = new Date().getFullYear();
    const heatmap = {};
    for (let m = 1; m <= 12; m++) {
      const month = XunkCalendarModule.zeroPad(m, 2);
      // const entries = {'02': 1.0, '06': 0.1, '08': 0.4, '13': 0.7, '15': 0.3, '21': 0.1, '24': 0.5} as any;
      const entries = {'13': 0.7} as any;
      for (const key in entries) {
        if (key in entries) {
          heatmap[Number(year.toString() + month.toString() + key)] = entries[key];
        }
      }
    }
    heatmap[Number('2019' + '12' + '11')]=0.7;
    return heatmap;
  }
  */

}