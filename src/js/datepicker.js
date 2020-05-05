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
    fromYear = 2019,
    fromMonth = 0,
    tillYear = 2020,
    tillMonth = 11,
  }) {
    this.dateInput = document.getElementById(id);
    this.numberOfMonthsInFuture = numberOfMonthsInFuture;
    this.numberOfMonthsInPast = numberOfMonthsInPast;
    this.today = new Date();
    this.currentMonthIndex = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.currentMonth = new CalendarMonth(this.currentYear, this.currentMonthIndex, this.today);
    this.months = this.createMonthsFromSettings();
  }

  createMonthsFromSettings() {
    let calendarMonths = [];
    let currentMonthIndex = this.currentMonthIndex;
    let currentYear = this.currentYear;
    let numberOfMonthsInPast = this.numberOfMonthsInPast;
    let numberOfMonthsInCalendar = numberOfMonthsInPast + this.numberOfMonthsInFuture;
    let numberOfYearsInPast = numberOfMonthsInPast / 12;

    function getYearFrom() {
      return (currentYear - numberOfYearsInPast);
    }

    function getMonthFrom() {
      return currentMonthIndex - (12 - (numberOfMonthsInPast / numberOfYearsInPast));
    }

    let year = getYearFrom();
    let monthIndex = getMonthFrom();

    while (calendarMonths.length < numberOfMonthsInCalendar) {
      calendarMonths.push(new CalendarMonth(year, monthIndex, this.today));
      monthIndex++;

      if (monthIndex > 11) {
        year++;
        monthIndex = 0;
      }
      console.log(year, monthIndex);
    }

    return calendarMonths;
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

    let monthView = new CalendarMonthView(
      this.currentMonth.monthName,
      this.currentMonth.firstWeekdayOfMonth,
      this.currentMonth.numberOfDays,
      this.currentMonth.year,
      this.currentMonth.isCurrentMonth,
      this.currentMonth.dayNumToday
    );
    calendarMonthWrap.appendChild(monthView.monthView);

    calendarHtml.appendChild(datepickerNav);
    calendarHtml.appendChild(calendarMonthWrap);

    // not sure why I can't use this.currentMonthIndex directly here, comes back as undefined
    let currentMonthIndex = this.currentMonthIndex;
    let months = this.months;
    let yearInView = this.currentYear;
    let monthInViewIndex = monthInViewFromAllMonths();
    let monthsInPast = this.numberOfMonthsInPast;
    // let monthsInFuture = this.numberOfMonthsInFuture;

    console.log(this.months);

    function monthInViewFromAllMonths() {
      let monthInViewIndex;
      console.log(months);

      months.forEach((month, index) => {
        if (month.year === yearInView && month.monthIndex === currentMonthIndex) {
          monthInViewIndex = index;
        }
      });

      console.log(monthInViewIndex);
      return monthInViewIndex;
    }

    function addNewMonthViewToCalendar() {
      let month = months[monthInViewIndex];
      let newMonthView = new CalendarMonthView(
        month.monthName,
        month.firstWeekdayOfMonth,
        month.numberOfDays,
        month.year,
        month.isCurrentMonth,
        month.dayNumToday
      );
      monthView.monthView.parentNode.replaceChild(newMonthView.monthView, monthView.monthView);
      monthView = newMonthView;
    }

    buttonPrev.addEventListener('click', function () {
      if (monthInViewIndex >= currentMonthIndex - monthsInPast) {
        monthInViewIndex--;
        addNewMonthViewToCalendar();
      }
      console.log(monthInViewIndex, currentMonthIndex, currentMonthIndex - monthsInPast);
    });

    buttonNext.addEventListener('click', function () {
      if (monthInViewIndex < months.length - 1) {
        monthInViewIndex++;
        addNewMonthViewToCalendar();
      }
      console.log(monthInViewIndex);
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

    //jsut for debugging
    datepicker.createMonthsFromSettings();
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
