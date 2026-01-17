export const getDateString = (timestamp: number) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const hoursString = hours >= 10 ? `${hours}` : `0${hours}`;
  const minutesString = minutes >= 10 ? `${minutes}` : `0${minutes}`;

  const day = date.getDate();
  const weekday = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${weekdays[weekday]}, ${day} ${months[month]} ${year} | ${hoursString}:${minutesString}`;
};
