/*
input: 30
output: 0:30
*/
export const formatTimer = (timer: number) => {
  const minutes = Math.floor(timer / 60);
  const second = timer % 60;
  return `${minutes}:${second < 10 ? '0' : ''}${second}`
}