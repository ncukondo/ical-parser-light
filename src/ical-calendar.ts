import { ICalendarComponent, CalendarComponent } from './calendar-component';
import { ICalendarEvent, CalendarEvent } from './calendar-event';

interface IIcalCalendar extends ICalendarComponent, IterableIterator<ICalendarEvent> {
  readonly items: { [key: string]: ICalendarComponent[] };
  readonly events: IterableIterator<ICalendarEvent>;
}

class IcalCalendar extends CalendarComponent implements IIcalCalendar {
  private pitems: { [key: string]: CalendarComponent[] } = {};

  constructor() {
    super('VCALENDAR');
  }

  createItem(type: string): CalendarComponent {
    let result: CalendarComponent;
    switch (type) {
      case 'VEVENT':
        result = new CalendarEvent();
        break;
      default:
        result = new CalendarComponent(type);
    }
    this.pitems[type] = this.pitems[type] || [];
    this.pitems[type].push(result);
    return result;
  }

  get items() {
    return this.pitems;
  }

  get events() {
    return this.generateEvents();
  }

  next(value?: any) {
    return this.generateEvents().next(value);
  }

  [Symbol.iterator] = this.generateEvents;

  *generateEvents(): IterableIterator<ICalendarEvent> {
    for (let event of this.pitems['VEVENT']) {
      if (event instanceof CalendarEvent) yield event as ICalendarEvent;
    }
  }
}

export { IcalCalendar, IIcalCalendar };
