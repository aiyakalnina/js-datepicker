export { CalendarMonthView };

class CalendarMonthView {
  constructor(month) {
    this.month = month;
  }

  createDayCells() {
    let dayCells = [];

    for (let i = 1; i <= this.month.firstWeekdayOfMonth(); i++) {
      let emptyDayCell = `
          <td>
            <span></span>
          </td>
        `
      dayCells.push(emptyDayCell);
    }

    for (let i = 1; i <= this.month.howManyDays(); i++) {
      let dayCellClass = "datepicker__day";

      if (this.month.checkIfCurrentMonth() && i === this.month.checkWhatDayNumToday()) {
        dayCellClass = dayCellClass.concat(' ', 'is-active');
      } else {
        dayCellClass = "datepicker__day";
      }

      let dayCell = `
          <td class="${dayCellClass}" data-date="${i} ${this.month.monthName()}, ${this.month.year}">
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

    let dayCells = this.createDayCells(this.month.firstWeekdayOfMonth(), this.month.checkWhatDayNumToday(), this.month.year);
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
        <div class="datepicker__month-title">${this.month.monthName()} ${this.month.year}</div>
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
