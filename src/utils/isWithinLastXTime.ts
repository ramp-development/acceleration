/**
 * A function to check whether a given date is within the last X units of time
 * @param date - Date to compare
 * @param quantity - Number of units to compare
 * @param unit - Unit of time to compare
 * @returns - Whether the date is within the last X units of time
 */

export const isWithinLastXTime = (
  date: Date,
  quantity: number,
  unit: 'minutes' | 'hours' | 'days' | 'months' | 'years'
): boolean => {
  const currentDate = new Date();
  let timeDiffInMillis: number;

  switch (unit) {
    case 'minutes':
      timeDiffInMillis = quantity * 60 * 1000; // Number of milliseconds in X minutes
      break;
    case 'hours':
      timeDiffInMillis = quantity * 60 * 60 * 1000; // Number of milliseconds in X hours
      break;
    case 'days':
      timeDiffInMillis = quantity * 24 * 60 * 60 * 1000; // Number of milliseconds in X days
      break;
    case 'months':
      timeDiffInMillis = quantity * 30 * 24 * 60 * 60 * 1000; // Number of milliseconds in X months
      break;
    case 'years':
      timeDiffInMillis = quantity * 365 * 24 * 60 * 60 * 1000; // Number of milliseconds in X years
      break;
    default:
      throw new Error('Invalid time unit');
  }

  return currentDate.getTime() - date.getTime() <= timeDiffInMillis;
};
