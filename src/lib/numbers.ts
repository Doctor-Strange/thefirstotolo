function numberWithCommas(x) {
  return x
    .toString()
    .replace(',', '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function convertNumbers2Persian(num) {
  if (num !== null) {
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/[0-9]/g, function(w) {
      return id[+w];
    });
  } else {
    return num;
  }
}
function convertNumbers2English(string) {
  return string
    .replace(/[\u0660-\u0669]/g, c => {
      return c.charCodeAt(0) - 0x0660;
    })
    .replace(/[\u06f0-\u06f9]/g, c => {
      return c.charCodeAt(0) - 0x06f0;
    });
}

export { numberWithCommas, convertNumbers2Persian, convertNumbers2English };
