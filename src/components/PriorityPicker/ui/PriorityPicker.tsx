import type { FC } from "react";
import type { TTaskPriority } from "../../../shared/types/types";
import style from "./PriorityPicker.module.scss";
import { PriorityButton } from "../../PriorityButton";

interface PriorityPickerProps {
  priority: TTaskPriority;
  setPriority: (p: TTaskPriority) => void;
}

const PriorityPicker: FC<PriorityPickerProps> = ({ priority, setPriority }) => {
  return (
    <div className={style.Picker}>
      <PriorityButton priority="low" isActive={priority === "low"} clickHandler={() => setPriority("low")} />
      <PriorityButton
        priority="moderate"
        isActive={priority === "moderate"}
        clickHandler={() => setPriority("moderate")}
      />
      <PriorityButton priority="high" isActive={priority === "high"} clickHandler={() => setPriority("high")} />
    </div>
  );
};

export default PriorityPicker;
