const dateOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

// parse date to dd/mm/yyyy
export const parseDate = (date) =>
  date.toLocaleDateString("id-ID", dateOptions);

// parse date from date object to yyyy-mm-dd
export const parseToValueDate = (date) =>
  parseDate(date).split("/").reverse().join("-");
