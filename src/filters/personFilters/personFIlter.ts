import { Prisma } from "@prisma/client";
import { PersonQuery } from "../../types/types";

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
