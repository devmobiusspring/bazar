"use client";
import ImagesearchRollerTwoToneIcon from "@mui/icons-material/ImagesearchRollerTwoTone";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box justifyContent={"center"} display={"flex"} width={"100%"}>
      <ImagesearchRollerTwoToneIcon
        fontSize="large"
        sx={{ fontSize: "120px" }}
      />
    </Box>
  );
};

export default Loading;
