import { PersonRole } from "@prisma/client";
export interface PersonQuery {
  name?: string;
  age?: number;
  role?: string[] | string;
}

// export interface PersonQueryStaring {
//   name?: string;
//   age?: number;
//   role?:
// }
