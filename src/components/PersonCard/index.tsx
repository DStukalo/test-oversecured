import React from "react";
import { SVGWrapper } from "../SVGWrapper";
type Props = {
  name: string;
  surname: string;
  id: string;
  createdAt: Date;
  openModal: () => void;
  openModalDelete: () => void;
};

const PersonCard = (props: Props) => {
  const { name, surname, id, createdAt, openModal, openModalDelete } = props;
  const cardsOpendelete = () => {
    openModalDelete();
  };

  return (
    <div className=" flex w-auto justify-between gap-2 rounded-xl border p-2 text-secondary-300">
      <div className=" flex w-96 flex-wrap justify-between gap-2 md:flex-row">
        <div className=" flex gap-2 ">
          <p>{name}</p>
          <p>{surname}</p>
        </div>
        <p>
          {createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}
        </p>
      </div>
      <div className="flex gap-2">
        <button onClick={openModal}>
          <SVGWrapper
            file="social"
            id="update_icon"
            classes="w-4 h-4 fill-secondary-100"
          />
        </button>
        <button onClick={cardsOpendelete}>
          <SVGWrapper
            file="social"
            id="delete_icon"
            classes="w-4 h-4 fill-secondary-100"
          />
        </button>
      </div>
    </div>
  );
};

export default PersonCard;
