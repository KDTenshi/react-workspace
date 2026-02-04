import type { FC } from "react";
import style from "./ConfirmPopup.module.scss";
import Button from "../../../shared/ui/Button/Button";
import Heading from "../../../shared/ui/Heading/Heading";
import PopupWrapper from "../../../shared/ui/PopupWrapper/PopupWrapper";

interface ConfirmPopupProps {
  question: string;
  handleConfirm: () => void;
  hidePopup: () => void;
}

const ConfirmPopup: FC<ConfirmPopupProps> = ({ question, handleConfirm, hidePopup }) => {
  return (
    <PopupWrapper hidePopup={hidePopup}>
      <div className={style.Popup}>
        <Heading level={3} color="black">
          {question}
        </Heading>
        <div className={style.Buttons}>
          <Button size="big" onClick={hidePopup}>
            Cancel
          </Button>
          <Button size="big" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default ConfirmPopup;
