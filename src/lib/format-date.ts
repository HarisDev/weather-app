const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDate = (date: string) => {
  // to eg. October 21st
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "long" });

  // if today, return "Today"
  if (dateObj.getDate() === new Date().getDate()) {
    return "Today";
  }

  // if tomorrow, return "Tomorrow"
  if (dateObj.getDate() === new Date().getDate() + 1) {
    return "Tomorrow";
  }

  return `${month} ${day}${getOrdinalSuffix(day)}`;
};
