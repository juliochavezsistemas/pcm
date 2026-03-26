import {
  Pipe,
  PipeTransform
} from '@angular/core';
import TimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es';
import moment from 'moment-timezone';
TimeAgo.addDefaultLocale(es);

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: false
})

export class TimeAgoPipe
  implements PipeTransform {
  private timeAgo: TimeAgo

  constructor() {
    this.timeAgo = new TimeAgo('es')
  }

  transform(date: string | Date, currentTime: Date): string {
    const datePeru = moment.utc(date).tz('America/Lima')
    const difference = moment(currentTime).diff(datePeru, 'seconds')
    const value = this.timeAgo.format(moment(currentTime).valueOf() - difference * 1000, 'round-minute')
    return value
  }
}
