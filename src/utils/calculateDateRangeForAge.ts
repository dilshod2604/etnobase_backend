import { subYears } from "date-fns";

export const calculateDateRangeForAge = (ageRange: number[]): { startOfAge: Date; endOfAge: Date } => {
  
  if (!Array.isArray(ageRange) || ageRange.length !== 2 || ageRange.some((age) => typeof age !== 'number' || isNaN(age))) {
    throw new Error("Age range must be an array of two valid numbers, e.g., [36, 45]");
  }

  const [minAge, maxAge] = ageRange;

  const currentDate = new Date();

  if (isNaN(currentDate.getTime())) {
    throw new Error("Invalid currentDate");
  }

  const startOfAge = subYears(currentDate, maxAge + 1); 
  const endOfAge = subYears(currentDate, minAge);      

  if (isNaN(startOfAge.getTime()) || isNaN(endOfAge.getTime())) {
    throw new Error("Invalid Date range calculated.");
  }

  return { startOfAge, endOfAge };
};
