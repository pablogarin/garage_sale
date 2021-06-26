const moment = require('moment');
require('moment/locale/es');

export const asPrice = (value) => {
  if (isNaN(value)) return '$ - '; 
  return `$ ${String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`
}

export const formatDate = (date) => {
  return moment(date).format('D [de] MMMM [del] y')
}
