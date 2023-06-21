/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputSchema } from "~/utils/zodShemas";
import { api } from "~/utils/api";

type Schema = z.infer<typeof inputSchema>;

type FormUpdatePersonProps = {
  name: string;
  surname: string;
  id: string;
  close: () => void;
};

const FormUpdatePerson = ({
  name,
  surname,
  id,
  close,
}: FormUpdatePersonProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(inputSchema),
  });
  const utils = api.useContext();
  const router = useRouter();

  const onSubmit = (data: Schema) => {
    try {
      updatePerson.mutate({
        id: id,
        name: data.name,
        surname: data.surname,
      });
      reset();
      close();
      void router.push("/");
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const updatePerson = api.person.updatePerson.useMutation({
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
      <div className=" flex flex-col justify-between">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          {...register("name")}
          className=" w-52 rounded-xl p-2"
          defaultValue={name}
        />
        {errors.name?.message && <p>{errors.name?.message}</p>}
      </div>

      <div className="mb-4 flex flex-col justify-between">
        {" "}
        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          {...register("surname")}
          className=" w-52 rounded-xl p-2"
          defaultValue={surname}
        />
        {errors.surname?.message && <p>{errors.surname?.message}</p>}
      </div>

      <input
        type="submit"
        className="rounded-xl bg-secondary-100 p-2"
        value="Refresh"
      />
    </form>
  );
};

export default FormUpdatePerson;
