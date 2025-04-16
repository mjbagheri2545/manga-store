const relativeTimeFormatter = new Intl.RelativeTimeFormat("fa", {
  numeric: "auto",
});

type Division = {
  amount: number;
  unit: Intl.RelativeTimeFormatUnit;
};

const DIVISIONS: Division[] = [
  { amount: 60, unit: "seconds" },
  { amount: 60, unit: "minutes" },
  { amount: 24, unit: "hours" },
  { amount: 7, unit: "days" },
  { amount: 4.34524, unit: "weeks" },
  { amount: 12, unit: "months" },
  {
    amount: Number.POSITIVE_INFINITY,
    unit: "years",
  },
];

function formatRelativeTime(date: Date | string | number) {
  date = date instanceof Date ? date : new Date(date);
  let duration = (date.getTime() - Date.now()) / 1000;

  if (Math.abs(duration) < 1) return "الان";

  const division = DIVISIONS.find((division) => {
    if (Math.abs(duration) < division.amount) {
      return true;
    }
    duration /= division.amount;
    return false;
  });

  if (division == null) {
    return "زمان نامشخص";
  }

  return relativeTimeFormatter.format(Math.round(duration), division.unit);
}

export default formatRelativeTime;
