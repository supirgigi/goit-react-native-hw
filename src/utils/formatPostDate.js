import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';

export function formatPostDate(date) {
  return format(Date.parse(date), 'dd MMMM yyyy, HH:mm:ss', {
    locale: ru,
  });
}
