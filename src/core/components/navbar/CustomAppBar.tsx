"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box, { BoxProps } from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import IconButton, {
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import {
  InputAdornment,
  TextField,
  TextFieldProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import UserProfileMenu from "./UserButton";
import useAuth from "@/hooks/context/useAuth";

export type CustomButtonProps = {
  isIconButton: boolean;
  props: MuiButtonProps | MuiIconButtonProps;
};

export type AppBarVariant = "default" | "search" | "onlyContainer";

export type AppBarProps = {
  leftButtonProps?: CustomButtonProps;
  title?: string;
  subTitle?: string;
  subTitleProps?: any;
  iconTitle?: React.ReactNode;
  showTitle?: boolean;
  showTitleMini?: boolean;
  rightButtonsProps?: CustomButtonProps[];
  rightButtonsContainerProps?: BoxProps;
  mainContent: React.ReactNode;
  mainContentProps?: BoxProps;
  variant?: AppBarVariant;
  chipsComponent?: React.ReactNode;
  cancelSearchBtnProps?: MuiButtonProps;
  searchProps?: TextFieldProps;
  appBarContainerProps?: BoxProps;
};

export default function CustomAppBar(props: AppBarProps) {
  const [showDivider, setShowDivider] = useState(false);
  const appBarRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const auth = useAuth();
  const session = auth?.session;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShowDivider(true);
      } else {
        setShowDivider(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSmallScreen]);

  const renderAppBarContent = () => {
    switch (props.variant) {
      case "search":
        return (
          <>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                padding: (theme) => theme.spacing(0.25, 1, 0.25, 2),
                gap: (theme) => theme.spacing(1),
              }}
            >
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                variant="filled"
                size="small"
                fullWidth
                placeholder="Buscar"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
                {...props.searchProps}
              />
              <Button
                variant="text"
                color="primary"
                size="large"
                sx={{
                  textTransform: "capitalize",
                }}
                {...props?.cancelSearchBtnProps}
              >
                Cancelar
              </Button>
            </Box>
            {props.chipsComponent && props.chipsComponent}
          </>
        );
      case "default":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: (theme) => theme.spacing(0, 0.5),
            }}
          >
            {session && !props?.leftButtonProps && <UserProfileMenu />}

            {props?.leftButtonProps && props?.leftButtonProps?.isIconButton ? (
              <IconButton
                {...(props.leftButtonProps.props as MuiIconButtonProps)}
              />
            ) : (
              <Button
                size="large"
                color="secondary"
                {...(props?.leftButtonProps?.props as MuiButtonProps)}
              />
            )}
            {
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  color: (theme) => theme.palette.text.primary,
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  opacity: showDivider ? 1 : 0,
                  transition: "opacity 0.2s ease-in-out",
                }}
              >
                {props.showTitleMini && props.title}
              </Typography>
            }
            <Box {...props.rightButtonsContainerProps}>
              {props.rightButtonsProps?.map((button, index) =>
                button.isIconButton ? (
                  <IconButton
                    key={index}
                    color="inherit"
                    onClick={button.props.onClick}
                    {...button.props}
                  >
                    {button.props.children}
                  </IconButton>
                ) : (
                  <Button
                    key={index}
                    size="large"
                    color="primary"
                    onClick={button.props.onClick}
                  >
                    {button.props.children}
                  </Button>
                )
              )}
            </Box>
          </Box>
        );
      case "onlyContainer":
        return null;
      default:
        return null;
    }
  };

  return (
    <Box {...props.appBarContainerProps}>
      <Box
        sx={(theme) => ({
          flexGrow: 1,
          position: "sticky",
          top: "0px",
          zIndex: theme.zIndex.appBar,
        })}
      >
        <AppBar
          ref={appBarRef}
          position="sticky"
          sx={() => ({
            boxShadow: "none",
            backgroundColor: (theme) => theme.palette.background.default,
            paddingTop: (theme) => ({
              sm:
                props.variant === "onlyContainer"
                  ? theme.spacing(0)
                  : theme.spacing(1),
            }),
          })}
        >
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "auto !important",
              padding: (theme) => theme.spacing(0) + "!important",
              gap: (theme) => theme.spacing(0),
            }}
          >
            {renderAppBarContent()}
          </Toolbar>
          {showDivider && <Divider sx={{ margin: 0 }} />}
        </AppBar>
      </Box>
      {props.variant != "search" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: (theme) =>
              props.variant === "onlyContainer"
                ? theme.spacing(0)
                : theme.spacing(1.5, 2, 1, 2),
            gap: (theme) => theme.spacing(1.5),
            opacity: showDivider ? 0 : 1,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <>
            {props.iconTitle && props.iconTitle}
            {props.showTitle && (
              <Typography
                variant="h3"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  marginRight: (theme) => theme.spacing(-1),
                }}
              >
                {props.title}
              </Typography>
            )}
            {props.subTitle && (
              <Typography
                variant="body1"
                color="text.secondary"
                {...props.subTitleProps}
              >
                {props.subTitle}
              </Typography>
            )}
          </>
        </Box>
      )}
      <Box
        component="main"
        sx={{
          padding: (theme) => theme.spacing(2),
          backgroundColor: (theme) => theme.palette.background.default,
        }}
        {...props.mainContentProps}
      >
        {props.mainContent}
      </Box>
    </Box>
  );
}
