import { Prisma } from "@prisma/client";
import { PersonQuery } from "../types/types";


export const buildFilters = (
  filtersFunctions: Function[],
  query: PersonQuery
): Prisma.PersonWhereInput => {
  if (!Array.isArray(filtersFunctions)) {
    throw new Error("filtersFunctions must be an array");
  }
  let filters: Prisma.PersonWhereInput = {};

  filtersFunctions.forEach((filterFn) => {
    const filter = filterFn(query);
    if (filter) {
      filters = { ...filters, ...filter };
    }
  });

  return filters;
};
