import { IIcalCalendar, IcalCalendar } from './ical-calendar';
import { CalendarComponent } from './calendar-component';

function* generateLines(text: string): IterableIterator<string> {
  let lines = text.split(/\r?\n/);
  let line = '';
  while (lines.length > 0) {
    let [l, next] = lines;
    lines.shift();
    line += l.replace(/(^ )/gm, ''); // A line starts with space should be connect to previous one
    if (next && /^ /gm.test(next)) continue;
    yield line;
    line = '';
  }
}

function parseIcal(text: string): IIcalCalendar {
  const cal = new IcalCalendar();
  let currentComp: CalendarComponent | null = null;

  for (const line of generateLines(text)) {
    let [, key, opt, key2, value] = (line.match(/^(?:(.+)\;(.+)|(.+))\:(.+)/) || []).map(s =>
      s ? s.trim() : ''
    );
    key = key || key2;

    switch (key) {
      case 'BEGIN':
        currentComp = cal.createItem(value);
      default:
        if (currentComp) currentComp.push(key, opt, value);
        break;
    }
  }
  return cal;
}

export default parseIcal;
export * from './calendar-component';
export * from './ical-calendar';
export * from './calendar-event';
