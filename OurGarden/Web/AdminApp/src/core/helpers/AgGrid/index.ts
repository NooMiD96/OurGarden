// eg 29/08/2004 gets converted to 20040829
const monthToComparableNumber = (date?: string) => {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }

  const yearNumber = +date.substring(6, 10);
  const monthNumber = +date.substring(3, 5);
  const dayNumber = +date.substring(0, 2);

  const result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
  return result;
};

const dateComparator = (date1?: string, date2?: string) => {
  const date1Number = monthToComparableNumber(date1);
  const date2Number = monthToComparableNumber(date2);

  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }

  return date1Number - date2Number;
};

export { dateComparator };
