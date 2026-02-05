import type { FC } from "react";
import style from "./PriorityButton.module.scss";
import type { TTaskPriority } from "../../../shared/types/types";

interface PriorityButtonProps {
  priority: TTaskPriority;
  clickHandler: () => void;
  isActive: boolean;
}

const priorityStyles: { [key in TTaskPriority]: string } = {
  low: style.Low,
  moderate: style.Moderate,
  high: style.High,
};

const PriorityButton: FC<PriorityButtonProps> = ({ priority, clickHandler, isActive }) => {
  const className = isActive ? [priorityStyles[priority], style.Active].join(" ") : priorityStyles[priority];

  return (
    <button type="button" className={className} onClick={clickHandler}>
      {priority}
    </button>
  );
};

export default PriorityButton;
