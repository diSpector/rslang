const DateHelper = {
  getBeutifyTodayDate: () => {
    const dateTodayObj = new Date();
    const year = dateTodayObj.getFullYear();
    let month = dateTodayObj.getMonth() + 1;
    month = (month < 10) ? `0${month}` : month;
    let day = dateTodayObj.getDate();
    day = (day < 10) ? `0${day}` : day;
    return `${year}-${month}-${day}`;

  },
};

export default DateHelper;