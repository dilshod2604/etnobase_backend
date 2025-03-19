import { PersonRole, Prisma, Person_sex, Person_type } from "@prisma/client";
import { PersonQuery } from "../../types/types";
import { calculateDateRangeForAge } from "../../utils/calculateDateRangeForAge";
import { formatDateToString } from "../../utils/formatDate";

export const filterByName = (
  query: PersonQuery
): Prisma.PersonWhereInput | null => {
  if (query.name) {
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
  if (query.age) {
    const ages = query.age.split(",").map(Number);
    const { endOfAge, startOfAge } = calculateDateRangeForAge(ages);
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

export const filterByRole = (
  query: PersonQuery
): Prisma.PersonWhereInput | null => {
  if (query.role && typeof query.role === "string") {
    const roles: PersonRole[] = query.role
      .split(",")
      .map((role) => role as PersonRole);
    return {
      roles: {
        some: {
          role: {
            in: roles,
          },
        },
      },
    };
  }
  return null;
};

export const filterBySex = (
  query: PersonQuery
): Prisma.PersonWhereInput | null => {
  if (query.sex) {
    return {
      sex: {
        equals: query.sex as Person_sex,
      },
    };
  }
  return null;
};

export const filterByPersonType = (
  query: PersonQuery
): Prisma.PersonWhereInput | null => {
  if (query.sex) {
    return {
      person_type: {
        equals: query.person_type as Person_type,
      },
    };
  }
  return null;
};

export const filterByNationality = (
  query: PersonQuery
): Prisma.PersonWhereInput | null => {
  if (query.nationality && typeof query.nationality === "string") {
    const nationalities = query.nationality.split(",").map((nation) => nation);
    return {
      nationality: {
        in: nationalities,
      },
    };
  }
  return null;
};

export const filterByCityOfLive = (
  query: PersonQuery
): Prisma.PersonWhereInput | null => {
  if (query.cityOfLive && typeof query.cityOfLive === "string") {
    const cities = query.cityOfLive.split(",").map((city) => city);
    return {
      cityOfLive: {
        in: cities,
      },
    };
  }
  return null;
};
