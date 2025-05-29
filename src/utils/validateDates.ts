export function validateDates<T extends Date | string>( start: T, end: T ): string | null {
   const startDate = start instanceof Date ? start : new Date(start);
   const endDate = end instanceof Date ? end : new Date(end);

   if (isNaN(startDate.getTime())) return "Неверный формат даты для стартовой даты";
   if (isNaN(endDate.getTime())) return "Неверный формат даты для конечной даты";

   if (endDate < startDate) return "Конечная дата не может быть объявлена раньше стартовой даты";

   return null;
}