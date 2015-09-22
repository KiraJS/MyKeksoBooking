var form = document.forms['searchform'];
var guestNumber = form['searchform-guests-number'];
var roomNumber = form['searchform-guests-rooms'];

var MAX_GUESTS_AVAILABLE = 6;
var MAX_GUESTS_PER_ROOM = 3;
var MIN_GUESTS_PER_ROOM = 1;

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
