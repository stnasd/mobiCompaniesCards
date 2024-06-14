import { useEffect, useRef, useState } from "react";
import { Card } from "../Card/Card";
import styles from "./styles.module.css";
import { useGetCardsMutation } from "../../store/getCardsApi/getCardsApi";
import { MainLogo } from "../MainLogo/MailLogo";
import { Spinner } from "../Spinner/Spinner";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { IRepoEntry } from "../../store/types";

export function Main() {
  const [data, setData] = useState<IRepoEntry | undefined>();
  const [indentation, setIndentation] = useState({ offset: 5, limit: 5 });
  const [showMainLogo, setShowMainLogo] = useState(true);
  const [loadItemsStatus, setLoadItemsStatus] = useState("pending");
  const [fetching, setFetching] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const [showModal, setshowModal] = useState(true);

  const [trigger] = useGetCardsMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainLogo(() => false);
    }, 3000);

    if (!showMainLogo) {
      const res = trigger(indentation);
      res.then((res) => {
        if (res.data) {
          setData((prev) => ({
            companies: prev
              ? prev.companies.concat(res.data.companies)
              : res.data.companies,
          }));
          setLoadItemsStatus(() => "fulfilled");
        }

        if (res.error) {
          if (res.error && "status" in res.error && res.error.status === 401) {
            setErrorStatus("Ошибка авторизации");
          } else if (
            res.error &&
            "status" in res.error &&
            res.error.status === 400
          ) {
            if (typeof res.error.data === "object") {
              const errorData = res.error.data as { message: string };

              if (typeof errorData.message === "string") {
                setErrorStatus(errorData.message);
              }
            }
          } else if (
            res.error &&
            "status" in res.error &&
            res.error.status === 500
          ) {
            setErrorStatus("все упало");
          } else {
            setErrorStatus("Произошла ошибка при выполнении запроса");
          }
          setLoadItemsStatus(() => "rejected");
        }
        setShowSpinner(false);
      });
    }

    return () => {
      clearTimeout(timer);
    };
  }, [trigger, indentation, showMainLogo, fetching]);

  const renderItems = data?.companies ? (
    data?.companies.map((item) => {
      return <Card cards={item} key={item.company.companyId} />;
    })
  ) : (
    <div>Нет Компаний</div>
  );

  const elementRef = useRef<HTMLHtmlElement>(null);

  const scrollHandler = () => {
    if (
      elementRef.current &&
      elementRef.current.scrollHeight - (window.scrollY + window.innerHeight) <
        100
    ) {
      setIndentation((prev) => ({ offset: prev.offset + 5, limit: 5 }));
      setShowSpinner(true);
      setFetching(true);
    }
  };

  useEffect(() => {
    if (fetching) {
      document.addEventListener("scroll", scrollHandler);
    }
    return () => document.removeEventListener("scroll", scrollHandler);
  }, [fetching]);

  const handleCloseModal = () => {
    setErrorStatus("");
    setLoadItemsStatus("pending");
    setShowSpinner(true);
  };

  return (
    <div className={styles.wrapper}>
      {loadItemsStatus === "rejected" && (
        <ModalWindow
          setIsOpen={setshowModal}
          addBtnClose={true}
          className={styles.modal}
        >
          <div className={styles.modal__content}>
            <p>{errorStatus}</p>
            <button onClick={handleCloseModal} className={styles.first__button}>
              Хорошо
            </button>
            <button onClick={handleCloseModal} className={styles.last__button}>
              X
            </button>
          </div>
        </ModalWindow>
      )}
      {loadItemsStatus !== "fulfilled" &&
        loadItemsStatus !== "rejected" &&
        !showMainLogo && <Spinner />}
      {!showMainLogo && loadItemsStatus !== "pending" && (
        <main className={styles.main} ref={elementRef}>
          <div className={styles.main__header}>
            <h1 className={styles.main__title}>Управление картами</h1>
          </div>
          <div className={styles.main__block}>{renderItems}</div>
          {showSpinner && <Spinner />}
        </main>
      )}
      {showMainLogo && <MainLogo />}
    </div>
  );
}
