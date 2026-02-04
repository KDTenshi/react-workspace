import type { FC, PropsWithChildren } from "react";
import style from "./PopupWrapper.module.scss";

interface PopupWrapperProps {
  hidePopup: () => void;
}

const PopupWrapper: FC<PropsWithChildren<PopupWrapperProps>> = ({ hidePopup, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) {
      hidePopup();
    }
  };

  return (
    <div className={style.Wrapper} onClick={handleClick}>
      {children}
    </div>
  );
};

export default PopupWrapper;
