/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/utils/api";
import { nameSchema, surnameSchema } from "~/utils/zodShemas";

const inputSchema = z.object({
  name: nameSchema,
  surname: surnameSchema,
});

type Schema = z.infer<typeof inputSchema>;

const FormCreatePerson = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(inputSchema),
  });

  const router = useRouter();

  const onSubmit = (data: Schema) => {
    try {
      createPerson.mutate({
        name: data.name,
        surname: data.surname,
      });
      reset();
      void router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const utils = api.useContext(); //?

  const createPerson = api.person.addPerson.useMutation({
    async onSuccess() {
      await utils.person.invalidate();
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col gap-2"
      noValidate
      autoComplete="off"
    >
      <label htmlFor="name">Name:</label>
      <input type="text" {...register("name")} className=" w-52" />
      {errors.name?.message && <p>{errors.name?.message}</p>}
      <label htmlFor="surname">Surname:</label>
      <input type="text" {...register("surname")} className=" w-52" />
      {errors.surname?.message && <p>{errors.surname?.message}</p>}
      <input type="submit" />
    </form>
  );
};

export default FormCreatePerson;
