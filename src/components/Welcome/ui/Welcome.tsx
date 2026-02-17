import type { FC } from "react";
import style from "./Welcome.module.scss";
import Heading from "../../../shared/ui/Heading/Heading";
import Text from "../../../shared/ui/Text/Text";

const Welcome: FC = () => {
  return (
    <div className={style.Welcome}>
      <Heading level={1} color="black">
        Welcome to the WORKSPACE
      </Heading>
      <Text size="big" color="dark">
        Here you can manage your tasks in the most comfortable way!
      </Text>
    </div>
  );
};

export default Welcome;
