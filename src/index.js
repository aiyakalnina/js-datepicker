import "./scss/main.scss";

let DatePicker;

const dateInputSupported = () => {
  let el = document.createElement('input');
  try {
    el.type = 'date';
  } catch (e) { }
  return el.type == 'date';
}

// only create a class if date input is not supported
// TODO: change to NOT, this is just to view it in chrome

DatePicker = class {
  constructor(id) {
    this.dateInput = document.getElementById(id);
    this.months = [
      new CalendarMonth(2020, 1),
      new CalendarMonth(2020, 2),
      new CalendarMonth(2020, 3),
      new CalendarMonth(2020, 4),
    ];
  }

  // create rendered calendar
  //---------------------------------------------------------------------
  // create day cells html
  createDayCells(firstWeekdayOfMonth, numberOfDays, monthName, year) {
    let dayCells = [];

    for (let i = 1; i <= firstWeekdayOfMonth; i++) {
      let emptyDayCell = `
          <td>
            <span></span>
          </td>
        `
      dayCells.push(emptyDayCell);
    }

    for (let i = 1; i <= numberOfDays; i++) {
      let dayCell = `
          <td class="datepicker__day" data-date="${i} ${monthName}, ${year}">
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

  createCalendarMonthHtml(monthName, firstWeekdayOfMonth, numberOfDays, year) {
    let calendarMonthHtml = document.createElement('div');
    calendarMonthHtml.classList.add('datepicker__calendar-month');

    let dayCells = this.createDayCells(firstWeekdayOfMonth, numberOfDays, year);
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
        <div class="datepicker__month-title">${monthName}</div>
        <table class="datepicker__month">
          ${calendarHead}
          <tbody>
            ${weekRows}
          </tbody>
        </table>
    `;

    return calendarMonthHtml;
  }

  //------------------------------
  createCalendarHtml() {
    let calendarHtml = document.createElement('div');
    calendarHtml.classList.add('datepicker__calendar', 'is-hidden');

    calendarHtml.innerHTML = `
      <div class="datepicker__nav">
        <button type="button" class="datepicker__nav-prev">Prev</button>
        <button type="button" class="datepicker__nav-next">Next</button>
      </div>
    `

    this.months.forEach((month) => {
      let monthView = this.createCalendarMonthHtml(month.monthName, month.firstWeekdayOfMonth, month.numberOfDays, month.year);
      calendarHtml.appendChild(monthView);
    });

    return calendarHtml;
  }
  //------------------------------------------------------------

  setup() {
    console.log(this.months);

    let calendar = this.createCalendarHtml();
    console.log(calendar);
    let calendarToggle = document.createElement('button');
    calendarToggle.setAttribute.type = 'button';
    calendarToggle.textContent = 'Choose';
    calendarToggle.classList.add('btn', 'btn-secondary', 'btn-short');
    calendarToggle.addEventListener('click', () => (
      this.toggleCalendar(calendar)
    ));

    this.dateInput.parentElement.appendChild(calendarToggle);
    this.dateInput.parentElement.appendChild(calendar);

  }

  toggleCalendar(calendarEl) {
    if (calendarEl.classList.contains('is-hidden')) {
      calendarEl.classList.remove('is-hidden');
    } else {
      calendarEl.classList.add('is-hidden');
    }
  }
}


class CalendarMonth {
  constructor(year, month) {
    this.date = new Date(year, month, 0);
    this.month = month;
    this.monthName = this.monthName();
    this.numberOfDays = this.howManyDays();
    this.firstWeekdayOfMonth = this.firstWeekdayOfMonth();
  }

  monthName() {
    let monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthsNames[this.month];
  }

  firstWeekdayOfMonth() {
    return this.date.getDay();
  }

  howManyDays() {
    // number of days a month
    let dayNum;

    // 31 or 30 days?
    switch (this.month) {
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

const setupDatepicker = (id) => {
  if (typeof DatePicker !== 'undefined') {
    const datepicker = new DatePicker(id);
    datepicker.setup();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (dateInputSupported()) {
    setupDatepicker('example-datepicker');
  }
});
