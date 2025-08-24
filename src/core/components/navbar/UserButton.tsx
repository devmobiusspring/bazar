import React, { useState, MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import { LogoutRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { signOut } from "next-auth/react";

const UserProfileMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    signOut({ callbackUrl: "/auth" });
  };

  return (
    <Box>
      <IconButton onClick={handleMenu}>
        <AccountCircleRounded fontSize="medium" color="secondary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-list": {
            backgroundColor: (theme) => theme.palette.info.main,
          },
        }}
      >
        <MenuItem onClick={handleLogout} sx={{ padding: 0 }}>
          <Box
            display="flex"
            alignItems="center"
            padding={(theme) => theme.spacing(0.75, 2)}
          >
            <Typography
              color={"text.primary"}
              sx={{ marginRight: (theme) => theme.spacing(1) }}
            >
              Logout
            </Typography>
            <LogoutRounded />
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfileMenu;
