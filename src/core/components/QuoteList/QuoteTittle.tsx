import { Typography } from "@mui/material";
import { FC } from "react";

const QuoteTitle: FC<{ text: string; topSpacing?: boolean }> = ({
  text,
  topSpacing,
}) => {
  const parts = text.split(",");
  return (
    <Typography
      variant="h5"
      sx={{ marginTop: topSpacing ? (theme) => theme.spacing(2) : 0 }}
    >
      {parts.length > 1 ? `${parts[0]}, ` : `${parts[0]}`}
      {parts[1] && (
        <Typography component={"span"} variant="h5" color={"text.secondary"}>
          {`${parts[1]}`}
        </Typography>
      )}
    </Typography>
  );
};

export default QuoteTitle;
