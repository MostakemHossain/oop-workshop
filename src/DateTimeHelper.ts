export class DateTimeHelper {
  // breifiable
  //   private readonly date: Date;
  //   constructor(date: Date = new Date()) {
  //     this.date = date;
  //   }
  // short way
  constructor(private readonly date: Date = new Date()) {}

  get nativeDate(): Date {
    return new Date(this.date);
  }

  // create a ISO string with validation

  static fromISOString(isoString: string): DateTimeHelper {
    //2025-01-31T06:19:52.932Z
    const isoregex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{1,3}Z$/;
    if (!isoregex.test(isoString)) {
      throw new Error('Invalid ISO String.Expected "YYYY-MM-DDTHH:MM:SS.sssZ"');
    }
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid ISO String. Failed to parse date');
    }
    return new DateTimeHelper(date);
  }

  // start of the day
  startOfDay(): DateTimeHelper {
    const date = new Date(this.date);
    date.setHours(0, 0, 0, 0);
    return new DateTimeHelper(date);
  }
  // end of the day
  endOfDay(): DateTimeHelper {
    const date = new Date(this.date);
    date.setHours(23, 59, 59, 999);
    return new DateTimeHelper(date);
  }

  // format date
  format(formatString: string, timeZone: string = 'UTC'): string {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const parts = formatter.formatToParts(this.date);
    const mapped: { [key: string]: string } = {};
    parts.forEach((part) => (mapped[part.type] = part.value));

    return formatString
      .replace('YYYY', mapped.year)
      .replace('MM', mapped.month)
      .replace('DD', mapped.day)
      .replace('hh', mapped.hour)
      .replace('mm', mapped.minute)
      .replace('ss', mapped.second);
  }

  // start of week
  startOfWeek(): DateTimeHelper {
    const newDate = new Date(this.date);
    newDate.setDate(newDate.getDate() - newDate.getDay());
    newDate.setHours(0, 0, 0, 0);
    return new DateTimeHelper(newDate);
  }
  // add business day
  addBusinessDays(days: number): DateTimeHelper {
    let newDate = new Date(this.date);
    let addDays = 0;
    while (addDays < days) {
      newDate.setDate(newDate.getDate() + 1);
      if (newDate.getDay() !== 0 && newDate.getDay() !== 6) {
        addDays++;
      }
    }
    return new DateTimeHelper(newDate);
  }

  // is weekend
  isWeekend(): boolean {
    const day = this.date.getDay();
    return day === 0 || day === 6;
  }

  // get quarter of a year(1-4)
  getQuarter(): number {
    return Math.floor(this.date.getMonth() / 3) + 1;
  }

  // get week of a year(1-52/53)
  getWeekNumber(): number {
    const date = new Date(this.date);
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = (date.getTime() - yearStart.getTime()) / 86400000;
    const weekNumber = Math.ceil((dayOfYear + yearStart.getDay() + 1) / 7);
    return weekNumber;
  }
}

// const dateHelper = DateTimeHelper.fromISOString('2025-01-31T06:19:52.932Z');
const dateHelper = new DateTimeHelper();

console.log(dateHelper.format('YYYY-MM-DD HH:mm:ss')); // 2025-01-31T06:19:52.932Z

console.log(dateHelper.addBusinessDays(5).format('YYYY-MM-DD HH:mm:ss')); // 2025-02-07T06:19:52.932Z
