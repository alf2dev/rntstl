const dayNames = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const dayNamesFull = [
  'Неділя',
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  "П'ятниця",
  'Субота',
];
const monthNames = [
  'січня',
  'лютого',
  'березеня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
];
export const dateParser = (dateStr?: string | Date | null | undefined) => {
  if (!dateStr) dateStr = '3000-01-01 00:00:00';
  const date = dateStr instanceof Date ? dateStr : new Date(dateStr);
  const hours = date.getHours().toString(); //.padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();
  let dateWeek: string;
  let dateWeekFull: string;
  if (new Date().setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
    dateWeek = 'Сьогодні';
    dateWeekFull = 'Сьогодні';
  } else {
    dateWeek = dayNames[date.getDay()];
    dateWeekFull = dayNamesFull[date.getDay()];
  }
  return {
    day,
    month,
    monthName,
    year,
    dateWeek,
    dateWeekFull,
    hours,
    minutes,
  };
};
