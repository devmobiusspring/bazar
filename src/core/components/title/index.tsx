import { Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  text: string;
}

export const Title: FC<Props> = ({ text }) => <Typography>{text}</Typography>;

export default Title;
