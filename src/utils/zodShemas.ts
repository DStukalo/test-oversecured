import { z } from "zod";

export const nameSchema = z
  .string()
  .min(1, { message: "Required" })
  .min(3, { message: "Name is too short" })
  .max(8, { message: "Name is too long" })
  .regex(/^[a-zа-яії\s]+$/iu, { message: "Not valid name" });

export const surnameSchema = z
  .string()
  .min(1, { message: "Required" })
  .min(3, { message: "Surname is too short" })
  .max(10, { message: "Surname is too long" })
  .regex(/^[a-zа-яії\s]+$/iu, { message: "Not valid name" });

export const inputSchema = z.object({
  name: nameSchema,
  surname: surnameSchema,
});
