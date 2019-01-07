interface IDateTime {
  date: Date;
  timezone: string;
  allDay: boolean;
}

interface ICalendarComponent {
  readonly type: string;
  getText(key: string): string;
  getDateTime(key: string): IDateTime | null;
}

class CalendarComponent implements ICalendarComponent {
  private pValueStore: { [key: string]: { value: string; opt: string } } = {};
  private pType: string;

  constructor(type: string) {
    this.pType = type;
  }

  get type() {
    return this.pType;
  }

  push(key: string, opt: string, value: string): void {
    this.pValueStore[key] = { value: value, opt: opt };
  }

  getText(key: string): string {
    return unescape(this.pValueStore[key].value);
  }

  getDateTime(key: string): IDateTime | null {
    let value = this.pValueStore[key].value;
    let [, year, month, date, time] = /^(\d{4})(\d{2})(\d{2})(?:$|T(.+)Z)/.exec(value) || [
      0,
      0,
      0,
      0,
      undefined
    ];
    if (year) {
      return {
        date: new Date(Number(year), Number(month) - 1, Number(date), Number(time || 0)),
        timezone: '',
        allDay: time == undefined
      };
    }
    return null;
  }

  // Unescape Text re RFC 4.3.11
  unescape(t: string) {
    t = t || '';
    return t
      .replace(/\\\,/g, ',')
      .replace(/\\\;/g, ';')
      .replace(/\\[nN]/g, '\n')
      .replace(/\\\\/g, '\\');
  }
}

export { CalendarComponent, ICalendarComponent, IDateTime };
