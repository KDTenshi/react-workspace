import type { FC } from "react";

import style from "./RecentBoards.module.scss";
import { useAppSelector } from "../../../app/store/appStore";
import Text from "../../../shared/ui/Text/Text";
import { Link } from "react-router";
import Heading from "../../../shared/ui/Heading/Heading";

const RecentBoards: FC = () => {
  const recentBoards = useAppSelector((state) => state.tasks.recentBoards);

  return (
    <div className={style.Recent}>
      <Heading level={3} color="black">
        Recent boards
      </Heading>
      {recentBoards.length === 0 && (
        <Text size="medium" color="dark" align="center">
          No recenlty visited boards
        </Text>
      )}
      {recentBoards.length !== 0 && (
        <nav className={style.List}>
          {recentBoards.map((id) => (
            <Link to={`/boards/${id}`} key={id} className={style.Link}>
              <Text size="medium" color="dark">
                {id}
              </Text>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default RecentBoards;
