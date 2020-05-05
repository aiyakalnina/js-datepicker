export { CalendarMonthView };

class CalendarMonthView {
  constructor(monthName, firstWeekdayOfMonth, numberOfDays, year, isCurrentMonth, dayNumToday) {
    this.monthName = monthName;
    this.numberOfDays = numberOfDays;
    this.firstWeekdayOfMonth = firstWeekdayOfMonth;
    this.year = year;
    this.isCurrentMonth = isCurrentMonth;
    this.dayNumToday = dayNumToday;
    this.monthView = this.createCalendarMonthHtml();
  }

  createDayCells() {
    let dayCells = [];

    for (let i = 1; i <= this.firstWeekdayOfMonth; i++) {
      let emptyDayCell = `
          <td>
            <span></span>
          </td>
        `
      dayCells.push(emptyDayCell);
    }

    for (let i = 1; i <= this.numberOfDays; i++) {
      let dayCellClass = "datepicker__day";

      if (this.isCurrentMonth && i === this.dayNumToday) {
        dayCellClass = dayCellClass.concat(' ', 'is-active');
      } else {
        dayCellClass = "datepicker__day";
      }

      let dayCell = `
          <td class="${dayCellClass}" data-date="${i} ${this.monthName}, ${this.year}">
            <span>${i}</span>
          </td>
        `
      dayCells.push(dayCell);
    }

    return dayCells;
  }

  createRowsFromDayCells(dayCellsHtml) {
    var weekRowsArray = [];
    for (var i = 0; i < dayCellsHtml.length; i += 7) {
      weekRowsArray.push(`<tr> ${dayCellsHtml.slice(i, i + 7).join('\n')} </tr>`);
    }
    let weekRows = weekRowsArray.join('\n');
    return weekRows;
  }

  createCalendarMonthHtml() {
    let calendarMonthHtml = document.createElement('div');
    calendarMonthHtml.classList.add('datepicker__calendar-month');
    // if (!this.isCurrentMonth) {
    //   calendarMonthHtml.classList.add('is-hidden');
    // }

    let dayCells = this.createDayCells(this.firstWeekdayOfMonth, this.numberOfDays, this.year);
    let weekRows = this.createRowsFromDayCells(dayCells);

    let calendarHead = `
        <thead>
          <tr>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
            <th>Su</th>
          </tr>
        </thead>
      `

    calendarMonthHtml.innerHTML = `
        <div class="datepicker__month-title">${this.monthName} ${this.year}</div>
        <table class="datepicker__month">
          ${calendarHead}
          <tbody>
            ${weekRows}
          </tbody>
        </table>
    `;

    return calendarMonthHtml;
  }
}
