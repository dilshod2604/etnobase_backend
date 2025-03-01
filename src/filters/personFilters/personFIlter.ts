import { Prisma } from "@prisma/client";
import { PersonQuery } from "../../types/types";
import { calculateDateRangeForAge } from "../../utils/calculateDateRangeForAge";
import { formatDateToString } from "../../utils/formatDate";

export const filterByName = (
  query: PersonQuery
): Prisma.PersonWhereInput | null => {
  if (query) {
    return {
      firstName: {
        contains: query.name,
      },
    };
  }
  return null;
};

export const filterByAge = (
  query: PersonQuery
): Prisma.PersonWhereInput | null => {
  if (query) {
    const { endOfAge, startOfAge } = calculateDateRangeForAge(query.age!);

    const start = formatDateToString(startOfAge);
    const end = formatDateToString(endOfAge);

    return {
      dateOfBirth: {
        gte: start,
        lte: end,
      },
    };
  }
  return null;
};
