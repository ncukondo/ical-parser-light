import * as comp from './calendar-component';

interface ICalendarEvent extends comp.ICalendarComponent {
  readonly summary: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly isAllDay: boolean;
  readonly description: string;
}

class CalendarEvent extends comp.CalendarComponent {
  constructor() {
    super('VEVENT');
  }

  get summary(): string {
    return this.getText('SUMMARY');
  }

  get description(): string {
    return this.getText('DESCRIPTION');
  }

  get startDate() {
    let dateTime = this.getDateTime('DTSTART');
    if (dateTime) return dateTime.date;
    return 0;
  }

  get endDate() {
    let dateTime = this.getDateTime('DTEND');
    if (dateTime) return dateTime.date;
    return 0;
  }

  get isAllDay() {
    let dateTime = this.getDateTime('DTSTART');
    if (dateTime) return dateTime.allDay;
    return false;
  }
}

export { CalendarEvent, ICalendarEvent };
