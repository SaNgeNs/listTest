import React, { memo } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export const FromNow = ({
  timestamp = '',
  ...props
}) => {
  const { t } = useTranslation();
  const now = dayjs();
  const registered = dayjs(timestamp * 1000);
  const minutes = now.diff(registered, 'minutes');
  const hours = now.diff(registered, 'hours');
  const days = now.diff(registered, 'days');
  const months = now.diff(registered, 'months');
  const years = now.diff(registered, 'years');
  let duration;
  if (hours === 0) {
    duration = `${minutes} ${t('minutes')}`;
  } else if (days === 0) {
    duration = `${hours} ${t('hours')}`;
  } else if (months === 0) {
    duration = `${days} ${t('days')}`;
  } else if (years === 0) {
    duration = `${months} ${t('months')}`;
  } else {
    duration = `${years} ${t('years')} ${months % 12} ${t('months')}`;
  }

  return (
    <time
      dateTime={dayjs(registered).format('YYYY-MM-DD')}
      { ...props }
    >
      {!timestamp ? '-' : duration}
    </time>
  );
};

export default memo(FromNow);
