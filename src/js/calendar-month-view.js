export { CalendarMonthView };

class CalendarMonthView {
  constructor(month) {
    this.month = month;
  }

  createDayCells() {
    let dayCells = [];

    for (let i = 1; i <= this.month.firstWeekdayOfMonth(); i++) {
      let emptyDayCell = document.createElement('td');
      dayCells.push(emptyDayCell);
    }

    for (let i = 1; i <= this.month.howManyDays(); i++) {
      let dayCell = document.createElement('td');
      dayCell.classList.add('datepicker__day');
      if (this.month.checkIfCurrentMonth() && i === this.month.checkWhatDayNumToday()) {
        dayCell.classList.add('is-active');
      }
      dayCell.dataset.date = `${i} ${this.month.monthName()}, ${this.month.year}`
      dayCell.innerHTML = `<span>${i}</span>`

      dayCell.addEventListener('click', function (e) {
        let selectedCell = e.target.closest('.datepicker__day');
        let selectedDate = selectedCell.getAttribute('data-date');
        console.log(selectedDate);
      });

      dayCells.push(dayCell);
    }

    return dayCells;
  }

  createRowsFromDayCells(dayCellsHtml) {
    var weekRowsArray = [];
    for (var i = 0; i < dayCellsHtml.length; i += 7) {
      let weekRow = document.createElement('tr');
      let weekRowDays = dayCellsHtml.slice(i, i + 7);

      for (var j = 0; j < weekRowDays.length; j++) {
        weekRow.append(weekRowDays[j]);
      }
      weekRowsArray.push(weekRow);
    }
    return weekRowsArray;
  }

  createCalendarMonthHtml() {
    let weekdayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    let calendarMonthHtml = document.createElement('div');
    calendarMonthHtml.classList.add('datepicker__calendar-month');

    let dayCells = this.createDayCells();
    let weekRows = this.createRowsFromDayCells(dayCells);

    let calendarHead = document.createElement('thead');
    let calendarHeadRow = document.createElement('tr');

    weekdayNames.forEach((name) => {
      let weekDayNameCell = document.createElement('th');
      weekDayNameCell.append(name);
      calendarHeadRow.append(weekDayNameCell);
    });

    calendarHead.append(calendarHeadRow);

    let monthTitle = document.createElement('div');
    monthTitle.classList.add('datepicker__month-title');
    monthTitle.innerText = `${this.month.monthName()} ${this.month.year}`

    let monthTable = document.createElement('table');
    monthTable.classList.add('datepicker__month');
    monthTable.append(calendarHead);

    let tableBody = document.createElement('tbody');

    for (var i = 0; i < weekRows.length; i++) {
      tableBody.append(weekRows[i]);
    }

    monthTable.append(tableBody);

    calendarMonthHtml.append(monthTitle);
    calendarMonthHtml.append(monthTable);

    return calendarMonthHtml;
  }
}
