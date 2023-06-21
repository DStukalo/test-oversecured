import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

type SidebarProps = {
  selectUpdate: (arg1: string, arg2: string) => void;
  defaultName: string;
  defaultSurname: string;
  defaultDate: string;
};

export const Sidebar = ({
  selectUpdate,
  defaultName,
  defaultSurname,
  defaultDate,
}: SidebarProps) => {
  const { control } = useForm();
  return (
    <div className=" mb-6 flex gap-2 md:flex-col">
      <Link
        href={"/add-person"}
        className={
          "main-text inline-block w-40 rounded-xl border p-1 text-center text-secondary-100 hover:bg-tertiary-100 md:w-full"
        }
      >
        Add person to build
      </Link>
      <form className=" flex flex-wrap items-center justify-center gap-2 md:flex-col">
        <h2 className=" text-secondary-100 md:title">Sorted by:</h2>
        <div className=" flex justify-between md:w-40 md:flex-col">
          <label htmlFor="name" className=" main-text mx-1 text-secondary-100">
            Name
          </label>
          <Controller
            name="select"
            control={control}
            render={() => (
              <select
                name="name"
                value={defaultName}
                onChange={(event) => {
                  selectUpdate(`name`, `${event.target.value}`);
                }}
              >
                <option value="default"></option>
                <option value="to up">to up</option>
                <option value="to below">to below</option>
              </select>
            )}
          />
        </div>
        <div className=" flex justify-between md:w-40 md:flex-col">
          <label
            htmlFor="surname"
            className=" main-text mx-1 text-secondary-100"
          >
            Surname
          </label>
          <Controller
            name="surname"
            control={control}
            render={() => (
              <select
                name="surname"
                value={defaultSurname}
                onChange={(event) => {
                  selectUpdate(`surname`, `${event.target.value}`);
                }}
              >
                <option value="default"></option>
                <option value="to up">to up</option>
                <option value="to below">to below</option>
              </select>
            )}
          />
        </div>
        <div className="flex justify-between md:w-40 md:flex-col">
          <label
            htmlFor="createdAt"
            className=" main-text mx-1 text-secondary-100"
          >
            Created at
          </label>
          <Controller
            name="createdAt"
            control={control}
            render={() => (
              <select
                name="createdAt"
                value={defaultDate}
                onChange={(event) => {
                  selectUpdate(`createdAt`, `${event.target.value}`);
                }}
              >
                <option value="default"></option>
                <option value="to up">to up</option>
                <option value="to below">to below</option>
              </select>
            )}
          />
        </div>
      </form>
    </div>
  );
};
