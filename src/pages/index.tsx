import { type ReactNode, useState, useEffect } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import FormUpdatePerson from "~/components/FormUpdatePerson";
import { useScrollLocks } from "~/hooks/useScrollLock";
import PersonCard from "~/components/PersonCard";
import { Modal } from "~/components/Modal";
import { Sidebar } from "~/components/Sidebar";
import { Preloader } from "~/components/Preloader";

const Home: NextPage = () => {
  const { data: guestEntries, isLoading } = api.person.getAllPersons.useQuery();
  const utils = api.useContext();
  const { lockScroll, unlockScroll } = useScrollLocks();
  const [isOpen, setIsOpen] = useState(false);
  const [isShowBTN, setIsShowBTN] = useState(false);
  const [elemID, setElemID] = useState<string>();
  const [modalContent, setModalcontent] = useState<ReactNode>();
  const [nameSelectState, setNameSelectState] = useState("default");
  const [surnameSelectState, setSurnameSelectState] = useState("default");
  const [dateSelectState, setDateSelectState] = useState("default");
  const [personsData, setPersonsData] = useState(guestEntries);

  const checkAndUpdateSelectStatus = (updateSelect: string, value: string) => {
    switch (updateSelect) {
      case "name":
        setNameSelectState(value);
        setSurnameSelectState("default");
        setDateSelectState("default");
        break;
      case "surname":
        setSurnameSelectState(value);
        setNameSelectState("default");
        setDateSelectState("default");
        break;
      case "createdAt":
        setDateSelectState(value);
        setNameSelectState("default");
        setSurnameSelectState("default");
        break;
      default:
        console.log("unknown value");
        break;
    }
  };

  const selectUpdateFunc = (select: string, option: string) => {
    switch (select) {
      case "name":
        if (option === "to up") {
          const newArray = personsData
            ? [...personsData].sort((a, b) => b.name.localeCompare(a.name))
            : null;
          checkAndUpdateSelectStatus("name", "to up");
          if (newArray) setPersonsData(newArray);
        } else if (option === "to below") {
          const newArray = personsData
            ? [...personsData].sort((a, b) => a.name.localeCompare(b.name))
            : null;
          if (newArray) setPersonsData(newArray);
          checkAndUpdateSelectStatus("name", "to below");
        } else {
          setPersonsData(guestEntries);
          checkAndUpdateSelectStatus("name", "default");
        }
        break;
      case "surname":
        if (option === "to up") {
          const newArray = personsData
            ? [...personsData].sort((a, b) =>
                b.surname.localeCompare(a.surname)
              )
            : null;
          if (newArray) setPersonsData(newArray);
          checkAndUpdateSelectStatus("surname", "to up");
        } else if (option === "to below") {
          const newArray = personsData
            ? [...personsData].sort((a, b) =>
                a.surname.localeCompare(b.surname)
              )
            : null;
          if (newArray) setPersonsData(newArray);
          checkAndUpdateSelectStatus("surname", "to below");
        } else {
          setPersonsData(guestEntries);
          checkAndUpdateSelectStatus("surname", "default");
        }
        break;
      case "createdAt":
        if (option === "to up") {
          const newArray = personsData
            ? [...personsData].sort(
                (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
              )
            : null;
          if (newArray) setPersonsData(newArray);
          checkAndUpdateSelectStatus("createdAt", "to up");
        } else if (option === "to below") {
          const newArray = personsData
            ? [...personsData].sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
              )
            : null;
          if (newArray) setPersonsData(newArray);
          checkAndUpdateSelectStatus("createdAt", "to below");
        } else {
          setPersonsData(guestEntries);
          checkAndUpdateSelectStatus("createdAt", "default");
        }
        break;
      default:
        console.log("unknown value");
        break;
    }
  };

  useEffect(() => {
    if (nameSelectState !== "default") {
      selectUpdateFunc("name", nameSelectState);
    } else if (surnameSelectState !== "default") {
      selectUpdateFunc("surname", surnameSelectState);
    } else if (dateSelectState !== "default") {
      selectUpdateFunc("createdAt", dateSelectState);
    } else {
      setPersonsData(guestEntries);
    }
  }, [guestEntries]);

  const deletePerson = api.person.delete.useMutation({
    async onSuccess() {
      await utils.person.invalidate();
    },
  });

  const onClickFunc = () => {
    if (elemID) deletePerson.mutate(elemID);
    if (unlockScroll) unlockScroll();
    setIsOpen(false);
  };

  const openModal = (elId: string, elName: string, elSurname: string) => {
    setIsShowBTN(false);
    if (lockScroll) lockScroll();
    setModalcontent(
      <FormUpdatePerson
        name={elName}
        surname={elSurname}
        id={elId}
        close={closeModal}
      />
    );
    setIsOpen(true);
  };

  const closeModal = () => {
    if (unlockScroll) unlockScroll();
    setIsOpen(false);
  };

  const openModalDelete = (elId: string) => {
    setIsShowBTN(true);
    if (lockScroll) lockScroll();
    setElemID(elId);
    setModalcontent(<h2 className=" title m-2">Delete this person?</h2>);
    setIsOpen(true);
  };

  if (isLoading) return <Preloader />;

  return (
    <>
      <Head>
        <title>Main | Test Oversecured</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        confirmFunc={onClickFunc}
        showBTN={isShowBTN}
      >
        {modalContent}
      </Modal>
      <div className="flex w-full flex-col justify-around md:flex-row">
        <Sidebar
          selectUpdate={selectUpdateFunc}
          defaultName={nameSelectState}
          defaultSurname={surnameSelectState}
          defaultDate={dateSelectState}
        />
        <article className=" mb-8 flex items-start gap-2 md:w-4/6 ">
          <div className=" flex w-full flex-col gap-1">
            {personsData?.map((el) => (
              <PersonCard
                key={el.id}
                name={el.name}
                surname={el.surname}
                id={el.id}
                createdAt={el.createdAt}
                openModal={() => openModal(el.id, el.name, el.surname)}
                openModalDelete={() => openModalDelete(el.id)}
              />
            ))}
          </div>
        </article>
      </div>
    </>
  );
};

export default Home;
