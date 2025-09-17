import { Holiday } from '../types/holiday';
import { format, parseISO } from 'date-fns';

export function exportToCSV(holidays: Holiday[], province: string): void {
  const headers = ['Holiday Name', 'Date', 'Observed Date', 'Type', 'Statutory', 'Description'];
  const rows = holidays.map(holiday => [
    holiday.name,
    format(parseISO(holiday.date), 'yyyy-MM-dd'),
    holiday.observedDate ? format(parseISO(holiday.observedDate), 'yyyy-MM-dd') : '',
    holiday.type,
    holiday.isStatutory ? 'Yes' : 'No',
    holiday.description || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `canadian_holidays_${province}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToICS(holidays: Holiday[], province: string): void {
  const icsEvents = holidays.map(holiday => {
    const date = parseISO(holiday.date);
    const dateStr = format(date, 'yyyyMMdd');

    return `BEGIN:VEVENT
DTSTART;VALUE=DATE:${dateStr}
DTEND;VALUE=DATE:${dateStr}
SUMMARY:${holiday.name}
DESCRIPTION:${holiday.description || holiday.name}${holiday.isStatutory ? ' (Statutory Holiday)' : ''}
STATUS:CONFIRMED
TRANSP:TRANSPARENT
END:VEVENT`;
  }).join('\n');

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Canadian Holidays//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Canadian Holidays - ${province}
X-WR-TIMEZONE:America/Toronto
${icsEvents}
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `canadian_holidays_${province}_${format(new Date(), 'yyyy-MM-dd')}.ics`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}