/*
input: 30
output: 0:30
*/
export const formatTimer = (timer: number) => {
  const minutes = Math.floor(timer / 60);
  const second = timer % 60;
  return `${minutes}:${second < 10 ? "0" : ""}${second}`;
};

export const formatDate = (date: Date) => {
  const pad = (num: number) => num.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  // Format: name_YYYY-MM-DD_HHMMSS
  return `${name}_${year}-${month}-${day}_${hours}${minutes}${seconds}`;
};
