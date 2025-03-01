import { subYears } from "date-fns";

export const calculateDateRangeForAge = (age: number) => {
  if (typeof age !== 'number' || isNaN(age)) {
    throw new Error("Age must be a valid number");
  }

  const currentDate = new Date();

  if (isNaN(currentDate.getTime())) {
    throw new Error("Invalid currentDate");
  }

  const startOfAge = subYears(currentDate, age + 1);
  const endOfAge = subYears(currentDate, age);

  if (isNaN(startOfAge.getTime()) || isNaN(endOfAge.getTime())) {
    throw new Error("Invalid Date range calculated.");
  }

  return { startOfAge, endOfAge };
};
  