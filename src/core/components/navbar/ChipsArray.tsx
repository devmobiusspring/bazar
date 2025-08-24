import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip, { ChipProps } from "@mui/material/Chip";
import { Box, IconButton, IconButtonProps } from "@mui/material";

export type ChipData = {
  key: number;
  label: string;
  icon?: (className: string) => React.ReactElement;
  onClick: Function;
  chipProps?: ChipProps;
  iconButtonProps?: IconButtonProps;
  selected?: boolean | undefined;
};

export type ChipsArrayProps = {
  chipData: readonly ChipData[];
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({ chipData }: ChipsArrayProps) {
  const [selectedChip, setSelectedChip] = React.useState<number | null>(null);

  const handleClick = (key: number) => {
    setSelectedChip(selectedChip === key ? null : key);
  };

  return (
    <Box
      sx={{
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          display: "none", // Hide scroll bar in webkit browsers
        },
        whiteSpace: "nowrap",
        width: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        flexWrap: "nowrap",
        listStyle: "none",
        padding: (theme) => theme.spacing(1, 2),
        gap: (theme) => theme.spacing(1),
      }}
    >
      {chipData.map((data) => {
        const isSelected = data.selected ?? selectedChip === data.key;
        return (
          <ListItem
            key={data.key}
            sx={{
              margin: (theme) => theme.spacing(0),
            }}
          >
            {data.icon ? (
              <IconButton
                size="small"
                sx={(theme) => ({
                  backgroundColor: isSelected
                    ? `${theme.palette.secondary.main} !important`
                    : `${theme.palette.action.selected} !important`,
                  color: isSelected
                    ? `${theme.palette.secondary.contrastText} !important`
                    : `${theme.palette.text.primary} !important`,
                })}
                {...data.iconButtonProps}
                onClick={() => {
                  handleClick(data.key);
                  data.onClick(data);
                }}
              >
                {data.icon("")}
              </IconButton>
            ) : (
              <Chip
                label={data.label}
                sx={(theme) => ({
                  backgroundColor: isSelected
                    ? `${theme.palette.secondary.main} !important`
                    : `${theme.palette.action.selected} !important`,
                  color: isSelected
                    ? `${theme.palette.secondary.contrastText} !important`
                    : `${theme.palette.text.primary} !important`,
                })}
                onClick={() => {
                  handleClick(data.key);
                  data.onClick(data);
                }}
                {...data.chipProps}
              />
            )}
          </ListItem>
        );
      })}
    </Box>
  );
}
