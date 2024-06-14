import styles from "./styles.module.css";
import { ReactComponent as InfoIcon } from "../../img/icon-eye-158746.svg";
import { ReactComponent as TrashIcon } from "../../img/icon-trash-10609426.svg";

import { useEffect, useState } from "react";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { ICardProps } from "../../store/types";

export function Card(cards: ICardProps) {
  const [showModal, setshowModal] = useState(false);
  const [currentButton, setCurrentButton] = useState("");

  const dataCompanies = {
    companyName: cards.cards.mobileAppDashboard.companyName,
    companyLogo: cards.cards.mobileAppDashboard.logo,
    mark: cards.cards.customerMarkParameters.mark,
    cashToMark: cards.cards.customerMarkParameters.loyaltyLevel.cashToMark,
    level: cards.cards.customerMarkParameters.loyaltyLevel.name,
    styles: {
      accentColor: cards.cards.mobileAppDashboard.accentColor,
      backgroundColor: cards.cards.mobileAppDashboard.backgroundColor,
      cardBackgroundColor: cards.cards.mobileAppDashboard.cardBackgroundColor,
      companyName: cards.cards.mobileAppDashboard.companyName,
      highlightTextColor: cards.cards.mobileAppDashboard.highlightTextColor,
      mainColor: cards.cards.mobileAppDashboard.mainColor,
      textColor: cards.cards.mobileAppDashboard.textColor,
    },
  };

  const onCLickCurentButton = (arg: string) => {
    setCurrentButton(arg);
    setshowModal(true);
  };

  const handleCloseModal = () => {
    setshowModal(false);
  };

  return (
    <div
      className={styles.card}
      style={{ backgroundColor: dataCompanies.styles.cardBackgroundColor }}
    >
      {showModal && (
        <ModalWindow
          setIsOpen={setshowModal}
          addBtnClose={true}
          className={styles.modal}
        >
          <div className={styles.modal__content}>
            <p>{`Вы нажали на ${currentButton}`}</p>
            <button onClick={handleCloseModal} className={styles.first__button}>
              Хорошо
            </button>
            <button onClick={handleCloseModal} className={styles.last__button}>
              X
            </button>
          </div>
        </ModalWindow>
      )}
      {!showModal && (
        <>
          <div
            className={styles.card__header}
            style={{
              borderBottom: `0.2vw solid ${dataCompanies.styles.highlightTextColor}`,
            }}
          >
            <h1
              className={styles.card__name}
              style={{ color: dataCompanies.styles.highlightTextColor }}
            >
              {dataCompanies.companyName}
            </h1>
            <img
              src={dataCompanies.companyLogo}
              alt="company logo"
              className={styles.card__logo}
            />
          </div>
          <div className={styles.card__body}>
            <div
              className={styles.card__body_mark}
              style={{ color: dataCompanies.styles.highlightTextColor }}
            >
              {dataCompanies.mark}
              <span style={{ color: dataCompanies.styles.textColor }}>
                {" "}
                баллов
              </span>
            </div>
            <div
              className={styles.card__body_loyaltyLevel}
              style={{
                borderBottom: `0.2vw solid ${dataCompanies.styles.highlightTextColor}`,
              }}
            >
              <div className={styles.card__body_cashtomark}>
                <p style={{ color: dataCompanies.styles.textColor }}>Кешбэк</p>
                <span
                  className={styles.card__body_cashtomark_percent}
                >{`${dataCompanies.cashToMark} %`}</span>
              </div>
              <div className={styles.card__body_level}>
                <p style={{ color: dataCompanies.styles.textColor }}>Уровень</p>
                <span className={styles.card__body_level_name}>
                  {dataCompanies.level}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.card__footer}>
            <button
              onClick={() => onCLickCurentButton("More-Info")}
              className={styles.card__footer_moreInfo_button}
              style={{
                backgroundColor: dataCompanies.styles.cardBackgroundColor,
              }}
            >
              <InfoIcon
                fill={dataCompanies.styles.mainColor}
                className={styles.card__footer_moreInfo_img}
              />
            </button>
            <button
              className={styles.card__footer_trash_button}
              style={{
                backgroundColor: dataCompanies.styles.cardBackgroundColor,
              }}
              onClick={() => onCLickCurentButton("Trash-button")}
            >
              <TrashIcon
                fill={dataCompanies.styles.accentColor}
                className={styles.card__footer_trash_img}
              />
            </button>
            <button
              className={styles.card__footer_moreDetails_button}
              style={{ backgroundColor: dataCompanies.styles.backgroundColor }}
              onClick={() => onCLickCurentButton("Подробнее")}
            >
              <span style={{ color: dataCompanies.styles.mainColor }}>
                Подробнее
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
