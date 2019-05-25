import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

function LongDate(date) {
  return moment(date).format('dddd jDD jMMMM jYY');
}

function ShortDate(date) {
  return moment(date).format('jYY/jMM/jDD');
}

export { LongDate, ShortDate };
