import React from "react";
import cn from "classnames";
import styles from "./styles.module.css";
import { Portal } from "../Portal/Portal";

interface IModalWindow {
  height?: string;
  width?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  children: React.ReactElement;
  className?: string;
  addBtnClose?: boolean;
  setIsOpen: Function;
}
export const ModalWindow: React.FC<IModalWindow> = ({
  height,
  width,
  top,
  right,
  bottom,
  left,
  className,
  addBtnClose = false,
  children,
  setIsOpen,
}) => {
  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    if (target.id === "bgModal" || e.currentTarget.id === "btnClose") {
      setIsOpen(false);
    }
  };

  return (
    <Portal className={styles.portal}>
      <div id="bgModal" className={styles.bg} onMouseDown={handleCloseModal}>
        <div
          style={{ height, width, top, right, bottom, left }}
          className={cn(styles.modal, className)}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
