import type { FC } from "react";
import style from "./ConfirmPopup.module.scss";
import Button from "../../../shared/ui/Button/Button";

interface ConfirmPopupProps {
  question: string;
  handleConfirm: () => void;
  hidePopup: () => void;
}

const ConfirmPopup: FC<ConfirmPopupProps> = ({ question, handleConfirm, hidePopup }) => {
  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) {
      hidePopup();
    }
  };

  return (
    <div className={style.Wrapper} onClick={handleWrapperClick}>
      <div className={style.Popup}>
        <h3 className={style.Title}>{question}</h3>
        <div className={style.Buttons}>
          <Button size="big" onClick={hidePopup}>
            Cancel
          </Button>
          <Button size="big" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
