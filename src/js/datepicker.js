import { CalendarMonth } from './calendar-month.js';
import { CalendarMonthView } from './calendar-month-view.js';

let DatePicker;

const dateInputSupported = () => {
  let el = document.createElement('input');
  try {
    el.type = 'date';
  } catch (e) { }
  return el.type == 'date';
}

DatePicker = class {
  constructor({
    id,
    numberOfMonthsInFuture = 12,
    numberOfMonthsInPast = 12,
    // fromYear = 2019,
    // fromMonth = 0,
    // tillYear = 2020,
    // tillMonth = 11,
  }) {
    this.dateInput = document.getElementById(id);
    this.numberOfMonthsInFuture = numberOfMonthsInFuture;
    this.numberOfMonthsInPast = numberOfMonthsInPast;
    this.today = new Date();
    this.currentMonthIndex = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
  }

  //------------------------------
  createCalendarHtml() {
    console.log(this.numberOfMonthsInFuture);
    let calendarHtml = document.createElement('div');
    calendarHtml.classList.add('datepicker__calendar', 'is-hidden');
    let calendarMonthWrap = document.createElement('div');
    calendarMonthWrap.classList.add('datepicker__calendar-month-wrap');
    let datepickerNav = document.createElement('div');
    datepickerNav.classList.add('datepicker__nav');
    let buttonPrev = document.createElement('button');
    buttonPrev.classList.add('datepicker__nav-prev');
    buttonPrev.setAttribute.type = 'button';
    buttonPrev.textContent = "Prev";
    datepickerNav.append(buttonPrev);
    let buttonNext = document.createElement('button');
    buttonNext.classList.add('datepicker__nav-next');
    buttonNext.setAttribute.type = 'button';
    buttonNext.textContent = "Next";
    datepickerNav.append(buttonNext);


    calendarHtml.appendChild(datepickerNav);
    calendarHtml.appendChild(calendarMonthWrap);

    // not sure why I can't use this.currentMonthIndex directly here, comes back as undefined
    let currentMonthIndex = this.currentMonthIndex;
    let currentYear = this.currentYear;
    let today = this.today;
    let monthsInPast = this.numberOfMonthsInPast;

    addNewMonthViewToCalendar();

    function addNewMonthViewToCalendar() {
      let month = new CalendarMonth(currentYear, currentMonthIndex, today);
      let newMonthView = new CalendarMonthView(month);
      let calendarMonth = calendarMonthWrap.querySelector('.datepicker__calendar-month');

      if (calendarMonth) {
        calendarMonthWrap.querySelector('.datepicker__calendar-month').remove();
      }

      calendarMonthWrap.appendChild(newMonthView.createCalendarMonthHtml());
    }

    buttonPrev.addEventListener('click', function () {
      currentMonthIndex--;

      if (currentMonthIndex < 0) {
        currentMonthIndex = 11;
        currentYear--;
      }

      addNewMonthViewToCalendar();
      console.log(currentMonthIndex);
    });

    buttonNext.addEventListener('click', function () {
      currentMonthIndex++;

      if (currentMonthIndex > 11) {
        currentMonthIndex = 0;
        currentYear++;
      }

      addNewMonthViewToCalendar();
      console.log(currentMonthIndex);
    });

    return calendarHtml;
  }
  //------------------------------------------------------------

  setup() {
    let calendar = this.createCalendarHtml();
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

const setupDatepicker = (calendarSettings) => {
  if (typeof DatePicker !== 'undefined') {
    const datepicker = new DatePicker(calendarSettings);
    datepicker.setup();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // only create a class if date input is not supported
  // change to NOT
  if (dateInputSupported()) {
    setupDatepicker({
      id: 'example-datepicker',
      numberOfMonthsInFuture: 12,
      numberOfMonthsInPast: 12,
      // fromYear: 2019,
      // fromMonth: 0,
      // tillYear: 2020,
      // tillMonth: 11,
    });
  }
});
