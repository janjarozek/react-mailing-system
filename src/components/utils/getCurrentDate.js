const getCurrentDate = () => {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  var currentDate =
    year + (month < 10 ? "-0" : "-") + month + (day < 10 ? "-0" : "-") + day;

  return currentDate;
};

export default getCurrentDate;