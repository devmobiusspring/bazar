"use client";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { RootState } from "@/store";
import { hideSnackbar } from "@/store/components";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

interface SnackBarComponentProps {
  title?: string;
}

const SnackBarComponent: React.FC<SnackBarComponentProps> = ({ title }) => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state: RootState) => state.components.snackbar
  );

  const handleClose = useCallback(() => {
    dispatch(hideSnackbar());
  }, [dispatch]);

  const alertTitle = useMemo(() => {
    return title || severity.charAt(0).toUpperCase() + severity.slice(1);
  }, [title, severity]);

  const alertStyles = useMemo(
    () => (theme: any) => ({
      width: "100%",
      ...(severity === "success" && {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        "& .MuiAlert-icon": {
          color: theme.palette.success.contrastText,
        },
      }),
      ...(severity === "error" && {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        "& .MuiAlert-icon": {
          color: theme.palette.error.contrastText,
        },
      }),
    }),
    [severity]
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        iconMapping={{
          success: <CheckCircleOutlinedIcon />,
        }}
        sx={alertStyles}
      >
        <AlertTitle>{alertTitle}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponent;
