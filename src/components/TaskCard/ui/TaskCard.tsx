import type { FC } from "react";
import style from "./TaskCard.module.scss";

const TaskCard: FC = () => {
  return (
    <div className={style.Task}>
      <h2 className={style.Title}>Task title</h2>
      <p className={style.Body}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque, esse cumque! In temporibus provident alias,
        doloremque vitae quibusdam voluptas debitis, expedita soluta architecto voluptatem earum aliquid similique
        dolorem dicta quo.
      </p>
      <p className={style.Date}>10:25 | 10.10.2001</p>
    </div>
  );
};

export default TaskCard;
