import { useTranslation } from 'react-i18next';

interface Props {
  seatsLeft?: number | null;
  totalSeats?: number;
  className?: string;
}

export default function SeatsBadge({ seatsLeft, totalSeats, className = '' }: Props) {
  const { t } = useTranslation();
  if (!totalSeats || seatsLeft === null || seatsLeft === undefined) return null;

  if (seatsLeft <= 0) {
    return (
      <span className={`inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 ${className}`}>
        {t('seats.none')}
      </span>
    );
  }

  const low = seatsLeft <= Math.max(2, Math.round(totalSeats * 0.2));

  return (
    <span
      className={`inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-1 border ${
        low ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'
      } ${className}`}
    >
      {t('seats.left')} {seatsLeft} {seatsWord(seatsLeft)}
    </span>
  );
}

function seatsWord(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'место';
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'места';
  return 'мест';
}
