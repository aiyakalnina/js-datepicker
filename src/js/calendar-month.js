export { CalendarMonth };

class CalendarMonth {
  constructor(year, month, today) {
    this.date = new Date(year, month, 0);
    this.year = year;
    this.monthIndex = month;
    this.dateToday = today;
    this.monthName = this.monthName();
    this.numberOfDays = this.howManyDays();
    this.firstWeekdayOfMonth = this.firstWeekdayOfMonth();
    this.isCurrentMonth = this.checkIfCurrentMonth();
    this.dayNumToday = this.checkWhatDayNumToday();
  }

  checkIfCurrentMonth() {
    let currentYear = this.dateToday.getFullYear();
    let currentMonth = this.dateToday.getMonth();
    return (this.year === currentYear && this.monthIndex === currentMonth) ? true : false;
  }

  checkWhatDayNumToday() {
    return this.dateToday.getDate();
  }

  monthName() {
    let monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthsNames[this.monthIndex];
  }

  firstWeekdayOfMonth() {
    return this.date.getDay();
  }

  howManyDays() {
    // number of days a month
    let dayNum;

    // 31 or 30 days?
    switch (this.monthIndex) {
      case 3: case 5: case 8: case 10:
        dayNum = 30;
        break;
      case 1:
        // If month is February, calculate whether it is a leap year or not
        const isLeap = new Date(this.year, 1, 29).getMonth() === 1;
        dayNum = isLeap ? 29 : 28;
        break;
      default:
        dayNum = 31;
    }

    return dayNum;
  }
}
