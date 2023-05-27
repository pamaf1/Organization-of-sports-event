import moment from 'moment-timezone';

const makeDate = function (value) {
    const date = new Date(value);
    const dateFormat = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };
    const dateRemaking = date.toLocaleString("uk-UA", dateFormat).split("-").reverse().join(".");
    return `${dateRemaking}`;
};

const getUkraineDate = function () {
  const now = moment().tz('Europe/Kiev');
  const year = now.year();
  const month = now.month() + 1;
  const day = now.date();
  const minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return `${minDate}`;
};

const getUkraineTime = function () {
  const now = new Date();
  const options = { timeZone: 'Europe/Kiev', hour: '2-digit', minute: '2-digit' };
  const ukraineTime = new Intl.DateTimeFormat('default', options).format(now);
  const minTime = ukraineTime.substr(0, 5);
  return `${minTime}`;
};

const timeToMinutes = function (time) {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
};

const timeUpThreeHour = function () {
  const now = new Date();
  now.setHours(now.getHours() + 3);

  const options = { timeZone: 'Europe/Kiev', hour: '2-digit', minute: '2-digit' };
  const ukraineTime = new Intl.DateTimeFormat('default', options).format(now);
  const minTime = ukraineTime.substr(0, 5);
  return `${minTime}`;
};


export { makeDate, getUkraineDate, getUkraineTime, timeToMinutes, timeUpThreeHour};