import { FC } from "react";
import { AddCircleRounded } from "@mui/icons-material";
import { Button, ListItem, ListItemText, Paper } from "@mui/material";

export type EmptyItemPropsType = {
  onClickAdd: Function;
  emptyMessage?: string;
};

export const EmptyItem: FC<EmptyItemPropsType> = ({
  onClickAdd,
  emptyMessage,
}) => {
  return (
    <ListItem
      // secondaryAction={//TODO: ADD FUNCTIONALITY IF NEEDED BUT CURRENTLY NOT USED
      //   <Button
      //     startIcon={<AddCircleRounded />}
      //     onClick={() => onClickAdd()}
      //   >
      //     Add
      //   </Button>
      // }
      component={Paper}
      elevation={0}
      sx={(theme) => ({
        background: theme.palette.info.main,
        padding: "16px 8px 16px 16px",
      })}
    >
      <ListItemText
        primaryTypographyProps={{
          variant: "subtitle1",
          color: "text.secondary",
        }}
        primary={emptyMessage || "No estimates yet"}
      />
    </ListItem>
  );
};

export default EmptyItem;
