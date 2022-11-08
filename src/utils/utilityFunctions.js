const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export const differenceInDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const daysDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return daysDiff;
};

export const datesInRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }

  return dates;
};
