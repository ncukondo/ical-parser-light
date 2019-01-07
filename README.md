# @ncukondo/ical-parser-light

## Prerequisites

- [Node.js](https://nodejs.org/)

## Getting Started

```
yarn add @ncukondo/ical-parser-light
```

```
npm install --save @ncukondo/ical-parser-light
```

## Usage

```typescript
import parser, { ICalendarEvent } from './ical-parser-light';

let sampleICS:string;  // iCalendar Data string

let events = [...parser(sampleICS)].sort((a, b) => a.startDate.valueOf() - b.startDate.valueOf());

events.forEach(event => {
  let date = event.startDate;
  console.log(keylist[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}: event.summary`];
});
```

## About ical

- [web kanzaki](https://www.kanzaki.com/docs/ical/)
- [iCalendar.org](https://icalendar.org/)
- [rfc2445](https://www.ietf.org/rfc/rfc2445.txt)

## License

This software is released under the MIT License.
