var form = document.forms['searchform'];
var guestNumber = form['searchform-guests-number'];
var roomNumber = form['searchform-guests-rooms'];
var dateFrom = form['form-from'];
var dateTo = form['form-to'];

var MAX_GUESTS_AVAILABLE = 6;
var MAX_GUESTS_PER_ROOM = 3;
var MIN_GUESTS_PER_ROOM = 1;
var MILISECONDS_IN_DAY = 60 * 60 * 24 * 1000;

var minDifference = MILISECONDS_IN_DAY;

guestNumber.value = 2;
roomNumber.value = 1;

//Валидация полей ввода количества гостей и комнат

roomNumber.onchange = function(event) {
  guestNumber.min = parseInt(roomNumber.value, 10) * MIN_GUESTS_PER_ROOM;
  guestNumber.max = parseInt(roomNumber.value, 10) * MAX_GUESTS_PER_ROOM;
}
guestNumber.onchange = function(event) {
  roomNumber.min = parseInt(parseInt(guestNumber.value, 10) / MAX_GUESTS_PER_ROOM);
  roomNumber.max = parseInt(parseInt(guestNumber.value, 10) / MIN_GUESTS_PER_ROOM);
}

//Функция возвращает дату в формате нужном инпутам типа "date"

var addLeadingZero = function(value) {
  if (value < 10) {
    return '0' + value;
  }

  return '' + value;
};

var getFormattedDate = function(date) {
  if (typeof date === 'undefined') {
    date = new Date();
  }

  var fullMonth = addLeadingZero(date.getMonth() + 1);
  var fullDate = addLeadingZero(date.getDate());

  return [date.getFullYear(), fullMonth, fullDate].join('-');
};

//Валидация полей ввода дат

dateFrom.min = getFormattedDate();
dateFrom.value = getFormattedDate();
dateTo.value = getFormattedDate(new Date(new Date(dateFrom.value) + minDifference));

dateFrom.onchange = function(evt) {
  var dateFromValue = new Date(dateFrom.value);
  var dateToValue = new Date(dateTo.value);
  var minimalToDate = getFormattedDate(new Date(+dateFromValue + minDifference));

  if (dateToValue - dateFromValue < minDifference) {
    dateTo.value = minimalToDate;
  }

  dateTo.min = minimalToDate;
};