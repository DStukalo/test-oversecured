import { type ReactNode } from "react";
import { SVGWrapper } from "../SVGWrapper";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  confirmFunc?: () => void;
  children: ReactNode;
  showBTN?: boolean;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  confirmFunc,
  showBTN,
}: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className=" absolute right-0 top-0 flex h-full w-full items-center justify-center bg-secondary-200/75">
      <div className=" flex flex-col bg-primary-100 p-4">
        <button onClick={onClose}>
          <SVGWrapper
            file="social"
            id="close_icon"
            classes="w-6 h-6 fill-secondary-100"
          />
        </button>
        {children}
        {showBTN ? (
          <button
            className="rounded-xl bg-secondary-100 p-2"
            onClick={confirmFunc}
          >
            Confirm
          </button>
        ) : null}
      </div>
    </div>
  );
};
