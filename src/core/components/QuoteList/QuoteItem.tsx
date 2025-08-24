import { FC } from "react";
import { ChevronRightRounded } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { highlightWords } from "@/utils/textUtil";
import { Theme, useTheme } from "@mui/material/styles";

export type QuoteItemPropsType = {
  title: string;
  subTitle: string;
  date: string;
  onClick?: Function;
  selected?: boolean;
  data?: any;
  highlightText?: string;
};

export const QuoteItem: FC<QuoteItemPropsType> = ({
  title,
  subTitle,
  onClick,
  highlightText,
  date,
  selected,
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const SecondaryText: FC<{ boxProps?: BoxProps }> = ({ boxProps }) => {
    return (
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        component={"span"}
        width={"100%"}
        {...boxProps}
      >
        <Typography
          component={"span"}
          variant="body2"
          color={selected ? "primary.contrastText" : "text.secondary"}
          sx={(theme) => ({
            [theme.breakpoints.up("md")]: {
              marginLeft: theme.spacing(2),
            },
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          })}
          maxWidth={"374px"}
        >
          {subTitle}
        </Typography>
        <Typography
          component={"span"}
          sx={(theme) => ({
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            [theme.breakpoints.up("md")]: {
              marginLeft: theme.spacing(2),
              marginRight: theme.spacing(2),
            },
          })}
          variant="body2"
          color={selected ? "primary.contrastText" : "text.secondary"}
        >
          {date}
        </Typography>
      </Box>
    );
  };

  return (
    <ListItem
      disablePadding
      onClick={() => onClick && onClick()}
      sx={(theme) => ({
        background: selected
          ? theme.palette.primary.main
          : theme.palette.info.main,
        borderRadius: theme.spacing(1.5),
      })}
    >
      <ListItemButton
        sx={(theme) => ({
          padding: `14px ${theme.spacing(1)} ${theme.spacing(
            2
          )} ${theme.spacing(2)}`,
          [theme.breakpoints.up("sm")]: {
            padding: `${theme.spacing(1.5)} ${theme.spacing(1)} ${theme.spacing(
              1.5
            )} ${theme.spacing(2)}`,
          },
          borderRadius: theme.spacing(1.5),
        })}
      >
        <ListItemText
          primary={
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                margin={0}
                padding={0}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  variant="subtitle1"
                  color={selected ? "primary.contrastText" : "text.primary"}
                  width={"100%"}
                >
                  {highlightWords(
                    title,
                    highlightText || "",
                    selected
                      ? theme.palette.primary.contrastText
                      : theme.palette.primary.main
                  )}
                </Typography>
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"flex-end"}
                >
                  {isMd && (
                    <SecondaryText
                      boxProps={{
                        sx: { width: "auto", justifyContent: "flex-end" },
                      }}
                    />
                  )}
                  <ChevronRightRounded
                    sx={{
                      color: selected
                        ? theme.palette.primary.contrastText
                        : theme.palette.action.active,
                    }}
                  />
                </Box>
              </Box>
              {!isMd && <SecondaryText />}
            </Box>
          }
          sx={{ margin: "0px" }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default QuoteItem;
